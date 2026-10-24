import { supabase, isSupabaseConfigured } from "./client";
import { MockStorageManager } from "./mock-db";
import { Project, Task, Lead } from "@/types/database";

export const DatabaseService = {
  // Projects
  async getProjects(userId: string): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getProjects error, falling back to local:", error.message);
        return MockStorageManager.getProjects(userId);
      }
      return data || [];
    }
    return MockStorageManager.getProjects(userId);
  },

  async createProject(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await (supabase as any)
        .from("projects")
        .insert([project])
        .select()
        .single();

      if (error) {
        console.warn("Supabase createProject error, falling back to local:", error.message);
        return MockStorageManager.addProject(project, project.user_id);
      }
      return data;
    }
    return MockStorageManager.addProject(project, project.user_id);
  },

  async updateProject(id: string, updates: Partial<Project>, userId: string): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await (supabase as any)
        .from("projects")
        .update(updates)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.warn("Supabase updateProject error, falling back to local:", error.message);
        return MockStorageManager.updateProject(id, updates, userId);
      }
      return data;
    }
    return MockStorageManager.updateProject(id, updates, userId);
  },

  async deleteProject(id: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        console.warn("Supabase deleteProject error, falling back to local:", error.message);
        return MockStorageManager.deleteProject(id, userId);
      }
      return true;
    }
    return MockStorageManager.deleteProject(id, userId);
  },

  // Tasks
  async getTasks(projectId?: string, userId: string = "00000000-0000-0000-0000-000000000001"): Promise<Task[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (projectId) {
        query = query.eq("project_id", projectId);
      }

      const { data, error } = await query;
      if (error) {
        console.warn("Supabase getTasks error, falling back to local:", error.message);
        return MockStorageManager.getTasks(projectId, userId);
      }
      return data || [];
    }
    return MockStorageManager.getTasks(projectId, userId);
  },

  async createTask(task: Omit<Task, "id" | "created_at" | "updated_at">): Promise<Task> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await (supabase as any)
        .from("tasks")
        .insert([task])
        .select()
        .single();

      if (error) {
        console.warn("Supabase createTask error, falling back to local:", error.message);
        return MockStorageManager.addTask(task, task.user_id);
      }
      return data;
    }
    return MockStorageManager.addTask(task, task.user_id);
  },

  async updateTask(id: string, updates: Partial<Task>, userId: string): Promise<Task | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await (supabase as any)
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.warn("Supabase updateTask error, falling back to local:", error.message);
        return MockStorageManager.updateTask(id, updates, userId);
      }
      return data;
    }
    return MockStorageManager.updateTask(id, updates, userId);
  },

  async deleteTask(id: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await (supabase as any)
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        console.warn("Supabase deleteTask error, falling back to local:", error.message);
        return MockStorageManager.deleteTask(id, userId);
      }
      return true;
    }
    return MockStorageManager.deleteTask(id, userId);
  },

  // Leads
  async createLead(lead: { name: string; email: string; message?: string }): Promise<Lead> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await (supabase as any)
        .from("leads")
        .insert([
          {
            name: lead.name,
            email: lead.email,
            message: lead.message || null,
            source: "landing_page",
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn("Supabase createLead error, falling back to local:", error.message);
        return MockStorageManager.addLead(lead);
      }
      return data;
    }
    return MockStorageManager.addLead(lead);
  },
};
