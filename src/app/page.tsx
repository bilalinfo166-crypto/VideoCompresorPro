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
import { StatsStrip } from "@/components/home/StatsStrip";
import { Features } from "@/components/home/Features";
import { Comparison } from "@/components/home/Comparison";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AllTools } from "@/components/home/AllTools";
import { WhyChoose } from "@/components/home/WhyChoose";
import { SupportedFormats } from "@/components/home/SupportedFormats";
import { CtaBanner } from "@/components/home/CtaBanner";

// Grouped dynamic imports for better chunking
const ToolSection = dynamic(() => import("@/components/tools/VideoCompressor").then(m => m.VideoCompressor), { 
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
});

const ExtraContent = dynamic(() => Promise.all([
  import("@/components/home/QualityVisualizer"),
  import("@/components/home/Reviews"),
  import("@/components/home/FaqSection")
]).then(([q, r, f]) => {
  return function ExtraContent() {
    return (
      <>
        <q.QualityVisualizer />
        <r.Reviews />
        <f.FaqSection />
      </>
    );
  };
}), { ssr: false });




const FAQS = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
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
      <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-20 overflow-hidden bg-[var(--background)]">
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
                <Sparkles className="w-4 h-4" aria-hidden="true" />
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
              <ToolSection />
            </div>

          </div>
        </div>
      </section>

      {/* ─── Table of Contents ─── */}
      <section className="py-8 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 border border-[var(--card-border)]">
            <h2 className="text-sm font-bold text-[var(--muted-text)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <List className="w-4 h-4" aria-hidden="true" /> {t("common.quick_navigation")}
            </h2>

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
            <p className="text-[var(--muted-text)] text-sm md:text-base font-medium max-w-2xl mx-auto">{t("trusted.desc")}</p>
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

      <StatsStrip />
      <Features />
      <Comparison />
      <HowItWorks />
      
      <ExtraContent />

      <AllTools />
      <WhyChoose />

      <SupportedFormats />
      <CtaBanner />
      <RelatedTools exclude="compressor" />

      <SocialShare />
      <AuthorBlock />
    </div>
  );
}
