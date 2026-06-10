"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogIndexClient() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Compression Guides", "Social Media", "Video Formats", "Advanced Tips"];

  // Helper to translate categories dynamically
  const translateCategory = (cat: string) => {
    const mappings: Record<string, Record<string, string>> = {
      es: {
        "All": "Todo",
        "Compression Guides": "Guías de Compresión",
        "Social Media": "Redes Sociales",
        "Video Formats": "Formatos de Video",
        "Advanced Tips": "Consejos Avanzados"
      },
      ar: {
        "All": "الكل",
        "Compression Guides": "أدلة الضغط",
        "Social Media": "وسائل التواصل",
        "Video Formats": "تنسيقات الفيديو",
        "Advanced Tips": "نصائح متقدمة"
      },
      fr: {
        "All": "Tout",
        "Compression Guides": "Guides de Compression",
        "Social Media": "Réseaux Sociaux",
        "Video Formats": "Formats Vidéo",
        "Advanced Tips": "Conseils Avancés"
      },
      de: {
        "All": "Alle",
        "Compression Guides": "Komprimierungsleitfäden",
        "Social Media": "Soziale Medien",
        "Video Formats": "Videoformate",
        "Advanced Tips": "Erweiterte Tipps"
      },
      hi: {
        "All": "सभी",
        "Compression Guides": "कंप्रेशन गाइड",
        "Social Media": "सोशल मीडिया",
        "Video Formats": "वीडियो प्रारूप",
        "Advanced Tips": "उन्नत सुझाव"
      },
      pt: {
        "All": "Tudo",
        "Compression Guides": "Guias de Compressão",
        "Social Media": "Redes Sociais",
        "Video Formats": "Formatos de Vídeo",
        "Advanced Tips": "Dicas Avançadas"
      },
      it: {
        "All": "Tutto",
        "Compression Guides": "Guide alla Compressione",
        "Social Media": "Social Media",
        "Video Formats": "Formati Video",
        "Advanced Tips": "Suggerimenti Avanzati"
      },
      ru: {
        "All": "Все",
        "Compression Guides": "Руководства по сжатию",
        "Social Media": "Социальные сети",
        "Video Formats": "Видеоформаты",
        "Advanced Tips": "Продвинутые советы"
      }
    };
    return mappings[language]?.[cat] || cat;
  };

  const tUI = {
    heroTitle: t("blog.meta_title").includes("blog.") ? "Our Video Optimization Learning Hub" : t("blog.meta_title"),
    heroDesc: t("blog.meta_desc").includes("blog.") 
      ? "Discover expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful." 
      : t("blog.meta_desc"),
    searchPlaceholder: language === "es" 
      ? "Buscar tutoriales, palabras clave..." 
      : language === "ar" 
      ? "البحث في الدروس التعليمية، الكلمات المفتاحية..." 
      : language === "de" 
      ? "Tutorials, Keywords, Codecs suchen..." 
      : language === "fr" 
      ? "Rechercher des tutoriels, mots-clés..." 
      : "Search tutorials, keywords, codecs...",
    emptyTitle: language === "es" 
      ? "No se encontraron artículos" 
      : language === "ar" 
      ? "لم يتم العثور على مقالات" 
      : language === "de" 
      ? "Keine Artikel gefunden" 
      : language === "fr" 
      ? "Aucun article trouvé" 
      : "No articles found",
    emptyDesc: language === "es" 
      ? "No pudimos encontrar ningún artículo que coincida con su búsqueda. Intente verificar la ortografía o seleccionar otra categoría." 
      : language === "ar" 
      ? "لم نتمكن من العثور على أي مقالات تطابق بحثك. حاول التحقق من الإملاء أو اختيار فئة أخرى." 
      : "We couldn't find any articles matching your search query. Try checking your spelling or selecting another category.",
  };

  // Handle localized content (titles and excerpts) dynamically if translated, otherwise fallback to English
  const getPostMeta = (post: BlogPost) => {
    const locTitle = t(`blog.${post.slug}.title`);
    const locDesc = t(`blog.${post.slug}.description`);
    return {
      title: locTitle.includes("blog.") ? post.title : locTitle,
      excerpt: locDesc.includes("blog.") ? post.excerpt : locDesc,
      category: translateCategory(post.category)
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
            {tUI.heroTitle}
          </h1>
          <p className="text-[var(--muted-text)] text-base sm:text-lg leading-relaxed font-medium">
            {tUI.heroDesc}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="glass-card p-6 rounded-3xl border border-[var(--card-border)] mb-12 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-text)]" />
            <input
              type="text"
              placeholder={tUI.searchPlaceholder}
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
                {translateCategory(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl border border-[var(--card-border)]">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{tUI.emptyTitle}</h3>
            <p className="text-[var(--muted-text)] text-sm max-w-md mx-auto">
              {tUI.emptyDesc}
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
