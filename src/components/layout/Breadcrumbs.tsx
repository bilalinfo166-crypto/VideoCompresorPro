"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  // Merge the default root "Home" with the first item if it points to "/"
  // to avoid duplicate "Home" / "/" entries (e.g. Home > Video Tools > Crop Video where Video Tools links to '/')
  const hasRootItem = items.length > 0 && items[0].href === "/";
  const displayItems = hasRootItem ? items.slice(1) : items;
  const rootLabel = hasRootItem ? items[0].label : "Home";

  // JSON-LD for SEO BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": rootLabel,
        "item": "https://videocompressorpro.com"
      },
      ...displayItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://videocompressorpro.com${item.href}`
      }))
    ]
  };

  return (
    <nav className="container mx-auto px-4 pt-2 pb-0" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-[var(--muted-text)]">
        <li className="flex items-center">
          <Link href="/" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/5" aria-label={rootLabel}>
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{rootLabel}</span>
          </Link>
        </li>
        {displayItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" aria-hidden="true" />
            <Link 
              href={item.href} 
              className={`hover:text-blue-500 transition-colors py-1 px-2 rounded-lg hover:bg-blue-500/5 ${index === displayItems.length - 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
              aria-current={index === displayItems.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
