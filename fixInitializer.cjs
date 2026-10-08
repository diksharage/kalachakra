const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Fix initializer
code = code.replace(/learning: saved\.learning \|\| \[\],/, 'learning: saved.learning || [],\n        completedChallenges: saved.completedChallenges || [],\n        activeChallengeIds: saved.activeChallengeIds || [],');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Fixed Initializer");
