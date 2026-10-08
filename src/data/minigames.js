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
  
  "mg-l3-city": {
    id: "mg-l3-city", levelId: 3,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Plan Mohenjo-Daro",
        description: "Memorize the layout of a classic Harappan city with its advanced drainage and grid system.",
        difficulty: "medium", maxScore: 100, memorizeTime: 7,
        components: [
          { id: 'c1', label: 'The Citadel', icon: '🏛️', required: true },
          { id: 'c2', label: 'Grid Streets', icon: '🛣️', required: true },
          { id: 'c3', label: 'Covered Drains', icon: '🚰', required: true },
          { id: 'c4', label: 'Great Bath', icon: '🌊', required: true },
          { id: 'c5', label: 'Lower Town Housing', icon: '🏘️', required: true },
          { id: 'c6', label: 'Granary', icon: '🌾', required: true }
        ],
        deco: ['🧱', '🏺', '☀️']
      }
    ]
  },
  "mg-l3-trade": {
    id: "mg-l3-trade", levelId: 3,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "Lothal Dockyard Expedition",
        description: "Navigate your merchant ship from the Indus port of Lothal to Mesopotamia.",
        difficulty: "hard", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "Departing Lothal. The monsoon winds are strong. Do you stick to the coastline or sail into open waters?",
            options: [
              { text: "Follow the Makran Coastline", isSafe: true, msg: "A safe route. The coastal ports provide shelter." },
              { text: "Sail open waters", isSafe: false, msg: "The winds overwhelm the vessel. Cargo is lost!" }
            ]
          },
          {
            id: 'leg2',
            prompt: "Arriving near Dilmun (Bahrain). Local traders offer copper for your carnelian beads. Exchange?",
            options: [
              { text: "Trade for Copper", isSafe: true, msg: "A wise trade. Dilmun is a vital midway exchange hub." },
              { text: "Refuse and sail on", isSafe: false, msg: "You arrive in Mesopotamia with wrong goods. Trade fails." }
            ]
          },
          {
            id: 'leg3',
            prompt: "Reaching the ports of Ur in Mesopotamia. How do you identify your goods?",
            options: [
              { text: "Use Steatite Seals", isSafe: true, msg: "The famous Indus seals guarantee authenticity. Huge profit!" },
              { text: "Use verbal promises", isSafe: false, msg: "Mesopotamian merchants distrust unsealed goods." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l3-crafts": {
    id: "mg-l3-crafts", levelId: 3,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Resource Management",
        description: "Make crucial civic decisions for the survival and prosperity of the city.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The monsoon season is approaching, and the Ghaggar-Hakra river is rising. What is the priority?",
            options: [
              { response: "Clear the covered drainage system", score: 50, explanation: "Excellent. Indus cities were famous for their advanced sanitation and drainage." },
              { response: "Build higher temples", score: -20, explanation: "Unlike Mesopotamia, Indus cities lack massive monumental temples. Drainage was key." },
              { response: "Evacuate the city immediately", score: 0, explanation: "Premature. The city's infrastructure could handle normal floods." }
            ]
          },
          {
            id: "sc2",
            prompt: "Local artisans have discovered a new way to etch Carnelian beads. How do we utilize this?",
            options: [
              { response: "Export them to Mesopotamia", score: 50, explanation: "Yes! Etched carnelian beads were a major luxury export to Mesopotamia." },
              { response: "Keep them a secret", score: 0, explanation: "You miss out on vital foreign trade." },
              { response: "Use them for weapons", score: -20, explanation: "Carnelian is a semi-precious stone for jewelry, not weapons." }
            ]
          }
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
  
  "mg-l4-route": {
    id: "mg-l4-route", levelId: 4,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "The Silk & Spice Path",
        description: "Choose safe and efficient routes to establish your trade network.",
        difficulty: "hard", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "You depart from the coastal ports of Gujarat. Do you hug the coastline towards the Persian Gulf or sail directly across the Arabian Sea?",
            options: [
              { text: "Follow the coastline safely", isSafe: true, msg: "A long but safe journey. Supplies hold steady." },
              { text: "Sail directly across", isSafe: false, msg: "Without monsoon knowledge, your ship is lost at sea!" }
            ]
          },
          {
            id: 'leg2',
            prompt: "You reach the entrepôt of Dilmun. You can restock supplies here or push through to Ur directly.",
            options: [
              { text: "Restock in Dilmun", isSafe: true, msg: "Dilmun's fresh water keeps your crew healthy." },
              { text: "Push through to Ur", isSafe: false, msg: "Your crew runs out of water and perishes." }
            ]
          },
          {
            id: 'leg3',
            prompt: "In Mesopotamia, a rival merchant tries to undercut your Carnelian bead prices. How do you respond?",
            options: [
              { text: "Show the authentic Indus seal", isSafe: true, msg: "Your seal proves the high quality. Sold for maximum profit!" },
              { text: "Lower the prices", isSafe: false, msg: "You take a massive loss and cannot afford the return trip." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l4-cargo": {
    id: "mg-l4-cargo", levelId: 4,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Manage the Cargo",
        description: "Select suitable trade goods and manage your caravan's capacity.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "Your caravan can only carry a limited weight. Which goods will yield the highest profit density in distant lands?",
            options: [
              { response: "Lapis Lazuli and Carnelian Beads", score: 50, explanation: "Correct! High-value, low-weight luxury items were perfect for long-distance trade." },
              { response: "Heavy clay pottery", score: -20, explanation: "Pottery is heavy, fragile, and not worth transporting across continents." },
              { response: "Raw unsmelted copper ore", score: 0, explanation: "Too heavy. It's better to smelt it first or trade finished goods." }
            ]
          },
          {
            id: "sc2",
            prompt: "You are packing fragile spices for a long maritime journey. How do you store them?",
            options: [
              { response: "Sealed in specialized storage jars", score: 50, explanation: "Exactly. Specialized Harappan jars have been found as far as Oman, used for transporting perishables." },
              { response: "In open woven baskets", score: -20, explanation: "Saltwater and humidity will ruin the spices instantly." },
              { response: "Loose in the ship hull", score: 0, explanation: "They will be contaminated by bilge water." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l4-exchange": {
    id: "mg-l4-exchange", levelId: 4,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Merchant Exchanges",
        description: "Interact with foreign merchants and capitalize on trade opportunities.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "A merchant from Magan offers raw copper in exchange for your finished textiles and beads. Do you accept?",
            options: [
              { response: "Accept the trade", score: 50, explanation: "A great deal! The Indus cities lacked local copper but were masters at textile weaving." },
              { response: "Demand gold instead", score: -20, explanation: "Magan was known for copper, not gold. The merchant is insulted." },
              { response: "Refuse. We don't need copper.", score: 0, explanation: "You miss a vital resource for your bronze tools." }
            ]
          },
          {
            id: "sc2",
            prompt: "A local chieftain demands a toll for your caravan to pass through the mountain pass.",
            options: [
              { response: "Pay the toll with a few trade goods", score: 50, explanation: "A small price to pay to secure safe passage and future trade relations." },
              { response: "Fight the chieftain", score: -20, explanation: "Your merchants are not soldiers. You lose your goods and your life." },
              { response: "Turn around and go home", score: 0, explanation: "You survive, but the expedition is a financial failure." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l4-artifacts": {
    id: "mg-l4-artifacts", levelId: 4,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Goods of the Ancient World",
        description: "Match the trade good to its destination or origin.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Carnelian Beads', right: 'Exported from Lothal', icon: '💎' },
          { id: '2', left: 'Copper', right: 'Imported from Magan (Oman)', icon: '🥉' },
          { id: '3', left: 'Lapis Lazuli', right: 'Sourced from Afghanistan', icon: '💠' },
          { id: '4', left: 'Cylinder Seals', right: 'Found from Mesopotamia', icon: '📜' }
        ]
      }
    ]
  },

  "mg-l5-agri": {
    id: "mg-l5-agri", levelId: 5,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Iron Age Agriculture",
        description: "Manage your food supply and implement new agricultural technologies.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "Your population is growing rapidly, but crop yields in the Ganges valley are struggling due to hard, clay-heavy soils. How do you increase food supply?",
            options: [
              { response: "Invest in Iron Plowshares", score: 50, explanation: "Excellent! The introduction of iron plowshares revolutionized agriculture in the dense soils of the Ganges valley." },
              { response: "Pray to the rain gods", score: -10, explanation: "Faith is important, but practical tools are needed to till the heavy soil." },
              { response: "Import food from the south", score: 0, explanation: "This drains your treasury and is not a long-term solution." }
            ]
          },
          {
            id: "sc2",
            prompt: "You now have surplus crops. A neighboring kingdom is facing a famine and asks for aid.",
            options: [
              { response: "Send grain to forge a diplomatic alliance", score: 50, explanation: "A wise strategic move. Soft power and diplomacy were crucial among the 16 Mahajanapadas." },
              { response: "Hoard the grain in your granary", score: -20, explanation: "The grain eventually rots, and your neighbors resent you." },
              { response: "Sell the grain at extortionate prices", score: 0, explanation: "You gain short-term wealth but make a long-term enemy." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l5-diplomacy": {
    id: "mg-l5-diplomacy", levelId: 5,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Diplomacy & Alliances",
        description: "Navigate the complex relationships between the 16 Great Kingdoms.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The powerful kingdom of Magadha wants to marry their princess to your ruling family. This would mean a strong alliance, but potentially subordinating your kingdom.",
            options: [
              { response: "Accept the matrimonial alliance", score: 50, explanation: "Matrimonial alliances were heavily used by Magadhan kings like Bimbisara to peacefully expand influence." },
              { response: "Refuse and declare war", score: -20, explanation: "Magadha's elephant corps crushes your army." },
              { response: "Demand tribute instead", score: 0, explanation: "Magadha is insulted and cuts off trade routes." }
            ]
          },
          {
            id: "sc2",
            prompt: "A group of republics (Gana-Sanghas) form a confederacy against expanding kingdoms. Do you support them or the centralized kingdoms?",
            options: [
              { response: "Support the Republics' independence", score: 50, explanation: "Supporting the Vajji confederacy creates a buffer zone against aggressive empires." },
              { response: "Invade the Republics", score: -20, explanation: "The united Gana-Sanghas repel your forces with guerrilla tactics." },
              { response: "Ignore the conflict", score: 0, explanation: "You lose influence in the region as the political map shifts." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l5-defense": {
    id: "mg-l5-defense", levelId: 5,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Fortify Rajagriha",
        description: "Memorize the strategic defenses of the Magadhan capital, Rajagriha.",
        difficulty: "medium", maxScore: 100, memorizeTime: 6,
        components: [
          { id: 'c1', label: 'Five Hills (Natural Defense)', icon: '⛰️', required: true },
          { id: 'c2', label: 'Cyclopean Stone Walls', icon: '🧱', required: true },
          { id: 'c3', label: 'Garrison Barracks', icon: '⛺', required: true },
          { id: 'c4', label: 'Iron Armories', icon: '⚔️', required: true },
          { id: 'c5', label: 'Elephant Stables', icon: '🐘', required: true }
        ],
        deco: ['🌲', '🔥', '🛡️']
      }
    ]
  },
  "mg-l5-trade": {
    id: "mg-l5-trade", levelId: 5,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Early Coinage",
        description: "Match the economic developments of the Mahajanapada period.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Punch-Marked Coins', right: 'First standardized currency', icon: '🪙' },
          { id: '2', left: 'Srenis (Guilds)', right: 'Organized merchant groups', icon: '🤝' },
          { id: '3', left: 'Iron Plowshare', right: 'Agricultural surplus generator', icon: '⛏️' },
          { id: '4', left: 'Northern Black Polished Ware', right: 'Luxury pottery for trade', icon: '🏺' }
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
