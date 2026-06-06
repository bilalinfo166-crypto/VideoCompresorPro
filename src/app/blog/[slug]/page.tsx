"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Calendar, Clock, User, ArrowLeft, Share2, 
  Twitter, MessageCircle, Link2, Check, 
  ChevronRight, Sparkles, AlertCircle, Play
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import { useLanguage } from "@/context/LanguageContext";
import DirectAnswer from "@/components/seo/DirectAnswer";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const slug = params.slug;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const currentYear = new Date().getFullYear().toString();
  const freshTitle = post.title.replace(/2026/g, currentYear);
  const freshContent = post.content.replace(/2026/g, currentYear);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  // Calculate Reading Progress and Parse Headings for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is in view
      const headingElements = contentRef.current?.querySelectorAll("h2, h3");
      if (headingElements) {
        let currentSection = "";
        for (let i = 0; i < headingElements.length; i++) {
          const el = headingElements[i] as HTMLElement;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentSection = el.id;
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parse Markdown Content to generate Table of Contents list
  useEffect(() => {
    const headingList: { id: string; text: string; level: number }[] = [];
    const lines = freshContent.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").replace(/\*\*/g, "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        headingList.push({ id, text, level: 2 });
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "").replace(/\*\*/g, "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        headingList.push({ id, text, level: 3 });
      }
    });
    setHeadings(headingList);
  }, [freshContent]);

  // Handle Share Actions
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.metaTitle);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post.title} - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const getLocalizedHref = (path: string) => {
    if (language === "en") return path;
    if (path === "/") return `/${language}`;
    return `/${language}${path}`;
  };

  // Safe Simple Markdown Renderer to prevent dangerous compilation bugs
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    let inList = false;
    let listItems: string[] = [];
    
    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Empty line
      if (trimmed === "") {
        if (inList) {
          inList = false;
          const renderedList = (
            <ul key={`list-${index}`} className="list-disc pl-6 my-4 space-y-2 text-[var(--muted-text)] font-medium leading-relaxed">
              {listItems.map((item, i) => (
                <li key={i}>{parseInlineFormatting(item)}</li>
              ))}
            </ul>
          );
          listItems = [];
          return renderedList;
        }
        return <div key={index} className="h-4" />;
      }

      // Ordered list tables or standard tables (represented by markdown pipe characters)
      if (trimmed.startsWith("|")) {
        // Skip table headers and separators inside simple line renderer for safety,
        // or let's detect and parse them cleanly.
        if (trimmed.includes("---")) return null;
        
        const cells = trimmed.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        const isHeader = index > 0 && lines[index - 1].trim() === "" && lines[index + 1]?.trim().includes("---");
        
        return (
          <div key={index} className="overflow-x-auto my-6 rounded-2xl border border-[var(--card-border)] bg-slate-50/50 dark:bg-slate-900/10">
            <table className="min-w-full divide-y divide-[var(--card-border)]">
              <tbody>
                <tr className={isHeader ? "bg-slate-100 dark:bg-slate-800/50 font-bold" : "hover:bg-white/5"}>
                  {cells.map((cell, cIdx) => (
                    <td key={cIdx} className="px-6 py-4 text-sm font-semibold text-[var(--foreground)] border-r last:border-r-0 border-[var(--card-border)]">
                      {parseInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      // Headers (H2)
      if (trimmed.startsWith("## ")) {
        const text = trimmed.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h2 
            key={index} 
            id={id} 
            className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mt-10 mb-4 tracking-tight flex items-center gap-2 group scroll-mt-24"
          >
            {parseInlineFormatting(trimmed.replace("## ", ""))}
          </h2>
        );
      }

      // Headers (H3)
      if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h3 
            key={index} 
            id={id} 
            className="text-xl sm:text-2xl font-black text-[var(--foreground)] mt-8 mb-3 tracking-tight scroll-mt-24"
          >
            {parseInlineFormatting(trimmed.replace("### ", ""))}
          </h3>
        );
      }

      // Bullet List item
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        inList = true;
        listItems.push(trimmed.substring(2));
        return null;
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s/, "");
        return (
          <div key={index} className="flex gap-3 my-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <p className="text-[var(--muted-text)] font-medium leading-relaxed flex-1">
              {parseInlineFormatting(text)}
            </p>
          </div>
        );
      }

      // Blockquotes / Alerts
      if (trimmed.startsWith("> ")) {
        return (
          <div key={index} className="my-6 p-6 rounded-3xl border-l-4 border-indigo-500 bg-indigo-500/5 flex gap-4">
            <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold leading-relaxed text-[var(--foreground)] italic">
              {parseInlineFormatting(trimmed.replace("> ", ""))}
            </p>
          </div>
        );
      }

      // Default Paragraph
      return (
        <p key={index} className="text-base text-[var(--muted-text)] leading-relaxed font-medium mb-6">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    });
  };

  // Helper to convert Markdown inline tokens like bold (`**`), links (`[]()`), and highlights to TSX
  const parseInlineFormatting = (text: string) => {
    let parts: (string | JSX.Element)[] = [text];

    // 1. Parse Markdown Links `[text](url)`
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    const newParts: (string | JSX.Element)[] = [];

    parts.forEach((part) => {
      if (typeof part !== "string") {
        newParts.push(part);
        return;
      }

      let lastIndex = 0;
      linkRegex.lastIndex = 0;

      while ((match = linkRegex.exec(part)) !== null) {
        const linkText = match[1];
        const linkUrl = match[2];

        // Push preceding plain text
        if (match.index > lastIndex) {
          newParts.push(part.substring(lastIndex, match.index));
        }

        // Push active styled internal/external link
        const isInternal = linkUrl.startsWith("/") || linkUrl.startsWith("file://");
        const cleanUrl = linkUrl.replace("file://", "");
        
        if (isInternal) {
          newParts.push(
            <Link 
              key={match.index} 
              href={getLocalizedHref(cleanUrl)} 
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {linkText}
            </Link>
          );
        } else {
          newParts.push(
            <a 
              key={match.index} 
              href={linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {linkText}
            </a>
          );
        }

        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < part.length) {
        newParts.push(part.substring(lastIndex));
      }
    });

    parts = [...newParts];
    const boldParts: (string | JSX.Element)[] = [];

    // 2. Parse Bold `**text**`
    parts.forEach((part) => {
      if (typeof part !== "string") {
        boldParts.push(part);
        return;
      }

      const boldRegex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let boldMatch;

      while ((boldMatch = boldRegex.exec(part)) !== null) {
        const boldText = boldMatch[1];

        if (boldMatch.index > lastIndex) {
          boldParts.push(part.substring(lastIndex, boldMatch.index));
        }

        boldParts.push(<strong key={boldMatch.index} className="font-extrabold text-[var(--foreground)]">{boldText}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < part.length) {
        boldParts.push(part.substring(lastIndex));
      }
    });

    return boldParts;
  };

  // Define dynamic entity mappings based on category for maximum NLP semantic score
  const getAboutAndMentions = (category: string) => {
    switch (category) {
      case "Compression Guides":
        return {
          about: [
            { "@type": "Thing", "name": "Video compression", "sameAs": "https://en.wikipedia.org/wiki/Video_compression" }
          ],
          mentions: [
            { "@type": "Thing", "name": "H.264/MPEG-4 AVC", "sameAs": "https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC" },
            { "@type": "Thing", "name": "WebAssembly", "sameAs": "https://en.wikipedia.org/wiki/WebAssembly" }
          ]
        };
      case "Social Media":
        return {
          about: [
            { "@type": "Thing", "name": "Social media", "sameAs": "https://en.wikipedia.org/wiki/Social_media" }
          ],
          mentions: [
            { "@type": "Thing", "name": "TikTok", "sameAs": "https://en.wikipedia.org/wiki/TikTok" },
            { "@type": "Thing", "name": "Instagram", "sameAs": "https://en.wikipedia.org/wiki/Instagram" },
            { "@type": "Thing", "name": "YouTube Shorts", "sameAs": "https://en.wikipedia.org/wiki/YouTube_Shorts" }
          ]
        };
      case "Video Formats":
        return {
          about: [
            { "@type": "Thing", "name": "Video file format", "sameAs": "https://en.wikipedia.org/wiki/Video_file_format" }
          ],
          mentions: [
            { "@type": "Thing", "name": "MP4", "sameAs": "https://en.wikipedia.org/wiki/MP4" },
            { "@type": "Thing", "name": "Matroska (MKV)", "sameAs": "https://en.wikipedia.org/wiki/Matroska" },
            { "@type": "Thing", "name": "WebM", "sameAs": "https://en.wikipedia.org/wiki/WebM" }
          ]
        };
      case "Advanced Tips":
      default:
        return {
          about: [
            { "@type": "Thing", "name": "Data compression", "sameAs": "https://en.wikipedia.org/wiki/Data_compression" }
          ],
          mentions: [
            { "@type": "Thing", "name": "Bitrate", "sameAs": "https://en.wikipedia.org/wiki/Bitrate" },
            { "@type": "Thing", "name": "Lossy compression", "sameAs": "https://en.wikipedia.org/wiki/Lossy_compression" }
          ]
        };
    }
  };

  const entities = getAboutAndMentions(post.category);

  // Structured schemas to boost SEO CTR inside search results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": freshTitle,
    "description": post.metaDesc,
    "image": post.image,
    "datePublished": "2026-05-20T16:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "sameAs": [
        post.author.id === "sarah" 
          ? "https://www.wikidata.org/wiki/Q112965158" 
          : "https://www.wikidata.org/wiki/Q115930263"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "VideoCompressorPro",
      "logo": "https://videocompressorpro.com/favicon.ico"
    },
    "mainEntityOfPage": `https://videocompressorpro.com/blog/${post.slug}`,
    "about": entities.about,
    "mentions": entities.mentions
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://videocompressorpro.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://videocompressorpro.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": freshTitle,
        "item": `https://videocompressorpro.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen pt-8 pb-20 bg-[var(--background)]">
      {/* Dynamic SEO Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-16 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 transition-all duration-700" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: freshTitle, href: `/blog/${post.slug}` }]} />

      <main className="container mx-auto px-4 max-w-6xl mt-6 flex-1">
        {/* Back navigation */}
        <Link 
          href={getLocalizedHref("/blog")} 
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-text)] hover:text-blue-600 mb-8 py-2 px-4 rounded-xl bg-white/5 border border-[var(--card-border)] transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to learning hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 1. Left Post Column */}
          <article className="lg:col-span-8 flex flex-col">
            
            {/* Header Details */}
            <div className="mb-8">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-4 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[var(--foreground)] tracking-tight leading-tight mb-6">
                {freshTitle}
              </h1>

              {/* Author info & stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-[var(--card-border)]">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--card-border)]">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--foreground)]">{post.author.name}</div>
                    <div className="text-xs font-semibold text-[var(--muted-text)]">{post.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--muted-text)] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Hero Banner */}
            <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden border border-[var(--card-border)] shadow-md mb-12">
              <Image src={post.image} alt={freshTitle} fill className="object-cover" priority />
            </div>

            {/* Direct Answer Featured Snippet optimization */}
            {post.directAnswer && (
              <DirectAnswer 
                question={post.directAnswer.question}
                answer={post.directAnswer.answer}
                steps={post.directAnswer.steps}
              />
            )}

            {/* Main Post Body */}
            <div ref={contentRef} className="prose dark:prose-invert max-w-none text-[var(--foreground)]">
              {renderMarkdown(freshContent)}
            </div>

            {/* Customized Conversion CTA Banner */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-[var(--card-border)] my-12 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm mb-4">
                    <Sparkles className="w-3.5 h-3.5" /> Fast & 100% Local Tool
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--foreground)] mb-3 leading-snug">
                    Bypass File Size Limits Instantly!
                  </h3>
                  <p className="text-sm font-semibold text-[var(--muted-text)] leading-relaxed">
                    {post.ctaText}
                  </p>
                </div>

                <Link
                  href={getLocalizedHref(post.ctaLink)}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-md shadow-blue-500/25 active:scale-95 shrink-0"
                >
                  Compress Video Now
                  <Play className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* In-Depth FAQ Section */}
            <div className="mt-8 border-t border-[var(--card-border)] pt-12">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-8 tracking-tight">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl border border-[var(--card-border)]">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-3 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">Q</span>
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--muted-text)] font-semibold leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
          </article>

          {/* 2. Right Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:flex flex-col gap-8">
            
            {/* Table of Contents card */}
            {headings.length > 0 && (
              <div className="glass-card p-6 rounded-[2rem] border border-[var(--card-border)] shadow-sm">
                <h3 className="text-xs font-black text-[var(--muted-text)] uppercase tracking-wider mb-4 pb-3 border-b border-[var(--card-border)]">
                  Table of Contents
                </h3>
                <nav className="flex flex-col gap-3">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`text-xs sm:text-sm font-semibold transition-all hover:text-blue-500 py-1 border-l-2 pl-3 ${
                        h.level === 3 ? "ml-4" : ""
                      } ${
                        activeSection === h.id
                          ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold bg-blue-500/5 rounded-r-lg"
                          : "border-transparent text-[var(--muted-text)]"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Author Expert Bio card */}
            <div className="glass-card p-6 rounded-[2rem] border border-[var(--card-border)] shadow-sm">
              <h3 className="text-xs font-black text-[var(--muted-text)] uppercase tracking-wider mb-4 pb-3 border-b border-[var(--card-border)]">
                About the Author
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--card-border)]">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">{post.author.name}</h4>
                  <div className="text-[10px] font-semibold text-[var(--muted-text)]">{post.author.role}</div>
                </div>
              </div>
              <p className="text-xs text-[var(--muted-text)] font-semibold leading-relaxed">
                {post.author.bio}
              </p>
            </div>

            {/* Share Card */}
            <div className="glass-card p-6 rounded-[2rem] border border-[var(--card-border)] shadow-sm">
              <h3 className="text-xs font-black text-[var(--muted-text)] uppercase tracking-wider mb-4 pb-3 border-b border-[var(--card-border)]">
                Share Article
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleShareTwitter}
                  className="p-3 bg-white/5 hover:bg-blue-500/10 text-[var(--muted-text)] hover:text-blue-400 rounded-xl border border-[var(--card-border)] hover:border-blue-500/20 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-[10px] font-bold"
                >
                  <Twitter className="w-4 h-4" />
                  X / Twitter
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="p-3 bg-white/5 hover:bg-emerald-500/10 text-[var(--muted-text)] hover:text-emerald-400 rounded-xl border border-[var(--card-border)] hover:border-emerald-500/20 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-[10px] font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 text-[10px] font-bold ${
                    copied 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white/5 border-[var(--card-border)] text-[var(--muted-text)] hover:bg-blue-600/10 hover:text-blue-500 hover:border-blue-500/20"
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
