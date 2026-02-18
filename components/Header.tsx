import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-brand-dark/95 backdrop-blur-sm text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
            <div className="bg-brand-yellow p-1 rounded-md">
                <span className="text-brand-dark font-black text-xl tracking-tighter">iFAST</span>
            </div>
            <span className="font-bold text-lg hidden sm:block tracking-tight">{COMPANY_NAME}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          <a href="#services" className="hover:text-brand-yellow transition-colors duration-300">Services</a>
          <a href="#about" className="hover:text-brand-yellow transition-colors duration-300">About</a>
          <a href="#reviews" className="hover:text-brand-yellow transition-colors duration-300">Reviews</a>
          <a href="#contact" className="hover:text-brand-yellow transition-colors duration-300">Contact</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-6 py-2.5 rounded-full font-bold transition-all duration-300 premium-shadow-hover"
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <PhoneCall size={18} />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-gray-700 absolute w-full">
          <div className="flex flex-col p-4 space-y-4 text-center">
            <a href="#services" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white">About</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white">Reviews</a>
            <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark py-3 rounded-lg font-bold"
            >
                <PhoneCall size={20} />
                Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;