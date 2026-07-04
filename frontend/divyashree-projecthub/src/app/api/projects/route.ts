import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  return NextResponse.json({
    projects
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const title = String(payload.title ?? "Untitled Project");
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return NextResponse.json(
    {
      message: "Project created",
      project: {
        id: `mock-${Date.now()}`,
        slug,
        ...payload
      }
    },
    { status: 201 }
  );
}
