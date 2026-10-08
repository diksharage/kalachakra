const fs = require('fs');

let code = fs.readFileSync('src/data/achievements.js', 'utf8');
const closingBracketIndex = code.lastIndexOf('];');

const newAchievements = `
  , {
    id: "first_minigame",
    titleKey: "firstMinigame.title",
    descKey: "firstMinigame.description",
    icon: "🎲",
    category: "games",
    target: 1,
    rarity: "common",
    reward: 20,
    type: "minigames"
  },
  {
    id: "master_solver",
    titleKey: "masterSolver.title",
    descKey: "masterSolver.description",
    icon: "🧩",
    category: "games",
    target: 5,
    rarity: "uncommon",
    reward: 100,
    type: "minigames"
  },
  {
    id: "perfect_historian",
    titleKey: "perfectHistorian.title",
    descKey: "perfectHistorian.description",
    icon: "🌟",
    category: "knowledge",
    target: 3, 
    starsRequired: 3,
    rarity: "rare",
    reward: 150,
    type: "minigame_stars"
  }`;

code = code.substring(0, closingBracketIndex) + newAchievements + code.substring(closingBracketIndex);

fs.writeFileSync('src/data/achievements.js', code);
console.log("Injected minigame achievements into achievements.js");

// Now update AchievementContext.jsx to handle these new types
let contextCode = fs.readFileSync('src/context/AchievementContext.jsx', 'utf8');

const oldSwitch = `    switch (achievement.type) {
      case 'artifacts':
        return Math.min(gameState.unlockedArtifacts?.length || 0, achievement.target);`;

const newSwitch = `    switch (achievement.type) {
      case 'minigames':
        return Math.min(Object.keys(gameState.miniGameResults || {}).length, achievement.target);
      case 'minigame_stars':
        return Math.min(
           Object.values(gameState.miniGameResults || {}).filter(res => res.stars >= (achievement.starsRequired || 3)).length, 
           achievement.target
        );
      case 'artifacts':
        return Math.min(gameState.unlockedArtifacts?.length || 0, achievement.target);`;

if (contextCode.includes(oldSwitch)) {
  contextCode = contextCode.replace(oldSwitch, newSwitch);
  fs.writeFileSync('src/context/AchievementContext.jsx', contextCode);
  console.log("Updated AchievementContext switch for minigames.");
}
