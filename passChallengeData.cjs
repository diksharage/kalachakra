const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Pass the full challenge 'data' as a prop
content = content.replace(
  `<MiniGameManager \n                       gameConfig={minigamesData[data.id]} \n                       theme={theme} \n                      onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)} \n                     />`,
  `<MiniGameManager 
                       gameConfig={minigamesData[data.id]} 
                       challengeData={data}
                       theme={theme} 
                      onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)} 
                     />`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
console.log("Passed challengeData to MiniGameManager.");
