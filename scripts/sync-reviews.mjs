/**
 * Review-count sync — runs BEFORE `vite build`.
 *
 * Fetches the live Google review count and rating from the Featurable widget
 * API and writes them to data/reviewStats.json, which is the single source of
 * truth for every review claim on the site: JSON-LD aggregateRating, the visible
 * "X+ Google Reviews" badges, and body copy in the city/service content.
 *
 * WHY THIS RUNS FIRST, NOT IN prerender.mjs
 * -----------------------------------------
 * prerender.mjs used to fetch this and string-replace it into dist/index.html.
 * That only patched the static HTML template — the React components were already
 * compiled into dist-server with whatever number was hardcoded in the source, so
 * SSR-rendered markup kept shipping the stale value. The result was four
 * different review counts live at once (94 in LocalBusiness schema and the
 * visible badges, 146 in body copy, 180/211 in the index.html schema). Two of
 * those were conflicting aggregateRating values on the same URL, which is a
 * review-snippet policy violation.
 *
 * Fetching here, before the bundle is built, means the number is baked into the
 * components themselves and there is exactly one value on every page.
 *
 * This must NEVER fail the build. If the API is unreachable we keep the
 * committed values — a slightly stale count is fine; a broken deploy is not.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'data', 'reviewStats.json');
const FEATURABLE_API =
  'https://api.featurable.com/v1/widgets/9ff590b7-3128-4d17-a845-bc80f70b5313';

const current = JSON.parse(readFileSync(target, 'utf8'));

try {
  const res = await fetch(FEATURABLE_API, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`API returned ${res.status}`);

  const data = await res.json();
  const count = Number(data?.totalReviewCount);
  const rating = Number(data?.averageRating);

  // Guard against the API returning a plausible-looking but wrong payload. A
  // review count should only ever go up; a sudden drop means the widget changed
  // or the response shape moved, not that reviews were deleted.
  if (!Number.isFinite(count) || count <= 0) throw new Error('no usable review count in response');
  if (!Number.isFinite(rating) || rating <= 0 || rating > 5) throw new Error('rating out of range');
  if (count < current.count) {
    throw new Error(`refusing to lower count ${current.count} -> ${count} (check the widget)`);
  }

  const next = {
    count,
    rating: Math.round(rating * 10) / 10,
    syncedAt: new Date().toISOString().slice(0, 10),
  };

  if (next.count === current.count && next.rating === current.rating) {
    console.log(`✓ Review stats unchanged (${next.count} reviews, ${next.rating}★)`);
  } else {
    writeFileSync(target, JSON.stringify(next, null, 2) + '\n');
    console.log(
      `✓ Review stats synced: ${current.count} -> ${next.count} reviews, ${next.rating}★`
    );
  }
} catch (e) {
  console.warn(
    `⚠ Could not sync review stats (${e.message}); keeping committed values ` +
      `(${current.count} reviews, ${current.rating}★).`
  );
}
