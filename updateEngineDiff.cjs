const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Rewrite target definitions
const targetsOrig = /const targetExplore = Math\.min\(.*?\n.*?targetBuilds = Math\.min\(.*?\);/s;
const targetsNew = `const isBeginner = config.id <= 3;
  const isIntermediate = config.id >= 4 && config.id <= 7;
  const isAdvanced = config.id >= 8 && config.id <= 11;
  
  const maxExplore = locations.length;
  const maxChallenges = allChallenges.length || 1;
  const maxBuilds = buildActions.length || 1;

  const targetExplore = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxExplore);
  const targetDiscover = targetExplore;
  const targetLearn = targetExplore;
  
  const targetChallenges = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 4, maxChallenges);
  
  const targetBuilds = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxBuilds);`;

code = code.replace(targetsOrig, targetsNew);

// 2. Add feedback UI element
// Before we add it, let's find a good spot. Under the StageProgress list.
const stageListOrig = /<\/div>\s*<div className=\{"rounded-xl p-4 border " \+ theme\.bg \+ "\/30 " \+ theme\.border\}>/;

const feedbackBlock = `
          {/* Dynamic Player Feedback */}
          {stage < 6 && (
            <div className={"mb-4 p-3 rounded-lg text-sm font-medium border " + theme.bg + "/50 " + theme.border}>
              {stage === 1 && <span className={exploration.length < targetExplore ? "text-content/80" : "text-green-400"}>Complete {Math.max(0, targetExplore - exploration.length)} more explorations to unlock Discover.</span>}
              {stage === 2 && <span className={discovery.length < targetDiscover ? "text-content/80" : "text-green-400"}>Complete {Math.max(0, targetDiscover - discovery.length)} more discoveries to unlock Learn.</span>}
              {stage === 3 && <span className={learning.length < targetLearn ? "text-content/80" : "text-green-400"}>Read {Math.max(0, targetLearn - learning.length)} more contextual notes to unlock Play.</span>}
              {stage === 4 && <span className={completedChallenges.length < targetChallenges ? "text-content/80" : "text-green-400"}>Solve {Math.max(0, targetChallenges - completedChallenges.length)} more challenges to unlock Build.</span>}
              {stage === 5 && <span className={builtItems.length < targetBuilds ? "text-content/80" : "text-green-400"}>Construct {Math.max(0, targetBuilds - builtItems.length)} more buildings to Complete Level.</span>}
            </div>
          )}
          
          <div className={"rounded-xl p-4 border " + theme.bg + "/30 " + theme.border}>`;

code = code.replace(stageListOrig, feedbackBlock);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected progressive targets and feedback!");
