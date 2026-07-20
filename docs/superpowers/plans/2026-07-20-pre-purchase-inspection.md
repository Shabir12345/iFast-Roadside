# Pre-Purchase Inspection Sub-Service Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a mobile pre-purchase inspection service page at `/service/pre-purchase-inspection`, listed as a sub-service of Mobile Mechanic, targeting used-car buyers in the GTA.

**Architecture:** No new components. The site already renders sub-services generically: `components/Services.tsx` groups by the `parent` field, `pages/ServicePage.tsx` renders `SERVICE_CONTENT[id]` and emits `Service` + `FAQPage` JSON-LD from it, and `scripts/prerender.mjs` derives its route list from `public/sitemap.xml`. This feature is therefore four data edits plus internal links.

**Tech Stack:** React 19, TypeScript, Vite 6, React Router v7, react-helmet-async, lucide-react. Tailwind via CDN with brand colors configured inline in `index.html`.

**Testing note:** This repo has **no test runner, linter, or formatter**. Do not add one. Verification is `npm run build` (which is also the only TypeScript check — Vite surfaces TS errors there) plus assertions against the prerendered HTML in `dist/`. Every task below ends with a real command and an expected result.

**Spec:** `docs/superpowers/specs/2026-07-20-pre-purchase-inspection-design.md`

## Global Constraints

These apply to every task. They are business commitments, not style preferences.

- **No price anywhere.** No dollar figure in page copy, FAQs, meta description, or the chatbot instruction. CTAs say "call for a quote." The pricing FAQ answers honestly ("we quote on the call once we know the vehicle and where it is"), it does not dodge.
- **Deliverable is a verbal walkthrough plus OBD diagnostic scan results only.** Never promise a written report, PDF, photo report, emailed summary, or certificate.
- **No Safety Standards Certificate (SSC) claims.** An Ontario SSC requires a licensed Motor Vehicle Inspection Station. State plainly in the FAQ that this service is not an SSC.
- **Every phone CTA must call `trackPhoneCall(source)`.** In `data/serviceContent.tsx` this is handled by the local `CallNowButton` component — use it, do not hand-roll a `tel:` link. Source labels follow `service_content_pre-purchase-inspection_<section>`.
- **Use brand color classes** (`bg-brand-yellow`, `text-brand-dark`, `text-brand-yellow`), never raw hex.
- **Service ID is exactly `pre-purchase-inspection`** in all five places it appears: `constants.tsx`, `data/serviceContent.tsx`, the sitemap URL, and both internal links. A mismatch between the first two silently renders a blank page (`ServicePage` does `if (!contentData) return null`).

---

### Task 1: Service entry and page content

This is one task, not two: `constants.tsx` drives the route and the homepage chip, `SERVICE_CONTENT` drives the page body, and a half-done pair renders either a 404 or a blank page. They ship together.

**Files:**
- Modify: `constants.tsx:1` (icon import) and `constants.tsx:169` (append to `SERVICES`)
- Modify: `data/serviceContent.tsx:1130` (append to `SERVICE_CONTENT`, after the `battery-replacement` entry)

**Interfaces:**
- Consumes: `ServiceItem` from `types.ts` (`{ id, title, description, icon, parent? }`); `ServiceContent` from `data/serviceContent.tsx` (`{ id, seoTitle, seoDescription, keywords, heroImage, blogSections: {title, content}[], faqs: {question, answer}[] }`); the local `CallNowButton` component already defined at the top of `data/serviceContent.tsx`.
- Produces: route `/service/pre-purchase-inspection`, consumed by Tasks 2 and 4.

- [ ] **Step 1: Add the `ClipboardCheck` icon to the lucide import**

In `constants.tsx` line 1, add `ClipboardCheck` to the existing import:

```tsx
import { Disc, Battery, Fuel, Key, Truck, Wrench, RefreshCw, CircleDot, Gauge, BatteryCharging, ClipboardCheck } from 'lucide-react';
```

(Verified present in the installed `lucide-react@0.574.0`.)

- [ ] **Step 2: Append the service entry**

In `constants.tsx`, inside the `SERVICES` array, after the `battery-replacement` entry (the last one, currently ending at line 169) add a comma to that entry's closing brace and append:

```tsx
  // --- Mobile mechanic sub-services ---
  {
    id: 'pre-purchase-inspection',
    title: 'Pre-Purchase Car Inspection',
    description: 'Buying a used car? Before you hand over the money, we send a certified mechanic to the car — private driveway, dealer lot, or parking garage — for a full inspection and diagnostic scan, plus an honest verdict on what you\'re actually buying.',
    icon: ClipboardCheck,
    parent: 'mobile-mechanic',
  }
```

- [ ] **Step 3: Verify the route resolves and the chip appears**

Run: `npm run dev`, then open `http://localhost:3000/`.
Expected: the **Mobile Mechanic** card now shows a "Pre-Purchase Car Inspection" chip under "Also available". Clicking it navigates to `/service/pre-purchase-inspection`, which renders the breadcrumb and title but **no body content** — `SERVICE_CONTENT` has no matching key yet. That blank body is the expected intermediate state; Step 4 fixes it.

- [ ] **Step 4: Append the page content**

In `data/serviceContent.tsx`, add a comma after the closing `}` of the `battery-replacement` entry (currently line 1130, just before the final `};`) and append this entry:

```tsx
  'pre-purchase-inspection': {
    id: 'pre-purchase-inspection',
    seoTitle: 'Mobile Pre-Purchase Car Inspection GTA | Used Car Check Before You Buy',
    seoDescription: 'Buying a used car in the GTA? iFAST sends a certified mobile mechanic to the car — engine, brakes, tires, suspension, and a full OBD diagnostic scan — with a straight verdict before you pay. Toronto, Scarborough, Pickering, Ajax, Whitby, Oshawa. Call for a quote.',
    keywords: 'pre purchase inspection Toronto, used car inspection GTA, mobile car inspection near me, pre purchase car inspection Scarborough, used car inspection Pickering, car inspection before buying Ontario, mobile mechanic inspection Ajax, independent used car inspection Whitby, vehicle inspection before buying Oshawa',
    heroImage: '/mobile_mechanic_hero.jpg',
    blogSections: [
      {
        title: 'Mobile Pre-Purchase Car Inspection — We Come to the Car, Anywhere in the GTA',
        content: (
          <>
            <p className="mb-4">
              You found a used car on Marketplace, Kijiji, or a dealer lot. The photos look clean, the seller sounds honest, and the price is good enough to make you nervous. Before any money changes hands, get someone on your side under the hood. <strong>{COMPANY_NAME}</strong> brings the inspection <strong>to the car</strong> — a private seller's driveway in Scarborough, a dealership lot in Ajax, a condo parking garage in North York. You don't have to talk the seller into driving anywhere, which is the step where most buyers give up and just hope for the best.
            </p>
            <p className="mb-4">
              A certified mobile mechanic meets you at the vehicle, works through it end to end, plugs in a diagnostic scanner, and then walks you through exactly what he found in plain English — what's fine, what needs attention soon, and what should make you walk away. You hear it standing at the car, while you still have every option open.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_intro" />
          </>
        )
      },
      {
        title: 'What We Check On a Pre-Purchase Inspection',
        content: (
          <>
            <p className="mb-4">
              This is the same checklist we bring to every pre-purchase call, whether the car is a $4,000 commuter or a $40,000 SUV:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Engine Start-Up &amp; Idle Behaviour</strong>: How it starts cold, how it idles, what it sounds like, and whether anything is smoking, ticking, or leaking.</li>
              <li><strong>OBD Diagnostic Scan</strong>: We plug in and read the stored and pending trouble codes — including codes a seller may have cleared recently, which is its own red flag.</li>
              <li><strong>Fluids</strong>: Oil, coolant, transmission, and brake fluid levels and condition. Burnt transmission fluid or oil mixed with coolant changes the whole conversation.</li>
              <li><strong>Battery &amp; Charging System</strong>: Battery health and alternator output, so a no-start two weeks after purchase isn't your first surprise.</li>
              <li><strong>Brakes</strong>: Pad and rotor condition, and how the car behaves stopping — often the single biggest "it needs work immediately" item on a used car.</li>
              <li><strong>Tires &amp; Suspension</strong>: Tread depth, age, uneven wear patterns that point to alignment or suspension problems, plus shocks, struts, and bushings.</li>
              <li><strong>Lights &amp; Electrical</strong>: Headlights, signals, brake lights, dash warning lamps, and whether any of them have been disabled to hide a fault.</li>
              <li><strong>Signs of Past Accident Repair</strong>: Mismatched paint, overspray, uneven panel gaps, replaced or wrinkled body panels, and frame-rail evidence that doesn't match what the seller told you.</li>
            </ul>
            <CallNowButton source="service_content_pre-purchase-inspection_checklist" />
          </>
        )
      },
      {
        title: 'What an Inspection Catches That a Test Drive Never Will',
        content: (
          <>
            <p className="mb-4">
              A twenty-minute test drive around the seller's neighbourhood tells you the car moves and the radio works. It does not tell you any of this:
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Trouble Codes Cleared Right Before You Arrived</h3>
            <p className="mb-4 text-gray-700">
              Disconnect the battery or plug in a $20 scanner and the check-engine light goes out for a while. It comes back. Our scan reads pending codes and readiness monitors, which is how a recently-cleared fault gives itself away.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Repair Bills That Are Weeks Away</h3>
            <p className="mb-4 text-gray-700">
              Brakes at 15% and tires at the wear bars aren't "problems" on a test drive — the car drives fine. They're a bill that lands the month after you buy. Knowing about them before you pay is either a negotiation or a reason to keep looking.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Accident Repair Nobody Mentioned</h3>
            <p className="mb-4 text-gray-700">
              Not every repaired car is a bad car, but you deserve to know. Paint that doesn't match under daylight, panel gaps that drift, fresh undercoating in one spot — a mechanic sees these in minutes and a buyer almost never does.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Leaks That Only Show On a Hoist — or On the Seller's Driveway</h3>
            <p className="mb-4 text-gray-700">
              We look where the car has been parked, not just at the car. A clean engine bay over a stained driveway is a story worth asking about.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_catches" />
          </>
        )
      },
      {
        title: 'Independent Means We Have No Stake in the Sale',
        content: (
          <>
            <p className="mb-4">
              We are not the seller, we are not the dealership's shop, and we don't get paid more if you buy the car. That's the entire value of the service. Our mechanic's only job is to tell you what's actually in front of you — including, more than once, "don't buy this one."
            </p>
            <p className="mb-4">
              We work across the whole Greater Toronto Area, with our fastest availability in the East GTA — Scarborough, Pickering, Ajax, Whitby, and Oshawa. Tell us where the car is and when the seller is free, and we'll meet you there, usually within a day.
            </p>
            <p className="mb-4">
              And because we're a roadside company first, the number you call for the inspection is the same one that answers at 2 a.m. if that new-to-you car ever leaves you stranded — <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">boosts</a>, <a href="/service/flat-tire-repair" className="text-brand-yellow font-bold hover:underline">flat tires</a>, lockouts, and <a href="/service/towing" className="text-brand-yellow font-bold hover:underline">towing</a>.
            </p>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Spend a little before you buy, or a lot after. Call {PHONE_NUMBER} and we'll quote you on the spot.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_independent" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How much does a pre-purchase car inspection cost?', answer: 'It depends on the vehicle and where it\'s parked, so we quote you on the call — tell us the year, make, and model and the location of the car, and you\'ll have a firm price before we book anything. There\'s no charge for the quote.' },
      { question: 'How long does the inspection take?', answer: 'Plan on about an hour at the vehicle for a typical car. Larger vehicles, or cars that turn up problems worth digging into, can run longer. We\'d rather take the extra fifteen minutes than miss something that costs you thousands.' },
      { question: 'Will you inspect a car at a dealership?', answer: 'Yes, and we do it regularly. Most dealers in the GTA will allow an independent inspection on their lot — if one refuses outright, that itself is worth knowing before you buy. Just arrange a time with them and we\'ll meet you there.' },
      { question: 'Is this a Safety Standards Certificate?', answer: 'No. An Ontario Safety Standards Certificate can only be issued by a licensed Motor Vehicle Inspection Station, and this is not that. This is an independent mechanical inspection to tell you what you\'re buying before you pay. If you need an SSC to register the car, you\'ll need a licensed MVIS separately.' },
      { question: 'What do I get at the end of the inspection?', answer: 'Our technician walks you through everything he found in plain English, right there at the car, and goes over the diagnostic scan results with you — including any stored or pending trouble codes. You can ask him anything you want while he\'s in front of the vehicle.' },
      { question: 'What if you find problems with the car?', answer: 'Then the inspection just paid for itself. You\'ll know exactly what\'s wrong and roughly what it takes to fix, which puts you in a position to negotiate the price down or walk away. Plenty of our customers have done both.' },
    ]
  }
```

- [ ] **Step 5: Verify the page renders in full**

Run: `npm run dev`, then open `http://localhost:3000/service/pre-purchase-inspection`.
Expected: hero image, all four section headings, the yellow Call Now buttons, and six expandable FAQs. No console errors.

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npm run build`
Expected: build completes with no TS errors. (The prerender step will not yet emit this route — that's Task 2.)

- [ ] **Step 7: Commit**

```bash
git add constants.tsx data/serviceContent.tsx
git commit -m "feat: add pre-purchase inspection sub-service page

Sub-service under Mobile Mechanic targeting used-car buyers. No pricing
on the page; deliverable is a verbal walkthrough plus OBD scan results.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Sitemap entry and prerendering

**Files:**
- Modify: `public/sitemap.xml:75` (insert after the `battery-replacement` `<url>` block)

**Interfaces:**
- Consumes: route `/service/pre-purchase-inspection` from Task 1.
- Produces: `dist/service/pre-purchase-inspection/index.html` at build time.

Adding the sitemap entry is what causes prerendering — `scripts/prerender.mjs` builds its route list by regexing `<loc>` values out of `public/sitemap.xml`. No change to the prerender script is needed.

- [ ] **Step 1: Add the sitemap URL**

In `public/sitemap.xml`, immediately after the closing `</url>` of the `battery-replacement` block (line 79), insert:

```xml
  <url>
    <loc>https://www.ifastroadside.ca/service/pre-purchase-inspection</loc>
    <lastmod>2026-07-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
```

(`priority` 0.9 and `changefreq` monthly match the other sub-service entries.)

- [ ] **Step 2: Build and confirm the page prerenders**

Run: `npm run build`
Expected: build succeeds, and the prerender step's route list includes `/service/pre-purchase-inspection` with no failures reported.

- [ ] **Step 3: Confirm the static HTML exists with correct SEO output**

Run:
```bash
ls dist/service/pre-purchase-inspection/index.html
grep -c '"@type":"FAQPage"' dist/service/pre-purchase-inspection/index.html
grep -o '<title>[^<]*</title>' dist/service/pre-purchase-inspection/index.html
grep -o 'rel="canonical" href="[^"]*"' dist/service/pre-purchase-inspection/index.html
```
Expected: the file exists; the FAQPage count is at least 1; the title is the `seoTitle` from Task 1; the canonical is `https://www.ifastroadside.ca/service/pre-purchase-inspection`.

- [ ] **Step 4: Enforce the no-price constraint against the real output**

Run: `grep -o '\$[0-9]\+' dist/service/pre-purchase-inspection/index.html`
Expected: **no matches** (grep exits 1). Any hit is a Global Constraints violation — remove the figure before committing.

- [ ] **Step 5: Commit**

```bash
git add public/sitemap.xml
git commit -m "seo: add pre-purchase inspection to sitemap

Also brings the page into the prerender route list, which is derived
from sitemap.xml.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Chatbot service list

**Files:**
- Modify: `services/geminiService.ts:14-21` (the `SERVICES & PRICING` block of `SYSTEM_INSTRUCTION`)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: nothing consumed later.

Per CLAUDE.md, `SYSTEM_INSTRUCTION` is product copy, not config — it hardcodes the service list and must be updated when the offering changes.

- [ ] **Step 1: Add the service line**

In `services/geminiService.ts`, in the `SERVICES & PRICING` list, after the `- Towing: Starts at $95` line, add:

```
- Pre-Purchase Car Inspection (for used car buyers, we come to the car): call for a quote — no set starting price
```

- [ ] **Step 2: Verify the build still compiles**

Run: `npm run build`
Expected: succeeds with no TS errors.

- [ ] **Step 3: Confirm no dollar figure was introduced**

Run: `grep -n 'Pre-Purchase' services/geminiService.ts`
Expected: one line, containing no `$`.

- [ ] **Step 4: Commit**

```bash
git add services/geminiService.ts
git commit -m "chore: tell the chatbot about pre-purchase inspections

Quote-on-call, no starting price, per the service page.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Internal links between the service page and the Ajax customer story

**Files:**
- Modify: `data/serviceContent.tsx` (the `pre-purchase-inspection` entry from Task 1 — add a link into the "Independent Means We Have No Stake in the Sale" section)
- Modify: `data/blogContent.tsx:1985` (the closing paragraph of the `pre-purchase-car-inspection-ajax` post)

**Interfaces:**
- Consumes: route `/service/pre-purchase-inspection` from Task 1; existing blog route `/blog/pre-purchase-car-inspection-ajax`.
- Produces: nothing consumed later.

Both files link with plain `<a href="/...">` styled `className="text-brand-yellow font-bold hover:underline"` — that is the established convention in `blogContent.tsx`. Match it; don't introduce React Router `<Link>` here.

- [ ] **Step 1: Link the service page to the customer story**

In `data/serviceContent.tsx`, in the `pre-purchase-inspection` entry's fourth section, insert this paragraph immediately before the `<p className="font-semibold text-lg text-brand-dark mb-4">` line:

```tsx
            <p className="mb-4">
              Want to see how this plays out in practice? Read <a href="/blog/pre-purchase-car-inspection-ajax" className="text-brand-yellow font-bold hover:underline">how an Ajax buyer had us inspect a used car before she paid for it</a> — a real customer, in her own words.
            </p>
```

- [ ] **Step 2: Link the customer story to the service page**

In `data/blogContent.tsx`, in the `pre-purchase-car-inspection-ajax` post's final section ("Pre-Purchase Inspections Across Ajax & the East GTA"), change the closing paragraph so the phrase "One phone call books it" links to the new page. Replace:

```tsx
              One phone call books it: tell us where the car is and when the seller is available, and a certified <a href="/service/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> meets you there. Buy the car knowing exactly what you're getting — the way Ifeyinwa did.
```

with:

```tsx
              One phone call books it: tell us where the car is and when the seller is available, and a certified <a href="/service/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> meets you there. Here's <a href="/service/pre-purchase-inspection" className="text-brand-yellow font-bold hover:underline">everything a pre-purchase inspection covers</a>. Buy the car knowing exactly what you're getting — the way Ifeyinwa did.
```

- [ ] **Step 3: Build and verify both links land in the prerendered HTML**

Run:
```bash
npm run build
grep -c 'href="/blog/pre-purchase-car-inspection-ajax"' dist/service/pre-purchase-inspection/index.html
grep -c 'href="/service/pre-purchase-inspection"' dist/blog/pre-purchase-car-inspection-ajax/index.html
```
Expected: build succeeds and both greps report at least 1.

- [ ] **Step 4: Commit**

```bash
git add data/serviceContent.tsx data/blogContent.tsx
git commit -m "seo: cross-link pre-purchase inspection page and Ajax story

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Final verification

After all four tasks:

- [ ] `npm run build` succeeds end to end.
- [ ] `dist/service/pre-purchase-inspection/index.html` contains the `Service` and `FAQPage` JSON-LD, the correct canonical, and no `$` figure.
- [ ] Homepage Mobile Mechanic card shows the "Pre-Purchase Car Inspection" chip, and it navigates correctly.
- [ ] The Header and Footer service lists are **unchanged** — both filter on `!s.parent`, so a sub-service correctly does not appear there.
- [ ] No page copy promises a written report, PDF, or Safety Standards Certificate.
