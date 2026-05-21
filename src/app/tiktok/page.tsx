"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, List, Zap, Shield, Star, CheckCircle2, Smartphone, ShieldCheck, Play, ArrowRight } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Reviews } from "@/components/home/Reviews";
import { FaqSection } from "@/components/home/FaqSection";

// Dynamic import for optimized WASM-based Video Compressor tool
const ToolSection = dynamic(() => import("@/components/tools/VideoCompressor").then(m => m.VideoCompressor), { 
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
});

export default function TikTokPage() {
  const { t } = useLanguage();

  const faqItems = [
    { q: t("tiktok_page.faq_q1"), a: t("tiktok_page.faq_a1") },
    { q: t("tiktok_page.faq_q2"), a: t("tiktok_page.faq_a2") },
    { q: t("tiktok_page.faq_q3"), a: t("tiktok_page.faq_a3") },
    { q: t("tiktok_page.faq_q4"), a: t("tiktok_page.faq_a4") },
    { q: t("tiktok_page.faq_q5"), a: t("tiktok_page.faq_a5") },
  ];

  const reviewsItems = [
    { id: 1, name: "Sarah Mitchell", avatar: "https://randomuser.me/api/portraits/women/2.jpg", text: t("tiktok_page.review_r1_text"), role: t("tiktok_page.review_r1_role") },
    { id: 2, name: "Daniel Lee", avatar: "https://randomuser.me/api/portraits/men/3.jpg", text: t("tiktok_page.review_r2_text"), role: t("tiktok_page.review_r2_role") },
    { id: 3, name: "Olivia Brown", avatar: "https://randomuser.me/api/portraits/women/4.jpg", text: t("tiktok_page.review_r3_text"), role: t("tiktok_page.review_r3_role") },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Breadcrumbs items={[
        { label: t("nav.compressor"), href: "/" },
        { label: "TikTok Video Compressor", href: "/tiktok" }
      ]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-20 overflow-hidden bg-[var(--background)]">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
        {/* Premium soft glows for TikTok (Pink and Cyan) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" aria-hidden="true" />
                {t("tiktok_page.features_badge")} · {t("common.no_uploads")}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.1] text-[var(--foreground)] px-2">
               {t("tiktok_page.hero_title")}
            </h1>
            <p className="text-center text-base sm:text-xl text-[var(--muted-text)] mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {t("tiktok_page.hero_subtitle")}
            </p>

            {/* Tool Container with Shadow */}
            <div className="relative z-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] rounded-[2.5rem]">
              <ToolSection />
            </div>

          </div>
        </div>
      </section>

      {/* ─── Quick Navigation ─── */}
      <section className="py-8 bg-[var(--background)] border-b border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50/50 dark:bg-slate-900/40 rounded-[2rem] p-6 sm:p-8 border border-[var(--card-border)] backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
            <h2 className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 opacity-70">
              <List className="w-3.5 h-3.5 text-pink-500" aria-hidden="true" /> {t("common.quick_navigation")}
            </h2>

            <div className="flex flex-wrap gap-x-10 gap-y-5">
              {[
                { id: "features", label: "TikTok Features", icon: Sparkles, color: "text-pink-500" },
                { id: "how-it-works", label: "How to Compress", icon: Zap, color: "text-yellow-500" },
                { id: "why-choose", label: "Why Local?", icon: Shield, color: "text-cyan-500" },
                { id: "reviews", label: "Creator Reviews", icon: Star, color: "text-amber-500" },
                { id: "faq", label: "Creator FAQ", icon: List, color: "text-slate-500" },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-pink-500 transition-all active:scale-95"
                >
                  <div className={`w-8 h-8 rounded-lg bg-white/10 border border-[var(--card-border)] flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/10 group-hover:border-pink-500/20 transition-all shadow-sm ${item.color}`}>
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all group-hover:after:w-full">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust logos marquee */}
      <LogoMarquee />

      {/* ─── Platform Custom Stats Strip ─── */}
      <section className="py-10 sm:py-12 bg-[var(--background)] border-b border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { value: "287MB", label: "iOS Upload Limit", desc: "Compresses perfectly under" },
              { value: "9:16", label: "Aspect Ratio", desc: "No cropping or distortion" },
              { value: "H.264", label: "TikTok Video Codec", desc: "Optimal playback format" },
              { value: "100%", label: "Private Browser Compression", desc: "Zero files leave your device" }
            ].map((s, i) => (
              <div key={i} className="text-center group p-4 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-600 mb-1 group-hover:scale-105 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-[var(--foreground)] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[var(--muted-text)] text-[10px] font-medium">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Custom TikTok Features Section ─── */}
      <section id="features" className="py-24 relative overflow-hidden bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            {/* Title Block */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-pink-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">
                {t("tiktok_page.features_badge")} Features
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 leading-tight">
                {t("tiktok_page.features_title")}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {t("tiktok_page.features_desc")}
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Beat the FYP Size Limits",
                  desc: "TikTok caps uploads (287MB on iOS, 72MB on Android). Compress videos down to light sizes to prevent errors, speed up uploads, and secure instant indexing.",
                  icon: Zap,
                  bg: "group-hover:bg-pink-500/10 border-pink-500/20 text-pink-600"
                },
                {
                  title: "Keep Perfect 9:16 Layout",
                  desc: "Optimized specifically for vertical smart phone screens. Your files are encoded directly without stretching, skewing, or introducing black borders.",
                  icon: Smartphone,
                  bg: "group-hover:bg-cyan-500/10 border-cyan-500/20 text-cyan-600"
                },
                {
                  title: "Retain Stunning Clarity",
                  desc: "Uses client-side WASM encoding to target specific bitrate ranges. Keeps your high-definition smartphone or editor footage ultra-sharp to maximize watch time.",
                  icon: Sparkles,
                  bg: "group-hover:bg-indigo-500/10 border-indigo-500/20 text-indigo-600"
                }
              ].map((card, i) => (
                <div key={i} className="group p-8 rounded-[2rem] border border-[var(--card-border)] bg-slate-50/20 dark:bg-slate-900/10 hover:border-[var(--card-border-hover)] hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-white/5 shadow-sm mb-6 group-hover:scale-110 transition-transform ${card.bg}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">{card.title}</h3>
                  <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Split Feature Visual Showcase */}
            <div className="grid md:grid-cols-2 gap-12 items-center pt-8 border-t border-[var(--card-border)]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Performance
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-6">
                  Optimized WebAssembly Architecture
                </h3>
                <p className="text-[var(--muted-text)] leading-relaxed text-base font-medium mb-4">
                  Traditional web compressors upload your gigabyte-sized recordings to online servers, leading to slow compression, storage fees, and privacy hazards.
                </p>
                <p className="text-[var(--muted-text)] leading-relaxed text-base font-medium">
                  Antigravity uses client-side WASM compilation. It embeds the compression engine straight inside your web browser, bypassing server upload limits entirely for lightning-fast results.
                </p>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-[var(--card-border)] aspect-[4/3] bg-gradient-to-tr from-pink-500/10 via-indigo-500/5 to-cyan-500/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none" />
                <div className="text-center z-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-xl mb-6 group-hover:scale-105 transition-transform duration-500">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-lg text-[var(--foreground)] mb-2">9:16 Video Ready</h4>
                  <p className="text-xs text-[var(--muted-text)] max-w-xs mx-auto font-medium">
                    Perfect for mobile creators uploading directly to TikTok feeds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Custom TikTok-Tailored How to Compress Section ─── */}
      <section id="how-it-works" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-700 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <Zap className="w-3.5 h-3.5" /> 3 Simple Steps
            </div>
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
              {t("how_it_works.title")}
            </h2>
            <p className="text-[var(--muted-text)] text-lg font-medium">
              {t("how_it_works.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: t("steps.01_title"),
                desc: t("steps.01_desc").replace("video file", "TikTok raw video"),
                color: "group-hover:border-pink-500/30 group-hover:bg-pink-500/5",
                badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
              },
              {
                number: "02",
                title: t("steps.02_title"),
                desc: "Choose smart size presets (Basic, Strong, or Extreme) to easily slip below TikTok's 287MB limit while keeping visual clarity high.",
                color: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5",
                badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              },
              {
                number: "03",
                title: t("steps.03_title"),
                desc: "WASM encodes your file instantly in-browser. Download your optimized video directly and publish to TikTok for lightning-fast FYP playback.",
                color: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5",
                badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
              }
            ].map((step, i) => (
              <div key={i} className={`group p-8 rounded-[2rem] border border-[var(--card-border)] bg-slate-50/10 dark:bg-slate-900/5 hover:shadow-2xl transition-all duration-300 relative ${step.color}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-sm group-hover:scale-110 transition-transform ${step.badge}`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Custom TikTok-Tailored Why Choose Section ─── */}
      <section id="why-choose" className="py-24 bg-[var(--background)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Shield className="w-4 h-4" /> Local Privacy First
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[var(--foreground)]">
                  {t("tiktok_page.why_choose_title")}
                </h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed mb-8 font-medium">
                  {t("tiktok_page.why_choose_desc")}
                </p>
                <div className="space-y-4">
                  {[
                    "why_choose.point1",
                    "why_choose.point2",
                    "why_choose.point3",
                    "why_choose.point4",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3.5 text-[var(--muted-text)] font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />
                <div className="relative z-10 border border-[var(--card-border)] bg-slate-50/80 dark:bg-slate-900/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg mb-8">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Offline In-Browser Compression</h3>
                  <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium mb-6">
                    Unlike standard web compressors, our advanced tool runs 100% locally in your web browser. Utilizing fast WebAssembly technology, your private video drafts are compressed strictly on your machine and never hit our servers.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10 border border-pink-500/20 py-2.5 px-4 rounded-xl inline-flex">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                    Zero server uploads. Absolute local security.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related tools navigation */}
      <RelatedTools exclude="compressor" />
      
      {/* Dynamic TikTok Creator Reviews */}
      <Reviews 
        title="What TikTok Creators Say" 
        desc="See how influencers, managers, and editors optimize drafts with Antigravity." 
        items={reviewsItems} 
      />
      
      {/* Dynamic TikTok FAQs */}
      <FaqSection 
        title="TikTok Compressor Help & FAQ" 
        desc="Everything you need to know about preparing videos for the TikTok algorithm." 
        items={faqItems} 
      />

      <SocialShare />
      <AuthorBlock />
    </div>
  );
}
