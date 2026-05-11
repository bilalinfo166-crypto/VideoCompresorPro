/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
  // Allow large audio uploads (up to 50MB) for the transcription API
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async headers() {
    return [
      {
        // Apply strict COEP/COOP only on pages that need SharedArrayBuffer (compression tools)
        source: "/compress-:format*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/crop-video",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/video-cutter",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/audio-cutter",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:locale(ur|ar|hi|es|pt|fr|de|it|id|ja|ru|zh|tr|vi|ko|th|nl|pl|fa|ro|el|uk|sv)/:path*',
        destination: '/:path*',
      },
      {
        source: '/:locale(ur|ar|hi|es|pt|fr|de|it|id|ja|ru|zh|tr|vi|ko|th|nl|pl|fa|ro|el|uk|sv)',
        destination: '/',
      }
    ];
  },
};

module.exports = nextConfig;
