import { NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const msg = await addMessage(name, email, message);
    return NextResponse.json({ success: true, message: msg }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}