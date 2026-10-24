"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"copilot" | "tasks" | "metrics">("copilot");

  return (
    <section id="demo" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Experience the Workspace in Action
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          See how LaunchPilot AI unifies project tracking, task execution, and structured AI copilot guidance in real time.
        </p>
      </div>

      {/* Browser Chrome Container */}
      <div className="relative rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              app.launchpilot.ai/workspace/demo
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Live View</span>
          </div>
        </div>

        {/* Workspace Inner Grid */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Top Bar inside workspace */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800/70">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="purple" size="sm">Active Initiative</Badge>
                <span className="text-xs text-slate-400">Updated 2m ago</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                AI Micro-SaaS Capstone Platform
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                End-to-end full-stack web application with Supabase Auth, PostgreSQL CRUD, and AI Copilot.
              </p>
            </div>

            {/* Quick Action Navigation Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("copilot")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "copilot"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                AI Copilot
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tasks")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "tasks"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Task Matrix (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "metrics"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Progress
              </button>
            </div>
          </div>

          {/* Tab 1: AI Copilot Preview */}
          {activeTab === "copilot" && (
            <div className="mt-6 space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl border border-indigo-200/70 dark:border-indigo-800/60 bg-gradient-to-r from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/30 dark:to-purple-950/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Intelligent Strategy Breakdown
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      "LaunchPilot AI generated a structured execution blueprint for this initiative: 3 prioritized milestones, potential security failure risks, and immediate actionable task suggestions."
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/40">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Suggested Actions</span>
                  </div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Enforce Supabase Row-Level Security on user_id columns
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Add client-side debounce for AI Copilot inputs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Implement automatic dark/light zero-flicker script
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/40">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Identified Risks</span>
                  </div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      External LLM quota limits require deterministic fallback
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Session expiry handling during task creation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Tasks Matrix */}
          {activeTab === "tasks" && (
            <div className="mt-6 space-y-2.5 animate-in fade-in duration-200">
              {[
                { title: "Design responsive SaaS landing page with dark/light mode", status: "completed", tag: "Frontend" },
                { title: "Define Supabase PostgreSQL schema with RLS policies", status: "completed", tag: "Database" },
                { title: "Configure multi-provider server-side AI Copilot orchestration", status: "in-progress", tag: "AI Engine" },
                { title: "Run end-to-end integration tests & verify production build", status: "pending", tag: "DevOps" },
              ].map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40"
                >
                  <div className="flex items-center gap-3">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className={`text-xs font-medium ${task.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.status === "completed" ? "success" : "warning"} size="sm">
                      {task.status}
                    </Badge>
                    <span className="text-[11px] text-slate-400 hidden sm:inline-block">{task.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Metrics & Progress */}
          {activeTab === "metrics" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Execution Velocity</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">94.2%</p>
                <div className="flex items-center gap-1 text-emerald-500 text-xs mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18% faster milestone completion</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Tasks Delivered</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">18 / 20</p>
                <span className="text-xs text-slate-400 mt-2 block">2 remaining for v1.0.0</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">AI Insights Generated</span>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">42</p>
                <span className="text-xs text-slate-400 mt-2 block">Zero API leakage detected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
