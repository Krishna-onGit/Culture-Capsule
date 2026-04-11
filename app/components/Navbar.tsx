"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-4 border-black py-4 md:py-5`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex items-center justify-between">
        <Link href="/" className="text-3xl font-black uppercase tracking-tighter text-black">
          The Beautiful Game<span className="text-sm align-top font-bold">®</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/team"
            className="bg-[#EC3B80] border-4 border-black px-6 py-2.5 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Legends
          </Link>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#FFE600] border-4 border-black px-6 py-2.5 text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Join
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-black p-8 space-y-4 shadow-2xl overflow-hidden"
          >
            <Link
              href="/team"
              className="block w-full py-4 bg-[#EC3B80] border-4 border-black text-white text-center font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setIsOpen(false)}
            >
              Legends
            </Link>
            <button
              className="w-full py-4 bg-[#FFE600] border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Join
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
