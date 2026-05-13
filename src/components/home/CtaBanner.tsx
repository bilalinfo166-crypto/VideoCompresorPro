"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-500/20 p-8 sm:p-12 text-center shadow-inner">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black mb-4 text-[var(--foreground)]">{t("cta.title")}</h2>
              <p className="text-[var(--muted-text)] text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto font-bold">
                {t("cta.desc")}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-8 py-4 rounded-xl font-black text-base sm:text-lg transition-all shadow-xl shadow-indigo-500/25 hover:scale-105 touch-feedback"
              >
                <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
