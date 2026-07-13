'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import es from '../messages/es.json';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionaries = {
  es,
  en,
  fr
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // Load saved language from localStorage on mount
    const savedLang = localStorage.getItem('emm_language') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en' || savedLang === 'fr')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('emm_language', lang);
  };

  // Helper to extract nested keys like "nav.nosotros"
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = dictionaries[language];

    for (const key of keys) {
      if (current[key] === undefined) {
        return path; // Fallback to key if not found
      }
      current = current[key];
    }

    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
