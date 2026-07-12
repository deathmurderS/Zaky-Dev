import { Terminal, GitBranch, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark-100 bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-dark-500">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[3px] uppercase">
              MUZAZ.DEV &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/deathmurderS"
              target="_blank"
              className="text-dark-400 hover:text-dark-700 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="text-dark-400 hover:text-dark-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="text-dark-400 hover:text-dark-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-dark-400">
              Status
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}