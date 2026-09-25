export const level5Challenges = {
  mg_l5_strategy: {
    "id": "mg-l5-strategy",
    "title": "Mini-Game: Rise of Magadha",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  farming_supply: {
    id: "maha-farm-01",
    title: "Farming & Food Supply",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "To grow a big city, what is the most important thing you need for the people?";
        case '9-11': return "What allowed these early political communities to support large cities and armies?";
        case '12-14': return "As settlements grew into cities, what was the primary foundation that supported their expansion?";
        case '15-17': return "Urbanization requires a surplus. Which sector provided the primary economic foundation for early historic state formation?";
        case '18+': return "In analyzing the 'second urbanization' of South Asia, the generation of surplus in which sector is considered a fundamental prerequisite for state formation?";
        default: return "What was the foundation of these growing communities?";
      }
    },
    options: [
      { id: 'gold', label: 'Finding giant piles of gold', icon: '💰', isCorrect: false },
      { id: 'agriculture', label: 'Expanding agricultural production and surplus', icon: '🌾', isCorrect: true },
      { id: 'magic', label: 'Magical spells', icon: '✨', isCorrect: false }
    ],
    explanation: "Agriculture was an important foundation for many early states and settlements, providing the surplus needed to support growing urban populations."
  },
  trade_revenue: {
    id: "maha-revenue-01",
    title: "Trade & Revenue",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "How did kings get enough resources to build big walls and roads?";
        case '9-11': return "Where did early states get the resources they needed to build infrastructure?";
        case '12-14': return "How did ancient states obtain the resources required to maintain armies and fortifications?";
        case '15-17': return "State power relies on resource extraction. What were the primary sources of revenue for early historic political communities?";
        case '18+': return "Early state formation required systematic resource extraction. From which domains did these communities typically derive revenue?";
        default: return "How did states get resources?";
      }
    },
    options: [
      { id: 'mining_only', label: 'Only by mining their own gold', icon: '⛏️', isCorrect: false },
      { id: 'revenue', label: 'Revenue from agricultural surplus and trade activity', icon: '📊', isCorrect: true },
      { id: 'gifts', label: 'Relying entirely on voluntary gifts', icon: '🎁', isCorrect: false }
    ],
    explanation: "Ancient states could obtain resources from agricultural production, trade and other forms of revenue, but the exact systems varied across places and periods."
  },
  defense_strategy: {
    id: "maha-defense-01",
    title: "Defense & Security",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Your city has very few building materials. What is the smartest thing to build first?";
        case '9-11': return "Your settlement has limited materials. What defensive structure should you prioritize?";
        case '12-14': return "When resources are constrained, which defensive infrastructure provides the most strategic value to a growing settlement?";
        case '15-17': return "Archaeological evidence often shows massive fortifications around early cities. If material resources are scarce, what must a settlement prioritize?";
        case '18+': return "In the context of early urban militarization, how did resource scarcity dictate the prioritization of defensive infrastructure?";
        default: return "What should you strengthen first?";
      }
    },
    options: [
      { id: 'decorations', label: 'Beautiful decorative statues', icon: '🗿', isCorrect: false },
      { id: 'walls', label: 'Defensive walls and strategic gates', icon: '🧱', isCorrect: true },
      { id: 'houses', label: 'More undefended houses', icon: '🏠', isCorrect: false }
    ],
    explanation: "Protecting the settlement was crucial. This requires strategic planning and resource management. Evidence of massive fortifications exists at many early historic urban sites."
  },
  diplomacy: {
    id: "maha-diplomacy-01",
    title: "Diplomacy & Decisions",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Your neighbor controls a road you need. What should you do?";
        case '9-11': return "Your settlement needs access to a trade route controlled by a neighbor. What is a strategic choice?";
        case '12-14': return "A neighboring community controls part of a vital trade route. How do you resolve this diplomatically?";
        case '15-17': return "Geopolitical control of trade routes was vital. If a neighboring state controls a key artery, what is a viable strategic response?";
        case '18+': return "State interaction in early historic South Asia involved complex diplomacy. When geopolitical interests intersected over trade routes, how were conflicts navigated?";
        default: return "How do you handle neighboring communities?";
      }
    },
    options: [
      { id: 'ignore', label: 'Ignore the neighbor completely', icon: '🙈', isCorrect: false },
      { id: 'negotiate', label: 'Negotiate access or establish exchange', icon: '🤝', isCorrect: true },
      { id: 'abandon', label: 'Abandon all trade', icon: '🛑', isCorrect: false }
    ],
    explanation: "This is a gameplay simulation of diplomacy. Historical interactions varied, but negotiation, resource sharing, and strategic alliances were key to political survival and growth."
  },
  leadership: {
    id: "maha-crisis-01",
    title: "Grow Your Political Community",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Your city is growing very fast! What kind of leader do you want to be?";
        case '9-11': return "Your political community is expanding. Which leadership focus will you choose?";
        case '12-14': return "As your settlement evolves into a larger political entity, where will you focus your administrative efforts?";
        case '15-17': return "State formation requires prioritizing different sectors. Which administrative archetype will guide your community's growth?";
        case '18+': return "Complex statecraft necessitates balancing multiple domains. Which sector will form the core of your political economy?";
        default: return "Choose your leadership focus.";
      }
    },
    options: [
      { id: 'admin', label: 'Administrator (Focus: Organization & Revenue)', icon: '📜', isCorrect: true },
      { id: 'trade', label: 'Trade Organizer (Focus: Exchange)', icon: '🚚', isCorrect: true },
      { id: 'defender', label: 'Defender (Focus: Security)', icon: '🛡️', isCorrect: true },
      { id: 'resource', label: 'Resource Manager (Focus: Agriculture)', icon: '🌾', isCorrect: true }
    ],
    explanation: "These are player archetypes, not historical rulers. Different political communities prioritized different strategies depending on their environment, threats, and resources."
  }
};
