# De-templating the Service & Service×City Pages

**Date:** 2026-06-14
**Status:** Approved design → ready for implementation plan
**Owner:** iFAST Roadside marketing site

## Problem

Google crawls the service pages (`/service/:id`) and the 30 service×city
combos (`/service/:id/:city`) but declines to index them
("Discovered – not indexed"; homepage shows "duplicate canonical"). The
content is not thin — it already carries real local detail — but every page
pours that detail into an **identical structural mold**: the same H1 pattern,
the same three section headings, the same FAQ count, the same hero, and
shared hero images (only 5 city photos reused across all 6 services). To
Google's helpful-content classifier this uniformity reads as templated
doorway pages. Repeated indexing requests won't move a page Google has chosen
not to index; the win is making Google *choose* to index because each page is
genuinely distinct and useful.

`data/serviceContent.tsx` additionally prints literal `Keywords: …` lines into
visible body copy (lines ~87, 94, 100, 107) — overt keyword stuffing that must
be removed.

## Goals

1. Break the structural fingerprint so no two of the 36 pages share a layout.
2. Add genuinely useful, **verified** knowledge competitors rarely publish.
3. Real, distinct photography per page via Pexels (no AI-generated images).
4. Low AI-detection writing: varied rhythm, concrete local nouns, no shared
   phrasing across pages.

## Scope

- **In (content):** 6 service pages + 30 service×city combos = **36 pages**.
- **In (site-wide indexability):** internal-linking hardening (incl. a
  Footer service-areas block touching every page), a sitemap **generator**,
  structured-data + NAP consistency, and image-weight/LCP fixes (logo +
  heroes). See "Site-wide indexability & Google best practices".
- **Out (this change):** city-hub *content* rewrite, chatbot env-var bug,
  homepage *content*, Tailwind-CDN→build migration. (Footer links and
  sitemap/schema touch these pages, but their copy is unchanged.)
- **Out (off-code):** backlinks / GBP / citations — advisory only.
  Combos continue reading `responseTime`/geo from `cityContent.tsx` unchanged.

## Non-negotiable principle: where knowledge lives

To avoid the same deep content repeating across 5 city pages (which would be
its *own* duplicate-content problem):

- **Service pages = authority guide** — evergreen, deep, verified facts
  (physics, law, how-it-works). One canonical home per knowledge item.
- **Combos = hyperlocal** — facts that genuinely differ per city: that city's
  breakdown hotspots, the municipal pothole-damage **claim process**
  (Toronto 311 vs Durham Region differ), local seasonal pattern, ETA stats.
  Each combo cross-links up to its service page for the deep material.

## Architecture: the block model

Replace the fixed middle section on both renderers with an ordered array of
typed content blocks. Page chrome (header, hero, trust bar, GoogleReviews,
Process, footer CTA) stays shared — consistent branding is expected; the
**body** is what must differ.

```ts
// data/blocks.ts
export type ContentBlock =
  | { type: 'prose';      heading?: string; body: React.ReactNode }
  | { type: 'costTable';  heading: string; rows: { item: string; price: string; note?: string }[]; footnote?: string }
  | { type: 'checklist';  heading: string; variant: 'safety' | 'steps' | 'bring'; intro?: React.ReactNode; items: { title: string; detail: string }[] }
  | { type: 'hotspots';   heading: string; intro?: React.ReactNode; spots: { place: string; why: string }[] }
  | { type: 'seasonal';   heading: string; body: React.ReactNode; stat?: { value: string; label: string } }
  | { type: 'decision';   heading: string; intro?: React.ReactNode; branches: { condition: string; recommendation: string }[] }
  | { type: 'claimGuide'; heading: string; jurisdiction: string; steps: string[]; deadline?: string; sourceUrl?: string }
  | { type: 'statCallout';stat: string; label: string; source?: string }
  | { type: 'glossary';   heading: string; terms: { term: string; definition: string }[] }
  | { type: 'faq';        heading?: string; items: { question: string; answer: string }[] };
```

### Files

- **New** `data/blocks.ts` — the `ContentBlock` union + shared types.
- **New** `components/blocks/` — one small component per block type plus
  `BlockRenderer.tsx` dispatching on `block.type`. Each component owns its own
  styling (reuse existing brand utilities: `premium-shadow`, brand colors,
  the yellow underline heading treatment).
- **Refactor** `pages/ServicePage.tsx` and `pages/ServiceCityPage.tsx` to map
  over `page.blocks` via `<BlockRenderer>` instead of hardcoded sections. Keep
  all existing Helmet/canonical/schema logic; only the middle changes.
- **Rewrite** `data/serviceContent.tsx`: schema `{ id, meta, hero, blocks }`
  where `meta = { seoTitle, seoDescription, keywords }`,
  `hero = { image, credit }`.
- **Rewrite** `data/serviceCityContent.tsx`: same `{ meta, hero, blocks }`
  shape keyed `[serviceId][cityId]`.
- **New** `scripts/fetch-pexels.mjs` + `data/imageManifest.json`.
- **New** `docs/knowledge-bank.md` — internal fact-checked reference (not
  shipped) listing each legal/numeric claim with its verifying source.

### FAQ schema note

`faq` blocks still emit `FAQPage` JSON-LD (collected from any `faq` blocks on
the page). `checklist:steps` blocks may emit `HowTo`; `hotspots` may emit
`ItemList` — only where honest and the content supports it.

## Differentiation matrix

Block order is assigned per page so neither the service-row nor the
city-column repeats a sequence. `hero` + `faq` are present on every page;
the table lists the **middle** blocks in order.

### Service pages (authority)

| Service | Block sequence (after hero, before footer) |
|---|---|
| mobile-mechanic | prose(what's actually fixable roadside) → decision(repair on-site vs tow to shop) → glossary(limp-mode / OBD-II / "parts cannon") → costTable → faq |
| tire-change | glossary(plug vs patch vs patch-plug; what's repairable) → checklist:steps(what to do at a flat, safely) → statCallout(donut spare: 80 km/h, ~70 km) → costTable → faq |
| jump-start | seasonal(cold-cranking physics, % loss by temp) → decision(battery vs alternator vs starter) → checklist:steps(safe jump procedure) → costTable → faq |
| lockout | prose(how damage-free tools work; why the coat-hanger myth fails on modern cars) → checklist:safety(child/pet locked in — 911 first, Ontario law) → glossary(transponder / keyless / valet) → costTable → faq |
| fuel | prose(running on empty damages the fuel pump — why) → decision(gas-vs-diesel misfuel: what to do) → checklist:safety(don't walk the highway — HTA) → costTable → faq |
| towing | glossary(Ontario Towing & Storage Safety Act consumer rights) → decision(flatbed vs wheel-lift for AWD/EV) → checklist:bring(what to photograph before a tow) → costTable → faq |

### Combos (hyperlocal) — middle block sequences

Every combo has a city-specific `hotspots` block with **different** spots, and
a closing `faq` with city-specific questions. The middle rotates so the five
cities of one service differ from each other and the six services of one city
differ from each other.

| Service \ City | Scarborough | Pickering | Ajax | Whitby | Oshawa |
|---|---|---|---|---|---|
| mobile-mechanic | prose → hotspots → decision | hotspots → seasonal → prose | prose → checklist:steps → hotspots | hotspots → statCallout → prose | seasonal → hotspots → prose |
| tire-change | hotspots → claimGuide(Toronto 311) → statCallout | claimGuide(Durham) → hotspots → seasonal | hotspots → claimGuide(Durham) → prose | seasonal → hotspots → claimGuide(Durham) | hotspots → statCallout → claimGuide(Durham) |
| jump-start | seasonal → hotspots → statCallout | hotspots → seasonal → checklist:steps | prose → hotspots → seasonal | seasonal → hotspots → prose | hotspots → statCallout → seasonal |
| lockout | hotspots → prose → checklist:safety | prose → hotspots → statCallout | hotspots → checklist:safety → prose | prose → hotspots → seasonal | hotspots → prose → statCallout |
| fuel | prose → hotspots → checklist:safety | hotspots → prose → statCallout | prose → checklist:safety → hotspots | hotspots → seasonal → prose | prose → hotspots → statCallout |
| towing | hotspots → decision → prose | decision → hotspots → statCallout | hotspots → prose → decision | seasonal → hotspots → decision | decision → hotspots → prose |

(Pothole `claimGuide` is reserved for tire-change combos, where it's most
relevant. Scarborough uses City of Toronto 311; the four Durham cities use the
Durham Region / local-municipality process — verified per municipality during
implementation.)

## Verified knowledge bank

Before writing, each legal/numeric claim is confirmed via web search and
recorded in `docs/knowledge-bank.md` with its source. Examples to verify:

- Ontario HTA rules for driving on a temporary/donut spare (speed & distance).
- Tire repair standards: repairable zone, sidewall non-repairable, re-torque
  after ~100 km.
- Battery cold-cranking loss by temperature; alternator-vs-battery symptoms.
- Running-on-empty fuel-pump damage mechanism; misfuel (gas/diesel) procedure.
- Highway Traffic Act on pedestrians/walking on 400-series shoulders.
- Ontario **Towing and Storage Safety and Enforcement Act** consumer rights
  (choice of destination, posted-rate/authorization requirements).
- Municipal pothole-damage claim processes (Toronto vs Durham Region):
  where to file, notice deadlines, what evidence is needed.

Nothing legal or numeric is invented. If a fact can't be verified, it isn't
published as fact.

## Pexels image pipeline

- `scripts/fetch-pexels.mjs` reads `PEXELS_API_KEY` from `.env.local`
  (gitignored, alongside `GEMINI_API_KEY`).
- Curated query per page (distinct tire / tow / battery / winter-road / night
  roadside shots) so all 36 heroes differ. Downloads to
  `public/images/pages/<service>-<city>.jpg` (and `<service>.jpg` for service
  pages).
- Writes `data/imageManifest.json`: `{ path, photographer, sourceUrl }` per
  image. `hero.credit` renders a small photo-credit line under each hero.
- Images committed as files (not hotlinked) for LCP + reliability.
- Script + build run on the C:\ clone where npm works.

## Writing standards (low AI-signal)

Applied to every page, and varied **between** pages:

- Vary sentence length and opening words; allow occasional fragments.
- Remove the em-dash tic and the "Whether you're X or Y…" / rule-of-three
  patterns that recur in the current copy.
- Use contractions and concrete local nouns (street names, exits, landmarks).
- No two pages share stock sentences or boilerplate phrasing.
- **Strip all visible `Keywords:` lines** from `serviceContent.tsx`.
- Differentiation comes from true local specifics, not padding.

## SEO / schema

- Keep all canonicals, `robots`, OG tags, breadcrumb JSON-LD unchanged.
- Vary H1s and `<title>`s off the current template.
- Add `HowTo` (for `checklist:steps`) and `ItemList` (for `hotspots`) JSON-LD
  only where honest.
- Verify the prerender route list still enumerates all 36 routes (derive from
  `SERVICES` × `CITY_CONTENT`).

## Site-wide indexability & Google best practices

Added per request: make every page maximally easy for Google to crawl, render,
and index, and satisfy current Search Essentials site-wide. Grounded in an
audit of the existing setup and Google's current guidance. There is **no
mechanism that forces indexing** — these remove technical blockers and
maximize the quality/connectivity signals Google weighs. Items are
prioritized; P0/P1 are in-code build tasks, P2 is advisory (off-code).

### Audit of what already works (keep)

- **Prerendering is real.** `npm run build` SSR-renders every route in
  `public/sitemap.xml` to static `dist/<route>/index.html` with per-page
  Helmet head (title/meta/canonical/JSON-LD), and **fails the build** if any
  page renders < 500 chars. Crawlers get full HTML without running JS.
- All 30 combos + 6 service pages are already in the sitemap (54 URLs total)
  → all are prerendered today. So for combos, raw rendering is **not** the gap.
- `robots.txt` = `Allow: /` + sitemap reference. Vercel serves HTTPS and
  prerendered files before the SPA rewrite. Canonicals are self-referential.
- Navigation uses React Router `<Link>` → real crawlable `<a href>` in the
  prerendered HTML. Breadcrumb JSON-LD present.

This means the remaining levers are **content quality** (the de-templating
work above) and **internal linking + crawl signals** (below).

### P0 — internal linking (Google's #1 discovery/priority signal)

The combos are weakly linked (reachable mainly via one service-page grid and
the area pages) — close to orphaned, a named cause of "discovered – not
indexed." Strengthen crawl paths with descriptive, keyword-relevant anchor
text (never "click here"):

- **Hub-and-spoke:** every `/areas/:city` hub links to all 6 of that city's
  combos; every `/service/:id` links to all 5 of its city combos (exists —
  keep and ensure descriptive anchors like "Mobile tire service in Whitby").
- **Sibling links on each combo:** link to the same service in neighbouring
  cities *and* to other services in the same city (the existing
  "Other services in {city}" grid covers the latter; add the former).
- **Contextual in-body links:** each combo links up to its parent service page
  (for the deep guide) and to its city hub, inside the prose, with natural
  anchors.
- **Top-level reachability:** add a compact "Service areas" linking section to
  the Footer (site-wide) so every combo is ≤ 2 clicks from the homepage and
  appears in the prerendered footer of every page.
- **Blog → money pages:** where a blog post is topically relevant, link to the
  matching service/combo.

### P0 — sitemap hygiene (prevent drift)

- Replace the hand-maintained `public/sitemap.xml` with a **generator script**
  (`scripts/generate-sitemap.mjs`) that derives URLs from `SERVICES`,
  `CITY_CONTENT`, and blog data, sets `lastmod` from build date, and runs in
  the `build` script *before* prerender. This guarantees the sitemap (and thus
  the prerender list) never silently drifts from real routes.
- Keep a single sitemap (< 50k URLs). Resubmit in GSC after deploy.

### P1 — structured data completeness & NAP consistency

- Ensure name / address / phone / hours are **byte-identical** everywhere they
  appear (schema in `index.html`, `constants.tsx`, per-page JSON-LD, footer).
- Keep `LocalBusiness`/`Organization` (home), `Service` + `FAQPage` +
  `BreadcrumbList` (service & combo). Add `HowTo`/`ItemList` only where the
  block content honestly supports it. Validate all with Rich Results Test.

### P1 — Core Web Vitals / page experience (a ranking + crawl-budget factor)

- **Image weight is a real problem:** `logo.png` is 2.4 MB and
  `favicon`/`apple-touch-icon` are ~370 KB each. Compress/resize these and
  serve an appropriately sized logo. This is in-scope because it affects LCP
  site-wide.
- The Pexels fetch script outputs **compressed, appropriately-sized** hero
  images (target ≤ ~150 KB) with explicit `width`/`height` to prevent CLS.
- Hero LCP image: `loading="eager"` + `fetchpriority="high"`; below-the-fold
  images `loading="lazy"`.
- Note for later (not this change): Tailwind is loaded via CDN, which blocks
  render; migrating to a built stylesheet would improve CWV but is out of
  scope here.

### P1 — indexing requests used correctly

- The existing `request-indexing` script won't rescue a page Google declined
  on quality. After this ships: resubmit the sitemap, then use GSC URL
  Inspection → Request Indexing **sparingly** on the updated key pages, and let
  recrawl/quality re-evaluation do the work.

### P2 — off-code (advisory, cannot be built in the repo)

- **Backlinks:** earned only. Optimize the Google Business Profile (categories,
  photos, posts, Q&A), build legitimate local citations (consistent NAP on
  Yelp, local directories), and earn links by being genuinely useful. **No paid
  link schemes** — they violate Google guidelines and risk penalties.
- Encourage steady, real GBP reviews (already strong at 4.9 / 94+).

### Consolidation fallback (honest)

Google's guidance sometimes favors merging several thin pages into one strong
page. We're keeping the 30 combos and making each genuinely distinct + well
linked. If, after a full crawl cycle post-launch, specific combos still won't
index, the fallback is to consolidate the weakest into their city hub or
service page rather than keep fighting for them.

## Build / deploy (Drive-hazard aware)

- Author content in the G:\ repo.
- **Build, run the Pexels script, and test on `C:\Users\khati\ifast-build`**
  (npm is broken on G:; Google Drive can roll back `.git`/files on G:).
- Commit + push to **GitHub (source of truth)**; Vercel auto-deploys from
  `main`.

## Risks / honest caveats

- Programmatic local pages are scrutinized regardless of quality; genuine
  per-page differentiation + the authority/locality split + internal linking
  are the real levers. Improvement in indexing may take crawl cycles.
- 36 pages of unique, fact-checked content is a large body of writing; it will
  be produced in structured batches during implementation.

## Acceptance criteria

1. No two pages **within the same service row or the same city column** share
   a block sequence (per the matrix). Cross-service sequence reuse is allowed
   only when the block *content* is wholly different.
2. Every page renders distinct middle content; no shared boilerplate
   sentences across any of the 36 pages.
3. All 36 heroes use distinct real Pexels photos with a credit line + manifest.
4. No visible `Keywords:` lines remain anywhere.
5. Every legal/numeric claim traces to a source in `docs/knowledge-bank.md`.
6. `npm run build` passes on the C:\ clone; all routes prerender (build fails
   on any < 500-char page).
7. Canonicals, breadcrumbs, and FAQ schema remain valid on every page;
   NAP is byte-identical across all schema/footer/constants.
8. Every combo is reachable by crawlable `<a href>` links from at least its
   city hub, its parent service page, and the site-wide Footer (≤ 2 clicks
   from home); anchor text is descriptive, not generic.
9. `sitemap.xml` is generated from route data (not hand-maintained) and the
   generator runs before prerender in `npm run build`.
10. `logo.png` and icons are compressed; hero images are sized/compressed with
    explicit dimensions; LCP hero uses `fetchpriority="high"`.
