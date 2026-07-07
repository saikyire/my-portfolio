import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ArrowUpRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi there! I am Gopi's AI Representative. You can ask me anything about his technical projects, full-stack competencies, virtual internships, or schedule an interview. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const samplePrompts = [
    "What is Gopi's core tech stack?",
    "Tell me about the AI Task Manager",
    "Does Gopi have AWS cloud knowledge?",
    "How can I contact Gopi to hire him?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle unread counts on first load/toggle
  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Map history format safely
      const history = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history })
      });

      if (!res.ok) {
        throw new Error("Failed to post message");
      }

      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: "ai",
        text: data.text,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: "ai",
        text: "I apologize, but I am experiencing some latency connecting with the core model. You can reach Mogilicharla Sai Gopi Nadh directly at saigopinadhmogilicharla35@gmail.com!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      
      {/* Pulse button trigger */}
      <div className="flex justify-end pointer-events-auto">
        <button
          onClick={handleOpenToggle}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-pink-500 shadow-2xl flex items-center justify-center text-white cursor-pointer transition-transform hover:scale-110 active:scale-95 group focus:outline-hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          
          {/* Animated glow ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple opacity-30 blur-sm group-hover:opacity-50 transition-opacity animate-pulse z-[-1]" />
          
          {/* Unread badge */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-bg-base flex items-center justify-center text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[550px] rounded-3xl glass-panel shadow-2xl overflow-hidden flex flex-col border border-white/10 pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-neutral-900/90 p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 flex items-center justify-center border border-white/10 relative">
                  <Bot className="w-5 h-5 text-accent-blue" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                    Co-Pilot AI <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-pulse" />
                  </h3>
                  <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">RECRUITER REPRESENTATIVE</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-950/40 text-left">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed border ${
                      m.sender === "user"
                        ? "bg-accent-blue text-white border-accent-blue"
                        : "bg-white/5 text-gray-300 border-white/5"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span className="block text-[9px] text-neutral-500 font-mono mt-1.5 text-right">
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-gray-400 border border-white/5 rounded-2xl p-4 text-xs flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-accent-blue" />
                    <span>AI Co-Pilot is writing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts list */}
            {messages.length === 1 && (
              <div className="px-5 pt-3 pb-1 border-t border-white/5 bg-neutral-950/20 text-left">
                <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider mb-2">Suggested prompts:</p>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSendMessage(p)}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] tracking-tight transition-colors cursor-pointer border border-white/5 flex items-center gap-1.5"
                    >
                      {p}
                      <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-4 border-t border-white/5 bg-neutral-900/60 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                placeholder="Ask Gopi's Co-Pilot anything..."
                className="flex-1 px-4.5 py-3 rounded-full bg-white/5 border border-white/5 text-white text-xs placeholder-neutral-500 focus:outline-hidden focus:border-accent-blue/40 font-sans"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isLoading}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-colors hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
