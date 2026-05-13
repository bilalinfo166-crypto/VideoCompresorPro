"use client";

import { X, QrCode, Link2, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface SharedModalsProps {
  showQrModal: boolean;
  setShowQrModal: (show: boolean) => void;
  showUrlModal: boolean;
  setShowUrlModal: (show: boolean) => void;
  urlInput: string;
  setUrlInput: (val: string) => void;
  urlError: string;
  handleFetchUrl: () => void;
  isFetching: boolean;
}

export function SharedModals({
  showQrModal,
  setShowQrModal,
  showUrlModal,
  setShowUrlModal,
  urlInput,
  setUrlInput,
  urlError,
  handleFetchUrl,
  isFetching
}: SharedModalsProps) {
  return (
    <>
      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQrModal(false)} />
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] p-10 relative z-10 border border-[var(--card-border)] shadow-2xl animate-in zoom-in-95 duration-300 text-center text-[var(--foreground)]">
            <button 
              onClick={() => setShowQrModal(false)} 
              aria-label="Close QR Modal"
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[var(--muted-text)]" />
            </button>

            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <QrCode className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Scan to Connect</h3>
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
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 border border-[var(--card-border)] shadow-2xl animate-in zoom-in-95 duration-300 text-[var(--foreground)]">
            <button 
              onClick={() => setShowUrlModal(false)} 
              aria-label="Close URL Import Modal"
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[var(--muted-text)]" />
            </button>

            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Link2 className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Import from URL</h3>
            <p className="text-sm text-[var(--muted-text)] mb-8 font-medium">Paste a direct video link or a social media URL (TikTok, Instagram, YouTube).</p>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className={`w-full bg-slate-50 dark:bg-slate-800 border ${urlError ? 'border-red-500' : 'border-[var(--card-border)]'} rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-blue-500/50 transition-all font-medium text-sm`}
                />
                {urlError && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase tracking-wider">{urlError}</p>}
              </div>
              
              <button 
                onClick={handleFetchUrl}
                disabled={isFetching || !urlInput}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                {isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Fetch Video"}
              </button>
              
              <p className="text-[10px] text-center text-[var(--muted-text)] font-bold uppercase tracking-widest opacity-60">
                Supports direct MP4, MOV, and major social links
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
