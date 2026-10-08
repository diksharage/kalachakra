const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge:\nglobalCompleteChallenge, updateResources, notify } = useGame();",
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: globalCompleteChallenge, updateResources, notify, checkQuestProgress } = useGame();"
);
// In case the newline was differently formatted:
code = code.replace(
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: \nglobalCompleteChallenge, updateResources, notify } = useGame();",
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: globalCompleteChallenge, updateResources, notify, checkQuestProgress } = useGame();"
);
code = code.replace(
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: globalCompleteChallenge, updateResources, notify } = useGame();",
  "const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: globalCompleteChallenge, updateResources, notify, checkQuestProgress } = useGame();"
);

// Inject checkQuestProgress for Explore
code = code.replace(
  "const markExplored = (loc) => {\n      setLevelState(prev => {",
  "const markExplored = (loc) => {\n      checkQuestProgress('explore', loc.id);\n      setLevelState(prev => {"
);

// Inject checkQuestProgress for Discover (if not artifact, we still want it)
code = code.replace(
  "const markDiscovered = (loc) => {\n      if (loc.artifactId) unlockArtifact(loc.artifactId);",
  "const markDiscovered = (loc) => {\n      checkQuestProgress('discover', loc.id);\n      if (loc.artifactId) unlockArtifact(loc.artifactId);"
);

// Inject checkQuestProgress for Learn
code = code.replace(
  "const handleClaimFound = (claimId) => {\n      setLevelState(prev => {",
  "const handleClaimFound = (claimId) => {\n      checkQuestProgress('learn', claimId);\n      setLevelState(prev => {"
);

// Inject checkQuestProgress for Build (already inside the Confirm Build button click)
const buildTarget = "const next = { \n                           ...prev, \n                           resources: newResources, \n                           builtItems: [...prev.builtItems, data.id], ";
const buildReplacement = "checkQuestProgress('build', data.id);\n                         const next = { \n                           ...prev, \n                           resources: newResources, \n                           builtItems: [...prev.builtItems, data.id], ";
code = code.replace(buildTarget, buildReplacement);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected checkQuestProgress into LevelEngine.jsx");
