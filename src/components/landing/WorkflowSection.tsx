"use client";

import React from "react";
import { PlusCircle, Sparkles, CheckCircle2, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function WorkflowSection() {
  const steps = [
    {
      step: "01",
      icon: <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Create Your Project",
      description:
        "Input your title, core objectives, and target timeline. The system initializes a dedicated workspace backed by persistent PostgreSQL storage.",
    },
    {
      step: "02",
      icon: <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
      title: "Activate AI Copilot",
      description:
        "Submit your project scope or architectural questions. The AI generates structured roadmaps, identifies risk factors, and breaks goals down into discrete steps.",
    },
    {
      step: "03",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "Execute & Manage Tasks",
      description:
        "Turn high-level recommendations into structured tasks. Assign due dates, update progress states, and keep your focus on high-impact priorities.",
    },
    {
      step: "04",
      icon: <Rocket className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: "Ship & Celebrate",
      description:
        "Monitor your velocity metrics, finalize deliverables, and ship your capstone project, client deliverable, or SaaS MVP on schedule.",
    },
  ];

  return (
    <section id="workflow" className="py-20 md:py-28 bg-slate-100/60 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="md" className="mb-4">
            Intuitive Execution Cycle
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Blank Slate to Shipped Product in 4 Steps
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            A frictionless workflow designed to keep you in flow state and eliminate decision paralysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Phase {item.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
