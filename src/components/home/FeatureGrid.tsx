"use client";

import { 
  Settings, 
  Shield, 
  RefreshCw, 
  Zap, 
  User, 
  Sparkles 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureGrid() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Settings,
      title: "feature_grid.f1_title",
      desc: "feature_grid.f1_desc",
      color: "blue"
    },
    {
      icon: Shield,
      title: "feature_grid.f2_title",
      desc: "feature_grid.f2_desc",
      color: "blue"
    },
    {
      icon: RefreshCw,
      title: "feature_grid.f3_title",
      desc: "feature_grid.f3_desc",
      color: "blue"
    },
    {
      icon: Zap,
      title: "feature_grid.f4_title",
      desc: "feature_grid.f4_desc",
      color: "blue"
    },
    {
      icon: User,
      title: "feature_grid.f5_title",
      desc: "feature_grid.f5_desc",
      color: "blue"
    },
    {
      icon: Sparkles,
      title: "feature_grid.f6_title",
      desc: "feature_grid.f6_desc",
      color: "blue"
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">
            {t("feature_grid.title")}
          </h2>
          <p className="text-[var(--muted-text)] text-lg font-medium">
            {t("feature_grid.desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-background)] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 text-blue-500">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                {t(feature.title)}
              </h3>
              <p className="text-[var(--muted-text)] leading-relaxed text-sm font-medium">
                {t(feature.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
