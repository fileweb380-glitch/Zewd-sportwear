import React, { createContext, useContext, useState, useEffect } from 'react';

import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('zewd_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('zewd_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.en;

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);