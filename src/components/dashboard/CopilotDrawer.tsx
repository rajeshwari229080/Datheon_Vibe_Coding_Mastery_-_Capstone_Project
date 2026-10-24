"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  AlertTriangle,
  Target,
  Layers,
  ArrowRight,
  Plus,
  CheckCircle2,
  X,
  ShieldCheck,
  Send,
} from "lucide-react";
import { Project, Task } from "@/types/database";
import { CopilotResponse } from "@/lib/ai/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  selectedProject?: Project | null;
  onAddTaskFromCopilot: (projectId: string, title: string, priority: "high" | "medium" | "low") => void;
}

export function CopilotDrawer({
  isOpen,
  onClose,
  projects,
  selectedProject,
  onAddTaskFromCopilot,
}: CopilotDrawerProps) {
  const [projectId, setProjectId] = useState(selectedProject?.id || projects[0]?.id || "");
  const [customGoal, setCustomGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CopilotResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedTasks, setAddedTasks] = useState<Record<string, boolean>>({});

  const currentProject = projects.find((p) => p.id === projectId) || selectedProject;

  const handleGenerate = async () => {
    if (!currentProject && !customGoal.trim()) {
      setError("Please select a project or enter an initiative title");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      projectTitle: currentProject?.title || customGoal,
      description: currentProject?.description || undefined,
      category: currentProject?.category || "SaaS Application",
      userGoal: customGoal || undefined,
    };

    try {
      try {
        const res = await fetch("/api/ai/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setResult(json.data);
            setAddedTasks({});
            return;
          }
        }
      } catch {
        // Fallback for static hosts (GitHub Pages) where /api/ai/copilot is not a live server
      }

      // Client-side fallback to deterministic synthesizer
      const { aiProvider } = await import("@/lib/ai/provider");
      const fallbackResult = await aiProvider.generateProjectGuidance(payload);
      setResult(fallbackResult);
      setAddedTasks({});
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "AI Copilot request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = (taskTitle: string, priority: "high" | "medium" | "low", index: number) => {
    const targetPid = currentProject?.id || projects[0]?.id;
    if (targetPid) {
      onAddTaskFromCopilot(targetPid, taskTitle, priority);
      setAddedTasks((prev) => ({ ...prev, [index]: true }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shadow-2xl z-10 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Intelligent Project Copilot
                  <Badge variant="purple" size="sm">v2.0</Badge>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  AI-orchestrated roadmap, risks, and prioritized tasks
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close copilot drawer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Configuration Form */}
          <div className="py-4 space-y-3">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {projects.length > 0 && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Project Context
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.status})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Specific Goal or Challenge (Optional)
              </label>
              <Input
                placeholder="e.g. Break down MVP into 3 sprint milestones with zero database leakage"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
              />
            </div>

            <Button
              variant="primary"
              onClick={handleGenerate}
              isLoading={loading}
              id="copilot-generate-btn"
              leftIcon={<Bot className="w-4 h-4" />}
              className="w-full"
            >
              Generate AI Strategy & Actionable Tasks
            </Button>
          </div>

          {/* Results Area */}
          {result && (
            <div className="mt-4 space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
              {/* Executive Summary */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Strategic Assessment
                  </span>
                  <Badge variant={result.isMock ? "neutral" : "success"} size="sm">
                    {result.modelUsed}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {result.summary}
                </p>
              </div>

              {/* Recommended Milestones */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-violet-500" />
                  Recommended Milestones
                </h3>
                <div className="space-y-2.5">
                  {result.recommendedMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="purple" size="sm">{m.phase}</Badge>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {m.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Actionable Tasks */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Suggested High-Impact Tasks
                </h3>
                <div className="space-y-2">
                  {result.suggestedTasks.map((t, idx) => {
                    const isAdded = addedTasks[idx];
                    return (
                      <div
                        key={idx}
                        className="flex items-start justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={t.priority === "high" ? "danger" : t.priority === "medium" ? "warning" : "info"}
                              size="sm"
                            >
                              {t.priority}
                            </Badge>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">
                              {t.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            {t.rationale}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant={isAdded ? "secondary" : "outline"}
                          disabled={isAdded}
                          onClick={() => handleAddTask(t.title, t.priority, idx)}
                          leftIcon={isAdded ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3" />}
                          className="h-7 text-xs px-2 shrink-0"
                        >
                          {isAdded ? "Added" : "Add Task"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Identified Failure Risks */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Failure Modes & Mitigations
                </h3>
                <div className="space-y-2">
                  {result.potentialRisks.map((r, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="warning" size="sm">{r.severity} risk</Badge>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {r.risk}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        <strong>Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Advice */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  Architect's Closing Guidance
                </span>
                {result.strategicAdvice}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Multi-Provider Adapter Protected
          </span>
          <Button size="sm" variant="ghost" onClick={onClose} className="text-xs h-7">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
