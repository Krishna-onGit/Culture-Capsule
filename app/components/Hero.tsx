"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';


const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split text-like reveal for title
            gsap.from('.hero-title-part', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.5
            });

            // Parallax for orbs
            gsap.to(orb1Ref.current, {
                yPercent: -50,
                xPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            gsap.to(orb2Ref.current, {
                yPercent: -30,
                xPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Continuous floating animation for orbs
            gsap.to('.orb-float', {
                y: -30,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 1
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden hero-gradient">
            {/* Overlay for noise texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-4"
                >
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">Creative Agency</span>
                </motion.div>

                <h1 ref={titleRef} className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-tighter leading-[0.9] text-white">
                    <div className="overflow-hidden">
                        <span className="inline-block hero-title-part">We Turn Culture</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="inline-block hero-title-part text-white/90">
                            Into <span className="font-[family-name:var(--font-script)] font-bold text-white">Growth</span>.
                        </span>
                    </div>
                </h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 font-medium leading-relaxed"
                >
                    We help modern brands earn attention, influence conversations, and scale fast.
                </motion.p>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 font-bold text-white group"
                    >
                        Our work
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowDown size={16} />
                        </div>
                    </motion.button>
                </motion.div>
            </div>

            {/* Decorative Orbs */}
            <div
                ref={orb1Ref}
                className="absolute top-20 left-10 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] orb-float"
            />
            <div
                ref={orb2Ref}
                className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px] orb-float"
            />



            {/* Bottom Fade to White */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white z-20 pointer-events-none" />
        </section>
    );
};

export default Hero;

