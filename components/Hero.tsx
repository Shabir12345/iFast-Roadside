import React from 'react';
import { ArrowRight, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2072&auto=format&fit=crop"
          alt="Professional Roadside Assistance Mechanic"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-brand-yellow/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            24/7 Emergency Service
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Stranded? <br />
            <span className="text-gradient">
              We'll Get You Moving.
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            Professional roadside assistance and mobile tire service.
            Arriving in 30 minutes or less on average.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall('home_hero_call')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark font-bold text-lg rounded-xl shadow-lg shadow-brand-yellow/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              Call Now: {PHONE_NUMBER}
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              View Services <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-brand-dark/50 backdrop-blur-md p-4 rounded-lg border border-white/10 flex items-center gap-3 hover:bg-brand-dark/70 transition-colors">
              <div className="bg-brand-yellow/20 p-2 rounded-full text-brand-yellow">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">Fast Arrival</h3>
                <p className="text-gray-400 text-sm">30 min average ETA</p>
              </div>
            </div>
            <div className="bg-brand-dark/50 backdrop-blur-md p-4 rounded-lg border border-white/10 flex items-center gap-3 hover:bg-brand-dark/70 transition-colors">
              <div className="bg-brand-yellow/20 p-2 rounded-full text-brand-yellow">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">Licensed & Insured</h3>
                <p className="text-gray-400 text-sm">100% Professional</p>
              </div>
            </div>
            <div className="bg-brand-dark/50 backdrop-blur-md p-4 rounded-lg border border-white/10 flex items-center gap-3 hover:bg-brand-dark/70 transition-colors">
              <div className="bg-brand-yellow/20 p-2 rounded-full text-brand-yellow">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">East GTA Coverage</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs">Pickering, Ajax, Whitby, Oshawa, Scarborough</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;