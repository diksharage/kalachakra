const fs = require('fs');

const exactRewards = {
  "mg-l1-survival": [
    `{ type: 'resource', id: 'stone', amount: 2, label: 'River Stones', destination: 'Inventory', usage: 'Used for Tool Making' }`,
    `{ type: 'artifact', id: 'hand_axe', amount: 1, label: 'Stone Hand Axe', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l2-farming": [
    `{ type: 'resource', id: 'grain', amount: 5, label: 'Surplus Grain', destination: 'Inventory', usage: 'Used for Settlement Growth' }`,
    `{ type: 'artifact', id: 'early_pottery', amount: 1, label: 'Neolithic Pottery', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l3-artifacts": [
    `{ type: 'artifact', id: 'steatite_seal', amount: 1, label: 'Unicorn Seal', destination: 'Artifact Collection', usage: 'View in Library' }`,
    `{ type: 'resource', id: 'craftMaterials', amount: 3, label: 'Harappan Craft Materials', destination: 'Inventory', usage: 'Used for City Building' }`
  ],
  "mg-l4-trade": [
    `{ type: 'resource', id: 'textiles', amount: 2, label: 'Woven Textiles', destination: 'Inventory', usage: 'Used for Export Trade' }`,
    `{ type: 'artifact', id: 'spices', amount: 1, label: 'Exotic Spices', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l5-kingdoms": [
    `{ type: 'resource', id: 'iron_tool', amount: 2, label: 'Iron Tools', destination: 'Inventory', usage: 'Used for Agriculture and War' }`,
    `{ type: 'artifact', id: 'punch_marked_coin', amount: 1, label: 'Punch-Marked Coin', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l6-build": [
    `{ type: 'knowledge', id: 'ashokan_edict', amount: 1, label: 'Ashokan Edict', destination: 'Knowledge Library', usage: 'Spreading Dhamma' }`,
    `{ type: 'knowledge', id: 'royal_decree', amount: 1, label: 'Mauryan Royal Decree', destination: 'Knowledge Library', usage: 'Imperial Administration' }`
  ],
  "mg-l7-timeline": [
    `{ type: 'knowledge', id: 'gupta_manuscript', amount: 1, label: 'Scientific Manuscript', destination: 'Knowledge Library', usage: 'Universities' }`,
    `{ type: 'artifact', id: 'astronomy_tool', amount: 1, label: 'Ancient Observatory Tool', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l8-architecture": [
    `{ type: 'resource', id: 'carved_stone', amount: 5, label: 'Carved Stone Blocks', destination: 'Inventory', usage: 'Used for Temple Building' }`,
    `{ type: 'knowledge', id: 'architectural_plan', amount: 1, label: 'Master Architect Plan', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l9-culture": [
    `{ type: 'artifact', id: 'bronze_statue', amount: 1, label: 'Lost-Wax Bronze Statue', destination: 'Artifact Collection', usage: 'View in Library' }`,
    `{ type: 'artifact', id: 'folk_instrument', amount: 1, label: 'Traditional Instrument', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l10-chola": [
    `{ type: 'resource', id: 'naval_supplies', amount: 3, label: 'Naval Supplies', destination: 'Inventory', usage: 'Equipping Maritime Expeditions' }`,
    `{ type: 'artifact', id: 'chola_bronze', amount: 1, label: 'Processional Bronze Idol', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l11-vijay": [
    `{ type: 'resource', id: 'vijayanagara_coin', amount: 4, label: 'Varaha Gold Coins', destination: 'Inventory', usage: 'Used in Hampi Bazaars' }`,
    `{ type: 'artifact', id: 'temple_carving', amount: 1, label: 'Ruins Temple Carving', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l12-stories": [
    `{ type: 'knowledge', id: 'palm_leaf_manuscript', amount: 1, label: 'Palm-Leaf Manuscript', destination: 'Knowledge Library', usage: 'Preserving Epics' }`,
    `{ type: 'knowledge', id: 'folk_tale', amount: 1, label: 'Oral Folk Tale', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l13-games": [
    `{ type: 'resource', id: 'game_piece', amount: 5, label: 'Carved Game Pieces', destination: 'Inventory', usage: 'Playing Board Games' }`,
    `{ type: 'artifact', id: 'pachisi_board', amount: 1, label: 'Royal Pachisi Board', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l14-preserve": [
    `{ type: 'knowledge', id: 'heritage_archive', amount: 1, label: 'Digital Heritage Archive', destination: 'Knowledge Library', usage: 'Protecting History' }`,
    `{ type: 'knowledge', id: 'preservation_record', amount: 1, label: 'Restoration Record', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ]
};

let content = fs.readFileSync('src/data/minigames.js', 'utf8');

for (const [key, rewardsArr] of Object.entries(exactRewards)) {
  const replacementStr = `rewards: [\n          ${rewardsArr.join(',\n          ')}\n        ]`;
  
  // We need to replace the old rewards block for this key.
  // The old block looks like:
  // rewards: [
  //   { type: 'resource', id: 'flint', ... },
  //   { type: 'achievement', id: 'first_fire', ... }
  // ]
  // We'll use a regex that matches `rewards: \[[^\]]*\]` but we have to be careful not to overmatch.
  // We'll scope it by the bank id.
  
  // Actually, since I injected them uniformly, I can just replace all `rewards: \[[^\]]*\]` inside each block.
  // Let's do it simply by replacing the whole string of minigames.js since we know the exact strings!
}

// Since JS regex might be tricky with multiline, let's just do a regex replace all.
content = content.replace(/rewards:\s*\[[\s\S]*?\]/g, (match, offset) => {
  // Find which key this belongs to by looking backwards
  const textBefore = content.substring(0, offset);
  const matchKey = Object.keys(exactRewards).find(k => textBefore.endsWith(`"${k}"`) || textBefore.includes(`id: "${k}"`));
  // A better way: find the last occurrence of `id: "mg-lX...` before this offset
  const idMatches = [...textBefore.matchAll(/id:\s*"([^"]+)"/g)];
  if (idMatches.length > 0) {
    let lastId = idMatches[idMatches.length - 1][1];
    if (exactRewards[lastId]) {
      return `rewards: [\n          ${exactRewards[lastId].join(',\n          ')}\n        ]`;
    }
  }
  return match;
});

fs.writeFileSync('src/data/minigames.js', content);
console.log("Replaced minigames.js rewards with strictly supported project data.");
