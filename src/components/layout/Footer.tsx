"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, Globe, ChevronDown, Facebook, Youtube, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.965 7.398 6.931 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

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
        className={`space-y-2 overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:pb-0 ${
          open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={getHref(l.href)}
              className="text-[var(--muted-text)] hover:text-blue-600 text-sm transition-colors block py-1.5 touch-feedback"
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
    { label: t("footer.links.compress_mp4"), href: "/" },
    { label: t("footer.links.compress_avi"), href: "/" },
    { label: t("footer.links.compress_mov"), href: "/" },
    { label: t("footer.links.compress_mkv"), href: "/" },
    { label: t("footer.links.compress_webm"), href: "/" },
  ];

  const LEGAL_LINKS = [
    { label: t("footer.links.privacy_policy"), href: "/privacy" },
    { label: t("footer.links.terms_of_service"), href: "/terms" },
    { label: t("footer.links.contact_us"), href: "/contact" },
    { label: t("footer.links.about"), href: "/about" },
  ];

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--header-bg)] pt-6 md:pt-8 pb-4 transition-colors duration-300 safe-bottom">
      <div className="container mx-auto px-4">

        {/* Brand Row — mobile only */}
        <div className="flex flex-col gap-5 mb-6 pb-6 border-b border-[var(--card-border)] md:hidden">
          <Link href={getLocalizedHref('/')} className="flex items-center gap-2 touch-feedback" aria-label="VideoCompressorPro Home">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-[var(--foreground)]">VideoCompressorPro</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61589328824380" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[var(--muted-text)] hover:text-blue-600 transition-colors" aria-label="Follow us on Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/channel/UCyQ2x6JkCCqmwVKby0VipwQ" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[var(--muted-text)] hover:text-red-600 transition-colors" aria-label="Subscribe on YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/videocompressorpro?igsh=MXF3aWVzaWZ3c3VkbA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[var(--muted-text)] hover:text-pink-600 transition-colors" aria-label="Follow us on Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://pin.it/3AbOozku7" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[var(--muted-text)] hover:text-red-600 transition-colors" aria-label="Follow us on Pinterest">
              <PinterestIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 mb-0 md:mb-6">
          {/* Brand Description — desktop only */}
          <div className="hidden md:block md:col-span-2">
            <Link href={getLocalizedHref('/')} className="flex items-center gap-2 mb-4" aria-label="VideoCompressorPro Home">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-base font-bold text-[var(--foreground)]">VideoCompressorPro</span>
            </Link>
            <p className="text-[var(--muted-text)] text-sm leading-relaxed max-w-xs mb-5">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-5 mb-5">
              <a href="https://www.facebook.com/profile.php?id=61589328824380" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-text)] hover:text-blue-600 transition-all hover:scale-110" aria-label="Follow us on Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCyQ2x6JkCCqmwVKby0VipwQ" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-text)] hover:text-red-600 transition-all hover:scale-110" aria-label="Subscribe on YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/videocompressorpro?igsh=MXF3aWVzaWZ3c3VkbA==" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-text)] hover:text-pink-600 transition-all hover:scale-110" aria-label="Follow us on Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://pin.it/3AbOozku7" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-text)] hover:text-red-600 transition-all hover:scale-110" aria-label="Follow us on Pinterest">
                <PinterestIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--muted-text)] opacity-60 uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              {t("footer.languages")}
            </div>
          </div>

          {/* Collapsible on Mobile, Static on Desktop */}
          <FooterSection title={t("footer.tools")} links={TOOL_LINKS} getHref={getLocalizedHref} />
          <FooterSection title={t("footer.formats")} links={FORMAT_LINKS} getHref={getLocalizedHref} />
          <FooterSection title={t("footer.company")} links={LEGAL_LINKS} getHref={getLocalizedHref} />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--card-border)] pt-5 mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[var(--muted-text)] text-[11px] sm:text-xs font-medium h-full">
            <span>&copy; {new Date().getFullYear()} VideoCompressorPro</span>
            <span className="w-1 h-1 rounded-full bg-[var(--card-border)]" />
            <span>{t("footer.copyright")}</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-[11px] font-bold transition-all hover:bg-emerald-500/10 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {t("footer.status")}
          </div>
        </div>
      </div>
    </footer>
  );
}


