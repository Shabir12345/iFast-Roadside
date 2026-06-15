import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ContentBlock } from '../../data/blocks';

type P = Extract<ContentBlock, { type: 'faq' }>;

const FaqBlock: React.FC<P> = ({ heading = 'Frequently Asked Questions', items }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mb-12">
      <div className="bg-brand-dark text-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,30,54,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-[80px]"></div>
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-center relative z-10 tracking-tight">{heading}</h2>
        <div className="space-y-4 relative z-10">
          {items.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/10 transition-colors">
                <span className="font-bold text-lg pr-4">{faq.question}</span>
                <ChevronDown className={`text-brand-yellow transition-transform duration-300 shrink-0 ${open === i ? 'rotate-180' : ''}`} size={24} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqBlock;
