const fs = require('fs');
let code = fs.readFileSync('src/pages/QuestsPage.jsx', 'utf8');

// Replace navigation logic
code = code.replace(
  "navigate(q.objectives[0]?.type === 'investigate' ? '/investigations' : '/explore')",
  "navigate(gameState.activeLevelId === q.levelId ? `/journey/level/${q.levelId}/play` : `/journey/level/${q.levelId}`)"
);

fs.writeFileSync('src/pages/QuestsPage.jsx', code);
console.log("Updated QuestsPage to navigate to the respective level.");
