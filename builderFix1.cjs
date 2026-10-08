const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Add import
if (!code.includes('getBuilderDataForLevel')) {
  code = code.replace(
    "import ResourceCard from './ResourceCard';",
    "import ResourceCard from './ResourceCard';\nimport { getBuilderDataForLevel } from '../../data/civilizationBuilder';"
  );
}

// Replace getOriginalBuildActions with buildActions memo
code = code.replace(
  /const getOriginalBuildActions = \(\) => \{[\s\S]*?const buildActions = useMemo\(\(\) => getOriginalBuildActions\(\), \[config\]\);/,
  `const builderData = useMemo(() => getBuilderDataForLevel(config.id), [config]);
  const buildActions = builderData.buildings;`
);

// Replace builds: 0 with builtItems: []
code = code.replace(/builds: 0/g, 'builtItems: []');
code = code.replace(/saved\.builds \|\| 0/g, 'saved.builtItems || []');
code = code.replace(/builds: saved\.builds \|\| 0,/g, 'builtItems: saved.builtItems || [],');
code = code.replace(/builds >= targetBuilds/g, 'builtItems.length >= targetBuilds');
code = code.replace(/builds \+ 1/g, 'builtItems'); // We'll fix this manually
code = code.replace(/newState\.builds >= targetBuilds/g, 'newState.builtItems.length >= targetBuilds');
code = code.replace(/const \{ stage, exploration, discovery, learning, completedChallenges, builds, resources, activePopup \} = levelState;/g, 'const { stage, exploration, discovery, learning, completedChallenges, builtItems, resources, activePopup } = levelState;');

// Replace targetBuilds calculation
code = code.replace(
  /const targetBuilds = Math\.min\(2, buildActions\.length\);/,
  `const targetBuilds = Math.min(3, buildActions.length);` // Build 2/3 or 3/3 depending on level
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Replaced basic builder info");
