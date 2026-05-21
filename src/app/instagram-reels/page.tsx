"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, List, Zap, Shield, Star, CheckCircle2, Palette, Maximize, Smile, Lock } from "lucide-react";
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

export default function InstagramReelsPage() {
  const { t } = useLanguage();

  const faqItems = [
    { q: t("reels_page.faq_q1"), a: t("reels_page.faq_a1") },
    { q: t("reels_page.faq_q2"), a: t("reels_page.faq_a2") },
    { q: t("reels_page.faq_q3"), a: t("reels_page.faq_a3") },
    { q: t("reels_page.faq_q4"), a: t("reels_page.faq_a4") },
    { q: t("reels_page.faq_q5"), a: t("reels_page.faq_a5") },
  ];

  const reviewsItems = [
    { id: 1, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/6.jpg", text: t("reels_page.review_r1_text"), role: t("reels_page.review_r1_role") },
    { id: 2, name: "Ryan Walker", avatar: "https://randomuser.me/api/portraits/men/7.jpg", text: t("reels_page.review_r2_text"), role: t("reels_page.review_r2_role") },
    { id: 3, name: "Sophia Taylor", avatar: "https://randomuser.me/api/portraits/women/8.jpg", text: t("reels_page.review_r3_text"), role: t("reels_page.review_r3_role") },
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
        { label: "Instagram Reels Compressor", href: "/instagram-reels" }
      ]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-20 overflow-hidden bg-[var(--background)]">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
        {/* Premium soft glows for Instagram (Purple and Orange) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-500 animate-spin-slow" aria-hidden="true" />
                {t("reels_page.features_badge")} · {t("common.no_uploads")}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.1] text-[var(--foreground)] px-2">
               {t("reels_page.hero_title")}
            </h1>
            <p className="text-center text-base sm:text-xl text-[var(--muted-text)] mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {t("reels_page.hero_subtitle")}
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
              <List className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" /> {t("common.quick_navigation")}
            </h2>

            <div className="flex flex-wrap gap-x-10 gap-y-5">
              {[
                { id: "features", label: "Reels Features", icon: Sparkles, color: "text-purple-500" },
                { id: "how-it-works", label: "How to Optimize", icon: Zap, color: "text-yellow-500" },
                { id: "why-choose", label: "Why Local?", icon: Shield, color: "text-orange-500" },
                { id: "reviews", label: "Creator Reviews", icon: Star, color: "text-amber-500" },
                { id: "faq", label: "Creator FAQ", icon: List, color: "text-slate-500" },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-purple-500 transition-all active:scale-95"
                >
                  <div className={`w-8 h-8 rounded-lg bg-white/10 border border-[var(--card-border)] flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all shadow-sm ${item.color}`}>
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-purple-500 after:transition-all group-hover:after:w-full">{item.label}</span>
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
              { value: "1080p", label: "Max HD Resolution", desc: "Crystal clear Reels profile" },
              { value: "ColorSafe", label: "No Color Washout", desc: "Preserves cinematic grading" },
              { value: "0MB Upload", label: "100% Local Engine", desc: "No server bandwidth limits" },
              { value: "30 FPS", label: "Target Framerate", desc: "Stunningly smooth mobile play" }
            ].map((s, i) => (
              <div key={i} className="text-center group p-4 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-1 group-hover:scale-105 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-[var(--foreground)] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[var(--muted-text)] text-[10px] font-medium">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Custom Instagram Reels Features Section ─── */}
      <section id="features" className="py-24 relative overflow-hidden bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            {/* Title Block */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-purple-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">
                {t("reels_page.features_badge")} Features
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 leading-tight">
                {t("reels_page.features_title")}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {t("reels_page.features_desc")}
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Preserve Cinematic Color",
                  desc: "Instagram is famous for washing out cinematic color profiles. Our H.264 offline transcoder retains exact color profiles and dynamic ranges perfectly.",
                  icon: Palette,
                  bg: "group-hover:bg-purple-500/10 border-purple-500/20 text-purple-600"
                },
                {
                  title: "Optimize 9:16 Dimensions",
                  desc: "Specially configured for 1080x1920 portrait layouts. Shrink file sizes to meet Instagram's preferred playback speeds without any distortion.",
                  icon: Maximize,
                  bg: "group-hover:bg-orange-500/10 border-orange-500/20 text-orange-600"
                },
                {
                  title: "Engaging Buffer-Free Play",
                  desc: "Audiences swipe away instantly if a video buffers. Keeping your bitrates lightweight ensures instant play, capturing viewer attention immediately.",
                  icon: Smile,
                  bg: "group-hover:bg-indigo-500/10 border-indigo-500/20 text-indigo-600"
                }
              ].map((card, i) => (
                <div key={i} className="group p-8 rounded-[2rem] border border-[var(--card-border)] bg-slate-50/20 dark:bg-slate-900/10 hover:border-[var(--card-border-hover)] hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <Lock className="w-3.5 h-3.5" /> High Performance
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-6">
                  Secure Local-First Architecture
                </h3>
                <p className="text-[var(--muted-text)] leading-relaxed text-base font-medium mb-4">
                  Uploading private, unreleased brand campaigns or raw video drafts to third-party servers presents high privacy hazards and slow compression.
                </p>
                <p className="text-[var(--muted-text)] leading-relaxed text-base font-medium">
                  Antigravity uses client-side WASM compilation. It embeds the compression engine straight inside your web browser, bypassing server upload limits entirely for 100% data security.
                </p>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-[var(--card-border)] aspect-[4/3] bg-gradient-to-tr from-purple-500/10 via-indigo-500/5 to-orange-500/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none" />
                <div className="text-center z-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center text-white shadow-xl mb-6 group-hover:scale-105 transition-transform duration-500">
                    <Maximize className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-lg text-[var(--foreground)] mb-2">1080x1920 Ready</h4>
                  <p className="text-xs text-[var(--muted-text)] max-w-xs mx-auto font-medium">
                    Perfect for mobile creators uploading directly to Reels & Stories.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Custom Reels-Tailored How to Compress Section ─── */}
      <section id="how-it-works" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
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
                desc: t("steps.01_desc").replace("video file", "Reels raw video"),
                color: "group-hover:border-purple-500/30 group-hover:bg-purple-500/5",
                badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              },
              {
                number: "02",
                title: t("steps.02_title"),
                desc: "Choose compression options to preserve 1080x1920 HD detail, adjusting target bitrates to retain absolute dynamic ranges.",
                color: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5",
                badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              },
              {
                number: "03",
                title: t("steps.03_title"),
                desc: "WASM encodes your file instantly in-browser. Download your mobile-ready video, perfect for Instagram's playback engine.",
                color: "group-hover:border-orange-500/30 group-hover:bg-orange-500/5",
                badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
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

      {/* ─── Custom Reels-Tailored Why Choose Section ─── */}
      <section id="why-choose" className="py-24 bg-[var(--background)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Shield className="w-4 h-4" /> Local Privacy First
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[var(--foreground)]">
                  {t("reels_page.why_choose_title")}
                </h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed mb-8 font-medium">
                  {t("reels_page.why_choose_desc")}
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
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-500/10 rounded-3xl blur-2xl" />
                <div className="relative z-10 border border-[var(--card-border)] bg-slate-50/80 dark:bg-slate-900/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center text-white shadow-lg mb-8">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Offline In-Browser Compression</h3>
                  <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium mb-6">
                    Unlike standard web compressors, our advanced tool runs 100% locally in your web browser. Utilizing fast WebAssembly technology, your private video drafts are compressed strictly on your machine and never hit our servers.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 py-2.5 px-4 rounded-xl inline-flex">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
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
      
      {/* Dynamic Reels Creator Reviews */}
      <Reviews 
        title="What Reels Creators Say" 
        desc="See how influencers, managers, and editors optimize drafts with Antigravity." 
        items={reviewsItems} 
      />
      
      {/* Dynamic Reels FAQs */}
      <FaqSection 
        title="Instagram Reels Compressor FAQ" 
        desc="Everything you need to know about preparing videos for Instagram's algorithm." 
        items={faqItems} 
      />

      <SocialShare />
      <AuthorBlock />
    </div>
  );
}
