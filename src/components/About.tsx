import { motion } from "motion/react";
import { Cpu, Server, GraduationCap, Compass, HelpCircle, Laptop } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">01 // MY BACKGROUND</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Architecting the Bridge Between
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Hardware and Software Systems
            </span>
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Inspiring narrative */}
          <div className="lg:col-span-7 space-y-6 text-gray-300 font-sans text-sm md:text-base leading-relaxed text-left">
            <h3 className="font-display font-bold text-xl text-white tracking-tight">
              An ECE Graduate's Journey Into Enterprise Engineering
            </h3>
            
            <p>
              I began my journey in **Electronics & Communication Engineering (ECE)**. Studying hardware taught me to think in terms of signals, timing constraints, and system boundaries. But my true calling became clear when I realized I could use those same analytical, logical frameworks to build software systems that scale infinitely in the cloud.
            </p>
            
            <p>
              This transition was not just about changing syntax; it was about shifting from physical microcontrollers to **distributed microservices**. I fell in love with backend engineering—architecting secure routes, optimizing databases, and designing robust API systems. Whether parsing data at high speeds or crafting clean frontend components in React, my ECE background gives me a distinct advantage in writing highly efficient, optimized code.
            </p>
            
            <p>
              Today, I specialize in **Forward Deployment Engineering**, with a strong focus on the MERN Stack, Python backend architectures, and production AI integrations. I have built secure applications like robust payroll management systems with role-based authentication, designed and validated multilingual AI POCs utilizing Sarvam AI and Small Language Models (SLMs), and deployed scalable cloud workloads on AWS.
            </p>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
              <div className="text-left">
                <p className="font-display font-extrabold text-2xl text-accent-blue">2+</p>
                <p className="text-neutral-500 text-xxs font-mono uppercase tracking-wider mt-1">Virtual Internships (Google & AWS)</p>
              </div>
              <div className="text-left">
                <p className="font-display font-extrabold text-2xl text-accent-purple">MERN + Python</p>
                <p className="text-neutral-500 text-xxs font-mono uppercase tracking-wider mt-1">Core Tech Competencies</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars (Bento Cards) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            
            {/* Card 1: Hardware-backed Software */}
            <motion.div
              whileHover={{ y: -3 }}
              className="glass-panel p-6 rounded-2xl flex gap-4 text-left glass-panel-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0 border border-accent-blue/20">
                <Cpu className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm tracking-tight mb-1">ECE System Mindset</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Deep training in computer network structures, signal processing, and memory limits. I write code that is optimized, efficient, and resource-aware.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Enterprise Scaling */}
            <motion.div
              whileHover={{ y: -3 }}
              className="glass-panel p-6 rounded-2xl flex gap-4 text-left glass-panel-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center shrink-0 border border-accent-purple/20">
                <Server className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm tracking-tight mb-1">Scalable API Architecture</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Passionate about MVC structures, REST APIs, secure JWT sessions, and relational/NoSQL database modeling.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Google & AWS Trained */}
            <motion.div
              whileHover={{ y: -3 }}
              className="glass-panel p-6 rounded-2xl flex gap-4 text-left glass-panel-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <GraduationCap className="w-5 h-5 text-highlight-cyan" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm tracking-tight mb-1">Cloud & AI Native</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Completed virtual AI/ML training at Google and Cloud architecture at AWS. Enthusiastic about integrating LLMs and cloud deployments.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Metrics Bar from Design Theme */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 shadow-[0_0_30px_rgba(37,99,235,0.05)]"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">12+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-2">Projects Shipped</div>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">100%</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-2">Uptime Target</div>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">0.2s</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-2">Page Load Avg</div>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-accent-blue tracking-tighter italic font-serif leading-none">∞</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-2">Growth Mindset</div>
          </div>
        </motion.div>

        {/* Current Focus section */}
        <div className="mt-20 pt-16 border-t border-white/5 text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-2">02 // ACTIVE ENDEAVORS</p>
              <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tighter">
                Current Focus
              </h3>
              <p className="text-gray-400 font-sans text-xs md:text-sm mt-1 max-w-xl">
                Daily scaling, building, and deploying. Here is what is on my active radar and system deployment stack.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              { text: "Forward Deployment Engineering", color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-300" },
              { text: "Production Deployments", color: "from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-300" },
              { text: "AI Integrations", color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-300" },
              { text: "Sarvam AI", color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-300" },
              { text: "Small Language Models (SLMs)", color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-300" },
              { text: "MERN Stack", color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-300" },
              { text: "Python Backend", color: "from-yellow-500/10 to-amber-500/10 border-yellow-500/20 text-yellow-300" },
              { text: "AWS Cloud", color: "from-sky-500/10 to-blue-500/10 border-sky-500/20 text-sky-300" },
              { text: "Secure Authentication", color: "from-rose-500/10 to-red-500/10 border-rose-500/20 text-rose-300" },
              { text: "Payroll Systems", color: "from-lime-500/10 to-emerald-500/10 border-lime-500/20 text-lime-300" },
              { text: "Automation", color: "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20 text-fuchsia-300" },
            ].map((focus, index) => (
              <motion.div
                key={focus.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-2xl bg-gradient-to-r border text-xs md:text-sm font-medium tracking-tight shadow-md flex items-center gap-2 cursor-default ${focus.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                {focus.text}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
