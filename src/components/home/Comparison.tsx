"use client";

import { Shield, Zap, Star, Globe, UploadCloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Comparison() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-24 border-t border-[var(--card-border)]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">{t("comparison.title")}</h2>
        <p className="text-[var(--muted-text)] font-medium max-w-2xl mx-auto">{t("comparison.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Local Card */}
        <div className="glass-card rounded-[2.5rem] p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">Better</div>
          <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" aria-hidden="true" /> {t("comparison.local_title")}
          </h3>
          <ul className="space-y-4">
            {[
              { icon: Zap, text: "comparison.speed" },
              { icon: Shield, text: "comparison.privacy" },
              { icon: Star, text: "comparison.cost" },
              { icon: Globe, text: "comparison.internet" }
            ].map((item, idx) => (
              <li key={item.text} className="flex items-center gap-3 text-sm font-bold text-[var(--foreground)]">
                <item.icon className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                {t(item.text)}
              </li>
            ))}
          </ul>
        </div>

        {/* Cloud Card */}
        <div className="glass-card rounded-[2.5rem] p-8 border-red-500/20 bg-red-500/5 relative overflow-hidden group transition-all duration-300">
          <div className="absolute top-4 right-4 bg-red-700/10 border border-red-700/20 text-red-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Traditional</div>
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-red-600" aria-hidden="true" /> {t("comparison.cloud_title")}
          </h3>
          <ul className="space-y-4">
            {[
              "comparison.speed_cloud",
              "comparison.privacy_cloud",
              "comparison.cost_cloud",
              "comparison.internet_cloud"
            ].map((text, idx) => (
              <li key={text} className="flex items-center gap-3 text-sm font-bold text-[var(--foreground)]">
                <div className="w-4 h-4 flex items-center justify-center text-red-600 font-black" aria-hidden="true">✕</div>
                {t(text)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
