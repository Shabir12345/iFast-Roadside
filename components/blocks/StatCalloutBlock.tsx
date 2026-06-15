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
