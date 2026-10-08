const fs = require('fs');

for (let i = 1; i <= 14; i++) {
  const filePath = `src/data/level${i}Challenges.js`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to remove the "reward": { "legacy": 30, "xp": 100 } block from the minigame
    content = content.replace(/"reward":\s*\{\s*"legacy":\s*\d+,\s*"xp":\s*\d+\s*\}/, '');
    
    // Also remove the trailing comma if it left one
    content = content.replace(/"format":\s*"minigame",\s*,/, '"format": "minigame"');
    content = content.replace(/"format":\s*"minigame"\s*,(\s*)\}/, '"format": "minigame"$1}');

    fs.writeFileSync(filePath, content);
  }
}
console.log("Removed hardcoded legacy/xp rewards to enable dynamic resource auto-grant for building.");
