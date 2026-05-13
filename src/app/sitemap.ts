import { MetadataRoute } from 'next';

export const locales = [
  "ur", "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", 
  "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", 
  "el", "uk", "sv"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://videocompressorpro.com';

  const baseRoutes = [
    '',
    '/video-cutter',
    '/crop-video',
    '/video-to-mp3',
    '/audio-cutter',
    '/video-to-text',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
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
