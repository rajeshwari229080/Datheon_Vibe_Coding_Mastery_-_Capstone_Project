"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  CheckSquare,
  Bot,
  Database,
  Sparkles,
  LogOut,
  ChevronRight,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/Badge";

interface SidebarProps {
  activeView: "projects" | "tasks" | "copilot" | "database";
  onSelectView: (view: "projects" | "tasks" | "copilot" | "database") => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  projectCount: number;
  taskCount: number;
}

export function Sidebar({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  projectCount,
  taskCount,
}: SidebarProps) {
  const { user, signOut } = useAuth();

  const navItems = [
    {
      id: "projects",
      label: "Projects",
      icon: <FolderKanban className="w-4 h-4" />,
      count: projectCount,
    },
    {
      id: "tasks",
      label: "Task Matrix",
      icon: <CheckSquare className="w-4 h-4" />,
      count: taskCount,
    },
    {
      id: "copilot",
      label: "AI Copilot",
      icon: <Bot className="w-4 h-4" />,
      badge: "AI 2.0",
    },
    {
      id: "database",
      label: "Database & Security",
      icon: <Database className="w-4 h-4" />,
      badge: "RLS",
    },
  ] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white/95 dark:bg-slate-950/95 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-200 md:translate-x-0 backdrop-blur-md ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand header */}
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                LaunchPilot AI
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Workspace Dashboard
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectView(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : ""}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {"count" in item && typeof item.count === "number" && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-indigo-200/60 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-bold"
                          : "bg-slate-100 dark:bg-slate-850 text-slate-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}

                  {"badge" in item && item.badge && (
                    <Badge variant={item.id === "copilot" ? "purple" : "success"} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user?.name || "Builder"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
