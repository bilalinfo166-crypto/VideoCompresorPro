"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function FooterSection({ title, links, getHref }: { 
  title: string; 
  links: { label: string; href: string }[];
  getHref: (path: string) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--card-border)] md:border-none">
      {/* Mobile: collapsible. Desktop: always open */}
      <button
        className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default touch-feedback"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-[var(--foreground)] font-bold text-xs uppercase tracking-wider">
          {title}
        </h3>
        <ChevronDown
          className={`w-4 h-4 text-[var(--muted-text)] md:hidden transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        className={`space-y-3 overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:pb-0 ${
          open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={getHref(l.href)}
              className="text-[var(--muted-text)] hover:text-blue-600 text-sm transition-colors block py-1 touch-feedback"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    <footer className="border-t border-[var(--card-border)] bg-[var(--header-bg)] pt-10 md:pt-16 pb-6 transition-colors duration-300 safe-bottom">
      <div className="container mx-auto px-4">

        {/* Brand Row — mobile only */}
        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-[var(--card-border)] md:hidden">
          <Link href={getLocalizedHref('/')} className="flex items-center gap-2 touch-feedback">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-[var(--foreground)]">VideoCompressorPro</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-10 mb-0 md:mb-12">
          {/* Brand Description — desktop only */}
          <div className="hidden md:block md:col-span-2">
            <Link href={getLocalizedHref('/')} className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-[var(--foreground)]">VideoCompressorPro</span>
            </Link>
            <p className="text-[var(--muted-text)] text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-text)] opacity-70">
              <Globe className="w-4 h-4" />
              {t("footer.languages")}
            </div>
          </div>

          {/* Collapsible on Mobile, Static on Desktop */}
          <FooterSection title={t("footer.tools")} links={TOOL_LINKS} getHref={getLocalizedHref} />
          <FooterSection title={t("footer.formats")} links={FORMAT_LINKS} getHref={getLocalizedHref} />
          <FooterSection title={t("footer.company")} links={LEGAL_LINKS} getHref={getLocalizedHref} />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--card-border)] pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <p className="text-[var(--muted-text)] text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} VideoCompressorPro — {t("footer.copyright")}
            </p>
            <p className="text-[var(--muted-text)] text-[10px] opacity-60">
              Powered by <a href="https://ffmpeg.org/" target="_blank" rel="nofollow external" className="hover:text-indigo-400 transition-colors">FFmpeg</a>
            </p>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted-text)] text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t("footer.status")}
          </div>
        </div>
      </div>
    </footer>
  );
}


