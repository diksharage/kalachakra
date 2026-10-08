import fs from 'fs';

let content = fs.readFileSync('src/data/civilizationBuilder.js', 'utf8');

// I will just use string replacement for the specific levels to ensure I don't break the module structure.
// Let's replace the 'buildings: [...]' arrays for levels 1, 3, 6, 10, 13.

const level1Buildings = `[
      { id: "l1_shelter", category: "Survival", nameKey: "Basic Shelter", descKey: "Construct a simple shelter from natural materials.", icon: "⛺", choices: [
        { id: "wood_shelter", label: "Wood & Leaf Lean-to", desc: "Fast and easy to assemble.", requirements: { wood: 1, plants: 1 }, effects: { community_capacity: 1, speed: 1 } },
        { id: "stone_shelter", label: "Stone Cave Modification", desc: "Sturdy and provides great protection.", requirements: { stone: 1, plants: 1 }, effects: { community_capacity: 1, defense: 2 } }
      ]},
      { id: "l1_water", category: "Survival", nameKey: "Water Access", descKey: "Establish a safe route to the river.", icon: "💧", choices: [
        { id: "safe_path", label: "Cleared Path", desc: "A simple trail to the water.", requirements: { tools: 1 }, effects: { water_security: 1 } },
        { id: "communal_path", label: "Group Guarding", desc: "Establish a watch system.", requirements: { tools: 1, community: 1 }, effects: { water_security: 2 } }
      ]},
      { id: "l1_tools", category: "Tools", nameKey: "Knapping Station", descKey: "Create an area dedicated to crafting stone tools.", icon: "🪨", choices: [
        { id: "flake_station", label: "Flaking Station", desc: "Basic sharp edges.", requirements: { stone: 1 }, effects: { tool_efficiency: 1 } },
        { id: "advanced_knapping", label: "Biface Knapping", desc: "Complex dual-edged tools.", requirements: { stone: 1, wood: 1 }, effects: { tool_efficiency: 2 } }
      ]}
    ]`;

const level3Buildings = `[
      { id: "indus_water_feature", category: "Water", nameKey: "Great Bath Segment", descKey: "Build advanced public water infrastructure.", icon: "💧", choices: [
        { id: "public_bath", label: "Ritual Bathing Pool", desc: "Focus on cultural integration.", requirements: { bricks: 1, water: 1 }, effects: { hygiene: 2, culture: 1 } },
        { id: "sealed_bath", label: "Bitumen-Sealed Pool", desc: "Focus on waterproofing technology.", requirements: { materials: 1, water: 1 }, effects: { hygiene: 3 } }
      ]},
      { id: "indus_storage", category: "Storage", nameKey: "Harappan Granary", descKey: "A massive centralized storage facility.", icon: "🏺", choices: [
        { id: "large_granary", label: "Massive Brick Granary", desc: "Maximum capacity.", requirements: { bricks: 1 }, effects: { storage_capacity: 5 } },
        { id: "ventilated_granary", label: "Ventilated Storage", desc: "Prevents grain rot.", requirements: { tools: 1, storage: 1 }, effects: { storage_capacity: 4, food_safety: 1 } }
      ]},
      { id: "indus_trade", category: "Craft", nameKey: "Bead Workshop", descKey: "Organize the trade of carnelian beads.", icon: "💎", choices: [
        { id: "carnelian_tools", label: "Specialized Stone Drills", desc: "High-precision tools.", requirements: { tools: 1 }, effects: { craft_production: 3 } },
        { id: "efficient_workshop", label: "Organized Labor Division", desc: "Assembly line efficiency.", requirements: { craftMaterials: 1 }, effects: { craft_production: 4 } }
      ]},
      { id: "indus_drainage", category: "Water", nameKey: "Covered Drains", descKey: "Establish systematic sanitation.", icon: "🧱", choices: [
        { id: "main_drains", label: "Main Street Drains", desc: "Centralized sewage.", requirements: { bricks: 1 }, effects: { hygiene: 2 } },
        { id: "house_drains", label: "Connected House Drains", desc: "Direct sanitation.", requirements: { water: 1 }, effects: { hygiene: 4 } }
      ]},
      { id: "indus_house", category: "Settlement", nameKey: "Courtyard House", descKey: "Build multi-story brick dwellings.", icon: "🏠", choices: [
        { id: "multi_story", label: "Multi-Story Dwelling", desc: "Focus on population.", requirements: { bricks: 1 }, effects: { population: 3 } },
        { id: "craft_house", label: "Artisan Courtyard", desc: "Focus on home industry.", requirements: { craftMaterials: 1 }, effects: { population: 2, craft_production: 1 } }
      ]}
    ]`;

const level6Buildings = `[
      { id: "maurya_road", category: "Logistics", nameKey: "Royal Highway", descKey: "Expand the Uttarapatha trade route.", icon: "🛣️", choices: [
        { id: "trade_route", label: "Trade Focus", desc: "Encourage merchant caravans.", requirements: { stone: 1, infrastructure: 1 }, effects: { imperial_control: 1, trade_revenue: 2 } },
        { id: "msg_route", label: "Messenger Focus", desc: "Fast relays for the emperor.", requirements: { communication: 2 }, effects: { imperial_control: 2, speed: 2 } }
      ]},
      { id: "maurya_pillar", category: "Culture", nameKey: "Ashokan Pillar", descKey: "Erect a monument of imperial edicts.", icon: "🏛️", choices: [
        { id: "dhamma_pillar", label: "Dhamma Edict", desc: "Spread moral philosophy.", requirements: { stone: 2, communication: 2 }, effects: { cultural_unity: 3 } },
        { id: "border_pillar", label: "Border Marker", desc: "Mark the edge of the empire.", requirements: { stone: 1, infrastructure: 1 }, effects: { imperial_control: 2 } }
      ]},
      { id: "maurya_stupa", category: "Religion", nameKey: "Brick Stupa", descKey: "Construct a massive reliquary.", icon: "🕉️", choices: [
        { id: "stone_stupa", label: "Stone Casing", desc: "Upgrade the exterior.", requirements: { stone: 2, tools: 1 }, effects: { religious_merit: 4 } },
        { id: "grand_stupa", label: "Carved Toranas (Gates)", desc: "Elaborate entranceways.", requirements: { tools: 1, tradeGoods: 1 }, effects: { religious_merit: 3, culture: 2 } }
      ]}
    ]`;

const level10Buildings = `[
      { id: "chola_temple", category: "Religion", nameKey: "Brihadisvara Temple", descKey: "A massive granite monument.", icon: "🏛️", choices: [
        { id: "granary_temple", label: "Economic Hub", desc: "Serve as a regional bank.", requirements: { builder: 1, storage: 2 }, effects: { revenue: 3 } },
        { id: "art_temple", label: "Cultural Hub", desc: "Support dancers and artisans.", requirements: { culture: 2, creative: 1 }, effects: { cultural_influence: 3 } }
      ]},
      { id: "chola_navy", category: "Military", nameKey: "Maritime Fleet", descKey: "Expand Chola naval power.", icon: "🚢", choices: [
        { id: "trade_fleet", label: "Merchant Guild Escorts", desc: "Protect the Ayyavole guild.", requirements: { tradeGoods: 2, trade: 2 }, effects: { maritime_power: 2, wealth: 3 } },
        { id: "expedition_fleet", label: "Naval Expedition", desc: "Project power across the sea.", requirements: { community: 2, output: 1 }, effects: { maritime_power: 4 } }
      ]},
      { id: "chola_water", category: "Infrastructure", nameKey: "Grand Anicut", descKey: "Advanced water management.", icon: "🌊", choices: [
        { id: "irrigation_focus", label: "Irrigation Network", desc: "Water the delta.", requirements: { water: 2, food: 2 }, effects: { agricultural_boom: 3 } },
        { id: "flood_control", label: "Flood Defenses", desc: "Protect the capital.", requirements: { builder: 1, community: 1 }, effects: { stability: 3 } }
      ]}
    ]`;

const level13Buildings = `[
      { id: "l13_board", category: "Recreation", nameKey: "Pachisi Courtyard", descKey: "A beautiful courtyard for strategic board games.", icon: "🎲", choices: [
        { id: "royal_board", label: "Marble Inlay Board", desc: "Play like royalty.", requirements: { materials: 2, pieces: 1 }, effects: { strategy: 2, prestige: 1 } },
        { id: "cloth_board", label: "Woven Cloth Board", desc: "Portable and accessible.", requirements: { materials: 1, pieces: 2 }, effects: { strategy: 2, accessibility: 2 } }
      ]},
      { id: "l13_arena", category: "Training", nameKey: "Kabaddi Arena", descKey: "A sandy playing field for physical sports.", icon: "🏃", choices: [
        { id: "sand_arena", label: "Community Sand Pit", desc: "Local tournaments.", requirements: { community: 2, skill: 1 }, effects: { physical_health: 2 } },
        { id: "training_camp", label: "Guru's Camp", desc: "Intense discipline training.", requirements: { knowledge: 1, skill: 2 }, effects: { physical_health: 3 } }
      ]},
      { id: "l13_hall", category: "Community", nameKey: "Game Hall", descKey: "A place to preserve and teach ancient abstract games.", icon: "🏛️", choices: [
        { id: "preservation_hall", label: "Rules Archive", desc: "Document regional variants.", requirements: { knowledge: 2, materials: 1 }, effects: { preservation: 3 } },
        { id: "tournament_hall", label: "Tournament Center", desc: "Host grand competitions.", requirements: { community: 1, strategy: 2 }, effects: { preservation: 2, excitement: 2 } }
      ]}
    ]`;

function replaceBuildings(level, replacement) {
  const regex = new RegExp(`(\\s*${level}:\\s*\\{[\\s\\S]*?buildings:\\s*)\\[[\\s\\S]*?\\](\\n\\s*\\},)`, 'm');
  content = content.replace(regex, `$1${replacement}$2`);
}

replaceBuildings(1, level1Buildings);
replaceBuildings(3, level3Buildings);
replaceBuildings(6, level6Buildings);
replaceBuildings(10, level10Buildings);
replaceBuildings(13, level13Buildings);

fs.writeFileSync('src/data/civilizationBuilder.js', content);
console.log("Injected meaningful choices and balanced resources into civilization builder!");
