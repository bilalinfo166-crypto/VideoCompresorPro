import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '@/lib/ratelimit';

export const maxDuration = 120; // 2-minute timeout for transcription polling
export const dynamic = 'force-dynamic';

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY!;
const ASSEMBLYAI_BASE = 'https://api.assemblyai.com/v2';

// Step 1: Upload audio file to AssemblyAI
async function uploadAudio(audioBlob: Blob): Promise<string> {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const response = await fetch(`${ASSEMBLYAI_BASE}/upload`, {
    method: 'POST',
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
      'content-type': 'application/octet-stream',
      'transfer-encoding': 'chunked',
    },
    body: Buffer.from(arrayBuffer),
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.upload_url;
}

// Step 2: Submit transcription job
async function submitTranscription(audioUrl: string, language: string, speakerLabels: boolean): Promise<string> {
  const body: Record<string, unknown> = {
    audio_url: audioUrl,
    speaker_labels: speakerLabels,
    auto_chapters: false,
    sentiment_analysis: false,
    punctuate: true,
    format_text: true,
  };

  if (language && language !== 'auto') {
    body.language_code = language;
  } else {
    body.language_detection = true;
  }

  const response = await fetch(`${ASSEMBLYAI_BASE}/transcript`, {
    method: 'POST',
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Submission failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.id;
}

// Step 3: Poll until done
async function pollTranscription(transcriptId: string): Promise<any> {
  const maxAttempts = 120; // 2 minutes max
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 1500));

    const response = await fetch(`${ASSEMBLYAI_BASE}/transcript/${transcriptId}`, {
      headers: { 'authorization': ASSEMBLYAI_API_KEY },
    });

    if (!response.ok) throw new Error(`Polling failed: ${response.statusText}`);

    const data = await response.json();

    if (data.status === 'completed') return data;
    if (data.status === 'error') throw new Error(`Transcription error: ${data.error}`);
    // status === 'processing' or 'queued' — keep polling
  }

  throw new Error('Transcription timed out after 2 minutes.');
}

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Rate Limiting Check (Using Upstash Redis)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_transcribe_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          limit,
          remaining,
          reset
        }, 
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
    
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const language = (formData.get('language') as string) || 'auto';

    // 2. Validation
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // 3. Strict File Size Limit (25MB)
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size allowed is 25MB.' 
      }, { status: 413 });
    }

    // 4. MIME Type Validation
    const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/m4a', 'audio/x-m4a', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(audioFile.type)) {
      console.warn(`[transcribe] Rejected invalid MIME type: ${audioFile.type}`);
      // We still allow it if it's a common audio extension, but be cautious
      if (!audioFile.name.match(/\.(mp3|wav|m4a|ogg|mp4|webm)$/i)) {
        return NextResponse.json({ error: 'Invalid file type. Please upload a valid audio or video file.' }, { status: 400 });
      }
    }

    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type || 'audio/wav' });

    // Step 1: Upload
    const uploadUrl = await uploadAudio(audioBlob);

    // Step 2: Submit
    const transcriptId = await submitTranscription(uploadUrl, language, true);

    // Step 3: Poll
    const result = await pollTranscription(transcriptId);

    // Format the utterances (speaker-labeled sentences)
    const utterances = result.utterances?.map((u: any) => ({
      speaker: u.speaker,
      start: u.start, // milliseconds
      end: u.end,
      text: u.text,
    })) || [];

    // Fallback: if no speaker labels, split by sentences from words
    const words = result.words || [];

    return NextResponse.json({
      text: result.text || '',
      utterances,
      words,
      language_code: result.language_code,
      audio_duration: result.audio_duration,
      confidence: result.confidence,
    });
  } catch (err: any) {
    // Avoid leaking internal error details to client in production
    console.error('[transcribe]', err.message);
    return NextResponse.json({ 
      error: 'Transcription failed. Please try a smaller file or different format.' 
    }, { status: 500 });
  }
}

