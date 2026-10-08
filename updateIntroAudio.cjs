const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

// Ensure useAudio is imported
if (!code.includes('useAudio')) {
    code = code.replace(/import \{ useGame \} from '\.\.\/context\/GameContext';/, "import { useGame } from '../context/GameContext';\nimport { useAudio } from '../context/AudioContext';");
}

code = code.replace(/const \{ gameState \} = useGame\(\);/, "const { gameState } = useGame();\n  const { playSound } = useAudio();");

// Find Start Level button click
code = code.replace(/onClick=\{\(\) => navigate\(`\/journey\/level\/\$\{levelId\}\/play`\)\}/g, "onClick={() => { playSound('ui'); navigate(`/journey/level/${levelId}/play`); }}");

fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Added audio to LevelIntroPage!");
