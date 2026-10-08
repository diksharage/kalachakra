const fs = require('fs');
let code = fs.readFileSync('src/pages/EventPage.jsx', 'utf8');

code = code.replace(
  "navigate('/dashboard')",
  "navigate(gameState.activeLevelId === eventData.levelId ? `/journey/level/${eventData.levelId}/play` : `/journey/level/${eventData.levelId}`)"
);

fs.writeFileSync('src/pages/EventPage.jsx', code);
console.log("Updated EventPage to navigate to the respective level.");
