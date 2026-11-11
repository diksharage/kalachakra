export const questData = [
  // LEVEL 1: Early Human Communities
  {
    id: 'q_l1_main',
    levelId: 1,
    levelName: 'Early Human Communities',
    type: 'main',
    titleKey: 'quest.q_l1_main.title',
    descKey: 'quest.q_l1_main.desc',
    hintKey: 'quest.q_l1_main.hint',
    title: 'Sparks of Survival',
    description: 'Explore rock shelters, gather natural stone and wood resources, and craft the earliest paleolithic stone tools for your community.',
    hint: 'Explore Level 1 locations or use the Civilization Builder to establish a Stone Tool Workshop.',
    objectives: [
      { type: 'explore', target: 'bhimbetka_region', required: 1, labelKey: 'quest.obj.explore_cave', label: 'Explore Bhimbetka rock shelters on the Heritage Map', route: '/explore' },
      { type: 'discover', target: 'hand_axe', required: 1, labelKey: 'quest.obj.find_axe', label: 'Discover the Paleolithic Hand Axe', route: '/journey/level/1' },
      { type: 'build', target: 'tool_workshop', required: 1, labelKey: 'quest.obj.build_tools', label: 'Construct a Stone Tool Area in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 30, inventory: { wood: 2, stone: 2, hand_axe: 1 } }
  },

  // LEVEL 2: Early Farming Communities
  {
    id: 'q_l2_farming',
    levelId: 2,
    levelName: 'Early Farming Communities',
    type: 'main',
    titleKey: 'quest.q_l2_farming.title',
    descKey: 'quest.q_l2_farming.desc',
    hintKey: 'quest.q_l2_farming.hint',
    title: 'Seeds of the First Villages',
    description: 'Transition from nomadic foraging to settled agriculture by cultivating fertile river plains and storing surplus grain in pottery.',
    hint: 'Visit the Mehrgarh region on the Heritage Map and cultivate crops in Level 2 or the Civilization Builder.',
    objectives: [
      { type: 'explore', target: 'mehrgarh_region', required: 1, labelKey: 'quest.obj.explore_plains', label: 'Survey the Mehrgarh farming region on the Heritage Map', route: '/explore' },
      { type: 'build', target: 'crop_field', required: 1, labelKey: 'quest.obj.build_crops', label: 'Establish a Crop Field in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 35, inventory: { grain: 3, water: 2, early_pottery: 1 } }
  },

  // LEVEL 3: Indus Valley Civilization
  {
    id: 'q_l3_drainage',
    levelId: 3,
    levelName: 'Indus Valley Civilization',
    type: 'main',
    titleKey: 'quest.q_l3_drainage.title',
    descKey: 'quest.q_l3_drainage.desc',
    hintKey: 'quest.q_l3_drainage.hint',
    title: 'Mastery of Urban Sanitation',
    description: 'Engineer the iconic covered brick drains and public water tanks that made Harappan cities pioneers of civic planning.',
    hint: 'Use baked bricks and water resources in the Civilization Builder or Level 3 to construct drainage and bath facilities.',
    objectives: [
      { type: 'build', target: 'drain_channel', required: 2, labelKey: 'quest.obj.build_drainage', label: 'Construct 2 Covered Drain Channels in the Builder', route: '/builder' },
      { type: 'build', target: 'public_bath', required: 1, labelKey: 'quest.obj.build_bath', label: 'Construct a Public Bath Tank', route: '/builder' }
    ],
    rewards: { legacy: 50, inventory: { brick: 3, steatite_seal: 1 } }
  },

  // LEVEL 3: Side Quest — Mini-Game
  {
    id: 'q_minigame_l3',
    levelId: 3,
    levelName: 'Indus Valley Civilization',
    type: 'side',
    titleKey: 'quest.q_minigame_l3.title',
    descKey: 'quest.q_minigame_l3.desc',
    hintKey: 'quest.q_minigame_l3.hint',
    title: 'Harappan Hydraulic Engineer',
    description: 'Connect the urban water channels in the Indus Drainage Puzzle or verify your knowledge of Harappan engineering.',
    hint: 'Play the Indus Drainage mini-game in Level 3 or complete the Quest Knowledge Check.',
    objectives: [
      { type: 'minigame', target: 'mg_indus_drainage', required: 1, labelKey: 'quest.obj.complete_l3_minigame', label: 'Complete the Indus Drainage Mini-Game', route: '/journey/level/3/play' }
    ],
    rewards: { legacy: 40, inventory: { standardized_weight: 1, brick: 2 } }
  },

  // LEVEL 4: Early Indian Trade Networks
  {
    id: 'q_l4_trade',
    levelId: 4,
    levelName: 'Early Indian Trade Networks',
    type: 'main',
    titleKey: 'quest.q_l4_trade.title',
    descKey: 'quest.q_l4_trade.desc',
    hintKey: 'quest.q_l4_trade.hint',
    title: 'Winds of Maritime Commerce',
    description: 'Chart coastal ports and overland caravan routes that connected Indian artisans with distant markets across the seas.',
    hint: 'Explore coastal trade hubs on the Heritage Map and build a Trading Dock.',
    objectives: [
      { type: 'discover', target: 'maritime_cargo', required: 1, labelKey: 'quest.obj.discover_dock', label: 'Discover Western Coast Maritime Cargo routes', route: '/explore' },
      { type: 'build', target: 'trade_dock', required: 1, labelKey: 'quest.obj.build_port', label: 'Construct a Trading Dock in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 45, inventory: { textiles: 2, spices: 2 } }
  },

  // LEVEL 5: Mahajanapadas & Early Kingdoms
  {
    id: 'q_l5_kingdoms',
    levelId: 5,
    levelName: 'Mahajanapadas & Early Kingdoms',
    type: 'main',
    titleKey: 'quest.q_l5_kingdoms.title',
    descKey: 'quest.q_l5_kingdoms.desc',
    hintKey: 'quest.q_l5_kingdoms.hint',
    title: 'Rise of the Sixteen States',
    description: 'Fortify an emerging Mahajanapada capital and introduce silver punch-marked coinage and iron tools to expand agriculture.',
    hint: 'Explore the Magadha region and construct an Assembly Hall or Fortification Wall in the Builder.',
    objectives: [
      { type: 'build', target: 'assembly_hall', required: 1, labelKey: 'quest.obj.build_capital', label: 'Construct an Assembly Hall (Santhagara) in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 50, inventory: { punch_marked_coin: 2, iron_tool: 2 } }
  },

  // LEVEL 6: Mauryan Empire
  {
    id: 'q_l6_ashoka',
    levelId: 6,
    levelName: 'Mauryan Empire',
    type: 'main',
    titleKey: 'quest.q_l6_ashoka.title',
    descKey: 'quest.q_l6_ashoka.desc',
    hintKey: 'quest.q_l6_ashoka.hint',
    title: 'Edicts of Dhamma',
    description: 'Investigate Emperor Ashoka’s rock and pillar inscriptions and erect a sandstone edict pillar along the royal highway.',
    hint: 'Complete the Ashokan Edict investigation and construct an Edict Pillar in the Builder.',
    objectives: [
      { type: 'discover', target: 'ashokan_edict', required: 1, labelKey: 'quest.obj.discover_pillar', label: 'Uncover the Ashokan Edict in Investigations or Map', route: '/investigations/ashokan-edict-investigation' },
      { type: 'build', target: 'edict_pillar', required: 1, labelKey: 'quest.obj.build_pillar', label: 'Erect an Edict Pillar in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 60, inventory: { ashokan_edict: 1, royal_decree: 1 } }
  },

  // LEVEL 7: Gupta Period & Knowledge
  {
    id: 'q_l7_science',
    levelId: 7,
    levelName: 'Gupta Period & Knowledge',
    type: 'main',
    titleKey: 'quest.q_l7_science.title',
    descKey: 'quest.q_l7_science.desc',
    hintKey: 'quest.q_l7_science.hint',
    title: 'Scholars of the Golden Age',
    description: 'Explore the astronomical and mathematical breakthroughs of Aryabhata and ancient Indian universities like Nalanda.',
    hint: 'Discover Aryabhata’s legacy on the Heritage Map and solve the Gupta mathematical challenge.',
    objectives: [
      { type: 'discover', target: 'aryabhata', required: 1, labelKey: 'quest.obj.discover_aryabhatiya', label: 'Discover Aryabhata & Ujjain Observatory on the Map', route: '/explore' },
      { type: 'solve', target: 'gupta-math-01', required: 1, labelKey: 'quest.obj.solve_math', label: 'Complete the Gupta Mathematics Challenge', route: '/journey/level/7/play' }
    ],
    rewards: { legacy: 65, inventory: { gupta_manuscript: 1, astronomy_tool: 1 } }
  },

  // LEVEL 8: Indian Architecture & Engineering
  {
    id: 'q_l8_architecture',
    levelId: 8,
    levelName: 'Indian Architecture & Engineering',
    type: 'main',
    titleKey: 'quest.q_l8_architecture.title',
    descKey: 'quest.q_l8_architecture.desc',
    hintKey: 'quest.q_l8_architecture.hint',
    title: 'Monuments Carved in Stone',
    description: 'Study rock-cut caves, stupas, and structural temples engineered with interlocking stone joinery and stepwells.',
    hint: 'Construct a Rock-Cut Shrine in the Civilization Builder or explore Sanchi and Ajanta on the Heritage Map.',
    objectives: [
      { type: 'build', target: 'rock_cut_shrine', required: 1, labelKey: 'quest.obj.build_temple', label: 'Construct a Rock-Cut Shrine in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 70, inventory: { carved_stone: 2, architectural_plan: 1 } }
  },

  // LEVEL 9: Indian Cultural Traditions
  {
    id: 'q_l9_culture',
    levelId: 9,
    levelName: 'Indian Cultural Traditions',
    type: 'main',
    titleKey: 'quest.q_l9_culture.title',
    descKey: 'quest.q_l9_culture.desc',
    hintKey: 'quest.q_l9_culture.hint',
    title: 'Rhythm, Rasa & Living Crafts',
    description: 'Explore classical performing arts codified in the Natyashastra alongside regional folk music, textiles, and bronze casting.',
    hint: 'Explore Level 9 cultural traditions or verify your knowledge in the Quest Quiz.',
    objectives: [
      { type: 'discover', target: 'traditional_dance', required: 1, labelKey: 'quest.obj.discover_natya', label: 'Discover Classical & Folk Performing Traditions', route: '/journey/level/9/play' }
    ],
    rewards: { legacy: 70, inventory: { bronze_statue: 1, folk_instrument: 1 } }
  },

  // LEVEL 10: Chola & Regional Civilizations
  {
    id: 'q_l10_chola',
    levelId: 10,
    levelName: 'Chola & Regional Civilizations',
    type: 'main',
    titleKey: 'quest.q_l10_chola.title',
    descKey: 'quest.q_l10_chola.desc',
    hintKey: 'quest.q_l10_chola.hint',
    title: 'Temples, Tanks & Maritime Guilds',
    description: 'Develop the Kaveri delta with sluice-gate irrigation tanks, towering vimana temples, and ocean-going merchant fleets.',
    hint: 'Construct a Royal Vimana Temple and Maritime Shipyard in the Civilization Builder.',
    objectives: [
      { type: 'build', target: 'royal_temple', required: 1, labelKey: 'quest.obj.build_chola_temple', label: 'Construct a Royal Vimana Temple in the Builder', route: '/builder' },
      { type: 'build', target: 'shipyard', required: 1, labelKey: 'quest.obj.build_chola_navy', label: 'Construct a Maritime Shipyard in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 80, inventory: { chola_bronze: 1, naval_supplies: 2 } }
  },

  // LEVEL 11: Vijayanagara & Medieval Heritage
  {
    id: 'q_l11_vijayanagara',
    levelId: 11,
    levelName: 'Vijayanagara & Medieval Heritage',
    type: 'main',
    titleKey: 'quest.q_l11_vijayanagara.title',
    descKey: 'quest.q_l11_vijayanagara.desc',
    hintKey: 'quest.q_l11_vijayanagara.hint',
    title: 'Splendor of Hampi',
    description: 'Explore the bustling bazaars of Vijayanagara and investigate the architectural mastery of the Stone Chariot at Vittala Temple.',
    hint: 'Explore Hampi on the Heritage Map and complete the Stone Chariot investigation.',
    objectives: [
      { type: 'explore', target: 'hampi_vijayanagara', required: 1, labelKey: 'quest.obj.explore_bazaar', label: 'Explore Hampi & the Virupaksha Bazaar on the Map', route: '/explore' },
      { type: 'investigate', target: 'hampi-architecture-investigation', required: 1, labelKey: 'quest.obj.investigate_hampi', label: 'Complete the Stone Chariot of Hampi Investigation', route: '/investigations/hampi-architecture-investigation' }
    ],
    rewards: { legacy: 85, inventory: { vijayanagara_coin: 2, temple_carving: 1 } }
  },

  // LEVEL 12: Stories, Literature & Folk Arts
  {
    id: 'q_l12_stories',
    levelId: 12,
    levelName: 'Stories, Literature & Folk Arts',
    type: 'main',
    titleKey: 'quest.q_l12_stories.title',
    descKey: 'quest.q_l12_stories.desc',
    hintKey: 'quest.q_l12_stories.hint',
    title: 'Timeless Epics & Fables',
    description: 'Preserve India’s oral storytelling traditions, palm-leaf manuscripts, shadow puppetry, and the fables of the Panchatantra.',
    hint: 'Explore Level 12 literary traditions or complete the Quest Knowledge Check.',
    objectives: [
      { type: 'discover', target: 'jataka_tales', required: 1, labelKey: 'quest.obj.discover_pancha', label: 'Discover Ancient Fables & Palm-Leaf Manuscripts', route: '/journey/level/12/play' }
    ],
    rewards: { legacy: 85, inventory: { palm_leaf_manuscript: 1, folk_tale: 1 } }
  },

  // LEVEL 13: Traditional Indian Games
  {
    id: 'q_l13_games',
    levelId: 13,
    levelName: 'Traditional Indian Games',
    type: 'main',
    titleKey: 'quest.q_l13_games.title',
    descKey: 'quest.q_l13_games.desc',
    hintKey: 'quest.q_l13_games.hint',
    title: 'Strategy of the Ancients',
    description: 'Uncover how Chaturanga, Pachisi, Pallanguzhi, and Ganjifa cultivated mathematical reasoning, tactics, and community bonds.',
    hint: 'Explore Level 13 games and construct a Royal Game Pavilion in the Builder.',
    objectives: [
      { type: 'discover', target: 'pachisi_board', required: 1, labelKey: 'quest.obj.explore_games', label: 'Discover the Pachisi & Chaturanga Game Boards', route: '/journey/level/13/play' },
      { type: 'build', target: 'game_pavilion', required: 1, labelKey: 'quest.obj.build_board', label: 'Construct a Game Pavilion in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 90, inventory: { pachisi_board: 1, game_piece: 2 } }
  },

  // LEVEL 14: Preserve the Legacy
  {
    id: 'q_l14_preserve',
    levelId: 14,
    levelName: 'Preserve the Legacy',
    type: 'main',
    titleKey: 'quest.q_l14_preserve.title',
    descKey: 'quest.q_l14_preserve.desc',
    hintKey: 'quest.q_l14_preserve.hint',
    title: 'Guardians of Heritage',
    description: 'Establish modern conservation laboratories and digital archives to safeguard monuments, manuscripts, and living traditions for future generations.',
    hint: 'Construct an Exhibition Gallery or Conservation Lab in Level 14 / Builder.',
    objectives: [
      { type: 'build', target: 'exhibition_gallery', required: 1, labelKey: 'quest.obj.build_gallery', label: 'Construct an Exhibition Gallery in the Builder', route: '/builder' }
    ],
    rewards: { legacy: 120, inventory: { heritage_archive: 1, preservation_record: 1 } }
  },

  // MASTERY QUEST
  {
    id: 'q_minigame_mastery',
    levelId: 5,
    levelName: 'Mahajanapadas & Early Kingdoms',
    type: 'side',
    titleKey: 'quest.q_minigame_mastery.title',
    descKey: 'quest.q_minigame_mastery.desc',
    hintKey: 'quest.q_minigame_mastery.hint',
    title: 'Three-Star Historical Mastery',
    description: 'Demonstrate exceptional strategic and historical accuracy by achieving a 3-star rating in any mini-game or quest session.',
    hint: 'Score 80% or higher in a Quest Quiz or earn 3 stars in any level mini-game.',
    objectives: [
      { type: 'minigame_stars', target: 3, required: 1, labelKey: 'quest.obj.earn_3_stars', label: 'Achieve a 3-Star Mastery Rating', route: '/journey' }
    ],
    rewards: { legacy: 100, inventory: { punch_marked_coin: 2 } }
  }
];
