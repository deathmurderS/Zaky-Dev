import { NextResponse } from "next/server";
import { projects } from "@/data/profile";

export async function GET() {
  const summary = projects.map((p) => ({
    id: p.id,
    title: p.title,
    tags: p.tags,
    stars: p.stats.stars,
    description: p.description,
  }));
  return NextResponse.json(summary);
}