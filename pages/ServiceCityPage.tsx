import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PhoneCall, ArrowLeft, Clock, CheckCircle2, Star, ShieldCheck, MapPin, Camera, Zap } from 'lucide-react';
import { SERVICES, PHONE_NUMBER, COMPANY_NAME } from '../constants';
import { CITY_CONTENT } from '../data/cityContent';
import { SERVICE_CITY_CONTENT } from '../data/serviceCityContent';
import Process from '../components/Process';
import GoogleReviews from '../components/GoogleReviews';
import { trackPhoneCall } from '../utils/analytics';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { faqJsonLd, howToJsonLd, itemListJsonLd } from '../utils/schema';

const ServiceCityPage: React.FC = () => {
  const { id, city } = useParams<{ id: string; city: string }>();
  const service = SERVICES.find(s => s.id === id);
  const cityData = city ? CITY_CONTENT[city] : null;
  const combo = id && city ? (SERVICE_CITY_CONTENT as any)[id]?.[city] : null;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, city]);

  if (!service || !cityData || !combo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 pt-20">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find that service in that city.</p>
        <Link to="/" className="text-brand-yellow font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const canonical = `https://www.ifastroadside.ca/service/${id}/${city}`;
  const serviceUrl = `https://www.ifastroadside.ca/service/${id}`;
  const cityUrl = `https://www.ifastroadside.ca/areas/${city}`;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': service.title,
    'name': combo.meta.h1,
    'description': combo.meta.seoDescription,
    'url': canonical,
    'provider': {
      '@type': 'LocalBusiness',
      'name': COMPANY_NAME,
      'telephone': PHONE_NUMBER,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '20 Antrim Crescent',
        'addressLocality': 'Scarborough',
        'addressRegion': 'ON',
        'postalCode': 'M1P 4N3',
        'addressCountry': 'CA'
      },
      'geo': { '@type': 'GeoCoordinates', 'latitude': 43.7290, 'longitude': -79.2790 },
      'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '94' }
    },
    'areaServed': {
      '@type': 'City',
      'name': cityData.name,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': cityData.geo.latitude,
        'longitude': cityData.geo.longitude
      }
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.ifastroadside.ca/' },
      { '@type': 'ListItem', 'position': 2, 'name': service.title, 'item': serviceUrl },
      { '@type': 'ListItem', 'position': 3, 'name': `${service.title} in ${cityData.name}`, 'item': canonical }
    ]
  };

  const faqLd = faqJsonLd(combo.blocks);
  const howToLd = howToJsonLd(combo.blocks, combo.meta.h1);
  const itemListLd = itemListJsonLd(combo.blocks);

  const otherServices = SERVICES.filter(s => s.id !== id);

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 font-sans">
      <Helmet>
        <title>{combo.meta.seoTitle}</title>
        <meta name="description" content={combo.meta.seoDescription} />
        <meta name="keywords" content={combo.meta.keywords} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={combo.meta.seoTitle} />
        <meta property="og:description" content={combo.meta.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`https://www.ifastroadside.ca${combo.hero.image}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
        {howToLd && <script type="application/ld+json">{JSON.stringify(howToLd)}</script>}
        {itemListLd && <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>}
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-400 flex-wrap uppercase tracking-wider">
          <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/service/${id}`} className="hover:text-brand-dark transition-colors">{service.title}</Link>
          <span>/</span>
          <span className="text-brand-yellow drop-shadow-sm">{cityData.name}</span>
        </div>

        {/* Hero Section Redesign for Trust & Conversion */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(11,30,54,0.08)] mb-16 flex flex-col lg:flex-row border border-gray-100 relative">
          {/* Text & CTA Half */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-white">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 mb-6 w-fit cursor-default">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {cityData.name} Live Dispatch
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.05] tracking-tight">
              {combo.meta.h1}
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg font-medium">
              We provide professional {service.title.toLowerCase()} in {cityData.name}. Typical arrival is <span className="font-bold text-gray-800">{cityData.responseTime}</span>.
            </p>

            <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} />
                <span>Local {cityData.name} Techs Available Now</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} />
                <span>Upfront Pricing • No Surprise Fees</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} />
                <span>Rated 4.9/5 by Local Drivers</span>
              </div>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`svc_city_hero_${id}_${city}`)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-5 rounded-2xl font-black text-xl lg:text-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,90,31,0.35)] hover:shadow-[0_15px_40px_rgba(255,90,31,0.5)] transform hover:-translate-y-1 text-center w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={28} fill="currentColor" />
              </div>
              <span className="tracking-wide">Call Now for Help</span>
            </a>
            
            <p className="text-xs font-semibold text-gray-400 mt-4 text-center sm:text-left">
              Click to call {PHONE_NUMBER} directly
            </p>
          </div>

          {/* Image & Trust Stats Half */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] bg-gray-100">
            <img
              src={combo.hero.image}
              alt={`${service.title} in ${cityData.name}`}
              className="absolute inset-0 w-full h-full object-cover lg:object-center"
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
            {combo.hero.credit && (
              <span className="absolute bottom-1 right-2 text-[10px] text-white/60 z-10">{combo.hero.credit}</span>
            )}

            {/* Icon Pin */}
            <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm text-brand-yellow rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Icon size={28} />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 bg-white rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-b-4 border-brand-yellow">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${30 + i}`} alt="customer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200" />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <div className="text-xs md:text-sm font-bold text-brand-dark">{cityData.name} Ratings</div>
                </div>
              </div>
              <div className="text-right border-l border-gray-100 pl-4 md:pl-6">
                <div className="flex items-center gap-1 justify-end text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  <Clock size={12} className="text-brand-yellow" /> Local ETA
                </div>
                <div className="font-black text-brand-dark text-xl md:text-2xl drop-shadow-sm">{cityData.responseTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar below Hero */}
      <div className="border-y border-gray-100 bg-gray-50 py-6 mb-16">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold text-gray-500">
           <div className="flex items-center gap-2"><ShieldCheck className="text-brand-dark" size={24} /> Professionally Licensed</div>
           <div className="flex items-center gap-2"><Zap className="text-brand-yellow" size={24} /> 24/7 Fast Response</div>
           <div className="flex items-center gap-2"><Camera className="text-brand-dark" size={24} /> Damage-Free Methods</div>
        </div>
      </div>

      {/* Google Reviews — social proof right under the hero */}
      <GoogleReviews />

      {/* Content Blocks */}
      <div className="container mx-auto px-4 mb-20">
        <article className="max-w-4xl mx-auto">
          <BlockRenderer blocks={combo.blocks} />
        </article>
      </div>

      <Process />

      <div className="container mx-auto px-4 py-20">
        {/* Cross-links Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-8 text-center tracking-tight">
            Other Trusted Services in {cityData.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {otherServices.map(s => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.id}
                  to={`/service/${s.id}/${city}`}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-yellow/50 transition-all flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 bg-gray-50 text-brand-dark rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-yellow group-hover:text-white transition-colors duration-300">
                    <SIcon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-brand-dark mb-1">{s.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Link back to city overview */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Link
            to={`/areas/${city}`}
            className="inline-flex items-center gap-2 bg-gray-100 text-brand-dark font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <MapPin size={18} className="text-brand-yellow" /> View All Services in {cityData.name}
          </Link>
        </div>
      </div>

      {/* Massive Conversion Footer CTA */}
      <div className="bg-brand-dark py-20 relative overflow-hidden border-t-8 border-brand-yellow">
        <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow rounded-full blur-[100px] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            Dispatch Ready
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Need {service.title} <br className="hidden sm:block" />
            <span className="text-white/90">in {cityData.name}?</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
            Stop waiting. Local technicians are standing by. Typical arrival time is {cityData.responseTime}. Let's get you moving.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall(`svc_city_footer_${id}_${city}`)}
            className="group inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-white px-10 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-300 shadow-[0_10px_35px_rgba(255,90,31,0.4)] transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <PhoneCall size={32} fill="currentColor" />
              {PHONE_NUMBER}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCityPage;
