const fs = require('fs');
let code = fs.readFileSync('src/data/heritageLibrary.js', 'utf8');

// Fix category icons
const iconMap = {
  'artifacts': '🏺',
  'places': '📍',
  'people': '👤',
  'architecture': '🏛️',
  'stories': '📜',
  'culture': '🎭',
  'knowledge': '💡',
  'games': '🎲',
  'crafts': '🧵',
  'preservation': '💾'
};

// Replace category icons in the array
code = code.replace(/\{ id: 'artifacts', icon: '[^']+',/g, "{ id: 'artifacts', icon: '🏺',");
code = code.replace(/\{ id: 'places', icon: '[^']+',/g, "{ id: 'places', icon: '📍',");
code = code.replace(/\{ id: 'people', icon: '[^']+',/g, "{ id: 'people', icon: '👤',");
code = code.replace(/\{ id: 'architecture', icon: '[^']+',/g, "{ id: 'architecture', icon: '🏛️',");
code = code.replace(/\{ id: 'stories', icon: '[^']+',/g, "{ id: 'stories', icon: '📜',");
code = code.replace(/\{ id: 'culture', icon: '[^']+',/g, "{ id: 'culture', icon: '🎭',");
code = code.replace(/\{ id: 'knowledge', icon: '[^']+',/g, "{ id: 'knowledge', icon: '💡',");
code = code.replace(/\{ id: 'games', icon: '[^']+',/g, "{ id: 'games', icon: '🎲',");
code = code.replace(/\{ id: 'crafts', icon: '[^']+',/g, "{ id: 'crafts', icon: '🧵',");
code = code.replace(/\{ id: 'preservation', icon: '[^']+',/g, "{ id: 'preservation', icon: '💾',");

// Fix individual entry icons based on category
const entryIconMap = {
  'hand_axe': '🪨',
  'fire': '🔥',
  'early_pottery': '🏺',
  'harappan_bead': '📿',
  'steatite_seal': '🏷️',
  'great_bath': '🧱',
  'indus_script': '📝',
  'standardized_weight': '⚖️',
  'harappa_city': '🏙️',
  'textiles': '🧵',
  'maritime_cargo': '⚓',
  'punch_marked_coin': '🪙',
  'ashokan_edict': '🏛️',
  'aryabhata': '🔭',
  'gupta_manuscript': '📜',
  'sanchi_stupa': '🛕',
  'ajanta_caves': '⛰️',
  'traditional_dance': '💃',
  'bronze_statue': '🗽',
  'brihadisvara_temple': '🛕',
  'chola_bronze': '🗿',
  'hampi_bazaar': '🏪',
  'stone_chariot': '🛞',
  'jataka_tales': '📖',
  'shadow_puppetry': '🎭',
  'pachisi_board': '🎲',
  'digital_archives': '💾'
};

Object.keys(entryIconMap).forEach(key => {
  const regex = new RegExp(`(id: "${key}",\\s*category: "[^"]+",\\s*level: \\d+,\\s*period: "[^"]+",\\s*region: "[^"]+",\\s*icon: )"[^"]+"`, 'g');
  code = code.replace(regex, `$1"${entryIconMap[key]}"`);
});

fs.writeFileSync('src/data/heritageLibrary.js', code);
console.log("Fixed library icons!");
