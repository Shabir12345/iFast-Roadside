import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_NAME } from '../constants';
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

type ServiceId = 'tire-change' | 'jump-start' | 'lockout' | 'fuel' | 'towing';
type CityId = 'scarborough' | 'pickering' | 'ajax' | 'whitby' | 'oshawa';

export const SERVICE_CITY_CONTENT: Record<ServiceId, Record<CityId, ServiceCityContent>> = {
  /* =========================================================================
     MOBILE TIRE SERVICE
     ========================================================================= */
  'tire-change': {
    scarborough: {
      seoTitle: 'Mobile Tire Service & Flat Tire Repair Scarborough — 24/7 On-Site | iFAST',
      seoDescription: 'Flat tire in Scarborough? iFAST brings mobile tire service to you across Agincourt, Malvern, Woburn, and the 401. 15-25 min ETA. 4.9★ / 94+ reviews. Call now.',
      keywords: 'mobile tire service Scarborough, flat tire repair Scarborough, emergency tire change Scarborough, mobile tire Agincourt, flat tire Malvern, 401 flat tire Scarborough, on-site tire swap Scarborough',
      h1: 'Mobile Tire Service in Scarborough — 24/7 Flat Tire Repair',
      intro: (
        <>
          <p className="mb-4">
            A flat tire in Scarborough rarely happens at a convenient spot — it's usually the 401 shoulder at rush hour, a Kennedy Road pothole, or a driveway in Agincourt at 2 AM. <strong>{COMPANY_NAME}</strong> dispatches from 20 Antrim Crescent (M1P 4N3), so when you call, a fully-stocked mobile tire van is typically <strong>15-25 minutes</strong> from anywhere in Scarborough. We handle plug repairs, full tire replacement, seasonal swaps, and emergency spare installs — all without a tow to a shop.
          </p>
          <p className="mb-4">
            Our vans carry common 15" through 20" sizes for sedans, SUVs, and light trucks, a computerized balancer, and a full patch-plug kit. If we have your size on board, you're back on the road in under 45 minutes from the time we arrive.
          </p>
          <InlineCall source="sc_tire_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Scarborough's trouble spots for flats are predictable: the 401 eastbound merge at Markham Road where debris collects, the Kennedy-Sheppard construction zone, and the back roads around Morningside that chew through sidewalls in winter. We position our Scarborough unit to reach the 401 corridor in under 20 minutes — faster than any downtown-dispatched competitor.
          </p>
          <p className="mb-4">
            If you're in a residential pocket like Cliffside, Birchmount, or Guildwood, we'll come to your driveway and swap the tire while you stay inside. No need to move the car, no need to wait at a shop.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Scarborough is our home base, so our ETAs here are the tightest in the East GTA. We also keep extra winter-rated tires in common Scarborough sizes (Honda Civic, Toyota Corolla, CR-V, RAV4, F-150) on the van November through March because demand here spikes during cold snaps.
        </p>
      ),
      priceNote: 'Scarborough mobile tire calls start at a flat local-zone rate. No hidden "out of zone" fees since you\'re in our home city.',
      faqs: [
        {
          question: 'Do you carry tires for my car on the Scarborough van?',
          answer: 'We stock most common sedan, SUV, and light-truck sizes (15"-20"). Call with your make, model, and year and we\'ll confirm stock before rolling. If we don\'t have your exact tire, we can plug/patch the original or install a spare on-site and pre-order your tire for a follow-up visit.'
        },
        {
          question: 'Can you come to my driveway on a Scarborough side street?',
          answer: 'Yes. We service driveways across Agincourt, Malvern, Woburn, Cliffside, Birchmount, Rouge, and everywhere in between. No need to move the vehicle — we bring the shop to you.'
        },
        {
          question: 'How fast can you reach the 401 in Scarborough?',
          answer: 'Typical ETA to the 401 anywhere between the DVP and Morningside is 15-25 minutes. For highway shoulder work we roll with high-viz strobes and cones before anyone touches the vehicle.'
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
      seoTitle: 'Mobile Tire Service Ajax | Flat Tire Repair 24/7 — iFAST Roadside',
      seoDescription: 'Mobile tire repair and on-site tire change in Ajax. Harwood, Salem, Audley, Pickering Village, and the 401 corridor. 25-35 min arrival. Call iFAST Roadside.',
      keywords: 'mobile tire service Ajax, flat tire repair Ajax, tire change Ajax, mobile tire Harwood, 401 flat tire Ajax, emergency tire Ajax',
      h1: 'Mobile Tire Service in Ajax — On-Site Flat Tire Repair',
      intro: (
        <>
          <p className="mb-4">
            Flat tire in Ajax means you shouldn't have to limp it to a shop on a donut. <strong>{COMPANY_NAME}</strong> dispatches a mobile tire unit to you anywhere in Ajax — Harwood, Salem, Pickering Village, Audley, Westney — with a typical ETA of <strong>25-35 minutes</strong>. Plug repairs, full replacements, seasonal swaps, and spare installs all happen at your location.
          </p>
          <p className="mb-4">
            Ajax drivers hit a lot of flats on the 401 eastbound near Westney and Salem, on Harwood during the winter freeze-thaw, and in the construction corridors around Audley Road. We know those spots and get there fast.
          </p>
          <InlineCall source="aj_tire_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Ajax has two big tire-trouble patterns: the 401 shoulders near the Harwood and Salem interchanges (debris from transports), and the suburban streets of north Ajax where seasonal potholes develop quickly on roads like Rossland and Kingston. Our Ajax calls often come from the GO Station parking lot, the Ajax Downs area, and driveways throughout Pickering Village.
          </p>
          <p className="mb-4">
            If you're stuck at the Ajax-Pickering GO station or along Bayly, we'll come straight to the parking spot — no need to move the vehicle. Our techs carry everything needed to plug, patch, or replace a tire curbside.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Ajax has a lot of newer subdivisions where residents don't have a "corner tire shop" nearby. We fill that gap — bringing the tools and tires to your driveway so you don't have to arrange a tow to Whitby or Pickering.
        </p>
      ),
      priceNote: 'Ajax is inside our East GTA zone — no extra distance fees. Flat patches are typically the cheapest option when the tire is salvageable.',
      faqs: [
        {
          question: 'How long will I wait for mobile tire service in Ajax?',
          answer: 'Typical ETA across Ajax is 25-35 minutes from call to arrival. North Ajax and the 401 corridor are usually on the faster end; far south Ajax (lakefront) slightly longer.'
        },
        {
          question: 'Do you work in Ajax subdivision driveways?',
          answer: 'Yes. We service every neighborhood from Pickering Village to Audley. If your driveway is wide enough for a minivan, we can do the work there.'
        },
        {
          question: 'Can you do winter tire changeovers in Ajax?',
          answer: 'Yes — we offer seasonal winter-to-summer (and back) tire swaps on-site. Book before the October/April rush for best availability.'
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
    scarborough: {
      seoTitle: 'Battery Jump Start Scarborough | 24/7 Boost Service — iFAST Roadside',
      seoDescription: 'Dead battery in Scarborough? iFAST delivers 24/7 jump start and battery boost across Agincourt, Malvern, Woburn, and the 401. 15-25 min arrival. Call now.',
      keywords: 'jump start Scarborough, car battery boost Scarborough, dead battery Scarborough, battery jump Agincourt, jump start Malvern, 24 hour jump start Scarborough',
      h1: 'Battery Jump Start in Scarborough — 24/7 Boost Service',
      intro: (
        <>
          <p className="mb-4">
            Dead battery in Scarborough? <strong>{COMPANY_NAME}</strong> dispatches from 20 Antrim Crescent (M1P 4N3), so a certified technician with a commercial-grade jump pack is typically <strong>15-25 minutes</strong> from anywhere in Scarborough. We boost cars, trucks, SUVs, and vans — even stubborn deeply-discharged batteries that cheap booster cables won't touch.
          </p>
          <p className="mb-4">
            Scarborough winters are hard on batteries: overnight temperatures of -15°C drain cold-soaked batteries by 30-40%, and any battery over 4 years old is at serious risk of a no-start in January. We see the most jump start calls here in December and February mornings.
          </p>
          <InlineCall source="sc_jump_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Typical Scarborough jump start calls: Agincourt Mall parking, STC parking, driveways throughout Malvern and Woburn, the GO station at Kennedy, and the big box lots along Progress Avenue. We also do a lot of industrial park calls during early morning shifts when cars sat overnight in the cold.
          </p>
          <p className="mb-4">
            If your battery is toast (not just discharged), we'll tell you honestly after the boost — a load test takes 60 seconds and tells us whether a jump will hold or whether you need replacement.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We keep a range of common replacement batteries on the Scarborough van during winter — so if your boost reveals a failing battery, we can often install a new one the same visit without a tow.
        </p>
      ),
      priceNote: 'Scarborough jump start is a flat local rate. Battery replacement (if needed) is quoted separately with your approval before installation.',
      faqs: [
        {
          question: 'How cold is too cold for my battery?',
          answer: 'Batteries lose ~30% of cranking power at -15°C and ~50% at -30°C. Any battery over 4 years old is at high risk of a no-start during Scarborough cold snaps. A failing battery shows early signs — slow cranking, dim lights, clicking.'
        },
        {
          question: 'Can you boost a completely dead battery?',
          answer: 'Yes. Our commercial jump packs deliver up to 2000 amps — far more than retail booster cables. Deeply discharged batteries that won\'t accept a charge from another car\'s cables will start on our equipment.'
        },
        {
          question: 'Will jumping my car damage it?',
          answer: 'Not when done properly. Our techs are trained in modern jump procedures to protect vehicle electronics (including hybrids and EVs with 12V auxiliaries). We use polarity-protected clamps and never reverse-polarity.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Battery Jump Start Pickering | 24/7 Boost Service — iFAST Roadside',
      seoDescription: 'Dead battery in Pickering? 24/7 jump start and battery boost across Bay Ridges, Amberlea, Liverpool, Pickering Town Centre. 20-30 min arrival. Call iFAST.',
      keywords: 'jump start Pickering, car battery boost Pickering, dead battery Pickering, jump start Bay Ridges, 24 hour battery Pickering, Pickering GO battery',
      h1: 'Battery Jump Start in Pickering — 24/7 Mobile Boost',
      intro: (
        <>
          <p className="mb-4">
            Car won't start in Pickering? <strong>{COMPANY_NAME}</strong> brings 24/7 mobile jump start service to your driveway, parking lot, or roadside anywhere in the city. Typical ETA is <strong>20-30 minutes</strong> with a commercial jump pack that handles deeply-discharged batteries cheap cables can't.
          </p>
          <p className="mb-4">
            Pickering commuters get hit especially hard on cold Monday mornings after cars sat through a weekend in sub-zero temperatures. If you're running late and the engine won't turn over, calling us beats trying to flag down a neighbor with cables.
          </p>
          <InlineCall source="pk_jump_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Pickering jump start patterns: driveways in Bay Ridges, Amberlea, and Liverpool; the Pickering GO station commuter lot (regular Monday morning calls); Pickering Town Centre parking; and commercial zones along Brock Road. We reach highway shoulder calls on the 401 in under 25 minutes.
          </p>
          <p className="mb-4">
            Our techs test the battery after boosting, so you know whether it will survive the next cold night or whether replacement is needed. Replacing at the roadside is faster than a shop visit and lets you get to work.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          We prioritize early-morning Pickering boost calls because commuters are racing the clock. A 6 AM dispatch will usually have you moving by 6:45 — before the 401 locks up.
        </p>
      ),
      priceNote: 'Pickering is in our standard East GTA zone — no extra fees. Jump starts are a flat rate regardless of neighborhood.',
      faqs: [
        {
          question: 'Do you do early-morning jump starts in Pickering?',
          answer: 'Yes, 24/7. We run early-morning (5-7 AM) dispatch specifically for Pickering commuters. Call as soon as you realize the battery\'s dead — we\'ll get you moving before rush hour traffic builds.'
        },
        {
          question: 'What if my battery won\'t hold a jump?',
          answer: 'If the battery is toast, we\'ll tell you right after the boost. We can typically install a replacement battery on-site — no need for a tow to a shop.'
        },
        {
          question: 'Can you jump hybrids like a Prius or RAV4 Hybrid in Pickering?',
          answer: 'Yes. Hybrids have a separate 12V auxiliary battery that handles starting and electronics — we jump that battery the same way we jump a conventional car. We\'ve done hundreds.'
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
    scarborough: {
      seoTitle: 'Car Lockout Service Scarborough | 24/7 Damage-Free Unlock — iFAST',
      seoDescription: 'Locked keys in your car in Scarborough? 24/7 damage-free car lockout service. 15-25 min arrival across Agincourt, Malvern, Woburn, STC. Call iFAST.',
      keywords: 'car lockout Scarborough, locked keys in car Scarborough, car unlock Scarborough, 24 hour lockout Scarborough, car lockout Agincourt, car lockout STC',
      h1: 'Car Lockout Service in Scarborough — 24/7 Damage-Free Unlock',
      intro: (
        <>
          <p className="mb-4">
            Locked your keys in the car in Scarborough? <strong>{COMPANY_NAME}</strong> dispatches a certified lockout technician with damage-free unlock tools from 20 Antrim Crescent. Typical ETA anywhere in Scarborough is <strong>15-25 minutes</strong>, and most unlocks are done in under 5 minutes once we arrive — without scratching paint or breaking windows.
          </p>
          <p className="mb-4">
            We use airbag wedges, long-reach tools, and modern slim-jim variants rated for current vehicle door designs. We won't work on your car unless we're sure we can open it damage-free.
          </p>
          <InlineCall source="sc_lock_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Scarborough lockout hotspots: Scarborough Town Centre parking, Agincourt Mall, gym parking at LA Fitness and Goodlife across the east end, gas stations along Kingston Road, and residential driveways throughout Malvern, Woburn, and Cliffside. Weekends see triple the lockout calls of weekdays.
          </p>
          <p className="mb-4">
            If your keys are visibly inside the vehicle and you have ID matching the registration, we can unlock on the spot. We verify ownership before unlocking — for your protection and ours.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Many Scarborough parking-lot lockouts happen at gyms, mosques, and community centers where locker-room key mix-ups are common. We work discreetly in those lots — no loud sirens, no tow truck drama.
        </p>
      ),
      priceNote: 'Scarborough lockout is a flat local rate — no hourly billing, no "difficulty surcharge" for common vehicles.',
      faqs: [
        {
          question: 'Will unlocking my car damage the door or window?',
          answer: 'No. We use damage-free airbag wedge + long-reach tools designed for modern vehicles. We carry insurance on every unlock; if something goes wrong (very rare), we cover it.'
        },
        {
          question: 'Can you open any car in Scarborough?',
          answer: 'We handle almost all consumer vehicles — sedans, SUVs, light trucks, vans. For very new high-end vehicles with anti-tow/anti-theft features we\'ll confirm compatibility on the phone before dispatch.'
        },
        {
          question: 'What if my child or pet is locked in the car?',
          answer: 'Call 911 first if the child/pet is in distress or it\'s hot/cold out. Then call us — we\'ll dispatch immediately, but emergency services take priority for child/pet safety.'
        }
      ]
    },
    pickering: {
      seoTitle: 'Car Lockout Service Pickering | 24/7 Damage-Free Unlock — iFAST',
      seoDescription: 'Locked out of your car in Pickering? 24/7 damage-free car lockout across Bay Ridges, Pickering Town Centre, GO Station. 20-30 min arrival. Call iFAST.',
      keywords: 'car lockout Pickering, locked keys in car Pickering, car unlock Pickering, 24 hour lockout Pickering, Pickering Town Centre lockout',
      h1: 'Car Lockout Service in Pickering — 24/7 Mobile Unlock',
      intro: (
        <>
          <p className="mb-4">
            Locked keys in the car in Pickering? <strong>{COMPANY_NAME}</strong> rolls a mobile lockout unit to you anywhere in the city with a <strong>20-30 minute</strong> typical ETA. We carry damage-free airbag wedge and long-reach tools — most Pickering unlocks are complete within 5 minutes of arrival.
          </p>
          <p className="mb-4">
            We verify you're the owner (ID + registration) before unlocking, which protects both of us. After that, you're back in the car and on your way.
          </p>
          <InlineCall source="pk_lock_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Most common Pickering lockout spots: Pickering Town Centre parking lots, Pickering GO Station commuter lot, Bay Ridges waterfront parking, the plazas along Brock Road and Kingston Road, and residential driveways throughout Amberlea and Liverpool. Gym and grocery store lockouts spike on weekends.
          </p>
          <p className="mb-4">
            If you're stuck at Frenchman's Bay or at a Beachfront trail parking lot, we'll come straight to you — no need to walk somewhere else to wait.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Pickering commuters often lock keys in the car at the GO station in the morning — which means we get several same-address calls each week. We know the lot, the staff, and how to work around transit security without friction.
        </p>
      ),
      priceNote: 'Pickering lockout is a flat East GTA rate — no surge, no "after-hours" premium.',
      faqs: [
        {
          question: 'Can you unlock my car at the Pickering GO Station?',
          answer: 'Yes — this is one of our most common Pickering call types. We have experience working with transit staff on-site.'
        },
        {
          question: 'What ID do you need before unlocking?',
          answer: 'Photo ID that matches the vehicle registration or a match to the person listed on rental/corporate documents. This protects you from someone claiming your car.'
        },
        {
          question: 'Do you replace broken car keys in Pickering?',
          answer: 'Our core service is lockout — getting you into the car. For key replacement/programming, we can refer a local auto locksmith who handles cutting and fob programming.'
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
      seoTitle: 'Fuel Delivery Pickering | 24/7 Emergency Gas — iFAST Roadside',
      seoDescription: 'Out of gas in Pickering? 24/7 mobile fuel delivery across Bay Ridges, Amberlea, Liverpool, Pickering Town Centre, and the 401. 20-30 min arrival.',
      keywords: 'fuel delivery Pickering, emergency gas delivery Pickering, out of gas Pickering, 401 fuel delivery Pickering, diesel delivery Pickering',
      h1: 'Emergency Fuel Delivery in Pickering — 24/7 Gas & Diesel',
      intro: (
        <>
          <p className="mb-4">
            Ran dry in Pickering? <strong>{COMPANY_NAME}</strong> brings regular, premium, or diesel to your location within a typical <strong>20-30 minutes</strong>. Standard delivery is 5 gallons (~19 L) — enough to get you to the nearest station. We use approved fuel transport containers, not red jugs from the hardware store.
          </p>
          <p className="mb-4">
            Most Pickering fuel calls come from the 401 eastbound between Whites and Brock, the Pickering Town Centre parking area, and driveways where a commuter misjudged reserves. We work all of them.
          </p>
          <InlineCall source="pk_fuel_intro" />
        </>
      ),
      localScenario: (
        <>
          <p className="mb-4">
            Typical Pickering fuel delivery spots: the 401 eastbound shoulder, Bayly Street in both directions, Brock Road commuter routes, and waterfront/marina parking at Bay Ridges. Winter commuters running the tank low before a cold overnight are frequent callers.
          </p>
          <p className="mb-4">
            If you're on the 401 near Pickering, call as soon as you pull over — we get to highway calls first because safety risk is highest there.
          </p>
        </>
      ),
      uniqueAngle: (
        <p className="mb-4">
          Pickering has multiple closed gas stations along Kingston Road at night — a detail that catches commuters off-guard when they try to refuel after 11 PM. We're the backstop when the pumps are dark.
        </p>
      ),
      priceNote: 'Flat service fee plus fuel cost. Market-plus pricing quoted before dispatch — no surprises.',
      faqs: [
        {
          question: 'What if I need diesel in Pickering?',
          answer: 'We carry both gas and diesel. Tell us when you call so the right fuel arrives.'
        },
        {
          question: 'Can you deliver on the 401 shoulder in Pickering?',
          answer: 'Yes — highway fuel delivery is a core service. We deploy safety cones and strobes before approaching the vehicle.'
        },
        {
          question: 'Is 5 gallons enough to get to a gas station?',
          answer: 'Yes — 5 gallons (~19L) is typically enough for 40-70 km of normal driving, well beyond the nearest Pickering gas station.'
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
