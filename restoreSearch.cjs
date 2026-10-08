const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

// Re-import questionBank and questData
const importBlock = `import { heritageLibrary } from '../data/heritageLibrary';
import { historicalLocations } from '../data/historicalLocations';
import { getBuilderDataForLevel } from '../data/civilizationBuilder';
import { questionBank } from '../data/questionBank';
import { questData } from '../data/quests';`;

code = code.replace(/import \{ heritageLibrary \}.*?(?=const LEVEL_COUNT)/s, importBlock + '\n\n');

const staticPagesRegex = /\/\/ 4\. Core Pages[\s\S]*?(?=\/\/ Build searchable text)/;

const newCorePages = `// 4. Core Pages
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
      id: \`chal_\${q.id}\`,
      type: 'challenge',
      title: q.q,
      subtitle: t(\`civ.\${q.civ}\`, q.civ),
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
        id: \`quest_\${q.id}\`,
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

  `;

code = code.replace(staticPagesRegex, newCorePages);

fs.writeFileSync('src/services/searchService.js', code);
console.log("Restored Quests and Added Challenges to Search!");
