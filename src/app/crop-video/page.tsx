"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { Crop, Zap, Shield, Sparkles, CheckCircle2, Star, ArrowRight, Play, Layout, Monitor, Smartphone, Globe, HardDrive, Youtube, Instagram, Facebook, Video, Layers, Film, Activity, ChevronDown, Tablet, List, Cpu, MousePointer2, HelpCircle } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { SocialShare } from "@/components/layout/SocialShare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorBlock } from "@/components/layout/AuthorBlock";

const VideoCropper = dynamic(
  () => import("@/components/tools/VideoCropper").then((m) => m.VideoCropper),
  { ssr: false }
);

const SOCIAL_PLATFORMS = [
  { id: "ig", icon: Instagram, color: "text-pink-500" },
  { id: "tt", icon: Video, color: "text-emerald-400" },
  { id: "yt", icon: Youtube, color: "text-red-500" },
  { id: "fb", icon: Facebook, color: "text-blue-500" },
];

const FEATURES = [
  { id: 1, icon: Layout },
  { id: 2, icon: Shield },
  { id: 3, icon: Sparkles },
  { id: 4, icon: Monitor },
  { id: 5, icon: Film },
  { id: 6, icon: Star },
];

const STEPS = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const REVIEWS = [
  { id: 1, name: "Marco Rossi", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
  { id: 2, name: "Marta Nowak", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 3, name: "Thomas Wright", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
  { id: 4, name: "Sofie Nielsen", avatar: "https://randomuser.me/api/portraits/women/59.jpg" },
  { id: 5, name: "Lucia Santos", avatar: "https://randomuser.me/api/portraits/women/51.jpg" },
  { id: 6, name: "Lars Erikson", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
  { id: 7, name: "Yuki Chen", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
  { id: 8, name: "Liam Wilson", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 9, name: "Emma Clarke", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
  { id: 10, name: "Daniel Foster", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 11, name: "Ava Mitchell", avatar: "https://randomuser.me/api/portraits/women/48.jpg" },
  { id: 12, name: "Noah Bennett", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
];

const FAQS = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
  { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }
];

export default function CropVideoPage() {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": t(`cropper_page.q${faq.id}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`cropper_page.a${faq.id}`)
      }
    }))
  };

  return (
    <div className="flex flex-col transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Breadcrumbs items={[{ label: "Video Tools", href: "/" }, { label: "Crop Video", href: "/crop-video" }]} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-6 pb-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium backdrop-blur-md">
                <Crop className="w-4 h-4" />
                {t("cropper_page.hero_badge")}
              </div>
            </div>

            <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[var(--foreground)]">
              {t("cropper_page.hero_title").split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">{t("cropper_page.hero_title").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-center text-xl text-[var(--muted-text)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("cropper_page.hero_subtitle")}
            </p>

            <VideoCropper />
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
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-base font-bold text-[var(--foreground)]">
              <a href="#social-aspects" className="hover:text-blue-500 transition-all flex items-center gap-2 group">
                <Layout className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>Social Platforms</span>
              </a>
              <a href="#features" className="hover:text-blue-500 transition-all flex items-center gap-2 group">
                <Cpu className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>Advanced Features</span>
              </a>
              <a href="#how-to-use" className="hover:text-blue-500 transition-all flex items-center gap-2 group">
                <MousePointer2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>How to Use</span>
              </a>
              <a href="#use-cases" className="hover:text-blue-500 transition-all flex items-center gap-2 group">
                <Globe className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>Real-World Examples</span>
              </a>
              <a href="#faq" className="hover:text-blue-500 transition-all flex items-center gap-2 group">
                <HelpCircle className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>Common Questions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Platforms ─── */}
      <section id="social-aspects" className="py-20 bg-[var(--background)] border-y border-[var(--card-border)] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cropper_page.social_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cropper_page.social_desc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.id} className="glass-card p-8 rounded-3xl border border-[var(--card-border)] flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <p.icon className={`w-10 h-10 ${p.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-3 text-lg">{t(`cropper_page.${p.id}_title`)}</h3>
                <p className="text-sm text-[var(--muted-text)] mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {t(`cropper_page.${p.id}_desc`)}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--card-border)] w-full">
                  <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">
                    {t(`cropper_page.${p.id}_tags`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cinematic Video Section ─── */}
      <section className="relative py-32 border-y border-white/5 overflow-hidden bg-[#020617]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white italic drop-shadow-lg">{t("cropper_page.visualizer_title")}</h2>
            <p className="text-slate-100 font-medium text-lg drop-shadow-md">{t("cropper_page.visualizer_desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
               <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-transform group-hover:scale-[1.02]">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                    <source src="/demo-video.mp4" type="video/mp4" />
                    <track kind="captions" src="" label="None" />
                  </video>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">YouTube</div>
               </div>
               <div className="mt-4 text-center text-slate-500 text-xs font-bold uppercase tracking-tighter">16:9 Widescreen</div>
            </div>

            <div className="group relative">
               <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-transform group-hover:scale-[1.02] max-w-[300px] mx-auto">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                    <source src="/demo-video.mp4" type="video/mp4" />
                    <track kind="captions" src="" label="None" />
                  </video>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Instagram</div>
               </div>
               <div className="mt-4 text-center text-slate-500 text-xs font-bold uppercase tracking-tighter">1:1 Square</div>
            </div>

            <div className="group relative">
               <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-transform group-hover:scale-[1.02] max-h-[400px] mx-auto">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                    <source src="/demo-video.mp4" type="video/mp4" />
                    <track kind="captions" src="" label="None" />
                  </video>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20">TikTok</div>
               </div>
               <div className="mt-4 text-center text-slate-500 text-xs font-bold uppercase tracking-tighter">9:16 Vertical</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cropper_page.features_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cropper_page.features_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.id} className="glass-card p-10 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all flex flex-col h-full">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8">
                  <f.icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{t(`cropper_page.f${f.id}_title`)}</h3>
                <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium mb-8">{t(`cropper_page.f${f.id}_desc`)}</p>
                <div className="mt-auto pt-6 border-t border-[var(--card-border)]">
                  <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest leading-tight">
                    {t(`cropper_page.f${f.id}_tags`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section id="how-to-use" className="py-24 bg-[var(--background)] border-y border-[var(--card-border)]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight">{t("cropper_page.steps_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cropper_page.steps_desc")}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
             {STEPS.map(s => (
               <div key={s.number} className="text-center group">
                  <div className="text-6xl font-black text-indigo-500/10 mb-6 group-hover:text-indigo-500/20 transition-colors">{s.number}</div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{t(`cropper_page.s${s.id}_title`)}</h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{t(`cropper_page.s${s.id}_desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Use Cases Section ─── */}
      <section id="use-cases" className="py-24 bg-[var(--background)] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--foreground)] tracking-tight italic">{t("cropper_page.use_cases_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium text-lg leading-relaxed">{t("cropper_page.use_cases_desc")}</p>
          </div>

          <div className="space-y-32 max-w-6xl mx-auto">
            {/* Use Case 1 & 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-12">
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-indigo-500 transition-colors">{t("cropper_page.u1_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u1_desc")}</p>
                  </div>
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-indigo-500 transition-colors">{t("cropper_page.u2_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u2_desc")}</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full" />
                <Image 
                  src="/marketing/platforms.png" 
                  alt="Multi-platform cropping" 
                  width={600} 
                  height={400} 
                  loading="lazy"
                  className="relative rounded-3xl border border-[var(--card-border)] shadow-2xl"
                />
              </div>
            </div>

            {/* Use Case 3 & 4 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-violet-500/10 blur-2xl rounded-full" />
                <Image 
                  src="/marketing/ads.png" 
                  alt="Ads and mobile optimization" 
                  width={600} 
                  height={400} 
                  loading="lazy"
                  className="relative rounded-3xl border border-[var(--card-border)] shadow-2xl"
                />
              </div>
              <div>
                <div className="space-y-12">
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-violet-500 transition-colors">{t("cropper_page.u3_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u3_desc")}</p>
                  </div>
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-violet-500 transition-colors">{t("cropper_page.u4_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u4_desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Case 5 & 6 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-12">
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-blue-500 transition-colors">{t("cropper_page.u5_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u5_desc")}</p>
                  </div>
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:text-blue-500 transition-colors">{t("cropper_page.u6_title")}</h3>
                    <p className="text-[var(--muted-text)] leading-relaxed font-medium">{t("cropper_page.u6_desc")}</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full" />
                <Image 
                  src="/marketing/focus.png" 
                  alt="Subject focus and engagement" 
                  width={600} 
                  height={400} 
                  loading="lazy"
                  className="relative rounded-3xl border border-[var(--card-border)] shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("cropper_page.reviews_title")}</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-4 gap-6 max-w-7xl mx-auto space-y-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="break-inside-avoid glass-card rounded-2xl p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-[var(--foreground)] text-xs leading-relaxed mb-8 opacity-80">"{t(`cropper_page.r${review.id}_text`)}"</p>
                <div className="flex items-center gap-4">
                  <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full ring-2 ring-white/10" />
                  <div>
                    <div className="font-bold text-[var(--foreground)] text-[12px]">{review.name}</div>
                    <div className="text-[11px] text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`cropper_page.r${review.id}_role`)}</div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-[var(--foreground)]">{t("cropper_page.faq_title")}</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-[var(--foreground)] pr-4">{t(`cropper_page.q${faq.id}`)}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed text-sm border-t border-[var(--card-border)] pt-4 font-medium">
                    {t(`cropper_page.a${faq.id}`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Share ─── */}
      <SocialShare title="Free Online Video Cropper - Crop Videos Instantly" />

      {/* ─── Author Block ─── */}
      <AuthorBlock />

      {/* ─── Related Tools ─── */}
      <RelatedTools exclude="cropper" />

      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t("cropper_page.cta_title")}</h2>
          <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 group">
            {t("common.go_home")} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
