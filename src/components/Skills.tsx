import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Server, Database, Cloud, GitBranch, ShieldCheck, Cpu, MessageSquare } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "database" | "cloud" | "devops" | "testing" | "architecture" | "soft";
  desc?: string;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "cloud", label: "Cloud", icon: Cloud },
    { id: "testing", label: "Testing & QA", icon: ShieldCheck },
    { id: "architecture", label: "Architecture", icon: Cpu },
  ];

  const skills: SkillItem[] = [
    // Frontend
    { name: "React.js", level: 5, category: "frontend", desc: "Hooks, Router, State Managers, Performance Tuning" },
    { name: "JavaScript (ES6+)", level: 5, category: "frontend", desc: "Asynchronous patterns, closures, prototypes" },
    { name: "HTML5 & CSS3", level: 5, category: "frontend", desc: "Semantic markup, modern layout models" },
    { name: "Tailwind CSS", level: 5, category: "frontend", desc: "Utility-first design, custom themes, v4" },
    
    // Backend
    { name: "Node.js", level: 5, category: "backend", desc: "Event-driven architecture, file systems, clustering" },
    { name: "Express.js", level: 5, category: "backend", desc: "RESTful routing, middleware pipelines, error handlers" },
    { name: "Python", level: 4, category: "backend", desc: "Data processing, script automation, Web Scraping" },
    { name: "REST APIs", level: 5, category: "backend", desc: "HTTP protocols, payload design, versioning" },
    { name: "JWT Auth", level: 5, category: "backend", desc: "Secure token issuance, encryption, cookie handling" },
    
    // Database
    { name: "MongoDB", level: 5, category: "database", desc: "NoSQL modeling, aggregations, indexing" },
    { name: "SQL", level: 4, category: "database", desc: "Relational constraints, joins, indices, query optimization" },
    
    // Cloud
    { name: "AWS Cloud", level: 4, category: "cloud", desc: "EC2 instances, S3 buckets, IAM, CloudWatch, VM setups" },
    { name: "Cloud Deployment", level: 4, category: "cloud", desc: "App hosting, environmental secret management" },
    
    // Version Control / DevOps
    { name: "Git", level: 5, category: "devops", desc: "Branching workflows, rebasing, merge resolution" },
    { name: "GitHub", level: 5, category: "devops", desc: "PR reviews, GitHub Actions, CI/CD integration" },
    
    // Testing
    { name: "Playwright", level: 4, category: "testing", desc: "E2E automated browser scripts, testing matrices" },
    { name: "API Testing", level: 5, category: "testing", desc: "Mocked endpoints, status checks, stress tests" },
    { name: "Debugging", level: 5, category: "testing", desc: "Logger instrumentation, call-stack inspection" },
    
    // Architecture & Domain
    { name: "MVC Pattern", level: 5, category: "architecture", desc: "Separation of concerns in backend services" },
    { name: "AI Models & SLMs", level: 5, category: "architecture", desc: "Prompt optimization, multilingual Sarvam AI integration, local models" },
    { name: "Payroll Architectures", level: 5, category: "architecture", desc: "Role-based payroll calculations, audits, and payslip generation" },
    { name: "CRUD Operations", level: 5, category: "architecture", desc: "Optimized, safe transactional database operations" },
    
    // Soft Skills
    { name: "Leadership", level: 5, category: "soft", desc: "Led web scraping project with a 3-member developer team" },
    { name: "Problem Solving", level: 5, category: "soft", desc: "Calibrated debugging and algorithm crafting" },
    { name: "Communication", level: 5, category: "soft", desc: "Delivered team breakdowns and stakeholder demo sessions" },
  ];

  const filteredSkills = activeTab === "all" 
    ? skills 
    : skills.filter(s => s.category === activeTab || (activeTab === "testing" && s.category === "testing") || (activeTab === "architecture" && s.category === "architecture"));

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-[#050505]">
      {/* Background Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <p className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-3">02 // SKILLS MATRIX</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Core Competencies &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Technical Stack
            </span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/5 pb-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon || Code;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full font-display text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                  activeTab === cat.id
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-gray-400 hover:text-white border-white/5 hover:border-white/10"
                }`}
              >
                {cat.id !== "all" && <IconComponent className="w-3.5 h-3.5" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden group hover:border-white/15 transition-all"
              >
                {/* Visual hover backdrop accent */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-tr from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div>
                  {/* Skill title */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-white text-base tracking-tight">{skill.name}</h3>
                    <span className="px-2 py-0.5 rounded-sm bg-white/5 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                  
                  {/* Skill desc */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {skill.desc || "Enterprise systems development and robust logic."}
                  </p>
                </div>

                {/* Rating Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                    <span>PROFICIENCY</span>
                    <span className="text-white font-bold">{skill.level}/5</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.level / 5) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        skill.category === "frontend" 
                          ? "from-accent-blue to-cyan-400" 
                          : skill.category === "backend" 
                          ? "from-accent-purple to-pink-400" 
                          : "from-cyan-400 to-accent-purple"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Soft Skills Highlight Box */}
        <div className="mt-12 glass-panel p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-tr from-accent-blue/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="space-y-2 md:border-r md:border-white/5 md:pr-8">
            <div className="inline-flex items-center gap-2 text-accent-blue font-mono text-xxs tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" /> Team Leadership
            </div>
            <h4 className="font-display font-bold text-white text-lg tracking-tight mt-1">Project Team Lead</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Led a 3-member web-scraping project. Managed tasks, broke down complexity, audited codebases, and presented deliverables successfully.
            </p>
          </div>

          <div className="space-y-2 md:border-r md:border-white/5 md:px-8">
            <div className="inline-flex items-center gap-2 text-accent-purple font-mono text-xxs tracking-wider uppercase">
              <Cpu className="w-4 h-4" /> Systems Engineering
            </div>
            <h4 className="font-display font-bold text-white text-lg tracking-tight mt-1">Embedded to Enterprise</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Equipped with deep ECE hardware knowledge, allowing me to build robust IoT pipelines, manage sensor timing matrices, and optimize data loads.
            </p>
          </div>

          <div className="space-y-2 md:pl-8">
            <div className="inline-flex items-center gap-2 text-highlight-cyan font-mono text-xxs tracking-wider uppercase">
              <MessageSquare className="w-4 h-4" /> Growth Mindset
            </div>
            <h4 className="font-display font-bold text-white text-lg tracking-tight mt-1">Continuous Learner</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Always expanding expertise, validated by Google AI ML labs and AWS Cloud architecture internships. Ready to adapt to any stack.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
