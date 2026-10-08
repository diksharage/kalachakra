const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldMapBtn = /<button\s*key=\{loc\.id\}\s*onClick=\{\(\) => handleLocationClick\(loc\)\}\s*disabled=\{!isClickable\}\s*className=\{"flex flex-col items-center justify-center w-36 h-36/;

const newMapBtn = `<button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc)}
                      disabled={!isClickable}
                      aria-label={\`Map Node: \${!isExplored ? 'Unknown Location' : loc.label}. \${!isClickable ? 'Unavailable' : 'Click to interact'}\`}
                      className={"flex flex-col items-center justify-center w-36 h-36`;

code = code.replace(oldMapBtn, newMapBtn);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Added aria-labels to map nodes!");
