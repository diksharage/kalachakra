const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

code = code.replace(
  `onClick={() => { setResult(null); setGameStateStage('playing'); }}`,
  `onClick={() => { setResult(null); setActiveVariation(null); setGameStateStage('intro'); }}`
);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated Replay button to trigger a new variation selection.");
