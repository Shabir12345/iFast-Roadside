# North York SEO Expansion — Strategy & Implementation Record

**Date:** 2026-07-20
**Owner:** Shabir
**Status:** Wave 2a implemented, not yet deployed
**Scope:** Penetrate North York (Toronto district, pop. ~870k), building on the East GTA pattern.

> **Correction notice.** The first draft of this document listed three "critical
> findings" that were wrong, all caused by unverified greps:
> 1. *"23 service×city pages are orphaned with no internal links"* — false.
>    `CityPage.tsx`, `ServicePage.tsx`, and `ServiceCityPage.tsx` all link them
>    via template literals, which the original grep pattern could not match.
> 2. *"23 pages are missing from the sitemap"* — false. They are deliberately
>    held out under the `NOINDEX_COMBOS` policy documented in
>    `scripts/prerender.mjs`, marked `noindex, follow`, and still prerendered so
>    they pass link equity. That is a correct decision, not a leak.
> 3. *"`/service-area/toronto` is a phantom URL"* — false. It exists at
>    `data/regionContent.tsx:78` under an unquoted key (`toronto:`), which the
>    original grep required quotes to match.
>
> The only original finding that held up is the GSC data in Part 1. The site was
> in good shape; there was no cleanup backlog. This document now records what
> was actually built.

---

## Part 1 — The opportunity (verified)

Search Console, Apr 20 – Jul 19 2026:

| Query | Position | Impressions | Clicks |
|---|---|---|---|
| `roadside assistance toronto` | **2.1** | 26 | **0** |
| `battery boost service toronto` | 7.5 | 4 | 0 |
| `flat tire repair toronto` | 9.5 | 2 | 0 |
| `jump start roadside toronto` | 18.5 | 4 | 0 |
| `24/7 car unlocking toronto` | 21 | 2 | 0 |
| **All Toronto queries** | — | **56** | **0** |

**First-principle observation:** relevance for Toronto already exists — Google
ranks the homepage at position 2.1 for the head term. What was missing was a
landing surface for the *district*, and the service×district long tail where
buying intent actually lives. That is a cheaper problem than building authority.

**Supporting evidence for the hub-plus-spokes shape:** `/areas/scarborough` gets
193 impressions at position 10 with **0 clicks**. `/service/mobile-mechanic/pickering`
gets 44 impressions at position 5.7 with a **2.3% CTR**. Location hubs win head
terms and distribute equity; service×location pages get the calls. Both are needed.

---

## Part 2 — Architecture

```
/service-area/toronto            (already existed — lists North York in areaServed)
   └── /areas/north-york                     ← BUILT: district hub
          ├── /service/tire-change/north-york       ← BUILT, indexable
          ├── /service/jump-start/north-york        ← BUILT, indexable
          ├── /service/lockout/north-york           ← BUILT, indexable
          ├── /service/mobile-mechanic/north-york   ← BUILT, indexable
          ├── /service/fuel/north-york              ← BUILT, noindex (wave 2b)
          └── /service/towing/north-york            ← BUILT, noindex (wave 2b)
```

Fuel and towing are written to the same standard but held in `NOINDEX_COMBOS`.
Reason: shipping six combos at once makes it impossible to tell which template is
working. Release them once the four priority pages have 30 days of GSC data.

### The geographic wedge

North York is not uniform, and ETA honesty is a ranking input (bad ETAs → bad
reviews → worse local ranking). With a unit stationed in the district:

| Sub-area | Distance from Scarborough base | Stated ETA band |
|---|---|---|
| Don Mills, Parkwoods, Victoria Village, Henry Farm | 8-12 km | fast end (~20 min) |
| Willowdale, Bayview Village, York Mills, Flemingdon Park | 12-18 km | middle |
| Lawrence Manor, Bathurst Manor, Newtonbrook, Armour Heights | 18-22 km | middle-long |
| Downsview, Humber Summit, Emery, Jane & Finch | 22-28 km | long end (~35 min) |

Every page states **20-35 minutes** and names which neighbourhoods sit at which
end of that range. Do not tighten this copy without a real dispatch reason.

### The GBP question — do not skip this

A stationed unit is **not** an eligible second GBP listing. Google's SAB rules
prohibit multiple listings covering overlapping service areas, and a parked van,
virtual office, or friend's driveway is not an address. Getting caught suspends
**both** listings, including the 4.9★ one that is the strongest asset in the
business. The downside is asymmetric.

Legitimate levers instead:
1. Expand the service area on the existing GBP to include North York.
2. GBP posts with geotagged photos from North York jobs.
3. **Reviews whose text names the neighbourhood** ("fixed my flat in Willowdale").
   Review text is a confirmed local relevance signal and is the one lever that
   genuinely extends effective radius. This is the highest-leverage item here.

---

## Part 3 — What was built (2026-07-20)

| File | Change |
|---|---|
| `data/cityContent.tsx` | `north-york` entry: 15 neighbourhoods, 9 highways, 10 landmarks, 6 FAQs, geo 43.7615/-79.4111. `testimonials: []` — deliberately empty pending real reviews. |
| `data/serviceCityContent.tsx` | `CityId` union extended; `north-york` added under all 6 services (the `Record<ServiceId, Record<CityId, …>>` type forces completeness). |
| `pages/CityPage.tsx` | Testimonials block now renders only when non-empty; `DISPATCH_ORIGIN` map replaces the hardcoded `'East GTA hub'` ternary; `PARENT_REGION` map fixes the breadcrumb so Toronto districts nest under `/service-area/toronto` instead of East GTA. |
| `pages/ServiceCityPage.tsx` + `scripts/prerender.mjs` | `fuel/north-york`, `towing/north-york` added to both `NOINDEX_COMBOS` lists (these must stay in sync). |
| `components/Footer.tsx` | North York added to the service-area column — site-wide equity to the new hub. |
| `public/sitemap.xml` | `/areas/north-york` + the 4 priority combos. |
| `services/geminiService.ts` | Chatbot told about the stationed unit, the east/west ETA spread, garage clearance, and the two garage exceptions (no fuel delivery in enclosed parking; garage tows need a winch to street level first). |

### Verification results

- **Build:** 72/72 routes prerendered, TypeScript clean.
- **Sitemap:** 47 URLs, no duplicates, no malformed entries, every URL has prerendered HTML.
- **Robots:** 4 priority combos + hub `index, follow`; fuel/towing `noindex, follow`.
- **Breadcrumbs:** North York and Scarborough now both nest under Toronto.
- **Content uniqueness vs the Scarborough equivalent** (trigram Jaccard on rendered text, 60% gate):

| Page | Words | Unique |
|---|---|---|
| `/areas/north-york` | 1609 | 75.8% |
| tire-change | 1434 | 77.0% |
| jump-start | 1371 | 82.7% |
| lockout | 1418 | 81.5% |
| mobile-mechanic | 1456 | 82.0% |
| fuel | 1220 | 77.9% |
| towing | 1328 | 79.5% |

Residual overlap is shared header/footer/CTA chrome and is unavoidable.

- **Quality gate:** 21 indexable location-type pages (4 region + 6 city + 11 service×city). Warning threshold is 30, hard stop 50. Releasing wave 2b takes this to 23. Ample headroom.

---

## Part 4 — What still needs doing (not code)

1. **Deploy.** Nothing is live yet.
2. **GBP service area** — add North York; add it to the business description.
3. **Review velocity with geo-language** — target 15+ North York-naming reviews by end of Q3. Highest-leverage item in the plan.
4. **Real job photos** — `cityContent.tsx` carries a standing TODO about stock imagery. North York launching with real North York photos beats every competitor's stock hero. The hub currently reuses `/roadside_assistance_help.jpg`.
5. **Backfill testimonials** — `CITY_CONTENT['north-york'].testimonials` is an empty array by design. Fill it with real Google reviews only.
6. **Blog posts** (proven pattern — `flat-tire-on-401-east-gta` is a top-5 page): "Flat Tire on the DVP or 401 Through North York", "Dead Battery in a Yonge Corridor Condo Garage", "Car Lockout at Yorkdale or Fairview Mall".
7. **Release wave 2b** — remove `fuel/north-york` and `towing/north-york` from both `NOINDEX_COMBOS` lists and add to sitemap, after 30 days of data on wave 2a.

---

## Part 5 — Measurement

Baseline is the Part 1 table. Capture GSC before deploying so attribution is clean.

| Metric | Baseline | 60 days | 120 days |
|---|---|---|---|
| Toronto-query clicks | 0 | 8+ | 25+ |
| `roadside assistance toronto` | pos 2.1, 0 clicks | top 3, clicks > 0 | top 3, 10+ clicks |
| North York query impressions | ~0 | 200+ | 800+ |
| URLs receiving impressions | 31 | 45+ | 55+ |
| GBP reviews naming North York | 0 | 8 | 20 |

**Leading indicators (weekly, no re-audit needed):**
- Impressions on any URL containing `north-york` — first signal, ~10 days after indexing
- Count of distinct queries containing "north york" — breadth of relevance
- `trackPhoneCall` sources: all new North York CTAs use `north_york_*` / `service_city_*_north-york_*` prefixes so Ads attribution stays legible

**How we'll know this failed:** if at 120 days the North York pages have
impressions but sit past position 20 with near-zero clicks, the constraint is
proximity and authority, not content. The correct response then is a real North
York premises (enabling a legitimate second GBP) or paid search for the district
— **not** more pages.

---

## Pre-indexing audit (2026-07-20) — two blockers found and fixed

Run before requesting indexing. Score at time of audit: **79/100, hold**.

### Blocker 1 — conflicting `aggregateRating` on the same URL (fixed)

Every page shipped two structured-data entities for the same business with
different review counts, plus two more numbers in visible copy:

| Source | Value |
|---|---|
| `AutomotiveBusiness` (index.html, patched by prerender) | 211 |
| `LocalBusiness` / `Service.provider` (hardcoded) | 94 |
| Visible badges | "94+" |
| Body copy | "146 five-star reviews" |
| `constants.GOOGLE_REVIEWS_COUNT` fallback | 195 |
| `regionContent.reviewBadge` | "90+" |

Two conflicting `aggregateRating` values on one URL breaks Google's
review-snippet policy and risks the rating being ignored or a manual action. The
business was also undercounting by 117 reviews.

**Fix:** `data/reviewStats.json` is now the single source of truth, refreshed by
`scripts/sync-reviews.mjs` which runs **before** `vite build` (the old
prerender-time fetch was too late — it patched only the static template while
SSR-rendered components kept the hardcoded value). `constants.tsx` reads the
JSON; every page, schema block, and body-copy claim reads the constants.
`prerender.mjs` now reads the same file instead of fetching independently.
Verified: exactly one review count (`211`) exists across all 72 prerendered pages.

### Blocker 2 — fabricated customer photos (fixed)

`CityPage`, `ServiceCityPage`, `RegionServiceAreaPage`, and
`MobileMechanicLanding` rendered `i.pravatar.cc` placeholder portraits with alt
text like `"North York customer"` / `"happy customer"`, positioned beside five
stars and a review count. Fabricated trust signals next to a review claim — an
E-E-A-T failure and a misleading representation under Canada's Competition Act.
Especially indefensible on the North York hub, where `testimonials` is
deliberately empty because there are no North York reviews yet.

**Fix:** replaced site-wide with the real Google rating and count. Also corrected
the label from `"{city} Area Reviews"` to `"Google Reviews"` — the reviews are
for the business, not that district. Verified: zero `pravatar` references in `dist/`.

### Also corrected

- `"211 five-star Google reviews"` → `"211 Google reviews"`. 211 is the total at a
  4.9 average, not 211 five-star reviews — the same class of overclaim.
- Hub meta description 218 → 177 chars; title 75 → 71. All service pages now 152-165.
- Removed the now-dead `reviewBadge` field from `RegionContent` rather than
  leaving a stale "90+" claim in the type.

### Clean at audit

Uniqueness 75.8-82.7%; one H1 per page; 4/4 OG tags; zero missing alt attributes;
NAP consistent across all 7 pages; schema parses valid; breadcrumbs nest under
Toronto; readability 20.4 avg words/sentence.

**Info only:** FAQPage schema no longer yields rich results (Google retired them
2026-05-07). Retained for AI/LLM citation value; no SERP benefit expected.

---

## Open issue — /mobile-mechanic duplicate (investigated 2026-07-21, deliberately NOT fixed)

`/mobile-mechanic` and `/service/mobile-mechanic` are near-duplicates:

| | `/mobile-mechanic` | `/service/mobile-mechanic` |
|---|---|---|
| `<title>` | identical | identical |
| `<meta description>` | identical | identical |
| Words | 1,344 | 1,325 |
| Body overlap | **76.1%** (trigram Jaccard) | |
| Canonical | self | **self** |
| Impressions / clicks (90d) | **1,070 / 17** | **0 / 0** |
| GSC status | indexed, ranking | **"Discovered – currently not indexed"**, `last_crawled: null` |

Both self-canonicalise, so Google gets no consolidation signal; it resolved the
conflict by never crawling one of them. This is the **only** duplicate title or
description pair on the site — all 72 pages were checked.

**Decision: leave it.** Google already picked the correct winner. The unindexed
page has no traffic to lose or gain, so the upside is housekeeping only. Against
17 organic clicks per quarter, review generation and the North York rollout are
worth far more attention.

If it is ever revisited, `/mobile-mechanic` must be the survivor — never
redirect a page with 1,070 impressions into one with zero. The minimal
zero-risk version is: drop `/service/mobile-mechanic` from `sitemap.xml` and
give it a distinct title/description. The canonical and 301 options solve a
problem Google has already solved in our favour. **Revisit only if
`/mobile-mechanic` starts losing position, or GSC flips which URL it shows.**

Note: `/blog/mobile-mechanic-cost-ontario-pricing-guide` also ranks for mobile
mechanic terms (`mobile mechanic hourly rate` pos 1, `how much does a mobile
mechanic cost` pos 2). That is **not** cannibalisation — informational intent vs
commercial. Leave it alone.

**Unverified thread worth picking up:** the business reports strong mobile
mechanic lead flow, but organic delivers only ~17 clicks/90 days to that page
(97 sitewide). The leads are therefore almost certainly coming from Google
Business Profile or Google Ads, not organic. Worth confirming which URL the Ads
point at — if they land on `/service/mobile-mechanic`, paid traffic is running
through the weaker page (irrelevant for indexing, relevant for Quality Score and
conversion tracking).

## Known issues (still open)

- ~~Chatbot is offline.~~ **Resolved by removal (2026-07-20).** The chatbot was removed at the owner's request as it wasn't in use, so the North York briefing added to `SYSTEM_INSTRUCTION` is gone with it. Note for the record: `CLAUDE.md` claimed the bot was broken by an env-var mismatch (`import.meta.env.VITE_GEMINI_API_KEY`), but the service actually read `process.env.GEMINI_API_KEY`, which `vite.config.ts` did define — so it was likely functional, and that doc note was stale. Recoverable from git history if it's ever wanted back.
- **Hero imagery is still stock.** `cityContent.tsx` carries a standing TODO. The North York hub reuses `/roadside_assistance_help.jpg`. Real North York job photos remain the single biggest available E-E-A-T upgrade.
