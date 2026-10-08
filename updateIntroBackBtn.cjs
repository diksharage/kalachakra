const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelIntroPage.jsx', 'utf8');

code = code.replace(/<BackButton fallback="\/journey" className="mb-8" \/>/, "");

fs.writeFileSync('src/pages/LevelIntroPage.jsx', code);
console.log("Cleaned up duplicated BackButton on Intro Page!");
