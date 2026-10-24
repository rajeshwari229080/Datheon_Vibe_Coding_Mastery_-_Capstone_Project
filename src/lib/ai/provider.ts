import { CopilotRequest, CopilotResponse } from "./types";

export interface AIProvider {
  name: string;
  generateProjectGuidance(req: CopilotRequest): Promise<CopilotResponse>;
}

export class LLMProviderService implements AIProvider {
  name = "LaunchPilot AI Engine";

  async generateProjectGuidance(req: CopilotRequest): Promise<CopilotResponse> {
    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    // If an OpenAI API key is supplied, call the live OpenAI Chat Completion API
    if (process.env.OPENAI_API_KEY) {
      try {
        return await this.callOpenAI(req, process.env.OPENAI_API_KEY);
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to deterministic synthesis:", err);
      }
    }

    // High-craft deterministic synthesizer tailored to user inputs
    return this.generateDeterministicSynthesis(req);
  }

  private async callOpenAI(req: CopilotRequest, apiKey: string): Promise<CopilotResponse> {
    const systemPrompt = `You are LaunchPilot AI, an elite Product Architect and Full-Stack Engineering Lead.
Given a user's project title, description, and goal, analyze the scope and return a JSON object strictly matching this schema:
{
  "summary": "1-2 sentence executive summary of the initiative",
  "recommendedMilestones": [
    { "phase": "Phase 1", "title": "Milestone Title", "description": "Specific deliverable description" }
  ],
  "suggestedTasks": [
    { "title": "Specific Task Name", "priority": "high|medium|low", "rationale": "Why this matters" }
  ],
  "potentialRisks": [
    { "risk": "Technical or product failure mode", "mitigation": "Clear prevention strategy", "severity": "high|medium|low" }
  ],
  "strategicAdvice": "Direct, actionable tactical guidance for the founder/developer"
}
Output only valid raw JSON without markdown markers or conversational preamble.`;

    const userPrompt = `Project: ${req.projectTitle}
Category: ${req.category || "General Software"}
Description: ${req.description || "None provided"}
Goal: ${req.userGoal || "Ship a functional, production-ready version"}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI HTTP ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const content = JSON.parse(data.choices[0].message.content);

    return {
      summary: content.summary,
      recommendedMilestones: content.recommendedMilestones || [],
      suggestedTasks: content.suggestedTasks || [],
      potentialRisks: content.potentialRisks || [],
      strategicAdvice: content.strategicAdvice,
      modelUsed: data.model || "gpt-4o-mini",
      isMock: false,
      timestamp: new Date().toISOString(),
    };
  }

  generateDeterministicSynthesis(req: CopilotRequest): CopilotResponse {
    const title = req.projectTitle || "Software Initiative";
    const desc = req.description || "";
    const isAiProject = /ai|agent|copilot|rag|llm|model/i.test(`${title} ${desc}`);
    const isClientProject = /client|portal|crm|consulting|freelance/i.test(`${title} ${desc}`);

    if (isAiProject) {
      return {
        summary: `Strategic execution plan for "${title}": Architecting a robust, resilient AI system with multi-layer fallback handling, structured output verification, and strict user isolation.`,
        recommendedMilestones: [
          {
            phase: "Phase 1: Foundation",
            title: "Core Schema & Prompt Engineering",
            description: "Define strict JSON response schemas, system guardrails, and automated validation tests.",
          },
          {
            phase: "Phase 2: Orchestration",
            title: "Secure Server-Side AI Pipeline",
            description: "Implement API rate limits, input sanitization, error recovery, and provider adapters.",
          },
          {
            phase: "Phase 3: Deployment",
            title: "Performance Benchmarking & Launch",
            description: "Validate latency metrics, set up token budgeting, and deploy with zero-downtime CI/CD.",
          },
        ],
        suggestedTasks: [
          {
            title: "Implement prompt injection defense and input character limits",
            priority: "high",
            rationale: "Prevents API abuse and token exhaustion before launching to public users.",
          },
          {
            title: "Build deterministic fallback mode for LLM provider downtime",
            priority: "high",
            rationale: "Ensures seamless user experience even if external model quotas are reached.",
          },
          {
            title: "Add response schema parsing with Zod or TypeScript type guards",
            priority: "medium",
            rationale: "Guarantees UI stability when parsing structured LLM generation results.",
          },
        ],
        potentialRisks: [
          {
            risk: "Upstream AI provider rate-limiting and quota exhaustion",
            mitigation: "Implement exponential backoff retry loops and client-facing error feedback.",
            severity: "high",
          },
          {
            risk: "High API inference latency degrading user interaction",
            mitigation: "Cache deterministic prompts and optimize prompt token length.",
            severity: "medium",
          },
        ],
        strategicAdvice:
          "Keep provider logic completely isolated behind a clean adapter interface so you can swap model providers (OpenAI, Anthropic, or local Ollama) without rewriting application business logic.",
        modelUsed: "LaunchPilot AI Synthesizer (Demo Mode)",
        isMock: true,
        timestamp: new Date().toISOString(),
      };
    }

    if (isClientProject) {
      return {
        summary: `Execution blueprint for client deliverable "${title}": Prioritizing scope clarity, milestone sign-offs, and rapid deliverable handoffs.`,
        recommendedMilestones: [
          {
            phase: "Phase 1: Alignment",
            title: "Scope Lock & Technical Specifications",
            description: "Establish wireframes, design tokens, and sign off on acceptance criteria.",
          },
          {
            phase: "Phase 2: Sprint Build",
            title: "Full-Stack Implementation",
            description: "Build core responsive views, database persistence, and integration hooks.",
          },
          {
            phase: "Phase 3: Handover",
            title: "Client UAT & Production Cutover",
            description: "Deliver walkthrough video, technical documentation, and deployment credentials.",
          },
        ],
        suggestedTasks: [
          {
            title: "Draft written acceptance criteria to lock down scope",
            priority: "high",
            rationale: "Protects both parties against unpaid scope expansion during development.",
          },
          {
            title: "Establish responsive breakpoints across mobile, tablet, and desktop",
            priority: "high",
            rationale: "Delivers a premium first impression across all stakeholder devices.",
          },
          {
            title: "Prepare video walkthrough and deployment instructions",
            priority: "medium",
            rationale: "Ensures painless sign-off and immediate client satisfaction.",
          },
        ],
        potentialRisks: [
          {
            risk: "Unplanned client feature requests expanding deliverable timeline",
            mitigation: "Log out-of-scope requests in a secondary phase backlog with transparent estimates.",
            severity: "high",
          },
          {
            risk: "Delayed client feedback during review phases",
            mitigation: "Provide staged live preview URLs with interactive test accounts.",
            severity: "medium",
          },
        ],
        strategicAdvice:
          "Deliver incremental progress in bite-sized updates rather than a single reveal. Showing working functionality early builds trust and speeds up sign-off.",
        modelUsed: "LaunchPilot AI Synthesizer (Demo Mode)",
        isMock: true,
        timestamp: new Date().toISOString(),
      };
    }

    // Default general tech product synthesis
    return {
      summary: `High-velocity engineering roadmap for "${title}": Transforming product objectives into testable, dependency-ordered sprint stages.`,
      recommendedMilestones: [
        {
          phase: "Phase 1: Architecture",
          title: "Schema Design & Technical Foundation",
          description: "Establish database relationships, data contracts, and security boundaries.",
        },
        {
          phase: "Phase 2: Core Workflows",
          title: "CRUD Operations & Application Logic",
          description: "Implement primary user journeys, state management, and real-time feedback.",
        },
        {
          phase: "Phase 3: Verification",
          title: "Testing, Hardening & Launch",
          description: "Execute automated unit tests, audit security posture, and verify production build.",
        },
      ],
      suggestedTasks: [
        {
          title: "Configure Row Level Security (RLS) on all user-owned tables",
          priority: "high",
          rationale: "Ensures multi-tenant isolation at the database layer before deployment.",
        },
        {
          title: "Implement optimistic UI updates for core task mutations",
          priority: "medium",
          rationale: "Provides instant perceived responsiveness to user interactions.",
        },
        {
          title: "Conduct automated test coverage for critical API endpoints",
          priority: "high",
          rationale: "Prevents regressions when updating business logic or dependencies.",
        },
      ],
      potentialRisks: [
        {
          risk: "Over-engineering non-core features before user validation",
          mitigation: "Focus strictly on the smallest complete end-to-end workflow.",
          severity: "high",
        },
        {
          risk: "Unhandled edge cases in form submission states",
          mitigation: "Add comprehensive client and server-side validation with clear user feedback.",
          severity: "medium",
        },
      ],
      strategicAdvice:
        "Focus on shipping a cohesive, delightful core loop. High polish on fewer features always outperforms a sprawling app full of half-implemented screens.",
      modelUsed: "LaunchPilot AI Synthesizer (Demo Mode)",
      isMock: true,
      timestamp: new Date().toISOString(),
    };
  }
}

export const aiProvider = new LLMProviderService();
