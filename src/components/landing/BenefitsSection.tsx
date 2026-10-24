"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Rocket, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function BenefitsSection() {
  const [activePersona, setActivePersona] = useState<"students" | "freelancers" | "founders">("students");

  const personas = {
    students: {
      role: "Students & Graduates",
      badge: "Academic & Career Growth",
      icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
      headline: "Turn Final-Year Capstone Projects into Career-Defining Portfolios",
      description:
        "Struggling with vague requirements and overwhelming tech stacks? LaunchPilot AI structures your capstone milestones, keeps tasks on schedule, and helps you articulate architectural decisions to interviewers.",
      benefits: [
        "Structured breakdown of massive semester projects into manageable daily tasks",
        "AI Copilot that helps evaluate architectural tradeoffs and database schemas",
        "Clear progress milestones ready to showcase during technical interviews",
        "Free tier tailored for individual students and college project teams",
      ],
      quote: "Helped me deliver my final year AI project 3 weeks early with production-grade documentation.",
      author: "Computer Science Graduate",
    },
    freelancers: {
      role: "Freelancers & Contractors",
      badge: "Client Delivery & Revenue",
      icon: <Briefcase className="w-5 h-5 text-cyan-500" />,
      headline: "Deliver Client Deliverables on Time Without Scope Creep",
      description:
        "Manage multiple client engagements in parallel without losing track of deliverables, deadlines, or technical notes. Keep your focus on billable execution.",
      benefits: [
        "Isolate individual client engagements into secure, separate workspaces",
        "Generate client progress updates and sprint summaries with AI Copilot",
        "Never miss a milestone deadline with due-date urgency tracking",
        "Zero-friction client onboarding and task handoffs",
      ],
      quote: "Finally stopped mixing up client deliverables and Jira tickets. Clean, focused, and fast.",
      author: "Full-Stack Web Consultant",
    },
    founders: {
      role: "Early-Stage Founders",
      badge: "Fast MVP Validation",
      icon: <Rocket className="w-5 h-5 text-violet-500" />,
      headline: "Ship Your Micro-SaaS MVP in Days, Not Months",
      description:
        "Eliminate analysis paralysis. Use the AI Copilot to stress-test your startup idea, map core MVP features, identify technical roadblocks, and execute your build sprint.",
      benefits: [
        "Identify high-risk technical assumptions before writing extensive code",
        "Prioritize must-have MVP features over low-impact polish",
        "PostgreSQL persistence and Supabase Auth ready for production scaling",
        "Unified view of product roadmap, bug triage, and feature backlog",
      ],
      quote: "Went from product ideation to a working deployed SaaS prototype in one focused weekend.",
      author: "Indie Hacker & Founder",
    },
  };

  const current = personas[activePersona];

  return (
    <section id="personas" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="purple" size="md" className="mb-4">
          Tailored Workspaces
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Designed for Your Specific Execution Style
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Whether you are submitting an academic capstone, billing freelance clients, or bootstrapping your startup.
        </p>
      </div>

      {/* Persona Toggle Bar */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          {(["students", "freelancers", "founders"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePersona(key)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activePersona === key
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {personas[key].icon}
              <span>{personas[key].role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Persona Spotlight Card */}
      <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Badge variant="default" size="sm" className="mb-3">
              {current.badge}
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {current.headline}
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {current.description}
            </p>

            <ul className="mt-6 space-y-3">
              {current.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">User Testimonial</span>
              </div>
              <p className="italic text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                "{current.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                {current.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{current.author}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified LaunchPilot User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
