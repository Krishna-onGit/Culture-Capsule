"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface VisualBreakProps {
    text: string;
    subtext: string;
    bgColor?: string;
}

const VisualBreak = ({ text, subtext, bgColor = "bg-black" }: VisualBreakProps) => {
    return (
        <section className={`py-32 ${bgColor} text-white border-y-4 border-black relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
                <Quote size={80} className="mx-auto text-[#FFE600] opacity-50" strokeWidth={3} />
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                    &quot;{text}&quot;
                </h2>
                <p className="text-xl md:text-2xl font-black uppercase text-[#FF3D81] tracking-widest bg-white text-black inline-block px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_#FFE600]">
                    {subtext}
                </p>
            </div>
        </section>
    );
};

export default VisualBreak;
