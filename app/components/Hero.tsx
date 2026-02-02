"use client";

import React from 'react';
import { Star, Zap, Globe, Target, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="w-full bg-[#FFD700] border-b-4 border-black pt-32 pb-24 relative overflow-hidden">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10] pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-[102px] grid grid-cols-1 md:grid-cols-2 gap-20 items-start relative z-10">

                {/* LEFT SIDE: TEXT CONTENT */}
                <div className="flex flex-col justify-start gap-8 text-left">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-block self-start border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_black]"
                    >
                        <span className="text-sm font-black uppercase tracking-widest text-black">Growth Agency 2.0</span>
                    </motion.div>

                    <div className="space-y-6 relative">
                        <h1 className="text-6xl md:text-7xl font-black uppercase leading-[0.9] text-black tracking-tighter">
                            WE HELP <br />
                            <span className="bg-white border-4 border-black px-3 inline-block my-2 shadow-[6px_6px_0px_black]">
                                D2C & STARTUPS
                            </span>
                            <br />
                            SCALE <br />
                            <span className="relative">
                                PROFITABLY<span className="text-[#FF3D81]">.</span>
                                {/* Small Doodle Sticker */}
                                <motion.div
                                    animate={{ rotate: [15, -15, 15], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute -right-12 -top-4 text-[#FF3D81] hidden lg:block"
                                >
                                    <Zap size={40} className="fill-[#FF3D81]" />
                                </motion.div>
                            </span>
                        </h1>

                        <p className="text-xl font-bold max-w-md text-black leading-tight border-l-4 border-black pl-5">
                            We turn attention into profitable revenue for modern brands worldwide. Strategy first. Scale always.
                        </p>

                        {/* Service Bullets */}
                        <div className="flex flex-col gap-4 pt-2">
                            {[
                                { bold: "Paid Ads", text: "that Scale Profitably" },
                                { bold: "Social Content", text: "that Converts" },
                                { bold: "Funnels", text: "that Increase Leads" }
                            ].map((bullet, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-6 h-6 bg-black flex items-center justify-center group-hover:bg-[#FF3D81] transition-colors">
                                        <Check size={16} className="text-[#FFE600] group-hover:text-white" strokeWidth={4} />
                                    </div>
                                    <p className="text-base font-black uppercase tracking-tight">
                                        <span className="bg-black text-white px-2 py-0.5">{bullet.bold}</span> {bullet.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Trust Line */}
                        <p className="text-xs font-black uppercase tracking-widest opacity-60">
                            Trusted by 30+ modern brands worldwide.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6">
                        <button className="bg-black text-white border-4 border-black px-10 py-5 text-lg font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_#FF3D81] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                            Get a Free Growth Audit
                        </button>
                        <button className="bg-white text-black border-4 border-black px-10 py-5 text-lg font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                            View Case Studies
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE: THE HERO POSTER COMPOSITION */}
                <div className="relative hidden md:block">
                    {/* The Main Poster Frame - Added Funk Tilt */}
                    <div className="relative border-4 border-black bg-white shadow-[10px_10px_0px_black] p-6 z-10 rotate-[-1deg]">
                        <div className="relative aspect-[3/4] overflow-hidden border-4 border-black bg-gray-100 -rotate-1">
                            <img
                                src="/hero_lab.jpg"
                                alt="Studio Lab"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-black uppercase text-black leading-none">The Narrative Lab</h3>
                            <p className="text-sm font-bold mt-2 text-black/70 uppercase tracking-widest">Culture Capsule Studio © 2025</p>
                        </div>

                        {/* Sticker 1: Award Winning (Lower and more inside) */}
                        <motion.div
                            initial={{ rotate: 10, scale: 0.8, opacity: 0 }}
                            animate={{ rotate: -8, scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-6 right-10 w-[200px] border-4 border-black bg-[#3D5CFF] text-white shadow-[6px_6px_0px_black] p-5 z-20 cursor-default hover:-translate-y-1 hover:rotate-0 transition-all duration-300"
                        >
                            <div className="bg-white p-2 border-2 border-black mb-3 inline-block">
                                <Star className="text-black fill-black" size={20} />
                            </div>
                            <h3 className="text-sm font-black uppercase leading-none">Award Winning</h3>
                            <p className="text-[10px] font-bold mt-1 text-white/90">Best Digital Agency 2025</p>
                        </motion.div>

                        {/* Sticker 2: Fast Delivery (Lower left position) */}
                        <motion.div
                            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                            animate={{ rotate: 6, scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-32 -left-10 w-[200px] border-4 border-black bg-[#FF3D81] shadow-[6px_6px_0px_black] p-5 z-30 cursor-default hover:-translate-y-1 hover:rotate-0 transition-all duration-300"
                        >
                            <div className="bg-white p-2 border-2 border-black mb-3 flex justify-between items-center text-black">
                                <Zap className="fill-black" size={20} />
                                <span className="text-lg font-black italic">99%</span>
                            </div>
                            <h3 className="text-sm font-black uppercase text-white leading-tight">Fast Delivery</h3>
                            <p className="text-[10px] font-bold mt-1 text-white/80">Speed is our superpower</p>
                        </motion.div>
                    </div>

                    {/* Decorative element behind the poster */}
                    <div className="absolute top-8 left-8 w-full h-full border-4 border-black -z-10 bg-black/5"></div>
                </div>
            </div>

            {/* MARQUEE BANNER */}
            <div className="absolute bottom-0 w-full bg-black py-4 border-t-4 border-black overflow-hidden whitespace-nowrap">
                <div className="flex animate-marquee">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <span key={i} className="text-white text-xl md:text-2xl font-black uppercase mx-8 inline-flex items-center gap-4">
                            <Target size={24} className="text-[#FFE600]" />
                            Strategy First
                            <Globe size={24} className="text-[#FF3D81]" />
                            Global Vision
                            <Zap size={24} className="text-[#3D5CFF]" />
                            High Impact
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-flex;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;

