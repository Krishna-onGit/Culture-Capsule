"use client";

import React from 'react';
import Image from 'next/image';

const FounderNote = () => {
    return (
        <section className="py-16 bg-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="brutal-card bg-[#3D5CFF] text-white p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 -mr-32 -mt-32 rotate-45 border-4 border-white"></div>

                    <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                        <div className="absolute inset-0 border-4 border-white rotate-6 -z-10 bg-black"></div>
                        <div className="w-full h-full border-4 border-black overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=400"
                                alt="Chief Editor"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Sticker */}
                        <div className="absolute -bottom-4 -right-4 bg-[#FFE600] text-black border-4 border-black px-4 py-2 font-black uppercase text-xs rotate-12 shadow-[4px_4px_0px_0px_black]">
                            Editor's Note
                        </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
                            &quot;Football is more than a sport; <br /> <span className="text-[#FFE600]">it's our universal heartbeat.</span>&quot;
                        </h2>

                        <div className="space-y-4 max-w-2xl text-xl font-bold leading-tight opacity-90">
                            <p>
                                We created The Beautiful Game because we believe football deserves to be understood through its tactical depth and cultural impact, not just scores. The nuances of a high press or a false nine tell a story.
                            </p>
                            <p>
                                Our mission is to preserve the history of the game while analyzing its future. We don't just report match results; we investigate why they happened.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-2xl font-black uppercase tracking-widest text-[#FFE600]">Marco Rossi</p>
                            <p className="font-black uppercase text-sm tracking-widest opacity-60">Chief Editor, The Beautiful Game</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderNote;
