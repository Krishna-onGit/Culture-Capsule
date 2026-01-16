"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';


const plans = [
    {
        name: "Monthly Club",
        price: "$3,999",
        tagline: "Perfect for scaling brands.",
        features: [
            "Website design and dev",
            "Mobile app design",
            "48hr delivery",
            "Dedicated Slack channel",
            "Unlimited revisions"
        ]
    },
    {
        name: "The Rush",
        price: "$6,499",
        tagline: "One-time customization.",
        features: [
            "Full brand identity",
            "Premium landing page",
            "SEO strategy",
            "Ready in 7 days",
            "Social media kit"
        ]
    }
];

const Plans = () => {
    return (
        <section className="py-24 plans-gradient text-white relative overflow-hidden" id="plans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-6xl font-black italic tracking-tighter mb-6">Plans with purpose</h2>
                    <p className="text-white/40 max-w-sm mx-auto font-medium">Clear, transparent pricing designed to grow with your business needs.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ rotateX: 10, y: 50, opacity: 0 }}
                            whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
                            whileHover={{
                                y: -10,
                                rotateX: -2,
                                rotateY: index === 0 ? 2 : -2,
                                transition: { duration: 0.3 }
                            }}
                            viewport={{ once: true }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="p-12 rounded-[4rem] bg-[linear-gradient(135deg,_rgba(123,63,242,0.1),_rgba(217,70,239,0.1))] border border-white/10 hover:border-white/30 backdrop-blur-[20px] transition-all flex flex-col justify-between group shadow-2xl"
                        >
                            <div style={{ transform: 'translateZ(50px)' }}>
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-white/40 text-sm font-medium">{plan.tagline}</p>
                                    </div>
                                    <div className="text-right">
                                        <motion.p
                                            initial={{ scale: 0.8 }}
                                            whileInView={{ scale: 1 }}
                                            className="text-4xl font-black mb-1"
                                        >
                                            {plan.price}
                                        </motion.p>
                                        <p className="text-white/30 text-xs font-bold uppercase tracking-widest">per month</p>
                                    </div>
                                </div>

                                <ul className="space-y-6 mb-16">
                                    {plan.features.map((feature, fIndex) => (
                                        <motion.li
                                            key={fIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + fIndex * 0.1 }}
                                            className="flex items-center gap-4 text-white/70"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"
                                            >
                                                <Check size={14} className="text-blue-400 font-bold" />
                                            </motion.div>
                                            <span className="font-medium">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all shadow-xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-white/20"
                            >
                                Get started today
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;

