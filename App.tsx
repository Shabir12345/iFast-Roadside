import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import StickyCall from './components/StickyCall';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import ServiceCityPage from './pages/ServiceCityPage';
import EastGtaServiceAreaPage from './pages/EastGtaServiceAreaPage';
import CityPage from './pages/CityPage';
import MobileMechanicLanding from './pages/MobileMechanicLanding';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16 md:pb-0">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile-mechanic" element={<MobileMechanicLanding />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/service/:id/:city" element={<ServiceCityPage />} />
        <Route path="/service-area/east-gta" element={<EastGtaServiceAreaPage />} />
        <Route path="/areas/:city" element={<CityPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />

      {/* Floating Elements */}
      <ChatBot />
      <StickyCall />
    </div>
  );
};

export default App;