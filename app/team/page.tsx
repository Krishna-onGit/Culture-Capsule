import Navbar from "../components/Navbar";
import Team from "../components/Team";
import FounderNote from "../components/FounderNote";
import Transparency from "../components/Transparency";
import ConsultationCTA from "../components/ConsultationCTA";
import Footer from "../components/Footer";

export default function TeamPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-24">
                <Team />
                <FounderNote />
                <Transparency />
                <ConsultationCTA />
            </div>
            <Footer />
        </main>
    );
}

