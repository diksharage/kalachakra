export const level2Challenges = {
  mg_l2_farming: {
    "id": "mg-l2-farming",
    "title": "Mini-Game: First Harvest",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  agriculture: {
    id: "farming-agriculture-01",
    title: "Agriculture & Land",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Where is the best place to grow plants from seeds?";
        case '9-11': return "Which environment would be most suitable for a community trying to grow crops?";
        case '12-14': return "When early communities began cultivating plants, which environmental factors were most important?";
        case '15-17': return "The transition to agriculture required specific environmental conditions. Which landscape provides the necessary resources for sustained cultivation?";
        case '18+': return "Early agricultural transitions (e.g., Neolithic revolution) were geographically bound. Which ecological niche best supports the domestication of wild cereals?";
        default: return "Where is the best place to farm?";
      }
    },
    options: [
      { id: 'desert', label: 'Dry rocky hills', icon: '⛰️', isCorrect: false },
      { id: 'river_valley', label: 'Fertile land near a river', icon: '🌾', isCorrect: true },
      { id: 'deep_forest', label: 'Deep dark forest', icon: '🌲', isCorrect: false }
    ],
    explanation: "Agriculture developed in different places at different times, but it universally required suitable soil and access to water. Communities adapted to their local environments."
  },
  domestication: {
    id: "farming-animals-01",
    title: "Animal Domestication",
    format: "matching",
    getQuestion: (ageGroup) => "Match the domesticated animal to its primary historical benefit:",
    pairs: [
      { left: { id: 'l1', label: 'Goats & Cattle', icon: '🐐' }, right: { id: 'r1', label: 'Milk & Meat' } },
      { left: { id: 'l2', label: 'Sheep', icon: '🐑' }, right: { id: 'r2', label: 'Wool & Warmth' } },
      { left: { id: 'l3', label: 'Dogs', icon: '🐕' }, right: { id: 'r3', label: 'Hunting & Guarding' } }
    ],
    explanation: "Humans developed relationships with animals like goats, sheep, and cattle. This provided reliable access to milk, meat, wool, and labor. Domestication practices varied widely across regions."
  },
  pottery: {
    id: "farming-pottery-01",
    title: "Pottery & Storage",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of creating and using early pottery for agriculture:",
    items: [
      { id: 'step1', label: 'Gather river clay and shape it into a vessel.' },
      { id: 'step2', label: 'Fire the clay in a hot pit to harden it.' },
      { id: 'step3', label: 'Harvest surplus grain from the fields.' },
      { id: 'step4', label: 'Store the grain inside to protect it from pests.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    explanation: "Pottery allowed communities to safely store surplus food, protect seeds for the next planting season from pests and moisture, and transport water."
  },
  resource_management: {
    id: "farming-resource-01",
    title: "Resource Management",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Your village has many people. What do you need more of?";
        case '9-11': return "If your community builds more houses and grows larger, what resources will you need to increase?";
        case '12-14': return "As a settlement expands its population, which critical resources must be managed carefully?";
        case '15-17': return "Population growth in early settlements required careful trade-offs. Expanding agricultural output immediately strains which other resource?";
        case '18+': return "The shift to sedentary agriculture introduced carrying capacity constraints. An expanding agrarian population primarily places pressure on which resource systems?";
        default: return "What do you need when a village grows?";
      }
    },
    options: [
      { id: 'water_food', label: 'Secure more water and food', icon: '🌾', isCorrect: true },
      { id: 'ignore', label: 'Nothing, the environment provides infinitely', icon: '🤷', isCorrect: false },
      { id: 'move', label: 'Abandon the settlement', icon: '🏃', isCorrect: false }
    ],
    explanation: "Settled life required careful management of water and food. Larger populations needed more resources, which required complex planning and storage systems."
  },
  community_planning: {
    id: "farming-community-01",
    title: "Community Planning",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Everyone in the village has a job. Is it better to share the work?";
        case '9-11': return "Farming takes a lot of effort. How did early villages organize the work?";
        case '12-14': return "How did the demands of agriculture change the way communities worked together?";
        case '15-17': return "The transition to agrarian societies necessitated shifts in labor organization. Which approach ensured settlement survival?";
        case '18+': return "Sedentism and agriculture led to complex social organization. How did early communities adapt their labor structures to the demands of cultivation and storage?";
        default: return "How should the village work together?";
      }
    },
    options: [
      { id: 'divide', label: 'Divide tasks and cooperate on shared goals', icon: '👥', isCorrect: true },
      { id: 'alone', label: 'Every family works entirely alone', icon: '🛖', isCorrect: false },
      { id: 'stop', label: 'Stop working and wait for rain', icon: '🌧️', isCorrect: false }
    ],
    explanation: "Farming required immense effort and organization. Communities had to cooperate to clear land, plant seeds, build structures, and protect stored food, leading to more complex social organization."
  }
};
