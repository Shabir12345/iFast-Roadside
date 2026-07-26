# Service Page Differentiation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give `/service/tire-change` and `/service/jump-start` (plus their battery/tire sub-services) hand-written, intent-matched hero, feature and CTA copy so Google stops treating them as templated near-duplicates and starts crawling them.

**Architecture:** Add three optional fields (`hero`, `features`, `cta`) to the `ServiceContent` interface in `data/serviceContent.tsx`. `pages/ServicePage.tsx` renders them when present and falls back to today's templated strings when absent, so untouched services render byte-identically. Then repoint internal `mobile-mechanic` links to the canonical `/mobile-mechanic`, 301 the `/service/mobile-mechanic` duplicate, and refresh sitemap priority/lastmod for the rebuilt pages only.

**Tech Stack:** React 19, TypeScript, Vite 6, React Router v7, react-helmet-async, Lucide React, Tailwind (CDN, theme configured inline in `index.html`), Vercel.

## Global Constraints

- **No test runner exists in this repo.** `npm run build` is the only automated gate. It runs `sync-reviews` → `vite build` → `vite build --ssr` → `prerender.mjs`, and the prerender step fails the build on any route rendering under 500 chars. Every task's verification step is a build plus an assertion against the emitted HTML in `dist/`.
- **`pages/MobileMechanicLanding.tsx` must not be modified.**
- **`/mobile-mechanic` URL, canonical tag, and its `public/sitemap.xml` entry must not be modified.**
- **`SERVICE_CONTENT['mobile-mechanic']` must not be modified.** The three new fields are optional; this entry does not receive them.
- **Hard gate:** `/mobile-mechanic`'s prerendered output must be unchanged before and after the entire change set. Task 1 captures the baseline; every task re-checks it via `bash scripts/check-mobile-mechanic-guardrail.sh`, which must print `GUARDRAIL PASS`. That script normalises Vite's content-hashed asset filenames — and only those — because Vite emits a single JS bundle whose hash appears in the `<script src>` tag of every prerendered page, so a literal byte-for-byte diff reports a difference on any runtime-code change even when `/mobile-mechanic` itself is untouched. Markup, text, meta tags and JSON-LD are all still compared exactly.
- **Grepping prerendered HTML:** React's SSR renderer HTML-escapes apostrophes, so copy written as `We'll Have You Running` appears in `dist/` as `We&#x27;ll Have You Running`. Every `grep` assertion in this plan therefore uses an apostrophe-free substring. If you add a check, do the same — a literal apostrophe in the pattern returns 0 and looks like a failure when the copy is actually correct.
- Brand colours come from the inline Tailwind config in `index.html` — use `bg-brand-yellow`, `text-brand-dark`, `bg-brand-dark`. Never raw hex for brand colours.
- Every phone CTA must call `trackPhoneCall(source)` from `utils/analytics.ts` with a descriptive source label.
- Sitemap priority values (spec §Indexation work): `0.9` tire-change and jump-start; `0.8` towing, lockout, battery-replacement, battery-diagnostic, flat-tire-repair, tire-installation, spare-tire-change; `0.7` fuel and pre-purchase-inspection; `/` stays `1.0`; `/mobile-mechanic` stays `0.95`.
- Commit after every task.

---

### Task 1: Capture the /mobile-mechanic baseline

Establishes the guardrail artifact that every later task is checked against. Must run before any source change.

**Files:**
- Create: `.mobile-mechanic-baseline.html` (gitignored, local only)
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing
- Produces: `.mobile-mechanic-baseline.html` — the pre-change prerendered output of `/mobile-mechanic`, used by Task 8's diff gate.

- [ ] **Step 1: Build the site on the current, unmodified code**

```bash
cd /c/dev/ifast-roadside-site
npm run build
```

Expected: build succeeds and the final line reads `Prerendered N/N routes.` with no `Failed routes:` block. **Write N down** — the prerender route list is the sitemap routes unioned with `NOINDEX_COMBOS` in `scripts/prerender.mjs`, so the exact figure is not predictable from the sitemap alone. Tasks 7 and 8 expect `N - 1`.

- [ ] **Step 2: Copy the prerendered mobile-mechanic page to the repo root as a baseline**

```bash
cp dist/mobile-mechanic/index.html .mobile-mechanic-baseline.html
wc -c .mobile-mechanic-baseline.html
```

Expected: a byte count in the tens of thousands, not zero.

- [ ] **Step 3: Gitignore the baseline so it never lands in a commit**

Append this line to `.gitignore`:

```
.mobile-mechanic-baseline.html
```

- [ ] **Step 4: Verify the baseline is ignored**

Run: `git status --porcelain`
Expected: `.gitignore` shows as modified; `.mobile-mechanic-baseline.html` does NOT appear.

- [ ] **Step 5: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore the mobile-mechanic prerender baseline

Guardrail artifact for the service-page differentiation work: dist output for
/mobile-mechanic is captured before any change and diffed after, to prove the
page that currently earns traffic was not touched.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Add the optional copy fields to the ServiceContent interface

Type-only change. No page renders differently yet.

**Files:**
- Modify: `data/serviceContent.tsx:21-34` (the `ServiceContent` interface)

**Interfaces:**
- Consumes: nothing
- Produces: three optional properties on `ServiceContent`, consumed by Task 3:
  - `hero?: { eyebrow: string; h1: string; h1Accent: string; intro: string }`
  - `features?: { title: string; desc: string; icon: LucideIcon; color: string }[]`
  - `cta?: { heading: string; body: string }`

- [ ] **Step 1: Import the LucideIcon type**

In `data/serviceContent.tsx`, change line 3 from:

```tsx
import { PhoneCall } from 'lucide-react';
```

to:

```tsx
import { PhoneCall, type LucideIcon } from 'lucide-react';
```

- [ ] **Step 2: Extend the interface**

In `data/serviceContent.tsx`, replace the `ServiceContent` interface body so it reads:

```tsx
export interface ServiceContent {
  id: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  /**
   * Optional hand-written hero copy. When absent, ServicePage falls back to its
   * templated H1/intro. Present only on services rebuilt to break the
   * near-duplicate boilerplate that was suppressing crawling — see
   * docs/superpowers/specs/2026-07-25-service-page-differentiation-design.md
   */
  hero?: {
    eyebrow: string;
    h1: string;
    h1Accent: string;
    intro: string;
  };
  /** Optional bespoke feature grid. Section is omitted entirely when absent. */
  features?: {
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
  }[];
  /** Optional hand-written footer CTA. Falls back to the templated version. */
  cta?: {
    heading: string;
    body: string;
  };
  blogSections: {
    title: string;
    content: React.ReactNode;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}
```

- [ ] **Step 3: Verify the build still passes with no service using the new fields**

Run: `npm run build`
Expected: PASS, no TypeScript errors, no `Failed routes:` block.

- [ ] **Step 4: Confirm no page output changed**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: prints `GUARDRAIL PASS`.

- [ ] **Step 5: Commit**

```bash
git add data/serviceContent.tsx
git commit -m "feat(service-content): add optional hero/features/cta copy fields

All three are optional, so every existing service renders unchanged. They exist
so individual services can replace ServicePage's templated boilerplate with
hand-written intent-matched copy.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Render the optional fields in ServicePage with fallbacks

Wires the fields up. Still no visible change, because no service defines them yet.

**Files:**
- Modify: `pages/ServicePage.tsx` — imports (line 6), eyebrow badge (~line 97), H1 (~line 102), intro (~line 107), new feature grid section (after the trust bar, ~line 186), footer CTA heading and body (~line 294)

**Interfaces:**
- Consumes: `ServiceContent.hero`, `ServiceContent.features`, `ServiceContent.cta` from Task 2
- Produces: rendering behaviour consumed by Tasks 4 and 5

- [ ] **Step 1: Replace the eyebrow badge with a fallback-aware version**

In `pages/ServicePage.tsx`, replace this block (~line 97):

```tsx
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 mb-6 w-fit cursor-default">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Dispatch: Ready Now
            </div>
```

with:

```tsx
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 mb-6 w-fit cursor-default">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {contentData.hero?.eyebrow ?? 'Live Dispatch: Ready Now'}
            </div>
```

- [ ] **Step 2: Replace the H1 with a fallback-aware version**

Replace this block (~line 102):

```tsx
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.05] tracking-tight">
              {title} <br className="hidden sm:block" />
              <span className="text-brand-yellow drop-shadow-sm block mt-1">At Your Location in ~30 Min</span>
            </h1>
```

with:

```tsx
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.05] tracking-tight">
              {contentData.hero?.h1 ?? title} <br className="hidden sm:block" />
              <span className="text-brand-yellow drop-shadow-sm block mt-1">
                {contentData.hero?.h1Accent ?? 'At Your Location in ~30 Min'}
              </span>
            </h1>
```

- [ ] **Step 3: Replace the intro paragraph with a fallback-aware version**

Replace this block (~line 107):

```tsx
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg font-medium">
              {description} Call now and a live dispatcher will give you an <span className="font-bold text-gray-800">upfront price and a real ETA</span> before we send a unit.
            </p>
```

with:

```tsx
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg font-medium">
              {contentData.hero?.intro ?? (
                <>
                  {description} Call now and a live dispatcher will give you an <span className="font-bold text-gray-800">upfront price and a real ETA</span> before we send a unit.
                </>
              )}
            </p>
```

- [ ] **Step 4: Add the optional feature grid immediately after the trust bar**

In `pages/ServicePage.tsx`, find the trust bar block that ends with:

```tsx
           <div className="flex items-center gap-2"><Camera className="text-brand-dark" size={24} /> 100% Damage Free</div>
        </div>
      </div>
```

Insert this new section directly after that closing `</div>`, before the `<GoogleReviews />` line:

```tsx
      {/* Bespoke per-service feature grid. Rendered only for services that have
          been given hand-written copy — see the spec referenced in
          data/serviceContent.tsx. Services without `features` skip this entirely. */}
      {contentData.features && contentData.features.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contentData.features.map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-yellow/30 transition-all duration-300 group">
                  <div className={`${feature.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
```

- [ ] **Step 5: Replace the footer CTA heading and body with fallback-aware versions**

Replace this block (~line 294):

```tsx
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Need {title} Built on Trust?</h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
               Stop waiting around. Our dispatcher will deploy the nearest active unit directly to your location. Secure your spot now.
            </p>
```

with:

```tsx
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {contentData.cta?.heading ?? `Need ${title} Built on Trust?`}
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
               {contentData.cta?.body ?? 'Stop waiting around. Our dispatcher will deploy the nearest active unit directly to your location. Secure your spot now.'}
            </p>
```

- [ ] **Step 6: Build and verify nothing changed yet**

Run: `npm run build`
Expected: PASS with no `Failed routes:` block.

Then confirm a service page that has no new fields is unchanged in substance:

```bash
grep -c "Need Emergency Towing Built on Trust?" dist/service/towing/index.html
```

Expected: `1` — the fallback still renders.

- [ ] **Step 7: Confirm the mobile-mechanic guardrail still holds**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: prints `GUARDRAIL PASS`.

- [ ] **Step 8: Commit**

```bash
git add pages/ServicePage.tsx
git commit -m "feat(service-page): render optional bespoke hero/features/cta copy

Falls back to the existing templated strings when a service defines none of the
new fields, so every current page renders unchanged. The feature grid section is
omitted entirely rather than rendering empty.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Write bespoke copy for the tire family

Highest-demand family: 661 impressions, 1 click, 90 days. `/service/tire-change` has never been crawled.

**Files:**
- Modify: `data/serviceContent.tsx` — the `'tire-change'`, `'flat-tire-repair'`, `'tire-installation'` and `'spare-tire-change'` entries

**Interfaces:**
- Consumes: `ServiceContent.hero` / `features` / `cta` (Task 2), rendered by Task 3
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Add the icon imports needed by the tire feature grids**

In `data/serviceContent.tsx`, change the lucide import to:

```tsx
import { PhoneCall, type LucideIcon, Disc3, Gauge, Wrench, ShieldCheck, Zap, Clock, CircleDot } from 'lucide-react';
```

- [ ] **Step 2: Add hero, features and cta to the `'tire-change'` entry**

Inside `SERVICE_CONTENT['tire-change']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Roadside Tire Emergency',
      h1: 'Flat Tire?',
      h1Accent: "We'll Change It Where You Stand.",
      intro: "Pulled over on the 401 with a shredded sidewall, or found the car sitting flat in the driveway this morning? We bring the jack, the impact gun and the torque wrench to you — no tow, no waiting room, no calling around for a shop that's still open.",
    },
    features: [
      {
        title: 'Spare Fitted On-Site',
        desc: 'We mount your spare properly and torque it to spec — including locking wheel nuts and seized bolts.',
        icon: Disc3,
        color: 'bg-brand-dark',
      },
      {
        title: 'No Spare? No Problem',
        desc: 'We carry common sizes in the van and can supply and fit a replacement tire on the spot.',
        icon: CircleDot,
        color: 'bg-blue-500',
      },
      {
        title: 'Pressure & Safety Check',
        desc: 'Every tire we touch gets checked for correct pressure and safe tread before we leave.',
        icon: Gauge,
        color: 'bg-green-500',
      },
      {
        title: 'Highway-Safe Response',
        desc: 'Beacons and cones out before any work starts. We work shoulder-side jobs on the 401 daily.',
        icon: ShieldCheck,
        color: 'bg-red-500',
      },
    ],
    cta: {
      heading: 'Stuck on a Flat Right Now?',
      body: "Tell us the cross-street and we'll give you a real ETA and an upfront price before a unit rolls. Most GTA calls are on scene in under 30 minutes.",
    },
```

- [ ] **Step 3: Add hero and cta to the `'flat-tire-repair'` entry**

Inside `SERVICE_CONTENT['flat-tire-repair']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Puncture Repair On-Site',
      h1: 'Nail in Your Tire?',
      h1Accent: 'Patched Properly, At Your Door.',
      intro: "A slow leak that needs topping up every second morning is a puncture, not bad luck. We come to you, pull the wheel, find the leak and fit a proper internal patch-plug — the repair a tire shop would do, done in your driveway.",
    },
    cta: {
      heading: 'Losing Air Every Morning?',
      body: "Don't keep pumping it up and hoping. Call now for an upfront price on a permanent patch-plug repair at your home or workplace.",
    },
```

- [ ] **Step 4: Add hero and cta to the `'tire-installation'` entry**

Inside `SERVICE_CONTENT['tire-installation']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Mobile Tire Fitting',
      h1: 'New Tires,',
      h1Accent: 'Fitted On Your Driveway.',
      intro: "Skip the appointment and the waiting room. We bring mounting and balancing to your home or office, fit new or used tires to your rims, torque everything to spec and take the old ones away with us.",
    },
    cta: {
      heading: 'Ready for a Fresh Set?',
      body: 'Tell us your tire size and we will quote supply and fitting over the phone, then come to you at a time that suits.',
    },
```

- [ ] **Step 5: Add hero and cta to the `'spare-tire-change'` entry**

Inside `SERVICE_CONTENT['spare-tire-change']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Spare Tire Swap',
      h1: 'Got a Spare?',
      h1Accent: "We'll Get It On in Minutes.",
      intro: "You have the donut in the trunk but no jack, no leverage on the wheel nuts, or nowhere safe to kneel down. We arrive with proper equipment, swap it safely and tell you exactly how far that spare will take you.",
    },
    cta: {
      heading: 'Spare in the Trunk, Car on the Ground?',
      body: "Call now — this is one of the fastest jobs we do, and we'll check your spare's pressure before you drive off.",
    },
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: PASS with no `Failed routes:` block.

- [ ] **Step 7: Verify the bespoke copy is in the prerendered HTML, not just the client bundle**

```bash
grep -c "Change It Where You Stand" dist/service/tire-change/index.html
grep -c "Stuck on a Flat Right Now?" dist/service/tire-change/index.html
grep -c "Patched Properly, At Your Door" dist/service/flat-tire-repair/index.html
grep -c "Need Mobile Tire Service Built on Trust?" dist/service/tire-change/index.html
```

Expected: `1`, `1`, `1`, then `0` — the last one proves the old templated CTA is gone from the rebuilt page.

- [ ] **Step 8: Confirm the mobile-mechanic guardrail still holds**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: prints `GUARDRAIL PASS`.

- [ ] **Step 9: Commit**

```bash
git add data/serviceContent.tsx
git commit -m "feat(tire): hand-written hero, features and CTA copy for tire services

Highest-demand family in GSC (661 impressions, 1 click over 90 days) and
/service/tire-change has never been crawled. Replaces the shared templated H1
and the 'Need Mobile Tire Service Built on Trust?' CTA with intent-matched copy.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Write bespoke copy for the battery family

Second-highest demand: 463 impressions, already ranking 4.3 on "jump start service", so the quickest win.

**Files:**
- Modify: `data/serviceContent.tsx` — the `'jump-start'`, `'battery-replacement'` and `'battery-diagnostic'` entries

**Interfaces:**
- Consumes: `ServiceContent.hero` / `features` / `cta` (Task 2), rendered by Task 3; icon imports added in Task 4 Step 1
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Add hero, features and cta to the `'jump-start'` entry**

Inside `SERVICE_CONTENT['jump-start']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Dead Battery Boost',
      h1: 'Car Won’t Start?',
      h1Accent: "We'll Have You Running.",
      intro: "Dash lights flicker, one click, then nothing. We carry commercial-grade boost packs that start everything from a Civic to a diesel pickup — and once you're running we test whether the battery will actually hold, so you're not stranded again tonight.",
    },
    features: [
      {
        title: 'Boost in Minutes',
        desc: 'Professional jump packs, not jumper cables and a stranger’s bumper. Safe for modern vehicle electronics.',
        icon: Zap,
        color: 'bg-yellow-500',
      },
      {
        title: 'Charge System Test',
        desc: 'We test the battery and alternator on the spot so you know whether this happens again tomorrow.',
        icon: Gauge,
        color: 'bg-blue-500',
      },
      {
        title: 'Battery Swap On-Site',
        desc: 'If it will not hold a charge, we can supply and fit a replacement right there.',
        icon: Wrench,
        color: 'bg-green-500',
      },
      {
        title: 'Underground & Condo Access',
        desc: 'We work condo garages and tight parkades across the GTA every day — low clearance is not a problem.',
        icon: Clock,
        color: 'bg-brand-dark',
      },
    ],
    cta: {
      heading: 'Dead Battery Right Now?',
      body: "Tell us where you're parked — driveway, office lot or underground garage — and we'll give you an ETA and an upfront price before a unit rolls.",
    },
```

- [ ] **Step 2: Add hero and cta to the `'battery-replacement'` entry**

Inside `SERVICE_CONTENT['battery-replacement']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Mobile Battery Replacement',
      h1: 'Battery Done?',
      h1Accent: 'New One Fitted Where You Are.',
      intro: "A battery that needs a boost twice in one week is finished. We bring the right group size to your home or workplace, fit it, clean up the terminals and take the old one away for recycling — no shop appointment and no second tow.",
    },
    cta: {
      heading: 'Tired of Boosting It Every Morning?',
      body: 'Call with your make and model and we will quote a supplied-and-fitted price over the phone, then come to you.',
    },
```

- [ ] **Step 3: Add hero and cta to the `'battery-diagnostic'` entry**

Inside `SERVICE_CONTENT['battery-diagnostic']`, directly after its `heroImage` line, insert:

```tsx
    hero: {
      eyebrow: 'Charging System Testing',
      h1: 'Battery or Alternator?',
      h1Accent: "Let's Find Out Before You Buy.",
      intro: "Replacing a healthy battery when the alternator is the real fault is an expensive mistake. We load-test the battery, measure charging output and check for parasitic draw at your location, then tell you exactly which part is at fault.",
    },
    cta: {
      heading: 'Not Sure What Is Draining It?',
      body: 'Get a proper diagnosis before you spend money on parts. We test at your home or workplace and give you the numbers.',
    },
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS with no `Failed routes:` block.

- [ ] **Step 5: Verify the bespoke copy reached the prerendered HTML**

```bash
grep -c "Have You Running" dist/service/jump-start/index.html
grep -c "Dead Battery Right Now?" dist/service/jump-start/index.html
grep -c "New One Fitted Where You Are" dist/service/battery-replacement/index.html
grep -c "Find Out Before You Buy" dist/service/battery-diagnostic/index.html
```

Expected: `1` for all four.

- [ ] **Step 6: Confirm the mobile-mechanic guardrail still holds**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: prints `GUARDRAIL PASS`.

- [ ] **Step 7: Commit**

```bash
git add data/serviceContent.tsx
git commit -m "feat(battery): hand-written hero, features and CTA copy for battery services

Second-highest demand family (463 impressions/90d) and already at position 4.3
for 'jump start service', so the closest to a page-one win. battery-diagnostic
and battery-replacement have never been crawled.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Route mobile-mechanic internal links to the canonical URL

Sends every internal link straight to `/mobile-mechanic` instead of through the 301 added in Task 7. This *increases* internal links to the page that currently works.

**Files:**
- Create: `utils/serviceHref.ts`
- Modify: `components/Header.tsx` (two link sites, ~line 60 and ~line 188), `components/Footer.tsx:34`, `components/Services.tsx:25`, `pages/BlogPost.tsx:203`, `pages/ServiceCityPage.tsx:58` and `:142`
- Modify (added after review — hardcoded literals, not `serviceHref()` call sites): `data/blogContent.tsx:1989`, `data/blogContent.tsx:2185`, `pages/CityPage.tsx:289`

**Gap found in review:** the file list above originally covered only the dynamic
`` `/service/${id}` `` template call sites. It missed three places that hardcode the string
`"/service/mobile-mechanic"` directly — two in-body prose links inside blog post content and one
in the city-page body. Those render as real `<a href>` links on 8 prerendered pages
(`/areas/*` ×6, two blog posts), and after Task 7's 301 every one of them would bounce through
a redirect — precisely what this task exists to prevent. Verify with an OCCURRENCE count, not
`grep -c` (see the note in Step 8).

**Interfaces:**
- Consumes: nothing
- Produces: `serviceHref(id: string): string` — returns `/mobile-mechanic` for `'mobile-mechanic'`, `/service/${id}` otherwise. Used by Task 7's sitemap reasoning.

Note: sub-service links (`sub.id`) also go through this helper. `mobile-mechanic` is a top-level service, never a sub-service, so those calls always take the `/service/` branch — routing them through the helper is harmless and keeps the pattern uniform.

- [ ] **Step 1: Create the helper**

Create `utils/serviceHref.ts`:

```ts
/**
 * Canonical internal URL for a service.
 *
 * `mobile-mechanic` lives at the top-level `/mobile-mechanic` (a bespoke landing
 * page, and the only service page currently earning meaningful organic
 * impressions). `/service/mobile-mechanic` is a duplicate that Google refused to
 * index and is 301'd away — so internal links must point at the canonical URL
 * directly rather than bouncing through the redirect.
 */
export const serviceHref = (id: string): string =>
  id === 'mobile-mechanic' ? '/mobile-mechanic' : `/service/${id}`;
```

- [ ] **Step 2: Use it in `components/Header.tsx`**

Add to the imports at the top of the file:

```tsx
import { serviceHref } from '../utils/serviceHref';
```

Then replace all four occurrences of the service href in that file:
- `href={`/service/${service.id}`}` → `href={serviceHref(service.id)}` (two occurrences: desktop ~line 60, mobile ~line 188)
- `href={`/service/${sub.id}`}` → `href={serviceHref(sub.id)}` (two occurrences: ~line 76, ~line 197)

- [ ] **Step 3: Use it in `components/Footer.tsx`**

Add the import:

```tsx
import { serviceHref } from '../utils/serviceHref';
```

Replace line 34's `href={`/service/${service.id}`}` with `href={serviceHref(service.id)}`.

- [ ] **Step 4: Use it in `components/Services.tsx`**

Add the import:

```tsx
import { serviceHref } from '../utils/serviceHref';
```

Replace `to={`/service/${service.id}`}` (line 25) with `to={serviceHref(service.id)}`, and `to={`/service/${sub.id}`}` (line 42) with `to={serviceHref(sub.id)}`.

- [ ] **Step 5: Use it in `pages/BlogPost.tsx`**

Add the import:

```tsx
import { serviceHref } from '../utils/serviceHref';
```

Replace `to={`/service/${service.id}`}` (line 203) with `to={serviceHref(service.id)}`.

- [ ] **Step 6: Use it in `pages/ServiceCityPage.tsx`**

The five `mobile-mechanic/<city>` combo pages both link to and declare a JSON-LD reference to `/service/mobile-mechanic`, which is about to 301. Both must point at the canonical instead.

Add the import:

```tsx
import { serviceHref } from '../utils/serviceHref';
```

Replace line 58:

```tsx
  const serviceUrl = `https://www.ifastroadside.ca/service/${id}`;
```

with:

```tsx
  const serviceUrl = `https://www.ifastroadside.ca${serviceHref(id)}`;
```

And replace the breadcrumb link on line 142:

```tsx
          <Link to={`/service/${id}`} className="hover:text-brand-dark transition-colors">{service.title}</Link>
```

with:

```tsx
          <Link to={serviceHref(id)} className="hover:text-brand-dark transition-colors">{service.title}</Link>
```

Leave line 56's `canonical` alone — that is the combo page's own canonical URL, not a link to the parent service.

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: PASS with no `Failed routes:` block.

- [ ] **Step 8: Verify links now point at the canonical URL**

**Use occurrence counts, not `grep -c`.** The prerender writes each page's body as ONE physical line, so `grep -c` reports at most `1` regardless of how many links a page has, and a line-based `diff` emits `NNcNN` / `---` markers that contain no URL. Both look like failures when nothing is wrong. Count with `grep -o … | wc -l`:

```bash
# Homepage: all mobile-mechanic links must be canonical, none pointing at the duplicate.
printf "canonical: %s\n" "$(grep -o 'href="/mobile-mechanic"' dist/index.html | wc -l)"
printf "duplicate: %s\n" "$(grep -o '/service/mobile-mechanic\b' dist/index.html | wc -l)"

# Site-wide: no page may link to the bare duplicate URL. The trailing quote excludes
# legitimate combo URLs like /service/mobile-mechanic/scarborough.
# Only dist/service/mobile-mechanic/index.html may still match (its own canonical and
# og:url) — Task 7 deletes that page outright.
grep -rl '/service/mobile-mechanic"' dist --include=index.html
```

Expected: canonical is `4` or more; duplicate is `0`; and the third command lists **only** `dist/service/mobile-mechanic/index.html`. Any `/areas/*` or `/blog/*` page appearing there means a hardcoded literal was missed — see the gap note in this task's Files section.

- [ ] **Step 9: Confirm the mobile-mechanic guardrail**

Note: `/mobile-mechanic`'s own page contains the header and footer, so its internal links change too. This is the one expected, intended diff. Verify it is *only* that:

```bash
diff <(sed -E 's/-[A-Za-z0-9_-]{8}\.(js|css)/-HASH.\1/g' dist/mobile-mechanic/index.html) \
     <(sed -E 's/-[A-Za-z0-9_-]{8}\.(js|css)/-HASH.\1/g' .mobile-mechanic-baseline.html) \
  | grep -v 'mobile-mechanic' | head -20
```

Expected: no output — every differing line mentions `mobile-mechanic`, i.e. only the link targets changed. If any unrelated line appears, STOP and investigate.

(The `sed` normalises Vite's content-hashed asset filenames, exactly as `scripts/check-mobile-mechanic-guardrail.sh` does. Without it the `<script src>` line differs on every build that touches runtime code, and it does not contain the string `mobile-mechanic`, so it would slip past the `grep -v` and look like a real regression.)

Then refresh the baseline for the remaining tasks:

```bash
cp dist/mobile-mechanic/index.html .mobile-mechanic-baseline.html
```

- [ ] **Step 10: Commit**

```bash
git add utils/serviceHref.ts components/Header.tsx components/Footer.tsx components/Services.tsx pages/BlogPost.tsx pages/ServiceCityPage.tsx
git commit -m "feat(links): point internal mobile-mechanic links at the canonical URL

/service/mobile-mechanic is an unindexed duplicate about to be 301'd. Internal
links should reach /mobile-mechanic directly rather than through the redirect,
which also raises the internal link count to the page that actually ranks.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Redirect the duplicate and refresh sitemap signals

**Files:**
- Modify: `vercel.json` (add a `redirects` array), `public/sitemap.xml` (remove the `/service/mobile-mechanic` entry; update `priority` and `lastmod` on rebuilt pages)

**Interfaces:**
- Consumes: `serviceHref` behaviour from Task 6
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Add the redirect to `vercel.json`**

In `vercel.json`, add a `redirects` key as a sibling of `headers` (directly after the `"trailingSlash": false,` line):

```json
  "redirects": [
    {
      "source": "/service/mobile-mechanic",
      "destination": "/mobile-mechanic",
      "permanent": true
    }
  ],
```

- [ ] **Step 2: Remove the duplicate from the sitemap**

In `public/sitemap.xml`, delete the entire `<url>` block whose `<loc>` is `https://www.ifastroadside.ca/service/mobile-mechanic`.

This also removes it from prerendering, because `scripts/prerender.mjs` derives its route list from the sitemap.

- [ ] **Step 3: Set priority and lastmod on the rebuilt pages only**

In `public/sitemap.xml`, set `<priority>` and `<lastmod>2026-07-25</lastmod>` for these entries. Do NOT touch `/`, `/mobile-mechanic`, or any page not rebuilt in Tasks 4–5 — an unchanged page advertising a fresh `lastmod` is a false signal.

| URL | priority | lastmod |
|---|---|---|
| `/service/tire-change` | `0.9` | `2026-07-25` |
| `/service/jump-start` | `0.9` | `2026-07-25` |
| `/service/flat-tire-repair` | `0.8` | `2026-07-25` |
| `/service/tire-installation` | `0.8` | `2026-07-25` |
| `/service/spare-tire-change` | `0.8` | `2026-07-25` |
| `/service/battery-replacement` | `0.8` | `2026-07-25` |
| `/service/battery-diagnostic` | `0.8` | `2026-07-25` |

Also set priority (leaving `lastmod` alone, since these are not rebuilt yet):

| URL | priority |
|---|---|
| `/service/towing` | `0.8` |
| `/service/lockout` | `0.8` |
| `/service/fuel` | `0.7` |
| `/service/pre-purchase-inspection` | `0.7` |

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS with no `Failed routes:` block, and the prerender count is exactly `N - 1` where `N` is the figure recorded in Task 1 Step 1 — the one removed route being the duplicate.

- [ ] **Step 5: Verify the duplicate is gone and the canonical survives**

```bash
test ! -d dist/service/mobile-mechanic && echo "duplicate removed"
test -f dist/mobile-mechanic/index.html && echo "canonical intact"
grep -c "service/mobile-mechanic" public/sitemap.xml
```

Expected: `duplicate removed`, `canonical intact`, then `0`.

- [ ] **Step 6: Validate the sitemap is still well-formed XML**

```bash
node -e "const s=require('fs').readFileSync('public/sitemap.xml','utf8');const n=(s.match(/<url>/g)||[]).length,c=(s.match(/<\/url>/g)||[]).length;if(n!==c)throw new Error('unbalanced url tags: '+n+' vs '+c);console.log('sitemap OK,',n,'urls');"
```

Expected: `sitemap OK, 47 urls`.

- [ ] **Step 7: Confirm the mobile-mechanic guardrail**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: prints `GUARDRAIL PASS` (baseline was refreshed in Task 6).

- [ ] **Step 8: Commit**

```bash
git add vercel.json public/sitemap.xml
git commit -m "seo: 301 the mobile-mechanic duplicate, differentiate sitemap priority

/service/mobile-mechanic was 'Discovered - currently not indexed, never crawled'
- a duplicate of the canonical /mobile-mechanic. Redirect it and drop it from the
sitemap, which also drops it from prerendering.

All 11 service pages previously carried an identical priority 0.9, giving Google
no basis to triage. Priority now tracks measured GSC demand. lastmod is refreshed
only on pages whose copy actually changed.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Final verification and indexing submission

**Files:**
- Modify: `scripts/request-indexing.cjs` (reorder the priority URL block)

**Interfaces:**
- Consumes: everything above
- Produces: the deployed, submitted change set

- [ ] **Step 1: Full clean build**

```bash
rm -rf dist dist-server
npm run build
```

Expected: PASS, `Prerendered (N-1)/(N-1) routes.` using the `N` recorded in Task 1 Step 1, no `Failed routes:` block.

- [ ] **Step 2: Run the full guardrail diff**

```bash
bash scripts/check-mobile-mechanic-guardrail.sh
```

Expected: `GUARDRAIL PASS`. If this fails, do not deploy — investigate first.

- [ ] **Step 3: Spot-check that untouched services still use the fallback copy**

```bash
grep -c "Need Emergency Towing Built on Trust?" dist/service/towing/index.html
grep -c "At Your Location in ~30 Min" dist/service/lockout/index.html
```

Expected: `1` for both — Tasks 4 and 5 did not leak into unrebuilt services.

- [ ] **Step 4: Reorder the indexing script's priority block**

In `scripts/request-indexing.cjs`, replace the `// ── PRIORITY ──` block at the top of the `URLS` array with:

```js
  // ── PRIORITY: pages rebuilt with bespoke copy 2026-07-25 ──
  // Google declined to crawl these when they shared templated boilerplate; the
  // hypothesis under test is that differentiated copy changes that. Ordered by
  // measured GSC demand. Manual quota is ~10-12 URLs/day, so order matters.
  'https://www.ifastroadside.ca/service/tire-change',
  'https://www.ifastroadside.ca/service/jump-start',
  'https://www.ifastroadside.ca/service/battery-replacement',
  'https://www.ifastroadside.ca/service/battery-diagnostic',
  'https://www.ifastroadside.ca/service/flat-tire-repair',
  'https://www.ifastroadside.ca/service/tire-installation',
  'https://www.ifastroadside.ca/service/spare-tire-change',
```

Remove `'https://www.ifastroadside.ca/service/mobile-mechanic'` from the array entirely — it now 301s, and submitting a redirecting URL wastes daily quota.

- [ ] **Step 5: Commit**

```bash
git add scripts/request-indexing.cjs
git commit -m "chore(indexing): prioritise the rebuilt service pages

Ordered by measured GSC demand, since the manual Request Indexing quota is only
~10-12 URLs/day. Drops /service/mobile-mechanic, which now 301s.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 6: Deploy**

Push to `main`; Vercel auto-deploys.

```bash
git push origin main
```

- [ ] **Step 7: Verify the redirect in production**

Wait for the Vercel deploy to finish, then:

```bash
curl -sS -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.ifastroadside.ca/service/mobile-mechanic
curl -sS -o /dev/null -w "%{http_code}\n" https://www.ifastroadside.ca/mobile-mechanic
curl -sS https://www.ifastroadside.ca/service/tire-change | grep -c "Change It Where You Stand"
```

Expected: `308 -> https://www.ifastroadside.ca/mobile-mechanic` (Vercel uses 308 for `permanent: true`, which Google treats as a permanent redirect), then `200`, then `1`.

- [ ] **Step 8: Submit the rebuilt pages for indexing**

Close Chrome first — the script drives the user's real Chrome profile for an authenticated Google session.

```bash
node scripts/request-indexing.cjs
```

Expected: the script walks the priority URLs and reports a submitted/quota-hit status per URL.

- [ ] **Step 9: Record the review date**

The Phase 1 kill-criterion from the spec: if `/service/tire-change` has not been crawled by **2026-08-08** (~2 weeks post-deploy), the copy-differentiation diagnosis is wrong and Phases 2–3 (towing, lockout, fuel, PPI) should be reconsidered rather than executed.

Check with GSC URL Inspection on that date:

```
https://www.ifastroadside.ca/service/tire-change
https://www.ifastroadside.ca/service/battery-replacement
```

Expected on success: `coverage_state` moves off `Discovered - currently not indexed` and `last_crawled` is no longer `Never`.

---

## Notes for the implementer

- **There is no test suite.** Do not go looking for one or try to add a framework. `npm run build` plus the `grep`/`diff` assertions in each task are the verification.
- **The build is slow** (review sync + two Vite builds + 47-route prerender). Budget a couple of minutes per run.
- **`sync-reviews.mjs` hits the Featurable API** at the start of every build and rewrites `data/reviewStats.json`. If that file shows as modified in `git status`, that is expected and unrelated to your changes — it was already modified before this work started. Do not commit it as part of a copy task.
- **Do not reformat `data/serviceContent.tsx`.** It is a large file; keep diffs to the inserted blocks so review stays readable.
- If a `diff` guardrail step fails, stop and report rather than pressing on. That check exists because the whole point of this work is not to damage the one page that currently earns traffic.
