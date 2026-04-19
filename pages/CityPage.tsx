import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PhoneCall, ArrowLeft, ChevronDown, Clock, CheckCircle, Star, ShieldCheck, ThumbsUp, MapPin, Route, Camera, Circle } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_NAME, SERVICES } from '../constants';
import { CITY_CONTENT } from '../data/cityContent';
import Process from '../components/Process';
import { trackPhoneCall } from '../utils/analytics';

const CityPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const content = city ? CITY_CONTENT[city] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city]);

  if (!content) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 pt-20">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Service Area Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the service area you're looking for.</p>
        <Link to="/" className="text-brand-yellow font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  const canonical = `https://ifastroadside.ca/areas/${content.id}`;

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `${COMPANY_NAME} — ${content.name}`,
    'description': content.seoDescription,
    'telephone': PHONE_NUMBER,
    'url': canonical,
    'image': `https://ifastroadside.ca${content.heroImage}`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '20 Antrim Crescent',
      'addressLocality': 'Scarborough',
      'addressRegion': 'ON',
      'postalCode': 'M1P 4N3',
      'addressCountry': 'CA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 43.7290,
      'longitude': -79.2790
    },
    'areaServed': {
      '@type': 'City',
      'name': content.name,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': content.geo.latitude,
        'longitude': content.geo.longitude
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '94'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://ifastroadside.ca/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Service Areas', 'item': 'https://ifastroadside.ca/service-area/east-gta' },
      { '@type': 'ListItem', 'position': 3, 'name': content.name, 'item': canonical }
    ]
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': content.faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-0">
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`https://ifastroadside.ca${content.heroImage}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="text-gray-500 flex items-center gap-2 hover:text-brand-dark transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-3xl overflow-hidden premium-shadow mb-16 flex flex-col lg:flex-row border border-gray-100 relative">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-dark px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit cursor-default border border-brand-yellow/50">
              <Clock size={16} className="text-brand-dark animate-pulse" /> {content.name} ETA {content.responseTime}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-[1.1] tracking-tight">
              24/7 Roadside Assistance in <span className="text-brand-yellow block mt-1">{content.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              {content.tagline}. Mobile tire repair, jump starts, lockouts, fuel delivery, and emergency towing — dispatched from our {content.name === 'Scarborough' ? 'local base' : 'East GTA hub'} in {content.responseTime}.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="border-b-2 border-brand-yellow/30">Local {content.name} Dispatch</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="border-b-2 border-brand-yellow/30">4.9★ / 94+ Google Reviews</span>
              </div>
              <div className="flex items-center gap-3 text-base md:text-lg font-bold text-gray-800">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="border-b-2 border-brand-yellow/30">Upfront Pricing, No Surprises</span>
              </div>
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall(`city_hero_call_${content.id}`)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-5 rounded-2xl font-black text-xl lg:text-3xl transition-all duration-300 shadow-[0_0_40px_rgba(253,224,71,0.5)] hover:shadow-[0_0_60px_rgba(253,224,71,0.7)] transform hover:-translate-y-1 text-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="bg-brand-dark text-brand-yellow p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <PhoneCall size={32} />
              </div>
              <span>Call {content.name} Dispatch</span>
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2"><ShieldCheck className="text-brand-dark" size={20} /> Licensed & Insured</div>
              <div className="flex items-center gap-2"><ThumbsUp className="text-brand-dark" size={20} /> Damage-Free Guarantee</div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
            <img
              src={content.heroImage}
              alt={`iFAST technician on a ${content.name} roadside assistance call`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-gray-900/40 lg:to-transparent"></div>

            {/* Field-report style badges to frame the hero as live dispatch */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2 z-10">
              <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                <Circle size={8} className="text-red-500 fill-red-500 animate-pulse" />
                Live · {content.name} dispatch
              </div>
              <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-[11px] font-semibold">
                <Camera size={12} /> 24/7 mobile crew · Licensed & insured
              </div>
            </div>

            <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-2xl border border-white/20">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${20 + i}`} alt={`${content.name} customer`} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                  ))}
                </div>
                <div className="hidden sm:block">
                  <div className="flex text-brand-yellow mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <div className="text-sm font-bold text-brand-dark">94+ {content.name} Area Reviews</div>
                </div>
              </div>
              <div className="text-right border-l-2 border-gray-100 pl-4 md:pl-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{content.name} ETA</div>
                <div className="font-black text-brand-dark text-xl md:text-2xl">{content.responseTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro / local angle */}
      <div className="container mx-auto px-4 mt-8 mb-16">
        <article className="prose prose-lg md:prose-xl max-w-4xl mx-auto text-gray-700 mb-16 bg-white p-8 md:p-14 rounded-[3rem] premium-shadow border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-yellow via-brand-yellow/50 to-brand-yellow"></div>
          <h2 className="text-3xl font-black text-brand-dark mb-6 tracking-tight">Local {content.name} Roadside — How We Work Here</h2>
          <div className="text-gray-700 leading-relaxed text-lg">{content.introParagraph}</div>
          <div className="text-gray-700 leading-relaxed text-lg mt-8">{content.localAngle}</div>
        </article>

        {/* Highways / Neighborhoods / Landmarks */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
            <Route className="text-brand-yellow mb-3" size={32} />
            <h3 className="text-xl font-black text-brand-dark mb-4">Highways We Cover</h3>
            <ul className="space-y-2">
              {content.highways.map(h => (
                <li key={h} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
            <MapPin className="text-brand-yellow mb-3" size={32} />
            <h3 className="text-xl font-black text-brand-dark mb-4">{content.name} Neighborhoods</h3>
            <ul className="space-y-2">
              {content.neighborhoods.map(n => (
                <li key={n} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
            <ShieldCheck className="text-brand-yellow mb-3" size={32} />
            <h3 className="text-xl font-black text-brand-dark mb-4">Landmarks Nearby</h3>
            <ul className="space-y-2">
              {content.landmarks.map(l => (
                <li key={l} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Services in this city */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-8 text-center">Services we provide in {content.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(service => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/service/${service.id}/${content.id}`}
                  className="group bg-white p-8 rounded-3xl premium-shadow border border-gray-100 hover:border-brand-yellow transition-all"
                >
                  <div className="w-14 h-14 bg-brand-yellow/20 text-brand-dark rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-brand-dark mb-2">{service.title} in {content.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Process />

      <div className="container mx-auto px-4 py-16">
        {/* Local testimonials */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-8 text-center">What {content.name} drivers say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                <div className="flex text-brand-yellow mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 text-lg italic mb-4">"{t.content}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-brand-dark">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-brand-dark p-8 md:p-16 rounded-[3rem] premium-shadow border border-gray-800 text-white max-w-5xl mx-auto mb-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl"></div>

          <h2 className="text-4xl font-black text-white mb-12 text-center relative z-10">{content.name} FAQs</h2>
          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            {content.faqs.map((faq, index) => (
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
                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                  <p className="text-gray-400 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-yellow py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 background-pattern"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6">Stuck in {content.name}?</h2>
          <p className="text-xl md:text-2xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-medium">
            Local dispatch is standing by. Typical ETA {content.responseTime}. One call handles it.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall(`city_footer_call_${content.id}`)}
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

export default CityPage;
