const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/DashboardWidgets.jsx', 'utf8');

// The corrupted icons are in the JourneyProgressCard block
const badBlock = `                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg">{level}</span>
                  {isCompleted && <span className="text-emerald-500">A"?o</span>}
                  {isLocked && <span className="text-content/30">A,???T</span>}
                  {isCurrent && <span className="animate-pulse text-gold">A??T</span>}
                </div>`;

const goodBlock = `                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg text-content/70">LVL {level}</span>
                  {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isLocked && <Lock className="w-5 h-5 text-content/30 shrink-0" />}
                  {isCurrent && <MapPin className="w-5 h-5 animate-bounce text-gold shrink-0" />}
                </div>`;

code = code.replace(badBlock, goodBlock);

fs.writeFileSync('src/components/dashboard/DashboardWidgets.jsx', code);
console.log("Fixed corrupted icons in JourneyProgressCard!");
