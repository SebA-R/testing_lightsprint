"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ContentStudio from "./ContentStudio";
import PerformanceLoop from "./PerformanceLoop";
import { KnowledgeGraph } from "./KnowledgeGraph";
import type { GraphNode, OnboardingData } from "./KnowledgeGraph";

type Tab = "knowledge" | "studio" | "performance";

export default function Dashboard({
  onboardingData,
}: {
  onboardingData: OnboardingData;
}) {
  const [tab, setTab] = useState<Tab>("knowledge");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const isGraph = tab === "knowledge";

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`border-b border-card-border ${isGraph ? "fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm" : ""}`}
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-semibold tracking-tight text-foreground/80">
            BrainPost
          </span>
          <nav className="flex gap-1">
            {(["knowledge", "studio", "performance"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setSelectedNode(null);
                }}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                  tab === t
                    ? "text-foreground bg-subtle"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t === "knowledge"
                  ? "Knowledge"
                  : t === "studio"
                    ? "Content"
                    : "Performance"}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {isGraph ? (
        <>
          <KnowledgeGraph
            visible
            onboardingData={onboardingData}
            onNodeClick={setSelectedNode}
          />

          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 right-6 z-30 glass-panel rounded-xl p-5 w-72"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        selectedNode.type === "core"
                          ? "#d4745f"
                          : selectedNode.type === "agent"
                            ? "#d0d0d0"
                            : selectedNode.type === "trend"
                              ? "#a0a0a0"
                              : "#666",
                    }}
                  />
                  <span className="text-xs font-mono text-muted uppercase tracking-widest">
                    {selectedNode.type}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-muted hover:text-foreground text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
              <h3 className="text-sm font-semibold mb-2">
                {selectedNode.name}
              </h3>
              <div className="space-y-1.5 text-xs text-muted">
                <p>
                  Domain:{" "}
                  <span className="text-foreground/70">
                    {selectedNode.domain}
                  </span>
                </p>
                <p>
                  Confidence:{" "}
                  <span className="text-foreground/70">
                    {selectedNode.confidence}%
                  </span>
                </p>
                <div className="h-1 bg-subtle rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${selectedNode.confidence}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {tab === "studio" && <ContentStudio />}
                {tab === "performance" && <PerformanceLoop />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      )}
    </div>
  );
}
