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
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Cyber Dust",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1000&auto=format&fit=crop",
        category: "Web Design",
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "Future Relic",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
        category: "3D Motion",
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Void Scape",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        category: "Product Design",
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "Aero Glide",
        image: "https://images.unsplash.com/photo-1633419461186-7d40a2e12e7e?q=80&w=1000&auto=format&fit=crop",
        category: "App Dev",
        color: "#FFE600"
    },
    {
        id: "06",
        title: "Quantum Flow",
        image: "https://images.unsplash.com/photo-1512418490979-92798ced138a?q=80&w=1000&auto=format&fit=crop",
        category: "Strategy",
        color: "#FF3D81"
    },
];

const Projects = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-24 bg-white text-black border-t-4 border-black" id="work">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <div className="inline-block bg-[#3D5CFF] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-default">
                            <span className="text-sm font-black uppercase text-white tracking-widest">Case Studies</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">Selected <br /> <span className="text-[#FF3D81]">Works.</span></h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl font-bold leading-tight mb-6">
                            Every pixel comes from a clear strategy built to help you dominate your market.
                        </p>
                        <Link href="/projects" className="inline-block brutal-btn bg-[#FFE600] text-black">
                            All Projects
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 project-grid">
                    {projects.map((project) => (
                        <Link href={`#`} key={project.id} className="block group">
                            <div className={`brutal-card h-full flex flex-col p-4 bg-white hover:translate-x-1 hover:translate-y-1 transition-all`}>
                                <div className="relative aspect-[1/1] w-full border-4 border-black overflow-hidden mb-6">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white border-4 border-black p-2 z-10">
                                        <ArrowUpRight size={24} strokeWidth={3} />
                                    </div>
                                </div>

                                <div className="space-y-2 px-2 flex-grow">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5 hover:-translate-y-0.5 transition-all">{project.category}</span>
                                        <span className="text-xs font-black uppercase border-2 border-black px-2 py-0.5">{project.id}</span>
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-[#3D5CFF] transition-colors">{project.title}</h3>
                                </div>

                                <div className="mt-6 pt-4 border-t-4 border-black flex justify-between items-center px-2 font-black uppercase text-sm">
                                    <span>Case Study</span>
                                    <span>View Project →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

