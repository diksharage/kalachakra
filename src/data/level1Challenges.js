export const level1Challenges = {
  mg_l1_survival: {
    id: "mg-l1-survival",
    title: "Survival in the Wild",
    format: "interactive_survival",
    question: "A cold night approaches. The community is shivering and needs warmth to survive.",
    options: [
      { 
        label: "Build a Fire in the cave", 
        costs: { wood: 1, flint: 1 }, 
        resultText: "You successfully struck flint to light the wood! The fire provides warmth and safety.", 
        isSuccess: true, 
        reward: { xp: 50, community: 1, legacy: 10 } 
      },
      { 
        label: "Sleep in the open fields", 
        costs: {}, 
        resultText: "Too cold! The community suffered through a freezing night.", 
        isSuccess: false 
      }
    ]
  },
  water: {
    id: "early-water-01",
    title: "Finding Water",
    difficulty: "easy",
    format: "interactive_survival",
    question: "The community is thirsty. You need to secure a reliable source of water.",
    options: [
      { 
        label: "Use animal hide to carry water from the river", 
        costs: { hide: 1, water: 1 }, 
        resultText: "The hide acted as a primitive water skin! You brought enough water for everyone.", 
        isSuccess: true, 
        reward: { xp: 50, community: 2 } 
      },
      { 
        label: "Drink directly from muddy puddles", 
        costs: {}, 
        resultText: "The water was dirty. Several members fell ill.", 
        isSuccess: false 
      }
    ]
  },
  food: {
    id: "early-food-01",
    title: "Gathering Food",
    difficulty: "medium",
    format: "interactive_survival",
    question: "You spot tracks of a wild animal. The community is hungry.",
    options: [
      {
        label: "Hunt with Stone Spear",
        costs: { stone: 1, wood: 1 },
        resultText: "A successful hunt! You gathered meat and more hides.",
        isSuccess: true,
        reward: { meat: 2, hide: 1, xp: 50 }
      },
      {
        label: "Forage for berries instead",
        costs: { plants: 1 },
        resultText: "You safely gathered berries, but it's barely enough calories.",
        isSuccess: true,
        reward: { food: 1, xp: 20 }
      },
      {
        label: "Chase it bare-handed",
        costs: {},
        resultText: "The animal easily outran you. You return empty-handed.",
        isSuccess: false
      }
    ]
  },
  shelter: {
    id: "early-shelter-01",
    title: "Approaching Storm",
    difficulty: "medium",
    format: "interactive_survival",
    question: "Dark clouds gather. A severe storm is approaching the valley.",
    options: [
      {
        label: "Reinforce cave entrance with stones and branches",
        costs: { stone: 2, wood: 1 },
        resultText: "The heavy stones blocked the wind. Your shelter held strong!",
        isSuccess: true,
        reward: { xp: 50, legacy: 10 }
      },
      {
        label: "Use animal hides as a tent",
        costs: { hide: 1, wood: 1 },
        resultText: "The hide tent provided decent cover from the rain.",
        isSuccess: true,
        reward: { xp: 40 }
      },
      {
        label: "Hide under a tree",
        costs: {},
        resultText: "Lightning strikes nearby! It's extremely dangerous and cold.",
        isSuccess: false
      }
    ]
  }
};
