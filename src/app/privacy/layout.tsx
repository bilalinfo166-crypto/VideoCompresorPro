import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VideoCompressorPro",
  description: "Read the Privacy Policy of VideoCompressorPro. We process all your files 100% locally in your browser - no files are uploaded to our servers.",
  keywords: [
    "privacy policy videocompressorpro",
    "private video compressor",
    "secure video compressor",
    "local video processing privacy"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | VideoCompressorPro",
    description: "Read the Privacy Policy of VideoCompressorPro. We process all your files 100% locally in your browser - no files are uploaded to our servers.",
    url: "https://videocompressorpro.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | VideoCompressorPro",
    description: "Read the Privacy Policy of VideoCompressorPro. We process all your files 100% locally in your browser - no files are uploaded to our servers.",
  }
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
