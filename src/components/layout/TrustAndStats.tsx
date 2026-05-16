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

  const LOGOS = [
    { name: "YouTube", icon: <Play className="w-8 h-8 fill-red-500 text-red-500" /> },
    { name: "Instagram", color: "text-slate-400/50 hover:text-white font-serif italic" },
    { name: "Google", isGoogle: true },
    { name: "NETFLIX", color: "text-red-600 font-black tracking-wider" },
    { name: "Canva", color: "text-cyan-400 opacity-60 hover:opacity-100" },
    { name: "Dropbox", icon: <Shield className="w-6 h-6 fill-current" />, color: "text-blue-500 opacity-60 hover:opacity-100" },
    { name: "WhatsApp", color: "text-emerald-500 opacity-60 hover:opacity-100" },
    { name: "zoom", color: "text-blue-500 opacity-60 hover:opacity-100 font-black tracking-tight" },
    { name: "TikTok", icon: <Play className="w-6 h-6 fill-current" />, color: "text-red-600 opacity-60 hover:opacity-100" },
    { name: "Adobe", color: "text-indigo-500 opacity-60 hover:opacity-100" },
    { name: "Twitch", color: "text-purple-600 opacity-60 hover:opacity-100 font-black italic" },
    { name: "LinkedIn", color: "text-blue-700 opacity-60 hover:opacity-100" },
  ];

  return (
    <section className="py-12 border-y border-[var(--card-border)] bg-[var(--background)] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="text-center mb-8">
           <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">{t("trusted.title")}</h2>
           <p className="text-[var(--muted-text)] text-sm md:text-base font-medium max-w-2xl mx-auto">{t("trusted.desc")}</p>
        </div>
        
        <div className="w-full max-w-5xl mx-auto mask-image-gradient-x overflow-hidden" dir="ltr">
          <div className="animate-marquee flex w-max items-center gap-16 md:gap-24 py-4">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className={`flex items-center gap-2 text-2xl font-bold transition-all duration-300 ${logo.color || 'text-slate-400/50 hover:text-white'}`}>
                {logo.icon}
                {logo.isGoogle ? (
                  <span className="tracking-tighter">
                    <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
                  </span>
                ) : logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-[var(--card-border)] pt-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center touch-feedback">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                 {s.value}
              </div>
              <div className="text-slate-600 text-xs sm:text-sm font-bold uppercase tracking-wider">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
