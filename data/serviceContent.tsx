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
    seoTitle: '24/7 Mobile Mechanic East GTA | Emergency On-Site Car Repair Pickering, Ajax, Oshawa',
    seoDescription: 'Need a mechanic that comes to you? iFAST Roadside provides 24/7 mobile mechanic services across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Expert diagnostics, on-site repairs, and emergency service. Call now.',
    keywords: 'mobile mechanic Pickering, emergency car repair Ajax, on-site mechanic Oshawa, mobile auto repair Whitby, 24/7 mechanic Scarborough, mobile engine diagnostics East GTA',
    heroImage: '/mobile_mechanic_hero.png',
    blogSections: [
      {
        title: 'Professional Mobile Mechanic Services Across the East GTA',
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
              Don't let a breakdown ruin your week. Call iFAST for the most reliable mobile mechanic service in the East GTA.
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
      { question: 'How much does a mobile mechanic cost in the East GTA?', answer: 'Our pricing is very competitive with local shops, and you save the cost of a tow. We provide a transparent diagnostic fee and a firm quote for parts and labor before any work begins.' },
      { question: 'Are your mobile mechanics certified?', answer: 'Yes, all our technicians are fully certified with years of experience in both shop and field environments. We use professional-grade equipment and follow manufacturer-specific repair procedures.' },
      { question: 'Do you offer a warranty on mobile repairs?', answer: 'Absolutely. We stand behind our work with a comprehensive warranty on both parts and labor, giving you peace of mind that your repair is done right.' },
      { question: 'Can you work on my car in a condo or apartment parking lot?', answer: 'In most cases, yes. We are experienced in working in tight spaces and low-clearance garages across Scarborough and Pickering. As long as we have enough room to safely access the vehicle, we can do the job.' },
      { question: 'How fast can you arrive for an emergency repair?', answer: 'We aim for a 30-60 minute arrival time for emergency diagnostic calls in Pickering, Ajax, and Whitby. We are available 24/7 for urgent mechanical issues.' },
    ]
  },
  'tire-change': {
    id: 'tire-change',
    seoTitle: '24/7 Mobile Tire Service & Flat Tire Repair East GTA | Pickering, Ajax, Oshawa',
    seoDescription: '24/7 Mobile Flat Tire Change Service Across the East GTA. Serving Pickering, Ajax, Whitby, Oshawa, and Scarborough. Rapid 30-min response. Call now for emergency tire repair.',
    keywords: 'flat tire change Pickering, mobile tire service Ajax, emergency flat tire repair Oshawa, onsite tire repair Whitby, 24/7 flat tire change Scarborough, mobile tire swap East GTA',
    heroImage: '/tire_service_hero_1773847732052.png',
    blogSections: [
      {
        title: '24/7 Mobile Flat Tire Service Across the East GTA (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Whether you're dealing with a sudden highway blowout, a slow leak you discovered in your driveway, or you need a seasonal winter-to-summer tire swap, <strong>{COMPANY_NAME}</strong> rolls a fully equipped tire shop directly to your location. We operate 24 hours a day, 7 days a week, 365 days a year. Our certified roadside technicians reach you in <strong>under 30 minutes on average</strong>, carrying state-of-the-art mounting tools, premium new tires, computerized balancers, and heavy-duty patching equipment.
            </p>
            <p className="mb-4">
              From the bustling traffic on the 401 near Whitby to the quiet residential suburbs of Pickering and Ajax, we handle every step of the tire replacement process on-site. We perform safe wheel removal using low-profile, non-marring jacks, precise lug nut torqueing to manufacturer specifications, digital air pressure checks, and safe lifting of your vehicle. There are no expensive tow trucks required and no dirty waiting rooms—just fast, dependable mobile flat-tire changes that keep your busy schedule intact.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Choose Mobile Tire Repair? Key Benefits',
        content: (
          <>
            <p className="mb-4">
              Driving on a flat tire—even for a few hundred feet—can permanently destroy the tire\'s internal steel belts and severely damage your expensive alloy rims. Calling a mobile tire technician is the safest and most cost-effective choice.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Rapid 30-Minute GPS Dispatch</strong>: We route the closest mobile unit directly to your live phone location for lightning-fast emergency flat tire repair in the East GTA.</li>
              <li><strong>Complete On-Site Replacements</strong>: Unlike generic roadside assistance that just slaps on your temporary "donut" spare, our vans carry standard inventory to replace destroyed tires completely.</li>
              <li><strong>Computerized Wheel Balancing</strong>: A replaced tire must be balanced. Our vans feature onboard digital balancers to prevent highway steering wheel vibration.</li>
              <li><strong>TPMS Sensor Resetting</strong>: We carry the digital scanners required to reset your car\'s Tire Pressure Monitoring System dashboard light after a repair.</li>
              <li><strong>Damage-Free Lifting</strong>: We use specialized pinch-weld rubber blocks and low-profile hydraulic jacks suitable for luxury sedans, lowered sports cars, and heavy-duty SUVs.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop Googling "flat tire change near me." One call to iFAST delivers the region's most trusted 24/7 complete mobile tire replacement—anytime, anywhere in Pickering, Ajax, or Oshawa.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Complete Mobile Tire Change Solutions — Emergency & Convenience',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Emergency Roadside Flat Tire Change – 24/7 East GTA</h3>
            <p className="mb-4 text-gray-700">
              Stuck on the shoulder of the 401, the DVP, or a dark downtown side street? Changing a passenger-side tire while transport trucks fly past is incredibly dangerous. Our rapid-response units arrive fully illuminated with high-viz strobe lights to secure the scene. We quickly jack the vehicle safely and swap your flat tire with your spare, or mount a new tire directly on the shoulder—no tow truck, no agonizing wait. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: emergency flat tire change Pickering, roadside flat tire repair Ajax, 401 flat tire help Oshawa, tire blowout repair Whitby.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Puncture Repair (Plugs & Internal Patches)</h3>
            <p className="mb-4 text-gray-700">
              Ran over a nail in a construction zone? If the puncture is located safely within the center tread zone of the tire (and not on the sidewall), you don't need a brand new tire. Our technicians will remove the wheel, dismount the tire from the rim, apply a permanent vulcanized mushroom patch from the inside, re-mount it, balance it, and reinstall it. This is the only permanent, Ministry of Transportation-approved method for fixing a flat.<br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: mobile tire plug Pickering, patch flat tire Ajax, nail in tire repair mobile Whitby.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. At-Home & Workplace Seasonal Swaps</h3>
            <p className="mb-4 text-gray-700">
              Skip the chaotic tire shop queues every Spring and Fall. We bring our mounting and balancing gear directly to your driveway, condo garage, or office parking lot in Brampton, Vaughan, or Markham. Perfect for commuters or busy families. You can literally sit at your desk working while we swap your winter tires to all-seasons right in the parking lot! <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: mobile tire swap at home Oshawa, onsite tire change Pickering, driveway seasonal tire change Ajax, winter tire installation mobile Whitby.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Stripped Lug Nut & Locking Wheel Nut Removal</h3>
            <p className="mb-4 text-gray-700">
              Lost the special key for your locking lug nuts? Or did a previous mechanic over-torque the bolts, leaving them stripped and impossible to remove with the standard trunk wrench? Our vans are equipped with heavy-duty impact wrenches, exact-fit extractor sockets, and the torque required to safely break free seized bolts without damaging your rims. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: locking wheel nut removal mobile Pickering, stripped lug nut extraction Oshawa.</span>
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: `About ${COMPANY_NAME} – Our Mission to Protect Drivers`,
        content: (
          <>
            <p className="mb-4">
              A terrifying winter blow-out on Highway 401 showed our founders just how long, cold, and legally risky roadside waits can be. Sitting in a freezing car waiting three hours for a massive heavy-duty tow truck—just to get a simple spare tire put on—made absolutely no sense. We realized the Greater Toronto Area needed a faster, highly-specialized, agile service for minor roadside emergencies.
            </p>
            <p className="mb-4">
              Today, {COMPANY_NAME} has grown into a premier 24/7 rapid-response network. By utilizing specialized cargo vans rather than massive flatbeds, our technicians cut through gridlock in Scarborough, navigate residential areas in Pickering and Ajax, and reach stranded families in Whitby and Oshawa in record time. Our focus is crystal clear: arrive fast, do the job safely with professional tools, and get you back to your life.
            </p>
            <CallNowButton />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How fast can your flat tire change East GTA team really reach me?', answer: 'Our average response time in Pickering, Ajax, Whitby, and Oshawa is under 30 minutes. By positioning local mobile units across the East End, we ensure lightning-fast emergency flat tire repair.' },
      { question: 'Do you offer 24/7 mobile tire service in Scarborough and Oshawa?', answer: 'Yes! We run our mobile tire response units 24/7 across the entire East GTA, including Scarborough, Pickering, Whitby, and Oshawa. We always have technicians local to these areas on call.' },
      { question: 'Can you repair a punctured tire in my Ajax or Whitby driveway?', answer: 'Absolutely. We bring the tire shop to you. If the puncture is safely located within the center tread zone, we will perform a permanent internal patch-and-plug repair right in your driveway or at the roadside.' },
      { question: 'My tire blew out on the 401 near Whitby. Do you carry new tires?', answer: 'Yes! While our base service involves installing your spare, we also stock common tire sizes. If you don\'t have a spare, provide your tire size over the phone and we will bring a brand new tire to mount and balance on-site.' },
      { question: 'Which exact areas fall under your East GTA tire service zone?', answer: 'We primarily serve Pickering, Ajax, Whitby, Oshawa, and Scarborough. Our local focus ensures we beat the wait times of larger, city-wide companies.' },
      { question: 'Can you change a tire in an underground garage in Scarborough?', answer: 'Yes! Our mobile tire vans are designed with low roof clearances to navigate underground parking structures in Scarborough and surrounding areas, providing service right in your parking stall.' },
      { question: 'What payment methods do you accept in the East End?', answer: 'Our technicians carry secure mobile terminals. We accept all major credit cards, Debit, Apple Pay, and Google Pay directly at your vehicle in Pickering, Ajax, or anywhere we serve.' },
      { question: 'Do I need to re-torque my wheels after you change the tire?', answer: 'Yes. For safety, lug nuts should be re-torqued after driving approximately 100 kilometers (60 miles) to ensure they are properly seated.' },
    ]
  },
  'jump-start': {
    id: 'jump-start',
    seoTitle: '24/7 Car Battery Jump Start East GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Dead battery? iFAST Roadside provides rapid 24/7 battery jump start services across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Safe, anti-surge boosters. Fast local dispatch.',
    keywords: 'car battery jump start Pickering, dead battery service Ajax, mobile jump start Oshawa, onsite battery boost Whitby, 24/7 jump start Scarborough, car won\'t start East GTA',
    heroImage: '/jump_start_hero_1773847771517.png',
    blogSections: [
      {
        title: '24/7 Mobile Battery Jump Start Service Across the East GTA (Pickering, Ajax, Whitby, Oshawa)',
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
              After witnessing hundreds of East GTA drivers waiting two to three hours for heavy tow companies just to get a simple two-minute battery jump, we knew the system was broken. Tow trucks prioritize high-paying collision calls over minor battery boosts. We built iFAST specifically to solve this delay.
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
      { question: 'How fast can a jump start tech reach me in Pickering or Ajax?', answer: 'We average under 30 minutes across the East GTA. By routing our local Pickering and Ajax units straight to your GPS pin, we consistently beat traditional tow truck ETAs.' },
      { question: 'Is it safe to jump start my car with your professional equipment?', answer: 'Yes. Unlike consumer cables, we use computerized, surge-protecting jump boxes that monitor voltage output to prevent damage to your vehicle\'s electronics.' },
      { question: 'What if my car won\'t start after a boost in Whitby or Oshawa?', answer: 'If your battery is completely dead or you have a failed starter, our technician will provide a diagnostic and can assist in dispatching a flatbed tow truck to a local Whitby or Oshawa mechanic.' },
      { question: 'How long should I leave my car running after a jump start?', answer: 'We recommend driving for 30 to 45 minutes to allow the alternator sufficient time to recharge the battery.' },
      { question: 'Do you provide jump starts in Scarborough underground garages?', answer: 'Absolutely. Our portable jump packs allow us to reach your car in the tightest parallel spots or the deepest Scarborough condo garages without needing a second vehicle nose-to-nose.' },
      { question: 'Can jumping a dead battery ruin my alternator?', answer: 'If the battery is defective, it can strain the alternator. Our technicians perform a quick read-out to advise if you need a replacement rather than just a boost.' },
      { question: 'What payment methods do you take in the East GTA?', answer: 'We accept all major Credit Cards, Interac Debit, Apple Pay, and Google Pay right at the site of the vehicle in Pickering, Ajax, Whitby, and Oshawa.' },
    ]
  },
  'lockout': {
    id: 'lockout',
    seoTitle: '24/7 Car Lockout Service East GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Locked your keys in your car? iFAST Roadside offers 100% damage-free 24/7 car lockout services across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Fast local dispatch.',
    keywords: 'car lockout service Pickering, keys locked in car Ajax, unlock car door Oshawa, mobile auto locksmith Whitby, emergency vehicle unlock Scarborough, keys locked in trunk East GTA',
    heroImage: '/car_lockout_hero_1773847808494.png',
    blogSections: [
      {
        title: '24/7 Emergency Car Lockout Service Across the East GTA (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Keys stranded in the cup holder while the doors are locked? Trunk closed with your smart fob buried inside a gym bag? Have an infant buckled in while the keys sit on the front seat? <strong>{COMPANY_NAME}</strong> provides rapid, 100% damage-free vehicle unlocking services—any hour, any day. Our highly trained lockout technicians reach you in <strong>under 30 minutes on average</strong>, equipped with professional, non-marring automotive entry tools designed to bypass complex door geometry.
            </p>
            <p className="mb-4">
              From busy, sprawling shopping mall parking lots in Pickering Town Centre to quiet residential streets in Whitby and Oshawa, we handle every single vehicle lockout with absolute precision. We strictly avoid the risks of scratched exterior clear-coat paint, torn internal weather stripping, or broken window glass. We get you back into the driver's seat securely, smoothly, and incredibly affordably.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Hire Professional Lockout Techs? Key Benefits',
        content: (
          <>
            <p className="mb-4">
              Trying to violently force a wire hanger or a crude metal jimmy down your window sill will inevitably destroy the physical linkage connecting your inner door handle to the lock actuator. Replacing a shattered window or a severed wiring harness costs exponentially more than professional entry.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Ultra-Rapid 30-Minute Dispatch</strong>: Lockouts are stressful and dangerous in extreme weather. We prioritize lockout dispatches to get to your location instantly.</li>
              <li><strong>100% Damage-Free Guarantee</strong>: We use specialized Teflon-coated structural tools and precisely calibrated pneumatic wedge systems to crack the door gap safely.</li>
              <li><strong>Specialists for All Vehicle Makes & Models</strong>: We possess the tactical training to bypass high-security deadbolts on German luxury cars (BMW, Audi, Mercedes), deeply recessed locks on modern SUVs, and fully flush electronic pull handles (Tesla).</li>
              <li><strong>Safe Trunk Access Experts</strong>: Accessing a locked trunk without breaking a taillight requires intricate cabin bypass techniques that our technicians perform daily.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop Googling "how to unlock a car door with a shoelace" or a coat hanger. One immediate call to iFAST delivers the region's safest 24/7 lockout response.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Complete Vehicle Entry Solutions for Any Scenario',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Emergency Cabin Unlocking (Keys in Ignition)</h3>
            <p className="mb-4 text-gray-700">
              Left your car running in a "Park and Ride" lot with the keys inside? We treat running-vehicle lockouts as immediate high-priority dispatches to prevent excessive fuel burn and carbon monoxide risks. Our multi-piece long-reach tools manipulate internal unlock actuator buttons without touching any internal electrical wiring. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: emergency car unlock Pickering, keys locked in car running Ajax, mobile vehicle unlock Oshawa.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Child or Pet Locked Inside (Code Red Dispatch)</h3>
            <p className="mb-4 text-gray-700">
              If an infant, young child, or pet is accidentally locked inside a vehicle—especially during sweltering GTA summer days or freezing winter nights—inform our dispatcher instantly. We push these to extreme priority "Code Red" dispatch status. <em>Please note: If the occupant appears distressed or the interior temperature is life-threatening, we will implore you to call 911 immediately while we simultaneously race to your location.</em> <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: locked baby in car unlock Ajax, emergency pet rescue auto lockout Pickering, fast vehicle door unlocking Whitby.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Commercial Fleet & Ride-Share Unlocking</h3>
            <p className="mb-4 text-gray-700">
              Rideshare drivers (Uber/Lyft), courier delivery vans, and commercial fleet operators lose income for every minute they are locked out of their workstation. Our aggressive GTA coverage zone ensures that commercial drivers get back into their cabs and back onto their lucrative routes instantly. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: commercial vehicle lockout Oshawa, delivery van unlock Whitby, fast auto locksmith Ajax.</span>
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: `About ${COMPANY_NAME} – Your Keys Delivered Safely`,
        content: (
          <>
            <p className="mb-4">
              We started the {COMPANY_NAME} roadside network specifically to solve the incredibly helpless feeling of staring at your car keys through a sheet of glass. Most standard towing companies in the East End view lockouts as annoying secondary calls, forcing you to wait hours while they handle collisions.
            </p>
            <p className="mb-4">
              By utilizing smaller, considerably faster urban dispatch vehicles, our dedicated East GTA lockout technicians cut through local Pickering gridlock and Scarborough traffic circles to ensure you are never left standing outside your immobilized vehicle for long.
            </p>
            <CallNowButton />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Will unlocking my car damage my door or window in Whitby?', answer: 'Absolutely not. We guarantee 100% damage-free entry. We use soft, non-marring Teflon tools and pneumatic wedges to safely flex the door frame just enough to actuate the lock without harming your clear-coat or weather stripping.' },
      { question: 'How quickly can a lockout tech reach me in Oshawa or Pickering?', answer: 'Our average arrival time in the East GTA is 30 minutes or less. We treat lockouts as high-priority security issues and dispatch our local nomadic units immediately.' },
      { question: 'What if my car alarm goes off during the unlock in Ajax?', answer: 'This is normal for modern security systems. Once the door is open, you simply use your fob or ignition key to silence the alarm. Our technicians handle this safely every day.' },
      { question: 'Do you require proof of ownership in Scarborough?', answer: 'Yes. To prevent auto theft, we verify your Driver\'s License against the vehicle registration or insurance once the car is safely opened.' },
      { question: 'Can you bypass high-security locks on luxury cars in the East End?', answer: 'Yes. We are trained on complex double-deadlock systems (BMW, Audi, Mercedes) and electronic handles (Tesla) to ensure a seamless entry without damage.' },
      { question: 'I locked my keys in my trunk in Whitby. Can you help?', answer: 'Yes. Trunk access is complex but achievable. We can unlock the main cabin and use specialized long-reach tools to trigger the internal trunk release or fold down seats to retrieve your fob.' },
    ]
  },
  'fuel': {
    id: 'fuel',
    seoTitle: '24/7 Emergency Fuel Delivery East GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Ran out of gas? iFAST Roadside provides rapid 24/7 emergency fuel delivery (regular, premium, diesel, DEF) across Pickering, Ajax, Whitby, Oshawa, and Scarborough.',
    keywords: 'emergency fuel delivery Pickering, ran out of gas Ajax, roadside gas delivery Oshawa, diesel delivery Whitby, 24/7 fuel service Scarborough, highway 401 gas delivery East GTA',
    heroImage: '/fuel_delivery_hero_1773847948357.png',
    blogSections: [
      {
        title: '24/7 Mobile Emergency Fuel Delivery Across the East GTA (Pickering, Ajax, Whitby, Oshawa)',
        content: (
          <>
            <p className="mb-4">
              Did the gas gauge drop drastically faster than expected while idling on the 401? Stuck completely immobilized on the precarious shoulder near Whitby or Oshawa with a bone-dry tank? <strong>{COMPANY_NAME}</strong> effectively brings the gas station pump directly to your exact GPS coordinates. We safely deliver enough high-quality, station-fresh fuel straight to your vehicle—any hour, any day, across the entire East GTA—to get you moving again.
            </p>
            <p className="mb-4">
              Abandoning your car to walk miles down the gravel shoulder of a busy highway near Ajax or Pickering with a cheap plastic jerry can is incredibly dangerous and highly discouraged. Stay safely locked inside your vehicle. Our professionally certified roadside technicians race to you in <strong>under 30 minutes on average</strong> carrying customized supplies of 87 Octane Regular, 91/93 Premium Unleaded, Ultra-Low Sulfur Diesel, and even commercial-grade Diesel Exhaust Fluid (DEF).
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Why Choose iFAST Fuel Delivery? Critical Safety & Convenience',
        content: (
          <>
            <p className="mb-4">
              Transporting highly combustible automotive fuels in generic, unvented containers inside the trunk of an Uber or a friend\'s car is a severe fire hazard and technically illegal under Ontario transport laws. We serve the East End with commercial-grade, DOT-approved and fully vented steel containers to transport fuel safely.
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Lightning-Fast 30-Minute Highway Response</strong>: Out-of-gas scenarios on major GTA highways are classified as extreme safety hazards. We prioritize these dispatch tickets instantly.</li>
              <li><strong>Zero Contamination Guarantee</strong>: We exclusively pump fresh fuel daily from premium top-tier stations (Shell/Petro-Canada/Esso). We never store stale, phased-separated gas in our vans.</li>
              <li><strong>Safe Diesel Priming Assistance</strong>: Diesel engines that run completely dry often ingest air into the high-pressure fuel injectors. Our techs can guide you through the manual priming sequence to bleed the air and ensure your diesel engine actually restarts.</li>
              <li><strong>Multi-Grade Selection</strong>: We don\'t just dump cheap 87 into a turbocharged luxury car engine avoiding catastrophic engine knock. We deliver the exact Octane your manufacturer demands.</li>
            </ul>
            <p className="font-semibold text-lg text-brand-dark mb-4">
              Stop panicking about a blinking empty light. One fast call to iFAST legally and safely delivers the region's fastest emergency petrol resupply.
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: 'Complete Roadside Fuel Solutions for Every Vehicle',
        content: (
          <>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. High-Speed Highway Emergency Gas Delivery</h3>
            <p className="mb-4 text-gray-700">
              Running out of gas on the express lanes of the 401, 404, or QEW is utterly terrifying. Transport trucks are flying past just inches from your mirror. We dispatch our brightest strobe-equipped service vehicles immediately to your live GPS pin, creating a high-visibility buffer zone behind your car while we rapidly pour 2 to 5 gallons directly into your filler neck. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: highway gas delivery East GTA, out of gas on 401 Whitby, emergency roadside fuel Oshawa.</span>
            </p>
            <CallNowButton />

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Commercial Truck Diesel & DEF Fluid Top-Offs</h3>
            <p className="mb-4 text-gray-700">
              Commercial heavy-duty drivers and modern diesel pickup truck owners (Powerstroke, Duramax, Cummins) aren't left stranded. If your truck has violently entered "Limp Mode" restricted speed because the Diesel Exhaust Fluid (DEF) tank ran dry, we dispatch tech units carrying multi-gallon jugs of DEF alongside Ultra-Low Sulfur Diesel to get your payload back underway. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: roadside diesel delivery Pickering, DEF delivery service Ajax, commercial truck out of gas Oshawa.</span>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Premium 91/94 Octane Exotic Car Resupply</h3>
            <p className="mb-4 text-gray-700">
              Most generic tow companies only carry 87 Octane. Putting 87 into a finely tuned Porsche, BMW M-series, or tuned JDM sports car can trigger severe engine timing retardation and cylinder knock. Inform our dispatchers of your vehicle type, and we will purposefully run to the station to fill our safe-cans with premium 91 or 94 Octane specifically for your engine. <br/>
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: premium gas delivery Scarborough, luxury car out of gas Pickering, high octane emergency fuel Ajax.</span>
            </p>
            <CallNowButton />
          </>
        )
      },
      {
        title: `About ${COMPANY_NAME} – Rapid Fuel Logistics`,
        content: (
          <>
            <p className="mb-4">
              A stranded vehicle representing a concrete roadblock without power steering or power brakes is a massive collision risk to the GTA public. We expressly built our bespoke fuel delivery protocol around absolute speed, spatial awareness, and customer safety. 
            </p>
            <p className="mb-4">
              While legacy tow trucks force you to wait in danger for a $150 hook-up, our agile sprint-vans slice seamlessly through downtown gridlock and suburban traffic to refuel your tank, charge a fraction of the cost, and get you safely accelerating back into the flow of traffic.
            </p>
            <CallNowButton />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How much gas do you bring to my location in Pickering or Ajax?', answer: 'We typically deliver 10 to 20 liters (2.5 to 5.5 gallons), which is more than enough to get you to the nearest major station in Pickering, Ajax, or Oshawa.' },
      { question: 'Can you bring Premium 91 or 94 Octane to Whitby or Scarborough?', answer: 'Absolutely. We strictly provide the correct octane for your engine. Tell our dispatchers your requirements, and we will fill fresh from a top-tier station before arriving.' },
      { question: 'Do you deliver Diesel or DEF fluid in the East GTA?', answer: 'Yes! We carry dedicated, uncontaminated containers for Ultra-Low Sulfur Diesel and DEF to support both passenger cars and commercial trucks in our service area.' },
      { question: 'What should I do while waiting on the 401 shoulder in Oshawa?', answer: 'Stay inside your vehicle with your seatbelt buckled and hazard lights on. Do not exit the car. Our strobe-equipped unit will arrive within 30 minutes to provide a safety buffer.' },
      { question: 'What if my car won\'t start even with fresh fuel?', answer: 'If your fuel pump has failed from running dry, we can immediately arrange for a flatbed tow to a local East GTA mechanic.' },
      { question: 'Can you refuel my car in a Scarborough underground garage?', answer: 'Yes. Our low-profile vans and secure canisters allow us to refuel vehicles safely in any parking structure in Scarborough or the surrounding suburbs.' },
    ]
  },
  'towing': {
    id: 'towing',
    seoTitle: '24/7 Emergency Towing Service East GTA | Pickering, Ajax, Oshawa',
    seoDescription: 'Reliable 24/7 emergency flatbed towing service across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Safe, damage-free transport for accidents and breakdowns.',
    keywords: 'tow truck Pickering, emergency towing Ajax, flatbed tow truck Oshawa, accident towing Whitby, AWD towing Scarborough, luxury car towing East GTA',
    heroImage: '/roadside_technician_towing.png',
    blogSections: [
      {
        title: '24/7 Fast & Reliable Flatbed Towing Across the East GTA (Pickering, Ajax, Whitby)',
        content: (
          <>
            <p className="mb-4">
              Experiencing a catastrophic internal engine failure? Suffered a major collision in an intersection? When a simple roadside repair simply isn't feasible, <strong>{COMPANY_NAME}</strong> provides elite, 100% damage-free flatbed towing services operating aggressively across the East GTA. Our heavy-duty hydraulic flatbed trucks are fueled and active 24/7, ready to safely winch your immobilized vehicle from danger and securely transport it to your driveway, a licensed mechanic, or directly to a regional Collision Reporting Centre in Pickering or Oshawa.
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
              <span className="text-sm text-gray-400 italic mt-1 block">Keywords: flatbed towing East GTA, luxury car towing Scarborough, AWD safe tow truck Ajax, luxury transport Oshawa.</span>
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
              The Ontario towing industry historically harbored a dismal reputation for hidden surprise fees, aggressive roadside intimidation tactics, and shoddy vehicle care. {COMPANY_NAME} was brutally forged to be the exact operational opposite. We established our extensive East GTA towing division on a rigid foundation of absolute corporate transparency.
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
      { question: 'Why use a flatbed for towing in the East GTA?', answer: 'Flatbeds are the only safe way to transport modern AWD and luxury vehicles without destroying the transmission. We lift your car entirely off the ground, ensuring zero wear during the trip to Pickering, Ajax, or Oshawa.' },
      { question: 'Will my insurance reimburse the tow from Scarborough or Whitby?', answer: 'Yes, most policies cover towing for accidents or breakdowns. We provide detailed digital receipts for easy reimbursement from your insurance provider.' },
      { question: 'Can I ride in the tow truck cab to my destination in Oshawa?', answer: 'Absolutely. Our trucks feature clean, climate-controlled "Super Cabs" that can comfortably seat up to two passengers.' },
      { question: 'How is the final price calculated for an East End tow?', answer: 'We offer transparent pricing with a flat hook-up fee plus a per-kilometer rate. Call us for an exact quote to any destination in the East GTA.' },
      { question: 'What if a "chaser" truck shows up in Ajax or Pickering?', answer: 'You have the legal right to choose your tow company. Command them to step away and wait for iFAST\'s licensed professionals to arrive for a safe, honest experience.' },
      { question: 'Can you get my car out of a low Scarborough underground garage?', answer: 'Yes. We use specialized low-profile extraction units to pull your car out of tight Scarborough garages and then transfer it to a flatbed for safe transport.' },
    ]
  }
};
