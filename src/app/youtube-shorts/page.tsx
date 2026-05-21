import PlatformLandingPage from '@/app/(platforms)/PlatformLandingPage';

export default function YouTubeShortsPage() {
  return (
    <PlatformLandingPage
      platformName="YouTube Shorts"
      slug="youtube-shorts"
      title="YouTube Shorts Video Compressor – Ultra‑Fast"
      description="Compress YouTube Shorts videos for smoother playback and faster uploads, free of charge."
      heroImage="/assets/hero/youtube_shorts.png"
      ctaLink="/compress-mp4?format=youtube-shorts"
    />
  );
}
