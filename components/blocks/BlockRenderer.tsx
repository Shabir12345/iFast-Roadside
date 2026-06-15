import React from 'react';
import type { ContentBlock } from '../../data/blocks';
import ProseBlock from './ProseBlock';
import CostTableBlock from './CostTableBlock';
import ChecklistBlock from './ChecklistBlock';
import HotspotsBlock from './HotspotsBlock';
import SeasonalBlock from './SeasonalBlock';
import DecisionBlock from './DecisionBlock';
import ClaimGuideBlock from './ClaimGuideBlock';
import StatCalloutBlock from './StatCalloutBlock';
import GlossaryBlock from './GlossaryBlock';
import FaqBlock from './FaqBlock';

const BlockRenderer: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => (
  <>
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'prose': return <ProseBlock key={i} {...block} />;
        case 'costTable': return <CostTableBlock key={i} {...block} />;
        case 'checklist': return <ChecklistBlock key={i} {...block} />;
        case 'hotspots': return <HotspotsBlock key={i} {...block} />;
        case 'seasonal': return <SeasonalBlock key={i} {...block} />;
        case 'decision': return <DecisionBlock key={i} {...block} />;
        case 'claimGuide': return <ClaimGuideBlock key={i} {...block} />;
        case 'statCallout': return <StatCalloutBlock key={i} {...block} />;
        case 'glossary': return <GlossaryBlock key={i} {...block} />;
        case 'faq': return <FaqBlock key={i} {...block} />;
        default: return null;
      }
    })}
  </>
);

export default BlockRenderer;
