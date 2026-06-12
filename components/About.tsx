import React from 'react';
import { Users, Zap, PhoneCall, BadgeDollarSign, Wrench } from 'lucide-react';
import { COMPANY_NAME, ADDRESS, PHONE_NUMBER, GOOGLE_RATING } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img
                                    src="/roadside_assistance_help.jpg"
                                    alt="Roadside Assistance Help"
                                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                                    loading="lazy"
                                />
                                <div className="bg-brand-yellow p-8 rounded-3xl shadow-xl animate-float">
                                    <div className="text-4xl font-black text-brand-dark mb-1">{GOOGLE_RATING}★</div>
                                    <div className="text-brand-dark font-bold text-sm uppercase tracking-wider">Google Rating</div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="bg-brand-dark p-8 rounded-3xl shadow-xl text-white">
                                    <Zap className="text-brand-yellow mb-4" size={32} />
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Availability</div>
                                </div>
                                <img
                                    src="/roadside_technician_towing.jpg"
                                    alt="Professional Roadside Service"
                                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm uppercase tracking-widest mb-6">
                            <div className="w-8 h-1 bg-brand-yellow"></div>
                            Our Mission
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-8 leading-tight">
                            Your Safety Is Our Mission, <br />
                            <span className="text-gradient">Not An Afterthought.</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Being stranded on the side of the 401 or stuck in a freezing parking lot is stressful enough without wondering <em>if</em> help will show up.
                            Big tow companies make you wait for a flatbed. <strong>{COMPANY_NAME}</strong>, based at <strong>{ADDRESS}</strong>, sends fast, fully-equipped service vans from our Scarborough home base — so most calls are fixed on the spot, no tow needed.
                        </p>

                        <div className="flex flex-col gap-6 mb-10">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow premium-shadow">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Vetted Professionals</h4>
                                    <p className="text-gray-500 text-sm">No shady operators. Our teams are licensed, insured, and safety-trained.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow premium-shadow">
                                    <BadgeDollarSign size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Upfront Pricing</h4>
                                    <p className="text-gray-500 text-sm">You get a clear quote on the phone before we dispatch. No hook-up fees, no late-night surcharges.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow premium-shadow">
                                    <Wrench size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Fixed On-Site, Not Towed</h4>
                                    <p className="text-gray-500 text-sm">Tires, batteries, lockouts, and fuel are handled right where you're stuck — towing is the backup plan, not the default.</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            onClick={() => trackPhoneCall('about_call_home')}
                            className="px-10 py-4 bg-brand-dark text-white rounded-2xl font-bold premium-shadow-hover hover:bg-gray-800 transition-all inline-flex items-center gap-3 w-fit"
                        >
                            Talk to a Live Dispatcher <PhoneCall size={20} className="text-brand-yellow" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
