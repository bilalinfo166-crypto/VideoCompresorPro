"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Music, Zap, Shield, Sparkles, CheckCircle2, Star, ArrowRight, Play, AudioLines, Download, Headphones, Mic2, Disc, Globe, Speaker, Smartphone, Youtube, Film, Radio, FileAudio, ChevronDown, List } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

const VideoToMp3 = dynamic(
  () => import("@/components/tools/VideoToMp3").then((m) => m.VideoToMp3),
  { ssr: false }
);

const FEATURES = [
  { id: 1, icon: AudioLines },
  { id: 2, icon: Shield },
  { id: 3, icon: Download },
  { id: 4, icon: Disc },
  { id: 5, icon: Zap },
  { id: 6, icon: Star },
];

const STEPS = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const REVIEWS = [
  { id: 1, name: "Oliver Stone", avatar: "https://randomuser.me/api/portraits/men/60.jpg" },
  { id: 2, name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/61.jpg" },
  { id: 3, name: "Ahmed Mansour", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
  { id: 4, name: "Chloe Leblanc", avatar: "https://randomuser.me/api/portraits/women/63.jpg" },
  { id: 5, name: "Hans Müller", avatar: "https://randomuser.me/api/portraits/men/64.jpg" },
  { id: 6, name: "Valentina Moretti", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 7, name: "Park Ji-hoon", avatar: "https://randomuser.me/api/portraits/men/66.jpg" },
  { id: 8, name: "Siti Aminah", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
  { id: 9, name: "Lucas Dubois", avatar: "https://randomuser.me/api/portraits/men/68.jpg" },
  { id: 10, name: "Nina Ivanova", avatar: "https://randomuser.me/api/portraits/women/69.jpg" },
  { id: 11, name: "Liam Wilson", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 12, name: "Sophia Garcia", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function VideoToMp3Page() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`to_mp3_page.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`to_mp3_page.a${faq.id}`)
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Breadcrumbs items={[{ label: "Audio Tools", href: "/" }, { label: "Video to MP3", href: "/video-to-mp3" }]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md">
              <Music className="w-4 h-4" />
              {t("to_mp3_page.hero_badge")}
            </div>
            <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--foreground)]">
              {t("to_mp3_page.hero_title").split(" ").slice(0,2).join(" ")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">{t("to_mp3_page.hero_title").split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-center text-xl text-[var(--muted-text)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("to_mp3_page.hero_subtitle")}
            </p>
            <VideoToMp3 />
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
              <a href="#visualizer" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">Visualizer</a>
              <a href="#features" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">Key Features</a>
              <a href="#how-to-use" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">How to Convert</a>
              <a href="#faq" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cinematic Video Section ─── */}
      <section id="visualizer" className="relative py-32 border-y border-white/5 overflow-hidden bg-[#020617]">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-white italic">{t("to_mp3_page.visualizer_title")}</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">{t("to_mp3_page.visualizer_desc")}</p>
            
            <div className="relative glass-card rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black/80 aspect-video max-w-4xl mx-auto flex items-center justify-center">
               <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
                 <source src="/demo-video.mp4" type="video/mp4" />
               </video>
               
               <div className="relative z-10 w-full px-12">
                  <div className="flex items-end justify-center gap-1 h-32 mb-8">
                     {[...Array(30)].map((_, i) => (
                        <div key={i} className="w-2 bg-gradient-to-t from-pink-500 to-rose-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s` }} />
                     ))}
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-white/10 inline-flex items-center gap-4 bg-white/5 backdrop-blur-md">
                     <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                     </div>
                     <div className="text-left">
                        <div className="text-sm font-black text-white uppercase tracking-widest">{t("to_mp3_page.visualizer_label")}</div>
                        <div className="text-pink-400 font-mono text-xl">{t("to_mp3_page.visualizer_format")}</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)] italic">{t("to_mp3_page.features_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all text-center">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`to_mp3_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`to_mp3_page.f${f.id}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section id="how-to-use" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)]">{t("to_mp3_page.steps_title")}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`to_mp3_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`to_mp3_page.s${s.id}_desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("to_mp3_page.reviews_title")}</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-4 gap-6 max-w-7xl mx-auto space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="break-inside-avoid glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-[var(--foreground)] text-xs leading-relaxed mb-8 opacity-80">"{t(`to_mp3_page.r${review.id}_text`)}"</p>
                <div className="flex items-center gap-4">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-[10px]">{review.name}</div>
                    <div className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`to_mp3_page.r${review.id}_role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-[var(--foreground)] italic">{t("to_mp3_page.faq_title")}</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`to_mp3_page.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed text-sm border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`to_mp3_page.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Share ─── */}
      <SocialShare title="Convert Video to MP3 Online Free" />

      {/* ─── Author Block ─── */}
      <AuthorBlock />

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="to_mp3" />

      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)] italic">{t("to_mp3_page.cta_title").split(" ").slice(0,2).join(" ")} <br /><span className="text-indigo-500">{t("to_mp3_page.cta_title").split(" ").slice(2).join(" ")}</span></h2>
          <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 group">
            {t("common.go_home")} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
