import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Solutions from "./components/Solutions";
import About from "./components/About";
import Stats from "./components/Stats";
import Plans from "./components/Plans";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Solutions />
      <About />
      <Stats />
      <Plans />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
