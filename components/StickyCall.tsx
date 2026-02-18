import React from 'react';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

const StickyCall: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-brand-dark p-3 z-40 md:hidden border-t border-gray-800 pb-safe">
      <a 
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center justify-center gap-3 w-full bg-brand-yellow text-brand-dark font-bold py-3 rounded-lg shadow-lg active:bg-brand-yellowHover"
      >
        <Phone size={20} fill="currentColor" />
        <span>Call Now for Help</span>
      </a>
    </div>
  );
};

export default StickyCall;