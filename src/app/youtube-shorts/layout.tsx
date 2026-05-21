import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Shorts Video Compressor - Compress Shorts Online",
  description: "Compress YouTube Shorts videos online for free. Adjust resolution, aspect ratio, and file size to match YouTube requirements perfectly.",
  keywords: [
    "youtube shorts video compressor",
    "compress youtube shorts",
    "reduce shorts video size",
    "shorts video optimizer",
    "youtube video compressor",
    "online shorts compressor"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/youtube-shorts",
  },
  openGraph: {
    title: "YouTube Shorts Video Compressor - Compress Shorts Online",
    description: "Compress YouTube Shorts videos online for free. Adjust resolution, aspect ratio, and file size to match YouTube requirements perfectly.",
    url: "https://videocompressorpro.com/youtube-shorts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Shorts Video Compressor - Compress Shorts Online",
    description: "Compress YouTube Shorts videos online for free. Adjust resolution, aspect ratio, and file size to match YouTube requirements perfectly.",
  }
};

export default function YouTubeShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
