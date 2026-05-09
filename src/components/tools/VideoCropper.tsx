"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, FileVideo, Crop, Download, Loader2, CheckCircle2, X, RotateCw, Settings2, Zap, Crown, ShieldAlert, PlusCircle, ChevronDown, Move } from "lucide-react";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { useLanguage } from "@/context/LanguageContext";
import { UnifiedUpload } from "./UnifiedUpload";
import { SharedModals } from "./SharedModals";
import { Rnd } from "react-rnd";

type CropRatio = "Original" | "1:1" | "9:16" | "16:9" | "4:5" | "2:3" | "Custom";

const PRESETS = [
  { label: "Original", ratio: "Original", icon: <Move className="w-3 h-3" /> },
  { label: "Instagram / TikTok", ratio: "9:16", icon: <div className="w-2 h-3 border border-current rounded-[2px]" /> },
  { label: "YouTube", ratio: "16:9", icon: <div className="w-3 h-2 border border-current rounded-[2px]" /> },
  { label: "Facebook / Portrait", ratio: "4:5", icon: <div className="w-2.5 h-3 border border-current rounded-[2px]" /> },
  { label: "Square", ratio: "1:1", icon: <div className="w-3 h-3 border border-current rounded-[2px]" /> },
  { label: "Story / Pinterest", ratio: "2:3", icon: <div className="w-2 h-3 border border-current rounded-[2px]" /> },
  { label: "Custom", ratio: "Custom", icon: <Settings2 className="w-3 h-3" /> },
];

export function VideoCropper() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [ratio, setRatio] = useState<CropRatio>("Original");
  const [format, setFormat] = useState("mp4");
  const [isCropping, setIsCropping] = useState(false);
  
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // Crop area state (relative to container)
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, isLoading, progress, load, executeCommand } = useFFmpeg();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Handle ratio changes
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;
    const container = containerRef.current;
    const video = videoRef.current;
    
    const applyInitialBox = () => {
      const rect = video.getBoundingClientRect();
      const contW = container.offsetWidth;
      const contH = container.offsetHeight;

      let newWidth, newHeight;
      const videoRatio = rect.width / rect.height;
      let targetRatioNum = 1;

      if (ratio === "1:1") targetRatioNum = 1;
      else if (ratio === "9:16") targetRatioNum = 9/16;
      else if (ratio === "16:9") targetRatioNum = 16/9;
      else if (ratio === "4:5") targetRatioNum = 4/5;
      else if (ratio === "2:3") targetRatioNum = 2/3;
      else if (ratio === "Original") targetRatioNum = videoRatio;

      if (videoRatio > targetRatioNum) {
        // Video is wider than target ratio -> fill height
        newHeight = rect.height;
        newWidth = newHeight * targetRatioNum;
      } else {
        // Video is taller than target ratio -> fill width
        newWidth = rect.width;
        newHeight = newWidth / targetRatioNum;
      }

      if (ratio === "Custom") return;

      setCropBox({
        x: (contW - newWidth) / 2,
        y: (contH - newHeight) / 2,
        width: newWidth,
        height: newHeight
      });
    };

    if (video.readyState >= 1) applyInitialBox();
    else video.onloadedmetadata = applyInitialBox;
    
  }, [ratio, file, videoUrl]);

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

  const handleCropAction = async () => {
    if (!file || !videoRef.current || !containerRef.current) return;
    setIsCropping(true);
    if (!isLoaded) await load();

    // Calculate actual video dimensions vs display dimensions
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container || (video.readyState < 1 && !video.duration)) {
      alert("Video metadata not loaded. Please wait a moment.");
      setIsCropping(false);
      return;
    }
    
    // Get actual intrinsic dimensions
    const vW = video.videoWidth || (video as any).width;
    const vH = video.videoHeight || (video as any).height;

    if (!vW || !vH) {
      alert("Could not determine video dimensions. Try playing the video for a second.");
      setIsCropping(false);
      return;
    }

    const rect = video.getBoundingClientRect();
    const scaleX = vW / rect.width;
    const scaleY = vH / rect.height;

    // Calculate crop box relative to the ACTUAL video pixels inside the container
    const relativeX = cropBox.x - (container.offsetWidth - rect.width) / 2;
    const relativeY = cropBox.y - (container.offsetHeight - rect.height) / 2;

    const actualX = Math.round(Math.max(0, relativeX * scaleX));
    const actualY = Math.round(Math.max(0, relativeY * scaleY));
    const actualW = Math.round(Math.min(video.videoWidth - actualX, cropBox.width * scaleX));
    const actualH = Math.round(Math.min(video.videoHeight - actualY, cropBox.height * scaleY));

    const args = [
      '-vf', `crop=${actualW}:${actualH}:${actualX}:${actualY}`,
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '18',            // Visually lossless (18=best, 28=worst)
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'high',
      '-level', '4.0',
      '-movflags', '+faststart',
      '-c:a', 'copy'           // Audio: no re-encoding = no quality loss
    ];

    const result = await executeCommand(file, args, format, `video/${format}`, false);
    if (result) setResultBlob(result);
    else alert("Cropping failed.");
    setIsCropping(false);
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    const cleanName = (file?.name.split('.')[0] || 'video')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 40);
    const url = URL.createObjectURL(new Blob([resultBlob], { type: 'video/mp4' }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `cropped_${cleanName}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* LEFT: Interactive Preview Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-[var(--card-border)] shadow-xl h-[600px] flex flex-col relative overflow-hidden group">
          {!file ? (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-8 cursor-pointer relative"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <UploadCloud className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Online Video Cropper</h3>
              <p className="text-sm text-[var(--muted-text)] mb-8 font-medium">Crop your video online in seconds. Choose presets or drag to select.</p>
              
              <UnifiedUpload 
                onFileSelect={handleFileSelect}
                onUrlClick={() => setShowUrlModal(true)}
                onQrClick={() => setShowQrModal(true)}
                onDriveClick={() => alert("Drive Picker active.")}
                fileInputRef={fileInputRef}
              />
            </div>
          ) : resultBlob ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-emerald-500/5">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Video Cropped!</h3>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <button onClick={downloadResult} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
                  <Download className="w-5 h-5" /> Download
                </button>
                <button onClick={() => { setFile(null); setResultBlob(null); }} className="flex-1 bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] py-4 rounded-xl font-bold border border-[var(--card-border)] transition-colors">
                  Crop Another
                </button>
              </div>
            </div>
          ) : isCropping ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 mb-8">
                <div className="w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{progress}% Processing...</h3>
              <p className="text-[var(--muted-text)] font-bold uppercase tracking-widest text-xs">Applying Crop Filter...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                 <div className="text-sm font-bold text-[var(--foreground)] truncate max-w-[300px]">{file.name}</div>
                 <button onClick={() => setFile(null)} className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                   ← Upload New
                 </button>
              </div>

              <div 
                ref={containerRef}
                className="relative bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center w-full flex-1"
              >
                <video 
                  ref={videoRef}
                  src={videoUrl!} 
                  className="max-w-full max-h-full object-contain"
                  style={{ pointerEvents: 'none' }}
                />
                
                {/* INTERACTIVE CROP BOX */}
                <Rnd
                  size={{ width: cropBox.width, height: cropBox.height }}
                  position={{ x: cropBox.x, y: cropBox.y }}
                  onDragStop={(e, d) => setCropBox({ ...cropBox, x: d.x, y: d.y })}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setCropBox({
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position,
                    });
                  }}
                  bounds="parent"
                  lockAspectRatio={ratio !== "Custom" && ratio !== "Original"}
                  enableResizing={ratio === "Custom" || ratio === "Original"}
                  className="z-50"
                >
                  <div className="w-full h-full border-2 border-blue-500 relative group/box shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30 pointer-events-none">
                      <div className="border-r border-b border-white/50" />
                      <div className="border-r border-b border-white/50" />
                      <div className="border-b border-white/50" />
                      <div className="border-r border-b border-white/50" />
                      <div className="border-r border-b border-white/50" />
                      <div className="border-b border-white/50" />
                      <div className="border-r border-white/50" />
                      <div className="border-r border-white/50" />
                    </div>

                    {/* Drag Handle Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/box:opacity-100 transition-opacity">
                      <Move className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>

                    {/* Ratio Label */}
                    <div className="absolute -top-8 left-0 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
                      {ratio} Selected
                    </div>
                  </div>
                </Rnd>
              </div>
              
              <div className="mt-4 flex flex-col items-center gap-1">
                 <div className="flex items-center gap-2 text-[var(--muted-text)] font-bold text-[10px] uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-[var(--card-border)] shadow-sm">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                   Preview Area
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Settings Area */}
        <div className={`bg-white dark:bg-slate-900 rounded-[32px] border border-[var(--card-border)] shadow-xl h-[600px] p-8 flex flex-col transition-all duration-500 ${!file ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100 grayscale-0'}`}>
          <h3 className="font-black text-[var(--foreground)] uppercase text-[10px] tracking-widest mb-6 border-b border-[var(--card-border)] pb-4 flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-blue-500" /> Platform Presets
          </h3>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4 custom-scrollbar">
              {PRESETS.map((p) => (
                <button
                  key={p.ratio}
                  onClick={() => setRatio(p.ratio as CropRatio)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all border text-[11px] font-bold uppercase tracking-wider group ${
                    ratio === p.ratio 
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20" 
                      : "bg-slate-50 dark:bg-slate-800 border-[var(--card-border)] text-[var(--muted-text)] hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ratio === p.ratio ? 'bg-white/20' : 'bg-white dark:bg-slate-700 border border-[var(--card-border)]'}`}>
                      {p.icon}
                    </div>
                    <span>{p.label}</span>
                  </div>
                  <span className="opacity-40 group-hover:opacity-100 transition-opacity">{p.ratio}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 mt-auto">
              <button 
                onClick={handleCropAction}
                disabled={!file || isCropping || !!resultBlob}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 uppercase tracking-widest group"
              >
                <Crop className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Crop Video Now
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
