# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **iFAST Roadside & Mobile Tires** — a roadside assistance company serving the whole Greater Toronto Area (units stationed GTA-wide across Toronto, Durham, York, and Peel), with its home base and fastest response in the East GTA (Scarborough, Pickering, Ajax, Whitby, Oshawa). Phone `+1 437-215-3468`. The site's primary job is to convert paid-traffic visitors into phone calls, so call CTAs and Google Ads conversion tracking matter more than most features.

Deployed on Vercel (`vercel.json` rewrites all paths to `/` for SPA fallback). Canonical domain: `www.ifastroadside.ca` (the apex `ifastroadside.ca` 307-redirects to www via Vercel; all canonicals/sitemap/schema use www).

## Commands

```bash
npm install          # install deps
npm run dev          # Vite dev server on 0.0.0.0:3000
npm run build        # production build to dist/
npm run preview      # preview production build
```

No test runner, linter, or formatter is configured. Type-checking happens implicitly through Vite — run `npm run build` to surface TS errors.

## Stack

- **React 19** + **TypeScript** + **Vite 6**
- **React Router v7** (`BrowserRouter` in `index.tsx`)
- **react-helmet-async** for per-page `<head>` / JSON-LD
- **Tailwind via CDN** — loaded from `cdn.tailwindcss.com` in `index.html`. There is no PostCSS/Tailwind build step. The theme (including brand colors `brand-dark`, `brand-yellow`, `brand-yellowHover`, `brand-gray`) is configured inline in a `<script>` tag in `index.html`. `index.css` holds a few custom utilities and keyframes, not Tailwind source.
- **Lucide React** for icons

## Architecture

### Routing
Key routes in `App.tsx`:
- `/` → `pages/Home.tsx` (hero + all marketing sections)
- `/service/:id` → `pages/ServicePage.tsx` (one page per service, `:id` must match a `SERVICES[].id`)
- `/service-area/:region` → `pages/RegionServiceAreaPage.tsx` (localized regional landing pages, driven by `REGION_CONTENT` in `data/regionContent.tsx`; `:region` must match a key like `east-gta`, `toronto`, `west-gta`, `york-region`. Unknown slugs redirect to `/service-area/east-gta`). `east-gta` is the home-base region and was the original standalone landing page.
- `/areas/:city` → `pages/CityPage.tsx` (per-city pages, driven by `CITY_CONTENT`)

`StickyCall` is global, rendered outside `<Routes>`.

### Service content is split across two files — keep them in sync
A service exists in two places and both must be edited together:

1. **`constants.tsx`** — `SERVICES` array. Short metadata (id, title, short description, Lucide icon). This drives the homepage grid and the `/service/:id` lookup.
2. **`data/serviceContent.tsx`** — `SERVICE_CONTENT` map keyed by the same `id`. Long-form per-service content: SEO title/description/keywords, hero image path, `blogSections` (React nodes), and `faqs`. `ServicePage` renders this and emits JSON-LD `Service` + `FAQPage` schemas from it.

If you add a service to `constants.tsx` without a matching `SERVICE_CONTENT[id]`, `ServicePage` renders nothing (`if (!contentData) return null`). If you add to `SERVICE_CONTENT` without `constants.tsx`, the route 404s.

`constants.tsx` is also where `COMPANY_NAME`, `PHONE_NUMBER`, and `EMAIL` live — change the phone number here and it propagates everywhere.

### Conversion tracking — the whole point of the site
Every phone CTA must call `trackPhoneCall(source)` from `utils/analytics.ts` in its `onClick`. This pushes a Google Ads conversion to `gtag` (ID `AW-18054263913`, label `hHrJCPzimZgcEOno-KBD`). A unique `transaction_id` is generated per click to prevent Google's double-count dedup from collapsing multiple calls. When adding a new CTA, pick a descriptive `source` label (e.g. `hero_call_home`, `footer_call_tire-change`) so click attribution stays legible in the Ads UI.

The base `gtag` script is loaded in `index.html`. Don't move it to React — it needs to load on the initial HTML response for conversion attribution to work reliably.

### SEO
JSON-LD lives in two places:
- **`index.html`** — `LocalBusiness`, `Organization`, and a homepage `FAQPage` schema. Hardcoded, not React-driven.
- **`pages/ServicePage.tsx`** — dynamically builds `Service` + `FAQPage` JSON-LD from `SERVICE_CONTENT` and injects via `<Helmet>`.

When editing business info (hours, service areas, address, phone), update both the `index.html` JSON-LD block and `constants.tsx`.

### ChatBot (removed 2026-07-20)
The site previously shipped a Gemini-backed `ChatBot` (`components/ChatBot.tsx` +
`services/geminiService.ts`, wrapping `@google/genai`). It was removed because it
wasn't in use. Along with it went the `@google/genai` dependency, the
`process.env.API_KEY` / `process.env.GEMINI_API_KEY` defines in `vite.config.ts`,
and the `@google/genai` importmap entry in `index.html`.

If it's ever restored, pull the files from git history rather than rewriting
them — `SYSTEM_INSTRUCTION` carried hand-tuned product copy (service pricing,
per-district ETAs, condo-garage access rules) that took several passes to get
right. `.env.local` still holds `GEMINI_API_KEY` and was intentionally left alone.

### Styling conventions
- Brand colors come from the inline Tailwind config in `index.html` — use `bg-brand-yellow`, `text-brand-dark`, etc. Don't introduce raw hex for brand colors.
- Heavy use of `premium-shadow`, `premium-shadow-hover`, and `background-pattern` utilities — these are defined in `index.css`, not Tailwind.
- The site leans on big, punchy CTAs (yellow-on-dark, oversized type, pulse/shimmer animations). When adding sections, match the existing weight and spacing — sober / understated doesn't fit the conversion-optimized tone.

## Deployment
Vercel auto-deploys from `main`. `vercel.json` rewrites everything to `/` so React Router handles client-side routing. If you add a new top-level route, no config change is needed.
