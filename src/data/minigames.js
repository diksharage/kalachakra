export const minigamesData = {
  "mg-l1-survival": {
    id: "mg-l1-survival", levelId: 1,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Survival in the Wild",
        rewards: [
          { type: 'resource', id: 'stone', amount: 2, label: 'River Stones', destination: 'Inventory', usage: 'Used for Tool Making' },
          { type: 'artifact', id: 'hand_axe', amount: 1, label: 'Stone Hand Axe', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Make critical decisions to ensure your early human community survives the harsh environment.",
        difficulty: "easy", maxScore: 100,
        scenarios: [
          { text: "A cold night approaches and the community is shivering. What is your priority?", options: [{ label: "Use flint to start a fire in the cave", score: 10, response: "Fire provides warmth and safety!" }, { label: "Sleep in the open fields", score: -10, response: "Too cold! The community suffered." }] },
          { text: "You find a large animal carcass left by predators. What tool do you use to harvest it?", options: [{ label: "Sharp stone hand-axe", score: 10, response: "Perfect for cutting meat and bone!" }, { label: "Bare hands", score: -10, response: "Ineffective and dangerous." }] }
        ]
      },
      {
        variationId: "v2", type: "artifactMatch", title: "Tools of the Paleolithic",
        rewards: [
          { type: 'resource', id: 'stone', amount: 2, label: 'River Stones', destination: 'Inventory', usage: 'Used for Tool Making' },
          { type: 'artifact', id: 'hand_axe', amount: 1, label: 'Stone Hand Axe', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Match the early human stone tool to its primary survival use.",
        difficulty: "easy", maxScore: 100,
        pairs: [
          { id: '1', left: 'Hand-Axe', right: 'Chopping wood and digging', icon: '🪨' },
          { id: '2', left: 'Stone Scraper', right: 'Cleaning animal hides', icon: '🔪' },
          { id: '3', left: 'Bone Needle', right: 'Sewing warm clothes', icon: '🪡' },
          { id: '4', left: 'Spear Point', right: 'Hunting fast prey', icon: '🏹' }
        ]
      }
    ]
  },
  "mg-l2-farming": {
    id: "mg-l2-farming", levelId: 2,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "First Harvest",
        rewards: [
          { type: 'resource', id: 'grain', amount: 5, label: 'Surplus Grain', destination: 'Inventory', usage: 'Used for Settlement Growth' },
          { type: 'artifact', id: 'early_pottery', amount: 1, label: 'Neolithic Pottery', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Manage your first agricultural settlement. Choose the right strategies to grow your village.",
        difficulty: "easy", maxScore: 100,
        scenarios: [
          { text: "The seasonal rains are coming. Where should we plant the wheat?", options: [{ label: "In the fertile river floodplains", score: 10, response: "The soil here is rich in nutrients!" }, { label: "On the rocky mountain peaks", score: -10, response: "Crops cannot grow on barren rock." }] },
          { text: "The harvest was bountiful! How do we store the surplus grain?", options: [{ label: "Leave it in open baskets", score: -10, response: "Pests ruined the surplus!" }, { label: "Build mud-brick granaries", score: 10, response: "The grain is safe for winter." }] }
        ]
      },
      {
        variationId: "v2", type: "timeline", title: "The Agricultural Cycle",
        rewards: [
          { type: 'resource', id: 'grain', amount: 5, label: 'Surplus Grain', destination: 'Inventory', usage: 'Used for Settlement Growth' },
          { type: 'artifact', id: 'early_pottery', amount: 1, label: 'Neolithic Pottery', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Put the steps of early farming into the correct historical order.",
        difficulty: "easy", maxScore: 100,
        events: [
          { id: 't1', label: 'Clear the land of wild brush', order: 1 },
          { id: 't2', label: 'Till the soil using stone hoes', order: 2 },
          { id: 't3', label: 'Plant the seeds before the rains', order: 3 },
          { id: 't4', label: 'Harvest the grown wheat', order: 4 },
          { id: 't5', label: 'Grind the grain on a quern stone', order: 5 }
        ]
      }
    ]
  },
  "mg-l3-artifacts": {
    id: "mg-l3-artifacts", levelId: 3,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Artifacts of the Indus",
        rewards: [
          { type: 'artifact', id: 'steatite_seal', amount: 1, label: 'Unicorn Seal', destination: 'Artifact Collection', usage: 'View in Library' },
          { type: 'resource', id: 'craftMaterials', amount: 3, label: 'Harappan Craft Materials', destination: 'Inventory', usage: 'Used for City Building' }
        ],
        description: "Match the excavated Harappan artifacts to their historical functions.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Steatite Seals', right: 'Trade and identification', icon: '📜' },
          { id: '2', left: 'Terracotta Toys', right: 'Childrens play and learning', icon: '🧸' },
          { id: '3', left: 'Standardized Weights', right: 'Fair marketplace exchange', icon: '⚖️' },
          { id: '4', left: 'Carnelian Beads', right: 'Jewelry and export goods', icon: '📿' },
          { id: '5', left: 'Bronze Dancing Girl', right: 'Artistic expression and metallurgy', icon: '💃' }
        ]
      },
      {
        variationId: "v2", type: "buildFromMemory", title: "Rebuild the Great Bath",
        rewards: [
          { type: 'artifact', id: 'steatite_seal', amount: 1, label: 'Unicorn Seal', destination: 'Artifact Collection', usage: 'View in Library' },
          { type: 'resource', id: 'craftMaterials', amount: 3, label: 'Harappan Craft Materials', destination: 'Inventory', usage: 'Used for City Building' }
        ],
        description: "Memorize the architectural layout of Mohenjo-Daro's Great Bath.",
        difficulty: "medium", maxScore: 100, memorizeTime: 6,
        components: [
          { id: 'cb1', label: 'Central Pool', icon: '🌊', required: true },
          { id: 'cb2', label: 'Bitumen Waterproofing', icon: '🛢️', required: true },
          { id: 'cb3', label: 'Brick Steps', icon: '🧱', required: true },
          { id: 'cb4', label: 'Drainage Outlet', icon: '🚰', required: true },
          { id: 'cb5', label: 'Timber Roof', icon: '🪵', required: false },
          { id: 'cb6', label: 'Mud Mortar', icon: '🟤', required: false }
        ]
      }
    ]
  },
  "mg-l4-trade": {
    id: "mg-l4-trade", levelId: 4,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "The Meluhha Voyage",
        rewards: [
          { type: 'resource', id: 'textiles', amount: 2, label: 'Woven Textiles', destination: 'Inventory', usage: 'Used for Export Trade' },
          { type: 'artifact', id: 'spices', amount: 1, label: 'Exotic Spices', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Navigate a trade ship from the Indus Valley to Mesopotamia.",
        difficulty: "medium", maxScore: 100,
        legs: [
          { start: "Lothal Dockyard", context: "Your ship is loaded with carnelian. Which body of water do you enter first?", options: [{ label: "Arabian Sea", isCorrect: true }, { label: "Bay of Bengal", isCorrect: false }] },
          { start: "Arabian Sea", context: "You are sailing westward. Where do you stop to resupply?", options: [{ label: "Dilmun (Bahrain)", isCorrect: true }, { label: "Magan (Oman)", isCorrect: false }] },
          { start: "Persian Gulf", context: "You reach the great rivers of Mesopotamia. Which port do you dock at?", options: [{ label: "Ur", isCorrect: true }, { label: "Memphis", isCorrect: false }] }
        ]
      },
      {
        variationId: "v2", type: "artifactMatch", title: "Goods of the Ancient World",
        rewards: [
          { type: 'resource', id: 'textiles', amount: 2, label: 'Woven Textiles', destination: 'Inventory', usage: 'Used for Export Trade' },
          { type: 'artifact', id: 'spices', amount: 1, label: 'Exotic Spices', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Match the trade good to its destination or origin.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Carnelian Beads', right: 'Exported from Lothal', icon: '🔴' },
          { id: '2', left: 'Copper', right: 'Imported from Magan (Oman)', icon: '⛏️' },
          { id: '3', left: 'Lapis Lazuli', right: 'Sourced from Afghanistan', icon: '🔷' },
          { id: '4', left: 'Cylinder Seals', right: 'Found from Mesopotamia', icon: '📜' }
        ]
      }
    ]
  },
  "mg-l5-kingdoms": {
    id: "mg-l5-kingdoms", levelId: 5,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Rise of Magadha",
        rewards: [
          { type: 'resource', id: 'iron_tool', amount: 2, label: 'Iron Tools', destination: 'Inventory', usage: 'Used for Agriculture and War' },
          { type: 'artifact', id: 'punch_marked_coin', amount: 1, label: 'Punch-Marked Coin', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Make strategic choices to help the kingdom of Magadha expand its power.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          { text: "Your capital, Rajagriha, is surrounded by hills. How do you defend it?", options: [{ label: "Build massive cyclopean stone walls", score: 10, response: "The stone walls made Rajagriha impregnable!" }, { label: "Move the capital immediately", score: -10, response: "You lost the strategic advantage of the hills." }] },
          { text: "Your army needs to cross rivers to conquer Anga. What resource do you utilize?", options: [{ label: "Forest elephants for clearing paths and war", score: 10, response: "Elephants became the tanks of ancient Indian warfare!" }, { label: "Chariots only", score: -10, response: "Chariots get stuck in the dense eastern forests." }] }
        ]
      },
      {
        variationId: "v2", type: "timeline", title: "Evolution of Governance",
        rewards: [
          { type: 'resource', id: 'iron_tool', amount: 2, label: 'Iron Tools', destination: 'Inventory', usage: 'Used for Agriculture and War' },
          { type: 'artifact', id: 'punch_marked_coin', amount: 1, label: 'Punch-Marked Coin', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Place the stages of ancient Indian political evolution in order.",
        difficulty: "medium", maxScore: 100,
        events: [
          { id: 't1', label: 'Jana (Early Vedic Tribes)', order: 1 },
          { id: 't2', label: 'Janapadas (Settled Territories)', order: 2 },
          { id: 't3', label: 'Mahajanapadas (16 Great Kingdoms)', order: 3 },
          { id: 't4', label: 'Rise of the Magadha Empire', order: 4 }
        ]
      }
    ]
  },
  "mg-l6-build": {
    id: "mg-l6-build", levelId: 6,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Ashoka's Pillar",
        rewards: [
          { type: 'knowledge', id: 'ashokan_edict', amount: 1, label: 'Ashokan Edict', destination: 'Knowledge Library', usage: 'Spreading Dhamma' },
          { type: 'knowledge', id: 'royal_decree', amount: 1, label: 'Mauryan Royal Decree', destination: 'Knowledge Library', usage: 'Imperial Administration' }
        ],
        description: "Memorize the components of the famous Lion Capital of Ashoka.",
        difficulty: "hard", maxScore: 100, memorizeTime: 5,
        components: [
          { id: 'cb1', label: 'Four Asiatic Lions', icon: '🦁', required: true },
          { id: 'cb2', label: 'Dharma Chakra (Wheel)', icon: '☸️', required: true },
          { id: 'cb3', label: 'Inverted Lotus Bell', icon: '🪷', required: true },
          { id: 'cb4', label: 'Animal Abacus (Bull, Horse, Elephant, Lion)', icon: '🐘', required: true },
          { id: 'cb5', label: 'Gold Plating', icon: '✨', required: false },
          { id: 'cb6', label: 'Marble Base', icon: '🏛️', required: false }
        ]
      },
      {
        variationId: "v2", type: "historicalDecision", title: "Ashoka's Dhamma",
        rewards: [
          { type: 'knowledge', id: 'ashokan_edict', amount: 1, label: 'Ashokan Edict', destination: 'Knowledge Library', usage: 'Spreading Dhamma' },
          { type: 'knowledge', id: 'royal_decree', amount: 1, label: 'Mauryan Royal Decree', destination: 'Knowledge Library', usage: 'Imperial Administration' }
        ],
        description: "After the Kalinga War, make decisions on how to rule your empire peacefully.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          { text: "You want to spread the message of peace to common people. How do you do it?", options: [{ label: "Carve edicts on rocks in the local Prakrit language", score: 10, response: "People could understand the message easily!" }, { label: "Write them only in Sanskrit for scholars", score: -10, response: "The common people could not read it." }] },
          { text: "Your empire is vast. How do you ensure the welfare of travellers?", options: [{ label: "Plant banyan trees and dig wells along the roads", score: 10, response: "Travelers rested under the shade." }, { label: "Tax travelers heavily", score: -10, response: "Trade and travel declined." }] }
        ]
      }
    ]
  },
  "mg-l7-timeline": {
    id: "mg-l7-timeline", levelId: 7,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Gupta Golden Age",
        rewards: [
          { type: 'knowledge', id: 'gupta_manuscript', amount: 1, label: 'Scientific Manuscript', destination: 'Knowledge Library', usage: 'Universities' },
          { type: 'artifact', id: 'astronomy_tool', amount: 1, label: 'Ancient Observatory Tool', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Sequence the scientific and mathematical breakthroughs of the Gupta period.",
        difficulty: "hard", maxScore: 100,
        events: [
          { id: 't1', label: 'Understanding that the Earth rotates on its axis', order: 1 },
          { id: 't2', label: 'Calculation of Pi (π) to four decimal places', order: 2 },
          { id: 't3', label: 'Explanation of solar and lunar eclipses', order: 3 },
          { id: 't4', label: 'Development of the decimal system', order: 4 }
        ]
      },
      {
        variationId: "v2", type: "artifactMatch", title: "Scholars of the Golden Age",
        rewards: [
          { type: 'knowledge', id: 'gupta_manuscript', amount: 1, label: 'Scientific Manuscript', destination: 'Knowledge Library', usage: 'Universities' },
          { type: 'artifact', id: 'astronomy_tool', amount: 1, label: 'Ancient Observatory Tool', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Match the great scholar to their primary field of study.",
        difficulty: "hard", maxScore: 100,
        pairs: [
          { id: '1', left: 'Aryabhata', right: 'Mathematics and Astronomy', icon: '🔭' },
          { id: '2', left: 'Sushruta', right: 'Surgery and Medicine', icon: '⚕️' },
          { id: '3', left: 'Kalidasa', right: 'Sanskrit Poetry and Plays', icon: '📜' },
          { id: '4', left: 'Varahamihira', right: 'Encyclopedic Science', icon: '📖' }
        ]
      }
    ]
  },
  "mg-l8-architecture": {
    id: "mg-l8-architecture", levelId: 8,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Rock-Cut Temple",
        rewards: [
          { type: 'resource', id: 'carved_stone', amount: 5, label: 'Carved Stone Blocks', destination: 'Inventory', usage: 'Used for Temple Building' },
          { type: 'knowledge', id: 'architectural_plan', amount: 1, label: 'Master Architect Plan', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Rebuild the structural blueprint of an ancient Indian temple.",
        difficulty: "hard", maxScore: 100, memorizeTime: 5,
        components: [
          { id: 'cb1', label: 'Garbhagriha (Sanctum)', icon: '🕉️', required: true },
          { id: 'cb2', label: 'Mandapa (Hall)', icon: '🏛️', required: true },
          { id: 'cb3', label: 'Shikhara (Spire)', icon: '⛰️', required: true },
          { id: 'cb4', label: 'Amalaka (Stone Disk)', icon: '🔘', required: true },
          { id: 'cb5', label: 'Moat', icon: '🌊', required: false },
          { id: 'cb6', label: 'Glass Windows', icon: '🪟', required: false }
        ]
      },
      {
        variationId: "v2", type: "historicalDecision", title: "Carving Kailasanatha",
        rewards: [
          { type: 'resource', id: 'carved_stone', amount: 5, label: 'Carved Stone Blocks', destination: 'Inventory', usage: 'Used for Temple Building' },
          { type: 'knowledge', id: 'architectural_plan', amount: 1, label: 'Master Architect Plan', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Make engineering choices for carving a monolithic temple at Ellora.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          { text: "Where do you begin carving the massive rock?", options: [{ label: "Start from the top and carve downwards", score: 10, response: "Correct! This prevented the need for scaffolding." }, { label: "Start from the bottom and carve upwards", score: -10, response: "The rock collapsed!" }] },
          { text: "How do you ensure the interior receives enough light?", options: [{ label: "Carve precise courtyards and light shafts", score: 10, response: "Light beautifully illuminated the sanctum." }, { label: "Use torches exclusively", score: -10, response: "The soot damaged the fine carvings." }] }
        ]
      }
    ]
  },
  "mg-l9-culture": {
    id: "mg-l9-culture", levelId: 9,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Roots of Tradition",
        rewards: [
          { type: 'artifact', id: 'bronze_statue', amount: 1, label: 'Lost-Wax Bronze Statue', destination: 'Artifact Collection', usage: 'View in Library' },
          { type: 'artifact', id: 'folk_instrument', amount: 1, label: 'Traditional Instrument', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Match the classical Indian art form to its ancient treatise or origin.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Classical Dance', right: 'Natyashastra', icon: '💃' },
          { id: '2', left: 'Ayurveda', right: 'Charaka Samhita', icon: '🌿' },
          { id: '3', left: 'Carnatic Music', right: 'Sama Veda chants', icon: '🎵' },
          { id: '4', left: 'Yoga', right: 'Patanjalis Sutras', icon: '🧘' }
        ]
      },
      {
        variationId: "v2", type: "timeline", title: "Evolution of Indian Art",
        rewards: [
          { type: 'artifact', id: 'bronze_statue', amount: 1, label: 'Lost-Wax Bronze Statue', destination: 'Artifact Collection', usage: 'View in Library' },
          { type: 'artifact', id: 'folk_instrument', amount: 1, label: 'Traditional Instrument', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Sequence the development of artistic expression in ancient India.",
        difficulty: "medium", maxScore: 100,
        events: [
          { id: 't1', label: 'Prehistoric Cave Paintings (Bhimbetka)', order: 1 },
          { id: 't2', label: 'Harappan Terracotta and Bronze Art', order: 2 },
          { id: 't3', label: 'Mauryan Polished Stone Pillars', order: 3 },
          { id: 't4', label: 'Gupta Classical Sculpture', order: 4 },
          { id: 't5', label: 'Chola Bronze Idols (Nataraja)', order: 5 }
        ]
      }
    ]
  },
  "mg-l10-chola": {
    id: "mg-l10-chola", levelId: 10,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "Chola Naval Expedition",
        rewards: [
          { type: 'resource', id: 'naval_supplies', amount: 3, label: 'Naval Supplies', destination: 'Inventory', usage: 'Equipping Maritime Expeditions' },
          { type: 'artifact', id: 'chola_bronze', amount: 1, label: 'Processional Bronze Idol', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Chart the maritime expansion of the Chola Empire into Southeast Asia.",
        difficulty: "hard", maxScore: 100,
        legs: [
          { start: "Nagapattinam", context: "The Imperial Chola Navy sets sail. Where do they head to secure the Malacca Strait?", options: [{ label: "Srivijaya (Sumatra)", isCorrect: true }, { label: "Madagascar", isCorrect: false }] },
          { start: "Srivijaya", context: "Having secured the strait, where do the merchant guilds travel next to trade fine textiles?", options: [{ label: "Song Dynasty China", isCorrect: true }, { label: "Rome", isCorrect: false }] }
        ]
      },
      {
        variationId: "v2", type: "buildFromMemory", title: "Brihadisvara Temple",
        rewards: [
          { type: 'resource', id: 'naval_supplies', amount: 3, label: 'Naval Supplies', destination: 'Inventory', usage: 'Equipping Maritime Expeditions' },
          { type: 'artifact', id: 'chola_bronze', amount: 1, label: 'Processional Bronze Idol', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Memorize the layout of Rajaraja Chola's great temple at Thanjavur.",
        difficulty: "hard", maxScore: 100, memorizeTime: 5,
        components: [
          { id: 'cb1', label: 'Towering Vimana (66m)', icon: '🏛️', required: true },
          { id: 'cb2', label: 'Monolithic Nandi (Bull)', icon: '🐂', required: true },
          { id: 'cb3', label: 'Massive Lingam', icon: '🕉️', required: true },
          { id: 'cb4', label: 'Frescoed Corridors', icon: '🎨', required: true },
          { id: 'cb5', label: 'Iron Support Beams', icon: '⛓️', required: false },
          { id: 'cb6', label: 'Drawbridge', icon: '🌉', required: false }
        ]
      }
    ]
  },
  "mg-l11-vijay": {
    id: "mg-l11-vijay", levelId: 11,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "City of Victory",
        rewards: [
          { type: 'resource', id: 'vijayanagara_coin', amount: 4, label: 'Varaha Gold Coins', destination: 'Inventory', usage: 'Used in Hampi Bazaars' },
          { type: 'artifact', id: 'temple_carving', amount: 1, label: 'Ruins Temple Carving', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Make strategic choices to manage the grand capital of Vijayanagara.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          { text: "The rocky landscape of Hampi has little water. How do you supply the city?", options: [{ label: "Build aqueducts and stone tanks (Pushkaranis)", score: 10, response: "The city thrived with excellent water engineering." }, { label: "Rely on rainfall only", score: -10, response: "The city suffered severe droughts." }] },
          { text: "Portuguese traders arrive on the western coast. What do you trade with them?", options: [{ label: "Buy Arabian horses for the cavalry", score: 10, response: "The Vijayanagara cavalry became the strongest in the south!" }, { label: "Ignore them completely", score: -10, response: "You lost military superiority." }] }
        ]
      },
      {
        variationId: "v2", type: "artifactMatch", title: "Markets of Hampi",
        rewards: [
          { type: 'resource', id: 'vijayanagara_coin', amount: 4, label: 'Varaha Gold Coins', destination: 'Inventory', usage: 'Used in Hampi Bazaars' },
          { type: 'artifact', id: 'temple_carving', amount: 1, label: 'Ruins Temple Carving', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Match the commodities traded in the bustling bazaars of Vijayanagara.",
        difficulty: "hard", maxScore: 100,
        pairs: [
          { id: '1', left: 'Diamonds & Rubies', right: 'Sold openly in heaps on the streets', icon: '💎' },
          { id: '2', left: 'Arabian Horses', right: 'Imported for the Royal Cavalry', icon: '🐎' },
          { id: '3', left: 'Spices & Pepper', right: 'Exported heavily to Europe', icon: '🌶️' },
          { id: '4', left: 'Cotton Textiles', right: 'Woven locally for domestic use and trade', icon: '🧵' }
        ]
      }
    ]
  },
  "mg-l12-stories": {
    id: "mg-l12-stories", levelId: 12,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "The Monkey and the Crocodile",
        rewards: [
          { type: 'knowledge', id: 'palm_leaf_manuscript', amount: 1, label: 'Palm-Leaf Manuscript', destination: 'Knowledge Library', usage: 'Preserving Epics' },
          { type: 'knowledge', id: 'folk_tale', amount: 1, label: 'Oral Folk Tale', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Sequence this famous Panchatantra fable correctly.",
        difficulty: "easy", maxScore: 100,
        events: [
          { id: 't1', label: 'The monkey feeds the crocodile sweet rose apples', order: 1 },
          { id: 't2', label: 'The crocodiles wife demands the monkeys heart', order: 2 },
          { id: 't3', label: 'The crocodile tricks the monkey onto his back', order: 3 },
          { id: 't4', label: 'The monkey says he left his heart in the tree', order: 4 },
          { id: 't5', label: 'The monkey escapes back into the branches', order: 5 }
        ]
      },
      {
        variationId: "v2", type: "artifactMatch", title: "Epics and Fables",
        rewards: [
          { type: 'knowledge', id: 'palm_leaf_manuscript', amount: 1, label: 'Palm-Leaf Manuscript', destination: 'Knowledge Library', usage: 'Preserving Epics' },
          { type: 'knowledge', id: 'folk_tale', amount: 1, label: 'Oral Folk Tale', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Match the ancient Indian text to its core theme.",
        difficulty: "easy", maxScore: 100,
        pairs: [
          { id: '1', left: 'Panchatantra', right: 'Animal fables teaching political strategy', icon: '🐒' },
          { id: '2', left: 'Jataka Tales', right: 'Stories of the Buddhas previous lives', icon: '☸️' },
          { id: '3', left: 'Mahabharata', right: 'Epic of duty, war, and philosophy', icon: '🏹' },
          { id: '4', left: 'Ramayana', right: 'Epic of dharma and the journey of Rama', icon: '📖' }
        ]
      }
    ]
  },
  "mg-l13-games": {
    id: "mg-l13-games", levelId: 13,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Chaturanga Strategy",
        rewards: [
          { type: 'resource', id: 'game_piece', amount: 5, label: 'Carved Game Pieces', destination: 'Inventory', usage: 'Playing Board Games' },
          { type: 'artifact', id: 'pachisi_board', amount: 1, label: 'Royal Pachisi Board', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Make strategic moves in the ancient ancestor of Chess.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          { text: "Your King (Raja) is threatened by an enemy Chariot (Ratha). What do you move?", options: [{ label: "Move the Elephant (Gaja) to block the path", score: 10, response: "A solid defensive maneuver!" }, { label: "Move a Foot Soldier (Padati) forward aggressively", score: -10, response: "Your King was captured!" }] },
          { text: "You have a clear path to the enemy King. Which piece do you send?", options: [{ label: "The Cavalry (Ashva) moving in an L-shape", score: 10, response: "The Knight's unpredictable movement secured the win!" }, { label: "The Minister (Mantri) moving strictly one square diagonally", score: -10, response: "The Minister is too slow in Chaturanga!" }] }
        ]
      },
      {
        variationId: "v2", type: "timeline", title: "Evolution of Play",
        rewards: [
          { type: 'resource', id: 'game_piece', amount: 5, label: 'Carved Game Pieces', destination: 'Inventory', usage: 'Playing Board Games' },
          { type: 'artifact', id: 'pachisi_board', amount: 1, label: 'Royal Pachisi Board', destination: 'Artifact Collection', usage: 'View in Library' }
        ],
        description: "Sequence the history of Indian traditional games.",
        difficulty: "medium", maxScore: 100,
        events: [
          { id: 't1', label: 'Harappan cubical dice made of terracotta', order: 1 },
          { id: 't2', label: 'Mentions of dice games in the Rig Veda', order: 2 },
          { id: 't3', label: 'Creation of Pachisi (Ludo ancestor) on cloth', order: 3 },
          { id: 't4', label: 'Invention of Chaturanga (Chess ancestor) in Gupta period', order: 4 },
          { id: 't5', label: 'Creation of Moksha Patam (Snakes and Ladders)', order: 5 }
        ]
      }
    ]
  },
  "mg-l14-preserve": {
    id: "mg-l14-preserve", levelId: 14,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Archivist's Dilemma",
        rewards: [
          { type: 'knowledge', id: 'heritage_archive', amount: 1, label: 'Digital Heritage Archive', destination: 'Knowledge Library', usage: 'Protecting History' },
          { type: 'knowledge', id: 'preservation_record', amount: 1, label: 'Restoration Record', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Make crucial decisions to preserve ancient artifacts for future generations.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          { text: "You discover brittle palm-leaf manuscripts. How do you preserve them?", options: [{ label: "Digitize them immediately and control humidity", score: 10, response: "The texts are saved forever digitally!" }, { label: "Laminate them in modern plastic", score: -10, response: "The chemicals destroyed the ancient ink!" }] },
          { text: "A bronze Chola statue is heavily oxidized (green rust). What is your treatment?", options: [{ label: "Use gentle chemical cleaning to reveal details", score: 10, response: "The statue is restored to its glory!" }, { label: "Scrub it with wire brushes", score: -10, response: "You scratched and ruined the historical surface." }] }
        ]
      },
      {
        variationId: "v2", type: "tradeRoute", title: "Returning Stolen Heritage",
        rewards: [
          { type: 'knowledge', id: 'heritage_archive', amount: 1, label: 'Digital Heritage Archive', destination: 'Knowledge Library', usage: 'Protecting History' },
          { type: 'knowledge', id: 'preservation_record', amount: 1, label: 'Restoration Record', destination: 'Knowledge Library', usage: 'Lore Unlocked' }
        ],
        description: "Navigate international channels to repatriate a stolen Nataraja idol.",
        difficulty: "hard", maxScore: 100,
        legs: [
          { start: "Black Market", context: "You identify a stolen idol in a foreign gallery. What is your first legal step?", options: [{ label: "File a claim with UNESCO and Interpol", isCorrect: true }, { label: "Demand it back on social media", isCorrect: false }] },
          { start: "Interpol", context: "You need to prove it belongs to India. What evidence do you provide?", options: [{ label: "Photographic archives from the original temple", isCorrect: true }, { label: "A receipt from a local antique shop", isCorrect: false }] },
          { start: "Court of Law", context: "The gallery agrees to return it. Where should the idol go?", options: [{ label: "Back to the Archaeological Survey of India (ASI) or the original temple", isCorrect: true }, { label: "To a private collector in Delhi", isCorrect: false }] }
        ]
      }
    ]
  }
};
