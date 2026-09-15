import React, { useState } from "react";
import {
  Sparkles,
  Radio,
  BookOpen,
  Wrench,
  Users,
  Compass,
  Smile,
  FlaskConical,
  ArrowRight,
  Globe,
  Upload,
  Link,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Film
} from "lucide-react";

interface CreateViewProps {
  initialTopic?: string;
  initialContentType?: string;
  onCreateEverything: (params: {
    content_type: string;
    topic: string;
    angle?: string;
    format_type: string;
    style: string;
    duration_sec: number;
    free_first: boolean;
  }) => void;
  isCreating: boolean;
  onNavigateToRadar: () => void;
}

export const CreateView: React.FC<CreateViewProps> = ({
  initialTopic = "",
  initialContentType = "AI Tools",
  onCreateEverything,
  isCreating,
  onNavigateToRadar
}) => {
  const [contentType, setContentType] = useState<string>(initialContentType);
  const [topic, setTopic] = useState<string>(initialTopic || "Autonomous Local Coding Agents with DeepSeek");
  const [angle, setAngle] = useState<string>("");
  const [formatType, setFormatType] = useState<string>("Reel");
  const [style, setStyle] = useState<string>("Fast");
  const [durationSec, setDurationSec] = useState<number>(30);
  const [freeFirst, setFreeFirst] = useState<boolean>(true);
  const [entryMode, setEntryMode] = useState<"idea" | "url" | "upload">("idea");
  const [urlInput, setUrlInput] = useState<string>("");

  const SEVEN_ENGINES = [
    {
      id: "AI News",
      name: "AI NEWS",
      tagline: "What happened, what changed, and why it matters.",
      icon: <Radio className="w-5 h-5 text-sky-400" />,
      color: "border-sky-500/40 text-sky-300"
    },
    {
      id: "AI Explained",
      name: "AI EXPLAINED",
      tagline: "Transformers, RAG, and complex concepts made simple.",
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/40 text-amber-300"
    },
    {
      id: "AI Tools",
      name: "AI TOOLS",
      tagline: "Useful workflows, free tiers, and verified pricing.",
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/40 text-emerald-300"
    },
    {
      id: "AI for Normal People",
      name: "FOR NORMAL PEOPLE",
      tagline: "Everyday AI solutions for job seekers, students, and office workers.",
      icon: <Users className="w-5 h-5 text-pink-400" />,
      color: "border-pink-500/40 text-pink-300"
    },
    {
      id: "Future / AGI / ASI",
      name: "FUTURE / AGI / ASI",
      tagline: "Road to AGI, autonomous swarms, and plausible scenarios.",
      icon: <Compass className="w-5 h-5 text-violet-400" />,
      color: "border-violet-500/40 text-violet-300"
    },
    {
      id: "AI Memes / Relatable",
      name: "AI MEMES",
      tagline: "Developer POV, relatable chaos, and viral acquisition.",
      icon: <Smile className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-500/40 text-yellow-300"
    },
    {
      id: "AI Experiments",
      name: "AI EXPERIMENTS",
      tagline: "Empirical head-to-head testing, benchmarks, and verdicts.",
      icon: <FlaskConical className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/40 text-rose-300"
    }
  ];

  const FORMATS = ["Reel", "Carousel", "Story", "Meme", "YouTube Short", "X Post", "LinkedIn"];
  const STYLES = ["Fast", "Cinematic", "Educational", "Funny", "Experimental"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onCreateEverything({
      content_type: contentType,
      topic: topic.trim(),
      angle: angle.trim(),
      format_type: formatType,
      style,
      duration_sec: durationSec,
      free_first: freeFirst
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn pb-24">
      {/* Header (§60) */}
      <div className="space-y-2 border-b border-slate-800/80 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          CREATE CONTENT
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          What do you want to make? Select an engine, enter a topic, and compile complete production prompts.
        </p>
      </div>

      {/* 1. SEVEN CONTENT ENGINES (7 Large Cards §4) */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          1. CHOOSE CONTENT ENGINE
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEVEN_ENGINES.map((eng) => {
            const isSelected = contentType === eng.id;
            return (
              <button
                key={eng.id}
                type="button"
                onClick={() => setContentType(eng.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-2 ${
                  isSelected
                    ? "bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
                    {eng.icon}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tracking-wide">
                    {eng.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                    {eng.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. INPUT VECTORS (§4) */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            2. ENTER TOPIC OR SOURCE
          </label>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => setEntryMode("idea")}
              className={`px-2.5 py-1 rounded-lg transition ${
                entryMode === "idea" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              My Idea
            </button>
            <button
              type="button"
              onClick={onNavigateToRadar}
              className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-amber-300 transition"
            >
              From Radar
            </button>
            <button
              type="button"
              onClick={() => setEntryMode("url")}
              className={`px-2.5 py-1 rounded-lg transition ${
                entryMode === "url" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Paste URL
            </button>
          </div>
        </div>

        {entryMode === "url" ? (
          <div className="space-y-2">
            <div className="relative">
              <Link className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setTopic(`Analysis of: ${e.target.value}`);
                }}
                placeholder="https://github.com/repository or https://arxiv.org/abs/..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-500 transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              The engine will extract claims and ground all script scenes with primary citations.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. DeepSeek-R2 local reasoning benchmarks on consumer hardware"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-sans focus:outline-none focus:border-amber-500 transition shadow-inner font-semibold"
            />
            <input
              type="text"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="Custom angle (optional): e.g. Why developers can eliminate cloud API bills tonight"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-sans focus:outline-none focus:border-slate-700 transition"
            />
          </div>
        )}
      </div>

      {/* 3. FORMAT & STYLE SELECTION (§60) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
        {/* Format Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
            3. FORMAT
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormatType(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                  formatType === fmt
                    ? "bg-amber-500 text-black font-bold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
            4. TONE & STYLE
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStyle(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                  style === st
                    ? "bg-cyan-500 text-black font-bold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DURATION & FREE-FIRST TOGGLE (§31) */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Target Duration: {durationSec} Seconds</span>
          </div>
          <div className="flex items-center space-x-2 pt-1">
            {[15, 30, 45, 60].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setDurationSec(sec)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                  durationSec === sec ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40" : "text-slate-400 hover:text-white"
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setFreeFirst(!freeFirst)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition flex items-center space-x-1.5 ${
              freeFirst
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-slate-900 text-slate-400 border-slate-800"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{freeFirst ? "FREE-FIRST MODE ($0.00)" : "PREMIUM ROUTING"}</span>
          </button>
        </div>
      </div>

      {/* 5. PRIMARY 'CREATE EVERYTHING' ACTION BUTTON (§68) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isCreating || !topic.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm sm:text-base font-mono tracking-wide transition flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/25 cursor-pointer disabled:opacity-50"
        >
          {isCreating ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>COMPILING CONTENT & PRODUCTION PROMPTS...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-black" />
              <span>CREATE EVERYTHING</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
