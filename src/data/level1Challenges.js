export const level1Challenges = {
  mg_l1_survival: {
    "id": "mg-l1-survival",
    "title": "Mini-Game: Survival in the Wild",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  water: {
    id: "early-water-01",
    title: "Finding Water",
    difficulty: "easy",
    format: "mcq",
    getQuestion: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "Where is the best place for an early human family to live to get water every day?";
      if (ageGroup === '18+') return "Which geological and hydrological feature provided the necessary sustainability for early hominids to transition toward sedentary communities?";
      return "Which environmental feature would provide the most reliable daily resource for a growing community?";
    },
    options: [
      { id: 'desert', label: 'Dry Sand', icon: '🏜️', isCorrect: false },
      { id: 'river', label: 'Flowing River', icon: '🌊', isCorrect: true },
      { id: 'mountain', label: 'High Mountain Peak', icon: '⛰️', isCorrect: false }
    ],
    reward: { xp: 50 },
    getExplanation: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "Rivers give us fresh water to drink every single day, so early humans stayed near them!";
      return "Reliable access to water was fundamentally important for survival and eventually led to permanent settlements near river valleys.";
    }
  },
  food: {
    id: "early-food-01",
    title: "Subsistence & Gathering",
    difficulty: "medium",
    format: "matching",
    getQuestion: (ageGroup) => "Match the early human resource to its primary survival use:",
    pairs: [
      { left: { id: 'l1', label: 'Flint Stone', icon: '🪨' }, right: { id: 'r1', label: 'Cutting & Hunting' } },
      { left: { id: 'l2', label: 'Animal Hide', icon: '⛺' }, right: { id: 'r2', label: 'Warmth & Shelter' } },
      { left: { id: 'l3', label: 'Wild Berries', icon: '🫐' }, right: { id: 'r3', label: 'Foraged Food' } }
    ],
    reward: { plants: 2, food: 1 },
    getExplanation: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "Early humans didn't have stores. They used stones to cut, hides to stay warm, and berries to eat!";
      return "Paleolithic subsistence relied on exploiting diverse environmental resources, from lithic materials for tools to diverse flora/fauna for caloric intake and thermal regulation.";
    }
  },
  tools: {
    id: "early-tools-01",
    title: "Tool Discovery",
    difficulty: "hard",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of creating and using the first stone tools (Lithic Technology):",
    items: [
      { id: 'step1', label: 'Find a suitable hard core stone (like flint).' },
      { id: 'step2', label: 'Strike the core with a hammerstone to flake it.' },
      { id: 'step3', label: 'Select a sharp flake.' },
      { id: 'step4', label: 'Use the flake to cut meat or plants.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { tools: 1, stone: 1 },
    getExplanation: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "Knapping means hitting stones together to make sharp pieces. These sharp pieces were the very first knives!";
      return "Lithic reduction (knapping) was the foundational technology of the Paleolithic era, demonstrating advanced spatial reasoning and planning.";
    }
  },
  community: {
    id: "early-community-01",
    title: "Community & Cooperation",
    difficulty: "medium",
    format: "decision",
    getQuestion: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "A drought has dried up the plants! What is the best way for your group to survive?";
      return "A prolonged drought has reduced local caloric yields. What is the most successful adaptive strategy based on early human anthropology?";
    },
    options: [
      { id: 'alone', label: 'Split up and hide your own food.', icon: '🚶', isCorrect: false },
      { id: 'share', label: 'Cooperate, pool resources, and share knowledge.', icon: '🤝', isCorrect: true },
      { id: 'ignore', label: 'Stay in the exact same spot and wait for rain.', icon: '⏳', isCorrect: false }
    ],
    reward: { wood: 1, community: 1 },
    getExplanation: (ageGroup) => {
      if (ageGroup === '6-8' || ageGroup === '9-11') return "Working together and sharing is what kept early humans alive when times were tough!";
      return "Prosocial behavior, resource pooling, and shared cognitive mapping of new foraging grounds were essential evolutionary adaptations for hominid survival during climatic stress.";
    }
  }
};
