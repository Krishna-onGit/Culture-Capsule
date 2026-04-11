"use client";

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    "PREMIER LEAGUE", "LA LIGA", "SERIE A", "BUNDESLIGA", "LIGUE 1", "CHAMPIONS LEAGUE"
];

const LogoStrip = () => {
    // Duplicate logos for seamless marquee
    const marqueeLogos = [...logos, ...logos, ...logos];

    return (
        <div className="w-full bg-[#F5F5F5] border-b-4 border-black py-12 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-20">
                <p className="text-sm font-black uppercase tracking-widest text-black/40 mb-8 text-center">Top Leagues We Cover</p>

                {/* Mobile Marquee */}
                <div className="md:hidden overflow-hidden relative">
                    <motion.div
                        className="flex gap-6 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {marqueeLogos.map((logo, i) => (
                            <div
                                key={i}
                                className="border-4 border-black bg-white px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shrink-0"
                            >
                                <span className="text-xl font-black italic tracking-tighter text-black">{logo}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:flex flex-nowrap justify-between gap-4 w-full">
                    {logos.map((logo, i) => (
                        <motion.div
                            key={i}
                            whileHover={{
                                y: -6,
                                rotate: [0, -2, 2, -2, 0],
                                boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)"
                            }}
                            className="flex-1 text-center border-4 border-black bg-white px-2 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default min-w-0"
                        >
                            <span className="text-sm lg:text-base font-black italic tracking-tight text-black sm:whitespace-nowrap overflow-hidden text-ellipsis block">{logo}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoStrip;
