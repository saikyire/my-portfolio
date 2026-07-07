import { motion } from "motion/react";
import { Server, Code, Bot, Database, ShieldAlert, Cpu, Terminal, Cloud } from "lucide-react";

export default function Services() {
  const offerings = [
    {
      title: "Full Stack Development",
      desc: "Architecting responsive, high-performance web systems using React, Vite, and Tailwind CSS. Tailored for production-ready speeds and modular, maintainable architectures.",
      icon: Code,
      accent: "text-accent-blue bg-accent-blue/5 border-accent-blue/15"
    },
    {
      title: "Backend API Development",
      desc: "Building highly scalable Node.js, Express, and Python backend microservices. Designing high-density REST gateways and robust endpoints with clean validation.",
      icon: Server,
      accent: "text-accent-purple bg-accent-purple/5 border-accent-purple/15"
    },
    {
      title: "AI Integration & POCs",
      desc: "Embedding generative AI, complex LLM routing (Gemini, OpenAI), prompt engineering pipelines, Sarvam AI APIs, and local Small Language Models (SLMs).",
      icon: Bot,
      accent: "text-emerald-400 bg-emerald-400/5 border-emerald-400/15"
    },
    {
      title: "Payroll System Development",
      desc: "Engineering custom payroll computation software with automated salary calculations, tax bracket deductions, role-based access, and PDF payslip streams.",
      icon: Cpu,
      accent: "text-amber-400 bg-amber-400/5 border-amber-400/15"
    },
    {
      title: "Cloud & Production Deployment",
      desc: "Deploying high-reliability environments on AWS Cloud. Managing secure VPC structures, IAM roles, environment secrets, and server virtualization.",
      icon: Cloud,
      accent: "text-sky-400 bg-sky-400/5 border-sky-400/15"
    },
    {
      title: "Database Design & Architecture",
      desc: "Modeling performant relational SQL and NoSQL MongoDB structures. Designing custom composite indexes, staging patterns, and fast query execution routes.",
      icon: Database,
      accent: "text-highlight-cyan bg-highlight-cyan/5 border-highlight-cyan/15"
    },
    {
      title: "Authentication & Security",
      desc: "Securing systems with robust JWT token authentication, HTTPOnly cookie sessions, role-based access control guards, and sensitive field encryption.",
      icon: ShieldAlert,
      accent: "text-rose-400 bg-rose-400/5 border-rose-400/15"
    },
    {
      title: "Performance & Debugging",
      desc: "Analyzing production issues, diagnosing database query bottlenecks, implementing caching layers, and tuning full-stack app latencies to extreme speeds.",
      icon: Terminal,
      accent: "text-purple-400 bg-purple-400/5 border-purple-400/15"
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">05 // SERVICES OFFERED</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Architectural Solutions For
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Modern Engineering Challenges
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((service, index) => {
            const IconComponent = service.icon || Server;
            return (
              <motion.div
                key={service.title}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel p-6 rounded-2xl text-left border border-white/5 flex flex-col justify-between glass-panel-hover group"
              >
                <div>
                  {/* Icon Card */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-6 ${service.accent}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-bold text-white text-base tracking-tight mb-2 group-hover:text-accent-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Micro tech label */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  <span>PRODUCTION READY</span>
                  <span>99.9% Uptime</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Dummy Layers component just in case it was referenced as a type but not defined
const Layers = Server;
