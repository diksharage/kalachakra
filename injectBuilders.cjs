const fs = require('fs');

const additions = `
  // Level 4 - Early Trade
  4: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [2, 7, 12, 17, 22] },
    categories: ["Logistics", "Trade", "Navigation"],
    buildings: [
      { id: "l4_port", category: "Navigation", nameKey: "Coastal Port", descKey: "Establish a safe harbor for maritime vessels.", requirements: { materials: 2, capacity: 1 }, effects: { cargo_space: 2 }, icon: "⛵" },
      { id: "l4_market", category: "Trade", nameKey: "Trade Hub", descKey: "A centralized location for inland and coastal exchange.", requirements: { tradeGoods: 2, supplies: 1 }, effects: { revenue: 2 }, icon: "⚖️" },
      { id: "l4_storage", category: "Logistics", nameKey: "Warehouse", descKey: "Safely store cargo and trade goods.", requirements: { materials: 2 }, effects: { capacity: 3 }, icon: "📦" }
    ]
  },
  // Level 7 - Gupta Period & Knowledge
  7: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [0, 1, 2] },
    categories: ["Education", "Observation", "Preservation"],
    buildings: [
      { id: "l7_academy", category: "Education", nameKey: "Learning Center", descKey: "Establish a center for mathematics and philosophy.", requirements: { materials: 2, time: 1 }, effects: { knowledge_generation: 2 }, icon: "🏫" },
      { id: "l7_observatory", category: "Observation", nameKey: "Astronomical Observatory", descKey: "Track celestial movements and record planetary data.", requirements: { materials: 1, knowledge: 2 }, effects: { observation_accuracy: 2 }, icon: "🔭" },
      { id: "l7_library", category: "Preservation", nameKey: "Manuscript Archive", descKey: "Safeguard treatises and scholarly works.", requirements: { storage: 2, materials: 1 }, effects: { knowledge_preservation: 3 }, icon: "📚" }
    ]
  },
  // Level 8 - Indian Architecture
  8: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [12, 13, 14] },
    categories: ["Engineering", "Artistry", "Infrastructure"],
    buildings: [
      { id: "l8_temple", category: "Engineering", nameKey: "Stone Temple", descKey: "Construct a massive structural temple.", requirements: { stone: 3, tools: 1 }, effects: { cultural_influence: 3 }, icon: "🛕" },
      { id: "l8_rockcut", category: "Artistry", nameKey: "Rock-cut Cave", descKey: "Carve exquisite sanctuaries directly into the rock face.", requirements: { stone: 2, skill: 2 }, effects: { artistry: 2 }, icon: "⛰️" },
      { id: "l8_stepwell", category: "Infrastructure", nameKey: "Stepwell", descKey: "Engineered deep water access and storage.", requirements: { stone: 2, effort: 1 }, effects: { capacity: 2 }, icon: "💧" }
    ]
  },
  // Level 9 - Indian Cultural Traditions
  9: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [4, 9, 14] },
    categories: ["Arts", "Community", "Heritage"],
    buildings: [
      { id: "l9_stage", category: "Arts", nameKey: "Performance Stage", descKey: "A venue for classical dance and music.", requirements: { materials: 2, tradition: 1 }, effects: { culture: 2 }, icon: "🎭" },
      { id: "l9_plaza", category: "Community", nameKey: "Festival Plaza", descKey: "Open space for communal gatherings and celebrations.", requirements: { community: 2, materials: 1 }, effects: { cohesion: 2 }, icon: "🎪" },
      { id: "l9_workshop", category: "Heritage", nameKey: "Artisan Workshop", descKey: "Support local craftspeople and textile weavers.", requirements: { materials: 1, knowledge: 1 }, effects: { preservation: 2 }, icon: "🧶" }
    ]
  },
  // Level 12 - Stories, Literature & Folk Arts
  12: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [20, 21, 22] },
    categories: ["Performance", "Archive", "Public Space"],
    buildings: [
      { id: "l12_theatre", category: "Performance", nameKey: "Puppet Theatre", descKey: "A traveling or permanent stage for shadow and string puppetry.", requirements: { materials: 2, community: 1 }, effects: { expression: 2 }, icon: "🎪" },
      { id: "l12_archive", category: "Archive", nameKey: "Palm-Leaf Library", descKey: "Store and copy vulnerable epic manuscripts.", requirements: { materials: 1, knowledge: 2 }, effects: { preservation: 3 }, icon: "📜" },
      { id: "l12_square", category: "Public Space", nameKey: "Storyteller's Circle", descKey: "A dedicated gathering space for oral traditions.", requirements: { community: 2, stories: 1 }, effects: { audience: 2 }, icon: "🗣️" }
    ]
  },
  // Level 13 - Traditional Indian Games
  13: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [0, 24] },
    categories: ["Recreation", "Training", "Community"],
    buildings: [
      { id: "l13_board", category: "Recreation", nameKey: "Pachisi Courtyard", descKey: "A beautiful courtyard for strategic board games.", requirements: { materials: 2, pieces: 1 }, effects: { strategy: 2 }, icon: "🎲" },
      { id: "l13_arena", category: "Training", nameKey: "Kabaddi Arena", descKey: "A sandy playing field for physical sports.", requirements: { community: 2, skill: 1 }, effects: { physical_health: 2 }, icon: "🏃" },
      { id: "l13_hall", category: "Community", nameKey: "Game Hall", descKey: "A place to preserve and teach ancient abstract games.", requirements: { knowledge: 2, materials: 1 }, effects: { preservation: 3 }, icon: "🏛️" }
    ]
  },`;

let code = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

const insertPos = code.lastIndexOf('};');
code = code.slice(0, insertPos) + additions + '\n' + code.slice(insertPos);

fs.writeFileSync('src/data/civilizationBuilder.js', code);
console.log("Added missing builder levels!");
