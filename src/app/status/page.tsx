"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu, MemoryStick, HardDrive, Clock, Container, Gauge, CheckCircle2, RefreshCw, AlertTriangle
} from "lucide-react";

type ServerData = {
  cpu: { usage: number; cores: number };
  ram: { used: number; total: number; unit: string };
  disk: { used: number; total: number; unit: string };
  uptime: string;
  docker: { running: number; total: number };
  responseTime: string;
  hostname: string;
  platform: string;
  updatedAt: string;
};

export default function StatusPage() {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/status");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center py-20 text-dark-400">
          <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin" />
          <p className="text-sm">Fetching server status...</p>
        </div>
      </div>
    );
  }

  const statusCards = data ? [
    {
      icon: Cpu, label: "CPU Usage",
      value: `${data.cpu.usage}%`, sub: `${data.cpu.cores} cores`,
      color: "text-blue-500", barColor: "bg-blue-500", percent: data.cpu.usage,
    },
    {
      icon: MemoryStick, label: "RAM Usage",
      value: `${data.ram.used}/${data.ram.total} ${data.ram.unit}`,
      sub: `${Math.round((data.ram.used / data.ram.total) * 100)}% used`,
      color: "text-purple-500", barColor: "bg-purple-500",
      percent: (data.ram.used / data.ram.total) * 100,
    },
    {
      icon: HardDrive, label: "Disk Usage",
      value: `${data.disk.used}/${data.disk.total} ${data.disk.unit}`,
      sub: `${data.disk.used}GB used`,
      color: "text-emerald-500", barColor: "bg-emerald-500",
      percent: (data.disk.used / data.disk.total) * 100,
    },
    {
      icon: Clock, label: "Uptime", value: data.uptime,
      sub: `Host: ${data.hostname}`, color: "text-amber-500",
      barColor: null, percent: null,
    },
    {
      icon: Container, label: "Docker Containers",
      value: `${data.docker.running}/${data.docker.total}`,
      sub: `${data.docker.running} running`, color: "text-cyan-500",
      barColor: "bg-cyan-500",
      percent: data.docker.total > 0 ? (data.docker.running / data.docker.total) * 100 : 0,
    },
    {
      icon: Gauge, label: "Response Time", value: data.responseTime,
      sub: `Platform: ${data.platform}`, color: "text-rose-500",
      barColor: null, percent: null,
    },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">Infrastructure</span>
            <h1 className="text-2xl font-black mt-1">Server Status</h1>
            <p className="text-sm text-dark-400 mt-1">
              Real-time data from this server • auto-refresh 30s
              {data && ` • Last: ${new Date(data.updatedAt).toLocaleTimeString("id-ID")}`}
            </p>
          </div>
          <button onClick={fetchStatus}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </motion.div>

      {error ? (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-red-700">Failed to fetch server data. Make sure the dev server is running.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-green-700">All Systems Operational</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusCards.map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
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
                <div className={`h-full ${card.barColor} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(card.percent, 100)}%` }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
