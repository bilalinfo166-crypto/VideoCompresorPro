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

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Dynamic Contextual Feature */}
          {(isDiscord || isWhatsApp || isEmail || context) && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">
                  {context ? `${context} Optimization` : "Optimized Performance"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 leading-tight">
                  {context 
                    ? `Free Video Compressor for ${context} Uploads`
                    : "Universal Video Compression for Any Platform"}
                </h2>
                <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                  {context 
                    ? `Our specialized engine ensures your videos meet ${context} requirements perfectly while maintaining stunning visual quality and fast upload speeds.`
                    : "Compress any video format with our advanced browser-based engine. No uploads, no quality loss, and instant results."}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--card-border)] aspect-[4/3] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] group">
                  <Image 
                    src={isDiscord ? "/discord-feature.png" : (isWhatsApp ? "/storage-feature.png" : "/privacy-illustration.png")} 
                    alt={context ? `Compress video for ${context}` : "Video compression feature"} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, 500px" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          )}

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
                {context ? "Privacy First" : t("storage.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">
                {context ? "Secure Offline Compression" : t("storage.title")}
              </h2>
              <p className="text-[var(--muted-text)] text-lg leading-relaxed font-medium">
                {context 
                  ? "Your privacy is our priority. Our browser-based engine processes your videos locally, ensuring no data ever leaves your device."
                  : t("storage.desc")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
