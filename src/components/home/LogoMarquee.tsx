"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Play, Shield } from "lucide-react";

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

export function LogoMarquee() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-[var(--background)] overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
         <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">{t("trusted.title")}</h2>
      </div>
      <div className="w-full mask-image-gradient-x overflow-hidden" dir="ltr">
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
    </section>
  );
}
