const fs = require('fs');

let code = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

// Add level 5 data
const level5Data = `  5: {
    gridSize: { cols: 6, rows: 5 },
    terrain: { water: [0, 6, 12] },
    categories: ["Agriculture", "Military", "Administration"],
    buildings: [
      {
        id: "maha_farm",
        category: "Agriculture",
        nameKey: "Iron Plow Farm",
        descKey: "Utilize iron tools for deep plowing.",
        requirements: { tools: 1, wood: 1 },
        effects: { food_production: 3 },
        icon: "🌾"
      },
      {
        id: "maha_fort",
        category: "Military",
        nameKey: "Palisade Fort",
        descKey: "Defend the capital with a timber wall.",
        requirements: { wood: 3, tools: 1 },
        effects: { defense: 4 },
        icon: "🪵"
      },
      {
        id: "maha_guild",
        category: "Administration",
        nameKey: "Merchant Guild (Shreni)",
        descKey: "Organize artisans and merchants.",
        requirements: { wealth: 2, tools: 1 },
        effects: { trade_efficiency: 3 },
        icon: "⚖️"
      }
    ]
  },`;

code = code.replace('  // Level 6 - Mauryan Empire', level5Data + '\n  // Level 6 - Mauryan Empire');

// Add level 10 data
const level10Data = `  10: {
    gridSize: { cols: 6, rows: 6 },
    terrain: { water: [30, 31, 32, 33, 34, 35] },
    categories: ["Water", "Temple", "Trade", "Navy"],
    buildings: [
      {
        id: "chola_tank",
        category: "Water",
        nameKey: "Eri (Irrigation Tank)",
        descKey: "Vast local reservoir managed by village assemblies.",
        requirements: { stone: 2, tools: 1 },
        effects: { food_production: 4 },
        icon: "🌊"
      },
      {
        id: "chola_temple",
        category: "Temple",
        nameKey: "Brihadeeswara Foundation",
        descKey: "A massive center of redistribution, art, and worship.",
        requirements: { stone: 4, wealth: 2 },
        effects: { culture: 5, administrative_control: 3 },
        icon: "🛕"
      },
      {
        id: "chola_guild",
        category: "Trade",
        nameKey: "Ayyavole Guild Hall",
        descKey: "Headquarters for international merchant networks.",
        requirements: { wealth: 3 },
        effects: { trade_efficiency: 4 },
        icon: "🏛️"
      },
      {
        id: "chola_navy",
        category: "Navy",
        nameKey: "Naval Shipyard",
        descKey: "Construct ships for Southeast Asian expeditions.",
        requirements: { wood: 4, tools: 2 },
        effects: { maritime_power: 5 },
        icon: "⛵"
      }
    ]
  },`;

code = code.replace('  // Level 11 - Vijayanagara', level10Data + '\n  // Level 11 - Vijayanagara');

// Upgrade level 14 data to have 5 buildings
const level14Orig = `    buildings: [
      {
        id: "legacy_artifact_gallery",
        category: "Gallery",
        nameKey: "Artifact Gallery",
        descKey: "Showcase physical history securely.",
        requirements: { legacy: 2 },
        effects: { preservation_score: 5 },
        icon: "🖼️"
      },
      {
        id: "legacy_story_archive",
        category: "Archive",
        nameKey: "Digital Archive",
        descKey: "Preserve the oral and written stories.",
        requirements: { legacy: 2 },
        effects: { knowledge_preservation: 5 },
        icon: "💾"
      }
    ]`;

const level14New = `    buildings: [
      {
        id: "legacy_gallery",
        category: "Gallery",
        nameKey: "Physical Gallery",
        descKey: "Curate physical artifacts for public learning.",
        requirements: { legacy: 2 },
        effects: { preservation: 5 },
        icon: "🏛️"
      },
      {
        id: "legacy_digital",
        category: "Archive",
        nameKey: "Digital Twin Archive",
        descKey: "3D scan and digitize vulnerable monuments.",
        requirements: { technology: 3, legacy: 1 },
        effects: { data_preservation: 5 },
        icon: "💾"
      },
      {
        id: "legacy_community",
        category: "Community",
        nameKey: "Heritage Workshop",
        descKey: "Teach ancient crafts to the next generation.",
        requirements: { knowledge: 2, legacy: 1 },
        effects: { cultural_transmission: 4 },
        icon: "👥"
      },
      {
        id: "legacy_vr",
        category: "Archive",
        nameKey: "VR Experience Center",
        descKey: "Rebuild lost cities in virtual reality.",
        requirements: { technology: 4 },
        effects: { engagement: 5 },
        icon: "🥽"
      },
      {
        id: "legacy_global",
        category: "Gallery",
        nameKey: "World Heritage Nomination",
        descKey: "Secure global protection and recognition.",
        requirements: { legacy: 4, knowledge: 3 },
        effects: { global_impact: 10 },
        icon: "🌍"
      }
    ]`;

code = code.replace(level14Orig, level14New);

fs.writeFileSync('src/data/civilizationBuilder.js', code);
console.log("Updated builder for 5, 10, 14!");
