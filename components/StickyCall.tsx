import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const StickyCall: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-brand-dark/95 backdrop-blur-md p-3 z-50 md:hidden border-t border-gray-800 pb-safe flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           Live Dispatch: Online
        </div>
        <div className="flex items-center gap-1 text-brand-yellow font-bold text-xs uppercase tracking-wider">
           <Clock size={12} /> <span className="border-b border-brand-yellow/30">ETA: 15-30 Mins</span>
        </div>
      </div>
      <a 
        href={`tel:${PHONE_NUMBER}`}
        onClick={() => trackPhoneCall('sticky_call_mobile')}
        className="group relative overflow-hidden flex items-center justify-center gap-3 w-full bg-brand-yellow text-brand-dark font-black py-4 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] active:scale-95 transition-all duration-200"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <div className="bg-brand-dark text-brand-yellow p-1.5 rounded-full">
          <Phone size={18} fill="currentColor" />
        </div>
        <span className="text-lg">Call Now for Help</span>
      </a>
    </div>
  );
};

export default StickyCall;