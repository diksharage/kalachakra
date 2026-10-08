const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Update the injection to pass score
content = content.replace(
  `onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild)}`,
  `onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)}`
);

// Update handleChallengeAnswer signature
content = content.replace(
  `const handleChallengeAnswer = (challenge, isCorrect, isBuild) => {`,
  `const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0) => {`
);

// Update XP distribution logic
content = content.replace(
  `if (!isReplay) updateResources({ xp: 50 });`,
  `if (!isReplay) updateResources({ xp: 50 + score }); else if (score > 0) updateResources({ xp: score });`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
console.log("Updated LevelEngine.jsx to grant mastery XP from score.");
