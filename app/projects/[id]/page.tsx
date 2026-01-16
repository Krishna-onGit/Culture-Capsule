"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

// Project data (can be moved to a shared data file)
const projects = [
    {
        id: "01",
        title: "Retro Future",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Product Design",
        description: "A deep dive into retro-futurism branding, combining nostalgic elements with modern design principles.",
        date: "Oct 2023",
        client: "NeoWave",
        services: ["Branding", "Web Design", "Photography"]
    },
    {
        id: "02",
        title: "Urban Style",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Fashion Branding",
        description: "Redefining urban street style with a bold, typographic-led identity system for a new fashion label.",
        date: "Nov 2023",
        client: "StreetPulse",
        services: ["Art Direction", "Identity", "Social Media"]
    },
    {
        id: "03",
        title: "Digital Soul",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800&h=800",
        category: "Creative Content",
        description: "A digital art exhibition platform showcasing the intersection of human emotion and artificial intelligence.",
        date: "Dec 2023",
        client: "Gallery X",
        services: ["Web Development", "UX/UI", "Naming"]
    },
    {
        id: "04",
        title: "Technical Wear",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=800",
        category: "E-commerce",
        description: "Minimalist e-commerce experience aimed at high-performance technical apparel enthusiasts.",
        date: "Jan 2024",
        client: "TechFit",
        services: ["E-commerce", "Strategy", "Identity"]
    }
];

// Reusable Image Block Component
const ImageBlock = ({ bg = "bg-gray-200", label = "Project image", height = "h-[600px]" }) => (
    <div className={`w-full ${height} ${bg} rounded-[2rem] flex items-center justify-center relative overflow-hidden group mb-12`}>
        <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Abstract Project Detail"
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <span className="relative z-10 font-bold text-white/50">{label}</span>
    </div>
);

const ProjectDetail = () => {
    const params = useParams();
    const router = useRouter();
    // In a real app, you would fetch the specific project based on params.slug or id
    // For this mock, we'll just display "Urban Style" as the default or find via ID if we had routing set up.
    // Let's assume we show "Urban Style" details for now as requested by the prompt mockup style.

    // Find project or default to Urban Style
    const projectId = params.id;
    const project = projects.find(p => p.id === projectId) || projects[1];

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Navbar Placeholder - Minimal */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 bg-white/80 backdrop-blur-md"
            >
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Culture Capsule<span className="text-sm align-top">®</span>
                </Link>
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
                    <ArrowLeft size={16} /> Back
                </button>
            </motion.nav>

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="max-w-3xl mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl font-medium leading-relaxed text-gray-600"
                    >
                        {project.description} <br />
                        Lorem ipsum dolor sit amet consectetur. Velit egestas volutpat dolor scelerisque morbi lectus risus vitae quis. Vestibulum eu suspendisse commodo vel. Pharetra at nisi arcu dui luctus orci pulvinar. Sed faucibus felis dui at tortor iaculis vitae varius magna.
                    </motion.p>
                </div>

                {/* Project Gallery Grid - Matching the visual layout provided */}
                <div className="space-y-12">
                    {/* Full width image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <ImageBlock height="h-[600px]" />
                    </motion.div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <ImageBlock height="h-[500px]" label="Project image" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl font-bold">Lorem ipsum</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Velit egestas volutpat dolor scelerisque morbi lectus risus vitae quis. Vestibulum eu suspendisse commodo vel. Pharetra at nisi arcu dui luctus orci pulvinar. Sed faucibus felis dui at tortor iaculis vitae varius magna.
                            </p>
                        </motion.div>
                    </div>

                    {/* Another Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <ImageBlock height="h-[600px]" />
                    </motion.div>

                    {/* Another Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <ImageBlock height="h-[600px]" />
                    </motion.div>
                </div>

                <div className="max-w-3xl mt-20 mb-32">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Velit egestas volutpat dolor scelerisque morbi lectus risus vitae quis. Vestibulum eu suspendisse commodo vel. Pharetra at nisi arcu dui luctus orci pulvinar. Sed faucibus felis dui at tortor iaculis vitae varius magna.
                    </p>
                </div>

                {/* Other Projects Section */}
                <div className="border-t border-gray-200 pt-20 mb-20">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-bold italic">Other Projects</h2>
                        <Link href="/projects" className="font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            View all projects
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {projects.filter(p => p.id !== project.id).slice(0, 2).map((otherProject, index) => (
                            <Link href={`/projects/${otherProject.id}`} key={otherProject.id} className="group cursor-pointer">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                                        <Image
                                            src={otherProject.image}
                                            alt={otherProject.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold">{otherProject.title}</h3>
                                            <p className="text-gray-500 font-medium">{otherProject.category}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-12 text-center text-sm font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100">
                Culture Capsule® — All Rights Reserved
            </footer>
        </div>
    );
};

export default ProjectDetail;
