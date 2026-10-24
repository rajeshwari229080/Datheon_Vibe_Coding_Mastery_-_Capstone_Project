"use client";

import React from "react";
import {
  FolderGit2,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Project, Task } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onSelect: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onOpenCopilot: (project: Project) => void;
}

export function ProjectCard({
  project,
  tasks,
  onSelect,
  onEdit,
  onDelete,
  onOpenCopilot,
}: ProjectCardProps) {
  const projectTasks = tasks.filter((t) => t.project_id === project.id);
  const completedTasks = projectTasks.filter((t) => t.status === "completed");
  const progressPercent =
    projectTasks.length > 0
      ? Math.round((completedTasks.length / projectTasks.length) * 100)
      : 0;

  const statusVariant = {
    planning: "info",
    "in-progress": "warning",
    completed: "success",
    archived: "neutral",
  } as const;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Card Top */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusVariant[project.status]} size="sm">
              {project.status}
            </Badge>
            {project.category && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {project.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onEdit(project)}
              aria-label="Edit project"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(project)}
              aria-label="Delete project"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title and Description */}
        <h3
          onClick={() => onSelect(project)}
          className="text-base font-bold text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
        >
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {project.description || "No project description provided."}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-slate-500 dark:text-slate-400">
            <span>Execution Progress</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {completedTasks.length}/{projectTasks.length} tasks ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(project.created_at)}
        </span>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onOpenCopilot(project)}
            leftIcon={<Sparkles className="w-3 h-3 text-indigo-500" />}
            className="text-xs h-7 px-2"
          >
            Ask AI
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onSelect(project)}
            rightIcon={<ArrowRight className="w-3 h-3" />}
            className="text-xs h-7 px-2.5"
          >
            Tasks
          </Button>
        </div>
      </div>
    </div>
  );
}
