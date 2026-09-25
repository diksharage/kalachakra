export const questData = [
  {
    id: "q_l1_main",
    levelId: 1,
    type: "side",
    titleKey: "quest.q_l1_main.title",
    descKey: "quest.q_l1_main.desc",
    objectives: [
      { type: "discover", target: "hand_axe", required: 1, labelKey: "quest.obj.discover_tools" },
      { type: "build", target: "l1_tools", required: 1, labelKey: "quest.obj.build_tools" }
    ],
    rewards: { legacy: 15, inventory: { stone: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l1_main.hint"
  },
  {
    id: "q_l2_farming",
    levelId: 2,
    type: "side",
    titleKey: "quest.q_l2_farming.title",
    descKey: "quest.q_l2_farming.desc",
    objectives: [
      { type: "explore", target: "fertile_plains", required: 1, labelKey: "quest.obj.explore_plains" },
      { type: "build", target: "l2_crops", required: 1, labelKey: "quest.obj.build_crops" }
    ],
    rewards: { legacy: 20, inventory: { food: 2 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l2_farming.hint"
  },
  {
    id: "q_l3_drainage",
    levelId: 3,
    type: "side",
    titleKey: "quest.q_l3_drainage.title",
    descKey: "quest.q_l3_drainage.desc",
    objectives: [
      { type: "discover", target: "great_bath", required: 1, labelKey: "quest.obj.discover_great_bath" },
      { type: "build", target: "indus_water_feature", required: 1, labelKey: "quest.obj.build_water" }
    ],
    rewards: { legacy: 25, inventory: { bricks: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l3_drainage.hint"
  },
  {
    id: "q_l4_trade",
    levelId: 4,
    type: "side",
    titleKey: "quest.q_l4_trade.title",
    descKey: "quest.q_l4_trade.desc",
    objectives: [
      { type: "discover", target: "lothal_dock", required: 1, labelKey: "quest.obj.discover_dock" },
      { type: "build", target: "l4_port", required: 1, labelKey: "quest.obj.build_port" }
    ],
    rewards: { legacy: 30, inventory: { tradeGoods: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l4_trade.hint"
  },
  {
    id: "q_l5_kingdoms",
    levelId: 5,
    type: "side",
    titleKey: "quest.q_l5_kingdoms.title",
    descKey: "quest.q_l5_kingdoms.desc",
    objectives: [
      { type: "build", target: "maha_capital", required: 1, labelKey: "quest.obj.build_capital" }
    ],
    rewards: { legacy: 25 },
    prerequisites: [],
    kalaHintKey: "quest.q_l5_kingdoms.hint"
  },
  {
    id: "q_l6_ashoka",
    levelId: 6,
    type: "side",
    titleKey: "quest.q_l6_ashoka.title",
    descKey: "quest.q_l6_ashoka.desc",
    objectives: [
      { type: "discover", target: "ashoka_pillar", required: 1, labelKey: "quest.obj.discover_pillar" },
      { type: "build", target: "maurya_pillar", required: 1, labelKey: "quest.obj.build_pillar" }
    ],
    rewards: { legacy: 40, inventory: { dhamma: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l6_ashoka.hint"
  },
  {
    id: "q_l7_science",
    levelId: 7,
    type: "side",
    titleKey: "quest.q_l7_science.title",
    descKey: "quest.q_l7_science.desc",
    objectives: [
      { type: "discover", target: "aryabhatiya", required: 1, labelKey: "quest.obj.discover_aryabhatiya" },
      { type: "solve", target: "math_puzzle", required: 1, labelKey: "quest.obj.solve_math" }
    ],
    rewards: { legacy: 50, inventory: { knowledge: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l7_science.hint"
  },
  {
    id: "q_l8_architecture",
    levelId: 8,
    type: "side",
    titleKey: "quest.q_l8_architecture.title",
    descKey: "quest.q_l8_architecture.desc",
    objectives: [
      { type: "build", target: "arch_temple", required: 1, labelKey: "quest.obj.build_temple" }
    ],
    rewards: { legacy: 35 },
    prerequisites: [],
    kalaHintKey: "quest.q_l8_architecture.hint"
  },
  {
    id: "q_l9_culture",
    levelId: 9,
    type: "side",
    titleKey: "quest.q_l9_culture.title",
    descKey: "quest.q_l9_culture.desc",
    objectives: [
      { type: "discover", target: "natya_shastra", required: 1, labelKey: "quest.obj.discover_natya" }
    ],
    rewards: { legacy: 30 },
    prerequisites: [],
    kalaHintKey: "quest.q_l9_culture.hint"
  },
  {
    id: "q_l10_chola",
    levelId: 10,
    type: "side",
    titleKey: "quest.q_l10_chola.title",
    descKey: "quest.q_l10_chola.desc",
    objectives: [
      { type: "build", target: "chola_temple", required: 1, labelKey: "quest.obj.build_chola_temple" },
      { type: "build", target: "chola_navy", required: 1, labelKey: "quest.obj.build_chola_navy" }
    ],
    rewards: { legacy: 60 },
    prerequisites: [],
    kalaHintKey: "quest.q_l10_chola.hint"
  },
  {
    id: "q_l11_vijayanagara",
    levelId: 11,
    type: "side",
    titleKey: "quest.q_l11_vijayanagara.title",
    descKey: "quest.q_l11_vijayanagara.desc",
    objectives: [
      { type: "explore", target: "market_bazaar", required: 1, labelKey: "quest.obj.explore_bazaar" }
    ],
    rewards: { legacy: 25 },
    prerequisites: [],
    kalaHintKey: "quest.q_l11_vijayanagara.hint"
  },
  {
    id: "q_l12_stories",
    levelId: 12,
    type: "side",
    titleKey: "quest.q_l12_stories.title",
    descKey: "quest.q_l12_stories.desc",
    objectives: [
      { type: "discover", target: "panchatantra", required: 1, labelKey: "quest.obj.discover_pancha" }
    ],
    rewards: { legacy: 30 },
    prerequisites: [],
    kalaHintKey: "quest.q_l12_stories.hint"
  },
  {
    id: "q_l13_games",
    levelId: 13,
    type: "side",
    titleKey: "quest.q_l13_games.title",
    descKey: "quest.q_l13_games.desc",
    objectives: [
      { type: "explore", target: "exp_board", required: 1, labelKey: "quest.obj.explore_games" },
      { type: "solve", target: "chaturanga", required: 1, labelKey: "quest.obj.solve_chaturanga" },
      { type: "build", target: "l13_board", required: 1, labelKey: "quest.obj.build_board" }
    ],
    rewards: { legacy: 75, inventory: { strategy: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_l13_games.hint"
  },
  {
    id: "q_l14_preserve",
    levelId: 14,
    type: "side",
    titleKey: "quest.q_l14_preserve.title",
    descKey: "quest.q_l14_preserve.desc",
    objectives: [
      { type: "build", target: "legacy_gallery", required: 1, labelKey: "quest.obj.build_gallery" }
    ],
    rewards: { legacy: 100 },
    prerequisites: [],
    kalaHintKey: "quest.q_l14_preserve.hint"
  }

  , {
    id: "q_minigame_l3",
    levelId: 3,
    type: "side",
    titleKey: "quest.q_minigame_l3.title",
    descKey: "quest.q_minigame_l3.desc",
    objectives: [
      { type: "minigame", target: "mg-l3-artifacts", required: 1, labelKey: "quest.obj.complete_l3_minigame" }
    ],
    rewards: { legacy: 50, inventory: { harappan_bead: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_minigame_l3.hint"
  },
  {
    id: "q_minigame_mastery",
    levelId: null, // Global quest
    type: "side",
    titleKey: "quest.q_minigame_mastery.title",
    descKey: "quest.q_minigame_mastery.desc",
    objectives: [
      { type: "minigame_stars", target: 3, required: 1, labelKey: "quest.obj.earn_3_stars" }
    ],
    rewards: { legacy: 100 },
    prerequisites: [],
    kalaHintKey: "quest.q_minigame_mastery.hint"
  }];
