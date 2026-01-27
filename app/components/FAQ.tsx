"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How fast will I see marketing results?",
        answer: "Initial data and momentum typically build within 14-30 days. For full scale and predictable growth, we recommend a 90-day window to fully optimize the machines we build for you."
    },
    {
        question: "Do you run paid ads or only strategy?",
        answer: "We do both. We believe strategy without execution is hollow, and execution without strategy is expensive. We handle the research, creative, settings, and 24/7 optimization."
    },
    {
        question: "What industries do you specialize in?",
        answer: "We specialize in high-growth B2C brands, E-commerce, and SaaS. If you have a product that people need and a desire to scale, we can help."
    },
    {
        question: "What is your onboarding process?",
        answer: "It starts with a Growth Audit. Once we're a fit, we move into a 7-day deep-dive strategy phase where we set up tracking, creative assets, and campaign structures."
    },
    {
        question: "What does a growth retainer include?",
        answer: "Our growth retainers are 'all-in'. They include constant creative testing, account management, funnel optimization, and weekly performance reporting."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white border-t-4 border-black" id="faq">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-sm font-black uppercase tracking-widest text-black">Common Queries</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Frequently <br /> <span className="text-[#3D5CFF]">Asked.</span></h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border-4 border-black transition-all duration-300 ${openIndex === index
                                ? 'bg-[#FF3D81] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                                : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex justify-between items-center"
                            >
                                <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter text-left pr-8 ${openIndex === index ? 'text-white' : 'text-black'}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-12 h-12 flex-shrink-0 border-4 border-black flex items-center justify-center transition-all ${openIndex === index ? 'bg-white text-black' : 'bg-[#FFE600] text-black'}`}>
                                    {openIndex === index ? <Minus size={24} strokeWidth={4} /> : <Plus size={24} strokeWidth={4} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-8 text-white text-xl font-bold leading-tight border-t-4 border-black pt-6">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

