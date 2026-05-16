import { notFound } from "next/navigation";
import { locales } from "@/middleware";

// Import all existing page components
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import AudioCutterPage from "@/app/audio-cutter/page";
import ContactPage from "@/app/contact/page";
import CropVideoPage from "@/app/crop-video/page";
import LoginPage from "@/app/login/page";
import PrivacyPage from "@/app/privacy/page";
import SignupPage from "@/app/signup/page";
import TermsPage from "@/app/terms/page";
import VideoCutterPage from "@/app/video-cutter/page";
import VideoToMp3Page from "@/app/video-to-mp3/page";
import VideoToTextPage from "@/app/video-to-text/page";
import { COMPRESSOR_PAGES, PSEO_SLUGS } from "@/data/compressor-seo";
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
  } else if (path === 'audio-cutter') {
    title = t('tools.audio_cutter_title');
    description = t('tools.audio_cutter_desc');
  } else if (path === 'video-to-text') {
    title = t('tools.to_text_title');
    description = t('tools.to_text_desc');
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

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
    }
  };
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
    const staticTools = ["about", "audio-cutter", "contact", "crop-video", "login", "privacy", "signup", "terms", "video-cutter", "video-to-mp3", "video-to-text"];
    for (const tool of staticTools) {
      params.push({ locale, slug: [tool] });
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
    case "audio-cutter":
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
