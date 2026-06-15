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
