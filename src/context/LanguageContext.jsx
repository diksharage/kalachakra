import React, { createContext, useContext } from 'react';
import { en } from '../i18n/en';

const LanguageContext = createContext();

// Minimal English-only LanguageProvider — language switching removed
export const LanguageProvider = ({ children }) => {
  const language = 'en';

  // No-op: kept for API compatibility only
  const setLanguage = () => {};

  const t = (key, fallback = null) => {
    if (!key || typeof key !== 'string') return fallback || key;

    const keys = key.split('.');
    let value = en;
    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }
    if (value && typeof value === 'string') return value;

    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
