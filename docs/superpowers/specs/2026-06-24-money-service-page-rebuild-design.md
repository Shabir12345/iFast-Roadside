# Money-Service Page Rebuild — Design Spec

_Created: 2026-06-24_

## Goal

Rebuild 10 high-value, currently-unindexed pages to an exceptional ("top 1%")
standard so they earn indexing and rank for iFAST's four **money services**:
**Tires, Boost (jump-start), Lockout, Fuel delivery**. We make each page genuinely
unique — using competitor research for table-stakes and our own 145 Google reviews
+ local knowledge for differentiation — *then* request indexing. This is a
quality play to fix a crawl-budget/authority problem, not a page-count play.
(Context: see `docs/seo-roadmap-and-recommendations.md`.)

## The 10 target pages (all confirmed not indexed, 2026-06-24)

**Tier 1 — money-service hub pages** (`SERVICE_CONTENT` in `data/serviceContent.tsx`):
1. `/service/tire-change` — Discovered, not indexed ← **PILOT PAGE**
2. `/service/lockout` — Discovered, not indexed
3. `/service/fuel` — Discovered, not indexed

**Tier 2 — money-service × strongest-demand cities** (`SERVICE_CITY_CONTENT` in `data/serviceCityContent.tsx`):
4. `/service/tire-change/scarborough` — Unknown to Google
5. `/service/jump-start/pickering` — Discovered, not indexed
6. `/service/lockout/pickering` — Discovered, not indexed
7. `/service/fuel/pickering` — Unknown to Google
8. `/service/jump-start/scarborough` — Discovered, not indexed
9. `/service/lockout/scarborough` — Discovered, not indexed
10. `/service/tire-change/ajax` — Unknown to Google

Note: `/service/jump-start` (hub) is already indexed; `/service/tire-change/pickering`
already indexed. "Unknown to Google" pages also need discovery (sitemap/internal
links) on top of the quality work.

## Content philosophy: Local-proof + Experience-led

Layer competitor table-stakes with proof competitors cannot copy:
- **Experience signals (E-E-A-T):** real on-site process, real dispatch stories.
- **First-party proof:** quotes mined from our 145 real Google reviews, matched to
  each service. Only real reviews — fabricated content violates Google ToS + the
  Competition Act.
- **Hyper-local detail:** specific highways, neighbourhoods, landmarks, real
  scenarios per city.
- **Transparency:** "starts at $X", what's included, no-surprise promise.

Depth is added only where it adds genuine value (real cost/how-it-works), never as
padding.

## Page blueprint (every rebuilt page)

1. **Hero** — service + city, honest ETA, primary call CTA (keep existing brand design).
2. **How it actually works** — real on-site process, step by step.
3. **Real local scenario** — adapted from an actual review story (the connection element).
4. **Transparent pricing** — starts-at price, what's included, no-surprise promise.
5. **Why it beats the alternatives** — on-site vs tow-to-shop; us vs CAA wait times.
6. **Trust block** — real review quotes specific to *this* service; licensed/insured; damage-free guarantee.
7. **Local detail** — highways/neighbourhoods/landmarks (combos especially).
8. **Service-specific FAQ** — from real review questions + competitor "People Also Ask".
9. **Schema** — Service + FAQPage + (combo) LocalBusiness/Breadcrumb, with real `aggregateRating`.

## Process (phased)

- **Phase A — Recon.** Use Playwright to run money-keyword × city searches in Google
  (e.g. "mobile tire repair Pickering", "car lockout Scarborough") and identify the
  top 3 consistently-ranking competitors per service. Pull all 145 reviews as JSON
  from the Featurable API
  (`https://api.featurable.com/v1/widgets/9ff590b7-3128-4d17-a845-bc80f70b5313`).
- **Phase B — Synthesize.** Feed competitor page content + our reviews into NotebookLM;
  extract "what works" patterns per service and mine review stories/details/FAQs.
- **Phase C — Blueprint finalization.** Confirm the section template + per-service
  content slots from the synthesis.
- **Phase D — Pilot.** Rebuild the **tire-change hub** (`SERVICE_CONTENT['tire-change']`)
  end-to-end to the blueprint. Get user sign-off on the result before rolling out.
- **Phase E — Roll out.** Replicate across the other 9 pages (2 hubs in
  `serviceContent.tsx`; 7 combos in `serviceCityContent.tsx`).
- **Phase F — Ship & index.** Build from `C:\Users\khati\ifast-build`, push to GitHub
  (Vercel auto-deploys `main`), then request indexing in GSC (user-interactive) and
  monitor coverage. Also deploy the earlier dead-link fix (`ServiceCityPage`).

## Constraints / conventions

- Real reviews only (Google ToS + Competition Act).
- Every phone CTA calls `trackPhoneCall(source)` with a descriptive source label.
- Brand styling only (`bg-brand-yellow`, `premium-shadow`, etc.); match the existing
  punchy, conversion-optimized tone.
- npm is broken on G: (Google Drive) — build/verify from `C:\Users\khati\ifast-build`;
  GitHub is source of truth. See memory `ifast-google-drive-hazards`.
- Keep `constants.tsx` SERVICES and the two content maps in sync; update `sitemap.xml`
  if any new combo URL needs discovery.

## Success criteria

1. Each rebuilt page is substantively unique (no templated near-duplicate copy).
2. Each page carries real, service-matched review proof + local detail.
3. Pilot (tire-change hub) approved by user before rollout.
4. After deploy + indexing request, target pages move off "Discovered/Unknown" toward
   indexed over the following weeks.
5. Conversion elements (call CTAs + tracking) intact on every page.

## Out of scope

- Building the 25 sub-service × city combo pages (decided against — see roadmap doc).
- Mobile-mechanic and towing pages (not priority money services).
- Whitby/Oshawa combos for now (weakest demand).
