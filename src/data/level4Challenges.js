export const level4Challenges = {
  mg_l4_trade: {
    "id": "mg-l4-trade",
    "title": "Mini-Game: The Meluhha Voyage",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  route_planning: {
    id: "trade-route-01",
    title: "Find the Route",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Which way is usually best for moving heavy things easily?";
        case '9-11': return "What geographic feature did ancient people often use as a 'natural highway' to move heavy goods?";
        case '12-14': return "When moving bulk goods like stone or grain, what type of route provided the most efficient transport in early periods?";
        case '15-17': return "Geography heavily influenced early exchange. Which transport method offered the lowest friction for bulk cargo over long distances?";
        case '18+': return "In analyzing early transport economics, which topographic feature consistently correlates with high-volume bulk exchange networks?";
        default: return "What was the most efficient route for heavy goods?";
      }
    },
    options: [
      { id: 'mountains', label: 'Over high mountains', icon: '⛰️', isCorrect: false },
      { id: 'rivers', label: 'Along river systems', icon: '🌊', isCorrect: true },
      { id: 'deserts', label: 'Across deserts', icon: '🏜️', isCorrect: false }
    ],
    explanation: "Rivers provided natural highways for moving heavy or bulk goods more efficiently than overland routes, heavily influencing where major settlements developed."
  },
  land_river_cross: {
    id: "trade-cross-01",
    title: "Cross Land & River",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "What is the hardest part about traveling a long way on land?";
        case '9-11': return "What was a major disadvantage of moving goods long distances over land compared to rivers?";
        case '12-14': return "Overland routes offered predictability, but what was their primary trade-off?";
        case '15-17': return "While land routes provided direct connections between specific inland centers, what was their primary logistical constraint?";
        case '18+': return "In the logistics of ancient overland exchange, what factor most severely limited the transport of bulk goods compared to riverine systems?";
        default: return "What was the disadvantage of land routes?";
      }
    },
    options: [
      { id: 'too_fast', label: 'It was too fast', icon: '🏃', isCorrect: false },
      { id: 'supplies', label: 'It required carrying lots of food and supplies', icon: '🎒', isCorrect: true },
      { id: 'no_paths', label: 'There were absolutely no paths', icon: '🚫', isCorrect: false }
    ],
    explanation: "GAMEPLAY EFFECTS: Land routes required pack animals and travelers to consume significant supplies (food and water) along the journey, making bulk transport difficult."
  },
  maritime: {
    id: "trade-maritime-01",
    title: "Explore Maritime Exchange",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Where would you find people trading by the sea?";
        case '9-11': return "What kind of settlements were most involved in maritime exchange?";
        case '12-14': return "Which type of settlements were crucial for connecting different coastal regions in maritime exchange networks?";
        case '15-17': return "Archaeological evidence of maritime exchange is most frequently associated with which geographic locations?";
        case '18+': return "In reconstructing early maritime exchange networks, sites like Lothal are studied for features that may represent what type of infrastructure?";
        default: return "Where does maritime exchange happen?";
      }
    },
    options: [
      { id: 'inland', label: 'Deep inland mountains', icon: '⛰️', isCorrect: false },
      { id: 'coastal', label: 'Coastal settlements and ports', icon: '⛵', isCorrect: true },
      { id: 'desert', label: 'The middle of deserts', icon: '🏜️', isCorrect: false }
    ],
    explanation: "Coastal communities could use maritime routes to connect distant regions. Lothal is often discussed in connection with maritime exchange, though interpretations of specific structures (like dockyards) can vary."
  },
  cargo: {
    id: "trade-cargo-01",
    title: "Pack & Manage Cargo",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If a pot is very fragile, what is the risk of trading it?";
        case '9-11': return "Why might a trader choose to carry small beads instead of large clay pots?";
        case '12-14': return "When managing cargo capacity, what trade-off must be considered for fragile goods?";
        case '15-17': return "In the context of ancient logistics, why do small, high-value goods like beads often appear across broader networks than bulk ceramics?";
        case '18+': return "How does the 'friction of distance' affect the archaeological distribution of heavy, low-value goods compared to small, high-status items?";
        default: return "What is the trade-off with fragile cargo?";
      }
    },
    options: [
      { id: 'no_risk', label: 'There is no risk', icon: '✅', isCorrect: false },
      { id: 'breaks', label: 'It might break during travel (high risk)', icon: '💥', isCorrect: true },
      { id: 'grows', label: 'It gets bigger', icon: '📈', isCorrect: false }
    ],
    explanation: "GAMEPLAY EFFECTS: Fragile or heavy goods represent higher risk and require more capacity. Small, valuable items (like beads) are often found further away because they are easier to transport."
  },
  cultural: {
    id: "trade-cultural-01",
    title: "Trade & Cultural Exchange",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Did traders only share objects, or did they share ideas too?";
        case '9-11': return "When people traded goods, what else often moved with them?";
        case '12-14': return "Finding identical pottery styles in two distant cities suggests what?";
        case '15-17': return "Archaeologists find similar artistic motifs in disconnected regions. What does this indicate about early networks?";
        case '18+': return "The widespread distribution of a specific craft technique (e.g., bead drilling) across distinct regions is evidence of what phenomenon?";
        default: return "What else moved with trade goods?";
      }
    },
    options: [
      { id: 'only_goods', label: 'Only physical objects moved', icon: '📦', isCorrect: false },
      { id: 'ideas', label: 'Ideas, techniques, and culture moved too', icon: '🤝', isCorrect: true },
      { id: 'nothing', label: 'Trade did not exist', icon: '🚫', isCorrect: false }
    ],
    explanation: "Trade networks moved more than just physical cargo. Similar objects or materials found in different places can provide evidence of cultural exchange, shared ideas, and human movement."
  },
  network_crisis: {
    id: "trade-decision-01",
    title: "Build Your Network",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "You only have a little food for a journey. What should you do?";
        case '9-11': return "You have limited supplies. Two settlements need different goods. How do you decide?";
        case '12-14': return "Your network has limited supplies. Settlement A needs materials, Settlement B needs food. What must you consider?";
        case '15-17': return "With limited logistical capacity (supplies), connecting a distant coastal settlement presents what opportunity cost?";
        case '18+': return "In an environment of resource scarcity, what is the primary opportunity cost of prioritizing a long-distance coastal route over local riverine exchange?";
        default: return "How do you manage limited supplies?";
      }
    },
    options: [
      { id: 'all', label: 'Try to do everything at once', icon: '🌪️', isCorrect: false },
      { id: 'tradeoffs', label: 'Make strategic trade-offs based on resources', icon: '⚖️', isCorrect: true },
      { id: 'stop', label: 'Stop trading completely', icon: '🛑', isCorrect: false }
    ],
    explanation: "Historical trade decisions varied according to local conditions, resources, and demand. You must balance the risk, supply cost, and connectivity benefits. The game uses simplified mechanics to help you understand these trade-offs."
  }
};
