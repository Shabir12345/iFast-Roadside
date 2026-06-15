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
