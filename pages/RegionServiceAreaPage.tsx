import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PhoneCall, ShieldCheck, ThumbsUp, Clock, CheckCircle, Star, MapPin } from 'lucide-react';
import { PHONE_NUMBER, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '../constants';
import Process from '../components/Process';
import GoogleReviews from '../components/GoogleReviews';
import Services from '../components/Services';
import { trackPhoneCall } from '../utils/analytics';
import { REGION_CONTENT } from '../data/regionContent';

const RegionServiceAreaPage: React.FC = () => {
  const { region } = useParams<{ region: string }>();
  const content = region ? REGION_CONTENT[region] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [region]);

  // Legacy/unknown slugs fall back to the East GTA home-base page.
  if (!content) {
    return <Navigate to="/service-area/east-gta" replace />;
  }

  const callSource = content.slug.replace(/-/g, '_');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `iFAST Roadside & Mobile Tires - ${content.name}`,
    telephone: PHONE_NUMBER,
    description: content.seoDescription,
    areaServed: content.areaServed.map((city) => ({ '@type': 'City', name: city })),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: content.geo.latitude,
      longitude: content.geo.longitude,
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-0">
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href={`https://www.ifastroadside.ca/service-area/${content.slug}`} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Region Focus Banner */}
        <div className="bg-brand-dark text-white p-3 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-semibold max-w-4xl mx-auto border border-gray-800 shadow-lg text-center backdrop-blur-sm bg-opacity-95 animate-[reveal_0.5s_ease-out]">
          <MapPin size={20} className="text-brand-yellow flex-shrink-0" />
          <span>
            <span className="text-brand-yellow font-black uppercase tracking-wide mr-1">{content.bannerLabel}</span>
            {content.bannerText}
          </span>
        </div>

        {/* High-Converting Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden premium-shadow mb-16 flex flex-col lg:flex-row border border-gray-100 relative animate-[reveal_0.7s_ease-out]">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-dark px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit cursor-default border border-brand-yellow/50">
              <Clock size={16} className="text-brand-dark animate-pulse" /> {content.heroBadge}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.1] tracking-tight">
              Emergency Roadside Assistance <span className="text-brand-yellow block mt-2">{content.h1Region}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
              {content.heroIntro}
            </p>

            <div className="space-y-4 mb-10">
              {content.checkmarks.map((item) => (
                <div key={item} className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800 group">
                  <CheckCircle className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />{' '}
                  <span className="border-b-2 border-brand-yellow/30">{item}</span>
                </div>
              ))}
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`${callSource}_hero_call`)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-5 rounded-2xl font-black text-xl lg:text-3xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,90,31,0.35)] hover:shadow-[0_15px_40px_rgba(255,90,31,0.5)] transform hover:-translate-y-1 text-center w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={32} fill="currentColor" />
              </div>
              <span className="tracking-wide">Click for {content.name} Dispatch</span>
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2 hover:text-brand-dark transition-colors"><ShieldCheck className="text-brand-dark" size={20} /> Licensed & Insured</div>
              <div className="flex items-center gap-2 hover:text-brand-dark transition-colors"><ThumbsUp className="text-brand-dark" size={20} /> Verified Professionals</div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] bg-gray-900 overflow-hidden group">
            <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-gray-900/40 lg:to-transparent"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Floating Trust Badge on Image */}
            <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform">
              {/* Real Google rating — replaced a row of i.pravatar.cc
                  placeholder faces labelled "happy customer". See CityPage.tsx. */}
              <div className="flex items-center gap-4">
                <div className="text-4xl md:text-5xl font-black text-brand-dark leading-none">{GOOGLE_RATING}</div>
                <div>
                  <div className="flex text-brand-yellow mb-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <div className="text-sm font-bold text-brand-dark">{GOOGLE_REVIEWS_COUNT}+ Google Reviews</div>
                </div>
              </div>
              <div className="text-right border-l-2 border-gray-100 pl-4 md:pl-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
                <div className="font-black text-brand-dark text-xl md:text-2xl">{content.responseTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cities covered in this region */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Cities we cover in {content.name}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {content.citiesCovered.map((city) => (
              <span key={city} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-dark font-bold text-sm px-4 py-2 rounded-full premium-shadow">
                <MapPin size={14} className="text-brand-yellow" /> {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Google Reviews — social proof right under the hero */}
      <GoogleReviews />

      {/* Services */}
      <div className="bg-white py-16 mb-8 mt-16 premium-shadow border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">{content.servicesHeading}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {content.servicesSubtext}
            </p>
          </div>
        </div>
        <Services />
      </div>

      <div className="container mx-auto px-4 py-20">
        <Process />
      </div>

      {/* Massive Bottom CTA */}
      <div className="bg-brand-yellow py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 background-pattern"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6">{content.bottomCtaHeading}</h2>
          <p className="text-xl md:text-2xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-medium">
            {content.bottomCtaText}
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall(`${callSource}_footer_call`)}
            className="group inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-brand-dark hover:bg-gray-900 text-white px-10 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-300 shadow-[0_10px_35px_rgba(11,30,54,0.4)] transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 text-brand-yellow group-hover:text-white transition-colors">
              <PhoneCall size={36} fill="currentColor" className="animate-bounce" />
            </div>
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegionServiceAreaPage;
