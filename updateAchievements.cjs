const fs = require('fs');

let code = fs.readFileSync('src/data/achievements.js', 'utf8');

// Change early_farmer
code = code.replace(
  '    id: "early_farmer",\n    titleKey: "earlyFarmer.title",\n    descKey: "earlyFarmer.description",\n    icon: "🌾",\n    category: "building",\n    target: 1,\n    rarity: "uncommon",\n    reward: 50,\n    type: "event"',
  '    id: "early_farmer",\n    titleKey: "earlyFarmer.title",\n    descKey: "earlyFarmer.description",\n    icon: "🌾",\n    category: "building",\n    target: 1,\n    rarity: "uncommon",\n    reward: 50,\n    type: "level_complete", levelId: 2'
);

// Change indus_urban_planner
code = code.replace(
  '    id: "indus_urban_planner",\n    titleKey: "indusUrbanPlanner.title",\n    descKey: "indusUrbanPlanner.description",\n    icon: "🧱",\n    category: "building",\n    target: 1,\n    rarity: "rare",\n    reward: 75,\n    type: "event"',
  '    id: "indus_urban_planner",\n    titleKey: "indusUrbanPlanner.title",\n    descKey: "indusUrbanPlanner.description",\n    icon: "🧱",\n    category: "building",\n    target: 1,\n    rarity: "rare",\n    reward: 75,\n    type: "level_complete", levelId: 3'
);

// Change trade_pathfinder
code = code.replace(
  '    id: "trade_pathfinder",\n    titleKey: "tradePathfinder.title",\n    descKey: "tradePathfinder.description",\n    icon: "🚢",\n    category: "exploration",\n    target: 1,\n    rarity: "uncommon",\n    reward: 50,\n    type: "event"',
  '    id: "trade_pathfinder",\n    titleKey: "tradePathfinder.title",\n    descKey: "tradePathfinder.description",\n    icon: "🚢",\n    category: "exploration",\n    target: 1,\n    rarity: "uncommon",\n    reward: 50,\n    type: "level_complete", levelId: 4'
);

// Change heritage_architect
code = code.replace(
  '    id: "heritage_architect",\n    titleKey: "heritageArchitect.title",\n    descKey: "heritageArchitect.description",\n    icon: "🏛️",\n    category: "building",\n    target: 1,\n    rarity: "epic",\n    reward: 100,\n    type: "event"',
  '    id: "heritage_architect",\n    titleKey: "heritageArchitect.title",\n    descKey: "heritageArchitect.description",\n    icon: "🏛️",\n    category: "building",\n    target: 1,\n    rarity: "epic",\n    reward: 100,\n    type: "level_complete", levelId: 8'
);

// Change game_historian
code = code.replace(
  '    id: "game_historian",\n    titleKey: "gameHistorian.title",\n    descKey: "gameHistorian.description",\n    icon: "🎲",\n    category: "games",\n    target: 1,\n    rarity: "rare",\n    reward: 75,\n    type: "event"',
  '    id: "game_historian",\n    titleKey: "gameHistorian.title",\n    descKey: "gameHistorian.description",\n    icon: "🎲",\n    category: "games",\n    target: 1,\n    rarity: "rare",\n    reward: 75,\n    type: "level_complete", levelId: 13'
);

// Change preserver_of_the_legacy
code = code.replace(
  '    id: "preserver_of_the_legacy",\n    titleKey: "preserverOfTheLegacy.title",\n    descKey: "preserverOfTheLegacy.description",\n    icon: "🏛️",\n    category: "preservation",\n    target: 1,\n    rarity: "legendary",\n    reward: 500,\n    type: "event",\n    hidden: true',
  '    id: "preserver_of_the_legacy",\n    titleKey: "preserverOfTheLegacy.title",\n    descKey: "preserverOfTheLegacy.description",\n    icon: "🏛️",\n    category: "preservation",\n    target: 1,\n    rarity: "legendary",\n    reward: 500,\n    type: "level_complete", levelId: 14,\n    hidden: true'
);

fs.writeFileSync('src/data/achievements.js', code);
console.log("Updated achievements to use level_complete type.");
