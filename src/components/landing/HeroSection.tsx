"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Bot, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export function HeroSection({ onGetStarted, onExploreDemo }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Decorative radial blur glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/10 dark:bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>LaunchPilot AI Micro-SaaS v1.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="text-slate-500 dark:text-slate-400 normal-case font-medium">Built for High-Velocity Execution</span>
        </div>

        {/* Main Value Proposition Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Turn Ambition Into Shipped Products with an{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500">
            Intelligent AI Copilot
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The all-in-one workspace for students, graduates, freelancers, and early-stage founders to organize projects, prioritize tasks, and execute structured AI-driven gameplans without tool fatigue.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={onGetStarted}
            id="hero-cta-get-started"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-8 font-semibold shadow-lg shadow-indigo-500/25"
          >
            Start Building Free
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={onExploreDemo}
            id="hero-cta-explore-demo"
            className="w-full sm:w-auto px-8"
          >
            Explore Interactive Demo
          </Button>
        </div>

        {/* Trust & Guarantee bullets */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero Tool Hopping</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Supabase Cloud Relational Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Structured Multi-Provider AI Copilot</span>
          </div>
        </div>

        {/* Feature quick badges */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-left">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Unified Projects</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Track initiatives from idea to launch</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-left">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">High-Velocity Tasks</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Prioritized checklist with due dates</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-left">
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">AI Strategy Copilot</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant roadmap, risks & milestones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
