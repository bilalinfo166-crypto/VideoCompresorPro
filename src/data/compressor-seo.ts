export interface SEOData {
  title: string;
  description: string;
  h1: string;
  heroText: string;
  introText: string;
  features: { title: string; desc: string; icon: string }[];
  steps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  stats?: { label: string; value: string }[];
}

export const COMPRESSOR_PAGES: Record<string, SEOData> = {
  // FORMATS
  "mp4": {
    title: "Compress MP4 Online - Reduce MP4 File Size Without Quality Loss",
    description: "Compress MP4 videos online for free. Reduce MP4 file size quickly without watermarks. Perfect for mobile sharing, email, and social media.",
    h1: "Fast MP4 Video Compressor",
    heroText: "The world's most trusted MP4 compressor. Shrink your MP4 files in seconds while keeping stunning 1080p/4K quality.",
    introText: "MP4 is the most popular video format, but high-resolution MP4 files can be massive. Our intelligent compression engine analyzes your MP4 bitrates to provide the perfect balance between file size and visual clarity.",
    features: [
      { title: "No Quality Loss", desc: "Advanced libx264 encoding ensures your MP4 stays crisp.", icon: "Sparkles" },
      { title: "Universal Playback", desc: "Compressed MP4s work on all iPhones, Androids, and Smart TVs.", icon: "Smartphone" },
      { title: "Privacy First", desc: "Your files never leave your browser. 100% secure processing.", icon: "Shield" }
    ],
    steps: [
      { title: "Upload MP4", desc: "Drag and drop your MP4 file into the compressor box." },
      { title: "Set Target Size", desc: "Choose your desired output size in MB." },
      { title: "Compress & Save", desc: "Download your optimized MP4 instantly." }
    ],
    faqs: [
      { q: "Will my MP4 lose quality?", a: "No, we use high-efficiency constant rate factors to maintain visual integrity." },
      { q: "Is there a file size limit?", a: "You can compress MP4 files up to 5GB for free." }
    ]
  },
  "mov": {
    title: "Compress MOV Online - Shrink Apple QuickTime Videos Fast",
    description: "Compress MOV files online. Reduce Apple MOV video size for faster sharing and storage. High quality QuickTime compression without watermarks.",
    h1: "Pro MOV Video Compressor",
    heroText: "Apple MOV files are notoriously large. Our tool optimizes MOV bitrates for the web without sacrificing Apple's signature quality.",
    introText: "QuickTime (MOV) files captured on iPhones or Macs often take up gigabytes of space. We help you convert and compress them into efficient, web-ready formats instantly.",
    features: [
      { title: "Apple Optimized", desc: "Specifically tuned for high-bitrate ProRes and H.264 MOV files.", icon: "Zap" },
      { title: "Web Ready", desc: "Convert bulky MOVs into streamable, lightweight versions.", icon: "Globe" },
      { title: "Zero Wait", desc: "Fast browser-based processing, no server uploads required.", icon: "Activity" }
    ],
    steps: [
      { title: "Import MOV", desc: "Select your .mov file from your Mac or iPhone." },
      { title: "Adjust Size", desc: "Pick a target size that fits your sharing needs." },
      { title: "Export", desc: "Save your compressed video in seconds." }
    ],
    faqs: [
      { q: "Can I use this on iPhone?", a: "Yes, our tool is fully compatible with Safari on iOS for MOV compression." },
      { q: "Does it support 4K MOV?", a: "Absolutely, we handle 4K 60fps MOV files with ease." }
    ]
  },

  // PLATFORMS
  "video-for-whatsapp": {
    title: "Compress Video for WhatsApp Online - Send Large Videos Easily",
    description: "Compress videos for WhatsApp online. Shrink files below 16MB or 64MB to bypass WhatsApp sharing limits. No watermarks, 100% free.",
    h1: "WhatsApp Video Compressor",
    heroText: "Stop getting the 'File too large' error on WhatsApp. Compress your videos to fit the 16MB or 64MB limit perfectly.",
    introText: "WhatsApp has strict file size limits (16MB for mobile, 64MB for web). Our tool automatically optimizes your video to fit these limits while keeping the content clear and watchable.",
    features: [
      { title: "Bypass Limits", desc: "Automatically hit the exact 16MB or 64MB WhatsApp target.", icon: "CheckCircle2" },
      { title: "Instant Sharing", desc: "Compressed files are ready for immediate WhatsApp forwarding.", icon: "Smartphone" },
      { title: "Group Friendly", desc: "Smaller files mean faster uploads and downloads for your group chats.", icon: "Layers" }
    ],
    steps: [
      { title: "Choose Video", desc: "Pick the video you want to send on WhatsApp." },
      { title: "Select Limit", desc: "Set target to 15MB to be safe for WhatsApp mobile." },
      { title: "Download & Send", desc: "Share your video without any 'limit' warnings." }
    ],
    faqs: [
      { q: "What is the WhatsApp file limit?", a: "The mobile limit is 16MB, while WhatsApp Web supports up to 64MB." },
      { q: "Will the video look blurry?", a: "No, we optimize the resolution to ensure it looks great on phone screens." }
    ],
    stats: [
      { label: "WhatsApp Limit", value: "16 MB" },
      { label: "Success Rate", value: "99.9%" }
    ]
  },
  "video-for-discord": {
    title: "Compress Video for Discord Online - Bypass the 8MB/25MB Limit",
    description: "Compress videos for Discord for free. Shrink large videos to fit the 8MB (Nitro Basic) or 25MB limits. High quality Discord video optimizer.",
    h1: "Discord Video Compressor",
    heroText: "Tired of Discord Nitro prompts? Compress your memes and clips to fit under the 8MB or 25MB free limit instantly.",
    introText: "Discord's upload limits are the bane of every gamer. Whether you need an 8MB file for free users or a 25MB file for Nitro Basic, our tool ensures your clips stay high-quality and shareable.",
    features: [
      { title: "Nitro Friendly", desc: "Presets for 8MB, 25MB, and 50MB Discord limits.", icon: "Zap" },
      { title: "Gamer Ready", desc: "Perfect for high-FPS gameplay clips from OBS or Shadowplay.", icon: "Monitor" },
      { title: "Auto-Resize", desc: "Adjusts dimensions to ensure the file fits the tiny Discord limit.", icon: "Crop" }
    ],
    steps: [
      { title: "Upload Clip", desc: "Drag your gameplay clip or meme into the box." },
      { title: "Set 8MB Target", desc: "Use the slider to hit the 8MB mark exactly." },
      { title: "Share on Discord", desc: "Post your video in any channel without Nitro." }
    ],
    faqs: [
      { q: "What is the Discord free limit?", a: "Discord recently increased the free limit to 25MB for most users, but 8MB is still safer for some servers." },
      { q: "Does it support .webm?", a: "Yes, we recommend .webm for Discord as it has better compression for small sizes." }
    ],
    stats: [
      { label: "Free Limit", value: "25 MB" },
      { label: "Legacy Limit", value: "8 MB" }
    ]
  },
  "video-for-email": {
    title: "Compress Video for Email Online - Send Large Attachments Fast",
    description: "Compress videos for Email (Gmail, Outlook, Yahoo). Reduce video size to under 25MB for easy attachments. Send large videos via email for free.",
    h1: "Email Video Compressor",
    heroText: "Send videos via Email without using Google Drive or Dropbox. Shrink your files to fit the 25MB email attachment limit.",
    introText: "Most email providers like Gmail and Outlook have a 25MB limit. Our tool optimizes your professional videos or family clips to fit inside an email body perfectly.",
    features: [
      { title: "Gmail Compatible", desc: "Stays under the 25MB limit for seamless attachments.", icon: "Mail" },
      { title: "Professional Quality", desc: "Keeps your business presentations and tutorials looking sharp.", icon: "Star" },
      { title: "Cross-Platform", desc: "Works on all browsers, including Outlook and Yahoo Mail.", icon: "Globe" }
    ],
    steps: [
      { title: "Add Attachment", desc: "Select the large video file you want to email." },
      { title: "Set 24MB Limit", desc: "Aim for 24MB to ensure it fits the 25MB email cap." },
      { title: "Attach & Send", desc: "Download the file and attach it directly to your email." }
    ],
    faqs: [
      { q: "What is the Gmail attachment limit?", a: "Gmail allows up to 25MB per email. If it's larger, it forces a Google Drive link." },
      { q: "How much can I shrink a video?", a: "Often, we can shrink a 200MB video to 25MB while keeping it very watchable." }
    ]
  },
  "youtube": {
    title: "Compress Video for YouTube Online - Fast YouTube Optimizer",
    description: "Compress videos for YouTube online for free. Reduce video size while maintaining 1080p and 4K HD quality. Upload faster without processing delays.",
    h1: "Fast YouTube Video Compressor",
    heroText: "Upload to YouTube in seconds. Compress your 1080p and 4K videos while keeping the exact high-fidelity visual quality.",
    introText: "YouTube processes massive video uploads, but heavy files can cause processing hangs and endless wait times. Our smart optimizer reduces file size without losing resolutions or color accuracy.",
    features: [
      { title: "No Quality Loss", desc: "Advanced libx264 compression maintains your visual clarity.", icon: "Sparkles" },
      { title: "Fast Processing", desc: "Local browser processing means no server wait times.", icon: "Zap" },
      { title: "Privacy First", desc: "Your video never leaves your browser. 100% secure.", icon: "Shield" }
    ],
    steps: [
      { title: "Upload Video", desc: "Drag and drop your MP4, MOV, or WebM video file." },
      { title: "Choose Resolution", desc: "Select 1080p or 4K to stay optimized for YouTube." },
      { title: "Compress & Download", desc: "Get your lightweight video ready for instant upload." }
    ],
    faqs: [
      { q: "Will this lower my YouTube quality?", a: "No, our tool compresses files without losing resolution, so YouTube will process it in HD/4K." },
      { q: "Is it safe to use?", a: "Yes, all processing is done inside your browser, ensuring total privacy." }
    ],
    stats: [
      { label: "Optimal Resolution", value: "4K / 1080p" },
      { label: "YouTube Limit", value: "256 GB" }
    ]
  },
  "tiktok": {
    title: "Compress Video for TikTok Online - Shrink Videos for TikTok",
    description: "Compress videos for TikTok online for free. Optimize vertical 9:16 videos to fit TikTok guidelines perfectly. Keep your videos crisp for the FYP.",
    h1: "TikTok Video Compressor",
    heroText: "Make your videos pop on the FYP. Compress vertical clips to upload to TikTok instantly with zero lag.",
    introText: "TikTok favors fast-loading, high-quality vertical videos. Our compressor shrinks your MP4 and MOV files to fit TikTok mobile guidelines while keeping transitions and text perfectly sharp.",
    features: [
      { title: "9:16 Optimized", desc: "Perfect for vertical clips, Instagram Reels, and Shorts.", icon: "CheckCircle2" },
      { title: "FYP Quality", desc: "Keeps video resolution sharp to avoid blurry TikTok compression.", icon: "Smartphone" },
      { title: "Zero Server Lag", desc: "No uploading to external databases, processing completes instantly.", icon: "Layers" }
    ],
    steps: [
      { title: "Select Video", desc: "Choose your vertical video from your phone or PC." },
      { title: "Set Guidelines", desc: "Optimize your bitrate for fast TikTok loading." },
      { title: "Save & Share", desc: "Download the compressed video and post to TikTok immediately." }
    ],
    faqs: [
      { q: "Does TikTok compress videos?", a: "Yes, TikTok compresses files on upload, but compressing them first with our tool avoids blurry results." },
      { q: "What format is best for TikTok?", a: "MP4 and MOV in vertical 9:16 aspect ratio are the ideal formats for TikTok." }
    ],
    stats: [
      { label: "Aspect Ratio", value: "9:16" },
      { label: "TikTok Limit", value: "287 MB" }
    ]
  }
};

export const PSEO_SLUGS = Object.keys(COMPRESSOR_PAGES);
