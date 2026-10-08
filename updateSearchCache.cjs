const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

// Use a cache key
const oldCache = `let cachedIndex = null;

export const buildSearchIndex = (t, gameState) => {
  if (cachedIndex) return cachedIndex;`;

const newCache = `let cachedIndex = null;
let cacheKey = null;

export const buildSearchIndex = (t, gameState, currentLanguage) => {
  const currentKey = \`\${currentLanguage}_\${gameState.currentLevel}_\${gameState.unlockedArtifacts?.length}\`;
  if (cachedIndex && cacheKey === currentKey) return cachedIndex;
  cacheKey = currentKey;`;

code = code.replace(oldCache, newCache);

fs.writeFileSync('src/services/searchService.js', code);
console.log("Updated searchService cache logic to support languages!");
