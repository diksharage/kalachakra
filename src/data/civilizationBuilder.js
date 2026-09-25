export const civilizationBuilderData = {
  // Level 1 - Paleolithic/Mesolithic
  1: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [0, 5, 10, 15] },
    categories: ["Survival", "Tools", "Community"],
    buildings: [
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
    ]
  },
  // Level 2 - Neolithic / Early Farming
  2: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [2, 3, 4] },
    categories: ["Agriculture", "Storage", "Settlement"],
    buildings: [
      { id: "l2_crops", category: "Agriculture", nameKey: "Wheat Field", descKey: "Clear land and plant early domesticated wheat.", requirements: { tools: 1, water: 1 }, effects: { food_production: 2 }, icon: "🌾" },
      { id: "l2_storage", category: "Storage", nameKey: "Clay Granary", descKey: "Build a sealed granary using early pottery techniques.", requirements: { clay: 2, wood: 1 }, effects: { storage_capacity: 3 }, icon: "🏺" },
      { id: "l2_settlement", category: "Settlement", nameKey: "Mudbrick House", descKey: "Construct a permanent dwelling.", requirements: { clay: 2, water: 1, stone: 1 }, effects: { community_capacity: 2 }, icon: "🧱" }
    ]
  },
  // Level 3 - Indus Civilization
  3: {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [4, 9, 14, 19, 24] },
    categories: ["Settlement", "Water", "Storage", "Craft"],
    buildings: [
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
    ]
  },
  // Level 4 - Early Indian Trade Networks
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
  // Level 5 - Mahajanapadas
  5: {
    gridSize: { cols: 6, rows: 5 },
    terrain: { water: [24, 25, 26] },
    categories: ["Fortification", "Administration", "Economy"],
    buildings: [
      { id: "l5_wall", category: "Fortification", nameKey: "City Wall", descKey: "Defend your emerging capital.", requirements: { stone: 3, wood: 2 }, effects: { defense: 5 }, icon: "🧱" },
      { id: "l5_mint", category: "Economy", nameKey: "Coin Mint", descKey: "Produce punch-marked coins.", requirements: { stone: 2, wealth: 1 }, effects: { economy: 4 }, icon: "🪙" },
      { id: "l5_assembly", category: "Administration", nameKey: "Sabha Hall", descKey: "Gathering place for council decisions.", requirements: { wood: 3, authority: 1 }, effects: { governance: 3 }, icon: "🏛️" }
    ]
  },
  // Level 6 - Mauryan Empire
  6: {
    gridSize: { cols: 6, rows: 6 },
    terrain: { water: [0, 6, 12, 18, 24, 30] },
    categories: ["Infrastructure", "Edicts", "Administration"],
    buildings: [
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
  // Level 10 - Chola & Regional Civilizations
  10: {
    gridSize: { cols: 6, rows: 6 },
    terrain: { water: [30, 31, 32, 33, 34, 35] },
    categories: ["Agriculture", "Maritime", "Architecture"],
    buildings: [
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
    ]
  },
  // Level 11 - Vijayanagara
  11: {
    gridSize: { cols: 6, rows: 6 },
    terrain: { water: [15, 16, 17] },
    categories: ["Urban", "Markets", "Defense"],
    buildings: [
      { id: "l11_bazaar", category: "Markets", nameKey: "Grand Bazaar", descKey: "Trade diamonds, horses, and spices.", requirements: { wealth: 3, stone: 2 }, effects: { prosperity: 5 }, icon: "💎" },
      { id: "l11_aqueduct", category: "Urban", nameKey: "Stone Aqueduct", descKey: "Channel water through the rocky landscape.", requirements: { stone: 3, engineering: 2 }, effects: { urban_growth: 4 }, icon: "🏛️" },
      { id: "l11_fort", category: "Defense", nameKey: "Hill Fort", descKey: "Secure the capital against invasions.", requirements: { stone: 4, labor: 2 }, effects: { security: 6 }, icon: "🏰" }
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
    ]
  },
  // Level 14 - Preserve the Legacy
  14: {
    gridSize: { cols: 6, rows: 6 },
    terrain: { water: [] },
    categories: ["Gallery", "Archive", "Community"],
    buildings: [
      { id: "legacy_gallery", category: "Gallery", nameKey: "Physical Gallery", descKey: "Curate physical artifacts for public learning.", requirements: { legacy: 2 }, effects: { preservation: 5 }, icon: "🏛️" },
      { id: "legacy_digital", category: "Archive", nameKey: "Digital Twin Archive", descKey: "3D scan and digitize vulnerable monuments.", requirements: { technology: 3, legacy: 1 }, effects: { data_preservation: 5 }, icon: "💾" },
      { id: "legacy_community", category: "Community", nameKey: "Heritage Workshop", descKey: "Teach ancient crafts to the next generation.", requirements: { knowledge: 2, legacy: 1 }, effects: { cultural_transmission: 4 }, icon: "🧑‍🏫" },
      { id: "legacy_vr", category: "Archive", nameKey: "VR Experience Center", descKey: "Rebuild lost cities in virtual reality.", requirements: { technology: 4 }, effects: { engagement: 5 }, icon: "👓" },
      { id: "legacy_global", category: "Gallery", nameKey: "World Heritage Nomination", descKey: "Secure global protection and recognition.", requirements: { legacy: 4, knowledge: 3 }, effects: { global_impact: 10 }, icon: "🌍" }
    ]
  }
};

export const getBuilderDataForLevel = (levelId) => {
  if (civilizationBuilderData[levelId]) {
    return civilizationBuilderData[levelId];
  }
  return {
    gridSize: { cols: 5, rows: 5 },
    terrain: { water: [0, 5, 10] },
    categories: ["Settlement", "Community"],
    buildings: [
      {
        id: "generic_shelter",
        category: "Settlement",
        nameKey: "Local Settlement",
        descKey: "Expand the core settlement infrastructure.",
        requirements: { materials: 2 },
        effects: { community_capacity: 1 },
        icon: "🛖"
      },
      {
        id: "generic_trade",
        category: "Community",
        nameKey: "Trade Post",
        descKey: "Establish a connection with neighboring groups.",
        requirements: { materials: 1, knowledge: 1 },
        effects: { trade_efficiency: 1 },
        icon: "🤝"
      }
    ]
  };
};
