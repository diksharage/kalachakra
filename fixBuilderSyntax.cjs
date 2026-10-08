const fs = require('fs');
let code = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

code = code.replace(
  /\]\s*\};\s*\/\/\s*Level 4 - Early Trade/,
  ']\n  },\n\n  // Level 4 - Early Trade'
);

fs.writeFileSync('src/data/civilizationBuilder.js', code);
console.log("Fixed syntax error in civilizationBuilder.js");
