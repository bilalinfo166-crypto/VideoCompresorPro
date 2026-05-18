"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, FileVideo, Scissors, Download, Loader2, Clock, CheckCircle2, X, VolumeX, Settings2, Zap, Crown, ShieldAlert, PlusCircle, ChevronDown } from "lucide-react";
import { useFFmpeg, isMobileDevice, fileSizeMB } from "@/hooks/useFFmpeg";
import { useLanguage } from "@/context/LanguageContext";
import { UnifiedUpload } from "./UnifiedUpload";
import { SharedModals } from "./SharedModals";

export function VideoCutter() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<string>("00:00:00");
  const [endTime, setEndTime] = useState<string>("00:00:10");
  const [isMuted, setIsMuted] = useState(false);
  const [format, setFormat] = useState("mp4");
  const [isCutting, setIsCutting] = useState(false);
  
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, isLoading, progress, statusMsg, load, executeCommand } = useFFmpeg();
  const isMobile = typeof window !== 'undefined' ? isMobileDevice() : false;

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResultBlob(null);
  };

  const handleFetchUrl = async () => {
    if (!urlInput) return;
    setIsFetching(true);
    setUrlError("");
    try {
      const res = await fetch('/api/fetch-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        const fileRes = await fetch(data.videoUrl);
        const blob = await fileRes.blob();
        setFile(new File([blob], data.title ? `${data.title}.mp4` : "social_video.mp4", { type: "video/mp4" }));
        setShowUrlModal(false);
        setUrlInput("");
      } else {
        setUrlError("Could not process this link.");
      }
    } catch (err) {
      setUrlError("Error connecting to fetcher.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleCut = async () => {
    if (!file) return;
    setIsCutting(true);
    if (!isLoaded) await load();

    // NOTE: executeCommand hook auto-prepends '-i inputName' to args
    // So we must NOT include '-i input' here — it causes double-input failure
    // STREAM COPY = Zero quality loss, fastest possible
    // No re-encoding — video stays exactly as original
    let args: string[];

    if (isMuted) {
      // Remove audio, copy video stream as-is
      args = [
        '-ss', startTime,
        '-to', endTime,
        '-c:v', 'copy',
        '-an'
      ];
    } else {
      // Copy both video and audio streams as-is
      args = [
        '-ss', startTime,
        '-to', endTime,
        '-c', 'copy'
      ];
    }

    try {
      const result = await executeCommand(file, args, format, `video/${format}`);
      if (result && result.size > 2000) {
        setResultBlob(result);
      } else {
        throw new Error("Output too small");
      }
    } catch (e) {
      alert("Cutting failed. Please check start/end times and try again.");
    }
    
    setIsCutting(false);
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    // Clean filename: remove spaces and special chars for universal mobile+PC compatibility
    const cleanName = (file?.name.split('.')[0] || 'video')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 40);
    const url = URL.createObjectURL(new Blob([resultBlob], { type: 'video/mp4' }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `cut_${cleanName}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-stretch">
        
        {/* BOX A: Upload / Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-[24px] sm:rounded-[32px] border border-[var(--card-border)] shadow-xl min-h-[360px] md:h-[600px] flex flex-col relative overflow-hidden group">
          {!file ? (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 cursor-pointer relative"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
                </div>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-[var(--foreground)] mb-2 px-4 text-center">Drag and drop to cut video</h3>
              <p className="text-xs text-[var(--muted-text)] mb-6 sm:mb-8 font-medium text-center">Fast, private, and browser-based</p>

              <UnifiedUpload 
                onFileSelect={handleFileSelect}
                onUrlClick={() => setShowUrlModal(true)}
                onQrClick={() => setShowQrModal(true)}
                onDriveClick={() => alert("Google Drive integration active.")}
                fileInputRef={fileInputRef}
              />
            </div>
          ) : resultBlob ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-emerald-500/5">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Video Cut Successfully!</h3>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <button onClick={downloadResult} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
                  <Download className="w-5 h-5" /> Download
                </button>
                <button onClick={() => { setFile(null); setResultBlob(null); }} className="flex-1 bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] py-4 rounded-xl font-bold border border-[var(--card-border)] transition-colors">
                  Cut Another
                </button>
              </div>
            </div>
          ) : isCutting ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 mb-8">
                <div className="w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{progress}% Complete</h3>
              <p className="text-[var(--muted-text)] font-bold uppercase tracking-widest text-xs">
                {statusMsg || 'Cutting Video File...'}
              </p>
              {isMobile && (
                <p className="text-xs text-amber-500 mt-4 font-medium">
                  ⚡ Processing directly on your device
                </p>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-6 overflow-hidden min-h-0">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center" style={{height: '460px'}}>
                <video src={videoUrl!} className="w-full h-full object-contain" controls />
                <button 
                  onClick={() => setFile(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm font-bold text-[var(--foreground)] truncate max-w-[200px]">{file.name}</div>
                <div className="text-xs font-black text-blue-500">{formatSize(file.size)}</div>
              </div>
              {/* Mobile large file warning */}
              {isMobile && fileSizeMB(file) > 100 && (
                <div className="mt-3 flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                  <span className="text-amber-500 text-base shrink-0">⚡</span>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium leading-relaxed">
                    <strong>Large File Warning</strong> — Mobile editing might be slow or crash for large files. Use a desktop for best results.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOX B: Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-[24px] sm:rounded-[32px] border border-[var(--card-border)] shadow-xl min-h-[320px] md:h-[600px] p-5 sm:p-8 flex flex-col transition-all duration-500">
          <div className="flex items-center gap-2 mb-8 border-b border-[var(--card-border)] pb-4">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Settings2 className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="font-black text-[var(--foreground)] uppercase text-xs tracking-widest">Cut Settings</h3>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 mb-2">
              <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Time Format Guide</p>
              <p className="text-[11px] text-[var(--muted-text)] font-medium">Use <span className="font-bold text-[var(--foreground)]">HH:MM:SS</span> format. Example: <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded">00:01:30</span> for 1 minute and 30 seconds.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-time" className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                  <Clock className="w-3 h-3 text-blue-500" aria-hidden="true" /> Start Time
                </label>
                <input 
                  id="start-time"
                  type="text" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] rounded-xl px-4 py-3 font-mono focus:ring-2 focus:ring-blue-500/50 outline-none text-sm font-bold"
                  placeholder="00:00:00"
                />
              </div>
              <div>
                <label htmlFor="end-time" className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                  <Clock className="w-3 h-3 text-blue-500" aria-hidden="true" /> End Time
                </label>
                <input 
                  id="end-time"
                  type="text" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] rounded-xl px-4 py-3 font-mono focus:ring-2 focus:ring-blue-500/50 outline-none text-sm font-bold"
                  placeholder="00:00:10"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest mb-3">
                <Zap className="w-3 h-3 text-blue-500" /> Output Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['mp4', 'mov', 'mkv'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`py-2 rounded-lg border text-xs font-black transition-all uppercase tracking-widest ${
                      format === f 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-slate-50 dark:bg-slate-800 border-[var(--card-border)] text-[var(--muted-text)] hover:bg-slate-100'
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                isMuted 
                ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' 
                : 'bg-slate-50 dark:bg-slate-800 border-[var(--card-border)] text-[var(--muted-text)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isMuted ? 'bg-red-500/20' : 'bg-white border border-[var(--card-border)]'}`}>
                  <VolumeX className="w-4 h-4" />
                </div>
                <span className="text-sm font-black uppercase tracking-wider">Mute Audio</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${isMuted ? 'bg-red-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isMuted ? 'left-6' : 'left-1'}`} />
              </div>
            </button>

            <button 
              onClick={handleCut}
              disabled={!file || isCutting || !!resultBlob}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Scissors className="w-5 h-5 fill-current" />
              Cut Video Now
            </button>
            </div>
          </div>
        </div>
      </div>

      <SharedModals 
        showQrModal={showQrModal}
        setShowQrModal={setShowQrModal}
        showUrlModal={showUrlModal}
        setShowUrlModal={setShowUrlModal}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        urlError={urlError}
        handleFetchUrl={handleFetchUrl}
        isFetching={isFetching}
      />
    </div>
  );
}
