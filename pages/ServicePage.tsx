import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES, PHONE_NUMBER, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '../constants';
import { SERVICE_CONTENT } from '../data/serviceContent';
import { PhoneCall, ArrowLeft, Clock, CheckCircle2, Star, ShieldCheck, MapPin, Camera, Zap } from 'lucide-react';
import { CITY_CONTENT } from '../data/cityContent';
import Process from '../components/Process';
import GoogleReviews from '../components/GoogleReviews';
import { trackPhoneCall } from '../utils/analytics';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { faqJsonLd, howToJsonLd, itemListJsonLd } from '../utils/schema';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);
  const contentData = id ? (SERVICE_CONTENT as any)[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 pt-20">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the service you're looking for.</p>
        <Link to="/" className="text-brand-yellow font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  const { title, description, icon: Icon } = service;

  if (!contentData) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "iFAST Roadside & Mobile Tires",
      "telephone": PHONE_NUMBER
    },
    "description": contentData.meta.seoDescription,
    "areaServed": ["Scarborough", "Pickering", "Ajax", "Whitby", "Oshawa"].map(city => ({
      "@type": "City",
      "name": city
    }))
  };

  const faqLd = faqJsonLd(contentData.blocks);
  const howToLd = howToJsonLd(contentData.blocks, contentData.meta.h1);
  const itemListLd = itemListJsonLd(contentData.blocks);

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 font-sans">
      <Helmet>
        <title>{contentData.meta.seoTitle}</title>
        <meta name="description" content={contentData.meta.seoDescription} />
        <meta name="keywords" content={contentData.meta.keywords} />
        <link rel="canonical" href={`https://www.ifastroadside.ca/service/${id}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={contentData.meta.seoTitle} />
        <meta property="og:description" content={contentData.meta.seoDescription} />
        <meta property="og:image" content={`https://www.ifastroadside.ca${contentData.hero.image}`} />
        <meta property="og:url" content={`https://www.ifastroadside.ca/service/${id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
        {howToLd && <script type="application/ld+json">{JSON.stringify(howToLd)}</script>}
        {itemListLd && <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>}
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-yellow drop-shadow-sm">{title}</span>
        </div>

        {/* High-Converting Trust Hero Section */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(11,30,54,0.08)] mb-16 flex flex-col lg:flex-row border border-gray-100 relative">
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 mb-6 w-fit cursor-default">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Dispatch: Ready Now
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.05] tracking-tight">
              {contentData.meta.h1}
            </h1>
            
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg font-medium">
              {description} Call now and a live dispatcher will give you an <span className="font-bold text-gray-800">upfront price and a real ETA</span> before we send a unit.
            </p>
            
            <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} /> 
                <span>Honest & Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                 <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} /> 
                 <span>Damage-Free Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-brand-dark">
                 <CheckCircle2 className="text-green-500 flex-shrink-0" size={22} /> 
                 <span>Licensed &amp; Insured Technicians</span>
              </div>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`hero_call_${id}`)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-5 rounded-2xl font-black text-xl lg:text-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,90,31,0.35)] hover:shadow-[0_15px_40px_rgba(255,90,31,0.5)] transform hover:-translate-y-1 text-center w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={28} fill="currentColor" />
              </div>
              <span className="tracking-wide">Call Now for Service</span>
            </a>

            <p className="text-xs font-semibold text-gray-400 mt-4 text-center sm:text-left">
              Direct line to local dispatch: {PHONE_NUMBER}
            </p>
          </div>
          
          {/* Image & Trust Stats Half */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] bg-gray-100">
             <img
               src={contentData.hero.image}
               alt={`${title} service professional`}
               className="absolute inset-0 w-full h-full object-cover lg:object-center"
             />
             {/* Subtle overlay gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
             {contentData.hero.credit && (
               <span className="absolute bottom-1 right-2 text-[10px] text-white/60 z-10">{contentData.hero.credit}</span>
             )}
             
             {/* Service Icon Badge */}
             <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm text-brand-yellow rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
               <Icon size={28} />
             </div>

             {/* Floating Trust Card */}
             <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 bg-white rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-b-4 border-brand-yellow">
                <div className="flex items-center gap-4">
                    <div>
                       <div className="flex text-yellow-500 mb-1">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                       </div>
                       <div className="text-xs md:text-sm font-bold text-brand-dark">{GOOGLE_RATING}/5 · {GOOGLE_REVIEWS_COUNT}+ Google Reviews</div>
                    </div>
                </div>
                <div className="text-right border-l border-gray-100 pl-4 md:pl-6">
                    <div className="flex items-center gap-1 justify-end text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <Clock size={12} className="text-brand-yellow" /> Priority
                    </div>
                    <div className="font-black text-brand-dark text-xl md:text-2xl drop-shadow-sm">Dispatch</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Trust Bar below Hero */}
      <div className="border-y border-gray-100 bg-gray-50 py-6 mb-16">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold text-gray-500">
           <div className="flex items-center gap-2"><ShieldCheck className="text-brand-dark" size={24} /> Fully Licensed</div>
           <div className="flex items-center gap-2"><Zap className="text-brand-yellow" size={24} /> Fast Arrival Times</div>
           <div className="flex items-center gap-2"><Camera className="text-brand-dark" size={24} /> 100% Damage Free</div>
        </div>
      </div>

      {/* Google Reviews — high up so social proof is one of the first things seen */}
      <GoogleReviews />

      {/* Process Section natively integrated */}
      <Process />

      <div className="container mx-auto px-4 mt-8 mb-20">
        <article className="max-w-4xl mx-auto">
          <BlockRenderer blocks={contentData.blocks} />
        </article>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* City cross-links for internal linking & local SEO */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-8 text-center tracking-tight">Need {title} in a Specific City?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(CITY_CONTENT).map((c) => (
              <Link
                key={c.id}
                to={`/service/${id}/${c.id}`}
                className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-yellow/50 transition-all text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-50 text-brand-dark rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-yellow group-hover:text-white transition-colors duration-300">
                  <MapPin size={20} />
                </div>
                <h3 className="font-black text-brand-dark mb-1">{c.name}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{c.responseTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Conversion Footer CTA */}
      <div className="bg-brand-dark py-20 relative overflow-hidden border-t-8 border-brand-yellow">
         <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow rounded-full blur-[100px] opacity-20"></div>

         <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              Emergency Status: Online
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Need {title} Built on Trust?</h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
               Stop waiting around. Our dispatcher will deploy the nearest active unit directly to your location. Secure your spot now.
            </p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`footer_call_${id}`)}
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

export default ServicePage;
