"use client";

import React from "react";
import {
  Bot,
  FolderKanban,
  CheckSquare,
  ShieldCheck,
  Database,
  Moon,
  Zap,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      badge: "AI-Powered",
      title: "Context-Aware Project Copilot",
      description:
        "Submit any project concept or blocker. The AI parses scope, breaks it down into actionable milestones, flags potential technical risks, and proposes prioritized tasks.",
      gradient: "from-indigo-500/10 to-violet-500/10",
      colSpan: "md:col-span-2",
    },
    {
      icon: <FolderKanban className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      badge: "Organization",
      title: "Unified Multi-Project Hub",
      description:
        "Manage student assignments, freelance client contracts, and startup MVPs in one consolidated dashboard without losing context.",
      gradient: "from-cyan-500/10 to-blue-500/10",
      colSpan: "md:col-span-1",
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: "Execution",
      title: "Structured Task Management",
      description:
        "Create, prioritize, schedule, and complete project tasks. Filter by status (Pending, In Progress, Completed) with instant optimistic UI updates.",
      gradient: "from-emerald-500/10 to-teal-500/10",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      badge: "Persistence",
      title: "Supabase Relational Database",
      description:
        "Built on managed PostgreSQL with normalized tables for profiles, projects, tasks, and leads. Scalable, durable, and production-tested.",
      gradient: "from-purple-500/10 to-pink-500/10",
      colSpan: "md:col-span-1",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      badge: "Security",
      title: "Row Level Security (RLS) Isolation",
      description:
        "Data isolation enforced at the PostgreSQL kernel level. Users can never view, mutate, or query another user's private projects or tasks.",
      gradient: "from-amber-500/10 to-orange-500/10",
      colSpan: "md:col-span-1",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="purple" size="md" className="mb-4">
          Core Capabilities
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered for Velocity. Built for Reliability.
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          LaunchPilot AI replaces messy spreadsheets, scattered notes, and disconnected chat tabs with an integrated execution environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className={`p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm glow-card relative overflow-hidden ${item.colSpan}`}
          >
            <div
              className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br ${item.gradient} blur-2xl rounded-full pointer-events-none`}
            />

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                {item.icon}
              </div>
              <Badge variant="neutral" size="sm">
                {item.badge}
              </Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
