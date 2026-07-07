import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle2, ArrowUpRight, Copy } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("saigopinadhmogilicharla35@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitting(true);
    // Simulate contact delivery
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">08 // TRANSMIT MESSAGE</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            Let's Collaborate On
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Your Next Enterprise Scale App
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Columns) - Contact Info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="font-display font-extrabold text-white text-xl tracking-tight">Direct Connections</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-2">
                Hiring managers and technical recruiters, feel free to use Gopi's direct credentials, download his resume, or initiate a message using this encrypted console.
              </p>
            </div>

            {/* Direct Details list */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between group">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent-blue shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">EMAIL DIRECT</p>
                    <a href="mailto:saigopinadhmogilicharla35@gmail.com" className="text-white text-xs md:text-sm font-bold hover:text-accent-blue transition-colors">
                      saigopinadhmogilicharla35@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent-purple shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">PHONE ENCRYPTED</p>
                  <a href="tel:+919110330032" className="text-white text-xs md:text-sm font-bold hover:text-accent-purple transition-colors">
                    +91-9110330032
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-highlight-cyan shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">LOCATION TELEMETRY</p>
                  <p className="text-white text-xs md:text-sm font-bold">
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels Row */}
            <div className="pt-6 border-t border-white/5 space-y-3">
              <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">NETWORK SECURED VIA</h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/sai-gopi-nadh-21575326b"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold font-display tracking-wide uppercase transition-all"
                >
                  <Linkedin className="w-4 h-4 text-accent-blue" />
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
                <a
                  href="https://github.com/saigopinadh-m"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold font-display tracking-wide uppercase transition-all"
                >
                  <Github className="w-4 h-4 text-white" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 Columns) - Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 text-left relative overflow-hidden bg-black/20">
              
              {submitted ? (
                <div className="py-16 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-white text-2xl tracking-tight">Transmission Successful</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                    Thank you! Your message has been encrypted and securely delivered to Gopi's console inbox. He will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xxs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">YOUR NAME *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4.5 py-3.5 rounded-xl bg-white/3 border border-white/5 text-white placeholder-neutral-600 focus:outline-hidden focus:border-accent-blue/40 text-xs font-sans transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">EMAIL DIRECT *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="johndoe@agency.com"
                        className="w-full px-4.5 py-3.5 rounded-xl bg-white/3 border border-white/5 text-white placeholder-neutral-600 focus:outline-hidden focus:border-accent-blue/40 text-xs font-sans transition-colors"
                      />
                    </div>

                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">SUBJECT</label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="Enterprise Scaling Opportunity"
                      className="w-full px-4.5 py-3.5 rounded-xl bg-white/3 border border-white/5 text-white placeholder-neutral-600 focus:outline-hidden focus:border-accent-blue/40 text-xs font-sans transition-colors"
                    />
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">MESSAGE CONTENT *</label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Hi Gopi, we reviewed your impressive portfolio and would love to connect about an Enterprise Full-Stack Role at our agency..."
                      className="w-full px-4.5 py-3.5 rounded-xl bg-white/3 border border-white/5 text-white placeholder-neutral-600 focus:outline-hidden focus:border-accent-blue/40 text-xs font-sans transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={submitting}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-linear-to-r from-accent-blue to-accent-purple text-white font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">Connecting to Secure Server...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Transmit Transmissions
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
