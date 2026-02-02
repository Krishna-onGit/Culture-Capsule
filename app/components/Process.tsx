"use client";

import React from 'react';
import { Search, Map, Rocket, BarChart, TrendingUp } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Audit & Research",
        desc: "We dive deep into your data, competitors, and customer behavior to find the 'leaks' in your current funnel.",
        icon: Search,
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Strategy Blueprint",
        desc: "No guesswork. We build a custom growth roadmap focused on high-impact channels and ROI-driven creative.",
        icon: Map,
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "Launch Campaigns",
        desc: "We deploy high-performance ads and conversion-optimized systems built to capture and convert attention.",
        icon: Rocket,
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Weekly Optimization",
        desc: "We test, tweak, and refine every single variable—from ad copy to landing pages—to squeeze out more profit.",
        icon: BarChart,
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "Scale What Works",
        desc: "Once we find the winning formula, we push the gas. Predictable growth, unlocked and scaled to the moon.",
        icon: TrendingUp,
        color: "#FFE600"
    }
];

const Process = () => {
    return (
        <section className="py-16 bg-black text-white border-t-4 border-black relative overflow-hidden" id="process">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="mb-20 space-y-4">
                    <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                        <span className="text-sm font-black uppercase text-black tracking-widest">Our Methodology</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">The System <br /> <span className="text-[#3D5CFF]">How We Work.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col group relative w-fit mx-auto">
                            <div className="relative border-4 border-white p-6 w-[240px] h-[400px] bg-black hover:bg-white hover:text-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
                                <span className="text-4xl font-black mb-8 block opacity-20 group-hover:opacity-100 transition-opacity">{step.id}</span>
                                <div className="mb-8">
                                    <step.icon size={48} strokeWidth={3} className="text-white group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-tight mb-4">{step.title}</h3>
                                <p className="text-sm font-bold opacity-70 group-hover:opacity-100 leading-snug">{step.desc}</p>
                            </div>

                            {/* Connector for large screens */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute h-1 w-8 bg-white/20 top-1/2 -right-4 z-0"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 border-4 border-white bg-[#FFE600] text-black flex flex-col md:flex-row justify-between items-center gap-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
                    <p className="text-2xl font-black uppercase tracking-tight text-center md:text-left">Ready to see our process in action for your brand?</p>
                    <button className="brutal-btn bg-white text-black hover:!bg-[#EC3B80] hover:!text-white w-full md:w-auto text-xl py-6 px-12">Book Your Strategy Call</button>
                </div>
            </div>
        </section>
    );
};

export default Process;

