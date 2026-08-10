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
- **Tailwind, compiled** — real PostCSS build (`postcss.config.js` + `tailwind.config.js`), not the CDN script. Brand colors (`brand-dark`, `brand-yellow`, `brand-yellowHover`, `brand-gray`) are defined in `tailwind.config.js`; `index.css` holds the `@tailwind` directives plus custom utilities, keyframes, and the `@font-face` blocks.
- **Lucide React** for icons
- **Inter, self-hosted** — `public/fonts/*.woff2`, declared in `index.css` and preloaded in `index.html`. Not fetched from Google Fonts: that cost a render-blocking request on a third-party origin. The variable font covers weights 100-900, which matters because the site uses `font-black` (900) and `font-medium` (500).

## Architecture

### Routing
Key routes in `App.tsx`:
- `/` → `pages/Home.tsx` (hero + all marketing sections)
- `/service/:id` → `pages/ServicePage.tsx` (one page per service, `:id` must match a `SERVICES[].id`)
- `/service-area/:region` → `pages/RegionServiceAreaPage.tsx` (localized regional landing pages, driven by `REGION_CONTENT` in `data/regionContent.tsx`; `:region` must match a key like `east-gta`, `toronto`, `west-gta`, `york-region`. Unknown slugs redirect to `/service-area/east-gta`). `east-gta` is the home-base region and was the original standalone landing page.
- `/areas/:city` → `pages/CityPage.tsx` (per-city pages, driven by `CITY_CONTENT`)

`StickyCall` is global, rendered outside `<Routes>`.

Routes live in the `ROUTES` array in `App.tsx` — that array is the single source
of truth, feeding both `<Routes>` and the preloading below. Add a route there,
not as a loose `<Route>`.

### Route code splitting — three rules that must hold together
Page components are lazily imported through `lazyRoute()` (`utils/lazyRoute.tsx`)
so a visitor only downloads the content data for the page they landed on. The
heavy files (`data/blogContent.tsx`, `data/serviceContent.tsx`,
`data/serviceCityContent.tsx`) are JSX, so importing them *executes* — building
every element tree — which is why they must stay off other routes.

Three things depend on each other; breaking any one breaks the build or the page:

1. `entry-server.tsx` exports `warmup()`, and `scripts/prerender.mjs` awaits it
   before rendering. `renderToString` cannot render a `React.lazy` component —
   it throws instead of suspending — so every route must be resolved first.
2. `index.tsx` awaits `preloadMatchingRoute(location.pathname)` before mounting.
   Do not remove this. React does not preserve prerendered HTML for a Suspense
   boundary that suspends on mount; it renders the boundary empty, which
   collapses the document and moves the footer a full viewport (measured CLS of
   1.0 when this was missing).
3. `index.tsx` uses `createRoot`, not `hydrateRoot`. Hydration currently fails
   with React error #418 on every route except `/` because react-helmet-async v3
   under React 19 renders `<title>`/`<meta>`/`<link>`/JSON-LD into the component
   tree instead of into `helmetContext`, so `renderToString` emits them inside
   `#root`. Fixing that is a prerequisite for hydrating (see SEO note below).

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

**Known issue — per-page `<head>` tags are emitted inside `<body>`.** Under
React 19, react-helmet-async v3 no longer populates `helmetContext`, so the
`head` string that `scripts/prerender.mjs` injects into `</head>` is empty and
the real `<title>`, `<meta name="description">`, `rel="canonical"` and page
JSON-LD are serialised inside `#root` instead. Verified on production, not just
locally. Titles and descriptions still work (`document.title` resolves by tree
order regardless of parent), which is why Lighthouse SEO still scores 100 — but
**Google only honours `rel="canonical"` in `<head>`**, so per-page canonicals are
currently inert. Fixing this also unblocks `hydrateRoot`.

### Images
`public/*.webp` are generated — never hand-edit them. Sources live in
`assets-src/` (kept out of `public/`, which is copied verbatim into `dist/`), and
`node scripts/optimize-images.mjs` regenerates the outputs. If you change an
image's dimensions there, update the matching `width`/`height` props on the
`<img>`, and the `<link rel="preload">` in `index.html` if it is the logo.

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
- Brand colors come from `tailwind.config.js` — use `bg-brand-yellow`, `text-brand-dark`, etc. Don't introduce raw hex for brand colors.
- Heavy use of `premium-shadow`, `premium-shadow-hover`, and `background-pattern` utilities — these are defined in `index.css`, not Tailwind.
- The site leans on big, punchy CTAs (yellow-on-dark, oversized type, pulse/shimmer animations). When adding sections, match the existing weight and spacing — sober / understated doesn't fit the conversion-optimized tone.

## Deployment
Vercel auto-deploys from `main`. `vercel.json` rewrites everything to `/` so React Router handles client-side routing. If you add a new top-level route, no config change is needed.

`scripts/prerender.mjs` inlines the compiled stylesheet into each page's
`<head>` rather than linking it, so there is no render-blocking CSS request. It
aborts the build if it cannot find Vite's emitted `<link rel="stylesheet">` —
that guard exists so a Vite upgrade fails loudly instead of shipping 72 unstyled
pages.
