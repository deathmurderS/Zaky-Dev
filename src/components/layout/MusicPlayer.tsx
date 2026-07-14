"use client";

import { useState } from "react";
import { Music, X, Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all hover:scale-105"
        title="Music Player"
      >
        <Music className="w-5 h-5" />
      </button>

      {/* Player panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-72 sm:w-80 rounded-xl border border-dark-100 bg-white shadow-xl overflow-hidden dark:bg-dark-800 dark:border-dark-600">
          <div className="flex items-center justify-between px-4 py-3 bg-primary-500 text-white">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wider uppercase">Music Player</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3">
            <p className="text-[10px] text-dark-400 mb-2 text-center">
              🎧 Anime & Lofi vibes — klik play buat dengerin
            </p>

            {/* Spotify Embed — GANTI link playlist-nya di sini */}
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9GRpeH4CL0S?utm_source=generator&theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}