import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Skills from "./components/Skills.tsx";
import SignalPlayground from "./components/SignalPlayground.tsx";
import Projects from "./components/Projects.tsx";
import Experience from "./components/Experience.tsx";
import Services from "./components/Services.tsx";
import GithubMock from "./components/GithubMock.tsx";
import Certifications from "./components/Certifications.tsx";
import AiAssistant from "./components/AiAssistant.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Multi-section scroll observer to dynamically highlight the active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "experience", "services", "contact"];
      const scrollPosition = window.scrollY + 180; // offset for triggers

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base text-[#e5e5e5] font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Structural Headers */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Primary Section Canvas */}
      <main className="relative">
        <Hero onNavClick={handleNavClick} />
        
        <About />
        
        <Skills />
        
        <SignalPlayground />
        
        <Projects />
        
        <Experience />
        
        <Services />
        
        <GithubMock />
        
        <Certifications />
        
        <Contact />
      </main>

      {/* Footer Content */}
      <Footer />

      {/* Floating AI Recruiter Chat Co-Pilot */}
      <AiAssistant />

    </div>
  );
}
