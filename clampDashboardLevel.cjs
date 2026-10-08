const fs = require('fs');

let code = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

const clampOrig = /const currentLevel = stats\.journey\.currentLevel;/;
const clampNew = `const currentLevel = Math.min(stats.journey.currentLevel, 14);`;
code = code.replace(clampOrig, clampNew);

fs.writeFileSync('src/pages/DashboardPage.jsx', code);

let widgetCode = fs.readFileSync('src/components/dashboard/DashboardWidgets.jsx', 'utf8');
widgetCode = widgetCode.replace(/const currentLevel = stats\.journey\.currentLevel;/, 'const currentLevel = Math.min(stats.journey.currentLevel, 14);');
fs.writeFileSync('src/components/dashboard/DashboardWidgets.jsx', widgetCode);

console.log("Clamped currentLevel to 14!");
