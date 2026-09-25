import { heritageLibrary } from '../data/heritageLibrary';
import { historicalLocations } from '../data/historicalLocations';
import { questData } from '../data/quests';

export const getDashboardStats = (gameState) => {
  const currentLevel = gameState.currentLevel || 1;
  const completedLevelsCount = Math.max(0, currentLevel - 1);
  const journeyPercentage = Math.round((completedLevelsCount / 14) * 100);

  // Library stats
  const unlockedArtifacts = gameState.unlockedArtifacts || [];
  const libraryTotal = heritageLibrary.length;
  const libraryDiscovered = unlockedArtifacts.length;
  const libraryPercentage = libraryTotal > 0 ? Math.round((libraryDiscovered / libraryTotal) * 100) : 0;
  
  // Categorize library
  const libraryByCategory = heritageLibrary.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { total: 0, discovered: 0 };
    acc[item.category].total++;
    if (unlockedArtifacts.includes(item.id)) acc[item.category].discovered++;
    return acc;
  }, {});

  // Map stats
  const unlockedMapLocations = gameState.unlockedMapLocations || [];
  const mapTotal = historicalLocations.length;
  const mapDiscovered = unlockedMapLocations.length;

  // Builder stats
  const builtEnvironment = gameState.builtEnvironment || {};
  let totalBuildings = 0;
  Object.values(builtEnvironment).forEach(levelBuildings => {
    totalBuildings += levelBuildings.length;
  });

  // Event stats
  const completedEvents = Object.keys(gameState.completedEvents || {}).length;

  // Investigation stats
  const completedInvestigations = gameState.completedInvestigations || [];
  
  // Legacy
  const legacy = gameState.legacy || 0;
  const milestones = [25, 50, 100, 150, 250, 500, 1000];
  const nextMilestone = milestones.find(m => m > legacy) || milestones[milestones.length - 1];

  return {
    journey: {
      currentLevel,
      completedLevelsCount,
      percentage: journeyPercentage,
      isComplete: currentLevel >= 14 && (gameState.quests?.[`q_l14_main`]?.status === 'completed')
    },
    legacy: {
      current: legacy,
      nextMilestone,
      progress: legacy >= nextMilestone ? 100 : Math.round((legacy / nextMilestone) * 100)
    },
    discoveries: {
      total: libraryTotal,
      discovered: libraryDiscovered,
      percentage: libraryPercentage,
      byCategory: libraryByCategory
    },
    achievements: {
      unlocked: (gameState.achievements || []).length
    },
    map: {
      total: mapTotal,
      discovered: mapDiscovered
    },
    investigations: {
      completed: completedInvestigations.length
    },
    builder: {
      totalBuildings
    },
    events: {
      completed: completedEvents
    }
  };
};

export const getRecommendedActions = (gameState, stats) => {
  const actions = [];
  const cl = gameState.currentLevel || 1;

  // 1. Check Quests
  const activeQuests = Object.entries(gameState.quests || {})
    .filter(([_, q]) => q.status === 'active' && questData.find(xq => xq.id === _ && xq.levelId === cl));
  
  if (activeQuests.length > 0) {
    actions.push({
      id: 'rec_quest',
      titleKey: 'dash.rec.quest_title',
      descKey: 'dash.rec.quest_desc',
      route: '/quests',
      priority: 1,
      icon: 'ðŸŽ¯'
    });
  } else if (cl < 14) {
    actions.push({
      id: 'rec_journey',
      titleKey: 'dash.rec.journey_title',
      descKey: 'dash.rec.journey_desc',
      route: '/journey',
      priority: 1,
      icon: 'ðŸ§­'
    });
  }

  // 2. Map Exploration
  const levelLocations = historicalLocations.filter(loc => loc.level === cl);
  const discoveredLevelLocations = levelLocations.filter(loc => (gameState.unlockedMapLocations || []).includes(loc.id));
  if (levelLocations.length > discoveredLevelLocations.length) {
    actions.push({
      id: 'rec_map',
      titleKey: 'dash.rec.map_title',
      descKey: 'dash.rec.map_desc',
      route: '/explore',
      priority: 2,
      icon: 'ðŸ—ºï¸'
    });
  }

  // 3. Builder
  const currentBuildings = (gameState.builtEnvironment?.[cl] || []).length;
  if (currentBuildings === 0 && cl !== 1) { // Assuming level 1 might not have builder focus right away
    actions.push({
      id: 'rec_build',
      titleKey: 'dash.rec.build_title',
      descKey: 'dash.rec.build_desc',
      route: '/builder',
      priority: 3,
      icon: 'ðŸ› ï¸'
    });
  }

  // 4. Library Fallback
  if (stats.discoveries.discovered > 0) {
    actions.push({
      id: 'rec_library',
      titleKey: 'dash.rec.library_title',
      descKey: 'dash.rec.library_desc',
      route: '/library',
      priority: 4,
      icon: 'ðŸ“–'
    });
  }

  // Sort and return top 3
  return actions.sort((a, b) => a.priority - b.priority).slice(0, 3);
};

