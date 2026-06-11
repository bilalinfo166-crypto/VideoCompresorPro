import BlogPostClient from "./BlogPostClient";
import { BLOG_POSTS } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {};
  }

  const currentYear = new Date().getFullYear().toString();
  const freshTitle = post.metaTitle.replace(/2026/g, currentYear);
  const freshDesc = post.metaDesc.replace(/2026/g, currentYear);

  return {
    title: freshTitle,
    description: freshDesc,
    alternates: {
      canonical: `https://videocompressorpro.com/blog/${post.slug}`,
    },
    openGraph: {
      title: freshTitle,
      description: freshDesc,
      url: `https://videocompressorpro.com/blog/${post.slug}`,
      type: "article",
      publishedTime: "2026-05-20T16:00:00+05:00",
      authors: ["https://videocompressorpro.com"],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: freshTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: freshTitle,
      description: freshDesc,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

import fs from "fs";
import path from "path";

export default function BlogPostDetail({ params, locale = "en" }: Props & { locale?: string }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  let localizedPost = { ...post };
  if (locale !== "en") {
    try {
      const transPath = path.join(process.cwd(), `src/data/translations/${locale}/${post.slug}.json`);
      if (fs.existsSync(transPath)) {
        const trans = JSON.parse(fs.readFileSync(transPath, "utf8"));
        localizedPost = {
          ...post,
          title: trans.title || post.title,
          excerpt: trans.excerpt || post.excerpt,
          content: trans.content || post.content,
          faqs: trans.faqs || post.faqs,
          metaTitle: trans.metaTitle || post.metaTitle,
          metaDesc: trans.metaDesc || post.metaDesc,
        };
      }
    } catch (e) {
      console.error(`Failed to load translation for ${locale}/${post.slug}:`, e);
    }
  }

  return <BlogPostClient params={params} postData={localizedPost} />;
}
