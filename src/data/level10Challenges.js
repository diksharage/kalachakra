export const level10Challenges = {
  mg_l10_maritime: {
    "id": "mg-l10-maritime",
    "title": "Mini-Game: Chola Maritime Network",
    "format": "minigame"
    
  },
  water_assembly: {
    id: "chola-water-02",
    title: "Village Assembly Decision",
    format: "decision",
    getQuestion: (ageGroup) => "You are part of the local Ur (village assembly). A drought is approaching. How do you manage the massive Eri (irrigation tank)?",
    options: [
      { id: 'drain', label: 'Open all the sluice gates and drain the tank quickly so everyone gets water now.', icon: '🌊', isCorrect: false },
      { id: 'ration', label: 'Appoint a strict water committee (Eri-variyam) to ration water distribution fairly.', icon: '⚖️', isCorrect: true },
      { id: 'abandon', label: 'Abandon the tank and wait for rain.', icon: '🤷', isCorrect: false }
    ],
    reward: { food: 2, culture: 1 },
    explanation: "Chola village assemblies (Sabha/Ur) used specialized committees like the Eri-variyam to carefully manage and maintain crucial irrigation networks."
  },
  temple_economy: {
    id: "chola-temple-02",
    title: "The Temple Economy",
    format: "matching",
    getQuestion: (ageGroup) => "Match the group to their role in the massive Chola temple economy (like the Brihadeeswara Temple):",
    pairs: [
      { left: { id: 'l1', label: 'Scribes & Officials', icon: '📜' }, right: { id: 'r1', label: 'Recording land grants on copper plates' } },
      { left: { id: 'l2', label: 'Artisans & Weavers', icon: '🧵' }, right: { id: 'r2', label: 'Producing textiles and bronze statues' } },
      { left: { id: 'l3', label: 'Village Farmers', icon: '🌾' }, right: { id: 'r3', label: 'Providing agricultural surplus to the temple' } }
    ],
    reward: { culture: 2, tradeGoods: 1 },
    explanation: "Massive Chola temples weren't just religious centers; they were massive employers, banks, and hubs of economic redistribution."
  },
  naval_expedition: {
    id: "chola-navy-02",
    title: "Southeast Asian Trade",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of a Chola naval expedition to Southeast Asia (Srivijaya):",
    items: [
      { id: 'step1', label: 'Construct robust ocean-going ships in coastal shipyards.' },
      { id: 'step2', label: 'Navigate across the Bay of Bengal using monsoon winds.' },
      { id: 'step3', label: 'Establish trade relations with the Srivijaya Empire.' },
      { id: 'step4', label: 'Return to India with exotic goods and expanded geopolitical influence.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { tradeGoods: 2, culture: 1 },
    explanation: "Under Rajendra I, the Chola navy launched unprecedented maritime campaigns across the Bay of Bengal, protecting merchant guilds and expanding their influence into Southeast Asia."
  },
  guilds: {
    id: "chola-guilds-02",
    title: "Merchant Guilds",
    format: "mcq",
    getQuestion: (ageGroup) => "Groups like the Ayyavole and Manigramam were immensely powerful during the Chola period. What were they?",
    options: [
      { id: 'merchants', label: 'International merchant guilds that managed long-distance trade.', icon: '🚢', isCorrect: true },
      { id: 'warriors', label: 'Elite mercenary armies hired to fight northern kings.', icon: '⚔️', isCorrect: false },
      { id: 'monks', label: 'Isolated groups of forest-dwelling monks.', icon: '🧘', isCorrect: false }
    ],
    reward: { tradeGoods: 2 },
    explanation: "Merchant guilds (Shrenis) managed vast trade networks, minted their own coins in some cases, and heavily influenced the economy and politics of the region."
  }
};
