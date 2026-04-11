"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import TrustStrip from "./components/TrustStrip";
import Projects from "./components/Projects";
import Process from "./components/Process";
import BannerCTA from "./components/BannerCTA";

import Testimonial from "./components/Testimonial";
import Industries from "./components/Industries";
import Solutions from "./components/Solutions";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ProgressScroll from "./components/ProgressScroll";
import QuickJump from "./components/QuickJump";
import VisualBreak from "./components/VisualBreak";

export default function Home() {
    return (
        <main className="min-h-screen">
            <ProgressScroll />
            <QuickJump />
            <Navbar />
            <Hero />
            <StickyCTA />
            <LogoStrip />
            <TrustStrip />

            <Projects />

            <VisualBreak
                text="Football is the universal language that unites billions."
                subtext="The Beautiful Game lives here."
            />

            <BannerCTA
                title="Think you know football? Test your knowledge!"
                buttonText="Take the Quiz"
            />

            <Process />


            <Testimonial />

            <VisualBreak
                text="Champions are made when nobody is watching."
                subtext="Where legends are forged."
                bgColor="bg-[#3D5CFF]"
            />

            <Industries />
            <BannerCTA
                title="Never miss a matchday moment again."
                buttonText="Get Live Alerts"
                bgColor="bg-[#3D5CFF]"
                textColor="text-[#F7E402]"
            />
            <Solutions />



            <Contact />



            <section className="py-24 bg-black text-white text-center border-t-4 border-black">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 italic">Ready for matchday?</h2>
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="brutal-btn bg-[#FFE600] text-black hover:bg-white text-2xl py-8 px-16"
                >
                    Join The Pitch
                </button>
            </section>

            <Footer />
        </main>
    );
}
