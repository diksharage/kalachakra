const fs = require('fs');
let content = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

// Remove the Continue Journey button from the header
content = content.replace(
  /\{\!isComplete && \([\s\S]*?<\/button>\s*\)\}/m,
  ""
);

// Remove the active level state block in the Journey Progress area
content = content.replace(
  /\{gameState\.activeLevelState && gameState\.activeLevelId === currentLevel && \([\s\S]*?<\/div>\s*\)\}/m,
  ""
);

fs.writeFileSync('src/pages/ProfilePage.jsx', content);
