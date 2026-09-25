export const level7Challenges = {
  mg_l7_timeline: {
    "id": "mg-l7-timeline",
    "title": "Mini-Game: Golden Age of Discoveries",
    "format": "minigame"
    
  },
  math_puzzle: {
    id: "gupta-math-01",
    title: "Mathematics & Numbers",
    format: "mcq",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Which idea makes it easy to write very big numbers using just a few digits?";
        case '9-11': return "What mathematical system did South Asian scholars help develop that we still use today to write numbers?";
        case '12-14': return "South Asian mathematical traditions played a major role in developing which crucial numerical system?";
        case '15-17': return "The development of mathematics in ancient South Asia is most famously associated with the formalization of which numerical concept?";
        case '18+': return "While the concept of a void existed in multiple cultures, South Asian mathematical traditions are critical for formalizing which systemic component of modern arithmetic?";
        default: return "What mathematical system was developed here?";
      }
    },
    options: [
      { id: 'roman', label: 'Roman Numerals', icon: '🔢', isCorrect: false },
      { id: 'place_value', label: 'The decimal place-value system (with zero as a number/placeholder)', icon: '🔢', isCorrect: true },
      { id: 'abacus', label: 'The invention of the abacus', icon: '🧮', isCorrect: false }
    ],
    explanation: "The development of zero and the decimal place-value system has a long, complex history. South Asian mathematical traditions played a major role in developing the system we use today."
  },
  astro_puzzle: {
    id: "gupta-astro-01",
    title: "Look to the Stars",
    format: "mcq",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Aryabhata watched the stars move across the sky. What did he say was actually moving?";
        case '9-11': return "How did Aryabhata explain the apparent daily movement of stars across the sky?";
        case '12-14': return "Aryabhata proposed a mathematical model to explain the daily movement of stars. What did it involve?";
        case '15-17': return "What astronomical model did Aryabhata propose to explain the apparent celestial rotation?";
        case '18+': return "In the Aryabhatiya, how does Aryabhata mathematically account for the apparent daily diurnal motion of the celestial sphere?";
        default: return "How did Aryabhata explain the stars moving?";
      }
    },
    options: [
      { id: 'magic', label: 'The stars were pushed by wind', icon: '🌬️', isCorrect: false },
      { id: 'rotation', label: 'The Earth rotates on its own axis', icon: '🌍', isCorrect: true },
      { id: 'geocentric', label: 'The Earth is completely still and the universe orbits it', icon: '🌌', isCorrect: false }
    ],
    explanation: "Aryabhata proposed a model in which the apparent daily movement of the stars could be explained by Earth's rotation. Ancient astronomers developed mathematical models to describe celestial movements."
  },
  lit_puzzle: {
    id: "gupta-lit-01",
    title: "Stories, Language & Literature",
    format: "matching",
    getQuestion: (ageGroup) => "Match the ancient medium or genre to what it primarily teaches historians:",
    pairs: [
      { left: { id: 'l1', label: 'Classical Dramas', icon: '🎭' }, right: { id: 'r1', label: 'Cultural Life & Ideas' } },
      { left: { id: 'l2', label: 'Scientific Treatises', icon: '📜' }, right: { id: 'r2', label: 'Mathematical Models' } },
      { left: { id: 'l3', label: 'Royal Inscriptions', icon: '🗿' }, right: { id: 'r3', label: 'Political Genealogy' } }
    ],
    reward: { knowledge: 2, time: 1 },
    explanation: "Different forms of literature provide distinct types of evidence. Dramas reveal cultural ideals, whereas treatises and inscriptions serve different historical functions."
  },
  observe_puzzle: {
    id: "gupta-observe-01",
    title: "Observation & Scientific Thinking",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of the ancient observational method used in classical astronomy:",
    items: [
      { id: 'step1', label: 'Observe the raw positions of planets over many nights.' },
      { id: 'step2', label: 'Record the data using precise numeric systems.' },
      { id: 'step3', label: 'Calculate mathematical models to predict future positions.' },
      { id: 'step4', label: 'Write treatises sharing the formulas with other scholars.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { knowledge: 2, progress: 1 },
    explanation: "Ancient scholars did not just guess; they used rigorous methods of long-term observation, mathematical calculation, and peer documentation to build knowledge systems."
  }
};
