"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu, MemoryStick, HardDrive, Clock, Container, Gauge,
  CheckCircle2, RefreshCw, AlertTriangle, Info
} from "lucide-react";

type ServerData = {
  environment: string;
  cpu: { usage: number | string; cores: number; note?: string };
  ram: { used: number | string; total: number | string; unit: string; note?: string };
  disk: { used: number | string; total: number | string };
  uptime: string;
  docker: { running: number | string; total: number | string };
  responseTime: string;
  hostname: string;
  platform: string;
  vercel?: { region: string; environment: string };
  updatedAt: string;
};

function isNumeric(v: any): boolean {
  return typeof v === "number" || (typeof v === "string" && !isNaN(Number(v)) && v !== "N/A");
}

export default function StatusPage() {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStatus = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch("/api/status");
      if (!res.ok) throw Error("x");
      setData(await res.json());
    } catch { setError(true); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStatus(); const i = setInterval(fetchStatus, 30000); return () => clearInterval(i); }, []);

  if (loading && !data) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center py-20 text-dark-400">
        <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin" />
        <p className="text-sm">Fetching server status...</p>
      </div>
    </div>
  );

  const cp = isNumeric(data?.cpu.usage) ? Number(data?.cpu.usage) : null;
  const rp = isNumeric(data?.ram.used) && isNumeric(data?.ram.total)
    ? (Number(data?.ram.used) / Number(data?.ram.total)) * 100 : null;
  const dp = isNumeric(data?.disk.used) && isNumeric(data?.disk.total)
    ? (Number(String(data?.disk.used).replace(" GB","")) / Number(String(data?.disk.total).replace(" GB",""))) * 100 : null;
  const dop = isNumeric(data?.docker.running) && isNumeric(data?.docker.total) && Number(data?.docker.total) > 0
    ? (Number(data?.docker.running) / Number(data?.docker.total)) * 100 : null;

  const cards = [
    { icon: Cpu, label: "CPU Usage", value: data?.cpu.usage?.toString() || "—",
      sub: `${data?.cpu.cores || "?"} cores`, color: "text-blue-500", barColor: "bg-blue-500", percent: cp },
    { icon: MemoryStick, label: "RAM Usage",
      value: data?.ram.used && isNumeric(data.ram.used) ? `${data.ram.used}/${data.ram.total} ${data.ram.unit}` : (data?.ram.used?.toString() || "N/A"),
      sub: data?.ram.note || `${rp ? Math.round(rp) : "?"}% used`, color: "text-purple-500", barColor: "bg-purple-500", percent: rp },
    { icon: HardDrive, label: "Disk Usage", value: data?.disk.used?.toString() || "—",
      sub: `Total: ${data?.disk.total || "N/A"}`, color: "text-emerald-500", barColor: "bg-emerald-500", percent: dp },
    { icon: Clock, label: "Uptime", value: data?.uptime || "—",
      sub: `Host: ${data?.hostname || "—"}`, color: "text-amber-500", barColor: null, percent: null },
    { icon: Container, label: "Docker", value: data?.docker ? `${data.docker.running}/${data.docker.total}` : "—",
      sub: `${data?.docker?.running || 0} running`, color: "text-cyan-500", barColor: "bg-cyan-500", percent: dop },
    { icon: Gauge, label: "Response", value: data?.responseTime || "—",
      sub: data?.environment || data?.platform || "—", color: "text-rose-500", barColor: null, percent: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">Infrastructure</span>
            <h1 className="text-2xl font-black mt-1">Server Status</h1>
            <p className="text-sm text-dark-400 mt-1">
              {data ? `Running on ${data.environment} • refresh 30s • ${new Date(data.updatedAt).toLocaleTimeString("id-ID")}`
                : "Real-time data from this server"}
            </p>
          </div>
          <button onClick={fetchStatus}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </motion.div>

      {data?.environment?.toLowerCase().includes("vercel") && (
        <div className="flex items-start gap-2 mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-700">Running on Vercel — limited OS data</p>
            <p className="text-[10px] text-blue-600 mt-0.5">
              CPU/RAM/Disk tidak akurat di serverless. Deploy ke VPS untuk data real.
              {data?.vercel && ` Region: ${data.vercel.region} • ${data.vercel.environment}`}
            </p>
          </div>
        </div>
      )}

      {error ? (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-red-700">Gagal fetch data server.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-green-700">All Systems Operational</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border border-dark-100 hover:border-primary-200 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <c.icon className={`w-5 h-5 ${c.color}`} />
              <span className="text-xs text-dark-400">{c.label}</span>
            </div>
            <p className="text-lg font-black mb-1">{c.value}</p>
            <p className="text-[10px] text-dark-400 mb-3">{c.sub}</p>
            {c.percent !== null && c.barColor && (
              <div className="h-1.5 bg-dark-100 rounded-full overflow-hidden">
                <div className={`h-full ${c.barColor} rounded-full transition-all`}
                  style={{ width: `${Math.min(c.percent, 100)}%` }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
