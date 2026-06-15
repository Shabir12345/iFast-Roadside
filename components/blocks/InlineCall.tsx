import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PHONE_NUMBER } from '../../constants';
import { trackPhoneCall } from '../../utils/analytics';

const InlineCall: React.FC<{ source: string; label?: string }> = ({ source, label = 'Call Local Dispatch' }) => (
  <div className="my-6 text-center sm:text-left">
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackPhoneCall(source)}
      className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 premium-shadow-hover animate-pulse"
      style={{ animationDuration: '2s' }}
    >
      <PhoneCall size={20} />
      {label}
    </a>
  </div>
);

export default InlineCall;
