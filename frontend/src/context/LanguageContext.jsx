import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext({
  lang: 'ta',
  isTamil: true,
  setLang: () => {},
  toggleLang: () => {},
  t: (path) => path
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('kalamanram_lang') || 'ta';
  });

  useEffect(() => {
    localStorage.setItem('kalamanram_lang', lang);
    document.documentElement.lang = lang;
    if (lang === 'ta') {
      document.title = 'இயல் இசை நாடகக் கலைமன்றம் | தமிழ் பண்பாட்டுக் கலைக்கூடம்';
    } else {
      document.title = 'Iyal Isai Naadagam | Center for Tamil Cultural Arts';
    }
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === 'ta' || newLang === 'en') {
      setLangState(newLang);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'ta' ? 'en' : 'ta'));
  };

  // Helper function to resolve dot-notated key e.g. t('nav.home')
  const t = (path) => {
    if (!path) return '';
    const keys = path.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if missing in current language
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const isTamil = lang === 'ta';

  return (
    <LanguageContext.Provider value={{ lang, isTamil, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
