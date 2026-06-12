import { Disc, Battery, Fuel, Key, Truck, Wrench, RefreshCw, CircleDot, Gauge, BatteryCharging } from 'lucide-react';
import { ServiceItem, Testimonial } from './types';

export const COMPANY_NAME = "iFAST Roadside Assistance";
export const PHONE_NUMBER = "+1 437-215-3468";
export const EMAIL = "help@ifastroadside.ca";
export const ADDRESS = "20 Antrim Crescent, Scarborough, ON M1P 4N3";
export const BUSINESS_HOURS = "24/7";
export const GOOGLE_RATING = 4.9;
export const GOOGLE_REVIEWS_COUNT = 94;

export const SERVICES: ServiceItem[] = [
  {
    id: 'mobile-mechanic',
    title: 'Mobile Mechanic',
    description: 'Vehicle won\'t start or making strange noises? Our certified mechanics come to your home or office to diagnose and repair your car on-site. Professional grade tools and diagnostics.',
    icon: Wrench,
  },
  {
    id: 'tire-change',
    title: 'Mobile Tire Service',
    description: 'Dangerous highway blowout? We mount, balance, and repair flat tires right at your location. Safe lifting, zero towing required.',
    icon: Disc,
  },
  {
    id: 'jump-start',
    title: 'Battery Jump Start',
    description: 'Dead battery in the cold? We safely surge-start your engine using anti-surge packs to protect your vehicle\'s sensitive electronics.',
    icon: Battery,
  },
  {
    id: 'lockout',
    title: 'Car Lockout',
    description: 'Keys locked inside? Our technicians use precision, non-marring tools to unlock your door with a 100% damage-free guarantee.',
    icon: Key,
  },
  {
    id: 'fuel',
    title: 'Fuel Delivery',
    description: 'Stuck on empty? Stay safe in your car. We deliver premium, regular, or diesel fuel directly to you so you can avoid walking the highway.',
    icon: Fuel,
  },
  {
    id: 'towing',
    title: 'Emergency Towing',
    description: 'Major breakdown or accident? Our modern flatbeds ensure your AWD or luxury vehicle is transported securely without drivetrain damage.',
    icon: Truck,
  },
  // --- Tire sub-services (grouped under the Mobile Tire Service card) ---
  {
    id: 'flat-tire-repair',
    title: 'Flat Tire Repair',
    description: 'Nail or screw in your tread? We dismount, patch-and-plug from the inside, re-balance, and reinstall — a permanent, MTO-approved fix done at your location.',
    icon: Wrench,
    parent: 'tire-change',
  },
  {
    id: 'spare-tire-change',
    title: 'Spare Tire Change',
    description: 'Got a spare but stuck on the shoulder? We safely jack your vehicle, swap your flat for your spare or donut, and torque every lug to spec so you can drive on.',
    icon: RefreshCw,
    parent: 'tire-change',
  },
  {
    id: 'tire-installation',
    title: 'New & Used Tire Installation',
    description: 'No spare? We bring new or quality used tires in your size to your driveway or roadside, then mount, balance, and install them on-site — no shop visit needed.',
    icon: CircleDot,
    parent: 'tire-change',
  },
  // --- Battery sub-services (grouped under the Battery Jump Start card) ---
  {
    id: 'battery-diagnostic',
    title: 'Battery Diagnostic',
    description: 'Car cranking slow or dying repeatedly? We test your battery, alternator, and charging system on-site so you know if you need a boost, a charge, or a replacement.',
    icon: Gauge,
    parent: 'jump-start',
  },
  {
    id: 'battery-replacement',
    title: 'Battery Replacement',
    description: 'Battery beyond saving? We deliver and install the correct new battery for your vehicle right where you are, and safely recycle the old one — no towing required.',
    icon: BatteryCharging,
    parent: 'jump-start',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Pickering Resident",
    content: "I was terrified stranded alone on the dark shoulder of the 401 at midnight. I called iFAST and a strobe-lit truck arrived in 20 minutes. The driver was so professional and made me feel completely safe while he swapped my tire.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Ross",
    role: "Oshawa Delivery Driver",
    content: "As a delivery driver, a dead battery means I lose money. Every other tow company quoted me a 3-hour wait. iFAST was there with a booster pack in 15 minutes. Pure speed and professionalism.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Scarborough Student",
    content: "Locked my toddler's diaper bag and my keys inside the car in the freezing cold. I was panicking. They treated it like a code red, showed up incredibly fast, and got the door open without a single scratch on my leased car.",
    rating: 5
  }
];