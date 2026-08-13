import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIChat } from "@/components/sections/AIChat";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { PandaPetCompanion } from "@/components/three/PandaPetCompanion";
import { ThreeExperience } from "@/components/three/ThreeExperience";

export default function HomePage() {
  return (
    <>
      <ThreeExperience />
      <Navbar />
      <main id="main-content">
        <PandaPetCompanion />
        <Hero />
        <Education />
        <AIChat />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
