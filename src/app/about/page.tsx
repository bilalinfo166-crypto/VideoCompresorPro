"use client";

import { Users, Rocket, Heart, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const VALUES = [
    { id: 1, icon: ShieldCheck },
    { id: 2, icon: Zap },
    { id: 3, icon: Heart },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-[var(--foreground)]">
            {t("about_page.hero_title_part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              {t("about_page.hero_title_part2")}
            </span>
          </h1>
          <p className="text-[var(--muted-text)] text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            {t("about_page.hero_subtitle")}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative rounded-[40px] overflow-hidden border border-[var(--card-border)] aspect-square shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Our Team" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
          </div>
          <div>
            <div className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4">{t("about_page.story_badge")}</div>
            <h2 className="text-4xl font-bold mb-6 text-[var(--foreground)]">{t("about_page.story_title")}</h2>
            <p className="text-[var(--muted-text)] text-lg leading-relaxed mb-6 font-medium">
              {t("about_page.story_p1")}
            </p>
            <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
              {t("about_page.story_p2")}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {VALUES.map((v, i) => (
            <div key={i} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] text-center hover:border-indigo-500/30 transition-all">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <v.icon className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`about_page.v${v.id}_title`)}</h3>
              <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t(`about_page.v${v.id}_desc`)}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="glass-card p-12 rounded-[40px] border border-[var(--card-border)] grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-indigo-600/5">
           <div>
              <div className="text-4xl font-black text-[var(--foreground)] mb-2">{t("about_page.stat1_val")}</div>
              <div className="text-xs text-[var(--muted-text)] uppercase tracking-widest font-bold">{t("about_page.stat1_label")}</div>
           </div>
           <div>
              <div className="text-4xl font-black text-[var(--foreground)] mb-2">{t("about_page.stat2_val")}</div>
              <div className="text-xs text-[var(--muted-text)] uppercase tracking-widest font-bold">{t("about_page.stat2_label")}</div>
           </div>
           <div>
              <div className="text-4xl font-black text-[var(--foreground)] mb-2">{t("about_page.stat3_val")}</div>
              <div className="text-xs text-[var(--muted-text)] uppercase tracking-widest font-bold">{t("about_page.stat3_label")}</div>
           </div>
           <div>
              <div className="text-4xl font-black text-[var(--foreground)] mb-2">{t("about_page.stat4_val")}</div>
              <div className="text-xs text-[var(--muted-text)] uppercase tracking-widest font-bold">{t("about_page.stat4_label")}</div>
           </div>
        </div>
      </div>
    </div>
  );
}
