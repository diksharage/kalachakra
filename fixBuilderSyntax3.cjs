const fs = require('fs');
let lines = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8').split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('export const getBuilderDataForLevel')) {
    // Insert }; just before this line
    lines.splice(i, 0, '};');
    break;
  }
}

fs.writeFileSync('src/data/civilizationBuilder.js', lines.join('\n'));
console.log("Added missing }; before export");
