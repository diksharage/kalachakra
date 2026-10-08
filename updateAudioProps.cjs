const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Pass playSound
code = code.replace(/<InteractiveLearnNode data=\{data\} onComplete=\{markLearned\} theme=\{theme\} isYoung=\{isYoung\} \/>/, `<InteractiveLearnNode data={data} onComplete={markLearned} theme={theme} isYoung={isYoung} playSound={playSound} />`);
code = code.replace(/<MatchingGame data=\{data\.game\} onComplete=\{markLearned\} theme=\{theme\} isYoung=\{isYoung\} \/>/, `<MatchingGame data={data.game} onComplete={markLearned} theme={theme} isYoung={isYoung} playSound={playSound} />`);
code = code.replace(/<OrderingGame data=\{data\.game\} onComplete=\{markLearned\} theme=\{theme\} isYoung=\{isYoung\} \/>/, `<OrderingGame data={data.game} onComplete={markLearned} theme={theme} isYoung={isYoung} playSound={playSound} />`);

// Add playSound to props
code = code.replace(/const InteractiveLearnNode = \(\{ data, onComplete, theme, isYoung \}\) => \{/, "const InteractiveLearnNode = ({ data, onComplete, theme, isYoung, playSound }) => {");
code = code.replace(/const MatchingGame = \(\{ data, onComplete, theme, isYoung \}\) => \{/, "const MatchingGame = ({ data, onComplete, theme, isYoung, playSound }) => {");
code = code.replace(/const OrderingGame = \(\{ data, onComplete, theme, isYoung \}\) => \{/, "const OrderingGame = ({ data, onComplete, theme, isYoung, playSound }) => {");

// Add playSound('ui') to clicks in subcomponents
code = code.replace(/const handleOrder = \(chunk\) => \{/, "const handleOrder = (chunk) => {\n    if (playSound) playSound('ui');");
code = code.replace(/const handleRightClick = \(rightItem\) => \{/, "const handleRightClick = (rightItem) => {\n    if (playSound) playSound('ui');");
code = code.replace(/const handleSelect = \(item\) => \{/, "const handleSelect = (item) => {\n    if (playSound) playSound('ui');");

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Passed playSound to subcomponents!");
