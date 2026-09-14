import React, { useState } from "react";
import { ContentAssetPackage } from "../../types";
import {
  Sparkles, Film, Layers, Compass, Zap, Play, CheckCircle2,
  RefreshCw, Sliders, ArrowRight
} from "lucide-react";

interface StudioViewProps {
  onGenerate: (params: {
    topic: string;
    pillar: string;
    series: string;
    angle?: string;
    goal: string;
    duration: number;
  }) => void;
  isGenerating: boolean;
}

export const StudioView: React.FC<StudioViewProps> = ({
  onGenerate,
  isGenerating
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>("AI Tools");
  const [topic, setTopic] = useState<string>("Autonomous Local Coding Agents with DeepSeek");
  const [angle, setAngle] = useState<string>("How developers can eliminate cloud API fees with local weights");
  const [goal, setGoal] = useState<string>("Reach & Follows");
  const [duration, setDuration] = useState<number>(30);
  const [selectedFormat, setSelectedFormat] = useState<string>("Reel");

  const pillars = [
    "AI News",
    "AI Explained",
    "AI Tools",
    "AI For Normal People",
    "AGI / ASI / Future",
    "AI Memes / Relatable",
    "AI Experiments"
  ];

  const seriesByPillar: Record<string, string[]> = {
    "AI News": ["AI NEWS TODAY", "BREAKING AI", "THIS JUST HAPPENED"],
    "AI Explained": ["AI IN 15 SECONDS", "AI EXPLAINED", "HOW AI ACTUALLY WORKS"],
    "AI Tools": ["AI TOOL YOU NEED", "3 AI TOOLS", "TOOL OF THE DAY"],
    "AI For Normal People": ["AI EXPLAINED TO NORMAL PEOPLE"],
    "AGI / ASI / Future": ["ROAD TO AGI", "AFTER AGI", "AI 2030"],
    "AI Memes / Relatable": ["AI POV", "AI MEMES"],
    "AI Experiments": ["AI VS AI", "I TESTED AI"]
  };

  const [selectedSeries, setSelectedSeries] = useState<string>(seriesByPillar[selectedPillar][0]);

  const handlePillarChange = (newPillar: string) => {
    setSelectedPillar(newPillar);
    setSelectedSeries(seriesByPillar[newPillar][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({
      topic,
      pillar: selectedPillar,
      series: selectedSeries,
      angle,
      goal,
      duration
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>CONTENT STUDIO // ONE-CLICK SYNTHESIS (§50 & §58)</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Synthesize Platform-Native Content
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate production-ready timestamped Reel scripts, Remotion motion code, 10 scored hooks, carousels, and comment DM automations.
        </p>
      </div>

      {/* Creation Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0c1220] border border-slate-800 space-y-6 shadow-2xl">
        {/* Pillar Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
            Select Content Pillar Engine
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {pillars.map(p => (
              <button
                type="button"
                key={p}
                onClick={() => handlePillarChange(p)}
                className={`p-3 rounded-xl border text-left font-semibold transition cursor-pointer ${
                  selectedPillar === p
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Series & Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
              Series Template
            </label>
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
            >
              {seriesByPillar[selectedPillar]?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
              Strategic Objective (§47)
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="Reach & Follows">Reach & Follows</option>
              <option value="Saves & Authority">Saves & Technical Authority</option>
              <option value="Lead & DM Delivery">Lead & Comment DM Delivery</option>
              <option value="Comments & Debate">Comments & Community Debate</option>
            </select>
          </div>
        </div>

        {/* Topic Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
            Topic or Frontier AI Event
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. DeepSeek R1 reasoning architecture vs Claude 3.5 Sonnet"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-medium focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        {/* Custom Angle */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
            Recommended Angle / Hook Focus (§10)
          </label>
          <input
            type="text"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="What developers can build with this starting today"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Dynamic Duration Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase">
              Target Reel Duration (§12)
            </label>
            <span className="text-xs font-mono text-amber-400 font-bold">{duration} Seconds</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 font-mono text-xs">
            {[10, 15, 20, 30, 45, 60, 90].map(d => (
              <button
                type="button"
                key={d}
                onClick={() => setDuration(d)}
                className={`py-2 rounded-xl font-bold transition cursor-pointer ${
                  duration === d
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3.5 rounded-2xl font-mono font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>SYNTHESIZING 18-PIECE CONTENT PACKAGE...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black" />
              <span>GENERATE COMPLETE CONTENT PACKAGE</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
