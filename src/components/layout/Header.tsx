"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, Menu, X, Globe, ChevronDown, Scissors, Crop, Music, FileVideo, FileAudio, Sun, Moon, Type } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const TOOLS = [
  { label: "nav.cutter", href: "/video-cutter", icon: Scissors },
  { label: "nav.cropper", href: "/crop-video", icon: Crop },
  { label: "nav.mp3", href: "/video-to-mp3", icon: Music },
  { label: "nav.audio", href: "/audio-cutter", icon: FileAudio },
  { label: "nav.to_text", href: "/video-to-text", icon: Type },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "zh", label: "中文" },
  { code: "tr", label: "Türkçe" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ko", label: "한국어" },
  { code: "th", label: "ไทย" },
  { code: "nl", label: "Nederlands" },
  { code: "pl", label: "Polski" },
  { code: "fa", label: "فارسی" },
  { code: "ro", label: "Română" },
  { code: "el", label: "Ελληνικά" },
  { code: "uk", label: "Українська" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const getLocalizedHref = (path: string) => {
    if (language === 'en') return path;
    if (path === '/') return `/${language}`;
    return `/${language}${path}`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--card-border)] shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href={getLocalizedHref('/')} className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-[var(--foreground)] hidden sm:inline-block">
              VideoCompressorPro
            </span>
          </a>

          {/* Desktop Nav - Direct Tool Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {TOOLS.map((tool) => (
              <a
                key={tool.href}
                href={getLocalizedHref(tool.href)}
                className="px-3 py-2 text-xs xl:text-sm font-semibold text-[var(--muted-text)] hover:text-blue-600 rounded-lg transition-colors whitespace-nowrap"
              >
                {t(tool.label)}
              </a>
            ))}
            <a href={getLocalizedHref('/blog')} className="px-3 py-2 text-xs xl:text-sm font-semibold text-[var(--muted-text)] hover:text-blue-600 rounded-lg transition-colors">
              Blog
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-[var(--muted-text)] hover:text-blue-600 border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Language selector */}
            <div className="relative" onMouseLeave={() => setLangOpen(false)}>
              <button
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--muted-text)] hover:text-blue-600 border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all shadow-sm"
                onMouseEnter={() => setLangOpen(true)}
                onClick={() => setLangOpen(!langOpen)}
              >
                <Globe className="w-4 h-4 opacity-70" />
                <span className="uppercase text-xs font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-[280px] sm:w-[480px] bg-[var(--background)] rounded-2xl border border-[var(--card-border)] shadow-2xl overflow-hidden grid grid-cols-2 sm:grid-cols-3 p-1 max-h-[70vh] overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`px-3 py-2 text-[10px] sm:text-xs text-left hover:bg-white/5 rounded-lg transition-colors ${language === l.code ? "text-blue-600 font-bold bg-blue-500/10" : "text-[var(--muted-text)]"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={getLocalizedHref('/login')}
              className="text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-blue-600 transition-colors"
            >
              Log In
            </a>

            <a
              href={getLocalizedHref('/signup')}
              className="hidden sm:inline-flex px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
            >
              Sign Up
            </a>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-card border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">{t("nav.mobile_tools")}</div>
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.href}
                  href={getLocalizedHref(tool.href)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  {t(tool.label)}
                </a>
              );
            })}
            
            <div className="border-t border-[var(--card-border)] mt-4 pt-6 px-4 space-y-3">
              <a
                href={getLocalizedHref('/login')}
                className="flex items-center justify-center w-full py-3 text-sm font-bold text-[var(--foreground)] border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </a>
              <a
                href={getLocalizedHref('/signup')}
                className="flex items-center justify-center w-full py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </a>
            </div>

            <div className="border-t border-[var(--card-border)] mt-4 pt-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4 flex items-center gap-2">
                <Globe className="w-3 h-3" /> {t("nav.mobile_language")}
              </div>
              <div className="grid grid-cols-2 gap-2 px-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setMobileOpen(false); }}
                    className={`px-3 py-2 text-xs text-left rounded-lg transition-colors ${language === l.code ? "bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-500/30" : "bg-white/5 text-slate-400 border border-transparent"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
