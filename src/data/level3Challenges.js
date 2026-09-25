export const level3Challenges = {
  mg_l3_artifacts: {
    "id": "mg-l3-artifacts",
    "title": "Mini-Game: Artifacts of the Indus",
    "format": "minigame"
    
  },
  water_management: {
    id: "indus-water-01",
    title: "Water & Drainage",
    format: "matching",
    getQuestion: (ageGroup) => "Match the Harappan urban feature to its primary purpose:",
    pairs: [
      { left: { id: 'l1', label: 'Covered Drains', icon: '🧱' }, right: { id: 'r1', label: 'Carrying Wastewater' } },
      { left: { id: 'l2', label: 'The Great Bath', icon: '🛁' }, right: { id: 'r2', label: 'Ritual Bathing' } },
      { left: { id: 'l3', label: 'Private Wells', icon: '🚰' }, right: { id: 'r3', label: 'Household Water' } }
    ],
    reward: { bricks: 2 },
    explanation: "Harappan cities are famous for their sophisticated water management, including covered street drains and hundreds of private wells."
  },
  street_planning: {
    id: "indus-streets-01",
    title: "Streets & Neighborhoods",
    format: "decision",
    getQuestion: (ageGroup) => "You are planning a new neighborhood in a major Indus settlement. What street layout provides the most organized and efficient city?",
    options: [
      { id: 'random', label: 'Random winding paths that follow the natural terrain exactly.', icon: '〰️', isCorrect: false },
      { id: 'planned', label: 'A grid-like system with streets oriented along cardinal directions.', icon: '🗺️', isCorrect: true },
      { id: 'none', label: 'No streets, just one massive interconnected mega-building.', icon: '🏢', isCorrect: false }
    ],
    reward: { bricks: 1, tools: 1 },
    explanation: "Several major settlements show evidence of organized streets oriented along cardinal directions, demonstrating high levels of social coordination."
  },
  crafts: {
    id: "indus-crafts-01",
    title: "Crafts & Workshops",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of producing and trading a Harappan carnelian bead:",
    items: [
      { id: 'step1', label: 'Mine raw carnelian stone.' },
      { id: 'step2', label: 'Heat the stone to enhance its red color.' },
      { id: 'step3', label: 'Drill a tiny hole through the center using specialized drills.' },
      { id: 'step4', label: 'Trade the finished bead to distant regions like Mesopotamia.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { tools: 2 },
    explanation: "Harappan craftspeople were highly skilled, producing standardized luxury goods like long carnelian beads that were traded across vast distances."
  },
  seals: {
    id: "indus-seals-01",
    title: "Seals and Script",
    format: "mcq",
    getQuestion: (ageGroup) => "Archaeologists have found thousands of small, square steatite seals. What was their primary use?",
    options: [
      { id: 'money', label: 'As the primary currency for buying food.', icon: '💰', isCorrect: false },
      { id: 'trade', label: 'For stamping clay tags to secure trade goods and identify ownership.', icon: '🔖', isCorrect: true },
      { id: 'weapons', label: 'As small throwing weapons.', icon: '⚔️', isCorrect: false }
    ],
    reward: { bricks: 2 },
    explanation: "Seals featuring animal motifs and the undeciphered Indus script were primarily used in administration and trade to mark ownership."
  }
};
