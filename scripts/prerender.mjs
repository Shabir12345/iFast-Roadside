/**
 * Build-time prerendering.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server entry).
 * Renders every valid route to static HTML and writes dist/<route>/index.html.
 * Vercel serves these files directly from the filesystem, so crawlers get full
 * HTML with per-page canonicals, meta tags, and JSON-LD without executing JS.
 *
 * The route list is the union of two sources:
 *   1. public/sitemap.xml — the indexable pages (what we advertise to Google).
 *   2. NOINDEX_COMBOS below — service×city combo pages held back with
 *      `noindex, follow`. They are deliberately kept OUT of the sitemap (a
 *      noindexed URL in a sitemap is a mixed signal that wastes crawl budget),
 *      but they still must be prerendered so they serve a real 200 page that
 *      passes internal link equity.
 *
 * NOTE: NOINDEX_COMBOS must mirror the set of the same name in
 * pages/ServiceCityPage.tsx (that file is the SEO source of truth — it sets the
 * robots meta tag). When a combo is rebuilt to the E-E-A-T standard, remove it
 * from BOTH lists and add it back to sitemap.xml.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(
  pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href
);

// Kept in sync with NOINDEX_COMBOS in pages/ServiceCityPage.tsx.
const NOINDEX_COMBOS = [
  'mobile-mechanic/scarborough', 'mobile-mechanic/pickering', 'mobile-mechanic/ajax', 'mobile-mechanic/whitby', 'mobile-mechanic/oshawa',
  'tire-change/pickering', 'tire-change/whitby', 'tire-change/oshawa',
  'jump-start/ajax', 'jump-start/whitby', 'jump-start/oshawa',
  'lockout/ajax', 'lockout/whitby', 'lockout/oshawa',
  'fuel/scarborough', 'fuel/ajax', 'fuel/whitby', 'fuel/oshawa',
  'towing/scarborough', 'towing/pickering', 'towing/ajax', 'towing/whitby', 'towing/oshawa',
  // North York wave 2b: fuel and towing are the secondary services for this
  // district. Written to the same standard as the rest, but held back from the
  // sitemap until the four priority combos (tire-change, jump-start, lockout,
  // mobile-mechanic) have been measured in GSC — shipping six new combos at
  // once makes it impossible to tell which template is working.
  'fuel/north-york', 'towing/north-york',
];

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/www\.ifastroadside\.ca([^<]*)<\/loc>/g)]
  .map((m) => m[1] || '/');

if (sitemapRoutes.length === 0) {
  console.error('No routes found in public/sitemap.xml — aborting.');
  process.exit(1);
}

// Union the indexable sitemap routes with the noindexed combo pages, deduped.
const routes = [...new Set([
  ...sitemapRoutes,
  ...NOINDEX_COMBOS.map((c) => `/service/${c}`),
])];

let template = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

// Sync the JSON-LD aggregateRating to the live Google/Featurable count at build
// time (SEO audit t11) so the schema, the hero "X Reviews" badges, and the
// reviews widget all show a single, accurate number instead of three drifting
// ones. If the API is unreachable the build keeps the hardcoded fallback — this
// must never fail the build.
// Read from data/reviewStats.json — the same file the React components compile
// against (via constants.tsx). scripts/sync-reviews.mjs refreshes it from the
// Featurable API before `vite build` runs.
//
// This deliberately does NOT fetch. It used to, and that was the bug: fetching
// here patched only the static index.html template, while the SSR-rendered
// component markup kept whatever number was hardcoded in the source. The site
// shipped conflicting aggregateRating values on the same URL as a result.
// Reading the one file guarantees the schema in index.html and the schema
// emitted by components agree.
const reviewStats = JSON.parse(
  readFileSync(join(root, 'data', 'reviewStats.json'), 'utf8')
);
template = template.replace(/("reviewCount":\s*")\d+(")/, `$1${reviewStats.count}$2`);
template = template.replace(
  /("ratingValue":\s*")[\d.]+(")/,
  `$1${reviewStats.rating.toFixed(1)}$2`
);
console.log(
  `✓ Schema review stats: ${reviewStats.count} reviews, ${reviewStats.rating}★ (synced ${reviewStats.syncedAt})`
);

const failures = [];
for (const route of routes) {
  const { html, helmet } = render(route);

  // A page that renders almost nothing (e.g. an unknown :id returning null)
  // would be served as a blank shell — fail the build instead of shipping it.
  if (html.length < 500) {
    failures.push(route);
    console.error(`✗ ${route} rendered only ${html.length} chars — check route data`);
    continue;
  }

  const head = ['title', 'meta', 'link', 'script']
    .map((k) => helmet?.[k]?.toString() ?? '')
    .filter(Boolean)
    .join('\n  ');

  const out = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `  ${head}\n</head>`);

  const outDir =
    route === '/' ? join(root, 'dist') : join(root, 'dist', ...route.split('/').filter(Boolean));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), out);
  console.log(`✓ ${route}`);
}

console.log(`\nPrerendered ${routes.length - failures.length}/${routes.length} routes.`);
if (failures.length > 0) {
  console.error(`Failed routes:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
