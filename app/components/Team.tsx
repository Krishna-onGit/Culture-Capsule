"use client";

import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';
import MobileSlider from './ui/MobileSlider';

const team = [
    {
        name: "Zinedine Zidane",
        role: "The Maestro",
        expertise: "Tactical Elegance & Vision",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Johan Cruyff",
        role: "The Architect",
        expertise: "Total Football Philosophy",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Diego Maradona",
        role: "The Icon",
        expertise: "Unyielding Passion & Skill",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Pelé",
        role: "The King",
        expertise: "The Standard of Brilliance",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=400&h=400"
    }
];

const Team = () => {
    return (
        <section className="py-16 bg-white border-t-4 border-black" id="team">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
                    <div className="space-y-4">
                        <div className="inline-block bg-[#FF3D81] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-sm font-black uppercase text-white tracking-widest">Immortal Icons</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Meet the <br /> <span className="text-[#3D5CFF]">Legends.</span></h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl font-bold leading-tight">
                            The players who changed the game forever. Their stories, their tactics, and their impact on football culture.
                        </p>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <div key={i} className="group">
                            <div className="brutal-card bg-white p-4 hover:translate-x-1 hover:translate-y-1 transition-all">
                                <div className="relative aspect-square border-4 border-black overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <Image src={member.image} alt={member.name} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{member.name}</h3>
                                    <p className="text-sm font-black text-[#3D5CFF] uppercase tracking-widest">{member.role}</p>
                                    <p className="text-xs font-bold text-black/60 uppercase">{member.expertise}</p>
                                </div>

                                <div className="mt-6 pt-4 border-t-4 border-black flex gap-3">
                                    <a href="#" className="w-10 h-10 border-4 border-black flex items-center justify-center hover:bg-[#FFE600] transition-colors">
                                        <Linkedin size={20} strokeWidth={3} />
                                    </a>
                                    <a href="#" className="w-10 h-10 border-4 border-black flex items-center justify-center hover:bg-[#FF3D81] transition-colors">
                                        <Twitter size={20} strokeWidth={3} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Slider */}
                <MobileSlider>
                    {team.map((member, i) => (
                        <div key={i} className="brutal-card bg-white p-4 h-[450px] flex flex-col">
                            <div className="relative aspect-square border-4 border-black overflow-hidden mb-6 grayscale">
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                            </div>
                            <div className="space-y-1 flex-grow">
                                <h3 className="text-2xl font-black uppercase tracking-tight">{member.name}</h3>
                                <p className="text-sm font-black text-[#3D5CFF] uppercase tracking-widest">{member.role}</p>
                                <p className="text-xs font-bold text-black/60 uppercase">{member.expertise}</p>
                            </div>
                        </div>
                    ))}
                </MobileSlider>
            </div>
        </section>
    );
};

export default Team;
