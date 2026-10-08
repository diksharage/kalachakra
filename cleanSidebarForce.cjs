const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Find start of Stage 4 UI
const s4Header = '{stage === 4 && (\\n              <div className={"glass-panel p-5 rounded-2xl border animate-fade-in " + theme.border}>';

// I will just use regex to remove everything between {stage === 4 && ( ... up to the next {stage === 5 && (
const regex4 = /\{stage === 4 && \(\s*<div className=\{"glass-panel[\s\S]*?\{stage === 5 && \(/;
code = code.replace(regex4, '{stage === 5 && (');

const regex5 = /\{stage === 5 && \(\s*<div className=\{"glass-panel[\s\S]*?\{stage === 6 \? \(/;
code = code.replace(regex5, '{stage === 6 ? (');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Removed UI panels successfully.");
