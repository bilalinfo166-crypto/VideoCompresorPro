"use client";
import React, { useState, useRef, useCallback } from 'react';
import { FileVideo, Upload, Type, Download, Copy, Check, Loader2, MessageSquare, Sparkles, Globe, Trash2, ArrowLeft, Play, CheckCircle2, CloudUpload, Cpu, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { UnifiedUpload } from './UnifiedUpload';
import { SharedModals } from './SharedModals';

interface Utterance { speaker: string; start: number; end: number; text: string; }
interface TranscriptResult { text: string; utterances: Utterance[]; language_code: string; audio_duration: number; confidence: number; }

const STEPS = [
  { id: 1, icon: FileVideo, label: "Extracting Audio" },
  { id: 2, icon: CloudUpload, label: "Uploading to AI" },
  { id: 3, icon: Cpu, label: "AI Analyzing Speech" },
  { id: 4, icon: FileText, label: "Generating Transcript" },
];

const LANGUAGES = [
  { code: "auto", name: "Auto-detect Language" },
  { code: "en", name: "English" }, { code: "es", name: "Spanish" },
  { code: "fr", name: "French" }, { code: "de", name: "German" },
  { code: "it", name: "Italian" }, { code: "pt", name: "Portuguese" },
  { code: "ur", name: "Urdu" }, { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" }, { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" }, { code: "ko", name: "Korean" },
];

function msToTime(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

const SPEAKER_COLORS = ['#f97316','#8b5cf6','#06b6d4','#10b981','#f43f5e','#eab308'];

export const VideoToText = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<1|2|3|4>(1);
  const [language, setLanguage] = useState("auto");
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState<TranscriptResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleFetchUrl = async () => {
    setIsFetching(true); setUrlError("");
    setTimeout(() => { setUrlError("URL transcription coming soon."); setIsFetching(false); }, 1500);
  };

  const MAX_FILE_MB = 100;

  const handleFileSelect = useCallback((f: File) => {
    const sizeMB = f.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_MB) {
      setError(`File too large (${sizeMB.toFixed(1)} MB). Maximum allowed size is ${MAX_FILE_MB} MB.`);
      setStep(2);
      setFile(f); // still show the file card so user sees the size
      return;
    }
    setFile(f); setResult(null); setError(""); setProcessingStep(0); setStep(2);
  }, []);

  const extractAudioBlob = async (videoFile: File): Promise<Blob> => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx({ sampleRate: 16000 });
    const arrayBuf = await videoFile.arrayBuffer();
    const audioBuf = await ctx.decodeAudioData(arrayBuf);
    const numSamples = audioBuf.length;
    const pcm = audioBuf.getChannelData(0);

    // Build WAV
    const wavBuffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(wavBuffer);
    const write = (off: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
    write(0, 'RIFF'); view.setUint32(4, 36 + numSamples * 2, true);
    write(8, 'WAVE'); write(12, 'fmt '); view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, 16000, true); view.setUint32(28, 32000, true);
    view.setUint16(32, 2, true); view.setUint16(34, 16, true);
    write(36, 'data'); view.setUint32(40, numSamples * 2, true);
    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, pcm[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 32768 : s * 32767, true);
    }
    await ctx.close();
    return new Blob([wavBuffer], { type: 'audio/wav' });
  };

  const handleTranscribe = async () => {
    if (!file) return;
    setStep(3); setError(""); setResult(null); setProcessingStep(1);
    try {
      // Step 1: Extract audio from video in the browser
      const audioBlob = await extractAudioBlob(file);
      setProcessingStep(2);

      // Step 2: Fetch the AssemblyAI API key from our server (no NEXT_PUBLIC_ needed)
      const tokenRes = await fetch('/api/transcribe/token');
      if (!tokenRes.ok) throw new Error('Could not retrieve transcription token from server.');
      const { key: apiKey } = await tokenRes.json();
      if (!apiKey) throw new Error('AssemblyAI API key is not configured on the server.');

      const uploadRes = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          authorization: apiKey,
          'content-type': 'application/octet-stream',
        },
        body: audioBlob,
      });
      if (!uploadRes.ok) {
        const t = await uploadRes.text();
        throw new Error(`Audio upload failed: ${t}`);
      }
      const { upload_url } = await uploadRes.json();
      setProcessingStep(3);

      // Step 3: Tell our server to submit the transcription job (tiny JSON request)
      const submitRes = await fetch('/api/transcribe/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ audio_url: upload_url, language }),
      });
      if (!submitRes.ok) {
        const d = await submitRes.json();
        throw new Error(d.error || 'Failed to submit transcription job');
      }
      const { transcript_id } = await submitRes.json();
      setProcessingStep(4);

      // Step 4: Poll our server until transcription is done
      const maxAttempts = 120;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const pollRes = await fetch(`/api/transcribe/poll/${transcript_id}`);
        if (!pollRes.ok) {
          const d = await pollRes.json();
          throw new Error(d.error || 'Polling failed');
        }
        const pollData = await pollRes.json();
        if (pollData.status === 'completed') {
          setResult(pollData as TranscriptResult);
          setStep(4);
          return;
        }
        if (pollData.status === 'error') {
          throw new Error(pollData.error || 'Transcription error');
        }
        // still queued/processing — keep polling
      }
      throw new Error('Transcription timed out after 4 minutes.');
    } catch (e: any) {
      setError(e.message || 'Something went wrong.');
      setStep(2);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(result?.text || '');
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const exportTxt = () => {
    if (!result) return;
    let content = result.utterances?.length
      ? result.utterances.map(u => `[${msToTime(u.start)}] Speaker ${u.speaker}: ${u.text}`).join('\n\n')
      : result.text;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `transcript_${file?.name?.split('.')[0] || 'video'}.txt`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const speakerMap: Record<string, string> = {};
  let speakerIdx = 0;
  const getSpeakerColor = (s: string) => {
    if (!speakerMap[s]) { speakerMap[s] = SPEAKER_COLORS[speakerIdx++ % SPEAKER_COLORS.length]; }
    return speakerMap[s];
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* LEFT: Upload / Preview */}
        <div className="flex flex-col h-[620px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-[var(--card-border)] overflow-hidden shadow-2xl shadow-indigo-500/5">
          {!file ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">{t("to_text_page.hero_title") || "Video to Text"}</h3>
                <p className="text-[var(--muted-text)] font-medium max-w-xs leading-relaxed mb-8">{t("to_text_page.visualizer_desc") || "Upload a video and get accurate AI transcription in seconds."}</p>
                <UnifiedUpload onFileSelect={handleFileSelect} onUrlClick={() => setShowUrlModal(true)} onQrClick={() => setShowQrModal(true)} onDriveClick={() => {}} fileInputRef={fileInputRef} />
                {/* Max file size notice */}
                <div className="mt-4 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Max 100 MB · We can&apos;t process larger files</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950/50 p-8">
              <div className="aspect-video bg-black rounded-[1.5rem] overflow-hidden shadow-2xl relative group">
                <video src={URL.createObjectURL(file)} className="w-full h-full object-contain" controls />
                <button onClick={() => { setFile(null); setStep(1); setResult(null); }} className="absolute top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-red-500 text-white p-3 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 flex items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-[var(--card-border)] shadow-sm">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <FileVideo className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[var(--foreground)] truncate">{file.name}</p>
                  <p className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB · READY</p>
                </div>
                {step === 4 && <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Settings / Processing / Results */}
        <div className="flex flex-col h-[620px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-[var(--card-border)] p-8 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Type className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-[var(--foreground)] uppercase tracking-widest text-sm">
                {step === 1 ? "Transcription" : step === 2 ? "Settings" : step === 3 ? "Processing..." : "Transcript"}
              </h3>
            </div>
            {step === 4 && (
              <div className="flex gap-2">
                <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />} {copied ? "Copied!" : "Copy All"}
                </button>
                <button onClick={exportTxt} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                  <Download className="w-3 h-3" /> Export
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">

            {/* STEP 1: No file */}
            {step === 1 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <MessageSquare className="w-12 h-12 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">Upload a video to get started</p>
              </div>
            )}

            {/* STEP 2: Settings */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-[var(--card-border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">Language</label>
                  </div>
                  <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-[var(--card-border)] rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-indigo-500/30 transition-all font-bold text-sm text-[var(--foreground)]">
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                  </select>
                  <p className="text-[10px] text-[var(--muted-text)] font-medium pl-1 mt-2 italic">Select "Auto-detect" if unsure of the spoken language.</p>
                </div>
                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-200/50 dark:border-indigo-700/30 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">Cloud AI · High Accuracy</p>
                    <p className="text-[10px] text-indigo-500 mt-0.5">Speaker labels · Timestamps · ~15 sec for 1-min video</p>
                  </div>
                </div>
                <button onClick={handleTranscribe} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-3xl font-black text-base shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" /> Start Transcription
                </button>
              </div>
            )}

            {/* STEP 3: Processing */}
            {step === 3 && (
              <div className="h-full flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <div className="w-full max-w-xs space-y-3">
                  {STEPS.map((s) => {
                    const done = processingStep > s.id;
                    const active = processingStep === s.id;
                    return (
                      <div key={s.id} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : done ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-50 dark:bg-slate-800/40 opacity-40'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/20' : done ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                          {done ? <Check className="w-4 h-4 text-white" /> : active ? <Loader2 className="w-4 h-4 animate-spin" /> : <s.icon className="w-4 h-4 text-[var(--muted-text)]" />}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest ${active ? 'text-white' : done ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--muted-text)]'}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-widest animate-pulse">Please stay on this page...</p>
              </div>
            )}

            {/* STEP 4: Results */}
            {step === 4 && result && (
              <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Back + stats bar */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--card-border)]">
                  <button onClick={() => setStep(2)} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)] hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                  <div className="flex items-center gap-4">
                    {result.language_code && <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">{result.language_code}</span>}
                    {result.confidence && <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">{Math.round(result.confidence * 100)}% conf.</span>}
                  </div>
                </div>

                {/* Transcript */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
                  {result.utterances?.length > 0 ? (
                    result.utterances.map((u, i) => {
                      const color = getSpeakerColor(u.speaker);
                      return (
                        <div key={i} className="group animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${Math.min(i * 80, 800)}ms` }}>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-bold text-[var(--muted-text)] tabular-nums">{msToTime(u.start)}</span>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{u.speaker === 'A' ? 'Speaker 1' : u.speaker === 'B' ? 'Speaker 2' : `Speaker ${u.speaker}`}</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed pl-14 opacity-90 group-hover:opacity-100 transition-opacity">{u.text}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="space-y-4 pb-6">
                      {result.text?.split('. ').filter(s => s.trim()).map((sentence, i) => (
                        <div key={i} className="group animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${Math.min(i * 60, 600)}ms` }}>
                          <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="w-3 h-3 text-[var(--muted-text)]" />
                    <span className="text-[10px] font-bold text-[var(--muted-text)] tabular-nums">
                      {result.audio_duration ? `${Math.floor(result.audio_duration / 60)}:${String(Math.round(result.audio_duration % 60)).padStart(2, '0')}` : '--:--'} total
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Complete</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          <p className="mt-4 text-[10px] text-[var(--muted-text)] text-center font-bold uppercase tracking-wider opacity-60">⚡ Video to Text Converter · Results in ~15 seconds</p>
        </div>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
      <SharedModals showQrModal={showQrModal} setShowQrModal={setShowQrModal} showUrlModal={showUrlModal} setShowUrlModal={setShowUrlModal} urlInput={urlInput} setUrlInput={setUrlInput} urlError={urlError} handleFetchUrl={handleFetchUrl} isFetching={isFetching} />
    </div>
  );
};
