import { MetadataRoute } from 'next';
import { PSEO_SLUGS } from '@/data/compressor-seo';
import { BLOG_POSTS } from '@/data/blog-posts';

export const locales = [
  "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", 
  "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", 
  "el", "uk", "sv", "he", "da", "fi", "no", "cs", "hu"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://videocompressorpro.com';
  const now = new Date();

  const allRoutes: MetadataRoute.Sitemap = [];

  // ── 1. Homepage (highest priority) ─────────────────────────────────────────
  allRoutes.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // ── 2. pSEO format/platform compressor pages (very important) ──────────────
  for (const slug of PSEO_SLUGS) {
    allRoutes.push({
      url: `${baseUrl}/compress-${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // ── 3. Blog pages ──────────────────────────────────────────────────────────
  allRoutes.push({
    url: `${baseUrl}/blog`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  });
  for (const post of BLOG_POSTS) {
    allRoutes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // ── 4. Core tool pages ─────────────────────────────────────────────────────
  const coreTools = [
    '/video-cutter',
    '/crop-video',
    '/video-to-mp3',
    '/video-to-audio',
    '/video-to-text',
    '/tiktok',
    '/instagram-reels',
    '/youtube-shorts',
  ];
  for (const route of coreTools) {
    allRoutes.push({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // ── 5. Static info pages ───────────────────────────────────────────────────
  const infoPages = ['/about', '/contact', '/privacy', '/terms'];
  for (const route of infoPages) {
    allRoutes.push({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    });
  }

  // ── 6. Localized pages (lower priority, grouped after English) ──────────────
  for (const locale of locales) {
    // Localized homepage
    allRoutes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    // Localized pSEO pages
    for (const slug of PSEO_SLUGS) {
      allRoutes.push({
        url: `${baseUrl}/${locale}/compress-${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }

    // Localized blog index
    allRoutes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });

    // Localized blog posts
    for (const post of BLOG_POSTS) {
      allRoutes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55,
      });
    }

    // Localized tool pages (only high-value ones)
    for (const route of coreTools) {
      allRoutes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    // Localized info pages
    for (const route of infoPages) {
      allRoutes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.45,
      });
    }
  }

  return allRoutes;
}
