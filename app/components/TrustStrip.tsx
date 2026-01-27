"use client";

import React from 'react';
import { motion } from 'framer-motion';

const partners = ["Google Partner", "Meta Business Partner", "Clutch 5-Star", "Product Hunt First", "Forbes Agency Council"];

const TrustStrip = () => {
    // Duplicate partners for seamless marquee
    const marqueePartners = [...partners, ...partners, ...partners];

    return (
        <div className="bg-white border-y-4 border-black py-8 overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden md:flex max-w-7xl mx-auto px-6 flex-wrap justify-center gap-12 items-center">
                <span className="text-xs font-black uppercase tracking-widest opacity-50 whitespace-nowrap">Recognized By:</span>
                {partners.map((partner, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        className="border-2 border-black px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-xs font-black tracking-widest cursor-default"
                    >
                        {partner}
                    </motion.div>
                ))}
            </div>

            {/* Mobile Marquee */}
            <div className="md:hidden space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 text-center px-6">Recognized By:</p>
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
