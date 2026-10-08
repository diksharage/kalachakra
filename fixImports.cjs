const fs = require('fs');
let lines = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8').split('\n');

// Drop the first block of imports up to the blank line before the second block
let newLines = lines.slice(11);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', newLines.join('\n'));
console.log("Fixed duplicate imports");
