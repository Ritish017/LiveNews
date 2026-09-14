import React, { useState } from "react";
import {
  MessageSquare, Send, CheckCircle2, Play, Sparkles,
  RefreshCw, ShieldCheck, ArrowRight, ExternalLink
} from "lucide-react";
import { simulateFutureAiiAutomation } from "../../lib/api";

export const AutomationsView: React.FC = () => {
  const [testComment, setTestComment] = useState<string>("Can you send me the AGENT workflow please?");
  const [testKeyword, setTestKeyword] = useState<string>("AGENT");
  const [simResult, setSimResult] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const automations = [
    {
      id: "auto_1",
      keyword: "AGENT",
      series: "AI TOOL YOU NEED",
      topic: "Autonomous Local Coding Agent",
      public_reply: "@user Just sent you the full setup repository in your DMs! Check message requests 👀",
      dm_payload: "Hey! Here is the full local autonomous agent workflow you asked for 👇\n\nhttps://github.com/future-aii/autonomous-agent-starter",
      resource_type: "PROMPT / REPO",
      triggers: 412,
      dm_sent: 398,
      conversion: "18.4%",
      status: "ACTIVE"
    },
    {
      id: "auto_2",
      keyword: "CHEAT",
      series: "AI IN 15 SECONDS",
      topic: "Transformer Attention Visual Sheet",
      public_reply: "@user Check your DMs — the 1-page visual architecture sheet is waiting for you! ⚡",
      dm_payload: "Here is the visual architecture cheat-sheet for transformer attention heads 👇\n\nhttps://future-aii.media/assets/attention-cheatsheet.pdf",
      resource_type: "CHEATSHEET",
      triggers: 285,
      dm_sent: 280,
      conversion: "16.1%",
      status: "ACTIVE"
    },
    {
      id: "auto_3",
      keyword: "BENCHMARK",
      series: "AI VS AI",
      topic: "Claude vs GPT vs Gemini Benchmark Prompts",
      public_reply: "@user Sent to your DMs! Let me know which model won on your hardware 🚀",
      dm_payload: "Hey! Here are the 5 benchmark prompts we tested in tonight's Reel 👇\n\nPrompt 1: Full-stack WebSocket implementation...",
      resource_type: "PROMPTS",
      triggers: 194,
      dm_sent: 191,
      conversion: "14.2%",
      status: "ACTIVE"
    }
  ];

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await simulateFutureAiiAutomation(testKeyword, testComment, "dev_builder_99");
      setSimResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>COMMENT → DM AUTOMATION ENGINE (§15 & §16)</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Automated Resource Delivery & Lead Pipeline
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Meta-compliant webhook dispatch delivering genuine prompts, cheat-sheets, and repositories when followers comment keywords.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Automations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
              Active Instagram Engagement Rules
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>3 Pipelines Active</span>
            </span>
          </div>

          <div className="space-y-4">
            {automations.map((auto) => (
              <div
                key={auto.id}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#0c1220] to-[#090d16] border border-slate-800 space-y-3.5 shadow-lg"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-lg text-sm font-mono font-black bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      "{auto.keyword}"
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {auto.series} • {auto.topic}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {auto.status}
                  </span>
                </div>

                {/* Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Public Reply (Comment)
                    </span>
                    <p className="text-slate-300 font-sans">{auto.public_reply}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Private DM Delivery
                    </span>
                    <p className="text-slate-300 font-sans whitespace-pre-wrap truncate">{auto.dm_payload}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Triggers: <strong className="text-white">{auto.triggers}</strong></span>
                  <span>DMs Sent: <strong className="text-cyan-400">{auto.dm_sent}</strong></span>
                  <span>Conv Rate: <strong className="text-amber-400">{auto.conversion}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Interactive Test Simulator */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
            Interactive Automation Simulator
          </h3>

          <div className="p-5 rounded-2xl bg-[#0c1220] border border-amber-500/30 space-y-4 shadow-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Trigger Keyword to Test
              </label>
              <input
                type="text"
                value={testKeyword}
                onChange={(e) => setTestKeyword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-mono text-xs font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
                Simulated Follower Comment
              </label>
              <textarea
                rows={3}
                value={testComment}
                onChange={(e) => setTestComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-2.5 rounded-xl font-mono font-bold text-xs text-black bg-amber-500 hover:bg-amber-400 transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>TEST SIMULATED INTERACTION</span>
            </button>

            {/* Simulation Output */}
            {simResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Match Status:</span>
                  <strong className={simResult.is_match ? "text-emerald-400" : "text-rose-400"}>
                    {simResult.is_match ? "KEYWORD MATCHED" : "NO MATCH"}
                  </strong>
                </div>

                {simResult.is_match && (
                  <>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Public Reply:</span>
                      <p className="text-slate-200 mt-0.5">{simResult.public_reply_sent}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Private DM Delivered:</span>
                      <p className="text-cyan-300 mt-0.5 whitespace-pre-wrap">{simResult.dm_sent}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
