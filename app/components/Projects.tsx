"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';


const projects = [
    {
        id: "01",
        title: "Retro Future",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Product Design",
    },
    {
        id: "02",
        title: "Urban Style",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Fashion Branding",
    },
    {
        id: "03",
        title: "Digital Soul",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Creative Content",
    },
    {
        id: "04",
        title: "Technical Wear",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=800",
        category: "E-commerce",
    }
];

const Projects = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title fade in from left
            gsap.from(titleRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                }
            });

            // Grid cards stagger reveal
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '.project-grid',
                    start: 'top 70%',
                },
                y: 100,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out',
            });

            // Slower parallax for cards
            gsap.to('.project-card-even', {
                y: -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.project-grid',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            gsap.to('.project-card-odd', {
                y: 40,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.project-grid',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white" id="work">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div ref={titleRef}>
                        <h2 className="text-5xl font-bold mb-4 italic">Projects (8)</h2>
                        <p className="text-gray-500 max-w-md">Every color, word, and pixel comes from a clear strategy built to help you grow.</p>
                    </div>
                    <Link href="/projects">
                        <motion.button
                            whileHover={{ x: 10 }}
                            className="font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                        >
                            View all projects
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 project-grid">
                    {projects.map((project, index) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="block">
                            <motion.div
                                className={`project-card ${index % 2 === 0 ? 'project-card-even' : 'project-card-odd'} group cursor-pointer`}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 group shadow-lg hover:shadow-2xl transition-shadow duration-500 card-hover-gradient">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-8 left-8 relative z-10">
                                        <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                                            {project.id}
                                        </span >
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                                        <p className="text-gray-500 font-medium">{project.category}</p>
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                                            <path d="M1 7.5L14 7.5M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

