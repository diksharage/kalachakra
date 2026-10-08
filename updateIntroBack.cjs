const fs = require('fs');

let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

const backOrig = /<button\s*onClick=\{[^}]+\}\s*className="flex items-center gap-2 text-gold hover:text-content transition-colors mb-8 font-bold text-sm"\s*>\s*<ArrowLeft className="w-4 h-4" \/> BACK TO JOURNEY\s*<\/button>/;
const backNew = `<BackButton fallback="/journey" className="mb-8" />`;

code = code.replace(backOrig, backNew);
fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Updated LevelIntroPage with standardized BackButton!");
