import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "How fast can you reach me in an emergency?",
        answer: "Our average emergency arrival time is just 30 minutes across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Because we use localized rapid-response vans rather than heavy tow trucks, we cut through GTA traffic significantly faster."
    },
    {
        question: "Are there any hidden hook-up fees or late night charges?",
        answer: "No. The roadside assistance industry is notorious for hidden fees, which is why we built iFAST on absolute transparency. You will receive a clear, upfront quote for your mobile tire, jump start, or towing service before we ever dispatch a truck."
    },
    {
        question: "Can you jump start my car in an underground condo garage?",
        answer: "Yes! Traditional tow trucks cannot clear the height restrictions of underground condo garages in the GTA. Our agile service vans and portable anti-surge lithium jump packs allow us to jump start your dead battery in the tightest parking stalks."
    },
    {
        question: "Do you carry brand new tires if mine blew out on the highway?",
        answer: "While standard service mounts your existing spare tire, our mobile tire units do carry common new tire sizes. If you let dispatch know your tire size over the phone, we can often bring and mount a brand new tire directly on the side of the road."
    },
    {
        question: "Is it safe to wait in my car on the shoulder of the 401?",
        answer: "If you are broken down on a high-speed highway like the 401 or 407, pull as far onto the shoulder as safely possible, turn on your hazard lights, and remain buckled inside your vehicle. Do not attempt to change a tire yourself. Our strobe-equipped trucks will act as a safety buffer when we arrive."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4">Common Questions</h2>
                        <p className="text-gray-600">Everything you need to know about our roadside assistance services.</p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 premium-shadow-hover"
                            >
                                <button
                                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="font-bold text-brand-dark pr-4">{faq.question}</span>
                                    <div className="shrink-0 text-brand-yellow">
                                        {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                <div
                                    className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-5 border-t border-gray-50 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}
                                >
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-brand-dark rounded-3xl text-center text-white glass-morphism border-none">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                                        User
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium">Still have questions? Our AI assistant and human dispatchers are ready to help.</p>
                            <a href="#contact" className="px-6 py-2 bg-brand-yellow text-brand-dark rounded-full font-bold text-sm hover:bg-brand-yellowHover transition-colors">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
