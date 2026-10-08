const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Inject useAudio destructing
code = code.replace(/const navigate = useNavigate\(\);/, `const navigate = useNavigate();\n  const { playSound, startAmbience, stopAmbience } = useAudio();`);

// 2. Add Ambience useEffect
const ambienceEffect = `
  useEffect(() => {
    startAmbience(config.id);
    return () => stopAmbience();
  }, [config.id, startAmbience, stopAmbience]);
`;
code = code.replace(/const isReplay = gameState\.completedLevels\.includes\(config\.id\);/, `const isReplay = gameState.completedLevels.includes(config.id);\n${ambienceEffect}`);

// 3. Stage unlock sound
const stageEffect = `
  useEffect(() => {
    if (stage > 1 && stage < 6) {
      playSound('level_unlock');
    }
  }, [stage, playSound]);
`;
code = code.replace(/const \[lockToast, setLockToast\] = useState\(null\);/, `const [lockToast, setLockToast] = useState(null);\n${stageEffect}`);

// 4. Hook up actions
code = code.replace(/const markExplored = \(loc\) => \{/, "const markExplored = (loc) => {\n    playSound('ui');");
code = code.replace(/const markDiscovered = \(loc\) => \{/, "const markDiscovered = (loc) => {\n    playSound('discovery');");
code = code.replace(/const markLearned = \(loc\) => \{/, "const markLearned = (loc) => {\n    playSound('ui');");
code = code.replace(/const startChallenge = \(chal\) => \{/, "const startChallenge = (chal) => {\n    playSound('ui');");

// 5. Challenge correctness
code = code.replace(/globalCompleteChallenge\(config\.id, challenge\.id\);/, "playSound('quest');\n        globalCompleteChallenge(config.id, challenge.id);");
code = code.replace(/setFailed\(true\);\s*setTimeout\(\(\) => \{\s*setActivePopup\(null\);\s*\}, 800\);/g, "playSound('error');\n        setFailed(true);\n        safeSetTimeout(() => { setActivePopup(null); }, 800);");
code = code.replace(/setActivePopup\(\{ type: 'error', data: "That doesn't seem quite right. Try again!", retry: \{ type: 'challenge', data: challenge, isBuild \} \}\);/, "playSound('error');\n        setActivePopup({ type: 'error', data: \"That doesn't seem quite right. Try again!\", retry: { type: 'challenge', data: challenge, isBuild } });");

// 6. Build execution
code = code.replace(/const executeBuild = \(bAction\) => \{/, "const executeBuild = (bAction) => {\n    playSound('building');");

// 7. Level Complete rendering -> playSound('level_complete')
// If stage === 6 mounts, play sound. We can add a useEffect for stage 6.
const stage6Effect = `
  useEffect(() => {
    if (stage === 6 && !isReplay && config.id !== 14) {
      playSound('level_complete');
    }
  }, [stage, isReplay, config.id, playSound]);
`;
code = code.replace(/const buildActions = builderData\.buildings;/, `const buildActions = builderData.buildings;\n${stage6Effect}`);

// 8. Add playSound('ui') to map nodes and UI buttons
// Just standardizing on the main actions is sufficient. Clicking map nodes `handleLocationClick`
code = code.replace(/const handleLocationClick = \(loc\) => \{/, "const handleLocationClick = (loc) => {\n    playSound('ui');");

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected audio hooks into LevelEngine!");
