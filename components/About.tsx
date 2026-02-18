import React from 'react';
import { Shield, Users, Award, Zap } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=1000&auto=format&fit=crop"
                                    alt="Mechanic working"
                                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
                                />
                                <div className="bg-brand-yellow p-8 rounded-3xl shadow-xl animate-float">
                                    <div className="text-4xl font-black text-brand-dark mb-1">10k+</div>
                                    <div className="text-brand-dark font-bold text-sm uppercase tracking-wider">Drivers Assisted</div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="bg-brand-dark p-8 rounded-3xl shadow-xl text-white">
                                    <Zap className="text-brand-yellow mb-4" size={32} />
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Availability</div>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1562141982-c5c79ac8c4c3?q=80&w=1000&auto=format&fit=crop"
                                    alt="Roadside help"
                                    className="rounded-3xl shadow-lg w-full h-64 object-cover"
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
                            Premium Roadside Care <br />
                            <span className="text-gradient">For Modern Drivers.</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            At {COMPANY_NAME}, we believe roadside assistance shouldn't be a stressful waiting game. We've combined expert mechanical skill with modern technology to provide the fastest, most reliable mobile services in the region.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow premium-shadow">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Full Insurance</h4>
                                    <p className="text-gray-500 text-sm">Every service is 100% covered for your peace of mind.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-yellow premium-shadow">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Expert Team</h4>
                                    <p className="text-gray-500 text-sm">Our techs are vetted, licensed, and highly experienced.</p>
                                </div>
                            </div>
                        </div>

                        <button className="px-10 py-4 bg-brand-dark text-white rounded-2xl font-bold premium-shadow-hover hover:bg-gray-800 transition-all flex items-center gap-3">
                            Learn More About Us <Award size={20} className="text-brand-yellow" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
