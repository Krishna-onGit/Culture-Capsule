"use client";

import React from 'react';
import { Target, Shield, Trophy, BarChart3, Repeat } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Group Stage Battles",
        desc: "Where it all begins. 32 clubs clash in intense group matches to earn their ticket to the knockouts. Every point counts.",
        icon: Target,
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Knockout Rounds",
        desc: "Two legs, away goals, last-minute drama. The Round of 16 to Semi-Finals is where legends are forged under pressure.",
        icon: Shield,
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "The Final Showdown",
        desc: "One night. One match. One trophy. The Champions League Final — the most-watched club football event on the planet.",
        icon: Trophy,
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Season Stats Analysis",
        desc: "xG, pass completion, pressing intensity, heatmaps — we break down every statistic so you understand the game deeper.",
        icon: BarChart3,
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "Transfer Window",
        desc: "Who's moving where? Track the biggest transfers, rumor mills, and deadline-day drama that reshapes entire leagues.",
        icon: Repeat,
        color: "#FFE600"
    }
];

const Process = () => {
    return (
        <section className="py-16 bg-black text-white border-t-4 border-black relative overflow-hidden" id="process">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="mb-20 space-y-4">
                    <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                        <span className="text-sm font-black uppercase text-black tracking-widest">The Journey</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">The Road To <br /> <span className="text-[#3D5CFF]">Glory.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col group relative w-fit mx-auto">
                            <div className="relative border-4 border-white p-6 w-[240px] h-[400px] bg-black hover:bg-white hover:text-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
                                <span className="text-4xl font-black mb-8 block opacity-20 group-hover:opacity-100 transition-opacity">{step.id}</span>
                                <div className="mb-8">
                                    <step.icon size={48} strokeWidth={3} className="text-white group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-tight mb-4">{step.title}</h3>
                                <p className="text-sm font-bold opacity-70 group-hover:opacity-100 leading-snug">{step.desc}</p>
                            </div>

                            {/* Connector for large screens */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute h-1 w-8 bg-white/20 top-1/2 -right-4 z-0"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 border-4 border-white bg-[#FFE600] text-black flex flex-col md:flex-row justify-between items-center gap-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
                    <p className="text-2xl font-black uppercase tracking-tight text-center md:text-left">Want to test your football IQ? Take the Ultimate Trivia Challenge!</p>
                    <button className="brutal-btn bg-white text-black hover:!bg-[#EC3B80] hover:!text-white w-full md:w-auto text-xl py-6 px-12">Start The Quiz</button>
                </div>
            </div>
        </section>
    );
};

export default Process;
