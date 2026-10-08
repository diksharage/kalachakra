const fs = require('fs');
let code = fs.readFileSync('src/data/historicalLocations.js', 'utf8');

const iconMap = {
  'bhimbetka_region': '⛰️',
  'mehrgarh_region': '🌾',
  'harappa': '🏙️',
  'mohenjo_daro': '🧱',
  'dholavira': '💧',
  'lothal': '⚓',
  'west_coast_trade': '⛵',
  'magadha_region': '🏛️',
  'taxila_region': '📚',
  'pataliputra_region': '🏰',
  'ujjain_region': '🔭',
  'sanchi': '🛕',
  'ajanta': '⛰️',
  'mahabalipuram': '🗿',
  'thanjavur_region': '🛕',
  'chola_maritime': '⛵',
  'hampi_vijayanagara': '💎'
};

Object.keys(iconMap).forEach(key => {
  const regex = new RegExp(`(id: "${key}",[\\s\\S]*?icon: )"[^"]+"`, 'g');
  code = code.replace(regex, `$1"${iconMap[key]}"`);
});

fs.writeFileSync('src/data/historicalLocations.js', code);
console.log("Fixed garbled icons in historicalLocations!");
