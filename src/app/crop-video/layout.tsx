import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Cropper - Online Video Cropping Tool Without Watermark",
  description: "Video cropper Tool available for Free online without watermarks. Resize MP4 videos, adjust aspect ratios, optimize content for TikTok, Instagram, YouTube.",
  keywords: [
    "video cropper",
    "online video cropper",
    "crop video online",
    "resize video for tiktok",
    "instagram video resizer",
    "youtube shorts cropper",
    "video aspect ratio tool",
    "free video cropper no watermark"
  ],
  alternates: {
    canonical: "https://videocompressorpro.com/crop-video",
  },
  openGraph: {
    title: "Video Cropper - Online Video Cropping Tool Without Watermark",
    description: "Video cropper Tool available for Free online without watermarks. Resize MP4 videos, adjust aspect ratios, optimize content for TikTok, Instagram, YouTube.",
    url: "https://videocompressorpro.com/crop-video",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Cropper - Online Video Cropping Tool Without Watermark",
    description: "Video cropper Tool available for Free online without watermarks. Resize MP4 videos, adjust aspect ratios, optimize content for TikTok, Instagram, YouTube.",
  }
};

export default function VideoCropperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
