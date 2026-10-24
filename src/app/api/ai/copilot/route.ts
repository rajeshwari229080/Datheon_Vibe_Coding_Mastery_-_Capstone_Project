import { NextRequest, NextResponse } from "next/server";
import { aiProvider } from "@/lib/ai/provider";
import { CopilotRequest } from "@/lib/ai/types";

// In-memory rate limiting map for AI Copilot (max 20 calls/minute per client)
const copilotRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = copilotRateLimit.get(ip);
  if (!record || now > record.resetAt) {
    copilotRateLimit.set(ip, { count: 1, resetAt: now + 60000 }); // 60s
    return false;
  }
  if (record.count >= 20) {
    return true;
  }
  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a minute before making another AI Copilot query.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { projectTitle, description, userGoal, category } = body;

    // Server-side input validation
    if (!projectTitle || typeof projectTitle !== "string" || projectTitle.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Project title must be at least 2 characters.",
        },
        { status: 400 }
      );
    }

    if (projectTitle.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Project title cannot exceed 150 characters.",
        },
        { status: 400 }
      );
    }

    if (description && typeof description === "string" && description.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Description cannot exceed 2000 characters.",
        },
        { status: 400 }
      );
    }

    if (userGoal && typeof userGoal === "string" && userGoal.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: "User goal cannot exceed 1000 characters.",
        },
        { status: 400 }
      );
    }

    const requestPayload: CopilotRequest = {
      projectTitle: projectTitle.trim(),
      description: description ? description.trim() : undefined,
      userGoal: userGoal ? userGoal.trim() : undefined,
      category: category ? category.trim() : undefined,
    };

    const result = await aiProvider.generateProjectGuidance(requestPayload);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("AI Copilot Endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI guidance. Please try again.",
      },
      { status: 500 }
    );
  }
}
