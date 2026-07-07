import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Square, Activity, Volume2, Sliders, Music, Info, HelpCircle } from "lucide-react";

export default function SignalPlayground() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<OscillatorType>("sine");
  const [frequency, setFrequency] = useState(440); // Standard A440 pitch
  const [volume, setVolume] = useState(0.2); // Low safe default volume
  const [activeSignalName, setActiveSignalName] = useState("Pure Sine Tone");
  const [sweepMode, setSweepMode] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sweepTimerRef = useRef<number | null>(null);
  const oscilloscopeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ECE Signal Presets
  const signalPresets = [
    { name: "Grid Hum", freq: 60, type: "sine" as OscillatorType, desc: "Standard 60Hz utility power grid AC frequency." },
    { name: "Telephone DTMF", freq: 697, type: "sine" as OscillatorType, desc: "Dual-Tone Multi-Frequency signaling low band tone." },
    { name: "Chiptune Square", freq: 330, type: "square" as OscillatorType, desc: "Classic 8-bit retro arcade synth pulse." },
    { name: "RF Carrier Hum", freq: 980, type: "triangle" as OscillatorType, desc: "Clean communication channel low frequency wave." },
    { name: "Standard Concert A", freq: 440, type: "sine" as OscillatorType, desc: "A440 pitch baseline for musical tuning." },
    { name: "Sawtooth Lead", freq: 220, type: "sawtooth" as OscillatorType, desc: "Harmonically rich signal used in subtractive synthesizers." },
  ];

  // Initialize Web Audio API elements safely on first user gesture
  const initAudio = () => {
    if (!audioCtxRef.current) {
      // @ts-ignore - Support older safari browsers
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const startOscillator = () => {
    initAudio();
    if (!audioCtxRef.current) return;

    // Stop current osc if running
    stopOscillator();

    const ctx = audioCtxRef.current;
    
    // Create nodes
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Configure
    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    // Connect nodes: Osc -> Gain -> Destination
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Start
    osc.start();

    // Store references
    oscNodeRef.current = osc;
    gainNodeRef.current = gain;
    setIsPlaying(true);
  };

  const stopOscillator = () => {
    if (oscNodeRef.current) {
      try {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
      } catch (e) {
        // Already stopped
      }
      oscNodeRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  // Update oscillator properties on state change
  useEffect(() => {
    if (oscNodeRef.current && audioCtxRef.current) {
      oscNodeRef.current.type = waveform;
      oscNodeRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [waveform, frequency]);

  // Update volume gain on state change
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopOscillator();
      if (sweepTimerRef.current) cancelAnimationFrame(sweepTimerRef.current);
    };
  }, []);

  // Handle Preset Click
  const handlePresetSelect = (preset: typeof signalPresets[0]) => {
    setWaveform(preset.type);
    setFrequency(preset.freq);
    setActiveSignalName(preset.name);
    
    // If playing, adjust live. If not, start immediately
    if (!isPlaying) {
      setTimeout(() => {
        startOscillator();
      }, 50);
    }
  };

  // Automated frequency sweep loop
  useEffect(() => {
    if (sweepMode) {
      let currentFreq = frequency;
      let direction = 1;
      
      const sweep = () => {
        if (!sweepMode) return;
        
        currentFreq += direction * 3;
        if (currentFreq >= 900) direction = -1;
        if (currentFreq <= 100) direction = 1;
        
        setFrequency(Math.round(currentFreq));
        setActiveSignalName("Dynamic Signal Sweep");
        
        sweepTimerRef.current = requestAnimationFrame(sweep);
      };
      
      sweepTimerRef.current = requestAnimationFrame(sweep);
    } else {
      if (sweepTimerRef.current) {
        cancelAnimationFrame(sweepTimerRef.current);
        sweepTimerRef.current = null;
      }
    }
    
    return () => {
      if (sweepTimerRef.current) cancelAnimationFrame(sweepTimerRef.current);
    };
  }, [sweepMode]);

  // Beautiful Vector Oscilloscope drawing loop
  useEffect(() => {
    const canvas = oscilloscopeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const drawOscilloscope = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle retro green CRT grid lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1;
      
      // Vertical grids
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal grids
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw center reference axis
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Begin drawing live waveform
      ctx.strokeStyle = isPlaying ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.35)";
      ctx.shadowColor = "rgba(34, 211, 238, 0.5)";
      ctx.shadowBlur = isPlaying ? 6 : 1;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const sliceWidth = canvas.width / 300;
      let x = 0;

      // Adjust wave parameters dynamically based on actual state
      const amp = isPlaying ? (volume * 100) + 12 : 12; // wave amplitude
      // Convert frequency to visual cycles (higher frequency = tighter cycles)
      const visualFreqVal = (frequency / 250); 

      for (let i = 0; i <= 300; i++) {
        const rads = (i * visualFreqVal * Math.PI / 30) + offset;
        let y = canvas.height / 2;

        if (waveform === "sine") {
          y = (canvas.height / 2) + Math.sin(rads) * amp;
        } else if (waveform === "square") {
          y = (canvas.height / 2) + (Math.sin(rads) >= 0 ? 1 : -1) * amp;
        } else if (waveform === "triangle") {
          y = (canvas.height / 2) + (Math.abs((rads % (Math.PI * 2)) - Math.PI) / Math.PI - 0.5) * 2 * amp;
        } else if (waveform === "sawtooth") {
          y = (canvas.height / 2) + ((rads % (Math.PI * 2)) / Math.PI - 1) * amp;
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
      
      // Reset shadows
      ctx.shadowBlur = 0;

      // Animate movement slightly
      offset += isPlaying ? 0.08 : 0.015;
      
      animId = requestAnimationFrame(drawOscilloscope);
    };

    drawOscilloscope();

    return () => cancelAnimationFrame(animId);
  }, [waveform, frequency, volume, isPlaying]);

  return (
    <section id="ece-signal-playground" className="py-20 border-t border-white/5 relative overflow-hidden bg-bg-base text-left">
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xxs font-mono font-medium tracking-wider uppercase mb-3">
            <Activity className="w-3 h-3 text-accent-blue animate-pulse" /> Custom Signal Laboratory
          </div>
          <h3 className="font-display font-black text-2xl md:text-4xl text-white tracking-tighter">
            ECE Signal Generator & Synth
          </h3>
          <p className="text-gray-400 font-sans text-xs md:text-sm mt-1 max-w-2xl">
            As an **Electronics & Communication (ECE)** graduate, I love connecting hardware signals with clean software. Twist frequencies, choose waveforms, and play with this real Web Audio synthesizer below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Generator & Knobs) */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
                <div>
                  <span className="text-xxs font-mono text-cyan-400 uppercase tracking-widest block">Active Stream</span>
                  <span className="text-white font-display font-black text-xl tracking-tight">{activeSignalName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSweepMode(false);
                      if (isPlaying) stopOscillator();
                      else startOscillator();
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer ${
                      isPlaying 
                        ? "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]" 
                        : "bg-cyan-400 hover:bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" /> Stop Signal
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" /> Generate Signal
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSweepMode(!sweepMode);
                      if (!isPlaying) startOscillator();
                    }}
                    className={`px-4 py-2.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                      sweepMode 
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/40" 
                        : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {sweepMode ? "Sweeping Freq..." : "Sweep Sweep"}
                  </button>
                </div>
              </div>

              {/* Sliders Block */}
              <div className="space-y-6">
                {/* Waveform Selector */}
                <div>
                  <label className="text-xxs font-mono text-neutral-500 uppercase tracking-wider block mb-3">1. Select Waveform Geometry</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["sine", "square", "triangle", "sawtooth"] as OscillatorType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setWaveform(type);
                          setActiveSignalName(`Manual ${type.charAt(0).toUpperCase() + type.slice(1)} Wave`);
                        }}
                        className={`py-2 px-3 rounded-xl font-mono text-xxs border transition-all uppercase cursor-pointer ${
                          waveform === type
                            ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-300 font-bold"
                            : "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xxs">
                    <span className="text-neutral-500 uppercase tracking-wider">2. Tune Oscillator Frequency</span>
                    <span className="text-cyan-400 font-bold">{frequency} Hz</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-neutral-600">100Hz</span>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      value={frequency}
                      onChange={(e) => {
                        setFrequency(Number(e.target.value));
                        setActiveSignalName("Manual Frequency Sweep");
                      }}
                      className="w-full accent-cyan-400 bg-neutral-900 rounded-lg cursor-pointer h-1.5"
                    />
                    <span className="text-[10px] font-mono text-neutral-600">1KHz</span>
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xxs">
                    <span className="text-neutral-500 uppercase tracking-wider">3. Set Amplitude (Gain)</span>
                    <span className="text-cyan-400 font-bold">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Volume2 className="w-4 h-4 text-neutral-600" />
                    <input
                      type="range"
                      min="0.0"
                      max="0.4"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-neutral-900 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="mt-8 pt-5 border-t border-white/5 flex gap-3 items-start bg-cyan-400/5 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 rounded-b-3xl">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-neutral-400 text-xxs leading-relaxed">
                <strong className="text-white">Live Audio Node Hookup:</strong> Adjusting controls will alter Web Audio API node coefficients in real-time. Turn up amplitude to hear the chimes.
              </p>
            </div>
          </div>

          {/* Right Column (Oscilloscope CRT Display & Presets) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Retro CRT Oscilloscope Screen */}
            <div className="glass-panel p-5 rounded-3xl border border-cyan-400/20 bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden flex-1 group">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-cyan-400 animate-pulse" : "bg-neutral-700"}`} />
                <span className="font-mono text-[9px] tracking-widest text-cyan-400 uppercase font-bold">CRT_OSCILLOSCOPE // TRACE_A</span>
              </div>
              <div className="absolute top-3 right-3 font-mono text-[9px] text-neutral-600 z-20">
                SWEEP: AUTO
              </div>

              {/* Retro Canvas */}
              <canvas
                ref={oscilloscopeCanvasRef}
                width="400"
                height="200"
                className="w-full max-h-[220px] rounded-2xl relative z-10"
              />

              {/* Glowing CRT Corner effect */}
              <div className="absolute inset-0 bg-radial-gradient(from-center, transparent 50%, rgba(0, 112, 243, 0.1) 100%) pointer-events-none" />
            </div>

            {/* Frequency Presets */}
            <div className="glass-panel p-6 rounded-3xl border border-white/5 text-left">
              <span className="text-xxs font-mono text-neutral-500 uppercase tracking-wider block mb-4">Signal Presets & ECE Benchmarks</span>
              <div className="grid grid-cols-2 gap-2.5">
                {signalPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className="p-3 rounded-2xl bg-neutral-900 border border-white/5 hover:border-cyan-400/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-display font-bold text-xxs text-white group-hover:text-cyan-300 transition-colors">{preset.name}</span>
                      <Music className="w-3 h-3 text-neutral-600 shrink-0" />
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400 font-bold block">{preset.freq} Hz</span>
                    <span className="text-[9px] text-neutral-500 leading-tight block mt-1 line-clamp-2">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
