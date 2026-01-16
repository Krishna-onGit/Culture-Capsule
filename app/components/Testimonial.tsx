"use client";

import React from 'react';
import Image from 'next/image';

const Testimonial = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Team Member Image */}
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#F5F6F8]">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000"
                            alt="Team Member"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right: Quote Content */}
                    <div>
                        <div className="mb-12">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Testimonial</span>
                        </div>

                        <blockquote className="relative">
                            <p className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-12">
                                &quot;Working with Culture Capsule has been a joy. Their ability to translate complex ideas into beautiful digital experiences was exactly what our brand needed. They are truly partners in every sense of the word.&quot;
                            </p>

                            <footer className="pt-12 border-t border-gray-100">
                                <cite className="not-italic">
                                    <p className="text-xl font-bold text-gray-900">David Henderson</p>
                                    <p className="text-gray-500">Creative Director, Apex Digital</p>
                                </cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;

