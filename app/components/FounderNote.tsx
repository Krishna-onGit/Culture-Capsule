"use client";

import React from 'react';
import Image from 'next/image';

const FounderNote = () => {
    return (
        <section className="py-24 bg-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="brutal-card bg-[#3D5CFF] text-white p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 -mr-32 -mt-32 rotate-45 border-4 border-white"></div>

                    <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                        <div className="absolute inset-0 border-4 border-white rotate-6 -z-10 bg-black"></div>
                        <div className="w-full h-full border-4 border-black overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
                                alt="Founder"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Sticker */}
                        <div className="absolute -bottom-4 -right-4 bg-[#FFE600] text-black border-4 border-black px-4 py-2 font-black uppercase text-xs rotate-12 shadow-[4px_4px_0px_0px_black]">
                            Founder Note
                        </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
                            &quot;Marketing should feel <br /> <span className="text-[#FFE600]">creative and accountable.</span>&quot;
                        </h2>

                        <div className="space-y-4 max-w-2xl text-xl font-bold leading-tight opacity-90">
                            <p>
                                We built Culture Capsule because we were tired of generic agencies delivering vanity metrics while brands struggled to scale profitably. High-impact creative and deep data science shouldn&apos;t be separate.
                            </p>
                            <p>
                                Our mission is simple: To be the growth engine for the next generation of culture-defining brands. We don&apos;t just work for you; we build with you.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-2xl font-black uppercase tracking-widest text-[#FFE600]">Alex Rivera</p>
                            <p className="font-black uppercase text-sm tracking-widest opacity-60">Founder, Culture Capsule</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderNote;
