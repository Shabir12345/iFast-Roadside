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
