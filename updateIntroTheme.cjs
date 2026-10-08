const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

if (!code.includes('levelThemes')) {
    code = code.replace(/import \{ civilizationLevels \} from '\.\.\/data\/civilizationLevels';/, "import { civilizationLevels } from '../data/civilizationLevels';\nimport { levelThemes } from '../data/levelThemes';");
}

const renderStart = /return \(\s*<div className="max-w-4xl mx-auto py-4">/;
const newRenderStart = `  const theme = levelThemes[levelId] || levelThemes[1];

  return (
    <div className="relative max-w-4xl mx-auto py-4">
      {/* Dynamic atmospheric theme background */}
      <div className={\`absolute inset-[-4rem] opacity-30 dark:opacity-10 bg-gradient-to-br \${theme.gradient} pointer-events-none -z-10 mix-blend-overlay dark:mix-blend-color-burn\`} style={{ maskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)' }} />
`;
code = code.replace(renderStart, newRenderStart);

fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Updated LevelIntroPage with atmospheric tint!");
