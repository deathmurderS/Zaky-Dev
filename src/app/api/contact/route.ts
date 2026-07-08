import { NextRequest, NextResponse } from "next/server";
import { addMessage, getMessages } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 }
      );
    }

    const saved = addMessage(name.trim(), email.trim(), message.trim());
    return NextResponse.json({
      success: true,
      id: saved.id,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}