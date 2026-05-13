"use client";

import { UserCheck, ShieldCheck, Award, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AuthorBlock() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto bg-slate-50/50 dark:bg-slate-900/20 rounded-[3rem] p-8 sm:p-12 border border-[var(--card-border)] flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white" aria-hidden="true" />
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
             <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-blue-500/10 backdrop-blur-sm">
               <UserCheck className="w-3.5 h-3.5" aria-hidden="true" /> Author: Editorial Team
             </span>
             <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-500/10 backdrop-blur-sm">
               <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Fact Checked
             </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-4 tracking-tight leading-tight">
            Professional Grade Quality Guaranteed
          </h2>

          
          <p className="text-sm sm:text-base text-[var(--muted-text)] font-semibold leading-relaxed mb-6">
            This tool and documentation are maintained by the VideoCompressorPro multimedia engineering team. We use advanced FFmpeg algorithms to ensure your videos are compressed with the perfect balance of size and quality. All processing happens 100% in your browser for total privacy.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-black text-indigo-500 uppercase tracking-widest">
             <Award className="w-4.5 h-4.5" aria-hidden="true" /> Trusted by Millions of Users Globally
          </div>
        </div>
      </div>
    </div>
  );
}
