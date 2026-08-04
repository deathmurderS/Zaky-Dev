"use client";

import { useState } from "react";
import { Music, X, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        title="Music Player"
      >
        <Music className="w-5 h-5" />
      </motion.button>

      {/* Player panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-72 sm:w-80 rounded-xl border border-dark-100 bg-white shadow-xl overflow-hidden dark:bg-dark-800 dark:border-dark-600"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-primary-500 text-white">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wider uppercase">Music Player</span>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="p-3">
              <p className="text-[10px] text-dark-400 mb-2 text-center">
                🎧 Anime & Lofi vibes — klik play buat dengerin
              </p>

              {/* Spotify Embed — GANTI link playlist-nya di sini */}
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1EpoGEB0af4rSj?utm_source=generator&theme=0"
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}