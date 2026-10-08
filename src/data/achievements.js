export const achievementsData = [
  {
    id: "artifact_collector",
    titleKey: "artifactCollector.title",
    descKey: "artifactCollector.description",
    icon: "🏺",
    category: "exploration",
    target: 5,
    rarity: "uncommon",
    reward: 100,
    type: "artifacts"
  },
  {
    id: "master_builder",
    titleKey: "masterBuilder.title",
    descKey: "masterBuilder.description",
    icon: "dY?>,?",
    category: "building",
    target: 10,
    rarity: "rare",
    reward: 200,
    type: "event" 
  },
  {
    id: "trade_master",
    titleKey: "tradeMaster.title",
    descKey: "tradeMaster.description",
    icon: "⛵",
    category: "journey",
    target: 4,
    rarity: "uncommon",
    reward: 150,
    type: "level_complete",
    levelId: 4
  },
  {
    id: "historian",
    titleKey: "historian.title",
    descKey: "historian.description",
    icon: "📜",
    category: "knowledge",
    target: 10,
    rarity: "rare",
    reward: 250,
    type: "challenges"
  },
  {
    id: "perfect_civilization",
    titleKey: "perfectCivilization.title",
    descKey: "perfectCivilization.description",
    icon: "⭐",
    category: "journey",
    target: 1,
    rarity: "legendary",
    reward: 500,
    type: "minigame_stars",
    starsRequired: 3
  },

  // EXPLORATION
  {
    id: "first_discovery",
    titleKey: "firstDiscovery.title",
    descKey: "firstDiscovery.description",
    icon: "🔎",
    category: "exploration",
    target: 1,
    rarity: "common",
    reward: 10,
    type: "artifacts" // mapped to gameState.unlockedArtifacts.length
  },
  {
    id: "curious_explorer",
    titleKey: "curiousExplorer.title",
    descKey: "curiousExplorer.description",
    icon: "🧭",
    category: "exploration",
    target: 10,
    rarity: "uncommon",
    reward: 50,
    type: "artifacts"
  },
  {
    id: "master_explorer",
    titleKey: "masterExplorer.title",
    descKey: "masterExplorer.description",
    icon: "🗺️",
    category: "exploration",
    target: 25,
    rarity: "rare",
    reward: 150,
    type: "artifacts"
  },
  {
    id: "journey_begins",
    titleKey: "journeyBegins.title",
    descKey: "journeyBegins.description",
    icon: "🌅",
    category: "journey",
    target: 1,
    rarity: "common",
    reward: 20,
    type: "levels" // mapped to gameState.completedLevels.length
  },
  {
    id: "civilization_traveler",
    titleKey: "civilizationTraveler.title",
    descKey: "civilizationTraveler.description",
    icon: "🐫",
    category: "journey",
    target: 5,
    rarity: "uncommon",
    reward: 100,
    type: "levels"
  },
  {
    id: "heritage_voyager",
    titleKey: "heritageVoyager.title",
    descKey: "heritageVoyager.description",
    icon: "🚢",
    category: "journey",
    target: 10,
    rarity: "rare",
    reward: 250,
    type: "levels"
  },
  
  // KNOWLEDGE
  {
    id: "knowledge_seeker",
    titleKey: "knowledgeSeeker.title",
    descKey: "knowledgeSeeker.description",
    icon: "📜",
    category: "knowledge",
    target: 10,
    rarity: "uncommon",
    reward: 50,
    type: "challenges" // mapped to gameState.completedChallenges.length
  },
  {
    id: "knowledge_keeper",
    titleKey: "knowledgeKeeper.title",
    descKey: "knowledgeKeeper.description",
    icon: "🌌",
    category: "knowledge",
    target: 25,
    rarity: "rare",
    reward: 150,
    type: "challenges"
  },

  // LEVEL-SPECIFIC MILESTONES (Triggered via specific action or level completion)
  {
    id: "early_farmer",
    titleKey: "earlyFarmer.title",
    descKey: "earlyFarmer.description",
    icon: "🌾",
    category: "culture",
    target: 1,
    rarity: "uncommon",
    reward: 50,
    type: "event"
  },
  {
    id: "indus_urban_planner",
    titleKey: "indusUrbanPlanner.title",
    descKey: "indusUrbanPlanner.description",
    icon: "🧱",
    category: "building",
    target: 1,
    rarity: "rare",
    reward: 75,
    type: "level_complete", levelId: 3
  },
  {
    id: "trade_pathfinder",
    titleKey: "tradePathfinder.title",
    descKey: "tradePathfinder.description",
    icon: "🚚",
    category: "exploration",
    target: 1,
    rarity: "uncommon",
    reward: 50,
    type: "event"
  },
  {
    id: "heritage_architect",
    titleKey: "heritageArchitect.title",
    descKey: "heritageArchitect.description",
    icon: "🏗️",
    category: "building",
    target: 1,
    rarity: "epic",
    reward: 100,
    type: "event"
  },
  {
    id: "game_historian",
    titleKey: "gameHistorian.title",
    descKey: "gameHistorian.description",
    icon: "🎲",
    category: "games",
    target: 1,
    rarity: "rare",
    reward: 75,
    type: "level_complete", levelId: 13
  },
  {
    id: "preserver_of_the_legacy",
    titleKey: "preserverOfTheLegacy.title",
    descKey: "preserverOfTheLegacy.description",
    icon: "⭐",
    category: "preservation",
    target: 1,
    rarity: "legendary",
    reward: 500,
    type: "event",
    hidden: true
  }
];

export const achievementCategories = [
  { id: 'exploration', icon: '🧭', labelKey: 'categories.exploration' },
  { id: 'knowledge', icon: '📜', labelKey: 'categories.knowledge' },
  { id: 'building', icon: '🏛️', labelKey: 'categories.building' },
  { id: 'culture', icon: '🎭', labelKey: 'categories.culture' },
  { id: 'games', icon: '🎮', labelKey: 'categories.games' },
  { id: 'journey', icon: '⭐', labelKey: 'categories.journey' },
  { id: 'preservation', icon: '🌱', labelKey: 'categories.preservation' }

  , {
    id: "first_minigame",
    titleKey: "firstMinigame.title",
    descKey: "firstMinigame.description",
    icon: "🎲",
    category: "games",
    target: 1,
    rarity: "common",
    reward: 20,
    type: "minigames"
  },
  {
    id: "master_solver",
    titleKey: "masterSolver.title",
    descKey: "masterSolver.description",
    icon: "🧩",
    category: "games",
    target: 5,
    rarity: "uncommon",
    reward: 100,
    type: "minigames"
  },
  {
    id: "perfect_historian",
    titleKey: "perfectHistorian.title",
    descKey: "perfectHistorian.description",
    icon: "🌟",
    category: "knowledge",
    target: 3, 
    starsRequired: 3,
    rarity: "rare",
    reward: 150,
    type: "minigame_stars"
  }];
