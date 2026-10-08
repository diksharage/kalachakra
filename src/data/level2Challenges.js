export const level2Challenges = {
  mg_l2_farming: {
    id: "mg-l2-farming",
    title: "First Harvest",
    format: "interactive_survival",
    question: "You have found a fertile patch of land. It is time to plant the first crops.",
    options: [
      { 
        label: "Plant wild seeds in the fertile soil", 
        costs: { wild_seeds: 2, fertile_soil: 1 }, 
        resultText: "The seeds grew into tall stalks of grain! You harvested the crop.", 
        isSuccess: true, 
        reward: { harvested_grain: 2, xp: 50, culture: 1 } 
      },
      { 
        label: "Throw seeds randomly into the forest", 
        costs: { wild_seeds: 1 }, 
        resultText: "The seeds failed to grow in the shade.", 
        isSuccess: false 
      }
    ]
  },
  pottery: {
    id: "farming-pottery-01",
    title: "The Art of Pottery",
    difficulty: "medium",
    format: "interactive_survival",
    question: "You need a way to store the harvested grain and carry water.",
    options: [
      {
        label: "Shape and fire clay pots in a kiln",
        costs: { clay: 2, wood: 1 },
        resultText: "You successfully baked sturdy clay pots! These will store grain safely.",
        isSuccess: true,
        reward: { clay_pots: 2, xp: 50, knowledge: 2 }
      },
      {
        label: "Weave a basket out of loose grass",
        costs: {},
        resultText: "The basket cannot hold water and mice easily ate the grain.",
        isSuccess: false
      }
    ]
  },
  mudbrick: {
    id: "farming-mudbrick-01",
    title: "Permanent Settlement",
    difficulty: "medium",
    format: "interactive_survival",
    question: "To protect the community from the elements, you must build sturdy, permanent structures.",
    options: [
      {
        label: "Mix mud with dry plant fibers to bake mudbricks in the sun",
        costs: { mud: 2, wood: 1 },
        resultText: "The sun-baked mudbricks are extremely strong! Perfect for building.",
        isSuccess: true,
        reward: { mudbrick: 2, xp: 50, legacy: 1 }
      },
      {
        label: "Stack loose mud without drying it",
        costs: { mud: 1 },
        resultText: "The first rain washed your mud walls away.",
        isSuccess: false
      }
    ]
  },
  tools: {
    id: "farming-tools-01",
    title: "Agricultural Tools",
    difficulty: "medium",
    format: "interactive_survival",
    question: "Farming requires advanced tools to till the soil and cut the stalks.",
    options: [
      {
        label: "Craft stone sickles and wooden hoes",
        costs: { stone: 1, wood: 1 },
        resultText: "You crafted specialized tools for agriculture!",
        isSuccess: true,
        reward: { tools: 2, xp: 50 }
      },
      {
        label: "Try to dig the soil with bare hands",
        costs: {},
        resultText: "It's too slow and exhausting. The field remains untilled.",
        isSuccess: false
      }
    ]
  }
};
