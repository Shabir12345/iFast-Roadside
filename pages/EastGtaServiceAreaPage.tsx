import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PhoneCall, ShieldCheck, ThumbsUp, Clock, CheckCircle, Star, MapPin } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Services from '../components/Services';

const EastGtaServiceAreaPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "iFAST Roadside & Mobile Tires - East GTA",
    "telephone": PHONE_NUMBER,
    "description": "Fast, reliable 24/7 roadside assistance exclusively for the East GTA including Pickering, Ajax, Whitby, Oshawa, and Scarborough.",
    "areaServed": [
      { "@type": "City", "name": "Pickering" },
      { "@type": "City", "name": "Ajax" },
      { "@type": "City", "name": "Whitby" },
      { "@type": "City", "name": "Oshawa" },
      { "@type": "City", "name": "Scarborough" }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-0">
      <Helmet>
        <title>24/7 Roadside Assistance East GTA | Pickering, Ajax, Whitby, Oshawa</title>
        <meta name="description" content="Exclusive roadside assistance and mobile tire service for the East GTA. Serving Pickering, Ajax, Whitby, Oshawa, and Scarborough. Fast 15-30 min ETA." />
        <link rel="canonical" href="https://ifastroadside.com/service-area/east-gta" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Warning Banner / Geo Focus */}
        <div className="bg-brand-dark text-white p-3 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-semibold max-w-4xl mx-auto border border-gray-800 shadow-lg text-center backdrop-blur-sm bg-opacity-95 animate-[reveal_0.5s_ease-out]">
          <MapPin size={20} className="text-brand-yellow flex-shrink-0" />
          <span>
            <span className="text-brand-yellow font-black uppercase tracking-wide mr-1">East GTA Exclusive:</span>
            We only dispatch to <span className="underline decoration-brand-yellow decoration-2 underline-offset-2">Pickering, Ajax, Whitby, Oshawa, and Scarborough</span>. We do not serve Toronto or West End.
          </span>
        </div>

        {/* High-Converting Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden premium-shadow mb-16 flex flex-col lg:flex-row border border-gray-100 relative animate-[reveal_0.7s_ease-out]">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-dark px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit cursor-default border border-brand-yellow/50">
              <Clock size={16} className="text-brand-dark animate-pulse" /> Local Dispatch (ETA 15-30 Mins)
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.1] tracking-tight">
              Emergency Roadside Assistance <span className="text-brand-yellow block mt-2">East GTA Mobile Team</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
              Stuck in <strong className="text-brand-dark">Pickering, Ajax, Whitby, Oshawa, or Scarborough</strong>? Our local units are stationed across the East side to get to you instantly. Don't wait hours for an out-of-town tow.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800 group">
                <CheckCircle className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} /> <span className="border-b-2 border-brand-yellow/30">Local East GTA Drivers</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800 group">
                 <CheckCircle className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} /> <span className="border-b-2 border-brand-yellow/30">No Hidden "Out of Zone" Fees</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800 group">
                 <CheckCircle className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} /> <span className="border-b-2 border-brand-yellow/30">5-Star Rated Service</span>
              </div>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-5 rounded-2xl font-black text-xl lg:text-3xl transition-all duration-300 shadow-[0_0_40px_rgba(253,224,71,0.5)] hover:shadow-[0_0_60px_rgba(253,224,71,0.7)] transform hover:-translate-y-1 text-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-brand-dark text-brand-yellow p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={32} />
              </div>
              <span>Click for East GTA Dispatch</span>
            </a>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2 hover:text-brand-dark transition-colors"><ShieldCheck className="text-brand-dark" size={20} /> Licensed & Insured</div>
              <div className="flex items-center gap-2 hover:text-brand-dark transition-colors"><ThumbsUp className="text-brand-dark" size={20} /> Verified Professionals</div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] bg-gray-900 overflow-hidden group">
             {/* Replace with a generic tow truck or map image that feels local */}
             <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-gray-900/40 lg:to-transparent"></div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse"></div>
             
             {/* Floating Trust Badge on Image */}
             <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                        {[1,2,3,4].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${i+40}`} alt="happy customer" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:z-10 hover:scale-110" />
                        ))}
                    </div>
                    <div className="hidden sm:block">
                       <div className="flex text-brand-yellow mb-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                       <div className="text-sm font-bold text-brand-dark">500+ East End Reviews</div>
                    </div>
                </div>
                <div className="text-right border-l-2 border-gray-100 pl-4 md:pl-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
                    <div className="font-black text-brand-dark text-xl md:text-2xl">&lt; 30 Mins</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Services Map (Using generic services component but context is set via layout) */}
      <div className="bg-white py-16 mb-8 mt-16 premium-shadow border-y border-gray-100">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                   <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">What we do in the East End</h2>
                   <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                     Whether you blew a tire on the 401 in <span className="font-bold text-brand-dark">Oshawa</span> or need a jump-start in your <span className="font-bold text-brand-dark">Pickering</span> driveway, our mobile team handles it all with local expertise.
                   </p>
              </div>
          </div>
          <Services />
      </div>

      <div className="container mx-auto px-4 py-20">
          <Process />
      </div>

      <Testimonials />

      {/* Massive Bottom CTA */}
      <div className="bg-brand-yellow py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 background-pattern"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6">Need help in the East GTA?</h2>
            <p className="text-xl md:text-2xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-medium">
               Our dispatchers are local and ready. We have units roaming Pickering, Ajax, Whitby, and Oshawa ready for immediate dispatch.
            </p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-4 bg-brand-dark hover:bg-gray-900 text-white px-10 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
            >
              <PhoneCall size={36} className="text-brand-yellow animate-bounce" />
              {PHONE_NUMBER}
            </a>
         </div>
      </div>
    </div>
  );
};

export default EastGtaServiceAreaPage;
