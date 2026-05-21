import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Reels Video Compressor - Optimize Reels Online",
  description: "Compress Instagram Reels videos online for free. Shrink MP4/MOV files to Reels upload limits without quality degradation.",
  keywords: [
    "instagram reels video compressor",
    "compress instagram reels",
    "reduce instagram video size",
    "reels optimizer",
    "instagram video compressor",
    "online reels compressor"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/instagram-reels",
  },
  openGraph: {
    title: "Instagram Reels Video Compressor - Optimize Reels Online",
    description: "Compress Instagram Reels videos online for free. Shrink MP4/MOV files to Reels upload limits without quality degradation.",
    url: "https://videocompressorpro.com/instagram-reels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels Video Compressor - Optimize Reels Online",
    description: "Compress Instagram Reels videos online for free. Shrink MP4/MOV files to Reels upload limits without quality degradation.",
  }
};

export default function InstagramReelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
