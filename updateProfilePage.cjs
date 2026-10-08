const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

// Fix garbled text
code = code.replace(/Jump In [^<]*</g, 'Jump In <ArrowRight size={16} /> <');

// Inject the Inventory Card
const achievementBlock = `              ) : (
                <p className="text-content/50 italic col-span-2">No achievements earned yet. Start exploring!</p>
              )}
            </div>
          </div>`;

const inventoryBlock = `              ) : (
                <p className="text-content/50 italic col-span-2">No achievements earned yet. Start exploring!</p>
              )}
            </div>
          </div>

          {/* EARNED REWARDS / INVENTORY */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Hexagon className="text-gold"/> Global Inventory</h2>
            <div className="flex flex-wrap gap-3">
              {Object.keys(gameState.inventory || {}).length > 0 ? (
                Object.entries(gameState.inventory).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 bg-surface/40 px-3 py-2 rounded-lg border border-content/10 shadow-sm">
                    <span className="font-bold text-content/90 capitalize text-sm">{k.replace('_', ' ')}</span>
                    <span className="text-gold font-bold bg-gold/10 px-2 py-0.5 rounded text-xs">{v}</span>
                  </div>
                ))
              ) : (
                <p className="text-content/50 italic">No resources gathered yet.</p>
              )}
            </div>
          </div>`;

code = code.replace(achievementBlock, inventoryBlock);

// Import ArrowRight if missing
if (!code.includes('ArrowRight')) {
  code = code.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, ArrowRight } from 'lucide-react';");
}

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Updated ProfilePage with Inventory block and fixed text!");
