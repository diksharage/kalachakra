const fs = require('fs');
let content = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');
content = content.replace(/navigate\(`\/level\/\$\{level\.id\}`\)/g, "navigate(`/journey/level/${level.id}`)");
fs.writeFileSync('src/pages/JourneyPage.jsx', content, 'utf8');
