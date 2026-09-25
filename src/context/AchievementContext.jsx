import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import { achievementsData } from '../data/achievements';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

export const AchievementProvider = ({ children }) => {
  const { gameState, updateResources, unlockAchievement: saveUnlockToGameContext, notify } = useGame();
  const [recentUnlocks, setRecentUnlocks] = useState([]);

  // Derive progress based on existing game state (idempotent, doesn't require separate storage)
  const getAchievementProgress = useCallback((achievement) => {
    if (gameState.achievements.includes(achievement.id)) return achievement.target;

    switch (achievement.type) {
      case 'minigames':
        return Math.min(Object.keys(gameState.miniGameResults || {}).length, achievement.target);
      case 'minigame_stars':
        return Math.min(
           Object.values(gameState.miniGameResults || {}).filter(res => res.stars >= (achievement.starsRequired || 3)).length, 
           achievement.target
        );
      case 'artifacts':
        return Math.min(gameState.unlockedArtifacts?.length || 0, achievement.target);
      case 'levels':
        return Math.min(gameState.completedLevels?.length || 0, achievement.target);
      case 'challenges':
        return Math.min(gameState.completedChallenges?.length || 0, achievement.target);
      case 'event':
        return gameState.achievements.includes(achievement.id) ? 1 : 0;
      case 'level_complete':
        return gameState.completedLevels?.includes(achievement.levelId) ? 1 : 0;
      default:
        return 0;
    }
  }, [gameState]);

  // Main evaluation engine
  useEffect(() => {
    if (!gameState.isAuthenticated) return;

    let newlyUnlocked = [];

    achievementsData.forEach(ach => {
      // Skip if already unlocked
      if (gameState.achievements.includes(ach.id)) return;

      const progress = getAchievementProgress(ach);
      if (progress >= ach.target) {
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(ach => {
        // Unlock in GameContext
        saveUnlockToGameContext(ach.id);
        
        // Grant Legacy Reward
        updateResources({ legacy: ach.reward });
      });

      // Show toast notifications
      setRecentUnlocks(prev => [...prev, ...newlyUnlocked]);
      newlyUnlocked.forEach(ach => notify('ACHIEVEMENT', ach.titleKey, ach.descKey, { icon: ach.icon || '🏆', reward: ach.reward, route: '/achievements' }));
    }
  }, [gameState, getAchievementProgress, saveUnlockToGameContext, updateResources]);

  const clearRecentUnlocks = () => setRecentUnlocks([]);

  const isUnlocked = (id) => gameState.achievements?.includes(id);

  // Directly unlock event-based achievements (e.g. from LevelEngine)
  const triggerEventAchievement = (id) => {
    if (!gameState.achievements?.includes(id)) {
      const ach = achievementsData.find(a => a.id === id);
      if (ach) {
        saveUnlockToGameContext(id);
        updateResources({ legacy: ach.reward });
        setRecentUnlocks(prev => [...prev, ach]);
        notify('ACHIEVEMENT', ach.titleKey, ach.descKey, { icon: ach.icon || '🏆', reward: ach.reward });
      }
    }
  };

  const contextValue = {
    achievementsData,
    unlockedIds: gameState.achievements || [],
    recentUnlocks,
    clearRecentUnlocks,
    isUnlocked,
    getAchievementProgress,
    triggerEventAchievement
  };

  return (
    <AchievementContext.Provider value={contextValue}>
      {children}
    </AchievementContext.Provider>
  );
};

