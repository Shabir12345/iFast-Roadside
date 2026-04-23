import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const StickyCall: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-brand-dark/95 backdrop-blur-md p-3 z-50 md:hidden border-t border-brand-dark pb-safe flex flex-col gap-2 shadow-[0_-10px_30px_rgba(11,30,54,0.3)]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-white/90 text-[11px] font-bold uppercase tracking-wider">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
           Live Dispatch: Online
        </div>
        <div className="flex items-center gap-1 text-white text-[11px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
           <Clock size={12} className="text-brand-yellow" /> <span>ETA: 15-30 Mins</span>
        </div>
      </div>
      <a 
        href={`tel:${PHONE_NUMBER}`}
        onClick={() => trackPhoneCall('sticky_call_mobile')}
        className="group relative overflow-hidden flex items-center justify-center gap-3 w-full bg-brand-yellow text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(255,90,31,0.5)] active:scale-95 transition-all duration-200"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        <div className="text-brand-dark bg-white p-1.5 rounded-full shadow-sm">
          <Phone size={18} fill="currentColor" />
        </div>
        <span className="text-xl drop-shadow-sm tracking-wide">Call Now for Help</span>
      </a>
    </div>
  );
};

export default StickyCall;