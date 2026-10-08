const fs = require('fs');

let content = fs.readFileSync('src/data/minigames.js', 'utf8');

// We will parse the JS, or just use regex to inject 'rewards: [...]' into every variation based on the level!

const levelRewards = {
  "mg-l1-survival": [
    `{ type: 'resource', id: 'flint', amount: 2, label: 'Flint Stones', destination: 'Inventory', usage: 'Used for Tool Making' }`,
    `{ type: 'achievement', id: 'first_fire', amount: 1, label: 'Fire Starter Badge', destination: 'Profile', usage: 'Achievement Unlocked' }`
  ],
  "mg-l2-farming": [
    `{ type: 'resource', id: 'grain', amount: 5, label: 'Surplus Grain', destination: 'Inventory', usage: 'Used for Settlement Growth' }`,
    `{ type: 'artifact', id: 'stone_sickle', amount: 1, label: 'Stone Sickle', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l3-artifacts": [
    `{ type: 'artifact', id: 'steatite_seal', amount: 1, label: 'Unicorn Seal', destination: 'Artifact Collection', usage: 'View in Library' }`,
    `{ type: 'resource', id: 'terracotta', amount: 3, label: 'Terracotta Clay', destination: 'Inventory', usage: 'Used for Crafts' }`
  ],
  "mg-l4-trade": [
    `{ type: 'resource', id: 'lapis_lazuli', amount: 2, label: 'Lapis Lazuli', destination: 'Inventory', usage: 'Used for Trade' }`,
    `{ type: 'artifact', id: 'mesopotamian_weight', amount: 1, label: 'Trade Weight', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l5-kingdoms": [
    `{ type: 'resource', id: 'iron_ore', amount: 4, label: 'Iron Ore', destination: 'Inventory', usage: 'Used for Weapons and Tools' }`,
    `{ type: 'knowledge', id: 'mahajanapada_map', amount: 1, label: 'Map of 16 Kingdoms', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l6-build": [
    `{ type: 'resource', id: 'polished_stone', amount: 3, label: 'Polished Chunar Stone', destination: 'Inventory', usage: 'Used for Pillar Construction' }`,
    `{ type: 'artifact', id: 'dharma_chakra', amount: 1, label: 'Ashokan Edict Fragment', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l7-timeline": [
    `{ type: 'resource', id: 'manuscripts', amount: 2, label: 'Palm-Leaf Manuscripts', destination: 'Inventory', usage: 'Used for Universities' }`,
    `{ type: 'knowledge', id: 'concept_of_zero', amount: 1, label: 'Aryabhata\\'s Treatises', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l8-architecture": [
    `{ type: 'resource', id: 'granite', amount: 5, label: 'Granite Blocks', destination: 'Inventory', usage: 'Used for Temple Building' }`,
    `{ type: 'artifact', id: 'bronze_chisel', amount: 1, label: 'Master Mason Chisel', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l9-culture": [
    `{ type: 'resource', id: 'bronze', amount: 3, label: 'Bronze Alloy', destination: 'Inventory', usage: 'Used for Sculptures' }`,
    `{ type: 'knowledge', id: 'natyashastra', amount: 1, label: 'Natyashastra Scroll', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l10-chola": [
    `{ type: 'resource', id: 'spices', amount: 5, label: 'Exotic Spices', destination: 'Inventory', usage: 'Used for Maritime Trade' }`,
    `{ type: 'artifact', id: 'chola_bronze', amount: 1, label: 'Chola Naval Compass', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l11-vijay": [
    `{ type: 'resource', id: 'gold_coins', amount: 4, label: 'Varaha Gold Coins', destination: 'Inventory', usage: 'Used in Hampi Bazaars' }`,
    `{ type: 'artifact', id: 'arabian_horse_tack', amount: 1, label: 'Royal Cavalry Gear', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l12-stories": [
    `{ type: 'resource', id: 'ink', amount: 3, label: 'Natural Dyes and Ink', destination: 'Inventory', usage: 'Used for Story Murals' }`,
    `{ type: 'knowledge', id: 'panchatantra', amount: 1, label: 'Fables of Wisdom', destination: 'Knowledge Library', usage: 'Lore Unlocked' }`
  ],
  "mg-l13-games": [
    `{ type: 'resource', id: 'ivory', amount: 2, label: 'Carved Ivory Pieces', destination: 'Inventory', usage: 'Used for Game Boards' }`,
    `{ type: 'artifact', id: 'ancient_dice', amount: 1, label: 'Terracotta Dice', destination: 'Artifact Collection', usage: 'View in Library' }`
  ],
  "mg-l14-preserve": [
    `{ type: 'legacy', id: 'preservation_points', amount: 50, label: 'Legacy Points', destination: 'Global Progression', usage: 'Unlocks Future Content' }`,
    `{ type: 'achievement', id: 'master_archivist', amount: 1, label: 'Master Archivist Badge', destination: 'Profile', usage: 'Achievement Unlocked' }`
  ]
};

// We will dynamically inject these into the minigamesData object strings.
for (const [key, rewardsArr] of Object.entries(levelRewards)) {
  const rewardStr = `\n        rewards: [\n          ${rewardsArr.join(',\n          ')}\n        ],`;
  
  // Find the exact block for this key
  const regex = new RegExp(`"${key}":\\s*\\{\\s*id:\\s*"${key}",\\s*levelId:\\s*\\d+,\\s*variations:\\s*\\[\\s*\\{`);
  
  if (content.match(regex)) {
    // Inject rewards into BOTH variations!
    // Variation 1
    content = content.replace(regex, (match) => {
      return match + rewardStr;
    });
    // Variation 2
    const v2Regex = new RegExp(`(id:\\s*"${key}"[\\s\\S]*?variationId:\\s*"v2"[^\\{]*?\\{)`);
    content = content.replace(v2Regex, (match) => {
      return match + rewardStr;
    });
  }
}

fs.writeFileSync('src/data/minigames.js', content);
console.log("Injected rewards into minigames.js");
