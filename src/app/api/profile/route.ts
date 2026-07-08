import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

export async function GET() {
  return NextResponse.json({
    name: profile.name,
    role: profile.role,
    skills: profile.techStack.map((t) => t.name),
    location: profile.location,
    email: profile.email,
    social: profile.social,
  });
}