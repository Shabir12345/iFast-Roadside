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
