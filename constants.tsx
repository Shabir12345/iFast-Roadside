import { Disc, Battery, Fuel, Key, Truck } from 'lucide-react';
import { ServiceItem, Testimonial } from './types';

export const COMPANY_NAME = "iFAST Roadside & Mobile Tires";
export const PHONE_NUMBER = "+1 437-215-3468";
export const EMAIL = "help@ifastroadside.ca";

export const SERVICES: ServiceItem[] = [
  {
    id: 'tire-change',
    title: 'Mobile Tire Service',
    description: 'Flat tire repair, replacement, and balancing at your location. We carry most standard sizes.',
    icon: Disc,
  },
  {
    id: 'jump-start',
    title: 'Battery Jump Start',
    description: 'Dead battery? We will come to you and get your vehicle started instantly.',
    icon: Battery,
  },
  {
    id: 'lockout',
    title: 'Car Lockout',
    description: 'Locked your keys inside? Our technicians use damage-free tools to unlock your door.',
    icon: Key,
  },
  {
    id: 'fuel',
    title: 'Fuel Delivery',
    description: 'Ran out of gas? We deliver up to 5 gallons of regular, premium, or diesel fuel.',
    icon: Fuel,
  },
  {
    id: 'towing',
    title: 'Emergency Towing',
    description: 'Flatbed towing service for vehicles that cannot be repaired on the spot.',
    icon: Truck,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Pickering Resident",
    content: "I got a flat on the 401 near Pickering at 10 PM. iFAST was there in 20 minutes and had me back on the road in no time. Lifesavers!",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Ross",
    role: "Oshawa Delivery Driver",
    content: "Professional and quick. I was stuck in a driveway in Oshawa and their mobile tire service saved me a trip to the shop. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Scarborough Student",
    content: "Locked my keys in the car near UT Scarborough. They arrived so fast and were very affordable compared to the other quotes I got.",
    rating: 5
  }
];