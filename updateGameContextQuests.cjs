const fs = require('fs');

let code = fs.readFileSync('src/context/GameContext.jsx', 'utf8');

const oldSaveMiniGame = `  const saveMiniGameResult = (id, score, stars, variationId = null) => {
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

const newSaveMiniGame = `  const saveMiniGameResult = (id, score, stars, variationId = null) => {
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
    
    // Trigger quest progress checks natively
    checkQuestProgress('minigame', id);
    if (stars >= 3) {
      checkQuestProgress('minigame_stars', 3);
    }
  };`;

code = code.replace(oldSaveMiniGame, newSaveMiniGame);
fs.writeFileSync('src/context/GameContext.jsx', code);
console.log("Updated GameContext.jsx for miniGame quest progress tracking.");
