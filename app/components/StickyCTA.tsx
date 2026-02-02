"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-12 right-12 z-[100] hidden lg:block"
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

