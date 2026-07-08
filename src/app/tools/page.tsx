"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { tools } from "@/data/profile";
import { Search, Wrench } from "lucide-react";

export default function ToolsPage() {
  const [search, setSearch] = useState("");

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Free Tools
        </span>
        <h1 className="text-2xl font-black mt-1">Developer Tools</h1>
        <p className="text-sm text-dark-400 mt-1">Free online tools for developers</p>
      </motion.div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-dark-100 rounded-lg focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((tool, i) => (
          <motion.button
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 rounded-xl border border-dark-100 hover:border-primary-200 hover:bg-primary-50/50 text-left transition-all group"
          >
            <Wrench className="w-4 h-4 text-primary-500 mb-2" />
            <h3 className="text-xs font-bold mb-1">{tool.name}</h3>
            <p className="text-[10px] text-dark-400 leading-relaxed">
              {tool.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}