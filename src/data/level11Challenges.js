export const level11Challenges = {
  mg_l11_city: {
    "id": "mg-l11-city",
    "title": "Mini-Game: City of Victory",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  city_puzzle: {
    id: "vijay-city-01",
    title: "Explore the City & Landscape",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Why did the builders of Vijayanagara separate the city into different areas like the Sacred Center and the Royal Center?";
        case '9-11': return "What does the layout of Vijayanagara (Hampi) tell us about medieval urban planning?";
        case '12-14': return "Why was the city of Vijayanagara divided into distinct zones (Sacred, Royal, Urban Core)?";
        case '15-17': return "When analyzing the urban morphology of Vijayanagara, what does the distinct zoning (Sacred Center vs. Royal Center) indicate?";
        case '18+': return "The spatial organization of Vijayanagara reveals distinct functional zoning (e.g., Sacred Center, Royal Center). What primary historical function did this serve?";
        default: return "Why was the city zoned?";
      }
    },
    options: [
      { id: 'random', label: 'Buildings were just placed randomly wherever stones fell', icon: '🎲', isCorrect: false },
      { id: 'zoning', label: 'It demonstrates complex urban planning, separating civic/administrative functions from major religious spaces', icon: '🗺️', isCorrect: true },
      { id: 'magic', label: 'A wizard created the city overnight in perfectly straight lines', icon: '✨', isCorrect: false }
    ],
    explanation: "Vijayanagara is a masterpiece of urban planning. Its layout intentionally separates the primary administrative/palatial zones (Royal Center) from the main temple complexes (Sacred Center) while integrating them into the rocky landscape."
  },
  water_puzzle: {
    id: "vijay-water-01",
    title: "Water, Agriculture & Settlement",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Hampi is in a dry, rocky place. How did the people get enough water to grow food and live there?";
        case '9-11': return "How did the builders of Vijayanagara support a massive population in a semi-arid (dry) landscape?";
        case '12-14': return "What was the most critical engineering achievement that allowed Vijayanagara to thrive in its specific geography?";
        case '15-17': return "What hydrological strategy was essential for sustaining the massive urban population of Vijayanagara in the semi-arid Deccan plateau?";
        case '18+': return "Given the semi-arid topography of the Tungabhadra basin, what infrastructural achievement was the sine qua non for Vijayanagara's urban expansion?";
        default: return "How did they manage water?";
      }
    },
    options: [
      { id: 'rain', label: 'They just waited and hoped it would rain every day', icon: '🌧️', isCorrect: false },
      { id: 'engineering', label: 'They built an extensive network of aqueducts, stepwells (pushkaranis), and agricultural tanks', icon: '🌉', isCorrect: true },
      { id: 'bottles', label: 'They imported all their water in tiny clay bottles from other kingdoms', icon: '🏺', isCorrect: false }
    ],
    explanation: "The region is naturally semi-arid and rocky. Supporting a massive imperial capital required brilliant hydrological engineering, including stone aqueducts, massive tanks, and stepped wells to capture and route the Tungabhadra River."
  },
  market_puzzle: {
    id: "vijay-market-01",
    title: "Markets, Crafts & Trade",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Did the markets in Vijayanagara only sell things made nearby, or did they have things from far across the ocean?";
        case '9-11': return "What does the presence of goods like Arabian horses and Chinese porcelain in Vijayanagara tell us?";
        case '12-14': return "What was the primary role of Vijayanagara's coastal ports and inland markets in the medieval economy?";
        case '15-17': return "When historical travelers like Abdur Razzaq or Domingo Paes describe Vijayanagara's markets, what economic reality are they observing?";
        case '18+': return "The archaeological and textual evidence of horse trading and luxury goods at Vijayanagara indicates what about its macroeconomic position?";
        default: return "What do the markets tell us?";
      }
    },
    options: [
      { id: 'local', label: 'They only traded with villages that were less than a mile away', icon: '🛖', isCorrect: false },
      { id: 'global', label: 'The empire was deeply integrated into vast Indian Ocean and Eurasian trade networks', icon: '🌍', isCorrect: true },
      { id: 'none', label: 'Trading was strictly forbidden by the king', icon: '🛑', isCorrect: false }
    ],
    explanation: "Vijayanagara was a cosmopolitan hub. Its markets featured domestic textiles and spices, alongside high-value international imports like warhorses from the Middle East, showcasing deep integration into global trade."
  },
  art_puzzle: {
    id: "vijay-art-01",
    title: "Temples, Architecture & Public Spaces",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Did one single king build the entire Virupaksha Temple in one day?";
        case '9-11': return "When we look at a huge temple complex like Virupaksha, is it usually the work of just one ruler?";
        case '12-14': return "How should we understand the architectural timeline of major sites like the Virupaksha Temple?";
        case '15-17': return "When analyzing the architectural history of the Virupaksha Temple complex at Hampi, what is the most accurate historical consensus?";
        case '18+': return "In the architectural historiography of Hampi, how is the structural development of core sacred complexes (e.g., Virupaksha) best characterized?";
        default: return "How was the temple built?";
      }
    },
    options: [
      { id: 'single', label: 'Yes, it was built entirely from scratch by one ruler in a single year', icon: '⏱️', isCorrect: false },
      { id: 'multi', label: 'It developed over centuries, with multiple rulers adding walls, towers, and halls', icon: '🏗️', isCorrect: true },
      { id: 'aliens', label: 'It fell from the sky already completed', icon: '🌠', isCorrect: false }
    ],
    explanation: "Major temple complexes like Virupaksha are palimpsests. They existed as smaller shrines before the empire, and successive rulers (like Krishnadevaraya) added massive towers (gopurams) and halls to demonstrate patronage over time."
  },
  culture_puzzle: {
    id: "vijay-culture-01",
    title: "Culture, Literature & Performing Arts",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Did everyone in the Vijayanagara empire speak and write in exactly the same language?";
        case '9-11': return "Why were so many different languages used in the courts and literature of Vijayanagara?";
        case '12-14': return "What does the patronage of Telugu, Kannada, Sanskrit, and Tamil literature tell us about the Vijayanagara court?";
        case '15-17': return "How did the Vijayanagara court manage the cultural diversity of its empire in terms of literature and administration?";
        case '18+': return "The literary patronage of the Vijayanagara court (e.g., under Krishnadevaraya) was notably multilingual. What political reality does this reflect?";
        default: return "What does multilingual literature show?";
      }
    },
    options: [
      { id: 'mono', label: 'They forced everyone to use a single, newly invented language', icon: '🤐', isCorrect: false },
      { id: 'multi', label: 'It was a diverse, multilingual empire that patronized multiple literary and cultural traditions', icon: '📜', isCorrect: true },
      { id: 'none', label: 'They did not know how to write', icon: '🤷', isCorrect: false }
    ],
    explanation: "The empire was highly diverse. The royal court actively patronized literature in multiple languages—including Telugu, Kannada, Sanskrit, and Tamil—reflecting its control over a vast, multilingual region."
  },
  preserve_puzzle: {
    id: "vijay-preserve-01",
    title: "Protect & Preserve the Heritage City",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If you want to protect a massive ruined city like Hampi today, what is the best thing to do?";
        case '9-11': return "Why is managing a World Heritage site like Hampi so difficult today?";
        case '12-14': return "What is the biggest challenge in preserving a massive historical site like Hampi today?";
        case '15-17': return "In modern heritage management, what is the primary challenge when preserving a vast, integrated site like Hampi?";
        case '18+': return "As a UNESCO World Heritage site, the preservation of Hampi requires balancing structural conservation with what other major factors?";
        default: return "What is the challenge in preservation?";
      }
    },
    options: [
      { id: 'pave', label: 'Bulldoze the ruins and build a modern shopping mall over them', icon: '🚜', isCorrect: false },
      { id: 'balance', label: 'Balancing the protection of ancient structures and landscapes with the needs of local communities and visitors', icon: '⚖️', isCorrect: true },
      { id: 'ignore', label: 'Leave it completely alone and never let anyone look at it', icon: '🙈', isCorrect: false }
    ],
    explanation: "Heritage preservation is not just about rocks; it's about people. Managing a site like Hampi means protecting the archaeology and the natural landscape while managing tourism and respecting the living communities in the area."
  }
};
