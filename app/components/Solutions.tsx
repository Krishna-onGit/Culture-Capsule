"use client";

import React from 'react';
import { Layout, Palette, Megaphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const solutions = [
    {
        id: "01",
        title: "Logos and brand identity",
        desc: "Crafting visual signatures that define your business and leave a lasting impression.",
        icon: Palette,
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Website design and dev",
        desc: "Building high-performance digital platforms that convert visitors into loyal customers.",
        icon: Layout,
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "SEO and analysis",
        desc: "Measuring what matters and optimizing your presence for maximum visibility.",
        icon: TrendingUp,
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Social media management",
        desc: "Strategic content and community building to keep your brand at the center of conversation.",
        icon: Megaphone,
        color: "#FFFFFF"
    }
];

const Solutions = () => {
    return (
        <section className="py-24 bg-white border-t-4 border-black" id="services">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-20 space-y-4">
                    <div className="inline-block bg-[#FF3D81] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-sm font-black uppercase text-white tracking-widest">Our Expertise</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">Growth <br /> <span className="text-[#3D5CFF]">Solutions.</span></h2>
                    <p className="max-w-xl text-xl font-bold leading-tight">
                        Comprehensive services tailored to elevate your digital presence and brand impact through experimental design and strategy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {solutions.map((item) => (
                        <div
                            key={item.id}
                            className="brutal-card group flex flex-col justify-between h-full bg-white hover:bg-black hover:text-white transition-all duration-300 cursor-default"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-5xl font-black uppercase tracking-tighter group-hover:text-[#FFE600] transition-colors leading-none">
                                        {item.id}
                                    </span>
                                    <div className="w-16 h-16 bg-black border-4 border-black group-hover:bg-white group-hover:border-white flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
                                        <item.icon className="text-white group-hover:text-black transition-colors" size={32} strokeWidth={3} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-[1.1] mb-6 group-hover:text-[#FFE600] transition-colors">{item.title}</h3>
                                <p className="text-lg font-bold leading-tight text-black/70 group-hover:text-white transition-colors">{item.desc}</p>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mt-12 group-hover:translate-x-2 transition-transform">
                                Explore
                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7.5L14 7.5M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;

