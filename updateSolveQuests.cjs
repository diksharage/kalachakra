const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(
  "globalCompleteChallenge(challenge.id);",
  "globalCompleteChallenge(challenge.id);\n            checkQuestProgress('solve', challenge.id);"
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected checkQuestProgress('solve', ...) into LevelEngine.jsx");
