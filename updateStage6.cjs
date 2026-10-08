const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldStage6 = `{stage === 6 ? (
              <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto">
                {config.id === 14 ? (
                  <FinalSequence config={config} onComplete={() => {
                     if (!isReplay) {
                        triggerEventAchievement('preserver_of_the_legacy');
                        completeLevel(14);
                     }
                     updateActiveLevelState(null, null);
                     navigate('/profile');
                  }} />
                ) : (
                  <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-10">
                    <Star className={"w-16 h-16 mb-4 animate-pulse-slow " + theme.primary} />
                    <h3 className={"flex items-center gap-4 text-3xl md:text-5xl font-serif font-bold mb-2 " + theme.primary}><CheckCircle className="w-10 h-10" /> LEVEL COMPLETE</h3>
                    <p className="text-xl font-bold text-content mb-2">Level {config.id} ?" {t(\`levels.\${config.id}.title\`, config.title)}</p>
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
                        className={"px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 w-full md:w-auto shadow-lg " + theme.button}
                      >
                        Continue to Next Level
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) :`;

const flexOldStage = /\{stage === 6 \? \([\s\S]*?\}[\s\S]*?<\/div>\s*\) :\s*\(/;

const newStage6 = `{stage === 6 ? (
              <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto w-full">
                {config.id === 14 ? (
                  <FinalSequence config={config} onComplete={() => {
                     if (!isReplay) {
                        triggerEventAchievement('preserver_of_the_legacy');
                        completeLevel(14);
                     }
                     updateActiveLevelState(null, null);
                     navigate('/profile');
                  }} />
                ) : (
                  <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-10">
                    <Star className={"w-16 h-16 mb-4 animate-pulse-slow " + theme.primary} />
                    <h3 className={"flex items-center gap-4 text-3xl md:text-5xl font-serif font-bold mb-2 " + theme.primary}><CheckCircle className="w-10 h-10" /> LEVEL COMPLETE</h3>
                    <p className="text-xl font-bold text-content mb-2">Level {config.id} — {t(\`levels.\${config.id}.title\`, config.title)}</p>
                    <p className="text-content/70 text-sm md:text-base italic mb-8">You have successfully mastered the historical challenges of this era.</p>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
                      
                      {/* Compact Stage Summary */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 flex flex-col " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Stages Cleared</p>
                         <ul className="text-sm space-y-2 font-medium text-content/90 flex-1">
                            <li className="flex items-center justify-between"><span>Explore</span> <span className="text-green-400">{levelState.exploration.length}/{targetExplore}</span></li>
                            <li className="flex items-center justify-between"><span>Discover</span> <span className="text-green-400">{levelState.discovery.length}/{targetDiscover}</span></li>
                            <li className="flex items-center justify-between"><span>Learn</span> <span className="text-green-400">{levelState.learning.length}/{targetLearn}</span></li>
                            <li className="flex items-center justify-between"><span>Solve</span> <span className="text-green-400">{levelState.completedChallenges.length}/{targetChallenges}</span></li>
                            <li className="flex items-center justify-between"><span>Build</span> <span className="text-green-400">{levelState.builtItems.length}/{targetBuilds}</span></li>
                         </ul>
                      </div>

                      {/* Important Discoveries & Buildings */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 flex flex-col lg:col-span-2 " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Heritage Discovered & Built</p>
                         <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[200px] hide-scrollbar">
                           {levelState.discovery.map(id => {
                              const loc = locations.find(l => l.id === id);
                              if (!loc) return null;
                              return (
                                <div key={'d'+id} className="flex items-center gap-2 bg-surface p-2 rounded-lg border border-content/10">
                                  <span className="text-xl">{loc.icon}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{loc.label}</span>
                                </div>
                              );
                           })}
                           {levelState.builtItems.map(id => {
                              const bItem = buildActions.find(b => b.id === id);
                              if (!bItem) return null;
                              return (
                                <div key={'b'+id} className="flex items-center gap-2 bg-blue-900/20 text-blue-100 p-2 rounded-lg border border-blue-500/30">
                                  <span className="text-xl">{bItem.icon || 'Hammer'}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{bItem.nameKey}</span>
                                </div>
                              );
                           })}
                         </div>
                      </div>

                      {/* Actual Rewards Earned */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 md:col-span-2 lg:col-span-3 " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>{isReplay ? 'Replay Rewards' : 'Rewards & Achievements'}</p>
                         <div className="flex flex-wrap gap-3">
                            {isReplay ? (
                               <span className="px-3 py-2 bg-blue-900/20 text-blue-300 rounded-lg border border-blue-400/20 uppercase tracking-widest text-xs font-bold">Level Already Completed (Global inventory preserved)</span>
                            ) : (
                               <>
                                  <span className="px-3 py-2 bg-gold/10 text-gold rounded-lg border border-gold/20 font-bold text-sm flex items-center gap-2"><Star className="w-4 h-4" /> +100 Legacy Points</span>
                                  <span className="px-3 py-2 bg-green-900/20 text-green-400 rounded-lg border border-green-500/20 font-bold text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Era Mastered</span>
                                  {config.id === 1 && <span className="px-3 py-2 bg-purple-900/20 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4" /> Achievement: Start Journey</span>}
                                  {config.id === 14 && <span className="px-3 py-2 bg-purple-900/20 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4" /> Achievement: Preserver of the Legacy</span>}
                               </>
                            )}
                         </div>
                      </div>

                    </div>
  
                    <p className="text-content/80 text-sm mb-6 font-bold uppercase tracking-widest text-green-400 animate-pulse-slow">
                      {isReplay ? 'Replay Concluded' : \`Next Unlocked: Level \${config.id + 1}\`}
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
                      <button 
                        onClick={() => {
                          handleCompleteLevel(); 
                          navigate('/journey');
                        }}
                        className="px-6 py-3 rounded-xl font-bold bg-surface border border-content/20 text-content hover:bg-surface/80 transition-colors w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-content"
                      >
                        Return to Journey Map
                      </button>
                      <button 
                        onClick={() => {
                          handleCompleteLevel(); 
                          navigate(\`/journey/level/\${config.id + 1}\`);
                        }}
                        className={"px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 w-full md:w-auto shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-gold " + theme.button}
                      >
                        Continue to Next Level <ArrowRight className="w-5 h-5 inline ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (`;

code = code.replace(flexOldStage, newStage6);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Stage 6 UI!");
