import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

export function getMessages(): Message[] {
  ensureDir();
  const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
  return JSON.parse(raw);
}

export function addMessage(name: string, email: string, message: string): Message {
  ensureDir();
  const messages = getMessages();
  const newMsg: Message = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMsg);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  return newMsg;
}

export function markAsRead(id: string): Message | null {
  const messages = getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = true;
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  }
  return msg || null;
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length !== messages.length) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}