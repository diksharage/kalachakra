const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Regex to remove the old Stage 4 block
const stage4Block = /\{stage === 4 && \(\s*<div className=\{"glass-panel p-5 rounded-2xl border animate-fade-in " \+ theme\.border\}>\s*<h3 className=\{"font-bold text-sm tracking-wider uppercase mb-4 " \+ theme\.primary\}>Available Challenges<\/h3>\s*<div className="flex flex-col gap-3">\s*\{levelState\.activeChallengeIds\.map\(id => allChallenges\.find\(c => c\.id === id\)\)\.filter\(Boolean\)\.map\(\(chal, idx\) => \([\s\S]*?\}<\/div>\s*<\/div>\s*\)\}/;
code = code.replace(stage4Block, '');

// Regex to remove the old Stage 5 block
const stage5Block = /\{stage === 5 && \(\s*<div className=\{"glass-panel p-5 rounded-2xl border animate-fade-in " \+ theme\.border\}>\s*<h3 className=\{"font-bold text-sm tracking-wider uppercase mb-4 " \+ theme\.primary\}>Build Actions<\/h3>\s*<div className="flex flex-col gap-3">\s*\{buildActions\.map\(\(bAction\) => \([\s\S]*?\}<\/div>\s*<\/div>\s*\)\}/;
code = code.replace(stage5Block, '');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Removed redundant sidebar panels!");
