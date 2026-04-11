"use client";

import React from 'react';
import { motion } from 'framer-motion';

const partners = ["FIFA Official", "UEFA Champions", "ESPN FC Rated", "Ballon d'Or Tracker", "World Cup Hub"];

const TrustStrip = () => {
    // Duplicate partners for seamless marquee
    const marqueePartners = [...partners, ...partners, ...partners];

    return (
        <div className="bg-white border-y-4 border-black py-8 overflow-hidden">
            {/* Desktop Layout */}
            {/* Desktop Layout */}
            <div className="hidden md:flex max-w-[1200px] mx-auto px-6 md:px-20 flex-col items-center gap-8">
                <p className="text-sm font-black uppercase tracking-widest text-black/40 text-center">Powered By:</p>

                <div className="flex flex-nowrap justify-between gap-4 w-full">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            className="flex-1 text-center border-2 border-black px-2 py-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-xs font-black tracking-widest cursor-default min-w-0 flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mobile Marquee */}
            <div className="md:hidden space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 text-center px-6">Powered By:</p>
                <div className="overflow-hidden relative">
                    <motion.div
                        className="flex gap-4 whitespace-nowrap"
                        animate={{ x: [0, -800] }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {marqueePartners.map((partner, i) => (
                            <div
                                key={i}
                                className="border-2 border-black px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-[10px] font-black tracking-widest shrink-0"
                            >
                                {partner}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
