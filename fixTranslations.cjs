const fs = require('fs');

let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// Regex to find t('key') || "string" or t('key') || 'string'
// and replace it with t('key', "string")
const regex = /t\((['`"][a-zA-Z0-9_.]+['`"])\)\s*\|\|\s*(["'`][^"'`]+["'`])/g;

const newCode = code.replace(regex, (match, key, fallback) => {
  return `t(${key}, ${fallback})`;
});

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', newCode);
console.log("Fixed translation fallbacks in MiniGameManager.");
