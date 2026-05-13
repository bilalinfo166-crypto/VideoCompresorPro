"use client";

import { 
  Mail, 
  Gamepad2, 
  HardDrive, 
  Instagram, 
  Briefcase, 
  Cloud,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function UseCases() {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: Mail,
      title: "use_cases.i1_title",
      desc: "use_cases.i1_desc",
      points: ["use_cases.i1_p1", "use_cases.i1_p2", "use_cases.i1_p3"],
      color: "purple"
    },
    {
      icon: Gamepad2,
      title: "use_cases.i2_title",
      desc: "use_cases.i2_desc",
      points: ["use_cases.i2_p1", "use_cases.i2_p2", "use_cases.i2_p3"],
      color: "blue"
    },
    {
      icon: HardDrive,
      title: "use_cases.i3_title",
      desc: "use_cases.i3_desc",
      points: ["use_cases.i3_p1", "use_cases.i3_p2", "use_cases.i3_p3"],
      color: "emerald"
    },
    {
      icon: Instagram,
      title: "use_cases.i4_title",
      desc: "use_cases.i4_desc",
      points: ["use_cases.i4_p1", "use_cases.i4_p2", "use_cases.i4_p3"],
      color: "pink"
    },
    {
      icon: Briefcase,
      title: "use_cases.i5_title",
      desc: "use_cases.i5_desc",
      points: ["use_cases.i5_p1", "use_cases.i5_p2", "use_cases.i5_p3"],
      color: "orange"
    },
    {
      icon: Cloud,
      title: "use_cases.i6_title",
      desc: "use_cases.i6_desc",
      points: ["use_cases.i6_p1", "use_cases.i6_p2", "use_cases.i6_p3"],
      color: "cyan"
    }
  ];

  const colorMap: { [key: string]: string } = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
  };

  const iconColorMap: { [key: string]: string } = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    pink: "text-pink-400",
    orange: "text-orange-400",
    cyan: "text-cyan-400"
  };

  return (
    <section id="use-cases" className="py-24 bg-[var(--background)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            {t("use_cases.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6 leading-tight">
            {t("use_cases.title")}
          </h2>
          <p className="text-[var(--muted-text)] text-lg font-medium leading-relaxed">
            {t("use_cases.desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--card-background)] hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-500 group flex flex-col h-full relative"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${colorMap[useCase.color]}`}>
                <useCase.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight group-hover:text-indigo-400 transition-colors">
                {t(useCase.title)}
              </h3>
              
              <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium mb-8 flex-grow">
                {t(useCase.desc)}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-[var(--card-border)]">
                {useCase.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 group/point">
                    <CheckCircle2 className={`w-5 h-5 ${iconColorMap[useCase.color]} mt-0.5 shrink-0 transition-transform group-hover/point:scale-110`} />
                    <span className="text-[var(--muted-text)] text-sm font-bold leading-snug">
                      {t(point)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
