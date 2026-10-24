"use client";

import React from "react";
import { Database, ShieldCheck, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export function DatabaseView() {
  const tables = [
    {
      name: "profiles",
      rls: "Enabled",
      description: "Stores user profiles with automatic creation trigger on auth.users sign up.",
      columns: ["id (UUID, PK)", "display_name (TEXT)", "avatar_url (TEXT)", "role (TEXT)", "created_at (TIMESTAMPTZ)"],
      policy: "SELECT/UPDATE restricted to auth.uid() = id",
    },
    {
      name: "projects",
      rls: "Enabled",
      description: "Core project initiatives owned by authenticated users.",
      columns: ["id (UUID, PK)", "user_id (UUID, FK)", "title (TEXT)", "description (TEXT)", "status (CHECK)", "category (TEXT)"],
      policy: "ALL operations strictly gated by auth.uid() = user_id",
    },
    {
      name: "tasks",
      rls: "Enabled",
      description: "Deliverables linked to specific projects and owned by authenticated users.",
      columns: ["id (UUID, PK)", "project_id (UUID, FK)", "user_id (UUID, FK)", "title (TEXT)", "status (CHECK)", "priority (CHECK)", "due_date (TIMESTAMPTZ)"],
      policy: "ALL operations strictly gated by auth.uid() = user_id",
    },
    {
      name: "leads",
      rls: "Enabled",
      description: "Prospective early access requests submitted from landing page lead capture.",
      columns: ["id (UUID, PK)", "name (TEXT)", "email (TEXT)", "message (TEXT)", "status (CHECK)", "created_at (TIMESTAMPTZ)"],
      policy: "INSERT open to anon/authenticated; SELECT/UPDATE restricted to service_role",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={isSupabaseConfigured ? "success" : "warning"} size="sm">
                {isSupabaseConfigured ? "Live Supabase Connected" : "Local Persist Demo Mode"}
              </Badge>
              <Badge variant="purple" size="sm">PostgreSQL 16</Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Relational Schema & Row Level Security (RLS)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-tenant architecture enforcing user isolation at the PostgreSQL kernel layer
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 block">Migrations Applied</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              001_initial_schema & 002_rls
            </span>
          </div>
        </div>

        {/* Tables Breakdown */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tables.map((tbl) => (
            <div
              key={tbl.name}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    public.{tbl.name}
                  </span>
                  <Badge variant="success" size="sm">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {tbl.rls}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {tbl.description}
                </p>

                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Columns:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tbl.columns.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                <strong>RLS Policy:</strong> {tbl.policy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
