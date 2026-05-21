import PlatformLandingPage from '@/app/(platforms)/PlatformLandingPage';

export default function InstagramReelsPage() {
  return (
    <PlatformLandingPage
      platformName="Instagram Reels"
      slug="instagram-reels"
      title="Instagram Reels Video Compressor – Free & Fast"
      description="Resize and compress Instagram Reels videos while preserving clarity. Perfect for quick sharing."
      heroImage="/assets/hero/instagram_reels.png"
      ctaLink="/compress-mp4?format=instagram-reels"
    />
  );
}
