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

export function generateStaticParams() {
  // Return empty array, paths will be evaluated at runtime or generated on-demand
  return [];
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

  // Handle dynamic format pages (e.g., /es/compress-mp4)
  if (path.startsWith("compress-")) {
    const format = path.replace("compress-", "");
    return <CompressFormatPage params={{ format }} />;
  }

  // Not found
  notFound();
}
