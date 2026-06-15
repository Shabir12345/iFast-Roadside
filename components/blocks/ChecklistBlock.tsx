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
