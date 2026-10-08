const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Update handleLocationClick for stage 5
const oldHandleClick = `    } else if (stage === 4) {
      // Find if a challenge is bound to this location
      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
      if (chalIdx !== -1) {
        const chalId = levelState.activeChallengeIds[chalIdx];
        if (!levelState.completedChallenges.includes(chalId)) {
          const chal = allChallenges.find(c => c.id === chalId);
          if (chal) startChallenge(chal);
        }
      }
    }
  };`;

const newHandleClick = `    } else if (stage === 4) {
      // Find if a challenge is bound to this location
      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
      if (chalIdx !== -1) {
        const chalId = levelState.activeChallengeIds[chalIdx];
        if (!levelState.completedChallenges.includes(chalId)) {
          const chal = allChallenges.find(c => c.id === chalId);
          if (chal) startChallenge(chal);
        }
      }
    } else if (stage === 5) {
      const pendingBuilds = buildActions.filter(b => !builtItems.includes(b.id)).slice(0, targetBuilds);
      const buildIdx = pendingBuilds.findIndex((b, i) => locations[i % locations.length].id === loc.id);
      if (buildIdx !== -1) {
         setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: pendingBuilds[buildIdx] } }));
      }
    }
  };`;

code = code.replace(oldHandleClick, newHandleClick);

// 2. Update Node Renderer Logic for stage 5
const oldNodeLogic = `                  if (stage === 4) {
                      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
                      if (chalIdx !== -1) {
                          const chalId = levelState.activeChallengeIds[chalIdx];
                          if (!levelState.completedChallenges.includes(chalId)) {
                              isClickable = true;
                              challengeForNode = allChallenges.find(c => c.id === chalId);
                          }
                      }
                  }
  
                  return (`;

const newNodeLogic = `                  if (stage === 4) {
                      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
                      if (chalIdx !== -1) {
                          const chalId = levelState.activeChallengeIds[chalIdx];
                          if (!levelState.completedChallenges.includes(chalId)) {
                              isClickable = true;
                              challengeForNode = allChallenges.find(c => c.id === chalId);
                          }
                      }
                  }
                  if (stage === 5) {
                      const pendingBuilds = buildActions.filter(b => !levelState.builtItems.includes(b.id)).slice(0, targetBuilds);
                      const buildIdx = pendingBuilds.findIndex((b, i) => locations[i % locations.length].id === loc.id);
                      if (buildIdx !== -1) {
                          isClickable = true;
                          challengeForNode = pendingBuilds[buildIdx];
                      }
                  }
  
                  return (`;

code = code.replace(oldNodeLogic, newNodeLogic);

// 3. Update Node Render Visuals
const oldNodeVisual = `                      {challengeForNode && (
                        <div className="absolute -top-3 -right-3 rounded-full p-2 border-2 border-gold bg-red-900/90 text-gold shadow-lg shadow-gold/20 animate-bounce">
                          <Target className="w-5 h-5" />
                        </div>
                      )}`;

const newNodeVisual = `                      {challengeForNode && stage === 4 && (
                        <div className="absolute -top-3 -right-3 rounded-full p-2 border-2 border-gold bg-red-900/90 text-gold shadow-lg shadow-gold/20 animate-bounce">
                          <Target className="w-5 h-5" />
                        </div>
                      )}
                      {challengeForNode && stage === 5 && (
                        <div className="absolute -top-3 -right-3 rounded-full p-2 border-2 border-gold bg-blue-900/90 text-gold shadow-lg shadow-gold/20 animate-bounce">
                          <Hammer className="w-5 h-5" />
                        </div>
                      )}`;

code = code.replace(oldNodeVisual, newNodeVisual);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Map logic for Stage 5 Building routing!");
