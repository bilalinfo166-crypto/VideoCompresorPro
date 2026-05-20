import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to Text Converter - AI Video Transcription Free",
  description: "VideoCompressorPro offers a user-friendly and easy-to-use video to text conversion solution, from a YouTube video to text, to an AI video to text conversion, or even a secure online video to text converter without software installation.",
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
    title: "Video to Text Converter - AI Video Transcription Free",
    description: "VideoCompressorPro offers a user-friendly and easy-to-use video to text conversion solution, from a YouTube video to text, to an AI video to text conversion, or even a secure online video to text converter without software installation.",
    url: "https://videocompressorpro.com/video-to-text",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to Text Converter - AI Video Transcription Free",
    description: "VideoCompressorPro offers a user-friendly and easy-to-use video to text conversion solution, from a YouTube video to text, to an AI video to text conversion, or even a secure online video to text converter without software installation.",
  }
};

export default function VideoToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
