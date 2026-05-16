"use client";

import { useLanguage } from "@/context/LanguageContext";

export function SupportedFormats({ highlight }: { highlight?: string }) {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[var(--background)] border-y border-[var(--card-border)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-3 text-[var(--foreground)]">{t("formats_sec.title")}</h2>
          <p className="text-[var(--muted-text)] font-bold">{t("formats_sec.desc")}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {["MP4", "MOV", "AVI", "MKV", "WEBM", "WMV", "FLV", "3GP", "M4V", "OGV", "TS", "MPG", "MPEG", "F4V", "ASF", "M2TS", "VOB", "MXF", "RM", "RMVB"].map((fmt) => {
            const isHighlighted = highlight?.toLowerCase() === fmt.toLowerCase();
            return (
              <span 
                key={fmt} 
                className={`px-4 py-2 rounded-lg border font-mono font-black transition-all ${
                  isHighlighted 
                  ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-lg" 
                  : "bg-indigo-500/5 border-[var(--card-border)] text-[var(--muted-text)] text-sm hover:border-indigo-500/30 hover:bg-indigo-500/10"
                }`}
              >
                .{fmt}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
