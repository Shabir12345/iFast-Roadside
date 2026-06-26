# SEO Roadmap & Recommendations

_Last updated: 2026-06-24_

This doc captures the link audit done on 2026-06-24, the strategic reasoning
behind our SEO priorities, and the to-do actions that follow from it. The core
conclusion: **iFAST has a crawl-budget / authority problem, not a page-count
problem. Adding more pages is the opposite of the fix.**

---

## 1. Link audit (2026-06-24)

Drove the live site through all 80 reachable URLs with Playwright.

- **55 pages work** — every URL in `public/sitemap.xml` renders correctly
  (home, `/mobile-mechanic`, 11 `/service/:id`, `/service-area/east-gta`,
  5 `/areas/:city`, `/blog`, 5 blog posts, 30 main-service × city combos).
- **25 pages were broken** — all "Page Not Found", all of the same shape:
  **sub-service × city** combos for `flat-tire-repair`, `spare-tire-change`,
  `tire-installation`, `battery-diagnostic`, `battery-replacement` × the 5
  cities.

### Root cause
`ServiceCityPage` renders "Page Not Found" when `SERVICE_CITY_CONTENT[id][city]`
is missing. That map only has content for the **6 top-level services**, but the
"Other Trusted Services" cross-link grid was built from
`SERVICES.filter(s => s.id !== id)` — which includes the 5 sub-services — so it
linked to 25 combo URLs that have no content. None of these URLs were in the
sitemap, so they were dead **internal links / soft-404s**, not orphaned sitemap
entries.

### Fix shipped (2026-06-24)
`ServiceCityPage.tsx` — cross-link grid now filters `!s.parent`, matching what
`CityPage.tsx` already did. The 25 dead links are gone. **Still needs to be
deployed** (build from `C:\Users\khati\ifast-build`, push to GitHub — Vercel
auto-deploys from `main`).

---

## 2. The strategic picture (why we are NOT adding pages)

GSC data (28 days, pulled 2026-06-24) drove this decision:

- Indexing is **patchy but progressing**. Home, `/areas/scarborough`,
  `/service/mobile-mechanic/pickering`, and blog posts are **indexed**. Several
  core pages (e.g. `/service/tire-change`, `/service/tire-change/scarborough`)
  are "**Discovered – currently not indexed**" with **last crawled: Never** —
  the signature of a young domain rationing crawl budget, not a quality penalty.
- **Unique content wins.** Impressions are dominated by blogs + home + core
  pages: `/blog/caa-vs-independent...` 719 impressions, home 892,
  `/blog/mobile-mechanic-cost...` 220, `/service/jump-start` 176. The templated
  combo pages pull only 4–25 impressions each — 50×+ less.

**Conclusion:** Google already crawls/indexes selectively and rewards our
genuinely useful pages. Adding 25 more near-identical programmatic pages would
(a) compete with good pages for scarce crawl budget, (b) extend the "discovered,
never crawled" queue, and (c) risk a "thin / doorway content" perception that
can drag the whole domain. Truly unique, valuable content for
"spare-tire-change in Whitby" vs "...in Ajax" barely exists — that effort has far
better ROI as more blog articles.

---

## 3. To-do / recommendations (priority order)

1. **[DONE 2026-06-24] Suppress the 25 dead sub-service × city links.** Deploy
   the `ServiceCityPage` fix.
2. **Request indexing for core pages stuck at "never crawled."** In GSC, push
   the 6 `/service/:id` pages and the combos that already get impressions
   (mobile-mechanic/pickering, tire-change/pickering, towing/pickering).
   Indexing is user-interactive — see [[ifast-publish-seo-page-workflow]].
3. **Invest content effort in BLOGS, not combos.** Blogs are our best
   performers and earn links. Ideas: winter prep, EV roadside, "what to do
   when…" guides, cost/comparison pieces (the CAA comparison is already our top
   impression-getter).
4. **Off-page authority — the real lever for local.** Google Business Profile
   reviews, local citations/directories with consistent NAP
   (name/address/phone), a few quality backlinks. This unlocks crawl budget and
   local-pack rankings far more than page count.
5. **Later, only once authority grows:** revisit whether the existing 30 combos
   deserve deeper, differentiated content — *before* ever adding new combo
   pages. Consider consolidating low-impression combos rather than expanding.

### Explicitly deferred / decided against
- **Building the 25 sub-service × city combo pages.** Decided against on
  2026-06-24 (see §2). Revisit only after the existing 55 are reliably indexed
  and domain authority has grown. Sub-services keep their working standalone
  `/service/:id` pages — only the city combos were dropped.
