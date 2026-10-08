const fs = require('fs');
let content = fs.readFileSync('src/context/GameContext.jsx', 'utf8');

const oldFunc = `  const saveMiniGameResult = (id, score, stars) => {
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
  };`;

const newFunc = `  const saveMiniGameResult = (id, score, stars, variationId = null) => {
    setGameState(prev => {
      const currentResults = prev.miniGameResults || {};
      const previous = currentResults[id] || { score: 0, stars: 0, playedVariations: [] };
      
      const newPlayed = previous.playedVariations ? [...previous.playedVariations] : [];
      if (variationId && !newPlayed.includes(variationId)) {
        newPlayed.push(variationId);
      }
      
      return {
        ...prev,
        miniGameResults: {
          ...currentResults,
          [id]: { 
            score: Math.max(previous.score, score), 
            stars: Math.max(previous.stars, stars),
            playedVariations: newPlayed,
            lastVariation: variationId
          }
        }
      };
    });
  };`;

if (content.includes('score: Math.max(previous.score, score),')) {
  content = content.replace(oldFunc, newFunc);
  fs.writeFileSync('src/context/GameContext.jsx', content);
  console.log("Updated saveMiniGameResult.");
} else {
  console.log("Could not find exact function body, check file.");
}
