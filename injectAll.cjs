const fs = require('fs');

const levels = [
  { file: 1, key: 'mg_l1_survival', id: 'mg-l1-survival', title: 'Mini-Game: Survival in the Wild' },
  { file: 2, key: 'mg_l2_farming', id: 'mg-l2-farming', title: 'Mini-Game: First Harvest' },
  { file: 3, key: 'mg_l3_artifacts', id: 'mg-l3-artifacts', title: 'Mini-Game: Artifacts of the Indus' },
  { file: 4, key: 'mg_l4_trade', id: 'mg-l4-trade', title: 'Mini-Game: The Meluhha Voyage' },
  { file: 5, key: 'mg_l5_strategy', id: 'mg-l5-strategy', title: 'Mini-Game: Rise of Magadha' },
  { file: 6, key: 'mg_l6_build', id: 'mg-l6-build', title: 'Mini-Game: Ashoka\'s Pillar' },
  { file: 7, key: 'mg_l7_timeline', id: 'mg-l7-timeline', title: 'Mini-Game: Golden Age of Discoveries' },
  { file: 8, key: 'mg_l8_architecture', id: 'mg-l8-architecture', title: 'Mini-Game: Temple Architecture' },
  { file: 9, key: 'mg_l9_culture', id: 'mg-l9-culture', title: 'Mini-Game: Roots of Tradition' },
  { file: 10, key: 'mg_l10_maritime', id: 'mg-l10-maritime', title: 'Mini-Game: Chola Maritime Network' },
  { file: 11, key: 'mg_l11_city', id: 'mg-l11-city', title: 'Mini-Game: City of Victory' },
  { file: 12, key: 'mg_l12_story', id: 'mg-l12-story', title: 'Mini-Game: The Monkey and The Crocodile' },
  { file: 13, key: 'mg_l13_strategy', id: 'mg-l13-strategy', title: 'Mini-Game: The Chaturanga Master' },
  { file: 14, key: 'mg_l14_preserve', id: 'mg-l14-preserve', title: 'Mini-Game: The Archivist\'s Dilemma' }
];

function injectChallenge(file, challengeKey, challengeData) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean up any exact old injected keys to prevent duplicates
  content = content.replace(/mg_indus_artifacts:\s*\{[\s\S]*?\},?\s*/, '');
  content = content.replace(/mg_maurya_timeline:\s*\{[\s\S]*?\},?\s*/, '');
  content = content.replace(/mg_gupta_memory:\s*\{[\s\S]*?\},?\s*/, '');
  content = content.replace(/mg_chola_trade:\s*\{[\s\S]*?\},?\s*/, '');
  content = content.replace(/mg_games_timeline:\s*\{[\s\S]*?\},?\s*/, '');
  
  // Also clean up if this script is run multiple times (clean the new keys)
  const regex = new RegExp(`${challengeKey}:\\s*\\{[\\s\\S]*?\\},?\\s*`);
  content = content.replace(regex, '');

  const insertIndex = content.indexOf('{') + 1;
  const newContent = content.slice(0, insertIndex) + '\n  ' + challengeKey + ': ' + JSON.stringify(challengeData, null, 4) + ',' + content.slice(insertIndex);
  fs.writeFileSync(file, newContent);
  console.log('Injected into ' + file);
}

levels.forEach(lvl => {
  const path = `src/data/level${lvl.file}Challenges.js`;
  if (fs.existsSync(path)) {
    injectChallenge(path, lvl.key, {
      id: lvl.id,
      title: lvl.title,
      format: "minigame",
      reward: { legacy: 30, xp: 100 },
      explanation: "You successfully completed the mini-game scenario!"
    });
  }
});
