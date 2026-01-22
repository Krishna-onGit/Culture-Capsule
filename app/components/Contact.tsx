"use client";

import React, { useEffect, useRef } from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';


const Contact = () => {
    const sectionRef = useRef(null);
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background blobs movement
            gsap.to(blob1Ref.current, {
                y: -100,
                x: 50,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to(blob2Ref.current, {
                y: 100,
                x: -50,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="pt-20 pb-0 contact-gradient text-white overflow-hidden relative">
            {/* Mesh Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div ref={blob1Ref} className="absolute top-1/4 -right-24 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div ref={blob2Ref} className="absolute bottom-1/4 -left-24 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto mb-10 space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="text-7xl lg:text-9xl font-black italic tracking-tighter leading-none"
                    >
                        Let&apos;s talk
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-white/50 font-medium leading-relaxed"
                    >
                        Have a project in mind or just want to explore the possibilities together? We&apos;d love to hear from you.
                    </motion.p>
                </div>

                <div className="max-w-2xl mx-auto mb-10">
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {['Name', 'Email'].map((placeholder, i) => (
                            <motion.div
                                key={placeholder}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                <input
                                    type={placeholder === 'Email' ? 'email' : 'text'}
                                    placeholder={placeholder}
                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 transition-all font-medium placeholder:text-white/20"
                                />
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="sm:col-span-2"
                        >
                            <textarea
                                placeholder="Message"
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 transition-all font-medium resize-none placeholder:text-white/20"
                            ></textarea>
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="sm:col-span-2 py-6 btn-gradient text-white font-black uppercase tracking-widest text-sm rounded-full transition-all shadow-2xl"
                        >
                            Send message
                        </motion.button>
                    </form>
                </div>

                {/* Social Bridge */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 border-t border-white/5 pt-10 pb-10">
                    {[
                        { Icon: Instagram, name: 'Instagram' },
                        { Icon: Twitter, name: 'Twitter' },
                        { Icon: Linkedin, name: 'LinkedIn' },
                        { Icon: Github, name: 'GitHub' }
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white transition-all group hover:bg-white/10 shadow-lg"
                        >
                            <social.Icon size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">{social.name}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;

