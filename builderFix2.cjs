const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. In handleChallengeAnswer, add resource reward logic
const handleChallengeAnswerOrig = `globalCompleteChallenge(challenge.id);
      setLevelState(prev => {
        const next = { ...prev, activePopup: null };`;
const handleChallengeAnswerNew = `globalCompleteChallenge(challenge.id);
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
code = code.replace(handleChallengeAnswerOrig, handleChallengeAnswerNew);

// 2. Replace handleBuildSuccess
const handleBuildSuccessOrig = `const handleBuildSuccess = () => {
    setLevelState(prev => {
      const next = { ...prev, builds: prev.builds + 1, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
  };`;
const handleBuildSuccessNew = `const handleBuildSuccess = () => {
    setLevelState(prev => {
      const next = { ...prev, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
  };`;
code = code.replace(handleBuildSuccessOrig, handleBuildSuccessNew);

// 3. Replace Stage 5 JSX completely
const stage5Orig = /\{stage === 5 && \([\s\S]*?\}\)\}\s*<\/div>\s*<\/div>\s*\)\}/;
const stage5New = `{stage === 5 && (
          <div className={"glass-panel p-5 rounded-2xl border animate-fade-in " + theme.border}>
            <h3 className={"font-bold text-sm tracking-wider uppercase mb-4 " + theme.primary}>Build Actions</h3>
            <div className="flex flex-col gap-3">
              {buildActions.map((bAction) => {
                const isBuilt = builtItems.includes(bAction.id);
                const reqs = bAction.requirements || {};
                let canAfford = true;
                const reqElements = [];
                Object.keys(reqs).forEach(k => {
                   const cost = reqs[k];
                   const avail = resources[k] || 0;
                   if (avail < cost) canAfford = false;
                   reqElements.push(<span key={k} className={avail < cost ? 'text-red-400' : 'text-green-400'}>{cost} {k} ({avail}/{cost})</span>);
                });

                return (
                  <button
                    key={bAction.id}
                    onClick={() => setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: bAction } }))}
                    disabled={isBuilt || !canAfford} 
                    className={"flex flex-col gap-2 p-3 rounded-xl border text-left transition-all " + (isBuilt ? 'bg-green-900/20 border-green-900/50 opacity-60' : !canAfford ? 'bg-red-900/10 border-red-900/20 opacity-50' : theme.bg + "/50 hover:" + theme.border + " border-content/10")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{bAction.icon}</span>
                        <span className="text-sm font-bold">{t(bAction.nameKey) || bAction.nameKey}</span>
                      </div>
                      {isBuilt && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    <span className="text-xs text-content/70">{t(bAction.descKey) || bAction.descKey}</span>
                    {Object.keys(reqs).length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold mt-1 bg-surface/40 p-1.5 rounded">
                        <span className="opacity-60">Cost:</span> {reqElements.map((el, i) => <React.Fragment key={i}>{el} </React.Fragment>)}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}`;
code = code.replace(stage5Orig, stage5New);

// 4. Add 'confirm_build' popup right before 'build_success'
const buildSuccessPopup = "{type === 'build_success' && (";
const confirmBuildPopup = `{type === 'confirm_build' && (
            <>
              <div className="text-6xl mb-4">{data.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{t(data.nameKey) || data.nameKey}</h3>
              <p className="text-content/80 mb-6">{t(data.descKey) || data.descKey}</p>
              
              <div className="flex justify-between gap-4 mb-6">
                <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))} className="px-6 py-3 font-bold rounded-xl w-full border border-content/20 hover:bg-surface/50">
                  Cancel
                </button>
                <button onClick={() => {
                   const newResources = { ...resources };
                   Object.keys(data.requirements || {}).forEach(k => {
                     newResources[k] = (newResources[k] || 0) - data.requirements[k];
                   });
                   if (data.effects) {
                     updateResources(data.effects);
                   }
                   setLevelState(prev => {
                     const next = { ...prev, resources: newResources, builtItems: [...prev.builtItems, data.id], activePopup: { type: 'build_success', data } };
                     next.stage = checkStageProgression(next);
                     return next;
                   });
                }} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
                  Confirm Build
                </button>
              </div>
            </>
          )}
          
          {type === 'build_success' && (`;
code = code.replace(buildSuccessPopup, confirmBuildPopup);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated LevelEngine.jsx");
