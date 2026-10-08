const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

const buttonOrig = /BEGIN EXPLORATION/;
const buttonNew = `{gameState.activeLevelId === level.id && gameState.activeLevelState ? "RESUME JOURNEY" : "BEGIN EXPLORATION"}`;
code = code.replace(buttonOrig, buttonNew);

fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Updated LevelIntroPage button text!");
