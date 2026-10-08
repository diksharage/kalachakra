const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// We need to inject activeVariation state and use it
// Replace:
// const MiniGameManager = ({ gameConfig, challengeData, theme, ageGroup, onComplete }) => {
//   const { t } = useLanguage();
//   const [gameStateStage, setGameStateStage] = useState('intro');

const newInit = `const MiniGameManager = ({ gameConfig, challengeData, theme, ageGroup, onComplete }) => {
  const { t } = useLanguage();
  const [gameStateStage, setGameStateStage] = useState('intro');
  const [activeVariation, setActiveVariation] = useState(null);
  const { gameState, saveMiniGameResult } = useGame();

  useEffect(() => {
    if (gameConfig?.variations && !activeVariation) {
       const previous = gameState.miniGameResults?.[gameConfig.id] || {};
       const lastVar = previous.lastVariation;
       let available = gameConfig.variations.filter(v => v.variationId !== lastVar);
       if (available.length === 0) available = gameConfig.variations; // fallback if all played
       const picked = available[Math.floor(Math.random() * available.length)];
       setActiveVariation(picked);
    }
  }, [gameConfig, gameState, activeVariation]);
`;

code = code.replace(
  `const MiniGameManager = ({ gameConfig, challengeData, theme, ageGroup, onComplete }) => {
  const { t } = useLanguage();
  const [gameStateStage, setGameStateStage] = useState('intro');
  const [result, setResult] = useState(null);
  const { gameState, saveMiniGameResult } = useGame();`,
  newInit + `\n  const [result, setResult] = useState(null);`
);

// Update handleSubGameComplete to save variationId
code = code.replace(
  `saveMiniGameResult(gameConfig.id, score, stars);`,
  `saveMiniGameResult(gameConfig.id, score, stars, activeVariation?.variationId);`
);

// Replace all usages of `gameConfig.title`, `gameConfig.description`, `gameConfig.timeLimit`, `gameConfig.difficulty`, `gameConfig.type` inside MiniGameManager with `activeVariation.*`
// BUT wait, gameConfig is used everywhere in the return statements!
// I'll replace `gameConfig.` with `(activeVariation || gameConfig).` inside the render blocks.
// Actually, it's easier to just do `const activeConfig = activeVariation || gameConfig;` at the top of the render, and then replace `gameConfig` with `activeConfig` where relevant.

const replaceActiveConfig = `
  const activeConfig = activeVariation || gameConfig;
  
  if (!activeConfig) return null;`;

code = code.replace(
  `  if (!gameConfig) return null;`,
  replaceActiveConfig
);

// Replace gameConfig with activeConfig in the rest of the component
code = code.replace(/gameConfig\.title/g, 'activeConfig.title');
code = code.replace(/gameConfig\.description/g, 'activeConfig.description');
code = code.replace(/gameConfig\.difficulty/g, 'activeConfig.difficulty');
code = code.replace(/gameConfig\.timeLimit/g, 'activeConfig.timeLimit');
code = code.replace(/gameConfig\.type/g, 'activeConfig.type');
code = code.replace(/config=\{gameConfig\}/g, 'config={activeConfig}');

// Except for gameConfig.id which is the bank ID!
// Wait! I didn't replace `gameConfig.id`. `previousBest` uses `gameConfig.id`, which is correct! 
// `saveMiniGameResult(gameConfig.id, ...)` uses `gameConfig.id`, which is correct!

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated MiniGameManager to handle variations.");
