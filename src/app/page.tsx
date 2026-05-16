"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [phase, setPhase] = useState<"onboarding" | "dashboard">("onboarding");

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (phase === "onboarding") {
    return <OnboardingFlow onComplete={() => setPhase("dashboard")} />;
  }

  return <Dashboard />;
}
