"use client";

import { useState } from "react";
import { RefreshCw, ExternalLink } from "lucide-react";

const STRATEGY = {
  hookPattern: "Contrarian opener → \"Stop doing X if you want Y\"",
  slideStructure: "Hook → Problem → 3 Tips → Social Proof → CTA (7 slides)",
  ctaStyle: "Soft CTA with profile mention — \"Follow for part 2\"",
  nicheScore: 82,
};

const SLIDES = [
  { number: 1, headline: "Stop Saving Money", body: "If you actually want to build wealth in 2026, saving isn't enough. Here's what the top 1% do instead." },
  { number: 2, headline: "The Problem", body: "Inflation eats your savings at 3-5% per year. A savings account yields 0.5%. You're losing money by \"saving\" it." },
  { number: 3, headline: "Tip #1: Automate Investing", body: "Set up automatic transfers to an index fund. Even $50/week compounds to $47K in 10 years." },
  { number: 4, headline: "Tip #2: Skill Stacking", body: "Combine 2-3 average skills into one rare combo. Design + copywriting + AI = $150K freelance income." },
  { number: 5, headline: "Tip #3: Build Assets", body: "Create something once, sell it forever. Digital products, templates, courses — your time shouldn't be linear." },
  { number: 6, headline: "Proof It Works", body: "I went from $0 saved to $120K net worth in 18 months using exactly these 3 strategies. No trust fund." },
  { number: 7, headline: "Follow for Part 2", body: "I'm breaking down my exact portfolio allocation next week. Follow so you don't miss it." },
];

export default function ContentStudio() {
  const [approval, setApproval] = useState<"pending" | "approved">("pending");

  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Content Studio</h1>
      <p className="text-sm text-muted mb-8">
        Review the generated strategy and carousel content.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        {/* Strategy Panel */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider">
            GBrain Strategy
          </h2>
          <div className="bg-card-bg border border-card-border rounded-md p-4 space-y-4">
            <Field label="Hook Pattern" value={STRATEGY.hookPattern} />
            <Field label="Slide Structure" value={STRATEGY.slideStructure} />
            <Field label="CTA Style" value={STRATEGY.ctaStyle} />
            <div>
              <p className="text-xs text-muted mb-1">Niche Performance Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${STRATEGY.nicheScore}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-semibold text-accent">
                  {STRATEGY.nicheScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Slides Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted uppercase tracking-wider">
              Carousel Preview
            </h2>
            <button
              onClick={() =>
                setApproval((s) => (s === "pending" ? "approved" : "pending"))
              }
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                approval === "approved"
                  ? "bg-success/15 text-success"
                  : "bg-accent/15 text-accent"
              }`}
            >
              {approval === "pending" ? "Pending" : "Approved"}
            </button>
          </div>

          <div className="bg-card-bg border border-card-border rounded-md p-4">
            <p className="text-xs text-muted mb-4">
              Template:{" "}
              <span className="text-foreground font-medium">
                Minimal Dark Carousel — 7 Slides
              </span>
            </p>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {SLIDES.map((slide) => (
                <div
                  key={slide.number}
                  className="bg-background border border-card-border rounded-md p-4 aspect-[9/16] max-h-48 flex flex-col justify-center"
                >
                  <span className="text-[10px] text-muted mb-2 uppercase tracking-widest">
                    Slide {slide.number}
                  </span>
                  <h3 className="text-base font-bold mb-2 leading-tight">
                    {slide.headline}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{slide.body}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-card-bg border border-card-border hover:border-accent/40 text-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
              <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5" />
                Export to Canva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
