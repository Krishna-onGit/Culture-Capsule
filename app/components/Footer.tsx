"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="py-24 bg-black text-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="text-5xl font-black uppercase tracking-tighter block leading-none">
                            Culture <br /> Capsule<span className="text-sm align-top leading-none">®</span>
                        </Link>
                        <p className="text-white/70 max-w-sm font-bold text-lg leading-tight uppercase">
                            Architects of distinct visual identities — Crafting unique brands that disrupt the digital noise.
                        </p>
                        <div className="pt-4">
                            <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#FF3D81] -rotate-2">
                                <span className="text-sm font-black uppercase text-black tracking-widest">Global Creative Studio</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black uppercase tracking-widest text-sm mb-10 text-[#FF3D81]">Navigate</h4>
                        <ul className="space-y-4">
                            {['Services', 'Work', 'About', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-xl font-black uppercase tracking-tight hover:text-[#FFE600] transition-colors leading-none">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black uppercase tracking-widest text-sm mb-10 text-[#3D5CFF]">Connect</h4>
                        <ul className="space-y-4">
                            {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble', 'Behance'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-xl font-black uppercase tracking-tight hover:text-[#FF3D81] transition-colors leading-none">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 bg-white text-black border-4 border-black p-8 shadow-[8px_8px_0px_0px_#FFE600] rotate-2">
                        <h4 className="font-black uppercase tracking-widest text-sm mb-8 border-b-4 border-black pb-4">Drop a Line</h4>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[#3D5CFF] text-xs font-black uppercase tracking-widest mb-2">Electronic Mail</p>
                                <p className="text-2xl font-black break-all">HELLO@CULTURE-CAPSULE.STUDIO</p>
                            </div>
                            <div>
                                <p className="text-[#FF3D81] text-xs font-black uppercase tracking-widest mb-2">Direct Signal</p>
                                <p className="text-2xl font-black">+91 999 999 9999</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/50 text-xs font-black uppercase tracking-[0.2em] text-center md:text-left">
                        © 2026 CULTURE CAPSULE® STUDIO — THE SYSTEM IS OPERATIONAL.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="#" className="text-white/50 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors underline decoration-2 underline-offset-4">Privacy Policy</Link>
                        <Link href="#" className="text-white/50 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors underline decoration-2 underline-offset-4">Terms of Chaos</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-[#FFE600] text-black border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-widest hover:translate-y-[-2px] transition-all"
                        >
                            Back To Top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

