import { levelConfigs } from './src/data/levelConfigs.js';
import { getBuilderDataForLevel } from './src/data/civilizationBuilder.js';

let allGood = true;

levelConfigs.forEach(config => {
  if (config.id === 14) return; // Skip 14 as it's the ending
  
  const levelData = config.locations;
  const levelChallenges = config.challenges;
  const buildActions = getBuilderDataForLevel(config.id).buildings || [];
  
  let yielded = {};
  let required = {};
  
  // Collect all yields
  levelData.forEach(loc => {
    if (loc.yields) {
      Object.keys(loc.yields).forEach(k => {
        yielded[k] = (yielded[k] || 0) + loc.yields[k];
      });
    }
  });
  
  if (levelChallenges) {
    Object.values(levelChallenges).forEach(chal => {
      if (chal.reward) {
        Object.keys(chal.reward).forEach(k => {
          yielded[k] = (yielded[k] || 0) + chal.reward[k];
        });
      }
    });
  }
  
  // Special legacy and xp are always fine
  delete yielded['legacy'];
  delete yielded['xp'];
  delete required['legacy'];
  delete required['xp'];

  // Collect all requirements
  buildActions.forEach(b => {
    if (b.requirements) {
      Object.keys(b.requirements).forEach(k => {
        required[k] = (required[k] || 0) + b.requirements[k];
      });
    }
  });
  
  // Check for soft-locks (Required > Yielded)
  Object.keys(required).forEach(k => {
    const y = yielded[k] || 0;
    const r = required[k];
    if (y < r) {
      console.error(\`[Level \${config.id}] SOFT-LOCK: Requires \${r} \${k}, but only yields \${y}\`);
      allGood = false;
    }
  });
  
  // Check for unused resources (Yielded > 0, Required = 0)
  Object.keys(yielded).forEach(k => {
    const y = yielded[k];
    const r = required[k] || 0;
    if (r === 0 && y > 0) {
      console.warn(\`[Level \${config.id}] UNUSED RESOURCE: Yields \${y} \${k}, but requires 0\`);
      // We don't fail allGood for this, but it's good to know for cleanup
    }
  });
});

if (allGood) {
  console.log("All levels are perfectly balanced. No soft-locks detected.");
}
