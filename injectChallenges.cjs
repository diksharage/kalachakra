const fs = require('fs');

function injectChallenge(file, challengeKey, challengeData) {
  let content = fs.readFileSync(file, 'utf8');
  // Insert at the beginning of the object
  const insertIndex = content.indexOf('{') + 1;
  const newContent = content.slice(0, insertIndex) + '\n  ' + challengeKey + ': ' + JSON.stringify(challengeData, null, 4) + ',' + content.slice(insertIndex);
  fs.writeFileSync(file, newContent);
  console.log('Injected into ' + file);
}

injectChallenge('src/data/level3Challenges.js', 'mg_indus_artifacts', {
  id: "mg-indus-artifacts",
  title: "Mini-Game: Artifacts of the Indus",
  format: "minigame",
  reward: { legacy: 25, bricks: 1 },
  explanation: "You have proven your archaeological expertise by correctly matching the Indus artifacts to their functions!"
});

injectChallenge('src/data/level6Challenges.js', 'mg_maurya_timeline', {
  id: "mg-maurya-timeline",
  title: "Mini-Game: Chronicles of the Mauryas",
  format: "minigame",
  reward: { legacy: 30, stone: 2 },
  explanation: "By arranging the timeline, you reveal the rapid rise and transformation of the Mauryan Empire."
});

injectChallenge('src/data/level7Challenges.js', 'mg_gupta_memory', {
  id: "mg-gupta-memory",
  title: "Mini-Game: Astronomer's Blueprint",
  format: "minigame",
  reward: { legacy: 40, knowledge: 2 },
  explanation: "You successfully recalled the complex layout of the ancient astronomical observatory!"
});

injectChallenge('src/data/level10Challenges.js', 'mg_chola_trade', {
  id: "mg-chola-trade",
  title: "Mini-Game: Maritime Trade Network",
  format: "minigame",
  reward: { legacy: 30, tradeGoods: 2 },
  explanation: "You have successfully managed the vast maritime trade network of the Chola Empire!"
});

injectChallenge('src/data/level13Challenges.js', 'mg_games_timeline', {
  id: "mg-games-timeline",
  title: "Mini-Game: Evolution of Strategy",
  format: "minigame",
  reward: { legacy: 30, strategy: 2 },
  explanation: "You have successfully charted the evolution of traditional Indian board games across the centuries!"
});
