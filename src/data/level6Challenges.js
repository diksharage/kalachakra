export const level6Challenges = {
  mg_l6_build: {
    "id": "mg-l6-build",
    "title": "Mini-Game: Ashoka's Pillar",
    "format": "minigame"
    
  },
  administration: {
    id: "mauryan-admin-01",
    title: "Imperial Administration",
    format: "decision",
    getQuestion: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "You are the Emperor! Your empire is huge. What is the best way to make sure everyone hears your rules?";
       if (ageGroup === '18+') return "Which method provided the most durable and universally verifiable dissemination of Ashoka's Dhamma across diverse linguistic regions?";
       return "As the Mauryan Emperor, what is the most lasting method to spread your messages across a vast empire?";
    },
    options: [
      { id: 'messengers', label: 'Send oral messengers who might forget or alter the words.', icon: '🗣️', isCorrect: false },
      { id: 'pillars', label: 'Erect massive stone pillars and rock edicts inscribed with the decrees.', icon: '🏛️', isCorrect: true },
      { id: 'nothing', label: 'Do nothing and hope the local governors handle it.', icon: '🤷', isCorrect: false }
    ],
    reward: { stone: 3 },
    getExplanation: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "Emperor Ashoka carved his rules into giant stone pillars so they would last forever and everyone could see them!";
       return "Emperor Ashoka used monumental rock and pillar edicts inscribed in local scripts to communicate his policies directly to his subjects.";
    }
  },
  trade_routes: {
    id: "mauryan-trade-01",
    title: "The Royal Highway",
    format: "matching",
    getQuestion: (ageGroup) => "Match the Mauryan geographic region to its historical economic significance:",
    pairs: [
      { left: { id: 'l1', label: 'Northwest (Taxila)', icon: '🧭' }, right: { id: 'r1', label: 'Gateway to Central Asia' } },
      { left: { id: 'l2', label: 'Ganges Plain (Pataliputra)', icon: '🌾' }, right: { id: 'r2', label: 'Agricultural & Political Core' } },
      { left: { id: 'l3', label: 'Southern Routes', icon: '💎' }, right: { id: 'r3', label: 'Gold & Precious Gems' } }
    ],
    reward: { tools: 1, stone: 1 },
    getExplanation: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "The empire was connected by long roads! The north had trade routes, the middle had farms, and the south had gold.";
       return "The Mauryan Empire integrated diverse economic zones, from the agricultural heartland to the resource-rich south and the trade gateways of the northwest.";
    }
  },
  dhamma: {
    id: "mauryan-dhamma-01",
    title: "Ashoka's Transformation",
    format: "ordering",
    getQuestion: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "Put Emperor Ashoka's life events in the correct order:";
       return "Order the key events of Emperor Ashoka's reign according to historical evidence:";
    },
    items: [
      { id: 'step1', label: 'A violent military conquest of the Kalinga region.' },
      { id: 'step2', label: 'Deep remorse over the massive loss of life.' },
      { id: 'step3', label: 'Embracing Buddhist principles and the policy of Dhamma (non-violence).' },
      { id: 'step4', label: 'Erecting edicts to spread these peaceful teachings.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { stone: 1 },
    getExplanation: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "After a very sad war, Ashoka decided to stop fighting and instead spread peace and good behavior!";
       return "The devastating Kalinga War was a turning point for Ashoka, leading him to renounce military conquest in favor of moral persuasion (Dhamma).";
    }
  },
  agriculture: {
    id: "mauryan-agri-01",
    title: "Economic Base",
    format: "mcq",
    getQuestion: (ageGroup) => "What formed the primary economic foundation and major source of tax revenue for the Mauryan Empire?",
    options: [
      { id: 'ocean', label: 'Deep sea fishing', icon: '🐟', isCorrect: false },
      { id: 'agriculture', label: 'Agriculture and land revenue', icon: '🌾', isCorrect: true },
      { id: 'mercenaries', label: 'Hiring out mercenary armies', icon: '⚔️', isCorrect: false }
    ],
    reward: { tools: 1 },
    getExplanation: (ageGroup) => {
       if (ageGroup === '6-8' || ageGroup === '9-11') return "Farming was the most important thing! Growing food fed the massive army and all the cities.";
       return "Agriculture was the backbone of the economy. The state took a keen interest in expanding cultivated lands and collecting land revenue.";
    }
  }
};
