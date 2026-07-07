import { Code2 } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-white/5 py-12 md:py-16 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        
        {/* Brand identity signature */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-accent-blue to-accent-purple flex items-center justify-center overflow-hidden">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-sm text-white">
            Mogilicharla Sai Gopi Nadh
          </span>
        </div>

        {/* Technical metadata coordinates */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
            © {currentYear} // DESIGNED BY GOPINADH • SYSTEM STATUS: OPTIMAL
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-end text-neutral-600 font-mono text-[9px]">
            <span>// EST 2024</span>
            <span>// PORTFOLIO V2.0</span>
            <span>// CONNECT@GOPINADH.DEV</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
