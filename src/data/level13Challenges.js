export const level13Challenges = {
  mg_l13_strategy: {
    "id": "mg-l13-strategy",
    "title": "Mini-Game: The Chaturanga Master",
    "format": "minigame"
    
  },
  pachisi_puzzle: {
    id: "game-pachisi-01",
    title: "Pachisi & Board Strategy",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If you can move your piece to a safe space or a dangerous space, which one should you usually choose?";
        case '9-11': return "In games like Pachisi or Chaupar, why is it important to have 'safe spaces' (castles) on the board?";
        case '12-14': return "What is the core strategic tension in race-and-capture games like Pachisi?";
        case '15-17': return "When analyzing traditional cross-and-circle games (like Pachisi), what is the primary strategic mechanic driving player decisions?";
        case '18+': return "In the ludic structure of traditional race games (e.g., Pachisi/Chaupar), what constitutes the primary strategic decision matrix for a player?";
        default: return "What is the strategy in Pachisi?";
      }
    },
    options: [
      { id: 'random', label: 'Players just move randomly without thinking', icon: '🎲', isCorrect: false },
      { id: 'risk', label: 'Players constantly weigh the risk of being captured against the reward of advancing rapidly toward the goal', icon: '⚖️', isCorrect: true },
      { id: 'none', label: 'There are no rules, everyone just wins instantly', icon: '🏆', isCorrect: false }
    ],
    reward: { strategy: 1, pieces: 1 },
    explanation: "While movement is determined by chance (dice/cowries), Pachisi is deeply strategic. Players must decide which piece to move, balancing offensive capturing, defensive safe-spaces, and progression."
  },
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
  skill_puzzle: {
    id: "game-skill-01",
    title: "Traditional Games of Skill & Movement",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "In games like Kabaddi and Kho-Kho, is it better to work alone or work together with your team?";
        case '9-11': return "What skills do traditional physical games like Kho-Kho or Kabaddi teach besides just running fast?";
        case '12-14': return "Why are traditional physical games like Kabaddi considered highly tactical?";
        case '15-17': return "When analyzing traditional physical sports like Kabaddi, how is tactical strategy integrated with physical exertion?";
        case '18+': return "Beyond mere physical conditioning, what socio-spatial tactical skills do indigenous games like Kabaddi and Kho-Kho cultivate?";
        default: return "What do physical games teach?";
      }
    },
    options: [
      { id: 'solo', label: 'They only teach people how to run away from each other and hide', icon: '🙈', isCorrect: false },
      { id: 'team', label: 'They require rapid spatial awareness, breath control, team coordination, and tactical positioning', icon: '🤼', isCorrect: true },
      { id: 'sleep', label: 'They are designed to help players fall asleep faster', icon: '💤', isCorrect: false }
    ],
    explanation: "Traditional physical games are highly strategic. They are not just about brute strength or speed; they require split-second decision-making, spatial control, and intense team communication."
  },
  regional_puzzle: {
    id: "game-regional-01",
    title: "Regional Games & Community",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If one village plays a game with 10 pieces and another village plays the same game with 12 pieces, is one of them wrong?";
        case '9-11': return "Why do many traditional games have different rules depending on which region you visit?";
        case '12-14': return "What does the existence of multiple regional variants of a single game (like Pallankuzhi) indicate?";
        case '15-17': return "In studying the cultural transmission of games, what does the proliferation of regional rule variants signify?";
        case '18+': return "When observing the morphological evolution of games across the subcontinent, how should regional rule variants be interpreted?";
        default: return "Why do rules change?";
      }
    },
    options: [
      { id: 'wrong', label: 'Yes, only one version is historically accurate and all others are fake', icon: '❌', isCorrect: false },
      { id: 'adapt', label: 'Games are living traditions that are culturally adapted by communities to fit their local materials and social contexts', icon: '🌍', isCorrect: true },
      { id: 'aliens', label: 'Aliens changed the rules overnight to confuse people', icon: '🛸', isCorrect: false }
    ],
    reward: { knowledge: 1, community: 1 },
    explanation: "There is rarely one 'true' historical version of a traditional game. Variations in rules, board size, and materials showcase how games adapt and evolve organically as they travel across different communities."
  },
  preserve_puzzle: {
    id: "game-preserve-01",
    title: "Design & Preserve a Traditional Game",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "How can you help save a traditional game so that children in the future can play it too?";
        case '9-11': return "What is one of the best ways to preserve a traditional game that is being forgotten?";
        case '12-14': return "When considering the preservation of traditional games, what approach ensures the game remains a 'living' tradition?";
        case '15-17': return "In modern heritage preservation, what strategy is most effective for keeping traditional ludic (game) practices alive?";
        case '18+': return "To counter the attrition of traditional ludic heritage, what preservation methodology best sustains both the ruleset and its socio-cultural context?";
        default: return "How do we preserve games?";
      }
    },
    options: [
      { id: 'museum', label: 'Lock the game board in a glass box and forbid anyone from touching it', icon: '🔒', isCorrect: false },
      { id: 'play', label: 'Document the rules and actively teach/adapt the mechanics for new generations to actually play', icon: '🙌', isCorrect: true },
      { id: 'burn', label: 'Destroy all old games to force people to invent new ones', icon: '🔥', isCorrect: false }
    ],
    reward: { preservation: 2, knowledge: 1 },
    explanation: "Games exist to be played. While putting old boards in a museum is important for archaeology, preserving a game *tradition* requires teaching the rules, adapting the materials, and keeping the active play alive."
  }
};
