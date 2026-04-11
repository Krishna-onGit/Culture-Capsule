import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const projects = [
    {
        id: "01",
        title: "Lionel Messi",
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=1000&auto=format&fit=crop",
        category: "Forward · Argentina",
        metric: "8× Ballon d'Or",
        timeline: "Inter Miami CF",
        color: "#FFE600"
    },
    {
        id: "02",
        title: "Cristiano Ronaldo",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
        category: "Forward · Portugal",
        metric: "900+ Goals",
        timeline: "Al-Nassr FC",
        color: "#FF3D81"
    },
    {
        id: "03",
        title: "Kylian Mbappé",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop",
        category: "Forward · France",
        metric: "World Cup Winner",
        timeline: "Real Madrid",
        color: "#3D5CFF"
    },
    {
        id: "04",
        title: "Erling Haaland",
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1000&auto=format&fit=crop",
        category: "Striker · Norway",
        metric: "36 PL Goals",
        timeline: "Man City",
        color: "#FFFFFF"
    },
    {
        id: "05",
        title: "Jude Bellingham",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        category: "Midfielder · England",
        metric: "La Liga Best",
        timeline: "Real Madrid",
        color: "#FFE600"
    },
    {
        id: "06",
        title: "Vinícius Jr.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1000&auto=format&fit=crop",
        category: "Winger · Brazil",
        metric: "UCL Winner",
        timeline: "Real Madrid",
        color: "#FF3D81"
    },
];

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 3;
    const maxIndex = Math.ceil(projects.length / cardsPerPage) - 1;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="py-24 bg-white text-black border-t-2 border-black" id="work">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <div className="inline-block bg-[#3D5CFF] border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-default">
                            <span className="text-sm font-black uppercase text-white tracking-widest">Star Players</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">The <br /> <span className="text-[#FF3D81]">GOAT Debate.</span></h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl font-bold leading-tight mb-6">
                            From all-time legends to next-gen phenoms. Explore the players who define — and redefine — the beautiful game.
                        </p>
                        <Link href="/projects" className="inline-block brutal-btn bg-[#FFE600] text-black">
                            View All Players
                        </Link>
                    </div>
                </div>

                {/* Desktop Carousel */}
                <div className="hidden md:block overflow-hidden relative px-2 py-4 cursor-grab active:cursor-grabbing">
                    <motion.div
                        className="flex gap-8"
                        drag="x"
                        dragConstraints={{ left: -maxIndex * 1280, right: 0 }} // Approximate width constraint
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            const threshold = 100;
                            if (info.offset.x < -threshold && currentIndex < maxIndex) {
                                nextSlide();
                            } else if (info.offset.x > threshold && currentIndex > 0) {
                                prevSlide();
                            }
                        }}
                        animate={{ x: `-${currentIndex * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {Array.from({ length: Math.ceil(projects.length / cardsPerPage) }).map((_, pageIndex) => (
                            <div key={pageIndex} className="min-w-full grid grid-cols-3 gap-8">
                                {projects.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage).map((project) => (
                                    <Link
                                        href={`#`}
                                        key={project.id}
                                        className="block group h-full"
                                        draggable={false}
                                    >
                                        <div className="brutal-card h-full flex flex-col p-4 bg-white hover:translate-x-1 hover:translate-y-1 transition-all border-4 border-black shadow-[8px_8px_0px_black] pointer-events-none group-active:pointer-events-none group-active:select-none">
                                            <div className="relative aspect-[1/1] w-full border-4 border-black overflow-hidden mb-3 pointer-events-none">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110 pointer-events-none"
                                                    draggable={false}
                                                />
                                                <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
                                                    <div className="bg-[#FFE600] border-2 border-black px-2 py-0.5 z-10 font-black uppercase text-[10px] shadow-[3px_3px_0px_black] group-hover:-translate-y-1 transition-transform self-start">
                                                        {project.metric}
                                                    </div>
                                                    <div className="bg-white border-2 border-black px-2 py-0.5 z-10 font-black uppercase text-[8px] shadow-[3px_3px_0px_black] group-hover:-translate-y-1 transition-transform self-start">
                                                        {project.timeline}
                                                    </div>
                                                </div>
                                                <div className="absolute top-3 right-3 bg-white border-2 border-black p-1.5 z-10">
                                                    <ArrowUpRight size={16} strokeWidth={4} />
                                                </div>
                                            </div>

                                            <div className="space-y-1 px-1 flex-grow pointer-events-none">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase bg-black text-white px-1.5 py-0.5">{project.category}</span>
                                                    <span className="text-[10px] font-black uppercase border-2 border-black px-1.5 py-0.5">{project.id}</span>
                                                </div>
                                                <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-[#3D5CFF] transition-colors leading-tight">{project.title}</h3>
                                            </div>

                                            <div className="mt-3 pt-2 border-t-2 border-black flex justify-between items-center px-1 font-black uppercase text-[10px] pointer-events-none">
                                                <span>Player Profile</span>
                                                <span>Full Stats →</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Carousel Navigation - Centered below the cards */}
                <div className="hidden md:flex items-center justify-center gap-6 mt-12">
                    <button
                        onClick={prevSlide}
                        className="bg-white border-4 border-black p-3 hover:bg-[#FFE600] transition-colors shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 group"
                    >
                        <ChevronLeft size={36} strokeWidth={4} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-white border-4 border-black p-3 hover:bg-[#FFE600] transition-colors shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 group"
                    >
                        <ChevronRight size={36} strokeWidth={4} />
                    </button>
                </div>

                {/* Mobile Slider */}
                <MobileSlider>
                    {projects.map((project) => (
                        <Link href={`#`} key={project.id} className="block">
                            <div className={`brutal-card h-[500px] flex flex-col p-4 bg-white`}>
                                <div className="relative aspect-[1/1] w-full border-4 border-black overflow-hidden mb-6">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale"
                                    />
                                    <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                                        <div className="bg-[#FFE600] border-4 border-black px-3 py-1 z-10 font-black uppercase text-sm shadow-[4px_4px_0px_black]">
                                            {project.metric}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 px-2 flex-grow">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
                                    <p className="text-sm font-black uppercase bg-black text-white px-2 py-0.5 inline-block">{project.category}</p>
                                </div>
                                <div className="mt-6 pt-4 border-t-4 border-black text-center font-black uppercase text-sm">
                                    View full stats →
                                </div>
                            </div>
                        </Link>
                    ))}
                </MobileSlider>
            </div>
        </section>
    );
};

export default Projects;
