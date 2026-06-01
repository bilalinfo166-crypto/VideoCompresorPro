import { notFound } from "next/navigation";
import { locales } from "@/middleware";

// Import all existing page components
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import AudioCutterPage from "@/app/video-to-audio/page";
import ContactPage from "@/app/contact/page";
import CropVideoPage from "@/app/crop-video/page";
import LoginPage from "@/app/login/page";
import PrivacyPage from "@/app/privacy/page";
import SignupPage from "@/app/signup/page";
import TermsPage from "@/app/terms/page";
import VideoCutterPage from "@/app/video-cutter/page";
import VideoToMp3Page from "@/app/video-to-mp3/page";
import VideoToTextPage from "@/app/video-to-text/page";
import BlogIndexPage from "@/app/blog/page";
import BlogPostDetail from "@/app/blog/[slug]/page";
import TikTokPage from "@/app/tiktok/page";
import InstagramReelsPage from "@/app/instagram-reels/page";
import YouTubeShortsPage from "@/app/youtube-shorts/page";
import { COMPRESSOR_PAGES, PSEO_SLUGS } from "@/data/compressor-seo";
import { BLOG_POSTS } from "@/data/blog-posts";
import CompressorClient from "@/components/tools/CompressorClient";

interface LocalizedPageProps {
  params: {
    locale: string;
    slug?: string[];
  };
}

export async function generateMetadata({ params }: LocalizedPageProps) {
  let { locale, slug } = params;
  const baseUrl = 'https://videocompressorpro.com';
  
  // Handle root-level SEO pages (e.g., /compress-mp4)
  // In this case, 'locale' parameter will contain the 'compress-...' slug
  let isRootSEO = false;
  if (locale.startsWith("compress-")) {
    slug = [locale];
    locale = "en";
    isRootSEO = true;
  }

  const path = slug ? slug[0] : '';
  
  let translations;
  try {
    translations = require(`@/locales/${locale}.json`);
  } catch {
    translations = require(`@/locales/en.json`);
  }

  const t = (path: string) => {
    const keys = path.split('.');
    let res = translations;
    for (const k of keys) res = res?.[k];
    return res || path;
  };

  let title = t('tools.compressor_title');
  let description = t('tools.compressor_desc');

  if (path === 'video-cutter') {
    title = t('tools.cutter_title');
    description = t('tools.cutter_desc');
  } else if (path === 'crop-video') {
    title = t('tools.cropper_title');
    description = t('tools.cropper_desc');
  } else if (path === 'video-to-mp3') {
    title = t('tools.to_mp3_title');
    description = t('tools.to_mp3_desc');
  } else if (path === 'video-to-audio') {
    const locTitle = t('audio_cutter_page.meta_title');
    const locDesc = t('audio_cutter_page.meta_description');
    title = locTitle.includes('audio_cutter_page.') ? 'Video to Audio Converter - Extract Audio from Video Online' : locTitle;
    description = locDesc.includes('audio_cutter_page.') ? 'Video to audio converter online free. Extract MP3 from MP4, YouTube, and TikTok videos instantly with secure processing.' : locDesc;
  } else if (path === 'video-to-text') {
    const locTitle = t('to_text_page.meta_title');
    const locDesc = t('to_text_page.meta_description');
    title = locTitle.includes('to_text_page.') ? 'Video to Text Converter Online Free | AI Transcription' : locTitle;
    description = locDesc.includes('to_text_page.') ? 'video to text converter online free with AI transcription. Generate captions, subtitles, and transcripts fast and securely.' : locDesc;
  } else if (path === 'tiktok') {
    title = t('tiktok_page.hero_title');
    description = t('tiktok_page.hero_subtitle');
  } else if (path === 'instagram-reels') {
    title = t('reels_page.hero_title');
    description = t('reels_page.hero_subtitle');
  } else if (path === 'youtube-shorts') {
    title = t('shorts_page.hero_title');
    description = t('shorts_page.hero_subtitle');
  } else if (path === 'about') {
    const locTitle = t('about_page.meta_title');
    const locDesc = t('about_page.meta_description');
    title = locTitle.includes('about_page.') ? 'About Us - Privacy-First Video Tools | VideoCompressorPro' : locTitle;
    description = locDesc.includes('about_page.') ? 'Learn more about VideoCompressorPro, our mission to provide lightning-fast, private, and high-quality online video tools for free.' : locDesc;
  } else if (path === 'contact') {
    const locTitle = t('contact_page.meta_title');
    const locDesc = t('contact_page.meta_description');
    title = locTitle.includes('contact_page.') ? 'Contact Us - Support & Inquiries | VideoCompressorPro' : locTitle;
    description = locDesc.includes('contact_page.') ? 'Get in touch with the VideoCompressorPro team for support, feature requests, or business inquiries. We are here to help.' : locDesc;
  } else if (path === 'privacy') {
    const locTitle = t('privacy_page.meta_title');
    const locDesc = t('privacy_page.meta_description');
    title = locTitle.includes('privacy_page.') ? 'Privacy Policy - 100% Private Video Compression | VideoCompressorPro' : locTitle;
    description = locDesc.includes('privacy_page.') ? 'Read the Privacy Policy of VideoCompressorPro. We process all your files 100% locally in your browser - no files are uploaded to our servers.' : locDesc;
  } else if (path === 'terms') {
    const locTitle = t('terms_page.meta_title');
    const locDesc = t('terms_page.meta_description');
    title = locTitle.includes('terms_page.') ? 'Terms of Service - Free Online Video Tools | VideoCompressorPro' : locTitle;
    description = locDesc.includes('terms_page.') ? 'Read the Terms of Service for using VideoCompressorPro\'s free, secure, browser-based online video tools.' : locDesc;
  } else if (path === 'login') {
    title = 'Log In | VideoCompressorPro';
    description = 'Log in to your VideoCompressorPro account.';
  } else if (path === 'signup') {
    title = 'Sign Up | VideoCompressorPro';
    description = 'Create a free VideoCompressorPro account.';
  } else if (path === 'blog') {
    if (slug && slug.length === 2) {
      const postSlug = slug[1];
      const post = BLOG_POSTS.find(p => p.slug === postSlug);
      if (post) {
        const locTitle = t(`blog.${postSlug}.title`);
        const locDesc = t(`blog.${postSlug}.description`);
        title = locTitle.includes('blog.') ? post.metaTitle : locTitle;
        description = locDesc.includes('blog.') ? post.metaDesc : locDesc;
      }
    } else {
      const locTitle = t('blog.meta_title');
      const locDesc = t('blog.meta_desc');
      title = locTitle.includes('blog.') ? 'Video Optimization Learning Hub | VideoCompressorPro Blog' : locTitle;
      description = locDesc.includes('blog.') ? 'Read expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful.' : locDesc;
    }
  } else if (path.startsWith('compress-')) {
    const realSlug = path.replace('compress-', '');
    const data = COMPRESSOR_PAGES[realSlug];
    if (data) {
      const locTitle = t(`pseo.${realSlug}.title`);
      const locDesc = t(`pseo.${realSlug}.description`);
      title = locTitle.includes('pseo.') ? data.title : locTitle;
      description = locDesc.includes('pseo.') ? data.description : locDesc;
    } else {
      const format = realSlug.toUpperCase();
      title = `Compress ${format} Video Online | Free ${format} Compressor`;
      description = `Compress ${format} files online in seconds without quality loss. Use our free tool to reduce ${format} video size quickly and privately.`;
    }
  }

  const fullUrl = isRootSEO 
    ? `${baseUrl}/${path}` 
    : `${baseUrl}/${locale}${path ? `/${path}` : ''}`;

  // Build full hreflang (language alternates) map dynamically
  const languages: Record<string, string> = {
    "en": `${baseUrl}/${path}`,
    "x-default": `${baseUrl}/${path}`,
  };

  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}${path ? `/${path}` : ''}`;
  }

  const currentYear = new Date().getFullYear().toString();
  const freshTitle = typeof title === "string" ? title.replace(/2026/g, currentYear) : title;
  const freshDesc = typeof description === "string" ? description.replace(/2026/g, currentYear) : description;

  const metadataResult: any = {
    title: freshTitle,
    description: freshDesc,
    alternates: {
      canonical: fullUrl,
      languages,
    },
    openGraph: {
      title: freshTitle,
      description: freshDesc,
      url: fullUrl,
    }
  };

  if (path === 'login' || path === 'signup') {
    metadataResult.robots = {
      index: false,
      follow: false,
    };
  }

  return metadataResult;
}

export async function generateStaticParams() {
  const params = [];

  // 1. Root-level SEO pages: /compress-[slug]
  for (const slug of PSEO_SLUGS) {
    params.push({ locale: `compress-${slug}`, slug: [] });
  }

  // 2. Localized pages: /[locale]/[slug]
  for (const locale of locales) {
    // Localized Home: /ar
    params.push({ locale, slug: [] });
    
    // Static Tools: /ar/video-cutter, etc.
    const staticTools = ["about", "contact", "crop-video", "login", "privacy", "signup", "terms", "video-cutter", "video-to-audio", "video-to-mp3", "video-to-text", "tiktok", "instagram-reels", "youtube-shorts"];
    for (const tool of staticTools) {
      params.push({ locale, slug: [tool] });
    }

    // Localized Blog routes: /ar/blog and /ar/blog/[post-slug]
    params.push({ locale, slug: ["blog"] });
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: ["blog", post.slug] });
    }

    // Localized SEO pages: /ar/compress-mp4
    for (const slug of PSEO_SLUGS) {
      params.push({ locale, slug: [`compress-${slug}`] });
    }
  }

  return params;
}

export default function LocalizedPage({ params }: LocalizedPageProps) {
  let { locale, slug } = params;

  // Handle root-level SEO pages (e.g., /compress-mp4)
  if (locale.startsWith("compress-")) {
    const realSlug = locale.replace("compress-", "");
    const data = COMPRESSOR_PAGES[realSlug];
    if (data) {
      return <CompressorClient data={data} slug={realSlug} />;
    }
    notFound();
  }

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // If no slug, it's the home page for this locale (e.g., /es)
  if (!slug || slug.length === 0) {
    return <HomePage />;
  }

  const path = slug[0];

  // Map the slug to the actual page components
  switch (path) {
    case "about":
      return <AboutPage />;
    case "video-to-audio":
      return <AudioCutterPage />;
    case "contact":
      return <ContactPage />;
    case "crop-video":
      return <CropVideoPage />;
    case "login":
      return <LoginPage />;
    case "privacy":
      return <PrivacyPage />;
    case "signup":
      return <SignupPage />;
    case "terms":
      return <TermsPage />;
    case "video-cutter":
      return <VideoCutterPage />;
    case "video-to-mp3":
      return <VideoToMp3Page />;
    case "video-to-text":
      return <VideoToTextPage />;
    case "tiktok":
      return <TikTokPage />;
    case "instagram-reels":
      return <InstagramReelsPage />;
    case "youtube-shorts":
      return <YouTubeShortsPage />;
    case "blog":
      if (slug.length === 1) {
        return <BlogIndexPage />;
      } else if (slug.length === 2) {
        return <BlogPostDetail params={{ slug: slug[1] }} />;
      }
      notFound();
  }

  // Handle dynamic format pages
  if (path.startsWith("compress-")) {
    const realSlug = path.replace("compress-", "");
    const data = COMPRESSOR_PAGES[realSlug];
    if (data) {
      return <CompressorClient data={data} slug={realSlug} />;
    }
    return <HomePage />;
  }

  // Not found
  notFound();
}
