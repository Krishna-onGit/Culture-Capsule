"use client";

import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

const LeadMagnet = () => {
    return (
        <section className="py-16 bg-[#FFE600] border-y-4 border-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3D81] opacity-20 -mr-32 -mt-32 rounded-full border-4 border-black"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-8 border-black p-8 md:p-16 bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-8">
                        <div className="inline-block bg-black text-white px-4 py-1 border-2 border-black font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_#FF3D81]">
                            Free Resource
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            2026 Growth <br /> <span className="text-[#3D5CFF]">Toolkit.</span>
                        </h2>
                        <p className="text-xl font-bold leading-tight">
                            The exact systems, ad copy swipe files, and funnel checklists we use to scale D2C brands to 7 figures. Downloaded by 5,000+ founders.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Ad Copy Swipe File",
                                "Funnel Checklist",
                                "Growth Audit Sheet",
                                "Landing Page Template"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 font-black uppercase text-xs">
                                    <CheckCircle2 size={16} className="text-[#FF3D81]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="ENTER YOUR BEST EMAIL"
                                className="w-full p-6 border-4 border-black font-black uppercase text-lg focus:outline-none focus:bg-[#FFE600] transition-colors shadow-[6px_6px_0px_0px_black]"
                            />
                            <button className="w-full bg-black text-white p-6 border-4 border-black font-black uppercase text-xl tracking-widest hover:bg-[#FF3D81] transition-all flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_#3D5CFF] active:translate-x-1 active:translate-y-1 active:shadow-none">
                                Download Free Toolkit <Download size={24} strokeWidth={3} />
                            </button>
                        </div>
                        <p className="text-[10px] font-bold text-center opacity-50 uppercase tracking-widest">
                            No spam. Only high-ROI growth secrets. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadMagnet;

