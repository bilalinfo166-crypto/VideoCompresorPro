"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    number: "01",
    title: "Choose Your Video File",
    description: "Select the video you want to shrink from your device. Our Video Compressor supports all major formats like MP4, MOV, and AVI for fast processing.",
  },
  {
    number: "02",
    title: "Optimize Compression Settings",
    description: "Select a mode to reduce video size: Basic for speed, Strong for balance, or Extreme to compress video files by up to 90% without quality loss.",
  },
  {
    number: "03",
    title: "Download Compressed File",
    description: "Once our online video compressor finishes its work, download your smaller file instantly. No waiting, no uploads, and 100% privacy guaranteed.",
  },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{t("how_it_works.title")}</h2>
          <p className="text-[var(--muted-text)] text-lg font-medium">{t("how_it_works.desc")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Image side */}
          <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 aspect-[4/3] bg-gradient-to-br from-indigo-900/40 to-slate-900 shadow-2xl shadow-indigo-500/10">
            <Image src="/how-it-works-ui.png" alt="How it works" fill className="object-cover opacity-90" sizes="(max-width: 768px) 100vw, 600px" />
          </div>

          {/* Steps side */}
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={step.number} className={`p-6 rounded-2xl border transition-all ${i === 0 ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-[var(--card-border)] hover:bg-white/10 hover:border-indigo-500/20'}`}>
                <h3 className={`text-lg font-bold mb-3 flex items-center gap-3 ${i === 0 ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/80'}`}>

                  <span className="text-indigo-500 uppercase text-sm tracking-wider font-black">{t("how_it_works.step")} {parseInt(step.number)}</span> 
                  {t(`steps.0${parseInt(step.number)}_title`)}
                </h3>
                <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium">{t(`steps.0${parseInt(step.number)}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
