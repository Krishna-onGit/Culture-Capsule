"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Launch Partner",
        price: "$5K",
        period: "/ mo",
        description: "For early stage brands looking to build momentum.",
        features: ["Social Media Strategy", "Content Batching", "Weekly Reporting", "Growth Audit"],
        buttonText: "START GROWING",
        bg: "bg-white",
        text: "text-black"
    },
    {
        name: "Scale Partner",
        price: "$12K",
        period: "/ mo",
        description: "For funded brands ready for performance ads.",
        features: ["Everything in Launch", "Paid Ads Management", "Funnel Building", "Conversion Strategy", "Priority Support"],
        buttonText: "BOOK STRATEGY CALL",
        bg: "bg-[#FFE600]",
        text: "text-black",
        tag: "MOST POPULAR"
    },
    {
        name: "Custom Growth Team",
        price: "Custom",
        period: "",
        description: "Your full-stack marketing department on demand.",
        features: ["Full Market Domination", "Multi-platform Eco", "Dedicated Growth Lead", "Unlimited Creative", "CRO + Automation"],
        buttonText: "GET A QUOTE",
        bg: "bg-[#3D5CFF]",
        text: "text-white"
    }
];

const Pricing = () => {
    return (
        <section className="py-16 bg-white border-t-4 border-black" id="pricing">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-block bg-black text-white border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#FF3D81] hover:-translate-y-1 hover:shadow-[4px_5px_0px_0px_#FF3D81] transition-all cursor-default">
                        <span className="text-sm font-black uppercase tracking-widest">Pricing</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black">Investment <br /> <span className="text-[#3D5CFF]">Structure.</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-stretch text-black">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`brutal-card flex flex-col justify-between p-10 h-full relative group transition-all duration-300 ${plan.bg === 'bg-[#FFE600]' ? 'bg-[#FFE600] scale-105 z-10 shadow-[20px_20px_0px_0px_black] border-8' : 'bg-white opacity-80 hover:opacity-100 shadow-[10px_10px_0px_0px_black]'}`}
                            style={plan.bg === 'bg-[#3D5CFF]' ? { backgroundColor: '#3D5CFF', color: 'white' } : plan.bg === 'bg-[#FFE600]' ? { backgroundColor: '#FFE600', color: 'black' } : { backgroundColor: '#FFFFFF', color: 'black' }}
                        >
                            {(plan.tag || plan.name === "Scale Partner") && (
                                <div className="absolute -top-8 -right-8 bg-[#FF3D81] text-white border-4 border-black p-4 rotate-6 font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_black] animate-bounce-slow z-20 cursor-default hover:-translate-y-1 hover:rotate-0 transition-all duration-300">
                                    {plan.name === "Scale Partner" ? "MOST POPULAR" : plan.tag}
                                </div>
                            )}

                            <div>
                                <h3 className={`text-4xl font-black uppercase tracking-tighter mb-4 border-b-4 pb-4 leading-none ${plan.bg === 'bg-[#3D5CFF]' ? 'border-white text-white' : 'border-black text-black'}`}>{plan.name}</h3>
                                <p className={`text-lg font-bold mb-8 leading-tight ${plan.bg === 'bg-[#3D5CFF]' ? 'text-white' : 'text-black'}`}>{plan.description}</p>

                                <ul className="space-y-4 mb-12">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={`flex items-center gap-3 font-black uppercase text-sm border-b-2 pb-2 ${plan.bg === 'bg-[#3D5CFF]' ? 'border-white/30 text-white' : 'border-black/10 text-black'}`}>
                                            <div className="w-5 h-5 bg-black border-2 border-white flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <div className={`flex items-end gap-2 ${plan.bg === 'bg-[#3D5CFF]' ? 'text-white' : 'text-black'}`}>
                                    <span className="text-6xl font-black tracking-tighter uppercase leading-none">{plan.price}</span>
                                    <span className="font-black uppercase text-sm mb-1">{plan.period}</span>
                                </div>

                                <button
                                    className={`
                                        w-full py-5 border-4 border-black font-black uppercase tracking-widest text-xl transition-all
                                        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1
                                        ${plan.bg === 'bg-[#FFE600]' ? 'bg-black text-white' : plan.bg === 'bg-[#3D5CFF]' ? 'bg-[#FFE600] text-black hover:bg-white' : 'bg-black text-white hover:bg-white hover:text-black'}
                                    `}
                                    style={plan.bg === 'bg-[#3D5CFF]' ? { backgroundColor: '#FFE600', color: 'black' } : {}}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-10px) rotate(12deg); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
};

export default Pricing;


