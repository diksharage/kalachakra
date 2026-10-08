const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Replace the Challenge Selection logic
const oldSelectionLogic = `           let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           available.sort(() => Math.random() - 0.5);
           
           let selected = available.slice(0, targetChallenges);`;

const newSelectionLogic = `           let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
           
           // Ensure the minigame is always prioritized as a required objective!
           const miniGameIds = allChallenges.filter(c => c.format === 'minigame').map(c => c.id);
           available = available.filter(id => !miniGameIds.includes(id));
           available.sort(() => Math.random() - 0.5);
           
           let selected = [...miniGameIds, ...available].slice(0, Math.max(miniGameIds.length, targetChallenges));`;

if (content.includes('available.sort(() => Math.random() - 0.5);')) {
  content = content.replace(oldSelectionLogic, newSelectionLogic);
  fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
  console.log("Updated LevelEngine.jsx with required mini-game selection.");
} else {
  console.log("Could not find selection logic block!");
}
