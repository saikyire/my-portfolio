import { motion } from "motion/react";
import { GraduationCap, Calendar, Briefcase, Award, Milestone } from "lucide-react";

export default function Experience() {
  const timelineItems = [
    {
      id: "full-stack-exp",
      type: "work",
      title: "Forward Deployment Engineer",
      organization: "Enterprise & AI Solutions",
      period: "2024 - Present",
      description: "Driving the development, deployment, and optimization of production-ready full-stack applications, secure backend APIs, and cutting-edge artificial intelligence integration pipelines.",
      bulletPoints: [
        "Build and deploy production-ready full-stack applications and scalable, secure backend REST APIs.",
        "Design, validate, and integrate enterprise AI models including Sarvam AI and Small Language Models (SLMs) for multilingual workflows.",
        "Develop secure, role-based payroll management solutions with automated compliance computations and audit logging.",
        "Debug production issues, improve application latency, collaborate with product teams, and script internal deployment automation."
      ],
      icon: Briefcase,
      color: "border-accent-blue text-accent-blue"
    },
    {
      id: "google-intern",
      type: "internship",
      title: "Google AIML Virtual Intern",
      organization: "AICTE / Google Developer Services",
      period: "April 2024 - June 2024",
      description: "Explored advanced machine learning algorithms, deep learning structures, and mathematical modeling techniques. Applied models to real-world datasets.",
      bulletPoints: [
        "Completed guided labs in Python and foundational ML matrices.",
        "Analyzed predictive models and submitted comprehensive technical reports.",
        "Learned dataset scaling, sanitization, and regression pipelines."
      ],
      icon: Award,
      color: "border-accent-purple text-accent-purple"
    },
    {
      id: "aws-intern",
      type: "internship",
      title: "Cloud Virtual Intern (AWS)",
      organization: "AICTE / Amazon Web Services",
      period: "January 2024 - March 2024",
      description: "Mastered cloud architectural paradigms including virtualization, distributed compute, identity access management, and storage configurations.",
      bulletPoints: [
        "Configured secure VPC configurations, IAM policies, and S3 structures.",
        "Deployed functional sample web architectures on EC2/VM servers.",
        "Acquired basic cloud metrics tracking, monitoring, and alerts management."
      ],
      icon: Award,
      color: "border-cyan-500 text-highlight-cyan"
    },
    {
      id: "education",
      type: "education",
      title: "B.Tech, Electronics & Communication Engineering",
      organization: "Vasireddy Venkatadri Institute of Technology (VVIT)",
      period: "2021 - 2025",
      description: "Acquired deep training in hardware-level architectures, timing loops, system networks, and signal processing. Maintained strong academics (GPA: 6.94/10).",
      bulletPoints: [
        "Completed rigorous coursework: Data Structures, OOP, DBMS, OS, and Computer Networks.",
        "Engineered bare-metal Obstacle Detection System with custom moving-average filtering."
      ],
      icon: GraduationCap,
      color: "border-neutral-500 text-neutral-400"
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-[#050505]">
      {/* Background Accent glow */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-3">04 // TIMELINE</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Milestones of Academic &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Professional Evolution
            </span>
          </h2>
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-4xl mx-auto text-left">
          
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-white/10 md:hidden" />

          {/* Timeline Items list */}
          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, idx) => {
              const IconComp = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Circle Icon Badge */}
                  <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center -translate-x-1/2 z-20 shadow-md">
                    <IconComp className="w-4 h-4 text-white" />
                  </div>

                  {/* Left spacing for Even items in desktop */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Content Container (opposite to spacing) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-16 pr-2">
                    <motion.div
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/15"
                    >
                      {/* Sub banner highlighting the stage type */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-xxs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          {item.period}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/5 text-gray-400 uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-display font-extrabold text-white text-lg tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-accent-blue font-mono text-xs mt-1">
                        {item.organization}
                      </p>

                      {/* Summary text */}
                      <p className="text-gray-400 text-xs md:text-sm mt-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bullet Specifications */}
                      <ul className="mt-5 space-y-2">
                        {item.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="flex gap-2.5 items-start text-xs text-neutral-300 leading-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0 mt-1.5" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Decorative corner visual */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-accent-blue/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
