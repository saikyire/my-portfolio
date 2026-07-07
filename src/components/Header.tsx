import { motion } from "motion/react";
import { Terminal, Code2, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Timeline" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3.5 rounded-full pointer-events-auto shadow-2xl backdrop-blur-md">
        {/* Logo */}
        <div 
          onClick={() => onNavClick("hero")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-full bg-linear-to-tr from-accent-blue to-accent-purple flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0.5 rounded-full bg-bg-base flex items-center justify-center transition-all group-hover:bg-opacity-50">
              <Code2 className="w-4 h-4 text-accent-blue group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="font-display font-bold tracking-tight text-sm md:text-base">
            <span className="text-white group-hover:text-accent-blue transition-colors">saigopinadh</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`relative px-4 py-1.5 rounded-full font-display text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeSection === item.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onNavClick("contact")}
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-display font-semibold text-xs tracking-wide transition-all hover:bg-neutral-200 cursor-pointer"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => onNavClick("contact")}
            className="px-3.5 py-1.5 rounded-full bg-white text-black font-display font-bold text-xxs tracking-wider uppercase cursor-pointer"
          >
            Hire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-20 left-4 right-4 glass-panel p-6 rounded-3xl pointer-events-auto flex flex-col gap-4 shadow-2xl backdrop-blur-xl md:hidden border border-white/10"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-display text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-white/10 text-white border-l-2 border-accent-blue"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
