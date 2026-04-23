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
        <title>iFAST Roadside Assistance | 24/7 Fast Towing & Mobile Tires East GTA</title>
        <meta name="description" content="Stranded? Get rapid 24/7 roadside assistance and mobile tire repair across Scarborough, Pickering, Ajax, Whitby, and Oshawa. 30-min ETA. Safe, damage-free service. No hidden fees. Call now." />
        <link rel="canonical" href="https://ifastroadside.ca/" />
        <meta property="og:title" content="iFAST Roadside Assistance — 24/7 Rapid Response in East GTA" />
        <meta property="og:description" content="Stranded? Get rapid 24/7 roadside assistance across Scarborough, Pickering, Ajax, Whitby, and Oshawa. Mobile tire, jump start, lockout, fuel, and towing experts." />
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
