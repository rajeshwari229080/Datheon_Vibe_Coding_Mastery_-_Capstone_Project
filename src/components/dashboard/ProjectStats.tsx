import React from "react";
import { FolderKanban, CheckSquare, TrendingUp, ShieldCheck, Database } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface ProjectStatsProps {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectStats({
  totalProjects,
  totalTasks,
  completedTasks,
  activeFilter,
  onFilterChange,
}: ProjectStatsProps) {
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "in-progress", label: "In Progress" },
    { id: "planning", label: "Planning" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalProjects}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Relational records</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Tasks</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalTasks}</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium block">
            {completedTasks} completed
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{completionRate}%</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Task delivery pace</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Persistence Engine</span>
            <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {isSupabaseConfigured ? "Supabase Cloud" : "Local Persist"}
          </p>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            RLS Isolation Enabled
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeFilter === f.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
