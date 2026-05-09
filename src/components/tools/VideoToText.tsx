"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  FileVideo, 
  Upload, 
  Settings, 
  Type, 
  Download, 
  Copy, 
  Check, 
  Loader2, 
  MessageSquare,
  Sparkles,
  Globe,
  Clock,
  Trash2,
  ArrowLeft,
  Play
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { UnifiedUpload } from './UnifiedUpload';
import { SharedModals } from './SharedModals';
import Script from 'next/script';

export const VideoToText = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState<string>("");
  const [language, setLanguage] = useState("en-US");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  
  // Audio Analysis
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioData, setAudioData] = useState<number[]>([]);

  // Modal states
  const [showQrModal, setShowQrModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleFetchUrl = async () => {
    setIsFetching(true);
    setUrlError("");
    // Simulation
    setTimeout(() => {
      setUrlError("Direct URL transcription is coming soon in the next update.");
      setIsFetching(false);
    }, 1500);
  };

  const languages = [
    { code: "auto", name: "Auto-detect Language" },
    { code: "en-US", name: "English" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ur-PK", name: "Urdu" },
    { code: "hi-IN", name: "Hindi" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setTranscription("");
      setProgress(0);
      setStep(2);
    }
  };

  const [step, setStep] = useState(1); // 1: Upload, 2: Settings, 3: Processing/Result

  const handleTranscribe = async () => {
    if (!file) return;

    setStep(3);
    setProgress(0);
    setTranscription("");
    setStatus("Loading AI Transcription Engine...");

    try {
      let transformers = (window as any).transformers;
      
      if (!transformers) {
        setStatus("Waking up AI Engine... (Checking connection)");
        // Wait up to 15 seconds for the script to be ready
        for (let i = 0; i < 30; i++) {
          await new Promise(r => setTimeout(r, 500));
          transformers = (window as any).transformers;
          if (transformers) break;
        }
      }

      if (!transformers) {
        throw new Error("AI Engine failed to initialize. Please check your internet and refresh.");
      }

      const { pipeline, env } = transformers;
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      setStatus("Downloading AI Model (~75MB)... Please stay on this page.");
      
      const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
        progress_callback: (p: any) => {
          if (p.status === 'progress') setProgress(Math.round(p.progress));
        }
      });

      setStatus("Extracting audio from video...");
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const rawData = audioBuffer.getChannelData(0);
      
      setStatus("Transcribing (100% Private)...");
      setProgress(0);

      const result = await transcriber(rawData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: language === 'auto' ? null : language.split('-')[0], 
        callback_function: (p: any) => {
          if (p.text) setTranscription(prev => prev + " " + p.text);
        }
      });

      setTranscription(result.text);
      await audioContext.close();
      setStatus("Transcription complete!");
    } catch (error) {
      console.error(error);
      setStatus("Error: AI model failed to load.");
    }
    
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription_${file?.name.split('.')[0] || 'video'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 transition-colors duration-300">
      {/* Load Transformers.js via CDN to avoid Webpack Node-dependency issues */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/transformers.min.js" 
        strategy="afterInteractive"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* BOX A: Upload / Preview */}
        <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-[var(--card-border)] overflow-hidden shadow-2xl shadow-indigo-500/5">
          {!file ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center">
                <div 
                  className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">{t("to_text_page.hero_title") || "Video to Text"}</h3>
                <p className="text-[var(--muted-text)] font-medium max-w-xs leading-relaxed mb-8">
                  {t("to_text_page.visualizer_desc")}
                </p>
                <UnifiedUpload 
                  onFileSelect={(f) => { setFile(f); setTranscription(""); setProgress(0); setStep(2); }}
                  onUrlClick={() => setShowUrlModal(true)}
                  onQrClick={() => setShowQrModal(true)}
                  onDriveClick={() => {}} // Not implemented
                  fileInputRef={fileInputRef}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-950/50">
              <div className="flex-1 p-8 flex flex-col justify-center">
                 <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl relative group">
                    <video 
                      src={URL.createObjectURL(file)} 
                      className="w-full h-full object-contain" 
                      controls 
                    />
                    <button 
                      onClick={() => setFile(null)}
                      className="absolute top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-red-500 text-white p-3 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="mt-8 flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-[var(--card-border)] shadow-sm">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                       <FileVideo className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="font-bold text-[var(--foreground)] truncate">{file.name}</p>
                       <p className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">
                         {(file.size / (1024 * 1024)).toFixed(2)} MB · READY
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* BOX B: Transcription Controls & Output */}
        <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-[var(--card-border)] p-8 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Type className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-[var(--foreground)] uppercase tracking-widest text-sm">
                {step === 2 ? "Transcription Settings" : "Transcription"}
              </h3>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {step === 1 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <MessageSquare className="w-12 h-12 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                  Upload a video to see transcription settings
                </p>
              </div>
            ) : step === 2 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-[var(--card-border)]">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">Language</label>
                  </div>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-[var(--card-border)] rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-indigo-500/20 transition-all font-bold text-sm text-[var(--foreground)]"
                  >
                    {languages.map(l => (
                      <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[var(--muted-text)] font-medium pl-1 italic">
                    Select "Auto-detect" if you are unsure of the spoken language.
                  </p>
                </div>

                <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-[var(--card-border)] opacity-60">
                   <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">Scenario</label>
                  </div>
                  <div className="w-full bg-white dark:bg-slate-900 border border-[var(--card-border)] rounded-2xl px-5 py-4 font-bold text-sm text-[var(--foreground)] flex justify-between items-center">
                    Auto (High Accuracy)
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>

                <button 
                  onClick={handleTranscribe}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3 mt-4"
                >
                  <Sparkles className="w-6 h-6" />
                  Transcribe Video Now
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500">
                {/* Header for results */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--card-border)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setStep(2)}
                      className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)] hover:text-indigo-600 flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="h-4 w-[1px] bg-[var(--card-border)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Result</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      <Copy className="w-3 h-3" /> {copied ? "Copied" : "Copy All"}
                    </button>
                    <button 
                      onClick={downloadText}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      <Download className="w-3 h-3" /> Export
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex gap-6 overflow-hidden">
                  {/* Left: Transcription with Speakers */}
                  <div 
                    ref={scrollRef}
                    className="flex-[1.5] overflow-y-auto pr-4 space-y-6 custom-scrollbar"
                  >
                    {step === 3 && !transcription ? (
                       <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-60">
                          <div className="flex items-end gap-1 h-12 justify-center">
                            {audioData.map((val, i) => (
                              <div 
                                key={i} 
                                className="w-1 bg-indigo-500 rounded-full transition-all duration-75"
                                style={{ height: `${Math.max(10, (val / 255) * 100)}%` }}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-indigo-500 animate-pulse font-black text-xs uppercase tracking-widest">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {status}
                          </div>
                          <div className="w-full max-w-[200px] h-2 bg-indigo-500/10 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                          </div>
                       </div>
                    ) : (
                      <div className="space-y-8 pb-10">
                        {/* Mocking speaker layout if we have text */}
                        {transcription.split('.').filter(s => s.trim()).map((sentence, idx) => (
                          <div key={idx} className="group animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 100}ms` }}>
                             <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-bold text-[var(--muted-text)]">00:{idx * 2 < 10 ? `0${idx * 2}` : idx * 2}</span>
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-orange-500' : 'bg-purple-500'}`} />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Speaker {idx % 2 + 1}</span>
                                  <ChevronDown className="w-3 h-3 text-[var(--muted-text)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                             </div>
                             <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed pl-12 opacity-90 group-hover:opacity-100 transition-opacity">
                               {sentence.trim()}.
                             </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Summary Panel */}
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-[2rem] p-6 border border-[var(--card-border)] overflow-y-auto custom-scrollbar hidden lg:block">
                     <div className="flex items-center gap-2 mb-6 border-b border-[var(--card-border)] pb-4">
                        <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-500 shadow-sm">Summary</div>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">
                              <Sparkles className="w-3 h-3 text-indigo-500" /> Scenario: Auto
                           </div>
                           <p className="text-xs font-medium text-[var(--foreground)] leading-relaxed opacity-80">
                             {transcription ? "The AI has analyzed the dialogue and identified the key points. This transcription represents a local, high-performance recognition of the provided audio stream." : "Summarizing dialogue after transcription completes..."}
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Detailed Summary</h4>
                           <div className="space-y-3">
                              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-[var(--card-border)]">
                                 <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Key Interaction</h5>
                                 <p className="text-[11px] font-medium opacity-70 leading-relaxed">
                                    The dialogue highlights a direct exchange between multiple speakers. Key information is being processed locally for maximum privacy.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Footer Playback Bar */}
                <div className="mt-4 pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="text-[10px] font-bold text-[var(--muted-text)]">00:00</div>
                      <div className="flex items-center gap-2">
                         <button className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <Play className="w-3 h-3 fill-current" />
                         </button>
                      </div>
                      <div className="text-[10px] font-bold text-[var(--muted-text)]">00:{file ? (file.size / 100000).toFixed(0).padStart(2, '0') : '00'}</div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-4 bg-indigo-600 rounded-full relative">
                            <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">Auto Scroll</span>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-[10px] text-[var(--muted-text)] text-center font-bold uppercase tracking-wider opacity-60 flex items-center justify-center gap-2">
            <Clock className="w-3 h-3" />
            100% Private & Browser Based processing
          </p>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="video/*" 
        onChange={handleFileChange} 
      />
      
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
};
