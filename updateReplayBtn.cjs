const fs = require('fs');

let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

const isResumingOrig = /const isResuming = gameState\.activeLevelId === level\.id && gameState\.activeLevelState;/;
const isResumingNew = `const isResuming = gameState.activeLevelId === level.id && gameState.activeLevelState;
  const isCompleted = gameState.completedLevels?.includes(level.id);`;
code = code.replace(isResumingOrig, isResumingNew);

const btnTextOrig = /\{isResuming \? "CONTINUE LEVEL" : "START LEVEL"\}/;
const btnTextNew = `{isResuming ? "CONTINUE LEVEL" : isCompleted ? "REPLAY LEVEL" : "START LEVEL"}`;
code = code.replace(btnTextOrig, btnTextNew);

fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Updated LevelIntroPage button for Replay!");
