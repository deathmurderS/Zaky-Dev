"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

function CharacterSVG() {
  return (
    <svg viewBox="0 0 180 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="face-clip"><ellipse cx="90" cy="72" rx="36" ry="40"/></clipPath>
      </defs>
      <ellipse cx="90" cy="72" rx="36" ry="40" fill="#fde8d8"/>
      <rect x="54" y="42" width="72" height="24" rx="4" fill="#1a2a6e"/>
      <ellipse cx="90" cy="42" rx="38" ry="12" fill="#1e3080"/>
      <ellipse cx="66" cy="44" rx="14" ry="6" fill="#2a40a0"/>
      <ellipse cx="114" cy="44" rx="14" ry="6" fill="#2a40a0"/>
      <ellipse cx="78" cy="76" rx="5" ry="5.5" fill="#fff"/>
      <ellipse cx="102" cy="76" rx="5" ry="5.5" fill="#fff"/>
      <ellipse cx="79" cy="76" rx="3" ry="3.5" fill="#c8b060"/>
      <ellipse cx="103" cy="76" rx="3" ry="3.5" fill="#c8b060"/>
      <ellipse cx="80" cy="75" rx="1.8" ry="2" fill="#1a1a1a"/>
      <ellipse cx="104" cy="75" rx="1.8" ry="2" fill="#1a1a1a"/>
      <circle cx="80.5" cy="74.5" r="0.8" fill="#fff"/>
      <circle cx="104.5" cy="74.5" r="0.8" fill="#fff"/>
      <path d="M74 71 Q78 69 82 71" stroke="#555" strokeWidth="0.8" fill="none"/>
      <path d="M98 71 Q102 69 106 71" stroke="#555" strokeWidth="0.8" fill="none"/>
      <ellipse cx="90" cy="88" rx="3" ry="2" fill="#e8a898"/>
      <path d="M82 95 Q90 100 98 95" stroke="#d08080" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="66" cy="80" rx="6" ry="4" fill="#f5c0b0" opacity="0.5"/>
      <ellipse cx="114" cy="80" rx="6" ry="4" fill="#f5c0b0" opacity="0.5"/>
      <circle cx="108" cy="94" r="2.5" fill="#c0a0a0" opacity="0.7"/>
      <circle cx="109.5" cy="95.5" r="1" fill="#e0c0c0"/>
      <path d="M60 104 Q54 100 52 108 Q50 120 56 125 Q60 128 64 120" fill="#fde8d8"/>
      <path d="M120 104 Q126 100 128 108 Q130 120 124 125 Q120 128 116 120" fill="#fde8d8"/>
      <path d="M58 108 Q70 130 90 134 Q110 130 122 108 L122 200 Q110 220 90 224 Q70 220 58 200 Z" fill="#1a1a2e"/>
      <path d="M72 108 L68 200 Q70 220 90 224" stroke="#2a2a4e" strokeWidth="1" fill="none"/>
      <path d="M108 108 L112 200 Q110 220 90 224" stroke="#2a2a4e" strokeWidth="1" fill="none"/>
      <circle cx="90" cy="148" r="5" fill="#cc2222"/>
      <rect x="86" y="143" width="8" height="3" rx="1.5" fill="#cc2222"/>
      <path d="M65 165 Q58 170 52 185 Q48 196 54 210 Q62 228 72 240 Q80 252 82 268" stroke="#1a1a2e" strokeWidth="20" fill="none" strokeLinecap="round"/>
      <path d="M115 165 Q122 170 128 185 Q132 196 126 210 Q118 228 108 240 Q100 252 98 268" stroke="#1a1a2e" strokeWidth="20" fill="none" strokeLinecap="round"/>
      <path d="M65 165 Q58 170 52 185 Q48 196 54 210 Q62 228 72 240 Q80 252 82 268" stroke="#2a2a4e" strokeWidth="1" fill="none"/>
      <path d="M115 165 Q122 170 128 185 Q132 196 126 210 Q118 228 108 240 Q100 252 98 268" stroke="#2a2a4e" strokeWidth="1" fill="none"/>
      <ellipse cx="54" cy="196" rx="9" ry="8" fill="#fde8d8"/>
      <ellipse cx="126" cy="196" rx="9" ry="8" fill="#fde8d8"/>
      <path d="M75 228 L82 268" stroke="#1a1a2e" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M105 228 L98 268" stroke="#1a1a2e" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <rect x="70" y="265" width="22" height="10" rx="5" fill="#e0e0e0"/>
      <rect x="92" y="265" width="22" height="10" rx="5" fill="#e0e0e0"/>
      <path d="M55 180 Q44 175 38 185 Q34 194 42 202 Q50 208 58 200" fill="#fde8d8"/>
      <path d="M125 180 Q136 175 142 185 Q146 194 138 202 Q130 208 122 200" fill="#fde8d8"/>
      <path d="M40 188 Q44 192 40 196" stroke="#e0b090" strokeWidth="0.8" fill="none"/>
      <path d="M140 188 Q136 192 140 196" stroke="#e0b090" strokeWidth="0.8" fill="none"/>
      <path d="M38 182 Q32 178 36 170 L44 172" fill="#fde8d8"/>
      <path d="M142 182 Q148 178 144 170 L136 172" fill="#fde8d8"/>
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Left - Character */}
        <div className="relative bg-primary-50 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 left-0 pointer-events-none select-none text-[100px] font-black italic text-primary-500/5 leading-[0.88] whitespace-nowrap">
            RYO<br />RYO<br />RYO
          </div>

          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100/80 border border-primary-200 rounded text-[9px] font-black tracking-[2px] uppercase text-primary-500">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
              My Bini Gweh
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-44 mx-auto mb-6"
          >
            <CharacterSVG />
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