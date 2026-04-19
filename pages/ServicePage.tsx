import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES, PHONE_NUMBER } from '../constants';
import { SERVICE_CONTENT } from '../data/serviceContent';
import { PhoneCall, ArrowLeft, ChevronDown, Clock, CheckCircle, Star, ShieldCheck, ThumbsUp, MapPin } from 'lucide-react';
import { CITY_CONTENT } from '../data/cityContent';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import { trackPhoneCall } from '../utils/analytics';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);
  const contentData = id ? SERVICE_CONTENT[id] : null;
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

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
    "description": contentData.seoDescription,
    "areaServed": {
      "@type": "City",
      "name": "Greater Metro Area"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contentData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-0">
      <Helmet>
        <title>{contentData.seoTitle}</title>
        <meta name="description" content={contentData.seoDescription} />
        <meta name="keywords" content={contentData.keywords} />
        <link rel="canonical" href={`https://ifastroadside.ca/service/${id}`} />
        <meta property="og:title" content={contentData.seoTitle} />
        <meta property="og:description" content={contentData.seoDescription} />
        <meta property="og:image" content={`https://ifastroadside.ca${contentData.heroImage}`} />
        <meta property="og:url" content={`https://ifastroadside.ca/service/${id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-gray-500 flex items-center gap-2 hover:text-brand-dark transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* High-Converting Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden premium-shadow mb-16 flex flex-col lg:flex-row border border-gray-100 relative">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-dark px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit cursor-default border border-brand-yellow/50">
              <Clock size={16} className="text-brand-dark animate-pulse" /> Dispatching Now (ETA 15-30 Mins)
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.1] tracking-tight">
              Fast, Reliable <span className="text-brand-yellow block mt-1">{title}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              {description} Don't wait around. Our certified emergency experts are on standby to get you back on the road instantly.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} /> <span className="border-b-2 border-brand-yellow/30">Upfront, Honest Pricing</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                 <CheckCircle className="text-green-500 flex-shrink-0" size={24} /> <span className="border-b-2 border-brand-yellow/30">Damage-Free Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                 <CheckCircle className="text-green-500 flex-shrink-0" size={24} /> <span className="border-b-2 border-brand-yellow/30">Local & 5-Star Rated</span>
              </div>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`hero_call_${id}`)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-5 rounded-2xl font-black text-xl lg:text-3xl transition-all duration-300 shadow-[0_0_40px_rgba(253,224,71,0.5)] hover:shadow-[0_0_60px_rgba(253,224,71,0.7)] transform hover:-translate-y-1 text-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-brand-dark text-brand-yellow p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={32} />
              </div>
              <span>Click to Call Now</span>
            </a>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2"><ShieldCheck className="text-brand-dark" size={20} /> Licensed & Insured</div>
              <div className="flex items-center gap-2"><ThumbsUp className="text-brand-dark" size={20} /> Verified Professionals</div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
             <img 
               src={contentData.heroImage} 
               alt={`${title} service professional`}
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-gray-900/40 lg:to-transparent"></div>
             
             {/* Floating Trust Badge on Image */}
             <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                        {[1,2,3,4].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="happy customer" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                        ))}
                    </div>
                    <div className="hidden sm:block">
                       <div className="flex text-brand-yellow mb-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                       <div className="text-sm font-bold text-brand-dark">500+ Local 5-Star Reviews</div>
                    </div>
                </div>
                <div className="text-right border-l-2 border-gray-100 pl-4 md:pl-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
                    <div className="font-black text-brand-dark text-xl md:text-2xl">&lt; 30 Mins</div>
                </div>
             </div>
             
             {/* Service Icon Badge */}
             <div className="absolute top-8 right-8 w-16 h-16 bg-brand-yellow text-brand-dark rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
               <Icon size={32} />
             </div>
          </div>
        </div>
      </div>

      {/* Integrate Process Section natively into flow */}
      <Process />

      <div className="container mx-auto px-4 mt-8 mb-16">
        {/* Service Details (Blog-style content for SEO) */}
        <article className="prose prose-lg md:prose-xl max-w-4xl mx-auto text-gray-700 mb-20 bg-white p-8 md:p-14 rounded-[3rem] premium-shadow border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-yellow via-brand-yellow/50 to-brand-yellow"></div>
           {contentData.blogSections.map((section, idx) => (
             <div key={idx} className="mb-10 last:mb-0">
               <h2 className="text-3xl font-black text-brand-dark mb-6 tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-dark text-sm border border-brand-yellow/50">{idx + 1}</span>
                {section.title}
               </h2>
               <div className="text-gray-700 leading-relaxed text-lg">
                 {section.content}
               </div>
             </div>
           ))}
        </article>

        {/* specific Service FAQ */}
        <div className="bg-brand-dark p-8 md:p-16 rounded-[3rem] premium-shadow border border-gray-800 text-white max-w-5xl mx-auto mb-20 relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl"></div>
           
           <h2 className="text-4xl font-black text-white mb-12 text-center relative z-10">Frequently Asked Questions</h2>
           <div className="space-y-4 max-w-3xl mx-auto relative z-10">
             {contentData.faqs.map((faq, index) => (
               <div key={index} className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300">
                 <button
                   className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer focus:outline-none hover:bg-gray-800 transition-colors"
                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
                   type="button"
                 >
                   <span className="font-bold text-xl text-white pr-8">{faq.question}</span>
                   <ChevronDown 
                     className={`text-brand-yellow transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                     size={24} 
                   />
                 </button>
                 <div 
                   className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                 >
                   <p className="text-gray-400 leading-relaxed text-lg">{faq.answer}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* City cross-links for internal linking & local SEO */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-8 text-center">{title} — Pick Your City</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Local details, ETAs, and pricing for {title.toLowerCase()} in each East GTA city we cover.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(CITY_CONTENT).map((c) => (
              <Link
                key={c.id}
                to={`/service/${id}/${c.id}`}
                className="group bg-white p-6 rounded-2xl premium-shadow border border-gray-100 hover:border-brand-yellow transition-all text-center"
              >
                <MapPin className="mx-auto text-brand-yellow mb-3" size={24} />
                <h3 className="font-black text-brand-dark mb-1">{c.name}</h3>
                <p className="text-xs text-gray-500">ETA {c.responseTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Elements at Bottom */}
      <Testimonials />

      {/* Massive Bottom CTA */}
      <div className="bg-brand-yellow py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 background-pattern"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6">Need help right now?</h2>
            <p className="text-xl md:text-2xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-medium">
               Our dispatchers are standing by. We can have a unit safely to your location in minutes.
            </p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`footer_call_${id}`)}
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

export default ServicePage;
