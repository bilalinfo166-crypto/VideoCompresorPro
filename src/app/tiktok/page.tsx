"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, List, Zap, Shield, Star, Scissors, CheckCircle2 } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Features } from "@/components/home/Features";
import { Comparison } from "@/components/home/Comparison";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AllTools } from "@/components/home/AllTools";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { UseCases } from "@/components/home/UseCases";
import { SupportedFormats } from "@/components/home/SupportedFormats";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Reviews } from "@/components/home/Reviews";
import { FaqSection } from "@/components/home/FaqSection";

// Dynamic imports for optimized client bundle size and WASM support
const ToolSection = dynamic(() => import("@/components/tools/VideoCompressor").then(m => m.VideoCompressor), { 
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
});

const Visualizer = dynamic(() => import("@/components/home/QualityVisualizer").then(m => m.QualityVisualizer), { ssr: false });

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
        {/* Premium soft glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
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
      <section className="py-8 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50/50 dark:bg-slate-900/40 rounded-[2rem] p-6 sm:p-8 border border-[var(--card-border)] backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
            <h2 className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 opacity-70">
              <List className="w-3.5 h-3.5" aria-hidden="true" /> {t("common.quick_navigation")}
            </h2>

            <div className="flex flex-wrap gap-x-10 gap-y-5">
              {[
                { id: "how-it-works", label: "How it Works", icon: Zap, color: "text-yellow-500" },
                { id: "features", label: "Features", icon: Sparkles, color: "text-blue-500" },
                { id: "use-cases", label: "Use Cases", icon: Shield, color: "text-indigo-500" },
                { id: "comparison", label: "Comparison", icon: Star, color: "text-emerald-500" },
                { id: "all-tools", label: "Free Tools", icon: Scissors, color: "text-purple-500" },
                { id: "reviews", label: "User Reviews", icon: CheckCircle2, color: "text-pink-500" },
                { id: "faq", label: "FAQ", icon: List, color: "text-slate-500" },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-blue-600 transition-all active:scale-95"
                >
                  <div className={`w-8 h-8 rounded-lg bg-white/10 border border-[var(--card-border)] flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all shadow-sm ${item.color}`}>
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all group-hover:after:w-full">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />
      <StatsStrip />

      <Features context="TikTok" />
      <FeatureGrid />
      <UseCases />
      <Comparison />
      <HowItWorks />
      
      <Visualizer />

      <AllTools />
      <WhyChoose 
        title={t("tiktok_page.why_choose_title")} 
        description={t("tiktok_page.why_choose_desc")} 
        context="TikTok" 
      />

      <SupportedFormats />
      <CtaBanner />
      <RelatedTools exclude="compressor" />
      
      <Reviews 
        title={t("reviews.title")} 
        desc={t("reviews.desc")} 
        items={reviewsItems} 
      />
      
      <FaqSection 
        title={t("faq.title")} 
        desc={t("faq.desc")} 
        items={faqItems} 
      />

      <SocialShare />
      <AuthorBlock />
    </div>
  );
}
