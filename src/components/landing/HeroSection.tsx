"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Left - Character Image */}
        <div className="relative bg-primary-50 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 left-0 pointer-events-none select-none text-[100px] font-black italic text-primary-500/5 leading-[0.88] whitespace-nowrap">
            RYO<br />RYO<br />RYO
          </div>

          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100/80 border border-primary-200 rounded text-[9px] font-black tracking-[2px] uppercase text-primary-500">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
              My Bini Gweh
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex-1 flex items-center justify-center p-4"
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              <Image
                src="/ryo-character.jpg"
                alt="Ryo Yamada - Bocchi the Rock"
                fill
                className="object-contain object-bottom drop-shadow-lg"
                priority
              />
            </div>
          </motion.div>

          <div className="relative z-10 px-4 pb-4 bg-gradient-to-t from-primary-50 via-primary-50/90 to-transparent">
            <p className="text-[10px] text-dark-400 font-noto mb-1">山田リョウ — Bassist of Kessoku Band</p>
            <p className="text-xs font-bold text-dark-700 uppercase tracking-wider">
              Bocchi the Rock!<br />
              <span className="text-[10px] font-normal text-dark-400">ぼっち・ざ・ろっく！</span>
            </p>
          </div>
        </div>

        {/* Right - Profile */}
        <div className="relative bg-primary-500 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 pointer-events-none select-none text-[96px] font-black italic text-white/5 leading-[0.88] writing-vertical-rl">
            ZAMZAMI
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl font-black italic leading-[1] tracking-tight border-b-2 border-white/25 pb-2 mb-2">
                MUHAMMAD<br />ZAKY
              </h1>
              <p className="text-xs text-white/60 font-noto mb-4 tracking-wider">
                ムハンマド ザキ ザムザミ
              </p>
              <p className="text-xs font-light leading-relaxed text-white/80 max-w-sm">
                {profile.bio}
                <br /><br />
                Fokus: {profile.focus}
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 mt-4">
            <p className="text-[10px] font-bold tracking-[3px] text-white/50 uppercase mb-1">Current Role</p>
            <p className="text-sm font-black tracking-wider uppercase">{profile.role}</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 border-t border-dark-100">
        <div className="py-3 px-4 text-center border-r border-dark-100 last:border-r-0">
          <span className="block text-2xl font-black text-primary-500">{profile.stats.technologies}</span>
          <span className="block text-[9px] font-bold text-dark-400 tracking-[2px] uppercase mt-1">Teknologi</span>
        </div>
        <div className="py-3 px-4 text-center border-r border-dark-100 last:border-r-0">
          <span className="block text-2xl font-black text-primary-500">{profile.stats.activeProjects}</span>
          <span className="block text-[9px] font-bold text-dark-400 tracking-[2px] uppercase mt-1">Proyek Aktif</span>
        </div>
        <div className="py-3 px-4 text-center border-r border-dark-100 last:border-r-0">
          <span className="block text-2xl font-black text-primary-500">{profile.stats.problemScore}</span>
          <span className="block text-[9px] font-bold text-dark-400 tracking-[2px] uppercase mt-1">Problem Score</span>
        </div>
        <div className="py-3 px-4 text-center">
          <span className="block text-2xl font-black text-primary-500">{profile.stats.curiosity}</span>
          <span className="block text-[9px] font-bold text-dark-400 tracking-[2px] uppercase mt-1">Rasa Ingin Tahu</span>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-dark-100">
        <div className="p-4 sm:p-5 border-r border-dark-100">
          <p className="text-[9px] font-bold text-dark-400 tracking-[3px] uppercase mb-3">Skill Stats</p>
          {profile.skills.slice(0, 3).map((skill) => (
            <div key={skill.name} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-dark-600">{skill.name}</span>
                <span className="text-[11px] font-bold text-primary-500">{skill.value}</span>
              </div>
              <div className="h-1 bg-dark-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-[9px] font-bold text-dark-400 tracking-[3px] uppercase mb-3">Lanjutan</p>
          {profile.skills.slice(3).map((skill) => (
            <div key={skill.name} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-dark-600">{skill.name}</span>
                <span className="text-[11px] font-bold text-primary-500">{skill.value}</span>
              </div>
              <div className="h-1 bg-dark-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-4 sm:px-5 py-3 border-b border-dark-100 flex flex-wrap items-center gap-2">
        <span className="text-[9px] font-bold text-dark-400 tracking-[3px] uppercase mr-1">Stack</span>
        {profile.techStack.map((tech) => (
          <span
            key={tech.name}
            className={`text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 rounded border ${
              tech.accent
                ? "border-primary-200 text-primary-500 bg-primary-50"
                : "border-dark-100 text-dark-500 bg-white"
            }`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
}