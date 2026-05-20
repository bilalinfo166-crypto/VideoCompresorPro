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
  },
  "avi": {
    title: "Compress AVI Online - Reduce AVI File Size Without Quality Loss",
    description: "Compress AVI videos online for free. Reduce AVI file size quickly with high-efficiency audio-video compression. No quality loss, secure browser-based tool.",
    h1: "Fast AVI Video Compressor",
    heroText: "Shrink heavy AVI files in seconds. Keep your high-quality AVI videos looking perfect while saving up to 80% storage space.",
    introText: "AVI files are known for their high video quality, but they can be incredibly heavy and take up massive storage. Our smart browser compressor optimizes AVI bitrates and streams them effortlessly.",
    features: [
      { title: "No Quality Loss", desc: "Advanced libx264 encoding ensures your AVI stays crisp.", icon: "Sparkles" },
      { title: "High Compression", desc: "Reduces AVI container overhead by up to 80%.", icon: "Zap" },
      { title: "Privacy First", desc: "Your files never leave your browser. 100% secure processing.", icon: "Shield" }
    ],
    steps: [
      { title: "Upload AVI", desc: "Drag and drop your AVI file into the compressor box." },
      { title: "Set Target Size", desc: "Choose your desired output size in MB." },
      { title: "Compress & Save", desc: "Download your optimized AVI instantly." }
    ],
    faqs: [
      { q: "Will my AVI lose quality?", a: "No, our tool maintains high visual clarity by adjusting container bitrates losslessly." },
      { q: "Is there a file size limit?", a: "You can compress AVI files up to 5GB for free." }
    ]
  },
  "mkv": {
    title: "Compress MKV Online - Shrink MKV Files Without Quality Loss",
    description: "Compress MKV videos online for free. Reduce heavy MKV file sizes while preserving multi-track audio and subtitle streams. Secure and fast browser tool.",
    h1: "Pro MKV Video Compressor",
    heroText: "Easily downsize large MKV movies and recordings. Shrink MKV container size in seconds with high-fidelity visual preservation.",
    introText: "MKV is a powerful container that often houses high-definition movies with multiple audio tracks. Our compressor shrinks heavy MKV files without stripping away your essential tracks or subtitles.",
    features: [
      { title: "HD Preservation", desc: "Retains full resolution and high-definition video clarity.", icon: "Sparkles" },
      { title: "Multi-Track Ready", desc: "Compresses the video stream while keeping audio/subtitle mapping intact.", icon: "Layers" },
      { title: "Local Processing", desc: "Zero server uploads mean 100% secure and immediate processing.", icon: "Shield" }
    ],
    steps: [
      { title: "Import MKV", desc: "Select your heavy MKV file from your local storage." },
      { title: "Choose Output Size", desc: "Define your target file size in MB." },
      { title: "Export MKV", desc: "Save your compressed MKV video instantly." }
    ],
    faqs: [
      { q: "Does it support 4K MKV files?", a: "Yes, we handle raw and 4K MKV files captured from cameras or streaming." },
      { q: "Are my files uploaded?", a: "No, all compression happens inside your browser locally." }
    ]
  },
  "webm": {
    title: "Compress WebM Online - Optimize WebM Videos for HTML5",
    description: "Compress WebM videos online for free. Reduce WebM file size for faster website loading and HTML5 web stream optimization. Fast and secure.",
    h1: "HTML5 WebM Video Compressor",
    heroText: "Optimize WebM files for high-speed website performance. Reduce file size to improve website load speeds and user experience.",
    introText: "WebM is the standard format for modern, high-speed HTML5 web video. Our optimizer fine-tunes WebM encoding bitrates to provide the absolute lightest web-ready files.",
    features: [
      { title: "Web Optimized", desc: "Designed specifically for web developers and fast site load times.", icon: "Globe" },
      { title: "VP8/VP9 Support", desc: "Fully supports modern VP8 and VP9 video codecs.", icon: "Zap" },
      { title: "Secure Processing", desc: "Local browser execution keeps your web assets 100% private.", icon: "Shield" }
    ],
    steps: [
      { title: "Upload WebM", desc: "Drag and drop your WebM assets into the tool." },
      { title: "Select Target Size", desc: "Set the ideal output size to minimize page load times." },
      { title: "Save Optimized File", desc: "Download your streamable WebM instantly." }
    ],
    faqs: [
      { q: "Can I compress WebM with transparency?", a: "Yes, our compressor preserves alpha channel transparency in WebM files." },
      { q: "Why should I compress WebM for websites?", a: "Smaller video files improve PageSpeed scores and user retention." }
    ]
  },
  "video-for-instagram": {
    title: "Compress Video for Instagram Online - Reels & Stories Optimizer",
    description: "Compress videos for Instagram online for free. Shrink Reels, Stories, and posts to fit Instagram's upload limits perfectly without quality blur.",
    h1: "Instagram Video Compressor",
    heroText: "Avoid blurry uploads on Instagram. Compress your Reels, IGTV, and Stories to hit Instagram's strict specs with perfect clarity.",
    introText: "Instagram automatically compresses raw video uploads, often resulting in pixelated or blurry Reels. By pre-compressing with our tool, you maintain HD visual quality on the feed.",
    features: [
      { title: "Reels Optimized", desc: "Perfect for vertical 9:16 layout specs and Reels uploads.", icon: "Smartphone" },
      { title: "HD Feed Quality", desc: "Forces Instagram's algorithm to keep your video sharp.", icon: "Sparkles" },
      { title: "Mobile Friendly", desc: "Compress directly from your iPhone or Android browser.", icon: "Activity" }
    ],
    steps: [
      { title: "Upload Instagram Video", desc: "Select your vertical Reel or post file." },
      { title: "Apply HD Preset", desc: "Optimize bitrates to match Instagram's standard spec." },
      { title: "Download & Post", desc: "Export and upload to Instagram with stunning quality." }
    ],
    faqs: [
      { q: "What is the best format for Instagram?", a: "MP4 with H.264 codec and AAC audio is the ideal format for Instagram uploads." },
      { q: "Why does Instagram make my video blurry?", a: "If your file is too heavy, Instagram compresses it aggressively. Pre-compressing it keeps it crisp." }
    ]
  },
  "video-for-slack": {
    title: "Compress Video for Slack Online - Share Large Videos Fast",
    description: "Compress videos for Slack online. Shrink files under Slack's free upload limits for fast team sharing. High quality Slack video size reducer.",
    h1: "Slack Video Compressor",
    heroText: "Share videos in Slack channels without reaching the upload limits. Shrink your MP4 and MOV clips for quick communication.",
    introText: "Slack has a strict file size limit for free workspaces. Our tool optimizes work clips, screen recordings, and tutorials so they upload instantly to any channel.",
    features: [
      { title: "Slack Compatible", desc: "Easily downsize clips under the free Slack upload limit.", icon: "CheckCircle2" },
      { title: "Fast Sharing", desc: "Smaller files mean faster uploads and quicker playbacks for team members.", icon: "Zap" },
      { title: "100% Confidential", desc: "Secure browser processing ensures work files stay private.", icon: "Shield" }
    ],
    steps: [
      { title: "Choose Slack Video", desc: "Select the work clip or demo video." },
      { title: "Reduce File Size", desc: "Shrink it below the Slack file limit." },
      { title: "Upload to Channel", desc: "Download and share directly in your Slack chat." }
    ],
    faqs: [
      { q: "What is the file limit on Slack?", a: "Slack free workspaces have a file limit of 1GB, but uploads are much faster when kept small." },
      { q: "Can I compress screen recordings?", a: "Yes, we support compressing MP4, WebM, and MOV screen captures." }
    ]
  },
  "video-for-teams": {
    title: "Compress Video for MS Teams - Share Large Videos in Teams",
    description: "Compress videos for Microsoft Teams online. Shrink heavy meeting recordings and presentations to bypass Teams file share limits. Free and fast.",
    h1: "Microsoft Teams Video Compressor",
    heroText: "Share heavy presentations and recordings in Microsoft Teams. Compress videos to fit Teams chat and channel limits perfectly.",
    introText: "Microsoft Teams is vital for corporate collaboration, but sharing heavy raw videos can be slow. Our tool shrinks video size so you can collaborate instantly and smoothly.",
    features: [
      { title: "Teams Optimized", desc: "Downscale presentations to fit corporate email or Teams chat.", icon: "Mail" },
      { title: "High Definition", desc: "Keeps presentation slides and text perfectly legible.", icon: "Monitor" },
      { title: "Enterprise Security", desc: "Local browser compression means no corporate data leaks.", icon: "Shield" }
    ],
    steps: [
      { title: "Select Teams Recording", desc: "Import your meeting capture or demo." },
      { title: "Choose Output Size", desc: "Set a lightweight target for easy sharing." },
      { title: "Download & Share", desc: "Get your optimized file and send it on Teams." }
    ],
    faqs: [
      { q: "Will my presentation text remain readable?", a: "Yes, we prioritize text clarity so slides stay sharp." },
      { q: "Is it safe for company files?", a: "Yes, no files are uploaded to any server. All processing is local." }
    ]
  },
  "video-for-facebook": {
    title: "Compress Video for Facebook - Shrink Videos for FB Upload",
    description: "Compress videos for Facebook online for free. Reduce file size of FB posts, ads, and cover videos without quality loss. Fast browser tool.",
    h1: "Facebook Video Compressor",
    heroText: "Optimize your videos for Facebook feeds and Ads. Shrink MP4 files to load faster and retain high-definition feed quality.",
    introText: "Slow-loading videos on Facebook hurt engagement and ad conversions. Pre-compressing your Facebook videos improves loading times and guarantees high viewer retention.",
    features: [
      { title: "Ad Optimized", desc: "Reduces ad file sizes for faster delivery and lower bounce rates.", icon: "Star" },
      { title: "Cover Ready", desc: "Perfect specs for Facebook page cover videos.", icon: "Globe" },
      { title: "Instant Processing", desc: "Direct browser encoding, no server upload delays.", icon: "Zap" }
    ],
    steps: [
      { title: "Upload Facebook Video", desc: "Drag and drop your post or ad video." },
      { title: "Apply FB Guidelines", desc: "Optimize bitrates for standard social feeds." },
      { title: "Export & Upload", desc: "Download your lightweight file and post on Facebook." }
    ],
    faqs: [
      { q: "What is the Facebook file size limit?", a: "Facebook supports up to 10GB, but small videos perform much better." },
      { q: "Does it support Facebook Ads?", a: "Yes, our tool is highly recommended to optimize Facebook Ad campaign assets." }
    ]
  }
};

export const PSEO_SLUGS = Object.keys(COMPRESSOR_PAGES);

