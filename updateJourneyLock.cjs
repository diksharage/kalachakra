const fs = require('fs');

let code = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');

// Ensure notify is extracted
const hookOrig = /const \{ gameState \} = useGame\(\);/;
const hookNew = `const { gameState, notify } = useGame();`;
code = code.replace(hookOrig, hookNew);

// Add locked click logic
const clickOrig = /if \(isUnlocked\) \{\s*if \(gameState\.activeLevelId === level\.id && gameState\.activeLevelState\) \{\s*navigate\(`\/journey\/level\/\$\{level\.id\}\/play`\);\s*\} else \{\s*navigate\(`\/journey\/level\/\$\{level\.id\}`\);\s*\}\s*\}/;

const clickNew = `if (isUnlocked) {
                      if (gameState.activeLevelId === level.id && gameState.activeLevelState) {
                         navigate(\`/journey/level/\${level.id}/play\`);
                      } else {
                         navigate(\`/journey/level/\${level.id}\`);
                      }
                    } else {
                      notify('ERROR', 'Level Locked', \`Complete Level \${level.id - 1} to unlock this era.\`);
                    }`;
code = code.replace(clickOrig, clickNew);

// Also render a small text in the card for clarity
const lockedTextOrig = /\{!isUnlocked && <Lock className="w-6 h-6 text-\[#625B4A\]" \/>\}/;
const lockedTextNew = `{!isUnlocked && (
                        <div className="flex flex-col items-end">
                          <Lock className="w-6 h-6 text-[#625B4A] mb-1" />
                          <span className="text-[10px] text-[#625B4A] uppercase font-bold tracking-widest hidden md:block">Requires Lvl {level.id - 1}</span>
                        </div>
                      )}`;
code = code.replace(lockedTextOrig, lockedTextNew);

fs.writeFileSync('src/pages/JourneyPage.jsx', code);
console.log("Updated JourneyPage locked level interaction!");
