"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ArrowRight, Zap } from "lucide-react";

const AGENT_STEPS = [
  "Initializing agent pipeline…",
  "Fetching trending videos via Apify…",
  "Analyzing top 50 videos in niche…",
  "Extracting hook patterns from high-performers…",
  "Identifying slide structure templates…",
  "Scoring CTA effectiveness across samples…",
  "Cross-referencing competitor content strategies…",
  "Building niche performance model…",
  "Writing strategy context to GBrain memory…",
  "Selecting optimal carousel template…",
  "Pipeline complete — strategy ready.",
];

type Step = "welcome" | "niche" | "audience" | "competitors" | "scanning";

export default function OnboardingFlow({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>("welcome");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [competitors, setCompetitors] = useState(["", "", ""]);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [scanDone, setScanDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, [step]);

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
        }, 20);
      }),
    []
  );

  const runScan = useCallback(async () => {
    setStep("scanning");
    setLogLines([]);
    setCurrentTyping("");

    for (const line of AGENT_STEPS) {
      await typewriterLine(line);
      await new Promise((r) => setTimeout(r, 350));
    }

    setScanDone(true);
  }, [typewriterLine]);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") action();
  };

  const steps: Step[] = ["welcome", "niche", "audience", "competitors", "scanning"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen flex flex-col">
      {step !== "welcome" && step !== "scanning" && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-subtle z-50">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-md"
            >
              <div className="inline-flex items-center gap-2.5 mb-8">
                <Zap className="w-6 h-6 text-accent" />
                <span className="text-xl font-semibold tracking-tight">
                  BrainPost
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight mb-3">
                Build your content strategy
              </h1>
              <p className="text-muted text-base mb-10 leading-relaxed">
                Answer a few quick questions and our AI agent will analyze your
                niche, competitors, and build an optimized content plan.
              </p>
              <button
                onClick={() => setStep("niche")}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === "niche" && (
            <motion.div
              key="niche"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg"
            >
              <p className="text-sm text-muted mb-2 font-mono">01</p>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                What&apos;s your TikTok niche?
              </h2>
              <p className="text-muted text-sm mb-8">
                The content category you want to dominate.
              </p>
              <input
                ref={inputRef}
                type="text"
                placeholder="e.g. personal finance, fitness, skincare"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => niche.trim() && setStep("audience"))
                }
                className="w-full bg-transparent border-b border-card-border py-3 text-lg text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
              />
              <div className="flex items-center justify-between mt-8">
                <p className="text-xs text-muted/60">
                  Press <kbd className="px-1.5 py-0.5 bg-subtle rounded text-muted text-[11px]">Enter</kbd> to continue
                </p>
                <button
                  onClick={() => niche.trim() && setStep("audience")}
                  disabled={!niche.trim()}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-30 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "audience" && (
            <motion.div
              key="audience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg"
            >
              <p className="text-sm text-muted mb-2 font-mono">02</p>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                Who&apos;s your target audience?
              </h2>
              <p className="text-muted text-sm mb-8">
                Describe the people you want to reach.
              </p>
              <input
                ref={inputRef}
                type="text"
                placeholder="e.g. Gen-Z beginners looking to save money"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    () => audience.trim() && setStep("competitors")
                  )
                }
                className="w-full bg-transparent border-b border-card-border py-3 text-lg text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
              />
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep("niche")}
                  className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => audience.trim() && setStep("competitors")}
                  disabled={!audience.trim()}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-30 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "competitors" && (
            <motion.div
              key="competitors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg"
            >
              <p className="text-sm text-muted mb-2 font-mono">03</p>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                Any competitors to watch?
              </h2>
              <p className="text-muted text-sm mb-8">
                Add up to 3 TikTok handles. Optional — skip if unsure.
              </p>
              <div className="space-y-4">
                {competitors.map((val, i) => (
                  <input
                    key={i}
                    ref={i === 0 ? inputRef : undefined}
                    type="text"
                    placeholder={`@handle${i + 1}`}
                    value={val}
                    onChange={(e) => {
                      const next = [...competitors];
                      next[i] = e.target.value;
                      setCompetitors(next);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && i === competitors.length - 1)
                        runScan();
                    }}
                    className="w-full bg-transparent border-b border-card-border py-3 text-lg text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep("audience")}
                  className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={runScan}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Scan Niche
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xl"
            >
              <div className="flex items-center gap-3 mb-8">
                {!scanDone && (
                  <Loader2 className="w-4 h-4 text-accent animate-spin" />
                )}
                <h2 className="text-xl font-semibold tracking-tight">
                  {scanDone
                    ? "Strategy ready"
                    : "Analyzing your niche…"}
                </h2>
              </div>

              <div className="space-y-2 font-mono text-sm max-h-[60vh] overflow-y-auto pr-2">
                {logLines.map((line, i) => {
                  const isLast = line.includes("complete");
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={isLast ? "text-success" : "text-muted/50"}
                      >
                        {isLast ? "✓" : "›"}
                      </span>
                      <span
                        className={
                          isLast ? "text-success" : "text-foreground/60"
                        }
                      >
                        {line}
                      </span>
                    </motion.div>
                  );
                })}
                {currentTyping && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent">›</span>
                    <span className="text-foreground/60 cursor-blink">
                      {currentTyping}
                    </span>
                  </div>
                )}
                <div ref={logEndRef} />
              </div>

              {scanDone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-10"
                >
                  <button
                    onClick={onComplete}
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    View Strategy
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
