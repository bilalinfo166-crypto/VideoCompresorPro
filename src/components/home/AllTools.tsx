"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Scissors, Crop, Music, FileVideo, FileText, ArrowRight, FileAudio
} from "lucide-react";

interface Tool {
  icon: any;
  title: string;
  description: string;
  href: string;
  color: string;
  bg: string;
  border: string;
  badge?: string;
}

const TOOLS: Tool[] = [
  {
    icon: FileVideo,
    title: "tools.compressor_title",
    description: "tools.compressor_desc",
    href: "/",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    badge: "common.popular"
  },
  {
    icon: Scissors,
    title: "tools.cutter_title",
    description: "tools.cutter_desc",
    href: "/video-cutter",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Crop,
    title: "tools.cropper_title",
    description: "tools.cropper_desc",
    href: "/crop-video",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Music,
    title: "tools.to_mp3_title",
    description: "tools.to_mp3_desc",
    href: "/video-to-mp3",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: FileAudio,
    title: "nav.audio",
    description: "audio_cutter_page.features_desc",
    href: "/video-to-audio",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: FileText,
    title: "tools.to_text_title",
    description: "tools.to_text_desc",
    href: "/video-to-text",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "common.new"
  },
];

export function AllTools({ context }: { context?: string }) {
  const { t } = useLanguage();

  return (
    <section id="all-tools" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-[var(--foreground)]">
            {context ? `More Free Video Tools for ${context}` : t("tools.all_free_title")}
          </h2>
          <p className="text-[var(--muted-text)] text-lg max-w-xl mx-auto font-medium leading-relaxed">
            {context 
              ? `While optimizing your ${context} videos, explore our other powerful browser-based tools.`
              : t("tools.all_free_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className={`group glass-card rounded-2xl p-5 sm:p-6 border ${tool.border} hover:border-opacity-60 hover:-translate-y-1 active:scale-95 transition-all duration-300 relative overflow-hidden touch-feedback`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{t(tool.title)}</h3>
                    {tool.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 font-bold">
                        {t(tool.badge)}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(tool.description)}</p>
                  <div className={`flex items-center gap-1 mt-4 ${tool.color} text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {t("tools.open_tool")} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
