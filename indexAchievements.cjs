const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

const importBlock = `import { questionBank } from '../data/questionBank';
import { questData } from '../data/quests';
import { achievementsData } from '../data/achievements';`;

code = code.replace(/import \{ questionBank \} from '\.\.\/data\/questionBank';\nimport \{ questData \} from '\.\.\/data\/quests';/, importBlock);

const newIndexBlock = `
  // 7. Achievements
  achievementsData.forEach(ach => {
    const isCompleted = (gameState.achievements || []).includes(ach.id);
    index.push({
      id: \`ach_\${ach.id}\`,
      type: 'achievement',
      title: t(ach.titleKey, ach.id.replace('_', ' ')),
      subtitle: t(\`category.\${ach.category}\`, ach.category),
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
`;

code = code.replace(/\/\/ Build searchable text/, newIndexBlock);

fs.writeFileSync('src/services/searchService.js', code);
console.log("Added achievements to Search Index!");
