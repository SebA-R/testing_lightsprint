"use client";

const POSTS = [
  {
    date: "2026-05-14",
    niche: "Personal Finance",
    hook: "Stop Saving Money",
    predicted: 85,
    actual: 124000,
    delta: 46,
  },
  {
    date: "2026-05-11",
    niche: "Personal Finance",
    hook: "The 50/30/20 Rule Is Dead",
    predicted: 78,
    actual: 89000,
    delta: 14,
  },
  {
    date: "2026-05-08",
    niche: "Fitness",
    hook: "Why Your Gym Routine Fails",
    predicted: 72,
    actual: 41000,
    delta: -34,
  },
  {
    date: "2026-05-05",
    niche: "Personal Finance",
    hook: "I Paid Off $40K in 6 Months",
    predicted: 90,
    actual: 210000,
    delta: 133,
  },
  {
    date: "2026-05-02",
    niche: "Fitness",
    hook: "3 Exercises You're Doing Wrong",
    predicted: 68,
    actual: 52000,
    delta: -12,
  },
];

function formatViews(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

export default function PerformanceLoop() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Performance Loop</h1>
      <p className="text-sm text-muted mb-8">
        Track post performance and see what GBrain learned.
      </p>

      <div className="bg-card-bg border border-card-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-muted uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Niche</th>
                <th className="px-4 py-3 font-medium">Hook Used</th>
                <th className="px-4 py-3 font-medium text-right">Predicted</th>
                <th className="px-4 py-3 font-medium text-right">Actual Views</th>
                <th className="px-4 py-3 font-medium text-right">Delta</th>
              </tr>
            </thead>
            <tbody>
              {POSTS.map((post, i) => (
                <tr
                  key={i}
                  className="border-b border-card-border last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-muted">{post.date}</td>
                  <td className="px-4 py-3">{post.niche}</td>
                  <td className="px-4 py-3 font-medium">{post.hook}</td>
                  <td className="px-4 py-3 text-right font-mono">{post.predicted}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatViews(post.actual)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium">
                    <span
                      className={
                        post.delta >= 0 ? "text-success" : "text-danger"
                      }
                    >
                      {post.delta >= 0 ? "+" : ""}
                      {post.delta}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-card-bg border border-card-border rounded-md overflow-hidden">
        <div className="border-l-2 border-accent p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">
            GBrain Learning Update
          </p>
          <div className="font-mono text-sm text-foreground/80 space-y-2">
            <p>
              <span className="text-accent">→</span> Based on post from 2026-05-08,
              hook type{" "}
              <span className="text-foreground font-medium">
                &quot;contrarian opener&quot;
              </span>{" "}
              underperformed by{" "}
              <span className="text-danger font-medium">34%</span> in{" "}
              <span className="text-foreground font-medium">fitness</span> niche.
            </p>
            <p>
              <span className="text-accent">→</span> Strategy page updated:
              deprioritizing contrarian hooks for fitness. Switching to{" "}
              <span className="text-foreground font-medium">
                &quot;relatable mistake&quot;
              </span>{" "}
              pattern which showed{" "}
              <span className="text-success font-medium">+22%</span> engagement in
              similar niches.
            </p>
            <p>
              <span className="text-accent">→</span> Confidence model recalibrated.
              Next prediction accuracy target:{" "}
              <span className="text-foreground font-medium">±15%</span>.
            </p>
          </div>
          <p className="text-xs text-muted mt-3 font-mono">
            Updated at 2026-05-16T14:32:00Z
          </p>
        </div>
      </div>
    </div>
  );
}
