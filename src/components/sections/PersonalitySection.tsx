"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Search, Cog, Zap, Star } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="w-5 h-5" />,
  cog: <Cog className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
};

export default function PersonalitySection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase mb-2 inline-block">
          About
        </span>
        <h2 className="text-2xl font-black tracking-tight mb-3">
          {profile.personality.title}
        </h2>
        <p className="text-sm text-dark-400 leading-relaxed max-w-xl mx-auto">
          {profile.personality.description}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profile.personality.traits.map((trait, index) => (
          <motion.div
            key={trait.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-5 rounded-xl border border-dark-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-primary-500">{iconMap[trait.icon]}</span>
              <h3 className="text-sm font-bold">{trait.title}</h3>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">{trait.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}