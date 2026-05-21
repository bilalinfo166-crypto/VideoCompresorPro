import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/signup',
          '/dashboard',
          '/*/login',
          '/*/signup',
          '/*/dashboard',
        ],
      },
    ],
    sitemap: 'https://videocompressorpro.com/sitemap.xml',
  };
}
