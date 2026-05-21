import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | VideoCompressorPro",
  description: "Get in touch with the VideoCompressorPro team for support, feature requests, or business inquiries. We are here to help.",
  keywords: [
    "contact videocompressorpro",
    "support videocompressorpro",
    "support video compressor",
    "video compressor feedback"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/contact",
  },
  openGraph: {
    title: "Contact Us | VideoCompressorPro",
    description: "Get in touch with the VideoCompressorPro team for support, feature requests, or business inquiries. We are here to help.",
    url: "https://videocompressorpro.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | VideoCompressorPro",
    description: "Get in touch with the VideoCompressorPro team for support, feature requests, or business inquiries. We are here to help.",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
