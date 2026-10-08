const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const buildActionOrig = /<span className="opacity-60">Cost:<\/span> \{reqElements\.map\(\(el, i\) => <React\.Fragment key=\{i\}>\{el\} <\/React\.Fragment>\)\}/;
const buildActionNew = `<span className="opacity-60">Requirements:</span> {reqElements.map((el, i) => <React.Fragment key={i}>{el} </React.Fragment>)}
                          {!canAfford && !isBuilt && <span className="text-red-400 ml-auto lowercase">Missing resources. Play challenges!</span>}`;

code = code.replace(buildActionOrig, buildActionNew);
fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Build Action UI!");
