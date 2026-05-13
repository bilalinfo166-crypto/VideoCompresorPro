"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileAudio, Scissors, Download, Loader2, Clock, CheckCircle2, X, Settings2, Zap, Music } from "lucide-react";
import { useFFmpeg, isMobileDevice, fileSizeMB } from "@/hooks/useFFmpeg";
import { useLanguage } from "@/context/LanguageContext";

export function AudioCutter() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<string>("00:00:00");
  const [endTime, setEndTime] = useState<string>("00:00:10");
  const [format, setFormat] = useState("mp3");
  const [bitrate, setBitrate] = useState("192k");
  const [isCutting, setIsCutting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isLoaded, isLoading, progress, statusMsg, load, executeCommand } = useFFmpeg();
  const isMobile = typeof window !== 'undefined' ? isMobileDevice() : false;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResultBlob(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("audio/") || droppedFile.type.startsWith("video/")) {
        setFile(droppedFile);
        setResultBlob(null);
      }
    }
  };

  const handleCut = async () => {
    if (!file) return;
    setIsCutting(true);
    
    if (!isLoaded) {
      await load();
    }

    const args = [
      '-ss', startTime,
      '-to', endTime,
      '-vn',
      '-c:a', format === 'wav' ? 'pcm_s16le' : 'libmp3lame',
    ];

    if (format !== 'wav') {
      args.push('-b:a', bitrate);
    }

    const result = await executeCommand(file, args, format, `audio/${format}`);
    
    if (result) {
      setResultBlob(result);
    } else {
      alert(t("tool.audio_failed"));
    }
    
    setIsCutting(false);
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cut_${file?.name.split('.')[0] || "audio"}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 transition-colors duration-300">
      <div className="rounded-[24px] sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[var(--card-border)] flex flex-col md:flex-row bg-white dark:bg-slate-800 min-h-[360px] md:h-[600px]">
        {/* ─── LEFT COLUMN: Upload / File Info ─── */}
        <div className="flex-1 p-4 sm:p-6 md:p-12 border-b md:border-b-0 md:border-r border-[var(--card-border)] relative flex flex-col overflow-hidden">
          {!file ? (
            <div 
              className="flex-1 rounded-3xl p-6 sm:p-12 md:p-24 border-2 border-dashed border-[var(--card-border)] hover:border-blue-500/50 bg-slate-50 dark:bg-slate-800/50 transition-all duration-500 cursor-pointer text-center group relative overflow-hidden shadow-inner flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-[var(--foreground)] px-2">{t("tool.audio_select_title")}</h2>
                <p className="text-xs sm:text-sm text-[var(--muted-text)] mb-6 sm:mb-8 max-w-sm mx-auto font-medium leading-relaxed px-2">
                  {t("tool.audio_select_desc")}
                </p>
                <button className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-bold transition-colors shadow-xl shadow-blue-500/20 text-sm sm:text-base">
                  {t("tool.choose_file")}
                </button>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="audio/*,video/*" onChange={handleFileChange} />
            </div>
          ) : resultBlob ? (
            <div className="flex-1 glass-card rounded-3xl p-12 text-center border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-[var(--foreground)]">{t("tool.audio_success_title")}</h3>
              <p className="text-[var(--muted-text)] mb-8 font-medium">{t("tool.audio_success_desc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={downloadResult} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
                  <Download className="w-5 h-5" /> {t("tool.download_result")}
                </button>
                <button onClick={() => { setFile(null); setResultBlob(null); }} className="bg-[var(--background)] hover:bg-white/5 text-[var(--foreground)] px-8 py-4 rounded-xl font-bold border border-[var(--card-border)] transition-colors">
                  {t("tool.cut_another")}
                </button>
              </div>
            </div>
          ) : isCutting ? (
            <div className="flex-1 glass-card rounded-3xl p-8 sm:p-12 md:p-24 text-center border border-blue-500/20 bg-[var(--background)] flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 animate-spin" />
              </div>
              <h3 className="text-xl sm:text-3xl font-bold mb-4 text-[var(--foreground)] px-2">
                {statusMsg || t("tool.cutting_audio")}
              </h3>
              <div className="max-w-md mx-auto w-full px-4">
                <div className="h-2 bg-[var(--background)] border border-[var(--card-border)] rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-xs sm:text-sm font-black text-[var(--muted-text)] uppercase tracking-wider">{progress}% {t("tool.complete")}</div>
              </div>
              {isMobile && (
                <p className="text-xs text-amber-500 mt-6 font-medium text-center px-4">
                  ⚡ Processing directly on your device
                </p>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="glass-card rounded-3xl p-8 border border-[var(--card-border)] overflow-hidden relative bg-[var(--background)] w-full max-w-md">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                    <FileAudio className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-xl truncate pr-4 text-[var(--foreground)]">{file.name}</h3>
                      <button onClick={() => setFile(null)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-[var(--muted-text)] hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-[var(--muted-text)] font-bold">{formatSize(file.size)}</p>
                  </div>
                </div>
                {/* Mobile large file warning */}
                {isMobile && fileSizeMB(file) > 100 && (
                  <div className="mt-4 flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <span className="text-amber-500 text-base shrink-0">⚡</span>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium leading-relaxed text-left">
                      <strong>Large File Warning</strong> — Audio cutting on mobile might be slow for files &gt;100MB. Use a desktop for best results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN: Settings / Actions ─── */}
        <div className="w-full md:w-[420px] lg:w-[480px] p-5 sm:p-6 md:p-12 bg-slate-50 dark:bg-slate-950/50 flex flex-col h-auto md:h-[600px]">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-8 border-b border-[var(--card-border)] pb-4">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Settings2 className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="font-black text-[var(--foreground)] uppercase text-xs tracking-widest">{t("tool.editor_settings")}</h3>
            </div>

            <div className="space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="audio-start-time" className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                    <Clock className="w-3 h-3 text-blue-500" aria-hidden="true" />
                    {t("tool.start")}
                  </label>
                  <input 
                    id="audio-start-time"
                    type="text" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--foreground)] font-mono focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-sm font-bold"
                    placeholder="00:00:00"
                  />
                </div>
                <div>
                  <label htmlFor="audio-end-time" className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                    <Clock className="w-3 h-3 text-blue-500" aria-hidden="true" />
                    {t("tool.end")}
                  </label>
                  <input 
                    id="audio-end-time"
                    type="text" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--foreground)] font-mono focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-sm font-bold"
                    placeholder="00:00:10"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                  <Music className="w-3 h-3 text-blue-500" /> {t("tool.format")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['mp3', 'wav', 'ogg'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`py-2 rounded-lg border text-[10px] font-black transition-all uppercase tracking-widest ${
                        format === f 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-[var(--background)] border-[var(--card-border)] text-[var(--muted-text)] hover:bg-white/5'
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {format !== 'wav' && (
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                    <Zap className="w-3 h-3 text-blue-500" /> {t("tool.bitrate")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['128k', '192k', '256k', '320k'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBitrate(b)}
                        className={`py-2 rounded-lg border text-[10px] font-black transition-all uppercase tracking-widest ${
                          bitrate === b 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                          : 'bg-[var(--background)] border-[var(--card-border)] text-[var(--muted-text)] hover:bg-white/5'
                        }`}
                      >
                        {b.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              {isLoading && !isLoaded ? (
                <div className="w-full bg-[var(--background)] border border-[var(--card-border)] p-4 rounded-xl text-center">
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto mb-2" />
                  <p className="text-[10px] text-[var(--muted-text)] uppercase tracking-widest font-black">{t("tool.loading_engine")}</p>
                </div>
              ) : (
                <button 
                  onClick={handleCut}
                  disabled={!file || isCutting || !!resultBlob}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <Scissors className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                  {t("tool.cut_audio")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
