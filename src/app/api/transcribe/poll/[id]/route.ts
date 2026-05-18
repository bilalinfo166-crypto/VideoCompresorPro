import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY!;
const ASSEMBLYAI_BASE = 'https://api.assemblyai.com/v2';

/**
 * GET /api/transcribe/poll/[id]
 * Polls AssemblyAI for the transcription result of a given transcript ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ASSEMBLYAI_API_KEY) {
      return NextResponse.json({ error: 'AssemblyAI API key not configured on server.' }, { status: 500 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Transcript ID is required' }, { status: 400 });
    }

    const response = await fetch(`${ASSEMBLYAI_BASE}/transcript/${id}`, {
      headers: { authorization: ASSEMBLYAI_API_KEY },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `Poll failed: ${text}` }, { status: 400 });
    }

    const data = await response.json();

    // Return status + full result when complete
    if (data.status === 'completed') {
      return NextResponse.json({
        status: 'completed',
        text: data.text || '',
        utterances: data.utterances?.map((u: any) => ({
          speaker: u.speaker,
          start: u.start,
          end: u.end,
          text: u.text,
        })) || [],
        words: data.words || [],
        language_code: data.language_code,
        audio_duration: data.audio_duration,
        confidence: data.confidence,
      });
    }

    if (data.status === 'error') {
      return NextResponse.json({ status: 'error', error: data.error || 'Transcription failed' });
    }

    // Still processing
    return NextResponse.json({ status: data.status });
  } catch (err: any) {
    console.error('[transcribe/poll]', err);
    return NextResponse.json({ error: err.message || 'Poll failed' }, { status: 500 });
  }
}
