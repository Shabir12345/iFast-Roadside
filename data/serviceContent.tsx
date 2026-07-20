import React from 'react';
import { PHONE_NUMBER, COMPANY_NAME } from '../constants';
import { PhoneCall } from 'lucide-react';
import { trackPhoneCall } from '../utils/analytics';

const CallNowButton = ({ source = 'service_content_inline' }: { source?: string }) => (
  <div className="my-6 text-center sm:text-left">
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackPhoneCall(source)}
      className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-brand-dark px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 premium-shadow-hover animate-pulse"
      style={{ animationDuration: '2s' }}
    >
      <PhoneCall size={20} />
      Call Now For Quick Help
    </a>
    <p className="text-xs text-gray-500 mt-2">✨ Average arrival time: 15-30 minutes</p>
  </div>
);

export interface ServiceContent {
  id: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  blogSections: {
    title: string;
    content: React.ReactNode;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'mobile-mechanic': {
    id: 'mobile-mechanic',
    seoTitle: '24/7 Mobile Mechanic GTA | Emergency On-Site Car Repair Pickering, Ajax, Oshawa',
    seoDescription: 'Need a mechanic that comes to you? iFAST Roadside provides 24/7 mobile mechanic services across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Expert diagnostics, on-site repairs, and emergency service. Call now.',
    keywords: 'mobile mechanic Pickering, emergency car repair Ajax, on-site mechanic Oshawa, mobile auto repair Whitby, 24/7 mechanic Scarborough, mobile engine diagnostics GTA',
    heroImage: '/mobile_mechanic_hero.jpg',
    blogSections: [
      {
        title: 'Professional Mobile Mechanic Services Across the Greater Toronto Area',
        content: (
          <>
            <p className="mb-4">
              Is your car making a strange knocking sound? Engine light flashing? Or maybe it just won't start in your driveway? <strong>{COMPANY_NAME}</strong> brings a fully equipped mobile auto repair shop directly to your home, office, or roadside location. We serve Pickering, Ajax, Whitby, Oshawa, and Scarborough 24 hours a day, 7 days a week. Our certified mobile mechanics carry advanced diagnostic computers and professional-grade tools to solve your automotive issues on-site, saving you the high cost and hassle of a tow truck.
            </p>
            <p className="mb-4">
              From complex electrical troubleshooting in Ajax to emergency brake repairs in Pickering, we handle a wide range of mechanical issues without you ever having to leave your house. We provide transparent, up-front quotes and perform all work with the highest level of precision and care. No more waiting in greasy repair shop lobbies—just fast, expert service that fits your busy schedule.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Choose a Mobile Mechanic? Speed, Savings, and Safety',
        content: (
          <>
            <p className="mb-4">
              Traditional repair shops require you to arrange a tow, wait days for a diagnosis, and find alternative transportation. A mobile mechanic eliminates those bottlenecks entirely.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>On-Site Diagnostics</strong>: We use the same high-end scanners as dealerships to pinpoint exactly why your check engine light is on or why your car is in "limp mode."</li>
              <li><strong>Zero Towing Fees</strong>: Why pay $150+ just to get your car to a shop? We come to you, saving you money from the very start.</li>
              <li><strong>Transparent Service</strong>: You can watch our mechanics work and ask questions. We show you exactly what's wrong and explain the fix in plain English.</li>
              <li><strong>Same-Day Repairs</strong>: For many common issues like sensors, batteries, starters, and alternators, we can often complete the repair the same day we arrive.</li>
              <li><strong>Emergency 24/7 Response</strong>: Mechanical failures don't follow a 9-to-5 schedule. We are available around the clock to get you back on the road.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Don't let a breakdown ruin your week. Call iFAST for the most reliable mobile mechanic service in the Greater Toronto Area.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Common Mobile Auto Repairs We Handle On-Site',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Emergency No-Start Diagnostics</h3>
            <p className="mb-4 text-gray-700">
              If your car won't turn over, it could be a dozen different things—a failed starter, a seized alternator, a bad fuel pump, or a security system glitch. Our mechanics perform systematic testing to find the root cause immediately. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: car won't start Pickering, mobile starter replacement Ajax, alternator repair Oshawa.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Brake System Repairs</h3>
            <p className="mb-4 text-gray-700">
              Squealing brakes or a soft pedal? We can replace pads, rotors, and even handle seized calipers or broken brake lines right in your driveway. Safe braking is non-negotiable, and we ensure your system is factory-spec before we leave. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: mobile brake repair Whitby, brake pad replacement Ajax, emergency brake service Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Belt & Hose Replacements</h3>
            <p className="mb-4 text-gray-700">
              A snapped serpentine belt or a burst coolant hose will leave you stranded instantly. We carry a wide range of emergency parts to fix leaks and restore drive systems on-site. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: serpentine belt repair Pickering, coolant leak fix Oshawa, mobile hose replacement Ajax.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Sensor & Electrical Troubleshooting</h3>
            <p className="mb-4 text-gray-700">
              Modern cars are full of sensors (O2, MAF, Crankshaft, Camshaft) that can cause poor idling or stalling. Our digital tools read live data to identify the specific failing component without the "parts cannon" guesswork. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: check engine light diagnostic Ajax, mobile electrical repair Whitby, sensor replacement Pickering.</span>
            </p>
          </>
        )
      }
    ],
    faqs: [
      { question: 'What can a mobile mechanic actually fix at my house?', answer: 'We can handle about 80% of common repairs on-site, including starters, alternators, batteries, brakes, belts, hoses, sensors, and most electrical issues. Major engine or transmission overhauls still require a shop, but we handle the rest.' },
      { question: 'How much does a mobile mechanic cost in the Greater Toronto Area?', answer: 'Our pricing is very competitive with local shops, and you save the cost of a tow. We provide a transparent diagnostic fee and a firm quote for parts and labor before any work begins.' },
      { question: 'Are your mobile mechanics certified?', answer: 'Yes, all our technicians are fully certified with years of experience in both shop and field environments. We use professional-grade equipment and follow manufacturer-specific repair procedures.' },
      { question: 'Do you offer a warranty on mobile repairs?', answer: 'Absolutely. We stand behind our work with a comprehensive warranty on both parts and labor, giving you peace of mind that your repair is done right.' },
      { question: 'Can you work on my car in a condo or apartment parking lot?', answer: 'In most cases, yes. We are experienced in working in tight spaces and low-clearance garages across Scarborough and Pickering. As long as we have enough room to safely access the vehicle, we can do the job.' },
      { question: 'How fast can you arrive for an emergency repair?', answer: 'We aim for a 30-60 minute arrival time for emergency diagnostic calls in Pickering, Ajax, and Whitby. We are available 24/7 for urgent mechanical issues.' },
    ]
  },
  'tire-change': {
    id: 'tire-change',
    seoTitle: 'Mobile Tire Change GTA | 24/7 Flat Tire Repair That Comes to You',
    seoDescription: 'Flat tire in the Greater Toronto Area? iFAST brings the tire shop to your driveway or the shoulder — Scarborough, Pickering, Ajax, Whitby, Oshawa. 24/7, fast, damage-free. Call for a quote.',
    keywords: 'mobile tire change GTA, flat tire repair Scarborough, mobile tire service Pickering, flat tire change Ajax, nail in tire repair Whitby, 24/7 mobile tire Oshawa, roadside tire change near me, mobile tire swap GTA',
    heroImage: '/tire_service_hero.jpg',
    blogSections: [
      {
        title: 'Mobile Tire Change That Comes to You — Skip the Shop, Skip the Tow',
        content: (
          <>
            <p className="mb-4">
              A flat never happens at a good time. You find a nail in the morning before work, you lose pressure on the 401 on the way home, or you walk out to a tire that's gone soft overnight. <strong>{COMPANY_NAME}</strong> brings the tire shop to where your car already is — your driveway, a condo lot, the office parking lot, a GO station, or the highway shoulder — so you skip the lineup at the shop and skip the tow truck entirely.
            </p>
            <p className="mb-4">
              We cover the Greater Toronto Area — Scarborough, Pickering, Ajax, Whitby, and Oshawa — 24 hours a day. Our vans carry plug-patch kits, common 15"–20" tire sizes for sedans, SUVs, and light trucks, a computerized balancer, and spare-install gear, so most flats are fixed on the spot in a single visit. The service comes to you, the work gets done where you're standing, and you're back on the road — usually under 45 minutes from arrival.
            </p>
            <p className="mb-4">
              Mobile tire service that comes to you — fast, fair, and done where your car already is. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
            </p>
            <CallNowButton source="service_content_tire-change_intro" />
          </>
        )
      },
      {
        title: 'How a Mobile Tire Change Actually Works',
        content: (
          <>
            <p className="mb-4">
              No mystery, no runaround. Here's exactly what happens from the moment you call to the moment you're driving again.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>1. You call and describe the tire.</strong> Give us your make, model, and year, where the car is, and what happened — a blowout on the highway, a nail you can see, a slow leak you noticed this morning. Dispatch confirms whether the matching tire and size is on the van and gives you a live ETA before you hang up.</li>
              <li><strong>2. The van arrives stocked.</strong> Plug-patch kit, common 15"–20" sizes, a computerized balancer, and spare-install gear. If you're on a highway shoulder, the technician sets up high-viz strobes and cones and secures the scene <em>before</em> touching the vehicle.</li>
              <li><strong>3. We diagnose the tire.</strong> We locate the puncture and check whether it's in the tread or the sidewall. A nail or screw in the tread can be plugged or patched on the spot; sidewall damage can't be repaired safely and needs a replacement.</li>
              <li><strong>4. We fix it on-site.</strong> We plug or patch the puncture, mount your spare, or install a replacement tire from the van and balance it — whatever the situation calls for.</li>
              <li><strong>5. We confirm and re-check.</strong> We set the pressure to spec, confirm the repair holds, and you're back on the road — typically under 45 minutes from arrival.</li>
            </ul>
            <CallNowButton source="service_content_tire-change_how" />
          </>
        )
      },
      {
        title: 'The No-Surprises Promise',
        content: (
          <>
            <p className="mb-4">
              We give you the price <strong>on the call, before we dispatch</strong> — so you know exactly what you're paying before the van rolls. No hidden fees. No "out of zone" highway surcharge. No surprise when we arrive. You call, you get a clear quote, you decide.
            </p>
            <p className="mb-4">
              That's the part our customers keep coming back to in their reviews — they consistently describe our pricing as fair, and one driver who'd been quoted "ridiculous prices" elsewhere found us at "almost half" the price. We'll let their words below speak for that. Got more than one vehicle? Ask dispatch about fleet rates.
            </p>
            <CallNowButton source="service_content_tire-change_promise" />
          </>
        )
      },
      {
        title: 'Why This Beats the Alternatives',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">vs. a tow to the shop</h3>
            <p className="mb-4 text-gray-700">
              A tow-and-shop tire job means waiting for a flatbed, riding to a shop, and then waiting in line once you get there — and the tow alone often costs more than the entire mobile tire job before any tire work even starts. We do the whole thing where your car already is, usually under 45 minutes from arrival. No flatbed, no shop lobby, no lost afternoon.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. driving on the donut</h3>
            <p className="mb-4 text-gray-700">
              That temporary spare is an 80 km/h, roughly 80 km band-aid — and limping along on it risks a second failure on the side of a busy road. We install a real, full-size tire on the spot so you're not nursing a donut across the Greater Toronto Area hoping it holds.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. a CAA membership</h3>
            <p className="mb-4 text-gray-700">
              CAA is an annual membership plus a dispatch wait, and the tow still ends at a shop where the real work happens. We're pay-per-call — no membership — we give you a live ETA, and we finish the job on-site. As one customer put it after comparing quotes, other places were "quoting me ridiculous prices to change 1 tire" and iFAST was "almost half of the price."
            </p>
            <CallNowButton source="service_content_tire-change_why" />
          </>
        )
      },
      {
        title: `Real Customers, Real Reviews — and the Technician Behind Them`,
        content: (
          <>
            <p className="mb-4">
              {COMPANY_NAME} is owner-operated, and the name you'll see again and again in our 146 five-star Google reviews is <strong>Safi</strong> — the owner-technician who shows up, talks you through the problem, and does the work himself. You're not calling a faceless dispatch line; you're calling the person who answers and the person who fixes your tire. Here's what GTA drivers say, in their own words:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li>"Amazing service had a flat tire showed up in 15 min at midnight, I would highly recommend this company for all your roadside emergency needs……." <strong>— Sayed walidullah Nawid</strong></li>
              <li>"Superfast service! I was driving suddenly I had a nail in my tire. I was losing tire pressure like crazy. Called iFast and SAFI came quickly. Saved my day. I had an interview tomorrow and iFast relived me from my stress!" <strong>— Riaz Rahman</strong></li>
              <li>"Fair prices for the service indeed... they were quoting me ridiculous prices to change 1 tire and when I called IFASTROADSIDE they quoted me fairly almost half of the price... SAFI did amazing job and is a great communicator, Highly Recommended !!!" <strong>— Amin Qazizada</strong></li>
              <li>"Best Service and fast service my car Tire got flat and I called them They came in 10 minutes and they repair it in 5 minutes and they charge me fair price..." <strong>— Sha Zahim</strong></li>
              <li>"Safi was super helpful and fair. I woke up in the morning to go to work and my tire was flat... turns out there was a nail in my tire. Got it fixed fast and I was on the road!" <strong>— Shabir Majeed</strong></li>
              <li>"I got a flat tire yesterday and didn't have the right tools with me... From the moment I called until the technician arrived and changed the tire, it took less than 20 minutes!" <strong>— Mohammad Badakhash</strong></li>
            </ul>
            <p className="mb-4">
              And when something needs a second look, we come back. One customer's tire started losing air again two days after the first repair — for a completely different reason — and as they put it, "I called them, and they arrived within 20 minutes... made sure everything was safe before leaving." <strong>— Hayoung.</strong> We're licensed and insured, we work damage-free, and we stand behind what we do.
            </p>
            <CallNowButton source="service_content_tire-change_trust" />
          </>
        )
      },
      {
        title: 'Local Mobile Tire Service Across the Greater Toronto Area',
        content: (
          <>
            <p className="mb-4">
              We're based in Scarborough at <strong>20 Antrim Crescent (M1P 4N3)</strong>, which gives us the tightest arrival times in the East End. We know where flats happen here, because we work these roads every day.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Scarborough — 15–25 min (home base, fastest)</h3>
            <p className="mb-4 text-gray-700">
              From Agincourt and Malvern to Woburn, Cliffside, Birchmount, and Guildwood — we're minutes away. The trouble spots we see most are the 401 eastbound merge at Markham Road (transport debris), the Kennedy and Sheppard construction zones, and the Morningside back roads in winter. We keep winter-rated common sizes on the van from November through March.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Pickering — 20–30 min</h3>
            <p className="mb-4 text-gray-700">
              Bay Ridges, Amberlea, Liverpool, Brock Ridge, West Shore, Rosebank, Dunbarton — commuter country. The 401 eastbound stretch between Whites Road and Brock Road is the construction-debris flat hotspot, so we run early-morning dispatch (5–8 AM) to get commuters moving before rush hour locks up. Stuck at the Pickering GO lot? We come to you there too.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Ajax — 25–35 min</h3>
            <p className="mb-4 text-gray-700">
              Pickering Village, Central Ajax, Nottingham, Audley, Discovery Bay, Riverside — newer subdivisions where there's often no corner tire shop nearby. We fill that gap so you don't have to tow to Whitby or Pickering. Flats cluster on the 401 eastbound near Westney and Salem (transport debris) and on Harwood's freeze-thaw potholes.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Whitby & Oshawa</h3>
            <p className="mb-4 text-gray-700">
              We serve Whitby and Oshawa too, from the 401 corridor through the residential cores. Oshawa is the longest honest range in our zone, and we'll always give you a real ETA on the call rather than an optimistic guess — so you can plan around it.
            </p>
            <CallNowButton source="service_content_tire-change_local" />
          </>
        )
      },
      {
        title: 'What We Fix On-Site',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Nail & screw punctures (plug / patch)</h3>
            <p className="mb-4 text-gray-700">
              The most common call we get. If the puncture is in the tread — a nail, a screw, a piece of construction debris — and not in the sidewall, we plug or patch it on the spot, set the pressure, and you keep your tire. We take these calls around the clock — a screw in a front tire late at night, picked up at 10:30 p.m. and fixed in under half an hour, is a routine one for us.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Slow leaks you can barely see</h3>
            <p className="mb-4 text-gray-700">
              A tire that's soft every morning but never obviously flat is usually a small puncture or a leaking valve. We locate it, confirm the source, and fix it — you don't have to keep topping it up at the gas station and hoping.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Spare installs & full replacements</h3>
            <p className="mb-4 text-gray-700">
              No spare, or a tire too damaged to repair? We mount your spare or install a replacement from the van and balance it with our onboard computerized balancer. Sidewall damage and blowouts get a real tire, not a temporary donut.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Driveways, work lots, GO stations — and EVs</h3>
            <p className="mb-4 text-gray-700">
              We come to driveways, condo lots, workplace parking, GO stations, and mall lots — wherever the car already is, no need to move it. We also change and repair tires on EVs and Teslas; just tell dispatch the model so we bring the right jack points and equipment.
            </p>
            <CallNowButton source="service_content_tire-change_services" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How fast can you get to me for a flat tire?', answer: 'It depends on distance and traffic: arrivals run from about 15 minutes in Scarborough — our home base — out to roughly 45 to 50 minutes for the far edge of Oshawa, with Pickering, Ajax, and Whitby in between. Real reviews cite arrivals of 10 to 20 minutes for closer calls, including a midnight flat. Either way, we give you a live ETA on the call so you know exactly when to expect us.' },
      { question: 'Do you come out at night or after hours?', answer: 'Yes, we run 24/7. Customers have called us at midnight and at 10:30 p.m. for flats and we came out and fixed them. A flat does not wait for business hours, and neither do we.' },
      { question: 'How much does it cost to fix a flat or patch a nail or screw puncture?', answer: 'We give you the exact price on the call before we dispatch, so there are no surprises when we arrive. A plug or patch of a tread puncture is the fastest fix, and a full replacement is quoted before we start any work. Customers consistently describe our pricing as fair — one driver was quoted "almost half" what other shops wanted. Call +1 437-215-3468 for a quick, no-obligation quote.' },
      { question: 'Can you find a slow leak or a screw that is not obviously leaking?', answer: 'Yes. We locate the puncture even when it is a slow leak you can barely see. One customer had a screw in the front tire that was hard to spot, and we found it and repaired the tire in under half an hour, late at night.' },
      { question: 'What if the tire problem comes back after a repair — will you come back?', answer: 'Yes. One reviewer\'s tire developed a completely separate issue two days after the first repair; we came back within 20 minutes and fixed it, and made sure everything was safe before leaving. We stand behind our work.' },
      { question: 'Do you carry the tools and a tire if I do not have a spare?', answer: 'Yes — that is the whole point of mobile service. We carry common 15" to 20" sizes, a plug-patch kit, and a computerized balancer. If your exact size is not on the van, we plug or patch the original, install your spare, or pre-order your tire so you are not stranded.' },
      { question: 'Can you do it in my driveway, at work, or at the GO station?', answer: 'Yes. Driveways, condo lots, workplace parking, GO stations, and mall lots across Scarborough, Pickering, Ajax, Whitby, and Oshawa — we come to wherever the car already is. There is no need to move it.' },
      { question: 'Do you handle EVs and Teslas?', answer: 'Yes, we change and repair tires on EVs and Teslas. Just tell dispatch the model when you call so we bring the right jack points and equipment for your vehicle.' },
    ]
  },
  'jump-start': {
    id: 'jump-start',
    seoTitle: '24/7 Car Battery Jump Start GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Dead battery? iFAST Roadside provides rapid 24/7 battery jump start services across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Safe, anti-surge boosters. Fast local dispatch.',
    keywords: 'car battery jump start Pickering, dead battery service Ajax, mobile jump start Oshawa, onsite battery boost Whitby, 24/7 jump start Scarborough, car won\'t start GTA',
    heroImage: '/jump_start_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile Battery Jump Start Service Across the Greater Toronto Area (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Turned the key and heard a rapid clicking sound? Left the interior dome lights on overnight? Or perhaps the brutal Ontario winter deep-freeze finally drained your older lead-acid battery? <strong>{COMPANY_NAME}</strong> brings professional, high-amperage jump-starting power directly to your stalled vehicle—any hour, any weather condition. Our certified technicians trace your location and reach you in <strong>under 30 minutes on average</strong>, fully equipped with surge-protected mobile lithium jump packs suitable for everything from standard sedans to heavy-duty diesel engines.
            </p>
            <p className="mb-4">
              Whether you're stranded in a chilly basement garage in Scarborough, an open retail commuter lot in Ajax, or stuck in your own driveway in Oshawa or Pickering, we safely boost your battery without risking catastrophic damage to your vehicle's delicate Engine Control Unit (ECU). Avoid the significant dangers of hooking up cheap, unshielded jumper cables to a stranger’s car. No towing, no waiting for a good Samaritan—just a fast, surgically precise boost that gets your alternator charging again.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Choose Professional Mobile Boosting? Key Safety Benefits',
        content: (
          <>
            <p className="mb-4">
              Modern vehicles are essentially rolling computers. Supplying the wrong voltage or a sudden power spike from a running tow truck or another car can fry sensitive electronic modules, leading to thousands of dollars in dealership repair bills. 
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Anti-Surge Protection</strong>: We exclusively use smart micro-processor controlled jump boxes that automatically calculate the precise cold-cranking amps required to start your specific engine.</li>
              <li><strong>Ultra-Fast 30-Minute GPS Dispatch</strong>: We route the closest mobile booster unit straight to your live coordinates for genuine emergency roadside battery boosting in Pickering, Ajax, and beyond.</li>
              <li><strong>All Engine Types Supported</strong>: From standard 12V 4-cylinder engines to massive 24V commercial diesel trucks, our boosters deliver the necessary peak amperage.</li>
              <li><strong>Battery & Alternator Diagnostic Check</strong>: Once your car starts, we will run a quick multimeter diagnostic to ensure your alternator is actively charging the battery, so you don\'t break down again in 10 minutes.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop endlessly searching "jump start near me." One call to iFAST delivers the region's safest, ultra-fast electronic battery boost.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Complete Mobile Jump Start Solutions for Every Situation',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Deep Winter Cold Weather Boosting</h3>
            <p className="mb-4 text-gray-700">
              Toronto and Mississauga winters are absolutely brutal on automotive batteries. When temperatures drop below -15°C, battery fluid thickens and cold-cranking amps plummet. Standard consumer-grade jumper boxes fail in these conditions. Our commercial-grade high-output lithium boosters cut straight through the freezing cold to start deeply frozen engines instantly. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: winter battery boost Pickering, cold weather jump start Ajax, frozen battery start Oshawa.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Low-Clearance Underground Condo Garages</h3>
            <p className="mb-4 text-gray-700">
              If your car dies on the P4 level of a downtown Toronto condo, massive flatbed tow trucks physically cannot enter the garage to reach you. Our agile, specialized response vehicles easily clear height restrictions, and our highly portable jump packs can be walked directly down to your parking stall, bypassing structural bottlenecks entirely. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: underground parking jump start Scarborough, condo garage battery boost Ajax, low clearance roadside assistance Whitby.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Fleet & Heavy-Duty Commercial Jump Starts</h3>
            <p className="mb-4 text-gray-700">
              Delivery vans, cube trucks, and heavy-duty diesel work vehicles require significantly more surge power to turn over the starter motor. We supply specialized commercial boosting for 24V systems to get your fleet vehicles back on their delivery routes without losing valuable operational hours. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: commercial truck jump start Whitby, fleet vehicle battery boost Oshawa, diesel engine jump start Ajax.</span>
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: `About ${COMPANY_NAME} – Engineering Faster Roadside Logistics`,
        content: (
          <>
            <p className="mb-4">
              After witnessing hundreds of GTA drivers waiting two to three hours for heavy tow companies just to get a simple two-minute battery jump, we knew the system was broken. Tow trucks prioritize high-paying collision calls over minor battery boosts. We built iFAST specifically to solve this delay.
            </p>
            <p className="mb-4">
              Today, {COMPANY_NAME} operates a massive fleet of rapid-response service vehicles across Scarborough, Pickering, Ajax, Whitby, Oshawa, and beyond. We do not dispatch massive tow trucks for battery jumps; we dispatch agile, specialized vans that navigate through gridlock faster. Our sole mission is to completely minimize your downtime through unprecedented speed, extreme professionalism, and clinically safe procedures.
            </p>
            <CallNowButton />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How fast can a jump start tech reach me in Pickering or Ajax?', answer: 'We average under 30 minutes across the Greater Toronto Area. By routing our local Pickering and Ajax units straight to your GPS pin, we consistently beat traditional tow truck ETAs.' },
      { question: 'Is it safe to jump start my car with your professional equipment?', answer: 'Yes. Unlike consumer cables, we use computerized, surge-protecting jump boxes that monitor voltage output to prevent damage to your vehicle\'s electronics.' },
      { question: 'What if my car won\'t start after a boost in Whitby or Oshawa?', answer: 'If your battery is completely dead or you have a failed starter, our technician will provide a diagnostic and can assist in dispatching a flatbed tow truck to a local Whitby or Oshawa mechanic.' },
      { question: 'How long should I leave my car running after a jump start?', answer: 'We recommend driving for 30 to 45 minutes to allow the alternator sufficient time to recharge the battery.' },
      { question: 'Do you provide jump starts in Scarborough underground garages?', answer: 'Absolutely. Our portable jump packs allow us to reach your car in the tightest parallel spots or the deepest Scarborough condo garages without needing a second vehicle nose-to-nose.' },
      { question: 'Can jumping a dead battery ruin my alternator?', answer: 'If the battery is defective, it can strain the alternator. Our technicians perform a quick read-out to advise if you need a replacement rather than just a boost.' },
      { question: 'What payment methods do you take in the Greater Toronto Area?', answer: 'We accept all major Credit Cards, Interac Debit, Apple Pay, and Google Pay right at the site of the vehicle in Pickering, Ajax, Whitby, and Oshawa.' },
    ]
  },
  'lockout': {
    id: 'lockout',
    seoTitle: 'Car Lockout Service GTA | 24/7 Damage-Free Unlock',
    seoDescription: 'Locked out in the Greater Toronto Area? iFAST unlocks your car damage-free — Scarborough, Pickering, Ajax, Whitby, Oshawa. 24/7, fast, no membership. Call for a fast quote.',
    keywords: 'car lockout service GTA, keys locked in car Scarborough, unlock car door Pickering, car lockout Ajax, damage-free vehicle unlock Whitby, 24/7 lockout Oshawa, keys locked in trunk GTA, no membership car unlock near me',
    heroImage: '/car_lockout_hero.jpg',
    blogSections: [
      {
        title: 'Locked Out of Your Car? We Come to You — Damage-Free, 24/7',
        content: (
          <>
            <p className="mb-4">
              It happens in a second. The door swings shut with the keys still in the cup holder, or your fob is buried in a gym bag in the trunk, or you're standing in a cold parking lot watching your keys sit on the front seat. <strong>{COMPANY_NAME}</strong> comes to wherever you are in the Greater Toronto Area — a mall lot, a gym, a GO station, your own driveway — and opens your car without a scratch, any hour of the day or night.
            </p>
            <p className="mb-4">
              We cover Scarborough, Pickering, Ajax, Whitby, and Oshawa around the clock. Every unlock is done with damage-free tools designed for modern door geometry — no old slim-jims, no broken glass, no torn weatherstripping. There's no membership to buy and nothing to sign up for; you call when you need us and you pay only for the unlock.
            </p>
            <p className="mb-4">
              Fast, fair, and done where your car already is. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
            </p>
            <CallNowButton source="service_content_lockout_intro" />
          </>
        )
      },
      {
        title: 'How a Damage-Free Unlock Actually Works',
        content: (
          <>
            <p className="mb-4">
              No mystery, no forcing, no gambling with your door. Here's exactly what happens from the moment you call.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>1. You call and tell us the situation.</strong> Give us the make, model, and year, where you are, and confirm the keys are locked inside — not lost. Dispatch gives you a live ETA before you hang up.</li>
              <li><strong>2. The technician arrives with damage-free tools.</strong> An air wedge plus a long-reach tool rated for modern door designs — purpose-built equipment, not a coat hanger or an old slim-jim that can tear the wiring and linkage inside the door.</li>
              <li><strong>3. We verify the car is yours.</strong> Photo ID matched against the registration, or rental and corporate documents. It takes a moment and it protects you from anyone ever claiming your vehicle.</li>
              <li><strong>4. We open it damage-free.</strong> Most unlocks are done within a few minutes — no scratched paint, no broken window, no damaged weatherstripping. If a vehicle can't be opened safely without damage, we won't force it; we'll tell you straight and talk through the options.</li>
              <li><strong>5. You're back in.</strong> No membership, no paperwork, no tow-truck drama — you pay only for the unlock and you're on your way.</li>
            </ul>
            <CallNowButton source="service_content_lockout_how" />
          </>
        )
      },
      {
        title: 'The No-Surprises Promise',
        content: (
          <>
            <p className="mb-4">
              We give you the price <strong>on the call, before we dispatch</strong> — so you know exactly what the unlock costs before anyone rolls out. No hourly billing, no "difficulty surcharge" for a common vehicle, no after-hours premium sprung on you when we arrive, and no membership required. You pay once, for the unlock, and that's it.
            </p>
            <p className="mb-4">
              That's the part our customers keep coming back to. The two reviewers below booked us for a lockout and both led with the same thing — we came fast and the price was fair. We'll let their words speak for it. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
            </p>
            <CallNowButton source="service_content_lockout_promise" />
          </>
        )
      },
      {
        title: 'Why This Beats the Alternatives',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">vs. breaking a window yourself</h3>
            <p className="mb-4 text-gray-700">
              A smashed window costs far more than the unlock, takes days to replace, and leaves your car exposed in the meantime. A coat hanger or a flat metal bar jammed down the window slot can shred the lock linkage and wiring inside the door — turning a quick lockout into a real repair bill. A damage-free unlock avoids all of it.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. a CAA membership</h3>
            <p className="mb-4 text-gray-700">
              CAA is an annual membership plus a dispatch wait, whether you lock yourself out once a decade or never. We're pay-per-call — nothing to join, nothing to renew. You call the one time you actually need us, get a live ETA, and pay only for the unlock.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. waiting it out or flagging a stranger</h3>
            <p className="mb-4 text-gray-700">
              Standing in a parking lot hoping someone walks by with a tool isn't a plan, and the "tricks" you'll find online tend to damage the door or simply don't work on a modern car. One call puts a technician with the right gear on the way, with an ETA you can count on.
            </p>
            <CallNowButton source="service_content_lockout_why" />
          </>
        )
      },
      {
        title: 'Real Customers, Real Reviews — and the Technician Behind Them',
        content: (
          <>
            <p className="mb-4">
              {COMPANY_NAME} is owner-operated, and the name behind our 146 five-star Google reviews is <strong>Safi</strong> — the owner-technician who answers the phone and does the work himself. For lockouts, two customers said it best:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li>"Had myself locked out of my car, called this company arrived fast and fair price." <strong>— Heng Tho</strong></li>
              <li>"Got locked out of my car and the guy was there in a flash and got it sorted out. Genuine rates as well." <strong>— Uddhav Reen</strong></li>
            </ul>
            <p className="mb-4">
              The same two themes — fast arrival, fair pricing — run through the rest of our reviews too, across every service we offer:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li>"Amazing! customer service was the best I've experienced and very fair priced. Shoutout to Safi, such a professional!" <strong>— D Fraser</strong></li>
              <li>"Fair prices !!! Fast service, Seamless experience, SAFI is indeed an amazing technician (owner of the company) to deal with..." <strong>— Salimudin Ahmadi</strong></li>
            </ul>
            <p className="mb-4">
              Our trust is built on what we can promise you for real: a <strong>damage-free unlock</strong>, fast arrival with a live ETA, 24/7 availability, no membership, and an owner who stands behind every job personally.
            </p>
            <CallNowButton source="service_content_lockout_trust" />
          </>
        )
      },
      {
        title: 'Local Lockout Service Across the Greater Toronto Area',
        content: (
          <>
            <p className="mb-4">
              We're based in Scarborough at <strong>20 Antrim Crescent (M1P 4N3)</strong>, which gives us the tightest arrival times in the East End. Lockouts cluster in the same places everywhere — the lots where people park, lock up, and walk away.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Scarborough — 15–25 min (home base, fastest)</h3>
            <p className="mb-4 text-gray-700">
              From Agincourt and Malvern to Woburn, Cliffside, and Guildwood, we're minutes away. The recurring call spots are the big lots — Scarborough Town Centre, Agincourt Mall, gym and community-centre parking (where locker-room key mix-ups happen), and Kennedy Station. Quiet, discreet work, no tow-truck spectacle outside your building.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Pickering — 20–30 min</h3>
            <p className="mb-4 text-gray-700">
              Bay Ridges, Amberlea, Liverpool, West Shore, Rosebank, Dunbarton — commuter country. The Pickering GO Station is a recurring morning lockout: keys locked during the rush, train pulling in. We also get calls from the Pickering Town Centre and the Frenchman's Bay trail lots. Tell dispatch your exact spot and we'll find you.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Ajax — 25–35 min</h3>
            <p className="mb-4 text-gray-700">
              Pickering Village, Central Ajax, Nottingham, Audley, Discovery Bay — newer subdivisions where the nearest locksmith isn't around the corner. The Ajax GO Station, Ajax Pickering Hospital lot, and the Durham Centre are common call spots, and we know the layouts so we can reach you without blocking the lane.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Whitby & Oshawa</h3>
            <p className="mb-4 text-gray-700">
              We cover Whitby — Downtown, Port Whitby, and Brooklin up north — and Oshawa, from Downtown and Samac through the Ontario Tech and Durham College campus lots. Oshawa is the longest honest range in our zone, and we'll always give you a real ETA on the call rather than an optimistic guess.
            </p>
            <CallNowButton source="service_content_lockout_local" />
          </>
        )
      },
      {
        title: 'Lockout Situations We Handle Every Day',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Keys locked inside — including a running car</h3>
            <p className="mb-4 text-gray-700">
              The most common call: keys on the seat, in the cup holder, or in the ignition with the doors locked. If the car is running, tell dispatch so we prioritize it. Our long-reach tools work the internal unlock without touching the wiring inside the door.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Keys or fob locked in the trunk</h3>
            <p className="mb-4 text-gray-700">
              Fob in a bag, bag in the trunk, lid closed. We open the cabin damage-free first, then use the internal trunk release or fold-down seats to get you back to your keys — no broken taillight, no pried lid.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Child or pet locked inside</h3>
            <p className="mb-4 text-gray-700">
              If a child or pet is locked in and in any distress — heat, cold, or panic — <strong>call 911 first</strong>, then call us. We treat these as immediate priority dispatch and head straight to you while you're on with emergency services.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Frozen locks and winter lockouts</h3>
            <p className="mb-4 text-gray-700">
              GTA winters seize locks and handles solid. Frozen-lock calls are routine for us from December through March, and we carry what's needed to deal with them without forcing anything.
            </p>
            <CallNowButton source="service_content_lockout_services" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'I\'m locked out — how fast can you get to me?', answer: 'We give you a live ETA when you call, typically 15 to 35 minutes across the Greater Toronto Area, with Scarborough — our home base — on the fast end and Oshawa the longest honest range. Customers describe us arriving "fast" and "there in a flash." We give you a real ETA on the call rather than an optimistic guess.' },
      { question: 'Will unlocking my car damage the door or window?', answer: 'No. We use damage-free air-wedge and long-reach tools designed for modern vehicles — no old slim-jims, no broken glass, no torn weatherstripping. If a car cannot be opened safely without damage, we will not force it; we will tell you straight and talk through the options.' },
      { question: 'What does a car lockout cost?', answer: 'We give you the price on the call before we dispatch, so there are no surprises — no hourly billing, no difficulty surcharge for a common vehicle, no after-hours premium, and no membership. Customers consistently call our pricing fair, with two lockout reviewers describing our rates as "fair" and "genuine." Call ' + PHONE_NUMBER + ' for a fast, no-obligation quote.' },
      { question: 'Do I need a membership?', answer: 'No. There is nothing to join and nothing to renew. You call when you need us and you pay only for the unlock, one time.' },
      { question: 'What ID do you need?', answer: 'Photo ID that matches the vehicle registration, or rental and corporate documents for those vehicles. It takes a moment and it protects you from anyone else ever claiming your car.' },
      { question: 'What if my child or pet is locked inside?', answer: 'Call 911 first if they are in any distress — heat, cold, or panic. Then call us and we dispatch immediately as priority and head straight to you while you are on with emergency services.' },
      { question: 'My lock is frozen — can you still help?', answer: 'Yes. Frozen locks and handles are common across the Greater Toronto Area from December through March, and we carry what is needed to deal with them without forcing anything.' },
      { question: 'Can you open any car?', answer: 'Almost all consumer vehicles. For very new high-end models with extra anti-theft features, tell dispatch the make and model when you call so we can confirm compatibility before we head out.' },
    ]
  },
  'fuel': {
    id: 'fuel',
    seoTitle: 'Emergency Fuel Delivery GTA | 24/7 Out of Gas Help',
    seoDescription: 'Out of gas in the Greater Toronto Area? iFAST brings fuel to you — Scarborough, Pickering, Ajax, Whitby, Oshawa. 24/7, shoulder-safe, cheaper than a tow. Call for a fast quote.',
    keywords: 'emergency fuel delivery GTA, ran out of gas Scarborough, roadside gas delivery Pickering, out of gas Ajax, diesel delivery Whitby, 24/7 fuel service Oshawa, highway 401 out of gas GTA, gas brought to you near me',
    heroImage: '/fuel_delivery_hero.jpg',
    blogSections: [
      {
        title: 'Out of Gas? We Bring Fuel to You — 24/7, Cheaper Than a Tow',
        content: (
          <>
            <p className="mb-4">
              The gauge drops faster than you thought, the engine sputters, and suddenly you're coasting onto the shoulder with a dead tank. <strong>{COMPANY_NAME}</strong> brings fuel directly to you — on the highway shoulder, in a parking lot, or wherever you've stopped — so you don't have to walk down a busy road with a jerry can or pay for a tow you don't need. We deliver enough to get you to the nearest station and back on your way.
            </p>
            <p className="mb-4">
              We cover Scarborough, Pickering, Ajax, Whitby, and Oshawa around the clock. Tell us regular, premium, or diesel and we'll confirm what we're bringing on the call. On a highway shoulder, the technician arrives with high-visibility strobes and cones and secures the scene before anything else. It's almost always faster and cheaper than waiting on a flatbed.
            </p>
            <p className="mb-4">
              Stay safe with your vehicle and let us come to you. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
            </p>
            <CallNowButton source="service_content_fuel_intro" />
          </>
        )
      },
      {
        title: 'How Emergency Fuel Delivery Actually Works',
        content: (
          <>
            <p className="mb-4">
              No guesswork and no surprises. Here's exactly what happens from the moment you call to the moment you're rolling again.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>1. You call and tell us where you are.</strong> The highway and nearest exit or marker, or the lot you're in, your vehicle, and whether you need <strong>regular, premium, or diesel</strong>. Dispatch gives you a live ETA before you hang up.</li>
              <li><strong>2. The technician arrives with sealed, approved fuel containers.</strong> Enough to get you to the nearest open station — the goal is to get you moving, not to fill the tank on the shoulder.</li>
              <li><strong>3. We secure the scene first.</strong> On a highway shoulder, high-viz strobes and cones go up before anything else, creating a buffer between you and passing traffic.</li>
              <li><strong>4. We deliver the fuel.</strong> We pour the fuel into your tank. For diesel that ran completely dry, the technician helps prime the line so the engine restarts cleanly instead of just cranking on air.</li>
              <li><strong>5. You drive to the nearest station.</strong> We deliver enough to comfortably reach it — by design, that's both safer and cheaper than trying to fill up roadside.</li>
            </ul>
            <CallNowButton source="service_content_fuel_how" />
          </>
        )
      },
      {
        title: 'The No-Surprises Promise',
        content: (
          <>
            <p className="mb-4">
              We give you the price <strong>on the call, before we dispatch</strong> — the all-in number, so you know exactly what you're paying before anyone rolls out. No hidden fees, no "out of zone" highway surcharge, and any after-hours note is stated upfront before we head your way, never sprung on you on the shoulder.
            </p>
            <p className="mb-4">
              The amount of fuel is set by design too: enough to comfortably reach the nearest open station, not a full tank poured roadside. If you know the nearest station is unusually far, tell dispatch and we'll bring extra. <strong>Call {PHONE_NUMBER} for a fast, no-obligation quote.</strong>
            </p>
            <CallNowButton source="service_content_fuel_promise" />
          </>
        )
      },
      {
        title: 'Why This Beats the Alternatives',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">vs. a tow to a station</h3>
            <p className="mb-4 text-gray-700">
              A tow to the nearest gas station costs far more than a fuel drop, ties up a flatbed you don't need, and still leaves you to fill up and sort out your own ride. We bring the fuel to you and you drive yourself out — almost always faster and cheaper than the tow.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. walking to a station with a jerry can</h3>
            <p className="mb-4 text-gray-700">
              Walking a highway shoulder to a station and back is genuinely dangerous, and most people don't carry an approved can anyway. We're set up for shoulder delivery on the major GTA corridors and arrive with strobes and cones, so you stay safely with your vehicle while we handle it.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">vs. a CAA membership</h3>
            <p className="mb-4 text-gray-700">
              CAA is an annual membership plus a dispatch wait, whether you ever run dry or not. We're pay-per-call — nothing to join — with a live ETA and an all-in price you get before we roll. You call the one time you actually need fuel.
            </p>
            <CallNowButton source="service_content_fuel_why" />
          </>
        )
      },
      {
        title: 'Why Drivers Trust Us — Honest About the Reviews',
        content: (
          <>
            <p className="mb-4">
              We'll be straight with you: the reviews below are general iFAST reviews, not fuel-delivery reviews specifically. People who've called us for tires, batteries, and lockouts say the same things about how we operate — fast, fair, and professional — and that's exactly how a fuel call runs too. {COMPANY_NAME} is owner-operated, and the owner-technician, <strong>Safi</strong>, is the name behind our 146 five-star Google reviews:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li>"Excellent service! Fast response time, professional staff, and very reasonable pricing. They arrived quickly and helped me get back on the road without any hassle." <strong>— fazlollah masror</strong></li>
              <li>"Fast response, great service, and very professional. They arrived within 10 minutes and fixed everything quickly, even in the heat." <strong>— Qwer</strong></li>
              <li>"Fair prices !!! Fast service, Seamless experience, SAFI is indeed an amazing technician (owner of the company) to deal with..." <strong>— Salimudin Ahmadi</strong></li>
            </ul>
            <p className="mb-4">
              On a fuel call, what we can promise you for real is what those reviews describe: a fast response with a live ETA, an all-in price before we roll, shoulder-safe delivery with strobes and cones, regular, premium, or diesel confirmed on the call, and an owner who stands behind the job. As we earn fuel-specific reviews, we'll add them here.
            </p>
            <CallNowButton source="service_content_fuel_trust" />
          </>
        )
      },
      {
        title: 'Local Fuel Delivery Across the Greater Toronto Area',
        content: (
          <>
            <p className="mb-4">
              We're based in Scarborough at <strong>20 Antrim Crescent (M1P 4N3)</strong>, right on the 401 corridor, which is where most out-of-gas calls happen. We work these highways every day and know where the stations thin out.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Scarborough — 15–25 min (home base, fastest)</h3>
            <p className="mb-4 text-gray-700">
              From the 401 and Kingston Road through Agincourt, Malvern, and Guildwood, we're minutes away. The 401 eastbound stretches and the DVP merge are the usual out-of-gas spots, and we arrive with strobes and cones to secure the shoulder before delivering.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Pickering — 20–30 min</h3>
            <p className="mb-4 text-gray-700">
              The classic Pickering call is a commuter running the 401 eastbound past the last convenient station before the Whites Road and Brock Road stretch — the gauge hits empty right where the stations thin out. We cover the 401, the 407, and the Brock Road and Whites Road arterials, plus Bay Ridges, Amberlea, and Liverpool.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Ajax — 25–35 min</h3>
            <p className="mb-4 text-gray-700">
              Out of gas on the 401 near Westney or Salem, or stranded on Harwood or Bayly? We come to you across Pickering Village, Central Ajax, and the waterfront, on the highway shoulder or in a lot, with the scene secured first.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Whitby & Oshawa</h3>
            <p className="mb-4 text-gray-700">
              We cover the 401, 407, and 412 through Whitby — including the quieter 412, where there are fewer passing drivers if you run dry — and out to Oshawa along Simcoe and Ritson. Oshawa is the longest honest range in our zone, and we'll always give you a real ETA on the call rather than an optimistic guess.
            </p>
            <CallNowButton source="service_content_fuel_local" />
          </>
        )
      },
      {
        title: 'Fuel Situations We Handle Every Day',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Out of gas on the highway shoulder</h3>
            <p className="mb-4 text-gray-700">
              Stranded on the 401, 407, or 412 with trucks flying past is no place to be on foot. We're set up for shoulder delivery on the major GTA corridors, arrive with high-viz strobes and cones, and secure the scene before delivering. Stay buckled in with your hazards on until we have the buffer up.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Regular and premium gas</h3>
            <p className="mb-4 text-gray-700">
              Tell dispatch what your vehicle takes and we confirm regular or premium on the call before we head out, so you get the right fuel for your engine — not whatever happened to be on the truck.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Diesel that ran dry</h3>
            <p className="mb-4 text-gray-700">
              A diesel that runs completely empty pulls air into the fuel system and won't simply restart once you add fuel. We bring diesel and help prime the line after delivery so the engine catches cleanly. Let dispatch know it's a diesel when you call.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">Parking lots and driveways</h3>
            <p className="mb-4 text-gray-700">
              Coasted into a lot or made it home on fumes and can't get back out? We come to mall lots, GO stations, workplace parking, and driveways across the Greater Toronto Area — wherever the car has stopped, no need to move it.
            </p>
            <CallNowButton source="service_content_fuel_services" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How much fuel do you bring?', answer: 'Enough to comfortably reach the nearest open station — the goal is to get you moving again, not to fill the tank on the shoulder, which is both safer and cheaper. If you know the nearest station is unusually far, tell dispatch and we will bring extra.' },
      { question: 'What does fuel delivery cost?', answer: 'We give you the all-in price on the call before we dispatch, so there are no surprises — no hidden fees and no out-of-zone highway surcharge, with any after-hours note stated upfront. Customers consistently describe our pricing as fair. Call ' + PHONE_NUMBER + ' for a fast, no-obligation quote.' },
      { question: 'Do you bring gas and diesel?', answer: 'Yes — regular, premium, or diesel. Tell dispatch what your vehicle takes when you call so we confirm and bring the right fuel. For diesel that ran completely dry, we help prime the fuel line after delivery so the engine restarts cleanly.' },
      { question: 'Can you come to me on the highway shoulder?', answer: 'Yes. We are set up for shoulder delivery on the major GTA corridors — the 401, 407, and 412, plus local arterials. We arrive with high-visibility strobes and cones and secure the scene before delivering. Stay in your vehicle with hazards on until we have the buffer up.' },
      { question: 'Is this cheaper than a tow?', answer: 'Almost always. A tow to a station plus your own ride out costs far more than a fuel drop, and you would still have to fill up once you got there. We bring the fuel to you and you drive yourself out.' },
      { question: 'How fast can you get to me?', answer: 'We give you a live ETA on the call based on your exact location and current traffic — typically 15 to 35 minutes across the Greater Toronto Area, with Scarborough on the fast end and Oshawa the longest honest range.' },
      { question: 'Do I need to be with the vehicle?', answer: 'Yes — stay safely with the vehicle, or in a safe spot nearby if you are on a shoulder, so we can confirm it is yours and deliver the fuel. Keep your hazards on and stay buckled in until we have the scene secured.' },
      { question: 'What if I run out again before reaching a station?', answer: 'We deliver enough to comfortably reach the nearest open station. If you know the closest one is unusually far, mention it to dispatch when you call and we will bring extra so you are covered.' },
    ]
  },
  'towing': {
    id: 'towing',
    seoTitle: '24/7 Emergency Towing Service GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Reliable 24/7 emergency flatbed towing service across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Safe, damage-free transport for accidents and breakdowns.',
    keywords: 'tow truck Pickering, emergency towing Ajax, flatbed tow truck Oshawa, accident towing Whitby, AWD towing Scarborough, luxury car towing GTA',
    heroImage: '/roadside_technician_towing.jpg',
    blogSections: [
      {
        title: '24/7 Fast & Reliable Flatbed Towing Across the Greater Toronto Area (Pickering, Ajax, Whitby)',
        content: (
          <>
            <p className="mb-4">
              Experiencing a catastrophic internal engine failure? Suffered a major collision in an intersection? When a simple roadside repair simply isn't feasible, <strong>{COMPANY_NAME}</strong> provides elite, 100% damage-free flatbed towing services operating aggressively across the Greater Toronto Area. Our heavy-duty hydraulic flatbed trucks are fueled and active 24/7, ready to safely winch your immobilized vehicle from danger and securely transport it to your driveway, a licensed mechanic, or directly to a regional Collision Reporting Centre in Pickering or Oshawa.
            </p>
            <p className="mb-4">
              Unlike legacy towing companies that stubbornly rely on outdated "wheel-lift" wreckers which violently drag your bumper along the pavement, we exclusively utilize modern, low-approach-angle flatbed rollback trucks. This methodology ensures that your delicate drivetrain, finely-tuned suspension, and specialized AWD transmission are perfectly preserved. From low-clearance exotic sports cars in Scarborough to fully loaded commercial vans broken down in Whitby, we treat your asset with white-glove logistical care.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Hire Our Dedicated Flatbed Fleet? The Safe Transport Advantage',
        content: (
          <>
            <p className="mb-4">
              Towing a modern vehicle requires precise engineering logic. Towing an All-Wheel Drive (AWD) SUV with its rear wheels spinning on the highway will literally shatter the central transfer case in under 5 kilometers, causing upwards of $8,000 in catastrophic mechanical damage.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Zero-Degree Rollback Flatbeds</strong>: Our hydraulic decks tilt completely to the pavement, allowing us to seamlessly winch lowered, modified, and exotic vehicles (Porsche, Ferrari, lowered JDM) without scraping the carbon fiber front lip.</li>
              <li><strong>Multi-Point Soft Nylon Tie-Downs</strong>: We refuse to wrap abrasive iron chains around your expensive suspension control arms. We utilize protective soft-strap systems through the wheels for maximum chassis stability.</li>
              <li><strong>Lightning-Fast Dispatch Routing</strong>: With heavy-duty trucks stationed strategically at major highway arteries across Scarborough, Pickering, and Ajax, we drastically cut down ETA waiting times.</li>
              <li><strong>Transparent Up-Front Pricing</strong>: The towing industry is plagued by predatory "hook fees." We provide absolute transparency—a clear base-rate and exact per-kilometer mileage cost before we ever secure the chain.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              When a severe breakdown strikes on the 401 or 407 in the East End, one immediate call to iFAST delivers the region's safest flatbed lifting.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Comprehensive Towing & Heavy Extrication Solutions',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Emergency Accident & Collision Recovery</h3>
            <p className="mb-4 text-gray-700">
              In the highly stressful aftermath of a severe vehicular collision, you absolutely dictate where your car goes—not the police, and not aggressive "chaser" tow trucks. We provide calm, legally compliant clearing of your wrecked vehicle. We meticulously clean up highway debris, safely winch the chassis onto our deck, and tow you directly to the regional Collision Reporting Centre, or straight to your insurance-approved auto body shop. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: accident towing Pickering, collision tow truck Ajax, accident recovery Whitby, Oshawa police tow.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. AWD & High-End Luxury Vehicle Transport</h3>
            <p className="mb-4 text-gray-700">
              Audi Quattro, BMW xDrive, Mercedes 4MATIC, and Subaru Symmetrical AWD systems strictly mandate that all four wheels remain suspended off the pavement during transport. Our flatbeds ensure zero rotational force enters the transmission, keeping your warranty entirely intact while we smoothly glide your luxury asset to the dealership. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: flatbed towing GTA, luxury car towing Scarborough, AWD safe tow truck Ajax, luxury transport Oshawa.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Specialized Winter Ditch Winch-Outs</h3>
            <p className="mb-4 text-gray-700">
              Hit a patch of Toronto black ice and slid deeply down an embankment? Our trucks possess massive 12,000-pound spooling hydraulic winches. We calculate perfect vector angles to slowly drag your vehicle out of deep snow ditches or thick mud without ripping off your bumpers, subsequently inspecting it for undercarriage damage before you drive off or towing it if necessary. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: car stuck in snow towing Whitby, ditch winch out service Oshawa, mud recovery tow truck Ajax.</span>
            </p>
            <CallNowButton />
            
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Motorcycle Canyon-Dancer Towing</h3>
            <p className="mb-4 text-gray-700">
              Sportbikes and heavy cruisers cannot be tied down like cars. If you lay your bike down or snap a clutch cable during a summer ride, our flatbeds are uniquely equipped with "Canyon Dancer" soft bar harnesses and heavy-duty front wheel chocks to transport your motorcycle standing perfectly upright without scratching the fairings or bending the forks. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: motorcycle towing Scarborough, safe bike transport Pickering, motorcycle flatbed tow Ajax.</span>
            </p>
          </>
        )
      },
      {
        title: `About ${COMPANY_NAME} – Integrity on the Highway`,
        content: (
          <>
            <p className="mb-4">
              The Ontario towing industry historically harbored a dismal reputation for hidden surprise fees, aggressive roadside intimidation tactics, and shoddy vehicle care. {COMPANY_NAME} was brutally forged to be the exact operational opposite. We established our extensive GTA towing division on a rigid foundation of absolute corporate transparency.
            </p>
            <p className="mb-4">
              When you summon us for a tow in Scarborough, Pickering, Ajax, Whitby, or Oshawa, you are digitally quoted a precise hook-up fee and a rigorously calculated per-kilometer rate up front. We employ fully licensed, deeply background-checked operators who pride themselves on being honest, reliable harborers of safety during your absolute worst driving moments.
            </p>
            <CallNowButton />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Why use a flatbed for towing in the Greater Toronto Area?', answer: 'Flatbeds are the only safe way to transport modern AWD and luxury vehicles without destroying the transmission. We lift your car entirely off the ground, ensuring zero wear during the trip to Pickering, Ajax, or Oshawa.' },
      { question: 'Will my insurance reimburse the tow from Scarborough or Whitby?', answer: 'Yes, most policies cover towing for accidents or breakdowns. We provide detailed digital receipts for easy reimbursement from your insurance provider.' },
      { question: 'Can I ride in the tow truck cab to my destination in Oshawa?', answer: 'Absolutely. Our trucks feature clean, climate-controlled "Super Cabs" that can comfortably seat up to two passengers.' },
      { question: 'How is the final price calculated for an East End tow?', answer: 'We offer transparent pricing with a flat hook-up fee plus a per-kilometer rate. Call us for an exact quote to any destination in the Greater Toronto Area.' },
      { question: 'What if a "chaser" truck shows up in Ajax or Pickering?', answer: 'You have the legal right to choose your tow company. Command them to step away and wait for iFAST\'s licensed professionals to arrive for a safe, honest experience.' },
      { question: 'Can you get my car out of a low Scarborough underground garage?', answer: 'Yes. We use specialized low-profile extraction units to pull your car out of tight Scarborough garages and then transfer it to a flatbed for safe transport.' },
    ]
  },
  'flat-tire-repair': {
    id: 'flat-tire-repair',
    seoTitle: '24/7 Mobile Flat Tire Repair GTA | Patch & Plug Pickering, Ajax, Oshawa',
    seoDescription: 'Nail or screw in your tire? iFAST Roadside performs permanent mobile flat tire repairs (internal patch-and-plug) across Pickering, Ajax, Whitby, Oshawa, and Scarborough. 30-min response. Call now.',
    keywords: 'flat tire repair Pickering, mobile tire patch Ajax, nail in tire repair Oshawa, tire plug service Whitby, puncture repair Scarborough, fix flat tire on site GTA',
    heroImage: '/flat_tire_repair_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile Flat Tire Repair Across the Greater Toronto Area (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Picked up a nail in a construction zone? Watching your tire pressure light flicker on as the tread slowly hisses? You don't always need a brand-new tire—you need a proper repair. <strong>{COMPANY_NAME}</strong> brings a fully equipped mobile tire shop directly to your driveway, office lot, or roadside. We operate 24 hours a day, 7 days a week, reaching you in <strong>under 30 minutes on average</strong> with computerized balancers, dismounting machines, and Ministry-approved patching materials.
            </p>
            <p className="mb-4">
              If the puncture sits safely within the center tread zone, we perform a permanent internal patch-and-plug: we remove the wheel, dismount the tire from the rim, install a vulcanized mushroom patch from the inside, re-mount, re-balance, and reinstall it torqued to spec. No tow truck, no dirty waiting room—just a safe, lasting repair done right where you are in Pickering, Ajax, Whitby, or Oshawa.
            </p>
            <CallNowButton source="service_content_flat-tire-repair_intro" />
          </>
        )
      },
      {
        title: 'Why a Proper Patch-and-Plug Beats a Can of Sealant',
        content: (
          <>
            <p className="mb-4">
              Those aerosol "fix-a-flat" cans and exterior string plugs are temporary at best—and they often coat your TPMS sensor in sticky goo, leading to expensive replacements. A proper internal repair is the only method approved for long-term highway safety.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Permanent Internal Patch</strong>: We patch the puncture from the inside of the tire, sealing the steel belts so moisture can't rust them out from within.</li>
              <li><strong>Computerized Re-Balancing</strong>: Every repaired tire is re-balanced on our onboard digital balancer to eliminate highway steering-wheel vibration.</li>
              <li><strong>TPMS Light Reset</strong>: We carry the scanners to reset your Tire Pressure Monitoring System dashboard warning after the repair.</li>
              <li><strong>Honest Assessment</strong>: If the puncture is on the sidewall or shoulder—where repairs are unsafe—we'll tell you straight and offer on-site tire installation instead.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop driving on a slow leak that's quietly destroying your tire. One call to iFAST gets it repaired the safe, permanent way.
            </p>
            <CallNowButton source="service_content_flat-tire-repair_why" />
          </>
        )
      },
      {
        title: 'What We Can (and Can\'t) Repair On-Site',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Tread-Zone Punctures (Nails & Screws)</h3>
            <p className="mb-4 text-gray-700">
              The most common flat we fix. If a nail, screw, or bolt punctured the central tread, we plug and patch it from the inside for a permanent seal—usually in under 30 minutes once we're on-site. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: nail in tire repair Pickering, screw in tire fix Ajax, tread puncture patch Oshawa.</span>
            </p>
            <CallNowButton source="service_content_flat-tire-repair_tread" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Slow Leaks & Bead Seal Issues</h3>
            <p className="mb-4 text-gray-700">
              Losing a few PSI every week with no obvious nail? It's often a corroded rim bead or a leaking valve stem. We dismount the tire, clean and reseal the bead, replace the valve stem, and get you holding pressure again. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: slow tire leak repair Whitby, valve stem replacement Ajax, rim bead leak fix Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. When Repair Isn't Safe — Sidewall & Shoulder Damage</h3>
            <p className="mb-4 text-gray-700">
              Punctures on the sidewall or outer shoulder, gashes, or damage from driving on a flat cannot be safely repaired. We'll show you exactly why and install a new or quality used tire on the spot so you're never stuck. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: sidewall damage tire Pickering, blown tire replacement Oshawa, unrepairable tire mobile Ajax.</span>
            </p>
            <CallNowButton source="service_content_flat-tire-repair_unsafe" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How much does a mobile flat tire repair cost in the Greater Toronto Area?', answer: 'Our mobile patch-and-plug is priced competitively with shop repairs—and you save the cost and hassle of a tow or a trip to the shop. We give you a firm quote over the phone before we dispatch.' },
      { question: 'Can every flat tire be repaired?', answer: 'No. We can permanently repair punctures within the center tread zone. Damage on the sidewall, the outer shoulder, or from driving on a flat is not safely repairable—in those cases we offer on-site new or used tire installation instead.' },
      { question: 'How long does a mobile tire repair take?', answer: 'Once our technician is on-site, a standard tread puncture repair takes roughly 20–30 minutes, including dismounting, patching, re-balancing, and reinstalling the wheel.' },
      { question: 'Will you reset my tire pressure (TPMS) light after the repair?', answer: 'Yes. We carry the scanners needed to reset your TPMS dashboard warning so you drive away with no lingering warning lights.' },
      { question: 'Do I need to re-torque my wheel after a repair?', answer: 'Yes. For safety, lug nuts should be re-torqued after driving roughly 100 km (60 miles) to ensure they stay properly seated.' },
      { question: 'Can you repair a flat in my condo or office parking lot?', answer: 'Absolutely. We bring the full shop to you—driveway, underground condo garage, or office lot anywhere in Pickering, Ajax, Whitby, Oshawa, or Scarborough.' },
    ]
  },
  'spare-tire-change': {
    id: 'spare-tire-change',
    seoTitle: '24/7 Spare Tire Change Service GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Have a spare but stuck roadside? iFAST Roadside safely installs your spare or donut across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Fast 30-min response. Call now.',
    keywords: 'spare tire change Pickering, install spare tire Ajax, donut tire change Oshawa, roadside spare swap Whitby, flat tire spare service Scarborough, change tire to spare GTA',
    heroImage: '/spare_tire_change_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile Spare Tire Change Across the Greater Toronto Area (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              You've got a spare in the trunk, but changing it yourself on the shoulder of the 401 with transport trucks roaring past—or in a freezing driveway with a seized lug nut—is dangerous and exhausting. <strong>{COMPANY_NAME}</strong> dispatches a technician to do it for you safely. We reach you in <strong>under 30 minutes on average</strong>, fully equipped with low-profile hydraulic jacks, impact wrenches, and calibrated torque tools.
            </p>
            <p className="mb-4">
              We safely lift your vehicle using non-marring pinch-weld blocks, remove the flat, mount your full-size spare or temporary donut, and torque every lug nut to your manufacturer's exact specification. Our trucks arrive with high-visibility strobe lighting to secure the scene. No struggling with a flimsy trunk wrench—just a fast, professional swap so you can get moving.
            </p>
            <CallNowButton source="service_content_spare-tire-change_intro" />
          </>
        )
      },
      {
        title: 'Why Call a Pro Instead of Changing It Yourself',
        content: (
          <>
            <p className="mb-4">
              Roadside tire changes cause serious injuries every year—from cars slipping off cheap scissor jacks to drivers struck on the shoulder. It's not worth the risk when help is minutes away.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Safe Lifting</strong>: We use professional low-profile jacks and proper lift points, never the unstable factory scissor jack on uneven ground.</li>
              <li><strong>Seized & Stripped Lug Nuts</strong>: Over-torqued or rusted bolts that won't budge with the trunk wrench? Our impact wrenches and extractor sockets break them free without damaging your rims.</li>
              <li><strong>Proper Torque</strong>: Under- or over-tightened lugs are a safety hazard. We torque to spec so your wheel stays secure.</li>
              <li><strong>Roadside Safety Buffer</strong>: Our strobe-lit units shield you from traffic while we work—so you never have to crouch beside a live lane.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stay safe in your seat. One call to iFAST and we'll have your spare on and you back on the road.
            </p>
            <CallNowButton source="service_content_spare-tire-change_why" />
          </>
        )
      },
      {
        title: 'Spare Tire Situations We Handle Daily',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Highway Shoulder Emergencies</h3>
            <p className="mb-4 text-gray-700">
              A blowout on the 401, 407, or DVP is no place to kneel beside traffic. Our strobe-equipped units arrive fast, create a visible buffer zone, and swap your spare on quickly and safely. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: highway spare tire change Pickering, 401 flat tire help Ajax, roadside spare swap Oshawa.</span>
            </p>
            <CallNowButton source="service_content_spare-tire-change_highway" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Driveway & Parking Lot Swaps</h3>
            <p className="mb-4 text-gray-700">
              Discovered a flat in your driveway or a mall parking lot? We come to you so you don't have to risk driving on it and ruining the rim. Quick, clean, and done at your convenience. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: spare tire install at home Whitby, parking lot tire change Ajax, mobile spare swap Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Donut Spares & "Where's My Spare?" Surprises</h3>
            <p className="mb-4 text-gray-700">
              We'll install your temporary donut and advise you on safe speed and distance limits. And if you open the trunk to find no spare at all—many newer cars don't have one—we can bring a new or used tire to mount on-site instead. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: donut spare install Pickering, no spare tire help Oshawa, temporary spare change Ajax.</span>
            </p>
            <CallNowButton source="service_content_spare-tire-change_donut" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How fast can you change my spare in Pickering or Ajax?', answer: 'Our average arrival across the Greater Toronto Area is under 30 minutes. We route the closest local unit straight to your GPS location.' },
      { question: 'What if my lug nuts are seized or I lost my wheel lock key?', answer: 'No problem. We carry heavy-duty impact wrenches and extractor sockets to break free seized, rusted, or stripped lug nuts—and remove locking wheel nuts even without the key—without damaging your rims.' },
      { question: 'How far can I drive on a donut spare?', answer: 'Temporary donut spares are generally rated for short distances (about 80 km) and reduced speed (under 80 km/h). We\'ll advise you, and we can also bring a full tire to install if you have farther to go.' },
      { question: 'What if I don\'t have a spare tire at all?', answer: 'Many newer vehicles ship without one. If you have no spare, we can deliver and install a new or quality used tire in your size right on the spot—just give us the size off your door jamb or tire sidewall.' },
      { question: 'Do you re-torque the wheel after installing the spare?', answer: 'Yes, we torque every lug to your manufacturer\'s spec. We also recommend a re-torque after about 100 km of driving for safety.' },
      { question: 'Can you change a spare in an underground garage?', answer: 'Yes. Our low-clearance vans reach vehicles in underground condo and office garages throughout Scarborough and the Greater Toronto Area.' },
    ]
  },
  'tire-installation': {
    id: 'tire-installation',
    seoTitle: '24/7 Mobile New & Used Tire Installation GTA | On-Site Pickering, Ajax, Oshawa',
    seoDescription: 'No spare? iFAST Roadside delivers and installs new or quality used tires on-site across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Mount, balance, install. Call now.',
    keywords: 'mobile tire installation Pickering, new tire delivery Ajax, used tire install Oshawa, on-site tire mounting Whitby, tire replacement at home Scarborough, buy and install tire GTA',
    heroImage: '/tire_installation_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile New & Used Tire Installation Across the Greater Toronto Area (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Blew a tire with no spare in the trunk? Tread worn down to the wear bars? <strong>{COMPANY_NAME}</strong> brings the tire shop to you—new or quality used tires in your size, delivered and installed on-site. We reach you in <strong>under 30 minutes on average</strong> for emergencies, carrying mounting machines, computerized balancers, and TPMS scanners in every van.
            </p>
            <p className="mb-4">
              Just give us the size off your sidewall or door jamb (e.g. 225/65R17). We source the right tire, bring it to your driveway, office, or roadside, then mount it, balance it on our onboard digital balancer, install it, and reset your TPMS light. No towing to a shop, no waiting room, no juggling a rental—you stay put while we get you rolling on fresh rubber.
            </p>
            <CallNowButton source="service_content_tire-installation_intro" />
          </>
        )
      },
      {
        title: 'Why On-Site Tire Installation Beats the Shop',
        content: (
          <>
            <p className="mb-4">
              The old way means towing your car to a shop, waiting hours for an appointment, and arranging a ride. Mobile installation removes every one of those bottlenecks.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>New or Used Options</strong>: Need premium long-life rubber or a budget-friendly quality used tire to get through the season? We carry both and quote you honestly.</li>
              <li><strong>Full Mount & Balance On-Site</strong>: Our vans carry the same mounting and computerized balancing gear as a brick-and-mortar shop—no compromise on the job quality.</li>
              <li><strong>No Tow Required</strong>: Why pay $150+ to tow a car just for a tire? We come to you, saving that cost from the start.</li>
              <li><strong>TPMS Reset Included</strong>: We reset your Tire Pressure Monitoring System so you drive away with a clean dashboard.</li>
              <li><strong>Seasonal Swaps Too</strong>: We also install your stored winter or all-season set right in your driveway—skip the spring and fall shop lineups.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop Googling "tire shop near me open now." One call to iFAST puts a fresh tire on your car wherever you are.
            </p>
            <CallNowButton source="service_content_tire-installation_why" />
          </>
        )
      },
      {
        title: 'Complete On-Site Tire Installation Solutions',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Emergency New Tire (No Spare Available)</h3>
            <p className="mb-4 text-gray-700">
              Stranded after a blowout with no spare? Tell us your tire size over the phone. We bring a matching new tire to your location, mount and balance it, and have you back on the road—no tow, no wait. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: emergency tire installation Pickering, new tire delivery roadside Ajax, no spare tire help Oshawa.</span>
            </p>
            <CallNowButton source="service_content_tire-installation_emergency" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Quality Used Tire Installation (Budget Option)</h3>
            <p className="mb-4 text-gray-700">
              Need a cost-effective fix to get through to your next paycheck or the end of the season? We carry inspected, quality used tires with plenty of safe tread left, installed on-site at a fraction of new-tire cost. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: used tire install Whitby, cheap tire replacement Ajax, budget tire mobile Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Seasonal & Full-Set Installation at Home</h3>
            <p className="mb-4 text-gray-700">
              Swapping winters to all-seasons, or installing a full new set you bought online? We come to your driveway or office lot, mount and balance every wheel, and torque to spec—no shop queue required. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: mobile winter tire install Pickering, full set tire installation Oshawa, seasonal tire swap at home Ajax.</span>
            </p>
            <CallNowButton source="service_content_tire-installation_seasonal" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Do you bring the tire, or do I need to supply it?', answer: 'Both options work. Give us your tire size and we\'ll source and bring a new or quality used tire. Or, if you already bought tires online or have a stored set, we\'ll come mount and balance them at your location.' },
      { question: 'What tire size do you need from me?', answer: 'The size printed on your tire sidewall or driver\'s door jamb—for example 225/65R17. Read it to us over the phone and we\'ll match it.' },
      { question: 'Can you really mount and balance a tire on-site?', answer: 'Yes. Our vans carry the same mounting machines and computerized balancers as a physical shop, so the installation quality is identical—done in your driveway or roadside.' },
      { question: 'How much does mobile tire installation cost in the Greater Toronto Area?', answer: 'It depends on whether you choose new or used tires and your size, but you save the tow and the shop trip. We give you a firm all-in quote over the phone before dispatch.' },
      { question: 'Do you install used tires safely?', answer: 'Yes. Every used tire we carry is inspected for tread depth, age, and internal damage before installation. If we wouldn\'t put it on our own car, we won\'t put it on yours.' },
      { question: 'Will you reset my TPMS light after installation?', answer: 'Yes, we carry the scanners to reset your Tire Pressure Monitoring System so you leave with no warning lights on the dash.' },
    ]
  },
  'battery-diagnostic': {
    id: 'battery-diagnostic',
    seoTitle: '24/7 Mobile Car Battery Diagnostic GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Car cranking slow or dying repeatedly? iFAST Roadside tests your battery, alternator, and charging system on-site across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Call now.',
    keywords: 'car battery test Pickering, battery diagnostic Ajax, alternator test Oshawa, charging system check Whitby, mobile battery testing Scarborough, why car keeps dying GTA',
    heroImage: '/battery_diagnostic_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile Battery & Charging System Diagnostics Across the Greater Toronto Area',
        content: (
          <>
            <p className="mb-4">
              Is your car cranking slowly every morning? Did it die twice this week even after a jump? Dashboard battery light flickering? Before you waste money replacing the wrong part, find out what's actually wrong. <strong>{COMPANY_NAME}</strong> brings professional diagnostic equipment directly to your vehicle—any hour, any weather. Our technicians reach you in <strong>under 30 minutes on average</strong> with conductance battery testers and multimeters to read your system live.
            </p>
            <p className="mb-4">
              A dead car is usually one of three things: a worn-out battery, a failing alternator that isn't recharging it, or a parasitic drain quietly draining it overnight. We test all three on-site—battery state of health, alternator output, and parasitic draw—so you get a clear answer instead of a guess. Whether you're in a Scarborough condo garage, an Ajax commuter lot, or your own Oshawa driveway, we tell you exactly what you need before you spend a dollar.
            </p>
            <CallNowButton source="service_content_battery-diagnostic_intro" />
          </>
        )
      },
      {
        title: 'Why a Proper Diagnostic Saves You Money',
        content: (
          <>
            <p className="mb-4">
              The most expensive mistake drivers make is "parts-cannon" guessing—buying a new battery when the real culprit is the alternator, then breaking down again days later. A proper test ends the guesswork.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Battery State-of-Health Test</strong>: We measure your battery's actual cold-cranking amps against its rating to see if it's genuinely worn out or just discharged.</li>
              <li><strong>Alternator Output Check</strong>: We verify your alternator is charging at the correct voltage under load—a failing one will kill even a brand-new battery.</li>
              <li><strong>Parasitic Drain Detection</strong>: If something is draining your battery while parked (a stuck relay, aftermarket accessory, or faulty module), we measure the draw to track it down.</li>
              <li><strong>Clear, Honest Recommendation</strong>: You get a plain-English verdict—boost, charge, replace the battery, or address the alternator—with an up-front quote for any fix.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop replacing parts and hoping. One call to iFAST tells you exactly why your car keeps dying.
            </p>
            <CallNowButton source="service_content_battery-diagnostic_why" />
          </>
        )
      },
      {
        title: 'Common Battery Problems We Diagnose On-Site',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. "It Keeps Dying" — Repeated No-Starts</h3>
            <p className="mb-4 text-gray-700">
              Jumped it yesterday and it's dead again today? That points to either a battery that no longer holds charge or an alternator that isn't recharging it while you drive. We test both to pinpoint the real cause. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: car keeps dying Pickering, battery won't hold charge Ajax, repeated dead battery Oshawa.</span>
            </p>
            <CallNowButton source="service_content_battery-diagnostic_dying" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Slow Cranking & Hard Cold-Weather Starts</h3>
            <p className="mb-4 text-gray-700">
              Ontario winters expose weak batteries. If your engine cranks slowly when it's cold, we'll measure the actual cold-cranking amps remaining so you know whether it'll survive the season or strand you. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: slow cranking battery Whitby, weak battery cold weather Ajax, winter battery test Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Phantom Drains & Warning Lights</h3>
            <p className="mb-4 text-gray-700">
              Battery or charging warning light on the dash, or a battery that's flat after sitting a few days? We perform a parasitic draw test to find what's pulling power when the car is off, and check your charging voltage. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: parasitic battery drain Pickering, battery warning light Oshawa, charging system check Ajax.</span>
            </p>
            <CallNowButton source="service_content_battery-diagnostic_drain" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How do I know if it\'s my battery or my alternator?', answer: 'That\'s exactly what our diagnostic answers. We test the battery\'s state of health and the alternator\'s charging output separately, so you know whether you need a new battery, alternator work, or just a charge.' },
      { question: 'How fast can you reach me in Pickering or Ajax for a battery test?', answer: 'Our average arrival across the Greater Toronto Area is under 30 minutes. We dispatch the nearest local unit straight to your location.' },
      { question: 'Can you test my battery in an underground condo garage?', answer: 'Yes. Our portable testing equipment lets us check your battery and charging system right in your parking stall in any Scarborough or GTA garage.' },
      { question: 'What is a parasitic drain?', answer: 'It\'s when something keeps drawing power after the car is off—a stuck relay, aftermarket accessory, or faulty module—slowly flattening the battery overnight. We measure the draw to help track it down.' },
      { question: 'If the test shows I need a new battery, can you install it right away?', answer: 'Yes. If your battery has failed, our technician can supply and install the correct replacement on the spot and recycle your old one—no second trip needed.' },
      { question: 'Will the diagnostic damage my car\'s electronics?', answer: 'No. We use professional conductance testers and multimeters that read your system safely without sending any harmful current into your vehicle\'s electronics.' },
    ]
  },
  'battery-replacement': {
    id: 'battery-replacement',
    seoTitle: '24/7 Mobile Car Battery Replacement GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Battery beyond saving? iFAST Roadside delivers and installs the correct new car battery on-site across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Old battery recycled free. Call now.',
    keywords: 'car battery replacement Pickering, mobile battery install Ajax, new car battery delivery Oshawa, battery installation at home Whitby, replace dead battery Scarborough, car battery service GTA',
    heroImage: '/battery_replacement_hero.jpg',
    blogSections: [
      {
        title: '24/7 Mobile Car Battery Replacement Across the Greater Toronto Area (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              When a battery is truly worn out, no jump start will keep it alive—you need a new one. <strong>{COMPANY_NAME}</strong> delivers and installs the correct replacement battery for your exact vehicle, right where you are. No towing to a shop, no waiting in line, no lugging a heavy battery yourself. Our technicians reach you in <strong>under 30 minutes on average</strong>, any hour, any weather across the Greater Toronto Area.
            </p>
            <p className="mb-4">
              We bring a quality battery matched to your make, model, and engine, install it on-site, clean and protect the terminals, confirm your charging system is working, and recycle your old battery free of charge. Whether you're stranded in an Ajax parking lot, a Scarborough condo garage, or your own Oshawa driveway, we get you started on a fresh battery and back to your day.
            </p>
            <CallNowButton source="service_content_battery-replacement_intro" />
          </>
        )
      },
      {
        title: 'Why Mobile Battery Replacement Beats the Shop',
        content: (
          <>
            <p className="mb-4">
              A dead battery means the car can't drive itself to a shop—so the "go buy one" advice ignores that you're already stranded. We solve the whole problem in one visit.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Right Battery, First Time</strong>: We match the correct group size, cold-cranking amps, and terminal layout for your specific vehicle—no guessing in a parts-store aisle.</li>
              <li><strong>Professional On-Site Install</strong>: We safely disconnect, swap, and reconnect, then clean and grease the terminals to prevent future corrosion. On vehicles that need it, we preserve your settings during the swap.</li>
              <li><strong>Free Old-Battery Recycling</strong>: We haul away and properly recycle your old lead-acid battery at no charge—no environmental hassle for you.</li>
              <li><strong>Charging System Verified</strong>: After installing, we confirm your alternator is charging properly so the new battery won't suffer the same fate.</li>
              <li><strong>Warranty-Backed Batteries</strong>: The batteries we install come with a manufacturer warranty for peace of mind.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Don't wrestle a dead battery in a freezing parking lot. One call to iFAST and we'll deliver, install, and recycle—done in minutes.
            </p>
            <CallNowButton source="service_content_battery-replacement_why" />
          </>
        )
      },
      {
        title: 'On-Site Battery Replacement for Every Situation',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Stranded With a Dead Battery — No Jump Will Hold</h3>
            <p className="mb-4 text-gray-700">
              If your battery won't hold a charge even after a boost, a jump is just a temporary band-aid. We bring the right replacement to your location and install it on the spot so you're not stuck again an hour later. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: dead battery replacement Pickering, battery won't hold charge Ajax, emergency battery install Oshawa.</span>
            </p>
            <CallNowButton source="service_content_battery-replacement_dead" />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Planned Replacement Before It Fails</h3>
            <p className="mb-4 text-gray-700">
              Battery testing weak or 4–5 years old heading into winter? Replace it on your schedule, at home or the office, before it leaves you stranded on the coldest morning of the year. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: battery replacement at home Whitby, proactive battery change Ajax, mobile battery service Scarborough.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Underground Garages & Tight Spots</h3>
            <p className="mb-4 text-gray-700">
              Car dead on the P4 level where a tow truck can't reach? Our portable service comes right to your stall—we carry the battery down and install it without needing to move your vehicle. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: underground garage battery replacement Scarborough, condo parking battery install Ajax, low clearance battery service Whitby.</span>
            </p>
            <CallNowButton source="service_content_battery-replacement_garage" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How do you know which battery my car needs?', answer: 'We match the correct group size, cold-cranking amps, and terminal configuration to your year, make, model, and engine. Just give us those details over the phone and we\'ll bring the right one.' },
      { question: 'How fast can you replace my battery in the Greater Toronto Area?', answer: 'Our average arrival in Pickering, Ajax, Whitby, Oshawa, and Scarborough is under 30 minutes, and the install itself usually takes 15–20 minutes on-site.' },
      { question: 'Do you take away my old battery?', answer: 'Yes. We haul away and properly recycle your old lead-acid battery free of charge—no environmental fees or disposal hassle for you.' },
      { question: 'Will I lose my radio presets or settings when you swap the battery?', answer: 'On vehicles where it matters, our technician uses a memory-saver to preserve your settings during the swap. We\'ll let you know if your vehicle needs anything reset.' },
      { question: 'Do the batteries come with a warranty?', answer: 'Yes. The batteries we install carry a manufacturer warranty. Keep your receipt and we\'ll help if you ever need to claim it.' },
      { question: 'What if a replacement doesn\'t fix the problem?', answer: 'Before installing, we verify your charging system so the new battery won\'t be drained by a bad alternator. If the issue turns out to be elsewhere, we\'ll diagnose it and tell you exactly what\'s going on.' },
    ]
  },
  'pre-purchase-inspection': {
    id: 'pre-purchase-inspection',
    seoTitle: 'Mobile Pre-Purchase Car Inspection GTA | Used Car Check Before You Buy',
    seoDescription: 'Buying a used car in the GTA? iFAST sends a certified mobile mechanic to the car — engine, brakes, tires, suspension, and a full OBD diagnostic scan — with a straight verdict before you pay. Toronto, Scarborough, Pickering, Ajax, Whitby, Oshawa. Call for a quote.',
    keywords: 'pre purchase inspection Toronto, used car inspection GTA, mobile car inspection near me, pre purchase car inspection Scarborough, used car inspection Pickering, car inspection before buying Ontario, mobile mechanic inspection Ajax, independent used car inspection Whitby, vehicle inspection before buying Oshawa',
    heroImage: '/mobile_mechanic_hero.jpg',
    blogSections: [
      {
        title: 'Mobile Pre-Purchase Car Inspection — We Come to the Car, Anywhere in the GTA',
        content: (
          <>
            <p className="mb-4">
              You found a used car on Marketplace, Kijiji, or a dealer lot. The photos look clean, the seller sounds honest, and the price is good enough to make you nervous. Before any money changes hands, get someone on your side under the hood. <strong>{COMPANY_NAME}</strong> brings the inspection <strong>to the car</strong> — a private seller's driveway in Scarborough, a dealership lot in Ajax, a condo parking garage in North York. You don't have to talk the seller into driving anywhere, which is the step where most buyers give up and just hope for the best.
            </p>
            <p className="mb-4">
              A certified mobile mechanic meets you at the vehicle, works through it end to end, plugs in a diagnostic scanner, and then walks you through exactly what he found in plain English — what's fine, what needs attention soon, and what should make you walk away. You hear it standing at the car, while you still have every option open.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_intro" />
          </>
        )
      },
      {
        title: 'What We Check On a Pre-Purchase Inspection',
        content: (
          <>
            <p className="mb-4">
              This is the same checklist we bring to every pre-purchase call, whether the car is a $4,000 commuter or a $40,000 SUV:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Engine Start-Up &amp; Idle Behaviour</strong>: How it starts cold, how it idles, what it sounds like, and whether anything is smoking, ticking, or leaking.</li>
              <li><strong>OBD Diagnostic Scan</strong>: We plug in and read the stored and pending trouble codes — including codes a seller may have cleared recently, which is its own red flag.</li>
              <li><strong>Fluids</strong>: Oil, coolant, transmission, and brake fluid levels and condition. Burnt transmission fluid or oil mixed with coolant changes the whole conversation.</li>
              <li><strong>Battery &amp; Charging System</strong>: Battery health and alternator output, so a no-start two weeks after purchase isn't your first surprise.</li>
              <li><strong>Brakes</strong>: Pad and rotor condition, and how the car behaves stopping — often the single biggest "it needs work immediately" item on a used car.</li>
              <li><strong>Tires &amp; Suspension</strong>: Tread depth, age, uneven wear patterns that point to alignment or suspension problems, plus shocks, struts, and bushings.</li>
              <li><strong>Lights &amp; Electrical</strong>: Headlights, signals, brake lights, dash warning lamps, and whether any of them have been disabled to hide a fault.</li>
              <li><strong>Signs of Past Accident Repair</strong>: Mismatched paint, overspray, uneven panel gaps, replaced or wrinkled body panels, and frame-rail evidence that doesn't match what the seller told you.</li>
            </ul>
            <CallNowButton source="service_content_pre-purchase-inspection_checklist" />
          </>
        )
      },
      {
        title: 'What an Inspection Catches That a Test Drive Never Will',
        content: (
          <>
            <p className="mb-4">
              A twenty-minute test drive around the seller's neighbourhood tells you the car moves and the radio works. It does not tell you any of this:
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Trouble Codes Cleared Right Before You Arrived</h3>
            <p className="mb-4 text-gray-700">
              Disconnect the battery or plug in a $20 scanner and the check-engine light goes out for a while. It comes back. Our scan reads pending codes and readiness monitors, which is how a recently-cleared fault gives itself away.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Repair Bills That Are Weeks Away</h3>
            <p className="mb-4 text-gray-700">
              Brakes at 15% and tires at the wear bars aren't "problems" on a test drive — the car drives fine. They're a bill that lands the month after you buy. Knowing about them before you pay is either a negotiation or a reason to keep looking.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Accident Repair Nobody Mentioned</h3>
            <p className="mb-4 text-gray-700">
              Not every repaired car is a bad car, but you deserve to know. Paint that doesn't match under daylight, panel gaps that drift, fresh undercoating in one spot — a mechanic sees these in minutes and a buyer almost never does.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Leaks That Only Show On a Hoist — or On the Seller's Driveway</h3>
            <p className="mb-4 text-gray-700">
              We look where the car has been parked, not just at the car. A clean engine bay over a stained driveway is a story worth asking about.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_catches" />
          </>
        )
      },
      {
        title: 'Independent Means We Have No Stake in the Sale',
        content: (
          <>
            <p className="mb-4">
              We are not the seller, we are not the dealership's shop, and we don't get paid more if you buy the car. That's the entire value of the service. Our mechanic's only job is to tell you what's actually in front of you — including, more than once, "don't buy this one."
            </p>
            <p className="mb-4">
              We work across the whole Greater Toronto Area, with our fastest availability in the East GTA — Scarborough, Pickering, Ajax, Whitby, and Oshawa. Tell us where the car is and when the seller is free, and we'll meet you there, usually within a day.
            </p>
            <p className="mb-4">
              And because we're a roadside company first, the number you call for the inspection is the same one that answers at 2 a.m. if that new-to-you car ever leaves you stranded — <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">boosts</a>, <a href="/service/flat-tire-repair" className="text-brand-yellow font-bold hover:underline">flat tires</a>, lockouts, and <a href="/service/towing" className="text-brand-yellow font-bold hover:underline">towing</a>.
            </p>
            <p className="mb-4">
              Want to see how this plays out in practice? Read <a href="/blog/pre-purchase-car-inspection-ajax" className="text-brand-yellow font-bold hover:underline">how an Ajax buyer had us inspect a used car before she paid for it</a> — a real customer, in her own words.
            </p>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Spend a little before you buy, or a lot after. Call {PHONE_NUMBER} and we'll quote you on the spot.
            </p>
            <CallNowButton source="service_content_pre-purchase-inspection_independent" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How much does a pre-purchase car inspection cost?', answer: 'It depends on the vehicle and where it\'s parked, so we quote you on the call — tell us the year, make, and model and the location of the car, and you\'ll have a firm price before we book anything. There\'s no charge for the quote.' },
      { question: 'How long does the inspection take?', answer: 'Plan on about an hour at the vehicle for a typical car. Larger vehicles, or cars that turn up problems worth digging into, can run longer. We\'d rather take the extra fifteen minutes than miss something that costs you thousands.' },
      { question: 'Will you inspect a car at a dealership?', answer: 'Yes, and we do it regularly. Most dealers in the GTA will allow an independent inspection on their lot — if one refuses outright, that itself is worth knowing before you buy. Just arrange a time with them and we\'ll meet you there.' },
      { question: 'Is this a Safety Standards Certificate?', answer: 'No. An Ontario Safety Standards Certificate can only be issued by a licensed Motor Vehicle Inspection Station, and this is not that. This is an independent mechanical inspection to tell you what you\'re buying before you pay. If you need an SSC to register the car, you\'ll need a licensed MVIS separately.' },
      { question: 'What do I get at the end of the inspection?', answer: 'Our technician walks you through everything he found in plain English, right there at the car, and goes over the diagnostic scan results with you — including any stored or pending trouble codes. You can ask him anything you want while he\'s in front of the vehicle.' },
      { question: 'What if you find problems with the car?', answer: 'Then the inspection just paid for itself. You\'ll know exactly what\'s wrong and roughly what it takes to fix, which puts you in a position to negotiate the price down or walk away. Plenty of our customers have done both.' },
    ]
  }
};
