"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import TrustStrip from "./components/TrustStrip";
import Projects from "./components/Projects";
import Process from "./components/Process";
import BannerCTA from "./components/BannerCTA";
import Team from "./components/Team";
import FounderNote from "./components/FounderNote";
import Testimonial from "./components/Testimonial";
import Industries from "./components/Industries";
import Solutions from "./components/Solutions";
import Transparency from "./components/Transparency";
import ConsultationCTA from "./components/ConsultationCTA";
import Insights from "./components/Insights";
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
                text="The best way to predict your future is to create it."
                subtext="Let's build your growth engine."
            />

            <BannerCTA
                title="Ready to see these results for your brand?"
                buttonText="Get Your Free Audit"
            />

            <Process />
            <Team />
            <FounderNote />

            <Testimonial />

            <VisualBreak
                text="Data tells you what. Strategy tells you why."
                subtext="Science-backed growth systems."
                bgColor="bg-[#3D5CFF]"
            />

            <Industries />
            <Solutions />
            <Transparency />

            <ConsultationCTA />

            <BannerCTA
                title="Stop leaving revenue on the table."
                buttonText="Book Strategy Call"
                bgColor="bg-[#3D5CFF]"
            />

            <Insights />
            <Contact />

            <section className="py-24 bg-black text-white text-center border-t-4 border-black">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 italic">Ready to scale in 30 days?</h2>
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="brutal-btn bg-[#FFE600] text-black hover:bg-white text-2xl py-8 px-16"
                >
                    Start Your Growth Journey
                </button>
            </section>

            <Footer />
        </main>
    );
}
