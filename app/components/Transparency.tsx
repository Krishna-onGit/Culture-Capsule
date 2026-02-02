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
                            <span className="text-sm font-black uppercase tracking-widest">Transparency Filter</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            What It Feels <br /> <span className="text-[#FFE600]">Like To Work <br /> With Us.</span>
                        </h2>
                        <p className="text-xl font-bold opacity-70 leading-tight max-w-lg">
                            We don't hide behind vanity metrics or complex reports. We are your outsourced growth department. Honest, aggressive, and obsessed with your ROI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: BarChart3,
                                title: "Weekly Reporting",
                                desc: "No monthly fluff. Weekly performance audits so you always know where your ad spend is going."
                            },
                            {
                                icon: Eye,
                                title: "Shared Dashboards",
                                desc: "Full access to our 24/7 internal dashboards. We see what you see. Complete visibility."
                            },
                            {
                                icon: Users,
                                title: "Senior Team Only",
                                desc: "No junior account managers. You work directly with specialists who have scaled 7-8 figure brands."
                            },
                            {
                                icon: Clock,
                                title: "No Long Lock-ins",
                                desc: "We believe in our results. Our contracts are built for speed and flexibility, not trapping you."
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

