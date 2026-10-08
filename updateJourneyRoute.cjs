const fs = require('fs');

let code = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');

const navOrig = /if \(isUnlocked\) navigate\(`\/journey\/level\/\$\{level\.id\}`\);/;
const navNew = `if (isUnlocked) {
                    if (gameState.activeLevelId === level.id && gameState.activeLevelState) {
                       navigate(\`/journey/level/\${level.id}/play\`);
                    } else {
                       navigate(\`/journey/level/\${level.id}\`);
                    }
                  }`;

code = code.replace(navOrig, navNew);

fs.writeFileSync('src/pages/JourneyPage.jsx', code);
console.log("Updated JourneyPage direct routing!");
