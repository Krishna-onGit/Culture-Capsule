"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Visibility toggle
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Bottom boundary detection
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const pageHeight = document.documentElement.scrollHeight;
            const distanceFromBottom = pageHeight - scrollPosition;

            // If distance from bottom is less than the footer height/bottom area
            if (distanceFromBottom < 100) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        bottom: isAtBottom ? '110px' : '48px' // 48px is bottom-12, 110px sits it on the border
                    }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed right-6 md:right-12 z-[100] hidden lg:block"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#FF3D81] text-white border-4 border-black px-4 py-3 font-black uppercase text-xs shadow-[8px_8px_0px_0px_black] hover:shadow-none transition-all flex items-center gap-2 group w-[180px] justify-center text-center"
                    >
                        Growth Audit <span className="bg-white text-black px-1 inline-block">FREE</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyCTA;

