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

  const baseRoutes = [
    '',
    '/video-cutter',
    '/crop-video',
    '/video-to-mp3',
    '/video-to-audio',
    '/video-to-text',
    '/blog',
    ...BLOG_POSTS.map(post => `/blog/${post.slug}`),
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    ...PSEO_SLUGS.map(slug => `/compress-${slug}`),
    '/tiktok',
    '/instagram-reels',
    '/youtube-shorts',
  ];

  const allRoutes: MetadataRoute.Sitemap = [];

  // Add default (English) routes
  baseRoutes.forEach(route => {
    allRoutes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    });
  });

  // Add localized routes for all other languages
  locales.forEach(locale => {
    baseRoutes.forEach(route => {
      allRoutes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 0.9 : 0.7,
      });
    });
  });

  return allRoutes;
}
