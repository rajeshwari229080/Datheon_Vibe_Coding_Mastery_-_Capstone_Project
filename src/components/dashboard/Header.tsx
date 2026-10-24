"use client";

import React from "react";
import { Menu, Plus, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenCreateProject: () => void;
  onOpenCopilot: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Header({
  onOpenMobileSidebar,
  onOpenCreateProject,
  onOpenCopilot,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-colors">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar menu"
          className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative max-w-xs sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects & tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />

        <Button
          size="sm"
          variant="outline"
          onClick={onOpenCopilot}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
          className="hidden sm:inline-flex"
        >
          AI Copilot
        </Button>

        <Button
          size="sm"
          variant="primary"
          onClick={onOpenCreateProject}
          id="header-create-project-btn"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Project
        </Button>
      </div>
    </header>
  );
}
