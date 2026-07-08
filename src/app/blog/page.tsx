"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/profile";
import { Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Writing
        </span>
        <h1 className="text-2xl font-black mt-1">Blog</h1>
        <p className="text-sm text-dark-400 mt-1">Articles, tutorials, and insights</p>
      </motion.div>

      <div className="space-y-4">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border border-dark-100 hover:border-primary-200 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 text-[10px] text-dark-400 mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
            </div>
            <h2 className="text-base font-bold mb-2 hover:text-primary-500 transition-colors">
              {post.title}
            </h2>
            <p className="text-xs text-dark-400 leading-relaxed mb-3">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded border border-dark-100 text-dark-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}