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
  const [dynamicDict, setDynamicDict] = useState<any>(null);

  useEffect(() => {
    // Load saved language from localStorage on mount
    const savedLang = localStorage.getItem('emm_language') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en' || savedLang === 'fr')) {
      setLanguageState(savedLang);
    }

    // Fetch dynamic translations
    fetch('/api/admin/translations')
      .then(r => r.json())
      .then(d => {
        if (d.translations) {
          setDynamicDict(d.translations);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    // Listen for live preview updates from admin panel
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_TRANSLATIONS' && event.data.payload) {
        setDynamicDict(event.data.payload);
      }
      if (event.data && event.data.type === 'CHANGE_LANGUAGE' && event.data.lang) {
        setLanguageState(event.data.lang as Language);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Visual Editor Logic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const isVisualEdit = urlParams.get('visualEdit') === 'true' && window.parent !== window;

    if (!isVisualEdit) return;

    const getCombinedDict = () => {
      const flattenObj = (ob: any, prefix = '') => {
        let result: any = {};
        for (const i in ob) {
          if (typeof ob[i] === 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
            Object.assign(result, flattenObj(ob[i], prefix + i + '.'));
          } else {
            result[prefix + i] = ob[i];
          }
        }
        return result;
      };

      const combinedDict: Record<string, string> = {};
      const flatStatic = flattenObj(dictionaries[language]);
      for (const k in flatStatic) {
        combinedDict[k] = flatStatic[k];
      }
      if (dynamicDict) {
        // dynamicDict is nested, but the leaf nodes are { es: string, en: string, fr: string }
        // We can flatten it first
        const flatDynamic = flattenObj(dynamicDict);
        // After flattening, keys will look like "home.hero.title.es": "Expo"
        // We need to extract the ones matching the current language
        for (const k in flatDynamic) {
          if (k.endsWith(`.${language}`)) {
            const baseKey = k.substring(0, k.length - 3); // remove ".es"
            combinedDict[baseKey] = flatDynamic[k];
          }
        }
      }
      return combinedDict;
    };

    const findKeyForText = (text: string) => {
      if (!text) return null;
      const cleanText = text.trim();
      if (!cleanText) return null;

      const dict = getCombinedDict();
      // Match exactly the text, ignoring surrounding whitespaces
      for (const [key, val] of Object.entries(dict)) {
        if (typeof val === 'string' && val.trim() === cleanText) {
          return key;
        }
      }
      return null;
    };

    let activeEl: HTMLElement | null = null;
    let originalOutline = '';

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.isContentEditable) return;

      // We only care if the element contains only text nodes or minimal formatting
      // But textContent gives us all text.
      const text = target.textContent || '';
      const matchedKey = findKeyForText(text);
      if (matchedKey) {
        originalOutline = target.style.outline;
        target.style.outline = '2px dashed #E4007C';
        target.style.cursor = 'text';
        target.setAttribute('title', 'Clic para editar texto visualmente');
        activeEl = target;
        e.stopPropagation(); // Prevent parent elements from highlighting
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (activeEl && !activeEl.isContentEditable) {
        activeEl.style.outline = originalOutline;
        activeEl.style.cursor = '';
        activeEl.removeAttribute('title');
        activeEl = null;
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.isContentEditable) return;

      const text = target.textContent || '';
      const matchedKey = findKeyForText(text);

      if (matchedKey) {
        e.preventDefault();
        e.stopPropagation();

        target.style.outline = '2px solid #00BAD3';
        target.contentEditable = 'true';
        target.focus();

        const onBlur = () => {
          target.contentEditable = 'false';
          target.style.outline = originalOutline;
          target.removeEventListener('blur', onBlur);

          const newText = target.textContent || '';

          // Send to parent window
          window.parent.postMessage({
            type: 'VISUAL_EDIT_UPDATE',
            key: matchedKey,
            value: newText,
            lang: language
          }, '*');
        };

        target.addEventListener('blur', onBlur);
      }
    };

    // Use bubbling phase (false) so innermost elements catch the event first
    document.body.addEventListener('mouseover', onMouseOver, false);
    document.body.addEventListener('mouseout', onMouseOut, false);
    document.body.addEventListener('click', onClick, false);

    return () => {
      document.body.removeEventListener('mouseover', onMouseOver, false);
      document.body.removeEventListener('mouseout', onMouseOut, false);
      document.body.removeEventListener('click', onClick, false);
    };

  }, [language, dynamicDict]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('emm_language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');

    if (dynamicDict) {
      let currentDynamic: any = dynamicDict;
      for (const key of keys) {
        if (currentDynamic && currentDynamic[key] !== undefined) {
          currentDynamic = currentDynamic[key];
        } else {
          currentDynamic = undefined;
          break;
        }
      }
      
      // En la BD, los strings finales están dentro de objetos con las llaves de idiomas: { es: '...', en: '...', fr: '...' }
      if (currentDynamic && typeof currentDynamic[language] === 'string') {
        return currentDynamic[language];
      }
    }

    // Fallback al diccionario estático original
    let currentStatic: any = dictionaries[language];
    for (const key of keys) {
      if (currentStatic && currentStatic[key] !== undefined) {
        currentStatic = currentStatic[key];
      } else {
        return path; // Fallback to key if not found
      }
    }
    
    // El diccionario estático puede tener los strings directamente o anidados bajo el idioma
    if (typeof currentStatic === 'string') {
      return currentStatic;
    }
    return path;
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
