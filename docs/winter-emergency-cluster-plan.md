# iFast — Winter / Emergency Cluster SEO Campaign

Started 2026-08-28. Branch `seo/winter-emergency-cluster`.

## Thesis
For iFast, **emergency and winter are the same customer**: cold Dec–Jan morning, car
won't start, searches "24 hour mobile mechanic near me" / "dead battery boost."
iFast peaks **Dec–Jan** (battery/no-start), ~2.6× the August floor, running ~3 months —
so the winter deadline is **~mid-October** (indexed before the peak), not August.

## The evidence (GSC, 28 days to 2026-08-28)
- Content now ranks — the old "authority ceiling" has lifted for local-intent pages:
  `/mobile-mechanic` 2,125 impr pos 9.3; pricing-guide blog 1,569 impr pos 6.9 / 17 clicks;
  `/areas/pickering` pos 3.9; `/areas/north-york` pos 4.7.
- **The 24hr / 24-7 / emergency cluster is orphaned & cannibalized** (~239 impr/28d, near-zero
  clicks). `/mobile-mechanic` absorbs most but ranks pos **22–37** for the "24 hour"/"emergency"
  variants (Google reads it as a "mobile mechanic" page, not an emergency page); the rest scatters
  across the homepage and service-area hubs. **No page owns "24 hour / emergency roadside."**
- Two page-2 giants one push from page 1: `caa-vs` blog 2,792 impr pos 11.9; `/mobile-mechanic` pos 9.3.
- `/service/jump-start` already targets boost/winter/cold well — but "battery boost near me" maps to
  the **homepage**, not jump-start → internal-linking/authority gap, not a content gap.

## Plan (by certainty, then season)

### Phase 0 — Retarget what already ranks (free, no new pages)
- [ ] Internal links with keyword anchors → push `/mobile-mechanic` and `caa-vs` blog from page 2 → 1.
- [ ] Internal links with "battery boost / dead battery" anchors → `/service/jump-start` (homepage steals it today).
- [ ] Do NOT rewrite `/mobile-mechanic` — it's guardrailed (`scripts/check-mobile-mechanic-guardrail.sh`); it's a
      page-2 giant to lift via authority, not a page to re-target.

### Phase 1 — Emergency / 24-Hour hub (the missing intent page) ✅ BUILT 2026-08-28
- [x] `SERVICE_CONTENT['24-hour-roadside']` + `SERVICES` entry → live at `/service/24-hour-roadside`.
- [x] `<loc>` added to `public/sitemap.xml`; prerendered (74/74 routes).
- [x] Owns "24 hour / 24-7 / emergency"; body links down to jump-start, lockout, fuel, tire-change,
      mobile-mechanic. Hub is linked from all 74 pages (Header nav + Footer) + homepage grid.
- [x] Fixed a latent bug surfaced by the build: ServicePage rendered `/service/:id/:city` cross-links for
      every top-level service, but the hub has no combo content → 6 soft-404 links. Gated the section on
      `SERVICE_CITY_CONTENT[id]` existing (the 6 real combo services unchanged; verified 6 links each).
- [x] Guardrail PASS (mobile-mechanic's only change is the 2 nav/footer links, proven by word-diff); 10/10 tests.
- [ ] NOT YET committed / deployed / indexed — needs Shabir's go-ahead.

### Phase 2 — Winter cold-battery cluster (timed for Dec–Jan; deadline ~mid-Oct)
- [ ] One batched, **cached** DataForSEO pull (~$0.09) to size "car won't start in cold / dead battery cold
      weather / winter boost" (out of season in GSC now, so invisible).
- [ ] Winter-battery hub + weave the cold-weather angle into jump-start / battery pages.

## Guardrail (every build)
`npm run build && bash scripts/check-mobile-mechanic-guardrail.sh` → must print GUARDRAIL PASS.

## Content schema (SERVICE_CONTENT entry)
`{ id, seoTitle, seoDescription, keywords, heroImage, hero:{eyebrow,h1,h1Accent,intro},
featuresHeading, features:[{title,desc,icon,color}], cta:{heading,body},
blogSections:[{title,content:JSX}], faqs:[{question,answer}] }`
