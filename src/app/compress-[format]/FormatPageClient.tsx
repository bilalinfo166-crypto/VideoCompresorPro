"use client";

import React from "react";
import { VideoCompressor } from "@/components/tools/VideoCompressor";
import { Sparkles, FileVideo } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FormatPageClient({ format }: { format: string }) {
  const { t } = useLanguage();

  const replaceFormat = (str: string) => str.replace("{format}", format);
  
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <FileVideo className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-300">{replaceFormat(t("format_page.badge"))}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              {t("format_page.title_part1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{format}</span> {t("format_page.title_part2")} <br /> {t("format_page.title_part3")}
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {replaceFormat(t("format_page.subtitle"))}
            </p>
          </div>
          
          <VideoCompressor />
        </div>
      </section>

      <section className="py-20 bg-black/40 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">{replaceFormat(t("format_page.why_title"))}</h2>
            <p className="text-gray-400">{replaceFormat(t("format_page.why_subtitle"))}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="text-primary font-bold text-xl mb-3">{t("format_page.v1_title")}</div>
              <p className="text-gray-400">{replaceFormat(t("format_page.v1_desc"))}</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl relative">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">PRIVATE</span>
              </div>
              <div className="text-emerald-400 font-bold text-xl mb-3">{t("format_page.v2_title")}</div>
              <p className="text-gray-400">{replaceFormat(t("format_page.v2_desc"))}</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl">
              <div className="text-purple-400 font-bold text-xl mb-3">{t("format_page.v3_title")}</div>
              <p className="text-gray-400">{replaceFormat(t("format_page.v3_desc"))}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
