const fs = require('fs');

for (let i = 1; i <= 14; i++) {
  const filePath = `src/data/level${i}Challenges.js`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing comma between "minigame" and "explanation" or other keys
    content = content.replace(/"format":\s*"minigame"\s*"/g, '"format": "minigame",\n    "');
    
    fs.writeFileSync(filePath, content);
  }
}
console.log("Fixed missing commas in challenge files.");
