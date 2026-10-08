const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(
  "      if (!isReplay) {\n        if (config.id === 1) triggerEventAchievement('start_journey');\n        if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');\n        // Global inventory is already updated",
  "      if (!isReplay) {\n        // Global inventory is already updated"
);

code = code.replace(
  "                       if (!isReplay) {\n                          triggerEventAchievement('preserver_of_the_legacy');\n                          completeLevel(14);\n                       }",
  "                       if (!isReplay) {\n                          completeLevel(14);\n                       }"
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Cleaned up redundant achievement triggers in LevelEngine.");
