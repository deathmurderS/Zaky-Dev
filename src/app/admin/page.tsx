"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, CheckCheck, Lock, Eye, EyeOff, RefreshCw, KeyRound } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 401) throw new Error("Invalid admin key");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessages(data.messages);
      setStats({ total: data.total, unread: data.unread });
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setErrorMsg(err instanceof Error ? err.message : "Unauthorized");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-dark-100 text-center">
          <Lock className="w-8 h-8 text-primary-500 mx-auto mb-3" />
          <h1 className="text-lg font-black mb-2">Admin Panel</h1>
          <p className="text-xs text-dark-400 mb-4">Masuk dengan admin key untuk melihat pesan</p>
          <div className="flex items-center gap-2 mb-3">
            <input type={showKey ? "text" : "password"} value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchMessages()}
              placeholder="Admin key..."
              className="flex-1 px-3 py-2 text-sm border border-dark-100 rounded-lg focus:outline-none focus:border-primary-300"
            />
            <button onClick={() => setShowKey(!showKey)} className="p-2 text-dark-400 hover:text-dark-700">
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errorMsg && <p className="text-xs text-red-500 mb-3">{errorMsg}</p>}
          <button onClick={fetchMessages} disabled={!key || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 disabled:opacity-50">
            {loading ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Checking...</>
              : <><KeyRound className="w-3.5 h-3.5" /> Access Panel</>}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">Admin</span>
            <h1 className="text-2xl font-black mt-1">Messages</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-dark-400"><span className="font-bold text-primary-500">{stats.unread}</span> unread</p>
              <p className="text-xs text-dark-400"><span className="font-bold">{stats.total}</span> total</p>
            </div>
            <button onClick={fetchMessages} className="p-2 text-dark-400 hover:text-dark-700 rounded-lg hover:bg-dark-50">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-dark-400">
          <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border transition-all ${msg.read ? "border-dark-100 bg-white" : "border-primary-200 bg-primary-50"}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{msg.name}</span>
                    {!msg.read && <span className="text-[8px] font-bold text-primary-500 bg-primary-100 px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>}
                  </div>
                  <p className="text-[10px] text-dark-400">{msg.email}</p>
                </div>
                <div className="flex items-center gap-1">
                  {!msg.read && <button onClick={() => markAsRead(msg.id)} className="p-1.5 text-dark-400 hover:text-primary-500 rounded" title="Mark as read"><CheckCheck className="w-3.5 h-3.5" /></button>}
                  <button onClick={() => deleteMsg(msg.id)} className="p-1.5 text-dark-400 hover:text-red-500 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-dark-600 leading-relaxed mb-2">{msg.message}</p>
              <p className="text-[9px] text-dark-400">{new Date(msg.createdAt).toLocaleString("id-ID")}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
