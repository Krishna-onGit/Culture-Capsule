"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';


const About = () => {
    const sectionRef = useRef(null);
    const visualRef = useRef(null);
    const textRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax for visual side
            gsap.to(visualRef.current, {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Continuous rotation for decorative circle
            gsap.to(circleRef.current, {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });

            // Stagger stats reveal
            gsap.from('.stat-item', {
                scrollTrigger: {
                    trigger: '.stats-container',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Side */}
                    <div ref={visualRef} className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1000&h=1000"
                            alt="Silhouette"
                            fill
                            className="object-cover scale-110"
                        />

                        {/* Rotating Decorative Circle */}
                        <div
                            ref={circleRef}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full pointer-events-none"
                        >
                            <div className="absolute top-0 left-1/2 w-4 h-4 bg-white/30 rounded-full" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group relative z-10"
                            >
                                <Play fill="black" size={32} className="ml-1" />
                                <div className="absolute inset-x-0 h-full w-full rounded-full bg-white/50 animate-ping opacity-20" />
                            </motion.button>
                        </div>
                        <div className="absolute bottom-10 left-10">
                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-white text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                            >
                                Watch our story
                            </motion.p>
                        </div>
                    </div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-10"
                    >
                        <h2 className="text-5xl lg:text-6xl font-bold italic tracking-tighter text-black leading-[0.9]">
                            Designing <br />
                            <span className="text-gray-400">for humans</span>
                        </h2>
                        <p className="text-2xl text-gray-600 font-medium leading-relaxed">
                            We focus on creating experiences that are intuitive, beautiful, and highly effective. Our team of experts works at the intersection of psychology and design to build products people love to use.
                        </p>
                        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-200 stats-container">
                            <div className="stat-item">
                                <p className="text-4xl font-black text-black mb-2">10+</p>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Years Experience</p>
                            </div>
                            <div className="stat-item">
                                <p className="text-4xl font-black text-black mb-2">250+</p>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Happy Clients</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg"
                        >
                            Learn more about us
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

