const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

code = code.replace(
  `{gameConfig.xpReward && (
             <div className="bg-surface/50 border border-content/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="text-content/50 uppercase text-xs font-bold tracking-wider">Reward</span>
              <span className="font-bold text-blue-400">+{gameConfig.xpReward} XP</span>
            </div>
          )}`,
  `{/* XP is integrated into LevelEngine naturally */}`
);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Removed hardcoded XP display from MiniGameManager intro screen to prevent mismatch with LevelEngine rewards.");
