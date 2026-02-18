import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import StickyCall from './components/StickyCall';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';

import { useEffect } from 'react';

const App: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16 md:pb-0">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />

      {/* Floating Elements */}
      <ChatBot />
      <StickyCall />
    </div>
  );
};

export default App;