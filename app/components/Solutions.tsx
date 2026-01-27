"use client";

import React from 'react';
import { Layout, Palette, Megaphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const solutions = [
    {
        id: "01",
        title: "Paid Ads that Scale Profitably",
        desc: "High-ROAS campaigns built on deep data and aggressive testing strategies. We own the results, you enjoy the scale.",
        icon: TrendingUp,
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Social Content that Converts",
        desc: "Creating culture-defining content that builds community and drives organic scale without wasting ad spend.",
        icon: Megaphone,
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "SEO that Compounds Growth",
        desc: "Dominating search rankings with content that converts long-term traffic into compounding revenue streams.",
        icon: TrendingUp,
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Funnels that Increase Leads",
        desc: "Turning every click into a lead through scientific A/B testing and high-performance landing page design.",
        icon: Layout,
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "ROI-Focused Brand Strategy",
        desc: "Defining your unique edge to stand out in crowded markets and command premium prices with authority.",
        icon: Palette,
        color: "#FFE600"
    },
    {
        id: "06",
        title: "Automation that Saves Time",
        desc: "Building self-optimizing ecosystems that nurture leads and close sales on autopilot while you sleep.",
        icon: Layout,
        color: "#FF3D81"
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
                    <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">Core <br /> <span className="text-[#3D5CFF]">Growth Systems.</span></h2>
                    <p className="max-w-xl text-xl font-bold leading-tight">
                        We don&apos;t just do marketing. We build scalable systems that drive predictable revenue.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#FF3D81] group-hover:text-[#FFE600]">Scale faster with ROI-driven campaigns.</p>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mt-12 group-hover:translate-x-2 transition-transform">
                                Learn More
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

