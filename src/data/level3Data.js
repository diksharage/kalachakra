export const level3CityLocations = [
  {
    id: 'l3_event_merchant',
    label: 'Mesopotamian Merchant',
    icon: 'dYO.',
    description: 'A trader from distant lands has arrived.',
    isEvent: true,
    discoverMessage: 'The Indus Valley traded extensively with Mesopotamia, exchanging raw materials for finished goods.',
    eventDef: {
      scenario: 'A wealthy merchant from the city of Ur has docked at the port. They are seeking high-quality Indus craft goods and are willing to pay well.',
      options: [
        {
          label: 'Trade away precious Carnelian Beads',
          costs: { craftMaterials: 1 },
          rewards: { legacy: 40, community: 1 },
          resultText: 'The merchant was delighted with the beads and gave you foreign metals in exchange! Our trade network expands.'
        },
        {
          label: 'Decline the trade to keep resources local',
          costs: {},
          rewards: { legacy: 5 },
          resultText: 'You kept your goods. The city remains self-reliant, but misses out on foreign exchange.'
        }
      ]
    }
  },
  {
    id: 'indus_house',
    label: 'Courtyard House',
    icon: '🏠',
    description: 'A structure built with baked bricks.',
    discoverMessage: 'Many houses were built with standardized baked bricks, often centered around an open courtyard for light and air.',
    yields: { materials: 1 }
  },
  {
    id: 'indus_street',
    label: 'Planned Street',
    icon: '🛣️',
    description: 'A wide, straight road.',
    discoverMessage: 'Several major settlements show evidence of organized streets that were oriented along cardinal directions, though layouts varied between sites.',
    yields: {}
  },
  {
    id: 'indus_drainage',
    label: 'Covered Drain',
    icon: '🚿',
    description: 'A channel lined with bricks.',
    discoverMessage: 'Some Indus settlements feature sophisticated water-management and drainage networks, carrying wastewater away from houses.',
    yields: {}
  },
  {
    id: 'indus_well',
    label: 'Brick Well',
    icon: '💧',
    description: 'A deep circular structure for water.',
    discoverMessage: 'Access to clean water was vital. Mohenjo-daro alone is estimated to have had hundreds of wells.',
    yields: { water: 2 }
  },
  {
    id: 'indus_workshop',
    label: 'Craft Workshop',
    icon: '🛠️',
    description: 'An area filled with debris and tools.',
    discoverMessage: 'Artisans created standardized and highly crafted items here, working with stone, clay, shell, and metal.',
    yields: { craftMaterials: 2 }
  },
  {
    id: 'indus_storage',
    label: 'Large Platform',
    icon: '📦',
    description: 'A massive brick foundation.',
    discoverMessage: 'Large non-residential structures are often interpreted as storage facilities or public buildings, though their exact functions remain debated.',
    yields: { storage: 1 }
  }
];

export const level3SiteLocations = [
  {
    id: 'site_harappa',
    label: 'Harappa',
    icon: '🏺',
    description: 'Major urban site.',
    discoverMessage: 'Harappa is the site that gives the civilization its name. It shows extensive craft production, settlement planning, and trade networks.',
    yields: {}
  },
  {
    id: 'site_mohenjodaro',
    label: 'Mohenjo-daro',
    icon: '🧱',
    description: 'Famous planned settlement.',
    discoverMessage: 'Known for its highly planned streets and the "Great Bath", often interpreted as a large public or ritual water structure.',
    yields: {}
  },
  {
    id: 'site_dholavira',
    label: 'Dholavira',
    icon: '💧',
    description: 'Stone architecture and water management.',
    discoverMessage: 'A remarkable site with sophisticated reservoirs and water storage structures adapted to its arid environment.',
    yields: {}
  },
  {
    id: 'site_lothal',
    label: 'Lothal',
    icon: '🚚',
    description: 'Crafts and exchange.',
    discoverMessage: 'A settlement heavily associated with craft production and trade, featuring a large basin often interpreted as a dockyard.',
    yields: {}
  }
];

export const level3ArtifactLocations = [
  {
    id: 'artifact_seal',
    label: 'Steatite Seal',
    icon: '🪨',
    description: 'A small, finely carved square stone.',
    discoverMessage: 'What we know: Seals were used for trade and administration. What remains uncertain: The Indus script has not been conclusively deciphered.',
    yields: {},
    isArtifact: true,
    investigation: {
      clues: [
        { text: "Intricate Script", observation: "There are symbols at the top that look like writing, but they are unreadable." },
        { text: "Unicorn Motif", observation: "A one-horned animal is carved with great precision." },
        { text: "Boss on Back", observation: "The back has a pierced boss, meaning a string was passed through it." }
      ],
      question: "Based on the boss for a string and the deeply carved symbols, how was this primarily used?",
      options: [
        { label: "As currency to buy goods.", isCorrect: false },
        { label: "Pressed into wet clay to mark ownership or seal trade goods.", isCorrect: true, explanation: "Seals were stamped onto clay tags attached to trade bundles, identifying the sender." },
        { label: "As a decorative pendant with no practical purpose.", isCorrect: false }
      ],
      hint: "Think about why someone would need a carved 'stamp' when trading goods across long distances.",
      reward: { xp: 50, knowledge: 2, legacy: 10 }
    }
  },
  {
    id: 'artifact_weights',
    label: 'Chert Weights',
    icon: '⚖️',
    description: 'Perfectly cubical stone weights found across many cities.',
    discoverMessage: 'What we know: Standardized weights suggest a regulated system of exchange across vast distances. What remains uncertain: The exact political authority enforcing this system.',
    yields: {},
    isArtifact: true,
    investigation: {
      clues: [
        { text: "Perfect Cubes", observation: "They are shaped exactly the same, in multiple identical sizes." },
        { text: "Binary Ratios", observation: "They follow a strict mathematical progression (1, 2, 4, 8, 16...)." },
        { text: "Wide Distribution", observation: "The exact same weight system is found in cities hundreds of miles apart." }
      ],
      question: "What does the extreme standardization of these weights across the entire civilization suggest?",
      options: [
        { label: "They were toys for children.", isCorrect: false },
        { label: "Each city had a different measuring system.", isCorrect: false },
        { label: "A highly organized trade network and central authority enforcing standards.", isCorrect: true, explanation: "Standardized weights were crucial for fair trade, taxation, and administration across the vast Indus territory." }
      ],
      hint: "If a merchant travels 500 miles to another city, why is it important that a 'pound' weighs exactly the same there?",
      reward: { xp: 50, mastery: 1, legacy: 10 }
    }
  },
  {
    id: 'artifact_beads',
    label: 'Carnelian Beads',
    icon: '📿',
    description: 'Long, carefully drilled red beads.',
    discoverMessage: 'What we know: These beads required immense skill and were traded as far away as Mesopotamia. What remains uncertain: Their specific cultural or status meaning.',
    yields: {},
    isArtifact: true,
    investigation: {
      clues: [
        { text: "Micro-Drilling", observation: "The holes are incredibly thin and straight, requiring specialized bronze drills." },
        { text: "Heat Treatment", observation: "The red color was achieved by carefully baking the stone in kilns." },
        { text: "Found Abroad", observation: "Identical beads have been found in royal tombs in Mesopotamia." }
      ],
      question: "What does the presence of these beads in distant Mesopotamian tombs tell us?",
      options: [
        { label: "The Indus people conquered Mesopotamia.", isCorrect: false },
        { label: "There was active, long-distance luxury trade between the Indus Valley and Mesopotamia.", isCorrect: true, explanation: "Mesopotamian records even mention importing goods from 'Meluhha', widely believed to be the Indus Valley." },
        { label: "Carnelian beads naturally formed in both places.", isCorrect: false }
      ],
      hint: "Consider how luxury goods move between completely different ancient civilizations.",
      reward: { xp: 50, culture: 1, legacy: 10 }
    }
  }
];
