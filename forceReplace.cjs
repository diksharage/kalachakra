const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const targetStr = `let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           available.sort(() => Math.random() - 0.5);
           
           let selected = available.slice(0, targetChallenges);`;

if (content.indexOf(targetStr) !== -1) {
  content = content.replace(targetStr, `let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           
           const miniGameIds = allChallenges.filter(c => c.format === 'minigame').map(c => c.id);
           available = available.filter(id => !miniGameIds.includes(id));
           available.sort(() => Math.random() - 0.5);
           
           let selected = [...miniGameIds, ...available].slice(0, Math.max(miniGameIds.length, targetChallenges));`);
  fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
  console.log("REPLACED EXACTLY!");
} else {
  console.log("EXACT MATCH NOT FOUND. Here is the block:");
  const idx = content.indexOf('let available =');
  console.log(content.substring(idx, idx + 200));
}
