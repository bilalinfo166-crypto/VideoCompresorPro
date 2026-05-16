import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPRESSOR_PAGES, PSEO_SLUGS } from "@/data/compressor-seo";
import CompressorClient from "./CompressorClient";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = COMPRESSOR_PAGES[params.slug];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://videocompressorpro.com/compress-${params.slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://videocompressorpro.com/compress-${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    }
  };
}

export async function generateStaticParams() {
  return PSEO_SLUGS.map((slug) => ({
    slug: slug,
  }));
}

export default function CompressorSEOPage({ params }: Props) {
  const data = COMPRESSOR_PAGES[params.slug];
  if (!data) notFound();

  return <CompressorClient data={data} slug={params.slug} />;
}
