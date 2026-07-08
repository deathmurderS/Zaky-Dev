"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  GitBranch,
  Eye,
  Zap,
  Activity,
  Server,
  Clock,
} from "lucide-react";

const metrics = [
  { icon: Users, label: "Visitors Today", value: "127", change: "+12%", color: "text-blue-500" },
  { icon: GitBranch, label: "GitHub Stars", value: "25", change: "+3", color: "text-purple-500" },
  { icon: Eye, label: "Project Views", value: "1,892", change: "+18%", color: "text-emerald-500" },
  { icon: Zap, label: "API Requests", value: "3,421", change: "+8%", color: "text-amber-500" },
  { icon: Clock, label: "Response Time", value: "42ms", change: "-5ms", color: "text-cyan-500" },
  { icon: Activity, label: "Server Status", value: "Stable", change: "99.9%", color: "text-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Analytics
        </span>
        <h1 className="text-2xl font-black mt-1">Dashboard</h1>
        <p className="text-sm text-dark-400 mt-1">Real-time metrics & analytics</p>
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
              <span
                className={`text-xs font-bold ${
                  metric.change.startsWith("+") ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-black">{metric.value}</p>
            <p className="text-xs text-dark-400 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mini Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-dark-100">
          <h3 className="text-sm font-bold mb-4">Monthly Visitors</h3>
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-primary-500/20 rounded-t-sm transition-all hover:bg-primary-500/40"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[8px] text-dark-400 font-bold">
                  {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-dark-100">
          <h3 className="text-sm font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "New star on Dashboard Generator", time: "2m ago" },
              { action: "API request from unknown client", time: "15m ago" },
              { action: "Deploy: v2.1.0 to production", time: "1h ago" },
              { action: "Backup database completed", time: "3h ago" },
              { action: "SSL certificate renewed", time: "1d ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <span className="text-dark-600">{item.action}</span>
                </div>
                <span className="text-dark-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}