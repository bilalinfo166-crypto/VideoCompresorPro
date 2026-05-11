"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ur from "../locales/ur.json";
import ar from "../locales/ar.json";
import hi from "../locales/hi.json";
import es from "../locales/es.json";
import pt from "../locales/pt.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";
import it from "../locales/it.json";
import id from "../locales/id.json";
import ja from "../locales/ja.json";
import ru from "../locales/ru.json";
import zh from "../locales/zh.json";
import tr from "../locales/tr.json";
import vi from "../locales/vi.json";
import ko from "../locales/ko.json";
import th from "../locales/th.json";
import nl from "../locales/nl.json";
import pl from "../locales/pl.json";
import fa from "../locales/fa.json";
import ro from "../locales/ro.json";
import el from "../locales/el.json";
import uk from "../locales/uk.json";
import sv from "../locales/sv.json";


type Translations = typeof en;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Initial basic translations mapping
const allTranslations: Record<string, any> = { 
  en, ur, ar, hi, es, pt, fr, de, it, id, ja, ru, zh, tr, vi, ko, th, nl, pl, fa, ro, el, uk, sv 
};

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLocale?: string }> = ({ children, initialLocale = 'en' }) => {
  const [language, setLanguageState] = useState(initialLocale);
  const [currentTranslations, setCurrentTranslations] = useState(allTranslations[initialLocale] || en);

  const setLanguage = async (lang: string) => {
    try {
      if (lang === language) return;
      
      localStorage.setItem("preferred_lang", lang);
      
      // Get current path
      const currentPath = window.location.pathname;
      const locales = Object.keys(allTranslations);
      
      // Remove any existing locale prefix from the current path
      let cleanPath = currentPath;
      for (const loc of locales) {
        if (currentPath.startsWith(`/${loc}/`) || currentPath === `/${loc}`) {
          cleanPath = currentPath.replace(`/${loc}`, '') || '/';
          break;
        }
      }

      // If switching to English, use clean path, else prepend the new locale
      const newPath = lang === 'en' ? cleanPath : `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
      
      // Navigate to the new localized URL
      window.location.href = newPath;
      
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  useEffect(() => {
    // We already have the correct language from the server via initialLocale
    // Just sync the DOM attributes
    document.documentElement.lang = initialLocale;
    document.documentElement.dir = "ltr";
  }, [initialLocale]);

  const t = (path: string): string => {
    const keys = path.split(".");
    let result: any = currentTranslations;
    
    for (const key of keys) {
      if (!result || result[key] === undefined) {
        // Fallback to English if current translation missing this key
        let fallback: any = en;
        for (const fKey of keys) {
           if (!fallback || fallback[fKey] === undefined) {
             return path; // Key doesn't even exist in English
           }
           fallback = fallback[fKey];
        }
        return fallback;
      }
      result = result[key];
    }
    
    return result || path;
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
