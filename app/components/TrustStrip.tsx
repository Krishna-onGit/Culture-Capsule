"use client";

import React from 'react';
import { motion } from 'framer-motion';

const partners = ["Google Partner", "Meta Business Partner", "Clutch 5-Star", "Product Hunt First", "Forbes Agency Council"];

const TrustStrip = () => {
    return (
        <div className="bg-white border-y-4 border-black py-6 overflow-hidden flex items-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-12 items-center">
                <span className="text-xs font-black uppercase tracking-widest opacity-50">Recognized By:</span>
                {partners.map((partner, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        className="border-2 border-black px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-[10px] md:text-xs font-black tracking-widest cursor-default"
                    >
                        {partner}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrustStrip;
