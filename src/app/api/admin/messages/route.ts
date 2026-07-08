import { NextRequest, NextResponse } from "next/server";
import { getMessages, markAsRead, deleteMessage } from "@/lib/store";

// Simple auth check - use query param ?key=admin123
// In production, replace with proper JWT auth
function isAuthorized(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") === "admin123";
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = getMessages();
  return NextResponse.json({
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
    messages,
  });
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Message ID required" }, { status: 400 });
  }

  const msg = markAsRead(id);
  if (!msg) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: msg });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Message ID required" }, { status: 400 });
  }

  const deleted = deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}