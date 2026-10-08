const fs = require('fs');

let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

const oldRewardLogic = `        activeVariation.rewards.forEach(r => {
          if (r.type === 'resource') updateResources({ [r.id]: r.amount });
          if (r.type === 'artifact' || r.type === 'knowledge') unlockArtifact(r.id);
          if (r.type === 'achievement') unlockAchievement(r.id);
          if (r.type === 'legacy') updateResources({ legacy: r.amount });
        });`;

const newRewardLogic = `        activeVariation.rewards.forEach(r => {
          // Add to inventory counts so it appears in the Inventory Page
          if (['resource', 'artifact', 'knowledge'].includes(r.type)) {
            updateResources({ [r.id]: r.amount || 1 });
          }
          // Unlock in Library / Heritage pages
          if (['artifact', 'knowledge'].includes(r.type)) {
            unlockArtifact(r.id);
          }
          // Unlock Profile Badges
          if (r.type === 'achievement') {
            unlockAchievement(r.id);
          }
          // Core currencies
          if (r.type === 'legacy') {
            updateResources({ legacy: r.amount });
          }
        });`;

if (code.includes('if (r.type === \'resource\') updateResources({ [r.id]: r.amount });')) {
  code = code.replace(oldRewardLogic, newRewardLogic);
  fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
  console.log("Updated MiniGameManager.jsx to ensure artifacts/knowledge also credit the inventory quantity.");
} else {
  console.log("Could not find reward logic in MiniGameManager.jsx!");
}
