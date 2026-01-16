"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const faqs = [
    {
        question: "How long does a typical project take?",
        answer: "Most projects take between 2 to 6 weeks, depending on complexity and scope. Large-scale enterprise solutions may take longer."
    },
    {
        question: "What platforms do you work with?",
        answer: "We primarily build on Framer, Webflow, and Shopify. For custom applications, we use modern stacks like Next.js and React."
    },
    {
        question: "How do payments work?",
        answer: "We usually work with a 50/50 split: 50% upfront to initiate the project and 50% upon completion and launch."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes, we offer various maintenance plans to ensure your digital products stay healthy, updated, and high-performing."
    },
    {
        question: "What is your delivery process?",
        answer: "We follow a strict 3-phase process: Discovery & Strategy, Design & Prototyping, and Development & Launch."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white" id="faq">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black italic tracking-tighter mb-4">FAQ</h2>
                    <p className="text-gray-500 font-medium">Everything you need to know about working with us.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-[2.5rem] overflow-hidden transition-all duration-300 ${openIndex === index
                                ? 'bg-[linear-gradient(90deg,rgba(123,63,242,0.05),rgba(217,70,239,0.05))] border-purple-200 shadow-md'
                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={`w-full px-10 py-8 flex justify-between items-center transition-colors ${openIndex !== index ? 'hover:bg-gray-50' : ''}`}
                            >
                                <span className="text-xl font-bold text-gray-900 text-left pr-8">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${openIndex === index ? 'bg-black text-white border-black shadow-lg' : 'border-gray-100 text-gray-400'}`}
                                >
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="px-10 pb-10 text-gray-500 text-lg font-medium leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

