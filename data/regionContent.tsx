import React from 'react';

// Regional service-area landing pages. Each region is a localized page that can
// rank on its own — do NOT collapse these into one generic "GTA" page.
// `east-gta` is our home base and was the original /service-area/east-gta page;
// its copy is preserved here. The other regions cover the rest of the GTA now
// that we dispatch units region-wide (see gta-wide expansion, 2026-07).

export interface RegionFaq {
  question: string;
  answer: string;
}

export interface RegionContent {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  bannerLabel: string;
  bannerText: React.ReactNode;
  heroBadge: string;
  h1Region: string;
  heroIntro: React.ReactNode;
  checkmarks: string[];
  responseTime: string;
  citiesCovered: string[];
  servicesHeading: string;
  servicesSubtext: React.ReactNode;
  bottomCtaHeading: string;
  bottomCtaText: React.ReactNode;
  areaServed: string[];
  geo: { latitude: number; longitude: number };
}

export const REGION_CONTENT: Record<string, RegionContent> = {
  'east-gta': {
    slug: 'east-gta',
    name: 'East GTA',
    seoTitle: '24/7 Roadside Assistance East GTA | Pickering, Ajax, Whitby, Oshawa',
    seoDescription:
      "The East GTA is our home base and fastest-response zone — Pickering, Ajax, Whitby, Oshawa, and Scarborough, with 15-30 min ETAs. Part of our GTA-wide 24/7 roadside and mobile tire coverage.",
    bannerLabel: 'East GTA Home Base:',
    bannerText: (
      <>
        Our fastest response is in{' '}
        <span className="underline decoration-brand-yellow decoration-2 underline-offset-2">
          Pickering, Ajax, Whitby, Oshawa, and Scarborough
        </span>{' '}
        — and we now cover the whole GTA, from Toronto to the West End.
      </>
    ),
    heroBadge: 'Local Dispatch (ETA 15-30 Mins)',
    h1Region: 'East GTA Mobile Team',
    heroIntro: (
      <>
        Stuck in <strong className="text-brand-dark">Pickering, Ajax, Whitby, Oshawa, or Scarborough</strong>? Our local units are stationed across the East side and typically reach you in about 30 minutes. Don't wait hours for an out-of-town tow.
      </>
    ),
    checkmarks: ['Local East GTA Drivers', 'No Hidden "Out of Zone" Fees', '5-Star Rated Service'],
    responseTime: '< 30 Mins',
    citiesCovered: ['Scarborough', 'Pickering', 'Ajax', 'Whitby', 'Oshawa'],
    servicesHeading: 'What we do in the East End',
    servicesSubtext: (
      <>
        Whether you blew a tire on the 401 in <span className="font-bold text-brand-dark">Oshawa</span> or need a jump-start in your <span className="font-bold text-brand-dark">Pickering</span> driveway, our mobile team handles it all with local expertise.
      </>
    ),
    bottomCtaHeading: 'Need help in the East GTA?',
    bottomCtaText: (
      <>Our dispatchers are local and ready. We have units roaming Pickering, Ajax, Whitby, and Oshawa ready for immediate dispatch.</>
    ),
    areaServed: ['Pickering', 'Ajax', 'Whitby', 'Oshawa', 'Scarborough'],
    geo: { latitude: 43.729, longitude: -79.279 },
  },

  toronto: {
    slug: 'toronto',
    name: 'Toronto',
    seoTitle: '24/7 Roadside Assistance Toronto | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription:
      'Fast 24/7 roadside assistance across Toronto — Downtown, North York, Etobicoke, East York, York, and Scarborough. Mobile tire repair, battery boost, lockout, fuel, and towing. 4.9★ rated. Call now.',
    bannerLabel: 'Now Serving Toronto:',
    bannerText: (
      <>
        Dispatch units across{' '}
        <span className="underline decoration-brand-yellow decoration-2 underline-offset-2">
          Downtown, North York, Etobicoke, East York &amp; Scarborough
        </span>{' '}
        — mobile roadside help that beats the downtown traffic to reach you.
      </>
    ),
    heroBadge: 'Toronto Dispatch (ETA 20-35 Mins)',
    h1Region: 'Toronto Mobile Team',
    heroIntro: (
      <>
        Broken down in <strong className="text-brand-dark">Downtown, North York, Etobicoke, East York, or Scarborough</strong>? Our mobile vans are built for the city — they clear condo garages and squeeze into tight downtown spots where a flatbed simply can't. Most Toronto calls see a unit in 20-35 minutes.
      </>
    ),
    checkmarks: ['Condo & Parking-Garage Ready', 'No Hidden "Out of Zone" Fees', '5-Star Rated Service'],
    responseTime: '20-35 Mins',
    citiesCovered: ['Downtown Toronto', 'North York', 'Etobicoke', 'East York', 'York', 'Scarborough'],
    servicesHeading: 'What we do across Toronto',
    servicesSubtext: (
      <>
        Whether you're stalled on the <span className="font-bold text-brand-dark">Gardiner or the DVP</span>, locked out at a <span className="font-bold text-brand-dark">North York</span> condo, or dead in a <span className="font-bold text-brand-dark">downtown</span> parking garage, our mobile team fixes it on the spot — no tow needed.
      </>
    ),
    bottomCtaHeading: 'Need roadside help in Toronto?',
    bottomCtaText: (
      <>Live dispatch, 24/7. We route the closest unit through Downtown, North York, Etobicoke, and Scarborough — with a real ETA before you hang up.</>
    ),
    areaServed: ['Toronto', 'North York', 'Etobicoke', 'East York', 'York', 'Scarborough'],
    geo: { latitude: 43.6532, longitude: -79.3832 },
  },

  'west-gta': {
    slug: 'west-gta',
    name: 'West GTA',
    seoTitle: '24/7 Roadside Assistance West GTA | Mississauga, Brampton, Oakville — iFAST',
    seoDescription:
      'Fast 24/7 roadside assistance across the West GTA — Mississauga, Brampton, Oakville, and Milton. Mobile tire repair, jump starts, lockouts, fuel delivery, and towing along the 401, 403, 407, and QEW. 4.9★ rated.',
    bannerLabel: 'Now Serving the West GTA:',
    bannerText: (
      <>
        Units across{' '}
        <span className="underline decoration-brand-yellow decoration-2 underline-offset-2">
          Mississauga, Brampton, Oakville &amp; Milton
        </span>{' '}
        — full coverage of the Pearson corridor and the 401/403/407/QEW.
      </>
    ),
    heroBadge: 'West GTA Dispatch (ETA 25-40 Mins)',
    h1Region: 'West GTA Mobile Team',
    heroIntro: (
      <>
        Stranded in <strong className="text-brand-dark">Mississauga, Brampton, Oakville, or Milton</strong>? The West end is all big highways and long commutes — a flat on the 403 or a dead battery at a Pearson-area hotel lot is exactly what we're built for. Our units typically reach you in 25-40 minutes.
      </>
    ),
    checkmarks: ['Highway-Safe (401/403/407/QEW)', 'Airport & Commuter Corridors', '5-Star Rated Service'],
    responseTime: '25-40 Mins',
    citiesCovered: ['Mississauga', 'Brampton', 'Oakville', 'Milton'],
    servicesHeading: 'What we do across the West GTA',
    servicesSubtext: (
      <>
        From a blowout on the <span className="font-bold text-brand-dark">403 or the QEW</span> to a lockout at <span className="font-bold text-brand-dark">Square One</span> or a boost in a <span className="font-bold text-brand-dark">Brampton</span> driveway, our mobile team comes to you with the full tire shop and jump kit in the van.
      </>
    ),
    bottomCtaHeading: 'Need roadside help in the West GTA?',
    bottomCtaText: (
      <>Live dispatch, 24/7. We stage units near the Pearson corridor and route the closest one to Mississauga, Brampton, Oakville, or Milton — with a real ETA up front.</>
    ),
    areaServed: ['Mississauga', 'Brampton', 'Oakville', 'Milton'],
    geo: { latitude: 43.589, longitude: -79.6441 },
  },

  'york-region': {
    slug: 'york-region',
    name: 'York Region',
    seoTitle: '24/7 Roadside Assistance York Region | Markham, Vaughan, Richmond Hill — iFAST',
    seoDescription:
      'Fast 24/7 roadside assistance across York Region — Markham, Vaughan, Richmond Hill, Aurora, and Newmarket. Mobile tire repair, jump starts, lockouts, fuel, and towing along the 404, 407, 400, and Highway 7. 4.9★ rated.',
    bannerLabel: 'Now Serving York Region:',
    bannerText: (
      <>
        Units across{' '}
        <span className="underline decoration-brand-yellow decoration-2 underline-offset-2">
          Markham, Vaughan, Richmond Hill, Aurora &amp; Newmarket
        </span>{' '}
        — covering the 404, 407, 400, and the Highway 7 tech corridor.
      </>
    ),
    heroBadge: 'York Region Dispatch (ETA 25-40 Mins)',
    h1Region: 'York Region Mobile Team',
    heroIntro: (
      <>
        Stuck in <strong className="text-brand-dark">Markham, Vaughan, Richmond Hill, Aurora, or Newmarket</strong>? The 905's fast-growing north end means long commutes on the 404 and 400 and plenty of new subdivisions — a dead battery or flat here can strand you far from the nearest shop. Our units typically reach you in 25-40 minutes.
      </>
    ),
    checkmarks: ['Covers 404 / 407 / 400 & Hwy 7', 'New Subdivisions & Condo Lots', '5-Star Rated Service'],
    responseTime: '25-40 Mins',
    citiesCovered: ['Markham', 'Vaughan', 'Richmond Hill', 'Aurora', 'Newmarket'],
    servicesHeading: 'What we do across York Region',
    servicesSubtext: (
      <>
        Whether it's a flat on the <span className="font-bold text-brand-dark">404</span>, a lockout at <span className="font-bold text-brand-dark">Vaughan Mills</span>, or a jump-start in a <span className="font-bold text-brand-dark">Markham</span> tech-park lot, our mobile team fixes it where you're stopped — no tow, no shop trip.
      </>
    ),
    bottomCtaHeading: 'Need roadside help in York Region?',
    bottomCtaText: (
      <>Live dispatch, 24/7. We route the closest unit through Markham, Vaughan, Richmond Hill, Aurora, and Newmarket — with a real ETA before you hang up.</>
    ),
    areaServed: ['Markham', 'Vaughan', 'Richmond Hill', 'Aurora', 'Newmarket'],
    geo: { latitude: 43.8561, longitude: -79.337 },
  },
};

export const REGION_SLUGS = Object.keys(REGION_CONTENT);
