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

export default function BlogPostDetail({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPostClient params={params} />;
}
