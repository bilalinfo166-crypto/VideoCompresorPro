"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface FeaturesProps {
  context?: string;
}

export function Features({ context }: FeaturesProps) {
  const { t } = useLanguage();

  const isDiscord = context?.toLowerCase().includes("discord");
  const isWhatsApp = context?.toLowerCase().includes("whatsapp");
  const isEmail = context?.toLowerCase().includes("email");

  const badgeText = context
    ? t("pseo_features.badge").replace("{context}", context)
    : t("discord.badge");
  const titleText = context
    ? t("pseo_features.title").replace("{context}", context)
    : t("discord.title");
  const descText = context
    ? t("pseo_features.desc").replace("{context}", context)
    : t("discord.desc");

  const privacyBadge = context
    ? t("pseo_features.privacy_badge")
    : t("storage.badge");
  const privacyTitle = context
    ? t("pseo_features.privacy_title")
    : t("storage.title");
  const privacyDesc = context
    ? t("pseo_features.privacy_desc")
    : t("storage.desc");

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Dynamic Contextual/Default Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">
                {badgeText}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 leading-tight">
                {titleText}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {descText}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--card-border)] aspect-[4/3] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] group">
                <Image 
                  src={isWhatsApp ? "/storage-feature.png" : "/discord-feature.png"} 
                  alt={context ? `Compress video for ${context}` : "Video compression feature"} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 500px" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Storage/Secondary Feature - Always shown but uses a different image if needed */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={context ? "order-1 md:order-2" : ""}>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--card-border)] aspect-[4/3] shadow-2xl group">
                <Image 
                  src={context ? "/privacy-illustration.png" : "/storage-feature.png"} 
                  alt="Reduce video size and save storage" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 500px" 
                />
              </div>
            </div>
            <div className={context ? "order-2 md:order-1" : ""}>
              <div className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">
                {privacyBadge}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">
                {privacyTitle}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {privacyDesc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
