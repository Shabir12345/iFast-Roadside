import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, EMAIL, ADDRESS, BUSINESS_HOURS, SERVICES } from '../constants';
import { CITY_CONTENT } from '../data/cityContent';
import { REGION_CONTENT } from '../data/regionContent';
import { trackPhoneCall } from '../utils/analytics';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-gray-400 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <a href="/" aria-label={`${COMPANY_NAME} Home`} className="inline-block mb-8 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.webp"
                alt={`${COMPANY_NAME} Logo`}
                width={800}
                height={533}
                className="h-48 sm:h-64 md:h-80 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,185,0,0.2)]"
              />
            </a>
            <p className="max-w-md mb-6">
              Your trusted partner for {BUSINESS_HOURS} roadside assistance and mobile tire services
              across the Greater Toronto Area. Licensed, insured, and ready to help when you need it most.
            </p>
            {/* Social icons removed until real profiles exist — dead "#" links erode trust. */}
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Services</h2>
            <ul className="space-y-1 text-sm">
              {SERVICES.filter(s => !s.parent).map(service => (
                <li key={service.id}>
                  <a href={`/service/${service.id}`} className="inline-block py-1.5 hover:text-brand-yellow transition-colors">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h2>
            <ul className="space-y-1">
              <li><a href="/mobile-mechanic" className="inline-block py-1.5 hover:text-brand-yellow font-bold text-white transition-colors">Mobile Mechanic</a></li>
              <li><a href="/#services" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">Services</a></li>
              <li><a href="/#about" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">About Us</a></li>
              <li><a href="/#reviews" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">Reviews</a></li>
              <li><a href="/blog" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">Blog & Tips</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Service Areas</h2>
            {/* Derived from the content maps rather than hand-listed, so a new
                city or region appears here automatically. The hand-written
                version silently missed every city added after it was written. */}
            <ul className="grid grid-cols-2 gap-x-4 text-xs">
              {Object.values(CITY_CONTENT).map((c) => (
                <li key={c.id}>
                  <a href={`/areas/${c.id}`} className="inline-block py-1.5 hover:text-brand-yellow transition-colors">{c.name}</a>
                </li>
              ))}
              {Object.values(REGION_CONTENT).map((r) => (
                <li key={r.slug}>
                  <a href={`/service-area/${r.slug}`} className="inline-block py-1.5 hover:text-brand-yellow transition-colors">{r.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-brand-yellow shrink-0" size={18} />
                <a 
                  href={`tel:${PHONE_NUMBER}`} 
                  onClick={() => trackPhoneCall('footer_contact_call')}
                  className="hover:text-white transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-brand-yellow shrink-0" size={18} />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-brand-yellow shrink-0" size={18} />
                <span className="text-sm font-bold text-gray-200">{BUSINESS_HOURS}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-yellow shrink-0" size={18} />
                <div className="flex flex-col">
                  <span className="text-xs text-white font-bold">{ADDRESS}</span>
                  <span className="text-[10px] uppercase tracking-tighter">Serving the Greater Toronto Area</span>
                </div>
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