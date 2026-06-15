import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import SectionHeading from './SectionHeading';

type P = Extract<ContentBlock, { type: 'prose' }>;

const ProseBlock: React.FC<P> = ({ heading, body }) => (
  <section className="mb-12">
    {heading && <SectionHeading>{heading}</SectionHeading>}
    <div className="prose prose-lg md:prose-xl max-w-none prose-p:text-gray-600 leading-relaxed">{body}</div>
  </section>
);

export default ProseBlock;
