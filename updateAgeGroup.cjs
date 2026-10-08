const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Add ageGroup to props
code = code.replace(/const InteractiveLearnNode = \(\{ data, onComplete, theme, isYoung, playSound \}\) => \{/, "const InteractiveLearnNode = ({ data, onComplete, theme, isYoung, playSound, ageGroup }) => {");

// Pass ageGroup when rendering
code = code.replace(/<InteractiveLearnNode data=\{data\} onComplete=\{\(\) => markLearned\(data\)\} theme=\{theme\} isYoung=\{isYoung\} playSound=\{playSound\} \/>/g, 
  `<InteractiveLearnNode data={data} onComplete={() => markLearned(data)} theme={theme} isYoung={isYoung} playSound={playSound} ageGroup={ageGroup} />`);

// Use ageGroup in extraction
code = code.replace(/const fullText = data\.getLearnMessage \? data\.getLearnMessage\(isYoung \? '6-8' : '12-14'\) : \(data\.discoverMessage \|\| data\.description \|\| "Historical context missing\."\);/, 
  `const fullText = data.getLearnMessage ? data.getLearnMessage(ageGroup) : (data.discoverMessage || data.description || "Historical context missing.");`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated InteractiveLearnNode with ageGroup prop!");
