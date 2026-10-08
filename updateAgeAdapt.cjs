const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// Update MiniGameManager signature to accept ageGroup
code = code.replace(
  `const MiniGameManager = ({ gameConfig, challengeData, theme, onComplete }) => {`,
  `const MiniGameManager = ({ gameConfig, challengeData, theme, ageGroup, onComplete }) => {`
);

// Pass ageGroup down
code = code.replace(
  `{gameConfig.type === 'artifactMatch' && <ArtifactMatch config={gameConfig} onComplete={handleSubGameComplete} theme={theme} />}`,
  `{gameConfig.type === 'artifactMatch' && <ArtifactMatch config={gameConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} />}`
);
code = code.replace(
  `{gameConfig.type === 'timeline' && <TimelineGame config={gameConfig} onComplete={handleSubGameComplete} theme={theme} />}`,
  `{gameConfig.type === 'timeline' && <TimelineGame config={gameConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} />}`
);
code = code.replace(
  `{gameConfig.type === 'buildFromMemory' && <BuildFromMemory config={gameConfig} onComplete={handleSubGameComplete} theme={theme} />}`,
  `{gameConfig.type === 'buildFromMemory' && <BuildFromMemory config={gameConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} />}`
);
code = code.replace(
  `{gameConfig.type === 'historicalDecision' && <HistoricalDecision config={gameConfig} onComplete={handleSubGameComplete} theme={theme} />}`,
  `{gameConfig.type === 'historicalDecision' && <HistoricalDecision config={gameConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} />}`
);
code = code.replace(
  `{gameConfig.type === 'tradeRoute' && <TradeRoute config={gameConfig} onComplete={handleSubGameComplete} theme={theme} />}`,
  `{gameConfig.type === 'tradeRoute' && <TradeRoute config={gameConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} />}`
);

// Update ArtifactMatch to slice pairs if young
code = code.replace(
  `const leftItems = useMemo(() => [...config.pairs].sort(() => Math.random() - 0.5), [config]);`,
  `const leftItems = useMemo(() => {
    let pairs = config.pairs;
    if (ageGroup === '6-8' && pairs.length > 3) pairs = pairs.slice(0, 3);
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [config, ageGroup]);`
);
code = code.replace(
  `const rightItems = useMemo(() => [...config.pairs].sort(() => Math.random() - 0.5), [config]);`,
  `const rightItems = useMemo(() => {
    let pairs = config.pairs;
    if (ageGroup === '6-8' && pairs.length > 3) pairs = pairs.slice(0, 3);
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [config, ageGroup]);`
);

// Update ArtifactMatch complete condition to use active length
code = code.replace(
  `if (Object.keys(matches).length === config.pairs.length) {`,
  `if (Object.keys(matches).length === leftItems.length) {`
);


// Update TimelineGame to slice events if young
code = code.replace(
  `setItems([...config.events].sort(() => Math.random() - 0.5));`,
  `
    let evts = config.events;
    if (ageGroup === '6-8' && evts.length > 3) evts = evts.slice(0, 3);
    setItems([...evts].sort(() => Math.random() - 0.5));
  `
);
code = code.replace(
  `const optimalMoves = config.events.length;`,
  `const optimalMoves = items.length;`
);

// Update BuildFromMemory to give more time if young
code = code.replace(
  `const [timeLeft, setTimeLeft] = useState(config.memorizeTime || 5);`,
  `const [timeLeft, setTimeLeft] = useState((config.memorizeTime || 5) + (ageGroup === '6-8' ? 3 : 0));`
);

// For Historical Decision and Trade Route, let's just add a hint prop in the component signatures
code = code.replace(
  `const HistoricalDecision = ({ config, onComplete, theme }) => {`,
  `const HistoricalDecision = ({ config, onComplete, theme, ageGroup }) => {`
);
code = code.replace(
  `const TradeRoute = ({ config, onComplete, theme }) => {`,
  `const TradeRoute = ({ config, onComplete, theme, ageGroup }) => {`
);
// And let's show an easy hint if ageGroup === '6-8' inside Historical Decision (already passed ageGroup to it)
code = code.replace(
  `<h4 className="text-2xl font-serif mb-8">{currentScenario.text}</h4>`,
  `<h4 className="text-2xl font-serif mb-8">{currentScenario.text}</h4>
      {ageGroup === '6-8' && <div className="bg-blue-900/20 border border-blue-500/30 text-blue-400 p-3 rounded-xl mb-6 text-sm font-bold">Hint: Choose the option that helps your people survive and grow safely!</div>}`
);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated MiniGameManager with Age Adaptation.");
