import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PhoneCall, Mail, MapPin, Clock, Send, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, EMAIL, ADDRESS, BUSINESS_HOURS, SERVICES } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

// Web3Forms delivers the form to the business inbox without a backend.
// Get a free access key at https://web3forms.com (enter the destination email,
// they email you a key) and paste it below — submissions land in that inbox.
// Until a real key is set the form will return an error on submit.
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

// Google Maps embed for the home base. Uses the keyless embed endpoint, so no
// Maps API key or billing account is required.
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `New website enquiry — ${COMPANY_NAME}`);
    formData.append('from_name', COMPANY_NAME);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please call us instead.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not send your message. Please call us instead.');
    }
  };

  const canonical = 'https://www.ifastroadside.ca/contact';

  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': `Contact ${COMPANY_NAME}`,
    'url': canonical,
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': COMPANY_NAME,
      'telephone': PHONE_NUMBER,
      'email': EMAIL,
      'url': 'https://www.ifastroadside.ca',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '20 Antrim Crescent',
        'addressLocality': 'Scarborough',
        'addressRegion': 'ON',
        'postalCode': 'M1P 4N3',
        'addressCountry': 'CA',
      },
      'openingHours': 'Mo-Su 00:00-24:00',
      'areaServed': 'Greater Toronto Area',
    },
  };

  const details = [
    {
      icon: PhoneCall,
      label: 'Call us — fastest response',
      value: PHONE_NUMBER,
      href: `tel:${PHONE_NUMBER}`,
      onClick: () => trackPhoneCall('contact_page_details_call'),
    },
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: `${BUSINESS_HOURS} — including holidays`,
    },
    {
      icon: MapPin,
      label: 'Home base',
      value: ADDRESS,
      sub: 'Units stationed GTA-wide',
    },
  ];

  return (
    <main className="bg-gray-50">
      <Helmet>
        <title>Contact iFAST Roadside Assistance | 24/7 GTA Roadside & Mobile Tires</title>
        <meta
          name="description"
          content="Contact iFAST Roadside & Mobile Tires. Call +1 437-215-3468 for 24/7 roadside assistance across the Greater Toronto Area, or send us a message and we'll get right back to you."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Contact iFAST Roadside Assistance" />
        <meta property="og:description" content="24/7 roadside assistance and mobile tire service across the GTA. Call or message us." />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(contactLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-dark text-white pt-32 pb-20 background-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-brand-yellow/15 text-brand-yellow font-black uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
            Contact <span className="text-brand-yellow">iFAST</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Stranded right now? Don't fill out a form — <strong className="text-white">call us</strong>. We're
            available {BUSINESS_HOURS} across the Greater Toronto Area. For quotes and non-urgent questions,
            send a message below.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall('contact_page_hero_call')}
            className="inline-flex items-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-4 rounded-full font-black text-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,90,31,0.39)] hover:-translate-y-0.5"
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <PhoneCall size={22} fill="currentColor" />
            {PHONE_NUMBER}
          </a>
        </div>
      </section>

      {/* Details + Form */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: details + map */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-8">Reach us directly</h2>
            <ul className="space-y-6 mb-10">
              {details.map((d) => {
                const Icon = d.icon;
                const content = (
                  <>
                    <div className="bg-brand-yellow/10 text-brand-yellow p-3 rounded-xl shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{d.label}</p>
                      <p className="text-lg font-bold text-brand-dark">{d.value}</p>
                      {d.sub && <p className="text-sm text-gray-500">{d.sub}</p>}
                    </div>
                  </>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a href={d.href} onClick={d.onClick} className="flex items-start gap-4 group">
                        <span className="flex items-start gap-4 group-hover:opacity-80 transition-opacity">{content}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="rounded-2xl overflow-hidden premium-shadow border border-gray-100">
              <iframe
                title={`${COMPANY_NAME} location map`}
                src={MAP_SRC}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl premium-shadow p-6 md:p-10 border border-gray-100">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-12">
                <div className="bg-green-100 text-green-600 p-4 rounded-full mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-black text-brand-dark mb-3">Message sent!</h2>
                <p className="text-gray-600 mb-8 max-w-sm">
                  Thanks for reaching out. We'll get back to you shortly. Need help right now?
                  Call us and we'll dispatch a unit.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => trackPhoneCall('contact_page_success_call')}
                  className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-white px-7 py-3 rounded-full font-black transition-all"
                >
                  <PhoneCall size={18} fill="currentColor" />
                  {PHONE_NUMBER}
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-2">Send us a message</h2>
                <p className="text-gray-500 mb-8">
                  Fill this out and we'll get back to you. For emergencies, please call.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — bots fill this, humans never see it */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">
                      Name <span className="text-brand-yellow">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-brand-dark mb-2">
                        Phone <span className="text-brand-yellow">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition"
                        placeholder="(437) 215-3468"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-bold text-brand-dark mb-2">
                      What do you need?
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition bg-white"
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.filter((s) => !s.parent).map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Other">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-2">
                      Message <span className="text-brand-yellow">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition resize-y"
                      placeholder="Tell us your location and what's going on…"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-600 font-semibold">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-white py-4 rounded-xl font-black text-lg transition-all active:scale-[0.99] shadow-[0_4px_14px_0_rgba(255,90,31,0.39)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 size={20} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={20} /> Send message</>
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
                    <ShieldCheck size={14} /> We only use your details to reply. No spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
