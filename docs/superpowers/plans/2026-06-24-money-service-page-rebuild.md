# Money-Service Page Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild 10 unindexed money-service pages (Tires, Boost, Lockout, Fuel) to a top-1% standard — competitor table-stakes + first-party review proof + local detail — then ship and request indexing.

**Architecture:** Content lives in two data maps: `data/serviceContent.tsx` (hub pages, `SERVICE_CONTENT`) and `data/serviceCityContent.tsx` (combo pages, `SERVICE_CITY_CONTENT`). We research first (competitors via Playwright/Google, our reviews via Featurable API, synthesis via NotebookLM), pilot the tire-change hub for sign-off, then replicate the proven pattern. No new components — we enrich existing content structures and rely on the existing `ServicePage`/`ServiceCityPage` renderers.

**Tech Stack:** React 19 + TypeScript + Vite 6, react-helmet-async (schema), Tailwind (CDN, brand classes), Playwright (research + render verification), NotebookLM (synthesis), Featurable API (reviews), GSC (indexing).

## Global Constraints

- Real reviews only — fabricated content violates Google ToS + the Competition Act.
- Every phone CTA must call `trackPhoneCall(source)` with a descriptive source label.
- Brand styling only (`bg-brand-yellow`, `text-brand-dark`, `premium-shadow`, etc.); match the existing punchy, conversion tone. No raw hex for brand colors.
- npm is broken on G: (Google Drive). Build/verify from `C:\Users\khati\ifast-build`; GitHub is source of truth. Sync changes there before building.
- Keep `constants.tsx` SERVICES and the two content maps in sync. Add any "unknown to Google" combo URL to `public/sitemap.xml`.
- Reviews API: `https://api.featurable.com/v1/widgets/9ff590b7-3128-4d17-a845-bc80f70b5313`.
- Pilot page = `SERVICE_CONTENT['tire-change']`. Do NOT roll out to the other 9 until the user approves the pilot.

---

## Phase A — Recon

### Task 1: Pull and service-tag the 145 reviews

**Files:**
- Create: `scratchpad/reviews-raw.json` (full API dump)
- Create: `docs/research/review-mining.md` (service-tagged extract — stories, details, FAQs)

**Interfaces:**
- Produces: `docs/research/review-mining.md` with one section per money service (`tire-change`, `jump-start`, `lockout`, `fuel`) containing: 3-6 verbatim quotes, recurring detail themes, real customer questions. Later content tasks consume this.

- [ ] **Step 1: Fetch the reviews JSON**

Run:
```bash
curl -s "https://api.featurable.com/v1/widgets/9ff590b7-3128-4d17-a845-bc80f70b5313" -o scratchpad/reviews-raw.json
```
Expected: a JSON file containing every synced Google review (text, author, rating, time).

- [ ] **Step 2: Read and categorize**

Read `scratchpad/reviews-raw.json`. Sort each review into the service it describes (tire/screw/flat → tire-change; boost/battery/dead → jump-start; locked/keys → lockout; gas/fuel/empty → fuel; general → trust pool). Note city mentions (Scarborough, Pickering, Ajax, etc.).

- [ ] **Step 3: Write the mining doc**

Create `docs/research/review-mining.md`. For each money service: list verbatim quotes (with author + rating), a "recurring themes" list (e.g. "20-min arrivals", "found a screw others missed"), and a "real questions" list for FAQ seeds. Mark which quotes name a target city.

- [ ] **Step 4: Commit**

```bash
git add docs/research/review-mining.md
git commit -m "docs: mine 145 Google reviews into service-tagged research"
```

### Task 2: Competitor recon for the 4 money services

**Files:**
- Create: `docs/research/competitor-recon.md`
- Create: `scratchpad/competitor-pages/` (saved page snapshots/text per competitor)

**Interfaces:**
- Consumes: nothing.
- Produces: `docs/research/competitor-recon.md` listing the top 3 ranking competitors per money service with the page elements they share (sections, schema, trust signals, pricing presentation, FAQ topics, word count band).

- [ ] **Step 1: Run local searches with Playwright**

Use `browser_navigate` to Google for each money keyword × a target city, e.g.:
`mobile tire repair Pickering`, `roadside tire change Scarborough`, `car battery boost Pickering`, `car lockout Scarborough`, `emergency fuel delivery Pickering`. Capture the top organic roadside/tire/lockout result URLs (skip directories/aggregators like Yelp/YellowPages unless they dominate). Record which domains recur across searches.

- [ ] **Step 2: Pick the 3 most consistent winners and capture their pages**

For the 3 recurring domains, navigate to their tire/boost/lockout/fuel service pages. Use `browser_evaluate` to extract `document.body.innerText` and the JSON-LD `<script type="application/ld+json">` blocks. Save each to `scratchpad/competitor-pages/<domain>-<service>.txt`.

- [ ] **Step 3: Write the recon doc**

Create `docs/research/competitor-recon.md`. Per service: the 3 competitors, the sections every ranking page includes (the table-stakes checklist), how they present price/trust/FAQ, schema types used, and rough content length. Flag anything we currently lack.

- [ ] **Step 4: Commit**

```bash
git add docs/research/competitor-recon.md
git commit -m "docs: competitor recon for money-service pages"
```

---

## Phase B — Synthesize

### Task 3: NotebookLM synthesis into a content brief

**Files:**
- Create: `docs/research/content-brief.md`

**Interfaces:**
- Consumes: `docs/research/review-mining.md`, `docs/research/competitor-recon.md`, `scratchpad/competitor-pages/*`.
- Produces: `docs/research/content-brief.md` — per money service, the finalized section list + the specific unique angle, review quote(s), local detail, pricing line, and FAQ set to use. This is the single source the content tasks write from.

- [ ] **Step 1: Load sources into NotebookLM**

Use the `notebooklm` skill to create a notebook "iFAST Money-Service Pages" and add the competitor page text files and the two research docs as sources.

- [ ] **Step 2: Query for patterns and gaps**

Ask NotebookLM, per service: "What sections and topics do all top-ranking pages cover?", "What questions recur?", "What do these pages NOT do that a review-backed local page could?" Capture answers.

- [ ] **Step 3: Write the content brief**

Create `docs/research/content-brief.md`. For each of the 4 services, lock the 9-section blueprint content: the real on-site process, the chosen review story, transparent pricing line, the "beats the alternative" angle, the service-specific FAQ (6-8 Qs), and the local details per target city. Pull pricing from the existing `services/geminiService.ts` `SYSTEM_INSTRUCTION` ("starts at $X") so numbers stay consistent.

- [ ] **Step 4: Commit**

```bash
git add docs/research/content-brief.md
git commit -m "docs: content brief synthesizing recon + reviews per service"
```

---

## Phase C/D — Blueprint + Pilot

### Task 4: PILOT — rebuild the tire-change hub page

**Files:**
- Modify: `data/serviceContent.tsx` — replace `SERVICE_CONTENT['tire-change']`
- Reference: `pages/ServicePage.tsx` (renderer — confirm it consumes `blogSections`/`faqs` as-is)

**Interfaces:**
- Consumes: `docs/research/content-brief.md` (tire-change section).
- Produces: an exceptional `SERVICE_CONTENT['tire-change']` matching the 9-section blueprint. Sets the copy/structure pattern every later task mirrors.

- [ ] **Step 1: Confirm the renderer contract**

Read `pages/ServicePage.tsx`. Verify it maps `blogSections[].title/content` to headed sections and `faqs[]` to the FAQ + FAQPage schema, and emits Service schema with `aggregateRating`. Note any field needed so new content renders without renderer changes.

- [ ] **Step 2: Rewrite the tire-change content**

In `data/serviceContent.tsx`, replace the `'tire-change'` entry: new `seoTitle`/`seoDescription`/`keywords` (real local keywords from recon), and `blogSections` implementing blueprint sections 2-8 (how it works, real Scarborough/Pickering review scenario with a verbatim quote, transparent pricing, beats-the-alternative vs tow/CAA, service-matched trust quotes, local highways/areas, then the FAQ via `faqs`). Use brand classes and `<CallNowButton source="...">` with a descriptive source. Real review text only.

- [ ] **Step 3: Build to catch TS errors**

Sync the repo to `C:\Users\khati\ifast-build` and run:
```bash
npm run build
```
Expected: build succeeds, no TS errors from `serviceContent.tsx`.

- [ ] **Step 4: Verify render with Playwright**

Run `npm run preview` (from C:), `browser_navigate` to `/service/tire-change`, and `browser_evaluate` to confirm the new section headings and FAQ render and there is no "Page Not Found". Check the JSON-LD includes Service + FAQPage.

- [ ] **Step 5: Commit**

```bash
git add data/serviceContent.tsx
git commit -m "feat: rebuild tire-change hub page to exceptional blueprint"
```

- [ ] **Step 6: USER APPROVAL GATE**

Present the rebuilt tire-change hub to the user. Do NOT proceed to rollout until approved. Incorporate feedback into the blueprint/brief before continuing.

---

## Phase E — Roll out (after pilot approval)

### Task 5: Rebuild the lockout hub

**Files:**
- Modify: `data/serviceContent.tsx` — replace `SERVICE_CONTENT['lockout']`

**Interfaces:**
- Consumes: `content-brief.md` (lockout), approved tire-change pattern.

- [ ] **Step 1: Rewrite** `SERVICE_CONTENT['lockout']` mirroring the approved pattern with lockout content (damage-free unlock process, real lockout review story, pricing, trust quotes, FAQ). Real reviews only; brand classes; tracked CTAs.
- [ ] **Step 2: Build** from C: (`npm run build`) — expect no TS errors.
- [ ] **Step 3: Verify** `/service/lockout` renders new sections via Playwright; no "Page Not Found".
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild lockout hub page to blueprint"`

### Task 6: Rebuild the fuel hub

**Files:**
- Modify: `data/serviceContent.tsx` — replace `SERVICE_CONTENT['fuel']`

- [ ] **Step 1: Rewrite** `SERVICE_CONTENT['fuel']` with fuel content (gas/diesel delivery, real fuel review story, pricing, trust quotes, FAQ), mirroring the approved pattern.
- [ ] **Step 2: Build** from C: — expect no TS errors.
- [ ] **Step 3: Verify** `/service/fuel` renders; no "Page Not Found".
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild fuel hub page to blueprint"`

### Task 7: Rebuild tire-change combos (Scarborough, Ajax)

**Files:**
- Modify: `data/serviceCityContent.tsx` — `SERVICE_CITY_CONTENT['tire-change']['scarborough']` and `['ajax']`

**Interfaces:**
- Combo entries use fields: `h1, seoTitle, seoDescription, keywords, intro, localScenario, uniqueAngle, priceNote, faqs` (per `ServiceCityPage`).

- [ ] **Step 1: Rewrite** both combos with city-specific review stories and local detail (Scarborough = home base; Ajax = local demand). `localScenario` should use a real review naming that city where available; `uniqueAngle` differentiates the two cities (no near-duplicate copy).
- [ ] **Step 2: Build** from C: — no TS errors.
- [ ] **Step 3: Verify** `/service/tire-change/scarborough` and `/service/tire-change/ajax` render content (not "Page Not Found") via Playwright.
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild tire-change Scarborough + Ajax combos"`

### Task 8: Rebuild jump-start combos (Pickering, Scarborough)

**Files:**
- Modify: `data/serviceCityContent.tsx` — `SERVICE_CITY_CONTENT['jump-start']['pickering']` and `['scarborough']`

- [ ] **Step 1: Rewrite** both with real boost/battery review stories and city detail; distinct angles per city.
- [ ] **Step 2: Build** from C: — no TS errors.
- [ ] **Step 3: Verify** both URLs render via Playwright.
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild jump-start Pickering + Scarborough combos"`

### Task 9: Rebuild lockout combos (Pickering, Scarborough)

**Files:**
- Modify: `data/serviceCityContent.tsx` — `SERVICE_CITY_CONTENT['lockout']['pickering']` and `['scarborough']`

- [ ] **Step 1: Rewrite** both with real lockout review stories and city detail; distinct angles.
- [ ] **Step 2: Build** from C: — no TS errors.
- [ ] **Step 3: Verify** both URLs render via Playwright.
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild lockout Pickering + Scarborough combos"`

### Task 10: Rebuild fuel combo (Pickering)

**Files:**
- Modify: `data/serviceCityContent.tsx` — `SERVICE_CITY_CONTENT['fuel']['pickering']`

- [ ] **Step 1: Rewrite** with real fuel review story + Pickering detail.
- [ ] **Step 2: Build** from C: — no TS errors.
- [ ] **Step 3: Verify** `/service/fuel/pickering` renders via Playwright.
- [ ] **Step 4: Commit** `git commit -m "feat: rebuild fuel Pickering combo"`

---

## Phase F — Ship & index

### Task 11: Sitemap + dead-link fix + deploy

**Files:**
- Modify: `public/sitemap.xml` — add the 3 "unknown to Google" combos if absent
- Already-modified: `pages/ServiceCityPage.tsx` (dead-link `!s.parent` fix from earlier — deploy it now)

- [ ] **Step 1: Check sitemap** for `tire-change/scarborough`, `fuel/pickering`, `tire-change/ajax`. All three are already present in `public/sitemap.xml` (lines ~163-185) — confirm and update `lastmod` to today for the 10 rebuilt URLs. Add any missing.
- [ ] **Step 2: Build** the full site from `C:\Users\khati\ifast-build` (`npm run build`) — confirm clean.
- [ ] **Step 3: Verify** with Playwright that all 10 target URLs + a sample of existing combos render correctly (no regressions, no "Page Not Found").
- [ ] **Step 4: Commit + push**

```bash
git add public/sitemap.xml pages/ServiceCityPage.tsx
git commit -m "chore: refresh sitemap lastmod + ship dead-link fix"
git push origin main
```
Expected: Vercel auto-deploys from `main`.

### Task 12: Request indexing + monitor

**Files:** none (GSC operation).

- [ ] **Step 1:** After Vercel deploy completes, resubmit the sitemap in GSC and request indexing for the 10 rebuilt URLs (user-interactive — see memory `ifast-publish-seo-page-workflow`). Prioritize the 3 "unknown to Google" URLs.
- [ ] **Step 2:** Record submission in `docs/seo-roadmap-and-recommendations.md` and set a follow-up to re-check coverage in ~2-3 weeks (most pages shift off "Discovered/Unknown" within that window if quality reads as helpful).

---

## Self-Review notes

- **Spec coverage:** all 10 pages mapped (Tasks 4-10); research (1-3); ship/index (11-12); dead-link fix folded into Task 11; review-proof + local detail required in every content task; schema confirmed in Task 4 Step 1. ✓
- **Real-reviews constraint** restated in every content task. ✓
- **Build-from-C: constraint** applied as the verification step (no pytest — repo has no test runner). ✓
- **Pilot gate** is an explicit blocking step (Task 4 Step 6) before any rollout. ✓
- **Field names** for combos (`intro/localScenario/uniqueAngle/priceNote/faqs`) and hubs (`blogSections/faqs`) match the renderers verified earlier. ✓
