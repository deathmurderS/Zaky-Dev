"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/profile";
import { GitBranch, ExternalLink, BookOpen, Star, GitFork, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Portfolio
        </span>
        <h1 className="text-2xl font-black mt-1">Projects</h1>
        <p className="text-sm text-dark-400 mt-1">Live projects with demo & documentation</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-dark-100 overflow-hidden hover:border-primary-200 hover:shadow-sm transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <Link
                    href={project.links.github}
                    target="_blank"
                    className="p-1.5 rounded-md text-dark-400 hover:text-dark-700 hover:bg-dark-50 transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                  </Link>
                  <Link
                    href={project.links.demo}
                    target="_blank"
                    className="p-1.5 rounded-md text-dark-400 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href={project.links.docs}
                    target="_blank"
                    className="p-1.5 rounded-md text-dark-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <p className="text-xs text-dark-400 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded border border-dark-100 text-dark-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-dark-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" /> {project.stats.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> {project.stats.forks}
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {project.stats.issues}
                </span>
              </div>
            </div>

            <div className="px-6 py-3 bg-dark-50 border-t border-dark-100">
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-[10px] text-dark-500 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}