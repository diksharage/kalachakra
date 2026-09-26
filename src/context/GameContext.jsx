import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudio } from './AudioContext';
import { saveService } from '../services/saveService';
import * as QuestDB from '../data/quests';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const defaultState = {
    // Profile info (populated on login)
    id: null,
    name: 'Explorer',
    email: '',
    age: null,
    ageGroup: null,
    createdAt: null,
    lastLogin: null,
    isAuthenticated: false,
    onboardingCompleted: false,
    
    // Game progress
    playerType: null,
    currentCivilization: null,
    energy: 100,
    knowledge: 0,
    culture: 0,
    coins: 0,
    legacy: 0,
    
    // Journey Progress
    currentLevel: 1,
    completedLevels: [],
    unlockedLevels: [1],
    activeLevelId: null, // Tracks which level the state is for
    activeLevelState: null, // Persists in-progress level data
    
    
    level: 1,
    unlockedArtifacts: [],
    completedChallenges: [],
    buildings: [],
    achievements: [],
    inventory: {},
    completedInvestigations: [],
  };

  const [recentDiscoveries, setRecentDiscoveries] = useState([]);
  const audio = useAudio();

  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const [gameState, setGameState] = useState(() => {
    // Check if there's an active logged-in user session
    const activeEmail = localStorage.getItem('kalachakra_active_user');
    if (activeEmail) {
      return saveService.load(activeEmail, defaultState);
    }
    return defaultState;
  });

    // Debounced auto-save mechanism
  useEffect(() => {
    if (!gameState.isAuthenticated || !gameState.email) return;

    setSaveStatus('saving');
    const handler = setTimeout(() => {
      const success = saveService.save(gameState.email, gameState);
      if (success) {
        setSaveStatus('saved');
        setLastSavedAt(new Date());
        
        // Revert status to idle after a few seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(handler);
  }, [gameState]);

  // Tab hidden auto-save
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && gameState.isAuthenticated && gameState.email) {
        saveService.save(gameState.email, gameState);
        setLastSavedAt(new Date());
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [gameState]);

  const loginUser = (userProfile) => {
    // Try to load existing state for this user
    const savedState = localStorage.getItem(`kalachakra_state_${userProfile.email}`);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState({
        ...defaultState,
        ...parsed,
        ...userProfile, // Update with fresh DB profile info (like lastLogin)
        isAuthenticated: true
      });
    } else {
      // New game state for this user
      setGameState({
        ...defaultState,
        ...userProfile,
        isAuthenticated: true
      });
    }
    localStorage.setItem('kalachakra_active_user', userProfile.email);
  };

  const logoutUser = () => {
    localStorage.removeItem('kalachakra_active_user');
    setGameState(defaultState);
  };

    const updateResources = (resources) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Standard tracking
      if (resources.knowledge) newState.knowledge += resources.knowledge;
      if (resources.culture) newState.culture += resources.culture;
      if (resources.legacy) newState.legacy += resources.legacy;
      if (resources.coins) newState.coins += resources.coins;
      if (resources.energy) newState.energy = Math.max(0, Math.min(100, newState.energy + resources.energy));

      // Dynamic Inventory tracking
      const inv = { ...(prev.inventory || {}) };
      Object.keys(resources).forEach(k => {
        if (['knowledge', 'culture', 'legacy', 'energy', 'coins'].includes(k)) return;
        inv[k] = Math.max(0, (inv[k] || 0) + resources[k]);
      });
      newState.inventory = inv;

      return newState;
    });
  };;

  const setPlayerType = (type) => setGameState(prev => ({ ...prev, playerType: type }));
  const setCivilization = (civId) => setGameState(prev => ({ ...prev, currentCivilization: civId }));
  
  const unlockArtifact = (id) => {
    if (!gameState.unlockedArtifacts.includes(id)) {
      setRecentDiscoveries(prev => [...prev, id]);
        notify('DISCOVERY', id, 'library.added', { icon: '🏺', route: '/library' });
      setGameState(prev => ({ ...prev, unlockedArtifacts: [...prev.unlockedArtifacts, id] }));
      checkQuestProgress('discover', id);
    }
  };
  const clearRecentDiscoveries = () => setRecentDiscoveries([]);
    const [recentCompletedQuests, setRecentCompletedQuests] = useState([]);
    const clearRecentCompletedQuests = () => setRecentCompletedQuests([]);
      // Central Notification System
    const notify = (type, titleKey, messageKey, metadata = {}) => {
    // Dispatch sound based on notification type
    if (audio?.playSound) {
      if (type === 'DISCOVERY') audio.playSound('discovery');
      else if (type === 'ACHIEVEMENT') audio.playSound('achievement');
      else if (type === 'QUEST_COMPLETE') audio.playSound('quest');
      else if (type === 'LEVEL_UNLOCK') audio.playSound('level_unlock');
      else if (type === 'BUILD') audio.playSound('building');
      else if (type === 'EVENT') audio.playSound('event');
      else if (type === 'INVESTIGATION') audio.playSound('investigation');
      else if (type === 'SYSTEM') audio.playSound('ui');
    }

    setGameState(prev => {
      const newNotif = {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        type,
        titleKey,
        messageKey,
        metadata,
        read: false,
        timestamp: new Date().toISOString()
      };
      const notifications = [newNotif, ...(prev.notifications || [])].slice(0, 100);
      return { ...prev, notifications };
    });
  };

  const markNotificationRead = (id) => {
    setGameState(prev => ({
      ...prev,
      notifications: (prev.notifications || []).map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

    const markTutorialComplete = (skipped = false) => {
    setGameState(prev => ({
      ...prev,
      tutorialCompleted: true,
      tutorialSkipped: skipped
    }));
    if (!skipped) {
      logActivity('SYSTEM', 'tutorial.completed_title', 'tutorial.completed_desc');
      notify('SYSTEM', 'tutorial.completed_title', 'tutorial.completed_desc', { icon: '🎉' });
    }
  };

  const resetTutorial = () => {
    setGameState(prev => ({
      ...prev,
      tutorialCompleted: false,
      tutorialSkipped: false
    }));
  };

  const markHintComplete = (hintId) => {
    setGameState(prev => ({
      ...prev,
      completedHints: {
        ...(prev.completedHints || {}),
        [hintId]: true
      }
    }));
  };

  const markAllNotificationsRead = () => {
    setGameState(prev => ({
      ...prev,
      notifications: (prev.notifications || []).map(n => ({ ...n, read: true }))
    }));
  };

  const clearNotifications = () => {
    setGameState(prev => ({ ...prev, notifications: [] }));
  };

      const logActivity = (type, titleKey, descKey, metadata = {}) => {
      setGameState(prev => {
        const newLog = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          type,
          titleKey,
          descKey,
          metadata,
          timestamp: new Date().toISOString()
        };
        // Keep last 50 activities
        const activityLog = [newLog, ...(prev.activityLog || [])].slice(0, 50);
        return { ...prev, activityLog };
      });
    };
    const resolveEvent = (eventId, optionId, reqs, consequences) => {
      logActivity('EVENT', 'Historical Decision', 'You resolved a world event.');
      notify('EVENT', 'event.resolved', 'event.alert_desc', { icon: '⚡' });
      setGameState(prev => {
        if (prev.completedEvents?.[eventId]) return prev; // Already done
        
        // Deduct requirements safely
        const currentInv = prev.inventory || {};
        const newInv = { ...currentInv };
        for (const [res, cost] of Object.entries(reqs || {})) {
          if ((currentInv[res] || 0) < cost) return prev; // Guard
          newInv[res] -= cost;
        }
        
        // Add consequences (rewards)
        if (consequences?.inventory) {
          for (const [res, gain] of Object.entries(consequences.inventory)) {
            newInv[res] = (newInv[res] || 0) + gain;
          }
        }

        return {
          ...prev,
          inventory: newInv,
          legacy: (prev.legacy || 0) + (consequences?.legacy || 0),
          completedEvents: {
            ...(prev.completedEvents || {}),
            [eventId]: optionId
          }
        };
      });
    };
    const placeBuilding = (levelId, gridIndex, buildingData) => {
      logActivity('BUILD', 'Building Constructed', 'Expanded your settlement.');
      notify('BUILD', 'Building Constructed', 'dash.rec.build_desc', { icon: '🏗️', route: '/builder' });
      setGameState(prev => {
        // Check inventory requirements
        const reqs = buildingData.requirements || {};
        const currentInv = prev.inventory || {};
        for (const [res, cost] of Object.entries(reqs)) {
          if ((currentInv[res] || 0) < cost) return prev; // Not enough resources
        }

        // Deduct resources
        const newInv = { ...currentInv };
        for (const [res, cost] of Object.entries(reqs)) {
          newInv[res] -= cost;
        }

        const currentEnv = prev.builtEnvironment || {};
        const levelEnv = currentEnv[levelId] || [];
        
        // Remove existing building at index if any
        const filteredEnv = levelEnv.filter(b => b.gridIndex !== gridIndex);
        
        const newState = {
          ...prev,
          inventory: newInv,
          builtEnvironment: {
            ...currentEnv,
            [levelId]: [...filteredEnv, { gridIndex, buildingId: buildingData.id }]
          },
          legacy: (prev.legacy || 0) + 5 // Small legacy reward for building
        };
        
        return newState;
      });
      checkQuestProgress('build', buildingData.id);
    };

    const removeBuilding = (levelId, gridIndex) => {
      setGameState(prev => {
        const currentEnv = prev.builtEnvironment || {};
        const levelEnv = currentEnv[levelId] || [];
        
        return {
          ...prev,
          builtEnvironment: {
            ...currentEnv,
            [levelId]: levelEnv.filter(b => b.gridIndex !== gridIndex)
          }
        };
      });
    };

    const startQuest = (id) => {
      setGameState(prev => {
        if (prev.quests?.[id]?.status === 'completed') return prev;
        return {
          ...prev,
          quests: {
            ...(prev.quests || {}),
            [id]: { status: 'in_progress', progress: {}, ...(prev.quests?.[id] || {}) }
          }
        };
      });
    };

    // Called by QuestGameplay after the player finishes MCQ session
    const completeQuestDirectly = (quest, { earnedLegacy, accuracy, mastery }) => {
      setGameState(prev => {
        const existingQ = prev.quests?.[quest.id] || {};
        const completedProgress = {};
        quest.objectives.forEach((obj, idx) => {
          completedProgress[idx] = obj.required;
        });
        const newInventory = { ...(prev.inventory || {}) };
        if (quest.rewards?.inventory) {
          Object.entries(quest.rewards.inventory).forEach(([k, v]) => {
            newInventory[k] = (newInventory[k] || 0) + v;
          });
        }
        return {
          ...prev,
          legacy: (prev.legacy || 0) + (earnedLegacy || 0),
          inventory: newInventory,
          quests: {
            ...(prev.quests || {}),
            [quest.id]: {
              ...existingQ,
              status: 'completed',
              progress: completedProgress,
              completedAt: Date.now(),
              accuracy: accuracy || 0,
              stars: mastery || 1,
            }
          }
        };
      });
      if (quest.rewards?.legacy) {
        setRecentCompletedQuests(r => [...r, quest]);
      }
    };

    const checkQuestProgress = (type, target) => {
      setGameState(prev => {
        let newState = { ...prev };
        let questsUpdated = false;
        const currentQuests = newState.quests || {};
        
        QuestDB.questData.forEach(q => {
          const stateQ = currentQuests[q.id];
          if (stateQ && stateQ.status === 'in_progress') {
            q.objectives.forEach((obj, idx) => {
              if (obj.type === type && obj.target === target) {
                const currProg = stateQ.progress[idx] || 0;
                if (currProg < obj.required) {
                  if (!questsUpdated) { newState.quests = { ...currentQuests }; questsUpdated = true; }
                  newState.quests[q.id] = {
                    ...newState.quests[q.id],
                    progress: { ...newState.quests[q.id].progress, [idx]: currProg + 1 }
                  };
                  
                  let isComplete = true;
                  q.objectives.forEach((o, i) => {
                    const p = (i === idx ? currProg + 1 : (newState.quests[q.id].progress[i] || 0));
                    if (p < o.required) isComplete = false;
                  });
                  
                  if (isComplete) {
                    newState.quests[q.id].status = 'completed';
                    setRecentCompletedQuests(r => [...r, q]);
                    if (q.rewards?.legacy) {
                      newState.legacy = (newState.legacy || 0) + q.rewards.legacy;
                    }
                    if (q.rewards?.inventory) {
                      newState.inventory = { ...newState.inventory };
                      Object.entries(q.rewards.inventory).forEach(([k, v]) => {
                        newState.inventory[k] = (newState.inventory[k] || 0) + v;
                      });
                    }
                  }
                }
              }
            });
          }
        });
        return questsUpdated ? newState : prev;
      });
    };
  const completeInvestigation = (id, rewards) => {
    if (!gameState.completedInvestigations.includes(id)) {
      setGameState(prev => {
        const newState = { ...prev, completedInvestigations: [...prev.completedInvestigations, id] };
        return newState;
      });
      if (rewards?.legacy) updateResources({ legacy: rewards.legacy });
      if (rewards?.inventory) updateResources(rewards.inventory);
      if (rewards?.libraryId) unlockArtifact(rewards.libraryId);
      checkQuestProgress('investigate', id);
    }
  };
  const addBuilding = (buildingId) => {
    setGameState(prev => ({ ...prev, buildings: [...prev.buildings, buildingId] }));
  };

  const unlockAchievement = (id) => {
    if (!gameState.achievements.includes(id)) {
      setGameState(prev => ({ ...prev, achievements: [...prev.achievements, id] }));
    }
  };


  const saveMiniGameResult = (id, score, stars, variationId = null) => {
    setGameState(prev => {
      const currentResults = prev.miniGameResults || {};
      const previous = currentResults[id] || { score: 0, stars: 0, playedVariations: [] };
      
      const newPlayed = previous.playedVariations ? [...previous.playedVariations] : [];
      if (variationId && !newPlayed.includes(variationId)) {
        newPlayed.push(variationId);
      }
      
      return {
        ...prev,
        miniGameResults: {
          ...currentResults,
          [id]: { 
            score: Math.max(previous.score, score), 
            stars: Math.max(previous.stars, stars),
            playedVariations: newPlayed,
            lastVariation: variationId
          }
        }
      };
    });
    
    // Trigger quest progress checks natively
    checkQuestProgress('minigame', id);
    if (stars >= 3) {
      checkQuestProgress('minigame_stars', 3);
    }
  };

  const completeChallenge = (id) => {
    if (!gameState.completedChallenges.includes(id)) {
      setGameState(prev => ({ ...prev, completedChallenges: [...prev.completedChallenges, id] }));
    }
  };

  const completeLevel = (levelId) => {
    setGameState(prev => {
      // Don't re-complete if already completed
      if (prev.completedLevels.includes(levelId)) return prev;

      const newCompleted = [...prev.completedLevels, levelId];
      const nextLevel = levelId + 1;
      
      const newUnlocked = prev.unlockedLevels.includes(nextLevel) 
        ? prev.unlockedLevels 
        : [...prev.unlockedLevels, nextLevel];

      const isFinalLevel = levelId === 14;

      return {
        ...prev,
        completedLevels: newCompleted,
        unlockedLevels: newUnlocked,
        currentLevel: prev.currentLevel === levelId ? nextLevel : prev.currentLevel,
        legacy: prev.legacy + 100, // Reward legacy points for completing a level
        gameCompleted: isFinalLevel ? true : prev.gameCompleted,
        achievements: isFinalLevel && !prev.achievements.includes('achievement_preserver') ? [...prev.achievements, 'achievement_preserver'] : prev.achievements
      };
    });
  };

  const updateActiveLevelState = (levelId, newState) => {
    setGameState(prev => ({ 
      ...prev, 
      activeLevelId: levelId,
      activeLevelState: newState 
    }));
  };

  const completeOnboarding = () => setGameState(prev => ({ ...prev, onboardingCompleted: true }));

  return (
    <GameContext.Provider value={{
      gameState,
      loginUser,
      logoutUser,
      updateResources,
      setPlayerType,
      setCivilization,
      unlockArtifact,
      recentDiscoveries,
      clearRecentDiscoveries,
      addBuilding,
      unlockAchievement,
      startQuest,
      completeQuestDirectly,
      placeBuilding,
      removeBuilding,
      resolveEvent,
        logActivity,
        notify,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        markTutorialComplete,
        resetTutorial,
        markHintComplete,
      recentCompletedQuests,
      clearRecentCompletedQuests,
      completeInvestigation,
      saveMiniGameResult,
        completeChallenge,
      completeOnboarding,
      completeLevel,
      updateActiveLevelState,
      saveStatus,
      lastSavedAt
    }}>
      {children}
    </GameContext.Provider>
  );
};




















