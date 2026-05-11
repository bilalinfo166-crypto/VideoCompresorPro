import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/transcribe/token
 * Returns the AssemblyAI API key to the browser so it can upload
 * audio files directly — bypassing Vercel's 4.5 MB body-size limit.
 * Only the existing ASSEMBLYAI_API_KEY env var is needed (no NEXT_PUBLIC_ required).
 */
export async function GET() {
  const key = process.env.ASSEMBLYAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'AssemblyAI API key is not set on the server.' },
      { status: 500 }
    );
  }
  return NextResponse.json({ key });
}
