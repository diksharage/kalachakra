const fs = require('fs');

let code = fs.readFileSync('src/context/AchievementContext.jsx', 'utf8');

code = code.replace(
  "      case 'event':\n        // For discrete events, progress is either 0 or 1 based on if it's unlocked\n        return gameState.achievements.includes(achievement.id) ? 1 : 0;",
  "      case 'event':\n        return gameState.achievements.includes(achievement.id) ? 1 : 0;\n      case 'level_complete':\n        return gameState.completedLevels?.includes(achievement.levelId) ? 1 : 0;"
);

fs.writeFileSync('src/context/AchievementContext.jsx', code);
console.log("Updated AchievementContext to evaluate level_complete achievements.");
