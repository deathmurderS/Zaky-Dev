"use client";

import { motion } from "framer-motion";
import { serverStatus } from "@/data/profile";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Clock,
  Container,
  Gauge,
  CheckCircle2,
} from "lucide-react";

const statusCards = [
  {
    icon: Cpu,
    label: "CPU Usage",
    value: `${serverStatus.cpu.usage}%`,
    sub: `${serverStatus.cpu.cores} cores`,
    color: "text-blue-500",
    barColor: "bg-blue-500",
    percent: serverStatus.cpu.usage,
  },
  {
    icon: MemoryStick,
    label: "RAM Usage",
    value: `${serverStatus.ram.used}/${serverStatus.ram.total} ${serverStatus.ram.unit}`,
    sub: `${((serverStatus.ram.used / serverStatus.ram.total) * 100).toFixed(0)}% used`,
    color: "text-purple-500",
    barColor: "bg-purple-500",
    percent: (serverStatus.ram.used / serverStatus.ram.total) * 100,
  },
  {
    icon: HardDrive,
    label: "Disk Usage",
    value: `${serverStatus.disk.used}/${serverStatus.disk.total} ${serverStatus.disk.unit}`,
    sub: `${serverStatus.disk.used}GB used`,
    color: "text-emerald-500",
    barColor: "bg-emerald-500",
    percent: (serverStatus.disk.used / serverStatus.disk.total) * 100,
  },
  {
    icon: Clock,
    label: "Uptime",
    value: serverStatus.uptime,
    sub: "Since last deploy",
    color: "text-amber-500",
    barColor: null,
    percent: null,
  },
  {
    icon: Container,
    label: "Docker Containers",
    value: `${serverStatus.docker.running}/${serverStatus.docker.total}`,
    sub: `${serverStatus.docker.running} running`,
    color: "text-cyan-500",
    barColor: "bg-cyan-500",
    percent: (serverStatus.docker.running / serverStatus.docker.total) * 100,
  },
  {
    icon: Gauge,
    label: "Response Time",
    value: serverStatus.responseTime,
    sub: "Average latency",
    color: "text-rose-500",
    barColor: null,
    percent: null,
  },
];

export default function StatusPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Infrastructure
        </span>
        <h1 className="text-2xl font-black mt-1">Server Status</h1>
        <p className="text-sm text-dark-400 mt-1">Real-time server monitoring</p>
      </motion.div>

      <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        <span className="text-xs font-bold text-green-700">All Systems Operational</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border border-dark-100 hover:border-primary-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <span className="text-xs text-dark-400">{card.label}</span>
            </div>
            <p className="text-lg font-black mb-1">{card.value}</p>
            <p className="text-[10px] text-dark-400 mb-3">{card.sub}</p>
            {card.percent !== null && card.barColor && (
              <div className="h-1.5 bg-dark-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${card.barColor} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(card.percent, 100)}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}