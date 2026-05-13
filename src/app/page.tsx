"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import {
  Zap, Shield, Sparkles, ChevronDown, Globe,
  Scissors, Crop, Music, FileVideo, FileText,
  CheckCircle2, Star, ArrowRight, Play, UploadCloud, List
} from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

const VideoCompressor = dynamic(
  () => import("@/components/tools/VideoCompressor").then((m) => m.VideoCompressor),
  {
    ssr: false,
    loading: () => (
      <div className="glass-card rounded-3xl p-16 text-center border border-white/10">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-white/10 rounded w-48 mx-auto mb-3 animate-pulse" />
        <div className="h-3 bg-white/5 rounded w-64 mx-auto animate-pulse" />
      </div>
    ),
  }
);

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
    icon: Scissors,
    title: "tools.audio_cutter_title",
    description: "tools.audio_cutter_desc",
    href: "/audio-cutter",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
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

const STEPS = [
  {
    number: "01",
    title: "Choose Your Video File",
    description: "Select the video you want to shrink from your device. Our Video Compressor supports all major formats like MP4, MOV, and AVI for fast processing.",
  },
  {
    number: "02",
    title: "Optimize Compression Settings",
    description: "Select a mode to reduce video size: Basic for speed, Strong for balance, or Extreme to compress video files by up to 90% without quality loss.",
  },
  {
    number: "03",
    title: "Download Compressed File",
    description: "Once our online video compressor finishes its work, download your smaller file instantly. No waiting, no uploads, and 100% privacy guaranteed.",
  },
];

const STATS = [
  { value: "50M+", label: "stats.videos_compressed" },
  { value: "90%", label: "stats.reduction" },
  { value: "30+", label: "stats.formats" },
  { value: "22+", label: "stats.languages" },
];

const REVIEWS = [
  { id: 1, name: "Alex Rivera", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Samantha Lee", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "David Chen", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 4, name: "Emily Watson", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 5, name: "Marcus Johnson", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 6, name: "Sarah Jenkins", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 7, name: "Tomislav Novak", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
  { id: 8, name: "Jessica Alba", avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
  { id: 9, name: "Omar Khalid", avatar: "https://randomuser.me/api/portraits/men/88.jpg" },
  { id: 10, name: "Isabella Rossi", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 11, name: "Liam Wilson", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 12, name: "Sophia Garcia", avatar: "https://randomuser.me/api/portraits/women/19.jpg" }
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
];

const LANGUAGES = [
  "English", "Español", "Português", "Bahasa Indonesia",
  "Français", "Deutsch", "Italiano", "日本語",
  "Русский", "العربية", "हिन्दी", "中文",
];

export default function Home() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`faq.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`faq.a${faq.id}`)
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Breadcrumbs items={[{ label: "Video Compressor", href: "/" }]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-20 overflow-hidden bg-[var(--background)]">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
        {/* Premium soft glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
                {t("common.free_forever")} · {t("common.no_uploads")}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.1] text-[var(--foreground)] px-2">
               {t("hero.title_main")}
            </h1>
            <p className="text-center text-base sm:text-xl text-[var(--muted-text)] mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {t("hero.subtitle")}
            </p>

            {/* Tool Container with Shadow */}
            <div className="relative z-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] rounded-[2.5rem]">
              <VideoCompressor />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="py-8 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 border border-[var(--card-border)]">
            <h3 className="text-sm font-bold text-[var(--muted-text)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <List className="w-4 h-4" /> {t("common.quick_navigation") || "Quick Navigation"}
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-[var(--foreground)]">
              <a href="#how-it-works" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">How it Works</a>
              <a href="#all-tools" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">Free Tools</a>
              <a href="#reviews" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">User Reviews</a>
              <a href="#faq" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <section className="py-12 border-b border-[var(--card-border)] bg-[var(--background)] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">{t("trusted.title")}</h2>
            <p className="text-[var(--muted-text)] text-sm md:text-base font-medium">{t("trusted.desc")}</p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto mask-image-gradient-x overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-16 md:gap-24 py-4">
              {/* First Set */}
              <div className="flex items-center gap-2 text-2xl font-black text-slate-400/50 hover:text-white transition-colors duration-300">
                <Play className="w-8 h-8 fill-red-500 text-red-500" /> YouTube
              </div>
              <div className="text-2xl font-bold text-slate-400/50 hover:text-white transition-colors duration-300 font-serif italic">
                Instagram
              </div>
              <div className="flex items-center gap-1 text-2xl font-bold text-slate-400/50 hover:text-white transition-colors duration-300 tracking-tighter">
                <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
              </div>
              <div className="text-3xl font-black text-red-600 tracking-wider hover:text-red-500 transition-colors duration-300">
                NETFLIX
              </div>
              <div className="text-2xl font-bold text-cyan-400 opacity-60 hover:opacity-100 transition-colors duration-300">
                Canva
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-blue-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                <Shield className="w-6 h-6 fill-current" /> Dropbox
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                WhatsApp
              </div>
              <div className="text-2xl font-black text-blue-500 opacity-60 hover:opacity-100 transition-colors duration-300 tracking-tight">
                zoom
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-red-600 opacity-60 hover:opacity-100 transition-colors duration-300">
                <Play className="w-6 h-6 fill-current" /> TikTok
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-indigo-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                Adobe
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-purple-600 opacity-60 hover:opacity-100 transition-colors duration-300 font-black italic">
                Twitch
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-blue-700 opacity-60 hover:opacity-100 transition-colors duration-300">
                LinkedIn
              </div>

              {/* Duplicate Set for infinite loop */}
              <div className="flex items-center gap-2 text-2xl font-black text-slate-400/50 hover:text-white transition-colors duration-300">
                <Play className="w-8 h-8 fill-red-500 text-red-500" /> YouTube
              </div>
              <div className="text-2xl font-bold text-slate-400/50 hover:text-white transition-colors duration-300 font-serif italic">
                Instagram
              </div>
              <div className="flex items-center gap-1 text-2xl font-bold text-slate-400/50 hover:text-white transition-colors duration-300 tracking-tighter">
                <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
              </div>
              <div className="text-3xl font-black text-red-600 tracking-wider hover:text-red-500 transition-colors duration-300">
                NETFLIX
              </div>
              <div className="text-2xl font-bold text-cyan-400 opacity-60 hover:opacity-100 transition-colors duration-300">
                Canva
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-blue-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                <Shield className="w-6 h-6 fill-current" /> Dropbox
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                WhatsApp
              </div>
              <div className="text-2xl font-black text-blue-500 opacity-60 hover:opacity-100 transition-colors duration-300 tracking-tight">
                zoom
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-red-600 opacity-60 hover:opacity-100 transition-colors duration-300">
                <Play className="w-6 h-6 fill-current" /> TikTok
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-indigo-500 opacity-60 hover:opacity-100 transition-colors duration-300">
                Adobe
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-purple-600 opacity-60 hover:opacity-100 transition-colors duration-300 font-black italic">
                Twitch
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-blue-700 opacity-60 hover:opacity-100 transition-colors duration-300">
                LinkedIn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="py-10 sm:py-12 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center touch-feedback">
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                   {s.value}
                </div>
                <div className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Real Use Cases / Feature Blocks ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-24">
            
            {/* Storage Feature */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{t("storage.badge")}</div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">{t("storage.title")}</h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                  {t("storage.desc")}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 aspect-[4/3] shadow-2xl">
                  <Image src="/storage-feature.png" alt="Reduce video size and save storage" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Discord Feature */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 aspect-[4/3] shadow-2xl">
                  <Image src="/discord-feature.png" alt="Compress video for Discord limits" fill className="object-cover" />
                </div>
              </div>
              <div>
                <div className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{t("discord.badge")}</div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">{t("discord.title")}</h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                  {t("discord.desc")}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Comparison Section (Local vs Cloud) */}
        <div className="container mx-auto px-4 py-24 border-t border-[var(--card-border)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">{t("comparison.title")}</h2>
            <p className="text-[var(--muted-text)] font-medium max-w-2xl mx-auto">{t("comparison.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Local Card */}
            <div className="glass-card rounded-[2.5rem] p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">Better</div>
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" /> {t("comparison.local_title")}
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: Zap, text: "comparison.speed" },
                  { icon: Shield, text: "comparison.privacy" },
                  { icon: Star, text: "comparison.cost" },
                  { icon: Globe, text: "comparison.internet" }
                ].map((item, idx) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm font-bold text-[var(--foreground)]">
                    <item.icon className="w-4 h-4 text-emerald-500" />
                    {t(item.text)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cloud Card */}
            <div className="glass-card rounded-[2.5rem] p-8 border-red-500/20 bg-red-500/5 relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Traditional</div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-red-500" /> {t("comparison.cloud_title")}
              </h3>
              <ul className="space-y-4">
                {[
                  "comparison.speed_cloud",
                  "comparison.privacy_cloud",
                  "comparison.cost_cloud",
                  "comparison.internet_cloud"
                ].map((text, idx) => (
                  <li key={text} className="flex items-center gap-3 text-sm font-bold text-[var(--foreground)]">
                    <div className="w-4 h-4 flex items-center justify-center text-red-500 font-black">✕</div>
                    {t(text)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ─── Quality Visualizer (Premium Containerized Design) ─── */}
      <section className="py-24 bg-[#f1f5f9] relative overflow-hidden">
        {/* Subtle background glow to match the screenshot's premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">{t("visualizer.title")}</h2>
            <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed">{t("visualizer.desc")}</p>
          </div>

          <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] group bg-white p-2 sm:p-4">
            <div className="relative rounded-[1.5rem] overflow-hidden bg-black aspect-video">
              {/* The Video Element */}
              <video 
                key="vibrant-colorful-visualizer"
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-100 transition-transform duration-1000 group-hover:scale-105"
              >
                <source src="https://player.vimeo.com/external/494244245.hd.mp4?s=a0248c8230538053f3e970a00d024626156e507b&profile_id=175" type="video/mp4" />
                <source src="/homepage-hd.mp4" type="video/mp4" />
              </video>

              {/* Overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Interactive UI Overlay (Frosted Glass labels at the bottom) */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8 md:p-12">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 backdrop-blur-xl bg-white/10 p-4 sm:p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                  {[
                    { label: "visualizer.original", size: "145 MB", active: false },
                    { label: "visualizer.basic", size: "68 MB (-53.1%)", active: false },
                    { label: "visualizer.strong", size: "25 MB (-82.8%)", active: false },
                    { label: "visualizer.advanced", size: "35 MB (-75.9%)", active: true },
                  ].map((mode) => (
                    <div 
                      key={mode.label} 
                      className={`flex-1 min-w-[120px] rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 border ${
                        mode.active 
                          ? 'bg-white/90 border-white shadow-[0_8px_32px_rgba(255,255,255,0.3)] scale-105 z-10' 
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className={`font-bold text-sm sm:text-base mb-1 ${mode.active ? 'text-slate-900' : 'text-white'}`}>
                        {t(mode.label)}
                      </div>
                      <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-70 ${mode.active ? 'text-slate-500' : 'text-slate-300'}`}>
                        {mode.size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("how_it_works.title")}</h2>
            <p className="text-[var(--muted-text)] text-lg font-medium">{t("how_it_works.desc")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Image side */}
            <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 aspect-[4/3] bg-gradient-to-br from-indigo-900/40 to-slate-900 shadow-2xl shadow-indigo-500/10">
              <Image src="/how-it-works-ui.png" alt="How it works" fill className="object-cover opacity-90" />
            </div>

            {/* Steps side */}
            <div className="space-y-4">
              {STEPS.map((step, i) => (
                <div key={step.number} className={`p-6 rounded-2xl border transition-all ${i === 0 ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-transparent border-[var(--card-border)] opacity-70 hover:opacity-100 hover:bg-white/5'}`}>
                  <h3 className={`text-lg font-bold mb-3 flex items-center gap-3 ${i === 0 ? 'text-[var(--foreground)]' : 'text-[var(--muted-text)]'}`}>
                    <span className="text-indigo-500 uppercase text-sm tracking-wider font-black">{t("how_it_works.step")} {parseInt(step.number)}</span> 
                    {t(`steps.0${parseInt(step.number)}_title`)}
                  </h3>
                  <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium">{t(`steps.0${parseInt(step.number)}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── All Tools Grid ─── */}
      <section id="all-tools" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("tools.all_free_title")}</h2>
            <p className="text-[var(--muted-text)] text-lg max-w-xl mx-auto font-medium">
              {t("tools.all_free_desc")}
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

      {/* ─── Reviews / Testimonials ─── */}
      <section id="reviews" className="py-16 sm:py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--foreground)]">{t("reviews.title")}</h2>
            <p className="text-[var(--muted-text)] text-base sm:text-lg max-w-2xl mx-auto font-medium">{t("reviews.desc")}</p>
          </div>
          {/* Mobile: horizontal snap scroll. Desktop: 3-col grid */}
          <div className="mobile-carousel md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 max-w-7xl mx-auto">
            {REVIEWS.map((review) => (
              <div key={review.id} className="flex flex-col glass-card rounded-2xl p-6 sm:p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 h-full w-[80vw] sm:w-auto shrink-0 md:shrink">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <div className="flex-1">
                   <p className="text-[var(--foreground)] text-base leading-relaxed mb-8 font-medium opacity-90 italic">"{t(`reviews.r${review.id}_text`)}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--card-border)]">
                  <Image src={review.avatar} alt={review.name} width={48} height={48} className="rounded-full bg-slate-800 object-cover ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-sm">{review.name}</div>
                    <div className="text-xs text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`reviews.r${review.id}_role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-sm mb-6 font-bold">
                  <Shield className="w-4 h-4" />
                  {t("common.privacy_first")}
                </div>
                <h2 className="text-4xl font-black mb-6 leading-tight text-[var(--foreground)]">
                  {t("why_choose.title")}
                </h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed mb-8 font-medium">
                  {t("why_choose.desc")}
                </p>
                <ul className="space-y-4">
                  {[
                    "why_choose.point1",
                    "why_choose.point2",
                    "why_choose.point3",
                    "why_choose.point4",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[var(--muted-text)] font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-3xl" />
                <Image
                  src="/privacy-illustration.png"
                  alt="Privacy illustration"
                  width={500}
                  height={400}
                  className="relative z-10 rounded-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Supported Formats ─── */}
      <section className="py-16 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3 text-[var(--foreground)]">{t("formats_sec.title")}</h2>
            <p className="text-[var(--muted-text)] font-bold">{t("formats_sec.desc")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["MP4", "MOV", "AVI", "MKV", "WEBM", "WMV", "FLV", "3GP", "M4V", "OGV", "TS", "MPG", "MPEG", "F4V", "ASF", "M2TS", "VOB", "MXF", "RM", "RMVB"].map((fmt) => (
              <span key={fmt} className="px-4 py-2 rounded-lg bg-indigo-500/5 border border-[var(--card-border)] text-[var(--muted-text)] text-sm font-mono font-black hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-colors">
                .{fmt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("faq.title")}</h2>
              <p className="text-[var(--muted-text)] font-medium">{t("faq.desc")}</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`faq.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all duration-300 shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`faq.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Share ─── */}
      <SocialShare title="Video Compressor Pro - Compress Video Online Free" />

      {/* ─── Author Block ─── */}
      <AuthorBlock />

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="compressor" />

      {/* ─── CTA Banner ─── */}
      <section className="py-12 sm:py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-500/20 p-8 sm:p-12 text-center shadow-inner">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black mb-4 text-[var(--foreground)]">{t("cta.title")}</h2>
                <p className="text-[var(--muted-text)] text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto font-bold opacity-90">
                  {t("cta.desc")}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-8 py-4 rounded-xl font-black text-base sm:text-lg transition-all shadow-xl shadow-indigo-500/25 hover:scale-105 touch-feedback"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {t("cta.button")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
