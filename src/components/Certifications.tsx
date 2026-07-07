import { motion } from "motion/react";
import { Award, ShieldCheck, Database, Server, Cpu, ExternalLink } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "AWS Cloud Academy Graduate",
      issuer: "AWS / AICTE Virtual Training",
      date: "March 2024",
      desc: "Demonstrated skill in secure IAM structures, Amazon EC2 compute architectures, virtual private routing (VPC), and active cloud logs tracking.",
      icon: Server,
      color: "text-accent-blue bg-accent-blue/5 border-accent-blue/15"
    },
    {
      title: "Google AIML Virtual Graduate",
      issuer: "Google Developer / AICTE",
      date: "June 2024",
      desc: "Comprehensive lab completion evaluating predictive algorithms, neural math pipelines, dataset structuring, and performance metrics.",
      icon: Cpu,
      color: "text-accent-purple bg-accent-purple/5 border-accent-purple/15"
    },
    {
      title: "SQL & Relational Databases",
      issuer: "Foundational Academy",
      date: "2024",
      desc: "Evaluated relational query design including advanced indexing, complex joins, nested views, and schema constraints optimization.",
      icon: Database,
      color: "text-highlight-cyan bg-highlight-cyan/5 border-highlight-cyan/15"
    },
    {
      title: "Python for Data Science",
      issuer: "Data Science Academy",
      date: "2024",
      desc: "Proficient scripting arrays operations, dynamic scraping models, matrix parsing, and data plotting visualizers.",
      icon: Award,
      color: "text-emerald-400 bg-emerald-400/5 border-emerald-400/15"
    }
  ];

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-accent-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">07 // ACCREDITATIONS</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Acquired Industry Badges &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Technical Certifications
            </span>
          </h2>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            
            return (
              <motion.div
                key={cert.title}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel p-6 rounded-2xl text-left border border-white/5 flex flex-col justify-between glass-panel-hover group"
              >
                <div>
                  {/* Badge Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cert.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-sm">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-bold text-white text-base tracking-tight mb-2 group-hover:text-accent-blue transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-xxs mb-4 text-accent-purple">
                    ISSUED BY: {cert.issuer}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                {/* Footer validation label */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE.VERIFIED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
