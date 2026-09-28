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
- [x] Batched cached DataForSEO pull done 2026-08-28 ($0.09, `ifast-winter-battery-2026-08-28`).
  Data: `C:/dev/dfs-cache/ifast/data/2026-08-28-winter-battery/`.
- **Finding — January peak, 4–6× the annual average:**
  - car won't start in cold — **3,600 (Jan)** / 590 avg — the head term, info→transactional
  - car battery replacement near me — 1,000 / 590 · car not starting in cold — 720 / 140
  - frozen car battery — 590 / 110 · mobile battery replacement — 590 / 390
  - battery boost service — 320 · car won't start in winter — 210 · dead battery cold weather — 170
  - **Zero-volume (do NOT target):** "winter battery boost", "cold weather jump start", "24 hour battery boost",
    "winter roadside assistance", "emergency roadside assistance winter" — invented phrasings nobody searches.
- **Gap:** no page targets the cold no-start cluster (~5,000/mo Jan). Existing `winter-roadside-emergencies`
  guide is too broad (~2 impr); `dead-car-battery-boost-or-replace` answers a different question.
- [ ] BUILD: focused guide post "Car Won't Start in the Cold?" owning car won't start in cold / not starting in
      cold / frozen car battery / car won't start in winter; funnels to jump-start + /service/24-hour-roadside +
      battery-replacement. Index by mid-Oct for the Jan peak.
- [ ] Sharpen `/service/battery-replacement` for "car battery replacement near me" (1,000 Jan).

## Guardrail (every build)
`npm run build && bash scripts/check-mobile-mechanic-guardrail.sh` → must print GUARDRAIL PASS.

## Content schema (SERVICE_CONTENT entry)
`{ id, seoTitle, seoDescription, keywords, heroImage, hero:{eyebrow,h1,h1Accent,intro},
featuresHeading, features:[{title,desc,icon,color}], cta:{heading,body},
blogSections:[{title,content:JSX}], faqs:[{question,answer}] }`

### Phase 3 — Winter emergency guides ✅ BUILT 2026-09-27
Picked from the agency winter plan (`claude-home/projects/roadside-winter-seo-plan.html`), which
assigns battery / no-start / winter-emergency search to iFAST and tire changeover to GoldenNorth.
Tire changeover terms were deliberately NOT targeted here so the two clients don't compete.
- [x] `/blog/car-stuck-in-snow-what-to-do-gta`: "car stuck in snow" (10/mo Aug → 320/mo Jan, 32×).
      Funnels to `/service/towing` (winch-out) + `/service/24-hour-roadside`.
- [x] `/blog/how-long-does-a-car-battery-last-ontario`: pre-winter replacement research query feeding
      "car battery replacement near me" (590 avg / 1,000 Jan, Canada) and "mobile battery replacement"
      (390 / 590 Jan). Funnels to battery-replacement + battery-diagnostic.
- [x] `/blog/frozen-car-door-wont-open-gta`: frozen door / frozen lock, funnels to lockout. Volume
      NOT verified in DataForSEO; pull it before investing further in this topic.
- [x] `/service/battery-replacement` title/description/keywords retargeted to
      "mobile car battery replacement" / "car battery replacement near me".
- [x] Contextual links in: towing winch-out section, lockout frozen-lock section, battery-replacement
      planned-replacement section, the winter-emergencies guide and the cold-start guide.
- [ ] After deploy: request indexing for the 3 posts in GSC (needs to happen in October for the Dec–Jan peak).

### Phase 4 — Winter tire changeover campaign ✅ BUILT 2026-09-28
GoldenNorth is no longer a client (user, 2026-09-28), so iFAST now owns the tire changeover cluster.
Toronto volumes (cached DataForSEO): "tire changeover near me" 2,900 avg / **12,100 Nov**; "winter tire change"
and "snow tire change" 390 / 2,400 Nov; "tire swap" 320 / 1,000 Nov; "winter tire change near me" 170 / 1,000 Nov;
"seasonal tire change" 70 / 260 Nov. The spike collapses within ~4 weeks, so these must be indexed in October.
- [x] `/service/winter-tire-change` (sub-service of tire-change): the booking page for the unmodified terms.
      Appears automatically in the header Services dropdown and the homepage tire card (the only change to
      /mobile-mechanic's output is that one nav link, same precedent as the 24-hour hub).
- [x] `/blog/when-to-put-winter-tires-on-ontario`: the research query that peaks in October, a month before booking.
- [x] `/blog/tire-swap-vs-tire-change-on-rim-off-rim`: "tire swap" / on-rim vs off-rim.
- [x] Linked from tire-installation's seasonal section and between all three.
- [ ] Request indexing in GSC immediately; November is harvest, not build.
