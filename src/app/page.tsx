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

// Grouped dynamic imports for better chunking
const ToolSection = dynamic(() => import("@/components/tools/VideoCompressor").then(m => m.VideoCompressor), { 
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
});

const Visualizer = dynamic(() => import("@/components/home/QualityVisualizer").then(m => m.QualityVisualizer), { ssr: false });
const ReviewsAndFaq = dynamic(() => Promise.all([
  import("@/components/home/Reviews"),
  import("@/components/home/FaqSection")
]).then(([r, f]) => {
  return function ReviewsAndFaq() {
    return (
      <>
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

      <Features />
      <FeatureGrid />
      <UseCases />
      <Comparison />
      <HowItWorks />
      
      <Visualizer />

      <AllTools />
      <WhyChoose />

      <SupportedFormats />
      <CtaBanner />
      <RelatedTools exclude="compressor" />
      <ReviewsAndFaq />

      <SocialShare />
      <AuthorBlock />
    </div>
  );
}
