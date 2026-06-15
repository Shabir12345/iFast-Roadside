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
