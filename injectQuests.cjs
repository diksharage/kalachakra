const fs = require('fs');

let code = fs.readFileSync('src/data/quests.js', 'utf8');

// Insert quests before the closing bracket of the array
const closingBracketIndex = code.lastIndexOf('];');

const newQuests = `
  , {
    id: "q_minigame_l3",
    levelId: 3,
    type: "side",
    titleKey: "quest.q_minigame_l3.title",
    descKey: "quest.q_minigame_l3.desc",
    objectives: [
      { type: "minigame", target: "mg-l3-artifacts", required: 1, labelKey: "quest.obj.complete_l3_minigame" }
    ],
    rewards: { legacy: 50, inventory: { harappan_bead: 1 } },
    prerequisites: [],
    kalaHintKey: "quest.q_minigame_l3.hint"
  },
  {
    id: "q_minigame_mastery",
    levelId: null, // Global quest
    type: "side",
    titleKey: "quest.q_minigame_mastery.title",
    descKey: "quest.q_minigame_mastery.desc",
    objectives: [
      { type: "minigame_stars", target: 3, required: 1, labelKey: "quest.obj.earn_3_stars" }
    ],
    rewards: { legacy: 100 },
    prerequisites: [],
    kalaHintKey: "quest.q_minigame_mastery.hint"
  }`;

code = code.substring(0, closingBracketIndex) + newQuests + code.substring(closingBracketIndex);

fs.writeFileSync('src/data/quests.js', code);
console.log("Injected minigame quests into quests.js");
