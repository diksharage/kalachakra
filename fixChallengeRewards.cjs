const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// The logic inside handleChallengeAnswer currently gives rewards unconditionally.
// Let's modify it to check prev.completedChallenges first.

const newHandleChallengeAnswer = `
  const handleChallengeAnswer = (challenge, isCorrect, isBuild) => {
    if (isCorrect) {
      setLevelState(prev => {
        const next = { ...prev, activePopup: null, resources: { ...prev.resources } };
        const isAlreadyCompleted = prev.completedChallenges.includes(challenge.id);
        
        let rewardToApply = challenge.reward;
        
        if (!rewardToApply) {
           const nextBuilding = buildActions.find(b => !prev.builtItems.includes(b.id));
           if (nextBuilding && nextBuilding.requirements) {
              rewardToApply = {};
              Object.keys(nextBuilding.requirements).forEach(k => {
                 rewardToApply[k] = 1;
              });
           }
        }

        if (!isAlreadyCompleted) {
          globalCompleteChallenge(challenge.id);
          updateResources({ xp: 50 });
          
          if (rewardToApply) {
            updateResources(rewardToApply);
            Object.keys(rewardToApply).forEach(k => {
              next.resources[k] = (next.resources[k] || 0) + rewardToApply[k];
            });
            const rewardStrings = Object.entries(rewardToApply).map(([k, v]) => \`+\${v} \${k}\`).join(', ');
            notify('SUCCESS', 'Challenge Completed!', \`Rewards: \${rewardStrings} (Used to Build!)\`, { icon: '🏆' });
          } else {
            notify('SUCCESS', 'Challenge Completed!', \`Great job!\`, { icon: '🏆' });
          }
          next.completedChallenges = [...next.completedChallenges, challenge.id];
        } else {
          // Retry case: No duplicate rewards, just a success message
          notify('SUCCESS', 'Challenge Replayed', \`You successfully completed this challenge again.\`, { icon: '🏆' });
        }
        
        next.stage = checkStageProgression(next);
        return next;
      });
    } else {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'error', data: "That doesn't seem quite right. Try again!", retry: { type: 'challenge', data: challenge, isBuild } } }));
    }
  };
`;

code = code.replace(
  /const handleChallengeAnswer = \(challenge, isCorrect, isBuild\) => \{[\s\S]*?return next;\n\s*\}\);\n\s*\} else \{[\s\S]*?\}\n\s*\};\n/m,
  newHandleChallengeAnswer.trim() + '\n\n'
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Fixed challenge replay reward duplication!");
