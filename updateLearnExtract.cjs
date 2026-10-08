const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Update InteractiveLearnNode text extraction
const oldExtract = `// Fallback string extraction
    const fullText = data.discoverMessage || data.description || "Historical context missing.";`;

// We don't have ageGroup injected directly into InteractiveLearnNode!
// Wait, we need to pass ageGroup as a prop, or just use useGame() inside it.
// Wait, LevelEngine has ageGroup: `const ageGroup = gameState.player?.ageGroup || '12-14';`
// We can just add ageGroup to the props of InteractiveLearnNode.

const newExtract = `// Extract dynamically based on age
    const fullText = data.getLearnMessage ? data.getLearnMessage(isYoung ? '6-8' : '12-14') : (data.discoverMessage || data.description || "Historical context missing.");`;

code = code.replace(oldExtract, newExtract);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated InteractiveLearnNode string extraction!");
