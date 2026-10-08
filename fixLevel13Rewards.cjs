const fs = require('fs');

let code = fs.readFileSync('src/data/level13Challenges.js', 'utf8');

// Replace Pachisi puzzle missing reward
code = code.replace(
  "explanation: \"While movement is determined by chance (dice/cowries), Pachisi is deeply strategic.",
  "reward: { strategy: 1, pieces: 1 },\n    explanation: \"While movement is determined by chance (dice/cowries), Pachisi is deeply strategic."
);

// Replace regional puzzle missing reward
code = code.replace(
  "explanation: \"There is rarely one 'true' historical version of a traditional game.",
  "reward: { knowledge: 1, community: 1 },\n    explanation: \"There is rarely one 'true' historical version of a traditional game."
);

// Replace preserve puzzle missing reward
code = code.replace(
  "explanation: \"Games exist to be played.",
  "reward: { preservation: 2, knowledge: 1 },\n    explanation: \"Games exist to be played."
);

// Replace skill puzzle missing reward
code = code.replace(
  "explanation: \"Physical games were not merely recess activities; they were structured combat and hunting simulations.",
  "reward: { skill: 1 },\n    explanation: \"Physical games were not merely recess activities; they were structured combat and hunting simulations."
);

fs.writeFileSync('src/data/level13Challenges.js', code);
console.log("Fixed missing rewards in Level 13 Challenges!");
