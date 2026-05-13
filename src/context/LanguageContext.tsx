"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ 
  children: React.ReactNode, 
  initialLocale?: string,
  translations?: any 
}> = ({ children, initialLocale = 'en', translations }) => {
  const [language] = useState(initialLocale);
  const [currentTranslations] = useState(translations || en);

  const setLanguage = async (lang: string) => {
    try {
      if (lang === language) return;
      
      localStorage.setItem("preferred_lang", lang);
      
      const currentPath = window.location.pathname;
      const locales = ["en", "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", "el", "uk", "sv"];
      
      let cleanPath = currentPath;
      for (const loc of locales) {
        if (currentPath.startsWith(`/${loc}/`) || currentPath === `/${loc}`) {
          cleanPath = currentPath.replace(`/${loc}`, '') || '/';
          break;
        }
      }

      const newPath = lang === 'en' ? cleanPath : `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
      window.location.href = newPath;
      
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  useEffect(() => {
    document.documentElement.lang = initialLocale;
    // Set direction for RTL languages
    const rtlLocales = ['ar', 'fa'];
    document.documentElement.dir = rtlLocales.includes(initialLocale) ? "rtl" : "ltr";
  }, [initialLocale]);

  const t = (path: string): string => {
    const keys = path.split(".");
    let res: any = currentTranslations;
    for (const k of keys) { res = res?.[k]; }
    if (res && typeof res === 'string') return res;

    // Fallback to English
    let fb: any = en;
    for (const k of keys) { fb = fb?.[k]; }
    return (fb && typeof fb === 'string') ? fb : path;
  };


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
