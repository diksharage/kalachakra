export const buildings = [
  // Indus Valley
  {
    id: 'b-ivc-drainage',
    civilization: 'civ-indus',
    name: 'Advanced Drainage System',
    icon: '💧',
    cost: { culture: 100, knowledge: 200 },
    historicalBasis: 'Inspired by the sophisticated water management and covered drainage networks found in Mohenjo-daro and Harappa, which were unparalleled in the ancient world.',
    purpose: 'Managing sanitation, preventing flooding, and maintaining public health in densely populated urban centers.',
    effectDescription: '+200 Civilization Health, +150 Legacy Points',
    reward: { legacy: 150 }
  },
  {
    id: 'b-ivc-granary',
    civilization: 'civ-indus',
    name: 'Great Granary',
    icon: '🌾',
    cost: { culture: 150, knowledge: 100 },
    historicalBasis: 'Massive brick structures found in Harappa, believed to be used for storing grain surpluses collected as taxes or for public distribution.',
    purpose: 'Storing agricultural surplus to protect against famine and support trade.',
    effectDescription: '+300 Population Capacity, +100 Legacy Points',
    reward: { legacy: 100 }
  },
  {
    id: 'b-ivc-dock',
    civilization: 'civ-indus',
    name: 'Tidal Dockyard',
    icon: '⛵',
    cost: { culture: 250, knowledge: 150 },
    historicalBasis: 'Inspired by the massive brick dockyard at Lothal, engineered to handle the tidal flows of the Sabarmati river for maritime trade.',
    purpose: 'Facilitating maritime trade with Mesopotamia and other distant regions.',
    effectDescription: '+50 Coins/Day, +200 Legacy Points',
    reward: { legacy: 200 }
  },
  
  // Mauryan
  {
    id: 'b-mau-pillar',
    civilization: 'civ-maurya',
    name: 'Ashokan Pillar',
    icon: '🏛️',
    cost: { culture: 300, knowledge: 50 },
    historicalBasis: 'Monolithic sandstone pillars erected across the Indian subcontinent by Emperor Ashoka, inscribed with edicts promoting Dhamma (righteousness).',
    purpose: 'Broadcasting royal edicts, promoting moral behavior, and marking territory.',
    effectDescription: '+300 Culture, +250 Legacy Points',
    reward: { legacy: 250 }
  },
  {
    id: 'b-mau-stupa',
    civilization: 'civ-maurya',
    name: 'Grand Stupa',
    icon: '🕌',
    cost: { culture: 400, knowledge: 100 },
    historicalBasis: 'Inspired by the Great Stupa at Sanchi, commissioned by Ashoka to enshrine the relics of the Buddha.',
    purpose: 'Serving as a focal point for Buddhist devotion and meditation.',
    effectDescription: '+400 Culture, +300 Legacy Points',
    reward: { legacy: 300 }
  },

  // Chola
  {
    id: 'b-cho-temple',
    civilization: 'civ-chola',
    name: 'Dravidian Temple Complex',
    icon: '🕍',
    cost: { culture: 350, knowledge: 150 },
    historicalBasis: 'Inspired by the massive stone temples like Brihadisvara, which served not just as places of worship but as the economic and administrative hubs of the Chola empire.',
    purpose: 'Religious worship, banking, art patronage, and administration.',
    effectDescription: '+200 Culture, +100 Coins/Day',
    reward: { legacy: 400 }
  },

  // All / Generic
  {
    id: 'b-gen-library',
    civilization: 'all',
    name: 'Center of Learning',
    icon: '📚',
    cost: { culture: 300, knowledge: 300 },
    historicalBasis: 'Inspired by ancient universities like Nalanda and Takshashila, which attracted scholars from across the world.',
    purpose: 'Preserving texts and teaching philosophy, mathematics, and medicine.',
    effectDescription: '+100 Knowledge/Day, +500 Legacy Points',
    reward: { legacy: 500 }
  }
];

// Placeholder active quest logic just to ensure no breaking changes in dashboard
export const getActiveQuest = (civ) => {
  return {
    title: `The Mystery of ${civ.name}`,
    description: "Explore the ancient settlements and uncover how urban planning shaped civilization.",
    progress: 3,
    maxProgress: 5
  };
};

export const achievements = [
  {
    id: 'ach-first-discovery',
    name: 'First Discovery',
    description: 'You excavated your very first historical artifact.',
    icon: '✨',
    reward: 50
  },
  {
    id: 'ach-artifact-hunter',
    name: 'Artifact Hunter',
    description: 'Discover 10 artifacts in the region.',
    icon: '🏆',
    reward: 100
  },
  {
    id: 'ach-history-master',
    name: 'History Master',
    description: 'Complete 5 historical challenges without failing.',
    icon: '📜',
    reward: 150
  },
  {
    id: 'ach-master-builder',
    name: 'Master Builder',
    description: 'Construct your first major civilization infrastructure.',
    icon: '🏛️',
    reward: 200
  },
  {
    id: 'ach-culture-keeper',
    name: 'Culture Keeper',
    description: 'Reach a Culture score of 1000.',
    icon: '🏵️',
    reward: 250
  }
];
