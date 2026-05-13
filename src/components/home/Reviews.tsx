"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const REVIEWS = [
  { id: 1, name: "Michael Carter", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Sarah Mitchell", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Daniel Lee", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "Olivia Brown", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: 5, name: "James Wilson", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  { id: 7, name: "Ryan Walker", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: 8, name: "Sophia Taylor", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
  { id: 9, name: "Ethan Moore", avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
  { id: 10, name: "Ava Johnson", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
  { id: 11, name: "Noah Anderson", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 12, name: "Isabella Martin", avatar: "https://randomuser.me/api/portraits/women/12.jpg" }
];

export function Reviews() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--foreground)]">{t("reviews.title")}</h2>
          <p className="text-[var(--muted-text)] text-base sm:text-lg max-w-2xl mx-auto font-medium">{t("reviews.desc")}</p>
        </div>
        {/* Mobile: horizontal snap scroll. Desktop: 3-col grid */}
        <div className="mobile-carousel md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 max-w-7xl mx-auto">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex flex-col glass-card rounded-2xl p-6 sm:p-8 border border-[var(--card-border)] hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 h-full w-[80vw] sm:w-auto shrink-0 md:shrink">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" aria-hidden="true" />)}
              </div>
              <div className="flex-1">
                 <p className="text-[var(--foreground)] text-base leading-relaxed mb-8 font-medium opacity-90 italic">"{t(`reviews.r${review.id}_text`)}"</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--card-border)]">
                <Image src={review.avatar} alt={review.name} width={48} height={48} className="rounded-full bg-slate-800 object-cover ring-2 ring-white/10" />
                <div>
                  <div className="font-bold text-[var(--foreground)] text-sm">{review.name}</div>
                  <div className="text-xs text-[var(--muted-text)] font-bold uppercase tracking-wider">{t(`reviews.r${review.id}_role`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
