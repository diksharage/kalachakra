const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const origHandleChallenge = `globalCompleteChallenge(challenge.id);
      if (challenge.reward) {
        updateResources(challenge.reward);
      }
      setLevelState(prev => {
        const next = { ...prev, activePopup: null, resources: { ...prev.resources } };
        if (challenge.reward) {
          Object.keys(challenge.reward).forEach(k => {
            next.resources[k] = (next.resources[k] || 0) + challenge.reward[k];
          });
        }`;

const newHandleChallenge = `globalCompleteChallenge(challenge.id);
      
      setLevelState(prev => {
        const next = { ...prev, activePopup: null, resources: { ...prev.resources } };
        
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

        if (rewardToApply) {
          updateResources(rewardToApply);
          Object.keys(rewardToApply).forEach(k => {
            next.resources[k] = (next.resources[k] || 0) + rewardToApply[k];
          });
        }`;

code = code.replace(origHandleChallenge, newHandleChallenge);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected dynamic fallback rewards!");
