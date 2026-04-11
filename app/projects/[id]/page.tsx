"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

// Football player data
const projects = [
    {
        id: "01",
        title: "Lionel Messi",
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&q=80&w=800&h=800",
        category: "The Legend",
        description: "Widely regarded as the greatest of all time, Messi's career is a masterclass in vision, dribbling, and playmaking. From Barcelona to Miami, the story continues.",
        date: "Argentina",
        client: "8 Ballon d'Or",
        services: ["Playmaking", "Dribbling", "Free Kicks"]
    },
    {
        id: "02",
        title: "Cristiano Ronaldo",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800&h=800",
        category: "The Goal Machine",
        description: "The ultimate athlete. Ronaldo redefined the limits of physical preparation and goal-scoring consistency over two decades at the top of European football.",
        date: "Portugal",
        client: "900+ Goals",
        services: ["Finishing", "Aerial Prowess", "Longevity"]
    },
    {
        id: "03",
        title: "Kylian Mbappé",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800&h=800",
        category: "The New Era",
        description: "The fastest rise in football history. A World Cup winner at 19, Mbappé represents the explosive future of the game with his blistering pace and finishing.",
        date: "France",
        client: "WC Winner",
        services: ["Explosive Pace", "Clinical Finishing", "Elite 1v1"]
    },
    {
        id: "04",
        title: "Erling Haaland",
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800&h=800",
        category: "The Predator",
        description: "A scoring cyborg. Haaland's record-breaking residency in the Premier League has proven that some players are simply born to find the back of the net.",
        date: "Norway",
        client: "Record Scorer",
        services: ["Strength", "Positioning", "Ruthless Finishing"]
    }
];

// Reusable Image Block Component
interface ImageBlockProps {
    src: string;
    bg?: string;
    label?: string;
    height?: string;
}

const ImageBlock = ({ src, bg = "bg-gray-200", label = "Action Shot", height = "h-[600px]" }: ImageBlockProps) => (
    <div className={`w-full ${height} ${bg} rounded-[2rem] flex items-center justify-center relative overflow-hidden group mb-12`}>
        <Image
            src={src || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2564&auto=format&fit=crop"}
            alt="Football Action Detail"
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <span className="relative z-10 font-bold text-white/50">{label}</span>
    </div>
);

const ProjectDetail = () => {
    const params = useParams();
    const router = useRouter();

    // Find player or default to Messi
    const projectId = params.id;
    const project = projects.find(p => p.id === projectId) || projects[0];

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
                    The Beautiful Game<span className="text-sm align-top">®</span>
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
                        Beyond the trophies and goals lies a player dedicated to the highest level of craft. To understand {project.title.split(' ')[0]} is to understand the very peak of human performance on the football pitch. Every touch, every run, every decision has been refined over thousands of hours.
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
                        <ImageBlock height="h-[600px]" src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000" />
                    </motion.div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <ImageBlock height="h-[500px]" label="Matchday Focus" src="https://images.unsplash.com/photo-1552318975-27588b3543ba?q=80&w=1000" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl font-bold">Unrivaled Vision</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Players at this level see the game differently. While we see the ball, they see the space, the movement of the defenders, and the split-second opportunity to change the outcome of a match. It's a psychological advantage as much as a physical one.
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
                        <ImageBlock height="h-[600px]" label="Iconic Moments" src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000" />
                    </motion.div>

                    {/* Another Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <ImageBlock height="h-[600px]" label="The World Stage" src="https://images.unsplash.com/photo-1544698310-74ea9d1c8288?q=80&w=2000" />
                    </motion.div>
                </div>

                <div className="max-w-3xl mt-20 mb-32">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        In conclusion, {project.title} remains a definitive figure in modern football history. To follow their career is to witness the evolution of the game itself—becoming more data-driven, more athletic, and yet still reliant on that singular spark of individual genius.
                    </p>
                </div>

                {/* Other Projects Section */}
                <div className="border-t border-gray-200 pt-20 mb-20">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-bold italic">Other Stars</h2>
                        <Link href="/projects" className="font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            View all profiles
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
                The Beautiful Game® — All Rights Reserved
            </footer>
        </div>
    );
};

export default ProjectDetail;
