const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const s6Start = code.indexOf('{stage === 6 ? (');
if (s6Start !== -1) {
   const endStr = '</div>\n          ) : (';
   const s6End = code.indexOf(endStr, s6Start);
   if (s6End !== -1) {
       const newS6 = `{stage === 6 ? (
            <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto">
              {config.id === 14 ? (
                <FinalSequence config={config} onComplete={() => {
                   if (!isReplay) {
                      triggerEventAchievement('preserver_of_the_legacy');
                      updateResources(config.defaultResources);
                      completeLevel(14);
                   }
                   updateActiveLevelState(null, null);
                   navigate('/profile');
                }} />
              ) : (
                <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-10">
                  <Star className={"w-16 h-16 mb-4 animate-pulse-slow " + theme.primary} />
                  <h3 className={"text-3xl md:text-5xl font-serif font-bold mb-2 " + theme.primary}>✓ LEVEL COMPLETE</h3>
                  <p className="text-xl font-bold text-content mb-2">Level {config.id} — {t(\`levels.\${config.id}.title\`, config.title)}</p>
                  <p className="text-content/70 text-sm md:text-base italic mb-8">You have successfully mastered the historical challenges of this era.</p>
                  
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                    <div className={"p-6 rounded-2xl border bg-surface/50 " + theme.border}>
                       <p className={"font-bold mb-4 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Stage Summary</p>
                       <ul className="text-sm space-y-3 font-medium text-content/90">
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> <span>Explore: {levelState.exploration.length}/{targetExplore} locations</span></li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> <span>Discover: {levelState.discovery.length}/{targetDiscover} artifacts</span></li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> <span>Learn: {levelState.learning.length}/{targetLearn} historical notes</span></li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> <span>Play + Solve: {levelState.completedChallenges.length}/{targetChallenges} challenges</span></li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> <span>Build / Manage: {levelState.builtItems.length}/{targetBuilds} structures</span></li>
                       </ul>
                    </div>

                    <div className={"p-6 rounded-2xl border bg-surface/50 " + theme.border}>
                       <p className={"font-bold mb-4 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>{isReplay ? 'Replay Rewards' : 'Rewards & Progress'}</p>
                       <div className="flex flex-col gap-3">
                          {isReplay ? (
                             <span className="px-3 py-2 bg-blue-900/20 text-blue-300 rounded-lg border border-blue-400/20 uppercase tracking-widest text-xs font-bold w-fit">Level Already Completed</span>
                          ) : (
                             <>
                                <span className="px-3 py-2 bg-gold/10 text-gold rounded-lg border border-gold/20 font-bold text-sm flex items-center gap-2 w-fit"><Star className="w-4 h-4" /> +100 Legacy</span>
                                <span className="px-3 py-2 bg-green-900/20 text-green-400 rounded-lg border border-green-500/20 font-bold text-sm flex items-center gap-2 w-fit"><CheckCircle className="w-4 h-4" /> +Level Mastery</span>
                                {config.id === 1 && <span className="px-3 py-2 bg-purple-900/20 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm flex items-center gap-2 w-fit"><Trophy className="w-4 h-4" /> Achievement: Start Journey</span>}
                             </>
                          )}
                       </div>
                    </div>
                  </div>

                  <p className="text-content/80 text-sm mb-6 font-bold uppercase tracking-widest text-green-400">
                    {isReplay ? 'Replay Concluded' : 'Next Level Unlocked!'}
                  </p>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
                    <button 
                      onClick={() => {
                        handleCompleteLevel(); 
                        navigate('/journey');
                      }}
                      className="px-6 py-3 rounded-xl font-bold bg-surface border border-content/20 text-content hover:bg-surface/80 transition-colors w-full md:w-auto"
                    >
                      Return to Journey Map
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleCompleteLevel(); 
                        navigate(\`/journey/level/\${config.id + 1}\`); 
                      }}
                      className={"px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 w-full md:w-auto flex justify-center items-center gap-2 shadow-lg " + theme.bg + " " + theme.border + " " + theme.text}
                    >
                      Continue to Next Level ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (`;
       
       code = code.substring(0, s6Start) + newS6 + code.substring(s6End + endStr.length);
   }
}

// Update handleCompleteLevel
const hcOrig = /const handleCompleteLevel = \(\) => \{\s*if \(!isReplay\) \{\s*if \(config\.id === 1\) triggerEventAchievement\('start_journey'\);\s*if \(config\.id === 14\) triggerEventAchievement\('preserver_of_the_legacy'\);\s*updateResources\(config\.defaultResources\);\s*completeLevel\(config\.id\);\s*\}\s*updateActiveLevelState\(null, null\);\s*navigate\('\/journey'\);\s*\};/;

const hcNew = `const handleCompleteLevel = () => {
    if (!isReplay) {
      if (config.id === 1) triggerEventAchievement('start_journey');
      if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');
      updateResources(config.defaultResources); 
      completeLevel(config.id);
    }
    updateActiveLevelState(null, null);
  };`;

code = code.replace(hcOrig, hcNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Stage 6 updated robustly!");
