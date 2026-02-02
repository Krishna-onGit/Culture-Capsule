"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

const AllProjects = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 bg-white/80 backdrop-blur-md"
            >
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Culture Capsule<span className="text-sm align-top">®</span>
                </Link>
                <div className="flex gap-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </motion.nav>

            <main className="pt-32 px-6 max-w-7xl mx-auto pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20 text-center"
                >
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-7xl font-black italic tracking-tighter mb-6"
                    >
                        All Projects
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
                    >
                        A curated collection of our finest work, pushing the boundaries of digital design and brand identity.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
                >
                    {projects.map((project, index) => (
                        <Link href={`/projects/${project.id}`} key={project.id}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -15 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-8 left-8 relative z-10">
                                        <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                                            {project.id}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-1">{project.title}</h3>
                                        <p className="text-gray-500 font-medium text-lg">{project.category}</p>
                                    </div>
                                    <motion.div
                                        whileHover={{ rotate: 45, scale: 1.1 }}
                                        className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm"
                                    >
                                        <ArrowUpRight size={24} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </main>

            <footer className="py-12 text-center text-sm font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100">
                Culture Capsule® — All Rights Reserved
            </footer>
        </div>
    );
};

export default AllProjects;

