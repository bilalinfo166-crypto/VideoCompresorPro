"use client";

import dynamic from "next/dynamic";
import { SEOData } from "@/data/compressor-seo";
import { 
  CheckCircle2, Sparkles, Shield, Smartphone, Zap, 
  Globe, Activity, Mail, Monitor, Star, Layers, 
  ArrowRight, Play, Layout, HelpCircle, List,
  Cpu, MousePointer2, ChevronDown
} from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

const VideoCompressor = dynamic(
  () => import("@/components/tools/VideoCompressor").then((m) => m.VideoCompressor),
  { ssr: false }
);

const ICON_MAP: Record<string, any> = {
  Sparkles, Shield, Smartphone, Zap, Globe, Activity, 
  Mail, Monitor, Star, Layers, CheckCircle2, Crop: Layout
};

export default function CompressorClient({ data, slug }: { data: SEOData, slug: string }) {
  return (
    <main className="min-h-screen bg-[var(--background)] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Compressor", href: "/video-compressor" },
              { label: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), href: `/compress-${slug}` }
            ]} 
          />

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tight leading-[1.1]">
            {data.h1}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-text)] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {data.heroText}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-[var(--card-border)] shadow-sm">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-[var(--foreground)]">No Watermarks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-[var(--card-border)] shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-[var(--foreground)]">Pro Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="pb-24 relative z-10">
        <VideoCompressor />
      </section>

      {/* Content Section */}
      <section className="py-24 border-t border-[var(--card-border)] bg-slate-50/30 dark:bg-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Intro */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl font-black text-[var(--foreground)] mb-6">Why Use Our {slug.toUpperCase()} Tool?</h2>
                <p className="text-lg text-[var(--muted-text)] leading-relaxed font-medium">
                  {data.introText}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.features.map((f, i) => {
                  const Icon = ICON_MAP[f.icon] || Sparkles;
                  return (
                    <div key={i} className="glass-card p-6 rounded-3xl border border-[var(--card-border)] hover:scale-[1.02] transition-all">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-[var(--foreground)] mb-2">{f.title}</h4>
                      <p className="text-sm text-[var(--muted-text)] leading-relaxed">{f.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* How to steps */}
              <div className="glass-card p-8 sm:p-12 rounded-[40px] border border-[var(--card-border)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-10 flex items-center gap-3">
                   <List className="w-6 h-6 text-blue-600" />
                   Easy Steps to Compress
                </h3>
                <div className="space-y-8">
                  {data.steps.map((s, i) => (
                    <div key={i} className="flex gap-6 items-start relative group">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--foreground)] mb-1">{s.title}</h4>
                        <p className="text-sm text-[var(--muted-text)] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-[var(--foreground)] flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-blue-600" />
                  Frequently Asked Questions
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border border-[var(--card-border)]">
                      <h4 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {faq.q}
                      </h4>
                      <p className="text-sm text-[var(--muted-text)] leading-relaxed pl-3.5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <AuthorBlock />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               {data.stats && (
                 <div className="glass-card p-8 rounded-[32px] border border-[var(--card-border)] bg-blue-600/5">
                    <h4 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Activity className="w-4 h-4 text-blue-600" />
                       Tool Statistics
                    </h4>
                    <div className="space-y-6">
                       {data.stats.map((st, i) => (
                         <div key={i} className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--muted-text)]">{st.label}</span>
                            <span className="text-lg font-black text-blue-600">{st.value}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div className="glass-card p-8 rounded-[32px] border border-[var(--card-border)]">
                  <h4 className="font-black text-xs uppercase tracking-widest mb-6">Social Share</h4>
                  <SocialShare />
               </div>

               <div className="sticky top-24">
                  <RelatedTools currentPath={`/compress-${slug}`} />
               </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--foreground)] mb-6">Ready to shrink your videos?</h2>
              <p className="text-[var(--muted-text)] font-bold mb-10">Join 100,000+ creators who trust VideoCompressorPro every month.</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-3 mx-auto"
              >
                Start Compressing Now
                <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </section>
    </main>
  );
}
