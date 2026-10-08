const fs = require('fs');

const level13Changes = `
  chaturanga_puzzle: {
    id: "game-chaturanga-01",
    title: "Chaturanga & Strategy",
    format: "matching",
    getQuestion: (ageGroup) => "Match the Chaturanga piece to its historical meaning or movement:",
    pairs: [
      { left: { id: 'l1', label: 'Infantry (Padati)', icon: '🚶' }, right: { id: 'r1', label: 'Moves one step forward' } },
      { left: { id: 'l2', label: 'Cavalry (Ashva)', icon: '🐎' }, right: { id: 'r2', label: 'Jumps in an L-shape' } },
      { left: { id: 'l3', label: 'Elephant (Gaja)', icon: '🐘' }, right: { id: 'r3', label: 'Diagonal leaps over pieces' } }
    ],
    reward: { pieces: 2, strategy: 1 },
    explanation: "The genius of Chaturanga (and later chess traditions) lies in asymmetrical piece movement reflecting ancient military divisions. Players must construct complex geometric strategies."
  },
  dice_puzzle: {
    id: "game-dice-01",
    title: "Probability & Mechanics",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of a typical turn in an ancient dice or cowrie race game:",
    items: [
      { id: 'step1', label: 'Assess the current board state and enemy positions.' },
      { id: 'step2', label: 'Throw the cowrie shells to determine movement points.' },
      { id: 'step3', label: 'Calculate the probability of different possible moves.' },
      { id: 'step4', label: 'Move your piece to a safe square or capture an opponent.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { pieces: 1, strategy: 1 },
    explanation: "Games of chance inherently teach probability. Even though the roll is random, choosing how to use that roll requires mathematical intuition and strategic planning."
  },
`;

let code = fs.readFileSync('src/data/level13Challenges.js', 'utf8');

// Replace chaturanga_puzzle and dice_puzzle
code = code.replace(/chaturanga_puzzle: \{[\s\S]*?(?=skill_puzzle: \{)/, level13Changes.trim() + '\n  ');
fs.writeFileSync('src/data/level13Challenges.js', code);
console.log("Updated Level 13 challenges with variety!");
