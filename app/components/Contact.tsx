"use client";

import React from 'react';
import { Instagram, Twitter, Linkedin, Github, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-[#3D5CFF] text-white border-t-4 border-black overflow-hidden relative">
            {/* Overlay for noise texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8 text-left">
                        <div className="inline-block bg-[#FFE600] border-4 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-sm font-black uppercase text-black tracking-widest">Connect</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            Let&apos;s Build <br /> Something <br /> <span className="bg-white text-black px-2 inline-block mt-2 border-4 border-black shadow-[8px_8px_0px_0px_#FF3D81]">Loud.</span>
                        </h2>
                        <p className="text-2xl font-bold leading-tight max-w-md">
                            Have a project that needs some noise? Or just want to talk about the future of culture? We&apos;re all ears.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-8">
                            {[
                                { Icon: Instagram, name: 'IG' },
                                { Icon: Twitter, name: 'TW' },
                                { Icon: Linkedin, name: 'LI' },
                                { Icon: Github, name: 'GH' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-16 h-16 bg-white border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                >
                                    <social.Icon size={32} strokeWidth={3} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
                        <h3 className="text-3xl font-black uppercase text-black mb-8 border-b-4 border-black pb-4">Send a Brief</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase text-black">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="ALICE DOE"
                                        className="w-full bg-[#F5F5F5] border-4 border-black px-6 py-4 focus:bg-[#FFE600] outline-none text-black font-black uppercase placeholder:text-black/30 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase text-black">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="ALICE@STUDIO.COM"
                                        className="w-full bg-[#F5F5F5] border-4 border-black px-6 py-4 focus:bg-[#FFE600] outline-none text-black font-black uppercase placeholder:text-black/30 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase text-black">The Message</label>
                                <textarea
                                    placeholder="TELL US SOMETHING WILD..."
                                    rows={4}
                                    className="w-full bg-[#F5F5F5] border-4 border-black px-6 py-4 focus:bg-[#FFE600] outline-none text-black font-black uppercase placeholder:text-black/30 transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#FF3D81] text-white border-4 border-black py-6 text-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-4 group"
                            >
                                Send Message
                                <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" strokeWidth={3} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

