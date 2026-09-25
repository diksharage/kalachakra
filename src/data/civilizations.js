export const civilizations = [
  {
    id: "ivc",
    name: "Indus Valley Civilization",
    period: "c. 3300 - 1300 BCE",
    region: "Northwestern South Asia",
    contribution: "Master urban planning, trade and ancient engineering.",
    difficulty: "Beginner",
    description: "Known for its advanced urban planning, baked brick houses, elaborate drainage systems, water supply systems, and clusters of large non-residential buildings.",
    nodes: ["mohenjo-daro", "harappa", "lothal", "dholavira"],
    visual: "🏛️"
  },
  {
    id: "mauryan",
    name: "Mauryan Empire",
    period: "c. 322 - 185 BCE",
    region: "Pan-India",
    contribution: "Pioneered administration, grand architecture, and the spread of Dhamma.",
    difficulty: "Intermediate",
    description: "An extensive and powerful empire in ancient India, notable for exceptional administration under Chandragupta and Ashoka's spread of peace and Buddhism.",
    nodes: ["pataliputra", "sanchi", "taxila"],
    visual: "🦁"
  },
  {
    id: "gupta",
    name: "Gupta Empire",
    period: "c. 319 - 467 CE",
    region: "Northern, Central & Parts of Southern India",
    contribution: "The Golden Age of arts, science, and literature.",
    difficulty: "Intermediate",
    description: "Marked by extensive inventions and discoveries in science, technology, engineering, art, dialectic, literature, logic, mathematics, astronomy, religion, and philosophy.",
    nodes: ["nalanda", "ujjain", "mathura"],
    visual: "📜"
  },
  {
    id: "chola",
    name: "Chola Dynasty",
    period: "c. 300s BCE - 1279 CE",
    region: "Southern India & Southeast Asia",
    contribution: "Mastered naval warfare, bronze casting, and temple architecture.",
    difficulty: "Advanced",
    description: "One of the longest-ruling dynasties in world history. They built a powerful navy and constructed magnificent temples like the Brihadisvara Temple.",
    nodes: ["thanjavur", "gangaikondacholapuram", "madurai"],
    visual: "🚢"
  },
  {
    id: "vijayanagara",
    name: "Vijayanagara Empire",
    period: "1336 - 1646 CE",
    region: "Deccan Plateau",
    contribution: "Defenders of culture, monumental architecture, and immense wealth.",
    difficulty: "Advanced",
    description: "A wealthy and powerful empire that patronized literature, arts, and architecture, with its magnificent capital at Hampi.",
    nodes: ["hampi", "penukonda"],
    visual: "🐘"
  }
];

export const locations = {
  "mohenjo-daro": {
    id: "mohenjo-daro",
    name: "Mohenjo-daro",
    civilization: "ivc",
    knownFor: ["Advanced drainage", "Urban planning", "Trade", "Architecture"],
    description: "One of the largest settlements of the ancient Indus Valley Civilization, featuring the Great Bath and sophisticated street grids.",
    artifacts: ["dancing-girl", "great-bath-seal"]
  },
  "thanjavur": {
    id: "thanjavur",
    name: "Thanjavur",
    civilization: "chola",
    knownFor: ["Brihadisvara Temple", "Bronze Sculpture", "Arts", "Administration"],
    description: "The capital of the great Chola Empire, home to some of the most magnificent temple architecture in Indian history.",
    artifacts: ["nataraja-bronze"]
  },
  "pataliputra": {
    id: "pataliputra",
    name: "Pataliputra",
    civilization: "mauryan",
    knownFor: ["Administration", "Trade center", "Emperor's Seat", "Monumental Architecture"],
    description: "The capital city of the Mauryan Empire, described by Megasthenes as a massive, heavily fortified city.",
    artifacts: ["ashoka-pillar"]
  },
  "hampi": {
    id: "hampi",
    name: "Hampi",
    civilization: "vijayanagara",
    knownFor: ["Stone Chariot", "Vittala Temple", "Bazaars", "Fortifications"],
    description: "The majestic capital of the Vijayanagara Empire, filled with breathtaking temples and bustling markets.",
    artifacts: ["stone-chariot"]
  }
};
