import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Cpu, Code, Brain, ChevronDown, ChevronUp, Layers, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { Project } from "../types";

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "payroll-system",
      title: "Payroll Management System",
      subtitle: "Secure Production-Grade Payroll System",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Role-Based Access Control (RBAC)"],
      problem: "Manual payroll calculations, lack of role-based security, and complex tax/allowance deductions make salary processing highly error-prone and insecure.",
      solution: "Engineered a secure, role-based payroll management system that automates employee database administration, tax deductions, allowances, and compliant salary payslip generation with auditable logs.",
      architecture: `
      ┌─────────────────────────────────────────────────────────────┐
      │                      React Admin / Employee Panel           │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ Secure RBAC JWT Request Header
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │                      Express.js REST Gateway                │
      └──────┬───────────────────────┬───────────────────────┬──────┘
             │                       │                       │
             ▼                       ▼                       ▼
      ┌──────────────┐       ┌──────────────┐       ┌─────────────────┐
      │ Role Guard   │       │ MongoDB DB   │       │ Payslip PDF     │
      │ Middleware   │       │ Ledger Store │       │ Gen Engine      │
      └──────────────┘       └──────────────┘       └─────────────────┘
      `,
      features: [
        "Automated salary computations, deductions, allowances, and custom tax brackets.",
        "Secure role-based access control (RBAC) for Admin, HR, and Employee entities.",
        "Role-guarded RESTful APIs with stringent request-body validation patterns.",
        "Dynamic employee roster database with salary and historic transfer records.",
        "Automated PDF payslip generation and real-time transaction ledger auditing."
      ],
      githubUrl: "https://github.com/saigopinadh-m/payroll-management-system",
      demoUrl: "#",
      caseStudy: "The main challenge lay in designing strict security barriers for sensitive salary fields. Resolved this by building backend RBAC middleware checking cryptographically signed token claims on every route request. Integrated server-side PDF generator pipelines utilizing HTML-to-stream utilities and stored computed payroll state under a transactional ledgers collection in MongoDB.",
      lessonsLearned: "Discovered the importance of robust input sanitation, audit log tracking for compliance, and handling floating-point precision correctly in financial operations.",
      futureScope: "Implement automatic direct-deposit bank transfers using custom ACH integration and real-time notification alerts for payslip delivery."
    },
    {
      id: "task-manager",
      title: "AI-Powered Task Manager",
      subtitle: "Enterprise MERN Stack Platform",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Gemini/OpenAI API"],
      problem: "Traditional task managers are passive logs that require manual categorization, tedious descriptions, and offer zero smart automation or security barriers.",
      solution: "Developed a full-stack, secure task workspace that leverages the Gemini API to automatically generate rich description templates, outline subtasks, and provide personalized productivity suggestions based on historical tasks.",
      architecture: `
      ┌─────────────────────────────────────────────────────────────┐
      │                        React Frontend                       │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ Secure JSON Payload (JWT Header)
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │                      Express.js REST API                    │
      └──────┬───────────────────────┬───────────────────────┬──────┘
             │                       │                       │
             ▼                       ▼                       ▼
      ┌──────────────┐       ┌──────────────┐       ┌─────────────────┐
      │  JWT Cookie  │       │  MongoDB DB  │       │ Gemini/OpenAI   │
      │  Protection  │       │  Data Store  │       │  API (Server)   │
      └──────────────┘       └──────────────┘       └─────────────────┘
      `,
      features: [
        "Cryptographically secure JWT cookie-based session management.",
        "Server-side AI orchestrator proxies requests to OpenAI/Gemini safely, securing client keys.",
        "Automatic, smart description generation for newly entered brief tasks.",
        "Dynamic prioritization using an advanced full-CRUD task controller.",
        "Aesthetic dark canvas designed with high-density workspace guidelines."
      ],
      githubUrl: "https://github.com/saigopinadh-m/ai-task-manager",
      demoUrl: "https://ais-pre-6oxukfwgeykachqtkpmjeq-384561750476.asia-southeast1.run.app",
      caseStudy: "The primary challenge was designing a fluid frontend state that syncs instantly with the backend while preventing double-triggers on slow connections. Implemented optimistic state updates in React, coupled with secure HTTPOnly JWT cookie verification that safeguards private user endpoints. Integrated server-side lazy model loaders that prevent API crashes on boot.",
      lessonsLearned: "Learned the critical value of securing API keys in server backends rather than exposing them on the frontend. Understood robust state propagation models in full-stack applications.",
      futureScope: "Incorporate drag-and-drop kanban columns using layout animations and build real-time multiplayer board synchronization using WebSockets."
    },
    {
      id: "covid-aggregator",
      title: "COVID-19 Data Aggregator",
      subtitle: "Resilient Python Web Scraping & ETL Pipeline",
      techStack: ["Python", "Flask", "Requests", "LXML", "SQL", "Argparse CLI"],
      problem: "Fragmented reporting, inconsistent HTML structures across global health agencies, and lack of resilient automated data ingestion systems.",
      solution: "Engineered a high-performance COVID-19 data ETL tracker utilizing custom LXML scrapers with dynamic CSS selectors. Loaded cleaned structures into relational SQL databases, serving visualizations and CSV/JSON summaries.",
      architecture: `
      ┌─────────────────────────────────────────────────────────────┐
      │                      WHO / CDC HTML Pages                   │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ HTTP Scraper + Retry/Backoff
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │            Ingestion Engine (Python / Requests + LXML)      │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ Deduplication (Composite Keys)
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │                 SQL Database (Staging -> Curated)           │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ REST Server (Flask)
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │                 Visual Dashboard & CSV Summaries            │
      └─────────────────────────────────────────────────────────────┘
      `,
      features: [
        "Robust web-scraper equipped with exponential backoff and request retry mechanics.",
        "Intelligent deduplication matching data against composite primary keys during import.",
        "Multistage data cleaning: staging raw structures to highly curated relational tables.",
        "Exposed modular command-line interface (CLI) to execute fetch, clean, and load stages.",
        "Robust suite of unit tests with mocked HTTP client responses."
      ],
      githubUrl: "https://github.com/saigopinadh-m/covid-data-aggregator",
      demoUrl: "#",
      caseStudy: "Websites change their layout constantly, making web scraping fragile. Solved this by decoupling selectors from parsing code into a separate config. Implemented deep schema validation at the staging gate. If a page structure broke, the parser raised precise warnings without polluting the primary SQL data tables.",
      lessonsLearned: "Discovered the absolute necessity of mock-testing HTTP clients to prevent slow, fragile test suites. Mastered database integrity principles including composite unique indices.",
      futureScope: "Implement scheduled cron scraping tasks via Airflow and add geographical maps representation using Google Maps API."
    },
    {
      id: "obstacle-detector",
      title: "Obstacle Detection System",
      subtitle: "Embedded Timing Systems & Real-time Plotting",
      techStack: ["Embedded C", "Microcontrollers", "Python (Matplotlib)", "UART Serial"],
      problem: "Noisy sensor inputs, microsecond timings, and high jitter in raw ultrasonic readings make real-time obstacle navigation unreliable.",
      solution: "Programmed a microcontroller with timer interrupts to capture microsecond ECHO signals. Applied a digital moving-average noise filter and streamed readings over UART to a custom Python plotter for immediate visualization.",
      architecture: `
      ┌──────────────────┐               ┌──────────────────┐
      │Ultrasonic Sensor │ ◄── TRIGGER ──┤ Microcontroller  │
      │  (HC-SR04/ECHO)  │ ─── ECHO ────►│   Timer Interrupt│
      └──────────────────┘               └────────┬─────────┘
                                                   │ Moving-Average Filter
                                                   ▼
      ┌──────────────────┐               ┌──────────────────┐
      │  Python Plotter  │ ◄─── UART ────┤   State Machine  │
      │ (Real-time Mat)  │               │ (Safe/Warn/Alert)│
      └──────────────────┘               └──────────────────┘
      `,
      features: [
        "Microsecond accurate timing interrupts on microcontrollers.",
        "Digital moving-average noise reduction filter implemented directly in hardware loop.",
        "Failsafe finite state machine (FSM) translating ranges to Safe, Warn, and Alert stages.",
        "Streamed coordinates over physical UART/serial interfaces safely.",
        "Visual real-time Python plotter mapping distance curves on a coordinate graph."
      ],
      githubUrl: "https://github.com/saigopinadh-m/obstacle-detection-system",
      demoUrl: "#",
      caseStudy: "Sensor jitter on reflective surfaces was causing false alarm triggers. Solved this by engineering a custom moving-average circular buffer directly on the hardware. This smoothed out sensor spikes while maintaining low latency, crucial for collision prevention.",
      lessonsLearned: "Gained a deep understanding of hardware-software interaction, baud-rates, serial synchronization, and resource constraints on bare-metal systems.",
      futureScope: "Integrate a dual-sensor array with a kalman filter for multi-angle trajectory path modeling."
    }
  ];

  const toggleProject = (projectId: string) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(projectId);
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">03 // SELECTED PORTFOLIO</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Architecting Robust Software
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              With Production Standards
            </span>
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((proj) => {
            const isExpanded = selectedProjectId === proj.id;
            
            return (
              <motion.div
                key={proj.id}
                layout="position"
                className={`glass-panel rounded-3xl overflow-hidden border transition-colors ${
                  isExpanded ? "border-white/20 bg-white/5" : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Master summary banner */}
                <div 
                  onClick={() => toggleProject(proj.id)}
                  className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer select-none"
                >
                  <div className="text-left">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-accent-blue font-mono text-xxs uppercase tracking-wider">
                      {proj.subtitle}
                    </span>
                    <h3 className="font-display font-extrabold text-white text-2xl md:text-3xl tracking-tight mt-3">
                      {proj.title}
                    </h3>
                    
                    {/* Tech Stack Bubbles */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 text-gray-400 font-mono text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Controls */}
                  <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                    <button
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-white transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProject(proj.id);
                      }}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Case Study Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 md:px-10 md:pb-10 pt-2 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                        
                        {/* Core Details (8 Columns) */}
                        <div className="lg:col-span-7 space-y-6">
                          
                          {/* Problem/Solution */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/3 p-6 rounded-2xl border border-white/5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-rose-400 font-mono text-xxs uppercase tracking-wider">
                                <AlertTriangle className="w-4 h-4" /> The Problem
                              </div>
                              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                {proj.problem}
                              </p>
                            </div>
                            <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xxs uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4" /> The Solution
                              </div>
                              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                {proj.solution}
                              </p>
                            </div>
                          </div>

                          {/* Architecture Segment */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-accent-purple font-mono text-xxs uppercase tracking-wider">
                              <Layers className="w-4 h-4" /> Technical Architecture
                            </div>
                            <div className="font-mono text-[10px] md:text-xs text-gray-400 bg-black/50 p-4 rounded-xl border border-white/5 overflow-x-auto leading-normal whitespace-pre">
                              {proj.architecture}
                            </div>
                          </div>

                          {/* Lessons Learned */}
                          <div className="space-y-2">
                            <h4 className="font-display font-bold text-white text-sm tracking-tight flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-accent-blue" /> Case Study Insight
                            </h4>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                              {proj.caseStudy}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                            <div className="space-y-2">
                              <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">Key Takeaways</h5>
                              <p className="text-neutral-400 text-xs leading-relaxed">{proj.lessonsLearned}</p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-accent-purple" /> Future Scope
                              </h5>
                              <p className="text-neutral-400 text-xs leading-relaxed">{proj.futureScope}</p>
                            </div>
                          </div>

                        </div>

                        {/* Specs & Actions (5 Columns) */}
                        <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/5 lg:pl-8">
                          
                          {/* Key Features Bullet Matrix */}
                          <div className="space-y-4">
                            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">ENGINEERING SCOPE</h4>
                            <ul className="space-y-2.5">
                              {proj.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex gap-2.5 items-start text-xs text-gray-300">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA Links */}
                          <div className="flex flex-col gap-3.5 pt-6 border-t border-white/5">
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-semibold text-xs tracking-wide uppercase transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              Inspect Source Code
                            </a>
                            {proj.demoUrl !== "#" && (
                              <a
                                href={proj.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-display font-bold text-xs tracking-wide uppercase transition-colors hover:bg-neutral-200"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Launch Application
                              </a>
                            )}
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* AI Research & Proof of Concepts Section */}
        <div className="mt-24 pt-20 border-t border-white/5 text-left">
          <div className="mb-12">
            <p className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-3">04 // EMERGING TECH STUDY</p>
            <h3 className="font-display font-black text-2xl md:text-4xl text-white tracking-tighter">
              AI Research & Proof of Concepts
            </h3>
            <p className="text-gray-400 font-sans text-sm mt-2 max-w-2xl">
              Exploring cutting-edge advancements in generative AI, large and small language models, and multilingual pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Sarvam AI Integration */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 mb-6">
                  <Brain className="w-6 h-6 text-accent-blue animate-pulse" />
                </div>
                <h4 className="font-display font-extrabold text-white text-xl tracking-tight mb-3">
                  Sarvam AI Integration
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                  Built proof-of-concept applications evaluating and utilizing Sarvam AI APIs to implement multilingual enterprise solutions and prompt-driven automation.
                </p>
                <ul className="space-y-2.5 mb-8">
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    <span>Evaluated Indian-language translation, speech-to-text, and multilingual AI capabilities.</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    <span>Integrated robust LLM workflows directly into business orchestration use cases.</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    <span>Experimented with complex prompt engineering techniques to maximize automation accuracy.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xxs font-mono text-neutral-500 uppercase tracking-wider">POC Status: Completed</span>
                <span className="px-2 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20 text-[9px] font-mono text-accent-blue uppercase font-bold">Multilingual</span>
              </div>
            </motion.div>

            {/* Card 2: Small Language Models */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 mb-6">
                  <Cpu className="w-6 h-6 text-accent-purple" />
                </div>
                <h4 className="font-display font-extrabold text-white text-xl tracking-tight mb-3">
                  Small Language Models (SLMs)
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                  Designed and developed proof-of-concepts using lightweight language models to evaluate performance, latency, and deployment cost efficiencies.
                </p>
                <ul className="space-y-2.5 mb-8">
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                    <span>Evaluated latency, local inference performance, and edge deployment strategies.</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                    <span>Compared efficiency profiles of SLMs against larger foundational models for enterprise tasks.</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                    <span>Built functional AI-assisted workflow prototypes for low-resource internal applications.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xxs font-mono text-neutral-500 uppercase tracking-wider">POC Status: In Production</span>
                <span className="px-2 py-0.5 rounded bg-accent-purple/10 border border-accent-purple/20 text-[9px] font-mono text-accent-purple uppercase font-bold">Edge AI</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
