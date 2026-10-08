const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(
  /const chal = stage === 4 \? Object\.values\(config\.challenges\)\[0\] : Object\.values\(config\.challenges\)\[1\] \|\| Object\.values\(config\.challenges\)\[0\];/,
  `let chal = Object.values(config.challenges)[1] || Object.values(config.challenges)[0];
                if (stage === 4) chal = Object.values(config.challenges)[0];
                if (stage === 7) {
                  const bAction = getOriginalBuildAction();
                  if (bAction.actionOverride) chal = config.challenges[bAction.actionOverride.id];
                }`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Done phase 5");
