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
  ChevronDown,
  List,
  X
} from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

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
  { id: 4, name: "Marcus Lee", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
  { id: 5, name: "Rachel Kim", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
  { id: 6, name: "Daniel Brooks", avatar: "https://randomuser.me/api/portraits/men/16.jpg" },
  { id: 7, name: "Isabella Cruz", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
  { id: 8, name: "Nathan Cole", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
  { id: 9, name: "Olivia Vance", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
];

const FAQS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const COMPARISON_ROWS = [
  { id: "privacy", icon: Shield },
  { id: "speed", icon: Zap },
  { id: "cost", icon: Star },
  { id: "install", icon: Globe },
  { id: "accuracy", icon: CheckCircle2 }
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
      
      <Breadcrumbs items={[{ label: "AI Tools", href: "/" }, { label: "Video to Text", href: "/video-to-text" }]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-6 pb-16 overflow-hidden bg-[var(--background)]">
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

      {/* ─── Table of Contents ─── */}
      <section className="py-8 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 border border-[var(--card-border)]">
            <h3 className="text-sm font-bold text-[var(--muted-text)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <List className="w-4 h-4" /> {t("common.quick_navigation") || "Quick Navigation"}
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-[var(--foreground)]">
              <a href="#features" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">Key Features</a>
              <a href="#comparison-table" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">How We Compare</a>
              <a href="#how-to-use" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">How to Transcribe</a>
              <a href="#faq" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 underline decoration-blue-500/30 decoration-2 underline-offset-4">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)] italic">{t("to_text_page.features_title")}</h2>
          <p className="text-[var(--muted-text)] text-base mb-16 max-w-2xl mx-auto leading-relaxed">{t("to_text_page.features_desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all group">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`to_text_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium whitespace-pre-line">{t(`to_text_page.f${f.id}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section id="comparison-table" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("to_text_page.table_title")}</h2>
            <p className="text-[var(--muted-text)] text-base max-w-2xl mx-auto leading-relaxed">{t("to_text_page.table_desc")}</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-hidden rounded-[2rem] border border-[var(--card-border)] shadow-2xl shadow-indigo-500/5 bg-white/5 dark:bg-slate-900/40 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[var(--card-border)] bg-indigo-500/5">
                    <th className="p-6 text-sm font-bold text-[var(--foreground)] uppercase tracking-wider w-[25%]">{t("to_text_page.th_feature")}</th>
                    <th className="p-6 text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider w-[35%] bg-indigo-500/5 border-x border-[var(--card-border)]">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                        VideoCompressorPro
                      </span>
                    </th>
                    <th className="p-6 text-sm font-bold text-[var(--muted-text)] uppercase tracking-wider w-[20%]">Cloud AI Tools</th>
                    <th className="p-6 text-sm font-bold text-[var(--muted-text)] uppercase tracking-wider w-[20%]">Manual Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors group">
                      {/* Feature Name */}
                      <td className="p-6 font-bold text-[var(--foreground)] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                          <row.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{t(`to_text_page.row_${row.id}_title`)}</span>
                      </td>

                      {/* VideoCompressorPro (Our Tool) */}
                      <td className="p-6 text-sm font-semibold text-[var(--foreground)] bg-indigo-500/5 border-x border-[var(--card-border)] relative">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{t(`to_text_page.row_${row.id}_val1`)}</span>
                        </div>
                      </td>

                      {/* Cloud AI Tools */}
                      <td className="p-6 text-sm font-medium text-[var(--muted-text)]">
                        <div className="flex items-center gap-2">
                          {row.id === "privacy" || row.id === "cost" ? (
                            <X className="w-4 h-4 text-red-500 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <span>{t(`to_text_page.row_${row.id}_val2`)}</span>
                        </div>
                      </td>

                      {/* Manual Agency */}
                      <td className="p-6 text-sm font-medium text-[var(--muted-text)]">
                        <div className="flex items-center gap-2">
                          {row.id === "privacy" || row.id === "speed" || row.id === "cost" || row.id === "install" ? (
                            <X className="w-4 h-4 text-red-500 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          <span>{t(`to_text_page.row_${row.id}_val3`)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section id="how-to-use" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("to_text_page.steps_title")}</h2>
          <p className="text-[var(--muted-text)] text-base mb-16 max-w-2xl mx-auto leading-relaxed">{t("to_text_page.steps_desc")}</p>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`to_text_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium whitespace-pre-line">{t(`to_text_page.s${s.id}_desc`)}</p>
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
            <p className="text-[var(--muted-text)] text-base max-w-2xl mx-auto leading-relaxed">{t("to_text_page.reviews_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {REVIEWS.map((review) => (
              <div key={review.id} className="glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <div className="flex-1">
                  <p className="text-[var(--foreground)] text-sm leading-relaxed mb-8 font-medium opacity-90 italic">"{t(`to_text_page.r${review.id}_text`)}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--card-border)]">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-xs">{review.name}</div>
                    <div className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`to_text_page.r${review.id}_role`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 bg-[var(--background)]">
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

      {/* ─── Author Block ─── */}
      <AuthorBlock />

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
