const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Replace objective text mapping
code = code.replace(/<p className="text-content text-lg leading-relaxed mb-4">\{config\.getObjectiveText\(stage\)\}<\/p>/,
  `<p className="text-content text-lg leading-relaxed mb-4">
    {stage === 1 && "Explore: Inspect the environment and find a relevant location."}
    {stage === 2 && "Discover: Reveal the historical object or resource."}
    {stage === 3 && "Learn: Review the contextual historical knowledge."}
    {stage === 4 && "Play: Engage with the interactive activity."}
    {stage === 5 && "Solve Challenge: Complete the level-specific puzzle."}
    {stage === 6 && "Earn Reward: Claim your legacy and resources."}
    {stage === 7 && "Build / Manage: Expand your civilization."}
    {stage === 8 && "Complete Level: Proceed to the next era."}
  </p>`);

// Replace kala hint
code = code.replace(/<p className="text-sm text-content\/90">\{config\.getKalaHint\(stage, gameState\.ageGroup\)\}<\/p>/,
  `<p className="text-sm text-content/90">
    {stage === 1 && "Click on any interesting location in the environment to explore."}
    {stage === 2 && "Analyze what you found to learn its history."}
    {stage === 3 && "Read the historical context carefully, it will help you."}
    {stage === 4 && "Try this fun activity related to what we just learned!"}
    {stage === 5 && "Use what you know to solve this challenge!"}
    {stage === 6 && "Collect your resources, they are vital for growth."}
    {stage === 7 && "Use your resources to build and progress."}
    {stage === 8 && "Well done! You've completed this era."}
  </p>`);

// Replace build action
code = code.replace(/const buildAction = config\.getBuildAction\(stage\);/,
  `const buildAction = stage === 7 ? { label: "Build / Manage", requiresText: "Apply your resources to progress your civilization." } : null;`);

// Replace total stages progress bar
code = code.replace(/\{config\.totalStages\}/g, `8`);

// Replace locations render logic
code = code.replace(/let isTarget = config\.isLocationTarget \? config\.isLocationTarget\(stage, loc\.id, isDiscovered\) : false;\s*if \(!config\.isLocationTarget && stage === 1\) isTarget = !isDiscovered;/,
  `let isTarget = stage === 1 && !isDiscovered;`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Done phase 3");
