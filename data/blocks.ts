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
