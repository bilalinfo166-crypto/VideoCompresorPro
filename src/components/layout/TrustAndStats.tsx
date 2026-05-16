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
    <section className="py-20 bg-[var(--background)] border-y border-[var(--card-border)] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-[var(--foreground)] tracking-tight">
            {t("trusted.title")}
          </h2>
          <p className="text-[var(--muted-text)] text-lg font-medium leading-relaxed">
            {t("trusted.desc")}
          </p>
        </div>

        {/* Logos Row */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 mb-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-[#ff0050] transition-colors">
            <Play className="w-8 h-8 fill-current" /> TikTok
          </div>
          <div className="flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-[#FF0000] transition-colors">
            <Activity className="w-8 h-8 fill-current" /> Adobe
          </div>
          <div className="flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-[#9146FF] transition-colors">
            <Twitch className="w-8 h-8 fill-current" /> Twitch
          </div>
          <div className="flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-[#0A66C2] transition-colors">
            <Linkedin className="w-8 h-8 fill-current" /> LinkedIn
          </div>
          <div className="flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-[#FF0000] transition-colors">
            <Youtube className="w-8 h-8 fill-current" /> YouTube
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[var(--card-border)] pt-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.value}
              </div>
              <div className="text-[var(--muted-text)] text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                {t(s.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
