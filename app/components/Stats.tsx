"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';


const statsData = [
    { value: 10, suffix: "m+", label: "Capital raised from clients we’ve worked with." },
    { value: 80, suffix: "%", label: "Client satisfaction across all creative projects." },
    { value: 24, suffix: "/7", label: "Dedicated support and strategic consulting." }
];

const Stats = () => {
    const sectionRef = useRef(null);
    const darkCardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background card zoom in
            gsap.from(darkCardRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: darkCardRef.current,
                    start: 'top 85%',
                }
            });

            // Stats counter animation
            statsData.forEach((stat, i) => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: stat.value,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: `.stat-card-${i}`,
                        start: 'top 80%',
                    },
                    onUpdate: () => {
                        const el = document.querySelector(`.stat-number-${i}`);
                        if (el) el.textContent = Math.floor(obj.val).toString();
                    }
                });
            });

            // Stagger stats cards
            gsap.fromTo('.stat-card',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.stats-list',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Main Branding Card */}
                    <div
                        ref={darkCardRef}
                        className="p-16 rounded-[4rem] results-gradient wavy-lines relative overflow-hidden flex flex-col justify-between min-h-[500px] shadow-2xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-6xl font-black text-white italic tracking-tighter leading-none mb-8">
                                Results <br />
                                <span className="text-white/40">driven</span>
                            </h2>
                        </div>
                        <div className="relative z-10 max-w-xs">
                            <p className="text-white/60 text-lg font-medium leading-relaxed">
                                We believe that great design should not only look good but also deliver tangible results for your business.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    </div>

                    {/* Metrics List */}
                    <div className="flex flex-col gap-6 stats-list">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 10, backgroundColor: "#fff", borderColor: "#eee" }}
                                className={`stat-card stat-card-${index} p-10 rounded-[3rem] bg-[#F8F9FA] border border-transparent group flex justify-between items-center shadow-sm hover:shadow-xl transition-shadow`}

                            >
                                <div className="max-w-[70%]">
                                    <p className="text-5xl lg:text-6xl font-black mb-2">
                                        <span className={`stat-number-${index} text-gradient`}>0</span>
                                        <span className="text-gradient">{stat.suffix}</span>
                                    </p>
                                    <p className="text-gray-500 font-medium leading-tight text-lg">{stat.label}</p>
                                </div>
                                <motion.div
                                    whileHover={{ rotate: 45, scale: 1.1 }}
                                    className="w-16 h-16 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-black flex items-center justify-center shadow-lg hover:bg-black/10 transition-all"
                                >
                                    <ArrowUpRight size={28} />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;

