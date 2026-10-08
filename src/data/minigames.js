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

  "mg-l6-admin": {
    id: "mg-l6-admin", levelId: 6,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Imperial Administration",
        description: "Manage the vast Mauryan Empire by deploying officials and allocating resources.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "A distant province is experiencing a minor rebellion due to harsh local taxation. How does the central administration respond?",
            options: [
              { response: "Send Dhamma Mahamatras to mediate and ensure fair treatment", score: 50, explanation: "Ashoka appointed special officers (Dhamma Mahamatras) to ensure justice, welfare, and smooth administration." },
              { response: "Send the entire imperial army to crush them", score: -20, explanation: "An overreaction that strains state resources and violates Ashokan principles." },
              { response: "Ignore them, the empire is too big", score: 0, explanation: "The rebellion grows and disrupts local tax revenue." }
            ]
          },
          {
            id: "sc2",
            prompt: "The Arthashastra recommends strict surveillance for state security. How do you gather information from border towns?",
            options: [
              { response: "Deploy a network of spies disguised as merchants", score: 50, explanation: "The Mauryan state relied heavily on an extensive espionage network for political stability." },
              { response: "Build massive watchtowers everywhere", score: -20, explanation: "Too expensive and logistically impossible across the entire subcontinent." },
              { response: "Trust the local governors blindly", score: 0, explanation: "Governors might become corrupt or overly ambitious." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l6-infra": {
    id: "mg-l6-infra", levelId: 6,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "The Royal Highway",
        description: "Maintain the great Uttarapatha (Northern High Road) connecting the empire.",
        difficulty: "medium", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "You are planning a trade caravan from Pataliputra to Taxila. The monsoon rains have washed out a section of the road. Do you wait or force the crossing?",
            options: [
              { text: "Wait at a state-built rest house (dharmashala)", isSafe: true, msg: "The state maintained rest houses for this exact purpose. The cargo is safe." },
              { text: "Force the crossing", isSafe: false, msg: "Carts are lost in the mud. Goods are destroyed." }
            ]
          },
          {
            id: 'leg2',
            prompt: "Nearing Taxila, border officials demand to inspect your goods and collect tolls. Do you comply?",
            options: [
              { text: "Pay the state tolls", isSafe: true, msg: "Mauryan trade was highly regulated. Paying tolls ensures state protection." },
              { text: "Bribe the guards to avoid tolls", isSafe: false, msg: "Spies report your bribery. Your caravan is confiscated by the state." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l6-agri": {
    id: "mg-l6-agri", levelId: 6,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "State Resources",
        description: "Manage agriculture and state monopolies.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "New, uncultivated forest land has been conquered. How do you maximize its agricultural output?",
            options: [
              { response: "Establish state farms and resettle surplus population", score: 50, explanation: "The Mauryan state actively cleared forests and established state-run agricultural settlements to boost revenue." },
              { response: "Leave it as a hunting reserve for the King", score: -20, explanation: "A waste of potential revenue needed to sustain the massive army and bureaucracy." },
              { response: "Let private merchants buy it", score: 0, explanation: "The state loses direct control over a major revenue source." }
            ]
          },
          {
            id: "sc2",
            prompt: "There is a severe drought in the Deccan region. The state granaries in Pataliputra are full.",
            options: [
              { response: "Distribute grain from state granaries", score: 50, explanation: "The Sohgaura copper plate inscription mentions state granaries meant for relief during famines." },
              { response: "Sell the grain at a premium", score: -20, explanation: "Causes mass starvation and revolt against the emperor." },
              { response: "Keep the grain for the capital", score: 0, explanation: "The provinces suffer, reducing future tax revenues." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l6-edicts": {
    id: "mg-l6-edicts", levelId: 6,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Ashokan Edicts",
        description: "Construct a classic Ashokan Pillar to spread imperial communication.",
        difficulty: "medium", maxScore: 100, memorizeTime: 5,
        components: [
          { id: 'c1', label: 'Monolithic Stone Shaft', icon: '🏛️', required: true },
          { id: 'c2', label: 'Inverted Lotus Bell', icon: '🪷', required: true },
          { id: 'c3', label: 'Abacus (Platform)', icon: '🧱', required: true },
          { id: 'c4', label: 'Animal Capital (e.g., Lions)', icon: '🦁', required: true },
          { id: 'c5', label: 'Brahmi Inscriptions', icon: '📜', required: true }
        ],
        deco: ['🌲', '☀️']
      }
    ]
  },

  "mg-l7-math": {
    id: "mg-l7-math", levelId: 7,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Aryabhata's Sequence",
        description: "Arrange the mathematical concepts in the logical order they were developed to solve complex problems.",
        difficulty: "hard", maxScore: 100,
        events: [
          { id: 't1', label: 'Invention of Zero (0) as a placeholder', order: 1 },
          { id: 't2', label: 'Base-10 Decimal System', order: 2 },
          { id: 't3', label: 'Calculation of Pi (3.1416)', order: 3 },
          { id: 't4', label: 'Trigonometric Sine (Jya)', order: 4 }
        ]
      }
    ]
  },
  "mg-l7-astro": {
    id: "mg-l7-astro", levelId: 7,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Astronomy Observations",
        description: "Apply ancient Indian astronomical theories to observe the cosmos.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "You observe a solar eclipse. The traditional belief states that the demon Rahu is swallowing the sun. As a student of Aryabhata, what do you conclude?",
            options: [
              { response: "It is caused by the Moon casting a shadow on the Earth", score: 50, explanation: "Correct! Aryabhata correctly deduced that eclipses were caused by shadows of planets and moons, rejecting mythological explanations." },
              { response: "The gods are angry", score: -20, explanation: "Gupta-era astronomers favored mathematical calculation over superstition." },
              { response: "The sun is temporarily burning out", score: 0, explanation: "Incorrect astronomical theory." }
            ]
          },
          {
            id: "sc2",
            prompt: "Looking at the night sky, you notice the stars appear to move across the horizon. Why?",
            options: [
              { response: "The Earth rotates on its own axis", score: 50, explanation: "Brilliant! Aryabhata proposed that the apparent movement of stars is due to Earth's rotation on its axis." },
              { response: "The sky is a giant dome spinning around us", score: -20, explanation: "This is the geocentric model, which Aryabhata challenged regarding daily rotation." },
              { response: "The stars are falling", score: 0, explanation: "Incorrect observation." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l7-patterns": {
    id: "mg-l7-patterns", levelId: 7,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Pattern Recognition",
        description: "Match the Gupta-era knowledge artifacts to their fields of study.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Sushruta Samhita', right: 'Surgery and Medicine', icon: '🌿' },
          { id: '2', left: 'Surya Siddhanta', right: 'Astronomy and Time', icon: '✨' },
          { id: '3', left: 'Iron Pillar of Delhi', right: 'Advanced Metallurgy', icon: '🗿' },
          { id: '4', left: 'Kamasutra', right: 'Human Behavior & Sociology', icon: '📜' }
        ]
      }
    ]
  },
  "mg-l7-manuscript": {
    id: "mg-l7-manuscript", levelId: 7,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "The Scholar's Journey",
        description: "Travel to Nalanda Mahavihara to secure a rare manuscript.",
        difficulty: "medium", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "You arrive at the gates of Nalanda. The Dvarapala (gatekeeper) tests your knowledge before entry. What is the fundamental shape of the Earth?",
            options: [
              { text: "Spherical", isSafe: true, msg: "The gatekeeper nods. You are granted entry to the university." },
              { text: "Flat and infinite", isSafe: false, msg: "The gatekeeper turns you away. Gupta scholars knew the Earth was spherical." }
            ]
          },
          {
            id: 'leg2',
            prompt: "Inside the grand library, Dharmaganja, you find a decaying birch-bark manuscript. How do you preserve it?",
            options: [
              { text: "Copy it onto palm leaves", isSafe: true, msg: "Palm leaves were the standard, durable medium for texts. The knowledge is saved." },
              { text: "Leave it in the sun to dry", isSafe: false, msg: "The brittle bark crumbles into dust. The knowledge is lost forever." }
            ]
          }
        ]
      }
    ]
  },

  "mg-l8-rockcut": {
    id: "mg-l8-rockcut", levelId: 8,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Excavation Sequence",
        description: "Arrange the stages of excavating a monolithic rock-cut temple like Kailasanatha.",
        difficulty: "hard", maxScore: 100,
        events: [
          { id: 't1', label: 'Trenching: Cutting deep trenches into the basalt cliff', order: 1 },
          { id: 't2', label: 'Top-Down Excavation: Carving the roof before the base', order: 2 },
          { id: 't3', label: 'Rough Hewing: Blocking out the main structural shapes', order: 3 },
          { id: 't4', label: 'Detailed Relief Carving: Sculpting intricate panels', order: 4 }
        ]
      }
    ]
  },
  "mg-l8-engineering": {
    id: "mg-l8-engineering", levelId: 8,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Structural Planning",
        description: "Solve ancient engineering and material challenges.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "You are building a massive brick stupa. How do you prevent the massive dome from collapsing outward under its own weight?",
            options: [
              { response: "Use interlocking bricks and a solid core", score: 50, explanation: "Correct. Ancient stupas like Sanchi used a solid rubble core surrounded by interlocking baked bricks to distribute the load." },
              { response: "Support it entirely with wooden pillars", score: -20, explanation: "Wood rots over time and cannot support the sheer weight of a massive masonry dome." },
              { response: "Build it hollow", score: 0, explanation: "A hollow masonry dome of that size without a reinforcing core would collapse." }
            ]
          },
          {
            id: "sc2",
            prompt: "You need to construct a tall temple tower (Shikhara) using dry masonry (no mortar). How do you ensure stability?",
            options: [
              { response: "Use corbelling techniques and iron dowels", score: 50, explanation: "Brilliant. Indian architects used corbelled arches and iron clamps/dowels to hold giant stones together without mortar." },
              { response: "Stack the stones loosely", score: -20, explanation: "The tower collapses during the first monsoon storm." },
              { response: "Glue them with mud", score: 0, explanation: "Mud washes away. True dry masonry relies on gravity and precision." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l8-temple": {
    id: "mg-l8-temple", levelId: 8,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Nagara Architecture",
        description: "Memorize and reconstruct the classic components of a North Indian (Nagara) temple.",
        difficulty: "medium", maxScore: 100, memorizeTime: 6,
        components: [
          { id: 'c1', label: 'Jagati (Raised Platform)', icon: '🧱', required: true },
          { id: 'c2', label: 'Mandapa (Assembly Hall)', icon: '🏛️', required: true },
          { id: 'c3', label: 'Garbhagriha (Inner Sanctum)', icon: '🕉️', required: true },
          { id: 'c4', label: 'Shikhara (Tower)', icon: '🏔️', required: true },
          { id: 'c5', label: 'Amalaka (Crowning Disk)', icon: '⚙️', required: true }
        ],
        deco: ['🚩', '🔔']
      }
    ]
  },
  "mg-l8-water": {
    id: "mg-l8-water", levelId: 8,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Stepwell Hydraulics",
        description: "Design a stepwell (Baoli) that can survive the harsh dry seasons and monsoons.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The region has a deeply fluctuating water table. How do you design the well to ensure year-round access?",
            options: [
              { response: "Build a deep, multi-storied stepped trench to the lowest water table", score: 50, explanation: "This allows people to simply walk down the steps to the water level, regardless of the season." },
              { response: "Build a shallow, wide pool on the surface", score: -20, explanation: "The water evaporates quickly in the summer heat." },
              { response: "Rely solely on rainfall", score: 0, explanation: "Fails during the dry season." }
            ]
          },
          {
            id: "sc2",
            prompt: "The walls of the deep stepwell face immense pressure from the surrounding earth. How do you stabilize them?",
            options: [
              { response: "Build subterranean pavilions and cross-bracing columns", score: 50, explanation: "Correct! The multi-storied pavilions not only provided shade but acted as structural cross-bracing." },
              { response: "Line it with thin mud-brick", score: -20, explanation: "The walls collapse inward, destroying the well." },
              { response: "Dig wider rather than deeper", score: 0, explanation: "You fail to reach the permanent water table." }
            ]
          }
        ]
      }
    ]
  },

  "mg-l9-crafts": {
    id: "mg-l9-crafts", levelId: 9,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Regional Textiles",
        description: "Match the traditional textile craft to its geographic region of origin.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Kanjeevaram Silk', right: 'Tamil Nadu', icon: '🧵' },
          { id: '2', left: 'Pashmina Shawl', right: 'Kashmir', icon: '🧣' },
          { id: '3', left: 'Ikat Weaving', right: 'Telangana & Odisha', icon: '👘' },
          { id: '4', left: 'Chikankari Embroidery', right: 'Uttar Pradesh', icon: '🪡' }
        ]
      }
    ]
  },
  "mg-l9-performance": {
    id: "mg-l9-performance", levelId: 9,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Rhythm and Rasa",
        description: "Sequence the elements of a traditional Indian classical dance performance.",
        difficulty: "hard", maxScore: 100,
        events: [
          { id: 't1', label: 'Mangalacharan (Invocation of deities)', order: 1 },
          { id: 't2', label: 'Nritta (Pure rhythmic dance without narrative)', order: 2 },
          { id: 't3', label: 'Abhinaya (Expressional dance conveying a story)', order: 3 },
          { id: 't4', label: 'Moksha (Conclusion and spiritual liberation)', order: 4 }
        ]
      }
    ]
  },
  "mg-l9-festivals": {
    id: "mg-l9-festivals", levelId: 9,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Seasonal Festivals",
        description: "Understand the agricultural and social roots of Indian festivals.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The winter harvest is complete in Punjab. How does the community celebrate and mark the changing of the solar season?",
            options: [
              { response: "By lighting bonfires and celebrating Lohri", score: 50, explanation: "Correct. Lohri marks the passing of the winter solstice and the harvest of rabi crops." },
              { response: "By fasting for a month", score: -20, explanation: "Harvest festivals are typically times of feast and community gathering, not prolonged fasting." },
              { response: "By remaining entirely silent", score: 0, explanation: "Lohri is famous for its singing, dancing (Bhangra), and joyous communal energy." }
            ]
          },
          {
            id: "sc2",
            prompt: "In Kerala, the legendary King Mahabali is believed to return once a year. Which festival honors his equitable rule and the rice harvest?",
            options: [
              { response: "Onam", score: 50, explanation: "Onam is the major harvest festival of Kerala, marked by boat races, flower carpets (Pookkalam), and feasts." },
              { response: "Diwali", score: -20, explanation: "Diwali is widely celebrated across India but is primarily associated with the return of Lord Rama to Ayodhya, not Mahabali." },
              { response: "Holi", score: 0, explanation: "Holi is the festival of colors, primarily celebrating the arrival of spring." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l9-preservation": {
    id: "mg-l9-preservation", levelId: 9,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "Preserving the Past",
        description: "Travel to document and preserve fading cultural practices.",
        difficulty: "hard", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "You meet an elderly artisan who is the last master of a unique bronze casting method. How do you preserve this knowledge?",
            options: [
              { text: "Apprentice young students to learn it hands-on", isSafe: true, msg: "Living heritage is best preserved through active, generational practice." },
              { text: "Just take a photograph", isSafe: false, msg: "A photograph cannot teach the tactile skills and unwritten knowledge of the craft. The lineage dies." }
            ]
          },
          {
            id: 'leg2',
            prompt: "A tribal community shares an oral epic song with you. How should it be recorded?",
            options: [
              { text: "Record the audio with the community's context and permission", isSafe: true, msg: "Ethical documentation respects the community's ownership while archiving the song." },
              { text: "Write down the lyrics and claim you wrote it", isSafe: false, msg: "This is cultural theft. The community bans you from their village." }
            ]
          }
        ]
      }
    ]
  },

  "mg-l10-maritime": {
    id: "mg-l10-maritime", levelId: 10,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "Maritime Expedition",
        description: "Navigate a Chola naval fleet across the Bay of Bengal to Southeast Asia.",
        difficulty: "hard", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "Departing from Nagapattinam. The monsoon winds are shifting. How do you chart the course to Srivijaya (Indonesia)?",
            options: [
              { text: "Use the northeast monsoon winds for a direct crossing", isSafe: true, msg: "The Cholas mastered the monsoon winds, allowing for rapid open-ocean navigation." },
              { text: "Hug the coastline all the way around", isSafe: false, msg: "It takes too long. Supplies run out and pirates raid the fleet." }
            ]
          },
          {
            id: 'leg2',
            prompt: "Arriving at the Strait of Malacca, local pirates demand a tribute to pass.",
            options: [
              { text: "Deploy the imperial navy to secure the strait", isSafe: true, msg: "Rajendra Chola I used naval power to secure these vital trade bottlenecks." },
              { text: "Pay the pirates heavily", isSafe: false, msg: "The pirates keep extorting you. Your expedition goes bankrupt." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l10-water": {
    id: "mg-l10-water", levelId: 10,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Irrigation Management",
        description: "Manage the agrarian backbone of the Chola empire.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The Kaveri river floods annually. How do you harness this for agriculture?",
            options: [
              { response: "Build massive anicuts (dams) and branching canals", score: 50, explanation: "The Grand Anicut (Kallanai) and Chola canal systems turned the Kaveri delta into a rice bowl." },
              { response: "Build higher walls around the river", score: -20, explanation: "This wastes the fertile silt and starves the fields of water." },
              { response: "Let the floods happen naturally", score: 0, explanation: "The floods destroy crops and villages unpredictably." }
            ]
          },
          {
            id: "sc2",
            prompt: "A village lake (Eri) is silting up, reducing its water capacity.",
            options: [
              { response: "Assign the village assembly (Sabha) to organize desilting", score: 50, explanation: "Local village assemblies in the Chola period had specialized 'Tank Committees' (Eri-variyam) to manage water." },
              { response: "Wait for the Emperor to fix it", score: -20, explanation: "The central government is too far away. The crops die." },
              { response: "Abandon the lake", score: 0, explanation: "You lose a massive source of agricultural revenue." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l10-bronze": {
    id: "mg-l10-bronze", levelId: 10,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Lost-Wax Casting",
        description: "Sequence the cire-perdue (lost-wax) method used to create famous Chola bronzes like the Nataraja.",
        difficulty: "hard", maxScore: 100,
        events: [
          { id: 't1', label: 'Sculpt the exact figure in beeswax', order: 1 },
          { id: 't2', label: 'Coat the wax in fine clay and let it dry', order: 2 },
          { id: 't3', label: 'Heat the mold to melt and drain the wax', order: 3 },
          { id: 't4', label: 'Pour molten bronze into the hollow clay mold', order: 4 }
        ]
      }
    ]
  },
  "mg-l10-governance": {
    id: "mg-l10-governance", levelId: 10,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Local Administration",
        description: "Match the Chola administrative terms to their functions.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Ur / Sabha', right: 'Village Assembly', icon: '🏛️' },
          { id: '2', left: 'Nadu', right: 'District or Province', icon: '🗺️' },
          { id: '3', left: 'Nagaram', right: 'Merchant Town', icon: '⚖️' },
          { id: '4', left: 'Brahmadeya', right: 'Land granted to scholars', icon: '📜' }
        ]
      }
    ]
  },

  "mg-l11-planning": {
    id: "mg-l11-planning", levelId: 11,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Urban Planning",
        description: "Develop the urban zones of Vijayanagara to balance royal, sacred, and civic needs.",
        difficulty: "hard", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The city population is booming. Where do you establish the new residential wards (puras)?",
            options: [
              { response: "Around major temple complexes", score: 50, explanation: "Correct. Vijayanagara's 'puras' were centered around major temples, which acted as economic and social hubs." },
              { response: "Inside the Royal Enclosure", score: -20, explanation: "The Royal Enclosure was strictly for the monarch and elite administration, not general populace." },
              { response: "Outside the outermost defensive walls", score: 0, explanation: "Leaves the population vulnerable to Deccan Sultanate raids." }
            ]
          },
          {
            id: "sc2",
            prompt: "You need a monumental platform for the King to observe the grand Mahanavami festival and military parades.",
            options: [
              { response: "Build the Mahanavami Dibba in the Royal Center", score: 50, explanation: "The Mahanavami Dibba was a massive stone platform used exactly for this purpose, projecting royal power." },
              { response: "Build it in the Sacred Center", score: -20, explanation: "The Sacred Center was for temples and priests, not military parades." },
              { response: "Build a wooden stage in the bazaar", score: 0, explanation: "Wooden structures would not support the royal court or project imperial permanence." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l11-water": {
    id: "mg-l11-water", levelId: 11,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Water Architecture",
        description: "Manage the complex hydraulic engineering of Hampi's arid landscape.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "The Tungabhadra river is lower in elevation than the Royal Center. How do you supply water to the palace baths?",
            options: [
              { response: "Build a network of stone aqueducts (Rayakaluve)", score: 50, explanation: "Vijayanagara engineers built miles of elevated stone channels (Rayakaluve) to gravity-feed water into the city." },
              { response: "Have elephants carry water daily", score: -20, explanation: "Extremely inefficient for a city of half a million people." },
              { response: "Dig deeper wells", score: 0, explanation: "The solid granite bedrock makes digging deep wells nearly impossible." }
            ]
          },
          {
            id: "sc2",
            prompt: "Monsoon rains are heavy but brief. How do you store the runoff from the granite hills?",
            options: [
              { response: "Construct massive stepped tanks (Pushkarini)", score: 50, explanation: "Stepped tanks elegantly captured runoff and provided ritual and civic water year-round." },
              { response: "Let it flow into the river", score: -20, explanation: "The city will suffer severe drought in the summer." },
              { response: "Store it in clay pots", score: 0, explanation: "Insufficient scale for an imperial capital." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l11-trade": {
    id: "mg-l11-trade", levelId: 11,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "The Grand Bazaar",
        description: "Match the international trade goods found in Vijayanagara's markets to their origins.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'War Horses', right: 'Arabia & Persia', icon: '🐎' },
          { id: '2', left: 'Spices & Pepper', right: 'Malabar Coast', icon: '🌿' },
          { id: '3', left: 'Precious Gems (Diamonds)', right: 'Golconda Mines', icon: '💎' },
          { id: '4', left: 'Ming Porcelain', right: 'China', icon: '🏺' }
        ]
      }
    ]
  },
  "mg-l11-architecture": {
    id: "mg-l11-architecture", levelId: 11,
    variations: [
      {
        variationId: "v1", type: "buildFromMemory", title: "Vitthala Temple Assembly",
        description: "Memorize and reconstruct the iconic elements of the Vitthala Temple complex.",
        difficulty: "medium", maxScore: 100, memorizeTime: 6,
        components: [
          { id: 'c1', label: 'Stone Chariot (Garuda Shrine)', icon: '🛕', required: true },
          { id: 'c2', label: 'Musical Pillars (Maha Mandapa)', icon: '🏛️', required: true },
          { id: 'c3', label: 'Gopuram (Monumental Gate)', icon: '⛩️', required: true },
          { id: 'c4', label: 'Kalyana Mandapa (Marriage Hall)', icon: '💍', required: true },
          { id: 'c5', label: 'Pushkarini (Temple Tank)', icon: '🌊', required: true }
        ],
        deco: ['🐘', '☀️']
      }
    ]
  },

  "mg-l12-story-seq": {
    id: "mg-l12-story-seq", levelId: 12,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "The Panchatantra",
        description: "Sequence the classic fable of 'The Monkey and the Crocodile' to restore the narrative logic.",
        difficulty: "medium", maxScore: 100,
        events: [
          { id: 't1', label: 'The monkey shares sweet jamun fruits with his friend, the crocodile.', order: 1 },
          { id: 't2', label: 'The crocodile\'s wife demands to eat the monkey\'s sweet heart.', order: 2 },
          { id: 't3', label: 'The crocodile invites the monkey for a ride across the river to his home.', order: 3 },
          { id: 't4', label: 'The monkey tricks the crocodile, saying he left his heart on the tree.', order: 4 }
        ]
      }
    ]
  },
  "mg-l12-folk-art": {
    id: "mg-l12-folk-art", levelId: 12,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Folk Art Traditions",
        description: "Match the traditional Indian folk art style to its regional context or canvas.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Warli Painting', right: 'Tribal art using rice paste on mud walls (Maharashtra)', icon: '🔺' },
          { id: '2', left: 'Madhubani (Mithila)', right: 'Intricate geometric patterns from Bihar', icon: '🎨' },
          { id: '3', left: 'Pattachitra', right: 'Cloth-based scroll painting from Odisha', icon: '📜' },
          { id: '4', left: 'Kalighat Painting', right: 'Watercolor folk art from Bengal', icon: '🖌️' }
        ]
      }
    ]
  },
  "mg-l12-language": {
    id: "mg-l12-language", levelId: 12,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Scripts and Languages",
        description: "Identify how classical Indian literature was recorded and preserved.",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "You want to record a royal decree that will last for centuries and be read by commoners. What script and medium do you choose?",
            options: [
              { response: "Carve it into a rock face using Brahmi script", score: 50, explanation: "Correct. Brahmi was the mother script for many Indian languages, and rock inscriptions survive for millennia." },
              { response: "Write it on palm leaves in Sanskrit", score: -20, explanation: "Palm leaves decay over time, and classical Sanskrit was not the language of the common masses." },
              { response: "Memorize it and tell the court", score: 0, explanation: "Oral traditions are powerful but decrees need permanent, unalterable records." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l12-story-dec": {
    id: "mg-l12-story-dec", levelId: 12,
    variations: [
      {
        variationId: "v1", type: "tradeRoute", title: "The Bard's Tale",
        description: "You are a wandering storyteller (Kathakar). Navigate the challenges of performance.",
        difficulty: "hard", maxScore: 150,
        route: [
          {
            id: 'leg1',
            prompt: "You arrive at a village square. The crowd is diverse—farmers, children, and elders. What do you perform?",
            options: [
              { text: "A localized, relatable folk version of the Ramayana", isSafe: true, msg: "The crowd loves it. Regional adaptations (like the Kamba Ramayanam) connected deeply with local audiences." },
              { text: "A complex philosophical treatise in high Sanskrit", isSafe: false, msg: "The crowd is bored and leaves. You earn no alms." }
            ]
          },
          {
            id: 'leg2',
            prompt: "To accompany your story, which traditional prop do you use?",
            options: [
              { text: "A painted scroll (Phad) showing the sequence of events", isSafe: true, msg: "Scrolls like the Phad or Kalamkari were vital visual aids for storytellers." },
              { text: "A heavy stone inscription", isSafe: false, msg: "You can't carry it, and the crowd can't read it from afar." }
            ]
          }
        ]
      }
    ]
  },

  "mg-l13-chaturanga": {
    id: "mg-l13-chaturanga", levelId: 13,
    variations: [
      {
        variationId: "v1", type: "strategyBoard", title: "Chaturanga: Ashva's Path",
        description: "The ancient ancestor of chess! Use the Ashva (Knight) to capture the Raja (King) before you run out of moves.",
        difficulty: "hard", maxScore: 150,
        boardSize: 5,
        maxMoves: 4,
        rules: "Move the Ashva (Knight) in an L-shape to capture all targets within 4 moves.",
        playerPiece: { type: "ashva", r: 4, c: 2, icon: "♞" },
        targets: [
          { id: "t1", r: 1, c: 3, icon: "♟️" },
          { id: "t2", r: 0, c: 1, icon: "♚" }
        ],
        obstacles: [
          { id: "o1", r: 2, c: 2, icon: "🏯" }
        ]
      }
    ]
  },
  "mg-l13-pachisi": {
    id: "mg-l13-pachisi", levelId: 13,
    variations: [
      {
        variationId: "v1", type: "historicalDecision", title: "Pachisi Strategy",
        description: "Make strategic choices in the Royal Game of India (ancestor to Ludo).",
        difficulty: "medium", maxScore: 100,
        scenarios: [
          {
            id: "sc1",
            prompt: "You throw the cowrie shells and score a 25. You have a piece near the center, and a piece on the starting track. What is the best strategy?",
            options: [
              { response: "Move a piece to land on a Castle (Charkoni) to be safe from capture", score: 50, explanation: "Safe spaces (castles) are critical in Pachisi to prevent opponents from knocking your pieces back to the start." },
              { response: "Charge aggressively into the open board", score: -20, explanation: "Your piece gets instantly captured by an opponent and sent back." },
              { response: "Do not move", score: 0, explanation: "You waste a perfect throw." }
            ]
          }
        ]
      }
    ]
  },
  "mg-l13-evolution": {
    id: "mg-l13-evolution", levelId: 13,
    variations: [
      {
        variationId: "v1", type: "timeline", title: "Evolution of Play",
        description: "Sequence the history of Indian traditional games.",
        difficulty: "medium", maxScore: 100,
        events: [
          { id: 't1', label: 'Harappan cubical dice made of terracotta (Indus Valley)', order: 1 },
          { id: 't2', label: 'Mentions of ritual dice games in the Vedic texts', order: 2 },
          { id: 't3', label: 'Invention of Chaturanga (Ancestor of Chess) in the Gupta period', order: 3 },
          { id: 't4', label: 'Development of Moksha Patam (Snakes and Ladders) to teach morality', order: 4 }
        ]
      }
    ]
  },
  "mg-l13-moksha": {
    id: "mg-l13-moksha", levelId: 13,
    variations: [
      {
        variationId: "v1", type: "artifactMatch", title: "Moksha Patam",
        description: "Match the original moral concepts of Snakes and Ladders to their gameplay mechanics.",
        difficulty: "medium", maxScore: 100,
        pairs: [
          { id: '1', left: 'Ladder: Vidya (Knowledge)', right: 'Ascends towards enlightenment (Moksha)', icon: '🪜' },
          { id: '2', left: 'Snake: Krodh (Anger)', right: 'Drags the soul down to lower planes', icon: '🐍' },
          { id: '3', left: 'Ladder: Daya (Compassion)', right: 'A virtue that lifts the player higher', icon: '🪜' },
          { id: '4', left: 'Snake: Lobh (Greed)', right: 'A vice that resets progress', icon: '🐍' }
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
