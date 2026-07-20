import React from 'react';
import { PhoneCall, CheckCircle2, AlertTriangle, Clock, DollarSign, ThumbsUp, ThumbsDown, Star, Gauge, ShieldCheck, BatteryCharging, KeyRound, Snowflake, MapPin, Wrench } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_NAME } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const BlogCTA = ({ source }: { source: string }) => (
  <div className="my-8 bg-brand-dark rounded-2xl p-8 text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-yellow rounded-full blur-[80px] opacity-20"></div>
    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        Available Now — East GTA
      </div>
      <p className="text-white font-black text-xl md:text-2xl mb-6">Stranded right now? Don't wait.</p>
      <a
        href={`tel:${PHONE_NUMBER}`}
        onClick={() => trackPhoneCall(source)}
        className="inline-flex items-center justify-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-white px-8 py-4 rounded-xl font-black text-xl transition-all duration-300 shadow-[0_8px_25px_rgba(255,90,31,0.4)] hover:-translate-y-0.5"
      >
        <PhoneCall size={22} fill="currentColor" />
        Call {PHONE_NUMBER}
      </a>
      <p className="text-white/50 text-xs mt-3">Average arrival: 15–30 min · Pickering · Ajax · Whitby · Oshawa · Scarborough</p>
    </div>
  </div>
);

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  category: string;
  publishDate: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  sections: {
    heading?: string;
    content: React.ReactNode;
  }[];
  faqs: { question: string; answer: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  /* ============================================================
     POST 1: FLAT TIRE ON THE 401
     ============================================================ */
  {
    slug: 'flat-tire-on-401-east-gta',
    title: 'Flat Tire on the 401? Here\'s Exactly What to Do (East GTA\'s Fastest Response)',
    excerpt: 'A blowout at highway speed is one of the most dangerous moments a driver can face. Here\'s the exact step-by-step survival guide for flat tires on the 401, 412, and 407 in East GTA — and why calling a mobile tire specialist is safer than changing it yourself.',
    seoTitle: 'Flat Tire on the 401? What to Do + East GTA\'s Fastest Roadside Tire Service | iFAST',
    seoDescription: 'Blown a tire on the 401 near Pickering, Ajax, or Oshawa? Read our step-by-step highway flat tire guide, then call iFAST for a 15-30 minute mobile tire response across East GTA.',
    keywords: 'flat tire 401, blowout highway Ontario, flat tire Pickering, flat tire Ajax, emergency tire service East GTA, tire blowout Oshawa, roadside tire repair Whitby, what to do flat tire highway Ontario',
    category: 'Emergency Tips',
    publishDate: '2026-05-04',
    readTime: '7 min read',
    heroImage: '/tire_service_hero.jpg',
    heroImageAlt: 'Mobile tire service technician responding to flat tire on Ontario highway',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            It happens in an instant. You hear a loud bang, the steering wheel yanks hard to one side, and 60 km/h of momentum is suddenly working against you. A highway blowout is terrifying — and statistically, how you react in the next 8 seconds determines whether this is a minor inconvenience or a catastrophic accident. This guide covers exactly what to do, why DIY tire changes on the highway shoulder are dangerous, and how <strong>{COMPANY_NAME}</strong> responds across Pickering, Ajax, Whitby, Oshawa, and Scarborough in under 30 minutes.
          </p>
        )
      },
      {
        heading: 'Step 1: Don\'t Panic — Control the Car First',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Your first instinct will be to brake hard. <strong className="text-red-600">Do not do this.</strong> Sudden braking after a blowout causes the car to spin. Here is the exact sequence to follow:
            </p>
            <ol className="list-none space-y-4 mb-6">
              {[
                { num: '01', title: 'Grip the wheel firmly with both hands', desc: 'The car will pull toward the flat. Hold your line and resist the pull — do not jerk the wheel.' },
                { num: '02', title: 'Ease off the accelerator slowly', desc: 'Lift your foot gradually. Don\'t hit the gas or the brake. Let aerodynamic drag slow the vehicle naturally.' },
                { num: '03', title: 'Signal right and move to the shoulder', desc: 'Check your mirrors, activate your turn signal, and steer calmly to the right shoulder or the nearest exit ramp.' },
                { num: '04', title: 'Apply brakes gently only once under 50 km/h', desc: 'Only begin braking softly once you\'re off the main lanes and below highway speed.' },
                { num: '05', title: 'Get as far off the road as possible', desc: 'Drive as far right as you can — beyond the rumble strips, onto the gravel if available. Distance from traffic is survival.' },
              ].map(s => (
                <li key={s.num} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-3xl font-black text-brand-yellow/50 leading-none">{s.num}</span>
                  <div>
                    <p className="font-bold text-brand-dark">{s.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )
      },
      {
        heading: 'Step 2: Make Yourself Visible — Then Call for Help',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Once the car is stopped on the shoulder, your job is to make it impossible for other drivers to miss you — especially at night or in bad weather.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-gray-700">
              <li><strong>Turn on your hazard lights immediately.</strong> This is the first thing you do before the car even stops rolling.</li>
              <li><strong>Stay inside the vehicle</strong> if you are on a high-speed highway like the 401. Transport trucks create wind blasts that can knock a person off their feet from the shoulder.</li>
              <li><strong>If you have road flares or reflective triangles,</strong> deploy them 30–50 metres behind your vehicle — but only if you can do so safely without entering traffic lanes.</li>
              <li><strong>Call a professional mobile tire service</strong> from inside your locked car. Do not attempt to change the tire yourself on a live highway shoulder.</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  <strong>Ontario Highway Traffic Act reminder:</strong> Stopping on a 400-series highway shoulder without an emergency is illegal. But a flat tire qualifies. Move as far right as possible and activate all warning signals.
                </p>
              </div>
            </div>
            <BlogCTA source="blog_flat401_mid1" />
          </>
        )
      },
      {
        heading: 'Why You Should Never Change a Tire on a Highway Shoulder',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              You might think: "I know how to change a tire — I'll just do it myself." Here is why that calculation changes completely on a 401 shoulder:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '💥', title: 'Transport truck wind blast', desc: 'An 80,000 lb transport at 110 km/h generates a pressure wave that can push you into traffic.' },
                { icon: '🌙', title: 'Night visibility', desc: 'Drivers on the 401 are focused on the lanes. A person crouching beside a car in the dark is nearly invisible.' },
                { icon: '⚡', title: 'Jack instability on asphalt', desc: 'Roadside asphalt has a crown and surface voids. A scissor jack can slip, dropping your car while you\'re under it.' },
                { icon: '🛞', title: 'No wheel balancing', desc: 'Slapping on a donut spare with no balancing creates dangerous highway-speed wobble. A mobile service mounts and balances a proper tire on-site.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              Professional roadside technicians — like {COMPANY_NAME}'s teams — arrive with amber strobe light bars, high-visibility vests, proper traffic cones, and the correct tools to secure the work zone and change your tire safely. It is simply not a fair comparison.
            </p>
          </>
        )
      },
      {
        heading: 'iFAST\'s Highway Flat Tire Response: What Actually Happens',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              When you call iFAST from a highway shoulder in East GTA, here is what happens:
            </p>
            <ol className="space-y-4 mb-6">
              {[
                { step: 'You call, we dispatch instantly', desc: 'Our dispatcher identifies your location using the cell tower your call is hitting. You don\'t need to know the exact highway marker.' },
                { step: 'Nearest unit is routed to you', desc: 'We have units pre-positioned across Pickering, Ajax, Whitby, and Oshawa. Average response time on the 401 corridor is 15–30 minutes.' },
                { step: 'We set up a safe work zone', desc: 'Our vans arrive with roof-mounted amber strobes, reflective cones, and high-viz gear. We create a buffer between you and traffic.' },
                { step: 'We mount a new tire (not just a spare)', desc: 'We carry a range of common tire sizes on the van. In most cases, we mount a proper full-size tire — not a 50 km/h-limited donut.' },
                { step: 'We balance and pressure-check', desc: 'Every tire we install is balanced on our onboard digital balancer. We reset your TPMS sensor light before we leave.' },
              ].map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-8 h-8 bg-brand-yellow text-white rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-bold text-brand-dark">{s.step}</p>
                    <p className="text-gray-600 text-sm">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <BlogCTA source="blog_flat401_mid2" />
          </>
        )
      },
      {
        heading: 'Coverage: The 401 Corridor Across East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              {COMPANY_NAME} covers the full 401 corridor from Scarborough through Pickering, Ajax, Whitby, and Oshawa — as well as the 412 and 407 toll routes and the 115/35 north of Oshawa. If you're stranded anywhere in Durham Region or East Toronto, we have a unit nearby.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Pickering', highway: 'Hwy 401 (Exit 394–401)', eta: '15–20 min' },
                { city: 'Ajax', highway: 'Hwy 401 (Exit 410–412)', eta: '15–25 min' },
                { city: 'Whitby', highway: 'Hwy 401 (Exit 419–425)', eta: '20–25 min' },
                { city: 'Oshawa', highway: 'Hwy 401 (Exit 431–438)', eta: '20–30 min' },
                { city: 'Scarborough', highway: 'Hwy 401 (Exit 375–390)', eta: '20–30 min' },
                { city: '407 / 412', highway: 'Full Durham stretch', eta: '25–35 min' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60 mb-1">{c.highway}</p>
                  <p className="text-sm font-bold flex items-center justify-center gap-1"><Clock size={12} /> {c.eta}</p>
                </div>
              ))}
            </div>
          </>
        )
      }
    ],
    faqs: [
      { question: 'Can I drive on a flat tire to the next exit?', answer: 'No. Driving even 100 metres on a flat destroys the tire\'s internal steel belts and can severely gouge your alloy rim — a rim replacement costs $300–$800+. Stay put and call iFAST.' },
      { question: 'Will iFAST come to the 401 shoulder at night?', answer: 'Yes. We are available 24/7, 365 days a year including overnight, weekends, and holidays. Night calls on the 401 are common and our technicians are fully equipped with lit work zones.' },
      { question: 'What if I don\'t have a spare tire?', answer: 'That\'s fine. Our vans carry common tire sizes. We can mount a brand-new tire directly on your rim on-site. We\'ll discuss options and pricing before doing any work.' },
      { question: 'How much does a highway tire change cost?', answer: 'Costs vary based on tire size and whether a repair or replacement is needed. We provide a transparent quote before work begins. There are no hidden fees or surprise charges.' },
      { question: 'What if I\'m not sure exactly where I am on the highway?', answer: 'Don\'t worry. Give us your best description (the last exit you passed, the city you were in) and our dispatcher will use your call location to route the nearest unit. Green highway distance marker signs also show exact km positions.' },
    ]
  },

  /* ============================================================
     POST 2: WINTER ROADSIDE EMERGENCIES ONTARIO
     ============================================================ */
  {
    slug: 'winter-roadside-emergencies-ontario-guide',
    title: 'Winter Roadside Emergencies in Ontario: The Complete Driver\'s Guide (2026)',
    excerpt: 'Ontario winters turn routine drives into potential disasters. Dead batteries, frozen locks, highway blowouts on ice — this complete guide covers every winter emergency, what causes it, and exactly what to do when it happens in East GTA.',
    seoTitle: 'Winter Roadside Emergencies Ontario 2026: Complete Driver\'s Guide | iFAST East GTA',
    seoDescription: 'Dead battery in the cold? Flat tire on ice? Locked out in a snowstorm? iFAST Roadside covers every winter emergency across Pickering, Ajax, Whitby, Oshawa, and Scarborough — 24/7.',
    keywords: 'winter roadside emergencies Ontario, dead battery cold weather Ontario, winter flat tire East GTA, frozen car lock Pickering, winter car breakdown Ajax, cold weather battery jump start Whitby, winter driving Ontario 2025',
    category: 'Seasonal Guide',
    publishDate: '2026-05-04',
    readTime: '9 min read',
    heroImage: '/mobile_mechanic_hero.jpg',
    heroImageAlt: 'Roadside technician helping driver during Ontario winter emergency',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            Every October, millions of Ontario drivers start gambling with winter. They skip the tire swap until it snows. They ignore the battery warning light. They forget a blanket in the trunk. Then the temperature drops to −18°C on a Tuesday morning and the car doesn't start. This guide is the complete playbook for every winter roadside emergency you might face across East GTA — written by the team that responds to them every single day.
          </p>
        )
      },
      {
        heading: 'Emergency #1: Dead Battery in the Cold',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              This is our single most common winter call. A battery that struggled through summer's heat becomes completely useless at −15°C. Here's the physics: cold temperatures slow the chemical reactions inside a battery, cutting its output by up to 50%. Simultaneously, cold engine oil becomes thick, requiring more cranking power to start. The battery is at half power when the engine demands twice the effort.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
              <p className="text-blue-900 font-bold text-sm">Warning signs your battery won't survive the winter:</p>
              <ul className="text-blue-800 text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Engine cranks slowly on cold mornings</li>
                <li>Battery warning light on the dashboard</li>
                <li>Battery is 3+ years old</li>
                <li>Headlights dim slightly when starting</li>
                <li>You've jump-started the car more than once this year</li>
              </ul>
            </div>
            <p className="mb-4 text-gray-700">
              <strong>What to do:</strong> Call iFAST for a professional battery jump start or battery replacement. We use surge-protected commercial boosters that won't fry your car's sensitive electronics — unlike jumper cables connected incorrectly to a donor vehicle. If the battery is dead dead (not just weak), we can install a new battery on-site.
            </p>
            <BlogCTA source="blog_winter_battery_cta" />
          </>
        )
      },
      {
        heading: 'Emergency #2: Car Won\'t Start (Not the Battery)',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Sometimes the battery is fine but the car still won't start in winter. Common cold-weather causes:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { cause: 'Frozen fuel line', detail: 'Water condensation in the fuel tank can freeze in the fuel line, blocking fuel flow. More common in older vehicles and with low fuel levels.' },
                { cause: 'Thick engine oil', detail: 'Cars that haven\'t been serviced use old, viscous oil that barely flows at −20°C. Switch to a 0W-30 or 5W-30 winter-spec oil before December.' },
                { cause: 'Failed starter motor', detail: 'Cold weather accelerates the failure of a starter that\'s already worn. You\'ll hear a single click instead of a crank.' },
                { cause: 'Flooded engine (older carb vehicles)', detail: 'Too many start attempts can flood the engine. Stop cranking, wait 10 minutes, and try without pressing the gas.' },
                { cause: 'Immobilizer / security system glitch', detail: 'Cold temperatures can cause key fob batteries to fail, tripping the immobilizer. Replace the fob battery first.' },
              ].map(item => (
                <li key={item.cause} className="flex gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle2 className="text-brand-yellow flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold text-brand-dark text-sm">{item.cause}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              Our mobile mechanics carry diagnostic computers that read live sensor data and identify the exact cause within minutes — no guessing, no "try this and see."
            </p>
          </>
        )
      },
      {
        heading: 'Emergency #3: Flat Tire or Blowout on Ice',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              A flat tire is always inconvenient. A flat tire at 90 km/h on an icy Ontario highway is life-threatening. The same control techniques apply (don't brake suddenly, steer gently to the shoulder) but everything is harder on ice. Here's what makes winter flats worse:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
              <li><strong>Your hands are cold</strong>, making it harder to safely handle a jack and wheel nuts</li>
              <li><strong>The ground is frozen or icy</strong>, making a hydraulic jack unstable</li>
              <li><strong>Snow and ice pack into the wheel well</strong>, making it hard to position the jack properly</li>
              <li><strong>You're wearing thick gloves</strong> that reduce grip on tools</li>
              <li><strong>Wet lug nuts seize</strong> onto the studs in the cold</li>
            </ul>
            <p className="mb-4 text-gray-700">
              Beyond technique, winter tires significantly reduce your blowout risk to begin with. Ontario law doesn't mandate winter tires province-wide (Quebec does), but they reduce stopping distance on ice by up to 50%. iFAST offers on-site seasonal tire swaps — we come to your home or office and do the swap in your driveway.
            </p>
            <BlogCTA source="blog_winter_tire_cta" />
          </>
        )
      },
      {
        heading: 'Emergency #4: Locked Out in a Snowstorm',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Car lockouts don't care about the weather. In fact, winter makes them more common: gloves make keys slippery, people rush out of warm buildings, and some older door lock mechanisms literally freeze. Freezing rain can ice over the door lock cylinder entirely.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-brand-dark mb-2">If your lock is frozen:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>DO use a commercial deicer spray (not boiling water)</li>
                  <li>DO gently warm the key with your hands before inserting</li>
                  <li>DON'T force the key — it will snap</li>
                  <li>DON'T use a lighter on the lock barrel</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-brand-dark mb-2">If your keys are inside:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Stay warm — get inside a nearby building</li>
                  <li>Call iFAST for a professional damage-free unlock</li>
                  <li>We use non-marring tools that won't scratch door panels or weather seals</li>
                  <li>Typical arrival in East GTA: 20–35 min</li>
                </ul>
              </div>
            </div>
          </>
        )
      },
      {
        heading: 'Emergency #5: Running Out of Fuel in the Cold',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Running out of gas is embarrassing any time of year. In winter, it becomes dangerous. Standing outside your car on an icy shoulder in −10°C while waiting for help is a frostbite scenario. Here's the key rule: <strong>never let your tank drop below a quarter in Ontario winters.</strong>
            </p>
            <p className="mb-4 text-gray-700">
              Why? Beyond the obvious risk of running dry, a low fuel tank also increases condensation inside the tank, which can add water to your fuel system and contribute to a frozen fuel line. Keep the tank topped up.
            </p>
            <p className="mb-4 text-gray-700">
              If you do run dry, stay in your car with the hazard lights on and call {COMPANY_NAME}. We deliver premium, regular, or diesel fuel directly to your location across East GTA — you never have to leave the warm vehicle.
            </p>
          </>
        )
      },
      {
        heading: 'Your Winter Car Emergency Kit',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              The best protection against winter roadside emergencies is preparation. Keep these in your trunk from November through April:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                'Warm blanket + extra gloves and hat',
                'Booster cables or a portable jump starter',
                'Small bag of sand or cat litter (traction)',
                'Collapsible snow shovel',
                'Ice scraper + long-reach snow brush',
                'Road flares or LED warning triangles',
                'Flashlight with fresh batteries',
                'Bottled water + snack bars',
                'First aid kit',
                'Phone charger + power bank',
                'Lock deicer spray (keep one in your pocket, not the car)',
                'iFAST contact saved: +1 437-215-3468',
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <BlogCTA source="blog_winter_kit_cta" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Does cold weather really kill car batteries that fast?', answer: 'Yes. At −18°C, a battery loses roughly 40–50% of its cranking power. A battery that tested "fine" in September can fail completely when January hits. Batteries older than 3–4 years should be tested each fall before winter sets in.' },
      { question: 'Does iFAST operate in bad weather?', answer: 'Absolutely. Snow, freezing rain, and cold are when we\'re needed most. Our vehicles are equipped for winter conditions and our technicians are trained for safe roadside work in low-visibility, icy environments. We are fully operational 24/7 all winter.' },
      { question: 'Are winter tires worth it in the East GTA?', answer: 'Without question, yes. Durham Region roads and the 401 corridor can be treacherous from November through March. Winter tires have a stopping distance advantage of up to 50% over all-season tires on ice. iFAST offers convenient at-home seasonal tire swaps so there\'s no excuse to skip them.' },
      { question: 'My car has remote start — does that prevent winter battery issues?', answer: 'Remote start warms the engine, which helps oil flow, but it doesn\'t meaningfully charge a weak battery. The alternator charges while the engine runs, but short remote-start sessions don\'t give the alternator enough time to recover a deeply depleted battery. Get the battery tested annually.' },
      { question: 'What if I\'m stranded in winter and my phone battery is low?', answer: 'Call us first before your phone dies. Give your location (the nearest cross-streets, exit ramp, or landmark). Then conserve your battery by putting the phone in low-power mode. If possible, stay in your locked, running vehicle (cracked window for CO safety) and wait for our team to arrive.' },
    ]
  },

  /* ============================================================
     POST 3: CAA VS. INDEPENDENT ROADSIDE ASSISTANCE
     ============================================================ */
  {
    slug: 'caa-vs-independent-roadside-assistance-ontario',
    title: 'CAA vs. Independent Roadside Assistance: What Nobody Tells You',
    excerpt: 'Millions of Ontarians pay $100+ a year for CAA memberships. But when you\'re stranded on the 401 at midnight in January, does CAA actually deliver? An honest, data-backed comparison between CAA and independent local services like iFAST — with no agenda.',
    seoTitle: 'Is CAA Worth It in Ontario? Real Cost vs. Independent Roadside (2026)',
    seoDescription: 'Is CAA actually worth it in Ontario? We break down the real membership cost, wait times, and coverage vs. calling an independent service like iFAST — so you know which is faster and cheaper before you\'re stranded on the 401.',
    keywords: 'CAA vs independent roadside assistance, CAA alternative Ontario, is CAA worth it Ontario, roadside assistance comparison East GTA, best roadside help Pickering, independent roadside service Ajax, CAA wait times Ontario',
    category: 'Buyer\'s Guide',
    publishDate: '2026-05-04',
    readTime: '8 min read',
    heroImage: '/mobile_mechanic_hero.jpg',
    heroImageAlt: 'Driver comparing roadside assistance options on phone while waiting beside car',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            CAA has 2.4 million members in Ontario. It's been around since 1903 and has arguably the strongest brand in Canadian automotive safety. So why do thousands of East GTA drivers call independent services instead? This isn't an attack on CAA — it's a realistic assessment of when each option actually serves you better. After reading this, you'll know exactly which choice makes sense for your situation.
          </p>
        )
      },
      {
        heading: 'CAA Membership: What You\'re Paying For',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              CAA South Central Ontario offers three membership tiers (pricing as of 2025):
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="p-3 text-left rounded-tl-xl">Tier</th>
                    <th className="p-3 text-left">Annual Cost</th>
                    <th className="p-3 text-left">Towing Distance</th>
                    <th className="p-3 text-left rounded-tr-xl">Service Calls/Year</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tier: 'CAA Classic', cost: '~$103/yr', tow: '10 km', calls: '4 calls' },
                    { tier: 'CAA Plus', cost: '~$143/yr', tow: '200 km', calls: '4 calls' },
                    { tier: 'CAA Premier', cost: '~$186/yr', tow: '500 km', calls: '4 calls' },
                  ].map((row, i) => (
                    <tr key={row.tier} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-bold text-brand-dark border-b border-gray-100">{row.tier}</td>
                      <td className="p-3 border-b border-gray-100">{row.cost}</td>
                      <td className="p-3 border-b border-gray-100">{row.tow}</td>
                      <td className="p-3 border-b border-gray-100">{row.calls}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-4 text-gray-700">
              Additional family members cost extra. And crucially: CAA Classic's 10 km towing limit means if you break down in Pickering and need to get to a shop in Scarborough, you're paying the difference out of pocket.
            </p>
          </>
        )
      },
      {
        heading: 'The Wait Time Reality',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              CAA's service model works by dispatching contracted third-party towing and roadside companies in your area. In peak periods — rush hour, snowstorms, Friday evenings — wait times climb significantly.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm">CAA</div>
                  <p className="font-black text-brand-dark">CAA Dispatch</p>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex gap-2"><Clock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" /><span>Average response: <strong>45–90 min</strong> in peak periods</span></li>
                  <li className="flex gap-2"><Clock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" /><span>Winter storms: <strong>2–4+ hours</strong> reported</span></li>
                  <li className="flex gap-2"><Clock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" /><span>Dispatches a subcontractor — quality varies</span></li>
                </ul>
              </div>
              <div className="bg-brand-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-dark font-black text-xs">iFAST</div>
                  <p className="font-black text-white">iFAST Direct Dispatch</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex gap-2"><Clock size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Average response: <strong>15–30 min</strong></span></li>
                  <li className="flex gap-2"><Clock size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Direct dispatch — no middleman</span></li>
                  <li className="flex gap-2"><Clock size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Same tech you called — consistent quality</span></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              The key difference: CAA uses a network of subcontractors. When volume is high, they prioritize by membership tier and geography. iFAST dispatches its own team directly to your GPS location — no call centre, no subcontracting.
            </p>
            <BlogCTA source="blog_caa_compare_cta1" />
          </>
        )
      },
      {
        heading: 'Where CAA Genuinely Wins',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              This is an honest comparison, and CAA has real advantages in specific scenarios:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { pro: 'Long-distance towing coverage', detail: 'If you break down 400 km from home on a road trip, CAA Plus or Premier covers a tow to a shop, a hotel stay, and even a rental car. Independent services don\'t offer this package.' },
                { pro: 'Travel insurance bundles', detail: 'CAA membership can be bundled with travel insurance, fuel savings, and hotel/retail discounts that recoup a portion of the annual cost.' },
                { pro: 'Cross-country network', detail: 'Driving to Montreal or Halifax? CAA\'s network coverage across Canada means you\'re covered far outside your home region.' },
                { pro: 'Established brand trust', detail: 'For drivers who want a single, established name they\'ve trusted for decades, CAA provides that peace of mind.' },
              ].map(item => (
                <li key={item.pro} className="flex gap-3 bg-gray-50 p-4 rounded-xl">
                  <ThumbsUp className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold text-brand-dark text-sm">{item.pro}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )
      },
      {
        heading: 'Where Independent Beats CAA in East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              If you drive primarily in Pickering, Ajax, Whitby, Oshawa, or Scarborough, the math changes significantly:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { pro: 'Speed for local emergencies', detail: 'iFAST\'s East GTA focus means 15–30 min response versus the 45–90 min CAA average in peak periods. In a January snowstorm on the 401, that difference is not trivial.' },
                { pro: 'No membership required', detail: 'You pay only when you need service. If you never break down, you pay nothing. The average driver has 1–2 roadside incidents per year — the math for low-incident drivers favours pay-per-use.' },
                { pro: 'Mobile mechanic capability', detail: 'iFAST\'s mobile mechanics can diagnose and repair your car on-site. CAA dispatches a tow — they can\'t fix your car.' },
                { pro: 'Full tire service', detail: 'iFAST mounts, balances, and installs proper tires on-site. CAA typically installs your donut spare, which is limited to 80 km/h and 80 km.' },
                { pro: 'Transparent per-call pricing', detail: 'CAA\'s membership model means you\'ve already paid whether you use it or not. iFAST pricing is transparent, per-service, with a quote before work begins.' },
              ].map(item => (
                <li key={item.pro} className="flex gap-3 bg-brand-dark/5 p-4 rounded-xl">
                  <ThumbsUp className="text-brand-yellow flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold text-brand-dark text-sm">{item.pro}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <BlogCTA source="blog_caa_compare_cta2" />
          </>
        )
      },
      {
        heading: 'The Verdict: Which Should You Choose?',
        content: (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-blue-200 rounded-2xl p-6">
                <p className="font-black text-blue-800 text-lg mb-3">Choose CAA if you:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  {[
                    'Frequently take long road trips across Ontario or Canada',
                    'Want a bundle that includes travel insurance',
                    'Have multiple family members to add to one membership',
                    'Value brand recognition and one-call convenience',
                  ].map(item => (
                    <li key={item} className="flex gap-2"><ThumbsUp size={14} className="text-blue-500 flex-shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-brand-yellow rounded-2xl p-6">
                <p className="font-black text-brand-dark text-lg mb-3">Choose iFAST if you:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  {[
                    'Drive primarily within the East GTA / Durham Region',
                    'Want the fastest possible response time',
                    'Need mobile mechanic repair, not just a tow',
                    'Want to pay only when you actually need service',
                    'Need proper tire service (not just a donut spare)',
                  ].map(item => (
                    <li key={item} className="flex gap-2"><ThumbsUp size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              Many East GTA drivers use both: a CAA Plus membership for road-trip protection and long-distance towing, plus {COMPANY_NAME}'s number saved in their phone for fast local response. There's no rule against having both options in your back pocket.
            </p>
          </>
        )
      }
    ],
    faqs: [
      { question: 'Does iFAST require any membership or monthly fee?', answer: 'No. iFAST is a pure pay-per-use service. You call when you need us, we give you a transparent quote, and you pay only for the service provided. No annual membership, no activation fees, no minimums.' },
      { question: 'Can I cancel CAA and use iFAST instead?', answer: 'That\'s your call based on your driving patterns. If you rarely leave the East GTA and don\'t take long highway road trips, iFAST\'s pay-per-use model likely costs you less annually. If you regularly drive across Ontario or to the US, keeping a CAA membership for long-distance coverage is reasonable.' },
      { question: 'What if iFAST can\'t fix my car on-site?', answer: 'If a repair genuinely requires a shop (major transmission work, engine overhauls), we\'ll be upfront about it and can arrange towing to your preferred garage. But our mobile mechanics resolve approximately 80% of common breakdowns on-site — that covers most day-to-day failures.' },
      { question: 'How much does a typical iFAST service call cost vs. CAA?', answer: 'CAA membership costs $103–$186/year regardless of whether you use it. A single iFAST jump start or tire change is typically comparable to or less than the cost of one month of CAA membership. For drivers who break down once per year or less, pay-per-use often wins financially.' },
    ]
  },

  /* ============================================================
     POST 4: MOBILE MECHANIC COST ONTARIO
     ============================================================ */
  {
    slug: 'mobile-mechanic-cost-ontario-pricing-guide',
    title: 'How Much Does a Mobile Mechanic Cost in Ontario? Honest East GTA Pricing',
    excerpt: 'You\'ve broken down and you don\'t want to be ripped off. We break down exactly what a mobile mechanic costs in Ontario — diagnostic fees, common repairs, parts markup, and what a fair quote looks like — so you\'re never in the dark.',
    seoTitle: 'Mobile Mechanic Cost in Ontario: Honest 2026 Pricing Guide (East GTA)',
    seoDescription: 'How much does a mobile mechanic cost in Pickering, Ajax, Oshawa, or Whitby? iFAST breaks down fair diagnostic fees, repair costs, and how we price transparently so you\'re never surprised.',
    keywords: 'mobile mechanic cost Ontario, how much does mobile mechanic cost, mobile mechanic price East GTA, on-site auto repair pricing Pickering, mobile mechanic fees Ajax, car repair cost Oshawa, mobile mechanic rate Whitby',
    category: 'Pricing Guide',
    publishDate: '2026-05-04',
    readTime: '7 min read',
    heroImage: '/mobile_mechanic_hero.jpg',
    heroImageAlt: 'Mobile mechanic working on car in driveway in East GTA Ontario',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            Pricing is the question everyone wants answered and nobody wants to actually give a straight answer on. This article breaks it down honestly. We'll cover what you should expect to pay for a mobile mechanic in Ontario, what drives the cost up or down, how iFAST structures its pricing, and the specific numbers for the most common repairs we do across Pickering, Ajax, Whitby, Oshawa, and Scarborough.
          </p>
        )
      },
      {
        heading: 'What You\'re Paying For: The Components of a Mobile Mechanic Bill',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Every mobile mechanic quote has the same basic components. Understanding them lets you evaluate whether a quote is fair.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: DollarSign, label: 'Diagnostic / Call-Out Fee', desc: 'The fee for the technician to come to you, inspect the vehicle, and diagnose the problem. Typically $60–$120 in East GTA. This is separate from repair labor.' },
                { icon: DollarSign, label: 'Labor Rate', desc: 'Billed hourly or per job. Mobile mechanic rates typically run $80–$130/hr in Ontario, slightly less than dealerships ($130–$180/hr) but comparable to independent shops.' },
                { icon: DollarSign, label: 'Parts Cost', desc: 'Parts are typically priced at retail + a small markup. Reputable services will tell you the part number and price before ordering. Beware of unmarked "misc fees" on parts.' },
                { icon: DollarSign, label: 'Travel/Distance Fee', desc: 'Some services charge a per-km fee beyond a base radius. iFAST\'s service zone covers all of East GTA with no additional travel surcharge within our operating area.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                      <Icon size={16} className="text-brand-yellow" />
                    </div>
                    <p className="font-bold text-brand-dark text-sm">{label}</p>
                  </div>
                  <p className="text-gray-600 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </>
        )
      },
      {
        heading: 'Pricing Guide: Common Mobile Mechanic Services in East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Here are realistic price ranges for the most common mobile mechanic services in the Pickering / Ajax / Whitby / Oshawa corridor. These reflect 2025 Ontario market rates.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="p-3 text-left rounded-tl-xl">Service</th>
                    <th className="p-3 text-left">Typical Range</th>
                    <th className="p-3 text-left rounded-tr-xl">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: 'Battery Jump Start', range: '$60–$100', note: 'Flat fee, includes surge-protection equipment' },
                    { service: 'Battery Replacement (supply + install)', range: '$180–$320', note: 'Varies by battery spec (AGM vs. standard, size)' },
                    { service: 'Flat Tire Change (spare swap)', range: '$60–$90', note: 'Mounting your own spare' },
                    { service: 'Flat Tire Repair (patch)', range: '$80–$130', note: 'Full dismount, vulcanized patch, remount, balance' },
                    { service: 'Alternator Replacement', range: '$380–$620', note: 'Parts + 1.5–2 hrs labor; varies by vehicle' },
                    { service: 'Starter Motor Replacement', range: '$320–$500', note: 'Parts + 1–1.5 hrs labor; varies by vehicle' },
                    { service: 'Brake Pads + Rotors (1 axle)', range: '$280–$450', note: 'Parts quality significantly affects price' },
                    { service: 'Serpentine Belt Replacement', range: '$150–$280', note: 'Varies by engine accessibility' },
                    { service: 'Fuel Delivery (up to 10L)', range: '$60–$90', note: 'Flat service fee; fuel cost additional' },
                    { service: 'Car Lockout', range: '$60–$100', note: 'Flat fee; complexity affects time' },
                    { service: 'Diagnostic Scan (OBD2 read + analysis)', range: '$60–$120', note: 'Required before most repairs; sometimes waived if repair proceeds' },
                  ].map((row, i) => (
                    <tr key={row.service} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-brand-dark border-b border-gray-100">{row.service}</td>
                      <td className="p-3 font-bold text-green-700 border-b border-gray-100">{row.range}</td>
                      <td className="p-3 text-gray-500 text-xs border-b border-gray-100">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
              <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-amber-900 text-sm"><strong>Heads up:</strong> Any quote dramatically below these ranges should raise questions about parts quality, technician certification, or hidden add-ons. The cheapest quote is rarely the best value when it comes to safety-critical components like brakes or batteries.</p>
            </div>
            <BlogCTA source="blog_pricing_midcta" />
          </>
        )
      },
      {
        heading: 'Mobile Mechanic vs. Dealership vs. Independent Shop: The Real Cost',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              People assume dealerships and established shops are safer. Here's what the full cost comparison actually looks like once you factor in all the hidden costs of a shop visit:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="p-3 text-left rounded-tl-xl">Factor</th>
                    <th className="p-3 text-center">Dealership</th>
                    <th className="p-3 text-center">Indie Shop</th>
                    <th className="p-3 text-center rounded-tr-xl bg-brand-yellow text-brand-dark">iFAST Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: 'Labor rate/hr', dealer: '$130–$180', shop: '$90–$130', mobile: '$80–$130' },
                    { factor: 'Tow to get there', dealer: '$150–$300', shop: '$150–$300', mobile: '$0' },
                    { factor: 'Rental car / Uber', dealer: '$40–$80/day', shop: '$40–$80/day', mobile: '$0' },
                    { factor: 'Wait time for appointment', dealer: '2–5 days', shop: '1–3 days', mobile: '30 min' },
                    { factor: 'You can watch the work', dealer: 'No', shop: 'Sometimes', mobile: 'Yes' },
                    { factor: 'Warranty on work', dealer: 'Yes', shop: 'Varies', mobile: 'Yes' },
                  ].map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-brand-dark border-b border-gray-100">{row.factor}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.dealer}</td>
                      <td className="p-3 text-center text-gray-600 border-b border-gray-100">{row.shop}</td>
                      <td className="p-3 text-center font-bold text-green-700 border-b border-gray-100 bg-green-50">{row.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-4">
              The tow fee alone ($150–$300) often closes the pricing gap between a shop and a mobile mechanic completely. Add the cost of a rental car for a day or two, and mobile service frequently comes out cheaper — even before factoring in your time.
            </p>
          </>
        )
      },
      {
        heading: 'How iFAST Prices Its Services',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              {COMPANY_NAME} operates on three pricing principles:
            </p>
            <ol className="space-y-4 mb-6">
              {[
                { title: 'Quote before we touch anything', desc: 'We diagnose first, provide a clear written breakdown of parts and labor, and wait for your approval. No surprises on the final bill.' },
                { title: 'No upselling on safety-critical work', desc: 'We don\'t pressure-sell additional services while we\'re at your vehicle. If we notice something else, we\'ll tell you honestly — but the decision is always yours.' },
                { title: 'Transparent parts sourcing', desc: 'We use quality OEM-equivalent parts and can show you the part number and source. We don\'t mark parts up at a rate that makes the service uncompetitive.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 bg-gray-50 p-5 rounded-xl">
                  <span className="w-8 h-8 bg-brand-yellow text-white rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-bold text-brand-dark">{item.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-gray-700 mb-4">
              The fastest way to get an exact quote is to call us. Describe the problem, we'll ask a few questions, and we'll give you a firm estimate over the phone before we even dispatch.
            </p>
            <BlogCTA source="blog_pricing_endcta" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Is there a fee just for the mechanic to come out and look?', answer: 'Yes — we charge a diagnostic/call-out fee to come to your location and assess the vehicle. This fee is typically $60–$120 and is clearly stated before we dispatch. If you proceed with the repair, this fee is often applied toward the total labor cost.' },
      { question: 'Can I supply my own parts?', answer: 'We can discuss this on a case-by-case basis. In general, we prefer to supply parts to ensure quality and to be able to back the repair with a warranty. If you supply parts, we cannot warranty the repair against parts failure.' },
      { question: 'Are your mechanics certified?', answer: 'Yes. All iFAST technicians are fully certified with professional-grade diagnostic equipment and years of field experience. We follow manufacturer-specific repair procedures and use proper torque specs.' },
      { question: 'Do you warranty your work?', answer: 'Yes. All parts and labor performed by iFAST are covered by a comprehensive warranty. If something goes wrong with a repair we performed, we make it right.' },
      { question: 'Is a mobile mechanic more expensive than a regular shop?', answer: 'On paper, labor rates are comparable. But when you factor in the cost of a tow truck ($150–$300), a rental car or Uber for the day, and the time you lose waiting for an appointment, mobile service is usually equal to or cheaper than a shop for most common repairs. For emergency situations, there\'s no comparison.' },
    ]
  },

  /* ============================================================
     POST 5: CORRECT TIRE PRESSURE — SCARBOROUGH CUSTOMER STORY
     ============================================================ */
  {
    slug: 'correct-tire-pressure-scarborough',
    title: 'Correct Tire Pressure Saved This Scarborough Mom: The 72 PSI Story',
    excerpt: 'A driver at a Scarborough gas station pumped her tires to a dangerous 72 PSI — with her child in the back seat. Here\'s the true story of how our technician Fayaz stepped in, what correct tire pressure actually is, and why overinflated tires are so dangerous.',
    seoTitle: 'Correct Tire Pressure Saved This Scarborough Mom | What PSI Your Tires Need — iFAST',
    seoDescription: 'A Scarborough driver pumped her tires to a dangerous 72 PSI with her child in the car. Here\'s what correct tire pressure actually is, why overinflated tires are dangerous, and how iFAST mobile tire service helps across Scarborough & East GTA.',
    keywords: 'correct tire pressure, what PSI should my tires be, overinflated tires danger, tire pressure check Scarborough, mobile tire service Scarborough, tire pressure help near me, too much air in tires, tire safety Scarborough, mobile tire service East GTA, recommended tire pressure',
    category: 'Emergency Tips',
    publishDate: '2026-06-24',
    readTime: '6 min read',
    heroImage: '/tire_service_hero.jpg',
    heroImageAlt: 'iFAST technician checking and correcting tire pressure for a driver in Scarborough',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            It was a quiet weekend at a gas station near <strong>Finch and Kennedy in Scarborough</strong> when our technician <strong>Fayaz</strong> noticed something that made him stop. A woman was fighting with the air pump at the side of the lot, a young child buckled in the back seat of her car. When Fayaz walked over to help and checked her tires, his stomach dropped: <strong className="text-red-600">72 PSI</strong> — more than double what most cars are built to run. She had no idea she\'d done anything wrong, and she was about to drive her child home on four tires inflated like rock-hard balloons. This is the story of how a two-minute conversation may have prevented a blowout — and everything you need to know about <strong>{COMPANY_NAME}</strong>-approved correct tire pressure so it never happens to you.
          </p>
        )
      },
      {
        heading: '72 PSI Is a Loaded Gun: What Over-Inflation Actually Does',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              A tire stamped to run around 35 PSI that\'s been pumped to 72 is carrying roughly <strong>double its designed pressure</strong>. That isn\'t a small mistake you can shrug off — it changes how the tire behaves in every situation that matters:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '💥', title: 'Blowout risk skyrockets', desc: 'An over-pressurized tire is rigid and brittle. Add a hot summer highway and a pothole, and you\'re inviting a sudden blowout at speed.' },
                { icon: '🛑', title: 'Less grip, longer stops', desc: 'Over-inflated tires bulge in the middle and ride on the center of the tread only. Less rubber on the road means reduced traction and longer stopping distances.' },
                { icon: '🎢', title: 'Harsh, twitchy handling', desc: 'Every bump becomes a bounce. The car skips over road seams and feels nervous at highway speed — exactly when you want it planted.' },
                { icon: '🪙', title: 'You burn money on rubber', desc: 'That center-only contact wears the middle of the tread out fast, killing the tire long before its time and costing you a premature replacement.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  Now picture all of that with a child in the back seat on a summer afternoon. That\'s the situation Fayaz walked into.
                </p>
              </div>
            </div>
          </>
        )
      },
      {
        heading: 'So What Should Your Tires Be? (The Number Almost Everyone Gets Wrong)',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Here\'s the part Fayaz explained to her, and the part most drivers get wrong: the big number molded into the tire\'s sidewall is the <strong>maximum</strong> pressure the tire can physically hold — it is <em>not</em> the pressure your car wants. Inflate to that number and you\'ve done exactly what she did.
            </p>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <Gauge className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">Where the real number lives</p>
                <ul className="space-y-2 text-sm text-white/85">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>The sticker inside your <strong>driver\'s-side door jamb</strong> (and your owner\'s manual) lists your car\'s recommended PSI.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>For most cars and SUVs in the GTA, that\'s between <strong>30 and 35 PSI</strong>.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Check them <strong>cold</strong> — before you\'ve driven — because driving heats the air and inflates the reading.</span></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              That\'s it. No guessing, no matching the sidewall number, no eyeballing it. The door-jamb sticker is the single source of truth for correct tire pressure on your specific vehicle.
            </p>
            <BlogCTA source="blog_tirepressure_mid1" />
          </>
        )
      },
      {
        heading: 'What Happened in That Scarborough Parking Lot',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Fayaz didn\'t just bleed the pressure down and walk off. He let each tire down to the exact number on her door jamb, then walked her through how to read it herself and how to use the gauge so she\'d never be guessing again. By the time he was done, she understood <em>why</em> 72 PSI was dangerous and exactly how to keep her tires right.
            </p>
            <p className="mb-4 text-gray-700">
              Then he made sure she and her little one were safe to drive home — on four tires that would actually grip the road. No charge for the kindness, no catch. Just the right thing to do for a stranger who needed a hand.
            </p>
            <div className="bg-brand-dark/5 border border-brand-dark/10 rounded-xl p-5 flex gap-3">
              <ShieldCheck className="text-brand-dark flex-shrink-0 mt-0.5" size={22} />
              <p className="text-gray-700 text-sm">
                This is the kind of thing our team does every day across the East GTA. Sometimes it\'s a 401 blowout at midnight. Sometimes it\'s a mom at a gas pump who didn\'t know the sidewall number isn\'t the target. Either way, the goal is the same: get you back on the road, safely.
              </p>
            </div>
          </>
        )
      },
      {
        heading: 'Selena\'s 5-Star Review',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              A couple of days later, Selena left us this on Google. We didn\'t ask for it — and it\'s the kind of thing that means the most:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">S</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Selena Alleyne</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;I had a great experience with Fayaz this past weekend. I accidentally put too much air in my tires at a gas station, and he kindly stepped in to help me fix the issue. He took the time to make sure everything was safe and explained what he was doing, which I really appreciated. It\'s not often you come across someone who is both knowledgeable and genuinely willing to help a stranger without hesitation. His professionalism and kindness really stood out. I highly recommend Fayaz if you\'re looking for someone reliable and trustworthy. Thanks again for your help!&rdquo;
              </p>
            </div>
            <BlogCTA source="blog_tirepressure_mid2" />
          </>
        )
      },
      {
        heading: 'Tire Pressure Help & Mobile Tire Service Across Scarborough',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Not sure what pressure your tires should be? Warning light glowing on the dash? A slow leak you keep topping up at the gas station? That\'s exactly what we do. {COMPANY_NAME} runs <strong>mobile tire service across Scarborough</strong> and the East GTA — we come to you, check and correct your pressure, repair or replace flat tires on-site, and reset your TPMS light before we leave. No tow, no waiting room.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Scarborough', note: 'Finch, Kennedy & the 401' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Ajax', note: 'Durham Region' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'East GTA', note: '15–30 min ETA' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              Whether it\'s a tire pressure check, a flat repair, a seasonal swap, or a full installation, our mobile tire team brings the shop to your driveway, your office, or the side of the road.
            </p>
          </>
        )
      }
    ],
    faqs: [
      { question: 'What PSI should my tires be?', answer: 'Check the sticker inside your driver\'s-side door jamb or your owner\'s manual. Most cars and SUVs run between 30 and 35 PSI. Never use the maximum number on the tire sidewall as your target — that\'s the ceiling the tire can hold, not the pressure your car is designed for.' },
      { question: 'Can overinflated tires explode or blow out?', answer: 'Yes. Significant over-inflation — like 72 PSI on a tire built for around 35 — makes the tire rigid and far more likely to blow out, especially in summer heat or at highway speed. Bring it back down to the recommended pressure as soon as you can.' },
      { question: 'Is it safe to drive with 70 PSI in my tires?', answer: 'No. That is roughly double the recommended pressure for most vehicles. It reduces grip, lengthens your stopping distance, and dramatically raises blowout risk. Let the tires down to the door-jamb spec before driving any real distance.' },
      { question: 'Where can I get my tire pressure checked in Scarborough?', answer: 'iFAST offers mobile tire service across Scarborough and the East GTA — we come to your location to check and correct tire pressure, repair flats, and reset your TPMS light. Call +1 437-215-3468 and we typically arrive in 15–30 minutes.' },
      { question: 'Does iFAST do mobile tire service in Scarborough?', answer: 'Yes. We cover Scarborough, Pickering, Ajax, Whitby, and Oshawa with on-site tire repair, replacement, pressure correction, and seasonal swaps — no tow required, typically arriving in 15–30 minutes.' },
    ]
  },

  /* ============================================================
     POST 6: DEAD BATTERY — BOOST OR REPLACE (2 A.M. CALL)
     ============================================================ */
  {
    slug: 'dead-car-battery-boost-or-replace-east-gta',
    title: 'The 2 A.M. Phone Call: Does Your Dead Battery Need a Boost — or Is It Done?',
    excerpt: 'A real customer called us at 2 a.m. because his car wouldn\'t start — we were there in 15 minutes. Here\'s the decision our technicians make in the first 30 seconds of every dead-battery call: boost it, or replace it. And how you can read the signs yourself.',
    seoTitle: 'Dead Car Battery: Boost or Replace? How the Pros Decide | iFAST East GTA',
    seoDescription: 'Car won\'t start in Pickering, Ajax, Whitby, Oshawa or Scarborough? Learn how roadside technicians decide between a battery boost and a replacement — the sounds, the signs, and why winter boosts are sometimes just a band-aid. 24/7 mobile battery service.',
    keywords: 'dead car battery, battery boost near me, boost or replace car battery, car won\'t start, battery boost service East GTA, jump start Scarborough, battery replacement Pickering, car battery dead winter Ontario, mobile battery service, 24 hour battery boost',
    category: 'Emergency Tips',
    publishDate: '2026-07-03',
    readTime: '7 min read',
    heroImage: '/jump_start_hero.jpg',
    heroImageAlt: 'iFAST technician boosting a dead car battery at night in the East GTA',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            The phone rang at <strong>2 a.m.</strong> A driver, stranded — car completely dead, not going anywhere. Fifteen minutes later our technician was standing in front of his open hood. That call ended like most of them do: engine running, driver back on the road. But here's what most people never see — the <strong>30-second decision</strong> the technician makes before touching a single cable: <em>does this battery need a boost, or is it done?</em> Get that call wrong and you're stranded again on Thursday. This is how <strong>{COMPANY_NAME}</strong> actually makes it — and how you can read the same signs yourself.
          </p>
        )
      },
      {
        heading: 'The First 30 Seconds: What the Sound of Your Car Is Telling Us',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Before we test anything, we ask you to turn the key one more time — because the sound your car makes is the first diagnostic. There are really only three sounds, and each one points somewhere different:
            </p>
            <ol className="list-none space-y-4 mb-6">
              {[
                { num: '01', title: 'Rapid clicking — like a machine gun', desc: 'The classic dead battery. There\'s enough power to snap the starter relay but not enough to turn the engine. Good news: this usually boosts cleanly.' },
                { num: '02', title: 'A slow, groaning crank — "rrr… rrr… rrr"', desc: 'The battery is dying, not dead. It might catch this time — but a battery that groans on a mild day will not survive the next cold snap. This is the sound of a battery on borrowed time.' },
                { num: '03', title: 'One click, or total silence', desc: 'Could be a deeply dead battery — or a corroded connection or a failed starter. This is where a technician who tests before boosting saves you from buying a battery you didn\'t need.' },
              ].map(s => (
                <li key={s.num} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-3xl font-black text-brand-yellow/50 leading-none">{s.num}</span>
                  <div>
                    <p className="font-bold text-brand-dark">{s.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-gray-700 mb-2">
              One more tell before we even pop the hood: your dash lights and headlights. Bright lights with a no-start points away from the battery. Dim, flickering, or dead lights point straight at it.
            </p>
          </>
        )
      },
      {
        heading: 'Boost or Replace? The Honest Answer Nobody Puts on a Flyer',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Here's the part that matters: <strong>a boost starts your car — it doesn't fix why it died.</strong> Sometimes the "why" is innocent. Sometimes the boost is just a band-aid on a battery that's already finished. This is the actual decision tree we run on your driveway:
            </p>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="text-green-600" size={22} />
                  <p className="font-black text-green-800">A boost is probably all you need if…</p>
                </div>
                <ul className="space-y-2 text-sm text-green-900">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" /><span>You left the headlights, an interior light, or the hazards on overnight — there's a clear, one-time reason it drained.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" /><span>The battery is under about 3 years old.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" /><span>The car sat unused for a couple of weeks (batteries self-drain, especially with modern electronics sipping power).</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" /><span>After the boost, it starts strong on its own the next morning.</span></li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsDown className="text-red-600" size={22} />
                  <p className="font-black text-red-800">The battery is telling you it's done if…</p>
                </div>
                <ul className="space-y-2 text-sm text-red-900">
                  <li className="flex gap-2"><AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" /><span>This is your <strong>second boost in a month</strong>. A healthy battery doesn't need rescuing twice.</span></li>
                  <li className="flex gap-2"><AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" /><span>It's 4–5+ years old. In our climate, that's a full career.</span></li>
                  <li className="flex gap-2"><AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" /><span>It cranks slowly even on a warm afternoon — weak warm means dead cold.</span></li>
                  <li className="flex gap-2"><AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" /><span>The case looks swollen or the terminals are heavily corroded — physical damage doesn't recover.</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-2 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <BatteryCharging className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">Why we test before we sell</p>
                <p className="text-sm text-white/85">
                  Our technicians carry a battery tester, and it runs <em>before</em> any recommendation. If the test says your battery is healthy and you just left a light on, you get a boost and a handshake — not a sales pitch. If it's genuinely failing, we can usually replace it on the spot so you're not doing this again next week.
                </p>
              </div>
            </div>
          </>
        )
      },
      {
        heading: 'Why the East GTA Kills Batteries in July and Buries Them in January',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Here's the counterintuitive part: <strong>summer heat does the damage, winter just reveals it.</strong> Heat evaporates the electrolyte inside the battery and quietly corrodes the plates all summer long. Then the first −15°C morning arrives and two things happen at once:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-gray-700">
              <li>A cold battery can only deliver a fraction of its normal cranking power — at −18°C, roughly <strong>half</strong> of what it delivers on a mild day.</li>
              <li>Meanwhile the engine needs <em>more</em> power than usual to turn over, because the oil inside it has thickened like syrup.</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex gap-3">
                <Snowflake className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-blue-900 text-sm font-medium">
                  Weaker supply meets bigger demand — that's why the first real cold snap of the year is our busiest morning for boost calls across Pickering, Ajax, Whitby, Oshawa, and Scarborough. The batteries didn't die that morning. They died in August. Nobody noticed until January.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              There's a third East GTA-specific killer: <strong>short commutes</strong>. If your daily drive is 10 minutes of stop-and-go, your alternator never fully recharges what the starter took out. The battery loses a little ground every day — until one morning there's nothing left to lose.
            </p>
            <BlogCTA source="blog_battery_mid1" />
          </>
        )
      },
      {
        heading: 'The Parking-Lot Call That Sums Up How We Work',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              Not every dead battery is a 2 a.m. highway drama. Sometimes it's your mom, stuck in a parking lot, calling you because the car won't start and she doesn't know who to trust. This Google review — word for word — is exactly the situation:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">S</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Shanthuru Kalaiselvan</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;My mom had an issue with a car battery and was stuck in a parking lot—they got there quickly and were super helpful. They spoke us through possible solutions and were super transparent about how much they charge. Very reliable!&rdquo;
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Notice what he highlights: not just speed, but that we <strong>talked the family through the options</strong> and were upfront about cost <em>before</em> doing the work. That's the boost-or-replace conversation, happening exactly the way it should — with you making the call, fully informed.
            </p>
            <p className="mb-1 text-gray-700">
              And the 2 a.m. driver from the top of this story? His review, verbatim: <em>&ldquo;Called him around 2am and he arrived in 15 minutes&rdquo;</em> — that's oyindamola a., five stars. The clock doesn't decide whether we pick up. We're 24/7 because batteries don't die at convenient times.
            </p>
          </>
        )
      },
      {
        heading: 'Dead Battery Anywhere in the East GTA? Here\'s What Happens When You Call',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              One call to {COMPANY_NAME} and a technician heads your way — driveway, parking lot, roadside, office garage. On arrival: we test the battery first, tell you honestly whether it's a <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">boost</a> or a <a href="/service/battery-replacement" className="text-brand-yellow font-bold hover:underline">replacement</a>, and do the work on the spot. No tow, no waiting room, no membership required.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Scarborough', note: 'Kennedy, Finch & the 401' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Ajax', note: 'Durham Region' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'East GTA', note: '15–30 min ETA' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <BlogCTA source="blog_battery_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'My car won\'t start — how do I know if it\'s the battery?', answer: 'Listen to the sound when you turn the key. Rapid clicking almost always means a dead battery. A slow, groaning crank means the battery is dying. One click or total silence could be the battery, a corroded connection, or the starter — which is why iFAST technicians test the battery before recommending anything.' },
      { question: 'Should I boost my car battery or replace it?', answer: 'Boost it if there\'s a clear one-time cause (lights left on, car sat unused) and the battery is under about 3 years old. Replace it if this is your second boost in a month, the battery is 4–5+ years old, it cranks slowly even in warm weather, or the case is swollen. A boost starts the car — it doesn\'t fix a battery that\'s reached the end of its life.' },
      { question: 'Do you really come out at 2 a.m. for a dead battery?', answer: 'Yes — iFAST runs 24/7 across Pickering, Ajax, Whitby, Oshawa, and Scarborough. One of our five-star reviews is from a driver who called around 2 a.m. and had a technician on site in 15 minutes.' },
      { question: 'How long does a battery boost take?', answer: 'The boost itself takes a few minutes once we arrive, and we typically reach you in 15–30 minutes anywhere in the East GTA. We also test the battery so you know whether it will hold a charge or needs replacing soon.' },
      { question: 'Why did my car battery die in winter?', answer: 'Cold weather is usually the trigger, not the cause. Summer heat degrades the battery internally; then the first cold snap cuts its cranking power roughly in half while the engine demands more power to turn over thickened oil. Batteries that were quietly weakened all summer fail on the first −15°C morning.' },
      { question: 'Will you tell me the price before doing the work?', answer: 'Yes. We walk you through what we found, your options, and the cost before any work starts — customers regularly mention our transparency in reviews. You decide, fully informed, before we touch the car.' },
    ]
  },

  /* ============================================================
     POST 7: CAR LOCKOUT — THE COAT HANGER'S TRUE COST
     ============================================================ */
  {
    slug: 'locked-out-of-car-what-not-to-do-east-gta',
    title: 'Locked Out of Your Car? What That Coat Hanger Trick Actually Costs',
    excerpt: 'YouTube says a coat hanger and two minutes will get you back in your car. Your door\'s weatherstripping, paint, and wiring say otherwise. Here\'s the damage math on DIY lockout tricks — and how a professional gets you in without leaving a mark.',
    seoTitle: 'Locked Out of Your Car? The Real Cost of DIY Tricks | iFAST East GTA Lockout Service',
    seoDescription: 'Locked out of your car in Pickering, Ajax, Whitby, Oshawa or Scarborough? Before you try the coat hanger trick, read the damage math — torn seals, scratched paint, snagged wiring. 24/7 damage-free car lockout service, 15–30 min response.',
    keywords: 'locked out of car, car lockout service, 24/7 car unlocking Toronto, unlock car door service, keys locked in car, keys locked in trunk, car lockout Scarborough, auto lockout East GTA, locked keys in car Pickering, car unlocking service near me',
    category: 'Emergency Tips',
    publishDate: '2026-07-03',
    readTime: '6 min read',
    heroImage: '/car_lockout_hero.jpg',
    heroImageAlt: 'iFAST technician unlocking a car door without damage in the East GTA',
    sections: [
      {
        content: (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
            You can see them. Right there. Your keys, sitting on the driver's seat, on the wrong side of a locked door. And somewhere in the back of your mind, a YouTube video is whispering: <em>coat hanger, two minutes, easy.</em> Before you straighten that hanger, here's the math nobody shows you in the video: the parts of your door you're about to fight with — the weatherstripping, the paint along the glass, the wiring inside the panel — cost <strong>many times more to repair than a professional lockout call costs</strong>. This is the damage math, from the people who open cars for a living across the East GTA.
          </p>
        )
      },
      {
        heading: 'The Damage Math: What Those YouTube Tricks Actually Break',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Every DIY unlock trick works the same way: force something into a gap that was never designed to have anything forced into it. Here's what each trick really risks:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '🧥', title: 'The coat hanger', desc: 'Slides down between the glass and the weatherstripping — tearing the rubber seal, scratching a line into the glass or paint, and snagging any wiring or linkage rods it finds inside the door.' },
                { icon: '🚪', title: 'The wedge + rod', desc: 'Prying the door frame open far enough to reach in can permanently bend it. A bent frame never seals right again: wind noise at highway speed, water leaks in every rainstorm.' },
                { icon: '🪛', title: 'The slim jim', desc: 'Made for cars from the 1990s. Modern doors pack airbag sensors, lock actuators, and wiring harnesses exactly where a slim jim slides. One wrong hook and you\'re into real electrical repair.' },
                { icon: '🧱', title: 'The "just break the small window"', desc: 'The most honest trick — at least you know the cost up front. It\'s glass replacement, plus vacuuming cubes of glass out of your seats and vents for a month.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  The common thread: the repair bill for a torn seal, scratched panel, or snagged wire runs to <strong>hundreds of dollars</strong> — several professional lockout calls' worth — and that's if it goes <em>mostly</em> right. The video never shows attempt number four.
                </p>
              </div>
            </div>
          </>
        )
      },
      {
        heading: 'How a Pro Opens Your Car Without Leaving a Mark',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              The difference between DIY and professional isn't courage — it's purpose-built tools and repetition. Here's what actually happens when our technician reaches your car:
            </p>
            <ol className="list-none space-y-4 mb-6">
              {[
                { num: '01', title: 'A protective wedge goes in first', desc: 'An inflatable or soft-polymer wedge creates a small, controlled gap at the top of the door — spreading pressure evenly so nothing bends and no paint gets touched.' },
                { num: '02', title: 'A long-reach tool does the finger-work', desc: 'A coated rod reaches through the gap to press the unlock button or lift the handle — the same motion your hand would make, just from outside.' },
                { num: '03', title: 'The wedge comes out, the seal closes', desc: 'The door returns to exactly its original shape. No bent frame, no torn rubber, no evidence anyone was ever locked out.' },
              ].map(s => (
                <li key={s.num} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-3xl font-black text-brand-yellow/50 leading-none">{s.num}</span>
                  <div>
                    <p className="font-bold text-brand-dark">{s.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-2 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <KeyRound className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">The whole thing usually takes minutes</p>
                <p className="text-sm text-white/85">
                  Most lockouts are open within minutes of our technician arriving — no drilling, no broken glass, no damage. Keyless and smart-key cars are opened the same careful way; the tech just targets the door's mechanical backup instead of the electronics.
                </p>
              </div>
            </div>
          </>
        )
      },
      {
        heading: 'The Three Lockouts That Panic People Most',
        content: (
          <>
            <ul className="list-none space-y-4 mb-6">
              <li className="bg-gray-50 p-5 rounded-xl">
                <p className="font-bold text-brand-dark mb-1">🧳 Keys locked in the trunk</p>
                <p className="text-gray-600 text-sm">Feels worse than it is. On almost every modern car, once we open the cabin the trunk release button or folding rear seats get us to your keys. One unlock solves both.</p>
              </li>
              <li className="bg-gray-50 p-5 rounded-xl">
                <p className="font-bold text-brand-dark mb-1">🔥 Engine running in the driveway</p>
                <p className="text-gray-600 text-sm">You started the car to warm it up, stepped out, and the door locked behind you. It's burning fuel and it's a theft magnet — call right away and stay with the vehicle until we arrive.</p>
              </li>
              <li className="bg-red-50 border border-red-200 p-5 rounded-xl">
                <p className="font-bold text-red-800 mb-1">🚨 A child or pet locked inside</p>
                <p className="text-red-900 text-sm"><strong>Call 911 first. Always.</strong> On a warm day the inside of a car heats to dangerous levels in minutes, and first responders will not hesitate to break a window — nor should you. Property is replaceable. Call us second, or don't call us at all: 911 comes first, every time.</p>
              </li>
            </ul>
            <BlogCTA source="blog_lockout_mid1" />
          </>
        )
      },
      {
        heading: 'What Locked-Out Drivers Actually Say',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              Two of our Google reviews, word for word, from drivers who were exactly where you might be right now:
            </p>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {[
                { initial: 'H', name: 'Heng Tho', quote: 'Had myself locked out of my car, called this company arrived fast and fair price.' },
                { initial: 'U', name: 'Uddhav Reen', quote: 'Got locked out of my car and the guy was there in a flash and got it sorted out. Genuine rates as well.' },
              ].map(r => (
                <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-lg">{r.initial}</div>
                      <div>
                        <p className="font-bold text-brand-dark leading-tight">{r.name}</p>
                        <span className="text-xs text-gray-400">Verified Google review</span>
                      </div>
                    </div>
                    <svg viewBox="0 0 48 48" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                    </svg>
                  </div>
                  <div className="flex gap-0.5 text-brand-yellow mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{r.quote}&rdquo;</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              &ldquo;Fast&rdquo; and &ldquo;fair price&rdquo; — both reviews, independently. That's the whole promise: we get there quickly, open the car without damage, and the number we quote is the number you pay.
            </p>
          </>
        )
      },
      {
        heading: 'Locked Out Anywhere in the East GTA? We\'re Already Close',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              {COMPANY_NAME} runs 24/7 <a href="/service/lockout" className="text-brand-yellow font-bold hover:underline">car lockout service</a> across the East GTA — no membership, no callback queue, no &ldquo;next available appointment Tuesday.&rdquo; A technician heads your way the moment you call, typically arriving in 15–30 minutes.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Scarborough', note: 'Kennedy, Finch & the 401' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Ajax', note: 'Durham Region' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'East GTA', note: '15–30 min ETA' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <BlogCTA source="blog_lockout_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'I\'m locked out of my car — how fast can you get here?', answer: 'iFAST typically arrives in 15–30 minutes anywhere in Pickering, Ajax, Whitby, Oshawa, or Scarborough, 24/7. Customers describe it as "fast" and "there in a flash" in their Google reviews.' },
      { question: 'Will unlocking my car damage the door or paint?', answer: 'No. Professional lockout tools — a protective wedge and a coated long-reach tool — open the door without bending the frame, tearing the weatherstripping, or touching the paint. That\'s the key difference from DIY tricks like coat hangers and slim jims, which regularly cause hundreds of dollars in damage.' },
      { question: 'My keys are locked in the trunk — can you still get them?', answer: 'Yes. On most modern vehicles, once the cabin is open we can reach the keys through the interior trunk release or the folding rear seats. One damage-free unlock solves the whole problem.' },
      { question: 'What should I do if my child or pet is locked in the car?', answer: 'Call 911 first — always. A car\'s interior heats to dangerous temperatures within minutes on a warm day, and first responders will break a window if needed, which is exactly the right call. Property is replaceable.' },
      { question: 'Can you unlock keyless and smart-key cars?', answer: 'Yes. Push-button-start and keyless vehicles are opened the same careful, damage-free way — the technician works with the door\'s mechanical mechanism rather than the electronics.' },
      { question: 'How much does a car lockout service cost in the East GTA?', answer: 'We quote you the price up front on the phone before a technician is dispatched, and the number we quote is the number you pay. Reviewers consistently describe our lockout pricing as "fair" and "genuine rates" — and it\'s a fraction of what repairing coat-hanger damage costs.' },
    ]
  },

  /* ============================================================
     POST 8: TIRE PATCH AT PORT UNION & KINGSTON — SCARBOROUGH CUSTOMER STORY
     ============================================================ */
  {
    slug: 'tire-patch-repair-scarborough',
    title: 'Flat Tire at Port Union & Kingston: The On-the-Spot Tire Patch That Got a Scarborough Driver Rolling Again',
    excerpt: 'A driver picked up a puncture near Port Union and Kingston Road in Scarborough. Instead of a tow truck and a lost afternoon, one call brought the tire shop to him — the flat was found, patched, and back on the road in no time. Here is the real story, plus how to know if your own flat can be patched.',
    seoTitle: 'Tire Patch Scarborough | Mobile Flat Tire Repair at Port Union & Kingston Rd — iFAST',
    seoDescription: 'Flat tire in Scarborough? This driver got a puncture near Port Union & Kingston Rd — iFAST arrived fast and patched it on the spot, no tow needed. Learn when a tire can be patched vs replaced, and how mobile tire patch service works across the East GTA.',
    keywords: 'tire patch Scarborough, tire patch near me, mobile tire repair Scarborough, flat tire repair Port Union, tire puncture repair Scarborough, can my tire be patched, tire patch or replace, mobile tire patch service, flat tire help East GTA, tire repair Kingston Rd Scarborough',
    category: 'Emergency Tips',
    publishDate: '2026-07-03',
    readTime: '6 min read',
    heroImage: '/flat_tire_repair_hero.jpg',
    heroImageAlt: 'iFAST technician patching a punctured tire on-site for a driver in Scarborough',
    sections: [
      {
        content: (
          <>
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-6">
              A flat tire near <strong>Port Union Road and Kingston Road in Scarborough</strong> usually means one of two bad afternoons: wrestling a spare on the shoulder of a busy road, or waiting on a tow to a shop. Kuruvilla Abraham got a third kind — he made one call to <strong>{COMPANY_NAME}</strong>, and the tire was patched on the spot.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mb-6">
              {[
                { icon: <MapPin size={18} />, label: 'Location', value: 'Port Union & Kingston Rd' },
                { icon: <Wrench size={18} />, label: 'The problem', value: 'Punctured tire' },
                { icon: <Clock size={18} />, label: 'The fix', value: 'On-the-spot patch' },
                { icon: <Star size={18} />, label: 'The verdict', value: '5-star review' },
              ].map(f => (
                <div key={f.label} className="bg-white p-4 flex flex-col items-start gap-1">
                  <span className="text-brand-yellow mb-1">{f.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{f.label}</span>
                  <span className="text-sm font-bold text-brand-dark leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-700">
              Here is what happened on that call-out, the review Kuruvilla left afterwards, and how to tell whether your own flat can be saved the same way.
            </p>
          </>
        )
      },
      {
        heading: 'What Happened at Port Union & Kingston',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              The call came in from the Port Union and Kingston Road intersection — the busy east Scarborough corridor where West Hill meets the 401. A technician was dispatched immediately and, in Kuruvilla&rsquo;s own words, came in a short time.
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <iframe
                src="https://www.google.com/maps?q=Port+Union+Rd+%26+Kingston+Rd,+Scarborough,+ON&z=14&output=embed"
                title="Map of Port Union Rd and Kingston Rd in Scarborough, where iFAST patched the tire on-site"
                className="w-full h-72 md:h-80 block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="text-xs text-gray-500 text-center py-2 px-3 bg-gray-50">
                Port Union Rd &amp; Kingston Rd, Scarborough — where this mobile tire patch happened
              </p>
            </div>
            <p className="mb-4 text-gray-700">
              On-site, the repair followed the same process we use on every patchable flat: find the puncture, confirm it sits in the tread and is small enough to repair safely, then seal it properly and get the pressure back to the number on the door jamb — not just &ldquo;looks about right.&rdquo;
            </p>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <ShieldCheck className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">Patch vs. plug — why it matters</p>
                <ul className="space-y-2 text-sm text-white/85">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>A <strong>string plug</strong> jammed in from the outside is a roadside band-aid — fine to limp to a shop, not a permanent fix.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>A <strong>proper patch</strong> seals the puncture and restores the tire&rsquo;s inner liner — the repair tire makers and safety standards actually endorse.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Done right, a patched tire runs out the rest of its normal life. You should never have to think about that puncture again.</span></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              Minutes later, Kuruvilla was back on the road on his own tire — no spare, no tow, no shop visit. That is the entire point of <a href="/service/flat-tire-repair" className="text-brand-yellow font-bold hover:underline">mobile flat tire repair</a>: the shop comes to you.
            </p>
          </>
        )
      },
      {
        heading: 'Kuruvilla\'s 5-Star Review',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              After the repair, Kuruvilla left us this on Google — along with a photo he took of our mobile tire unit at the scene:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">K</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Kuruvilla Abraham</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Came in short time and fix . Nice guy&rdquo;
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Eight words. That is what good roadside service should look like from the driver&rsquo;s side — nothing dramatic to report, because the problem simply got handled.
            </p>
            <div className="text-center mb-6">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJ2bPg5e3R1IkRW8KnogGiPxs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                <Star size={18} fill="currentColor" className="text-brand-yellow" />
                Check Out Our Other Google Reviews
              </a>
            </div>
          </>
        )
      },
      {
        heading: 'Can Your Flat Be Patched? The 60-Second Check',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Kuruvilla&rsquo;s flat could be patched — but how do you know if yours can? Not every flat means a new tire; far from it. Most punctures picked up on GTA roads are small nails and screws sitting in the tread, and a properly patched tire is a <strong>permanent repair</strong> for that puncture. Here is the quick rule of thumb our technicians use:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '✅', title: 'Puncture in the tread', desc: 'A nail or screw in the flat face of the tire — the part that touches the road — is patch territory. This is the most common flat we see, and it is exactly what we fixed at Port Union.' },
                { icon: '✅', title: 'Hole under 6 mm', desc: 'Roughly the diameter of a pencil. Standard nails and screws fall well inside this limit, which is why most punctures are repairable.' },
                { icon: '❌', title: 'Sidewall or shoulder damage', desc: 'The sidewall flexes with every rotation — no patch can hold there safely. A sidewall puncture, bubble, or gash means the tire is done.' },
                { icon: '❌', title: 'Driven flat for a distance', desc: 'Driving on a fully flat tire grinds and overheats the internal structure. Even a small puncture can become an unrepairable tire if the car kept rolling on it.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  Losing air? Pull over somewhere safe and stop driving on it. The single biggest thing that turns a $40 fix into a full tire replacement is rolling on a flat — the tire destroys itself from the inside in a couple of kilometres.
                </p>
              </div>
            </div>
            <BlogCTA source="blog_tirepatch_mid1" />
          </>
        )
      },
      {
        heading: 'A Patch Today, New Tires Whenever You Need Them',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              One more detail from this call-out worth sharing: before we left, Kuruvilla kept our number — his tires are getting on in kilometres, and when the time comes to replace them he wants the same thing to happen: <strong>the tire shop comes to him</strong>. That is our <a href="/service/tire-installation" className="text-brand-yellow font-bold hover:underline">mobile tire installation</a> service — we source the right tires for your vehicle, bring them to your driveway or workplace, and install them on-site.
            </p>
            <p className="mb-4 text-gray-700">
              A patch and a plan. The patch fixes today&rsquo;s puncture permanently; knowing who to call means the next tire problem — flat, seasonal swap, or full replacement — never costs you a day at a shop counter.
            </p>
          </>
        )
      },
      {
        heading: 'Tire Patch & Flat Repair Across Scarborough and the East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Nail in your tire? Slow leak you keep topping up? Flat in a parking lot? {COMPANY_NAME} runs <strong>24/7 mobile tire patch and flat repair across Scarborough</strong> — Port Union, West Hill, Kingston Road, the 401 corridor — and the whole East GTA. We come to you, repair the tire on-site when it is safe to do so, and get you rolling in a single visit.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Scarborough', note: 'Port Union, Kingston Rd & the 401' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Ajax', note: 'Durham Region' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'East GTA', note: '15–30 min ETA' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              And if the tire is beyond saving, we handle that too — <a href="/service/spare-tire-change" className="text-brand-yellow font-bold hover:underline">spare tire changes</a> on the spot, or <a href="/service/tire-installation" className="text-brand-yellow font-bold hover:underline">new tires delivered and installed</a> at your location.
            </p>
            <BlogCTA source="blog_tirepatch_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Can a punctured tire be patched?', answer: 'Usually, yes. If the puncture is in the tread (the flat part that touches the road), is smaller than about 6 mm — a standard nail or screw — and the tire wasn\'t driven on while flat, a proper patch is a safe, permanent repair. Sidewall damage or a puncture on the tire\'s shoulder cannot be patched safely and means replacement.' },
      { question: 'How long does a mobile tire patch take in Scarborough?', answer: 'iFAST typically arrives in 15–30 minutes anywhere in Scarborough and the East GTA, and the patch itself usually takes about 30 minutes on-site. Most drivers are back on the road within the hour — like our customer at Port Union and Kingston Rd.' },
      { question: 'Is a patched tire safe to drive on?', answer: 'Yes. A professional patch seals the puncture and restores the tire\'s inner liner, and is considered a permanent repair for that puncture. A patched tire done right will safely run out the rest of its normal tread life.' },
      { question: 'What\'s the difference between a tire patch and a plug?', answer: 'A string plug is pushed into the hole from the outside — it\'s a temporary roadside fix, good enough to get you to a proper repair. A patch seals the puncture from inside the tire, which is the repair method tire manufacturers endorse as permanent. iFAST repairs flats properly so you don\'t have to think about that puncture again.' },
      { question: 'Do you come to my location for a flat tire in Scarborough?', answer: 'Yes. iFAST is a mobile service — we patch and repair flat tires at your home, workplace, parking lot, or roadside across Scarborough (including Port Union, West Hill, and the Kingston Rd corridor), Pickering, Ajax, Whitby, and Oshawa, 24/7. Call +1 437-215-3468.' },
      { question: 'What if my tire can\'t be patched?', answer: 'If the damage is in the sidewall, too large, or the tire was driven flat, we\'ll tell you straight and give you options on the spot: install your spare so you\'re mobile again, or arrange mobile tire installation — we source new tires and install them at your location, no shop visit needed.' },
    ]
  },

  /* ============================================================
     POST 9: BATTERY BOOST IN AJAX (CUSTOMER STORY — SREE V GOPI)
     ============================================================ */
  {
    slug: 'battery-boost-ajax',
    title: 'Dead Battery at Taunton & Salem: The Ajax Boost Call That Turned Into a Driveway Battery Replacement',
    excerpt: 'A driver\'s battery died near Taunton and Salem in Ajax. One call brought a boost to his car, honest advice with zero pressure — and later that same day, he called back to have a new battery installed in his own driveway. Here is the real story, plus how to tell if your battery needs a boost or a replacement.',
    seoTitle: 'Battery Boost Ajax | 24/7 Car Jump Start at Taunton & Salem — iFAST',
    seoDescription: 'Dead battery in Ajax? This driver got stranded near Taunton Rd & Salem Rd — iFAST boosted his car on the spot, then replaced his battery at home the same day. Learn when a boost is enough vs when your battery is done, and how mobile battery service works across the East GTA.',
    keywords: 'battery boost Ajax, car jump start Ajax, dead battery Ajax, jump start near me, mobile battery replacement Ajax, battery boost Taunton Salem, car won\'t start Ajax, battery replacement at home Ajax, 24/7 jump start Durham Region, roadside assistance Ajax',
    category: 'Emergency Tips',
    publishDate: '2026-07-04',
    readTime: '6 min read',
    heroImage: '/jump_start_hero.jpg',
    heroImageAlt: 'iFAST technician boosting a dead car battery for a stranded driver in Ajax',
    sections: [
      {
        content: (
          <>
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-6">
              A dead battery near <strong>Taunton Road and Salem Road in Ajax</strong> means you're not going anywhere — no crank, no dash lights, no plan. Sree V Gopi made one call to <strong>{COMPANY_NAME}</strong>, got boosted on the spot, and was driving again in minutes. Then came the part we're most proud of: later that same day, he called back — this time to his house.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mb-6">
              {[
                { icon: <MapPin size={18} />, label: 'Location', value: 'Taunton & Salem, Ajax' },
                { icon: <BatteryCharging size={18} />, label: 'The problem', value: 'Dead battery' },
                { icon: <Wrench size={18} />, label: 'The fix', value: 'Boost + new battery' },
                { icon: <Star size={18} />, label: 'The verdict', value: '5-star review' },
              ].map(f => (
                <div key={f.label} className="bg-white p-4 flex flex-col items-start gap-1">
                  <span className="text-brand-yellow mb-1">{f.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{f.label}</span>
                  <span className="text-sm font-bold text-brand-dark leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-700">
              Here is what happened on that call-out, the review Sree left afterwards, and how to tell whether your own battery needs a quick boost — or has reached the end of the road.
            </p>
          </>
        )
      },
      {
        heading: 'What Happened at Taunton & Salem',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              The call came in from the Taunton and Salem intersection in north Ajax — a battery that had given up and a driver who needed to get moving. A technician was dispatched right away, hooked up a surge-protected booster pack, and had the engine running shortly after arriving.
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <iframe
                src="https://www.google.com/maps?q=Taunton+Rd+%26+Salem+Rd,+Ajax,+ON&z=14&output=embed"
                title="Map of Taunton Rd and Salem Rd in Ajax, where iFAST boosted the dead battery on-site"
                className="w-full h-72 md:h-80 block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="text-xs text-gray-500 text-center py-2 px-3 bg-gray-50">
                Taunton Rd &amp; Salem Rd, Ajax — where this battery boost happened
              </p>
            </div>
            <p className="mb-4 text-gray-700">
              But a boost only gets you started — it doesn't tell you <em>why</em> the battery died. So before leaving, our technician gave Sree the straight version of what he was looking at:
            </p>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <ShieldCheck className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">The advice we gave — no pressure attached</p>
                <ul className="space-y-2 text-sm text-white/85">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>For right now:</strong> drive for 30 minutes straight, or let the engine run for about 45 — that gives the alternator time to put a real charge back into the battery.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>For soon:</strong> the battery is on its way out and will need replacing. If you can do it now, great — if not, it doesn't have to happen today.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>No upsell, no scare tactics.</strong> Just what the battery actually needs, so the driver can decide on his own schedule and budget.</span></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              Minutes after the call, Sree was back on the road — no tow, no waiting on a friend with cables. That is exactly what our <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">24/7 battery jump start service</a> is built for.
            </p>
          </>
        )
      },
      {
        heading: 'Sree\'s 5-Star Review',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              After the boost, Sree left us this on Google:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">S</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Sree V Gopi</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;On time and very helpful.&rdquo;
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Five words that cover the two things that actually matter when your car won't start: we showed up when we said we would, and we fixed the problem.
            </p>
            <div className="text-center mb-6">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJ2bPg5e3R1IkRW8KnogGiPxs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                <Star size={18} fill="currentColor" className="text-brand-yellow" />
                Check Out Our Other Google Reviews
              </a>
            </div>
          </>
        )
      },
      {
        heading: 'Will a Boost Fix It — or Is Your Battery Done?',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Sree's car started with one boost — but his battery still needed replacing. That combination confuses a lot of drivers, so here is the honest breakdown. A boost solves a <strong>charge</strong> problem: lights left on, a long stretch of short trips, a car that sat for weeks. It cannot solve a <strong>battery</strong> problem: an aging battery that no longer holds the charge your alternator gives it. The quick signs our technicians look for:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '✅', title: 'One-off cause, healthy battery', desc: 'Dome light left on, doors not fully closed, a week of 5-minute drives. A boost plus a proper 30–45 minute recharge usually ends the story.' },
                { icon: '✅', title: 'Battery under 3–4 years old', desc: 'Most car batteries live 3–5 years in Ontario. A younger battery that dies once from a known cause is normally fine after a boost.' },
                { icon: '❌', title: 'Slow crank, dim lights, repeat boosts', desc: 'If the engine cranks slower every week or this is your second boost this month, the battery is no longer holding charge — replacement territory.' },
                { icon: '❌', title: '4+ Ontario winters on the clock', desc: 'Deep cold kills weak batteries. A battery heading into its fifth winter that already needed a boost is living on borrowed time.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  After any boost, don't just drive around the corner and park. The battery needs 30+ minutes of continuous driving to take on real charge — shut the engine off too early and you'll be calling for another boost tomorrow morning.
                </p>
              </div>
            </div>
            <BlogCTA source="blog_batteryboost_mid1" />
          </>
        )
      },
      {
        heading: 'The Same-Day Call-Back: A New Battery in His Driveway',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Here is the part of this story we like best. Remember the advice at the roadside — <em>the battery will need replacing, but it doesn't have to be today</em>? Later that same day, Sree called back: &ldquo;I think you should change my battery before it goes bad.&rdquo; No breakdown this time, no stress — just a driver getting ahead of the next one.
            </p>
            <p className="mb-4 text-gray-700">
              So we came to his house in Ajax and did the <a href="/service/battery-replacement" className="text-brand-yellow font-bold hover:underline">battery replacement</a> right in his driveway — correct battery for his vehicle, installed on-site, old battery taken away for recycling, and a <strong>two-year warranty</strong> on the new one. Total shop visits required: zero.
            </p>
            <p className="mb-4 text-gray-700">
              That is the pattern we see all the time: the boost handles today's emergency, and because nobody pressured him at the roadside, the customer comes back on his own terms for the permanent fix.
            </p>
          </>
        )
      },
      {
        heading: 'Battery Boost & Replacement Across Ajax and the East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Car won't start in a driveway, a commuter lot, or on the side of Taunton Road? {COMPANY_NAME} runs <strong>24/7 battery boost and jump start service across Ajax</strong> — Taunton, Salem, Westney, the 401 corridor — and the whole East GTA. We come to you with surge-protected boosters that are safe for modern vehicle electronics, and if the battery is done, we can replace it on the spot.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Ajax', note: 'Taunton, Salem & the 401' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'Scarborough', note: 'Kingston Rd & the 401' },
                { city: 'East GTA', note: '15–30 min ETA' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              Not sure whether your battery can be saved? We test it at your location — <a href="/service/battery-diagnostic" className="text-brand-yellow font-bold hover:underline">on-site battery diagnostics</a> tell you exactly where it stands, and <a href="/service/battery-replacement" className="text-brand-yellow font-bold hover:underline">mobile battery replacement</a> handles the rest without a tow or a shop counter.
            </p>
            <BlogCTA source="blog_batteryboost_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'How fast can you boost a dead battery in Ajax?', answer: 'iFAST typically arrives in 15–30 minutes anywhere in Ajax and the East GTA — including busy corridors like Taunton Rd and Salem Rd. The boost itself takes only a few minutes once we\'re on-site, so most drivers are moving again within the half hour.' },
      { question: 'Will my battery recharge itself after a boost?', answer: 'Partially, yes — if you let it. After a boost, drive for at least 30 minutes continuously (or let the engine run for about 45) so the alternator can put real charge back into the battery. But a boost only restores charge; if the battery itself is worn out, it will die again and needs replacement.' },
      { question: 'How do I know if I need a boost or a new battery?', answer: 'A one-time death with a clear cause (lights left on, short trips, car sat unused) usually just needs a boost. Slow cranking, dim lights, a battery over 3–4 years old, or needing more than one boost in a short period all point to replacement. When we boost your car, we\'ll tell you honestly which side of the line your battery is on — with no pressure to buy anything that day.' },
      { question: 'Do you replace car batteries at my home in Ajax?', answer: 'Yes. iFAST does mobile battery replacement at your home, workplace, or roadside across Ajax, Pickering, Whitby, Oshawa, and Scarborough. We bring the correct battery for your vehicle, install it on-site, and take the old one away for recycling — exactly what we did for this customer in his own driveway.' },
      { question: 'Is there a warranty on a replacement battery?', answer: 'Yes — the new battery we installed in this story came with a two-year warranty. Warranty terms depend on the battery your vehicle needs; we\'ll confirm the coverage before any work starts.' },
      { question: 'Is a jump start safe for my car\'s electronics?', answer: 'Done properly, yes. iFAST uses surge-protected, microprocessor-controlled booster packs rather than cables off a stranger\'s running car, which protects your vehicle\'s ECU and sensitive electronics from voltage spikes. It\'s the safest way to boost a modern vehicle.' },
    ]
  },

  /* ============================================================
     POST 10: PRE-PURCHASE INSPECTION IN AJAX (CUSTOMER STORY — IFEYINWA BLESSING)
     ============================================================ */
  {
    slug: 'pre-purchase-car-inspection-ajax',
    title: 'Buying a Used Car in Ajax? Ifeyinwa Had Us Inspect It First — Here\'s Why That Was the Smartest Money She Spent',
    excerpt: 'Before paying for a used car in Ajax, Ifeyinwa called iFAST for a mobile pre-purchase inspection. Our mechanic came to the car, went through it end to end, and gave her the transparent picture she needed to buy with confidence. Here is the real story — and what a pre-purchase inspection catches that a test drive never will.',
    seoTitle: 'Pre-Purchase Car Inspection Ajax | Mobile Used Car Check — iFAST',
    seoDescription: 'Buying a used car in Ajax or Durham Region? iFAST brings the pre-purchase inspection to the car — engine, brakes, tires, diagnostics and an honest verdict before you pay. Read how one Ajax buyer used it to purchase with 100% confidence.',
    keywords: 'pre-purchase car inspection Ajax, used car inspection Ajax, mobile car inspection Ajax, pre purchase inspection near me, used car inspection Durham Region, mobile mechanic Ajax, buy used car inspection Ontario, car inspection before buying Ajax, vehicle inspection Pickering Whitby Oshawa',
    category: 'Buyer\'s Guide',
    publishDate: '2026-07-04',
    readTime: '6 min read',
    heroImage: '/mobile_mechanic_hero.jpg',
    heroImageAlt: 'iFAST mobile mechanic performing a pre-purchase inspection on a used car in Ajax',
    sections: [
      {
        content: (
          <>
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-6">
              Ifeyinwa Blessing was about to buy a used car in <strong>Ajax</strong> — and before any money changed hands, she did the one thing most buyers skip: she called <strong>{COMPANY_NAME}</strong> for a <strong>pre-purchase inspection</strong>. Our mechanic came to the car, went through it end to end, and gave her the straight, transparent picture of exactly what she was buying.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mb-6">
              {[
                { icon: <MapPin size={18} />, label: 'Location', value: 'Ajax, Durham Region' },
                { icon: <Gauge size={18} />, label: 'The request', value: 'Pre-purchase inspection' },
                { icon: <Wrench size={18} />, label: 'The fix', value: 'On-site used-car check' },
                { icon: <Star size={18} />, label: 'The verdict', value: '5-star review' },
              ].map(f => (
                <div key={f.label} className="bg-white p-4 flex flex-col items-start gap-1">
                  <span className="text-brand-yellow mb-1">{f.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{f.label}</span>
                  <span className="text-sm font-bold text-brand-dark leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-700">
              Here is how the inspection went, the review Ifeyinwa left afterwards, and why a couple hundred dollars of inspection routinely saves used-car buyers thousands.
            </p>
          </>
        )
      },
      {
        heading: 'What Happened in Ajax',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Ifeyinwa had found a car she was serious about. The problem every used-car buyer faces at that moment is the same: the seller says it runs great, the test drive feels fine, and you have no way of knowing what's hiding under the hood, under the paint, or in the computer. So instead of guessing, she booked a <a href="/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> to meet the car in Ajax.
            </p>
            <p className="mb-4 text-gray-700">
              That's the part people love about a mobile pre-purchase inspection: <strong>the car doesn't have to go anywhere</strong>. No convincing a seller to drive to a shop, no arranging plates and insurance for a car you don't own yet. The mechanic comes to the driveway, parking lot, or dealership — tools, diagnostic scanner and all.
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <iframe
                src="https://www.google.com/maps?q=Ajax,+ON&z=12&output=embed"
                title="Map of Ajax, Ontario, where iFAST performed this mobile pre-purchase car inspection"
                className="w-full h-72 md:h-80 block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="text-xs text-gray-500 text-center py-2 px-3 bg-gray-50">
                Ajax, Ontario — where this mobile pre-purchase inspection took place
              </p>
            </div>
            <p className="mb-4 text-gray-700">
              On-site, our technician worked through the same checklist we bring to every pre-purchase call: engine start-up and idle behaviour, a diagnostic scan for stored trouble codes, fluid levels and condition, battery health, brakes, tires, suspension, lights, and the visual tells of past accident repair. Then came the part Ifeyinwa singled out in her review — the <strong>transparent</strong> walkthrough of what he found:
            </p>
            <div className="bg-brand-dark text-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-5 items-start">
              <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                <ShieldCheck className="text-brand-yellow" size={28} />
              </div>
              <div>
                <p className="font-black text-brand-yellow mb-2">Transparent means the whole picture</p>
                <ul className="space-y-2 text-sm text-white/85">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>What's genuinely good</strong> about the car — so you know what you're paying for.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>What needs attention</strong> — now, soon, and eventually — in plain language, not mechanic-speak.</span></li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span><strong>No stake in the sale.</strong> We don't work for the seller and we're not trying to win repair work. The only job is telling the buyer the truth.</span></li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              Ifeyinwa got what every used-car buyer actually needs before handing over money: an independent expert's verdict, delivered at the car, with nothing held back. She walked away 100% sure of her decision — her words, not ours.
            </p>
          </>
        )
      },
      {
        heading: 'Ifeyinwa\'s 5-Star Review',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              After the inspection, Ifeyinwa left us this on Google:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">I</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Ifeyinwa Blessing</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;He is reliable, trustworthy and transparent. I am 100% satisfied&rdquo;
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Reliable. Trustworthy. Transparent. When someone is deciding whether to trust a stranger's opinion on the biggest purchase of their month — maybe their year — those are exactly the three words the job depends on.
            </p>
            <div className="text-center mb-6">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJ2bPg5e3R1IkRW8KnogGiPxs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                <Star size={18} fill="currentColor" className="text-brand-yellow" />
                Check Out Our Other Google Reviews
              </a>
            </div>
          </>
        )
      },
      {
        heading: 'Why You Should Never Buy a Used Car Without an Inspection',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Ifeyinwa's instinct was right, and here is the uncomfortable reason why: in Ontario, most private used-car sales are effectively <strong>as-is</strong>. Once you've paid and signed, whatever is wrong with the car is your problem. A seller's Safety Standards Certificate proves the car met minimum safety requirements on the day it was tested — it says nothing about a tired transmission, a head gasket starting to weep, or four tires that all need replacing next spring.
            </p>
            <p className="mb-4 text-gray-700">
              A pre-purchase inspection exists to catch exactly the things a test drive and a walk-around can't:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '🔍', title: 'Hidden accident history', desc: 'Overspray, misaligned panels, non-factory welds and fresh undercoating tell a story the ad never will. Structural repair can knock thousands off what a car is worth.' },
                { icon: '💻', title: 'Codes the seller cleared', desc: 'A diagnostic scan reads what the engine computer remembers — including trouble codes and readiness monitors that reveal a warning light was recently reset for the sale.' },
                { icon: '🛞', title: 'The next $2,000 in wear items', desc: 'Brakes at 20%, tires near the wear bars, a battery on its last winter. None of it fails the test drive — all of it lands on your credit card in the first six months.' },
                { icon: '💧', title: 'Leaks, rust and neglect', desc: 'Fluid condition and slow leaks show how the car was maintained, not just how it runs today. Ten minutes under a car tells the truth about ten years of ownership.' },
              ].map(r => (
                <div key={r.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className="font-bold text-brand-dark text-sm mb-1">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  Whatever the inspection finds, you win. A clean report buys you confidence, like it did for Ifeyinwa. A list of problems buys you leverage to negotiate the price down — or the best reason you'll ever get to walk away before it becomes your problem.
                </p>
              </div>
            </div>
            <BlogCTA source="blog_prepurchase_mid1" />
          </>
        )
      },
      {
        heading: 'After You Buy: A Mechanic Who Still Comes to You',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              The relationship doesn't end when the plates go on. The same <a href="/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic service</a> that inspected the car before you bought it can maintain it afterwards — diagnostics when a warning light comes on, <a href="/service/battery-diagnostic" className="text-brand-yellow font-bold hover:underline">battery testing</a> before winter, and repairs done in your own driveway instead of a shop waiting room.
            </p>
            <p className="mb-4 text-gray-700">
              And because we're a roadside company first, the number you saved for the inspection is the same one that answers at 2 a.m. if that new-to-you car ever leaves you stranded — <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">boosts</a>, <a href="/service/flat-tire-repair" className="text-brand-yellow font-bold hover:underline">flat tires</a>, lockouts, the lot. Most buyers we inspect for keep the number. Ifeyinwa did.
            </p>
          </>
        )
      },
      {
        heading: 'Pre-Purchase Inspections Across Ajax & the East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Found a used car in Ajax, Pickering, or anywhere in Durham Region? {COMPANY_NAME} brings the <strong>pre-purchase inspection to the car</strong> — private sellers' driveways, dealership lots, workplace parking garages. You get an independent, transparent verdict before you pay, usually bookable within a day.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Ajax', note: 'Where this story happened' },
                { city: 'Pickering', note: 'Hwy 401 corridor' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'Scarborough', note: 'Kingston Rd & the 401' },
                { city: 'East GTA', note: 'We come to the car' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              One phone call books it: tell us where the car is and when the seller is available, and a certified <a href="/service/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> meets you there. Here's <a href="/service/pre-purchase-inspection" className="text-brand-yellow font-bold hover:underline">everything a pre-purchase inspection covers</a>. Buy the car knowing exactly what you're getting — the way Ifeyinwa did.
            </p>
            <BlogCTA source="blog_prepurchase_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Do you come to the seller\'s location for a pre-purchase inspection in Ajax?', answer: 'Yes — that\'s the whole point of a mobile pre-purchase inspection. iFAST meets the car wherever it is: a private seller\'s driveway, a dealership lot, or a parking garage, anywhere in Ajax, Pickering, Whitby, Oshawa, or Scarborough. The car never has to move, so you don\'t need plates, insurance, or the seller\'s cooperation to get it to a shop.' },
      { question: 'What does a pre-purchase car inspection cover?', answer: 'Our mechanic checks the engine\'s start-up and running behaviour, runs a diagnostic scan for stored and cleared trouble codes, and inspects fluids, battery health, brakes, tires, suspension, steering, lights, and visible signs of accident repair or rust. You get a plain-language verdict: what\'s good, what needs work soon, and whether we\'d be comfortable buying the car.' },
      { question: 'How long does a pre-purchase inspection take?', answer: 'Plan for roughly 45 to 90 minutes at the car, depending on the vehicle and what we find. Most sellers are fine with it — and a seller who refuses to allow an inspection is telling you something important about the car.' },
      { question: 'How much does a mobile pre-purchase inspection cost in Ajax?', answer: 'It depends on the vehicle and location, so call +1 437-215-3468 for an exact quote — the price is confirmed up front before we book anything. Weigh it against the downside: buyers who skip the inspection routinely inherit thousands of dollars in repairs that a one-hour check would have caught.' },
      { question: 'Can you inspect a car the same day I call?', answer: 'Often, yes. We run 24/7 across the East GTA, and pre-purchase inspections can usually be scheduled the same day or next day — useful when a good car is priced to sell and other buyers are circling. Call as soon as you\'re serious about a vehicle and we\'ll work around the seller\'s availability.' },
      { question: 'What should I do if the inspection finds problems?', answer: 'Use the report as leverage. Minor wear items (brakes, tires, a tired battery) are normal on a used car and justify negotiating the price down by their repair cost. Structural damage, transmission issues, or evidence of hidden accident repair are usually walk-away findings. Either way, you\'re deciding with the facts instead of the seller\'s word.' },
    ]
  },

  /* ============================================================
     POST 11: EXHAUST HEAT SHIELD — PICKERING CUSTOMER STORY (Chris Moitalta)
     ============================================================ */
  {
    slug: 'exhaust-heat-shield-repair-pickering',
    title: 'That Rattle Under Your Car? Chris in Pickering Had a Broken Exhaust Heat Shield — Here\'s the Fix',
    excerpt: 'A broken exhaust heat shield was hanging under Chris\'s car in Pickering — the kind of problem that sounds terrifying and fixes fast. Our mobile mechanic came to him, removed the broken shield safely, and had him back to a quiet car the same visit. Here is the real story, and what that rattling under your car actually means.',
    seoTitle: 'Exhaust Heat Shield Rattle Pickering | Mobile Fix — iFAST',
    seoDescription: 'Rattling or scraping noise under your car in Pickering? A rusted exhaust heat shield is the usual culprit. iFAST\'s mobile mechanic comes to you and removes or secures the broken shield on the spot — read how we fixed it for one Pickering driver.',
    keywords: 'exhaust heat shield rattle Pickering, heat shield repair Pickering, rattling noise under car Pickering, exhaust heat shield removal, metal dragging under car, loose heat shield fix, mobile mechanic Pickering, mobile exhaust repair Durham Region, heat shield fell off can I drive',
    category: 'Emergency Tips',
    publishDate: '2026-07-04',
    readTime: '5 min read',
    heroImage: '/mobile_mechanic_hero.jpg',
    heroImageAlt: 'iFAST mobile mechanic working under a car to remove a broken exhaust heat shield in Pickering',
    sections: [
      {
        content: (
          <>
            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-6">
              Chris Moitalta's car developed the noise every driver dreads — something metal, loose, and rattling underneath. In <strong>Pickering</strong>, that sound usually has one very common cause: a rusted-out <strong>exhaust heat shield</strong>. Chris's had broken and was hanging under the car. One call to <strong>{COMPANY_NAME}</strong>, and our mobile mechanic came to him, removed the broken shield safely, and confirmed the rest of the exhaust was solid.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mb-6">
              {[
                { icon: <MapPin size={18} />, label: 'Location', value: 'Pickering, ON' },
                { icon: <AlertTriangle size={18} />, label: 'The problem', value: 'Broken heat shield hanging' },
                { icon: <Wrench size={18} />, label: 'The fix', value: 'Removed safely on-site' },
                { icon: <Star size={18} />, label: 'The verdict', value: '5-star review' },
              ].map(f => (
                <div key={f.label} className="bg-white p-4 flex flex-col items-start gap-1">
                  <span className="text-brand-yellow mb-1">{f.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{f.label}</span>
                  <span className="text-sm font-bold text-brand-dark leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-700">
              Here is how the call went, the review Chris left afterwards, and what to do if your car has started making the same noise.
            </p>
          </>
        )
      },
      {
        heading: 'What Happened in Pickering',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              A broken heat shield announces itself. At idle it buzzes like a loose panel; over bumps it clanks; and once it breaks free and starts hanging, you can hear — sometimes feel — metal moving around under the floor. It sounds like the exhaust is falling off the car. Chris did the right thing: instead of driving it around Pickering hoping the noise would go away, he called a <a href="/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> to come take a look where the car sat.
            </p>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <iframe
                src="https://www.google.com/maps?q=Pickering,+ON&z=12&output=embed"
                title="Map of Pickering, Ontario, where iFAST removed this broken exhaust heat shield"
                className="w-full h-72 md:h-80 block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="text-xs text-gray-500 text-center py-2 px-3 bg-gray-50">
                Pickering, Ontario — where this mobile heat shield call took place
              </p>
            </div>
            <p className="mb-4 text-gray-700">
              On-site, our technician ran the same checks we bring to every underbody noise call: find the actual source of the rattle, inspect the exhaust hangers and connections, and confirm nothing else has shaken loose. The diagnosis matched the sound — the heat shield cover had broken and was hanging on, rusted past the point of being reattached.
            </p>
            <p className="mb-4 text-gray-700">
              The fix was straightforward and done on the spot: <strong>remove the broken shield cleanly</strong>, make sure no sharp or loose metal was left behind, and verify the exhaust itself — pipes, hangers, muffler — was still mounted tight. No shop appointment, no leaving the car anywhere, no more noise.
            </p>
          </>
        )
      },
      {
        heading: 'Chris\'s 5-Star Review',
        content: (
          <>
            <p className="mb-5 text-gray-700">
              After the visit, Chris left us this on Google:
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(11,30,54,0.08)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xl">C</div>
                  <div>
                    <p className="font-bold text-brand-dark leading-tight">Chris Moitalta</p>
                    <span className="text-xs text-gray-400">Verified Google review</span>
                  </div>
                </div>
                <svg viewBox="0 0 48 48" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                  <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                </svg>
              </div>
              <div className="flex gap-0.5 text-brand-yellow mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Best mobile tire service in pickering very reliable&rdquo;
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Notice what Chris called us: a <em>tire</em> service — even though this was an exhaust job. That's how most of Pickering knows us, and it's the part we love about this review. Whatever the problem turns out to be — a flat, a dead battery, or a heat shield hanging under the car — it's the same number, the same truck, and the same &ldquo;very reliable&rdquo;.
            </p>
            <div className="text-center mb-6">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJ2bPg5e3R1IkRW8KnogGiPxs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                <Star size={18} fill="currentColor" className="text-brand-yellow" />
                Check Out Our Other Google Reviews
              </a>
            </div>
          </>
        )
      },
      {
        heading: 'What Is an Exhaust Heat Shield — and Can You Drive With It Hanging?',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              A heat shield is a thin layer of stamped metal that sits between the hot parts of your exhaust — manifold, catalytic converter, muffler — and everything that shouldn't get cooked by them: the floor of the cabin, fuel and brake lines, plastic trim, and whatever the car is parked over. It matters more than it looks like it should. A catalytic converter runs hot enough to scorch dry grass under a parked car.
            </p>
            <p className="mb-4 text-gray-700">
              The reason they fail in Ontario is simple: <strong>road salt</strong>. The shield itself is thin metal, and the small spot welds and clamps holding it on rust through years before the exhaust does. When a few of those welds let go, the shield starts buzzing. When enough let go, it breaks and hangs — which is exactly what happened on Chris's car.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-amber-900 text-sm font-medium">
                  A rattling shield is an annoyance. A <strong>hanging</strong> one is a real problem: it can drag, catch on road debris, contact hot exhaust parts, or drop onto the road at speed. If yours is hanging low or scraping, don't put the fix off — and if it's dragging on the pavement, stop driving and call.
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-700">
              As for the fix — honesty matters here. When a shield has rusted to the point of breaking, welding the old one back on is rarely worth anyone's money. The standard fix is to <strong>remove the broken section cleanly</strong> and check whether the area it protected still needs coverage; where it does, a replacement shield or a proper clamp-on repair is the answer. That call gets made under your actual car, not over the phone — which is why we come look before quoting anything.
            </p>
            <BlogCTA source="blog_heatshield_mid1" />
          </>
        )
      },
      {
        heading: 'More Than Tires: A Mechanic Who Comes to You',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Chris's review calls us a tire service, and tires are how a lot of Durham Region first finds us. But the same <a href="/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic service</a> that pulled a broken heat shield off his car handles the rest of the small-but-urgent list too: diagnostics when a warning light comes on, <a href="/service/battery-diagnostic" className="text-brand-yellow font-bold hover:underline">battery testing</a> and replacement in your driveway, and the roadside classics — <a href="/service/jump-start" className="text-brand-yellow font-bold hover:underline">boosts</a>, <a href="/service/flat-tire-repair" className="text-brand-yellow font-bold hover:underline">flat tires</a>, lockouts — at 2 a.m. if that's when it happens.
            </p>
            <p className="mb-4 text-gray-700">
              The pattern is the same every time: you describe the problem, we come to the car, and the price is confirmed before any work starts.
            </p>
          </>
        )
      },
      {
        heading: 'Exhaust & Underbody Fixes Across Pickering and the East GTA',
        content: (
          <>
            <p className="mb-4 text-gray-700">
              Hearing a rattle, buzz, or scrape from under your car in Pickering or anywhere in the East GTA? {COMPANY_NAME} comes to your driveway, workplace, or roadside spot, finds the source, and fixes what can be fixed on-site — usually within 15 to 30 minutes of your call.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { city: 'Pickering', note: 'Where this story happened' },
                { city: 'Ajax', note: 'Hwy 401 corridor' },
                { city: 'Whitby', note: 'Durham Region' },
                { city: 'Oshawa', note: 'Hwy 401 & 407' },
                { city: 'Scarborough', note: 'Kingston Rd & the 401' },
                { city: 'East GTA', note: 'We come to you' },
              ].map(c => (
                <div key={c.city} className="bg-brand-dark text-white p-4 rounded-xl text-center">
                  <p className="font-black text-brand-yellow">{c.city}</p>
                  <p className="text-xs text-white/60">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              One call does it: tell us what you're hearing and where the car is, and a <a href="/service/mobile-mechanic" className="text-brand-yellow font-bold hover:underline">mobile mechanic</a> meets you there — the way it worked for Chris.
            </p>
            <BlogCTA source="blog_heatshield_mid2" />
          </>
        )
      }
    ],
    faqs: [
      { question: 'Can I drive with a loose or hanging heat shield?', answer: 'A shield that\'s only rattling is safe to drive short-term, but book the fix — the rust that loosened it only gets worse. A shield that\'s hanging low is different: it can drag, catch debris, or drop onto the road. And if it\'s actually scraping the pavement, stop driving and call +1 437-215-3468 — we come to the car, so there\'s no need to risk the drive.' },
      { question: 'What does a rattling noise under my car mean?', answer: 'The most common cause by far — especially on cars that have seen a few Ontario winters — is a rusted exhaust heat shield vibrating against the exhaust. Classic signs: a metallic buzz at idle or at certain RPMs that changes when the engine revs. Loose exhaust hangers and road debris caught underneath are the other usual suspects. A mobile mechanic can confirm the source at your location in minutes.' },
      { question: 'Do you remove or replace broken heat shields?', answer: 'It depends on the shield\'s condition and what it protects. A shield that\'s rusted through and broken, like the one on this Pickering call, is removed cleanly and safely. If the area it covered still needs heat protection — near fuel lines or the cabin floor, for example — we\'ll tell you straight and recommend a replacement or clamp-on repair. The decision is made under your actual car, and the price is confirmed before any work starts.' },
      { question: 'Do you fix heat shield and exhaust rattles in Pickering?', answer: 'Yes — Pickering is core coverage for iFAST, along with Ajax, Whitby, Oshawa, Scarborough, and the rest of the East GTA. We come to your driveway, workplace, or wherever the car is, 24/7, typically arriving within 15 to 30 minutes.' },
      { question: 'How much does it cost to fix a rattling heat shield?', answer: 'Removing a broken shield is one of the more affordable mobile mechanic calls — but the exact price depends on the vehicle and what we find underneath, so call +1 437-215-3468 for a quote. The price is confirmed up front before we book anything, and there\'s no shop drop-off or towing cost because the fix happens at your car.' },
      { question: 'How long does the fix take?', answer: 'Most broken heat shield calls are diagnosed and fixed in a single short visit — the inspection, the removal, and a check of the surrounding exhaust components all happen on the spot. You keep your day; the car never has to go anywhere.' },
    ]
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find(p => p.slug === slug);

// Maps each blog post to the service pages it should link to. Drives the
// "Related Services" block on every post — descriptive internal links that
// point crawl signals at the top-level /service/* money pages (which were
// stuck at "Discovered — currently not indexed"). Values are SERVICES ids
// from constants.tsx. Keep 2–3 genuinely relevant services per post.
export const BLOG_RELATED_SERVICES: Record<string, string[]> = {
  'flat-tire-on-401-east-gta': ['tire-change', 'flat-tire-repair', 'towing'],
  'winter-roadside-emergencies-ontario-guide': ['jump-start', 'towing', 'tire-change'],
  'caa-vs-independent-roadside-assistance-ontario': ['towing', 'jump-start', 'lockout'],
  'mobile-mechanic-cost-ontario-pricing-guide': ['mobile-mechanic', 'battery-diagnostic'],
  'correct-tire-pressure-scarborough': ['tire-change', 'flat-tire-repair', 'tire-installation'],
  'dead-car-battery-boost-or-replace-east-gta': ['jump-start', 'battery-replacement', 'battery-diagnostic'],
  'locked-out-of-car-what-not-to-do-east-gta': ['lockout'],
  'tire-patch-repair-scarborough': ['flat-tire-repair', 'tire-change'],
  'battery-boost-ajax': ['jump-start', 'battery-replacement'],
  'pre-purchase-car-inspection-ajax': ['mobile-mechanic'],
  'exhaust-heat-shield-repair-pickering': ['mobile-mechanic', 'towing'],
};
