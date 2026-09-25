import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGame } from './GameContext';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('kalachakra_theme');
    if (saved) return saved;
    // Default to system preference for first-time users
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Kalachakra default identity is dark/heritage
  });

  const { gameState, updateGameState } = useGame();

  // Sync from gameState if available
  useEffect(() => {
    if (gameState?.theme && gameState.theme !== theme) {
      setThemeState(gameState.theme);
      localStorage.setItem('kalachakra_theme', gameState.theme);
    }
  }, [gameState?.theme]);

  // Apply theme to document element so CSS variables switch
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('kalachakra_theme', newTheme);
    if (gameState?.name) {
      updateGameState({ theme: newTheme });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);



