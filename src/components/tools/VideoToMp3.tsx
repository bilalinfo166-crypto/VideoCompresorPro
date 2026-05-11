"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileVideo, Music, Download, Loader2, CheckCircle2, X, Settings2, Zap, Volume2 } from "lucide-react";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { useLanguage } from "@/context/LanguageContext";

export function VideoToMp3() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [bitrate, setBitrate] = useState<string>("192k");
  const [channels, setChannels] = useState<string>("2");
  const [sampleRate, setSampleRate] = useState<string>("44100");
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isLoaded, isLoading, progress, load, executeCommand } = useFFmpeg();

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
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile);
        setResultBlob(null);
      }
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    setIsExtracting(true);
    
    if (!isLoaded) {
      await load();
    }

    // NOTE: executeCommand hook auto-prepends '-i inputName' to args
    const args = [
      '-vn',
      '-c:a', 'libmp3lame',
      '-b:a', bitrate,
      '-ac', channels,
      '-ar', sampleRate
    ];

    const result = await executeCommand(file, args, 'mp3', 'audio/mp3');
    
    if (result) {
      setResultBlob(result);
    } else {
      alert(t("tool.mp3_failed"));
    }
    
    setIsExtracting(false);
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    // Clean filename: remove spaces and special chars for universal mobile+PC compatibility
    const cleanName = (file?.name.split('.')[0] || 'audio')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 40);
    const url = URL.createObjectURL(new Blob([resultBlob], { type: 'audio/mpeg' }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cleanName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* LEFT: Upload / Result Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-[var(--card-border)] shadow-xl min-h-[600px] flex flex-col relative overflow-hidden group">
          {!file ? (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-500 group"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <UploadCloud className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black mb-4 text-[var(--foreground)] tracking-tight text-center">{t("tool.mp3_select_title")}</h2>
              <p className="text-[var(--muted-text)] mb-8 max-w-sm mx-auto font-medium text-center leading-relaxed">
                {t("tool.mp3_select_desc")}
              </p>
              <button className="bg-blue-600 text-white hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                {t("tool.choose_file")}
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />
            </div>
          ) : resultBlob ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-emerald-500/[0.02]">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 shadow-inner animate-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-4xl font-black mb-3 text-[var(--foreground)] tracking-tight">{t("tool.mp3_success_title")}</h3>
              <p className="text-[var(--muted-text)] mb-10 font-bold text-lg">{t("tool.mp3_success_desc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button onClick={downloadResult} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 transition-all active:scale-95">
                  <Download className="w-6 h-6" /> {t("tool.download_mp3")}
                </button>
                <button onClick={() => { setFile(null); setResultBlob(null); }} className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[var(--foreground)] px-8 py-5 rounded-2xl font-black border border-[var(--card-border)] transition-all active:scale-95">
                  {t("tool.convert_another")}
                </button>
              </div>
            </div>
          ) : isExtracting ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              </div>
              <h3 className="text-3xl font-black mb-8 text-[var(--foreground)] tracking-tight">{t("tool.extracting_audio")}</h3>
              <div className="w-full max-w-md">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4 shadow-inner">
                  <div className="h-full bg-blue-600 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm font-black text-[var(--muted-text)] uppercase tracking-widest text-center">{progress}% {t("tool.complete")}</div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center overflow-hidden">
               <div className="w-full max-w-lg bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-10 border border-[var(--card-border)] shadow-inner mx-auto">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">
                      <FileVideo className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="w-full min-w-0">
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <h3 className="font-black text-2xl truncate max-w-[250px] text-[var(--foreground)] tracking-tight">{file.name}</h3>
                        <button onClick={() => setFile(null)} className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-[var(--muted-text)] hover:text-red-500">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-black uppercase tracking-widest leading-none">Video File</span>
                        <p className="text-sm text-[var(--muted-text)] font-black uppercase tracking-widest">{formatSize(file.size)}</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* RIGHT: Settings Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-[var(--card-border)] shadow-xl flex flex-col min-h-[600px]">
          <div className="flex items-center gap-3 mb-10 border-b border-[var(--card-border)] pb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-black text-[var(--foreground)] uppercase text-sm tracking-widest">{t("tool.audio_settings")}</h3>
          </div>

          <div className="space-y-8 flex-1">
            <div>
              <label className="text-xs font-black text-[var(--muted-text)] uppercase tracking-widest mb-4 block leading-none">{t("tool.bitrate_quality")}</label>
              <div className="grid grid-cols-2 gap-3">
                {["128k", "192k", "256k", "320k"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBitrate(b)}
                    className={`py-4 rounded-2xl text-xs font-black transition-all border uppercase tracking-widest ${
                      bitrate === b 
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.02]" 
                        : "bg-slate-50 dark:bg-slate-800 border-[var(--card-border)] text-[var(--muted-text)] hover:bg-white/5"
                    }`}
                  >
                    {b.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-[var(--muted-text)] uppercase tracking-widest mb-4 leading-none">
                  <Volume2 className="w-4 h-4 text-blue-500" /> {t("tool.channels")}
                </label>
                <select 
                  value={channels} 
                  onChange={(e) => setChannels(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] rounded-2xl px-5 py-4 text-sm text-[var(--foreground)] outline-none focus:ring-4 focus:ring-blue-500/10 font-black transition-all"
                >
                  <option value="1">{t("tool.mono")}</option>
                  <option value="2">{t("tool.stereo")}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-[var(--muted-text)] uppercase tracking-widest mb-4 leading-none">
                  <Zap className="w-4 h-4 text-blue-500" /> {t("tool.sample")}
                </label>
                <select 
                  value={sampleRate} 
                  onChange={(e) => setSampleRate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] rounded-2xl px-5 py-4 text-sm text-[var(--foreground)] outline-none focus:ring-4 focus:ring-blue-500/10 font-black transition-all"
                >
                  <option value="44100">44.1 kHz</option>
                  <option value="48000">48 kHz</option>
                </select>
              </div>
            </div>

             <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-xs text-[var(--muted-text)] leading-relaxed italic font-bold">
              {t("tool.mp3_notice")}
            </div>
          </div>

          <div className="mt-10">
            {isLoading && !isLoaded ? (
              <div className="w-full bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] p-6 rounded-2xl text-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
                <p className="text-xs text-[var(--muted-text)] uppercase tracking-widest font-black leading-none">{t("tool.loading_engine")}</p>
              </div>
            ) : (
              <button 
                onClick={handleExtract}
                disabled={!file || isExtracting || !!resultBlob}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-6 rounded-[24px] font-black text-xl transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 group uppercase tracking-widest active:scale-95"
              >
                <Music className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                {t("tool.extract_mp3")}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
