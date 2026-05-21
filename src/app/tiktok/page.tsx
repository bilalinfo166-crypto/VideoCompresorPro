import PlatformLandingPage from '@/app/(platforms)/PlatformLandingPage';

export default function TikTokPage() {
  return (
    <PlatformLandingPage
      platformName="TikTok"
      slug="tiktok"
      title="TikTok Video Compressor – Fast, Free & SEO Optimized"
      description="Compress TikTok videos without losing quality. Reduce file size for quick uploads and better performance."
      heroImage="/assets/hero/tiktok.png"
      ctaLink="/compress-mp4?format=tiktok"
    />
  );
}
