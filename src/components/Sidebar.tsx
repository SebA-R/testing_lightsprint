"use client";

import { Search, Palette, BarChart3, Zap } from "lucide-react";

export type View = "niche" | "studio" | "performance";

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "niche", label: "Niche Setup", icon: Search },
  { id: "studio", label: "Content Studio", icon: Palette },
  { id: "performance", label: "Performance Loop", icon: BarChart3 },
];

export default function Sidebar({
  active,
  onNavigate,
}: {
  active: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <aside className="w-56 shrink-0 border-r border-card-border bg-sidebar-bg flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-card-border">
        <Zap className="w-5 h-5 text-accent" />
        <span className="text-base font-semibold tracking-tight">BrainPost</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-card-border">
        <p className="text-xs text-muted">AI Content Agent v0.1</p>
      </div>
    </aside>
  );
}
