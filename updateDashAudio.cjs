const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

if (!code.includes('useAudio')) {
    code = code.replace(/import \{ useGame \} from '\.\.\/context\/GameContext';/, "import { useGame } from '../context/GameContext';\nimport { useAudio } from '../context/AudioContext';");
}

code = code.replace(/const \{ gameState \} = useGame\(\);/, "const { gameState } = useGame();\n  const { playSound } = useAudio();");

code = code.replace(/onClick=\{\(\) => navigate\([^}]+\)\}/, (match) => {
    return match.replace("navigate(", "playSound('ui'); navigate(");
});

fs.writeFileSync('src/pages/DashboardPage.jsx', code);
console.log("Added audio to DashboardPage!");
