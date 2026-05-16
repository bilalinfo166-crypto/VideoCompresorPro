"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Play, Shield, Twitter, Twitch, Linkedin, Youtube, Activity } from "lucide-react";

const STATS = [
  { value: "50M+", label: "stats.videos_compressed" },
  { value: "90%", label: "stats.reduction" },
  { value: "30+", label: "stats.formats" },
  { value: "30+", label: "stats.languages" },
];

export function TrustAndStats() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[var(--background)] border-y border-[var(--card-border)] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Logos Row - Simple & Clean */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mb-16 opacity-40 grayscale hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-2 text-xl font-black text-slate-400">
            <Play className="w-6 h-6 fill-current text-slate-500" /> TikTok
          </div>
          <div className="flex items-center gap-2 text-xl font-black text-slate-400">
            <Activity className="w-6 h-6 fill-current text-slate-500" /> Adobe
          </div>
          <div className="flex items-center gap-2 text-xl font-black text-slate-400">
            <div className="w-6 h-6 bg-slate-500 rounded-sm" /> Twitch
          </div>
          <div className="flex items-center gap-2 text-xl font-black text-slate-400">
            <Linkedin className="w-6 h-6 fill-current text-slate-500" /> LinkedIn
          </div>
          <div className="flex items-center gap-2 text-xl font-black text-slate-400">
            <Youtube className="w-6 h-6 fill-current text-slate-500" /> YouTube
          </div>
        </div>

        {/* Divider Line like the image */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent mb-16" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-indigo-600 mb-3 group-hover:scale-105 transition-transform">
                {s.value}
              </div>
              <div className="text-[var(--muted-text)] text-[10px] md:text-xs font-black uppercase tracking-[0.25em] opacity-80">
                {t(s.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
