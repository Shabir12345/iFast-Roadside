# Service Page Differentiation — Design

**Date:** 2026-07-25
**Goal:** Get the 11 non-mobile-mechanic service pages crawled, indexed, and ranking, so they generate phone calls — without disturbing the `/mobile-mechanic` traffic that currently works.

## Problem

Eight of twelve service pages have **never been crawled by Google**. Verified via GSC URL Inspection on 2026-07-25:

| Page | Coverage state | Last crawled |
|---|---|---|
| /service/tire-change | Discovered – not indexed | Never |
| /service/lockout | Discovered – not indexed | Never |
| /service/towing | Discovered – not indexed | Never |
| /service/battery-replacement | Discovered – not indexed | Never |
| /service/battery-diagnostic | Discovered – not indexed | Never |
| /service/tire-installation | Discovered – not indexed | Never |
| /service/mobile-mechanic | Discovered – not indexed | Never |
| /service/flat-tire-repair | Unknown to Google | Never |

Indexed and earning impressions: `/mobile-mechanic`, `/service/jump-start`, `/service/fuel`,
`/service/spare-tire-change`, `/service/pre-purchase-inspection`.

### Causes ruled out

- **Not a rendering problem.** `scripts/prerender.mjs` renders every sitemap route to static
  HTML at build time. Crawlers get full markup without executing JS.
- **Not a sitemap problem.** Sitemap status Valid, 0 errors, last downloaded 2026-07-21.
- **Not a URL-depth problem.** `/service/jump-start` is indexed at position 9.4 with 479
  impressions; `/service/tire-change/scarborough` and `/areas/scarborough` are also indexed.
  Google indexes `/service/*` URLs on this site perfectly well when it crawls them.
- **Not a content-volume problem.** `/service/tire-change` has the most long-form content on
  the site (16.5k chars vs mobile-mechanic's 7.8k) and is still uncrawled.
- **Not an unrequested-indexing problem.** `scripts/request-indexing.cjs` shows tire-change,
  lockout, and /service/mobile-mechanic were submitted on 2026-07-02. Fuel was crawled the
  next day and indexed; the other three were never fetched at all.

### Actual cause

Google is declining to spend crawl budget on pages it judges to be near-duplicate templated
boilerplate. `ServicePage.tsx` wraps each service's unique content in identical scaffolding:

| Element | Current value |
|---|---|
| H1 | `{title} At Your Location in ~30 Min` |
| Intro | `{description}` + identical boilerplate sentence |
| Trust block | Same three bullets on all 11 pages |
| Final CTA | `Need {title} Built on Trust?` — renders as *"Need Emergency Towing Built on Trust?"* |

`MobileMechanicLanding.tsx` differs only in having **hand-written, intent-matched copy**
(bespoke H1, intro, four feature cards, CTA). It has no structural or content advantage —
`ServicePage` actually renders *more* sections, and both read `blogSections` and `faqs` from
the same `SERVICE_CONTENT` map.

## Approach

Extend `SERVICE_CONTENT` with **optional** per-service copy fields. `ServicePage` renders them
when present and falls back to today's templated strings when absent. No new components, no URL
changes, no migration risk, and services can be filled in one at a time by priority.

### Data model

```ts
// data/serviceContent.tsx — added to the ServiceContent interface, all optional
hero?: {
  eyebrow: string;    // e.g. "Roadside Tire Emergency"
  h1: string;         // e.g. "Flat Tire? We Come to You."
  h1Accent: string;   // gradient-highlighted second line
  intro: string;      // hand-written, intent-matched
};
features?: {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;      // Tailwind bg class, e.g. 'bg-red-500'
}[];
cta?: {
  heading: string;
  body: string;
};
```

### Rendering rules in `ServicePage.tsx`

- H1: `contentData.hero?.h1` and `hero.h1Accent`, else current templated H1.
- Eyebrow badge: `contentData.hero?.eyebrow`, else current `Live Dispatch: Ready Now`.
- Intro paragraph: `contentData.hero?.intro`, else current `{description}` + boilerplate.
- Feature grid: render only when `contentData.features` exists (new section, mirrors the
  mobile-mechanic "Complete On-Site Solutions" block). Omitted entirely when absent.
- Footer CTA: `contentData.cta?.heading` / `cta.body`, else current templated strings.

A service with none of these fields renders byte-identically to today.

## Build order

Ranked by 90-day GSC demand (2026-04-27 → 2026-07-25), brand and CAA-research queries excluded:

| # | Service | Impressions | Clicks | Best position | Status |
|---|---|---|---|---|---|
| 1 | tire-change (+ flat-tire-repair, tire-installation, spare-tire-change) | 661 | 1 | 10–15 | never crawled |
| 2 | jump-start (+ battery-diagnostic, battery-replacement) | 463 | 3 | 4.3 | partial |
| 3 | towing | 23 | 0 | 18–25 | never crawled |
| 4 | lockout | 3 | 0 | 41 | never crawled |
| 5 | fuel, pre-purchase-inspection | ~3 | 0 | — | indexed |

**Caveat:** for towing and lockout, low impressions are partly a symptom of never being
crawled, not proof of no market demand. Treat their true demand as higher than the table shows.

**Phasing:** Phase 1 ships tire + battery only. Confirm in GSC that crawls land before
investing in phases 2–3. This is the risk gate on the whole approach — if rebuilt copy does not
get tire-change crawled within ~2 weeks, the diagnosis is wrong and the remaining phases should
be reconsidered rather than executed.

## Indexation work

- Differentiate sitemap `priority` (all 11 service pages are currently an identical `0.9`) and
  refresh `lastmod` — **only after** a page's copy is rebuilt, so a re-crawl finds new content.
  Concrete values, assigned by the demand ranking above: `0.9` for tire-change and jump-start;
  `0.8` for towing, lockout, battery-replacement, battery-diagnostic, flat-tire-repair,
  tire-installation, spare-tire-change; `0.7` for fuel and pre-purchase-inspection.
  `/` stays `1.0` and `/mobile-mechanic` stays `0.95`.
- Re-run `scripts/request-indexing.cjs` with the URL list reordered to the priority above,
  per rebuilt page.
- 301 `/service/mobile-mechanic` → `/mobile-mechanic` in `vercel.json`, and remove it from
  `public/sitemap.xml` (which also removes it from prerender, since prerender derives its route
  list from the sitemap).

## Internal linking

- Add a `serviceHref(id)` helper: returns `/mobile-mechanic` for the `mobile-mechanic` id and
  `/service/${id}` for everything else. Apply in `Header.tsx`, `Footer.tsx`, `Services.tsx`,
  and `BlogPost.tsx`. This routes existing internal links to the canonical page directly instead
  of through a 301, and increases the internal link count to `/mobile-mechanic`.

**Correction (2026-07-25, after implementation review):** an earlier draft of this spec called
for replacing a "blanket all-services list" in `BlogPost.tsx` with a curated topical mapping.
That was wrong — `BLOG_RELATED_SERVICES` (`data/blogContent.tsx:2211`) is already exactly that
curated per-slug mapping, and `BlogPost.tsx:38` already consumes it. No work is needed here
beyond applying `serviceHref()`.

This correction strengthens the diagnosis rather than weakening it. `/service/tire-change`
already receives contextual in-body links from four blog posts
(`flat-tire-on-401-east-gta`, `winter-roadside-emergencies-ontario-guide`,
`correct-tire-pressure-scarborough`, `tire-patch-repair-scarborough`), three of which are
themselves indexed and earning impressions — and Google has still never crawled it. Contextual
internal linking is therefore **already in place and already insufficient**. Copy
differentiation is the remaining untried lever, which is what Phase 1 tests.

## Guardrails on /mobile-mechanic

Non-negotiable constraints, per user requirement that current mobile-mechanic traffic is not disturbed:

- `pages/MobileMechanicLanding.tsx` — not modified.
- `/mobile-mechanic` URL, canonical tag, and sitemap entry — not modified.
- `SERVICE_CONTENT['mobile-mechanic']` — not modified. New fields are optional; this entry does
  not receive them.
- **Verification gate:** capture `dist/mobile-mechanic/index.html` before and after the change
  and diff. If it is not byte-identical, stop and investigate before shipping.

## Verification

1. `npm run build` passes. The prerender script already fails the build on any route rendering
   under 500 chars, which catches a broken `SERVICE_CONTENT` entry.
2. Prerender emits all sitemap routes with no failures.
3. `dist/mobile-mechanic/index.html` byte-identical before vs. after.
4. Spot-check a rebuilt page's prerendered HTML contains the new bespoke H1 and CTA copy.
5. Post-deploy: re-inspect coverage in GSC after ~1 week to confirm crawls are landing on the
   rebuilt pages.

## Out of scope

- Moving any service to a top-level URL. Evidence shows URL depth is not the constraint, and
  migration would risk the ~570 impressions the four currently-indexed service pages earn.
- Rewriting `blogSections` or `faqs` content. Those are already unique per service and are not
  the problem.
- Any change to the CAA-comparison blog post, GBP configuration, or Google Ads.
