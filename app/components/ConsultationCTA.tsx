"use client";

import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const ConsultationCTA = () => {
    return (
        <section className="py-16 bg-white border-y-4 border-black overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE600] opacity-20 -mr-32 -mt-32 rounded-full border-4 border-black"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
                <div className="brutal-card bg-black text-white p-12 md:p-20 shadow-[16px_16px_0px_0px_#3D5CFF]">
                    <div className="max-w-4xl space-y-8">
                        <div className="inline-block bg-[#3D5CFF] border-2 border-white px-4 py-1 uppercase font-black text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                            Premium Partnership
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            Ready to Scale With a <br /> <span className="text-[#FFE600]">Growth Partner?</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-bold leading-tight opacity-80 max-w-2xl">
                            We work with serious brands ready to grow profitably through ads, content, and conversion strategy. No fluff, just results.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 pt-8">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#FFE600] text-black border-4 border-black px-10 py-5 font-black uppercase text-xl shadow-[8px_8px_0px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4 group"
                            >
                                Book a Free Strategy Call <Calendar size={24} strokeWidth={3} />
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-black border-4 border-black px-10 py-5 font-black uppercase text-xl shadow-[8px_8px_0px_0px_#3D5CFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4 group"
                            >
                                Request a Growth Audit <ArrowRight size={24} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationCTA;

