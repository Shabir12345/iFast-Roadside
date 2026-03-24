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
        <title>iFAST Roadside & Mobile Tires | 24/7 Service GTA</title>
        <meta name="description" content="Fast, reliable 24/7 roadside assistance and mobile tire service across the Greater Metro Area. Arriving in 30 minutes or less on average." />
        <link rel="canonical" href="https://ifastroadside.com/" />
        <meta property="og:title" content="iFAST Roadside & Mobile Tires" />
        <meta property="og:description" content="Fast, reliable 24/7 roadside assistance and mobile tire service across the Greater Metro Area." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ifastroadside.com/" />
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
