import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real people we've helped get back on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl relative">
                <div className="absolute -top-4 left-8 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Verified
                </div>
              <div className="flex gap-1 mb-4 text-brand-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-600"} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold">
                    {t.name.charAt(0)}
                 </div>
                 <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;