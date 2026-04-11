"use client";

import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const testimonials = [
    {
        name: "Gary Neville",
        role: "Lead Pundit, Sky Sports",
        quote: "This platform is the gold standard for tactical breakdowns. It gives fans the level of analysis usually reserved for the pros.",
        metric: "Top Analysis",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Pep Guardiola",
        role: "Manager, Manchester City",
        quote: "Positioning is everything. This platform understands the space between the lines. It's truly for those who love the game.",
        metric: "Master Class",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Mina Rzouki",
        role: "European Football Expert",
        quote: "The coverage of Serie A and youth prospects here is unparalleled. It's my daily source for what's actually happening on the pitch.",
        metric: "Expert Voice",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

const Testimonial = () => {
    return (
        <section className="py-16 bg-[#FFE600] border-t-4 border-black" id="testimonials">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="mb-10 space-y-4">
                    <div className="inline-block bg-black text-white border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#FF3D81]">
                        <span className="text-sm font-black uppercase tracking-widest">Pundit Perspectives</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">What The <br /> <span className="text-[#3D5CFF]">Experts Say.</span></h2>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_black] transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 border-4 border-black overflow-hidden relative grayscale hover:grayscale-0 transition-all">
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-lg leading-tight">{t.name}</h4>
                                        <p className="text-xs font-bold uppercase opacity-60">{t.role}</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Quote size={40} className="absolute -top-4 -left-4 text-[#FF3D81] opacity-20" />
                                    <p className="text-xl font-bold leading-tight relative z-10">&quot;{t.quote}&quot;</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t-4 border-black flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-widest text-[#3D5CFF]">Category</span>
                                <div className="bg-[#FF3D81] text-white border-2 border-black px-3 py-1 font-black uppercase text-sm shadow-[3px_3px_0px_black]">
                                    {t.metric}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Slider */}
                <MobileSlider interval={6000}>
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] h-[450px] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 border-4 border-black overflow-hidden relative grayscale">
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-lg leading-tight">{t.name}</h4>
                                        <p className="text-xs font-bold uppercase opacity-60">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-xl font-bold leading-tight">&quot;{t.quote}&quot;</p>
                            </div>
                            <div className="mt-8 pt-6 border-t-4 border-black flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-widest text-[#3D5CFF]">Category</span>
                                <div className="bg-[#FF3D81] text-white border-2 border-black px-3 py-1 font-black uppercase text-sm">
                                    {t.metric}
                                </div>
                            </div>
                        </div>
                    ))}
                </MobileSlider>
            </div>
        </section>
    );
};

export default Testimonial;
