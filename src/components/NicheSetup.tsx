"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Loader2 } from "lucide-react";

const AGENT_STEPS = [
  "Initializing agent pipeline...",
  "Fetching trending videos via Apify...",
  "Analyzing top 50 videos in niche...",
  "Extracting hook patterns from high-performers...",
  "Identifying slide structure templates...",
  "Scoring CTA effectiveness across samples...",
  "Cross-referencing competitor content strategies...",
  "Building niche performance model...",
  "Writing strategy context to GBrain memory...",
  "Selecting optimal Canva carousel template...",
  "Pipeline complete. Strategy ready in Content Studio.",
];

export default function NicheSetup() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [competitors, setCompetitors] = useState(["", "", ""]);
  const [isRunning, setIsRunning] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logLines, currentTyping]);

  const typewriterLine = useCallback(
    (text: string): Promise<void> =>
      new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setCurrentTyping(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(interval);
            setCurrentTyping("");
            setLogLines((prev) => [...prev, text]);
            resolve();
          }
        }, 25);
      }),
    []
  );

  const handleScan = async () => {
    if (!niche.trim()) return;
    setIsRunning(true);
    setLogLines([]);
    setCurrentTyping("");

    for (const step of AGENT_STEPS) {
      await typewriterLine(step);
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsRunning(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-1">Niche Setup</h1>
      <p className="text-sm text-muted mb-8">
        Configure your niche and competitors, then scan to build your content strategy.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">TikTok Niche</label>
          <input
            type="text"
            placeholder="e.g. personal finance, fitness, skincare"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-card-bg border border-card-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Target Audience</label>
          <input
            type="text"
            placeholder="e.g. Gen-Z beginners looking to save money"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full bg-card-bg border border-card-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Competitor Handles <span className="text-muted font-normal">(up to 3)</span>
          </label>
          <div className="space-y-2">
            {competitors.map((val, i) => (
              <input
                key={i}
                type="text"
                placeholder={`@competitor${i + 1}`}
                value={val}
                onChange={(e) => {
                  const next = [...competitors];
                  next[i] = e.target.value;
                  setCompetitors(next);
                }}
                className="w-full bg-card-bg border border-card-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={isRunning || !niche.trim()}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Scan
            </>
          )}
        </button>
      </div>

      {(logLines.length > 0 || currentTyping) && (
        <div className="mt-8 bg-card-bg border border-card-border rounded-md p-4 max-h-80 overflow-y-auto">
          <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wider">
            Agent Activity
          </p>
          <div className="space-y-1.5 font-mono text-sm">
            {logLines.map((line, i) => {
              const isComplete = line.includes("complete");
              return (
                <div key={i} className="animate-fade-in flex items-start gap-2">
                  <span className={isComplete ? "text-success" : "text-accent"}>
                    {isComplete ? "✓" : "›"}
                  </span>
                  <span className={isComplete ? "text-success" : "text-foreground/80"}>
                    {line}
                  </span>
                </div>
              );
            })}
            {currentTyping && (
              <div className="flex items-start gap-2">
                <span className="text-accent">›</span>
                <span className="text-foreground/80 cursor-blink">{currentTyping}</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}
