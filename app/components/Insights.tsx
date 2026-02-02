"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const articles = [
    {
        title: "How we scaled a D2C brand to 4x ROAS in 30 days",
        category: "Case Study",
        excerpt: "Learn the exact creative testing strategy we used to dominate Meta Ads for a luxury skincare label.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        title: "3 Funnel mistakes that are killing your conversion rate",
        category: "Playbook",
        excerpt: "Most brands ignore these simple landing page tweaks. We show you how to fix them for instant gains.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
        title: "The 2025 Content Strategy for profitable organic scale",
        category: "Strategy",
        excerpt: "Why traditional social media is dead and how to build a content machine that actually drives revenue.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400"
    }
];

const Insights = () => {
    return (
        <section className="py-16 bg-[#F5F5F5] border-t-4 border-black" id="insights">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
                    <div className="space-y-4">
                        <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-sm font-black uppercase text-black tracking-widest">The Lab</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black">Authority <br /> <span className="text-[#FF3D81]">& Content.</span></h2>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="brutal-card bg-white p-6 h-full flex flex-col hover:translate-x-1 hover:translate-y-1 transition-all">
                                <div className="relative aspect-[16/10] border-4 border-black overflow-hidden mb-6">
                                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-black uppercase text-xs border-2 border-white">
                                        {article.category}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-4 group-hover:text-[#3D5CFF] transition-colors">{article.title}</h3>
                                <p className="text-sm font-bold opacity-70 mb-8 flex-grow">{article.excerpt}</p>
                                <div className="pt-6 border-t-4 border-black flex items-center justify-between font-black uppercase text-sm">
                                    <span>Read Playbook</span>
                                    <ArrowRight size={20} strokeWidth={4} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Slider */}
                <MobileSlider>
                    {articles.map((article, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="brutal-card bg-white p-6 h-[550px] flex flex-col">
                                <div className="relative aspect-[16/10] border-4 border-black overflow-hidden mb-6">
                                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-black uppercase text-xs border-2 border-white">
                                        {article.category}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-4">{article.title}</h3>
                                <p className="text-sm font-bold opacity-70 mb-8 flex-grow">{article.excerpt}</p>
                                <div className="pt-6 border-t-4 border-black flex items-center justify-between font-black uppercase text-sm">
                                    <span>Read Playbook →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </MobileSlider>
            </div>
        </section>
    );
};

export default Insights;

