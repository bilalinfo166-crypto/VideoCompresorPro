"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Scissors, Zap, Shield, Sparkles, CheckCircle2, Star, ArrowRight, Play, Clock, Layout, Monitor, Smartphone, Globe, HardDrive, Youtube, Instagram, Facebook, Video, Layers, Film, Activity, ChevronDown } from "lucide-react";

const VideoCutter = dynamic(
  () => import("@/components/tools/VideoCutter").then((m) => m.VideoCutter),
  { ssr: false }
);

const SOCIAL_PLATFORMS = [
  { name: "YouTube", icon: Youtube, color: "text-red-500", desc: "Shorts & Long-form" },
  { name: "Instagram", icon: Instagram, color: "text-pink-500", desc: "Reels & Stories" },
  { name: "Facebook", icon: Facebook, color: "text-blue-500", desc: "Ads & Posts" },
  { name: "TikTok", icon: Video, color: "text-emerald-400", desc: "Vertical Videos" },
];

const FEATURES = [
  { id: 1, icon: Scissors },
  { id: 2, icon: Shield },
  { id: 3, icon: Star },
  { id: 4, icon: Zap },
  { id: 5, icon: Film },
  { id: 6, icon: Activity },
];

const STEPS = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const REVIEWS = [
  { id: 1, name: "Felix Vogel", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
  { id: 2, name: "Sonia Rossi", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
  { id: 3, name: "Hiroshi Tanaka", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
  { id: 4, name: "Elena Petrov", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 5, name: "David Miller", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 6, name: "Sofia Garcia", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 7, name: "Jean Dupont", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 8, name: "Anna Schmidt", avatar: "https://randomuser.me/api/portraits/women/47.jpg" },
  { id: 9, name: "Carlos Mendez", avatar: "https://randomuser.me/api/portraits/men/48.jpg" },
  { id: 10, name: "Yuki Tanaka", avatar: "https://randomuser.me/api/portraits/women/49.jpg" },
  { id: 11, name: "Liam Wilson", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 12, name: "Sophia Garcia", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function VideoCutterPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col transition-colors duration-300">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium backdrop-blur-md">
                <Scissors className="w-4 h-4" />
                {t("cutter_page.hero_badge")}
              </div>
            </div>

            <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--foreground)]">
              {t("cutter_page.hero_title").split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">{t("cutter_page.hero_title").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-center text-xl text-[var(--muted-text)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("cutter_page.hero_subtitle")}
            </p>

            <VideoCutter />
          </div>
        </div>
      </section>

      {/* ─── Social Platforms ─── */}
      <section className="py-20 bg-[var(--background)] border-y border-[var(--card-border)] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">{t("cutter_page.social_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium">{t("cutter_page.social_desc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.name} className="glass-card p-8 rounded-3xl border border-[var(--card-border)] flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                <p.icon className={`w-12 h-12 ${p.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-[var(--foreground)] mb-1">{p.name}</h3>
                <p className="text-[10px] text-[var(--muted-text)] uppercase font-black tracking-widest">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cinematic Video Section ─── */}
      <section className="relative py-32 border-y border-white/5 overflow-hidden bg-[#020617]">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-2xl">{t("cutter_page.visualizer_title")}</h2>
            <p className="text-white font-medium text-lg md:text-xl drop-shadow-xl">{t("cutter_page.visualizer_desc")}</p>
          </div>
            
            <div className="relative glass-card rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black/60 aspect-video max-w-4xl mx-auto">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70">
                 <source src="/demo-video.mp4" type="video/mp4" />
               </video>
               
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-xs font-mono text-indigo-400">00:04:12</span>
                     <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{t("cutter_page.visualizer_label")}</span>
                     </div>
                     <span className="text-xs font-mono text-indigo-400">00:08:45</span>
                  </div>
                  <div className="h-12 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                     <div className="absolute inset-y-0 left-1/4 right-1/4 bg-indigo-500/30 border-x-4 border-indigo-500 flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-indigo-300 opacity-50" />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-around px-4 opacity-20">
                        {[...Array(40)].map((_, i) => (
                           <div key={i} className="w-1 bg-white" style={{ height: `${Math.random() * 80 + 20}%` }} />
                        ))}
                     </div>
                  </div>
                  <div className="mt-4 text-center">
                     <p className="text-white font-bold text-lg drop-shadow-xl">{t("cutter_page.visualizer_bottom")}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("cutter_page.features_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`cutter_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`cutter_page.f${f.id}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)]">{t("cutter_page.steps_title")}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`cutter_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`cutter_page.s${s.id}_desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("cutter_page.reviews_title")}</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-4 gap-6 max-w-7xl mx-auto space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="break-inside-avoid glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-[var(--foreground)] text-xs leading-relaxed mb-8 opacity-80">"{t(`cutter_page.r${review.id}_text`)}"</p>
                <div className="flex items-center gap-4">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-[10px]">{review.name}</div>
                    <div className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`cutter_page.r${review.id}_role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-[var(--foreground)]">{t("cutter_page.faq_title")}</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`cutter_page.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed text-sm border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`cutter_page.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t("cutter_page.cta_title")}</h2>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
            {t("common.go_home")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
