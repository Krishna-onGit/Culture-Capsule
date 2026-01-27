"use client";

import React from 'react';
import { ShoppingCart, Smartphone, Sparkles, Building2, Zap, Target, Globe, Layout, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileSlider from './ui/MobileSlider';

const Industries = () => {
    const sectors = [
        { icon: ShoppingCart, name: "D2C Brands", desc: "Scaling Shopify stores with ROI-positive ads." },
        { icon: Smartphone, name: "SaaS Startups", desc: "Driving trials and demos for modern software." },
        { icon: Sparkles, name: "Coaches & Creators", desc: "Building high-ticket funnels and personal brands." },
        { icon: Building2, name: "Premium Services", desc: "Generating high-quality leads for service leaders." }
    ];

    const stack = [
        "Meta Ads", "Google Ads", "TikTok Ads", "Shopify", "Webflow", "GA4", "HubSpot", "Zapier", "TripleWhale"
    ];

    return (
        <section id="industries" className="py-24 bg-[#F5F5F5] border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* LEFT: INDUSTRIES */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="inline-block bg-[#FF3D81] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_black]">
                                <span className="text-sm font-black uppercase text-white tracking-widest">Our Focus</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Who We <br /> <span className="text-[#3D5CFF]">Work Best With.</span>
                            </h2>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden md:grid grid-cols-2 gap-6">
                            {sectors.map((s, i) => (
                                <div key={i} className="bg-white border-4 border-black p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[6px_6px_0px_0px_black]">
                                    <s.icon size={40} className="text-[#FF3D81] mb-6" strokeWidth={3} />
                                    <h3 className="text-xl font-black uppercase mb-2">{s.name}</h3>
                                    <p className="text-sm font-bold opacity-70 leading-snug">{s.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Slider */}
                        <MobileSlider>
                            {sectors.map((s, i) => (
                                <div key={i} className="bg-white border-4 border-black p-8 h-[220px] shadow-[6px_6px_0px_0px_black]">
                                    <s.icon size={40} className="text-[#FF3D81] mb-6" strokeWidth={3} />
                                    <h3 className="text-xl font-black uppercase mb-2">{s.name}</h3>
                                    <p className="text-sm font-bold opacity-70 leading-snug">{s.desc}</p>
                                </div>
                            ))}
                        </MobileSlider>
                    </div>

                    {/* RIGHT: MARQUEE STACK */}
                    <div className="bg-black text-white p-12 border-8 border-black shadow-[16px_16px_0px_0px_#FFE600] flex flex-col justify-center space-y-12 relative overflow-hidden min-h-[500px]">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                        <div className="space-y-4 relative z-10">
                            <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                The Growth <br /> <span className="text-[#FFE600]">Tech Stack.</span>
                            </h3>
                            <p className="font-bold opacity-70 text-lg">
                                We leverage the most powerful tools in the market to drive scale and capture data.
                            </p>
                        </div>

                        <div className="space-y-6 relative z-10 -mx-12 overflow-hidden">
                            {/* Row 1: Left to Right */}
                            <motion.div
                                className="flex gap-4 whitespace-nowrap"
                                animate={{ x: [-1000, 0] }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                {[...stack, ...stack, ...stack].map((item, i) => (
                                    <div key={i} className="border-2 border-white px-6 py-3 font-black uppercase text-sm tracking-widest hover:bg-[#FFE600] hover:text-black hover:border-[#FFE600] transition-colors cursor-default bg-black/50 backdrop-blur-sm">
                                        {item}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Row 2: Right to Left */}
                            <motion.div
                                className="flex gap-4 whitespace-nowrap"
                                animate={{ x: [0, -1000] }}
                                transition={{
                                    duration: 35,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                {[...stack, ...stack, ...stack].reverse().map((item, i) => (
                                    <div key={i} className="border-2 border-[#FFE600] px-6 py-3 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors cursor-default bg-black/50 backdrop-blur-sm text-[#FFE600]">
                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="pt-8 border-t-2 border-white/20 relative z-10">
                            <div className="flex items-center gap-4 text-[#FFE600] font-black uppercase italic">
                                <Zap fill="#FFE600" size={24} />
                                <span>Operationally Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Industries;
