import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PHONE_NUMBER, COMPANY_NAME } from '../constants';
import { SERVICE_CONTENT } from '../data/serviceContent';
import { CITY_CONTENT } from '../data/cityContent';
import { 
  PhoneCall, 
  ChevronDown, 
  Clock, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Wrench, 
  Zap, 
  Search, 
  Cpu, 
  Car,
  Settings
} from 'lucide-react';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import { trackPhoneCall } from '../utils/analytics';

const MobileMechanicLanding: React.FC = () => {
  const serviceId = 'mobile-mechanic';
  const contentData = SERVICE_CONTENT[serviceId];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!contentData) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "24/7 Mobile Mechanic Service",
    "serviceType": "Automotive Repair",
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_NAME,
      "telephone": PHONE_NUMBER,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Scarborough",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    "description": contentData.seoDescription,
    "areaServed": ["Scarborough", "Pickering", "Ajax", "Whitby", "Oshawa"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Mechanic Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Computerized Diagnostics"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brake Repair & Replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter & Alternator Repair"
          }
        }
      ]
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 font-sans">
      <Helmet>
        <title>{contentData.seoTitle}</title>
        <meta name="description" content={contentData.seoDescription} />
        <meta name="keywords" content={contentData.keywords} />
        <link rel="canonical" href="https://ifastroadside.ca/mobile-mechanic" />
        <meta property="og:title" content={contentData.seoTitle} />
        <meta property="og:description" content={contentData.seoDescription} />
        <meta property="og:image" content="https://ifastroadside.ca/mobile_mechanic_hero.png" />
        <meta property="og:url" content="https://ifastroadside.ca/mobile-mechanic" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 z-10">
              <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 border border-brand-yellow/20">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                Emergency On-Site Repair
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-brand-dark mb-6 leading-tight tracking-tighter">
                The Mechanic That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-500">Comes To You.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl font-medium">
                Stranded in your driveway? Car making a strange noise? Skip the tow truck and the dealership wait. Our certified mechanics bring the shop to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => trackPhoneCall('mechanic_hero_call')}
                  className="flex items-center justify-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-xl hover:shadow-brand-yellow/40 transform hover:-translate-y-1"
                >
                  <PhoneCall size={24} fill="currentColor" />
                  Request Service Now
                </a>
                <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${20+i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Customer" />
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-xs font-bold text-gray-500">{GOOGLE_REVIEWS_COUNT}+ Happy Clients</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-brand-dark text-white p-2 rounded-lg">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">Certified Techs</p>
                    <p className="text-xs text-gray-500">Fully Licensed & Insured</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-brand-dark text-white p-2 rounded-lg">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">30-Min Arrival</p>
                    <p className="text-xs text-gray-500">Average ETA in GTA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/mobile_mechanic_hero.png" 
                  alt="Professional Mobile Mechanic at work" 
                  className="w-full h-full object-cover aspect-square md:aspect-video lg:aspect-square"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-[240px] animate-bounce-subtle">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-green-500 p-3 rounded-2xl text-white">
                    <Settings className="animate-spin-slow" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                    <p className="text-lg font-black text-brand-dark leading-none">Ready Now</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">Local mechanics active in Pickering & Ajax area.</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 -left-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">Complete On-Site Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
              We carry dealership-grade diagnostic computers and specialized tools to solve complex mechanical issues wherever you are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Diagnostics', 
                desc: 'Full computerized engine & electrical scans to find the root cause.', 
                icon: Search,
                color: 'bg-blue-500'
              },
              { 
                title: 'Brake Service', 
                desc: 'On-site replacement of pads, rotors, and emergency brake repairs.', 
                icon: ShieldCheck,
                color: 'bg-red-500'
              },
              { 
                title: 'No-Start Fixes', 
                desc: 'Repair or replacement of starters, alternators, and batteries.', 
                icon: Zap,
                color: 'bg-yellow-500'
              },
              { 
                title: 'Belts & Hoses', 
                desc: 'Emergency repair of serpentine belts and coolant leaks.', 
                icon: Settings,
                color: 'bg-green-500'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-yellow/30 transition-all duration-300 group">
                <div className={`${feature.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process />

      {/* Content Section (SEO Optimized) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {contentData.blogSections.map((section, idx) => (
              <div key={idx} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-6 tracking-tight relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-2 after:bg-brand-yellow after:rounded-full">
                  {section.title}
                </h2>
                <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Local SEO Section */}
      <section className="py-20 bg-brand-dark text-white rounded-[4rem] mx-4 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Servicing the Entire East GTA</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our mobile units are strategically positioned for 30-minute response times across these cities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.values(CITY_CONTENT).map((city) => (
              <Link
                key={city.id}
                to={`/service/${serviceId}/${city.id}`}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-brand-yellow/50 transition-all text-center"
              >
                <div className="w-12 h-12 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-xl mb-1">{city.name}</h3>
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{city.responseTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-12 text-center tracking-tight">Common Questions</h2>
            <div className="space-y-4">
              {contentData.faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-bold text-lg text-brand-dark pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`text-brand-yellow transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                      size={24} 
                    />
                  </button>
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                  >
                    <p className="text-gray-500 text-lg leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="bg-brand-yellow py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow to-orange-500 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Need a Mechanic Right Now?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Don't wait in line at a shop. Our nearest mobile unit is ready to roll to your location. Get an instant quote over the phone.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall('mechanic_footer_call')}
            className="group inline-flex items-center gap-4 bg-brand-dark text-white px-10 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <PhoneCall size={32} fill="currentColor" />
            {PHONE_NUMBER}
          </a>
        </div>
      </section>
    </div>
  );
};

export default MobileMechanicLanding;
