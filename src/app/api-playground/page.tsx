"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Play, Terminal } from "lucide-react";

const endpoints = [
  {
    method: "GET",
    path: "/api/profile",
    desc: "Get profile information",
    response: `{
  "name": "Muhammad Zaky Zamzami",
  "role": "Backend & DevOps Engineer",
  "skills": ["Python", "Docker", "Linux", "PostgreSQL"],
  "location": "Indonesia"
}`,
  },
  {
    method: "GET",
    path: "/api/projects",
    desc: "Get all projects",
    response: `[
  {
    "id": "dashboard-generator",
    "title": "Dashboard Generator",
    "tags": ["Python", "FastAPI", "Docker"],
    "stars": 12
  },
  {
    "id": "datapulse",
    "title": "DataPulse",
    "tags": ["Python", "FastAPI", "PostgreSQL"],
    "stars": 8
  }
]`,
  },
  {
    method: "GET",
    path: "/api/tools",
    desc: "Get available tools",
    response: `[
  "csv-to-json",
  "json-formatter",
  "uuid-generator",
  "password-generator",
  "base64-encode",
  "base64-decode"
]`,
  },
];

export default function ApiPlaygroundPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Developer
        </span>
        <h1 className="text-2xl font-black mt-1">API Playground</h1>
        <p className="text-sm text-dark-400 mt-1">
          Try the API directly from your browser
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {endpoints.map((ep, i) => (
            <button
              key={ep.path}
              onClick={() => setSelectedEndpoint(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedEndpoint === i
                  ? "border-primary-200 bg-primary-50"
                  : "border-dark-100 hover:border-dark-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {ep.method}
                </span>
                <span className="text-xs font-mono text-dark-700">{ep.path}</span>
              </div>
              <p className="text-[10px] text-dark-400">{ep.desc}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-dark-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-dark-50 border-b border-dark-100">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-dark-400" />
                <span className="text-xs font-bold text-dark-500">Response</span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(endpoints[selectedEndpoint].response, selectedEndpoint)
                }
                className="flex items-center gap-1 text-xs text-dark-400 hover:text-dark-700 transition-colors"
              >
                {copiedIndex === selectedEndpoint ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedIndex === selectedEndpoint ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
              <code>{endpoints[selectedEndpoint].response}</code>
            </pre>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-dark-100 bg-dark-50">
            <p className="text-xs text-dark-500 flex items-center gap-2">
              <Play className="w-3 h-3" />
              Try it:{" "}
              <code className="text-primary-500 font-mono">
                {typeof window !== "undefined" ? `curl ${window.location.origin}${endpoints[selectedEndpoint].path}` : `curl https://muzaz.dev${endpoints[selectedEndpoint].path}`}
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}