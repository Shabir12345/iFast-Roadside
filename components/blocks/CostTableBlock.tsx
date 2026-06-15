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
