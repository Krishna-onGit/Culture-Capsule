"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const Footer = () => {
    return (
        <footer className="py-24 footer-gradient text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-8"
                    >
                        <Link href="/" className="text-4xl font-black tracking-tighter block">
                            Culture Capsule<span className="text-sm align-top leading-none">®</span>
                        </Link>
                        <p className="text-white/80 max-w-xs font-medium leading-relaxed">
                            We&apos;re architects of distinct visual identities — Crafting unique brands that stand out from the noise.
                        </p>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-10 text-white/40">Navigation</h4>
                        <ul className="space-y-5">
                            {['Services', 'Work', 'About', 'Plans', 'FAQ', 'Contact'].map((item, i) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ x: 5 }}
                                >
                                    <Link href={`#${item.toLowerCase()}`} className="text-white/80 hover:text-white transition-colors font-bold text-lg">
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-10 text-white/40">Connect</h4>
                        <ul className="space-y-5">
                            {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble', 'Behance'].map((item) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ x: 5 }}
                                >
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors font-bold text-lg">
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-10 text-white/40">Say Hello</h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">Email</p>
                                <p className="text-xl font-bold">hello@CultureCapsule.admin</p>
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">Phone</p>
                                <p className="text-xl font-bold">+91 9999999999</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-8">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]"
                    >
                        © 2024 CULTURE CAPSULE® STUDIO — ALL RIGHTS RESERVED.
                    </motion.p>
                    <div className="flex gap-12">
                        <Link href="#" className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">Privacy Policy</Link>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-white hover:text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors flex items-center gap-2"
                        >
                            Back to top ↑
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

