import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Cutter - Trim & Cut Videos Instantly",
  description: "Cut and trim your videos online for free. Support for MP4, MOV, AVI, and more. Fast, secure, and no watermark.",
  keywords: [
    "video cutter",
    "online video cutter",
    "trim video online",
    "cut video online",
    "free video trimmer",
    "no watermark video cutter"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/video-cutter",
  },
  openGraph: {
    title: "Free Online Video Cutter - Trim & Cut Videos Instantly",
    description: "Cut and trim your videos online for free. Support for MP4, MOV, AVI, and more. Fast, secure, and no watermark.",
    url: "https://videocompressorpro.com/video-cutter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Cutter - Trim & Cut Videos Instantly",
    description: "Cut and trim your videos online for free. Support for MP4, MOV, AVI, and more. Fast, secure, and no watermark.",
  }
};

export default function VideoCutterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
