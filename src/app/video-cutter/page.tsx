"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Scissors, Zap, Shield, Sparkles, CheckCircle2, Star, ArrowRight, Play, Clock, Layout, Monitor, Smartphone, Globe, HardDrive, Youtube, Instagram, Facebook, Video, Layers, Film, Activity, ChevronDown, List, Cpu, MousePointer2, HelpCircle } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

const VideoCutter = dynamic(
  () => import("@/components/tools/VideoCutter").then((m) => m.VideoCutter),
  { ssr: false }
);

const SOCIAL_PLATFORMS = [
  { id: "yt", icon: Youtube, color: "text-red-500" },
  { id: "ig", icon: Instagram, color: "text-pink-500" },
  { id: "fb", icon: Facebook, color: "text-blue-500" },
  { id: "tt", icon: Video, color: "text-emerald-400" },
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
  { id: 1, name: "Jason Miller", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
  { id: 2, name: "Sophia Turner", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
  { id: 3, name: "Ryan Brooks", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
  { id: 4, name: "Olivia Bennett", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 5, name: "Daniel Scott", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 6, name: "Emma Collins", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 7, name: "Michael Reed", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 8, name: "Noah Parker", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
  { id: 9, name: "Ava Mitchell", avatar: "https://randomuser.me/api/portraits/women/48.jpg" },
  { id: 10, name: "Ethan Walker", avatar: "https://randomuser.me/api/portraits/men/49.jpg" },
  { id: 11, name: "Isabella Carter", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
  { id: 12, name: "Liam Anderson", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
];

const FAQS = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
  { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
  { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }
];

export default function VideoCutterPage() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`cutter_page.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`cutter_page.a${faq.id}`)
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Breadcrumbs items={[{ label: "Video Tools", href: "/" }, { label: "Video Cutter", href: "/video-cutter" }]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-6 pb-16 overflow-hidden bg-[var(--background)]">
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
            <p className="text-center text-xl text-[var(--muted-text)] mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              {t("cutter_page.hero_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 text-sm font-bold text-indigo-400/80">
              {t("cutter_page.hero_highlights").split(" ✔ ").map((h, i) => (
                <span key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500/50" />
                  {h.replace("✔ ", "")}
                </span>
              ))}
            </div>

            <VideoCutter />
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
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-base font-bold text-[var(--foreground)]">
              <a href="#social-platforms" className="hover:text-indigo-500 transition-all flex items-center gap-2 group">
                <Layout className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>Social Platforms</span>
              </a>
              <a href="#features" className="hover:text-indigo-500 transition-all flex items-center gap-2 group">
                <Cpu className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>Advanced Features</span>
              </a>
              <a href="#how-to-use" className="hover:text-indigo-500 transition-all flex items-center gap-2 group">
                <MousePointer2 className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>How to Use</span>
              </a>
              <a href="#use-cases" className="hover:text-indigo-500 transition-all flex items-center gap-2 group">
                <Globe className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>Real-World Examples</span>
              </a>
              <a href="#faq" className="hover:text-indigo-500 transition-all flex items-center gap-2 group">
                <HelpCircle className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>Common Questions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Platforms ─── */}
      <section id="social-platforms" className="py-20 bg-[var(--background)] border-y border-[var(--card-border)] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cutter_page.social_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cutter_page.social_desc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.id} className="glass-card p-8 rounded-3xl border border-[var(--card-border)] flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <p.icon className={`w-10 h-10 ${p.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-3 text-lg">{t(`cutter_page.${p.id}_title`)}</h3>
                <p className="text-sm text-[var(--muted-text)] mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {t(`cutter_page.${p.id}_desc`)}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--card-border)] w-full">
                  <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">
                    {t(`cutter_page.${p.id}_tags`)}
                  </p>
                </div>
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
      <section id="features" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cutter_page.features_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cutter_page.features_desc")}</p>
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
      <section id="how-to-use" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cutter_page.steps_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cutter_page.steps_desc")}</p>
          </div>
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

      <section id="use-cases" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cutter_page.use_cases_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cutter_page.use_cases_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`cutter_page.u${id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium mb-8">{t(`cutter_page.u${id}_desc`)}</p>
                <div className="mt-auto space-y-3">
                  {[1, 2, 3].map((p) => (
                    <div key={p} className="flex items-center gap-3 text-sm font-semibold text-[var(--foreground)]">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span>{t(`cutter_page.u${id}_p${p}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cutter_page.reviews_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cutter_page.reviews_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {REVIEWS.map((review) => (
              <div key={review.id} className="glass-card rounded-3xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <div className="flex-1">
                  <p className="text-[var(--foreground)] text-xs leading-relaxed mb-8 opacity-80">"{t(`cutter_page.r${review.id}_text`)}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--card-border)]">
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
      <section id="faq" className="py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
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

      {/* ─── Social Share ─── */}
      <SocialShare title="Free Online Video Cutter - Trim Videos Easily" />

      {/* ─── Author Block ─── */}
      <AuthorBlock />

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="cutter" />

      <section className="py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)] tracking-tight">
              {t("cutter_page.cta_title")}
            </h2>
            <p className="text-[var(--muted-text)] text-lg md:text-xl mb-10 leading-relaxed font-medium">
              {t("cutter_page.cta_desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-sm md:text-base font-bold text-indigo-400">
              {t("cutter_page.cta_highlights").split(" ✔ ").map((h, i) => (
                <span key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  {h.replace("✔ ", "")}
                </span>
              ))}
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20"
            >
              Start Cutting Now — It's Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
