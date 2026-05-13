"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Storage Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{t("storage.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">{t("storage.title")}</h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {t("storage.desc")}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 aspect-[4/3] shadow-2xl">
                <Image src="/storage-feature.png" alt="Reduce video size and save storage" fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
              </div>
            </div>
          </div>

          {/* Discord Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 aspect-[4/3] shadow-2xl">
                <Image src="/discord-feature.png" alt="Compress video for Discord limits" fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
              </div>
            </div>
            <div>
              <div className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{t("discord.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">{t("discord.title")}</h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {t("discord.desc")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
