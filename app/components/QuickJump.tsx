"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { name: "Wins", id: "work" },
    { name: "How", id: "process" },
    { name: "Who", id: "team" },
    { name: "Growth", id: "industries" },
    { name: "Expertise", id: "services" },
    { name: "Contact", id: "contact" }
];

const QuickJump = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        links.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-2"
                >
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                            className={`
                                border-2 border-black px-3 py-1 font-black uppercase text-[10px] tracking-widest transition-all text-left w-24
                                ${activeSection === link.id
                                    ? 'bg-[#FFE600] translate-x-1 translate-y-1 shadow-none border-[#FF3D81]'
                                    : 'bg-white shadow-[4px_4px_0px_0px_black] hover:bg-[#FFE600] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                                }
                            `}
                        >
                            {link.name}
                        </button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickJump;
