"use client";

import Image from "next/image";
import { Shield, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WhyChoose() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 text-sm mb-6 font-bold">
                <Shield className="w-4 h-4" aria-hidden="true" />
                {t("common.privacy_first")}
              </div>
              <h2 className="text-4xl font-black mb-6 leading-tight text-[var(--foreground)]">
                {t("why_choose.title")}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed mb-8 font-medium">
                {t("why_choose.desc")}
              </p>
              <ul className="space-y-4">
                {[
                  "why_choose.point1",
                  "why_choose.point2",
                  "why_choose.point3",
                  "why_choose.point4",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--muted-text)] font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-3xl" />
              <Image
                src="/privacy-illustration.png"
                alt="Privacy illustration"
                width={500}
                height={400}
                sizes="(max-width: 768px) 100vw, 500px"
                className="relative z-10 rounded-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
