"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

const navItems = [
  { href: "/", label: "Profil" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Proyek" },
  { href: "/api-playground", label: "API" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/status", label: "Status" },
  { href: "/terminal", label: "Terminal" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-500 font-black tracking-[3px] text-sm uppercase"
          >
            <Terminal className="w-4 h-4" />
            MUZAZ.DEV
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-xs font-bold tracking-[2px] uppercase rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "text-primary-500 bg-primary-50"
                    : "text-dark-400 hover:text-dark-700 hover:bg-dark-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-500 hover:text-dark-800"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-dark-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 text-xs font-bold tracking-[2px] uppercase rounded-md",
                  pathname === item.href
                    ? "text-primary-500 bg-primary-50"
                    : "text-dark-400 hover:text-dark-700 hover:bg-dark-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}