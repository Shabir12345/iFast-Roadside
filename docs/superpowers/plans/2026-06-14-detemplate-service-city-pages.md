# De-templating Service & Service×City Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cloned page templates on the 6 service pages and 30 service×city combos with a modular content-block system carrying genuinely unique, verified, hyperlocal content + distinct real photos, and harden site-wide crawlability/internal-linking so Google indexes them.

**Architecture:** A typed `ContentBlock` union renders via a `BlockRenderer`; each page is `{ meta, hero, blocks }` with a different block sequence (per the spec matrix). The page chrome (hero/reviews/Process/footer CTA) stays shared. Sitemap is generated from route data before prerender; a content validator enforces uniqueness and the no-stuffing rules against the prerendered HTML.

**Tech Stack:** React 19 + TypeScript + Vite 6 SSR prerender, react-helmet-async, Tailwind (CDN), Lucide, Pexels API, Node ESM scripts.

**Spec:** `docs/superpowers/specs/2026-06-14-detemplate-service-city-pages-design.md`

---

## Critical execution notes (read first)

- **Build/run on the C:\ clone, not G:\.** npm is broken on G:; Google Drive can roll back `.git`/files on G:. All `npm run build`, scripts, and commits happen in `C:\Users\khati\ifast-build`. GitHub is the source of truth; Vercel auto-deploys `main`.
- **No test runner exists.** "Tests" in this plan are (a) `npm run build` (TypeScript type-check + prerender, which fails any page < 500 chars) and (b) `node scripts/validate-content.mjs` run against `dist/`. Treat a failing build/validator as a red test.
- **Pexels key** lives in `.env.local` as `PEXELS_API_KEY=...` (gitignored). Never commit it.
- **Facts are verified, not invented.** Task 3 (knowledge bank) gates all legal/numeric claims; content tasks cite it.
- **Main services** = `SERVICES.filter(s => !s.parent)` → exactly the 6: `mobile-mechanic, tire-change, jump-start, lockout, fuel, towing`. Only these 6 have combos.

---

## File structure

**New:**
- `data/blocks.ts` — `ContentBlock` union + `PageMeta`, `PageHero`, `ServicePageData`, `ComboPageData`.
- `components/blocks/InlineCall.tsx` — shared call CTA (replaces the 3 duplicated copies).
- `components/blocks/SectionHeading.tsx` — shared yellow-underline H2.
- `components/blocks/{ProseBlock,CostTableBlock,ChecklistBlock,HotspotsBlock,SeasonalBlock,DecisionBlock,ClaimGuideBlock,StatCalloutBlock,GlossaryBlock,FaqBlock}.tsx`.
- `components/blocks/BlockRenderer.tsx` — dispatch on `block.type`.
- `utils/schema.ts` — `faqJsonLd`, `howToJsonLd`, `itemListJsonLd` from a block array.
- `data/imageManifest.json` — `{ [pageKey]: { path, photographer, sourceUrl } }`.
- `scripts/fetch-pexels.mjs` — download 36 distinct heroes + write manifest.
- `scripts/generate-sitemap.mjs` — derive sitemap from compiled route data.
- `scripts/optimize-images.mjs` — compress `logo.png` + icons (sharp).
- `scripts/validate-content.mjs` — enforce acceptance criteria against `dist/`.
- `docs/knowledge-bank.md` — verified facts + sources (internal, not shipped).

**Modified:**
- `data/serviceContent.tsx` — schema → `{ id, meta, hero, blocks }`; all 11 entries migrated.
- `data/serviceCityContent.tsx` — schema → `{ meta, hero, blocks }`; 30 combos rewritten.
- `pages/ServicePage.tsx`, `pages/ServiceCityPage.tsx` — render via `BlockRenderer` + `utils/schema`.
- `pages/CityPage.tsx` — ensure links to all 6 combos for the city (descriptive anchors).
- `components/Footer.tsx` — add the 6 service links.
- `entry-server.tsx` — export `getRoutes()`.
- `package.json` — `build` runs sitemap generator before prerender; add `sharp` devDep.

---

## Phase 0 — Setup

### Task 0: Confirm build baseline on C:\

**Files:** none (environment check)

- [ ] **Step 1: Sync the C:\ clone to latest `main`**

Run (in `C:\Users\khati\ifast-build`):
```bash
git pull origin main && npm install
```
Expected: clean pull, deps installed.

- [ ] **Step 2: Baseline build**

Run: `npm run build`
Expected: PASS — `Prerendered 54/54 routes.` If it fails, stop and fix the baseline before continuing.

- [ ] **Step 3: Confirm Pexels key present**

Run: `node -e "import('node:fs').then(fs=>console.log(fs.readFileSync('.env.local','utf8').includes('PEXELS_API_KEY')?'KEY OK':'MISSING KEY'))"`
Expected: `KEY OK`. If missing, add `PEXELS_API_KEY=...` to `.env.local`.

---

## Phase 1 — Block system infrastructure

### Task 1: Block types

**Files:**
- Create: `data/blocks.ts`

- [ ] **Step 1: Write the types**

```ts
import React from 'react';

export interface PageMeta {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  h1: string;
}

export interface PageHero {
  /** path under public/, e.g. /images/pages/tire-change-whitby.jpg */
  image: string;
  /** photo credit line, e.g. "Photo: Jane Doe / Pexels" */
  credit?: string;
}

export type ContentBlock =
  | { type: 'prose'; heading?: string; body: React.ReactNode }
  | { type: 'costTable'; heading: string; rows: { item: string; price: string; note?: string }[]; footnote?: string }
  | { type: 'checklist'; heading: string; variant: 'safety' | 'steps' | 'bring'; intro?: React.ReactNode; items: { title: string; detail: string }[] }
  | { type: 'hotspots'; heading: string; intro?: React.ReactNode; spots: { place: string; why: string }[] }
  | { type: 'seasonal'; heading: string; body: React.ReactNode; stat?: { value: string; label: string } }
  | { type: 'decision'; heading: string; intro?: React.ReactNode; branches: { condition: string; recommendation: string }[] }
  | { type: 'claimGuide'; heading: string; jurisdiction: string; steps: string[]; deadline?: string; sourceUrl?: string }
  | { type: 'statCallout'; stat: string; label: string; source?: string }
  | { type: 'glossary'; heading: string; terms: { term: string; definition: string }[] }
  | { type: 'faq'; heading?: string; items: { question: string; answer: string }[] };

export interface ServicePageData {
  id: string;
  meta: PageMeta;
  hero: PageHero;
  blocks: ContentBlock[];
}

export interface ComboPageData {
  meta: PageMeta;
  hero: PageHero;
  blocks: ContentBlock[];
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no references yet).

- [ ] **Step 3: Commit**

```bash
git add data/blocks.ts
git commit -m "feat: add ContentBlock type system for page blocks"
```

### Task 2: Shared presentational primitives

**Files:**
- Create: `components/blocks/SectionHeading.tsx`
- Create: `components/blocks/InlineCall.tsx`

- [ ] **Step 1: SectionHeading**

```tsx
import React from 'react';

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-brand-dark relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1.5 after:bg-brand-yellow after:rounded-full">
    {children}
  </h2>
);

export default SectionHeading;
```

- [ ] **Step 2: InlineCall** (replaces the duplicated copies in the two data files)

```tsx
import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PHONE_NUMBER } from '../../constants';
import { trackPhoneCall } from '../../utils/analytics';

const InlineCall: React.FC<{ source: string; label?: string }> = ({ source, label = 'Call Local Dispatch' }) => (
  <div className="my-6 text-center sm:text-left">
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackPhoneCall(source)}
      className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 premium-shadow-hover animate-pulse"
      style={{ animationDuration: '2s' }}
    >
      <PhoneCall size={20} />
      {label}
    </a>
  </div>
);

export default InlineCall;
```

- [ ] **Step 3: Type-check + commit**

Run: `npx tsc --noEmit` → PASS
```bash
git add components/blocks/SectionHeading.tsx components/blocks/InlineCall.tsx
git commit -m "feat: add shared SectionHeading and InlineCall block primitives"
```

### Task 3: The 10 block components

**Files:**
- Create: `components/blocks/ProseBlock.tsx`, `CostTableBlock.tsx`, `ChecklistBlock.tsx`, `HotspotsBlock.tsx`, `SeasonalBlock.tsx`, `DecisionBlock.tsx`, `ClaimGuideBlock.tsx`, `StatCalloutBlock.tsx`, `GlossaryBlock.tsx`, `FaqBlock.tsx`

Each component takes its block variant as `props`. Write all ten:

- [ ] **Step 1: ProseBlock.tsx**

```tsx
import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'prose' }>;

const ProseBlock: React.FC<P> = ({ heading, body }) => (
  <section className="mb-12">
    {heading && <SectionHeading>{heading}</SectionHeading>}
    <div className="prose prose-lg md:prose-xl max-w-none prose-p:text-gray-600 leading-relaxed">{body}</div>
  </section>
);

export default ProseBlock;
```

- [ ] **Step 2: CostTableBlock.tsx**

```tsx
import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'costTable' }>;

const CostTableBlock: React.FC<P> = ({ heading, rows, footnote }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    <div className="overflow-hidden rounded-2xl border border-gray-200 premium-shadow">
      <table className="w-full text-left">
        <thead className="bg-brand-dark text-white text-sm uppercase tracking-wider">
          <tr><th className="px-5 py-4">Service</th><th className="px-5 py-4">Starting price</th><th className="px-5 py-4 hidden sm:table-cell">Notes</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i} className="bg-white">
              <td className="px-5 py-4 font-bold text-brand-dark">{r.item}</td>
              <td className="px-5 py-4 text-brand-dark font-black">{r.price}</td>
              <td className="px-5 py-4 text-gray-500 text-sm hidden sm:table-cell">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {footnote && <p className="text-xs text-gray-400 mt-3">{footnote}</p>}
  </section>
);

export default CostTableBlock;
```

- [ ] **Step 3: ChecklistBlock.tsx**

```tsx
import React from 'react';
import { CheckCircle2, ShieldAlert, ListChecks } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'checklist' }>;
const ICON = { safety: ShieldAlert, steps: ListChecks, bring: CheckCircle2 };

const ChecklistBlock: React.FC<P> = ({ heading, variant, intro, items }) => {
  const Icon = ICON[variant];
  return (
    <section className="mb-12">
      <SectionHeading>{heading}</SectionHeading>
      {intro && <div className="text-gray-600 mb-6 leading-relaxed">{intro}</div>}
      <ol className="space-y-4">
        {items.map((it, i) => (
          <li key={i} className="flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <span className="shrink-0 w-9 h-9 rounded-full bg-brand-yellow/15 text-brand-dark flex items-center justify-center font-black">
              {variant === 'steps' ? i + 1 : <Icon size={18} className="text-brand-yellow" />}
            </span>
            <div>
              <h3 className="font-bold text-brand-dark mb-1">{it.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed m-0">{it.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ChecklistBlock;
```

- [ ] **Step 4: HotspotsBlock.tsx**

```tsx
import React from 'react';
import { MapPin } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'hotspots' }>;

const HotspotsBlock: React.FC<P> = ({ heading, intro, spots }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    {intro && <div className="text-gray-600 mb-6 leading-relaxed">{intro}</div>}
    <div className="grid sm:grid-cols-2 gap-4">
      {spots.map((s, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 premium-shadow">
          <div className="flex items-center gap-2 font-bold text-brand-dark mb-2"><MapPin size={18} className="text-brand-yellow" />{s.place}</div>
          <p className="text-gray-600 text-sm leading-relaxed m-0">{s.why}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HotspotsBlock;
```

- [ ] **Step 5: SeasonalBlock.tsx**

```tsx
import React from 'react';
import { Snowflake } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'seasonal' }>;

const SeasonalBlock: React.FC<P> = ({ heading, body, stat }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    <div className="flex flex-col md:flex-row gap-6 items-start bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
      <Snowflake size={32} className="text-blue-500 shrink-0" />
      <div className="flex-1">
        <div className="text-gray-700 leading-relaxed">{body}</div>
        {stat && (
          <div className="mt-4 inline-flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-dark">{stat.value}</span>
            <span className="text-sm text-gray-500 font-semibold">{stat.label}</span>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default SeasonalBlock;
```

- [ ] **Step 6: DecisionBlock.tsx**

```tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'decision' }>;

const DecisionBlock: React.FC<P> = ({ heading, intro, branches }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    {intro && <div className="text-gray-600 mb-6 leading-relaxed">{intro}</div>}
    <div className="space-y-3">
      {branches.map((b, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-2xl p-5 premium-shadow">
          <span className="font-bold text-brand-dark sm:w-1/2">{b.condition}</span>
          <ArrowRight size={18} className="text-brand-yellow hidden sm:block" />
          <span className="text-gray-600 sm:w-1/2">{b.recommendation}</span>
        </div>
      ))}
    </div>
  </section>
);

export default DecisionBlock;
```

- [ ] **Step 7: ClaimGuideBlock.tsx**

```tsx
import React from 'react';
import { FileText } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'claimGuide' }>;

const ClaimGuideBlock: React.FC<P> = ({ heading, jurisdiction, steps, deadline, sourceUrl }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-sm font-bold text-brand-dark uppercase tracking-wider mb-4">
        <FileText size={18} className="text-brand-yellow" /> {jurisdiction}
      </div>
      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
        {steps.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
      </ol>
      {deadline && <p className="mt-4 text-sm font-bold text-red-700">Deadline: {deadline}</p>}
      {sourceUrl && <p className="mt-2 text-xs text-gray-400">Official process: {sourceUrl}</p>}
    </div>
  </section>
);

export default ClaimGuideBlock;
```

- [ ] **Step 8: StatCalloutBlock.tsx**

```tsx
import React from 'react';
import type { ContentBlock } from '../../data/blocks';

type P = Extract<ContentBlock, { type: 'statCallout' }>;

const StatCalloutBlock: React.FC<P> = ({ stat, label, source }) => (
  <section className="mb-12">
    <div className="bg-brand-dark text-white rounded-2xl p-8 text-center premium-shadow">
      <div className="text-5xl md:text-6xl font-black text-brand-yellow mb-2">{stat}</div>
      <div className="text-lg font-semibold">{label}</div>
      {source && <div className="text-xs text-white/40 mt-3">{source}</div>}
    </div>
  </section>
);

export default StatCalloutBlock;
```

- [ ] **Step 9: GlossaryBlock.tsx**

```tsx
import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'glossary' }>;

const GlossaryBlock: React.FC<P> = ({ heading, terms }) => (
  <section className="mb-12">
    <SectionHeading>{heading}</SectionHeading>
    <dl className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
      {terms.map((t, i) => (
        <div key={i} className="grid sm:grid-cols-3 gap-1 sm:gap-4 p-5 bg-white">
          <dt className="font-bold text-brand-dark">{t.term}</dt>
          <dd className="sm:col-span-2 text-gray-600 m-0 leading-relaxed">{t.definition}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default GlossaryBlock;
```

- [ ] **Step 10: FaqBlock.tsx** (owns its own accordion state)

```tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';

type P = Extract<ContentBlock, { type: 'faq' }>;

const FaqBlock: React.FC<P> = ({ heading = 'Frequently Asked Questions', items }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mb-12">
      <div className="bg-brand-dark text-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,30,54,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-[80px]"></div>
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-center relative z-10 tracking-tight">{heading}</h2>
        <div className="space-y-4 relative z-10">
          {items.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/10 transition-colors">
                <span className="font-bold text-lg pr-4">{faq.question}</span>
                <ChevronDown className={`text-brand-yellow transition-transform duration-300 shrink-0 ${open === i ? 'rotate-180' : ''}`} size={24} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqBlock;
```

- [ ] **Step 11: Type-check + commit**

Run: `npx tsc --noEmit` → PASS
```bash
git add components/blocks/
git commit -m "feat: add 10 content-block components"
```

### Task 4: BlockRenderer

**Files:**
- Create: `components/blocks/BlockRenderer.tsx`

- [ ] **Step 1: Write the dispatcher**

```tsx
import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import ProseBlock from './ProseBlock';
import CostTableBlock from './CostTableBlock';
import ChecklistBlock from './ChecklistBlock';
import HotspotsBlock from './HotspotsBlock';
import SeasonalBlock from './SeasonalBlock';
import DecisionBlock from './DecisionBlock';
import ClaimGuideBlock from './ClaimGuideBlock';
import StatCalloutBlock from './StatCalloutBlock';
import GlossaryBlock from './GlossaryBlock';
import FaqBlock from './FaqBlock';

const BlockRenderer: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => (
  <>
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'prose': return <ProseBlock key={i} {...block} />;
        case 'costTable': return <CostTableBlock key={i} {...block} />;
        case 'checklist': return <ChecklistBlock key={i} {...block} />;
        case 'hotspots': return <HotspotsBlock key={i} {...block} />;
        case 'seasonal': return <SeasonalBlock key={i} {...block} />;
        case 'decision': return <DecisionBlock key={i} {...block} />;
        case 'claimGuide': return <ClaimGuideBlock key={i} {...block} />;
        case 'statCallout': return <StatCalloutBlock key={i} {...block} />;
        case 'glossary': return <GlossaryBlock key={i} {...block} />;
        case 'faq': return <FaqBlock key={i} {...block} />;
        default: return null;
      }
    })}
  </>
);

export default BlockRenderer;
```

- [ ] **Step 2: Type-check + commit**

Run: `npx tsc --noEmit` → PASS
```bash
git add components/blocks/BlockRenderer.tsx
git commit -m "feat: add BlockRenderer dispatcher"
```

### Task 5: Schema helpers

**Files:**
- Create: `utils/schema.ts`

- [ ] **Step 1: Write the collectors**

```ts
import type { ContentBlock } from '../data/blocks';

export function faqJsonLd(blocks: ContentBlock[]) {
  const items = blocks.flatMap(b => (b.type === 'faq' ? b.items : []));
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function howToJsonLd(blocks: ContentBlock[], name: string) {
  const steps = blocks.find(b => b.type === 'checklist' && b.variant === 'steps');
  if (!steps || steps.type !== 'checklist') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.items.map(it => ({ '@type': 'HowToStep', name: it.title, text: it.detail })),
  };
}

export function itemListJsonLd(blocks: ContentBlock[]) {
  const hot = blocks.find(b => b.type === 'hotspots');
  if (!hot || hot.type !== 'hotspots') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: hot.spots.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.place })),
  };
}
```

- [ ] **Step 2: Type-check + commit**

Run: `npx tsc --noEmit` → PASS
```bash
git add utils/schema.ts
git commit -m "feat: add block-derived JSON-LD helpers"
```

---

## Phase 2 — Wire the renderers (with a temporary shim so the build stays green)

### Task 6: Refactor ServiceCityPage to BlockRenderer

**Files:**
- Modify: `pages/ServiceCityPage.tsx`

The page keeps its hero, trust bar, GoogleReviews, Process, cross-links, footer CTA. Replace **only** the middle `<article>` (the `intro`/`localScenario`/`uniqueAngle`/`priceNote` section, lines ~226–257) and the dark FAQ section (lines ~261–291) with block rendering, and replace the per-page JSON-LD `faqLd` with the helper.

- [ ] **Step 1: Update imports** (add near the top imports)

```tsx
import BlockRenderer from '../components/blocks/BlockRenderer';
import { faqJsonLd, howToJsonLd, itemListJsonLd } from '../utils/schema';
```

- [ ] **Step 2: Replace the `faqLd` const** (was built from `combo.faqs`)

```tsx
const faqLd = faqJsonLd(combo.blocks);
const howToLd = howToJsonLd(combo.blocks, combo.meta.h1);
const itemListLd = itemListJsonLd(combo.blocks);
```

- [ ] **Step 3: Update Helmet** — use `combo.meta.*` and emit optional schema. Replace the `<title>`/meta/script block fields that referenced `combo.seoTitle` etc.:

```tsx
<title>{combo.meta.seoTitle}</title>
<meta name="description" content={combo.meta.seoDescription} />
<meta name="keywords" content={combo.meta.keywords} />
<link rel="canonical" href={canonical} />
<meta name="robots" content="index, follow" />
<meta property="og:title" content={combo.meta.seoTitle} />
<meta property="og:description" content={combo.meta.seoDescription} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={`https://www.ifastroadside.ca${combo.hero.image}`} />
<meta property="og:type" content="website" />
<script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
<script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
{faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
{howToLd && <script type="application/ld+json">{JSON.stringify(howToLd)}</script>}
{itemListLd && <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>}
```

Also update the `serviceLd` fields `'name': combo.h1` → `combo.meta.h1`, `'description': combo.seoDescription` → `combo.meta.seoDescription`.

- [ ] **Step 4: Replace the H1 + hero image source** — `combo.h1` → `combo.meta.h1`; `cityData.heroImage` (hero `<img>` src + og) → `combo.hero.image`; add credit under hero image:

```tsx
{combo.hero.credit && (
  <span className="absolute bottom-1 right-2 text-[10px] text-white/60 z-10">{combo.hero.credit}</span>
)}
```

- [ ] **Step 5: Replace the middle article + dark FAQ** with:

```tsx
<div className="container mx-auto px-4 mb-20">
  <article className="max-w-4xl mx-auto">
    <BlockRenderer blocks={combo.blocks} />
  </article>
</div>
```
(Delete the old `prose` article block AND the separate dark FAQ `<div>` — the FAQ is now a block. Keep `<Process />`, cross-links, and footer CTA as-is. Remove the now-unused `openFaq`/`setOpenFaq` state and the `combo.priceNote` card.)

- [ ] **Step 6: Build** (will FAIL to type-check until data migrates — expected)

Run: `npx tsc --noEmit`
Expected: errors in `data/serviceCityContent.tsx` only (old shape). That's the red state Task 9 turns green.

- [ ] **Step 7: Commit the renderer change**

```bash
git add pages/ServiceCityPage.tsx
git commit -m "refactor: render ServiceCityPage via BlockRenderer"
```

### Task 7: Refactor ServicePage to BlockRenderer

**Files:**
- Modify: `pages/ServicePage.tsx`

- [ ] **Step 1: Add imports**

```tsx
import BlockRenderer from '../components/blocks/BlockRenderer';
import { faqJsonLd, howToJsonLd, itemListJsonLd } from '../utils/schema';
```

- [ ] **Step 2: Replace `faqJsonLd` const block** (was built from `contentData.faqs`)

```tsx
const faqLd = faqJsonLd(contentData.blocks);
const howToLd = howToJsonLd(contentData.blocks, contentData.meta.h1);
const itemListLd = itemListJsonLd(contentData.blocks);
```

- [ ] **Step 3: Update Helmet fields** — `contentData.seoTitle`→`contentData.meta.seoTitle`, same for description/keywords; `contentData.heroImage`→`contentData.hero.image`; emit `{faqLd && ...}`, `{howToLd && ...}`, `{itemListLd && ...}` as in Task 6 Step 3. Replace the old `faqJsonLd` script tag.

- [ ] **Step 4: Replace the H1** — the hero currently uses `service.title` + a hardcoded subtitle. Use `contentData.meta.h1` for the `<h1>` text (keep the styling). Replace hero `<img>` `src={contentData.heroImage}` → `contentData.hero.image` and add the credit span (as Task 6 Step 4).

- [ ] **Step 5: Replace the middle article + dark FAQ** (lines ~192–253) with:

```tsx
<div className="container mx-auto px-4 mt-8 mb-20">
  <article className="max-w-4xl mx-auto">
    <BlockRenderer blocks={contentData.blocks} />
  </article>
</div>
```
(Delete the old `blogSections.map` article AND the dark FAQ `<div>`; remove unused `openFaq`/`setOpenFaq`. Keep `<Process />`, the city cross-links grid, and footer CTA.)

- [ ] **Step 6: Type-check** → expect errors only in `data/serviceContent.tsx` (old shape). Red state for Task 8.

- [ ] **Step 7: Commit**

```bash
git add pages/ServicePage.tsx
git commit -m "refactor: render ServicePage via BlockRenderer"
```

---

## Phase 3 — Verified knowledge bank (gates all facts)

### Task 8a: Build the knowledge bank

**Files:**
- Create: `docs/knowledge-bank.md`

- [ ] **Step 1: Research + record each fact with a source.** For every item below, run a web search, confirm the current figure, and write it into the doc as `- CLAIM — VALUE — SOURCE_URL (checked 2026-06)`. Do not proceed to content tasks for a service until its facts are filled in.

Required entries:
- Ontario HTA: temporary/donut spare max speed + max distance (manufacturer norm ~80 km/h, ~70 km — verify).
- Tire repair standard: repairable tread zone vs non-repairable sidewall/shoulder; re-torque after ~100 km.
- Battery cold-cranking loss: % capacity lost near −18 °C and lower (verify against a battery-council/RAC source).
- Symptoms distinguishing dead battery vs failing alternator vs starter.
- Running on empty: how low fuel can overheat/wear the in-tank fuel pump.
- Misfuel (gas in diesel / diesel in gas): correct immediate action (do not start the engine).
- Highway Traffic Act / 400-series: rules on pedestrians walking on a freeway shoulder.
- Ontario **Towing and Storage Safety and Enforcement Act (2021)**: consumer rights — you authorize the tow, you choose the destination, rates/consent must be disclosed.
- Flatbed vs wheel-lift for AWD/4WD/EV: why towing driven wheels on the ground risks drivetrain damage.
- Pothole/vehicle-damage claim process: **City of Toronto** (covers Scarborough) — where to file, notice deadline, evidence required.
- Pothole/vehicle-damage claim process: **Durham Region + local municipalities** (Pickering, Ajax, Whitby, Oshawa) — where regional vs local roads are claimed, deadlines.

- [ ] **Step 2: Commit**

```bash
git add docs/knowledge-bank.md
git commit -m "docs: verified knowledge bank with sources"
```

---

## Phase 4 — Content authoring

> **Authoring standard (applies to every page below):** follow the spec's "Writing standards" — vary sentence length and openers, no em-dash tic, no "Whether you're X or Y…", use contractions and concrete local nouns, **no sentence reused across any two pages**, no visible `Keywords:` lines. Each legal/numeric claim must exist in `docs/knowledge-bank.md`. Embed `<InlineCall source="..." />` once or twice per page inside prose bodies (descriptive source labels, e.g. `sc_tire_intro`). Follow the exact block sequence from the spec matrix for that page.

### Task 8: Migrate all 11 service entries in `serviceContent.tsx`

**Files:**
- Modify: `data/serviceContent.tsx`

- [ ] **Step 1: Replace the interface + imports.** Remove the local `CallNowButton`; import the shared pieces and new types:

```tsx
import React from 'react';
import { COMPANY_NAME } from '../constants';
import InlineCall from '../components/blocks/InlineCall';
import type { ServicePageData } from './blocks';

export const SERVICE_CONTENT: Record<string, ServicePageData> = {
  // entries below
};
```

- [ ] **Step 2: Author the 6 main service pages** using the matrix in the spec (§ "Service pages (authority)"). Worked example for `tire-change` (replicate the *shape*, not the prose, for the others):

```tsx
'tire-change': {
  id: 'tire-change',
  meta: {
    seoTitle: 'Mobile Tire Service & Flat Tire Repair — East GTA | iFAST Roadside',
    seoDescription: 'On-site flat tire repair and replacement across the East GTA. What is repairable, the donut-spare speed rule, and what a fair price looks like. 24/7. Call iFAST.',
    keywords: 'mobile tire service East GTA, flat tire repair, donut spare speed limit, tire plug vs patch',
    h1: 'Mobile Tire Service & Flat Tire Repair',
  },
  hero: { image: '/images/pages/tire-change.jpg', credit: '' }, // filled by Task 12
  blocks: [
    { type: 'glossary', heading: 'Plug, patch, or patch-plug — what your tire actually needs',
      terms: [
        { term: 'Plug', definition: 'A quick external repair pushed into the puncture. Fine to get you moving, not a permanent fix on its own.' },
        { term: 'Patch', definition: 'Applied inside the tire over the hole. Seals air but does not fill the puncture channel.' },
        { term: 'Patch-plug (combo)', definition: 'The repair the rubber-manufacturers association treats as proper: the tire comes off the rim, the injury is filled and sealed from the inside.' },
        { term: 'Repairable zone', definition: 'Only the centre tread. A puncture in the shoulder or sidewall is not safely repairable — that tire needs replacing.' },
      ] },
    { type: 'checklist', heading: 'What to do the moment you notice a flat', variant: 'steps',
      items: [
        { title: 'Ease off, do not brake hard', detail: 'Let the car slow on its own and steer to the right shoulder or a flat, solid surface.' },
        { title: 'Get out the far side', detail: 'On a highway, exit away from traffic and stand behind the barrier, not beside the car.' },
        { title: 'Hazards on, mark the spot', detail: 'Note the nearest exit or landmark so dispatch routes straight to you.' },
        { title: 'Call rather than self-change on a 400-series shoulder', detail: 'Roadside lanes are the most dangerous place to kneel by a wheel; a crewed unit sets cones and strobes first.' },
      ] },
    { type: 'statCallout', stat: '~80 km/h', label: 'Most donut spares are rated for this speed and roughly 70 km of distance', source: 'Per spare-tire manufacturer guidance — see knowledge bank' },
    { type: 'costTable', heading: 'What mobile tire service typically costs',
      rows: [
        { item: 'Spare/donut installation', price: 'from $75', note: 'You have the spare; we mount it and torque to spec.' },
        { item: 'Patch-plug repair', price: 'quoted on site', note: 'Tire off the rim, repaired from the inside, rebalanced.' },
        { item: 'New/used tire supply + install', price: 'quoted on site', note: 'Depends on size and availability on the van.' },
      ], footnote: 'Prices are starting points; the dispatcher confirms before a unit rolls. Re-torque your wheel after ~100 km.' },
    { type: 'faq', items: [
      { question: 'Can every flat be repaired?', answer: 'No. Only punctures in the centre tread are safely repairable. A cut or puncture in the sidewall or shoulder means the tire has to be replaced.' },
      { question: 'How long can I drive on a donut spare?', answer: 'Treat it as a get-you-home part: keep under about 80 km/h and replace or repair the real tire within roughly 70 km. Check the label on your specific spare.' },
      { question: 'Do I really need the wheel re-torqued?', answer: 'Yes. Lug nuts seat slightly after the first drive. Re-torque at about 100 km to avoid a loose wheel.' },
    ] },
  ],
},
```

Author `mobile-mechanic`, `jump-start`, `lockout`, `fuel`, `towing` to their own matrix sequences with their own verified facts (towing → Towing & Storage Safety Act glossary + flatbed/wheel-lift decision + photograph-before-tow checklist; jump-start → cold-cranking seasonal + battery/alternator/starter decision + safe-jump steps; lockout → damage-free-tools prose + child/pet safety checklist + key-terms glossary; fuel → empty-tank prose + misfuel decision + don't-walk-the-highway safety checklist).

- [ ] **Step 3: Migrate the 5 sub-service entries** (`flat-tire-repair`, `spare-tire-change`, `tire-installation`, `battery-diagnostic`, `battery-replacement`) to the new shape **without new research** — convert their existing `blogSections` into `prose` blocks and existing `faqs` into one `faq` block, and set `meta.h1` from the old title. Keep `hero.image` pointing at their existing `public/*_hero.jpg` for now (Task 12 leaves sub-services on current images; only the 36 in-scope pages get Pexels). Example shape:

```tsx
'flat-tire-repair': {
  id: 'flat-tire-repair',
  meta: { seoTitle: '…existing…', seoDescription: '…existing…', keywords: '…existing…', h1: 'Flat Tire Repair' },
  hero: { image: '/flat_tire_repair_hero.jpg' },
  blocks: [
    { type: 'prose', heading: '…existing section title…', body: (<>…existing JSX…</>) },
    // …remaining sections as prose blocks…
    { type: 'faq', items: [ /* existing faqs */ ] },
  ],
},
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (ServicePage + serviceContent now agree).

- [ ] **Step 5: Commit**

```bash
git add data/serviceContent.tsx
git commit -m "feat: rewrite service pages on block model (6 rich + 5 migrated)"
```

### Task 9: Rewrite the 30 combos in `serviceCityContent.tsx`

**Files:**
- Modify: `data/serviceCityContent.tsx`

- [ ] **Step 1: Replace interface + imports**

```tsx
import React from 'react';
import { COMPANY_NAME } from '../constants';
import InlineCall from '../components/blocks/InlineCall';
import type { ComboPageData } from './blocks';

type ServiceId = 'mobile-mechanic' | 'tire-change' | 'jump-start' | 'lockout' | 'fuel' | 'towing';
type CityId = 'scarborough' | 'pickering' | 'ajax' | 'whitby' | 'oshawa';

export const SERVICE_CITY_CONTENT: Record<ServiceId, Record<CityId, ComboPageData>> = {
  // entries below
};
```

- [ ] **Step 2: Author all 30 combos** following the spec's combo matrix for block order. Each combo's `hotspots` lists **city-specific** real locations; `claimGuide` (tire-change combos only) uses Toronto-311 for Scarborough and Durham-Region for the other four. Worked example (`tire-change` × `whitby`, sequence `seasonal → hotspots → claimGuide → faq`):

```tsx
whitby: {
  meta: {
    seoTitle: 'Mobile Tire Service Whitby & Brooklin — Flat Repair on the 412 | iFAST',
    seoDescription: 'Flat on the 401, 407, or the 412 through Whitby? On-site repair and replacement, the local debris spots, and how to claim pothole damage in Durham. Call iFAST.',
    keywords: 'mobile tire service Whitby, flat tire 412, tire repair Brooklin, pothole claim Durham',
    h1: 'Mobile Tire Service in Whitby — Flat Repair Across the 412',
  },
  hero: { image: '/images/pages/tire-change-whitby.jpg', credit: '' },
  blocks: [
    { type: 'seasonal', heading: 'Why Whitby flats spike after the first thaw',
      body: (<><p className="mb-4">Freeze-thaw cycles along Rossland and Taunton open potholes fast once February turns. The 412, still a relatively young highway, sheds construction grit onto its shoulders that finds tires at speed.</p><InlineCall source="wh_tire_seasonal" /></>),
      stat: { value: '3×', label: 'more flat calls in the weeks after the first spring thaw' } },
    { type: 'hotspots', heading: 'Where Whitby drivers actually get flats', intro: (<p>The recurring spots our Whitby units get called to:</p>),
      spots: [
        { place: '412 between the 401 and 407', why: 'Newer shoulders still carry loose debris; few passing drivers to help if you stop.' },
        { place: 'Thickson Road commercial strip', why: 'Curbside parking and construction edges chew sidewalls.' },
        { place: 'Baldwin Street, Brooklin', why: 'Older patched asphalt north of Taunton opens potholes each spring.' },
        { place: 'Victoria Street / Port Whitby', why: 'Lakefront grit and rail crossings near the GO lot.' },
      ] },
    { type: 'claimGuide', heading: 'Pothole damaged your tire in Whitby? How to claim',
      jurisdiction: 'Durham Region / Town of Whitby roads',
      steps: [
        'Identify the road authority — regional roads (e.g. Taunton, Brock) are Durham Region; local streets are the Town of Whitby.',
        'Photograph the pothole, the location, and the tire/rim damage before any repair.',
        'File a claim with the correct authority and keep your repair invoice as evidence.',
      ],
      deadline: 'File promptly — municipal notice windows are short; confirm the current limit when you call.',
      sourceUrl: 'See docs/knowledge-bank.md for the verified Durham/Whitby claim links.' },
    { type: 'faq', items: [
      { question: 'Do you really come up to Brooklin?', answer: 'Yes. Brooklin runs a bit longer on ETA than south Whitby, but it is a regular service area — driveway and roadside both.' },
      { question: 'Is the 412 covered?', answer: 'Yes. We set cones and strobes before touching the car; the 412 is one of our routine highway routes.' },
      { question: 'Can you replace a sidewall-damaged tire on site?', answer: 'A sidewall cut cannot be repaired, but if we carry your size we install a new tire on the spot; otherwise we mount your spare and source the exact tire.' },
    ] },
  ],
},
```

Author the remaining 29 combos the same way, each to its matrix sequence with unique local detail. **Reuse no sentence across pages.**

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` → PASS

- [ ] **Step 4: Build (prerender gate)**

Run: `npm run build`
Expected: `Prerendered 54/54 routes.` (No page under 500 chars.)

- [ ] **Step 5: Commit**

```bash
git add data/serviceCityContent.tsx
git commit -m "feat: rewrite 30 service-city combos on block model with hyperlocal content"
```

---

## Phase 5 — Images

### Task 10: Pexels fetch script

**Files:**
- Create: `scripts/fetch-pexels.mjs`
- Create: `data/imageManifest.json` (written by the script)

- [ ] **Step 1: Write the script.** It reads `PEXELS_API_KEY` from `.env.local`, has a curated query per page key, downloads the `large` (compressed, ~1200px) variant to `public/images/pages/<key>.jpg`, and writes `data/imageManifest.json`.

```js
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = readFileSync(join(root, '.env.local'), 'utf8');
const KEY = (env.match(/PEXELS_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error('PEXELS_API_KEY missing in .env.local'); process.exit(1); }

// One distinct query per page so no two heroes repeat.
const QUERIES = {
  'tire-change': 'mechanic changing car tire',
  'tire-change-scarborough': 'flat tire highway night',
  'tire-change-pickering': 'car tire roadside',
  'tire-change-ajax': 'tire change driveway',
  'tire-change-whitby': 'winter road tire',
  'tire-change-oshawa': 'tire repair tools',
  // … fill ALL 36 keys (6 service + 30 combo). Keep queries visually distinct. …
};

const outDir = join(root, 'public', 'images', 'pages');
mkdirSync(outDir, { recursive: true });
const manifest = existsSync(join(root, 'data', 'imageManifest.json'))
  ? JSON.parse(readFileSync(join(root, 'data', 'imageManifest.json'), 'utf8')) : {};

for (const [key, q] of Object.entries(QUERIES)) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape`, { headers: { Authorization: KEY } });
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) { console.error(`No photo for ${key} (${q})`); continue; }
  const imgRes = await fetch(photo.src.large);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  writeFileSync(join(outDir, `${key}.jpg`), buf);
  manifest[key] = { path: `/images/pages/${key}.jpg`, photographer: photo.photographer, sourceUrl: photo.url };
  console.log(`✓ ${key} ← ${photo.photographer}`);
}
writeFileSync(join(root, 'data', 'imageManifest.json'), JSON.stringify(manifest, null, 2));
console.log('Wrote data/imageManifest.json');
```

- [ ] **Step 2: Run it**

Run: `node scripts/fetch-pexels.mjs`
Expected: 36 `✓` lines + manifest written. Spot-check a few images open and look relevant + distinct.

- [ ] **Step 3: Wire `hero.credit` from the manifest.** In `data/serviceContent.tsx` and `data/serviceCityContent.tsx`, set each in-scope `hero.credit` to `Photo: <photographer> / Pexels` (read from manifest), and confirm each `hero.image` path matches its manifest key.

- [ ] **Step 4: Build + commit**

Run: `npm run build` → `Prerendered 54/54 routes.`
```bash
git add scripts/fetch-pexels.mjs data/imageManifest.json public/images/pages data/serviceContent.tsx data/serviceCityContent.tsx
git commit -m "feat: fetch 36 distinct Pexels heroes + credits"
```

### Task 11: Compress logo + icons

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json` (add `sharp` devDependency)

- [ ] **Step 1: Add sharp**

Run: `npm install -D sharp`

- [ ] **Step 2: Write the optimizer** (resizes the 2.4 MB `logo.png` to a sensible max width and recompresses icons)

```js
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
await sharp(join(pub, 'logo.png')).resize({ width: 640, withoutEnlargement: true }).png({ quality: 80, compressionLevel: 9 }).toFile(join(pub, 'logo.optimized.png'));
console.log('Wrote logo.optimized.png — review, then replace logo.png if good.');
```

- [ ] **Step 3: Run, review, replace**

Run: `node scripts/optimize-images.mjs`
Then visually compare `public/logo.optimized.png` to `logo.png`. If acceptable, replace: `mv public/logo.optimized.png public/logo.png` (Bash) and confirm size dropped well under ~200 KB with `ls -la public/logo.png`.

- [ ] **Step 4: Commit**

```bash
git add scripts/optimize-images.mjs package.json package-lock.json public/logo.png
git commit -m "perf: compress oversized logo to reduce LCP weight"
```

---

## Phase 6 — Site-wide indexability

### Task 12: Sitemap generator wired into build

**Files:**
- Modify: `entry-server.tsx` (export `getRoutes`)
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json` (`build` runs the generator before prerender)

- [ ] **Step 1: Export route data from the SSR entry** (append to `entry-server.tsx`)

```tsx
import { SERVICES } from './constants';
import { CITY_CONTENT } from './data/cityContent';
import { SERVICE_CONTENT } from './data/serviceContent';
import { BLOG_POSTS } from './data/blogContent'; // confirm the exported name

export function getRoutes(): string[] {
  const cities = Object.keys(CITY_CONTENT);
  const mainServices = SERVICES.filter(s => !s.parent).map(s => s.id);
  const servicePages = Object.keys(SERVICE_CONTENT).map(id => `/service/${id}`);
  const combos = mainServices.flatMap(s => cities.map(c => `/service/${s}/${c}`));
  const areas = cities.map(c => `/areas/${c}`);
  const blog = BLOG_POSTS.map(p => `/blog/${p.slug}`);
  return ['/', '/mobile-mechanic', '/service-area/east-gta', '/blog', ...servicePages, ...combos, ...areas, ...blog];
}
```
(If `data/blogContent.tsx` exports under a different name, import that. Verify first.)

- [ ] **Step 2: Write the generator** (runs after the SSR build, reads compiled `dist-server`)

```js
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { getRoutes } = await import(pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href);
const base = 'https://www.ifastroadside.ca';
const today = new Date().toISOString().slice(0, 10);

const priority = (r) => r === '/' ? '1.0' : r.startsWith('/service/') && r.split('/').length === 4 ? '0.8' : '0.9';
const urls = getRoutes().map(r => `  <url>\n    <loc>${base}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(join(root, 'public', 'sitemap.xml'), xml);
writeFileSync(join(root, 'dist', 'sitemap.xml'), xml);
console.log(`Generated sitemap with ${getRoutes().length} routes.`);
```

- [ ] **Step 3: Update `build` script order** in `package.json` so the generator runs **after** the SSR build and **before** prerender:

```json
"build": "vite build && vite build --ssr entry-server.tsx --outDir dist-server && node scripts/generate-sitemap.mjs && node scripts/prerender.mjs"
```

- [ ] **Step 4: Build + verify**

Run: `npm run build`
Expected: `Generated sitemap with 54 routes.` then `Prerendered 54/54 routes.`
Run: `grep -c "<loc>" public/sitemap.xml` → `54`.

- [ ] **Step 5: Commit**

```bash
git add entry-server.tsx scripts/generate-sitemap.mjs package.json public/sitemap.xml
git commit -m "feat: generate sitemap from route data before prerender"
```

### Task 13: Internal-link hardening

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `pages/CityPage.tsx`

- [ ] **Step 1: Add the 6 service links to the footer Quick Links** (descriptive anchors). Insert into the `Quick Links` `<ul>` in `Footer.tsx`, before the Blog link:

```tsx
<li><a href="/service/tire-change" className="hover:text-brand-yellow transition-colors">Mobile Tire Service</a></li>
<li><a href="/service/jump-start" className="hover:text-brand-yellow transition-colors">Battery Jump Start</a></li>
<li><a href="/service/lockout" className="hover:text-brand-yellow transition-colors">Car Lockout</a></li>
<li><a href="/service/fuel" className="hover:text-brand-yellow transition-colors">Fuel Delivery</a></li>
<li><a href="/service/towing" className="hover:text-brand-yellow transition-colors">Emergency Towing</a></li>
```

- [ ] **Step 2: Ensure each city hub links all 6 of its combos.** Open `pages/CityPage.tsx` and confirm it renders a grid linking `/service/<mainServiceId>/<city>` for all 6 main services with descriptive anchor text (e.g. "Mobile Tire Service in {city}"). If it does not, add a section that maps `SERVICES.filter(s => !s.parent)` to those links. (Read the file first; only add what's missing.)

- [ ] **Step 3: Build + verify reachability**

Run: `npm run build`
Then confirm a combo is linked from its hub's prerendered HTML:
Run: `grep -c "/service/tire-change/whitby" dist/areas/whitby/index.html`
Expected: ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx pages/CityPage.tsx
git commit -m "feat: harden internal links (footer services + city-hub combo links)"
```

### Task 14: NAP consistency pass

**Files:**
- Modify (as needed): `index.html`, per-page schema already use `constants.tsx`.

- [ ] **Step 1: Diff the NAP.** Compare the address/phone/hours in the `index.html` JSON-LD against `constants.tsx` (`ADDRESS`, `PHONE_NUMBER`, `BUSINESS_HOURS`) and the combo `serviceLd` address. They must be byte-identical.

Run: `grep -iE "Antrim|437-215-3468|M1P" index.html`
Compare to `constants.tsx`. Fix any mismatch in `index.html` to match `constants.tsx`.

- [ ] **Step 2: Build + commit** (only if changed)

```bash
git add index.html
git commit -m "fix: align NAP in index.html JSON-LD with constants"
```

---

## Phase 7 — Validation & ship

### Task 15: Content validator

**Files:**
- Create: `scripts/validate-content.mjs`

- [ ] **Step 1: Write the validator** (runs against `dist/`; this is our red/green gate for the content rules)

```js
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const services = ['mobile-mechanic','tire-change','jump-start','lockout','fuel','towing'];
const cities = ['scarborough','pickering','ajax','whitby','oshawa'];
const combos = services.flatMap(s => cities.map(c => `/service/${s}/${c}`));
const pages = [...services.map(s => `/service/${s}`), ...combos];

const errors = [];
const visibleText = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const sentences = (t) => t.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.split(' ').length >= 8);

const perPage = {};
for (const p of pages) {
  const f = join(dist, ...p.split('/').filter(Boolean), 'index.html');
  if (!existsSync(f)) { errors.push(`MISSING prerender: ${p}`); continue; }
  const html = readFileSync(f, 'utf8');
  if (/Keywords:/.test(visibleText(html))) errors.push(`STUFFING "Keywords:" in ${p}`);
  perPage[p] = new Set(sentences(visibleText(html)));
}

// Cross-page duplicate sentence detection (ignores chrome shared by ALL pages).
const count = {};
for (const set of Object.values(perPage)) for (const s of set) count[s] = (count[s] || 0) + 1;
const sharedByAll = new Set(Object.entries(count).filter(([, n]) => n >= pages.length - 2).map(([s]) => s));
for (const [p, set] of Object.entries(perPage)) {
  for (const s of set) {
    if (sharedByAll.has(s)) continue; // global chrome/boilerplate
    if (count[s] > 1) errors.push(`DUPLICATE sentence on ${p}: "${s.slice(0, 60)}…"`);
  }
}

// Heading-sequence uniqueness within each service row and city column.
const headSeq = {};
for (const p of pages) {
  const f = join(dist, ...p.split('/').filter(Boolean), 'index.html');
  if (!existsSync(f)) continue;
  const html = readFileSync(f, 'utf8');
  headSeq[p] = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).join(' > ');
}
for (const s of services) {
  const seqs = cities.map(c => headSeq[`/service/${s}/${c}`]);
  const dup = seqs.filter((x, i) => seqs.indexOf(x) !== i);
  if (dup.length) errors.push(`SAME heading sequence within service "${s}"`);
}
for (const c of cities) {
  const seqs = services.map(s => headSeq[`/service/${s}/${c}`]);
  const dup = seqs.filter((x, i) => seqs.indexOf(x) !== i);
  if (dup.length) errors.push(`SAME heading sequence within city "${c}"`);
}

if (errors.length) { console.error(`✗ ${errors.length} issues:\n` + errors.join('\n')); process.exit(1); }
console.log(`✓ validate-content: ${pages.length} pages, no stuffing, no cross-page duplicates, sequences unique.`);
```

- [ ] **Step 2: Run it against the current build**

Run: `node scripts/validate-content.mjs`
Expected: PASS. If it reports duplicates or stuffing, fix the offending page copy in the data files, rebuild, and re-run until green. (This is expected to catch real issues on the first run — that is the point.)

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-content.mjs
git commit -m "test: add content validator (no stuffing, no dupes, unique sequences)"
```

### Task 16: Full verification + deploy

**Files:** none (verification)

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: `Generated sitemap with 54 routes.` + `Prerendered 54/54 routes.`

- [ ] **Step 2: Validator**

Run: `node scripts/validate-content.mjs` → PASS.

- [ ] **Step 3: Spot-check rendered HTML** for three combos and one service page:

Run: `node -e "const f=require('fs');for(const p of ['service/tire-change/whitby','service/lockout/scarborough','service/towing/oshawa','service/jump-start']){const h=f.readFileSync('dist/'+p+'/index.html','utf8');console.log(p, h.length, /Photo:.*Pexels/.test(h)?'cred✓':'cred✗', /application\/ld\+json/.test(h)?'ld✓':'ld✗')}"`
Expected: each > 500 chars, credit present, JSON-LD present.

- [ ] **Step 4: Push (deploy)**

```bash
git push origin main
```
Vercel auto-deploys. After deploy, in GSC: resubmit `sitemap.xml`, then Request Indexing on a few key updated pages (sparingly).

- [ ] **Step 5: Update CLAUDE.md** (the architecture changed materially — service content is now block-based, sitemap is generated). Add a short note under "Architecture" describing `data/blocks.ts` + `components/blocks/` + the generated sitemap, and commit.

```bash
git add CLAUDE.md
git commit -m "docs: document block-based content system and generated sitemap" && git push origin main
```

---

## Self-review notes (author)

- **Spec coverage:** block model (T1–T4), schema helpers/HowTo/ItemList (T5), renderer refactors (T6–T7), knowledge bank/verification (T8a), 6 rich + 5 migrated service pages (T8), 30 combos (T9), Pexels 36 distinct + credits (T10), image weight/LCP (T11), generated sitemap (T12), internal links incl. footer + hubs (T13), NAP (T14), validator for no-stuffing/dupes/sequence-uniqueness (T15), build+prerender+deploy+GSC (T16). All spec sections mapped.
- **Out of scope honored:** city-hub *copy*, chatbot env bug, homepage copy, Tailwind-CDN migration untouched (T13 only adds links; T11 only touches images).
- **Known scope note for the user:** the 5 sub-service `/service/:id` pages are schema-migrated but NOT de-templated this pass — flagged as a fast follow-up.
- **Type consistency:** `meta.{seoTitle,seoDescription,keywords,h1}`, `hero.{image,credit}`, `blocks` used identically across `blocks.ts`, both data files, both pages, and `utils/schema.ts`. Block prop types are derived via `Extract<ContentBlock, {type}>` so component props can't drift from the union.
