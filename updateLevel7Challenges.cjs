const fs = require('fs');

const level7Changes = `
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
`;

let code = fs.readFileSync('src/data/level7Challenges.js', 'utf8');

// Replace lit_puzzle and observe_puzzle blocks
code = code.replace(/lit_puzzle: \{[\s\S]*?(?=\}\s*\};)/, level7Changes.trim() + '\n');
fs.writeFileSync('src/data/level7Challenges.js', code);
console.log("Updated Level 7 challenges with variety!");
