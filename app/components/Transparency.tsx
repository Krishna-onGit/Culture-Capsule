"use client";

import React from 'react';
import { Eye, Clock, BarChart3, Users } from 'lucide-react';

const Transparency = () => {
    return (
        <section className="py-16 bg-black text-white border-y-4 border-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="inline-block bg-[#3D5CFF] border-4 border-white px-4 py-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                            <span className="text-sm font-black uppercase tracking-widest">Our Fan-First Policy</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            The Source You <br /> <span className="text-[#FFE600]">Can Actually <br /> Trust.</span>
                        </h2>
                        <p className="text-xl font-bold opacity-70 leading-tight max-w-lg">
                            We aren't owned by clubs or betting companies. Our analysis is independent, aggressive, and obsessed with the truth of the game.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: BarChart3,
                                title: "Verified Stats",
                                desc: "No manipulated data. Every stat we present is cross-verified across multiple official data providers."
                            },
                            {
                                icon: Eye,
                                title: "Clear Sources",
                                desc: "Full transparency on all transfer news. We cite our sources and distinguish rumors from facts."
                            },
                            {
                                icon: Users,
                                title: "Expert Contributors",
                                desc: "No AI-generated fluff. All tactical analysis is written by professional coaches and scouting experts."
                            },
                            {
                                icon: Clock,
                                title: "Real-Time Focus",
                                desc: "We capture the pulse of the game as it happens. Our dedicated teams work 24/7 during matchdays."
                            }
                        ].map((item, i) => (
                            <div key={i} className="border-4 border-white p-8 bg-white/5 hover:bg-white hover:text-black transition-all group shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                                <item.icon size={48} strokeWidth={3} className="text-[#FFE600] group-hover:text-black mb-6 transition-colors" />
                                <h3 className="text-2xl font-black uppercase mb-4 leading-none">{item.title}</h3>
                                <p className="text-sm font-bold opacity-70 group-hover:opacity-100 leading-snug">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Transparency;
