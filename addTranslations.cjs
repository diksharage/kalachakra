const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

code = code.replace(
  `Review the map visually to pick the most logical next step.`,
  `{t('minigame.hint_route') || "Review the map visually to pick the most logical next step."}`
);

code = code.replace(
  `Think carefully about what helps your community survive and grow!`,
  `{t('minigame.hint_decision') || "Think carefully about what helps your community survive and grow!"}`
);

code = code.replace(
  `Study the pieces carefully! You will have to remember them.`,
  `{t('minigame.hint_memorize') || "Study the pieces carefully! You will have to remember them."}`
);

code = code.replace(
  `Any incorrect path resets the entire expedition.`,
  `{t('minigame.hard_route') || "Any incorrect path resets the entire expedition."}`
);

code = code.replace(
  `Efficiency constraint active: Time reduced.`,
  `{t('minigame.hard_memory') || "Efficiency constraint active: Time reduced."}`
);

code = code.replace(
  `Strategic Mode`,
  `{t('minigame.strategic_mode') || "Strategic Mode"}`
);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Added translation keys for hardcoded hints.");
