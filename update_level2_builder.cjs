const fs = require('fs');
let content = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

content = content.replace(
  /\{ id: "l2_crops", category: "Agriculture", nameKey: "Wheat Field", descKey: "Clear land and plant early domesticated wheat.", requirements: \{ materials: 1, water: 1 \}, effects: \{ food_production: 2 \}, icon: "dYO_" \}/,
  `{ id: "l2_crops", category: "Agriculture", nameKey: "Wheat Field", descKey: "Clear land and plant early domesticated wheat.", requirements: { wild_seeds: 2, fertile_soil: 1, water: 1 }, effects: { food_production: 2 }, icon: "🌾" }`
);

content = content.replace(
  /\{ id: "l2_storage", category: "Storage", nameKey: "Clay Granary", descKey: "Build a sealed granary using early pottery techniques.", requirements: \{ materials: 2, food: 1 \}, effects: \{ storage_capacity: 3 \}, icon: "dY\?\" \}/,
  `{ id: "l2_storage", category: "Storage", nameKey: "Clay Granary", descKey: "Build a sealed granary using early pottery techniques.", requirements: { clay_pots: 2, harvested_grain: 1 }, effects: { storage_capacity: 3 }, icon: "🏺" }`
);

content = content.replace(
  /\{ id: "l2_settlement", category: "Settlement", nameKey: "Mudbrick House", descKey: "Construct a permanent dwelling.", requirements: \{ materials: 2, water: 1 \}, effects: \{ community_capacity: 2 \}, icon: "dY \" \}/,
  `{ id: "l2_settlement", category: "Settlement", nameKey: "Mudbrick House", descKey: "Construct a permanent dwelling.", requirements: { mudbrick: 2, tools: 1 }, effects: { community_capacity: 2 }, icon: "🛖" }`
);

fs.writeFileSync('src/data/civilizationBuilder.js', content);
