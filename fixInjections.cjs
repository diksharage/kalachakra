const fs = require('fs');
const filesToFix = [3, 6, 7, 10, 13].map(id => `src/data/level${id}Challenges.js`);

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match `  "explanation": "..."\n},\n` and remove it
  content = content.replace(/\s*"explanation":\s*"[^"]*"\n\},/g, '');
  fs.writeFileSync(file, content);
  console.log(`Fixed ${file}`);
});
