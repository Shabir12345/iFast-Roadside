
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ChevronDown, MapPin } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, SERVICES } from '../constants';
import { REGION_CONTENT } from '../data/regionContent';
import { CITY_CONTENT } from '../data/cityContent';
import { trackPhoneCall } from '../utils/analytics';

// Nav data is derived from the content maps, never hand-listed — that is why
// adding a region used to appear in the nav automatically while adding a city
// did not: the Service Area menu only ever read REGION_CONTENT. Both are read
// here now, so a new entry in either map shows up without touching this file.
const TOP_LEVEL_SERVICES = SERVICES.filter((s) => !s.parent);
const SUB_SERVICES = (parentId: string) => SERVICES.filter((s) => s.parent === parentId);
const REGIONS = Object.values(REGION_CONTENT);
const CITIES = Object.values(CITY_CONTENT);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname.startsWith('/service-area/');

  return (
    <header className="fixed w-full z-50 bg-white/95 border-b border-gray-100 backdrop-blur-md text-brand-dark shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" aria-label={`${COMPANY_NAME} Home`} className="relative flex items-center h-16 sm:h-20">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300 transform hover:scale-105 z-10 w-40 sm:w-56 md:w-64">
            <img
              src="/logo.webp"
              alt={`${COMPANY_NAME} Logo`}
              width={800}
              height={533}
              className="h-24 sm:h-32 md:h-40 w-auto object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
            />
          </div>
          {/* Space placeholder for the logo */}
          <div className="w-40 sm:w-48 md:w-56 h-full"></div>
        </a>

        {/* Desktop Nav */}
        {!isLandingPage && (
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold tracking-wide text-gray-700">
            <div className="relative group">
              <a href="/#services" className="flex items-center gap-1 hover:text-brand-yellow transition-colors duration-300 py-6">
                Services <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </a>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-0 w-80 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto max-h-[75vh] transform origin-top scale-y-95 group-hover:scale-y-100">
                <div className="py-2">
                  {TOP_LEVEL_SERVICES.map((service) => {
                    const Icon = service.icon;
                    const subs = SUB_SERVICES(service.id);
                    return (
                      <div key={service.id} className="border-b border-gray-50 last:border-0">
                        <a
                          href={`/service/${service.id}`}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors hover:text-brand-yellow"
                        >
                          <div className="bg-brand-dark/5 text-brand-dark p-2 rounded-lg">
                            <Icon size={18} />
                          </div>
                          <span className="font-semibold">{service.title}</span>
                        </a>
                        {/* Sub-services were previously unreachable from the nav
                            entirely — including Pre-Purchase Inspection, added
                            2026-07. They are indexable pages and deserve a path. */}
                        {subs.length > 0 && (
                          <div className="pb-2">
                            {subs.map((sub) => (
                              <a
                                key={sub.id}
                                href={`/service/${sub.id}`}
                                className="block pl-[3.75rem] pr-4 py-1.5 text-[13px] font-medium text-gray-500 hover:text-brand-yellow hover:bg-gray-50 transition-colors"
                              >
                                {sub.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <a href="/#about" className="hover:text-brand-yellow transition-colors duration-300">About</a>
            <div className="relative group">
              <a href="#" className="flex items-center gap-1 hover:text-brand-yellow transition-colors duration-300 py-6">
                Service Area <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </a>
              <div className="absolute top-full right-0 mt-0 w-[34rem] bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden transform origin-top scale-y-95 group-hover:scale-y-100">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  {/* Regions — broad coverage pages */}
                  <div className="py-2">
                    <div className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400">Regions</div>
                    {REGIONS.map((r) => (
                      <a
                        key={r.slug}
                        href={`/service-area/${r.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors hover:text-brand-yellow"
                      >
                        <div className="bg-brand-dark/5 text-brand-dark p-1.5 rounded-lg">
                          <MapPin size={16} />
                        </div>
                        <span className="font-semibold text-sm">
                          {r.name}
                          <span className="block text-[10px] text-gray-500 font-normal">{r.citiesCovered.slice(0, 3).join(', ')}…</span>
                        </span>
                      </a>
                    ))}
                  </div>
                  {/* Cities — the pages that actually convert local searches */}
                  <div className="py-2">
                    <div className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400">Cities</div>
                    {CITIES.map((c) => (
                      <a
                        key={c.id}
                        href={`/areas/${c.id}`}
                        className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors hover:text-brand-yellow"
                      >
                        <span className="font-semibold text-sm">{c.name}</span>
                        <span className="text-[10px] text-gray-500 font-normal whitespace-nowrap">{c.responseTime}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <a href="/#reviews" className="hover:text-brand-yellow transition-colors duration-300">Reviews</a>
            <a href="/blog" className="hover:text-brand-yellow transition-colors duration-300">Blog</a>
            <a href="/#contact" className="hover:text-brand-yellow transition-colors duration-300">Contact</a>
          </nav>
        )}

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall('header_desktop_call')}
            className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-white px-7 py-3 rounded-full font-black text-[15px] transition-all duration-300 premium-shadow-hover shadow-[0_4px_14px_0_rgba(255,90,31,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,31,0.23)] hover:-translate-y-0.5"
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <PhoneCall size={18} fill="currentColor" />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        {!isLandingPage && (
          <button
            className="md:hidden text-brand-dark p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && !isLandingPage && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <a href="/#services" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 hover:text-brand-yellow font-bold flex-1">
                  Services
                </a>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="p-2 text-gray-500 hover:text-brand-yellow"
                >
                  <ChevronDown size={20} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Mobile Services Sub-menu */}
              {isServicesOpen && (
                <div className="pl-4 mt-2 mb-2 border-l-2 border-brand-yellow/30 bg-gray-50 rounded-lg p-2">
                  {TOP_LEVEL_SERVICES.map((service) => (
                    <div key={service.id}>
                      <a
                        href={`/service/${service.id}`}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-sm font-semibold text-gray-700 hover:text-brand-yellow transition-colors"
                      >
                        {service.title}
                      </a>
                      {SUB_SERVICES(service.id).map((sub) => (
                        <a
                          key={sub.id}
                          href={`/service/${sub.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block pl-4 py-1.5 text-[13px] font-medium text-gray-500 hover:text-brand-yellow transition-colors"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Service Area — this section did not exist on mobile at all, which
                is where ~73% of clicks come from. Regions and cities were both
                unreachable from a phone without scrolling to the footer. */}
            <div>
              <div className="flex items-center justify-between">
                <span className="block py-2 text-gray-800 font-bold flex-1">Service Area</span>
                <button
                  onClick={() => setIsAreasOpen(!isAreasOpen)}
                  className="p-2 text-gray-500 hover:text-brand-yellow"
                  aria-label={isAreasOpen ? 'Collapse service areas' : 'Expand service areas'}
                  aria-expanded={isAreasOpen}
                >
                  <ChevronDown size={20} className={`transform transition-transform ${isAreasOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isAreasOpen && (
                <div className="pl-4 mt-2 mb-2 border-l-2 border-brand-yellow/30 bg-gray-50 rounded-lg p-2">
                  <div className="pt-1 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400">Regions</div>
                  {REGIONS.map((r) => (
                    <a
                      key={r.slug}
                      href={`/service-area/${r.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm font-semibold text-gray-700 hover:text-brand-yellow transition-colors"
                    >
                      {r.name}
                    </a>
                  ))}
                  <div className="pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400">Cities</div>
                  {CITIES.map((c) => (
                    <a
                      key={c.id}
                      href={`/areas/${c.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between gap-2 py-2 text-sm font-semibold text-gray-700 hover:text-brand-yellow transition-colors"
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal whitespace-nowrap">{c.responseTime}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/#about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 hover:text-brand-yellow font-bold">About</a>
            <a href="/#reviews" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 hover:text-brand-yellow font-bold">Reviews</a>
            <a href="/blog" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 hover:text-brand-yellow font-bold">Blog</a>
            <a href="/#contact" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 hover:text-brand-yellow font-bold">Contact</a>

            <div className="pt-6 pb-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => trackPhoneCall('header_mobile_call')}
                className="flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-white py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(255,90,31,0.39)] animate-pulse"
                style={{ animationDuration: '2s' }}
              >
                <PhoneCall size={22} fill="currentColor" />
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