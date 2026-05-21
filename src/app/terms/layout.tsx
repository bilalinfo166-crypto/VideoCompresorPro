import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VideoCompressorPro",
  description: "Read the Terms of Service for using VideoCompressorPro's free, secure, browser-based online video tools.",
  keywords: [
    "terms of service videocompressorpro",
    "terms and conditions",
    "free video tools terms"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/terms",
  },
  openGraph: {
    title: "Terms of Service | VideoCompressorPro",
    description: "Read the Terms of Service for using VideoCompressorPro's free, secure, browser-based online video tools.",
    url: "https://videocompressorpro.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | VideoCompressorPro",
    description: "Read the Terms of Service for using VideoCompressorPro's free, secure, browser-based online video tools.",
  }
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
