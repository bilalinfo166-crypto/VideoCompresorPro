import { notFound } from "next/navigation";
import { locales } from "@/middleware";

// Import all existing page components
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import AudioCutterPage from "@/app/audio-cutter/page";
import CompressFormatPage from "@/app/compress-[format]/page";
import ContactPage from "@/app/contact/page";
import CropVideoPage from "@/app/crop-video/page";
import LoginPage from "@/app/login/page";
import PrivacyPage from "@/app/privacy/page";
import SignupPage from "@/app/signup/page";
import TermsPage from "@/app/terms/page";
import VideoCutterPage from "@/app/video-cutter/page";
import VideoToMp3Page from "@/app/video-to-mp3/page";
import VideoToTextPage from "@/app/video-to-text/page";

interface LocalizedPageProps {
  params: {
    locale: string;
    slug?: string[];
  };
}

export async function generateMetadata({ params }: LocalizedPageProps) {
  const { locale, slug } = params;
  const baseUrl = 'https://videocompressorpro.com';
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
    const format = path.replace('compress-', '').toUpperCase();
    title = `Compress ${format} Video Online | Free ${format} Compressor`;
    description = `Compress ${format} files online in seconds without quality loss. Use our free tool to reduce ${format} video size quickly and privately.`;
  }

  const fullUrl = `${baseUrl}/${locale}${path ? `/${path}` : ''}`;

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


export default function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale, slug } = params;

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

  // Handle dynamic format pages (redirect to home tool)
  if (path.startsWith("compress-")) {
    return <HomePage />;
  }

  // Not found
  notFound();
}
