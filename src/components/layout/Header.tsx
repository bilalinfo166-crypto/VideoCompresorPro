"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Video, Menu, X, Globe, ChevronDown, Scissors, Crop, Music, FileVideo, FileAudio, Sun, Moon, Type, ArrowRight, User, LayoutDashboard, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const TOOLS = [
  { label: "nav.cutter", href: "/video-cutter", icon: Scissors, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "nav.cropper", href: "/crop-video", icon: Crop, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "nav.mp3", href: "/video-to-mp3", icon: Music, color: "text-pink-500", bg: "bg-pink-500/10" },
  { label: "nav.audio", href: "/video-to-audio", icon: FileAudio, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "nav.to_text", href: "/video-to-text", icon: Type, color: "text-cyan-500", bg: "bg-cyan-500/10" },
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
  { code: "he", label: "עברית" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "no", label: "Norsk" },
  { code: "cs", label: "Čeština" },
  { code: "hu", label: "Magyar" },
  { code: "tw", label: "繁體中文" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check active Supabase session (resolves Google OAuth redirect automatically)
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const user = session.user;
          const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
          
          if (localStorage.getItem("user_logged_in") !== "true") {
            localStorage.setItem("user_logged_in", "true");
            localStorage.setItem("user_email", user.email || "");
            localStorage.setItem("user_name", name);
            window.dispatchEvent(new Event("auth_change"));
            
            // Redirect to dashboard if currently on auth or home-with-hash URL
            const isAuthPage = window.location.pathname.includes("/login") || window.location.pathname.includes("/signup");
            const isHomeHash = window.location.pathname === "/" && (window.location.hash.includes("access_token") || window.location.hash.includes("id_token"));
            if (isAuthPage || isHomeHash) {
              window.location.href = "/dashboard";
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to check Supabase session in Header:", err);
      }

      const loggedIn = localStorage.getItem("user_logged_in") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUserEmail(localStorage.getItem("user_email") || "User");
      }
    };

    checkAuth();
    window.addEventListener("auth_change", checkAuth);

    // 2. Direct onAuthStateChange listener to keep states dynamically synchronized
    let unsubscribe: any = null;
    import("@/lib/supabase").then(({ supabase }) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          const user = session.user;
          const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
          localStorage.setItem("user_logged_in", "true");
          localStorage.setItem("user_email", user.email || "");
          localStorage.setItem("user_name", name);
          setIsLoggedIn(true);
          setUserEmail(user.email || "User");
        } else if (event === "SIGNED_OUT") {
          localStorage.removeItem("user_logged_in");
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_name");
          setIsLoggedIn(false);
          setUserEmail("");
        }
      });
      unsubscribe = subscription;
    }).catch(err => console.error("Error setting up auth state listener:", err));

    return () => {
      window.removeEventListener("auth_change", checkAuth);
      if (unsubscribe) unsubscribe.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out from Supabase:", err);
    }
    localStorage.removeItem("user_logged_in");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const getLocalizedHref = (path: string) => {
    if (language === 'en') return path;
    if (path === '/') return `/${language}`;
    return `/${language}${path}`;
  };

  const closeDrawer = () => {
    setMobileOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <>
      <header className="notranslate fixed top-0 w-full z-50 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--card-border)] shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link 
              href={getLocalizedHref('/')} 
              className="flex items-center gap-2 group shrink-0 touch-feedback"
              aria-label="VideoCompressorPro Home"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Video className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-sm sm:text-base font-bold text-[var(--foreground)] truncate max-w-[120px] sm:max-w-none">
                VideoCompressorPro
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={getLocalizedHref(tool.href)}
                  className="px-3 py-2 text-xs xl:text-sm font-semibold text-[var(--muted-text)] hover:text-blue-600 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t(tool.label)}
                </Link>
              ))}
              <Link href={getLocalizedHref('/blog')} className="px-3 py-2 text-xs xl:text-sm font-semibold text-[var(--muted-text)] hover:text-blue-600 rounded-lg transition-colors">
                Blog
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 text-[var(--muted-text)] hover:text-blue-600 border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all shadow-sm touch-feedback"
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              >
                {theme === "light" ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
              </button>

              {/* Language selector — Desktop only */}
              <div className="relative hidden sm:block" onMouseLeave={() => setLangOpen(false)}>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--muted-text)] hover:text-blue-600 border border-[var(--card-border)] rounded-xl hover:bg-white/5 transition-all shadow-sm"
                  onMouseEnter={() => setLangOpen(true)}
                  onClick={() => setLangOpen(!langOpen)}
                  aria-label="Select Language"
                  aria-expanded={langOpen}
                >
                  <Globe className="w-4 h-4 opacity-100" aria-hidden="true" />
                  <span className="uppercase text-xs font-bold">{language}</span>
                  <ChevronDown className="w-3 h-3 opacity-100" aria-hidden="true" />
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[200px] bg-[var(--background)] rounded-2xl border border-[var(--card-border)] shadow-2xl overflow-hidden flex flex-col p-2 max-h-[70vh] overflow-y-auto custom-scrollbar z-50 before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                        className={`px-3 py-2.5 text-xs sm:text-sm text-left hover:bg-white/5 rounded-lg transition-colors ${language === l.code ? "text-blue-600 font-bold bg-blue-500/10" : "text-[var(--muted-text)]"}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-3">
                   <Link
                    href={getLocalizedHref('/dashboard')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-600/20 transition-all border border-blue-600/20"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 text-[var(--muted-text)] hover:text-red-500 border border-[var(--card-border)] rounded-xl hover:bg-red-500/10 transition-all shadow-sm"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href={getLocalizedHref('/login')}
                    className="hidden sm:block text-xs sm:text-sm font-bold text-[var(--foreground)] hover:text-blue-600 transition-colors touch-feedback"
                  >
                    Log In
                  </Link>

                  <Link
                    href={getLocalizedHref('/signup')}
                    className="hidden sm:inline-flex px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 whitespace-nowrap touch-feedback"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden p-2.5 text-[var(--muted-text)] hover:text-blue-600 border border-[var(--card-border)] rounded-xl transition-all touch-feedback"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Premium Mobile Drawer ── */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="mobile-drawer-overlay"
            onClick={closeDrawer}
            aria-label="Close menu"
          />

          {/* Drawer Panel */}
          <div className="notranslate mobile-drawer bg-[var(--background)] border-l border-[var(--card-border)] flex flex-col safe-bottom">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--card-border)]">
              <Link href={getLocalizedHref('/')} className="flex items-center gap-2" onClick={closeDrawer}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-sm text-[var(--foreground)]">VideoCompressorPro</span>
              </Link>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl border border-[var(--card-border)] text-[var(--muted-text)] hover:text-blue-600 transition-colors touch-feedback"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto scroll-touch p-4 space-y-2">
              {/* Tools Section */}
              <div className="mb-4">
                <div className="text-[11px] font-black text-[var(--muted-text)] uppercase tracking-widest px-3 mb-3">
                  {t("nav.mobile_tools")}
                </div>

                <div className="space-y-1">
                  {TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={getLocalizedHref(tool.href)}
                        className="flex items-center gap-3 px-3 py-4 text-sm font-semibold text-[var(--foreground)] hover:bg-white/5 active:bg-white/10 rounded-2xl transition-all touch-feedback group"
                        onClick={closeDrawer}
                      >
                        <div className={`w-9 h-9 ${tool.bg} rounded-xl flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${tool.color}`} />
                        </div>
                        <span className="flex-1">{t(tool.label)}</span>
                        <ArrowRight className="w-4 h-4 text-[var(--muted-text)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="pt-2 pb-4 border-t border-[var(--card-border)]">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={getLocalizedHref('/dashboard')}
                      className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/20 transition-all touch-feedback"
                      onClick={closeDrawer}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); closeDrawer(); }}
                      className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500/5 active:scale-95 transition-all touch-feedback"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={getLocalizedHref('/login')}
                      className="flex items-center justify-center py-3.5 text-sm font-bold text-[var(--foreground)] border border-[var(--card-border)] rounded-2xl hover:bg-white/5 active:scale-95 transition-all touch-feedback"
                      onClick={closeDrawer}
                    >
                      Log In
                    </Link>
                    <Link
                      href={getLocalizedHref('/signup')}
                      className="flex items-center justify-center py-3.5 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/20 transition-all touch-feedback"
                      onClick={closeDrawer}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Language Section */}
              <div className="pt-2 border-t border-[var(--card-border)]">
                <button
                  className="w-full flex items-center justify-between px-3 py-4 touch-feedback"
                  onClick={() => setMobileLangOpen(!mobileLangOpen)}
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                    <Globe className="w-4 h-4 text-[var(--muted-text)]" />
                    {t("nav.mobile_language")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-600 uppercase bg-blue-500/10 px-2 py-1 rounded-lg">
                      {language}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[var(--muted-text)] transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {mobileLangOpen && (
                  <div className="grid grid-cols-2 gap-2 px-3 pb-4">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); closeDrawer(); }}
                        className={`px-3 py-3 text-sm text-left rounded-xl transition-all touch-feedback font-medium ${
                          language === l.code
                            ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                            : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted-text)] hover:border-blue-500/30 active:scale-95"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom theme toggle */}
            <div className="p-4 border-t border-[var(--card-border)]">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-[var(--muted-text)] border border-[var(--card-border)] rounded-2xl hover:text-blue-600 hover:border-blue-500/30 transition-all touch-feedback"
              >
                {theme === "light" ? <><Moon className="w-4 h-4" /> Switch to Dark Mode</> : <><Sun className="w-4 h-4" /> Switch to Light Mode</>}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
