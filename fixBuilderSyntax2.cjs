const fs = require('fs');
let lines = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Level 4 - Early Trade')) {
    // The previous non-empty line should be };
    for (let j = i - 1; j >= 0; j--) {
      if (lines[j].trim() === '};') {
        lines[j] = lines[j].replace('};', '},');
        break;
      }
    }
    break;
  }
}

fs.writeFileSync('src/data/civilizationBuilder.js', lines.join('\n'));
console.log("Fixed builder syntax using array loop!");
