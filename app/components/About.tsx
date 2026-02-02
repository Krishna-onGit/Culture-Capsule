"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-16 bg-white border-t-4 border-black relative overflow-hidden" id="about">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10] pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-black shadow-[12px_12px_0px_0px_#3D5CFF]">
                    {/* Visual Side */}
                    <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-[#FFE600] border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                        <Image
                            src="/hero_lab.jpg"
                            alt="Neo Brutalist Story"
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 0, y: -4 }}
                                className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group relative z-10 hover:-translate-y-1 hover:rotate-0 transition-all duration-300"
                            >
                                <Play fill="black" size={32} className="ml-1" />
                            </motion.button>
                        </div>

                        <motion.div
                            whileHover={{ y: -4, rotate: 0 }}
                            className="absolute top-8 left-8 bg-black text-white px-4 py-2 font-black uppercase text-sm tracking-widest border-2 border-white cursor-default hover:-translate-y-1 hover:rotate-0 transition-all duration-300"
                        >
                            The Narrative
                        </motion.div>
                    </div>

                    {/* Text Side - Newspaper style */}
                    <div className="bg-[#FF3D81] p-10 md:p-16 flex flex-col justify-center space-y-8 text-black">
                        <h2 className="text-6xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
                            Growth <br />
                            <span className="bg-white px-2 mt-2 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Optimized.</span>
                        </h2>

                        <p className="text-2xl font-black leading-tight border-l-8 border-black pl-6 italic">
                            &quot;Campaigns built like culture. Optimized like science.&quot;
                        </p>

                        <div className="space-y-4 font-bold text-lg leading-snug">
                            <p>
                                We don&apos;t just follow trends. We set them. Our agency works at the bleeding edge of marketing and data to build brands that can&apos;t be ignored.
                            </p>
                            <p>
                                Strategy first. Scale always. We’ve spent years tearing up the rulebook and helping our clients dominate their niches through strategic disruption and ROI-focused execution.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t-4 border-black">
                            <div className="space-y-1">
                                <p className="text-5xl font-black">10+</p>
                                <p className="font-black uppercase tracking-widest text-sm">Years of Chaos</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-5xl font-black">250+</p>
                                <p className="font-black uppercase tracking-widest text-sm">Wild Projects</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="brutal-btn bg-white text-black hover:bg-[#FFE600] w-full md:w-auto">
                                Read Our Manifesto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;


