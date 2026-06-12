import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import GoogleReviews from '../components/GoogleReviews';
import Services from '../components/Services';
import About from '../components/About';
import Process from '../components/Process';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('section, .service-card-reveal');
    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Helmet>
        <title>iFAST Roadside Assistance | 24/7 Fast Towing & Mobile Tires East GTA</title>
        <meta name="description" content="Stranded? Get rapid 24/7 roadside assistance and mobile tire repair across Scarborough, Pickering, Ajax, Whitby, and Oshawa. 30-min ETA. Safe, damage-free service. No hidden fees. Call now." />
        <link rel="canonical" href="https://www.ifastroadside.ca/" />
        <meta property="og:title" content="iFAST Roadside Assistance — 24/7 Rapid Response in East GTA" />
        <meta property="og:description" content="Stranded? Get rapid 24/7 roadside assistance across Scarborough, Pickering, Ajax, Whitby, and Oshawa. Mobile tire, jump start, lockout, fuel, and towing experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ifastroadside.ca/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How fast can you reach my location?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On average, our technicians arrive within 30 minutes. However, arrival times can vary based on traffic, weather conditions, and your exact location in the East GTA."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer services 24/7?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We operate 24 hours a day, 7 days a week, including holidays. Emergency roadside help is always just a phone call away."
                }
              },
              {
                "@type": "Question",
                "name": "What tire sizes do you carry?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We carry most standard passenger vehicle, SUV, and light truck tire sizes. For specific or rare sizes, we recommend calling ahead so we can ensure we have your exact match on the mobile unit."
                }
              },
              {
                "@type": "Question",
                "name": "Do you accept insurance or roadside club memberships?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide detailed digital receipts that you can submit to your insurance provider or roadside assistance club for reimbursement. We accept all major credit cards, debit cards, and digital payments."
                }
              },
              {
                "@type": "Question",
                "name": "Is my vehicle safe during a lockout service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Our technicians use professional, damage-free tools and techniques specifically designed to unlock vehicles without harming the door seals, paint, or locking mechanism."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Hero />
      <GoogleReviews />
      <About />
      <Services />
      <Process />
      <FAQ />
    </main>
  );
};

export default Home;
