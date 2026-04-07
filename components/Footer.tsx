import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, EMAIL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-gray-400 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="/" aria-label={`${COMPANY_NAME} Home`} className="inline-block mb-8 transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt={`${COMPANY_NAME} Logo`} 
                className="h-48 sm:h-64 md:h-80 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,185,0,0.2)]" 
              />
            </a>
            <p className="max-w-md mb-6">
              Your trusted partner for 24/7 roadside assistance and mobile tire services.
              Licensed, insured, and ready to help when you need it most.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Follow us on Facebook" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"><Facebook size={20} /></a>
              <a href="#" aria-label="Follow us on Instagram" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="Follow us on Twitter" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#services" className="hover:text-brand-yellow transition-colors">Services</a></li>
              <li><a href="/#about" className="hover:text-brand-yellow transition-colors">About Us</a></li>
              <li><a href="/#reviews" className="hover:text-brand-yellow transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <li>Pickering</li>
              <li>Ajax</li>
              <li>Whitby</li>
              <li>Oshawa</li>
              <li>Scarborough</li>
              <li>East GTA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-brand-yellow shrink-0" size={18} />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-brand-yellow shrink-0" size={18} />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-yellow shrink-0" size={18} />
                <span className="text-xs">Greater Metro Area & Surrounding Suburbs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for speed & safety.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;