"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    // Position of the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center"
        >
            {/* The Football Icon */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-white border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-12 overflow-hidden">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-black"
                >
                    <circle cx="12" cy="12" r="10" />
                    {/* Soccer ball pattern */}
                    <path d="m12 2 3 4.5h-6zM15 6.5l4 1.5 1 5.5-3.5 1.5-1.5-8.5zM9 6.5l-4 1.5-1 5.5 3.5 1.5 1.5-8.5zM12 22l-3-4.5h6zM15 17.5l4-1.5 1-5.5-3.5-1.5-1.5 8.5zM9 17.5l-4-1.5-1-5.5 3.5-1.5 1.5 8.5z" />
                </svg>
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none"></div>
            </div>

            {/* Trailing Tail / Ghost Effect */}
            <div className="absolute -z-10 w-8 h-8 bg-[#FF3D81] border-2 border-black rounded-full opacity-30 animate-ping"></div>
        </motion.div>
    );
};

export default CustomCursor;
