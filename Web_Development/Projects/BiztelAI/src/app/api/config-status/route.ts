import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenaiKey = !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "mock-key" && process.env.OPENAI_API_KEY.trim() !== "";
  return NextResponse.json({ hasOpenaiKey });
}
