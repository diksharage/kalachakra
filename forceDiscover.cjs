const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// I will extract everything between `{type === 'discover' && (` and the next `{type === 'learn' && (`
const parts = code.split("{type === 'learn' && (");

const beforeDiscover = parts[0].split("{type === 'discover' && (")[0];

const newDiscover = `{type === 'discover' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>{data.label}</h3>
                <p className="text-content/90 mb-6 text-lg font-serif">
                  {data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : (data.discoverMessage || "You uncovered something significant here!")}
                </p>
                {data.yields && Object.keys(data.yields).length > 0 && (
                  <div className="mb-6 bg-surface/40 p-3 rounded-xl border border-content/10">
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">Rewards Earned</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Object.entries(data.yields).map(([res, amt]) => (
                        <span key={res} className="bg-gold/10 text-gold px-3 py-1 rounded-lg border border-gold/30 font-bold text-sm">+{amt} {res}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => markDiscovered(data)} className={"px-6 py-3 font-bold rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface " + theme.button}>
                  Collect Artifact & Resources
                </button>
              </>
            )}

            `;

code = beforeDiscover + newDiscover + "{type === 'learn' && (" + parts[1];

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Forced Discover block replacement!");
