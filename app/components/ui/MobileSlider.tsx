"use client";

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileSliderProps {
    children: ReactNode[];
    className?: string;
    autoPlay?: boolean;
    interval?: number;
}

const MobileSlider = ({ children, className = "", autoPlay = true, interval = 5000 }: MobileSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = children.length;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const next = () => setCurrentIndex((prev) => (prev + 1) % total);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

    useEffect(() => {
        if (autoPlay) {
            timeoutRef.current = setInterval(next, interval);
        }
        return () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
        };
    }, [currentIndex, autoPlay, interval]);

    return (
        <div className={`relative md:hidden ${className}`}>
            <div className="overflow-hidden px-4 py-8">
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {children.map((child, i) => (
                        <div key={i} className="min-w-full px-2">
                            {child}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center px-6 mt-4">
                <button
                    onClick={() => {
                        if (timeoutRef.current) clearInterval(timeoutRef.current);
                        prev();
                    }}
                    className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                    <ChevronLeft size={24} strokeWidth={4} />
                </button>

                <div className="flex gap-2">
                    {children.map((_, i) => (
                        <div
                            key={i}
                            className={`h-3 w-3 border-2 border-black transition-all ${currentIndex === i ? 'bg-[#FF3D81] w-8' : 'bg-white'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        if (timeoutRef.current) clearInterval(timeoutRef.current);
                        next();
                    }}
                    className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                    <ChevronRight size={24} strokeWidth={4} />
                </button>
            </div>
        </div>
    );
};

export default MobileSlider;
