import { useEffect, useState, useRef, ChangeEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Mail, Github, Linkedin, Briefcase, FileText } from "lucide-react";
import gopiPhoto from "../assets/images/gopi_portrait_plaid_shirt_1783439640561.jpg";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [typingText, setTypingText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Profile image upload state and handlers
  const [profileImage, setProfileImage] = useState("/api/profile-image");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Image must be smaller than 15MB.");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        // Optimistically set the image in UI
        setProfileImage(base64Data);

        const response = await fetch("/api/profile-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Data }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload image to server.");
        }

        // Successfully uploaded, refresh with a timestamp to avoid cache
        setProfileImage(`/api/profile-image?t=${Date.now()}`);
      } catch (err: any) {
        console.error(err);
        setUploadError(err.message || "Failed to save profile picture.");
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read the file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const roles = [
    "Forward Deployment Engineer",
    "Full Stack Software Engineer",
    "AI Solutions Engineer",
    "Backend Developer",
    "Cloud Enthusiast",
    "Problem Solver",
    "Production Systems Builder"
  ];

  // Mouse coordinate tracker for glowing light effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
    }

    // Handle switching states
    if (!isDeleting && charIndex === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before delete
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // ECE-vibe Interactive Particle Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? "rgba(0, 112, 243, 0.25)" : "rgba(139, 92, 246, 0.25)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => new Particle());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            if (!ctx) return;
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grids
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-bg-base">
      {/* Neural Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Mouse Gradient Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30 transition-all duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 112, 243, 0.07), rgba(139, 92, 246, 0.04), transparent 80%)`,
        }}
      />

      {/* Background radial gradient accent */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-purple/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xxs font-mono font-medium tracking-wider uppercase mb-6 self-start shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Opportunities
          </motion.div>

          {/* Intro & Name */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 font-mono text-sm tracking-wider mb-2"
          >
            SYSTEMS ARCHITECT & DEVELOPER
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white leading-none mb-4"
          >
            Mogilicharla
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-gray-500">
              Sai Gopi Nadh
            </span>
          </motion.h1>

          {/* Typing Role Cycling */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 h-8 mb-8"
          >
            <span className="text-gray-400 font-sans text-lg md:text-xl font-medium">I'm an</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-highlight-cyan to-accent-purple font-mono text-lg md:text-xl font-bold tracking-tight typing-cursor">
              {typingText}
            </span>
          </motion.div>

          {/* Brief hook */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-lg mb-10"
          >
            Bridging complex **Electronics & Communication Systems** with enterprise **Forward Deployment & Full-Stack Software Engineering**. Specialized in production-ready MERN architectures, secure payroll systems, and scalable AI solutions on AWS Cloud.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => onNavClick("projects")}
              className="px-6 py-3.5 rounded-full bg-linear-to-r from-accent-blue to-accent-purple text-white font-display font-semibold text-xs tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-accent-blue/15"
            >
              View Projects
            </button>
            
            <a
              href="mailto:saigopinadhmogilicharla35@gmail.com"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center gap-5 mt-12 text-gray-500"
          >
            <a
              href="https://github.com/saigopinadh-m"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-blue transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/sai-gopi-nadh-21575326b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-blue transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-xxs font-mono tracking-widest text-neutral-600">
              SECURE.SECURE.LIVE
            </span>
          </motion.div>
        </div>

        {/* Right Portrait/Interactive Terminal Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm aspect-square group">
            
            {/* Spinning Neon Aura Rings */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent-blue via-transparent to-accent-purple opacity-20 blur-xl group-hover:opacity-40 transition-opacity animate-spin" style={{ animationDuration: "12s" }} />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-blue via-transparent to-accent-purple opacity-40 animate-spin" style={{ animationDuration: "8s" }} />
            
            {/* Glass Container */}
            <div className="absolute inset-0 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-2xl overflow-hidden flex items-center justify-center p-6 shadow-2xl">
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                
                {/* Highlighted Visual Avatar Frame */}
                <div 
                  onClick={handleImageClick}
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-white/10 p-1 bg-gradient-to-tr from-accent-blue/30 via-transparent to-accent-purple/30 shadow-[0_0_25px_rgba(0,112,243,0.15)] relative overflow-hidden group-hover:scale-[1.03] group-hover:border-white/20 transition-all duration-500 cursor-pointer"
                  title="Click to upload your custom profile picture!"
                >
                  {/* Internal background glow */}
                  <div className="absolute inset-0 bg-radial-gradient(from-center, rgba(0, 112, 243, 0.15) 0%, transparent 85%)" />
                  
                  {/* Hidden file upload input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />

                  {/* Clean, Prominent Portrait Photo */}
                  <div className="w-full h-full rounded-full overflow-hidden relative border border-white/5 bg-neutral-950">
                    <img 
                      src={profileImage} 
                      alt="Sai Gopi Nadh" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (profileImage !== gopiPhoto) {
                          setProfileImage(gopiPhoto);
                        }
                      }}
                    />
                    
                    {/* Professional Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-30">
                      <span className="text-white text-[10px] font-mono tracking-widest font-bold uppercase">Upload Photo</span>
                      {isUploading && (
                        <span className="text-accent-blue text-[9px] font-mono mt-1 animate-pulse">Uploading...</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Clean, Highlighted Info Block */}
                <div className="mt-5 flex flex-col items-center">
                  <span className="text-white font-display font-bold text-lg md:text-xl tracking-wide">Sai Gopi Nadh</span>
                  <span className="text-accent-blue font-mono text-[11px] md:text-xs mt-1.5 font-bold tracking-widest uppercase">ECE Graduate @ VVIT</span>
                  
                  {uploadError && (
                    <span className="text-red-400 font-mono text-[10px] mt-2 text-center max-w-[180px] leading-tight block">{uploadError}</span>
                  )}
                </div>

              </div>
            </div>

            
          </div>
        </motion.div>

      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-neutral-500 font-mono text-xxs tracking-widest uppercase">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 cursor-pointer"
          onClick={() => onNavClick("about")}
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
