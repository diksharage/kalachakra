const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

if (!content.includes("playSound('event');")) {
    content = content.replace(
        "startAmbience(config.id);",
        "startAmbience(config.id);\n    playSound('event');"
    );
}

// Successful challenge sound
content = content.replace(
    /const handleChallengeAnswer = \(challenge, isCorrect, isBuild, score = 0\) => \{/,
    `const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0) => {
    playSound('ui');
    if (isCorrect) playSound('quest');
    if (!isCorrect) playSound('error');`
);

// Claim rewards sound
content = content.replace(
    /const claimRewards = \(\) => \{/,
    `const claimRewards = () => {
    playSound('achievement');`
);

// Building sound
content = content.replace(
    /const handleBuild = \(item\) => \{/,
    `const handleBuild = (item) => {
    playSound('building');`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
