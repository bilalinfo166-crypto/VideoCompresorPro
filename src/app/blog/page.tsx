import BlogIndexClient from "./BlogIndexClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Optimization Learning Hub | VideoCompressorPro Blog",
  description: "Read expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful.",
  alternates: {
    canonical: "https://videocompressorpro.com/blog",
  },
  openGraph: {
    title: "Video Optimization Learning Hub | VideoCompressorPro Blog",
    description: "Read expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful.",
    url: "https://videocompressorpro.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Optimization Learning Hub | VideoCompressorPro Blog",
    description: "Read expert tutorials, codec deep-dives, compression secrets, and visual enhancement guides to make your videos lightweight and beautiful.",
  }
};

export default function BlogPage() {
  return <BlogIndexClient />;
}
