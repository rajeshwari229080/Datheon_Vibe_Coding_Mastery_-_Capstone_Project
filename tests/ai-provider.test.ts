import { describe, it, expect } from "vitest";
import { LLMProviderService } from "../src/lib/ai/provider";

describe("LLMProviderService & Copilot Schema Synthesis", () => {
  const service = new LLMProviderService();

  it("should synthesize structured guidance with required schema fields for AI initiatives", () => {
    const result = service.generateDeterministicSynthesis({
      projectTitle: "Autonomous AI Research Agent",
      description: "Evaluating multi-turn tool calling and memory benchmarks",
      category: "AI Research",
    });

    expect(result).toBeDefined();
    expect(result.summary).toContain("Autonomous AI Research Agent");
    expect(Array.isArray(result.recommendedMilestones)).toBe(true);
    expect(result.recommendedMilestones.length).toBeGreaterThan(0);
    expect(Array.isArray(result.suggestedTasks)).toBe(true);
    expect(result.suggestedTasks.length).toBeGreaterThan(0);
    expect(Array.isArray(result.potentialRisks)).toBe(true);
    expect(result.potentialRisks.length).toBeGreaterThan(0);
    expect(result.strategicAdvice).toBeTruthy();
    expect(result.isMock).toBe(true);
  });

  it("should output valid priority levels for suggested tasks", () => {
    const result = service.generateDeterministicSynthesis({
      projectTitle: "Freelance Client Portal",
      description: "Client contract management and invoice tracking",
    });

    const validPriorities = ["high", "medium", "low"];
    for (const task of result.suggestedTasks) {
      expect(validPriorities).toContain(task.priority);
      expect(task.title.length).toBeGreaterThan(5);
      expect(task.rationale.length).toBeGreaterThan(5);
    }
  });

  it("should identify risk mitigations with severity classifications", () => {
    const result = service.generateDeterministicSynthesis({
      projectTitle: "General Capstone Project",
      description: "A student capstone web application",
    });

    for (const risk of result.potentialRisks) {
      expect(["high", "medium", "low"]).toContain(risk.severity);
      expect(risk.risk).toBeTruthy();
      expect(risk.mitigation).toBeTruthy();
    }
  });
});
