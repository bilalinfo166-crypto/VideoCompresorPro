"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogIndexPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Compression Guides", "Social Media", "Video Formats", "Advanced Tips"];

  // Handle localized content (titles and excerpts) dynamically if translated, otherwise fallback to English
  const getPostMeta = (post: BlogPost) => {
    // If the locale dictionary has customized translations for the blog, we can retrieve them here
    // For now, we fall back to English if translations aren't loaded in en.json yet.
    return {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category
    };
  };

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const meta = getPostMeta(post);
    const matchesSearch =
      meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.lsiKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getLocalizedHref = (slug: string) => {
    if (language === "en") return `/blog/${slug}`;
    return `/${language}/blog/${slug}`;
  };

  return (
    <div className="flex flex-col min-h-screen pt-8 pb-20 bg-[var(--background)]">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <main className="container mx-auto px-4 max-w-6xl mt-6 flex-1">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            VideoCompressorPro Insights
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight text-[var(--foreground)]">
            Our Video Optimization{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
              Learning Hub
            </span>
          </h1>
          <p className="text-[var(--muted-text)] text-base sm:text-lg leading-relaxed font-medium">
            Discover expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="glass-card p-6 rounded-3xl border border-[var(--card-border)] mb-12 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-text)]" />
            <input
              type="text"
              placeholder="Search tutorials, keywords, codecs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[var(--card-border)] rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-[var(--foreground)]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all active:scale-95 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                    : "bg-white/5 text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--card-border)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl border border-[var(--card-border)]">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No articles found</h3>
            <p className="text-[var(--muted-text)] text-sm max-w-md mx-auto">
              We couldn't find any articles matching your search query. Try checking your spelling or selecting another category.
            </p>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const meta = getPostMeta(post);
            return (
              <article
                key={post.slug}
                className="group flex flex-col glass-card rounded-[2rem] border border-[var(--card-border)] overflow-hidden hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Featured Image */}
                <Link href={getLocalizedHref(post.slug)} className="relative aspect-[16/10] overflow-hidden block">
                  <Image
                    src={post.image}
                    alt={meta.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {meta.category}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Metadata line */}
                  <div className="flex items-center gap-4 text-xs text-[var(--muted-text)] font-semibold mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                    <Link href={getLocalizedHref(post.slug)}>{meta.title}</Link>
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] font-medium leading-relaxed mb-6 line-clamp-3">
                    {meta.excerpt}
                  </p>

                  {/* Footer Line */}
                  <div className="pt-4 border-t border-[var(--card-border)] mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--card-border)]">
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--foreground)]">{post.author.name}</div>
                        <div className="text-[10px] font-semibold text-[var(--muted-text)] leading-none">{post.author.role}</div>
                      </div>
                    </div>

                    <Link
                      href={getLocalizedHref(post.slug)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-[var(--card-border)] group-hover:bg-blue-600 group-hover:border-blue-600 flex items-center justify-center transition-all group-hover:scale-110 active:scale-95 text-[var(--foreground)] group-hover:text-white"
                      aria-label={`Read full article: ${meta.title}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
