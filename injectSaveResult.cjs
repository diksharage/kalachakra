const fs = require('fs');

let content = fs.readFileSync('src/context/GameContext.jsx', 'utf8');

const newMethod = `
  const saveMiniGameResult = (id, score, stars) => {
    setGameState(prev => {
      const currentResults = prev.miniGameResults || {};
      const previous = currentResults[id] || { score: 0, stars: 0 };
      return {
        ...prev,
        miniGameResults: {
          ...currentResults,
          [id]: { 
            score: Math.max(previous.score, score), 
            stars: Math.max(previous.stars, stars) 
          }
        }
      };
    });
  };

  const completeChallenge`;

if (!content.includes('saveMiniGameResult')) {
  content = content.replace('  const completeChallenge', newMethod);
  content = content.replace('completeChallenge,', 'saveMiniGameResult,\n        completeChallenge,');
  fs.writeFileSync('src/context/GameContext.jsx', content);
  console.log("Injected saveMiniGameResult into GameContext.");
} else {
  console.log("Already injected.");
}
