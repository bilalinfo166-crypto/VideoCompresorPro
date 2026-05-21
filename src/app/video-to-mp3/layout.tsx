import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to MP3 Converter - Free Online Audio Extractor",
  description: "Convert video to MP3 online for free. Extract high-quality audio from MP4, AVI, MOV, and other video files instantly and privately.",
  keywords: [
    "video to mp3",
    "convert video to mp3",
    "extract mp3 from video",
    "mp4 to mp3 online",
    "free video to mp3 converter",
    "audio extractor"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/video-to-mp3",
  },
  openGraph: {
    title: "Video to MP3 Converter - Free Online Audio Extractor",
    description: "Convert video to MP3 online for free. Extract high-quality audio from MP4, AVI, MOV, and other video files instantly and privately.",
    url: "https://videocompressorpro.com/video-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to MP3 Converter - Free Online Audio Extractor",
    description: "Convert video to MP3 online for free. Extract high-quality audio from MP4, AVI, MOV, and other video files instantly and privately.",
  }
};

export default function VideoToMp3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
