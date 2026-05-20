import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to Text Converter Online Free | AI Transcription",
  description: "video to text converter online free with AI transcription. Generate captions, subtitles, and transcripts fast and securely.",
  keywords: [
    "video to text",
    "video to text converter",
    "youtube video to text",
    "ai video to text",
    "transcribe video to text",
    "online video transcription",
    "free video transcriber",
    "secure video to text"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/video-to-text",
  },
  openGraph: {
    title: "Video to Text Converter Online Free | AI Transcription",
    description: "video to text converter online free with AI transcription. Generate captions, subtitles, and transcripts fast and securely.",
    url: "https://videocompressorpro.com/video-to-text",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to Text Converter Online Free | AI Transcription",
    description: "video to text converter online free with AI transcription. Generate captions, subtitles, and transcripts fast and securely.",
  }
};

export default function VideoToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
