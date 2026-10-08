const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldHandleLocationClick = `  const handleLocationClick = (loc) => {
    playSound('ui');
    if (stage === 1) {
      if (!exploration.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'explore', data: loc } }));
      }
    } else if (stage === 2) {
      if (exploration.includes(loc.id) && !discovery.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'discover', data: loc } }));
      }
    } else if (stage === 3) {
      if (discovery.includes(loc.id) && !learning.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'learn', data: loc } }));
      }
    }
  };`;

const newHandleLocationClick = `  const handleLocationClick = (loc) => {
    playSound('ui');
    if (stage === 1) {
      if (!exploration.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'explore', data: loc } }));
      }
    } else if (stage === 2) {
      if (exploration.includes(loc.id) && !discovery.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'discover', data: loc } }));
      }
    } else if (stage === 3) {
      if (discovery.includes(loc.id) && !learning.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'learn', data: loc } }));
      }
    } else if (stage === 4) {
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

code = code.replace(oldHandleLocationClick, newHandleLocationClick);

// Now update the map node rendering to visually show the challenge
const oldNodeRender = `                  let isClickable = false;
                  if (stage === 1 && !isExplored) isClickable = true;
                  if (stage === 2 && isExplored && !isDiscovered) isClickable = true;
                  if (stage === 3 && isDiscovered && !isLearned) isClickable = true;
  
                  return (
                    <button
                        key={loc.id}`;

const newNodeRender = `                  let isClickable = false;
                  let challengeForNode = null;
                  if (stage === 1 && !isExplored) isClickable = true;
                  if (stage === 2 && isExplored && !isDiscovered) isClickable = true;
                  if (stage === 3 && isDiscovered && !isLearned) isClickable = true;
                  if (stage === 4) {
                      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
                      if (chalIdx !== -1) {
                          const chalId = levelState.activeChallengeIds[chalIdx];
                          if (!levelState.completedChallenges.includes(chalId)) {
                              isClickable = true;
                              challengeForNode = allChallenges.find(c => c.id === chalId);
                          }
                      }
                  }
  
                  return (
                    <button
                        key={loc.id}`;

code = code.replace(oldNodeRender, newNodeRender);

// And update the visual of the map node
const oldNodeVisual = `                      {isLearned && (
                        <div className={"absolute -top-2 -right-2 rounded-full p-1 border-2 border-transparent text-[#171B3A] " + theme.primaryBg}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}`;

const newNodeVisual = `                      {isLearned && !challengeForNode && (
                        <div className={"absolute -top-2 -right-2 rounded-full p-1 border-2 border-transparent text-[#171B3A] " + theme.primaryBg}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                      {challengeForNode && (
                        <div className="absolute -top-3 -right-3 rounded-full p-2 border-2 border-gold bg-red-900/90 text-gold shadow-lg shadow-gold/20 animate-bounce">
                          <Target className="w-5 h-5" />
                        </div>
                      )}`;

code = code.replace(oldNodeVisual, newNodeVisual);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Map logic for Challenge routing!");
