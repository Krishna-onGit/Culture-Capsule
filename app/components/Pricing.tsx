"use client";

import React from 'react';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Starter",
        price: "$2,499",
        features: ["Core branding", "Single page website", "Email support", "2 revisions"]
    },
    {
        name: "Growth",
        price: "$4,999",
        features: ["Full branding identity", "Multi-page CMS site", "Priority support", "Unlimited revisions"]
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Digital product design", "E-commerce solutions", "24/7 dedicated lead", "Strategic consulting"]
    },
    {
        name: "Retainer",
        price: "$1,999/mo",
        features: ["Monthly design assets", "Web maintenance", "SEO monitoring", "Priority scheduling"]
    }
];

const Pricing = () => {
    return (
        <section className="py-24 bg-[#0F172A] text-white overflow-hidden relative" id="process">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-4 block">Pricing</span>
                    <h2 className="text-5xl font-bold italic">Plans with purpose</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="p-12 rounded-[3rem] bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <p className="text-3xl font-bold text-white/90">{plan.price}</p>
                                </div>
                                <ul className="space-y-6 mb-16">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-4 text-white/70">
                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                                <Check size={14} className="text-blue-400" />
                                            </div>
                                            <span className="font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/90 transition-all transform group-hover:scale-[1.02]">
                                Get started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

