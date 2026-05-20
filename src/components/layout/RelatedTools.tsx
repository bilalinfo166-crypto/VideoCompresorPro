import Link from "next/link";
import { Scissors, Zap, Music, Video, Crop, FileAudio, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type ToolId = "compressor" | "cutter" | "cropper" | "to_mp3" | "video_to_audio" | "to_text";

const ALL_TOOLS = [
  {
    id: "compressor",
    path: "/",
    icon: Video,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "cutter",
    path: "/video-cutter",
    icon: Scissors,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: "cropper",
    path: "/crop-video",
    icon: Crop,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "to_mp3",
    path: "/video-to-mp3",
    icon: Music,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    id: "video_to_audio",
    path: "/video-to-audio",
    icon: FileAudio,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "to_text",
    path: "/video-to-text",
    icon: FileText,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

export function RelatedTools({ exclude }: { exclude: ToolId }) {
  const { language, t } = useLanguage();

  const getLocalizedHref = (path: string) => {
    if (language === 'en') return path;
    if (path === '/') return `/${language}`;
    return `/${language}${path}`;
  };

  const relatedTools = ALL_TOOLS.filter(tool => tool.id !== exclude).slice(0, 3); // Get top 3 other tools

  return (
    <section className="py-16 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">{t("tools.related_title")}</h2>
            <p className="text-[var(--muted-text)] font-medium max-w-2xl mx-auto">
              {t("tools.related_desc")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((tool) => {
              const title = tool.id === "video_to_audio" ? t("nav.audio") : t(`tools.${tool.id}_title`);
              const desc = tool.id === "video_to_audio" ? t("audio_cutter_page.features_desc") : t(`tools.${tool.id}_desc`);
              return (
                <Link 
                  key={tool.id} 
                  href={getLocalizedHref(tool.path)}
                  className="group glass-card p-6 rounded-3xl border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 block relative overflow-hidden"
                  title={title}
                >
                  <div className={`w-12 h-12 ${tool.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} aria-hidden="true" />
                  </div>
                  {/* Keyword Rich Anchor Text Wrapper implicitly generated via translations */}
                  <h3 className="text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-indigo-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">
                    {desc}
                  </p>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
