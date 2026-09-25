export const level8Challenges = {
  mg_l8_architecture: {
    "id": "mg-l8-architecture",
    "title": "Mini-Game: Temple Architecture",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  site_puzzle: {
    id: "arch-site-01",
    title: "Read the Site & Landscape",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Before you build a big temple, what is the most important thing to check about the land?";
        case '9-11': return "Why did ancient builders carefully choose where to place a settlement or temple?";
        case '12-14': return "How does architecture interact with its landscape?";
        case '15-17': return "In historical site planning, what primary environmental factors constrained architectural design?";
        case '18+': return "When analyzing historical settlement patterns and architectural sites, what is the primary relationship between the built environment and the topography?";
        default: return "How does architecture interact with the landscape?";
      }
    },
    options: [
      { id: 'random', label: 'They placed buildings randomly wherever they wanted', icon: '🎲', isCorrect: false },
      { id: 'interaction', label: 'Architecture interacts with terrain, water access, and materials', icon: '🗺️', isCorrect: true },
      { id: 'flat', label: 'They always flattened mountains before building', icon: '⛰️', isCorrect: false }
    ],
    explanation: "Architecture does not exist in a vacuum. It interacts heavily with the terrain, water sources, climate, and locally available materials."
  },
  materials_puzzle: {
    id: "arch-materials-01",
    title: "Materials & Construction",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Stone is very strong, but what makes it hard to build with?";
        case '9-11': return "What is the main trade-off when deciding to build a temple entirely out of stone?";
        case '12-14': return "Different materials have different properties. What is the primary construction trade-off when using large stones instead of timber?";
        case '15-17': return "When historical builders selected materials like stone over timber, what structural and logistical tradeoffs were they making?";
        case '18+': return "In historical structural engineering, selecting lithic materials (stone) over organic materials (timber) maximizes preservation but incurs what primary logistical cost?";
        default: return "What is the tradeoff of using stone?";
      }
    },
    options: [
      { id: 'weak', label: 'Stone is easily destroyed by rain', icon: '🌧️', isCorrect: false },
      { id: 'tradeoff', label: 'Stone is highly durable but requires immense effort to transport and carve', icon: '🪨', isCorrect: true },
      { id: 'magic', label: 'Stone requires magic spells to move', icon: '✨', isCorrect: false }
    ],
    explanation: "These are gameplay properties reflecting historical reality: stone offers incredible durability and load-bearing capacity, but demands massive labor and logistical organization to quarry and transport."
  },
  rockcut_puzzle: {
    id: "arch-rockcut-01",
    title: "Rock-Cut Architecture",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If you make a mistake while carving a cave out of solid rock, can you just put a new block in?";
        case '9-11': return "Why does carving a cave out of a mountain (rock-cut architecture) require so much planning?";
        case '12-14': return "What is the fundamental difference between rock-cut architecture (like Ajanta) and structural architecture?";
        case '15-17': return "How does the subtractive process of rock-cut architecture differ fundamentally from structural masonry?";
        case '18+': return "In rock-cut architecture, the excavation of negative space imposes what fundamental constraint on the engineering process compared to additive structural masonry?";
        default: return "What is rock-cut architecture?";
      }
    },
    options: [
      { id: 'subtractive', label: 'It is carved from natural rock; mistakes cannot easily be repaired by swapping blocks', icon: '⛏️', isCorrect: true },
      { id: 'additive', label: 'It is exactly the same as stacking loose bricks', icon: '🧱', isCorrect: false },
      { id: 'easy', label: 'It requires absolutely no planning', icon: '🤷', isCorrect: false }
    ],
    explanation: "Rock-cut architecture is a subtractive process. It requires immense pre-planning because you are carving negative space out of living rock, unlike structural buildings where blocks are assembled."
  },
  sacred_puzzle: {
    id: "arch-sacred-01",
    title: "Temples & Stupas",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Did all the ancient temples and stupas look exactly the same from the very beginning?";
        case '9-11': return "Did Indian temple architecture stay exactly the same throughout history?";
        case '12-14': return "When studying the history of temples and stupas, what is important to remember about their designs?";
        case '15-17': return "How should we understand the development of sacred architecture like stupas and temples across South Asia?";
        case '18+': return "When analyzing the morphology of sacred architecture (such as stupas and temples) in South Asia, what is the primary historical consensus?";
        default: return "How did temples and stupas develop?";
      }
    },
    options: [
      { id: 'same', label: 'There was only one blueprint used everywhere forever', icon: '📜', isCorrect: false },
      { id: 'evolved', label: 'Forms, materials, and regional styles evolved dynamically across different periods', icon: '🏛️', isCorrect: true },
      { id: 'instant', label: 'They were all built in a single century', icon: '⏳', isCorrect: false }
    ],
    explanation: "Sacred architecture was incredibly diverse. A site like Sanchi developed over multiple phases, and temple styles varied widely by region and century."
  },
  water_puzzle: {
    id: "arch-water-01",
    title: "Water Engineering",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If it only rains for a few months a year, what must a town build to have water all year round?";
        case '9-11': return "Why were reservoirs and stepwells so important in ancient urban planning?";
        case '12-14': return "What was the primary goal of historical water management systems like stepwells and reservoirs?";
        case '15-17': return "How did ancient settlements address the seasonal variability of the monsoon through engineering?";
        case '18+': return "In historical hydrological engineering, stepwells and reservoirs served as functional responses to what primary environmental variable?";
        default: return "Why were water systems built?";
      }
    },
    options: [
      { id: 'looks', label: 'They were only built for decoration', icon: '🎨', isCorrect: false },
      { id: 'storage', label: 'To capture, store, and manage seasonal water for year-round community use', icon: '💧', isCorrect: true },
      { id: 'magic', label: 'To summon endless rain', icon: '🌧️', isCorrect: false }
    ],
    explanation: "Historical water systems varied by geography but were essential for capturing and managing water in response to seasonal rainfall (the monsoon)."
  },
  build_puzzle: {
    id: "arch-build-01",
    title: "Build an Architectural Heritage Site",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "You are building a site to last for hundreds of years. What will you build?";
        case '9-11': return "You are the master builder. Which architectural tradition will you focus your resources on?";
        case '12-14': return "Allocate your resources to construct a heritage site. Which tradition do you choose?";
        case '15-17': return "Combine site planning, materials, and structural knowledge. Which architectural tradition will you develop?";
        case '18+': return "Gameplay abstraction: synthesize topographical, material, and structural variables to commission a monumental complex. Select your tradition.";
        default: return "Which site will you build?";
      }
    },
    options: [
      { id: 'rock', label: 'A Rock-Cut Cave Complex', icon: '⛰️', isCorrect: true },
      { id: 'temple', label: 'A Structural Temple', icon: '🏛️', isCorrect: true },
      { id: 'water', label: 'An Engineered Stepwell', icon: '🪜', isCorrect: true }
    ],
    explanation: "This is a gameplay decision simulating historical patronage and construction. Different traditions require different structural logic and material tradeoffs."
  }
};
