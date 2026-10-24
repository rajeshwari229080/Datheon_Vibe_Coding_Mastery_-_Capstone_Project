"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is LaunchPilot AI and who is it designed for?",
      a: "LaunchPilot AI is a unified productivity and project management workspace tailored for students, fresh graduates, freelancers, and early-stage founders. It consolidates project tracking, prioritized task execution, and an intelligent AI copilot into a single seamless interface.",
    },
    {
      q: "How does the AI Project Copilot work? Do I need my own API key?",
      a: "The AI Copilot orchestrates requests through a secure server-side endpoint. It comes equipped with pre-configured high-performance models (OpenAI, Gemini, or Claude). Even without custom API keys, our built-in intelligent fallback ensures you can test and explore full roadmap generation out of the box.",
    },
    {
      q: "How is my project and task data protected?",
      a: "All user data is stored in managed Supabase PostgreSQL instances protected by PostgreSQL Row Level Security (RLS) policies. Your records are tied strictly to your authenticated user ID. Other users cannot query or mutate your initiatives under any circumstance.",
    },
    {
      q: "Can I manage multiple different projects at once?",
      a: "Yes! LaunchPilot AI is built specifically for multi-project workflows. You can easily switch between an academic capstone, client freelance gigs, and side hustle MVPs while keeping tasks and AI notes neatly isolated.",
    },
    {
      q: "Does LaunchPilot AI support both dark and light modes?",
      a: "Yes. We built a zero-flicker theme engine with dark and light modes that respects your operating system preferences or lets you manually toggle and persist your preferred theme.",
    },
    {
      q: "Is there a cost to start using LaunchPilot AI?",
      a: "LaunchPilot AI offers a fully featured free tier for individual builders, students, and freelancers to organize projects and test the AI copilot without any credit card required.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="purple" size="md" className="mb-4">
          Frequently Asked Questions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          Got questions about the workspace, architecture, or security? We've got answers.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
