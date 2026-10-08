const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Add buildChoice state
code = code.replace(
  "const [lockToast, setLockToast] = useState(null);",
  "const [lockToast, setLockToast] = useState(null);\n  const [buildChoice, setBuildChoice] = useState(null);"
);

// 2. Update setBuilderPopup logic
code = code.replace(
  "setBuilderPopup={(bAction) => setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: bAction } }))}",
  "setBuilderPopup={(bAction) => {\n                  setBuildChoice(bAction.choices ? bAction.choices[0].id : null);\n                  setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: bAction } }));\n                }}"
);

// 3. Update confirm_build rendering
const oldConfirmBuildRegex = /\{\s*type === 'confirm_build' && \(\(\) => \{[\s\S]*?\}\(\)\)\s*\}/m;

const newConfirmBuild = `{type === 'confirm_build' && (() => {
              const currentChoice = data.choices ? data.choices.find(c => c.id === buildChoice) : null;
              const reqs = currentChoice ? currentChoice.requirements : (data.requirements || {});
              const effects = currentChoice ? currentChoice.effects : (data.effects || {});
              
              let canAfford = true;
              Object.keys(reqs).forEach(k => {
                 if ((resources[k] || 0) < reqs[k]) canAfford = false;
              });

              return (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{t(data.nameKey) || data.nameKey}</h3>
                <p className="text-content/80 mb-6">{adaptTextForAge(t(data.descKey) || data.descKey, ageGroup)}</p>
                
                {data.choices && (
                  <div className="flex flex-col gap-3 mb-6">
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70 text-gold text-left">Strategic Decision</p>
                    {data.choices.map(choice => (
                      <button 
                        key={choice.id}
                        onClick={() => setBuildChoice(choice.id)}
                        className={"p-3 border rounded-xl text-left transition-all " + (buildChoice === choice.id ? theme.bg + " border-gold" : "bg-surface/20 border-content/10 hover:border-content/30")}
                      >
                        <p className="font-bold">{choice.label}</p>
                        <p className="text-xs opacity-80 mt-1">{choice.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4 mb-8 text-left w-full justify-between">
                  
                  {/* Requirements Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-3 text-red-400">Required Resources</p>
                     {Object.keys(reqs).length === 0 ? <span className="text-sm opacity-60">None</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(reqs).map(([k, v]) => {
                           const has = resources[k] || 0;
                           const isMet = has >= v;
                           return (
                             <div key={k} className="flex justify-between items-center text-sm">
                               <span className="font-bold">{k}</span>
                               <span className={isMet ? "text-green-400" : "text-red-400 font-bold"}>{has} / {v}</span>
                             </div>
                           )
                         })}
                       </div>
                     )}
                  </div>

                  {/* Effects Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-3 text-green-400">Project Outcome</p>
                     {(!effects || Object.keys(effects).length === 0) ? <span className="text-sm opacity-60">Milestone Completed</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(effects).map(([k, v]) => (
                           <div key={k} className="flex justify-between items-center text-sm">
                             <span className="font-bold">{k.replace('_', ' ')}</span>
                             <span className="text-green-400 font-bold">+{v}</span>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>
                  
                </div>
                
                {!canAfford && (
                  <p className="text-red-400 text-sm font-bold mb-4 bg-red-900/20 py-2 rounded-lg border border-red-500/30">
                    You do not have enough resources for this strategy!
                  </p>
                )}

                <div className="flex justify-between gap-4">
                  <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))} className="px-6 py-3 font-bold rounded-xl w-full border border-content/20 hover:bg-surface/50 focus:outline-none focus:ring-2 focus:ring-content">
                    Cancel
                  </button>
                  <button 
                    disabled={!canAfford}
                    onClick={() => {
                       playSound('building');
                       const newResources = { ...resources };
                       if (reqs) {
                          Object.keys(reqs).forEach(k => {
                            newResources[k] = Math.max(0, (newResources[k] || 0) - reqs[k]);
                          });
                       }
                       setLevelState(prev => {
                         const next = { 
                           ...prev, 
                           resources: newResources, 
                           builtItems: [...prev.builtItems, data.id], 
                           decisions: [...(prev.decisions || []), ...(currentChoice ? [currentChoice.id] : [])],
                           activePopup: null 
                         };
                         next.stage = checkStageProgression(next);
                         return next;
                       });
                       let effectStrings = [];
                       if (effects) {
                         Object.keys(effects).forEach(k => effectStrings.push(\`+\${effects[k]} \${k.replace('_', ' ')}\`));
                       }
                       notify('BUILD', 'Building Constructed!', effectStrings.length > 0 ? \`Produced: \${effectStrings.join(', ')}\` : \`Consumed required resources.\`, { icon: '🔨' });
                    }} 
                    className={"px-6 py-3 font-bold rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface transition-all " + (canAfford ? theme.button : "opacity-50 cursor-not-allowed bg-surface/30 border-transparent text-content/50")}
                  >
                    Confirm Build
                  </button>
                </div>
              </>
            );
          })()}`;

code = code.replace(oldConfirmBuildRegex, newConfirmBuild);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected choice logic into LevelEngine!");
