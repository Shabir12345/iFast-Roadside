import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Whatever Stopped You, We Fix It Where You're Stuck</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Highway blowout, dead battery in the cold, keys locked inside — our vans carry the tools to handle it on the spot. And if it truly needs a tow, we do that too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.filter(s => !s.parent).map((service, index) => {
            const subServices = SERVICES.filter(s => s.parent === service.id);
            return (
              <div
                key={service.id}
                className="flex flex-col bg-white rounded-3xl p-8 transition-all premium-shadow-hover border border-gray-100 hover:border-brand-yellow/30 service-card-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/service/${service.id}`} className="block group">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all duration-300 transform group-hover:rotate-6">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </Link>

                {subServices.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Also available</p>
                    <div className="flex flex-wrap gap-2">
                      {subServices.map(sub => (
                        <Link
                          key={sub.id}
                          to={`/service/${sub.id}`}
                          className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-brand-yellow hover:text-brand-dark text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-gray-100 transition-colors"
                        >
                          <sub.icon size={14} />
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;