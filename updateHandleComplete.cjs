const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldHandleComplete = `  const handleCompleteLevel = () => {
    if (!isReplay) {
      if (config.id === 1) triggerEventAchievement('start_journey');
      if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');
      updateResources(config.defaultResources); 
      completeLevel(config.id);
    }
    updateActiveLevelState(null, null);
  };`;

const newHandleComplete = `  const handleCompleteLevel = () => {
    if (!isReplay) {
      if (config.id === 1) triggerEventAchievement('start_journey');
      if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');
      // Global inventory is already updated during gameplay (discovery & challenges). No need to duplicate here.
      completeLevel(config.id);
    }
    // Safely unbind local active state
    updateActiveLevelState(null, null);
  };`;

code = code.replace(oldHandleComplete, newHandleComplete);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated handleCompleteLevel logic!");
