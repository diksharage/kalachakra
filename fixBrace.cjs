const fs = require('fs');
const filesToFix = [3, 6, 7, 10, 13].map(id => `src/data/level${id}Challenges.js`);

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/"xp": 100\n    },/g, '"xp": 100\n    }\n  },');
  
  fs.writeFileSync(file, content);
  console.log(`Fixed closing brace in ${file}`);
});
