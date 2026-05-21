import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Video Compressor - Reduce TikTok Video Size Online",
  description: "Compress TikTok videos online for free. Adjust aspect ratios, file size, and formats to fit TikTok perfectly without losing quality.",
  keywords: [
    "tiktok video compressor",
    "compress tiktok video",
    "reduce tiktok video size",
    "tiktok video optimizer",
    "compress video for tiktok",
    "online tiktok compressor"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/tiktok",
  },
  openGraph: {
    title: "TikTok Video Compressor - Reduce TikTok Video Size Online",
    description: "Compress TikTok videos online for free. Adjust aspect ratios, file size, and formats to fit TikTok perfectly without losing quality.",
    url: "https://videocompressorpro.com/tiktok",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Compressor - Reduce TikTok Video Size Online",
    description: "Compress TikTok videos online for free. Adjust aspect ratios, file size, and formats to fit TikTok perfectly without losing quality.",
  }
};

export default function TikTokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
