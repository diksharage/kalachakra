const fs = require('fs');
let code = fs.readFileSync('src/data/historicalLocations.js', 'utf8');

const newLocations = `
  // ADDITIONAL LOCATIONS
  {
    id: "nalanda",
    libraryId: "gupta_manuscript",
    level: 7,
    category: "knowledge",
    x: 67,
    y: 43,
    period: "Gupta to Pala Period",
    region: "Bihar",
    icon: "📚",
    significance: "One of the greatest centers of learning in the ancient world."
  },
  {
    id: "rakhigarhi",
    libraryId: "harappan_bead",
    level: 3,
    category: "places",
    x: 32,
    y: 35,
    period: "Mature Harappan",
    region: "Haryana",
    icon: "🏙️",
    significance: "One of the largest known settlements of the Indus Valley Civilization."
  },
  {
    id: "ellora",
    libraryId: "ajanta_caves",
    level: 8,
    category: "architecture",
    x: 39,
    y: 60,
    period: "Rashtrakuta / Yadava",
    region: "Maharashtra",
    icon: "⛰️",
    significance: "Monumental rock-cut architecture, featuring Hindu, Buddhist, and Jain caves."
  },
  {
    id: "madurai",
    libraryId: "traditional_dance",
    level: 9,
    category: "culture",
    x: 45,
    y: 90,
    period: "Sangam Era to Nayak",
    region: "Tamil Nadu",
    icon: "🎭",
    significance: "An ancient center of Tamil culture, literature (Sangam), and temple architecture."
  },
  {
    id: "konark",
    libraryId: "sanchi_stupa",
    level: 8,
    category: "architecture",
    x: 65,
    y: 58,
    period: "Eastern Ganga",
    region: "Odisha",
    icon: "🛕",
    significance: "Famous for the massive Sun Temple designed as a monumental chariot."
  },
  {
    id: "bodh_gaya",
    libraryId: "ashokan_edict",
    level: 5,
    category: "places",
    x: 65,
    y: 47,
    period: "Mahajanapada",
    region: "Bihar",
    icon: "🌳",
    significance: "The historical site of Gautama Buddha's enlightenment."
  }
];`;

code = code.replace(/];$/, newLocations);

fs.writeFileSync('src/data/historicalLocations.js', code);
console.log("Added rich locations to historicalLocations!");
