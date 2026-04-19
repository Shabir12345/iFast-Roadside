# [C] SEO Plan — iFAST Roadside

Research + structure + implementation plan for ranking #1 in East GTA roadside search.

---

## Confirmed scope (2026-04-18)

- **GBP:** Verified, 4.9 ⭐ / 94 reviews. Strong starting point.
- **Actual address:** 20 Antrim Crescent, **Scarborough, ON M1P 4N3**
- **GBP primary category:** Tire service (⚠️ see critical fix #2 below)
- **Geographic scope:** East GTA only — Scarborough (home base) + Pickering, Ajax, Whitby, Oshawa
- **Content budget:** 30-80 pages, with guided implementation

---

## 🚨 Critical fixes — do these before building pages

### 1. NAP inconsistency (fix today)
Site's `LocalBusiness` JSON-LD in `index.html` says Pickering L1V. GBP says Scarborough M1P 4N3. This inconsistency actively suppresses local ranking. Update `index.html` schema to match GBP exactly: street address, city, postal code, geo-coordinates for Scarborough (43.7532° N, 79.2856° W approx for M1P 4N3).

### 2. GBP primary category is too narrow
Primary = "Tire service". This caps relevance for non-tire queries (jump start, lockout, towing, fuel). Two options:
- **If tire is 70%+ of revenue**: keep Tire primary, add "Roadside assistance service", "Towing service", "Auto locksmith" as secondaries
- **If roadside is the bigger business**: swap to "Roadside assistance service" primary, Tire secondary
- Decide with Shabir based on actual revenue split.

### 3. Home base is Scarborough, not equal-weight across 5 cities
Google ranks service-area businesses by proximity to searcher. Scarborough gets easiest rankings; Oshawa (furthest, ~40km) is hardest. Implications:
- Scarborough is the anchor — deepest content, neighborhood-level pages
- Further cities (Oshawa, Whitby) need stronger "we actively service here" signals: local testimonials from that city, job photos tagged there, a visible dispatch note ("unit stationed at [landmark]")

---

## TL;DR — The three things that actually move rankings

1. **Google Business Profile + reviews** drives ~70% of local pack ranking. GBP is already strong (94 reviews, 4.9⭐) — goal now is to keep review velocity going (target 150+ by end of year) and fix the category + NAP issues above.
2. **Service × City landing pages** are the structural win. Current site has 5 service pages + 1 area page (~6 indexable). Top competitors have 25-60. This is the biggest gap.
3. **Winter tire swap** is the single highest-value seasonal keyword in GTA/Durham. It's largely missing from the site.

---

## Keyword map

### Core service terms (commercial intent, high volume)
| Service | Primary terms | High-intent modifiers |
|---|---|---|
| Tire | mobile tire service, mobile tire repair, mobile tire change, flat tire repair, flat tire near me | 24/7, emergency, at home, on-site |
| Seasonal tire (big) | winter tire swap, seasonal tire change, tire swap at home, mobile tire swap | mobile, home, driveway |
| Battery | battery boost, jump start, car battery service, dead battery | 24 hour, near me, emergency |
| Lockout | car lockout service, car unlock, locked keys in car, vehicle unlock | 24/7, cheap, damage-free |
| Fuel | fuel delivery, gas delivery, out of gas, emergency fuel | near me, 24 hour |
| Towing | emergency towing, tow truck, flatbed tow, 24 hour towing | cheap, near me, accident |
| Umbrella | roadside assistance, 24/7 roadside, emergency roadside help | near me, 24 hour |

### Locations (priority order)
**Tier 1 (core 5):** Pickering · Ajax · Whitby · Oshawa · Scarborough
**Tier 2 (expansion):** Bowmanville · Courtice · Clarington · Durham Region (regional term)
**Tier 3 (Scarborough neighborhoods):** Agincourt · Malvern · Woburn · Rouge · Birchmount

### The winning keyword formula
`[service] + [modifier] + [city]` — e.g. "mobile tire repair Pickering", "24 hour jump start Ajax", "winter tire swap Whitby at home"

### Keywords to AVOID targeting
DIY content ("how to change a tire") — these readers won't call. Skip informational unless it funnels to commercial intent.

---

## Site structure — recommended page architecture

Current: ~7 pages. Recommended: **~45 pages** (full build) or **~20 pages** (lean build).

### Tier 1 — Core (already mostly built)
- Home `/`
- 5 service pages `/service/:id` ✓ exist
- 1 East GTA area page ✓ exists
- About, Contact, Privacy, Terms (missing — needed for trust + E-E-A-T)

### Tier 2 — City pages (5 new pages)
One dedicated page per Tier-1 city. Each 800-1200 words, with local signals: highways (401, 407, 412), neighborhoods, landmarks, response time for that specific city, localized testimonial, embedded map, area-specific FAQ.

- `/areas/pickering`
- `/areas/ajax`
- `/areas/whitby`
- `/areas/oshawa`
- `/areas/scarborough`

### Tier 3 — Service × City combo pages (25 new pages, biggest SEO win)
This is where competitors either win or lose. Each combines a service + a city — e.g. "Mobile Tire Repair in Pickering". Must be genuinely different per page, not templated copy-paste (Google demotes thin doorway pages).

- `/service/tire-change/pickering`, `/ajax`, `/whitby`, `/oshawa`, `/scarborough`
- `/service/jump-start/{city}` × 5
- `/service/lockout/{city}` × 5
- `/service/fuel/{city}` × 5
- `/service/towing/{city}` × 5

**Per-page uniqueness requirement:** local hero image or testimonial, city-specific pricing note if applicable, city-specific response time, city-specific highways/neighborhoods, unique H1 and meta.

### Tier 4 — Seasonal / high-value specialty pages (2-4 pages)
- `/winter-tire-swap` — huge Oct-Dec search spike in GTA
- `/seasonal-tire-change` (or merge with above)
- `/tesla-mobile-tire-service` — premium segment, Sparky X ranks well on this
- Optional: `/commercial-fleet-roadside`

### Tier 5 — Blog / content hub (10-15 posts, long-tail SEO)
Commercial-informational hybrid. Each post links into service pages.
- "What to do if you get a flat tire on the 401"
- "Winter tire deadline Ontario [year]"
- "How much does a jump start cost in Toronto?"
- "Locked out of car in winter — what to do"
- "Cheapest roadside assistance options Durham Region"
- Plus 5-10 more.

### Supporting technical pages
- `/sitemap.xml` (auto-generate on build)
- `/robots.txt`
- `/404` with call CTA

---

## Technical SEO checklist (most are not done yet)

- [ ] **Sitemap.xml** — auto-generated, submitted to Search Console
- [ ] **robots.txt** — allow all, point to sitemap
- [ ] **Google Search Console** verified + sitemap submitted
- [ ] **Bing Webmaster Tools** verified (5-10% of local traffic)
- [ ] **Core Web Vitals**: current site loads Tailwind CDN + Google Fonts blocking → LCP will be poor. Move Tailwind to build step (Vite plugin) and self-host Inter font.
- [ ] **Image optimization**: serve WebP, proper sizing, `loading="lazy"` on below-fold images
- [ ] **LocalBusiness schema** ✓ already in `index.html` — but needs `aggregateRating` added once reviews flow
- [ ] **Service schema** ✓ already dynamic on service pages
- [ ] **BreadcrumbList schema** — missing, add on every non-home page
- [ ] **Review schema** — missing, add once Google reviews can be syndicated
- [ ] **Canonical tags** — partially done, verify every page has one
- [ ] **Mobile-first**: site is mobile-friendly but test Lighthouse on 4G
- [ ] **HTTPS + HSTS** — Vercel handles
- [ ] **hreflang** — not needed (English-only, single region)
- [ ] **Internal linking**: every service page should link to its 5 city variants; every city page should link to its 5 service variants (creates a hub-spoke graph)

---

## Off-site / local signals (do these in parallel)

These aren't website changes but they matter more than the website:

- [ ] **Google Business Profile**: verify, complete 100%, add service list matching site, upload 20+ real job photos
- [ ] **Review generation**: target 50+ Google reviews in 90 days. SMS follow-up after each job is the highest-ROI tactic.
- [ ] **NAP consistency** (Name/Address/Phone): audit citations on Yelp, YellowPages.ca, Foursquare, 411.ca, Apple Maps, Bing Places — ensure exact match
- [ ] **Local citations**: Durham Region Chamber of Commerce, BBB, local auto forums
- [ ] **Backlinks**: partnerships with local auto shops, dealerships, insurance brokers — guest posts or reciprocal mentions

---

## Implementation plan — phased

### Phase 1 — Foundation (Week 1)
Blocking prerequisites. Do these first, nothing else matters if these are broken.

1. Fix Gemini env var bug (already flagged in CLAUDE.md)
2. Move Tailwind from CDN to Vite build step — fixes LCP
3. Self-host Inter font — fixes render-blocking
4. Add sitemap generator (Vite plugin or simple script)
5. Add robots.txt
6. Verify Google Search Console + submit sitemap
7. Audit + complete Google Business Profile

### Phase 2 — City pages (Week 2-3)
5 new pages. Each genuinely unique, 800-1200 words. Template-able data model but hand-written content blocks per city.

1. Create `pages/CityPage.tsx` + data file `data/cityContent.tsx`
2. Add route `/areas/:city`
3. Write content for all 5 cities (this is the time sink — ~3-4 hours per city done right)
4. Add `BreadcrumbList` schema
5. Cross-link from homepage + service pages

### Phase 3 — Service × City combo pages — ✅ COMPLETE (2026-04-18)
25 combo pages live at `/service/:id/:city`.

1. ✅ Created `ServiceCityPage.tsx` with JSON-LD (Service + LocalBusiness provider + BreadcrumbList + FAQPage)
2. ✅ Data model `data/serviceCityContent.tsx` keyed by `[serviceId][cityId]` — 25 entries
3. ✅ Each combo has unique H1, meta, intro + localScenario + uniqueAngle (3 distinct paragraphs referencing real streets/landmarks), pricing note, 3 FAQs
4. ✅ Route wired in `App.tsx`, sitemap updated with all 25 URLs
5. ✅ Cross-links: ServicePage now has "Pick Your City" grid; CityPage service grid links to combo pages; ServiceCityPage cross-links other services in same city + back to city overview

### Phase 4 — Seasonal + specialty (Week 5-6)
1. Winter tire swap landing page (target Oct-Dec traffic)
2. Tesla mobile tire page (if relevant)
3. Update homepage to feature seasonal CTAs

### Phase 5 — Blog + long-tail (Ongoing)
1. Set up MDX or markdown content pipeline
2. 2 posts/month, targeting long-tail keywords with clear commercial angles
3. Each post links to 2-3 service pages

### Phase 6 — Trust pages + polish (Week 6+)
1. About page (with real team photos, real story — Google's E-E-A-T signals)
2. Contact page (with real service area map)
3. Privacy + Terms (legal, required for ads)
4. Add review syndication once GBP has 20+ reviews

---

## Success metrics

Track in Search Console + GA4 + GBP Insights:

- **Impressions** for target keywords (leading indicator, weeks 2-6)
- **Clicks** to service and city pages (weeks 4-8)
- **Local pack appearances** for `[service] + [city]` queries (weeks 6-12)
- **Phone call conversions** via gtag (already tracked) — the only metric that pays bills
- **Google Business Profile calls + direction requests** (GBP Insights)

Realistic timeline: meaningful local ranking improvement in 8-12 weeks. Page 1 for core commercial keywords in 4-6 months. Top 3 for most queries requires consistent reviews + backlinks over 6-12 months.

---

## Open questions — resolved (2026-04-18)

| Question | Answer |
|---|---|
| GBP status | ✅ Verified, 4.9⭐, 94 reviews, 24-hr, Scarborough M1P 4N3 |
| Geographic scope | East GTA only — no West GTA expansion |
| Content budget | 30-80 pages, with guided content support |
| Real job photos | ⏳ Need to ask — Shabir to provide |
| Reviews for display | ✅ 94 Google reviews available — can pull snippets |

## Still need from Shabir before Phase 2

1. **GBP category decision**: is tire or roadside the bigger revenue driver? (Determines primary category.)
2. **Real photos**: 20-30 job site photos (tires, trucks, technicians at work, in different cities if possible). Stock-only tanks trust and rankings.
3. **City pricing differences**: is pricing different in Scarborough vs. Oshawa (due to travel distance)? If yes, each city page notes it.
4. **Service technician names + photos**: 1-3 real team members for About page. E-E-A-T signals matter more in 2026 than they did.
5. **Review access**: can we syndicate GBP reviews onto the site, or write our own testimonial copy from public review snippets? (Legally you can quote public reviews with attribution.)
