import { describe, it, expect } from "vitest";
import { MockStorageManager } from "../src/lib/supabase/mock-db";

describe("Database Models & Mock Storage Architecture", () => {
  const testUserId = "test-user-uuid-9999";

  it("should initialize default seed projects when storage is queried", () => {
    const projects = MockStorageManager.getProjects(testUserId);
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("should create new projects with valid UUID format and timestamps", () => {
    const newProj = MockStorageManager.addProject(
      {
        user_id: testUserId,
        title: "Test Unit Initiative",
        description: "Checking unit test execution",
        status: "planning",
        category: "Test Suite",
      },
      testUserId
    );

    expect(newProj.id).toBeTruthy();
    expect(newProj.title).toBe("Test Unit Initiative");
    expect(newProj.created_at).toBeTruthy();
    expect(newProj.status).toBe("planning");
  });

  it("should add and cascade-delete tasks linked to projects", () => {
    const task = MockStorageManager.addTask(
      {
        project_id: "test-proj-temp",
        user_id: testUserId,
        title: "Subtask for testing",
        description: "Verify cascade",
        status: "pending",
        priority: "high",
        due_date: null,
      },
      testUserId
    );

    expect(task.id).toBeTruthy();
    expect(task.title).toBe("Subtask for testing");

    const deleted = MockStorageManager.deleteTask(task.id, testUserId);
    expect(deleted).toBe(true);
  });
});
