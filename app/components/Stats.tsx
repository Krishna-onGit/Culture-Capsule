"use client";

import React from 'react';
import { ArrowUpRight, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const statsData = [
    { value: "10M+", label: "Capital Raised", sub: "For our strategic partners", icon: TrendingUp, color: "#FFE600" },
    { value: "80%", label: "Satisfaction", sub: "Across all creative ventures", icon: Users, color: "#FF3D81" },
    { value: "24/7", label: "Consulting", sub: "Dedicated high-impact support", icon: ShieldCheck, color: "#3D5CFF" }
];

const Stats = () => {
    return (
        <section className="py-24 bg-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Main Branding Card */}
                    <div className="lg:col-span-12 mb-8">
                        <div className="inline-block bg-[#3D5CFF] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                            <span className="text-sm font-black uppercase text-white tracking-widest">The Impact</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                            Proven <br /> <span className="text-[#FF3D81]">Authority.</span>
                        </h2>
                    </div>

                    {/* Metric Cards - Asymmetrical Grid */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="brutal-card bg-[#FFE600] p-10 flex flex-col justify-between h-80 -rotate-2" style={{ backgroundColor: '#FFE600' }}>
                            <div className="flex justify-between items-start">
                                <TrendingUp size={48} strokeWidth={3} className="text-black" />
                                <ArrowUpRight size={32} strokeWidth={3} className="text-black" />
                            </div>
                            <div className="text-black">
                                <h3 className="text-7xl font-black tracking-tighter uppercase leading-none text-black">{statsData[0].value}</h3>
                                <p className="text-2xl font-black uppercase mt-2 text-black">{statsData[0].label}</p>
                                <p className="text-sm font-bold text-black/70 mt-1">{statsData[0].sub}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="brutal-card bg-white p-10 flex flex-col justify-between h-full rotate-2" style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="flex justify-between items-start mb-12">
                                <Users size={48} strokeWidth={3} className="text-[#FF3D81]" />
                                <div className="w-12 h-12 border-4 border-black rounded-full flex items-center justify-center">
                                    <span className="font-black text-black">ST</span>
                                </div>
                            </div>
                            <div className="text-black">
                                <h3 className="text-6xl font-black tracking-tighter uppercase leading-none text-black">{statsData[1].value}</h3>
                                <p className="text-xl font-black uppercase mt-2 text-black">{statsData[1].label}</p>
                                <p className="text-sm font-bold text-black/70 mt-1">{statsData[1].sub}</p>
                            </div>
                        </div>

                        <div className="brutal-card bg-[#3D5CFF] text-white p-10 flex flex-col justify-between h-full -rotate-1" style={{ backgroundColor: '#3D5CFF' }}>
                            <div className="flex justify-between items-start mb-12">
                                <ShieldCheck size={48} strokeWidth={3} className="text-[#FFE600]" />
                                <div className="w-12 h-12 bg-black border-4 border-white flex items-center justify-center">
                                    <span className="font-black text-white">HI</span>
                                </div>
                            </div>
                            <div className="text-white">
                                <h3 className="text-6xl font-black tracking-tighter uppercase leading-none text-white">{statsData[2].value}</h3>
                                <p className="text-xl font-black uppercase mt-2 text-white">{statsData[2].label}</p>
                                <p className="text-sm font-bold text-white/80 mt-1 tracking-tight">{statsData[2].sub}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-12 mt-8">
                        <div className="p-8 border-4 border-black bg-black text-[#FFE600] flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-2xl font-black uppercase tracking-tight text-center md:text-left">Ready to see these numbers on your dashboard?</p>
                            <button className="brutal-btn bg-[#FFE600] text-black w-full md:w-auto">Start Today</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;

