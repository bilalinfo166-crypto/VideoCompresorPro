"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { SEOData } from "@/data/compressor-seo";
import {
  Zap, Shield, Sparkles, ChevronDown, Globe,
  Scissors, Crop, Music, FileVideo, FileText,
  CheckCircle2, Star, ArrowRight, Play, UploadCloud, List,
  Smartphone, Activity, Mail, Monitor, Layers, Layout
} from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Features } from "@/components/home/Features";
import { Comparison } from "@/components/home/Comparison";
import { AllTools } from "@/components/home/AllTools";
import { WhyChoose } from "@/components/home/WhyChoose";
import { UseCases } from "@/components/home/UseCases";
import { SupportedFormats } from "@/components/home/SupportedFormats";
import { CtaBanner } from "@/components/home/CtaBanner";

// Icon mapping for features
const ICON_MAP: Record<string, any> = {
  Sparkles, Shield, Smartphone, Zap, Globe, Activity, 
  Mail, Monitor, Star, Layers, CheckCircle2, Crop: Layout
};

// Grouped dynamic imports
const ToolSection = dynamic(() => import("@/components/tools/VideoCompressor").then(m => m.VideoCompressor), { 
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
});

const Visualizer = dynamic(() => import("@/components/home/QualityVisualizer").then(m => m.QualityVisualizer), { ssr: false });

export default function CompressorClient({ data, slug }: { data: SEOData, slug: string }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col transition-colors duration-300">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Compressor", href: "/" },
          { label: slug.toUpperCase(), href: `/compress-${slug}` }
        ]} 
      />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-20 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                No Quality Loss · Fast Compression
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.1] text-[var(--foreground)] px-2">
               {data.h1}
            </h1>
            <p className="text-center text-base sm:text-xl text-[var(--muted-text)] mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {data.heroText}
            </p>

            {/* Tool Container */}
            <div className="relative z-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] rounded-[2.5rem]">
              <ToolSection />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Intro & SEO Content ─── */}
      <section className="py-20 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-8">{t("common.why_choose")} {slug.toUpperCase()}</h2>
              <p className="text-[var(--muted-text)] font-medium leading-relaxed mb-12">
                {data.introText}
              </p>
           </div>

           {/* Custom Features from SEO Data */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {data.features.map((f, i) => {
                const Icon = ICON_MAP[f.icon] || Sparkles;
                return (
                  <div key={i} className="p-8 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/40 border border-[var(--card-border)] hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                       <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--muted-text)] font-medium leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* ─── Main Structure Sections ─── */}
      <StatsStrip />
      
      {/* How it works with SEO Data */}
      <section id="how-it-works" className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl sm:text-5xl font-black text-center mb-16">How to Compress {slug.toUpperCase()}</h2>
             <div className="grid grid-cols-1 gap-12">
                {data.steps.map((s, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-8 items-center bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-[var(--card-border)] shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 text-center sm:text-left">{s.title}</h3>
                      <p className="text-[var(--muted-text)] font-medium leading-relaxed text-center sm:text-left">{s.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <Features />
      <Visualizer />

      {/* FAQ with SEO Data */}
      <section id="faq" className="py-20 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl sm:text-5xl font-black text-center mb-16">FAQs for {slug.toUpperCase()}</h2>
           <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/40 border border-[var(--card-border)]">
                   <h3 className="text-lg font-black mb-4 flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      {faq.q}
                   </h3>
                   <p className="text-[var(--muted-text)] font-medium leading-relaxed pl-5">
                      {faq.a}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <AllTools />
      <WhyChoose />
      <SupportedFormats />
      <CtaBanner />
      <RelatedTools exclude="compressor" />
      
      <div className="py-20 bg-[var(--background)] border-t border-[var(--card-border)]">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
               <div className="flex-1">
                  <AuthorBlock />
               </div>
               <div className="w-full md:w-80">
                  <div className="h-full glass-card p-8 rounded-[32px] border border-[var(--card-border)] flex flex-col justify-center">
                     <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-center">Share this tool</h4>
                     <SocialShare />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
