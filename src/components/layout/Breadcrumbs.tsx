"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  // JSON-LD for SEO BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://videocompressorpro.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://videocompressorpro.com${item.href}`
      }))
    ]
  };

  return (
  return (
    <nav className="container mx-auto px-4 pt-2 pb-0" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-[var(--muted-text)]">
        <li className="flex items-center">
          <Link href="/" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/5">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 opacity-50" />
            <Link 
              href={item.href} 
              className={`hover:text-blue-500 transition-colors py-1 px-2 rounded-lg hover:bg-blue-500/5 ${index === items.length - 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
