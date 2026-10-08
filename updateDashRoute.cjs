const fs = require('fs');

let code = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// Find the Dashboard Continue Journey button
const continueOrig = /onClick=\{\(\) => navigate\(stats\.journey\.isComplete \? '\/profile' : `\/journey\/level\/\$\{currentLevel\}`\)\}/;
const continueNew = `onClick={() => navigate(stats.journey.isComplete ? '/profile' : (gameState.activeLevelId === currentLevel && gameState.activeLevelState ? \`/journey/level/\${currentLevel}/play\` : \`/journey/level/\${currentLevel}\`))}`;

code = code.replace(continueOrig, continueNew);

fs.writeFileSync('src/pages/DashboardPage.jsx', code);
console.log("Updated Dashboard Resume Routing!");
