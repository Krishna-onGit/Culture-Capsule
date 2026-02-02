"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BannerCTAProps {
    title: string;
    buttonText: string;
    bgColor?: string;
    textColor?: string;
}

const BannerCTA = ({ title, buttonText, bgColor = "bg-[#FFE600]", textColor = "text-black" }: BannerCTAProps) => {
    return (
        <section className={`py-12 border-y-4 border-black ${bgColor} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
                <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter ${textColor} text-center md:text-left leading-none [text-shadow:4px_4px_12px_rgba(0,0,0,0.5)]`}>
                    {title}
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="bg-white text-black px-10 py-5 border-4 border-black font-black uppercase text-xl shadow-[8px_8px_0px_0px_black] hover:shadow-none hover:!bg-[#EB3A80] hover:!text-white flex items-center gap-4 transition-all"
                >
                    {buttonText} <ArrowRight size={28} strokeWidth={4} />
                </motion.button>
            </div>
        </section>
    );
};

export default BannerCTA;

