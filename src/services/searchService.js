import { heritageLibrary } from '../data/heritageLibrary';
import { historicalLocations } from '../data/historicalLocations';
import { getBuilderDataForLevel } from '../data/civilizationBuilder';
import { questionBank } from '../data/questionBank';
import { questData } from '../data/quests';
import { achievementsData } from '../data/achievements';

const LEVEL_COUNT = 14;

// Memoized index to prevent rebuilding on every keystroke
let cachedIndex = null;
let cacheKey = null;

export const buildSearchIndex = (t, gameState, currentLanguage) => {
  const currentKey = `${currentLanguage}_${gameState.currentLevel}_${gameState.unlockedArtifacts?.length}`;
  if (cachedIndex && cacheKey === currentKey) return cachedIndex;
  cacheKey = currentKey;

  const index = [];

  // 1. Levels
  for (let i = 1; i <= LEVEL_COUNT; i++) {
    index.push({
      id: `level_${i}`,
      type: 'level',
      title: t(`levels.${i}.title`, `Level ${i}`),
      subtitle: t(`levels.${i}.period`, 'Historical Period'),
      description: t(`levels.${i}.desc`, ''),
      levelId: i,
      category: 'Levels',
      route: `/journey/level/${i}`,
      icon: 'ðŸŒ',
      locked: (gameState.currentLevel || 1) < i,
      discovered: true,
      tags: ['level', 'journey', 'era']
    });
  }

  // 2. Heritage Library
  heritageLibrary.forEach(item => {
    const isDiscovered = (gameState.unlockedArtifacts || []).includes(item.id);
    index.push({
      id: `lib_${item.id}`,
      type: 'library',
      title: t(`library.entry.${item.id}.title`, item.id),
      subtitle: t(`library.cat.${item.category}`, item.category),
      description: t(`library.entry.${item.id}.known`, ''),
      levelId: item.level,
      category: 'Heritage Library',
      route: `/library?item=${item.id}`,
      icon: 'ðŸ“š',
      locked: false,
      discovered: isDiscovered,
      tags: ['library', item.category, 'heritage', 'culture', 'artifact']
    });
  });

  // 3. Historical Locations (Map)
  historicalLocations.forEach(loc => {
    const isDiscovered = (gameState.unlockedMapLocations || []).includes(loc.id);
    index.push({
      id: `map_${loc.id}`,
      type: 'map',
      title: t(`map.loc.${loc.id}`, loc.id.replace(/_/g, ' ')),
      subtitle: t(`map.region.${loc.region}`, loc.region),
      description: t(`map.loc.${loc.id}.desc`, loc.significance || ''),
      levelId: loc.level,
      category: 'Map',
      route: `/explore?loc=${loc.id}`,
      icon: 'ðŸ—ºï¸',
      locked: false,
      discovered: isDiscovered,
      tags: ['map', 'location', 'place', 'geography']
    });
  });

  
  // 4. Core Pages
  index.push({
    id: 'page_profile',
    type: 'page',
    title: t('nav.profile', 'Player Profile'),
    subtitle: 'Settings & Overview',
    description: 'View your journey progress, legacy, and player settings.',
    levelId: 1,
    category: 'System',
    route: '/profile',
    icon: '👤',
    locked: false,
    discovered: true,
    tags: ['profile', 'settings', 'account', 'legacy', 'player', 'audio']
  });

  index.push({
    id: 'page_achievements',
    type: 'page',
    title: t('nav.achievements', 'Achievements'),
    subtitle: 'Trophy Room',
    description: 'View the trophies and milestones you have unlocked.',
    levelId: 1,
    category: 'System',
    route: '/achievements',
    icon: '🏆',
    locked: false,
    discovered: true,
    tags: ['achievements', 'trophies', 'rewards', 'milestones']
  });

  // 5. Challenges
  questionBank.forEach(q => {
    const isCompleted = (gameState.completedChallenges || []).includes(q.id);
    index.push({
      id: `chal_${q.id}`,
      type: 'challenge',
      title: q.q,
      subtitle: t(`civ.${q.civ}`, q.civ),
      description: q.explanation,
      levelId: 1,
      category: 'Challenge',
      route: '/challenges',
      icon: '🧠',
      locked: false,
      discovered: isCompleted,
      tags: ['challenge', 'quiz', 'trivia', q.type.toLowerCase()]
    });
  });

  // 6. Quests
  questData.forEach(q => {
    const isVisible = q.levelId <= (gameState.currentLevel || 1);
    if (isVisible) {
      index.push({
        id: `quest_${q.id}`,
        type: 'quest',
        title: t(q.titleKey, q.title || q.id),
        subtitle: 'Quest',
        description: t(q.descKey, q.description || ''),
        levelId: q.levelId,
        category: 'Quests',
        route: '/quests',
        icon: '🎯',
        locked: false,
        discovered: !!gameState.quests?.[q.id],
        tags: ['quest', 'mission', 'objective']
      });
    }
  });

  
  // 7. Achievements
  achievementsData.forEach(ach => {
    const isCompleted = (gameState.achievements || []).includes(ach.id);
    index.push({
      id: `ach_${ach.id}`,
      type: 'achievement',
      title: t(ach.titleKey, ach.id.replace('_', ' ')),
      subtitle: t(`category.${ach.category}`, ach.category),
      description: t(ach.descKey, ''),
      levelId: 1,
      category: 'Achievement',
      route: '/achievements',
      icon: '🏆',
      locked: false,
      discovered: isCompleted,
      tags: ['achievement', 'trophy', 'reward', 'milestone', ach.category, ach.rarity]
    });
  });

  // Build searchable text


  index.forEach(item => {
    item.searchableText = [
      item.title,
      item.subtitle,
      item.description,
      item.category,
      ...(item.tags || [])
    ].filter(Boolean).join(' ').toLowerCase();
  });

  cachedIndex = index;
  return index;
};

export const clearSearchCache = () => {
  cachedIndex = null;
};

export const performSearch = (query, index) => {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase().trim();
  const qTokens = q.split(/\s+/);

  const scoredResults = index.map(item => {
    let score = 0;
    const titleLower = (item.title || '').toLowerCase();
    
    // 1. Exact title match
    if (titleLower === q) score += 100;
    // 2. Starts-with title match
    else if (titleLower.startsWith(q)) score += 50;
    // 3. Title partial match
    else if (titleLower.includes(q)) score += 25;
    
    // 4. Token matching against searchableText
    const matchedTokens = qTokens.filter(token => item.searchableText.includes(token));
    if (matchedTokens.length > 0) {
      score += matchedTokens.length * 5;
    }

    return { ...item, score };
  });

  // Filter out zero scores, sort by score descending, return top 12
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
};


