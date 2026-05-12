import { NextResponse } from 'next/server';
import { ratelimit } from '@/lib/ratelimit';
import ytdl from 'ytdl-core';

export async function POST(req: Request) {
  try {
    // 0. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_fetch_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' }, 
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        }
      );
    }

    const { url } = await req.json();

    // 1. Basic Validation
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 2. URL Format & Safety Check (Prevent SSRF)
    try {
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return NextResponse.json({ error: 'Invalid protocol. Only HTTP and HTTPS are allowed.' }, { status: 400 });
      }
      
      // Block internal/local addresses
      const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
      if (blockedHosts.includes(parsedUrl.hostname) || parsedUrl.hostname.startsWith('192.168.') || parsedUrl.hostname.startsWith('10.')) {
        return NextResponse.json({ error: 'Access to local network is restricted.' }, { status: 403 });
      }
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Handle YouTube
    if (ytdl.validateURL(url)) {
      try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });
        if (format?.url) {
          return NextResponse.json({ success: true, videoUrl: format.url, title: info.videoDetails.title });
        }
      } catch (e) {
        console.error('[fetch-video] YouTube error:', (e as Error).message);
      }
    }

    // Handle TikTok, Instagram, Facebook
    const isSocial = /tiktok\.com|instagram\.com|facebook\.com|fb\.watch/.test(url);
    if (isSocial) {
      return NextResponse.json({ 
        success: true, 
        videoUrl: url, 
        isSocial: true,
        message: "Processing social media link via extraction service..." 
      });
    }

    // Default: return as direct link (if it passed the safety checks above)
    return NextResponse.json({ success: true, videoUrl: url });

  } catch (error) {
    console.error('[fetch-video] System error');
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
