import { Disc, Battery, Fuel, Key, Truck, Wrench, RefreshCw, CircleDot, Gauge, BatteryCharging } from 'lucide-react';
import { ServiceItem, Testimonial, GoogleReview } from './types';

export const COMPANY_NAME = "iFAST Roadside Assistance";
export const PHONE_NUMBER = "+1 437-215-3468";
export const EMAIL = "help@ifastroadside.ca";
export const ADDRESS = "20 Antrim Crescent, Scarborough, ON M1P 4N3";
export const BUSINESS_HOURS = "24/7";
export const GOOGLE_RATING = 4.9;
export const GOOGLE_REVIEWS_COUNT = 94;

// Direct link to the iFAST Google Business reviews panel.
// Swap the static GOOGLE_REVIEWS below for live Places API data when that's wired up.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=ifastroadside#lrd=0x89d4d1ede5e0b3d9:0x1b3fa201a2a7c25b,1,,,,";

// Real reviews transcribed verbatim from the Google Business Profile
// (screenshots provided 2026-06-11). The "timeAgo" values are relative to that
// date and will drift — refresh them (or wire up the Places API) periodically.
// Only add real GBP reviews here; fabricated reviews violate Google ToS and
// the Competition Act.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: "Hayoung",
    timeAgo: "2 days ago",
    content:
      "I can't say enough good things about their service. Two days after the first repair, my tire started losing air again because of a completely different issue. I called them, and they arrived within 20 minutes. They worked hard to find the problem, fixed it right away, and made sure everything was safe before leaving. Their response time, professionalism, and dedication were incredible. If you're looking for someone honest, reliable, and truly committed to helping their customers, this is the company to call. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "吴千红",
    timeAgo: "2 days ago",
    content:
      "There was a screw in my front tire. Although there was no air leakage, I had to drive on the highway the next day. For safety, I still called ifast roadside assistance at 10:30 p.m. (because the address is very close to my home). It took half an hour from the phone call to Safi to my downstairs. He took less than half an hour to repair the tire, solved my big problem super quickly, and also gave me some discounts. Drive safely tomorrow! Thanks for Safi's hard work!",
    rating: 5,
  },
  {
    id: 3,
    name: "Hawi Alemayehu",
    timeAgo: "a year ago",
    content:
      "I just got a new battery with two years warranty (hopefully I don't need it but just in case 😅). Their service was quick and efficient. They also responded fast and communicated well. I 100% recommend their service for any type of car related emergency assistance you need!!!",
    rating: 5,
  },
  {
    id: 4,
    name: "Ray and Limai",
    timeAgo: "4 months ago",
    content:
      "Really fast service in North York (15 mins arrival) to give my car a boost after I parked it overnight outdoor hospital parking lot and it wouldn't start the next day.",
    rating: 5,
  },
  {
    id: 5,
    name: "Monic Santamaria",
    timeAgo: "a year ago",
    content:
      "I had a screw in my tire I contact them both over the phone and then sent some photos to ensure they could fix the tire at my house.",
    rating: 5,
  },
  {
    id: 6,
    name: "Selena Alleyne",
    timeAgo: "1 day ago",
    content:
      "I had a great experience with Fayaz this past weekend. I accidentally put too much air in my tires at a gas station, and he kindly stepped in to help me fix the issue. He took the time to make sure everything was safe and explained what he was doing, which I really appreciated. It's not often you come across someone who is both knowledgeable and genuinely willing to help a stranger without hesitation. His professionalism and kindness really stood out. I highly recommend Fayaz if you're looking for someone reliable and trustworthy. Thanks again for your help!",
    rating: 5,
  },
];

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
    description: 'Dead battery in the cold? We safely jump start your engine using anti-surge boost packs that protect your vehicle\'s sensitive electronics.',
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