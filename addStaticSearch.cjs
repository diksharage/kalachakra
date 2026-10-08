const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

// Add static navigation pages
const staticNav = `
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
  
  // Build searchable text
`;

code = code.replace(/\/\/ Build searchable text/g, staticNav);

fs.writeFileSync('src/services/searchService.js', code);
console.log("Added static pages to searchService!");
