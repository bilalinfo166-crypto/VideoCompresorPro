import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OneTapSignup } from "@/components/auth/OneTapSignup";
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/icon.svg',
  },
  description: "Compress videos online for free without losing quality. Reduce MP4, MOV, AVI, and other video file sizes quickly with our secure online video compressor.",
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
    description: "Compress videos online for free without losing quality. Reduce MP4, MOV, AVI, and other video file sizes quickly with our secure online video compressor.",
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
    description: "Compress videos online for free without losing quality. Reduce MP4, MOV, AVI, and other video file sizes quickly with our secure online video compressor.",
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
      "en": "https://videocompressorpro.com",
      "x-default": "https://videocompressorpro.com",
      "ar": "https://videocompressorpro.com/ar",
      "hi": "https://videocompressorpro.com/hi",
      "es": "https://videocompressorpro.com/es",
      "pt": "https://videocompressorpro.com/pt",
      "fr": "https://videocompressorpro.com/fr",
      "de": "https://videocompressorpro.com/de",
      "it": "https://videocompressorpro.com/it",
      "id": "https://videocompressorpro.com/id",
      "ja": "https://videocompressorpro.com/ja",
      "ru": "https://videocompressorpro.com/ru",
      "zh": "https://videocompressorpro.com/zh",
      "tr": "https://videocompressorpro.com/tr",
      "vi": "https://videocompressorpro.com/vi",
      "ko": "https://videocompressorpro.com/ko",
      "th": "https://videocompressorpro.com/th",
      "nl": "https://videocompressorpro.com/nl",
      "pl": "https://videocompressorpro.com/pl",
      "fa": "https://videocompressorpro.com/fa",
      "ro": "https://videocompressorpro.com/ro",
      "el": "https://videocompressorpro.com/el",
      "uk": "https://videocompressorpro.com/uk",
      "sv": "https://videocompressorpro.com/sv",
      "he": "https://videocompressorpro.com/he",
      "da": "https://videocompressorpro.com/da",
      "fi": "https://videocompressorpro.com/fi",
      "no": "https://videocompressorpro.com/no",
      "cs": "https://videocompressorpro.com/cs",
      "hu": "https://videocompressorpro.com/hu",
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
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
        
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
            <OneTapSignup />
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
                "description": "Compress videos online for free without losing quality. Reduce MP4, MOV, AVI, and other video file sizes quickly with our secure online video compressor.",
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
                },
                "sameAs": [
                  "https://en.wikipedia.org/wiki/WebAssembly",
                  "https://en.wikipedia.org/wiki/FFmpeg",
                  "https://en.wikipedia.org/wiki/Video_compression"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "VideoCompressorPro",
                "url": "https://videocompressorpro.com",
                "logo": "https://videocompressorpro.com/icon.svg",
                "sameAs": [
                  "https://www.wikidata.org/wiki/Q115930263",
                  "https://www.facebook.com/profile.php?id=61590436030756",
                  "https://www.youtube.com/@VideoCompressorPro",
                  "https://www.instagram.com/videocompressorpro2026/",
                  "https://www.threads.net/@videocompressorpro2026"
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
