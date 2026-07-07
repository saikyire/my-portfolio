import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GitBranch, GitPullRequest, Star, Terminal, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

export default function GithubMock() {
  const [loading, setLoading] = useState(false);
  const [commits, setCommits] = useState([
    {
      id: "commit-1",
      repo: "ai-task-manager",
      message: "feat: integrate server-side gemini endpoint for recruiter chat",
      time: "2 hours ago",
      hash: "8a4f21e",
      branch: "main"
    },
    {
      id: "commit-2",
      repo: "obstacle-detection",
      message: "fix: reduce HC-SR04 sensor jitter using 10-point moving average",
      time: "Yesterday",
      hash: "3d5a19b",
      branch: "main"
    },
    {
      id: "commit-3",
      repo: "covid-19-scraper",
      message: "feat: implement exponential backoff retry policies in requests client",
      time: "3 days ago",
      hash: "7f9c2e4",
      branch: "dev"
    },
    {
      id: "commit-4",
      repo: "payroll-management-system",
      message: "refactor: modularize auth token routers and HTTPOnly secure cookies",
      time: "5 days ago",
      hash: "2b9d8a1",
      branch: "main"
    }
  ]);

  const pinnedRepos = [
    {
      name: "ai-powered-task-manager",
      desc: "Secure MERN workspace integrating LLMs for automated task breakdowns and descriptions. Equipped with JWT and MongoDB schemas.",
      stars: 18,
      forks: 4,
      lang: "TypeScript / Node.js",
      color: "bg-blue-400"
    },
    {
      name: "covid-data-aggregator",
      desc: "Resilient ETL pipelines scraping global agency tables, cleansing, staging, and exporting clean CSV summaries via CLI.",
      stars: 12,
      forks: 2,
      lang: "Python / Flask",
      color: "bg-yellow-400"
    },
    {
      name: "obstacle-detection-system",
      desc: "Microcontroller C timing system smoothing ultrasonic signals, streaming over UART with custom Python visualizer plotters.",
      stars: 9,
      forks: 1,
      lang: "Embedded C / Python",
      color: "bg-purple-400"
    }
  ];

  // Contribution matrix rows (7 days) and columns (53 weeks -> let's show 24 columns for layout simplicity)
  const columnsCount = 24;
  const rowsCount = 7;
  
  // Create randomized grid weights (0 to 4)
  const [gridWeights, setGridWeights] = useState<number[][]>([]);

  useEffect(() => {
    const weights: number[][] = [];
    for (let r = 0; r < rowsCount; r++) {
      const rowWeights = [];
      for (let c = 0; c < columnsCount; c++) {
        // Higher probability of moderate activity
        const rand = Math.random();
        let val = 0;
        if (rand > 0.85) val = 4;      // Bright Green
        else if (rand > 0.65) val = 3; // Medium Green
        else if (rand > 0.4) val = 2;  // Soft Green
        else if (rand > 0.2) val = 1;  // Dark Grey-Green
        rowWeights.push(val);
      }
      weights.push(rowWeights);
    }
    setGridWeights(weights);
  }, []);

  const triggerRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // Shuffle first commit message for dynamic effect
      setCommits(prev => [
        {
          id: `commit-${Date.now()}`,
          repo: "ai-task-manager",
          message: "perf: refactor server-side rendering pipelines & asset caching",
          time: "Just now",
          hash: Math.random().toString(16).substring(2, 9),
          branch: "main"
        },
        ...prev.slice(0, 3)
      ]);
      setLoading(false);
    }, 1000);
  };

  const getWeightColor = (weight: number) => {
    switch (weight) {
      case 0: return "bg-neutral-900";
      case 1: return "bg-emerald-950/40";
      case 2: return "bg-emerald-850/60";
      case 3: return "bg-emerald-600/80";
      case 4: return "bg-emerald-400";
      default: return "bg-neutral-900";
    }
  };

  const daysLabels = ["Mon", "", "Wed", "", "Fri", ""];

  return (
    <section id="github-dashboard" className="py-24 md:py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <p className="text-accent-blue font-mono text-xs tracking-widest uppercase mb-3">06 // OPEN SOURCE ENGINE</p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter">
            GitHub Workspace &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-gray-500">
              Contribution Telemetry
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 Columns) - Contribution & Pins */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Contribution Panel */}
            <div className="glass-panel p-6 rounded-3xl text-left border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg tracking-tight">Open Source Telemetry</h3>
                  <p className="text-neutral-500 text-xs font-mono mt-1">@saigopinadh-m on GitHub</p>
                </div>
                <button
                  onClick={triggerRefresh}
                  disabled={loading}
                  className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white hover:text-accent-blue transition-colors cursor-pointer"
                  title="Pull updates"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-accent-blue" : ""}`} />
                </button>
              </div>

              {/* Grid Box */}
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[550px] flex gap-2">
                  
                  {/* Days labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-neutral-600 pr-1 h-[90px] pt-1">
                    {daysLabels.map((lbl, i) => <span key={i} className="h-2">{lbl}</span>)}
                  </div>

                  {/* Matrix */}
                  <div className="flex flex-col gap-[3px] h-[90px]">
                    {gridWeights.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-[3px]">
                        {row.map((weight, cIdx) => (
                          <motion.div
                            key={cIdx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: (rIdx + cIdx) * 0.005 }}
                            whileHover={{ scale: 1.3, zIndex: 30 }}
                            className={`w-2.5 h-2.5 rounded-xs ${getWeightColor(weight)} transition-all cursor-crosshair`}
                            title={`${weight === 0 ? "No" : weight * 2 + Math.floor(Math.random() * 2)} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Legend Indicator */}
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/5 pt-4">
                <span className="uppercase">Historical consistency: 247 Commits this year</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-neutral-900" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-950" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-800" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Pinned Repositories Grid */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider text-left pl-1">PINNED WORKSPACES</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pinnedRepos.map((repo, rIdx) => (
                  <motion.div
                    key={repo.name}
                    whileHover={{ y: -3 }}
                    className="glass-panel p-5 rounded-2xl border border-white/5 text-left flex flex-col justify-between group hover:border-white/10"
                  >
                    <div>
                      {/* Repo Name */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-accent-blue transition-colors truncate">
                          {repo.name}
                        </span>
                        <GitBranch className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-xxs md:text-xs leading-relaxed mb-6">
                        {repo.desc}
                      </p>
                    </div>

                    {/* Stats bar */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${repo.color}`} />
                        <span>{repo.lang}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-neutral-600" /> {repo.stars}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 Columns) - Live Logs & Tech Mix */}
          <div className="lg:col-span-4 space-y-8 text-left">
            
            {/* Live Terminal Commit Feed */}
            <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full bg-black/40">
              {/* Header */}
              <div className="bg-neutral-900 px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="font-mono text-xxs text-neutral-400 font-bold uppercase tracking-wider">Terminal Logs</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Body */}
              <div className="p-5 font-mono text-xxs md:text-xs space-y-4 h-[310px] overflow-y-auto">
                <p className="text-accent-purple">$ git log --oneline -n 4</p>
                
                <div className="space-y-4.5">
                  {commits.map((commit) => (
                    <div key={commit.id} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-accent-blue font-bold">{commit.hash}</span>
                        <span className="text-neutral-600">{commit.time}</span>
                      </div>
                      <p className="text-neutral-300 leading-normal line-clamp-2">
                        {commit.message}
                      </p>
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[9px]">
                        <span>repo: {commit.repo}</span>
                        <span>•</span>
                        <span>branch: {commit.branch}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-neutral-600 text-center animate-pulse pt-2">● LISTENER ACTIVE</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
