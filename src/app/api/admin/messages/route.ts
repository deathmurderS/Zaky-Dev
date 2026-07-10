import { NextRequest, NextResponse } from "next/server";
import { getMessages, markAsRead, deleteMessage } from "@/lib/store";

function isAuthorized(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") === "admin123";
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    return NextResponse.json({
      total: messages.length,
      unread: messages.filter((m) => !m.read).length,
      messages,
    });
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    const msg = await markAsRead(id);
    if (!msg) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: msg });
  } catch (error) {
    console.error("Admin PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    const deleted = await deleteMessage(id);
    if (!deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
