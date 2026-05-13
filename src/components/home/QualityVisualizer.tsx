"use client";

import { useLanguage } from "@/context/LanguageContext";

export function QualityVisualizer() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#f1f5f9] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">{t("visualizer.title")}</h2>
          <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed">{t("visualizer.desc")}</p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] group bg-white p-2 sm:p-4">
          <div className="relative rounded-[1.5rem] overflow-hidden bg-black aspect-video">
            <video 
              key="vibrant-colorful-visualizer"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-100 transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="/homepage-hd.mp4" type="video/mp4" />
              <track kind="captions" src="" label="English" />
            </video>


            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8 md:p-12">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 backdrop-blur-xl bg-white/10 p-4 sm:p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                {[
                  { label: "visualizer.original", size: "145 MB", active: false },
                  { label: "visualizer.basic", size: "68 MB (-53.1%)", active: false },
                  { label: "visualizer.strong", size: "25 MB (-82.8%)", active: false },
                  { label: "visualizer.advanced", size: "35 MB (-75.9%)", active: true },
                ].map((mode) => (
                  <div 
                    key={mode.label} 
                    className={`flex-1 min-w-[120px] rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 border ${
                      mode.active 
                        ? 'bg-white/95 border-white shadow-[0_8px_32px_rgba(255,255,255,0.4)] scale-105 z-10' 
                        : 'bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60 hover:border-white/40'

                    }`}
                  >
                    <div className={`font-bold text-sm sm:text-base mb-1 ${mode.active ? 'text-slate-900' : 'text-white'}`}>
                      {t(mode.label)}
                    </div>
                    <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${mode.active ? 'text-slate-600' : 'text-slate-200'}`}>
                      {mode.size}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
