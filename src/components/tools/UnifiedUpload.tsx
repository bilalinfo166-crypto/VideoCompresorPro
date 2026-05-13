"use client";

import { useState } from "react";
import { 
  PlusCircle, ChevronDown, Monitor, Link2, QrCode, X, Search 
} from "lucide-react";

interface UnifiedUploadProps {
  onFileSelect: (file: File) => void;
  onUrlClick: () => void;
  onQrClick: () => void;
  onDriveClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function UnifiedUpload({ 
  onFileSelect, 
  onUrlClick, 
  onQrClick, 
  onDriveClick, 
  fileInputRef 
}: UnifiedUploadProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Upload video file"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
      >

        <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
        <span className="text-lg">Choose File</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="video/*,audio/*" 
        onChange={handleFileChange} 
      />

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
                  action: onDriveClick
                },
                { 
                  logo: <QrCode className="w-4 h-4 text-purple-500" />, 
                  label: "From Mobile",
                  action: onQrClick
                },
                { 
                  logo: <Link2 className="w-4 h-4 text-blue-500" />, 
                  label: "From URL",
                  action: onUrlClick
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
  );
}
