import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "How fast can you reach my location?",
        answer: "On average, our technicians arrive within 30 minutes. However, arrival times can vary based on traffic, weather conditions, and your exact location in the Greater Metro Area."
    },
    {
        question: "Do you offer services 24/7?",
        answer: "Yes! We operate 24 hours a day, 7 days a week, including holidays. Emergency roadside help is always just a phone call away."
    },
    {
        question: "What tire sizes do you carry?",
        answer: "We carry most standard passenger vehicle, SUV, and light truck tire sizes. For specific or rare sizes, we recommend calling ahead so we can ensure we have your exact match on the mobile unit."
    },
    {
        question: "Do you accept insurance or roadside club memberships?",
        answer: "We provide detailed digital receipts that you can submit to your insurance provider or roadside assistance club for reimbursement. We accept all major credit cards, debit cards, and digital payments."
    },
    {
        question: "Is my vehicle safe during a lockout service?",
        answer: "Absolutely. Our technicians use professional, damage-free tools and techniques specifically designed to unlock vehicles without harming the door seals, paint, or locking mechanism."
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
