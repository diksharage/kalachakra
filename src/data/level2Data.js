export const level2Locations = [
  {
    id: 'open_land',
    label: 'Open Land',
    icon: '🌾',
    description: 'Flat, fertile ground near water.',
    discoverMessage: 'Fertile land was carefully selected by early communities for planting seeds, marking the slow beginning of agriculture.',
    yields: { wild_seeds: 5, fertile_soil: 5 }
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
    yields: { wood: 5, stone: 5 }
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
];
