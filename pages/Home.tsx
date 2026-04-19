import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
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
        <title>iFAST Roadside Assistance & Mobile Tires | Scarborough · Pickering · Ajax · Whitby · Oshawa 24/7</title>
        <meta name="description" content="24/7 local roadside assistance and mobile tire service across Scarborough, Pickering, Ajax, Whitby, and Oshawa. Flat tire repair, jump start, lockout, fuel delivery, towing. 4.9★ / 94+ reviews. 15-30 min arrival. Call +1 437-215-3468." />
        <link rel="canonical" href="https://ifastroadside.ca/" />
        <meta property="og:title" content="iFAST Roadside Assistance — East GTA 24/7 Local Service" />
        <meta property="og:description" content="Local 24/7 roadside assistance across Scarborough, Pickering, Ajax, Whitby, Oshawa. Mobile tire, jump start, lockout, fuel, towing. 4.9★ / 94+ reviews." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ifastroadside.ca/" />
      </Helmet>
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
    </main>
  );
};

export default Home;
