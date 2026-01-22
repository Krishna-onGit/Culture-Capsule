"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';


const projects = [
    {
        id: "01",
        title: "Neon Horizon",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        category: "Brand Identity",
    },
    {
        id: "02",
        title: "Cyber Dust",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1000&auto=format&fit=crop",
        category: "Web Design",
    },
    {
        id: "03",
        title: "Future Relic",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
        category: "3D Motion",
    },
    {
        id: "04",
        title: "Void Scape",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        category: "Product Design",
    },
    {
        id: "05",
        title: "Aero Glide",
        image: "https://images.unsplash.com/photo-1633419461186-7d40a2e12e7e?q=80&w=1000&auto=format&fit=crop",
        category: "App Dev",
    },
    {
        id: "06",
        title: "Quantum Flow",
        image: "https://images.unsplash.com/photo-1512418490979-92798ced138a?q=80&w=1000&auto=format&fit=crop",
        category: "Strategy",
    },
];

const Projects = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                }
            });

            gsap.from('.project-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.project-grid',
                    start: 'top 75%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white text-black" id="projects">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold italic tracking-tighter mb-4">Projects</h2>
                        <p className="text-gray-500 font-medium max-w-sm text-sm md:text-base">
                            Every color, word, and pixel comes from a clear strategy built to help you grow.
                        </p>
                    </div>
                    <Link href="/projects" className="hidden md:block">
                        <span className="font-bold border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            View all Projects
                        </span>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 project-grid">
                    {projects.map((project, index) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="block group">
                            <motion.div
                                className="project-card relative cursor-pointer"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4 card-hover-gradient">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay Gradient on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Floating Action Button */}
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                        <ArrowUpRight size={18} className="text-black" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center px-1">
                                    <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-1 rounded-full">{project.category}</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link href="/projects">
                        <span className="font-bold border-b border-black pb-0.5">
                            View all Projects
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;

