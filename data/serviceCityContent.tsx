import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_NAME, GOOGLE_REVIEWS_COUNT } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const InlineCall = ({ source }: { source: string }) => (
  <div className="my-6 text-center sm:text-left">
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackPhoneCall(source)}
      className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 premium-shadow-hover animate-pulse"
      style={{ animationDuration: '2s' }}
    >
      <PhoneCall size={20} />
      Call Local Dispatch
    </a>
  </div>
);

export interface ServiceCityFaq {
  question: string;
  answer: string;
}

export interface ServiceCityContent {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  h1: string;
  intro: React.ReactNode;
  localScenario: React.ReactNode;
  uniqueAngle: React.ReactNode;
  priceNote: string;
  faqs: ServiceCityFaq[];
}

type ServiceId = 'mobile-mechanic' | 'tire-change' | 'jump-start' | 'lockout' | 'fuel' | 'towing';
type CityId = 'scarborough' | 'pickering' | 'ajax' | 'whitby' | 'oshawa' | 'north-york';

export const SERVICE_CITY_CONTENT: Record<ServiceId, Record<CityId, ServiceCityContent>> = {
  /* =========================================================================
     MOBILE MECHANIC
     ========================================================================= */
  'mobile-mechanic': {
    'north-york': {
      seoTitle: 'Mobile Mechanic North York | Car Repair At Your Home — iFAST',
      seoDescription: 'Mobile mechanic in North York — diagnostics, brakes, batteries, and pre-purchase inspections at your home, office, or condo garage. Willowdale, Don Mills, Downsview.',
      keywords: 'mobile mechanic North York, car repair at home North York, mobile car repair Willowdale, mechanic comes to you North York, mobile diagnostics Don Mills, pre purchase inspection North York, mobile brake repair Downsview',
      h1: 'Mobile Mechanic in North York — Repairs At Your Home or Office',
      intro: (
        <>
          <p className="mb-4">
            Most repairs that keep a car off the road do not actually need a hoist. Diagnostics, batteries, starters, alternators, brakes, belts, sensors, and pre-purchase inspections can all be done properly where the car is parked. <strong>{COMPANY_NAME}</strong> brings the tools and the diagnostic scanner to your driveway in Willowdale, your office lot at North York Centre, or your condo garage on the Yonge corridor — no drop-off, no shuttle, no day off work.
          </p>
          <p className="mb-4">
            We run a unit stationed in North York, so scheduled work usually fits the same or next day and roadside diagnostics arrive in <strong>20-35 minutes</strong>. You get told what is actually wrong, what it will cost, and — importantly — whether it is something we can do on-site or something that genuinely needs a shop. <strong>Call {PHONE_NUMBER}.</strong>
          </p>
          <InlineCall source="service_city_mobile-mechanic_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The North York job that comes up more than any other is the pre-purchase inspection. This district has a dense private-sale market, and the pattern is always the same: a buyer meets a seller in a plaza lot off Sheppard or Finch, has forty minutes, and no way to get the car onto a hoist before handing over several thousand dollars. We meet you there, scan the computer for stored and pending fault codes, check the frame and underbody for accident repair, test the battery and charging system, and give you a straight read on whether to walk away. That inspection routinely saves people more than a year of repair bills.
          </p>
          <p className="mb-4">
            The second pattern is condo residents with no driveway. If you live between Sheppard and Finch on Yonge, you have nowhere to leave a car for a mechanic and no way to be in two places while it is in a shop. We work in the parking spot. Our vans clear standard residential garage heights, so brake jobs, battery and starter replacement, and diagnostics happen on P2 while you are upstairs. Tell dispatch the building and level so we can confirm clearance first.
          </p>
          <p className="mb-4">
            The rest is ordinary daily work across Don Mills, Bayview Village, York Mills, Lawrence Manor, Bathurst Manor, and Downsview: a check-engine light that needs reading before it becomes expensive, brakes that started grinding on the DVP, a car that cranks but will not catch in an office lot at 6pm.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            The value of a mobile mechanic is not only convenience — it is that you are standing there. When we pull a code or show you a worn pad, you see the actual part on your actual car, and you decide with the information in front of you rather than over the phone from a service advisor you have never met. Nothing gets done that you have not agreed to first.
          </p>
          <p className="mb-4">
            We are also clear about our limits, which is the part that matters most. Engine internals, transmission work, exhaust welding, and anything needing a hoist or alignment rack belong in a shop, and we will tell you that instead of starting a job we cannot finish in a parking garage. {COMPANY_NAME} is owner-operated — <strong>Safi</strong> answers the phone, does the diagnosis, and does the repair, so nothing is lost between the person who quoted you and the person holding the wrench.
          </p>
        </>
      ),
      priceNote: 'Diagnostics and pre-purchase inspections are quoted as a flat fee on the call. Repairs are quoted after diagnosis and before any work starts — parts and labour separated so you can see what you are paying for. No "out of zone" charge for North York. If the honest answer is that the job needs a shop, we tell you and you pay for the diagnosis, not for a repair we could not complete.',
      faqs: [
        {
          question: 'What repairs can you actually do on-site in North York?',
          answer: 'Computer diagnostics and fault-code reading, battery and alternator and starter replacement, brake pads and rotors, belts and hoses, sensors, filters, fluid top-ups and changes, tire work, and full pre-purchase inspections. What we cannot do on-site is anything needing a hoist or an alignment rack — engine internals, transmission work, exhaust welding, suspension geometry. We will tell you which category your problem is in before dispatching.'
        },
        {
          question: 'Can you do a pre-purchase inspection on a private sale?',
          answer: 'Yes, and it is one of our most requested North York jobs. We meet you and the seller wherever the car is, usually within the window you have arranged. We scan for stored and pending codes, check the underbody and frame for accident repair and rust, test the battery and charging system, check brakes and tires, and give you a plain verdict. Bring us in before money changes hands — the inspection costs a fraction of what a bad private-sale car costs.'
        },
        {
          question: 'Can you work on my car in a condo parking garage?',
          answer: 'Yes. Our vans clear standard residential garage heights on P1 through P4 in most Yonge corridor buildings, which is what makes this practical for condo residents who have nowhere else to leave a car. Give dispatch the building address and parking level when you book so we can confirm clearance. Some buildings restrict maintenance work in the garage, so it is worth a quick check with your property manager for anything beyond a battery or a diagnostic.'
        },
        {
          question: 'Is a mobile mechanic more expensive than a shop?',
          answer: 'Generally no, and often less. We carry no bay rent or service-advisor overhead, and you save the hidden costs a shop visit adds — a day off work, a rental, or a tow to get the car there in the first place. Where a shop wins is on jobs needing a hoist, which is exactly why we tell you when your job is one of those rather than quoting you for something we should not be doing in a driveway.'
        },
        {
          question: 'Do you need power or a specific kind of space?',
          answer: 'No. The van is self-sufficient — our own power, lighting, and tools. We need a reasonably level parking spot with enough room to open the doors and work at the wheels. A driveway, an office lot, a condo parking space, or a plaza lot all work. We do not work on a live traffic lane; if the car is somewhere unsafe we will move it or tow it to somewhere it can be worked on properly.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Mobile Mechanic Scarborough | 24/7 On-Site Auto Repair — iFAST Roadside',
      seoDescription: 'Need a mechanic in Scarborough? iFAST provides 24/7 mobile mechanic services across Agincourt, Malvern, and the 401. Expert diagnostics and on-site repair. 20-30 min arrival. Call now.',
      keywords: 'mobile mechanic Scarborough, on-site car repair Scarborough, emergency mechanic Scarborough, mobile auto repair Agincourt, car won\'t start Scarborough',
      h1: 'Mobile Mechanic in Scarborough — 24/7 On-Site Auto Repair',
      intro: (
        <>
          <p className="mb-4">
            Stuck in your driveway in Agincourt or broken down near the STC? <strong>{COMPANY_NAME}</strong> dispatches expert mobile mechanics directly from our Scarborough base at 20 Antrim Crescent. We typically reach any Scarborough location in <strong>15-25 minutes</strong>, equipped with advanced diagnostic tools to solve your automotive issues on the spot.
          </p>
          <p className="mb-4">
            Whether it's a failed starter, a snapped belt, or a mysterious electrical issue, our Scarborough-based mechanics handle it all without the need for an expensive tow. We bring the shop to you, anywhere in Scarborough.
          </p>
          <InlineCall source="sc_mechanic_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Scarborough's stop-and-go traffic on Kennedy and Markham Road is brutal on cooling systems and brakes. We often handle emergency radiator hose repairs and brake service for commuters who can't afford to wait for a traditional shop.
          </p>
          <p className="mb-4">
            If you're in a residential pocket like Guildwood or Rouge, we'll perform the diagnosis and repair right in your driveway, keeping you out of the elements while we work.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Being based in Scarborough, our response times for mechanical diagnostics are the fastest in the city. We often have a technician available to start your repair while others are still on the phone with a tow truck.
        </p>
      ),
      priceNote: 'Scarborough mobile mechanic calls start at a flat local diagnostic rate. Parts and labor are quoted after the initial inspection.',
      faqs: [
        {
          question: 'Can you fix my car on-site in Scarborough?',
          answer: 'Yes! We handle starters, alternators, brakes, batteries, sensors, and belt repairs right where you are. If it\'s a major engine or transmission job, we\'ll diagnose it and help arrange a tow to a trusted local shop.'
        },
        {
          question: 'How fast can a mechanic reach me in Agincourt?',
          answer: 'Since we are based right near Agincourt, our ETAs are typically 15-20 minutes. We are the fastest mobile mechanic option in North Scarborough.'
        },
        {
          question: 'Do you work in Scarborough condo parking garages?',
          answer: 'Yes. Our mobile units are designed to navigate low-clearance garages, and our mechanics are experienced in working in tight parking stalls.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Mobile Mechanic Pickering | 24/7 On-Site Car Repair — iFAST Roadside',
      seoDescription: 'Expert mobile mechanic in Pickering. 24/7 emergency auto repair, diagnostics, and on-site service across Bay Ridges, Amberlea, and Liverpool. 20-30 min arrival. Call now.',
      keywords: 'mobile mechanic Pickering, on-site car repair Pickering, emergency mechanic Pickering, mobile auto repair Bay Ridges, car won\'t start Pickering',
      h1: 'Mobile Mechanic in Pickering — 24/7 Emergency Auto Repair',
      intro: (
        <>
          <p className="mb-4">
            Mechanical failure in Pickering? <strong>{COMPANY_NAME}</strong> provides 24/7 mobile mechanic services across Bay Ridges, Amberlea, Liverpool, and the 401 corridor. Our technicians typically arrive in <strong>20-30 minutes</strong>, ready to diagnose and repair your vehicle on-site.
          </p>
          <p className="mb-4">
            Skip the tow truck and the long wait at the dealership. Our Pickering mobile mechanics handle everything from brake repairs to sensor replacements directly in your driveway or workplace parking lot.
          </p>
          <InlineCall source="pk_mechanic_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering commuters often face no-start issues at the GO station or in their driveways before work. We prioritize these "commuter emergencies" to get you back on schedule as fast as possible.
          </p>
          <p className="mb-4">
            Whether you're at Pickering Town Centre or home in Dunbarton, we bring professional-grade tools to solve your car troubles without the hassle of a shop visit.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We offer specialized early-morning diagnostic dispatches in Pickering for residents who discover a mechanical issue right as they're leaving for their morning commute.
        </p>
      ),
      priceNote: 'Standard East GTA rates apply for all Pickering mobile mechanic calls. No hidden distance fees.',
      faqs: [
        {
          question: 'What is your typical arrival time in Pickering?',
          answer: 'We usually reach Pickering locations in 20-30 minutes. During rush hour, we utilize our knowledge of local backroads to maintain fast ETAs.'
        },
        {
          question: 'Can you replace a starter on-site in Pickering?',
          answer: 'Yes, starter and alternator replacements are common on-site repairs we handle in Pickering driveways and parking lots.'
        },
        {
          question: 'Do you offer 24/7 service in Pickering?',
          answer: 'Yes, our mobile mechanics are on standby 24/7 for emergency diagnostics and repairs across Pickering.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Mobile Mechanic Ajax | 24/7 Emergency Auto Repair — iFAST Roadside',
      seoDescription: 'Need a mechanic in Ajax? iFAST offers 24/7 mobile mechanic services across Harwood, Salem, and Pickering Village. On-site diagnostics and repair. 25-35 min arrival.',
      keywords: 'mobile mechanic Ajax, on-site car repair Ajax, emergency mechanic Ajax, mobile auto repair Harwood, car diagnostics Ajax',
      h1: 'Mobile Mechanic in Ajax — On-Site Car Repair & Diagnostics',
      intro: (
        <>
          <p className="mb-4">
            Don't let a mechanical breakdown stop you in Ajax. <strong>{COMPANY_NAME}</strong> dispatches certified mobile mechanics to Harwood, Salem, Pickering Village, and Audley with a <strong>25-35 minute</strong> ETA. We perform full engine diagnostics and on-site repairs 24/7.
          </p>
          <p className="mb-4">
            Our Ajax mobile mechanics are equipped to handle electrical troubleshooting, brake service, and cooling system repairs right where you are. We save you time, money, and the stress of a tow.
          </p>
          <InlineCall source="aj_mechanic_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Ajax subdivisions are perfect for on-site repairs. We often work in driveways throughout north Ajax, providing a cleaner and more convenient alternative to traditional shop visits.
          </p>
          <p className="mb-4">
            If your car fails at the Ajax GO or near Ajax Downs, we'll meet you at the parking spot and begin the diagnosis immediately.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We specialize in "driveway diagnostics" for Ajax residents, providing a dealership-level scan and expert advice without the dealership price tag or wait time.
        </p>
      ),
      priceNote: 'Ajax is within our core East GTA service zone. Diagnostic fees are flat-rate across all Ajax neighborhoods.',
      faqs: [
        {
          question: 'Can you fix a coolant leak on-site in Ajax?',
          answer: 'Yes, we can pressure test your cooling system and replace hoses or radiators on-site in most Ajax locations.'
        },
        {
          question: 'How do I book a mobile mechanic in Ajax?',
          answer: 'Just call our dispatch line. We\'ll get your location and vehicle details and have a mechanic on the way in minutes.'
        },
        {
          question: 'Are your mechanics licensed for work in Ajax?',
          answer: 'Yes, all our technicians are fully certified and insured for mobile automotive repair in Ajax and the surrounding areas.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Mobile Mechanic Whitby & Brooklin | 24/7 Auto Repair — iFAST Roadside',
      seoDescription: 'Expert mobile mechanic serving Whitby and Brooklin. 24/7 on-site car repair, diagnostics, and emergency service. 30-40 min arrival. Call now.',
      keywords: 'mobile mechanic Whitby, on-site car repair Whitby, emergency mechanic Brooklin, mobile auto repair Whitby, car won\'t start Brooklin',
      h1: 'Mobile Mechanic in Whitby — On-Site Repair for Whitby & Brooklin',
      intro: (
        <>
          <p className="mb-4">
            Mechanical trouble in Whitby or Brooklin? <strong>{COMPANY_NAME}</strong> brings 24/7 mobile mechanic services to your door. From Port Whitby to the residential streets of Brooklin, our mechanics provide expert diagnostics and on-site repairs with a <strong>30-40 minute</strong> ETA.
          </p>
          <p className="mb-4">
            We handle the "no-start" issues, the strange noises, and the warning lights that traditional shops make you wait days for. Our Whitby mobile mechanics get you back on the road fast.
          </p>
          <InlineCall source="wh_mechanic_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Whitby's diverse geography—from the lake to the 407—requires a versatile mobile team. We often handle emergency belt and battery issues for drivers stuck on the 412 or 407.
          </p>
          <p className="mb-4">
            Brooklin residents love the convenience of our driveway service, avoiding the trek south to find a reliable mechanic shop.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We are one of the few mobile mechanic services that regularly services Brooklin with the same 24/7 availability as downtown Whitby.
        </p>
      ),
      priceNote: 'Standard flat-rate diagnostic fees apply to all Whitby and Brooklin mobile mechanic calls.',
      faqs: [
        {
          question: 'Do you service Brooklin for mechanical repairs?',
          answer: 'Yes! Brooklin is a core part of our Whitby service area. We offer 24/7 mobile mechanic support there.'
        },
        {
          question: 'Can you diagnose a check engine light on-site in Whitby?',
          answer: 'Absolutely. We use professional-grade scanners to read codes and perform live data analysis to find the exact cause of the light.'
        },
        {
          question: 'What if my car needs a part you don\'t have?',
          answer: 'We have accounts with all major parts suppliers in the East GTA and can typically source and deliver the required part to your location the same day.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Mobile Mechanic Oshawa | 24/7 Emergency On-Site Repair — iFAST Roadside',
      seoDescription: 'Reliable mobile mechanic in Oshawa. 24/7 on-site auto repair, diagnostics, and emergency service across Downtown, Samac, and UOIT. 35-50 min arrival. Call now.',
      keywords: 'mobile mechanic Oshawa, on-site car repair Oshawa, emergency mechanic Oshawa, mobile auto repair UOIT, Durham College mechanic',
      h1: 'Mobile Mechanic in Oshawa — 24/7 Honest-ETA Auto Repair',
      intro: (
        <>
          <p className="mb-4">
            Stuck in Oshawa with a mechanical failure? <strong>{COMPANY_NAME}</strong> dispatches certified mobile mechanics from our Scarborough base with an honest <strong>35-50 minute</strong> ETA. We provide expert diagnostics and on-site repairs for all vehicle makes and models in Oshawa 24/7.
          </p>
          <p className="mb-4">
            Whether you're a student at UOIT or a commuter in Vanier, our Oshawa mobile mechanics bring the tools and expertise to fix your car without the need for a tow.
          </p>
          <InlineCall source="os_mechanic_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Oshawa's large student population often deals with older vehicles that need frequent attention. We provide affordable, on-site maintenance and emergency repairs right at student residences.
          </p>
          <p className="mb-4">
            If you're broken down near the GM plant or at the Oshawa Centre, our mechanics will meet you and provide a clear, honest diagnosis of the issue.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We pride ourselves on providing Oshawa residents with the most transparent and reliable mobile mechanic service, featuring up-front pricing and honest arrival times.
        </p>
      ),
      priceNote: 'Oshawa calls have a small distance adjustment on the diagnostic fee, which is always quoted upfront.',
      faqs: [
        {
          question: 'Is it worth calling a mobile mechanic in Oshawa?',
          answer: 'Absolutely. You save the cost of a tow and get an immediate diagnosis. For many common issues, we\'ll have you running again in the time it would take just to get a tow truck to arrive.'
        },
        {
          question: 'Can you work on my car at UOIT / Durham College?',
          answer: 'Yes, we frequently service student vehicles on-site at UOIT and Durham College residences.'
        },
        {
          question: 'Do you handle emergency brake repairs in Oshawa?',
          answer: 'Yes, we can replace brake pads, rotors, and lines on-site anywhere in Oshawa 24/7.'
        }
      ]
    }
  },
  /* =========================================================================
     MOBILE TIRE SERVICE
     ========================================================================= */
  'tire-change': {
    'north-york': {
      seoTitle: 'Mobile Tire Change North York | 24/7 Flat Tire Repair — iFAST',
      seoDescription: 'Flat tire in North York? We come to your driveway, condo garage, or the 401 shoulder — Willowdale, Don Mills, Downsview, Yorkdale. 20-35 min, 24/7. Call for a quote.',
      keywords: 'mobile tire change North York, flat tire repair North York, emergency tire change North York, mobile tire Willowdale, flat tire Don Mills, 401 flat tire North York, nail in tire Downsview, tire repair Yorkdale',
      h1: 'Mobile Tire Change in North York — 24/7 Flat Tire Repair',
      intro: (
        <>
          <p className="mb-4">
            A flat in North York usually means one of three things: a nail picked up in a construction zone off Sheppard or Finch, a slow leak that finally went flat overnight in a condo garage, or a sidewall opened up by a pothole on Allen Road. <strong>{COMPANY_NAME}</strong> brings the tire shop to the car instead of making you limp it to a bay on a donut. We run a unit stationed in North York, so typical arrival is <strong>20-35 minutes</strong>, 24 hours a day.
          </p>
          <p className="mb-4">
            The vans carry a plug-patch kit, common 15"–20" sizes for sedans, SUVs, and light trucks, and a computerized balancer. A tread puncture gets repaired on the spot; a tire that genuinely cannot be saved gets a real replacement rather than a spare that limits you to 80 km/h. Most jobs are finished inside 45 minutes of arrival. <strong>Call {PHONE_NUMBER} for a no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_tire-change_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The single most common North York tire call we take is in a condo garage on the Yonge corridor between Sheppard and Finch. A tire goes soft over a few days, the driver finds it flat on P2 or P3, and there is no realistic way to get the car to a shop. Most tire services cannot help — a flatbed will not clear the garage entrance. Our vans are sized for standard residential parking levels, so we work on the car where it is parked. Give dispatch the building and level when you call and we will confirm clearance before rolling.
          </p>
          <p className="mb-4">
            The highway calls are a different job entirely. The 401 through North York is the widest stretch of highway on the continent, and the collector-express split near Yonge and Allen Road can leave a stopped car pinned between two live traffic streams. Allen Road itself has short merges and, for much of its run, no shoulder worth stopping on. On those calls we arrive with high-visibility strobes and cones and secure the scene before touching the wheel — and if the position is genuinely unsafe to work in, we will say so and recommend a short tow to a safe spot rather than put a technician and a customer next to moving traffic.
          </p>
          <p className="mb-4">
            Everything else is ordinary and quick: driveways in Bayview Village and York Mills, the multi-storey lots at Yorkdale and Fairview, TTC commuter parking at Finch and Sheppard, and staff lots at Sunnybrook, North York General, and Humber River.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated. <strong>Safi</strong>, the owner-technician, answers the phone and does the work — you are not routed through a call centre that subcontracts the job to whoever is cheapest that night. That matters most on the calls where the honest answer is not the profitable one: if your tire can be patched, we patch it rather than selling you a replacement.
          </p>
          <p className="mb-4">
            Two North York specifics worth knowing. First, pothole season on Allen Road and the Downsview stretch of Sheppard does real sidewall damage, and sidewall damage cannot be safely repaired — we will tell you that on the phone so you know a replacement is likely before we arrive. Second, we keep winter-rated common sizes on the van from November through March, because a cold snap here reliably turns marginal tires into flat ones overnight.
          </p>
        </>
      ),
      priceNote: 'You get the price on the call, before the van rolls. Our North York rates are the same as our home area — no "out of zone" surcharge, no distance fee, no after-hours premium. If a tire turns out to need replacing rather than repairing, we quote that before starting the work, not after.',
      faqs: [
        {
          question: 'Can you change a tire inside a North York condo parking garage?',
          answer: 'Yes, and it is one of our most common calls here. Our service vans fit standard residential garage clearance on P1 through P4 in most Yonge corridor buildings, so we work on the car in its parking spot. Tell dispatch the building address and level when you call and we will confirm access before we roll. A small number of older buildings have unusually low clearance — we will tell you that on the phone rather than after arriving.'
        },
        {
          question: 'How fast can you reach me for a flat in North York?',
          answer: 'Typically 20-35 minutes, from a unit stationed in North York rather than dispatched across the city. Don Mills, Parkwoods, Victoria Village, and Henry Farm are usually at the fast end. Willowdale, Bayview Village, and York Mills sit in the middle. Downsview, Humber Summit, and the Jane & Finch corridor are the long end. You get a live ETA on the call.'
        },
        {
          question: 'Do you carry a tire for my car on the North York van?',
          answer: 'We stock most common sedan, SUV, and light-truck sizes from 15" to 20". Call with your make, model, and year and we will confirm before dispatch. If we do not have your exact tire, we can repair the original or mount your spare on-site and pre-order the correct tire for a quick follow-up.'
        },
        {
          question: 'My tire was damaged by a pothole on Allen Road — can it be repaired?',
          answer: 'It depends where the damage is. A puncture in the tread can almost always be plugged or patched. Damage to the sidewall cannot be safely repaired at any shop — the sidewall flexes constantly and a patch there will fail, often at speed. Pothole impacts tend to hit the sidewall, so replacement is more likely. We will assess it on-site and show you what we are looking at before quoting.'
        },
        {
          question: 'Can you help on the 401 or the DVP through North York?',
          answer: 'Yes, 24/7. Pull as far right as you safely can, put your hazards on, and stay in the vehicle with your seatbelt fastened while you call. We arrive with high-visibility strobes and cones and secure the scene before starting. On the most exposed stretches — the collector-express split near Yonge, or Allen Road where there is effectively no shoulder — we may recommend a short tow to a safe location instead of a roadside repair. That is a safety call, not an upsell.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Mobile Tire Change Scarborough | 24/7 Flat Tire Repair — iFAST',
      seoDescription: 'Flat tire in Scarborough? iFAST brings the tire shop to your driveway or the 401 shoulder — Agincourt, Malvern, Woburn. 15-25 min, 24/7. Call for a quote.',
      keywords: 'mobile tire change Scarborough, flat tire repair Scarborough, emergency tire change Scarborough, mobile tire Agincourt, flat tire Malvern, 401 flat tire Scarborough, nail in tire Scarborough',
      h1: 'Mobile Tire Change in Scarborough — 24/7 Flat Tire Repair',
      intro: (
        <>
          <p className="mb-4">
            A flat never picks a good moment — a nail you find before work in Agincourt, a slow leak gone soft overnight in Woburn, or pressure dropping on the 401 eastbound at rush hour. <strong>{COMPANY_NAME}</strong> brings the tire shop to wherever your car already is, so you skip the lineup and skip the tow. We're based right here at <strong>20 Antrim Crescent (M1P 4N3)</strong>, which gives Scarborough the tightest arrival times in the East End — typically <strong>15-25 minutes</strong>, 24/7.
          </p>
          <p className="mb-4">
            Our vans carry a plug-patch kit, common 15"–20" sizes for sedans, SUVs, and light trucks, and a computerized balancer — so a tread puncture gets plugged on the spot, and a tire that can't be saved gets a real replacement, not a donut. Most flats are done in under 45 minutes from arrival. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_tire-change_scarborough_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Being our home base, Scarborough gets the fastest response we run. The trouble spots are predictable: the 401 eastbound merge at Markham Road where transport debris collects, the Kennedy-Sheppard construction zone, and the Morningside back roads that chew through sidewalls in winter. For highway shoulder work, the technician sets high-viz strobes and cones and secures the scene before touching the vehicle.
          </p>
          <p className="mb-4">
            For residential calls in Cliffside, Birchmount, Guildwood, Malvern, or Rouge, we come to your driveway, the condo lot, or the parking spot at Scarborough Town Centre — no need to move the car. The recurring story in our reviews is a nail or screw found at the worst possible time, and that's exactly the call we take here every day.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name you'll see across our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who answers the phone and does the work himself. One Scarborough-area review captures how a tire call goes:
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "Best Service and fast service my car Tire got flat and I called them They came in 10 minutes and they repair it in 5 minutes and they charge me fair price..." <strong>— Sha Zahim, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, we work damage-free, and we keep winter-rated common sizes on the van from November through March because demand here spikes during cold snaps.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before the van rolls — no hidden distance or after-hours fees, and no "out of zone" surcharge in our home city. Customers consistently call our pricing fair. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'Do you carry a tire for my car on the Scarborough van?',
          answer: 'We stock most common sedan, SUV, and light-truck sizes (15"–20"). Call with your make, model, and year and we\'ll confirm stock before we roll. If we don\'t have your exact tire, we can plug or patch the original or mount your spare on-site and pre-order the tire for a quick follow-up visit.'
        },
        {
          question: 'How fast can you reach me for a flat in Scarborough?',
          answer: 'Typically 15-25 minutes anywhere in Scarborough, since we dispatch from 20 Antrim Crescent. Agincourt, Wexford, and Bendale see even faster arrivals. Real reviews cite 10-minute arrivals, including a midnight flat. We give you a live ETA on the call.'
        },
        {
          question: 'Can you come to my driveway on a Scarborough side street?',
          answer: 'Yes. We service driveways across Agincourt, Malvern, Woburn, Cliffside, Birchmount, Rouge, and everywhere in between — plus condo lots, workplace parking, and GO stations. No need to move the vehicle; we bring the shop to you.'
        },
        {
          question: 'What does it cost to fix a flat or patch a nail in Scarborough?',
          answer: 'We give you the exact price on the call before we dispatch, so there are no surprises. A plug or patch of a tread puncture is the fastest fix, and a full replacement is quoted before we start. Customers consistently describe our pricing as fair — one driver was quoted "almost half" what other shops wanted. Call ' + PHONE_NUMBER + ' for a quick quote.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Mobile Tire Service Pickering | Flat Tire Repair 24/7 — iFAST Roadside',
      seoDescription: 'Mobile tire service in Pickering — flat repair, tire change, and on-site swap across Bay Ridges, Amberlea, Liverpool, and the 401 corridor. 20-30 min arrival. Call iFAST.',
      keywords: 'mobile tire service Pickering, flat tire repair Pickering, tire change Pickering, mobile tire Bay Ridges, 401 flat tire Pickering, emergency tire Pickering',
      h1: 'Mobile Tire Service in Pickering — Flat Tire Repair & On-Site Swap',
      intro: (
        <>
          <p className="mb-4">
            Flat tire in Pickering? <strong>{COMPANY_NAME}</strong> rolls a fully-equipped mobile tire van to you anywhere in the city — Bay Ridges, Amberlea, Liverpool, Dunbarton, Rougemount — with a typical ETA of <strong>20-30 minutes</strong>. We handle plug repairs, tire replacements, seasonal swaps, and spare installs roadside, in driveways, and in parking lots across Pickering.
          </p>
          <p className="mb-4">
            The 401 corridor through Pickering generates a huge share of our flat-tire calls, especially eastbound between Whites Road and Brock Road where construction debris is a constant hazard. We stage units close to this stretch during rush hours so highway flats are handled faster than you'd think.
          </p>
          <InlineCall source="pk_tire_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering's tire-trouble map is consistent: the 401 onramps at Whites and Brock, Bayly Street construction zones, and the rural stretches of Brock Road north of Taunton where potholes multiply each spring. If you're at Pickering Town Centre, the Pickering GO Station, or near Petticoat Creek, we can typically be there in 20-25 minutes.
          </p>
          <p className="mb-4">
            For commuters heading into or out of the city, we also do after-hours tire work — meaning if you discover a slow leak at 6 AM before your morning drive, we can be in your driveway within the half-hour.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Many Pickering residents commute daily on the 401 — so a flat discovered before work is a same-day disaster. We offer early-morning (5-8 AM) dispatch in Pickering specifically for commuters, and we'll time the work so you're still on the road by rush hour.
        </p>
      ),
      priceNote: 'Pickering rates are our standard East GTA zone — no "out of zone" surcharges. Plug repairs are fastest and cheapest when the puncture is in the tread.',
      faqs: [
        {
          question: 'How fast do you reach the 401 in Pickering?',
          answer: 'Typical ETA to the 401 corridor through Pickering is 20-30 minutes. For highway work we deploy cones and strobes before touching the vehicle — driver safety first.'
        },
        {
          question: 'Can you help me at Pickering Town Centre or the GO Station?',
          answer: 'Absolutely. Parking-lot tire service at Pickering Town Centre, the Pickering GO Station, and surrounding plazas is one of our most common call types. We work around security and parking flow without issues.'
        },
        {
          question: 'What if my tire has sidewall damage?',
          answer: 'Sidewall punctures can\'t be safely plugged — the tire needs replacement. We carry common sizes on the van and can install a new tire on-site or mount your spare while we source the exact tire you want.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Mobile Tire Change Ajax | 24/7 Flat Tire Repair — iFAST Roadside',
      seoDescription: 'Flat tire in Ajax? iFAST brings mobile tire repair to your driveway or the 401 shoulder — Harwood, Salem, Pickering Village. 25-35 min, 24/7. Call for a quote.',
      keywords: 'mobile tire change Ajax, flat tire repair Ajax, tire change Ajax, mobile tire Harwood, 401 flat tire Ajax, nail in tire Ajax, on-site tire Ajax',
      h1: 'Mobile Tire Change in Ajax — On-Site Flat Tire Repair',
      intro: (
        <>
          <p className="mb-4">
            A flat in Ajax shouldn't mean nursing a donut to a shop across town. <strong>{COMPANY_NAME}</strong> brings the tire shop to wherever your car already is — a driveway in Pickering Village, the Ajax GO lot, or the 401 shoulder near Westney — so you skip the tow entirely. Our typical Ajax arrival is <strong>25-35 minutes</strong>, 24/7, and we'll always give you a real ETA on the call.
          </p>
          <p className="mb-4">
            The van arrives stocked with a plug-patch kit, common 15"–20" sizes for sedans, SUVs, and light trucks, and a computerized balancer. A tread puncture gets plugged on the spot; a tire that can't be saved gets a real replacement and is balanced before you drive off. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_tire-change_ajax_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Ajax is a city of newer subdivisions — Nottingham, Audley, Discovery Bay, Riverside — where there's often no corner tire shop nearby. We fill that gap so you don't have to tow to Whitby or Pickering. Flats here cluster on the 401 eastbound near Westney and Salem (transport debris) and on Harwood's freeze-thaw potholes through the winter and spring.
          </p>
          <p className="mb-4">
            Whether you're stuck in a Central Ajax driveway, at the Durham Centre, or on the shoulder by the Ajax GO Station, we come straight to the spot. The most common call we get is a nail or screw found at a bad time — and a stocked van with the right tools turns that from a lost afternoon into a quick fix.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name across our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who picks up the phone and does the work himself. One review sums up the no-tools, fast-fix situation we handle constantly:
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "I got a flat tire yesterday and didn't have the right tools with me... From the moment I called until the technician arrived and changed the tire, it took less than 20 minutes!" <strong>— Mohammad Badakhash, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, we work damage-free, and that's the whole point of mobile service — you don't need a spare, a jack, or a lug wrench. We carry it all and bring it to your door.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before the van rolls — no hidden distance fees, no after-hours premium, no "out of zone" surcharge in Ajax. Customers consistently call our pricing fair. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'How fast can you reach me for a flat in Ajax?',
          answer: 'Typical Ajax arrival is 25-35 minutes from call to van on-site. Pickering Village and west Ajax tend to be on the faster end since they\'re closer to our Scarborough base; Audley and north Ajax add a few minutes. We give you a live ETA when you call.'
        },
        {
          question: 'Do you carry the tools and a tire if I don\'t have a spare?',
          answer: 'Yes — that\'s the whole point of mobile service. We carry common 15"–20" sizes, a plug-patch kit, and a computerized balancer. If your exact size isn\'t on the van, we plug or patch the original, mount your spare, or pre-order your tire so you\'re not stranded.'
        },
        {
          question: 'Do you work in Ajax subdivision driveways?',
          answer: 'Yes. We service every neighborhood from Pickering Village to Audley, Nottingham, Discovery Bay, and Riverside, plus the Ajax GO and Durham Centre lots. If your driveway fits a van, we can do the work there.'
        },
        {
          question: 'What does a flat repair or tire change cost in Ajax?',
          answer: 'We give you the exact price on the call before we dispatch, so there are no surprises when we arrive. A plug or patch of a tread puncture is the fastest, and a full replacement is quoted before we start. Customers consistently describe our pricing as fair. Call ' + PHONE_NUMBER + ' for a quick quote.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Mobile Tire Service Whitby & Brooklin | Flat Tire Repair 24/7 — iFAST',
      seoDescription: 'Mobile flat tire service across Whitby and Brooklin. On-site tire repair, replacement, and seasonal swaps along the 401, 407, and 412. 30-40 min arrival. Call now.',
      keywords: 'mobile tire service Whitby, flat tire repair Whitby, tire change Whitby, mobile tire Brooklin, 412 flat tire, 401 flat tire Whitby, emergency tire Whitby',
      h1: 'Mobile Tire Service in Whitby — Flat Tire Repair Across the 401/407/412',
      intro: (
        <>
          <p className="mb-4">
            Whitby is spread out — from Port Whitby on the lake to Brooklin in the north — and a flat tire can happen anywhere along the 401, 407, or the 412 connector. <strong>{COMPANY_NAME}</strong> dispatches mobile tire units to all of it with a <strong>30-40 minute</strong> typical ETA. Plug, patch, replace, or swap, we bring the tools and tires to you.
          </p>
          <p className="mb-4">
            Whitby's 412 shoulder is one of the highest flat-tire hotspots in Durham because it's a relatively new highway with debris that still works its way off construction zones. We've handled dozens of 412 flats and know how to get in and out safely.
          </p>
          <InlineCall source="wh_tire_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The common Whitby call patterns: Port Whitby/Victoria Street lakefront driveways, downtown Whitby's older neighborhoods where curbs chew through sidewalls, the 412 shoulder between the 401 and 407 interchanges, and Brooklin residential streets. We route the closest van in real time — there's no "one truck fits Whitby" approach here because the city is too big for that.
          </p>
          <p className="mb-4">
            If you're stuck at the Whitby GO, the Thickson Road commercial strip, or along Rossland Road, we'll come directly to the parking spot or shoulder.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Brooklin residents often struggle to find same-day tire service because most tire shops are further south. We reach Brooklin in 30-40 minutes — meaning you don't have to choose between a long wait at a shop or driving on a spare through winter roads.
        </p>
      ),
      priceNote: 'Whitby is the east edge of our core zone. No distance surcharges — standard East GTA rates apply across the city including Brooklin.',
      faqs: [
        {
          question: 'Do you service Brooklin for flat tires?',
          answer: 'Yes. Brooklin calls typically get a 30-45 minute ETA. We handle both in-driveway service and roadside work along Baldwin Street and Winchester Road.'
        },
        {
          question: 'What about flats on the 412?',
          answer: 'The 412 is one of our regular highway routes. We deploy cones and high-viz before touching the vehicle and have handled dozens of shoulder-side tire replacements there.'
        },
        {
          question: 'Can you swap all four tires in a Whitby driveway?',
          answer: 'Yes — seasonal tire changeovers (all four wheels) are a common service. Book ahead during October/April rush for shorter ETAs.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Mobile Tire Service Oshawa | 24/7 Flat Tire Repair — iFAST Roadside',
      seoDescription: 'Mobile tire service in Oshawa. Flat repair, tire change, and on-site swap across Downtown, Samac, Vanier, UOIT, and the 401 corridor. 35-50 min honest arrival.',
      keywords: 'mobile tire service Oshawa, flat tire repair Oshawa, tire change Oshawa, UOIT mobile tire, Durham College flat tire, 401 flat tire Oshawa',
      h1: 'Mobile Tire Service in Oshawa — Honest ETAs, 24/7 Dispatch',
      intro: (
        <>
          <p className="mb-4">
            Oshawa sits at the east edge of our East GTA service zone — so our honest typical ETA here is <strong>35-50 minutes</strong>, and we tell you that upfront instead of promising something we can't deliver. <strong>{COMPANY_NAME}</strong> is one of the few Scarborough-based mobile tire teams that routinely runs Oshawa calls, handling flats, replacements, swaps, and spare installs across Downtown, Samac, Vanier, and the UOIT area.
          </p>
          <p className="mb-4">
            Oshawa drivers get flats on the 401 near Ritson and Harmony, on the 407/412 interchange, and in the older downtown neighborhoods where curbs and potholes are rough on sidewalls. Our vans carry common sizes and we'll confirm stock before rolling.
          </p>
          <InlineCall source="os_tire_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The usual Oshawa patterns: UOIT/Durham College student driveways and parking lots, downtown Oshawa's King and Simcoe corridors, industrial zones near the GM complex, and the 401 stretches both directions around Thornton and Park Road. We also handle Oshawa Centre parking lot calls during business hours.
          </p>
          <p className="mb-4">
            If you're a commuter stuck on the 401 heading into Toronto, we'll reach you faster if you're westbound — our vans already staged closer to the Durham line catch those first.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Students and commuters in Oshawa often can't wait hours for a tow + shop visit. We bring the shop to the driveway — particularly useful for UOIT/Durham College residents who live away from family and don't have a backup ride.
        </p>
      ),
      priceNote: 'Oshawa has a small distance adjustment vs. Scarborough-core rates due to further travel. We quote everything upfront before we roll.',
      faqs: [
        {
          question: 'Is 35-50 minutes really the ETA for Oshawa?',
          answer: 'Yes — and that\'s an honest range. We\'ve seen competitors promise 20 minutes and show up in 90. Our Scarborough dispatch means real drive time to Oshawa is 35-50 min during normal traffic.'
        },
        {
          question: 'Do you service UOIT/Durham College area?',
          answer: 'Yes. Student housing around Simcoe North, Conlin, and Windfields is a regular service area. We do parking lot and driveway work there multiple times a week.'
        },
        {
          question: 'Can I get same-day tire replacement in Oshawa?',
          answer: 'If we have your size on the van, yes — same hour, not just same day. For less common sizes we can plug/patch or install a spare immediately and pre-order the exact tire for a follow-up.'
        }
      ]
    }
  },

  /* =========================================================================
     JUMP START / BATTERY BOOST
     ========================================================================= */
  'jump-start': {
    'north-york': {
      seoTitle: 'Jump Start & Battery Boost North York | 24/7 Mobile — iFAST',
      seoDescription: 'Dead battery in North York? Mobile boost and battery replacement in Willowdale, Don Mills, Downsview, Yorkdale — including condo garages. 20-35 min, 24/7. Call now.',
      keywords: 'jump start North York, battery boost North York, car battery replacement North York, dead battery Willowdale, boost service Don Mills, battery Downsview, condo garage boost North York, 24 hour battery North York',
      h1: 'Jump Start & Battery Boost in North York — 24/7 Mobile Service',
      intro: (
        <>
          <p className="mb-4">
            A dead battery is the most common call we take in North York, and the reason is structural: this district has more underground residential parking than anywhere else in the city outside downtown. Cars sit unused for days in cold garages, short trips never fully recharge the battery, and one cold morning it will not turn over. <strong>{COMPANY_NAME}</strong> runs a stationed North York unit, so a boost typically arrives in <strong>20-35 minutes</strong>, any hour.
          </p>
          <p className="mb-4">
            We do not just jump it and leave. Every boost includes a charging-system test — we check whether the alternator is actually replacing the charge, because a car that needs a second boost the next morning did not have a battery problem, it had a charging problem. If the battery genuinely is finished, we carry common group sizes and can replace it on the spot. <strong>Call {PHONE_NUMBER}.</strong>
          </p>
          <InlineCall source="service_city_jump-start_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The Yonge corridor condo garages between Sheppard and Finch are where most of these calls come from, and they are exactly the calls that generic roadside services struggle with. A tow truck cannot get down to P3. CAA-style dispatch will often send one anyway and then tell you they cannot help once they arrive. Our vans clear standard residential garage heights, so we come to the parking spot. Have the building address and the level ready when you call and we will confirm access before dispatching rather than after.
          </p>
          <p className="mb-4">
            The other reliable pattern is the commuter lots. Finch and Sheppard TTC parking, the GO lots, and the all-day office parking around North York Centre produce a steady stream of 6pm calls — the car sat for nine hours in the cold and will not start when everyone is trying to get home. Mall lots at Yorkdale, Fairview, and Bayview Village do the same on winter weekends. We handle all of them, and we handle hospital staff parking at Sunnybrook, North York General, and Humber River at shift change, which is its own predictable rush.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            The honest version of this service matters more than the fast version. Plenty of operators will boost a car, take the fee, and drive away knowing perfectly well the driver will be stranded again in twelve hours. We test the charging system on every call and tell you which of the three things is actually wrong: a battery at end of life, an alternator not charging, or a parasitic draw pulling the battery down overnight. Only the first is fixed by a new battery.
          </p>
          <p className="mb-4">
            A North York-specific note on cold: batteries lose a large share of their cranking power below freezing, and a battery that is merely weak in October will be dead in January. If we boost you in the fall and the battery tests marginal, we will tell you — not to sell you something, but because a planned replacement in a warm garage is a much better experience than a dead car at Finch station in a February storm. {COMPANY_NAME} is owner-operated, and <strong>Safi</strong> does the work himself.
          </p>
        </>
      ),
      priceNote: 'Jump start starts at $50, quoted on the call before we dispatch. Battery replacement is quoted separately once we know the group size your vehicle takes. No "out of zone" fee for North York, no after-hours premium, and no charge for the charging-system test — it comes with the boost.',
      faqs: [
        {
          question: 'Can you boost my car in an underground condo garage in North York?',
          answer: 'Yes — this is the single most common battery call we get here, and it is the one most roadside services cannot actually do. Our vans clear standard residential garage heights on P1 through P4 in most Yonge corridor buildings, so we come to your parking spot. Give dispatch the building address and level when you call so we can confirm clearance before rolling. A few older buildings have unusually low ceilings and we will tell you on the phone if yours is one.'
        },
        {
          question: 'How fast can you get to me in North York for a boost?',
          answer: 'Typically 20-35 minutes from a unit stationed in the district. Don Mills, Parkwoods, Victoria Village, and Henry Farm are usually fastest. Downsview, Humber Summit, and Jane & Finch are the long end of the range. Winter mornings are our peak volume, so call as early as you can — you get a live ETA on the phone.'
        },
        {
          question: 'My car needed a boost again the next day. What is wrong?',
          answer: 'Almost certainly not the jump start. If a car dies again within a day, the battery is either at end of life, the alternator is not recharging it while you drive, or something is drawing power while the car is off. We test the charging system on every boost specifically so you find this out on the first call rather than the third. If we boosted you and it died again, call us back and we will diagnose it properly.'
        },
        {
          question: 'Do you replace batteries on-site, or only boost?',
          answer: 'Both. We carry common group sizes on the van and can replace a battery where your car is parked, including in a condo garage. Call with your make, model, and year and we will confirm we have the right battery before dispatch. We also dispose of the old battery properly, which is part of the job, not an extra.'
        },
        {
          question: 'Is a boost safe for a modern car with sensitive electronics?',
          answer: 'Yes, when it is done with proper equipment. We use professional jump packs with reverse-polarity and surge protection rather than clamping to another running vehicle, which is where most electrical damage on modern cars actually comes from. Hybrid and start-stop systems have their own requirements and we handle those regularly — mention the vehicle type when you call.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Car Battery Jump Start Scarborough | 24/7 Boost — iFAST',
      seoDescription: 'Dead battery in Scarborough? iFAST delivers 24/7 jump start and battery boost across Agincourt, Malvern, Woburn, and the 401. 15-25 min arrival. Call for a quote.',
      keywords: 'jump start Scarborough, car battery boost Scarborough, dead battery Scarborough, battery jump Agincourt, jump start Malvern, 24 hour jump start Scarborough, car won\'t start Scarborough',
      h1: 'Car Battery Jump Start in Scarborough — 24/7 Boost Service',
      intro: (
        <>
          <p className="mb-4">
            Turn the key in Agincourt and hear a click, slow crank, or nothing at all? <strong>{COMPANY_NAME}</strong> dispatches from our home base at <strong>20 Antrim Crescent (M1P 4N3)</strong>, so a technician with a commercial jump pack is typically <strong>15-25 minutes</strong> from anywhere in Scarborough — the fastest boost ETA in the East GTA. We start cars, trucks, SUVs, and vans, including deeply-discharged batteries that another car's cables won't touch.
          </p>
          <p className="mb-4">
            We don't just boost and leave. We load-test the battery on the spot — about 60 seconds — so you know whether it will hold or whether it's failing. If it's done, we tell you straight and can often install a replacement the same visit, no tow. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_jump-start_scarborough_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            As our home base, Scarborough gets the fastest response we run — and the calls spike December through February. Overnight cold-soaked batteries no-start in driveways across Malvern and Woburn, in the industrial-park lots along Progress Avenue where cars sat through a cold night, and in the big lots at Scarborough Town Centre, Agincourt Mall, and the Kennedy GO commuter lot.
          </p>
          <p className="mb-4">
            Batteries lose roughly 30% of their cranking power at -15°C, so any battery past about four years old is a real no-start risk in a Scarborough cold snap. We keep common replacement batteries on the van through winter, so a boost that reveals a dead battery often becomes a same-visit fix instead of a tow.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name behind our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who answers and does the work himself. Two of our battery reviews lead with the same thing: fast arrival and an honest, upfront price.
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "My mom had an issue with a car battery and was stuck in a parking lot—they got there quickly and were super helpful. They spoke us through possible solutions and were super transparent about how much they charge. Very reliable!" <strong>— Shanthuru Kalaiselvan, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, our procedure is safe for modern electronics, hybrids, and EV 12V auxiliaries, and we walk you through what we find before any paid work — exactly what that review describes.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before we dispatch — no hidden distance or after-hours fees in our home city. If the battery is dead beyond a boost, we load-test, tell you honestly, and quote a replacement before installing anything — you approve first. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'How fast can you reach me for a dead battery in Scarborough?',
          answer: 'Typically 15-25 minutes anywhere in Scarborough, since we dispatch from 20 Antrim Crescent. Agincourt and the north end see the fastest arrivals. A real customer called us at 2am and we arrived in 15 minutes. We give you a live ETA on the call.'
        },
        {
          question: 'How cold is too cold for my battery?',
          answer: 'Batteries lose roughly 30% of cranking power at -15°C and about 50% at -30°C. Any battery over four years old is at high risk of a no-start during a Scarborough cold snap. Early warning signs are slow cranking, dim dash lights, and clicking.'
        },
        {
          question: 'Will you tell me the price and what\'s wrong before you start?',
          answer: 'Yes. We give you the price on the call before we dispatch, and we walk you through what we find before any paid work — reviewers specifically call out how transparent we are. If the battery needs replacing, you approve the quote before we install anything.'
        },
        {
          question: 'Will jumping my car damage it?',
          answer: 'No, done properly. We use polarity-protected clamps and procedures that are safe for modern electronics, hybrids, and EV 12V auxiliary batteries. Our commercial pack delivers far more than retail cables and can start deeply-discharged batteries.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Car Battery Jump Start Pickering | 24/7 Boost — iFAST Roadside',
      seoDescription: 'Dead battery in Pickering? iFAST brings 24/7 jump start and battery boost to Bay Ridges, Amberlea, Liverpool, and the Pickering GO lot. 20-30 min. Call for a quote.',
      keywords: 'jump start Pickering, car battery boost Pickering, dead battery Pickering, jump start Bay Ridges, 24 hour battery Pickering, Pickering GO battery, car won\'t start Pickering',
      h1: 'Car Battery Jump Start in Pickering — 24/7 Mobile Boost',
      intro: (
        <>
          <p className="mb-4">
            Car won't start in Pickering? Clicks, a slow crank, or dash lights but no turnover usually means the battery. <strong>{COMPANY_NAME}</strong> brings a commercial jump pack to your driveway, parking lot, or the roadside anywhere in the city — Bay Ridges, Amberlea, Liverpool, West Shore — with a typical <strong>20-30 minute</strong> ETA, 24/7. It starts deeply-discharged batteries that another car's cables won't.
          </p>
          <p className="mb-4">
            We boost, then load-test on the spot — about 60 seconds — so you know whether the battery will hold through the next cold night or whether it's failing. If it's done, we tell you straight and can often replace it the same visit, no tow. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_jump-start_pickering_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering is commuter country, and the classic no-start here is a cold Monday morning after a car has sat through a sub-zero weekend. We get a recurring run of these from the Pickering GO commuter lot, and from driveways across Bay Ridges, Amberlea, and Dunbarton where the daily driver won't turn over before the 401 run into the city.
          </p>
          <p className="mb-4">
            That's why we lean on early-morning dispatch in Pickering — call as soon as you find the battery dead and we can usually have you moving before rush hour locks up the 401. We also take highway shoulder calls along the 401 eastbound and boosts at the Pickering Town Centre and Casino Resort lots.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name behind our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who answers the phone and does the work himself, even in the middle of the night. One battery review captures exactly that:
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "Called him around 2am and he arrived in 15 minutes, my car won't start, it needs a battery powered" <strong>— oyindamola aworele, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, our boost is safe for modern electronics, hybrids, and EV 12V auxiliaries, and we run 24/7 — the late call and the early-commute call both get answered.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before we dispatch — no hidden distance or after-hours fees, no out-of-zone surcharge in Pickering. If the battery is dead beyond a boost, we load-test, tell you honestly, and quote a replacement before installing anything — you approve first. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'Do you do early-morning jump starts in Pickering?',
          answer: 'Yes, 24/7. We run early-morning dispatch specifically for Pickering commuters. Call the moment you realize the battery is dead and we can usually have you moving before the 401 fills up — a real customer called at 2am and we arrived in 15 minutes.'
        },
        {
          question: 'My car won\'t start — is it the battery?',
          answer: 'Often yes — a slow crank, clicking, or dim lights with no start is the classic battery signature. We boost it and load-test on the spot to confirm whether it\'s the battery, the alternator, or something else, so you\'re not guessing.'
        },
        {
          question: 'Can you jump a hybrid or EV in Pickering?',
          answer: 'Yes. Hybrids and EVs have a separate 12V auxiliary battery that handles starting and electronics; we boost that the same way we boost a conventional car, using procedures safe for the vehicle\'s electronics. Tell dispatch the model when you call.'
        },
        {
          question: 'Will you tell me the price before you start?',
          answer: 'Yes. We quote you up front on the call, and we walk you through what we find before any paid work — our reviews specifically call out how transparent we are. If the battery needs replacing, you approve the price before we install. Call ' + PHONE_NUMBER + ' for a quote.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Battery Jump Start Ajax | 24/7 Boost Service — iFAST Roadside',
      seoDescription: 'Dead battery in Ajax? 24/7 mobile jump start across Harwood, Salem, Pickering Village, Audley. 25-35 min arrival. Call iFAST Roadside.',
      keywords: 'jump start Ajax, car battery boost Ajax, dead battery Ajax, jump start Harwood, battery boost Salem, 24 hour battery Ajax',
      h1: 'Battery Jump Start in Ajax — 24/7 Mobile Boost Service',
      intro: (
        <>
          <p className="mb-4">
            A dead battery in Ajax shouldn't derail your morning. <strong>{COMPANY_NAME}</strong> dispatches mobile jump start units to Ajax 24/7 with a typical <strong>25-35 minute</strong> ETA — Harwood, Salem, Westney, Audley, Pickering Village, and everywhere between. Commercial-grade jump packs start engines that retail cables give up on.
          </p>
          <p className="mb-4">
            Ajax drivers tend to get dead batteries in the new subdivisions where cars sit through cold weekends unused. We handle the boost in 10-15 minutes once we arrive, then load-test to confirm the battery can hold.
          </p>
          <InlineCall source="aj_jump_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Common Ajax jump start calls: driveways in north Ajax (Salem, Audley, Rossland), the Ajax GO station parking, commuter parking along Bayly, and the Ajax Downs and Costco plaza parking lots. Winter mornings see 3x the call volume compared to summer.
          </p>
          <p className="mb-4">
            If we arrive and find a battery that won't hold a charge, we can often install a new one on the spot rather than tow you to a shop.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Many Ajax residents live in subdivisions without quick access to a mechanic. Our mobile boost + on-site battery replacement saves a trip to Whitby or Pickering and means you're back to normal in one visit.
        </p>
      ),
      priceNote: 'Ajax is in our standard East GTA zone. Flat rate for jump starts — if we need to replace the battery, you approve the price before we install.',
      faqs: [
        {
          question: 'How fast can you reach Ajax with a jump pack?',
          answer: 'Typical ETA is 25-35 minutes. North Ajax is faster than lakefront south Ajax. We\'ll give you a realistic window when you call based on current traffic and van location.'
        },
        {
          question: 'Do you carry batteries for Ajax calls?',
          answer: 'Yes — we stock common sizes for sedans, SUVs, and light trucks. Tell us your make/model/year and we\'ll confirm stock before rolling.'
        },
        {
          question: 'Can you help in an Ajax subdivision driveway?',
          answer: 'Yes, 100%. Driveway boost calls are one of our most common Ajax service types — no need to push the car anywhere.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Battery Jump Start Whitby & Brooklin | 24/7 Boost — iFAST Roadside',
      seoDescription: 'Dead battery in Whitby or Brooklin? 24/7 jump start and battery boost across Port Whitby, Downtown, Brooklin, and the 412 corridor. 30-40 min arrival.',
      keywords: 'jump start Whitby, car battery boost Whitby, dead battery Whitby, jump start Brooklin, 24 hour battery Whitby, 412 dead battery',
      h1: 'Battery Jump Start in Whitby — Mobile Boost for Whitby & Brooklin',
      intro: (
        <>
          <p className="mb-4">
            Car battery dead in Whitby or Brooklin? <strong>{COMPANY_NAME}</strong> runs mobile jump start service across the entire town — from Port Whitby on the lake to Brooklin up north — with a typical <strong>30-40 minute</strong> ETA. Commercial jump packs handle any battery a retail booster can't.
          </p>
          <p className="mb-4">
            Whitby's spread is what makes mobile service valuable here: Brooklin drivers especially benefit since they're far from downtown mechanic shops. We come to your driveway or parking spot, do the boost, load-test, and tell you honestly whether the battery will survive the next cold night.
          </p>
          <InlineCall source="wh_jump_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Typical Whitby jump start calls: Port Whitby/Victoria Street lakefront driveways, downtown Whitby (Dundas, Brock), the Thickson Road commercial strip, Rossland neighborhood driveways, and Brooklin residential streets. We also do Whitby GO and Thickson GO commuter lot boosts regularly.
          </p>
          <p className="mb-4">
            Seasonal pattern: December through February triples our Whitby jump start volume. Cars sitting through cold weekends are the most common no-starts.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Brooklin is underserved by 24-hour roadside providers. We prioritize Brooklin because residents there often have to wait 90+ minutes with national fleet services — we aim for 30-40 and usually beat it.
        </p>
      ),
      priceNote: 'Standard East GTA flat rate for Whitby and Brooklin jump starts. No distance surcharges.',
      faqs: [
        {
          question: 'Can you reach Brooklin for a dead battery call?',
          answer: 'Yes. Brooklin is a regular service area. ETA is usually 30-45 minutes and we\'ll give you a realistic window when you call.'
        },
        {
          question: 'What if my car starts after the jump but dies again?',
          answer: 'That usually means the alternator is not charging the battery, or the battery itself is done. We can load-test both after the boost to tell you exactly what\'s failing.'
        },
        {
          question: 'Do you handle diesel pickups in Whitby/Brooklin?',
          answer: 'Yes. Diesel engines need higher cranking current — our commercial jump packs handle most diesel pickups. Tell us the vehicle when you call so we send the right gear.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Battery Jump Start Oshawa | 24/7 Mobile Boost — iFAST Roadside',
      seoDescription: '24/7 jump start service in Oshawa. Mobile battery boost across Downtown, Samac, Vanier, UOIT, and the 401 corridor. 35-50 min honest arrival. Call iFAST.',
      keywords: 'jump start Oshawa, car battery boost Oshawa, dead battery Oshawa, UOIT jump start, Durham College dead battery, 24 hour battery Oshawa',
      h1: 'Battery Jump Start in Oshawa — 24/7 Honest-ETA Boost Service',
      intro: (
        <>
          <p className="mb-4">
            Dead battery in Oshawa? <strong>{COMPANY_NAME}</strong> dispatches 24/7 mobile jump start service from Scarborough with an honest <strong>35-50 minute</strong> typical ETA. We'd rather tell you the real number than promise 20 minutes and show up in 90 like some national fleets do.
          </p>
          <p className="mb-4">
            Oshawa sees heavy jump start demand in winter — UOIT and Durham College students whose cars sit through weekends, commuters parking overnight at the GO, and older downtown neighborhoods where every third battery is past its prime. We handle all of it.
          </p>
          <InlineCall source="os_jump_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Common Oshawa calls: UOIT/Durham College student residences, downtown Oshawa driveways, industrial zones near GM, the Oshawa GO station commuter lot, and the Oshawa Centre parking. We also service the Samac and Vanier neighborhoods regularly.
          </p>
          <p className="mb-4">
            Because Oshawa is at the edge of our zone, we dispatch only when a Scarborough van is free — that's the honest tradeoff. If you need ultra-fast help, tell us on the call and we'll tell you the best-case ETA.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Students without a backup ride often face full days lost to a dead battery. We run UOIT/Durham College calls as a priority because the alternative for a student is waiting on CAA/classmate help that may never come.
        </p>
      ),
      priceNote: 'Oshawa has a small distance adjustment on the standard jump start rate. We quote everything before dispatch — no surprises.',
      faqs: [
        {
          question: 'Do you really service Oshawa from Scarborough?',
          answer: 'Yes. Most Scarborough-based mobile roadside teams refuse Oshawa calls. We take them — with honest 35-50 minute ETAs.'
        },
        {
          question: 'Can you replace a dead battery in Oshawa same visit?',
          answer: 'If we stock your size on the van, yes — same visit replacement, no tow. Common sedan and truck sizes are almost always on board.'
        },
        {
          question: 'What about UOIT/Durham College student cars?',
          answer: 'Student housing around Simcoe North, Conlin, and Windfields is a regular service area. Call and give us the address — we\'ll quote ETA upfront.'
        }
      ]
    }
  },

  /* =========================================================================
     CAR LOCKOUT
     ========================================================================= */
  'lockout': {
    'north-york': {
      seoTitle: 'Car Lockout Service North York | 24/7 Damage-Free Unlock — iFAST',
      seoDescription: 'Locked out in North York? Damage-free car unlocking in Willowdale, Don Mills, Downsview, Yorkdale, and condo garages. 20-35 min, 24/7. Call for a quote.',
      keywords: 'car lockout North York, locked keys in car North York, car unlock North York, 24/7 car unlocking North York, auto lockout Willowdale, car lockout Yorkdale, keys locked in car Don Mills, emergency unlock Downsview',
      h1: 'Car Lockout Service in North York — 24/7 Damage-Free Unlocking',
      intro: (
        <>
          <p className="mb-4">
            Keys on the seat and the door already shut. It happens at Yorkdale with a trunk full of shopping, in a condo garage at midnight, at a Finch commuter lot with a train to catch, and in a driveway in Willowdale while the engine is still running. <strong>{COMPANY_NAME}</strong> unlocks it without damaging the door, the glass, or the weather seal — typically <strong>20-35 minutes</strong> from a unit stationed in North York, 24 hours a day.
          </p>
          <p className="mb-4">
            We use professional wedge and long-reach tools, not a coat hanger and not a slim jim, which on any car built in the last two decades is a fast way to destroy the wiring and side-airbag hardware inside the door. Most vehicles are open in five to ten minutes once we are on scene. <strong>Call {PHONE_NUMBER} for a quote before we dispatch.</strong>
          </p>
          <InlineCall source="service_city_lockout_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            North York lockouts cluster in three places. The mall lots — Yorkdale, Fairview, Bayview Village — generate the daytime calls, usually with the keys visible on the driver's seat and a car full of bags. The Yonge corridor condo garages generate the overnight ones, and those are the calls where access matters as much as the unlock: we need you to meet us at the elevator or buzz us in, because we cannot reach a car on P3 without getting into the building. Have the unit number ready and let dispatch know if there is a concierge.
          </p>
          <p className="mb-4">
            The third is commuter parking — Finch and Sheppard TTC lots, GO parking, and the office lots around North York Centre. Those calls come in tight windows at either end of the day and we prioritise them accordingly. One situation we treat as urgent regardless of queue: a child or a pet locked in a vehicle. Tell dispatch immediately if that is the case and call 911 as well — we will roll the closest unit and we will not put you in a queue behind a shopping trip.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            There is a real difference between a roadside unlock and a locksmith, and being straight about it saves you money. We open locked vehicles. We do not cut or program new keys. If your key is genuinely lost or broken off in the lock rather than sitting inside the cabin, an automotive locksmith is the right call and we will tell you that on the phone rather than sending a van to a job we cannot finish.
          </p>
          <p className="mb-4">
            We also ask for proof the car is yours before we open it. Ownership, insurance, or a licence matching the registration is normal and we ask every time. Anyone who opens a car without asking will do the same for the person stealing yours. {COMPANY_NAME} is owner-operated and insured, and <strong>Safi</strong> answers the phone and does the work — so the person quoting you is the person who shows up.
          </p>
        </>
      ),
      priceNote: 'Lockout starts at $65, quoted on the call before the van rolls. No "out of zone" fee for North York and no overnight premium — a 3am unlock in Downsview is priced the same as a 3pm one at Yorkdale. If the job turns out to need a locksmith rather than a roadside unlock, we tell you before dispatch, not after.',
      faqs: [
        {
          question: 'Will unlocking my car cause any damage?',
          answer: 'No. We use professional inflatable wedges and long-reach tools designed for the job, which is why we can work on modern vehicles without harming the door frame, glass, weather sealing, or the wiring and side-airbag components inside the door panel. The coat-hanger and slim-jim methods people try first are exactly what causes expensive damage on cars built in the last twenty years. We are insured, and we work damage-free.'
        },
        {
          question: 'Can you reach my car if it is in a condo garage on the Yonge corridor?',
          answer: 'Yes, but we need you to get us in. Unlike a boost or a tire change, a lockout means you are standing next to the car, so meet us at the lobby, the elevator, or the garage door. Let dispatch know the building, the parking level, and whether there is a concierge or a fob-only entry. We do these constantly between Sheppard and Finch — access is the only variable, and sorting it on the phone saves ten minutes on scene.'
        },
        {
          question: 'How fast can you get to me in North York?',
          answer: 'Typically 20-35 minutes from a stationed North York unit. Don Mills, Parkwoods, Victoria Village, and Henry Farm are usually fastest; Downsview, Humber Summit, and Jane & Finch are the long end. You get a live ETA on the call rather than a generic promise.'
        },
        {
          question: 'My child or pet is locked in the car — what do I do?',
          answer: 'Call 911 first, then call us at ' + PHONE_NUMBER + ' and say clearly that someone is inside the vehicle. We treat it as an emergency and roll the closest unit immediately rather than placing it in the normal queue. On a warm day a closed car heats up dangerously within minutes, so do not wait to see whether it resolves itself. Emergency services can also force entry if the situation deteriorates before anyone arrives.'
        },
        {
          question: 'Do you make new keys if mine are lost?',
          answer: 'No — we open locked vehicles, we do not cut or program keys. If your keys are inside the car, that is our job. If they are genuinely lost, stolen, or snapped off in the lock, you need an automotive locksmith who can cut and program a replacement transponder. We will tell you which one you need on the phone so you are not paying for a van that cannot solve your problem.'
        },
        {
          question: 'Do you need to see proof the car is mine?',
          answer: 'Yes, every time. Ownership, insurance, or a driver\'s licence matching the registration is standard before we open any vehicle. It takes a moment and it is the reason you should be uncomfortable with any service that does not ask — the same shortcut that gets you into your car quickly gets someone else into it just as quickly.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Car Lockout Service Scarborough | 24/7 Damage-Free Unlock — iFAST',
      seoDescription: 'Locked out in Scarborough? iFAST opens your car damage-free, 24/7, no membership — Agincourt, Malvern, STC, Kennedy. 15-25 min arrival. Call for a quote.',
      keywords: 'car lockout Scarborough, locked keys in car Scarborough, car unlock Scarborough, 24 hour lockout Scarborough, car lockout Agincourt, damage-free unlock Scarborough',
      h1: 'Car Lockout Service in Scarborough — 24/7 Damage-Free Unlock',
      intro: (
        <>
          <p className="mb-4">
            Keys sitting on the seat at Scarborough Town Centre, or locked in the car in your own Agincourt driveway? <strong>{COMPANY_NAME}</strong> comes to wherever you are and opens the car without a scratch. We dispatch from our home base at <strong>20 Antrim Crescent (M1P 4N3)</strong>, so Scarborough gets our fastest arrivals — typically <strong>15-25 minutes</strong>, any hour, day or night.
          </p>
          <p className="mb-4">
            Every unlock is done with damage-free tools — an air wedge plus a long-reach tool rated for modern door designs, never an old slim-jim that can tear the wiring inside the door. There's no membership to buy and nothing to sign up for; you pay only for the unlock. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_lockout_scarborough_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            As our home base, Scarborough gets the tightest lockout ETAs we run. The calls cluster where people park, lock up, and walk away — the big lots at Scarborough Town Centre, Agincourt Mall, the gym and community-centre parking (where locker-room key mix-ups happen), Kennedy Station, and residential driveways across Malvern, Woburn, and Cliffside.
          </p>
          <p className="mb-4">
            We work these jobs discreetly — no loud sirens, no tow-truck spectacle outside your building. Before we open anything, we check photo ID against the registration so no one but the owner walks away with the car. Most unlocks take only a few minutes once we arrive.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name behind our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who answers and does the work himself. For lockouts, customers lead with two things: fast arrival and a fair price.
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "Got locked out of my car and the guy was there in a flash and got it sorted out. Genuine rates as well." <strong>— Uddhav Reen, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, we guarantee a <strong>damage-free unlock</strong>, and there's no membership required — you call the one time you need us and pay only for the unlock.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before we dispatch — flat, with no hourly billing, no "difficulty surcharge" for a common vehicle, no after-hours premium, and no membership. Customers consistently call our rates fair. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'How fast can you reach me for a lockout in Scarborough?',
          answer: 'Typically 15-25 minutes anywhere in Scarborough, since we dispatch from 20 Antrim Crescent — our home base. Customers describe us arriving "fast" and "there in a flash." We give you a live ETA when you call rather than an optimistic guess.'
        },
        {
          question: 'Will unlocking my car damage the door or window?',
          answer: 'No. We use damage-free air-wedge and long-reach tools designed for modern vehicles — no old slim-jims, no broken glass, no torn weatherstripping. We\'re insured on every unlock, and if a car can\'t be opened safely without damage, we won\'t force it.'
        },
        {
          question: 'Do I need a membership, and what will it cost?',
          answer: 'No membership — you pay once, for the unlock. We give you the price on the call before we dispatch, with no hourly billing, no difficulty surcharge for a common vehicle, and no after-hours premium. Reviewers call our rates "fair" and "genuine." Call ' + PHONE_NUMBER + ' for a quote.'
        },
        {
          question: 'What if my child or pet is locked inside?',
          answer: 'Call 911 first if they\'re in any distress — heat, cold, or panic. Then call us and we dispatch immediately as priority and head straight to you while you\'re on with emergency services.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Car Lockout Service Pickering | 24/7 Damage-Free Unlock — iFAST',
      seoDescription: 'Locked out in Pickering? iFAST opens your car damage-free, 24/7, no membership — Bay Ridges, Town Centre, Pickering GO. 20-30 min arrival. Call for a quote.',
      keywords: 'car lockout Pickering, locked keys in car Pickering, car unlock Pickering, 24 hour lockout Pickering, Pickering GO lockout, damage-free unlock Pickering',
      h1: 'Car Lockout Service in Pickering — 24/7 Mobile Unlock',
      intro: (
        <>
          <p className="mb-4">
            Door swung shut with the keys still inside — at the Pickering GO lot, the Town Centre, or your own driveway in Amberlea? <strong>{COMPANY_NAME}</strong> comes to wherever you are and opens the car without a scratch, with a typical <strong>20-30 minute</strong> ETA across the city, 24/7. No membership, nothing to sign up for — you pay only for the unlock.
          </p>
          <p className="mb-4">
            We open it damage-free with an air wedge and a long-reach tool rated for modern door designs — no old slim-jims, no broken glass, no torn weatherstripping. Most unlocks take only a few minutes once we arrive. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_lockout_pickering_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering is commuter country, and the recurring lockout here is the morning rush — keys locked at the Pickering GO Station while the train pulls in. We get those same-address calls week after week and know how to work around transit flow to reach you fast. The Pickering Town Centre lots and the Frenchman's Bay trail parking are the other regular spots.
          </p>
          <p className="mb-4">
            Out in the neighborhoods — Bay Ridges, Liverpool, West Shore, Rosebank, Dunbarton — it's usually a fob locked in the car on a quick trip. Before we open anything, we check photo ID against the registration so no one but the owner walks away with the car. Quiet, discreet work, no tow-truck drama.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated, and the name behind our {GOOGLE_REVIEWS_COUNT} Google reviews is <strong>Safi</strong> — the owner-technician who answers and does the work himself. For lockouts, two customers said it best, and both led with the same thing:
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "Had myself locked out of my car, called this company arrived fast and fair price." <strong>— Heng Tho, verified Google review</strong>
          </p>
          <p className="mb-4">
            We're licensed and insured, we guarantee a <strong>damage-free unlock</strong>, and there's no membership — you call the one time you need us and pay only for the unlock.
          </p>
        </>
      ),
      priceNote: 'We give you the price up front on the call, before we dispatch — flat, with no hourly billing, no after-hours premium, no "difficulty surcharge," and no membership. Customers consistently call our rates fair and genuine. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'Can you unlock my car at the Pickering GO Station?',
          answer: 'Yes — it\'s one of our most common Pickering calls, especially during the morning commuter rush. We know the lot and how to reach you without holding up transit flow. We give you a live ETA when you call.'
        },
        {
          question: 'Will unlocking my car damage the door or window?',
          answer: 'No. We use damage-free air-wedge and long-reach tools designed for modern vehicles — no old slim-jims, no broken glass, no torn weatherstripping. We\'re insured on every unlock, and if a car can\'t be opened safely without damage, we won\'t force it.'
        },
        {
          question: 'Do I need a membership, and what will it cost?',
          answer: 'No membership — you pay once, for the unlock. We give you the price on the call before we dispatch, with no after-hours premium and no surcharge for a common vehicle. Reviewers describe our rates as "fair" and "genuine." Call ' + PHONE_NUMBER + ' for a quote.'
        },
        {
          question: 'What ID do you need before unlocking?',
          answer: 'Photo ID that matches the vehicle registration, or rental and corporate documents for those vehicles. It takes a moment and it protects you from anyone else ever claiming your car.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Car Lockout Service Ajax | 24/7 Damage-Free Unlock — iFAST Roadside',
      seoDescription: 'Locked out of your car in Ajax? 24/7 damage-free unlock across Harwood, Salem, Pickering Village, Ajax GO. 25-35 min arrival. Call iFAST.',
      keywords: 'car lockout Ajax, locked keys in car Ajax, car unlock Ajax, 24 hour lockout Ajax, Ajax GO lockout, lockout Harwood',
      h1: 'Car Lockout Service in Ajax — Mobile Unlock Across the City',
      intro: (
        <>
          <p className="mb-4">
            Stuck outside your car in Ajax? <strong>{COMPANY_NAME}</strong> dispatches mobile lockout service across Harwood, Salem, Pickering Village, Audley, and Westney with a typical <strong>25-35 minute</strong> ETA. We use damage-free unlock tools — airbag wedges and long-reach rods rated for modern vehicle doors.
          </p>
          <p className="mb-4">
            Most unlocks are complete in 5 minutes or less once we arrive. We'll verify you own the vehicle (ID + registration) before unlocking.
          </p>
          <InlineCall source="aj_lock_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Common Ajax lockout patterns: Ajax GO Station parking, Costco and Walmart plaza lots, the Ajax Downs area, residential driveways throughout Pickering Village and Salem, and the Harwood commercial corridor. Weekend afternoons are our heaviest Ajax lockout periods.
          </p>
          <p className="mb-4">
            If you're at a gas station or plaza and the car alarm is going off, we can usually disarm after unlocking — just stay with the vehicle until we arrive.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Ajax has a lot of newer-build subdivisions where remote-key fobs get accidentally locked inside during quick trips to the mailbox or garage. We see this pattern daily — usually a 5-minute unlock and you're back inside.
        </p>
      ),
      priceNote: 'Ajax lockout is flat-rate within our standard East GTA zone. Same price day or night.',
      faqs: [
        {
          question: 'How long does an Ajax unlock take after you arrive?',
          answer: 'Most unlocks are 2-5 minutes from arrival. Some newer high-security vehicles take 10-15, but we\'ll tell you on the phone if yours is one of them.'
        },
        {
          question: 'Can you help at Ajax GO Station?',
          answer: 'Yes. The Ajax GO commuter lot is a regular call location for us — no issues with transit security.'
        },
        {
          question: 'What if I also lost my key (not just locked it inside)?',
          answer: 'We can unlock the car for you to confirm the key is (or isn\'t) inside. If it\'s truly lost, you\'ll need a locksmith for a replacement — we can refer one.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Car Lockout Service Whitby & Brooklin | 24/7 Unlock — iFAST Roadside',
      seoDescription: 'Locked out of your car in Whitby or Brooklin? 24/7 damage-free unlock service. Port Whitby, Downtown, Thickson, Brooklin covered. 30-40 min arrival.',
      keywords: 'car lockout Whitby, locked keys in car Whitby, car unlock Whitby, lockout Brooklin, 24 hour lockout Whitby, Whitby GO lockout',
      h1: 'Car Lockout Service in Whitby — Mobile Unlock for Whitby & Brooklin',
      intro: (
        <>
          <p className="mb-4">
            Locked out of your car in Whitby or Brooklin? <strong>{COMPANY_NAME}</strong> runs mobile lockout service across the entire town with a typical <strong>30-40 minute</strong> ETA. Damage-free unlock tools (airbag wedges, long-reach rods) handle almost every sedan, SUV, and light truck on the road.
          </p>
          <p className="mb-4">
            Once we arrive, most unlocks are 5 minutes or less. We verify ownership before opening the door for your protection.
          </p>
          <InlineCall source="wh_lock_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Typical Whitby lockout calls: Whitby GO and Thickson GO commuter lots, the Thickson Road big-box plazas, downtown Whitby gym and restaurant parking, Port Whitby waterfront parking, and Brooklin residential driveways. We see a clear weekend spike at the commercial strips.
          </p>
          <p className="mb-4">
            Brooklin is a regular stop — we don't treat it as "out of zone" like some providers do. Expect 30-45 minute ETAs in Brooklin.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Brooklin residents are often told by other services that they're too far for mobile lockout. We cover Brooklin as standard — and we price it the same as central Whitby.
        </p>
      ),
      priceNote: 'Standard East GTA flat rate. Whitby and Brooklin are the same price — we don\'t bill "further from base" surcharges.',
      faqs: [
        {
          question: 'Do you service Brooklin for lockouts?',
          answer: 'Yes, every day. Brooklin lockout calls get a 30-45 minute ETA and our standard flat rate — no distance penalty.'
        },
        {
          question: 'What about commercial vehicles in Whitby industrial parks?',
          answer: 'We handle most light-commercial vehicles. For heavy trucks or very specialized vehicles, tell us the make/model/year on the call and we\'ll confirm before dispatch.'
        },
        {
          question: 'Is the price higher after midnight?',
          answer: 'No. Whitby lockouts are flat-rate 24/7 — same price at 3 AM as at 3 PM.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Car Lockout Service Oshawa | 24/7 Mobile Unlock — iFAST Roadside',
      seoDescription: '24/7 car lockout in Oshawa. Damage-free unlock across Downtown, Samac, Vanier, UOIT, Oshawa Centre. 35-50 min honest arrival. Call iFAST.',
      keywords: 'car lockout Oshawa, locked keys in car Oshawa, car unlock Oshawa, UOIT lockout, Durham College lockout, Oshawa Centre lockout',
      h1: 'Car Lockout Service in Oshawa — Honest ETA Mobile Unlock',
      intro: (
        <>
          <p className="mb-4">
            Locked out of your car in Oshawa? <strong>{COMPANY_NAME}</strong> dispatches mobile lockout service from Scarborough with an honest <strong>35-50 minute</strong> typical ETA. We'd rather tell you the real window than lowball it. Once we arrive, most Oshawa unlocks are complete in 5 minutes or less.
          </p>
          <p className="mb-4">
            Damage-free tools, ID verification before unlocking, no hourly billing — just a flat rate and transparent timing.
          </p>
          <InlineCall source="os_lock_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Common Oshawa lockout patterns: UOIT/Durham College student lots, Oshawa Centre parking, downtown Oshawa (King, Simcoe), the industrial zone near the GM complex, and Samac/Vanier residential driveways. Weekend nights bring heavy student lockout volume.
          </p>
          <p className="mb-4">
            For UOIT/Durham College students without backup rides, a mobile unlock is vastly faster and cheaper than a tow to a shop.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Students in Oshawa often face 2-3 hour waits with national roadside providers for a lockout. Our 35-50 min Oshawa ETA beats that, and our flat rate beats per-hour locksmith quotes.
        </p>
      ),
      priceNote: 'Oshawa has a small distance adjustment on our standard lockout rate. Quoted before dispatch — no surprises.',
      faqs: [
        {
          question: 'Do you really service Oshawa from Scarborough?',
          answer: 'Yes. Most Scarborough-based roadside teams refuse Oshawa calls. We do them routinely with honest 35-50 min ETAs.'
        },
        {
          question: 'Can you help at UOIT / Durham College?',
          answer: 'Yes. Student parking lots at UOIT North Campus and Durham College are regular service addresses. We\'ve worked with campus security before and have no issues.'
        },
        {
          question: 'What about Oshawa Centre mall parking lockouts?',
          answer: 'Common call. We\'ll coordinate with mall security on arrival and do the unlock without drama.'
        }
      ]
    }
  },

  /* =========================================================================
     FUEL DELIVERY
     ========================================================================= */
  'fuel': {
    'north-york': {
      seoTitle: 'Emergency Fuel Delivery North York | Out of Gas 24/7 — iFAST',
      seoDescription: 'Out of gas in North York? We bring fuel to you on the 401, 404, DVP, Allen Road, or in any lot — Willowdale, Don Mills, Downsview. 20-35 min, 24/7. Call now.',
      keywords: 'fuel delivery North York, out of gas North York, emergency gas delivery North York, ran out of gas 401 North York, gas delivery Willowdale, fuel delivery Downsview, out of fuel DVP',
      h1: 'Emergency Fuel Delivery in North York — 24/7',
      intro: (
        <>
          <p className="mb-4">
            Running dry in North York is rarely about forgetting to fill up — it is about the gauge being optimistic and the traffic being worse than expected. <strong>{COMPANY_NAME}</strong> brings fuel to wherever you have stopped, typically in <strong>20-35 minutes</strong> from a unit stationed in the district, 24 hours a day. We deliver enough to get you moving and to the nearest station comfortably.
          </p>
          <p className="mb-4">
            Gasoline and diesel both, in approved containers. Tell us the fuel type when you call — putting the wrong one in is a far more expensive problem than the one you started with. <strong>Call {PHONE_NUMBER} and we will quote you before we roll.</strong>
          </p>
          <InlineCall source="service_city_fuel_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The 401 through North York is where most of these calls originate, and the geometry is the problem: on the collector-express split near Yonge and Allen Road, a car that runs dry can end up stopped between two live traffic streams with no usable shoulder. Allen Road is similar for much of its length. We arrive with high-visibility strobes and cones and secure the scene before opening a fuel container, and on the most exposed stops we will recommend a tow to a safe spot rather than a roadside fill.
          </p>
          <p className="mb-4">
            The rest are straightforward — the DVP approach at Don Mills, the 404 north of Sheppard, and the ordinary residential and commercial stops across Willowdale, Bayview Village, Downsview, and the Jane & Finch corridor. Underground garages are the one place we cannot deliver fuel: containers and enclosed parking do not mix, and no reputable operator will do it. If your car is dry on P2, the fix is a tow up to street level.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            One thing worth knowing before you call anyone: if your car ran dry and then would not restart after refuelling, that is often not a fuel problem any more. Running a tank completely empty can pull debris into the fuel filter or leave air in the line, and diesels in particular usually need bleeding before they will catch. We carry what is needed to deal with that on-site rather than filling your tank, wishing you luck, and leaving you with a car that still will not start.
          </p>
          <p className="mb-4">
            {COMPANY_NAME} is owner-operated and insured. <strong>Safi</strong> answers the phone and does the work, and you get the price before the van moves.
          </p>
        </>
      ),
      priceNote: 'Fuel delivery is quoted on the call — the service fee plus the fuel itself, stated before we dispatch. No "out of zone" surcharge for North York and no overnight premium.',
      faqs: [
        {
          question: 'How much fuel do you bring?',
          answer: 'Enough to get you running and comfortably to the nearest station — typically around 10 to 20 litres depending on the vehicle. We are not a mobile filling station; the goal is to get you off the shoulder and back in control. Tell us the vehicle and fuel type on the call and we will confirm exactly what we are bringing and what it costs.'
        },
        {
          question: 'Do you deliver diesel as well as gasoline?',
          answer: 'Yes, both, in approved containers. Please be certain which one your vehicle takes before we arrive — misfuelling is a genuinely expensive repair, far worse than the empty tank. If you are not sure, the fuel type is usually printed inside the filler flap and we can check it with you on the phone.'
        },
        {
          question: 'Can you deliver fuel to my condo parking garage?',
          answer: 'No, and you should be wary of anyone who says yes. Transporting and dispensing fuel containers inside enclosed underground parking is a fire risk and is not something any reputable operator will do. If your car is out of fuel in a garage, the correct fix is a short tow to street level, and we can handle that instead.'
        },
        {
          question: 'My car will not start even after adding fuel — why?',
          answer: 'Running a tank completely empty can draw sediment from the bottom of the tank into the fuel filter, and it leaves air in the fuel line. Diesel engines almost always need the system bled before they will restart. It is a common outcome and we come prepared for it, so we can usually resolve it on the same visit rather than leaving you with a full tank and a car that still will not run.'
        },
        {
          question: 'I ran out on the 401 — what should I do while I wait?',
          answer: 'Get as far right as you safely can, hazards on, and stay in the vehicle with your seatbelt fastened. Standing outside the car on a 401 shoulder is far more dangerous than sitting in it. Call us with your nearest exit or landmark and direction of travel. We arrive with strobes and cones and secure the scene first. If your stop is somewhere genuinely unsafe to work — the collector-express split, or Allen Road with no shoulder — we will tell you and recommend a tow instead.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Fuel Delivery Scarborough | 24/7 Emergency Gas Delivery — iFAST',
      seoDescription: 'Ran out of gas in Scarborough? 24/7 emergency fuel delivery across Agincourt, Malvern, Woburn, and the 401. 15-25 min arrival. Call iFAST.',
      keywords: 'fuel delivery Scarborough, emergency gas delivery Scarborough, out of gas Scarborough, 401 fuel delivery, gas delivery Agincourt, diesel delivery Scarborough',
      h1: 'Emergency Fuel Delivery in Scarborough — 24/7 Gas & Diesel',
      intro: (
        <>
          <p className="mb-4">
            Ran out of gas in Scarborough? <strong>{COMPANY_NAME}</strong> delivers regular, premium, or diesel fuel to your location — driveway, parking lot, highway shoulder — with a typical <strong>15-25 minute</strong> ETA across the city. Standard delivery is up to 5 gallons (about 19 liters), enough to get you to the nearest station and keep going.
          </p>
          <p className="mb-4">
            We bring approved transport containers and hand the fuel over safely. No need to walk to a gas station with a red jug — and no risk of fueling from a container that wasn't built for it.
          </p>
          <InlineCall source="sc_fuel_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Scarborough fuel delivery calls cluster on the 401 (especially the long stretch eastbound from the DVP to Kennedy), in driveways where cars ran dry after last night's drive, and in parking lots where someone misjudged reserves. We reach the 401 shoulder fastest — within 20 minutes during normal traffic.
          </p>
          <p className="mb-4">
            Cold weather drops your fuel gauge accuracy — winter miscalculations are the #1 cause of our Scarborough out-of-gas calls December through February.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We deliver diesel too — Scarborough has a lot of pickup trucks and work vans that run dry far from a diesel pump. We carry both fuels on the van.
        </p>
      ),
      priceNote: 'Scarborough fuel delivery: flat service fee plus fuel at market-plus markup. Quoted before dispatch.',
      faqs: [
        {
          question: 'How much fuel do you deliver?',
          answer: 'Standard delivery is up to 5 gallons (about 19 liters). We can arrange larger quantities for fleet calls with advance notice.'
        },
        {
          question: 'Do you deliver diesel in Scarborough?',
          answer: 'Yes. Diesel delivery is one of our regular Scarborough calls — pickup trucks, work vans, sprinters. Tell us when you call so we send the right van.'
        },
        {
          question: 'Is it safe to deliver fuel on the 401?',
          answer: 'Yes — we deploy cones and high-viz strobes before approaching the vehicle, then deliver fuel with approved transport containers. Highway delivery is faster and safer than walking to a gas station.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Emergency Fuel Delivery Pickering | 24/7 Out of Gas Help — iFAST',
      seoDescription: 'Out of gas in Pickering? iFAST brings fuel to your driveway or the 401 shoulder, 24/7 — Bay Ridges, Brock Rd, Whites Rd. Cheaper than a tow. Call for a quote.',
      keywords: 'fuel delivery Pickering, emergency gas delivery Pickering, out of gas Pickering, 401 fuel delivery Pickering, diesel delivery Pickering, ran out of gas Pickering',
      h1: 'Emergency Fuel Delivery in Pickering — 24/7 Gas & Diesel',
      intro: (
        <>
          <p className="mb-4">
            Coasting onto the shoulder in Pickering with a dead tank? <strong>{COMPANY_NAME}</strong> brings fuel directly to you — on the 401 shoulder, in a parking lot, or in your driveway — so you don't have to walk a busy road with a jerry can or pay for a tow you don't need. Tell us regular, premium, or diesel and we'll confirm it on the call. Our typical Pickering ETA is <strong>20-30 minutes</strong>, 24/7.
          </p>
          <p className="mb-4">
            We arrive with sealed, approved fuel containers and deliver enough to comfortably reach the nearest open station — the goal is to get you moving, not to fill the tank on the shoulder. On a highway shoulder, the technician sets high-viz strobes and cones first. It's almost always faster and cheaper than waiting on a flatbed. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
          </p>
          <InlineCall source="service_city_fuel_pickering_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The classic Pickering out-of-gas call is a commuter on the 401 eastbound who passes the last convenient station and runs dry on the long stretch toward the Brock Road and Whites Road exits. We get those highway-shoulder calls first because the safety risk is highest there, arriving with strobes and cones before anything else.
          </p>
          <p className="mb-4">
            The other regular spots are Brock Road and Bayly Street commuter routes, Kingston Road late at night when nearby pumps have closed, and driveways across Bay Ridges, Amberlea, and Liverpool where a daily driver was run down to fumes overnight. For diesel that ran completely dry, the technician helps prime the line so the engine restarts cleanly instead of just cranking on air.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            We'll be straight with you: the reviews below are general {COMPANY_NAME} reviews, not fuel-delivery reviews specifically. Drivers who've called us for tires, batteries, and lockouts describe the same way we operate — fast, fair, and professional — and that's exactly how a fuel call runs too. The owner-technician, <strong>Safi</strong>, is the name behind our {GOOGLE_REVIEWS_COUNT} Google reviews.
          </p>
          <p className="mb-4 border-l-4 border-brand-yellow pl-4 italic text-gray-700">
            "Excellent service! Fast response time, professional staff, and very reasonable pricing. They arrived quickly and helped me get back on the road without any hassle." <strong>— fazlollah masror, verified Google review</strong>
          </p>
          <p className="mb-4">
            On a fuel call, what we can promise for real is what those reviews describe: a fast response with a live ETA, an all-in price before we roll, shoulder-safe delivery with strobes and cones, and gas or diesel confirmed on the call. We're licensed, insured, and highway-shoulder authorized.
          </p>
        </>
      ),
      priceNote: 'We give you the all-in price up front on the call, before we dispatch — no hidden distance or after-hours fees, and no out-of-zone surcharge in Pickering. The amount of fuel is set by design: enough to comfortably reach the nearest open station. Call for a fast, no-obligation quote.',
      faqs: [
        {
          question: 'How much fuel do you bring to a Pickering call?',
          answer: 'Enough to comfortably reach the nearest open station — the goal is to get you moving, not to fill the tank on the shoulder. If you know the nearest station is unusually far, tell dispatch and we\'ll bring extra.'
        },
        {
          question: 'Can you deliver on the 401 shoulder in Pickering?',
          answer: 'Yes — we\'re set up for shoulder delivery on the major East GTA corridors, including the 401 and 407 through Pickering. We arrive with high-viz strobes and cones and secure the scene before delivering. Call as soon as you\'ve pulled over safely.'
        },
        {
          question: 'Gas and diesel both?',
          answer: 'Yes. Tell dispatch which one you need when you call. For diesel that ran completely dry, the technician primes the fuel line after delivery so the engine restarts cleanly.'
        },
        {
          question: 'What does fuel delivery cost in Pickering, and is it cheaper than a tow?',
          answer: 'We give you the all-in number on the call before we dispatch — the delivery and the fuel itself — with no hidden fees. It\'s almost always cheaper than a tow to a station, since you drive yourself out instead of paying for a flatbed. Call ' + PHONE_NUMBER + ' for a quick quote.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Fuel Delivery Ajax | 24/7 Emergency Gas — iFAST Roadside',
      seoDescription: 'Out of gas in Ajax? 24/7 mobile fuel delivery across Harwood, Salem, Pickering Village, Ajax GO. 25-35 min arrival. Regular, premium, and diesel.',
      keywords: 'fuel delivery Ajax, emergency gas delivery Ajax, out of gas Ajax, 401 fuel delivery Ajax, diesel delivery Ajax',
      h1: 'Emergency Fuel Delivery in Ajax — 24/7 Gas & Diesel',
      intro: (
        <>
          <p className="mb-4">
            Out of gas in Ajax? <strong>{COMPANY_NAME}</strong> rolls mobile fuel delivery across Ajax 24/7 — Harwood, Salem, Pickering Village, Audley, Westney — with a typical <strong>25-35 minute</strong> ETA. Regular, premium, or diesel, up to 5 gallons standard, more on request.
          </p>
          <p className="mb-4">
            Approved transport containers, safe fueling procedures, no red-jug improvisation. You get enough to reach the nearest station and carry on.
          </p>
          <InlineCall source="aj_fuel_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Ajax fuel calls cluster on the 401 around Westney and Salem exits, the Bayly/Kingston commuter corridors, and the Ajax Downs / Ajax GO parking areas. We also get subdivision driveway calls where a daily-driver just ran the tank flat overnight.
          </p>
          <p className="mb-4">
            North Ajax routes (Salem north of Rossland, Audley) are our fastest thanks to van positioning during rush hours.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Ajax has a surprisingly limited number of 24/7 gas stations — so a car running dry after midnight often can't just be "walked to the nearest pump." Our mobile delivery solves that gap.
        </p>
      ),
      priceNote: 'Flat East GTA service fee plus fuel at market-plus. Quoted before dispatch.',
      faqs: [
        {
          question: 'What fuels do you deliver in Ajax?',
          answer: 'Regular (87), premium (91-94), and diesel. Specify when you call.'
        },
        {
          question: 'How much gas comes with a standard delivery?',
          answer: 'Up to 5 gallons (~19L). That\'s typically enough for 40-70 km of driving — well beyond any Ajax gas station.'
        },
        {
          question: 'Can you deliver to the Ajax GO parking lot?',
          answer: 'Yes — Ajax GO is a regular delivery point, particularly for commuters who realize they\'re empty on the way out.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Fuel Delivery Whitby & Brooklin | 24/7 Emergency Gas — iFAST',
      seoDescription: '24/7 fuel delivery in Whitby and Brooklin. Regular, premium, or diesel across Port Whitby, Downtown, Thickson, Brooklin, and 401/412. 30-40 min arrival.',
      keywords: 'fuel delivery Whitby, emergency gas delivery Whitby, out of gas Whitby, fuel delivery Brooklin, 412 fuel delivery, diesel delivery Whitby',
      h1: 'Emergency Fuel Delivery in Whitby — 24/7 Across Town & Brooklin',
      intro: (
        <>
          <p className="mb-4">
            Stranded without fuel in Whitby or Brooklin? <strong>{COMPANY_NAME}</strong> delivers gas or diesel to your location 24/7 with a typical <strong>30-40 minute</strong> ETA. Standard drop is 5 gallons (~19L), enough to reach the nearest Whitby pump with plenty of margin.
          </p>
          <p className="mb-4">
            We use approved transport containers, deploy safety cones at roadside calls, and quote the total cost before we roll.
          </p>
          <InlineCall source="wh_fuel_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Most common Whitby fuel delivery spots: the 412 shoulder (both directions), the 401 through Thickson and Brock, downtown Whitby's older streets, Port Whitby waterfront parking, and Brooklin residential/commercial streets. The 412 is our #1 Whitby fuel-call location.
          </p>
          <p className="mb-4">
            Brooklin has limited 24-hour gas availability, which is why we see regular overnight calls from Baldwin and Winchester.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          The 412 has very few exit-points between the 401 and 407 — so running dry there often means you can't walk to a station. Mobile delivery is the practical fix.
        </p>
      ),
      priceNote: 'Flat East GTA service fee plus fuel cost. Same price for Whitby-central and Brooklin.',
      faqs: [
        {
          question: 'Can you deliver fuel on the 412 near Whitby?',
          answer: 'Yes — the 412 is a regular service route for us. Safety cones and strobes deployed before we approach the vehicle.'
        },
        {
          question: 'Do you deliver to Brooklin?',
          answer: 'Yes, as a standard service — no distance surcharge. Expect 30-45 minutes from call to arrival.'
        },
        {
          question: 'Can I get diesel delivered?',
          answer: 'Yes. We carry both gas and diesel. Confirm the fuel type on the phone.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Fuel Delivery Oshawa | 24/7 Emergency Gas — iFAST Roadside',
      seoDescription: 'Out of gas in Oshawa? 24/7 mobile fuel delivery across Downtown, Samac, UOIT, Oshawa Centre, and 401. 35-50 min honest arrival. Call iFAST.',
      keywords: 'fuel delivery Oshawa, emergency gas delivery Oshawa, out of gas Oshawa, 401 fuel delivery Oshawa, UOIT fuel delivery, diesel delivery Oshawa',
      h1: 'Emergency Fuel Delivery in Oshawa — Honest ETAs, 24/7',
      intro: (
        <>
          <p className="mb-4">
            Ran dry in Oshawa? <strong>{COMPANY_NAME}</strong> dispatches mobile fuel delivery from Scarborough with an honest <strong>35-50 minute</strong> ETA. Regular, premium, or diesel — up to 5 gallons standard — at your driveway, parking lot, or highway shoulder.
          </p>
          <p className="mb-4">
            Approved transport containers, safe fueling, and a quoted total before we roll. No "arrived, now I see the price" games.
          </p>
          <InlineCall source="os_fuel_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Typical Oshawa fuel calls: 401 westbound near Thornton and Park Road, downtown Oshawa around King and Simcoe, UOIT / Durham College student parking, the Oshawa Centre area, and industrial zones near the GM complex. Winter commuter miscalculations are the #1 driver of Oshawa out-of-gas calls.
          </p>
          <p className="mb-4">
            If you're heading east past Oshawa (toward Bowmanville), our 35-50 min ETA may be longer — we'll tell you that honestly before we dispatch.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Students running on fumes between classes and part-time jobs are frequent Oshawa callers. We prioritize UOIT/Durham College calls to keep class schedules intact.
        </p>
      ),
      priceNote: 'Oshawa has a small distance adjustment on the standard fuel service fee. Quoted upfront.',
      faqs: [
        {
          question: 'Do you service past Oshawa (Bowmanville, Courtice)?',
          answer: 'Occasionally — call and we\'ll tell you an honest ETA. It\'s usually 60+ minutes east of Oshawa, which is often longer than waiting for a CAA tow.'
        },
        {
          question: 'What about UOIT or Durham College fuel calls?',
          answer: 'Yes, regular service area. We\'ll find you in the right student lot and get you moving.'
        },
        {
          question: 'Gas or diesel?',
          answer: 'Both. Specify on the call so we bring the correct fuel.'
        }
      ]
    }
  },

  /* =========================================================================
     EMERGENCY TOWING
     ========================================================================= */
  'towing': {
    'north-york': {
      seoTitle: 'Towing North York | 24/7 Flatbed Tow Truck Service — iFAST',
      seoDescription: 'Need a tow in North York? 24/7 flatbed towing from the 401, 404, DVP, Allen Road, and condo garages. Willowdale, Don Mills, Downsview. Quoted before dispatch.',
      keywords: 'towing North York, tow truck North York, flatbed towing North York, 24 hour towing North York, emergency tow Willowdale, tow truck Downsview, accident tow North York, 401 towing North York',
      h1: 'Towing in North York — 24/7 Flatbed Service',
      intro: (
        <>
          <p className="mb-4">
            Some jobs cannot be fixed where the car sits. A seized engine, a snapped belt, a wheel that will not turn, an accident, or a stop somewhere too dangerous to work — those need a tow. <strong>{COMPANY_NAME}</strong> runs flatbed towing across North York 24 hours a day, quoted before dispatch so you know the cost before you commit.
          </p>
          <p className="mb-4">
            Flatbed rather than hook-and-chain matters more than most people realise: all-wheel-drive vehicles, lowered cars, and EVs can be damaged by a tow that leaves two wheels on the road. On a flatbed the car does not roll at all. <strong>Call {PHONE_NUMBER} with your location and destination for a quote.</strong>
          </p>
          <InlineCall source="service_city_towing_north-york_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            The 401 through North York is the busiest and widest stretch of highway in the country, and the collector-express split near Yonge and Allen Road is where the difficult calls happen. A disabled car on the wrong side of that split has no usable shoulder and no safe refuge, and it is the one situation where we will push a tow over a roadside repair even when the mechanical fault is minor. The same applies to Allen Road, where there is effectively nowhere to stand.
          </p>
          <p className="mb-4">
            The other North York specific is the condo garage. A flatbed cannot go down to P3 — no flatbed can. If your car needs to come out of an underground garage, that is a winch-and-dolly job to street level first and then a flatbed from there, and it takes longer and costs more than a street-level tow. We would rather explain that on the phone than surprise you with it on the invoice. Tell dispatch the building and level and we will quote the real job.
          </p>
        </>
      ),
      uniqueAngle: (
        <>
          <p className="mb-4">
            Towing is the corner of this trade with the worst reputation, and it is earned. The pattern is a low quote on the phone, then charges for hookup, mileage, after-hours, and storage that appear once the car is already on the truck and you have no leverage. We quote the full job before dispatch — hookup and distance to your stated destination in one number.
          </p>
          <p className="mb-4">
            We will also tell you when you do not need us. A large share of the cars we are called to tow can be fixed on the spot for a fraction of the cost, and because we run a full roadside and mobile mechanic operation rather than only trucks, we have no incentive to put a car on a flatbed that could have been back on the road in twenty minutes. {COMPANY_NAME} is owner-operated and insured — <strong>Safi</strong> answers the phone.
          </p>
        </>
      ),
      priceNote: 'Quoted before dispatch — hookup plus distance to your destination in a single number, not a low starting figure with charges added later. No after-hours premium. A tow out of an underground garage costs more than a street-level tow because it is a genuinely different job, and we tell you that on the call rather than on the bill.',
      faqs: [
        {
          question: 'Can you tow my car out of an underground condo garage?',
          answer: 'Yes, but it is a two-stage job and worth understanding before you book. No flatbed can drive down to P2 or P3 — the clearance does not exist. We winch and dolly the vehicle up to street level, then load it onto the flatbed there. It takes longer and costs more than a street-level tow. Tell dispatch the building and parking level when you call and we will quote the actual job rather than a number that changes when we arrive.'
        },
        {
          question: 'Do you use a flatbed or a hook-and-chain truck?',
          answer: 'Flatbed. On a flatbed the vehicle is fully off the ground and nothing rotates, which matters for all-wheel-drive vehicles, lowered or performance cars, and EVs — all of which can suffer real drivetrain damage from a tow that leaves two wheels turning on the road. It is also the right choice for accident-damaged vehicles where the suspension or steering may not be intact.'
        },
        {
          question: 'How much does a tow in North York cost?',
          answer: 'It depends on distance and where the car is, which is why we quote it on the call before dispatching rather than after loading. You will get hookup and mileage to your stated destination as one figure. What we will not do is quote low on the phone and add hookup, after-hours, and storage charges once your car is already on the truck — that practice is the reason this trade has the reputation it does.'
        },
        {
          question: 'Where will you tow my car to?',
          answer: 'Wherever you want it — your home, your own mechanic, a dealership, or a body shop. It is your vehicle and your choice. Be cautious with any tow operator who insists on taking your car to a specific yard or shop they happen to recommend, particularly after an accident; that arrangement rarely exists for your benefit. Tell us the destination when you call and it goes into the quote.'
        },
        {
          question: 'Do I actually need a tow, or can it be fixed on the spot?',
          answer: 'Often it can be fixed on the spot. Dead batteries, flat tires, lockouts, out-of-fuel, and a fair range of mechanical faults are roadside jobs. Because we run roadside service and mobile mechanic work alongside the trucks, we have no reason to tow something we could repair. Describe the symptoms on the call and we will tell you honestly which one it is — a tow is the answer when the car genuinely cannot be driven or where it stopped is too dangerous to work.'
        }
      ]
    },
    scarborough: {
      seoTitle: 'Emergency Towing Scarborough | 24/7 Flatbed Tow Service — iFAST',
      seoDescription: '24/7 emergency towing in Scarborough. Flatbed tows across the 401, Kingston Rd, Agincourt, Malvern. Fast dispatch, honest pricing. Call iFAST.',
      keywords: 'towing Scarborough, emergency towing Scarborough, flatbed tow Scarborough, 401 towing Scarborough, 24 hour towing Scarborough, accident tow Scarborough',
      h1: 'Emergency Towing in Scarborough — 24/7 Flatbed Service',
      intro: (
        <>
          <p className="mb-4">
            Need your car towed in Scarborough? <strong>{COMPANY_NAME}</strong> dispatches flatbed tow trucks 24/7 with a typical <strong>20-30 minute</strong> ETA across the city. Flatbed (not hook-and-chain) means your vehicle is carried — safer for AWD, EVs, low-clearance cars, and collision damage.
          </p>
          <p className="mb-4">
            We tow accidents, breakdowns, impounds, repossessions, and relocations. Honest pricing quoted before the truck rolls — no surprise fees when we arrive.
          </p>
          <InlineCall source="sc_tow_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Scarborough tow patterns: 401 collision scenes (Markham Road area is our #1 hotspot), Kingston Road rear-ends, residential breakdowns needing tows to a local shop, and recoveries from parking garages and plaza lots. We know the local shops that handle most makes — we can deliver directly.
          </p>
          <p className="mb-4">
            For collision tows on the 401, we coordinate with police traffic and work inside their scene-management protocols. For driveway tows, we're in and out in 10-15 minutes.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Flatbed-only for all Scarborough tows. We don't use hook-and-chain on any passenger vehicle — too much risk of drivetrain damage, particularly for AWD cars common in Agincourt and Malvern.
        </p>
      ),
      priceNote: 'Flat Scarborough tow rate for hook-up, plus per-km beyond the first 10 km. Quoted before dispatch.',
      faqs: [
        {
          question: 'Do you tow to any shop or only certain ones?',
          answer: 'Your car, your choice. We deliver to any shop in Scarborough or beyond. We can also recommend shops we regularly work with if you don\'t have a preference.'
        },
        {
          question: 'Can you tow after a collision on the 401?',
          answer: 'Yes. Collision tows are a core service. We coordinate with police and insurance, tow to your shop or insurer\'s preferred shop, and provide documentation for your claim.'
        },
        {
          question: 'Is flatbed safe for my AWD car?',
          answer: 'Yes — flatbed is the only safe method for AWD. Hook-and-chain (lifting just one axle) can damage the transfer case. We flatbed every passenger vehicle as a rule.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Emergency Towing Pickering | 24/7 Flatbed Tow — iFAST Roadside',
      seoDescription: '24/7 emergency towing in Pickering. Flatbed tows across the 401, Bay Ridges, Pickering GO, Liverpool Rd. Fast dispatch, honest pricing.',
      keywords: 'towing Pickering, emergency towing Pickering, flatbed tow Pickering, 401 towing Pickering, 24 hour towing Pickering, accident tow Pickering',
      h1: 'Emergency Towing in Pickering — 24/7 Flatbed Dispatch',
      intro: (
        <>
          <p className="mb-4">
            Need a tow in Pickering? <strong>{COMPANY_NAME}</strong> dispatches flatbed tow trucks 24/7 with a typical <strong>25-35 minute</strong> ETA. Flatbed means your vehicle rides on the deck — safer for AWD, EVs, low-clearance sports cars, and anything with collision damage.
          </p>
          <p className="mb-4">
            Accident tows, breakdowns, impound moves, repossessions, and general relocations — we handle all of them with honest upfront pricing.
          </p>
          <InlineCall source="pk_tow_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering tow hotspots: 401 eastbound shoulder (Whites to Brock), the Pickering Town Centre parking lots, Bay Ridges waterfront during summer breakdowns, and Liverpool/Brock Road commercial zones. Collision tows cluster at the 401 onramps.
          </p>
          <p className="mb-4">
            If you need a tow to a shop in Scarborough or Oshawa, we handle it — rate quoted per distance before we roll.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Pickering has a growing EV population — Model 3s, Y, Mach-Es, Ioniq 5s — and all of them require flatbed-only towing. Our default flatbed policy is the right fit for the city.
        </p>
      ),
      priceNote: 'Flat tow rate plus per-km past 10 km. Same price regardless of time of day.',
      faqs: [
        {
          question: 'Can you tow a Tesla in Pickering?',
          answer: 'Yes. All Teslas must be flatbed-towed (putting them into transport mode first). Our flatbed trucks and trained drivers handle this routinely.'
        },
        {
          question: 'Do you do impound / police tows?',
          answer: 'We handle private impound and repossession work on instruction from the registered owner or authorized agent. We don\'t do police-contracted scene tows.'
        },
        {
          question: 'How far can you tow from Pickering?',
          answer: 'Anywhere — we\'ve done Pickering-to-downtown-Toronto, Pickering-to-Oshawa, and longer hauls. Rate is per km beyond the first 10 km.'
        }
      ]
    },
    ajax: {
      seoTitle: 'Emergency Towing Ajax | 24/7 Flatbed Tow Service — iFAST',
      seoDescription: '24/7 emergency towing in Ajax. Flatbed tows across Harwood, Salem, Audley, 401 corridor. Fast dispatch, honest pricing. Call iFAST.',
      keywords: 'towing Ajax, emergency towing Ajax, flatbed tow Ajax, 401 towing Ajax, 24 hour towing Ajax, accident tow Ajax',
      h1: 'Emergency Towing in Ajax — 24/7 Flatbed Service',
      intro: (
        <>
          <p className="mb-4">
            Need a tow in Ajax? <strong>{COMPANY_NAME}</strong> dispatches flatbed trucks 24/7 with a typical <strong>30-40 minute</strong> ETA across Harwood, Salem, Audley, Pickering Village, and Westney. Flatbed only — no hook-and-chain damage to your drivetrain.
          </p>
          <p className="mb-4">
            Collisions, breakdowns, impounds, relocations — all with upfront pricing.
          </p>
          <InlineCall source="aj_tow_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Ajax tow patterns: 401 eastbound at Westney and Salem exits (regular collision spots), the Bayly/Kingston corridors for breakdown tows, and subdivision calls for non-starters needing a ride to a shop. Ajax Downs and the GO station lots generate occasional tow work.
          </p>
          <p className="mb-4">
            We deliver to any shop — Ajax, Pickering, Whitby, Oshawa, or Scarborough — at a transparent per-km rate past the first 10 km.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Many Ajax residents don\'t have a home-base mechanic, so they need a tow destination recommendation. We\'ll suggest shops we trust in Ajax or nearby without pressure to pick one.
        </p>
      ),
      priceNote: 'Flat hookup fee plus per-km past 10 km. Same rate day or night.',
      faqs: [
        {
          question: 'Can you tow my broken-down car from an Ajax driveway?',
          answer: 'Yes. Driveway pickups are routine — tell us the destination shop and we\'ll quote the full price before we arrive.'
        },
        {
          question: 'What if I\'ve been in a collision on the 401 in Ajax?',
          answer: 'Call us after police/ambulance as needed. We\'ll arrive, coordinate with on-scene officers, and tow to your shop or insurer\'s preferred location.'
        },
        {
          question: 'How far can you tow me from Ajax?',
          answer: 'Anywhere. We routinely tow to Scarborough, downtown Toronto, or east into Durham. Long hauls quoted before dispatch.'
        }
      ]
    },
    whitby: {
      seoTitle: 'Emergency Towing Whitby & Brooklin | 24/7 Flatbed Tow — iFAST',
      seoDescription: '24/7 flatbed towing in Whitby and Brooklin. Accident tows, breakdowns, relocations across 401, 407, 412. Honest pricing. Call iFAST.',
      keywords: 'towing Whitby, emergency towing Whitby, flatbed tow Whitby, towing Brooklin, 412 towing, 407 towing Whitby, accident tow Whitby',
      h1: 'Emergency Towing in Whitby — Flatbed for Whitby, Brooklin, and the 412',
      intro: (
        <>
          <p className="mb-4">
            Need a flatbed tow in Whitby or Brooklin? <strong>{COMPANY_NAME}</strong> dispatches 24/7 across the entire town with a typical <strong>35-45 minute</strong> ETA. We cover the 401, 407, and 412 corridors — the 412 especially sees regular breakdown and collision work.
          </p>
          <p className="mb-4">
            Flatbed transport is the only safe method for AWD, EVs, sports cars, and collision-damaged vehicles. That's our default.
          </p>
          <InlineCall source="wh_tow_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Whitby tow hotspots: the 412 shoulder (both directions — a new highway that still sees breakdowns from debris and collisions), 401 westbound at Brock and Thickson, downtown Whitby for older-vehicle no-starts, and Brooklin driveway pickups. We also handle Port Whitby marina area calls.
          </p>
          <p className="mb-4">
            For Brooklin residents, we don\'t charge extra for the distance — same hookup rate as central Whitby.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          The 412 has limited merge/exit points, so a breakdown there usually needs a tow. We stage resources with that in mind — we're faster on the 412 than providers dispatching from Pickering or Toronto.
        </p>
      ),
      priceNote: 'Same rate for Whitby and Brooklin. Flat hookup fee plus per-km past 10 km.',
      faqs: [
        {
          question: 'Can you tow from the 412 in Whitby?',
          answer: 'Yes — the 412 is a regular route for us. We deploy proper safety equipment and have recovered dozens of breakdowns and collision vehicles from that highway.'
        },
        {
          question: 'Do you tow to Brooklin or only from it?',
          answer: 'Both directions. We\'ll tow into Brooklin (to home or shop) or out to anywhere in the East GTA.'
        },
        {
          question: 'Can you tow a motorhome or oversized vehicle?',
          answer: 'Light trucks and small RVs, yes. Full-size motorhomes or Class A RVs are usually beyond our standard flatbed capacity — call and describe the vehicle and we\'ll tell you honestly.'
        }
      ]
    },
    oshawa: {
      seoTitle: 'Emergency Towing Oshawa | 24/7 Flatbed Tow Service — iFAST',
      seoDescription: '24/7 flatbed towing in Oshawa. Accident tows, breakdowns, relocations across 401, 407, 412, UOIT, Downtown. 40-60 min honest arrival.',
      keywords: 'towing Oshawa, emergency towing Oshawa, flatbed tow Oshawa, 401 towing Oshawa, 24 hour towing Oshawa, UOIT tow, accident tow Oshawa',
      h1: 'Emergency Towing in Oshawa — Honest-ETA Flatbed Service',
      intro: (
        <>
          <p className="mb-4">
            Need a tow in Oshawa? <strong>{COMPANY_NAME}</strong> dispatches flatbed trucks from Scarborough with an honest <strong>40-60 minute</strong> typical ETA — longer than our closer cities because it's a real drive, but we tell you upfront instead of lowballing.
          </p>
          <p className="mb-4">
            Accidents, breakdowns, impounds, relocations. Flatbed-only, honest pricing, no "surprise fees" when we arrive.
          </p>
          <InlineCall source="os_tow_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Oshawa tow hotspots: the 401 both directions around Thornton, Stevenson, and Harmony; the 407/412 interchange; downtown Oshawa for no-starts and aged vehicle recoveries; UOIT/Durham College student-vehicle tows; and the industrial zones around the former GM plant.
          </p>
          <p className="mb-4">
            For same-day tow-to-shop in Oshawa, we can deliver to most local mechanics. We'll recommend one if you don't have a preference.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Most Scarborough-based tow operators refuse Oshawa. We do it, with honest timing. Our trucks roll knowing the real drive time and we\'ll route through Taunton or Rossland if 401 traffic is brutal.
        </p>
      ),
      priceNote: 'Oshawa tow has a distance adjustment on top of the standard hookup fee. Quoted before dispatch — no surprises.',
      faqs: [
        {
          question: 'Is 40-60 minutes really your Oshawa ETA?',
          answer: 'Yes, honestly. Scarborough-to-Oshawa on the 401 is a real 40-50 minute drive without traffic. We\'d rather be upfront than be late on a promised 20-minute ETA.'
        },
        {
          question: 'Can you tow from UOIT or Durham College?',
          answer: 'Yes. Student vehicle tows — to campus, to home, to shop — are a regular Oshawa service for us.'
        },
        {
          question: 'Do you tow east of Oshawa (Courtice, Bowmanville)?',
          answer: 'Case-by-case. Call and we\'ll quote an honest ETA — often 60+ minutes from Scarborough, which may be longer than you want. We\'ll tell you straight.'
        }
      ]
    }
  }
};
