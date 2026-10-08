const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelPlayPage.jsx', 'utf8');

// Remove the duplicated back button
code = code.replace(/<button[\s\S]*?<\/button>/, '');
// Ensure it's totally gone
code = code.replace(/import { AlertTriangle, ArrowLeft } from 'lucide-react';/, "import { AlertTriangle } from 'lucide-react';");

// Import levelThemes
if (!code.includes('levelThemes')) {
    code = code.replace(/import { levelConfigs } from '\.\.\/data\/levelConfigs';/, "import { levelConfigs } from '../data/levelConfigs';\nimport { levelThemes } from '../data/levelThemes';");
}

const renderOrig = /return \(\s*<div>\s*<LevelEngine key=\{id\} config=\{config\} \/>\s*<\/div>\s*\);/;

const renderNew = `
  const theme = levelThemes[config.id] || levelThemes[1];

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-6rem)]">
      {/* Dynamic atmospheric theme background */}
      <div className={\`absolute inset-[-2rem] md:inset-[-4rem] opacity-30 dark:opacity-20 bg-gradient-to-br \${theme.gradient} pointer-events-none -z-10 mix-blend-overlay dark:mix-blend-color-burn mask-radial-faded\`} />
      
      <LevelEngine key={id} config={config} />
    </div>
  );`;

code = code.replace(renderOrig, renderNew);

fs.writeFileSync('src/pages/LevelPlayPage.jsx', code);
console.log("Updated LevelPlayPage with atmospheric tint!");
