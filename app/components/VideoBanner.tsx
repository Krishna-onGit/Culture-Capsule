"use client";

import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const VideoBanner = () => {
    return (
        <section className="py-16 bg-[#06B6D4]" id="about">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Silhouette Visual */}
                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-gradient-to-tr from-black via-blue-600 to-yellow-400 flex items-center justify-center group cursor-pointer">
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Silhouette Image or Effect */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800&h=800"
                                    alt="Silhouette"
                                    fill
                                    className="object-cover mix-blend-overlay opacity-80"
                                />
                            </div>
                        </div>

                        {/* Play Button */}
                        <button className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                            <Play fill="black" size={32} className="ml-1" />
                        </button>

                        <div className="absolute bottom-8 left-8">
                            <p className="text-white font-bold tracking-widest uppercase text-xs">Watch our story</p>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="text-white">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-8 italic">About</h2>
                        <p className="text-xl text-white/90 leading-relaxed mb-10">
                            Culture Capsule is a multidisciplinary creative studio that lives at the intersection of design and technology. We believe in the power of digital products to transform businesses and connect people.
                        </p>
                        <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">
                            See more
                            <div className="w-8 h-[1px] bg-black transition-all group-hover:w-12" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoBanner;

