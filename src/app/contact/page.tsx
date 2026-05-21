"use client";

import { Mail, MessageSquare, Twitter, Github, MapPin, Send, Globe, LifeBuoy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-8 pb-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-[var(--foreground)]">{t("contact_page.hero_title")}</h1>
            <p className="text-[var(--muted-text)] text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              {t("contact_page.hero_subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: Mail,
                  title: t("contact_page.info1_title"),
                  value: "support@videocompressor.com",
                  desc: t("contact_page.info1_desc")
                },
                {
                  icon: MessageSquare,
                  title: t("contact_page.info2_title"),
                  value: t("contact_page.info2_val"),
                  desc: t("contact_page.info2_desc")
                },
                {
                  icon: Twitter,
                  title: t("contact_page.info3_title"),
                  value: "@VideoCompress",
                  desc: t("contact_page.info3_desc")
                }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 rounded-[32px] border border-[var(--card-border)] hover:border-indigo-500/30 transition-all group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-[var(--foreground)] font-bold mb-1">{item.title}</h3>
                      <p className="text-indigo-400 font-bold mb-2">{item.value}</p>
                      <p className="text-[var(--muted-text)] text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Status Card */}
              <div className="glass-card p-6 rounded-[32px] border border-emerald-500/20 bg-emerald-500/5">
                 <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t("contact_page.status_label")}
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8 md:p-12 rounded-[40px] border border-[var(--card-border)] shadow-2xl">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--muted-text)] ml-1">{t("contact_page.form_name")}</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--muted-text)] ml-1">{t("contact_page.form_email")}</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted-text)] ml-1">{t("contact_page.form_subject")}</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none font-medium">
                      <option className="bg-[var(--background)]">{t("contact_page.form_s1")}</option>
                      <option className="bg-[var(--background)]">{t("contact_page.form_s2")}</option>
                      <option className="bg-[var(--background)]">{t("contact_page.form_s3")}</option>
                      <option className="bg-[var(--background)]">{t("contact_page.form_s4")}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted-text)] ml-1">{t("contact_page.form_message")}</label>
                    <textarea 
                      rows={5}
                      placeholder={t("contact_page.form_message_placeholder")}
                      className="w-full px-6 py-4 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-medium"
                    />
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 text-lg">
                    {t("contact_page.form_submit")}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
