import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VideoCompressorPro",
  description: "Learn more about VideoCompressorPro, our mission to provide lightning-fast, private, and high-quality online video tools for free.",
  keywords: [
    "about videocompressorpro",
    "video compressor company",
    "private video processing",
    "free online video tools"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/about",
  },
  openGraph: {
    title: "About Us | VideoCompressorPro",
    description: "Learn more about VideoCompressorPro, our mission to provide lightning-fast, private, and high-quality online video tools for free.",
    url: "https://videocompressorpro.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | VideoCompressorPro",
    description: "Learn more about VideoCompressorPro, our mission to provide lightning-fast, private, and high-quality online video tools for free.",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
