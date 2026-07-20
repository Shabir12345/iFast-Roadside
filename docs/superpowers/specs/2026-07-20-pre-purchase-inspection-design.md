# Pre-Purchase Inspection Sub-Service — Design

**Date:** 2026-07-20
**Status:** Approved for planning

## Goal

Add a mobile **pre-purchase inspection** (PPI) service page at
`/service/pre-purchase-inspection`, targeting used-car buyers in the GTA who
want an independent mechanic to check a car before they pay for it.

The site already ranks a customer-story blog post on this topic
(`pre-purchase-car-inspection-ajax`, Ifeyinwa Blessing). That post captures
informational intent. This page captures the commercial-intent searches
("pre purchase inspection Toronto", "used car inspection near me") that a blog
post cannot.

## Placement

Sub-service of **Mobile Mechanic** (`parent: 'mobile-mechanic'`), following the
existing sub-service pattern used by the tire and battery groups.

Rejected alternatives:

- **Seventh top-level service card.** Breaks the 3-column grid at 7 cards, and
  it is the only non-emergency service in a section headed "Whatever Stopped
  You, We Fix It Where You're Stuck." A used-car buyer is not stranded.
- **Blog content only.** Cannot capture commercial-intent traffic.

Consequences of the sub-service choice: the page appears as an "Also available"
chip under the Mobile Mechanic card on the homepage (`components/Services.tsx`
already renders these automatically from `parent`), and is excluded from the
Header and Footer service lists, which both filter on `!s.parent`. No component
changes are required.

## Copy commitments

These are firm. They come from the business owner and must not be softened or
embellished during implementation.

1. **No iFAST price anywhere.** No stated or implied price for our inspection —
   not in the page copy, the FAQs, the meta description, or the chatbot. Every
   CTA is "call for a quote." Clarified 2026-07-20 by the business owner:
   illustrative dollar figures that are plainly *not* our rate are allowed and
   intentional — the value of the used car being inspected (a $4,000 commuter
   or a $40,000 SUV) and the cost of a seller's own code reader (a $20
   scanner). The rule bans quoting **our** price, not the use of numbers. The
   pricing FAQ answers honestly — we quote on the call once we know the
   vehicle and location — rather than dodging the question.
2. **Deliverable is a verbal walkthrough plus OBD diagnostic scan results.**
   The customer gets an on-site plain-English verdict from the technician and
   the stored trouble codes read off the scanner. **Do not promise a written
   report, a PDF, a photo report, or a certificate** — the business does not
   currently send one.
3. **No Safety Standards Certificate claims.** An Ontario SSC requires a
   licensed Motor Vehicle Inspection Station. This service is not that, and the
   page must not imply it is. If the topic comes up in an FAQ, state plainly
   that a PPI is not an SSC.

## Files to change

### 1. `constants.tsx` — `SERVICES` array

New entry appended to the sub-service section:

```
id:          'pre-purchase-inspection'
title:       'Pre-Purchase Car Inspection'
description: buyer-facing, ~2 sentences, matching the weight of the existing
             sub-service descriptions
icon:        ClipboardCheck (lucide-react — add to the import at line 1)
parent:      'mobile-mechanic'
```

### 2. `data/serviceContent.tsx` — `SERVICE_CONTENT` map

New entry keyed `'pre-purchase-inspection'`. Same shape as the existing
`battery-diagnostic` entry:

- `seoTitle` / `seoDescription` / `keywords` — targeting *pre purchase
  inspection Toronto*, *used car inspection GTA*, *mobile car inspection near
  me*, *car inspection before buying Ontario*, plus the East-GTA city names.
- `heroImage: '/mobile_mechanic_hero.jpg'` — reused deliberately. The existing
  Ajax blog post already uses this image for the same topic, so no new asset is
  needed.
- `blogSections` — four sections:
  1. What a mobile pre-purchase inspection is and how it works (we come to the
     car — private driveway, dealer lot, workplace garage).
  2. What the inspection covers: engine start-up and idle, OBD diagnostic scan
     for stored codes, fluids, battery and charging, brakes, tires, suspension,
     lights, and the visual tells of past accident repair.
  3. What it catches that a test drive never will — the argument for buying the
     inspection at all.
  4. Independence: we are not the seller and have no stake in the sale.
- `faqs` — six questions, including: what does it cost (we quote on the call),
  how long does it take, do you come to a dealership, is this a Safety
  Standards Certificate (no), what if you find problems, how soon can you book.

Every section ends with a `CallNowButton` using a
`service_content_pre-purchase-inspection_<section>` source label, matching the
convention in the surrounding entries.

### 3. `public/sitemap.xml`

Add `https://www.ifastroadside.ca/service/pre-purchase-inspection` alongside the
other sub-service URLs (same `changefreq` and `priority` as
`battery-diagnostic`), with `lastmod` 2026-07-20.

This is also what gets the page prerendered: `scripts/prerender.mjs` builds its
route list from `sitemap.xml`, so no change to the prerender script is needed.

### 4. `services/geminiService.ts`

Add a line to the `SERVICES & PRICING` block of `SYSTEM_INSTRUCTION`:

```
- Pre-Purchase Car Inspection (used car buyers): call for a quote
```

No dollar figure, per copy commitment 1.

### 5. Internal linking

- The new service page links to the `pre-purchase-car-inspection-ajax` blog post
  as a real customer story.
- The blog post links to the new service page.

## Out of scope

- `/service/pre-purchase-inspection/:city` combo pages.
- New city or region content.
- Any Safety Standards Certificate / MVIS offering.
- New hero imagery.

## Verification

- `npm run build` succeeds (this is how TypeScript errors surface — there is no
  separate typecheck).
- `/service/pre-purchase-inspection` renders with hero, all four sections, and
  the FAQ accordion.
- The "Also available" chip row on the Mobile Mechanic homepage card shows the
  new page and links to it.
- `dist/service/pre-purchase-inspection/index.html` exists after the build and
  contains the `Service` and `FAQPage` JSON-LD.
- No iFAST price appears anywhere in the new page's rendered HTML (illustrative
  figures for the car's value or a seller's scanner are fine, per copy
  commitment 1).
