"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, GitBranch, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nDari: ${form.name} (${form.email})`);
    window.location.href = `mailto:zakychen558@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Connect
        </span>
        <h1 className="text-2xl font-black mt-1">Contact</h1>
        <p className="text-sm text-dark-400 mt-1">Get in touch with me</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl border border-dark-100">
            <Mail className="w-4 h-4 text-primary-500 mb-2" />
            <p className="text-xs font-bold mb-1">Email</p>
            <p className="text-xs text-dark-400">zakychen558@gmail.com</p>
          </div>
          <div className="p-4 rounded-xl border border-dark-100">
            <MapPin className="w-4 h-4 text-primary-500 mb-2" />
            <p className="text-xs font-bold mb-1">Location</p>
            <p className="text-xs text-dark-400">Indonesia</p>
          </div>
          <Link
            href="https://github.com/deathmurderS"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl border border-dark-100 hover:border-primary-200 transition-all"
          >
            <GitBranch className="w-4 h-4 text-primary-500" />
            <div>
              <p className="text-xs font-bold mb-1">GitHub</p>
              <p className="text-xs text-dark-400">@deathmurderS</p>
            </div>
          </Link>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-dark-100">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-dark-600 mb-1 block">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-dark-100 rounded-lg focus:outline-none focus:border-primary-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-dark-600 mb-1 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-dark-100 rounded-lg focus:outline-none focus:border-primary-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-dark-600 mb-1 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-dark-100 rounded-lg focus:outline-none focus:border-primary-300 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}