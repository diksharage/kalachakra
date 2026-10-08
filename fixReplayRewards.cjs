const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// In markDiscovered:
// Find: updateResources(loc.yields);
// Replace with: if (!isReplay) updateResources(loc.yields);
code = code.replace(
  'updateResources(loc.yields);',
  'if (!isReplay) updateResources(loc.yields);'
);

// In handleChallengeAnswer:
// Find: updateResources({ xp: 50 });
// Replace with: if (!isReplay) updateResources({ xp: 50 });
code = code.replace(
  'updateResources({ xp: 50 });',
  'if (!isReplay) updateResources({ xp: 50 });'
);

// In handleChallengeAnswer rewardToApply block:
// Find: updateResources(rewardToApply);
// Replace with: if (!isReplay) updateResources(rewardToApply);
code = code.replace(
  'updateResources(rewardToApply);',
  'if (!isReplay) updateResources(rewardToApply);'
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Fixed duplicate global rewards on replay!");
