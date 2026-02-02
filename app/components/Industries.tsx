"use client";

import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileSlider from './ui/MobileSlider';

const Industries = () => {
    const stack = [
        "Meta Ads", "Google Ads", "TikTok Ads", "Shopify", "Webflow", "GA4", "HubSpot", "Zapier", "TripleWhale"
    ];

    return (
        <section id="industries" className="py-24 bg-[#F5F5F5] border-t-4 border-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* HEADER */}
                    <div className="space-y-4 max-w-4xl">
                        <div className="inline-block bg-[#FF3D81] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_black]">
                            <span className="text-sm font-black uppercase text-white tracking-widest">Our Focus</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            The Engine Behind <br /> <span className="text-[#3D5CFF]">Our Strategy.</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-bold leading-tight max-w-2xl mx-auto text-black/70">
                            We leverage the most powerful tools in the market to drive scale and capture data.
                        </p>
                    </div>

                    {/* MARQUEE STACK - Full Width Container */}
                    <div className="w-full space-y-4 py-4">
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
                            {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
                                <div key={i} className="border-4 border-black px-6 py-3 font-black uppercase text-base tracking-widest hover:bg-[#FFE600] transition-colors cursor-default bg-white shadow-[4px_4px_0px_0px_black]">
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
                            {[...stack, ...stack, ...stack, ...stack].reverse().map((item, i) => (
                                <div key={i} className="border-4 border-black px-6 py-3 font-black uppercase text-base tracking-widest hover:bg-[#3D5CFF] hover:text-white transition-colors cursor-default bg-white shadow-[4px_4px_0px_0px_black]">
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* FOOTER STATUS */}
                    <div className="w-full max-w-3xl pt-6 border-t-4 border-black flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 text-black font-black uppercase italic text-xl">
                            <Zap fill="black" size={24} strokeWidth={3} className="text-[#FFE600]" />
                            <span>Operationally Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Industries;

