import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://videocompressorpro.com'),
  title: {
    default: "VideoCompressorPro - Compress Video Online Free (High Quality)",
    template: "%s | VideoCompressorPro"
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  description: "The world's fastest VideoCompressorPro. Compress video online for free without losing quality. 100% private and secure - no uploads required.",
  keywords: [
    "videocompressorpro",
    "video compressor", 
    "compress video", 
    "compress video online",
    "video compression online",
    "reduce video size free",
    "online video compressor",
    "fast video compressor",
    "mp4 video compressor",
    "video size reducer",
    "online video editor",
    "free video tools"
  ],
  authors: [{ name: "VideoCompressorPro Team" }],
  creator: "VideoCompressorPro",
  publisher: "VideoCompressorPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://videocompressorpro.com",
    siteName: "VideoCompressorPro",
    title: "VideoCompressorPro - Compress Video Online (100% Private)",
    description: "Use our pro-grade VideoCompressorPro to compress video files instantly in your browser. No quality loss, no uploads.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online VideoCompressorPro Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VideoCompressorPro - Compress Video Free",
    description: "The fastest way to compress video online without uploading to any server.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://videocompressorpro.com",
  },
  verification: {
    google: "google-site-verification-placeholder",
  }
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-gradient-premium text-[var(--foreground)]`}>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
        
        {/* Global Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "VideoCompressorPro",
              "url": "https://videocompressorpro.com",
              "operatingSystem": "Any",
              "applicationCategory": "MultimediaApplication",
              "description": "Compress video files online for free with VideoCompressorPro. 100% private processing in your browser.",
              "featureList": [
                "Video Compression",
                "Video Cutting",
                "Video Cropping",
                "Video to MP3 Extraction"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "5280"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
