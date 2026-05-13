"use client";

import { Twitter, Facebook, Link2, Share2, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SocialShareProps {
  title?: string;
}

export function SocialShare({ title }: SocialShareProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "Check out this free tool on VideoCompressorPro!");

  const links = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-sky-500 hover:text-white hover:border-sky-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
      color: "hover:bg-emerald-500 hover:text-white hover:border-emerald-500",
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe translation fallbacks since we didn't add these keys to the locale files yet
  const shareText = t("common.share_tool") === "common.share_tool" ? "Share this tool" : t("common.share_tool");
  const copiedText = t("common.copied") === "common.copied" ? "Copied!" : t("common.copied");
  const copyLinkText = t("common.copy_link") === "common.copy_link" ? "Copy Link" : t("common.copy_link");

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 mt-8 sm:mt-16 mx-4 sm:mx-auto max-w-5xl rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/10 mb-8 sm:mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Share2 className="w-5 h-5 text-indigo-500" />
        <h3 className="font-bold text-xl text-[var(--foreground)]">{shareText}</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted-text)] font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex-1 sm:flex-none min-w-[140px] ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" aria-hidden="true" />
            <span className="inline">{link.name}</span>
          </a>
        ))}
        <button
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border font-semibold transition-all duration-300 shadow-sm hover:-translate-y-0.5 flex-1 sm:flex-none min-w-[140px] ${
            copied 
              ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20" 
              : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]"
          }`}
        >
          <Link2 className="w-5 h-5" aria-hidden="true" />
          <span className="inline">{copied ? copiedText : copyLinkText}</span>
        </button>
      </div>
    </div>
  );
}
