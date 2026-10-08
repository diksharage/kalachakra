const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Replace the entire block from `const handleLocationClick` up to the `renderPopup` function.
// We will safely replace all event handlers and effects.
const replaceStart = code.indexOf('const handleLocationClick');
const replaceEnd = code.indexOf('const renderPopup =');

if (replaceStart === -1 || replaceEnd === -1) {
    console.log("Could not find boundaries");
    process.exit(1);
}

const newHandlers = `
  const handleLocationClick = (loc) => {
    if (stage === 1) {
      if (!discovered.includes(loc.id)) {
        unlockArtifact(loc.id);
        const newResources = { ...resources };
        if (loc.yields) {
          Object.keys(loc.yields).forEach(k => {
            newResources[k] = (newResources[k] || 0) + loc.yields[k];
          });
          updateResources(loc.yields);
        }
        setLevelState(prev => ({
          ...prev,
          discovered: [...prev.discovered, loc.id],
          stage: 2,
          resources: newResources,
          activePopup: { type: 'discover', data: loc }
        }));
      } else {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'discover', data: loc } }));
      }
    }
  };

  const handleNextStage = (nextStage, popupType, popupData) => {
    setLevelState(prev => ({
      ...prev,
      stage: nextStage,
      activePopup: popupType ? { type: popupType, data: popupData } : null
    }));
  };

  const triggerChallenge = (challengeId) => {
    const challengeData = config.challenges[challengeId];
    if (challengeData) {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'challenge', data: challengeData } }));
    }
  };

  const handleChallengeAnswer = (challenge, isCorrect) => {
    if (isCorrect) {
      globalCompleteChallenge(challenge.id);
      if (stage === 4) {
        const nextChallenge = Object.values(config.challenges)[1] || Object.values(config.challenges)[0];
        setLevelState(prev => ({
          ...prev,
          completedChallenges: [...prev.completedChallenges, challenge.id],
          stage: 5,
          activePopup: { type: 'challenge', data: nextChallenge }
        }));
      } else if (stage === 5) {
        setLevelState(prev => ({
          ...prev,
          completedChallenges: [...prev.completedChallenges, challenge.id],
          stage: 6,
          activePopup: { type: 'reward', data: config.defaultResources }
        }));
      }
    } else {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'error', data: "That doesn't seem quite right. Try again!" } }));
    }
  };

  const handleBuild = () => {
    handleNextStage(8, 'completion', null);
  };

  const handleCompleteLevel = () => {
    if (config.id === 1) triggerEventAchievement('start_journey');
    if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');

    completeLevel(config.id);
    updateActiveLevelState(null, null);
    navigate('/journey');
  };

  useEffect(() => {
    if (stage === 8 && activePopup?.type !== 'completion') {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'completion' } }));
    }
  }, [stage]);

`;

code = code.substring(0, replaceStart) + newHandlers + code.substring(replaceEnd);
fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Done phase 1");
