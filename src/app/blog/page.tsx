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

import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function BlogPage({ locale = "en" }: { locale?: string }) {
  const localizedPosts = BLOG_POSTS.map((post) => {
    if (locale === "en") return post;
    try {
      const transPath = path.join(process.cwd(), `src/data/translations/${locale}/${post.slug}.json`);
      if (fs.existsSync(transPath)) {
        const trans = JSON.parse(fs.readFileSync(transPath, "utf8"));
        return {
          ...post,
          title: trans.title || post.title,
          excerpt: trans.excerpt || post.excerpt,
        };
      }
    } catch (e) {
      // Fallback
    }
    return post;
  });

  return <BlogIndexClient postsData={localizedPosts} />;
}
