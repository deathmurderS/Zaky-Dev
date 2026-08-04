"use client";

import { motion } from "framer-motion";
import {
  Users, GitBranch, Eye, Zap, Clock, Activity
} from "lucide-react";

const metrics = [
  { icon: Users, label: "Visitors Today", value: "1.2K", change: "This week", color: "text-blue-500" },
  { icon: GitBranch, label: "GitHub Repos", value: "12", change: "Public repos", color: "text-purple-500" },
  { icon: Eye, label: "Profile Views", value: "3.4K", change: "Total views", color: "text-emerald-500" },
  { icon: Zap, label: "Uptime", value: "99.9%", change: "Last 30 days", color: "text-amber-500" },
  { icon: Clock, label: "Response Time", value: "< 50ms", change: "Average", color: "text-cyan-500" },
  { icon: Activity, label: "Status", value: "Active", change: "All systems go", color: "text-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
              Analytics
            </span>
            <h1 className="text-2xl font-black mt-1">Dashboard</h1>
            <p className="text-sm text-dark-400 mt-1">
              Overview of portfolio performance
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border border-dark-100 hover:border-primary-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-[10px] font-bold text-dark-400">{metric.change}</span>
            </div>
            <p className="text-2xl font-black">
              {metric.value}
            </p>
            <p className="text-xs text-dark-400 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}