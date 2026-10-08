const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Add getOriginalBuildAction
code = code.replace(
  /const buildAction = stage === 7 \? \{ label: "Build \/ Manage", requiresText: "Apply your resources to progress your civilization\." \} : null;/,
  `const getOriginalBuildAction = () => {
    if (!config.getBuildAction) return { label: "Build / Manage", requiresText: "Apply your resources to progress your civilization." };
    for (let s = 1; s <= 8; s++) {
      const action = config.getBuildAction(s);
      if (action) return action;
    }
    return { label: "Build / Manage", requiresText: "Apply your resources to progress your civilization." };
  };
  const buildAction = stage === 7 ? getOriginalBuildAction() : null;`
);

// 2. Update handleBuild
code = code.replace(
  /const handleBuild = \(\) => \{\s*handleNextStage\(8, 'completion', null\);\s*\};/,
  `const handleBuild = () => {
    if (buildAction.actionOverride && buildAction.actionOverride.type === 'challenge') {
      const challengeData = config.challenges[buildAction.actionOverride.id];
      if (challengeData) {
        handleNextStage(7, 'challenge', challengeData);
        return;
      }
    }
    
    if (buildAction.message) {
      handleNextStage(7, 'success', buildAction.message);
      return;
    }

    handleNextStage(8, 'completion', null);
  };`
);

// 3. Update handleChallengeAnswer for stage 7
code = code.replace(
  /else if \(stage === 5\) \{\s*setLevelState\(prev => \(\{\s*\.\.\.prev,\s*completedChallenges: \[\.\.\.prev\.completedChallenges, challenge\.id\],\s*stage: 6,\s*activePopup: \{ type: 'reward', data: config\.defaultResources \}\s*\}\)\);\s*\}/,
  `else if (stage === 5) {
        setLevelState(prev => ({
          ...prev,
          completedChallenges: [...prev.completedChallenges, challenge.id],
          stage: 6,
          activePopup: { type: 'reward', data: config.defaultResources }
        }));
      } else if (stage === 7) {
        setLevelState(prev => ({
          ...prev,
          completedChallenges: [...prev.completedChallenges, challenge.id],
          stage: 8,
          activePopup: { type: 'completion' }
        }));
      }`
);

// 4. Add success popup rendering
code = code.replace(
  /\{type === 'reward' && \(/,
  `{type === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">{t('common.complete') || "Complete!"}</h3>
              <p className="text-content/80 mb-6">{data}</p>
              <button onClick={() => {
                if (stage === 7) handleNextStage(8, 'completion', null);
                else setLevelState(prev => ({ ...prev, activePopup: null }));
              }} className={\`px-6 py-3 font-bold rounded-xl w-full \${theme.button}\`}>
                {t('common.continue') || "Continue"}
              </button>
            </>
          )}

          {type === 'reward' && (`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Done phase 4");
