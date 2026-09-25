import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { te } from '../i18n/te';
import { levelDictionary } from '../i18n/levelDictionary';
import { useGame } from './GameContext';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('kalachakra_lang') || 'en';
  });

  const { gameState, updateGameState } = useGame();

  useEffect(() => {
    if (gameState?.language && gameState.language !== language) {
      setLanguageState(gameState.language);
      localStorage.setItem('kalachakra_lang', gameState.language);
    }
  }, [gameState?.language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('kalachakra_lang', lang);
    if (gameState?.name) {
      updateGameState({ language: lang });
    }
  };

  const getTranslationData = (lang) => {
    switch(lang) {
      case 'hi': return hi;
      case 'te': return te;
      case 'en': 
      default: return en;
    }
  };

  const t = (key, fallback = null) => {
    if (!key || typeof key !== 'string') return fallback || key;
    if (!language) return fallback || key;
    
    // Check levelDictionary for literal string translations
    if (levelDictionary[language] && levelDictionary[language][key]) {
      return levelDictionary[language][key];
    }
    if (levelDictionary[language] && fallback && levelDictionary[language][fallback]) {
      return levelDictionary[language][fallback];
    }

    const keys = key.split('.');
    
    // 1. Try selected language
    let value = getTranslationData(language);
    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }
    if (value) return value;
    
    // 2. Fall back to English
    value = en;
    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }
    if (value) return value;
    
    // 3. Fallback
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);



