"use client";

import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CEO, TechFlow",
        quote: "Culture Capsule helped us increase leads by 3.4x in 60 days. Their performance ads strategy is unlike anything we've seen.",
        metric: "3.4x Leads",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Marcus Thorne",
        role: "Founder, Modern Labs",
        quote: "We saw a 230% increase in ROAS within the first month of working with their growth systems. They are true partners.",
        metric: "+230% ROAS",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Elena Rodriguez",
        role: "Marketing Director, Vibe",
        quote: "Their SEO strategy didn't just bring traffic; it brought the right customers. Our organic revenue is up 120%.",
        metric: "+120% Revenue",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

const Testimonial = () => {
    return (
        <section className="py-24 bg-[#FFE600] border-t-4 border-black" id="testimonials">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-16 space-y-4">
                    <div className="inline-block bg-black text-white border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#FF3D81]">
                        <span className="text-sm font-black uppercase tracking-widest">Success Stories</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">What Our <br /> <span className="text-[#3D5CFF]">Partners Say.</span></h2>
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
                                <span className="text-sm font-black uppercase tracking-widest text-[#3D5CFF]">Result</span>
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
                                <span className="text-sm font-black uppercase tracking-widest text-[#3D5CFF]">Result</span>
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
