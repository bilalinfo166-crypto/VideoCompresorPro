import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

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
    default: "Video Compressor with no Quality Compromise | VideoCompressorPro",
    template: "%s | VideoCompressorPro"
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  description: "Our free video compressor can compress video files online in seconds. Directly from your web browser, reduces video sizes such as MP4, MOV, AVI, MKV and more without noticeable quality loss.",
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
    description: "Our free video compressor can compress video files online in seconds. Directly from your web browser, reduces video sizes without noticeable quality loss.",
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
    description: "Compress video files online in seconds without quality loss.",
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
    languages: {
      "en-US": "/",
      "ar": "/ar",
      "hi": "/hi",
      "es": "/es",
      "pt": "/pt",
      "fr": "/fr",
      "de": "/de",
      "it": "/it",
      "id": "/id",
      "ja": "/ja",
      "ru": "/ru",
      "zh": "/zh",
      "tr": "/tr",
      "vi": "/vi",
      "ko": "/ko",
      "th": "/th",
      "nl": "/nl",
      "pl": "/pl",
      "fa": "/fa",
      "ro": "/ro",
      "el": "/el",
      "uk": "/uk",
      "sv": "/sv",
      "x-default": "/"
    },
  },
  verification: {
    google: "5zDZlNYc1BJIfkypQ4vmi0FPgB83fBYeFgqpYw9brV8",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VideoCompressorPro",
  },
};

export const viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
};

import { headers } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const locale = headersList.get('x-next-locale') || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6XRVDHRQMH"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6XRVDHRQMH');
          `}
        </Script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('preferred_theme') === 'dark' || (!('preferred_theme' in localStorage))) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-gradient-premium text-[var(--foreground)]`}>
        <ThemeProvider>
          <LanguageProvider initialLocale={locale} translations={require(`../locales/${locale}.json`)}>
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
            __html: JSON.stringify([
              {
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
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "VideoCompressorPro",
                "url": "https://videocompressorpro.com",
                "logo": "https://videocompressorpro.com/icon.svg"
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
