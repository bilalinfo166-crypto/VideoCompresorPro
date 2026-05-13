"use client";

import { useLanguage } from "@/context/LanguageContext";

const STATS = [
  { value: "50M+", label: "stats.videos_compressed" },
  { value: "90%", label: "stats.reduction" },
  { value: "30+", label: "stats.formats" },
  { value: "30+", label: "stats.languages" },
];

export function StatsStrip() {
  const { t } = useLanguage();
  
  return (
    <section className="py-10 sm:py-12 bg-[var(--background)] border-y border-[var(--card-border)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
