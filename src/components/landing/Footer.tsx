import React from "react";
import Link from "next/link";
import { Sparkles, Globe, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                LaunchPilot AI
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              The unified AI execution workspace that helps students, fresh graduates, freelancers, and early-stage founders ship meaningful software faster.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
              <a
                href="https://github.com/rajeshwari229080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 ml-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Systems 100% Operational</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Workspace Features
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Execution Workflow
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Audience Personas
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Interactive Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <span className="text-slate-500">Next.js 15 App Router</span>
              </li>
              <li>
                <span className="text-slate-500">Supabase PostgreSQL</span>
              </li>
              <li>
                <span className="text-slate-500">Row Level Security</span>
              </li>
              <li>
                <span className="text-slate-500">Multi-Provider AI API</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Trust & Security
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy & RLS
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Security Posture
                </a>
              </li>
              <li>
                <a href="#lead-capture" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 LaunchPilot AI. Built with precision for Datheon Vibe Coding Mastery & Capstone.</p>
          <p className="flex items-center gap-1">
            Engineered with React 19, TypeScript & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
