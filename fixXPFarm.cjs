const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

content = content.replace(
  `if (!isReplay) updateResources({ xp: 50 + score }); else if (score > 0) updateResources({ xp: score });`,
  `if (!isReplay) updateResources({ xp: 50 + score });`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
console.log("Fixed XP farming exploit.");
