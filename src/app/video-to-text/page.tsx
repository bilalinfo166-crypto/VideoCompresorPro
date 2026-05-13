"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Type, 
  Zap, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Play, 
  Globe, 
  Clock, 
  MessageSquare,
  FileText,
  ChevronDown
} from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";

const VideoToText = dynamic(
  () => import("@/components/tools/VideoToText").then((m) => m.VideoToText),
  { ssr: false }
);

const FEATURES = [
  { id: 1, icon: Sparkles },
  { id: 2, icon: Shield },
  { id: 3, icon: FileText },
  { id: 4, icon: Globe },
  { id: 5, icon: Clock },
  { id: 6, icon: Star },
];

const STEPS = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const REVIEWS = [
  { id: 1, name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
  { id: 2, name: "Julian Rossi", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 3, name: "Sophia Chen", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function VideoToTextPage() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`to_text_page.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`to_text_page.a${faq.id}`)
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
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium backdrop-blur-md">
                <Type className="w-4 h-4" />
                {t("to_text_page.hero_badge")}
              </div>
            </div>

            <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--foreground)]">
              {t("to_text_page.hero_title").split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">{t("to_text_page.hero_title").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-center text-xl text-[var(--muted-text)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("to_text_page.hero_subtitle")}
            </p>

            <VideoToText />
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)]">{t("to_text_page.features_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all group">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`to_text_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`to_text_page.f${f.id}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-[var(--foreground)]">{t("to_text_page.steps_title")}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`to_text_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`to_text_page.s${s.id}_desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("to_text_page.reviews_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {REVIEWS.map((review) => (
              <div key={review.id} className="glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-[var(--foreground)] text-sm leading-relaxed mb-8 font-medium opacity-90 italic">"{t(`to_text_page.r${review.id}_text`)}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-xs">{review.name}</div>
                    <div className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{review.id === 1 ? "Content Creator" : review.id === 2 ? "Journalist" : "Student"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-[var(--foreground)]">{t("to_text_page.faq_title")}</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`to_text_page.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed text-sm border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`to_text_page.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Share ─── */}
      <SocialShare title="Video to Text Transcription Online Free" />

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="to_text" />

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t("to_text_page.cta_title")}</h2>
          <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 group">
            {t("common.go_home")} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
