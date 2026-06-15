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
