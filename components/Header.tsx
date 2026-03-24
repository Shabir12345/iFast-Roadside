import React, { useState } from 'react';
import { Menu, X, PhoneCall, ChevronDown } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, SERVICES } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-brand-dark/95 backdrop-blur-sm text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Increased size but decoupled from navbar height */}
        <a href="/" aria-label={`${COMPANY_NAME} Home`} className="relative flex items-center h-16 sm:h-20">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300 transform hover:scale-110 z-10 w-40 sm:w-56 md:w-64">
                <img 
                  src="/logo.png" 
                  alt={`${COMPANY_NAME} Logo`} 
                  className="h-24 sm:h-32 md:h-40 w-auto object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]" 
                />
            </div>
            {/* Space placeholder for the logo */}
            <div className="w-40 sm:w-48 md:w-56 h-full"></div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          <div className="relative group">
            <a href="/#services" className="flex items-center gap-1 hover:text-brand-yellow transition-colors duration-300 py-6">
              Services <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
            </a>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-0 w-64 bg-white text-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden transform origin-top scale-y-95 group-hover:scale-y-100">
              <div className="py-2">
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <a 
                      key={service.id} 
                      href={`/service/${service.id}`} 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="bg-brand-yellow/20 text-brand-dark p-2 rounded-lg">
                        <Icon size={18} />
                      </div>
                      <span className="font-semibold">{service.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <a href="/#about" className="hover:text-brand-yellow transition-colors duration-300">About</a>
          <a href="/#reviews" className="hover:text-brand-yellow transition-colors duration-300">Reviews</a>
          <a href="/#contact" className="hover:text-brand-yellow transition-colors duration-300">Contact</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-6 py-2.5 rounded-full font-bold transition-all duration-300 premium-shadow-hover"
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <PhoneCall size={18} />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-gray-700 absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <a href="/#services" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white font-semibold flex-1">
                  Services
                </a>
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <ChevronDown size={20} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Mobile Services Sub-menu */}
              {isServicesOpen && (
                <div className="pl-4 mt-2 mb-2 space-y-2 border-l-2 border-brand-yellow/30">
                  {SERVICES.map((service) => (
                    <a 
                      key={service.id} 
                      href={`/service/${service.id}`} 
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm text-gray-400 hover:text-brand-yellow transition-colors"
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/#about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white font-semibold">About</a>
            <a href="/#reviews" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white font-semibold">Reviews</a>
            
            <div className="pt-4 pb-2">
              <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark py-3 rounded-lg font-bold"
              >
                  <PhoneCall size={20} />
                  Call {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;