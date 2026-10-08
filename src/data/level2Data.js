export const level2Locations = [
  {
    id: 'l2_event_blight',
    label: 'Wilted Crops',
    icon: '⚠️',
    description: 'Some of the grain appears yellow and wilted.',
    isEvent: true,
    discoverMessage: 'Agricultural communities faced constant threats from crop disease and pests.',
    eventDef: {
      scenario: 'A strange blight has appeared on the edge of the wheat fields. If it spreads, it could ruin the harvest.',
      options: [
        {
          label: 'Burn the infected crops immediately',
          costs: { harvested_grain: 1 },
          rewards: { legacy: 25 },
          resultText: 'You lost some grain, but the fire stopped the blight from spreading. The harvest is saved!'
        },
        {
          label: 'Dig trenches to separate the fields',
          costs: { wild_seeds: 2 },
          rewards: { legacy: 15, community: 1 },
          resultText: 'The trenches slowed the spread, though a bit of the crop was lost. Good structural thinking.'
        }
      ]
    }
  },
  {
    id: 'open_land',
    label: 'Open Land',
    icon: '🌾',
    description: 'Flat, fertile ground near water.',
    discoverMessage: 'Fertile land was carefully selected by early communities for planting seeds, marking the slow beginning of agriculture.',
    yields: { wild_seeds: 5, fertile_soil: 5 },
    stateOverrides: [
      {
        condition: (state) => state.builtItems && state.builtItems.includes('l2_crops'),
        label: 'Cultivated Farm',
        icon: '🚜',
        description: 'A thriving farm producing harvested grain.',
        discoverMessage: 'Your community has successfully transformed the wild land into a reliable food source.'
      }
    ]
  },
  {
    id: 'water_source',
    label: 'River / Spring',
    icon: '🌊',
    description: 'A constant supply of fresh water.',
    discoverMessage: 'Access to water remained essential for drinking, but now it was also required to support crops and domesticated animals.',
    yields: { water: 5 }
  },
  {
    id: 'wild_animals',
    label: 'Wild Herds',
    icon: '🐐',
    description: 'Animals grazing in the distance.',
    discoverMessage: 'Over time, humans formed closer relationships with certain animal species, leading to domestication for resources and labor.',
    yields: { meat: 3, hide: 3 }
  },
  {
    id: 'clay_bank',
    label: 'Clay Bank',
    icon: '🟤',
    description: 'Soft mud near the river.',
    discoverMessage: 'Clay could be shaped and baked into pottery. Pottery was revolutionary for storing food, carrying water, and cooking.',
    yields: { clay: 5, mud: 5 }
  },
  {
    id: 'settlement_area',
    label: 'Village Site',
    icon: '🛖',
    description: 'A gathering of early permanent shelters.',
    discoverMessage: 'Farming required people to stay in one place to tend crops, leading to the first permanent villages and settled community life.',
    yields: { wood: 5, stone: 5 },
    stateOverrides: [
      {
        condition: (state) => state.builtItems && state.builtItems.includes('l2_settlement'),
        label: 'Mudbrick Village',
        icon: '🏘️',
        description: 'A bustling settlement of permanent mudbrick homes.'
      }
    ]
  },
  {
    id: 'npc_elder_anaya',
    label: 'Elder Anaya',
    icon: '🧓',
    isNpc: true,
    npcData: {
      name: 'Elder Anaya',
      role: 'Village Elder',
      icon: '🧓',
      greeting: "The river provides, but we must store our surplus. Crafting requires resources, child.",
      farewell: "You have provided well for our people. The village will thrive because of your efforts.",
      quests: [
        {
          id: 'npc_q_granary_prep',
          dialogue: "We need sturdy clay pots to store our harvested grain safely from pests. Can you craft 2 Clay Pots for the village?",
          requirements: { clay_pots: 2 },
          reward: { xp: 100, legacy: 50, tools: 2 },
          successDialogue: "These pots are perfectly fired! Here, take these specialized farming tools as a reward."
        },
        {
          id: 'npc_q_shelter_help',
          dialogue: "The rains will be heavy this season. We must build mudbrick houses. Bring me 2 Mudbricks to show you have mastered the technique.",
          requirements: { mudbrick: 2 },
          reward: { xp: 150, legacy: 100, community: 1 },
          successDialogue: "Excellent craftsmanship. With bricks like these, our settlement will stand for generations."
        }
      ]
    }
  }
,
  {
    id: 'granary_site',
    label: 'Trade Route',
    icon: '🐪',
    description: 'A path connecting early settlements.',
    discoverMessage: 'With surplus food safely stored, the community could begin trading with distant groups.',
    yields: { legacy: 50, knowledge: 10 },
    unlockCondition: (state) => state.builtItems && state.builtItems.includes('l2_storage')
  }
];