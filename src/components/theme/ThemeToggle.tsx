"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 animate-in fade-in zoom-in-75 duration-200" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
