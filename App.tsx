import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import StickyCall from './components/StickyCall';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16 md:pb-0">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<ServicePage />} />
      </Routes>
      <Footer />

      {/* Floating Elements */}
      <ChatBot />
      <StickyCall />
    </div>
  );
};

export default App;