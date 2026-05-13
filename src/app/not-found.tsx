"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-premium px-4 py-20 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-12">
          <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl">
            <span className="text-6xl font-black text-blue-600">404</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[var(--foreground)] mb-6 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-lg sm:text-xl text-[var(--muted-text)] mb-12 font-semibold leading-relaxed max-w-lg mx-auto opacity-80">
          The page you are looking for might have been moved, deleted, or never existed. Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" /> Go Back Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-[var(--foreground)] border border-[var(--card-border)] px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" /> Previous Page
          </button>
        </div>

        <div className="mt-20 pt-12 border-t border-[var(--card-border)]">
          <p className="text-sm font-black text-[var(--muted-text)] uppercase tracking-widest flex items-center justify-center gap-3">
            <Search className="w-4 h-4 text-blue-500" /> 
            <span>Explore our free video tools</span>
          </p>
        </div>
      </div>
    </div>
  );
}
