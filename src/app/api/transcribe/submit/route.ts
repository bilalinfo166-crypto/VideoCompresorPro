import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY!;
const ASSEMBLYAI_BASE = 'https://api.assemblyai.com/v2';

/**
 * POST /api/transcribe/submit
 * Body: { audio_url: string, language: string }
 * The browser has already uploaded the audio blob directly to AssemblyAI
 * and received an upload_url. This route submits the transcription job.
 */
export async function POST(req: NextRequest) {
  try {
    if (!ASSEMBLYAI_API_KEY) {
      return NextResponse.json({ error: 'AssemblyAI API key not configured on server.' }, { status: 500 });
    }

    const { audio_url, language } = await req.json();

    if (!audio_url) {
      return NextResponse.json({ error: 'audio_url is required' }, { status: 400 });
    }

    const body: Record<string, unknown> = {
      audio_url,
      speech_model: 'universal-2',   // required by AssemblyAI as of latest API
      punctuate: true,
      format_text: true,
    };

    if (language && language !== 'auto') {
      body.language_code = language;
      body.speaker_labels = true;    // speaker labels work with explicit language
    } else {
      body.language_detection = true;
      body.speaker_labels = false;   // cannot combine speaker_labels + language_detection
    }

    const response = await fetch(`${ASSEMBLYAI_BASE}/transcript`, {
      method: 'POST',
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `Submit failed: ${text}` }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ transcript_id: data.id });
  } catch (err: any) {
    console.error('[transcribe/submit]', err);
    return NextResponse.json({ error: err.message || 'Submit failed' }, { status: 500 });
  }
}
