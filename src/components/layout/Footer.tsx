"use client";

import Link from "next/link";
import { Video, Twitter, Github, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language, t } = useLanguage();

  const getLocalizedHref = (path: string) => {
    if (language === 'en') return path;
    if (path === '/') return `/${language}`;
    return `/${language}${path}`;
  };

  const TOOL_LINKS = [
    { label: t("footer.links.video_compressor"), href: "/" },
    { label: t("footer.links.video_cutter"), href: "/video-cutter" },
    { label: t("footer.links.crop_video"), href: "/crop-video" },
    { label: t("footer.links.video_to_mp3"), href: "/video-to-mp3" },
    { label: t("footer.links.audio_cutter"), href: "/audio-cutter" },
  ];

  const FORMAT_LINKS = [
    { label: t("footer.links.compress_mp4"), href: "/compress-mp4" },
    { label: t("footer.links.compress_avi"), href: "/compress-avi" },
    { label: t("footer.links.compress_mov"), href: "/compress-mov" },
    { label: t("footer.links.compress_mkv"), href: "/compress-mkv" },
    { label: t("footer.links.compress_webm"), href: "/compress-webm" },
  ];

  const LEGAL_LINKS = [
    { label: t("footer.links.privacy_policy"), href: "/privacy" },
    { label: t("footer.links.terms_of_service"), href: "/terms" },
    { label: t("footer.links.contact_us"), href: "/contact" },
    { label: t("footer.links.about"), href: "/about" },
  ];

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--header-bg)] pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href={getLocalizedHref('/')} className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-[var(--foreground)]">
                VideoCompressorPro
              </span>
            </a>
            <p className="text-[var(--muted-text)] text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-text)] opacity-70">
              <Globe className="w-4 h-4" />
              {t("footer.languages")}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.tools")}</h3>
            <ul className="space-y-3">
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={getLocalizedHref(l.href)} className="text-[var(--muted-text)] hover:text-blue-600 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.formats")}</h3>
            <ul className="space-y-3">
              {FORMAT_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={getLocalizedHref(l.href)} className="text-[var(--muted-text)] hover:text-blue-600 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={getLocalizedHref(l.href)} className="text-[var(--muted-text)] hover:text-blue-600 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--card-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted-text)] text-sm">
            &copy; {new Date().getFullYear()} VideoCompressorPro — {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6 text-[var(--muted-text)] text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("footer.status")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
