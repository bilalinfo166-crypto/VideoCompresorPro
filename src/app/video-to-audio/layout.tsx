import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to Audio Converter - Extract Audio from Video Online",
  description: "Video to audio converter online free. Extract MP3 from MP4, YouTube, and TikTok videos instantly with secure processing.",
  keywords: [
    "video to audio",
    "video to audio converter",
    "extract audio from video",
    "mp4 to mp3",
    "youtube video to audio",
    "tiktok video to audio",
    "free video to audio converter",
    "secure audio extractor"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/video-to-audio",
  },
  openGraph: {
    title: "Video to Audio Converter - Extract Audio from Video Online",
    description: "Video to audio converter online free. Extract MP3 from MP4, YouTube, and TikTok videos instantly with secure processing.",
    url: "https://videocompressorpro.com/video-to-audio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to Audio Converter - Extract Audio from Video Online",
    description: "Video to audio converter online free. Extract MP3 from MP4, YouTube, and TikTok videos instantly with secure processing.",
  }
};

export default function VideoToAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
