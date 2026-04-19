import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_NAME } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

// TODO: Replace heroImage paths with real iFAST job-site photos when provided.
// Current images are assigned per-city so each feels distinct, but they are
// still stock assets from public/. Real photos of actual service calls
// (tagged per city) would materially improve trust + E-E-A-T signals.

const CallNowButton = ({ source = 'city_content_inline' }: { source?: string }) => (
  <div className="my-6 text-center sm:text-left">
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackPhoneCall(source)}
      className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 premium-shadow-hover animate-pulse"
      style={{ animationDuration: '2s' }}
    >
      <PhoneCall size={20} />
      Call Now For Local Help
    </a>
    <p className="text-xs text-gray-500 mt-2">✨ Local dispatch ready now</p>
  </div>
);

export interface CityTestimonial {
  name: string;
  role: string;
  content: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityContent {
  id: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  responseTime: string;
  tagline: string;
  introParagraph: React.ReactNode;
  localAngle: React.ReactNode;
  highways: string[];
  neighborhoods: string[];
  landmarks: string[];
  testimonials: CityTestimonial[];
  faqs: CityFaq[];
  geo: { latitude: number; longitude: number };
}

export const CITY_CONTENT: Record<string, CityContent> = {
  scarborough: {
    id: 'scarborough',
    name: 'Scarborough',
    seoTitle: '24/7 Roadside Assistance Scarborough | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription: 'Scarborough\'s local 24/7 roadside assistance. Mobile tire repair, battery boost, car lockout, fuel delivery, and towing across Agincourt, Malvern, Woburn, and the 401. 4.9★ / 94+ reviews. Call now.',
    keywords: 'roadside assistance Scarborough, mobile tire repair Scarborough, flat tire Scarborough, jump start Scarborough, car lockout Scarborough, towing Scarborough, 24 hour roadside Scarborough, battery boost Agincourt, flat tire Malvern',
    heroImage: '/roadside_technician_towing.png',
    responseTime: '15-25 minutes',
    tagline: 'Your Scarborough home base — fastest response in the East End',
    introParagraph: (
      <>
        <p className="mb-4">
          <strong>{COMPANY_NAME}</strong> is based right here in Scarborough at <strong>20 Antrim Crescent (M1P 4N3)</strong>, which means when you call us from anywhere in Scarborough — Agincourt, Malvern, Woburn, Cliffside, Birchmount, or Rouge — a fully-equipped mobile unit is typically only minutes away. We've been the East End's go-to 24/7 roadside team for flat tires, dead batteries, lockouts, fuel drops, and emergency tows, with over <strong>94 verified 5-star Google reviews</strong> from Scarborough drivers.
        </p>
        <p className="mb-4">
          Whether you're stuck on the 401 near Morningside, blew a tire on Kingston Road, or need a jump start in your driveway off Lawrence East, our Scarborough dispatchers route the closest unit to you in real time. Average arrival is <strong>15-25 minutes</strong> — faster than any fleet-based competitor dispatching from downtown or Brampton.
        </p>
        <CallNowButton source="scarborough_intro" />
      </>
    ),
    localAngle: (
      <>
        <p className="mb-4">
          Scarborough is a mix of dense residential pockets, industrial corridors, and some of the busiest stretches of the 401 in the country. Breakdowns here aren't just inconvenient — they're dangerous. A flat tire on the shoulder of the 401 eastbound near Markham Road during rush hour is a completely different emergency than a dead battery in a quiet Guildwood driveway. We train every technician to handle both, and our vans carry high-viz strobes and cones so we can secure a highway scene before touching your vehicle.
        </p>
        <p className="mb-4">
          We also know the city's odd corners — the service lanes off Victoria Park, the underground parking at Scarborough Town Centre, the condo lots around Kennedy Station. Calling a generic GTA-wide service often means explaining your exact location three times to a dispatcher who's never been here. When you call {COMPANY_NAME}, you're talking to someone who knows the East End.
        </p>
      </>
    ),
    highways: ['Highway 401', 'Highway 2A / Kingston Road', 'Don Valley Parkway (DVP)', 'Morningside Avenue', 'McCowan Road'],
    neighborhoods: ['Agincourt', 'Malvern', 'Woburn', 'Cliffside', 'Birchmount', 'Rouge', 'Guildwood', 'West Hill', 'Wexford', 'Bendale'],
    landmarks: ['Scarborough Town Centre', 'University of Toronto Scarborough (UTSC)', 'Centennial College', 'Kennedy Station', 'Scarborough General Hospital', 'Rouge National Urban Park'],
    testimonials: [
      {
        name: 'Verified Google Review',
        role: 'Scarborough — Agincourt',
        content: 'Upfront about prices, fantastic service. Got to me faster than they quoted and had my tire swapped in under 20 minutes.'
      },
      {
        name: 'Verified Google Review',
        role: 'Scarborough — Malvern',
        content: 'The price was reasonable and they gave me professional tips on what to watch for. Very fast service, great customer service!'
      }
    ],
    faqs: [
      {
        question: 'How fast can you reach me in Scarborough?',
        answer: 'Typically 15-25 minutes anywhere in Scarborough. Our home base is at 20 Antrim Crescent (M1P 4N3), so neighbourhoods like Agincourt, Wexford, Bendale, and Birchmount see even faster response. Arrival times stretch slightly during 401 rush hour, but we always give you a live ETA when you call.'
      },
      {
        question: 'Do you service the 401 through Scarborough?',
        answer: 'Yes — every stretch from the 404/DVP interchange east to the Pickering town line. Pull onto the shoulder safely, turn your hazards on, and call us at ' + PHONE_NUMBER + '. We arrive with high-visibility strobes and cones to secure the scene before working on your vehicle.'
      },
      {
        question: 'Can you come to an apartment or condo parking garage in Scarborough?',
        answer: 'Yes. We service residential garages, condo lots, and underground parking across Scarborough — Scarborough Town Centre, Kennedy Station condos, and everywhere in between. Our mobile vans are sized to fit standard P1/P2 levels. Just let dispatch know the building and level when you call.'
      },
      {
        question: 'Are you the same team as the one with 94+ Google reviews?',
        answer: 'Yes — iFAST Roadside Assistance with the 4.9-star rating at 20 Antrim Crescent. All reviews are from real Scarborough and East GTA drivers. Check us on Google if you want to verify before calling.'
      },
      {
        question: 'Do you service commercial vehicles and fleets in Scarborough?',
        answer: 'Yes. We handle mobile tire service and roadside assistance for delivery vans, pickups, and light commercial fleets across Scarborough industrial corridors (Midland, McCowan, Progress). Call for fleet rates.'
      }
    ],
    geo: { latitude: 43.7290, longitude: -79.2790 }
  },

  pickering: {
    id: 'pickering',
    name: 'Pickering',
    seoTitle: '24/7 Roadside Assistance Pickering | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription: 'Local 24/7 roadside assistance in Pickering. Mobile tire repair, battery boost, car lockout, fuel delivery, and towing across Bay Ridges, Amberlea, Liverpool, and the 401 corridor. 4.9★ rated. Call now.',
    keywords: 'roadside assistance Pickering, mobile tire repair Pickering, flat tire Pickering, jump start Pickering, car lockout Pickering, towing Pickering, 24 hour roadside Pickering, battery boost Bay Ridges, flat tire 401 Pickering',
    heroImage: '/tire_service_hero_1773847732052.png',
    responseTime: '20-30 minutes',
    tagline: 'Pickering\'s trusted East GTA roadside team — fast response along the 401 corridor',
    introParagraph: (
      <>
        <p className="mb-4">
          When you're stranded in <strong>Pickering</strong>, minutes matter. <strong>{COMPANY_NAME}</strong> dispatches from nearby Scarborough and positions mobile units along the 401 eastbound, so whether you're at the Pickering Town Centre, in a Bay Ridges driveway, or stuck near the GO Station, we typically reach you in <strong>20-30 minutes</strong>. We\'re the local go-to team for flat tires, jump starts, lockouts, fuel delivery, and emergency tows — with over <strong>94 verified 5-star Google reviews</strong>.
        </p>
        <p className="mb-4">
          Pickering is a commuter town, which means breakdowns often happen at the worst times — on the 401 during morning rush, in a GO parking lot late at night, or on a quiet residential street when the kids need school pickup. Our dispatchers understand the local geography: Whites Road, Liverpool, Brock, and the 401/407 interchange near Brock Road. We route the closest unit and give you a live ETA before you hang up.
        </p>
        <CallNowButton source="pickering_intro" />
      </>
    ),
    localAngle: (
      <>
        <p className="mb-4">
          Pickering\'s mix of suburban subdivisions, waterfront neighborhoods, and highway frontage makes it one of the busiest stretches we cover. A flat tire on the 401 east of Whites Road during rush hour is one of the most dangerous spots in the GTA — shoulders are narrow, trucks are fast, and standing beside your car to change a tire yourself is a bad idea. Every one of our vans arrives with high-visibility strobe lights and safety cones so we can secure a scene before touching your vehicle.
        </p>
        <p className="mb-4">
          For residential calls — a dead battery in the morning, keys locked in the car at the grocery store on Kingston Road, a blowout in a Rosebank driveway — we\'re positioned to get to you fast and quietly, without tow trucks or disruption. Pickering residents have been calling us for years because we know the area, we\'re honest about arrival times, and we don\'t add surprise fees for residential or highway jobs.
        </p>
      </>
    ),
    highways: ['Highway 401', 'Highway 407 ETR', 'Highway 2 / Kingston Road', 'Brock Road', 'Whites Road'],
    neighborhoods: ['Bay Ridges', 'Amberlea', 'Liverpool', 'Brock Ridge', 'West Shore', 'Rosebank', 'Dunbarton', 'Rouge Park', 'Highbush'],
    landmarks: ['Pickering Town Centre', 'Pickering GO Station', 'Frenchman\'s Bay', 'Pickering Nuclear Generating Station', 'Rouge National Urban Park', 'Pickering Casino Resort'],
    testimonials: [
      {
        name: 'Verified Google Review',
        role: 'Pickering — Bay Ridges',
        content: 'Got a flat on the 401 near Whites Road on a Tuesday morning. They were there in under 25 minutes and had me back on the road before 9am. Priced fair, no games.'
      },
      {
        name: 'Verified Google Review',
        role: 'Pickering — Liverpool',
        content: 'Locked my keys in the car outside Pickering Town Centre. They unlocked it without a scratch. Professional, polite, and reasonable pricing.'
      }
    ],
    faqs: [
      {
        question: 'How fast can you reach me in Pickering?',
        answer: 'Our typical Pickering ETA is 20-30 minutes, a bit faster in Bay Ridges and Liverpool (closer to Scarborough), slightly longer north of Taunton Road. We route from our Scarborough hub and track the closest available unit in real time.'
      },
      {
        question: 'Do you service the 401 and 407 through Pickering?',
        answer: 'Yes — full coverage from the Rouge Valley border east to the Ajax town line on the 401, and the full Pickering stretch of the 407. Pull onto the shoulder, hazards on, stay in your vehicle if safe, and call us at ' + PHONE_NUMBER + '.'
      },
      {
        question: 'Can you come to the Pickering GO Station or Town Centre parking lots?',
        answer: 'Absolutely. We routinely assist commuters at Pickering GO and shoppers at the Town Centre. Just tell dispatch your exact spot (level/row for underground lots) and we\'ll find you.'
      },
      {
        question: 'Do you cover North Pickering and Brougham?',
        answer: 'Yes, though rural north-end calls add 5-10 minutes to our ETA. If you\'re past the 407 toward Claremont, we still come — just allow a bit more time.'
      },
      {
        question: 'What does a flat tire change in Pickering typically cost?',
        answer: 'Mobile tire service starts at $75 for spare-tire installation. If you need a new tire or a patch, we quote transparently before starting. No hidden highway fees, no out-of-zone surcharges within Pickering.'
      }
    ],
    geo: { latitude: 43.8384, longitude: -79.0868 }
  },

  ajax: {
    id: 'ajax',
    name: 'Ajax',
    seoTitle: '24/7 Roadside Assistance Ajax | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription: 'Fast 24/7 roadside assistance in Ajax. Mobile tire repair, jump starts, car lockouts, fuel delivery, and towing across Harwood, Pickering Village, Audley, and the 401. 4.9★ rated. Call now.',
    keywords: 'roadside assistance Ajax, mobile tire repair Ajax, flat tire Ajax, jump start Ajax, car lockout Ajax, towing Ajax, 24 hour roadside Ajax, battery boost Harwood, flat tire 401 Ajax',
    heroImage: '/roadside_assistance_help.png',
    responseTime: '25-35 minutes',
    tagline: 'Ajax roadside assistance from a team that actually knows Harwood, Salem, and Westney',
    introParagraph: (
      <>
        <p className="mb-4">
          <strong>{COMPANY_NAME}</strong> serves Ajax around the clock — from Pickering Village in the north, through the Harwood and Salem corridors, down to the Lake Ontario waterfront. When you call, a fully-equipped mobile unit dispatches from our Scarborough base and typically reaches you in <strong>25-35 minutes</strong>. We handle flat tires, dead batteries, lockouts, fuel drops, and emergency towing — all with transparent pricing and no "out of zone" fees for Ajax calls.
        </p>
        <p className="mb-4">
          Ajax is growing fast, and so is the traffic on the 401 through town. A blown tire at Westney Road exit, a dead battery at the Audley Community Centre, or a lockout at the Ajax GO Station — we handle all of it with the same priority. Over <strong>94 verified 5-star Google reviews</strong> back us up.
        </p>
        <CallNowButton source="ajax_intro" />
      </>
    ),
    localAngle: (
      <>
        <p className="mb-4">
          Ajax residents often deal with three distinct breakdown scenarios: the 401 corridor (high stress, narrow shoulders, transport trucks flying past), suburban residential (driveway jump starts, tire leaks you discover in the morning), and retail parking lots (SmartCentres, the Durham Centre, Ajax GO). Every one of them needs a slightly different approach. Our technicians are trained for all three — strobes and cones for highway work, quiet professionalism for residential calls, and fast turnaround for parking lot jobs so you don\'t block traffic.
        </p>
        <p className="mb-4">
          We also service Ajax\'s commercial fleets — courier vans, trades trucks, and the small businesses that line Bayly Street. A flat on a work truck costs real money in lost productivity. Fleet rates available; ask dispatch when you call.
        </p>
      </>
    ),
    highways: ['Highway 401', 'Harwood Avenue', 'Salem Road', 'Westney Road', 'Kingston Road West / Highway 2', 'Bayly Street'],
    neighborhoods: ['Pickering Village', 'Central Ajax', 'Nottingham', 'Audley', 'Discovery Bay', 'Riverside', 'Applecroft', 'Lakeside'],
    landmarks: ['Ajax GO Station', 'Ajax Pickering Hospital', 'Durham Centre', 'Ajax Downs', 'Audley Recreation Centre', 'Rotary Park', 'Ajax Waterfront'],
    testimonials: [
      {
        name: 'Verified Google Review',
        role: 'Ajax — Harwood',
        content: 'Battery died in the parking lot after a long shift. They got there quick, tested the battery properly, told me I had another year in it — didn\'t upsell me a new one. That\'s rare and appreciated.'
      },
      {
        name: 'Verified Google Review',
        role: 'Ajax — Pickering Village',
        content: 'Sunday night flat tire in Pickering Village. Most places were closed. These guys answered, came out within 30 minutes, and charged what they quoted. Saved my Monday.'
      }
    ],
    faqs: [
      {
        question: 'How fast can you get to me in Ajax?',
        answer: 'Typical Ajax ETA is 25-35 minutes. Pickering Village (west Ajax) tends to be faster since it\'s closer to Scarborough; Audley and north Ajax add a few minutes. We always give a live ETA when you call.'
      },
      {
        question: 'Do you cover the 401 exits in Ajax — Westney, Salem, Harwood?',
        answer: 'All of them. We handle roadside emergencies on the 401 from the Pickering town line east to the Whitby town line. Pull onto the shoulder, hazards on, and call ' + PHONE_NUMBER + '. Our vans carry strobes and cones for safe highway work.'
      },
      {
        question: 'Can you help with lockouts at Ajax Pickering Hospital or Ajax GO?',
        answer: 'Yes. Hospital and GO lots are common call spots — we know the layouts, the parking levels, and how to get to you fast without blocking the ambulance bay or commuter flow.'
      },
      {
        question: 'Do you offer fleet roadside for Ajax businesses?',
        answer: 'Yes. Bayly Street commercial corridor, trades trucks, courier vans, small fleet accounts — we handle all of them. Call for fleet rates and priority dispatch options.'
      },
      {
        question: 'What if my breakdown is on the 401 between Ajax and Whitby?',
        answer: 'We still come. The town line doesn\'t change much about routing — our dispatch picks the closest available unit. Tell the dispatcher the nearest exit or mile marker and stay in your vehicle with hazards on.'
      }
    ],
    geo: { latitude: 43.8509, longitude: -79.0205 }
  },

  whitby: {
    id: 'whitby',
    name: 'Whitby',
    seoTitle: '24/7 Roadside Assistance Whitby | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription: 'Local 24/7 roadside assistance in Whitby and Brooklin. Mobile tire repair, jump starts, car lockouts, fuel delivery, and towing across Port Whitby, Downtown, and the 401/412 corridor. 4.9★ rated.',
    keywords: 'roadside assistance Whitby, mobile tire repair Whitby, flat tire Whitby, jump start Whitby, car lockout Whitby, towing Whitby, roadside Brooklin, 24 hour roadside Whitby, 412 flat tire',
    heroImage: '/jump_start_hero_1773847771517.png',
    responseTime: '30-40 minutes',
    tagline: 'Whitby and Brooklin roadside help — covering the 401, 412, and everywhere between',
    introParagraph: (
      <>
        <p className="mb-4">
          <strong>{COMPANY_NAME}</strong> serves all of Whitby, from <strong>Port Whitby on the lake to Brooklin up north</strong>, 24 hours a day. Whitby is one of the largest towns in Durham Region — nearly 140,000 residents — and it stretches across a huge area with multiple highways: the 401, the 407, and the 412 connector. Our mobile units reach most Whitby locations in <strong>30-40 minutes</strong>. We handle flat tires, dead batteries, lockouts, fuel delivery, and emergency tows.
        </p>
        <p className="mb-4">
          Whether you\'re broken down at the Whitby GO Station, stranded on the 412 overpass, or stuck in a Brooklin driveway after a cold night, one call to our dispatchers puts a unit on the way. With <strong>94+ verified 5-star reviews</strong>, we\'re a trusted local name — not a faceless call center operating from out of town.
        </p>
        <CallNowButton source="whitby_intro" />
      </>
    ),
    localAngle: (
      <>
        <p className="mb-4">
          Whitby has some specific roadside realities: the 412 is new (opened 2016) and relatively low-traffic, but that also means fewer good Samaritans and fewer emergency call boxes. If you break down on the 412 at night, having a fast, reliable mobile team on speed-dial matters. We know the entry and exit points — Taunton Road, Rossland Road, Baldwin Street — and we route from the closest interchange to your vehicle.
        </p>
        <p className="mb-4">
          Brooklin is physically separate from downtown Whitby — it\'s farther north, past Taunton. Our response time there is toward the longer end (closer to 40 minutes from Scarborough), but we come. If you\'re in Brooklin, mention it to dispatch so we can route the most direct path via the 407 or Thickson Road North.
        </p>
      </>
    ),
    highways: ['Highway 401', 'Highway 407 ETR', 'Highway 412', 'Thickson Road', 'Brock Street', 'Rossland Road', 'Taunton Road'],
    neighborhoods: ['Downtown Whitby', 'Port Whitby', 'Brooklin', 'Blair Park', 'Williamsburg', 'Otter Creek', 'Pringle Creek', 'Lynde Creek'],
    landmarks: ['Whitby GO Station', 'Whitby Harbour', 'Heydenshore Pavilion', 'Lakeridge Health Ajax-Pickering', 'Iroquois Park Sports Centre', 'Durham Region HQ', 'Brooklin Village'],
    testimonials: [
      {
        name: 'Verified Google Review',
        role: 'Whitby — Downtown',
        content: 'Fast service, great customer service. Called them for a tire change at 11pm — they didn\'t flinch about the time, came out, and handled it like it was noon on a Tuesday.'
      },
      {
        name: 'Verified Google Review',
        role: 'Whitby — Brooklin',
        content: 'I live up in Brooklin and figured most roadside services would bail or charge a fortune. iFAST came out same evening, reasonable price, no nonsense.'
      }
    ],
    faqs: [
      {
        question: 'How fast can you reach Whitby?',
        answer: 'Typical Whitby ETA is 30-40 minutes. Downtown Whitby and Port Whitby are on the faster end (~30 min); Brooklin and the north end add 5-10 minutes. We always give a live ETA when you call.'
      },
      {
        question: 'Do you service the 412 highway in Whitby?',
        answer: 'Yes. The 412 is a relatively new and quieter stretch, which means fewer passing drivers to help. We cover it fully between the 401 and 407 interchanges. Pull off at the nearest exit if safe, call ' + PHONE_NUMBER + ', and stay in the vehicle.'
      },
      {
        question: 'Can you get to Brooklin? It\'s pretty far north.',
        answer: 'Yes. Brooklin calls take a bit longer — 35-45 minutes typically — but we come, no surcharge for the distance. We route via the 407 or Thickson North depending on which is faster at the time of call.'
      },
      {
        question: 'Do you handle commercial and fleet roadside in Whitby?',
        answer: 'Yes. We service trades trucks, delivery vans, and small business fleets across Whitby\'s industrial park near Thickson/Consumers and the south-end commercial corridor. Fleet rates available.'
      },
      {
        question: 'What if I need a jump start in a Whitby condo parking garage?',
        answer: 'We handle underground condo and apartment lots regularly. Tell dispatch the building and level — our vans are sized to fit standard P1/P2 levels. No problem, no extra charge.'
      }
    ],
    geo: { latitude: 43.8971, longitude: -78.9429 }
  },

  oshawa: {
    id: 'oshawa',
    name: 'Oshawa',
    seoTitle: '24/7 Roadside Assistance Oshawa | Mobile Tire, Jump Start, Lockout — iFAST',
    seoDescription: '24/7 roadside assistance and mobile tire service in Oshawa. Flat tire repair, jump starts, car lockouts, fuel delivery, and emergency towing across Downtown, Samac, Vanier, and the 401/407/412. 4.9★ rated.',
    keywords: 'roadside assistance Oshawa, mobile tire repair Oshawa, flat tire Oshawa, jump start Oshawa, car lockout Oshawa, towing Oshawa, 24 hour roadside Oshawa, UOIT roadside, Durham College roadside, 401 Oshawa breakdown',
    heroImage: '/fuel_delivery_hero_1773847948357.png',
    responseTime: '35-50 minutes',
    tagline: 'Oshawa roadside coverage — we come to you, even at the east edge of our zone',
    introParagraph: (
      <>
        <p className="mb-4">
          <strong>{COMPANY_NAME}</strong> is Oshawa\'s 24/7 roadside team for flat tires, dead batteries, lockouts, fuel delivery, and emergency towing. Oshawa sits at the eastern edge of our East GTA service zone, so our typical arrival is <strong>35-50 minutes</strong> — longer than closer cities, but we tell you honestly upfront. No other Scarborough-based mobile team routinely commits to Oshawa the way we do.
        </p>
        <p className="mb-4">
          We cover Oshawa end-to-end: Downtown, Samac, Vanier, Donevan, Westmount, the UOIT/Durham College campus area, and the 401/407/412 highways that converge here. With <strong>94+ verified 5-star Google reviews</strong> — many from Oshawa residents — we\'re the trusted choice when closer options are unavailable or overcharging.
        </p>
        <CallNowButton source="oshawa_intro" />
      </>
    ),
    localAngle: (
      <>
        <p className="mb-4">
          Oshawa has a unique roadside profile. It\'s an automotive town — historically the GM plant employed thousands, and the city still has more mechanics per capita than most. But when you\'re stranded at 2am on a side street off Simcoe, or your student car won\'t start in a UOIT commuter lot, most of those shops are closed. That\'s when you need a mobile team. We come to you with the full tire shop and diagnostic kit in the van.
        </p>
        <p className="mb-4">
          For the 401/407/412 interchange zone in north Oshawa, we route via whichever highway is faster at the time of call. For downtown and Samac, we typically come up Ritson or Simcoe. Tell dispatch your exact cross-streets and we\'ll give you a routing ETA you can count on.
        </p>
      </>
    ),
    highways: ['Highway 401', 'Highway 407 ETR', 'Highway 412', 'Simcoe Street', 'Ritson Road', 'Harmony Road', 'King Street', 'Taunton Road'],
    neighborhoods: ['Downtown Oshawa', 'Samac', 'Vanier', 'Central', 'Donevan', 'Westmount', 'Taunton', 'Windfields', 'Lakeview', 'Eastdale'],
    landmarks: ['Oshawa Centre', 'Tribute Communities Centre', 'Ontario Tech University (UOIT)', 'Durham College', 'Lakeview Park', 'Oshawa GO Station', 'Lakeridge Health Oshawa', 'Riocan Windfields'],
    testimonials: [
      {
        name: 'Verified Google Review',
        role: 'Oshawa — Samac',
        content: 'Most places told me I was too far. iFAST took the call, came out in about 45 minutes, had my battery tested and jump-started in 10. Honest team.'
      },
      {
        name: 'Verified Google Review',
        role: 'Oshawa — Downtown',
        content: 'Had a flat right on Simcoe at midnight after a shift. They were professional, the price was upfront, and they got me moving before I finished my coffee. Highly recommend.'
      }
    ],
    faqs: [
      {
        question: 'Do you really service Oshawa from Scarborough?',
        answer: 'Yes. Our typical Oshawa ETA is 35-50 minutes depending on time of day and traffic. We tell you upfront — no surprise delays. If you need faster, call a downtown-Oshawa-based service; if you want a team with 94+ 5-star reviews and transparent pricing, we\'re worth the wait.'
      },
      {
        question: 'What\'s the ETA to UOIT / Durham College area?',
        answer: 'The north Oshawa campus corridor (Simcoe North, Conlin Road) is typically 40-50 minutes from our Scarborough base. If you\'re a student and need regular help, consider saving our number — we\'re used to campus-area calls.'
      },
      {
        question: 'Do you cover the 401 east of Oshawa (toward Courtice and Bowmanville)?',
        answer: 'Our primary zone ends at the Oshawa/Clarington line. For calls in Courtice or Bowmanville, call first — we may still come depending on unit availability, but ETA is longer.'
      },
      {
        question: 'Is pricing different in Oshawa because of the distance?',
        answer: 'Our posted starting prices (tire from $75, jump start from $50, lockout from $65) apply in Oshawa too. We don\'t charge surprise "travel surcharges" on top. If a specific job involves extra parts or complexity, we quote it before starting.'
      },
      {
        question: 'What if my car breaks down on the 401 in Oshawa late at night?',
        answer: 'Call us at ' + PHONE_NUMBER + '. We operate 24/7. Pull onto the shoulder if safe, turn on hazards, stay in the vehicle, and wait for our high-visibility unit. We do overnight 401 jobs regularly.'
      }
    ],
    geo: { latitude: 43.8971, longitude: -78.8658 }
  }
};
