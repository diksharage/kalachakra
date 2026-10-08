const fs = require('fs');

let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// 1. Add context hooks
code = code.replace(
  `const { gameState, saveMiniGameResult } = useGame();`,
  `const { gameState, saveMiniGameResult, updateResources, unlockArtifact, unlockAchievement } = useGame();`
);

// 2. Add reward granting logic
const oldHandleSubGame = `  const handleSubGameComplete = (success, score, stars) => {
    setResult({ success, score, stars });
    setGameStateStage('result');
    if (success) {
      saveMiniGameResult(gameConfig.id, score, stars, activeVariation?.variationId);
    }
  };`;

const newHandleSubGame = `  const handleSubGameComplete = (success, score, stars) => {
    setResult({ success, score, stars });
    setGameStateStage('result');
    if (success) {
      saveMiniGameResult(gameConfig.id, score, stars, activeVariation?.variationId);
      
      if (!isReplay && activeVariation?.rewards) {
        activeVariation.rewards.forEach(r => {
          if (r.type === 'resource') updateResources({ [r.id]: r.amount });
          if (r.type === 'artifact' || r.type === 'knowledge') unlockArtifact(r.id);
          if (r.type === 'achievement') unlockAchievement(r.id);
          if (r.type === 'legacy') updateResources({ legacy: r.amount });
        });
      }
    }
  };`;

code = code.replace(oldHandleSubGame, newHandleSubGame);

// 3. Update Result Screen UI
const oldUIBlock = `              {!isReplay && challengeData?.reward && (
                <>
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-content/60 font-bold uppercase tracking-wider">{t('minigame.xp_earned') || 'XP Earned'}</span>
                    <span className="font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded-md">+50 XP</span>
                  </div>
                  {Object.entries(challengeData.reward).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-content/60 font-bold uppercase tracking-wider">{t(\`resources.\${k}\`) || k}</span>
                      <span className="font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-md">+{v}</span>
                    </div>
                  ))}
                </>
              )}`;

const newUIBlock = `              {!isReplay && activeConfig.rewards && activeConfig.rewards.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 pt-2">
                   <h5 className="text-xs uppercase font-bold text-content/50 mb-1">{t('minigame.rewards') || 'Rewards Earned'}</h5>
                   {activeConfig.rewards.map((r, i) => (
                     <div key={i} className="flex flex-col p-3 bg-surface/60 rounded-xl border border-content/10">
                        <div className="flex justify-between items-center mb-1">
                           <span className="font-bold text-gold text-sm">{r.amount > 1 ? \`+\${r.amount} \` : ''}{adaptTextForAge(r.label, ageGroup)}</span>
                           <span className="text-[10px] uppercase bg-green-900/30 text-green-400 px-2 py-0.5 rounded font-bold border border-green-500/20 shadow-sm">{r.destination}</span>
                        </div>
                        <span className="text-xs text-content/60 font-medium">{r.usage}</span>
                     </div>
                   ))}
                </div>
              )}`;

code = code.replace(oldUIBlock, newUIBlock);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated MiniGameManager.jsx to grant and display specific rewards.");
