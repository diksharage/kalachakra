const fs = require('fs');
let content = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

const regex = /2: \{\s*gridSize: \{ cols: 5, rows: 5 \},\s*terrain: \{ water: \[2, 3, 4\] \},\s*categories: \["Agriculture", "Storage", "Settlement"\],\s*buildings: \[[\s\S]*?\]\s*\}/;

const newBlock = `2: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [2, 3, 4] },
    categories: ["Agriculture", "Storage", "Settlement"],
    buildings: [
      { id: "l2_crops", category: "Agriculture", nameKey: "Wheat Field", descKey: "Clear land and plant early domesticated wheat.", requirements: { wild_seeds: 2, fertile_soil: 1, water: 1 }, effects: { food_production: 2 }, icon: "🌾" },
      { id: "l2_storage", category: "Storage", nameKey: "Clay Granary", descKey: "Build a sealed granary using early pottery techniques.", requirements: { clay_pots: 2, harvested_grain: 1 }, effects: { storage_capacity: 3 }, icon: "🏺" },
      { id: "l2_settlement", category: "Settlement", nameKey: "Mudbrick House", descKey: "Construct a permanent dwelling.", requirements: { mudbrick: 2, tools: 1 }, effects: { community_capacity: 2 }, icon: "🛖" }
    ]
  }`;

content = content.replace(regex, newBlock);

fs.writeFileSync('src/data/civilizationBuilder.js', content);
