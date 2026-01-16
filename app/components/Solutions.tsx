"use client";

import React from 'react';
import { Layout, Palette, Megaphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';


const solutions = [
    {
        id: "01",
        title: "Logos and brand identity",
        desc: "Crafting visual signatures that define your business and leave a lasting impression.",
        icon: Palette
    },
    {
        id: "02",
        title: "Website design and dev",
        desc: "Building high-performance digital platforms that convert visitors into loyal customers.",
        icon: Layout
    },
    {
        id: "03",
        title: "SEO and analysis",
        desc: "Measuring what matters and optimizing your presence for maximum visibility.",
        icon: TrendingUp
    },
    {
        id: "04",
        title: "Social media management",
        desc: "Strategic content and community building to keep your brand at the center of conversation.",
        icon: Megaphone
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
    },
};


const Solutions = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white via-[#F8F7FF] to-[#FFF5FA]" id="services">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-5xl font-bold italic mb-6">Solutions</h2>
                    <p className="text-gray-500 max-w-md italic font-medium">Comprehensive services tailored to elevate your digital presence and brand impact.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {solutions.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[2rem] bg-white border border-transparent hover:border-purple-200 hover:bg-[linear-gradient(90deg,rgba(123,63,242,0.05),rgba(217,70,239,0.05))] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between h-[400px] relative overflow-hidden"

                        >
                            <div className="relative z-10">
                                <motion.span
                                    className="text-4xl font-black text-gray-100 group-hover:text-black transition-colors mb-8 block"
                                >
                                    {item.id}
                                </motion.span>
                                <div className="mb-8">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <item.icon className="text-black" size={32} strokeWidth={1.5} />
                                    </motion.div>
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                            <button className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest mt-8 group-hover:translate-x-2 transition-transform">
                                Learn more
                                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7.5L14 7.5M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Solutions;

