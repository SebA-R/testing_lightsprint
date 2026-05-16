"use client";

import { useState } from "react";
import Sidebar, { type View } from "@/components/Sidebar";
import NicheSetup from "@/components/NicheSetup";
import ContentStudio from "@/components/ContentStudio";
import PerformanceLoop from "@/components/PerformanceLoop";

export default function Home() {
  const [view, setView] = useState<View>("niche");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={view} onNavigate={setView} />
      <main className="flex-1 overflow-y-auto p-8">
        {view === "niche" && <NicheSetup />}
        {view === "studio" && <ContentStudio />}
        {view === "performance" && <PerformanceLoop />}
      </main>
    </div>
  );
}
