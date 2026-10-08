const fs = require('fs');
let content = fs.readFileSync('src/pages/InventoryPage.jsx', 'utf8');

// I'll just remove the entire glass-panel containing Legacy
// by finding the exact string
content = content.replace(
  /<div className=\{\`glass-panel px-6 py-4 rounded-xl border flex gap-6 \$\{theme === 'light' \? 'bg-surface border-gold\/30' : 'bg-surface\/50 border-content\/10'\}\`\}>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  ""
);

fs.writeFileSync('src/pages/InventoryPage.jsx', content);
