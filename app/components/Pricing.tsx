"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Starter",
        price: "$15",
        period: "/ mo",
        description: "For individuals & crypto finances.",
        features: ["Up to 5 wallets", "Basic portfolio tracking", "Transaction history", "Support 24/7"],
        buttonText: "UPGRADE",
        highlight: false
    },
    {
        name: "Growth",
        price: "$39",
        period: "/ mo",
        description: "For traders scaling operations.",
        features: ["Everything in Start", "Unlimited wallets", "Advanced insights", "Multi-chain support", "Priority support"],
        buttonText: "UPGRADE",
        highlight: true,
        tag: "best choice"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For web3 builders & teams.",
        features: ["Everything in Growth", "Dedicated account manager", "API access", "Multi-user permissions", "Compliance reports"],
        buttonText: "CONTACT",
        highlight: false
    }
];

const Pricing = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center py-10 relative overflow-hidden bg-white" id="pricing">
            <div className="container mx-auto px-4 z-10">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3 block">Pricing</span>
                    <h2 className="text-4xl md:text-5xl font-bold italic text-black">Plans with purpose</h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 lg:items-stretch max-w-6xl mx-auto"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`
                                relative p-6 md:p-8 rounded-[1.5rem] flex flex-col justify-between
                                border w-full max-w-sm
                                ${plan.highlight
                                    ? 'results-gradient lg:scale-110 z-10 shadow-2xl shadow-black/50 border-none'
                                    : 'bg-[#0F0418] border-white/5 lg:scale-100'
                                }
                            `}
                        >
                            {plan.tag && (
                                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-green-400 text-black text-[10px] font-bold uppercase tracking-wide">
                                    {plan.tag}
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-white/60 text-xs mb-6 min-h-[32px] leading-relaxed">{plan.description}</p>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-white/80">
                                            <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-green-400' : 'text-white'}`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/10">
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-white/40 text-xs mb-1">{plan.period}</span>}
                                    {plan.highlight && plan.price !== "Custom" && (
                                        <span className="ml-auto text-green-400 text-[10px] font-medium uppercase tracking-wider">billed yearly</span>
                                    )}
                                </div>

                                <button
                                    className={`
                                        w-full py-3 rounded-lg font-bold text-[10px] uppercase tracking-[0.1em] transition-all duration-300
                                        ${plan.highlight
                                            ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10'
                                            : 'border border-white/20 text-white hover:bg-white/10'
                                        }
                                    `}
                                >
                                    {plan.buttonText}
                                </button>

                                <p className="text-center text-white/30 text-[9px] mt-3 uppercase tracking-widest">
                                    {index === 0 ? '7 days free' : index === 1 ? '7 days free' : 'Individual'}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;

