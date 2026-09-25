import { level1Locations } from './level1Data';
import { level1Challenges } from './level1Challenges';
import { level2Locations } from './level2Data';
import { level2Challenges } from './level2Challenges';
import { level3CityLocations, level3SiteLocations, level3ArtifactLocations } from './level3Data';
import { level3Challenges } from './level3Challenges';
import { level4GoodsLocations, level4RouteLocations, level4EvidenceLocations } from './level4Data';
import { level4Challenges } from './level4Challenges';
import { level5Mahajanapadas, level5SettlementLocations, level5DiplomacyLocations } from './level5Data';
import { level5Challenges } from './level5Challenges';
import { level6MapLocations, level6AdminLocations, level6InscriptionLocations } from './level6Data';
import { level6Challenges } from './level6Challenges';
import { 
  level7KnowledgeObjects, level7MathLocations, level7AstroLocations, 
  level7LitLocations, level7EvidenceLocations, level7MetalLocations, 
  level7CenterLocations 
} from './level7Data';
import { level7Challenges } from './level7Challenges';
import {
  level8ExploreLocations, level8LandscapeLocations, level8MaterialLocations,
  level8RockCutLocations, level8SacredLocations, level8WaterLocations,
  level8HeritageLocations
} from './level8Data';
import { level8Challenges } from './level8Challenges';
import {
  level9ExploreLocations, level9FestivalLocations, level9MusicLocations,
  level9DanceLocations, level9CraftLocations, level9KnowledgeLocations,
  level9PreserveLocations
} from './level9Data';
import { level9Challenges } from './level9Challenges';
import {
  level10ExploreLocations, level10AgriLocations, level10WaterLocations,
  level10ArtLocations, level10PortLocations, level10TradeLocations,
  level10GovernLocations
} from './level10Data';
import { level10Challenges } from './level10Challenges';
import {
  level11ExploreLocations, level11CityLocations, level11WaterLocations,
  level11MarketLocations, level11ArtLocations, level11CultureLocations,
  level11PreserveLocations
} from './level11Data';
import { level11Challenges } from './level11Challenges';
import {
  level12ExploreLocations, level12OralLocations, level12EpicLocations,
  level12ScriptLocations, level12TheatreLocations, level12VisualLocations,
  level12PreserveLocations
} from './level12Data';
import { level12Challenges } from './level12Challenges';
import {
  level13ExploreLocations, level13PachisiLocations, level13ChaturangaLocations,
  level13DiceLocations, level13SkillLocations, level13RegionalLocations,
  level13PreserveLocations
} from './level13Data';
import { level13Challenges } from './level13Challenges';
import {
  level14ReviewLocations, level14ProjectLocations, level14EvidenceLocations,
  level14BuildLocations, level14PreserveLocations, level14ShareLocations,
  level14ProtectLocations
} from './level14Data';
import { level14Challenges } from './level14Challenges';

export const levelConfigs = {
  1: {
    id: 1,
    title: "Early Human Communities",
    totalStages: 8,
    defaultResources: { wood: 0, stone: 0, plants: 0 },
    locations: level1Locations,
    challenges: level1Challenges,
    
    // Defines what clicking a location does based on stage
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'water') return { type: 'challenge', id: 'water' };
      if (stage === 4 && locId === 'rocks') return { type: 'challenge', id: 'tools' };
      if (stage === 5 && locId === 'fire_pit') return { type: 'challenge', id: 'fire' };
      return { type: 'discover' };
    },
    
    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1) return !isDiscovered;
      if (stage === 2 && locId === 'water') return true;
      if (stage === 4 && locId === 'rocks') return true;
      if (stage === 5 && locId === 'fire_pit') return true;
      if (stage === 6 && locId === 'shelter_area') return true;
      return false;
    },

    // Handles progression when a challenge is answered correctly
    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "early-water-01") return 3;
      if (challengeId === "early-food-01") return 4;
      if (challengeId === "early-tools-01") return 5;
      if (challengeId === "early-community-01") return 8;
      return currentStage;
    },

    // Special auto-triggers when a stage is reached
    getStageTrigger: (stage, state) => {
      if (stage === 3 && !state.completedChallenges.includes('early-food-01')) {
        return { type: 'challenge', id: 'food' };
      }
      if (stage === 5 && !state.completedChallenges.includes('fire-dummy')) {
        return { 
          type: 'success', 
          message: "🔥 Fire could support several aspects of human life, including warmth, light and food preparation. (Discovered)", 
          addCompleted: 'fire-dummy', 
          nextStage: 6 
        };
      }
      if (stage === 7 && !state.completedChallenges.includes('early-community-01')) {
        return { type: 'challenge', id: 'community' };
      }
      return null;
    },

    // Specific build action for this level
    getBuildAction: (stage) => {
      if (stage === 6) {
        return {
          label: "BUILD SHELTER",
          requiresText: "Requires: 1 Wood, 2 Stone, 2 Plants (Gameplay values)",
          nextStage: 7,
          message: "🏕️ Shelter Built! People created shelters that helped protect them from environmental conditions.",
          clearResources: true
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore your surroundings. Discover at least 3 locations.";
        case 2: return "Your community needs a reliable source of water.";
        case 3: return "Find gathered resources for subsistence.";
        case 4: return "Discover material to create a sharp tool.";
        case 5: return "Understand the uses of fire.";
        case 6: return "Build a basic shelter using your resources.";
        case 7: return "Make a decision for your community.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return ageGroup === '6-8' ? "Click on the different pictures to see what they are!" : "Interact with the environment locations to discover their significance.";
        case 2: return ageGroup === '6-8' ? "Look for the blue water!" : "Think about which resource humans needed daily.";
        case 3: return "Foragers gathered wild resources. What looks edible?";
        case 4: return "What hard material can be chipped into a sharp edge?";
        case 5: return "Fire was a major turning point in human technology.";
        case 6: return "Combine the resources you found to build a safe structure.";
        case 7: return "Survival is difficult alone. What helps a group survive?";
        case 8: return "Great job! You have learned the basics of early human communities.";
        default: return "";
      }
    },
    
    completionMessage: "You explored how early humans interacted with their environment, found resources, developed technologies and created ways of living together.",
    nextLevelName: "Early Farming Communities"
  },
  2: {
    id: 2,
    title: "Early Farming Communities",
    totalStages: 8,
    defaultResources: { food: 0, water: 0, materials: 0, storage: 0 },
    locations: level2Locations,
    challenges: level2Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'open_land') return { type: 'challenge', id: 'agriculture' };
      if (stage === 3 && locId === 'wild_animals') return { type: 'challenge', id: 'domestication' };
      if (stage === 4 && locId === 'clay_bank') return { type: 'challenge', id: 'pottery' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1) return !isDiscovered;
      if (stage === 2 && locId === 'open_land') return true;
      if (stage === 3 && locId === 'wild_animals') return true;
      if (stage === 4 && locId === 'clay_bank') return true;
      if (stage === 5 && locId === 'settlement_area') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "farming-agriculture-01") return 3;
      if (challengeId === "farming-animals-01") return 4;
      if (challengeId === "farming-pottery-01") return 5;
      if (challengeId === "farming-resource-01") return 7;
      if (challengeId === "farming-community-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 6 && !state.completedChallenges.includes('farming-resource-01')) {
        return { type: 'challenge', id: 'resource_management' };
      }
      if (stage === 7 && !state.completedChallenges.includes('farming-community-01')) {
        return { type: 'challenge', id: 'community_planning' };
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 5) {
        return {
          label: "BUILD SETTLEMENT",
          requiresText: "Requires: 2 Materials, 2 Water (Gameplay values)",
          nextStage: 6,
          message: "🏠 Settlement Built! This is a gameplay simulation inspired by evidence from early settled communities.",
          clearResources: true
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore the environment. Discover at least 3 resources.";
        case 2: return "Consider where agriculture could begin.";
        case 3: return "Observe the wild animals.";
        case 4: return "Find a way to store food and water safely.";
        case 5: return "Build a permanent settlement.";
        case 6: return "The settlement is growing. Water and food must be managed carefully.";
        case 7: return "How should the community organize its resources?";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return ageGroup === '6-8' ? "Click on the different places to see what you find!" : "Interact with the environment to discover early farming resources.";
        case 2: return ageGroup === '6-8' ? "Plants need water and dirt to grow." : "Think about what crops need to grow.";
        case 3: return "Animals provided meat, milk, and labor.";
        case 4: return "You need a material that can be shaped and dried to hold water.";
        case 5: return "Use your gathered materials and water to create a permanent village.";
        case 6: return "More people means more food and water are needed.";
        case 7: return "Cooperation is essential for a large settlement to survive.";
        case 8: return "Great job! You have built an early farming community.";
        default: return "";
      }
    },
    
    completionMessage: "You discovered how communities gradually developed settled ways of living, agriculture, animal domestication, and village life.",
    nextLevelName: "Indus Valley Civilization",
    completionPreview: {
      description: "Explore one of South Asia's most remarkable urban archaeological traditions.",
      features: ["🏙️ City Planning", "💧 Drainage", "🏺 Crafts", "🛍️ Trade", "🔖 Seals", "🏠 Houses", "📦 Storage", "🧱 Architecture"]
    }
  },
  3: {
    id: 3,
    title: "Indus Civilization",
    totalStages: 8,
    defaultResources: { water: 0, materials: 0, craftMaterials: 0, storage: 0, tradeGoods: 0 },
    
    cityStatus: {
      showFromStage: 2,
      metrics: {
        "Water Access": 78,
        "Infrastructure": 65,
        "Craft Production": 72,
        "Storage": 60
      }
    },

    // Stage-dependent locations mapping
    locations: (stage) => {
      if (stage === 6) {
        return [...level3SiteLocations, ...level3ArtifactLocations];
      }
      return level3CityLocations;
    },
    
    challenges: level3Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'indus_drainage') return { type: 'challenge', id: 'water_management' };
      if (stage === 3 && locId === 'indus_street') return { type: 'challenge', id: 'street_planning' };
      if (stage === 4 && locId === 'indus_workshop') return { type: 'challenge', id: 'crafts' };
      if (stage === 5 && (locId === 'indus_storage' || locId === 'indus_house')) return { type: 'challenge', id: 'exchange' };
      // During stage 6, they discover artifacts/sites. No strict challenge popup, just discovery reading!
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level3CityLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'indus_drainage') return true;
      if (stage === 3 && locId === 'indus_street') return true;
      if (stage === 4 && locId === 'indus_workshop') return true;
      if (stage === 5 && (locId === 'indus_storage' || locId === 'indus_house')) return true;
      if (stage === 6 && (level3SiteLocations.find(l => l.id === locId) || level3ArtifactLocations.find(l => l.id === locId))) return !isDiscovered;
      if (stage === 7 && locId === 'indus_storage') return true; // Hint for the decision challenge
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "indus-water-01") return 3;
      if (challengeId === "indus-streets-01") return 4;
      if (challengeId === "indus-crafts-01") return 5;
      if (challengeId === "indus-exchange-01") return 6;
      if (challengeId === "indus-decision-01") return 8; // Stage 7 leads to Stage 8
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 6) {
        // Find how many sites/artifacts discovered
        const stage6Discoveries = state.discovered.filter(d => 
          level3SiteLocations.find(l => l.id === d) || level3ArtifactLocations.find(l => l.id === d)
        );
        // Progress to Stage 7 when they explore 3 sites/artifacts
        if (stage6Discoveries.length >= 3 && !state.completedChallenges.includes('indus-sites-dummy')) {
          return { 
            type: 'success', 
            message: "You have reviewed crucial archaeological evidence from various sites.", 
            addCompleted: 'indus-sites-dummy', 
            nextStage: 7 
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "BUILD INFRASTRUCTURE & SOLVE CRISIS",
          requiresText: "Requires: 2 Materials, 2 Craft Materials, 1 Storage (Gameplay values)",
          nextStage: 7, // Actually trigger the challenge instead of just moving stage?
          actionOverride: { type: 'challenge', id: 'decision_storage' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore the city environment. Discover at least 3 structures.";
        case 2: return "Public health requires moving wastewater. Find the drainage systems.";
        case 3: return "Cities require organization. Examine the street layouts.";
        case 4: return "Examine specialized craft production and workshops.";
        case 5: return "Understand how goods were measured and exchanged.";
        case 6: return "Explore 3 major Archaeological Sites and Artifacts in the gallery.";
        case 7: return "Build and manage the city. Make a critical planning decision.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return ageGroup === '6-8' ? "Click on the houses and wells!" : "Interact with the environment to discover urban features.";
        case 2: return ageGroup === '6-8' ? "Look for where dirty water goes." : "Look at how water moves through the settlement.";
        case 3: return "Can you identify how the neighborhoods are divided?";
        case 4: return "Look for debris from stones and clay where artisans worked.";
        case 5: return "Standardized measurement was crucial for trade.";
        case 6: return "Remember: the exact meaning of Indus symbols is still unknown. What evidence does an artifact give us?";
        case 7: return "Think about what happens when a city grows but storage stays the same.";
        case 8: return "Great job! You have explored an Indus-inspired civilization.";
        default: return "";
      }
    },
    
    completionMessage: "You explored the Indus Civilization and learned how archaeologists study cities, water systems, crafts, artifacts and exchange networks.",
    nextLevelName: "Early Indian Trade Networks",
    completionPreview: {
      description: "Follow the movement of goods, ideas and people across early South Asian exchange networks.",
      features: ["🚢 Maritime Routes", "🐪 Overland Trade", "🌶️ Spices & Goods", "🤝 Cultural Exchange", "💰 Early Coinage", "📜 Textual Evidence"]
    }
  },
  4: {
    id: 4,
    title: "Early Indian Trade Networks",
    totalStages: 8,
    defaultResources: { cargo: 0, capacity: 0, supplies: 0, tradeGoods: 0, materials: 0, food: 0 },
    
    cityStatus: {
      title: "Network Status",
      description: "These scores are gameplay indicators used to guide your network-building decisions. They are not historical measurements.",
      showFromStage: 7,
      metrics: {
        "Goods Movement": 85,
        "Storage Capacity": 60,
        "Connectivity": 75,
        "Network Efficiency": 90
      }
    },

    locations: (stage) => {
      if (stage === 1 || stage === 5) return level4GoodsLocations;
      if (stage === 6) return level4EvidenceLocations;
      return level4RouteLocations;
    },
    
    challenges: level4Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'route_river') return { type: 'challenge', id: 'route_planning' };
      if (stage === 3 && locId === 'route_land') return { type: 'challenge', id: 'land_river_cross' };
      if (stage === 4 && locId === 'route_coast') return { type: 'challenge', id: 'maritime' };
      if (stage === 5 && locId === 'good_pottery') return { type: 'challenge', id: 'cargo' };
      if (stage === 6 && locId === 'evidence_style') return { type: 'challenge', id: 'cultural' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level4GoodsLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'route_river') return true;
      if (stage === 3 && locId === 'route_land') return true;
      if (stage === 4 && locId === 'route_coast') return true;
      if (stage === 5 && level4GoodsLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 6 && level4EvidenceLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 7 && locId === 'route_hub') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "trade-route-01") return 3;
      if (challengeId === "trade-cross-01") return 4;
      if (challengeId === "trade-maritime-01") return 5;
      if (challengeId === "trade-cargo-01") return 6;
      if (challengeId === "trade-cultural-01") return 7;
      if (challengeId === "trade-decision-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level4GoodsLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-stage-1')) {
          return {
            type: 'success',
            message: "You have surveyed the marketplace and identified key trade goods.",
            addCompleted: 'dummy-stage-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "RESOLVE NETWORK CRISIS",
          requiresText: "Requires: Balance supplies and cargo capacity",
          actionOverride: { type: 'challenge', id: 'network_crisis' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore the marketplace. Discover what goods were traded.";
        case 2: return "Find the most efficient geographic route for bulk transport.";
        case 3: return "Cross the overland network and manage travel supplies.";
        case 4: return "Explore the coast and maritime exchange networks.";
        case 5: return "Pack and manage fragile cargo and trade goods.";
        case 6: return "Examine archaeological evidence of cultural exchange.";
        case 7: return "Build your network and resolve a supply crisis.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Click on the items to discover what archaeologists have found.";
        case 2: return "Check the geography. Which route is a 'natural highway'?";
        case 3: return "Land routes are slow. What do travelers need to survive the journey?";
        case 4: return "Coastal settlements could use boats to connect distant regions.";
        case 5: return "Remember: fragile goods are a higher risk to transport!";
        case 6: return "Does finding the same object automatically prove direct trade? Think about ideas.";
        case 7: return "You have limited supplies. Make strategic trade-offs.";
        case 8: return "Great job! You have explored ancient trade networks.";
        default: return "";
      }
    },
    
    completionMessage: "You explored how goods, materials and ideas could move across different regions and learned how archaeologists use evidence to investigate ancient connections.",
    nextLevelName: "Mahajanapadas & Early Kingdoms",
    completionPreview: {
      description: "Explore the rise of larger political communities, cities, kingdoms and republics in early historic South Asia.",
      features: ["⚔️ State Formation", "⚒️ Iron Age", "🏙️ Second Urbanization", "📜 Early Texts", "🪙 Punch-marked Coins", "⚖️ Republics"]
    }
  },
  5: {
    id: 5,
    title: "Mahajanapadas & Early Kingdoms",
    totalStages: 8,
    defaultResources: { food: 0, population: 0, materials: 0, revenue: 0, currency: 0, defense: 0, storage: 0 },
    
    cityStatus: {
      title: "COMMUNITY STATUS",
      description: "These values are gameplay indicators and are not historical measurements.",
      showFromStage: 2,
      metrics: {
        "Food Supply": 70,
        "Population": 65,
        "Storage": 40,
        "Defense": 50,
        "Trade": 60,
        "Diplomacy": 80,
        "Infrastructure": 55
      }
    },

    locations: (stage) => {
      if (stage === 1) return level5Mahajanapadas;
      if (stage === 6) return level5DiplomacyLocations;
      return level5SettlementLocations; // Stages 2, 3, 4, 5, 7
    },
    
    challenges: level5Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 3 && locId === 'bld_farm') return { type: 'challenge', id: 'farming_supply' };
      if (stage === 4 && locId === 'bld_market') return { type: 'challenge', id: 'trade_revenue' };
      if (stage === 5 && locId === 'bld_wall') return { type: 'challenge', id: 'defense_strategy' };
      if (stage === 6 && locId === 'dip_neighbor') return { type: 'challenge', id: 'diplomacy' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level5Mahajanapadas.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && level5SettlementLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 3 && locId === 'bld_farm') return true;
      if (stage === 4 && locId === 'bld_market') return true;
      if (stage === 5 && locId === 'bld_wall') return true;
      if (stage === 6 && level5DiplomacyLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 7 && locId === 'bld_house') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "maha-farm-01") return 4;
      if (challengeId === "maha-revenue-01") return 5;
      if (challengeId === "maha-defense-01") return 6;
      if (challengeId === "maha-diplomacy-01") return 7;
      if (challengeId === "maha-crisis-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level5Mahajanapadas.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-maha-1')) {
          return {
            type: 'success',
            message: "You have explored the Mahajanapadas map. Note that boundaries are approximate and simplified for gameplay.",
            addCompleted: 'dummy-maha-1',
            nextStage: 2
          };
        }
      }
      if (stage === 2) {
        const stage2Discoveries = state.discovered.filter(d => level5SettlementLocations.find(l => l.id === d));
        if (stage2Discoveries.length >= 2 && !state.completedChallenges.includes('dummy-maha-2')) {
          return {
            type: 'success',
            message: "You have established a settlement framework inspired by historical evidence.",
            addCompleted: 'dummy-maha-2',
            nextStage: 3
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "CHOOSE LEADERSHIP STRATEGY",
          requiresText: "Requires: Balance resources, diplomacy and infrastructure",
          actionOverride: { type: 'challenge', id: 'leadership' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore the historical map and discover at least 3 Mahajanapadas.";
        case 2: return "Build your settlement framework.";
        case 3: return "Manage farming and food supply to support urbanization.";
        case 4: return "Examine trade and revenue sources (marketplaces).";
        case 5: return "Strengthen defense and security for your growing community.";
        case 6: return "Engage in diplomacy with neighboring states.";
        case 7: return "Grow your political community by choosing a leadership focus.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Remember: the map is simplified for gameplay. Boundaries changed over time.";
        case 2: return "Look at the resources available before choosing your settlement location.";
        case 3: return "Agriculture was an important foundation for many early states.";
        case 4: return "Find the market. Early states obtained resources from trade and agriculture.";
        case 5: return "Archaeological evidence shows massive fortifications around early cities.";
        case 6: return "Diplomacy and relationships with nearby political communities were essential for security.";
        case 7: return "Different political communities could have different forms of organization.";
        case 8: return "Great job! You have explored early state formation.";
        default: return "";
      }
    },
    
    completionMessage: "You explored the growth of larger political communities and learned how agriculture, resources, trade, defense and political organization shaped early historic South Asia.",
    nextLevelName: "Mauryan Empire",
    completionPreview: {
      description: "Explore one of the largest early empires in South Asian history and discover administration, infrastructure, trade and imperial connections.",
      features: ["👑 Imperial Administration", "🛣️ Royal Highways", "🦁 Pillars & Edicts", "🤝 Global Connections", "🕊️ Dhamma", "🛡️ Grand Armies"]
    }
  },
  6: {
    id: 6,
    title: "Mauryan Empire",
    totalStages: 8,
    defaultResources: { food: 0, materials: 0, revenue: 0, infrastructure: 0, communication: 0, tradeGoods: 0 },
    
    cityStatus: {
      title: "EMPIRE STATUS",
      description: "Gameplay indicators — not historical measurements.",
      showFromStage: 2,
      metrics: {
        "Regional Connectivity": 80,
        "Food Supply": 70,
        "Trade": 65,
        "Infrastructure": 55,
        "Communication": 60,
        "Regional Stability": 85,
        "Game Revenue": 75
      }
    },

    locations: (stage) => {
      if (stage === 1) return level6MapLocations;
      if (stage === 6) return level6InscriptionLocations;
      return level6AdminLocations; // Stages 2, 3, 4, 5, 7
    },
    
    challenges: level6Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'admin_center') return { type: 'challenge', id: 'admin_territory' };
      if (stage === 3 && locId === 'road_hub') return { type: 'challenge', id: 'roads_communication' };
      if (stage === 4 && locId === 'agri_center') return { type: 'challenge', id: 'agriculture_revenue' };
      if (stage === 6 && locId === 'insc_rock') return { type: 'challenge', id: 'dhamma_inscriptions' };
      if (stage === 6 && locId === 'evid_kalinga') return { type: 'challenge', id: 'kalinga_conflict' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level6MapLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'admin_center') return true;
      if (stage === 3 && locId === 'road_hub') return true;
      if (stage === 4 && locId === 'agri_center') return true;
      if (stage === 5 && locId === 'trade_hub') return true;
      if (stage === 6 && level6InscriptionLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 7 && locId === 'admin_center') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "maurya-admin-01") return 3;
      if (challengeId === "maurya-roads-01") return 4;
      if (challengeId === "maurya-revenue-01") return 5;
      if (challengeId === "maurya-dhamma-01") return currentStage;
      if (challengeId === "maurya-kalinga-01") return currentStage;
      if (challengeId === "maurya-govern-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level6MapLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-maurya-1')) {
          return {
            type: 'success',
            message: "You have explored key Mauryan locations. Map boundaries are approximate and simplified for gameplay.",
            addCompleted: 'dummy-maurya-1',
            nextStage: 2
          };
        }
      }
      if (stage === 5) {
        if (state.discovered.includes('trade_hub') && !state.completedChallenges.includes('dummy-maurya-5')) {
          return {
            type: 'success',
            message: "Trade networks established! Now let's explore imperial communication and inscriptions.",
            addCompleted: 'dummy-maurya-5',
            nextStage: 6
          };
        }
      }
      if (stage === 6) {
        if (state.completedChallenges.includes('maurya-dhamma-01') && state.completedChallenges.includes('maurya-kalinga-01') && !state.completedChallenges.includes('dummy-maurya-6')) {
          return {
            type: 'success',
            message: "You have examined the inscriptions and considered their historical significance.",
            addCompleted: 'dummy-maurya-6',
            nextStage: 7
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "RESOLVE REGIONAL CRISIS",
          requiresText: "Requires: Balance infrastructure, food, and communication",
          actionOverride: { type: 'challenge', id: 'govern_crisis' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore the Mauryan world. Discover at least 3 major locations.";
        case 2: return "Establish an administrative center to manage the territory.";
        case 3: return "Build a road hub to improve communication and movement.";
        case 4: return "Manage agriculture to provide revenue for the empire.";
        case 5: return "Develop trade networks across the empire.";
        case 6: return "Examine Ashoka's inscriptions and learn about dhamma and Kalinga.";
        case 7: return "Govern your empire. Allocate limited resources to solve regional issues.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Remember: historical sites often developed over multiple periods.";
        case 2: return "Ancient empires needed ways to manage resources across large territories.";
        case 3: return "Roads help connect places, but they require materials and revenue to build.";
        case 4: return "Agriculture was the primary base for imperial resource extraction.";
        case 5: return "Different regions had different resources and economic roles.";
        case 6: return "An inscription is evidence, but historians still need to interpret it.";
        case 7: return "Look at which region needs resources most. Balance your response.";
        case 8: return "Great job! You have explored Mauryan administration.";
        default: return "";
      }
    },
    
    completionMessage: "You explored the Mauryan Empire, its infrastructure, administration, trade and the inscriptions associated with Ashoka.",
    nextLevelName: "Gupta Period & Knowledge",
    completionPreview: {
      description: "Explore mathematics, astronomy, literature, science and knowledge traditions in the Gupta-period world.",
      features: ["🔢 Early Mathematics", "🪐 Astronomy", "📜 Literature & Arts", "🪙 Gold Coinage", "🏛️ Temple Architecture", "🎓 Knowledge Traditions"]
    }
  },
  7: {
    id: 7,
    title: "Gupta Period & Knowledge",
    totalStages: 8,
    defaultResources: { knowledge: 0, capacity: 0, time: 0, materials: 0, progress: 0, storage: 0 },
    
    cityStatus: {
      title: "LEARNING CENTER STATUS",
      description: "Gameplay indicators representing knowledge growth and institutional capacity.",
      showFromStage: 2,
      metrics: {
        "Knowledge Depth": 75,
        "Learner Capacity": 60,
        "Available Time": 85,
        "Material Resources": 50
      }
    },

    locations: (stage) => {
      if (stage === 1) return level7KnowledgeObjects;
      if (stage === 2) return level7MathLocations;
      if (stage === 3) return level7AstroLocations;
      if (stage === 4) return level7LitLocations;
      if (stage === 5) return level7EvidenceLocations;
      if (stage === 6) return level7MetalLocations;
      return level7CenterLocations; // Stage 7
    },
    
    challenges: level7Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'math_area') return { type: 'challenge', id: 'math_puzzle' };
      if (stage === 3 && locId === 'astro_observatory') return { type: 'challenge', id: 'astro_puzzle' };
      if (stage === 4 && locId === 'lit_area') return { type: 'challenge', id: 'lit_puzzle' };
      if (stage === 5 && locId === 'evid_texts') return { type: 'challenge', id: 'observe_puzzle' };
      if (stage === 6 && locId === 'evid_ironpillar') return { type: 'challenge', id: 'metal_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level7KnowledgeObjects.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'math_area') return true;
      if (stage === 3 && locId === 'astro_observatory') return true;
      if (stage === 4 && locId === 'lit_area') return true;
      if (stage === 5 && locId === 'evid_texts') return true;
      if (stage === 6 && locId === 'evid_ironpillar') return true;
      if (stage === 7 && locId === 'center_library') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "gupta-math-01") return 3;
      if (challengeId === "gupta-astro-01") return 4;
      if (challengeId === "gupta-lit-01") return 5;
      if (challengeId === "gupta-observe-01") return 6;
      if (challengeId === "gupta-metal-01") return 7;
      if (challengeId === "gupta-build-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level7KnowledgeObjects.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-gupta-1')) {
          return {
            type: 'success',
            message: "You have discovered artifacts of learning! Now let's explore mathematical traditions.",
            addCompleted: 'dummy-gupta-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "FUND KNOWLEDGE BRANCH",
          requiresText: "Requires: Balance resources and capacity",
          actionOverride: { type: 'challenge', id: 'build_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Enter the world of knowledge. Discover at least 3 historical objects.";
        case 2: return "Explore South Asian mathematical traditions and numerical concepts.";
        case 3: return "Observe the sky and understand ancient astronomical models.";
        case 4: return "Discover classical literature, poetry, and narrative traditions.";
        case 5: return "Examine how scholars and historians reconstruct knowledge from evidence.";
        case 6: return "Study metallurgy, materials, and the Iron Pillar of Delhi.";
        case 7: return "Build a center of learning by allocating resources to specific branches.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Remember that historical knowledge developed over many generations.";
        case 2: return "Try solving the puzzle using the concept of place value.";
        case 3: return "Ancient astronomers developed mathematical models to describe celestial movements.";
        case 4: return "Literature provides evidence about culture, but is not always a literal record.";
        case 5: return "Check what the evidence actually tells us and what remains uncertain.";
        case 6: return "The pillar's resistance to rust is due to metallurgy, not magic.";
        case 7: return "Different choices develop different skills. This is a gameplay decision.";
        case 8: return "Great job! You have explored the Gupta-period world.";
        default: return "";
      }
    },
    
    completionMessage: "You explored mathematics, astronomy, literature, observation, metallurgy and learning traditions associated with the Gupta-period world.",
    nextLevelName: "Indian Architecture & Engineering",
    completionPreview: {
      description: "Discover temples, caves, water systems, engineering ideas and the many architectural traditions of South Asia.",
      features: ["🛕 Temple Architecture", "💧 Stepwells & Water Systems", "⛰️ Rock-cut Caves", "🧱 Structural Engineering", "🗺️ Urban Planning"]
    }
  },
  8: {
    id: 8,
    title: "Indian Architecture & Engineering",
    totalStages: 8,
    defaultResources: { stone: 0, brick: 0, timber: 0, builder: 0, water: 0, storage: 0, space: 0 },
    
    cityStatus: {
      title: "SITE STATUS",
      description: "Gameplay indicators of architectural stability and resources.",
      showFromStage: 2,
      metrics: {
        "Structural Stability": 80,
        "Water Supply": 60,
        "Material Reserves": 45,
        "Builder Capacity": 75,
        "Engineering Efficiency": 65
      }
    },

    locations: (stage) => {
      if (stage === 1) return level8ExploreLocations;
      if (stage === 2) return level8LandscapeLocations;
      if (stage === 3) return level8MaterialLocations;
      if (stage === 4) return level8RockCutLocations;
      if (stage === 5) return level8SacredLocations;
      if (stage === 6) return level8WaterLocations;
      return level8HeritageLocations; // Stage 7
    },
    
    challenges: level8Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'land_water') return { type: 'challenge', id: 'site_puzzle' };
      if (stage === 3 && locId === 'mat_quarry') return { type: 'challenge', id: 'materials_puzzle' };
      if (stage === 4 && locId === 'rock_ajanta') return { type: 'challenge', id: 'rockcut_puzzle' };
      if (stage === 5 && locId === 'sacred_temple') return { type: 'challenge', id: 'sacred_puzzle' };
      if (stage === 6 && locId === 'water_stepwell') return { type: 'challenge', id: 'water_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level8ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'land_water') return true;
      if (stage === 3 && locId === 'mat_quarry') return true;
      if (stage === 4 && locId === 'rock_ajanta') return true;
      if (stage === 5 && locId === 'sacred_temple') return true;
      if (stage === 6 && locId === 'water_stepwell') return true;
      if (stage === 7 && locId === 'build_heritage') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "arch-site-01") return 3;
      if (challengeId === "arch-materials-01") return 4;
      if (challengeId === "arch-rockcut-01") return 5;
      if (challengeId === "arch-sacred-01") return 6;
      if (challengeId === "arch-water-01") return 7;
      if (challengeId === "arch-build-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level8ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-arch-1')) {
          return {
            type: 'success',
            message: "You have discovered major architectural traditions! Let's explore site planning.",
            addCompleted: 'dummy-arch-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "CONSTRUCT MONUMENT",
          requiresText: "Requires: Stone, Builders, and Planning",
          actionOverride: { type: 'challenge', id: 'build_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Explore architectural traditions. Discover at least 3 structures.";
        case 2: return "Read the site and landscape. How does architecture interact with terrain?";
        case 3: return "Select materials. Weigh the tradeoffs between durability and effort.";
        case 4: return "Examine rock-cut architecture. Understand the subtractive carving process.";
        case 5: return "Identify the components of sacred spaces, temples, and stupas.";
        case 6: return "Plan a water engineering system for the community.";
        case 7: return "Build an architectural heritage site. Choose your tradition.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "These architectural traditions developed across different regions and periods.";
        case 2: return "Look closely at the landscape. Why might a water source be important?";
        case 3: return "Think about the material's weight, availability, and durability.";
        case 4: return "Remember: if you carve away too much stone, you cannot put it back.";
        case 5: return "Sacred architecture evolved dynamically, changing forms across centuries.";
        case 6: return "Your water storage needs to last through the dry season. Manage the flow.";
        case 7: return "Combine your material and structural knowledge to complete the site.";
        case 8: return "Great job! You are an architectural master.";
        default: return "";
      }
    },
    
    completionMessage: "You explored South Asian architectural traditions, rock-cut caves, temples, water engineering, and structural planning.",
    nextLevelName: "Indian Cultural Traditions",
    completionPreview: {
      description: "Explore the diverse philosophical, artistic, and cultural traditions of South Asia.",
      features: ["🧘 Philosophy", "🎨 Arts", "🎶 Music", "🤝 Social Traditions"]
    }
  },
  9: {
    id: 9,
    title: "Indian Cultural Traditions",
    totalStages: 8,
    defaultResources: { knowledge: 0, community: 0, creative: 0, documentation: 0, practice: 0 },
    
    cityStatus: {
      title: "TRADITION STATUS",
      description: "Gameplay indicators of cultural continuity and preservation.",
      showFromStage: 2,
      metrics: {
        "Cultural Knowledge": 85,
        "Community Participation": 70,
        "Creative Energy": 90,
        "Living Practice": 75,
        "Documentation": 60
      }
    },

    locations: (stage) => {
      if (stage === 1) return level9ExploreLocations;
      if (stage === 2) return level9FestivalLocations;
      if (stage === 3) return level9MusicLocations;
      if (stage === 4) return level9DanceLocations;
      if (stage === 5) return level9CraftLocations;
      if (stage === 6) return level9KnowledgeLocations;
      return level9PreserveLocations; // Stage 7
    },
    
    challenges: level9Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'fest_harvest') return { type: 'challenge', id: 'festival_puzzle' };
      if (stage === 3 && locId === 'music_rhythm') return { type: 'challenge', id: 'music_puzzle' };
      if (stage === 4 && locId === 'dance_classical') return { type: 'challenge', id: 'dance_puzzle' };
      if (stage === 5 && locId === 'craft_textile') return { type: 'challenge', id: 'craft_puzzle' };
      if (stage === 6 && locId === 'know_food') return { type: 'challenge', id: 'knowledge_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level9ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'fest_harvest') return true;
      if (stage === 3 && locId === 'music_rhythm') return true;
      if (stage === 4 && locId === 'dance_classical') return true;
      if (stage === 5 && locId === 'craft_textile') return true;
      if (stage === 6 && locId === 'know_food') return true;
      if (stage === 7 && locId === 'preserve_center') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "culture-festival-01") return 3;
      if (challengeId === "culture-music-01") return 4;
      if (challengeId === "culture-dance-01") return 5;
      if (challengeId === "culture-craft-01") return 6;
      if (challengeId === "culture-knowledge-01") return 7;
      if (challengeId === "culture-preserve-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level9ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-culture-1')) {
          return {
            type: 'success',
            message: "You have discovered the incredible diversity of cultural traditions! Let's explore festivals and community.",
            addCompleted: 'dummy-culture-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "PRESERVE TRADITION",
          requiresText: "Requires: Balance documentation and living practice",
          actionOverride: { type: 'challenge', id: 'preserve_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Discover regional diversity. Explore at least 3 cultural regions.";
        case 2: return "Explore festivals and community participation.";
        case 3: return "Experience music, rhythm, and oral teaching traditions.";
        case 4: return "Examine dance as a form of storytelling and expression.";
        case 5: return "Discover crafts, textiles, and living artisan traditions.";
        case 6: return "Explore food traditions, yoga, and community knowledge.";
        case 7: return "Become a Tradition Keeper. Plan a sustainable preservation strategy.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Traditions can vary even within the same region. Explore another example.";
        case 2: return "Festivals have multiple interpretations and adapt over time.";
        case 3: return "Think about how complex rhythms survived before digital recording.";
        case 4: return "Look beyond the costumes. Dance is an intricate language of expression.";
        case 5: return "Traditional crafts are living practices, not just ancient artifacts.";
        case 6: return "Food traditions are heavily tied to local geography and trade.";
        case 7: return "If you preserve only objects, what happens to the people who practice the tradition?";
        case 8: return "Great job! You have explored the living heritage of South Asia.";
        default: return "";
      }
    },
    
    completionMessage: "You explored the rich diversity, continuity, and transmission of Indian cultural traditions, music, dance, crafts, and food.",
    nextLevelName: "Chola & Regional Civilizations",
    completionPreview: {
      description: "Explore the maritime dominance, local governance, and exquisite bronze art of the Cholas.",
      features: ["🌊 Maritime Trade", "🥉 Bronze Art", "🐘 Naval Power", "🏛️ Temple Administration"]
    }
  },
  10: {
    id: 10,
    title: "Chola & Regional Civilizations",
    totalStages: 8,
    defaultResources: { food: 0, water: 0, output: 0, culture: 0, trade: 0, community: 0, builder: 0 },
    
    cityStatus: {
      title: "REGIONAL STATUS",
      description: "Gameplay indicators of agrarian wealth, trade, and cultural prestige.",
      showFromStage: 2,
      metrics: {
        "Agrarian Output": 80,
        "Water Resilience": 75,
        "Maritime Trade": 60,
        "Cultural Prestige": 85,
        "Local Governance": 70
      }
    },

    locations: (stage) => {
      if (stage === 1) return level10ExploreLocations;
      if (stage === 2) return level10AgriLocations;
      if (stage === 3) return level10WaterLocations;
      if (stage === 4) return level10ArtLocations;
      if (stage === 5) return level10PortLocations;
      if (stage === 6) return level10TradeLocations;
      return level10GovernLocations; // Stage 7
    },
    
    challenges: level10Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'agri_farmland') return { type: 'challenge', id: 'agri_puzzle' };
      if (stage === 3 && locId === 'water_tank') return { type: 'challenge', id: 'water_puzzle' };
      if (stage === 4 && locId === 'art_bronze') return { type: 'challenge', id: 'bronze_puzzle' };
      if (stage === 5 && locId === 'port_ship') return { type: 'challenge', id: 'port_puzzle' };
      if (stage === 6 && locId === 'trade_guild') return { type: 'challenge', id: 'trade_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level10ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'agri_farmland') return true;
      if (stage === 3 && locId === 'water_tank') return true;
      if (stage === 4 && locId === 'art_bronze') return true;
      if (stage === 5 && locId === 'port_ship') return true;
      if (stage === 6 && locId === 'trade_guild') return true;
      if (stage === 7 && locId === 'gov_royal') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "chola-agri-01") return 3;
      if (challengeId === "chola-water-01") return 4;
      if (challengeId === "chola-bronze-01") return 5;
      if (challengeId === "chola-port-01") return 6;
      if (challengeId === "chola-trade-01") return 7;
      if (challengeId === "chola-govern-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level10ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-chola-1')) {
          return {
            type: 'success',
            message: "You have entered the medieval regional world! Let's examine its agrarian foundation.",
            addCompleted: 'dummy-chola-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "GOVERN CIVILIZATION",
          requiresText: "Requires: Balance resources and local institutions",
          actionOverride: { type: 'challenge', id: 'govern_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Enter the Chola world. Discover regional geography and powers.";
        case 2: return "Manage the Kaveri Delta. How does agriculture fuel a state?";
        case 3: return "Organize water and irrigation using local institutions.";
        case 4: return "Explore monumental temples and the lost-wax bronze casting technique.";
        case 5: return "Investigate ports, monsoon winds, and maritime connections.";
        case 6: return "Examine regional exchange and merchant guild networks.";
        case 7: return "Govern the civilization. Balance agriculture, trade, and culture.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Remember, the Cholas were one of several regional powers thriving concurrently.";
        case 2: return "Intensive farming requires reliable water. The delta provided a massive surplus.";
        case 3: return "Inscriptions show that local assemblies (sabhas) helped maintain the water tanks.";
        case 4: return "Bronze casting requires preparing a wax model first. Mistakes are hard to fix.";
        case 5: return "Chola maritime activities were primarily diplomatic and commercial, not just military.";
        case 6: return "Guilds provided the logistical backbone to move goods across vast distances.";
        case 7: return "Every grand architectural project requires resources that could have been used elsewhere.";
        case 8: return "Great job! You governed a complex regional civilization.";
        default: return "";
      }
    },
    
    completionMessage: "You successfully managed agriculture, local institutions, trade networks, and cultural projects in a medieval regional civilization context.",
    nextLevelName: "Vijayanagara & Medieval Heritage",
    completionPreview: {
      description: "Step into Hampi, a magnificent capital of wealth, grand markets, and stunning monuments.",
      features: ["🏰 City of Victory", "⚖️ Markets", "👑 Courtly Life", "🐘 Architecture"]
    }
  },
  11: {
    id: 11,
    title: "Vijayanagara & Medieval Heritage",
    totalStages: 8,
    defaultResources: { culture: 0, water: 0, builder: 0, trade: 0, knowledge: 0, community: 0, documentation: 0 },
    
    cityStatus: {
      title: "HERITAGE STATUS",
      description: "Gameplay indicators of urban planning, economy, and site preservation.",
      showFromStage: 2,
      metrics: {
        "Urban Planning": 85,
        "Water Resilience": 75,
        "Market Economy": 80,
        "Cultural Patronage": 90,
        "Heritage Preservation": 65
      }
    },

    locations: (stage) => {
      if (stage === 1) return level11ExploreLocations;
      if (stage === 2) return level11CityLocations;
      if (stage === 3) return level11WaterLocations;
      if (stage === 4) return level11MarketLocations;
      if (stage === 5) return level11ArtLocations;
      if (stage === 6) return level11CultureLocations;
      return level11PreserveLocations; // Stage 7
    },
    
    challenges: level11Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'city_sacred') return { type: 'challenge', id: 'city_puzzle' };
      if (stage === 3 && locId === 'water_aqueduct') return { type: 'challenge', id: 'water_puzzle' };
      if (stage === 4 && locId === 'market_bazaar') return { type: 'challenge', id: 'market_puzzle' };
      if (stage === 5 && locId === 'art_virupaksha') return { type: 'challenge', id: 'art_puzzle' };
      if (stage === 6 && locId === 'culture_lit') return { type: 'challenge', id: 'culture_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level11ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'city_sacred') return true;
      if (stage === 3 && locId === 'water_aqueduct') return true;
      if (stage === 4 && locId === 'market_bazaar') return true;
      if (stage === 5 && locId === 'art_virupaksha') return true;
      if (stage === 6 && locId === 'culture_lit') return true;
      if (stage === 7 && locId === 'preserve_hampi') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "vijay-city-01") return 3;
      if (challengeId === "vijay-water-01") return 4;
      if (challengeId === "vijay-market-01") return 5;
      if (challengeId === "vijay-art-01") return 6;
      if (challengeId === "vijay-culture-01") return 7;
      if (challengeId === "vijay-preserve-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level11ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-vijay-1')) {
          return {
            type: 'success',
            message: "You have arrived at the Vijayanagara region. Let's explore its urban layout.",
            addCompleted: 'dummy-vijay-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "PRESERVE HERITAGE",
          requiresText: "Requires: Balance archaeology with community needs",
          actionOverride: { type: 'challenge', id: 'preserve_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Enter the Vijayanagara world. Discover the landscape and its connections.";
        case 2: return "Explore the city. Identify distinct administrative and sacred zones.";
        case 3: return "Manage water. How did the city survive in a rocky, semi-arid environment?";
        case 4: return "Examine markets. Discover connections to global trade networks.";
        case 5: return "Investigate monumental architecture. How did temples develop over time?";
        case 6: return "Explore the multilingual court culture and performing arts.";
        case 7: return "Protect the heritage site. Balance ruins, landscape, and visitors.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "The Tungabhadra River shaped the city's location. Who were the empire's neighbors?";
        case 2: return "Urban planning intentionally separated the palaces from the main temples.";
        case 3: return "Water had to be captured from the river and monsoon rains using massive stone aqueducts.";
        case 4: return "Warhorses and fine porcelain show deep connections to international maritime trade.";
        case 5: return "Remember, huge complexes like Virupaksha weren't built by a single king overnight.";
        case 6: return "A vast empire needs multiple languages to function and thrive culturally.";
        case 7: return "Preservation means managing both the physical stones and the living landscape.";
        case 8: return "Great job! You are a master of medieval heritage planning.";
        default: return "";
      }
    },
    
    completionMessage: "You successfully navigated the urban planning, water management, diverse culture, and modern preservation challenges of the Vijayanagara heritage.",
    nextLevelName: "Stories, Literature & Folk Arts",
    completionPreview: {
      description: "Delve into the rich tapestry of stories, fables, and regional folk arts across India.",
      features: ["📜 Epics", "🦊 Fables", "🗣️ Oral Traditions", "🎨 Crafts"]
    }
  },
  12: {
    id: 12,
    title: "Stories, Literature & Folk Arts",
    totalStages: 8,
    defaultResources: { stories: 0, knowledge: 0, language: 0, creative: 0, documentation: 0, community: 0, performance: 0, preservation: 0 },
    
    cityStatus: {
      title: "CULTURAL STATUS",
      description: "Gameplay indicators of narrative transmission and preservation.",
      showFromStage: 2,
      metrics: {
        "Oral Transmission": 80,
        "Manuscript Archive": 65,
        "Literary Diversity": 85,
        "Performance Arts": 75,
        "Living Heritage": 90
      }
    },

    locations: (stage) => {
      if (stage === 1) return level12ExploreLocations;
      if (stage === 2) return level12OralLocations;
      if (stage === 3) return level12EpicLocations;
      if (stage === 4) return level12ScriptLocations;
      if (stage === 5) return level12TheatreLocations;
      if (stage === 6) return level12VisualLocations;
      return level12PreserveLocations; // Stage 7
    },
    
    challenges: level12Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'oral_bard') return { type: 'challenge', id: 'oral_puzzle' };
      if (stage === 3 && locId === 'epic_ramayana') return { type: 'challenge', id: 'epic_puzzle' };
      if (stage === 4 && locId === 'script_palm') return { type: 'challenge', id: 'script_puzzle' };
      if (stage === 5 && locId === 'theatre_puppet') return { type: 'challenge', id: 'theatre_puzzle' };
      if (stage === 6 && locId === 'visual_scroll') return { type: 'challenge', id: 'visual_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level12ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'oral_bard') return true;
      if (stage === 3 && locId === 'epic_ramayana') return true;
      if (stage === 4 && locId === 'script_palm') return true;
      if (stage === 5 && locId === 'theatre_puppet') return true;
      if (stage === 6 && locId === 'visual_scroll') return true;
      if (stage === 7 && locId === 'preserve_community') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "story-oral-01") return 3;
      if (challengeId === "story-epic-01") return 4;
      if (challengeId === "story-script-01") return 5;
      if (challengeId === "story-theatre-01") return 6;
      if (challengeId === "story-visual-01") return 7;
      if (challengeId === "story-preserve-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level12ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-story-1')) {
          return {
            type: 'success',
            message: "You have discovered the vast linguistic and narrative diversity of the subcontinent.",
            addCompleted: 'dummy-story-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "PRESERVE TRADITION",
          requiresText: "Requires: Balance digital archives with living practice",
          actionOverride: { type: 'challenge', id: 'preserve_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Enter the world of stories. Discover regional and linguistic diversity.";
        case 2: return "Explore oral traditions. How do stories change as they are spoken?";
        case 3: return "Examine epics and literature. Distinguish literary traditions from historical events.";
        case 4: return "Investigate languages and scripts. How were texts physically transmitted?";
        case 5: return "Discover theatre and performance. How do gestures and music tell a story?";
        case 6: return "Explore folk arts. Understand visual storytelling.";
        case 7: return "Preserve the heritage. Balance archiving with supporting living practitioners.";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Notice how stories flourish in many different languages, not just one.";
        case 2: return "Variation is natural in oral storytelling; it doesn't mean the tradition is 'broken'.";
        case 3: return "A magical epic tells us deeply about culture, even if it's not a literal history book.";
        case 4: return "Remember, a language (spoken words) can be written using many different scripts.";
        case 5: return "Performances use costumes, lights, and specific hand gestures to tell stories without words.";
        case 6: return "Visual art like painted scrolls served as aids for traveling storytellers.";
        case 7: return "Digital files preserve data, but communities preserve the living soul of the tradition.";
        case 8: return "Great job! You have protected these rich storytelling traditions.";
        default: return "";
      }
    },
    
    completionMessage: "You successfully explored and navigated the preservation of India's incredibly diverse oral, literary, and performative storytelling traditions.",
    nextLevelName: "Traditional Indian Games",
    completionPreview: {
      description: "Play and learn about ancient strategic and traditional games that originated in India.",
      features: ["♟️ Chaturanga", "🎲 Pachisi", "🎯 Strategy", "🤝 Community Play"]
    }
  },
  13: {
    id: 13,
    title: "Traditional Indian Games",
    totalStages: 8,
    defaultResources: { strategy: 0, knowledge: 0, skill: 0, community: 0, pieces: 0, materials: 0, creative: 0, preservation: 0 },
    
    cityStatus: {
      title: "LUDIC STATUS",
      description: "Gameplay indicators of strategic mastery, skill, and heritage preservation.",
      showFromStage: 2,
      metrics: {
        "Strategic Mastery": 85,
        "Mathematical Intuition": 75,
        "Physical Agility": 80,
        "Cultural Adaptation": 90,
        "Game Preservation": 65
      }
    },

    locations: (stage) => {
      if (stage === 1) return level13ExploreLocations;
      if (stage === 2) return level13PachisiLocations;
      if (stage === 3) return level13ChaturangaLocations;
      if (stage === 4) return level13DiceLocations;
      if (stage === 5) return level13SkillLocations;
      if (stage === 6) return level13RegionalLocations;
      return level13PreserveLocations; // Stage 7
    },
    
    challenges: level13Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'pachisi_moves') return { type: 'challenge', id: 'pachisi_puzzle' };
      if (stage === 3 && locId === 'chat_pieces') return { type: 'challenge', id: 'chaturanga_puzzle' };
      if (stage === 4 && locId === 'dice_throw') return { type: 'challenge', id: 'dice_puzzle' };
      if (stage === 5 && locId === 'skill_kabaddi') return { type: 'challenge', id: 'skill_puzzle' };
      if (stage === 6 && locId === 'region_pallankuzhi') return { type: 'challenge', id: 'regional_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level13ExploreLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'pachisi_moves') return true;
      if (stage === 3 && locId === 'chat_pieces') return true;
      if (stage === 4 && locId === 'dice_throw') return true;
      if (stage === 5 && locId === 'skill_kabaddi') return true;
      if (stage === 6 && locId === 'region_pallankuzhi') return true;
      if (stage === 7 && locId === 'preserve_design') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "game-pachisi-01") return 3;
      if (challengeId === "game-chaturanga-01") return 4;
      if (challengeId === "game-dice-01") return 5;
      if (challengeId === "game-skill-01") return 6;
      if (challengeId === "game-regional-01") return 7;
      if (challengeId === "game-preserve-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level13ExploreLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 3 && !state.completedChallenges.includes('dummy-game-1')) {
          return {
            type: 'success',
            message: "You have entered the world of traditional play! Let's examine board strategy.",
            addCompleted: 'dummy-game-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "DESIGN & PRESERVE",
          requiresText: "Requires: Balance historical mechanics with modern adaptation",
          actionOverride: { type: 'challenge', id: 'preserve_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Enter the world of traditional games. Discover strategy, chance, and skill.";
        case 2: return "Explore Pachisi/Chaupar. Analyze race-and-capture movement mechanics.";
        case 3: return "Examine Chaturanga. How does asymmetrical piece movement create strategy?";
        case 4: return "Investigate dice and chance. Explore the mathematics of risk and probability.";
        case 5: return "Discover physical traditions like Kabaddi. How is tactics applied to movement?";
        case 6: return "Explore regional games like Pallankuzhi. Understand how rules adapt locally.";
        case 7: return "Design and Preserve. How can you adapt a traditional game to keep it alive?";
        case 8: return "Level Complete! Claim your legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "Notice how games serve as tools for teaching strategy, morals, and math.";
        case 2: return "In race games, you must constantly balance moving forward with protecting your pieces.";
        case 3: return "Different piece movements require you to think multiple steps ahead.";
        case 4: return "You can't control the dice, but you can control how you react to the roll.";
        case 5: return "Physical games aren't just about speed; they require spatial awareness and teamwork.";
        case 6: return "When a game travels to a new region, its rules and board often adapt to the local culture.";
        case 7: return "To preserve a game, it must remain fun and playable for the next generation.";
        case 8: return "Great job! You have become a master of traditional strategy.";
        default: return "";
      }
    },
    
    completionMessage: "You successfully analyzed and preserved the strategic, mathematical, and community traditions embedded in South Asian games.",
    nextLevelName: "Preserve the Legacy",
    completionPreview: {
      description: "Protect and pass on the incredible heritage of Indian civilization to the future.",
      features: ["🇮🇳 Heritage", "🏛️ Museums", "🌍 Global Impact", "🛡️ Preservation"]
    }
  },
  14: {
    id: 14,
    title: "Preserve the Legacy",
    totalStages: 8,
    defaultResources: { knowledge: 0, documentation: 0, community: 0, preservation: 0, creativity: 0, legacy: 0 },
    
    cityStatus: {
      title: "HERITAGE PROJECT",
      description: "The status of your final civilization preservation legacy.",
      showFromStage: 2,
      metrics: {
        "Digital Archive": 85,
        "Public Education": 90,
        "Living Heritage": 95,
        "Global Access": 80,
        "Future Legacy": 100
      }
    },

    locations: (stage) => {
      if (stage === 1) return level14ReviewLocations;
      if (stage === 2) return level14ProjectLocations;
      if (stage === 3) return level14EvidenceLocations;
      if (stage === 4) return level14BuildLocations;
      if (stage === 5) return level14PreserveLocations;
      if (stage === 6) return level14ShareLocations;
      return level14ProtectLocations; // Stage 7
    },
    
    challenges: level14Challenges,
    
    getLocationAction: (stage, locId) => {
      if (stage === 2 && locId === 'proj_living') return { type: 'challenge', id: 'project_puzzle' };
      if (stage === 3 && locId === 'ev_artifact') return { type: 'challenge', id: 'evidence_puzzle' };
      if (stage === 4 && locId === 'bld_gallery') return { type: 'challenge', id: 'build_puzzle' };
      if (stage === 5 && locId === 'pres_story') return { type: 'challenge', id: 'preserve_puzzle' };
      if (stage === 6 && locId === 'share_school') return { type: 'challenge', id: 'share_puzzle' };
      return { type: 'discover' };
    },

    isLocationTarget: (stage, locId, isDiscovered) => {
      if (stage === 1 && level14ReviewLocations.find(l => l.id === locId)) return !isDiscovered;
      if (stage === 2 && locId === 'proj_living') return true;
      if (stage === 3 && locId === 'ev_artifact') return true;
      if (stage === 4 && locId === 'bld_gallery') return true;
      if (stage === 5 && locId === 'pres_story') return true;
      if (stage === 6 && locId === 'share_school') return true;
      if (stage === 7 && locId === 'prot_budget') return true;
      return false;
    },

    getChallengeNextStage: (challengeId, currentStage) => {
      if (challengeId === "capstone-project-01") return 3;
      if (challengeId === "capstone-evidence-01") return 4;
      if (challengeId === "capstone-build-01") return 5;
      if (challengeId === "capstone-preserve-01") return 6;
      if (challengeId === "capstone-share-01") return 7;
      if (challengeId === "capstone-protect-01") return 8;
      return currentStage;
    },

    getStageTrigger: (stage, state) => {
      if (stage === 1) {
        const stage1Discoveries = state.discovered.filter(d => level14ReviewLocations.find(l => l.id === d));
        if (stage1Discoveries.length >= 4 && !state.completedChallenges.includes('dummy-capstone-1')) {
          return {
            type: 'success',
            message: "You have reviewed the vast timeline of South Asian history! Now, choose your legacy.",
            addCompleted: 'dummy-capstone-1',
            nextStage: 2
          };
        }
      }
      return null;
    },

    getBuildAction: (stage) => {
      if (stage === 7) {
        return {
          label: "PROTECT THE LEGACY",
          requiresText: "Requires: Balance resources to finalize your project",
          actionOverride: { type: 'challenge', id: 'protect_puzzle' }
        };
      }
      return null;
    },

    getObjectiveText: (stage) => {
      switch (stage) {
        case 1: return "Review the Journey. Look back at what you've learned from 13 levels of history.";
        case 2: return "Choose a Heritage Legacy. What kind of project will you build?";
        case 3: return "Investigate the Evidence. Distinguish historical facts from interpretation.";
        case 4: return "Build the Digital Heritage Space. Organize your curation.";
        case 5: return "Preserve the Culture. Navigate complex preservation scenarios.";
        case 6: return "Share the Knowledge. How will you teach the public?";
        case 7: return "Protect the Legacy. Allocate your final resources.";
        case 8: return "KALACHAKRA COMPLETE! Claim your final legacy.";
        default: return "";
      }
    },

    getKalaHint: (stage, ageGroup) => {
      switch (stage) {
        case 1: return "You've traveled from early farming villages all the way to medieval empires. Take a moment to reflect.";
        case 2: return "There is no wrong project choice. Pick what matters most to you.";
        case 3: return "Remember: An artifact is a fact. What it means is an interpretation.";
        case 4: return "Grouping objects by theme helps visitors understand the story of the past.";
        case 5: return "Heritage is diverse. Embrace regional differences instead of erasing them.";
        case 6: return "Always share your sources so the public can learn how history is made.";
        case 7: return "You can't do everything perfectly. Balance your resources to make the biggest impact.";
        case 8: return "Congratulations! You are officially a Preserver of the Legacy.";
        default: return "";
      }
    },
    
    completionMessage: "KALACHAKRA COMPLETE! You travelled through communities, cities, kingdoms, knowledge traditions, architecture, arts, stories and games. History is not only something we remember. It is something we study, question, preserve and pass forward. Your journey through KALACHAKRA is complete. The legacy continues with you.",
    nextLevelName: null,
    completionPreview: null
  }
};
