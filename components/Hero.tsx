import { ArrowRight, Clock, MapPin, ShieldCheck, PhoneCall, Star, CheckCircle2 } from 'lucide-react';
import { PHONE_NUMBER, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-gray-100">
      {/* Background Decor Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark hidden lg:block -skew-x-[15deg] origin-top right-[-5%] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content Area (Text & CTA) */}
          <div className="w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left pt-8 lg:pt-0">
            <div className="flex flex-wrap gap-3 justify-center text-center lg:justify-start items-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                24/7 Live Dispatch
              </div>
              <div className="inline-flex items-center gap-1.5 text-brand-dark bg-gray-50 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200">
                 <div className="flex text-yellow-400 drop-shadow-sm">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                 </div>
                 <span className="ml-1 tracking-tight">{GOOGLE_RATING}/5 ({GOOGLE_REVIEWS_COUNT} Reviews)</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-brand-dark mb-6 tracking-tight leading-[1]">
              Stranded? Panic Over. <br className="hidden sm:block" />
              <span className="text-brand-yellow drop-shadow-sm">Help Is On The Way.</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl font-medium mb-8 max-w-xl leading-relaxed">
              Don't wait hours in the cold for a traditional tow truck. We dispatch 24/7 rapid-response roadside mechanics across the East GTA. Average ETA: 30 minutes.
            </p>

            {/* Trust Checkmarks */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CheckCircle2 size={18} className="text-green-500" /> Safety-First Response
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CheckCircle2 size={18} className="text-green-500" /> No Hidden Fees
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CheckCircle2 size={18} className="text-green-500" /> Damage-Free
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => trackPhoneCall('home_hero_call')}
                className="w-full sm:w-auto px-8 py-5 bg-brand-yellow hover:bg-brand-yellowHover text-white font-black text-xl lg:text-2xl rounded-2xl shadow-[0_10px_25px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,90,31,0.45)]"
              >
                <div className="bg-white/20 p-2 rounded-full">
                  <PhoneCall size={24} fill="currentColor" />
                </div>
                Call: {PHONE_NUMBER}
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-5 bg-gray-50 hover:bg-gray-100 text-brand-dark font-bold text-lg rounded-2xl border border-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Our Services <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Content Area (Image + Floating Badges) */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Premium Image Container */}
              <div className="rounded-[2.5rem] overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(11,30,54,0.15)] relative transform lg:-rotate-2 transition-transform hover:rotate-0 duration-500">
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2072&auto=format&fit=crop"
                  alt="Professional Roadside Assistance Mechanic"
                  className="w-full h-full object-cover aspect-[4/5] object-center"
                  fetchPriority="high"
                />
                {/* Gradient overlay for contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Trust Card - ETA */}
              <div className="absolute -bottom-6 -left-6 sm:-left-12 bg-white p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-4 animate-float">
                <div className="bg-brand-yellow/10 p-3 rounded-xl text-brand-yellow">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-black text-brand-dark text-lg leading-none mb-1">Fast ETA</h3>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Arriving Shortly</p>
                </div>
              </div>

              {/* Floating Trust Card - Location */}
              <div className="absolute top-12 -right-4 sm:-right-8 bg-brand-dark text-white p-4 rounded-2xl shadow-[0_15px_35px_rgba(11,30,54,0.4)] border border-brand-dark/80 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="bg-white/10 p-2.5 rounded-xl text-brand-yellow">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">GTA Coverage</h3>
                  <p className="text-white/60 text-[10px] uppercase">East area focus</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;