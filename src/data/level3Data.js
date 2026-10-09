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
    visualStory: [
      {
        icon: '??',
        title: 'Courtyard Architecture',
        text: 'Indus houses were designed for privacy and cooling. They often featured thick walls made of standardized baked bricks (1:2:4 ratio) and were centered around an open courtyard.',
        focusPoint: 'Notice the lack of windows on the ground floor facing the street.',
        type: 'Reconstruction',
        evidence: 'Foundations of multi-story houses found at Mohenjo-Daro.'
      },
      {
        icon: '??',
        title: 'Standardized Bricks',
        text: 'The bricks used in construction were incredibly uniform. This level of standardization across hundreds of miles suggests a highly organized society with shared measurements.',
        focusPoint: 'The 1:2:4 ratio is perfect for interlocking brickwork.',
        type: 'Artifact Detail',
        uncertainty: "We don't know if this standardization was enforced by a central king or agreed upon by merchant guilds."
      }
    ],
    yields: { materials: 1 }
  },
  {
    id: 'indus_street',
    label: 'Planned Street',
    icon: '🛣️',
    description: 'A wide, straight road.',
    discoverMessage: 'Several major settlements show evidence of organized streets that were oriented along cardinal directions, though layouts varied between sites.',
    visualStory: [
      {
        icon: '🗺️',
        title: 'Grid-Like Planning',
        text: 'Unlike many ancient cities that grew organically, Indus cities like Mohenjo-Daro were carefully planned. The main streets ran strictly north-south and east-west, intersecting at right angles.',
        focusPoint: 'This layout allowed winds to naturally sweep down the avenues.',
        type: 'Map / Layout',
        evidence: 'Excavations reveal main streets up to 10 meters wide.'
      },
      {
        icon: '🚶',
        title: 'Neighborhoods and Life',
        text: 'The city was divided into distinct blocks. People lived, worked, and traded in these structured neighborhoods. The planning suggests a deep understanding of urban management.',
        type: 'Social Context',
        uncertainty: 'Was there a central planning committee, or was this a widely accepted cultural norm?'
      }
    ],
    yields: {}
  },
  {
    id: 'indus_drainage',
    label: 'Covered Drain',
    icon: '🚿',
    description: 'A channel lined with bricks.',
    discoverMessage: 'Some Indus settlements feature sophisticated water-management and drainage networks, carrying wastewater away from houses.',
    visualStory: [
      {
        icon: '🚿',
        title: 'Advanced Drainage',
        text: 'The Indus civilization had some of the most advanced sanitation in the ancient world. Almost every house had a bathing area and a drainage system that connected to street drains.',
        focusPoint: 'Drains were covered with loose bricks so they could be opened for cleaning.',
        type: 'Engineering',
        evidence: 'Extensive brick-lined drains found running beneath the streets of Mohenjo-Daro and Harappa.'
      },
      {
        icon: '🧹',
        title: 'Public Health',
        text: 'This system shows a remarkable emphasis on cleanliness and public health. Wastewater was directed out of the residential areas to soak pits or the river.',
        type: 'Social Context',
        evidence: 'Terracotta pipes and soak jars found in excavations.'
      }
    ],
    yields: {}
  },
  {
    id: 'indus_well',
    label: 'Brick Well',
    icon: '💧',
    description: 'A deep circular structure for water.',
    discoverMessage: 'Access to clean water was vital. Mohenjo-daro alone is estimated to have had hundreds of wells.',
    visualStory: [
      {
        icon: '💧',
        title: 'The Great Wells',
        text: 'Water was life. Mohenjo-Daro alone had over 700 public and private wells. These cylindrical structures were built with wedge-shaped bricks to prevent inward collapse.',
        focusPoint: 'Wedge-shaped bricks are a brilliant engineering solution for circular structures.',
        type: 'Architecture',
        evidence: 'Well structures still standing today, rising like chimneys as surrounding earth was excavated.'
      }
    ],
    yields: { water: 2 }
  },
  {
    id: 'indus_workshop',
    label: 'Craft Workshop',
    icon: '🛠️',
    description: 'An area filled with debris and tools.',
    discoverMessage: 'Artisans created standardized and highly crafted items here, working with stone, clay, shell, and metal.',
    visualStory: [
      {
        icon: '🛠️',
        title: 'Master Crafters',
        text: 'Indus artisans were highly skilled. They worked with local materials like clay and shell, and imported materials like copper, tin, and lapis lazuli.',
        focusPoint: 'Evidence of kilns and craft debris helps identify these areas.',
        type: 'Economy & Trade',
        evidence: 'Slag, unfinished beads, and broken tools found clustered in specific city zones.'
      }
    ],
    yields: { craftMaterials: 2 }
  },
  {
    id: 'indus_storage',
    label: 'Large Platform',
    icon: '📦',
    description: 'A massive brick foundation.',
    discoverMessage: 'Large non-residential structures are often interpreted as storage facilities or public buildings, though their exact functions remain debated.',
    visualStory: [
      {
        icon: '📦',
        title: 'The Great Granary?',
        text: 'Massive brick foundations have been found. For a long time, historians called them "granaries", assuming they stored grain collected as taxes.',
        type: 'Architecture',
        uncertainty: 'Recent archaeology questions this. No grain has actually been found in these specific structures. They might have been great public halls or palaces instead.'
      }
    ],
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
    visualStory: [
      {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Harappa_3.jpg/800px-Harappa_3.jpg',
        title: 'The City of Harappa',
        text: 'Discovered in the 1920s, Harappa was the first Indus city excavated. It gave its name to the entire civilization (The Harappan Civilization).',
        type: 'Site Profile',
        evidence: 'Harappa had massive defensive walls, large gateways, and distinct neighborhoods.'
      }
    ],
    yields: {}
  },
  {
    id: 'site_mohenjodaro',
    label: 'Mohenjo-daro',
    icon: '🧱',
    description: 'Famous planned settlement.',
    discoverMessage: 'Known for its highly planned streets and the "Great Bath", often interpreted as a large public or ritual water structure.',
    visualStory: [
      {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Mohenjo-daro_Bath.jpg/800px-Mohenjo-daro_Bath.jpg',
        title: 'The Great Bath',
        text: 'One of the most famous structures of the ancient world. It was made watertight using carefully fitted bricks and a layer of natural tar (bitumen).',
        focusPoint: 'Notice the two wide staircases leading down into the basin.',
        type: 'Site Profile',
        uncertainty: 'Was it for public hygiene, or a ritual purification center like later temple tanks in India?'
      },
      {
        icon: '🏛️',
        title: 'The Citadel',
        text: 'Mohenjo-Daro, like many Indus cities, was divided into a higher "Citadel" (where the Great Bath is) and a "Lower Town" where most people lived.',
        type: 'Site Layout',
        evidence: 'The Citadel was built on a massive artificial mud-brick platform to protect it from floods.'
      }
    ],
    yields: {}
  },
  {
    id: 'site_dholavira',
    label: 'Dholavira',
    icon: '💧',
    description: 'Stone architecture and water management.',
    discoverMessage: 'A remarkable site with sophisticated reservoirs and water storage structures adapted to its arid environment.',
    visualStory: [
      {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Dholavira_water_reservoir.JPG/800px-Dholavira_water_reservoir.JPG',
        title: 'Desert Engineering at Dholavira',
        text: 'Located in the arid Rann of Kutch, Dholavira survived by mastering water conservation. They built massive rock-cut reservoirs to capture monsoon rain.',
        type: 'Site Profile',
        evidence: 'Large stepped reservoirs and dams built across nearby seasonal streams.'
      },
      {
        icon: '🪨',
        title: 'The Signboard',
        text: 'Archaeologists found 10 large Indus signs made of white gypsum laid on the floor here. It is thought to be the oldest known "signboard" in the world, once mounted over a gateway.',
        type: 'Artifact Detail',
        uncertainty: 'Since the script is undeciphered, we have no idea what the signboard says. Perhaps the name of the city or its ruler?'
      }
    ],
    yields: {}
  },
  {
    id: 'site_lothal',
    label: 'Lothal',
    icon: '🚚',
    description: 'Crafts and exchange.',
    discoverMessage: 'A settlement heavily associated with craft production and trade, featuring a large basin often interpreted as a dockyard.',
    visualStory: [
      {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lothal_Dockyard.jpg/800px-Lothal_Dockyard.jpg',
        title: 'The Port of Lothal',
        text: 'Lothal was a major manufacturing center for beads and metal. But its most debated feature is a massive brick basin with a channel connecting it to an ancient river.',
        type: 'Site Profile',
        uncertainty: "Was this the world's earliest known tidal dockyard for ships, or simply a massive irrigation tank?"
      }
    ],
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

