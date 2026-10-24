import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/supabase/service";

// Simple in-memory rate limiting map for lead submissions (max 5 per hour per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return false;
  }
  if (entry.count >= 10) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Static prerender handler for static exports (e.g. GitHub Pages)
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "LaunchPilot Leads API",
    methods: ["POST", "GET"],
  });
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submission attempts. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // Strict Server-Side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name cannot exceed 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (message && typeof message === "string" && message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message cannot exceed 1000 characters." },
        { status: 400 }
      );
    }

    const lead = await DatabaseService.createLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message ? message.trim() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your request for early access has been recorded.",
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          created_at: lead.created_at,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while saving your submission.",
      },
      { status: 500 }
    );
  }
}
