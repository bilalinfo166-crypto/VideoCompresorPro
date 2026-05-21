"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_FAQS = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  title?: string;
  desc?: string;
  items?: FaqItem[];
}

export function FaqSection({ title, desc, items }: FaqSectionProps = {}) {
  const { t } = useLanguage();

  const displayTitle = title || t("faq.title");
  const displayDesc = desc || t("faq.desc");

  return (
    <section id="faq" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">{displayTitle}</h2>
            <p className="text-[var(--muted-text)] font-medium">{displayDesc}</p>
          </div>

          <div className="space-y-4">
            {items
              ? items.map((item, idx) => (
                  <details key={idx} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-[var(--foreground)] pr-4">{item.q}</span>
                      <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all duration-300 shrink-0" aria-hidden="true" />
                    </summary>
                    <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed border-t border-[var(--card-border)] pt-4 font-medium">
                      {item.a}
                    </div>
                  </details>
                ))
              : DEFAULT_FAQS.map((faq) => (
                  <details key={faq.id} className="group glass-card rounded-2xl border border-[var(--card-border)] hover:border-indigo-500/20 transition-all">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-[var(--foreground)] pr-4">{t(`faq.q${faq.id}`)}</span>
                      <ChevronDown className="w-5 h-5 text-[var(--muted-text)] group-open:rotate-180 transition-all duration-300 shrink-0" aria-hidden="true" />
                    </summary>
                    <div className="px-6 pb-6 text-[var(--muted-text)] leading-relaxed border-t border-[var(--card-border)] pt-4 font-medium">
                      {t(`faq.a${faq.id}`)}
                    </div>
                  </details>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
