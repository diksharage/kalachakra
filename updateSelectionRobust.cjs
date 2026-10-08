const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldLogic = `           let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           available.sort(() => Math.random() - 0.5);
           
           let selected = available.slice(0, targetChallenges);`;

const newLogic = `           let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           
           // Ensure the minigame is always prioritized as a required objective!
           const miniGameIds = allChallenges.filter(c => c.format === 'minigame').map(c => c.id);
           available = available.filter(id => !miniGameIds.includes(id));
           available.sort(() => Math.random() - 0.5);
           
           let selected = [...miniGameIds, ...available].slice(0, Math.max(miniGameIds.length, targetChallenges));`;

if (content.includes('available.sort(() => Math.random() - 0.5);')) {
  content = content.replace(oldLogic, newLogic);
  fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
  console.log("Updated selection logic successfully.");
} else {
  console.log("Still could not find it. Writing fallback regex.");
  // Let's use regex
  content = content.replace(/let available = allChallenges\.filter[^;]+;\s*available\.sort[^;]+;\s*let selected = available\.slice[^;]+;/, newLogic);
  fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
  console.log("Updated via regex.");
}
