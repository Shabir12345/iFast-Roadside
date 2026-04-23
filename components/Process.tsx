import React from 'react';
import { PhoneCall, MapPin, Wrench, CheckCircle2 } from 'lucide-react';

const STEPS = [
    {
        icon: PhoneCall,
        title: "Tap to Request Help",
        description: "Call or chat instantly. We pinpoint your GPS location without you needing to guess the nearest intersection."
    },
    {
        icon: Wrench,
        title: "Rapid GPS Dispatch",
        description: "You get immediate confirmation. The closest fully-equipped safety vehicle is routed to you in under 30 minutes."
    },
    {
        icon: CheckCircle2,
        title: "Safely On Your Way",
        description: "Our certified tech secures your vehicle, fixes the issue damage-free, and takes secure mobile payment."
    }
];

const Process: React.FC = () => {
    return (
        <section id="process" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">Back On The Road In 3 Simple Steps</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We've eliminated the stress and waiting game. Getting help is now fast, trackable, and professional.</p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                        {STEPS.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-brand-dark text-white rounded-3xl flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all duration-500 transform group-hover:rotate-12 premium-shadow relative">
                                    <step.icon size={32} />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-yellow text-brand-dark rounded-full flex items-center justify-center font-black text-sm border-4 border-white">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
