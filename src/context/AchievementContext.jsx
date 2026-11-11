import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import { achievementsData } from '../data/achievements';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

const getStatsForAchievements = (gameState) => {
  const unlockedArtifacts = gameState?.unlockedArtifacts || [];
  const completedLevels = gameState?.completedLevels || [];
  const completedChallenges = gameState?.completedChallenges || [];
  const miniGameResults = gameState?.miniGameResults || {};
  const quests = gameState?.quests || {};
  const builtEnvironment = gameState?.builtEnvironment || {};
  const directBuildings = gameState?.buildings || [];
  const activeBuiltItems = gameState?.activeLevelState?.builtItems || [];

  let gridBuildingsCount = 0;
  Object.values(builtEnvironment).forEach(arr => {
    if (Array.isArray(arr)) gridBuildingsCount += arr.length;
  });

  const totalBuildings = gridBuildingsCount + directBuildings.length + activeBuiltItems.length;

  const completedQuestsList = Object.values(quests).filter(q => q?.status === 'completed');
  const completedQuestsCount = completedQuestsList.length;

  const threeStarMinigames = Object.values(miniGameResults).filter(r => (r?.stars || 0) >= 3).length;
  const threeStarQuests = completedQuestsList.filter(q => (q?.stars || 0) >= 3).length;

  return {
    artifactsCount: unlockedArtifacts.length,
    levelsCount: completedLevels.length,
    completedLevels,
    challengesCount: completedChallenges.length,
    minigamesCount: Object.keys(miniGameResults).length,
    miniGameResults,
    threeStarCount: threeStarMinigames + threeStarQuests,
    totalBuildings,
    completedQuestsCount
  };
};

export const AchievementProvider = ({ children }) => {
  const { gameState, unlockAchievement, updateResources, logActivity, notify } = useGame();
  const [recentUnlock, setRecentUnlock] = useState(null);

  const computeAchievementProgress = useCallback((ach) => {
    const stats = getStatsForAchievements(gameState);
    if (ach.type === 'artifacts') return stats.artifactsCount;
    if (ach.type === 'levels') return stats.levelsCount;
    if (ach.type === 'challenges') return stats.challengesCount;
    if (ach.type === 'minigames') return stats.minigamesCount;
    if (ach.type === 'minigame_stars') {
      if ((ach.starsRequired || 3) === 3) return stats.threeStarCount;
      return Object.values(stats.miniGameResults).filter(r => (r?.stars || 0) >= (ach.starsRequired || 3)).length;
    }
    if (ach.type === 'level_complete') {
      return stats.completedLevels.includes(ach.levelId) ? 1 : 0;
    }
    if (ach.type === 'buildings') {
      return stats.totalBuildings;
    }
    if (ach.type === 'quests') {
      return stats.completedQuestsCount;
    }
    return (gameState?.achievements || []).includes(ach.id) ? ach.target : 0;
  }, [gameState]);

  useEffect(() => {
    if (!gameState) return;
    const unlockedIds = gameState.achievements || [];

    const checkAndUnlock = (achievement) => {
      if (!unlockedIds.includes(achievement.id)) {
        unlockAchievement(achievement.id);
        if (achievement.reward) {
          updateResources({ legacy: achievement.reward });
        }
        setRecentUnlock(achievement);
        logActivity('ACHIEVEMENT', achievement.title || achievement.titleKey, achievement.description || achievement.descKey, { icon: achievement.icon });
        notify('ACHIEVEMENT', achievement.title || achievement.titleKey, achievement.description || achievement.descKey, { icon: achievement.icon, reward: achievement.reward, route: '/achievements' });
      }
    };

    achievementsData.forEach(ach => {
      if (unlockedIds.includes(ach.id)) return;
      if (ach.type === 'event') return;
      const currentProgress = computeAchievementProgress(ach);
      if (currentProgress >= ach.target) {
        checkAndUnlock(ach);
      }
    });
  }, [
    gameState?.unlockedArtifacts?.length,
    gameState?.completedLevels?.length,
    gameState?.completedChallenges?.length,
    gameState?.miniGameResults,
    gameState?.builtEnvironment,
    gameState?.buildings?.length,
    gameState?.activeLevelState?.builtItems?.length,
    gameState?.quests,
    computeAchievementProgress,
    unlockAchievement,
    updateResources,
    logActivity,
    notify
  ]);

  const triggerEventAchievement = (id) => {
    const ach = achievementsData.find(a => a.id === id);
    if (ach && !(gameState.achievements || []).includes(id)) {
      unlockAchievement(id);
      if (ach.reward) {
        updateResources({ legacy: ach.reward });
      }
      setRecentUnlock(ach);
      logActivity('ACHIEVEMENT', ach.title || ach.titleKey, ach.description || ach.descKey, { icon: ach.icon });
      notify('ACHIEVEMENT', ach.title || ach.titleKey, ach.description || ach.descKey, { icon: ach.icon, reward: ach.reward, route: '/achievements' });
    }
  };

  const clearRecentUnlock = () => setRecentUnlock(null);

  const getProgress = (ach) => {
    if ((gameState?.achievements || []).includes(ach.id)) return ach.target;
    const val = computeAchievementProgress(ach);
    return Math.min(val, ach.target);
  };

  return (
    <AchievementContext.Provider value={{
      achievements: achievementsData,
      unlockedIds: gameState?.achievements || [],
      recentUnlock,
      clearRecentUnlock,
      triggerEventAchievement,
      getProgress
    }}>
      {children}
    </AchievementContext.Provider>
  );
};
