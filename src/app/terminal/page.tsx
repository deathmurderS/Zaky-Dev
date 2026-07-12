"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const commands: Record<string, string> = {
  help: `Available commands:
  help              - Show this message
  about             - About me
  skills            - List my skills
  projects          - Show projects
  contact           - Contact info
  github            - Open GitHub profile
  resume            - Download resume
  clear             - Clear terminal
  whoami            - Who am I?`,

  about: `Muhammad Zaky Zamzami
Backend & DevOps Engineer
Suka membangun sistem dari nol sampai production-ready.
Tidak puas di "bisa" — selalu tanya kenapa dan gimana.`,

  skills: `Technical Skills:
  • Python (FastAPI, Django)
  • Docker & Containerization
  • PostgreSQL & Database Design
  • Linux System Administration
  • Monitoring (Grafana, Prometheus)
  • CI/CD & DevOps
  • React & TypeScript`,

  projects: `Active Projects:
  1. Dashboard Generator - Auto-generate monitoring dashboards
  2. DataPulse - Real-time data analytics platform
  3. Monitoring System - Infrastructure monitoring with Prometheus/Grafana`,

  contact: `Contact Information:
  Email: zakychen558@gmail.com
  GitHub: github.com/deathmurderS
  Location: Indonesia`,

  github: `Opening GitHub profile...
  -> https://github.com/deathmurderS`,

  resume: `Downloading resume...
  -> /resume.pdf`,

  whoami: `> A problem solver who enjoys building clean, functional systems
> Always learning through practice
> Never satisfied with "good enough"`,
};

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
    { type: "output", text: "Welcome to MUZAZ.DEV Terminal v1.0.0" },
    { type: "output", text: 'Type "help" to see available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: `$ ${cmd}` }];
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[trimmed];
    if (output) {
      setHistory([...newHistory, { type: "output", text: output }]);
    } else if (trimmed === "") {
      setHistory(newHistory);
    } else {
      setHistory([
        ...newHistory,
        { type: "output", text: `Command not found: ${trimmed}. Type "help" for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Interactive
        </span>
        <h1 className="text-2xl font-black mt-1">Terminal</h1>
        <p className="text-sm text-dark-400 mt-1">Interact with my portfolio via terminal</p>
      </motion.div>

      <div
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
        className="rounded-xl border border-dark-200 bg-dark-900 text-green-400 p-4 font-mono text-xs leading-relaxed h-96 overflow-y-auto cursor-text"
      >
        {history.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-green-300" : "text-green-400/80"}>
            <pre className="whitespace-pre-wrap">{line.text}</pre>
          </div>
        ))}
        <div className="flex items-center mt-1">
          <span className="text-green-300 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-green-300 caret-green-300"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}