"use client";

import { useState, useRef, useEffect } from "react";
import { 
  UploadCloud, FileVideo, Settings, Download, Loader2, Play, 
  PlusCircle, Sparkles, AlertCircle, Crown, ShieldAlert, X,
  ChevronDown, Monitor, Link2, HardDrive, Chrome, QrCode
} from "lucide-react";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { isMobileDevice, fileSizeMB } from "@/hooks/useFFmpeg";
import { useLanguage } from "@/context/LanguageContext";
import Script from "next/script";
import { QRCodeSVG } from "qrcode.react";

export function VideoCompressor() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState<number>(10);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, isLoading, progress, statusMsg, load, executeCommand, mobileFastCompress } = useFFmpeg();
  const isMobile = typeof window !== 'undefined' ? isMobileDevice() : false;

  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState<{show: boolean, type: string}>({show: false, type: ""});
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");

  // Disable body scroll when any modal is open
  useEffect(() => {
    if (showUrlModal || showQrModal || showCloudModal.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showUrlModal, showQrModal, showCloudModal.show]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      const mbSize = Math.round((file.size / (1024 * 1024)) * 0.5);
      setTargetSize(mbSize > 1 ? mbSize : 1);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResultBlob(null);
      setDropdownOpen(false);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    setResultBlob(null);
    if (!isLoaded) await load();

    // On mobile: use the fast mobile-optimized path (720p + CRF30 + ultrafast)
    if (isMobile && mobileFastCompress) {
      const result = await mobileFastCompress(file);
      setResultBlob(result);
      setIsCompressing(false);
      return;
    }

    // Desktop: bitrate-based target size compression
    const targetSizeBits = targetSize * 1024 * 1024 * 8;

    const getDuration = (): Promise<number> => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(video.duration);
        video.onerror = () => resolve(60);
        video.src = URL.createObjectURL(file);
      });
    };

    const duration = await getDuration();
    const targetBitrate = Math.floor(targetSizeBits / duration);
    const videoBitrate = Math.floor(targetBitrate * 0.9);
    
    const args = [
      '-c:v', 'libx264', 
      '-b:v', `${videoBitrate}`,
      '-maxrate', `${videoBitrate}`,
      '-bufsize', `${videoBitrate * 2}`,
      '-pix_fmt', 'yuv420p',
      '-preset', 'ultrafast',
      '-profile:v', 'main', 
      '-level', '4.0',
      '-movflags', '+faststart',
      '-c:a', 'aac', 
      '-b:a', '128k'
    ];

    const result = await executeCommand(file, args, 'mp4', 'video/mp4');
    if (result) {
      if (result.size >= file.size) {
        const fallbackBitrate = Math.floor(videoBitrate * 0.7);
        const fallbackArgs = [...args];
        fallbackArgs[3] = `${fallbackBitrate}`;
        const secondResult = await executeCommand(file, fallbackArgs);
        setResultBlob(secondResult || result);
      } else {
        setResultBlob(result);
      }
    } else {
      alert(t("common.failed"));
    }
    setIsCompressing(false);
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleDropbox = () => {
    if (typeof (window as any).Dropbox === 'undefined') {
      alert("Dropbox SDK is loading... please try again in a moment.");
      return;
    }
    (window as any).Dropbox.choose({
      success: async (files: any) => {
        const fileUrl = files[0].link;
        try {
          const res = await fetch(fileUrl);
          const blob = await res.blob();
          const fetchedFile = new File([blob], files[0].name, { type: "video/mp4" });
          setFile(fetchedFile);
        } catch (e) {
          alert("Could not load file from Dropbox. Please check your connection.");
        }
      },
      linkType: "direct",
      extensions: ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    });
  };

  const handleGoogleDrive = () => {
    alert("Google Drive requires an API Key and Client ID to be configured in your project settings. Once set, this will open the official Google Picker.");
    // In a real production setup, you would call:
    // gapi.load('picker', { 'callback': onPickerApiLoad });
  };

  const handleFetchUrl = async () => {
    if (!urlInput) return;
    setUrlError("");
    
    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv', '.flv', '.3gp', '.m4v'];
    const isSocial = /youtube\.com|youtu\.be|tiktok\.com|instagram\.com|facebook\.com|fb\.watch/.test(urlInput.toLowerCase());
    const hasValidExtension = allowedExtensions.some(ext => urlInput.toLowerCase().includes(ext));

    if (!hasValidExtension && !isSocial) {
      setUrlError(`Error: URL must end in an allowed extension or be a supported social link.`);
      return;
    }

    setIsCompressing(true); // Show some global loading or local
    try {
      const res = await fetch('/api/fetch-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput })
      });
      const data = await res.json();
      
      if (data.success && data.videoUrl) {
        if (data.isSocial) {
          // For social links, we inform the user and show how to proceed
          alert("Social link detected. We are fetching the video stream. If it takes too long, please ensure the video is public.");
        }
        
        try {
          const fileRes = await fetch(data.videoUrl);
          const blob = await fileRes.blob();
          const fetchedFile = new File([blob], data.title ? `${data.title}.mp4` : "social_video.mp4", { type: "video/mp4" });
          setFile(fetchedFile);
          setShowUrlModal(false);
          setUrlInput("");
        } catch (e) {
          alert("Video identified, but your browser blocked the direct fetch. Try downloading the video first.");
        }
      } else {
        alert("Could not process this link. Please ensure the video is public and accessible.");
      }
    } catch (err) {
      alert("Error connecting to fetcher.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 transition-colors duration-300">
      {/* Cloud SDKs */}
      <Script src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="YOUR_DROPBOX_APP_KEY" />
      <Script src="https://apis.google.com/js/api.js" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-stretch">
        
        {/* BOX A: Upload / Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] sm:rounded-[32px] border border-[var(--card-border)] shadow-xl min-h-[360px] flex flex-col relative overflow-hidden group">
          {!file ? (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 cursor-pointer relative"
              onClick={() => fileInputRef.current?.click()}
            >
              {/* Sample Video Button */}
              <button className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-[var(--muted-text)] hover:bg-slate-200 transition-colors border border-[var(--card-border)] touch-feedback">
                Try Sample
              </button>

              <div className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
                </div>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-[var(--foreground)] mb-2 px-4 text-center">Drag and drop a video file to start</h3>
              <p className="text-xs text-[var(--muted-text)] mb-6 sm:mb-8 font-medium">Max file size: 5GB</p>
              <p className="text-[10px] text-[var(--muted-text)] mb-6 sm:mb-10 opacity-60">Supported: mp4, webm, mov, mkv, avi, wmv, 30+ more</p>

              {/* Unified Choose File Button */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
                  <span className="text-lg">Choose File</span>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[210px] bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-[var(--card-border)] overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="p-1">
                        {[
                          { 
                            logo: <Monitor className="w-4 h-4 text-slate-500" />, 
                            label: "From Device", 
                            action: () => fileInputRef.current?.click() 
                          },
                          { 
                            logo: (
                              <svg viewBox="0 0 24 24" className="w-4 h-4">
                                <path fill="#4285F4" d="M15.427 12.002l4.83-8.318H8.832l-4.83 8.318z"/>
                                <path fill="#0F9D58" d="M8.832 15.345l4.83 8.318h9.66l-4.83-8.318z"/>
                                <path fill="#FFC107" d="M4.002 12.002l-3.34 5.759 4.83 8.318 3.34-5.759z"/>
                              </svg>
                            ), 
                            label: "Google Drive",
                            action: () => handleGoogleDrive()
                          },
                          { 
                            logo: <QrCode className="w-4 h-4 text-purple-500" />, 
                            label: "From Mobile",
                            action: () => setShowQrModal(true)
                          },
                          { 
                            logo: <Link2 className="w-4 h-4 text-blue-500" />, 
                            label: "From URL",
                            action: () => setShowUrlModal(true)
                          }
                        ].map((item, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => { if(item.action) item.action(); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all rounded-xl text-left group/item"
                          >
                            <div className="w-7 h-7 flex items-center justify-center transition-transform group-hover/item:scale-110">
                              {item.logo}
                            </div>
                            <span className="font-bold text-[12px] text-[var(--foreground)]">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              <div className="relative flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center">
                <video src={videoUrl!} className="max-w-full max-h-full" controls />
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
                    <strong>Mobile Fast Mode ON</strong> — Large file detected. Video will be downscaled to 720p for faster processing. For best quality, use a desktop browser.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOX B: Settings */}
        <div className={`bg-white dark:bg-slate-900 rounded-[24px] sm:rounded-[32px] border border-[var(--card-border)] shadow-xl min-h-[320px] md:h-[600px] p-5 sm:p-8 flex flex-col transition-all duration-500 ${!file ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100 grayscale-0'}`}>
          
          {/* Tabs */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex mb-8">
            <button 
              onClick={() => setActiveTab("basic")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "basic" ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
            >
              Basic Compression
            </button>
            <button 
              onClick={() => setActiveTab("advanced")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "advanced" ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
            >
              Advanced Compression
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              <div className="flex items-center justify-between">
                <label className="text-base font-bold text-[var(--foreground)]">Output file size:</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={targetSize}
                    onChange={(e) => setTargetSize(Number(e.target.value))}
                    className="w-20 bg-slate-50 dark:bg-slate-800 border border-[var(--card-border)] rounded-xl py-2 px-3 text-center font-black text-sm focus:ring-2 ring-blue-500 outline-none"
                  />
                  <span className="text-sm font-bold text-[var(--muted-text)]">MB</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max={file ? Math.round(file.size / (1024 * 1024)) : 100} 
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {isCompressing ? (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-[var(--card-border)] text-center">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <div className="text-2xl font-black text-blue-600 mb-1">{progress}%</div>
                <p className="text-sm font-bold text-[var(--muted-text)] uppercase tracking-widest">
                  {statusMsg || 'Compressing Video...'}
                </p>
                {isMobile && (
                  <p className="text-xs text-amber-500 mt-3 font-medium">
                    ⚡ Mobile Fast Mode — downscaling to 720p for speed
                  </p>
                )}
              </div>
            ) : resultBlob ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2rem] text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[var(--foreground)] mb-1">Compression Complete!</h4>
                <p className="text-sm text-[var(--muted-text)] mb-6 font-medium">New size: {formatSize(resultBlob.size)}</p>
                <button 
                  onClick={() => {
                    const cleanName = (file?.name.split('.')[0] || 'video')
                      .replace(/[^a-zA-Z0-9]/g, '_')
                      .replace(/_+/g, '_')
                      .substring(0, 40);
                    const url = URL.createObjectURL(new Blob([resultBlob], { type: 'video/mp4' }));
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `compressed_${cleanName}.mp4`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" /> Download Result
                </button>
              </div>
            ) : (
              <button 
                onClick={handleCompress}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[20px] font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                Start Compression
              </button>
            )}
          </div>

          <p className="mt-auto text-[10px] text-[var(--muted-text)] text-center font-bold uppercase tracking-wider opacity-60">
            100% Private & Browser Based processing
          </p>
        </div>

      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQrModal(false)} />
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 relative z-10 border border-[var(--card-border)] shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <button onClick={() => setShowQrModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-[var(--muted-text)]" />
            </button>
            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <QrCode className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Scan to Connect</h3>
            <p className="text-sm text-[var(--muted-text)] mb-10 font-medium leading-relaxed px-4">
              Scan this QR code with your mobile camera to transfer files directly from your phone.
            </p>
            
            <div className="bg-white p-6 rounded-3xl inline-block shadow-inner mb-10">
              <QRCodeSVG 
                value={typeof window !== 'undefined' ? 
                  (window.location.hostname === 'localhost' ? 'https://videocompressorpro.ai' : window.location.href) 
                  : 'https://videocompressorpro.ai'} 
                size={180} 
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-[var(--muted-text)] justify-center uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 py-4 rounded-2xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Waiting for connection...
            </div>
          </div>
        </div>
      )}

      {/* URL Input Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUrlModal(false)} />
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 border border-[var(--card-border)] shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowUrlModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-[var(--muted-text)]" />
            </button>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Link2 className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Import from URL</h3>
            <p className="text-sm text-[var(--muted-text)] mb-8 font-medium">Paste the direct link to your video file below.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="https://example.com/video.mp4" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className={`w-full bg-slate-50 dark:bg-slate-800 border ${urlError ? 'border-red-500' : 'border-[var(--card-border)]'} rounded-2xl py-4 px-6 outline-none focus:ring-2 ring-blue-500 transition-all font-medium`}
              />
              {urlError && <p className="text-[12px] text-red-500 font-medium leading-relaxed">{urlError}</p>}
              <button 
                onClick={handleFetchUrl}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cloud Service Modal (Coming Soon) */}
      {showCloudModal.show && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCloudModal({show: false, type: ""})} />
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 border border-[var(--card-border)] shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <button onClick={() => setShowCloudModal({show: false, type: ""})} className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-[var(--muted-text)]" />
            </button>
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{showCloudModal.type} Integration</h3>
            <p className="text-sm text-[var(--muted-text)] mb-8 font-medium leading-relaxed">
              We are currently working on {showCloudModal.type} integration. This feature will be available in the next update!
            </p>
            <button 
              onClick={() => setShowCloudModal({show: false, type: ""})}
              className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />
    </div>
  );
}


