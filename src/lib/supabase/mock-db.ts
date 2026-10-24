import { Project, Task, Lead, Profile } from "@/types/database";

const DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000001";

const SEED_PROJECTS: Project[] = [
  {
    id: "proj-101",
    user_id: DEFAULT_USER_ID,
    title: "AI Capstone Micro-SaaS Platform",
    description: "LaunchPilot AI - full-stack workspace with Supabase persistence and AI copilot.",
    status: "in-progress",
    category: "SaaS Application",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-102",
    user_id: DEFAULT_USER_ID,
    title: "Freelance Client Brand Portal",
    description: "High-converting web portal with modern typography and client lead tracking.",
    status: "planning",
    category: "Client Work",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-103",
    user_id: DEFAULT_USER_ID,
    title: "Autonomous Agent Evaluator",
    description: "Tool-calling reliability benchmark suite for enterprise LLM agents.",
    status: "completed",
    category: "AI Research",
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_TASKS: Task[] = [
  {
    id: "task-1",
    project_id: "proj-101",
    user_id: DEFAULT_USER_ID,
    title: "Implement responsive SaaS landing page with dark/light mode",
    description: "Build Navbar, Hero, Preview, Bento Features, Workflow, Benefits, and FAQ",
    status: "completed",
    priority: "high",
    due_date: new Date(Date.now() + 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-2",
    project_id: "proj-101",
    user_id: DEFAULT_USER_ID,
    title: "Design PostgreSQL schema and Supabase RLS policies",
    description: "Define profiles, projects, tasks, and leads tables with user isolation",
    status: "completed",
    priority: "high",
    due_date: new Date(Date.now() + 3 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-3",
    project_id: "proj-101",
    user_id: DEFAULT_USER_ID,
    title: "Orchestrate server-side AI Project Copilot route",
    description: "Build provider adapter with structured roadmap, risks & task recommendations",
    status: "in-progress",
    priority: "high",
    due_date: new Date(Date.now() + 4 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-4",
    project_id: "proj-101",
    user_id: DEFAULT_USER_ID,
    title: "Run automated test suites and verify production build",
    description: "Execute Vitest unit tests, check edge cases, and verify Vercel deployment readiness",
    status: "pending",
    priority: "medium",
    due_date: new Date(Date.now() + 6 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export class MockStorageManager {
  private static isClient() {
    return typeof window !== "undefined";
  }

  static getProjects(userId: string = DEFAULT_USER_ID): Project[] {
    if (!this.isClient()) return SEED_PROJECTS;
    const stored = localStorage.getItem(`launchpilot_projects_${userId}`);
    if (!stored) {
      localStorage.setItem(`launchpilot_projects_${userId}`, JSON.stringify(SEED_PROJECTS));
      return SEED_PROJECTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return SEED_PROJECTS;
    }
  }

  static saveProjects(projects: Project[], userId: string = DEFAULT_USER_ID) {
    if (!this.isClient()) return;
    localStorage.setItem(`launchpilot_projects_${userId}`, JSON.stringify(projects));
  }

  static addProject(project: Omit<Project, "id" | "created_at" | "updated_at">, userId: string = DEFAULT_USER_ID): Project {
    const list = this.getProjects(userId);
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(newProj);
    this.saveProjects(list, userId);
    return newProj;
  }

  static updateProject(id: string, updates: Partial<Project>, userId: string = DEFAULT_USER_ID): Project | null {
    const list = this.getProjects(userId);
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    this.saveProjects(list, userId);
    return list[index];
  }

  static deleteProject(id: string, userId: string = DEFAULT_USER_ID): boolean {
    const list = this.getProjects(userId);
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    this.saveProjects(filtered, userId);

    // Cascade delete tasks
    const tasks = this.getTasks(undefined, userId);
    const remainingTasks = tasks.filter((t) => t.project_id !== id);
    this.saveTasks(remainingTasks, userId);
    return true;
  }

  // Tasks
  static getTasks(projectId?: string, userId: string = DEFAULT_USER_ID): Task[] {
    if (!this.isClient()) return SEED_TASKS;
    const stored = localStorage.getItem(`launchpilot_tasks_${userId}`);
    let tasks: Task[] = SEED_TASKS;
    if (stored) {
      try {
        tasks = JSON.parse(stored);
      } catch {
        tasks = SEED_TASKS;
      }
    } else {
      localStorage.setItem(`launchpilot_tasks_${userId}`, JSON.stringify(SEED_TASKS));
    }

    if (projectId) {
      return tasks.filter((t) => t.project_id === projectId);
    }
    return tasks;
  }

  static saveTasks(tasks: Task[], userId: string = DEFAULT_USER_ID) {
    if (!this.isClient()) return;
    localStorage.setItem(`launchpilot_tasks_${userId}`, JSON.stringify(tasks));
  }

  static addTask(task: Omit<Task, "id" | "created_at" | "updated_at">, userId: string = DEFAULT_USER_ID): Task {
    const list = this.getTasks(undefined, userId);
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(newTask);
    this.saveTasks(list, userId);
    return newTask;
  }

  static updateTask(id: string, updates: Partial<Task>, userId: string = DEFAULT_USER_ID): Task | null {
    const list = this.getTasks(undefined, userId);
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    this.saveTasks(list, userId);
    return list[index];
  }

  static deleteTask(id: string, userId: string = DEFAULT_USER_ID): boolean {
    const list = this.getTasks(undefined, userId);
    const filtered = list.filter((t) => t.id !== id);
    if (filtered.length === list.length) return false;
    this.saveTasks(filtered, userId);
    return true;
  }

  // Leads
  static addLead(lead: { name: string; email: string; message?: string }): Lead {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: lead.name,
      email: lead.email,
      message: lead.message || null,
      source: "landing_page",
      status: "new",
      created_at: new Date().toISOString(),
    };
    if (this.isClient()) {
      const stored = localStorage.getItem("launchpilot_leads") || "[]";
      try {
        const list = JSON.parse(stored);
        list.unshift(newLead);
        localStorage.setItem("launchpilot_leads", JSON.stringify(list));
      } catch {}
    }
    return newLead;
  }
}
