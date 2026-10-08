const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Pass ageGroup to MiniGameManager
content = content.replace(
  `challengeData={data}\n                       theme={theme}`,
  `challengeData={data}\n                       theme={theme}\n                       ageGroup={ageGroup}`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
console.log("Passed ageGroup to MiniGameManager.");
