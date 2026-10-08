const fs = require('fs');
let lines = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8').split('\n');
for(let i=0; i<lines.length; i++) {
  if (lines[i].indexOf('onClick={() => navigate(stats.journey.isComplete') !== -1) {
     lines[i] = "            onClick={() => navigate(stats.journey.isComplete ? '/profile' : `/journey/level/${currentLevel}`)}";
  }
}
fs.writeFileSync('src/pages/DashboardPage.jsx', lines.join('\n'), 'utf8');
