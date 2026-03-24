import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES, PHONE_NUMBER } from '../constants';
import { SERVICE_CONTENT } from '../data/serviceContent';
import { PhoneCall, ArrowLeft, ChevronDown } from 'lucide-react';

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
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <Helmet>
        <title>{contentData.seoTitle}</title>
        <meta name="description" content={contentData.seoDescription} />
        <meta name="keywords" content={contentData.keywords} />
        <link rel="canonical" href={`https://ifastroadside.com/service/${id}`} />
        <meta property="og:title" content={contentData.seoTitle} />
        <meta property="og:description" content={contentData.seoDescription} />
        <meta property="og:image" content={`https://ifastroadside.com${contentData.heroImage}`} />
        <meta property="og:url" content={`https://ifastroadside.com/service/${id}`} />
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

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 premium-shadow mb-12 flex flex-col md:flex-row gap-8 items-center border border-gray-100">
          <div className="flex-1">
            <div className="w-16 h-16 bg-brand-yellow text-brand-dark rounded-2xl flex items-center justify-center mb-6">
              <Icon size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 premium-shadow focus:ring-4 focus:ring-brand-yellow/30"
              >
                <PhoneCall size={20} />
                Call Now for {title}
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 overflow-hidden rounded-2xl relative">
             <div className="aspect-w-4 aspect-h-3">
               <img 
                 src={contentData.heroImage} 
                 alt={`${title} service professional`}
                 className="w-full h-full object-cover rounded-2xl premium-shadow"
               />
             </div>
          </div>
        </div>

        {/* Service Details (Blog-style content) */}
        <article className="prose prose-lg max-w-none text-gray-700 mb-16 bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
           {contentData.blogSections.map((section, idx) => (
             <div key={idx} className="mb-8 last:mb-0">
               <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.title}</h2>
               <div className="text-gray-700 leading-relaxed">
                 {section.content}
               </div>
             </div>
           ))}
        </article>

        {/* specific Service FAQ */}
        <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
           <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Frequently Asked Questions</h2>
           <div className="space-y-4 max-w-3xl mx-auto">
             {contentData.faqs.map((faq, index) => (
               <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300">
                 <button
                   className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 text-left cursor-pointer focus:outline-none"
                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
                   type="button"
                 >
                   <span className="font-bold text-lg text-brand-dark pr-8">{faq.question}</span>
                   <ChevronDown 
                     className={`text-brand-yellow transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                     size={24} 
                   />
                 </button>
                 <div 
                   className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                 >
                   <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
