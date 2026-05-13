"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Scissors, Zap, Shield, Sparkles, CheckCircle2, Star, ArrowRight, Play, Music, Mic2, AudioLines, Download, Headphones, Disc, Globe, Speaker, Smartphone, Radio, FileAudio, ChevronDown } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";

const AudioCutter = dynamic(
  () => import("@/components/tools/AudioCutter").then((m) => m.AudioCutter),
  { ssr: false }
);

const FEATURES = [
  { id: 1, icon: AudioLines },
  { id: 2, icon: Shield },
  { id: 3, icon: Download },
  { id: 4, icon: Disc },
  { id: 5, icon: Sparkles },
  { id: 6, icon: Star },
];

const STEPS = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const REVIEWS = [
  { id: 1, name: "Klaus Wagner", avatar: "https://randomuser.me/api/portraits/men/70.jpg" },
  { id: 2, name: "Sarah Connor", avatar: "https://randomuser.me/api/portraits/women/71.jpg" },
  { id: 3, name: "Luca Bianchi", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
  { id: 4, name: "Inaya Khan", avatar: "https://randomuser.me/api/portraits/women/73.jpg" },
  { id: 5, name: "Anders Holm", avatar: "https://randomuser.me/api/portraits/men/74.jpg" },
  { id: 6, name: "Mariana Silva", avatar: "https://randomuser.me/api/portraits/women/75.jpg" },
  { id: 7, name: "Steve Baker", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
  { id: 8, name: "Lin Zhao", avatar: "https://randomuser.me/api/portraits/women/77.jpg" },
  { id: 9, name: "Erik Berg", avatar: "https://randomuser.me/api/portraits/men/78.jpg" },
  { id: 10, name: "Freja Olsen", avatar: "https://randomuser.me/api/portraits/women/79.jpg" },
  { id: 11, name: "Liam Wilson", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 12, name: "Sophia Garcia", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function AudioCutterPage() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`audio_cutter_page.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`audio_cutter_page.a${faq.id}`)
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md">
              <Music className="w-4 h-4" />
              {t("audio_cutter_page.hero_badge")}
            </div>
            <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--foreground)]">
              {t("audio_cutter_page.hero_title").split(" ").slice(0,2).join(" ")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">{t("audio_cutter_page.hero_title").split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-center text-xl text-[var(--muted-text)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("audio_cutter_page.hero_subtitle")}
            </p>
            <AudioCutter />
          </div>
        </div>
      </section>

      {/* ─── Cinematic Video Section ─── */}
      <section className="relative py-32 border-y border-white/5 overflow-hidden bg-[#020617]">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-white italic">{t("audio_cutter_page.visualizer_title")}</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">{t("audio_cutter_page.visualizer_desc")}</p>
            
            <div className="relative glass-card rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black/90 aspect-video max-w-4xl mx-auto flex items-center justify-center p-12">
               <div className="absolute inset-0 overflow-hidden opacity-20">
                  <div className="flex items-center gap-1 h-full w-max animate-marquee">
                     {[...Array(100)].map((_, i) => (
                        <div key={i} className="w-1 bg-rose-500" style={{ height: `${Math.random() * 80 + 20}%` }} />
                     ))}
                  </div>
               </div>

               <div className="relative z-10 w-full">
                  <div className="h-24 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden mb-8">
                     <div className="absolute inset-y-0 left-1/3 right-1/3 bg-rose-500/20 border-x-4 border-rose-500 flex items-center justify-center">
                        <div className="w-4 h-12 bg-rose-500/40 rounded-full animate-pulse" />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-around px-8">
                        {[...Array(60)].map((_, i) => (
                           <div key={i} className="w-1 bg-white/40" style={{ height: `${Math.random() * 60 + 20}%` }} />
                        ))}
                     </div>
                  </div>
                  <div className="flex justify-center gap-4">
                     <div className="glass-card px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-rose-400 font-mono">00:15.5</div>
                     <div className="glass-card px-6 py-3 rounded-xl border border-rose-500/50 bg-rose-500/10 text-white font-bold">{t("audio_cutter_page.visualizer_label")}</div>
                     <div className="glass-card px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-rose-400 font-mono">00:45.0</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)] italic">{t("audio_cutter_page.features_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all text-center">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`audio_cutter_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`audio_cutter_page.f${f.id}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)]">{t("audio_cutter_page.steps_title")}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`audio_cutter_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`audio_cutter_page.s${s.id}_desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("audio_cutter_page.reviews_title")}</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-4 gap-6 max-w-7xl mx-auto space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="break-inside-avoid glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-[var(--foreground)] text-xs leading-relaxed mb-8 opacity-80">"{t(`audio_cutter_page.r${review.id}_text`)}"</p>
                <div className="flex items-center gap-4">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-[10px]">{review.name}</div>
                    <div className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`audio_cutter_page.r${review.id}_role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-[var(--foreground)] italic">{t("audio_cutter_page.faq_title")}</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`audio_cutter_page.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed text-sm border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`audio_cutter_page.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="audio_cutter" />

      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)] italic">{t("audio_cutter_page.cta_title").split(" ").slice(0,2).join(" ")} <br /><span className="text-indigo-500">{t("audio_cutter_page.cta_title").split(" ").slice(2).join(" ")}</span></h2>
          <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 group">
            {t("common.go_home")} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
