const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Add playSound('event') on entering a level if it wasn't there
if (!content.includes("playSound('event');")) {
    content = content.replace(
        "startAmbience(config.id);",
        "startAmbience(config.id);\n    playSound('event');"
    );
}

// Successful challenge sound
content = content.replace(
    /const handleChallengeAnswer = \(challenge, isCorrect, isBuild, score = 0\) => \{([\s\S]*?)if \(isCorrect\) \{/m,
    `const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0) => {
    playSound('ui');
    if (isCorrect) {
      playSound('quest');`
);

// Failed challenge sound
content = content.replace(
    /if \(!isCorrect\) \{[\s\S]*?toast\.error\([\s\S]*?\);[\s\S]*?\}/m,
    (match) => {
        if (!match.includes('playSound')) {
             return match.replace("toast.error", "playSound('error');\n      toast.error");
        }
        return match;
    }
);

// Receiving rewards
content = content.replace(
    /const claimRewards = \(\) => \{/m,
    `const claimRewards = () => {
    playSound('achievement');`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
