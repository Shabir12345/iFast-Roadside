# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **iFAST Roadside & Mobile Tires** — a roadside assistance company serving the East GTA (Pickering, Ajax, Whitby, Oshawa, Scarborough). Phone `+1 437-215-3468`. The site's primary job is to convert paid-traffic visitors into phone calls, so call CTAs and Google Ads conversion tracking matter more than most features.

Deployed on Vercel (`vercel.json` rewrites all paths to `/` for SPA fallback). Canonical domain: `ifastroadside.ca`.

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
- **@google/genai** for the ChatBot (Gemini)

## Architecture

### Routing
`App.tsx` defines three routes:
- `/` → `pages/Home.tsx` (hero + all marketing sections)
- `/service/:id` → `pages/ServicePage.tsx` (one page per service, `:id` must match a `SERVICES[].id`)
- `/service-area/east-gta` → `pages/EastGtaServiceAreaPage.tsx` (localized landing page)

`ChatBot` and `StickyCall` are global, rendered outside `<Routes>`.

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

### Gemini ChatBot
`services/geminiService.ts` wraps `@google/genai`. The `SYSTEM_INSTRUCTION` constant hardcodes service pricing ("starts at $X") and the East GTA focus — treat it as product copy, not config. If prices or service areas change, update this string too.

**Env var wiring is inconsistent and worth knowing:**
- `.env.local` defines `GEMINI_API_KEY`
- `vite.config.ts` exposes it as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `define`
- But `services/geminiService.ts` reads `import.meta.env.VITE_GEMINI_API_KEY`

These don't match, so the chatbot currently falls back to its "I'm offline" message. Fixing it means either renaming the env var to `VITE_GEMINI_API_KEY` or updating the service to read one of the `process.env.*` keys that `vite.config.ts` actually defines.

### Styling conventions
- Brand colors come from the inline Tailwind config in `index.html` — use `bg-brand-yellow`, `text-brand-dark`, etc. Don't introduce raw hex for brand colors.
- Heavy use of `premium-shadow`, `premium-shadow-hover`, and `background-pattern` utilities — these are defined in `index.css`, not Tailwind.
- The site leans on big, punchy CTAs (yellow-on-dark, oversized type, pulse/shimmer animations). When adding sections, match the existing weight and spacing — sober / understated doesn't fit the conversion-optimized tone.

## Deployment
Vercel auto-deploys from `main`. `vercel.json` rewrites everything to `/` so React Router handles client-side routing. If you add a new top-level route, no config change is needed.
