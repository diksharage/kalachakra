const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldWrapper = `className={"glass-panel p-5 md:p-8 rounded-2xl max-w-lg w-full max-h-full overflow-y-auto border shadow-2xl text-center " + theme.border}`;
const newWrapper = `className={"glass-panel p-0 md:p-0 rounded-2xl w-full max-h-full overflow-y-auto border shadow-2xl text-center flex flex-col " + theme.border + (type === 'challenge' && data.format === 'minigame' ? " max-w-4xl" : " max-w-lg p-5 md:p-8")}`;

if (content.includes(oldWrapper)) {
  content = content.replace(oldWrapper, newWrapper);
  
  // Also pass the onClose function down so MiniGameManager can close the popup
  content = content.replace(
    `onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)}`,
    `onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)} onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}`
  );
  
  fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
  console.log("Updated LevelEngine wrapper for MiniGames.");
} else {
  console.log("Could not find the wrapper in LevelEngine.");
}
