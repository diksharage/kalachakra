const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldMap = `{levelState.builtItems.map(id => {
                              const bItem = buildActions.find(b => b.id === id);
                              if (!bItem) return null;
                              return (
                                <div key={'b'+id} className="flex items-center gap-2 bg-blue-900/20 text-blue-100 p-2 rounded-lg border border-blue-500/30">
                                  <span className="text-xl">{bItem.icon || 'Hammer'}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{bItem.nameKey}</span>
                                </div>
                              );
                           })}`;

const newMap = `{levelState.builtItems.map(id => {
                              const bItem = buildActions.find(b => b.id === id);
                              if (!bItem) return null;
                              return (
                                <div key={'b'+id} className="flex items-center gap-2 bg-blue-500/10 text-content p-2 rounded-lg border border-blue-500/30">
                                  <span className="text-xl">{bItem.icon || 'Hammer'}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{t(bItem.nameKey) || bItem.nameKey}</span>
                                </div>
                              );
                           })}`;

code = code.replace(oldMap, newMap);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated translation and text contrast in Stage 6!");
