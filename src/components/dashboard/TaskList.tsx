"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Plus,
  Filter,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Task, Project, TaskPriority, TaskStatus } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  selectedProjectId?: string | null;
  onToggleStatus: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenCreateTask: (projectId?: string) => void;
}

export function TaskList({
  tasks,
  projects,
  selectedProjectId,
  onToggleStatus,
  onDeleteTask,
  onOpenCreateTask,
}: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const projectMap = new Map(projects.map((p) => [p.id, p.title]));

  const filteredTasks = tasks.filter((t) => {
    if (selectedProjectId && t.project_id !== selectedProjectId) return false;
    if (statusFilter === "pending" && t.status !== "pending") return false;
    if (statusFilter === "in-progress" && t.status !== "in-progress") return false;
    if (statusFilter === "completed" && t.status !== "completed") return false;
    return true;
  });

  const priorityVariants = {
    low: "info",
    medium: "warning",
    high: "danger",
  } as const;

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {selectedProjectId
              ? `Tasks for "${projectMap.get(selectedProjectId) || "Project"}"`
              : "All Project Tasks"}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ({filteredTasks.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onOpenCreateTask(selectedProjectId || undefined)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            id="tasklist-add-task-btn"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Tasks List Container */}
      {filteredTasks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
          <Clock className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No tasks found
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your first milestone deliverable or ask the AI Copilot to generate a roadmap.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenCreateTask(selectedProjectId || undefined)}
            className="mt-4"
          >
            Create Task Now
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => {
            const isDone = task.status === "completed";
            return (
              <div
                key={task.id}
                className={`flex items-start justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                  isDone
                    ? "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/50 opacity-70"
                    : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(task)}
                    aria-label={`Mark task ${isDone ? "incomplete" : "complete"}`}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 pr-2">
                    <p
                      className={`text-xs sm:text-sm font-semibold ${
                        isDone
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {!selectedProjectId && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {projectMap.get(task.project_id) || "Project"}
                        </span>
                      )}

                      <Badge variant={priorityVariants[task.priority]} size="sm">
                        {task.priority}
                      </Badge>

                      {task.due_date && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(task.due_date)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteTask(task.id)}
                  aria-label="Delete task"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
