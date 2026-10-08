const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Kala guide animation
content = content.replace(
  "className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${theme.surface} border ${theme.border}`}",
  "className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${theme.surface} border ${theme.border} hover:animate-pulse-glow transition-all`}"
);

// Level Play button animations
content = content.replace(/active:scale-95 transition-transform/g, 'btn-fx');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content, 'utf8');
console.log('LevelEngine polished.');
