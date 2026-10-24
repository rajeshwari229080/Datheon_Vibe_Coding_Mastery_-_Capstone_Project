export interface CopilotRequest {
  projectTitle: string;
  description?: string;
  userGoal?: string;
  category?: string;
}

export interface Milestone {
  phase: string;
  title: string;
  description: string;
}

export interface SuggestedTask {
  title: string;
  priority: "high" | "medium" | "low";
  rationale: string;
}

export interface PotentialRisk {
  risk: string;
  mitigation: string;
  severity: "high" | "medium" | "low";
}

export interface CopilotResponse {
  summary: string;
  recommendedMilestones: Milestone[];
  suggestedTasks: SuggestedTask[];
  potentialRisks: PotentialRisk[];
  strategicAdvice: string;
  modelUsed: string;
  isMock: boolean;
  timestamp: string;
}
