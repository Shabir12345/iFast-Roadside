import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Expert Solutions For Any Emergency</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're battling a highway blowout, a dead battery in freezing weather, or need a safe flatbed extraction—we have the specific tools to fix it securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <Link
              to={`/service/${service.id}`}
              key={service.id}
              className="block group bg-white rounded-3xl p-8 transition-all premium-shadow-hover border border-gray-100 hover:border-brand-yellow/30 service-card-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-brand-dark text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all duration-300 transform group-hover:rotate-6">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;