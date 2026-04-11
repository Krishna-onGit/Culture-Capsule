"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Binoculars, Layout, ArrowLeftRight, History, Brain } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const solutions = [
    {
        id: "01",
        title: "Live Statistical Tracking",
        desc: "Real-time xG, possession heatmaps, and player heatmap data refreshed every 10 seconds. Never miss a tactical shift.",
        icon: Activity,
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Scouting & Young Talent",
        desc: "Deep-dive scouting reports on the next generation. From the favelas of Brazil to the academies of Europe.",
        icon: Binoculars,
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "Tactical Breakdowns",
        desc: "In-depth analysis of manager philosophies. How Klopp’s heavy metal football compares to Pep’s positional play.",
        icon: Layout,
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Transfer Rumor Mill",
        desc: "Verified insider information on player movements. No clickbait, just confirmed news from top-tier sources.",
        icon: ArrowLeftRight,
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "Legendary Match Vault",
        desc: "Relive the greatest moments in football history with remastered highlights and tactical retrospectives.",
        icon: History,
        color: "#FFE600"
    },
    {
        id: "06",
        title: "Championship Predictions",
        desc: "AI-driven match winner probabilities and league table forecasts based on thousands of data points.",
        icon: Brain,
        color: "#FF3D81"
    }
];

const Solutions = () => {
    return (
        <section className="py-16 bg-white border-t-4 border-black" id="services">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="mb-20 space-y-4">
                    <div className="inline-block bg-[#FF3D81] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-sm font-black uppercase text-white tracking-widest">Our Expertise</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">Ultimate <br /> <span className="text-[#3D5CFF]">Match Coverage.</span></h2>
                    <p className="max-w-xl text-xl font-bold leading-tight">
                        We don't just report scores. We analyze the soul of the game through data and history.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item) => (
                        <div
                            key={item.id}
                            className="brutal-card p-4 group flex flex-col justify-between h-full bg-white hover:bg-black hover:text-white transition-all duration-300 cursor-default"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-4xl font-black uppercase tracking-tighter group-hover:text-[#FFE600] transition-colors leading-none">
                                        {item.id}
                                    </span>
                                    <div className="w-12 h-12 bg-black border-4 border-black group-hover:bg-white group-hover:border-white flex items-center justify-center transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
                                        <item.icon className="text-white group-hover:text-black transition-colors" size={24} strokeWidth={3} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black uppercase leading-[1.1] mb-3 group-hover:text-[#FFE600] transition-colors">{item.title}</h3>
                                <p className="text-base font-bold leading-tight text-black/70 group-hover:text-white transition-colors">{item.desc}</p>
                                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-[#FF3D81] group-hover:text-[#FFE600]">Join the 1% who understand the game.</p>
                            </div>

                            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mt-8 group-hover:translate-x-2 transition-transform">
                                View Section
                                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7.5L14 7.5M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Mobile Slider */}
                <MobileSlider>
                    {solutions.map((item) => (
                        <div
                            key={item.id}
                            className="brutal-card flex flex-col justify-between h-[450px] bg-white"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-5xl font-black uppercase tracking-tighter leading-none">
                                        {item.id}
                                    </span>
                                    <div className="w-14 h-14 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <item.icon className="text-white" size={28} strokeWidth={3} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-[1.1] mb-4">{item.title}</h3>
                                <p className="text-lg font-bold leading-tight text-black/70">{item.desc}</p>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mt-8">
                                View Section →
                            </button>
                        </div>
                    ))}
                </MobileSlider>
            </div>
        </section>
    );
};

export default Solutions;
