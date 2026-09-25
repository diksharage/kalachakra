export const level9Challenges = {
  mg_l9_culture: {
    "id": "mg-l9-culture",
    "title": "Mini-Game: Roots of Tradition",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  festival_puzzle: {
    id: "culture-festival-01",
    title: "Festivals & Community",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Do all families celebrate festivals in exactly the same way?";
        case '9-11': return "When a festival is celebrated across different regions, what usually happens to it?";
        case '12-14': return "How do historical festivals adapt when celebrated by different communities across diverse regions?";
        case '15-17': return "When analyzing traditional festivals across South Asia, what is the most accurate historical perspective on their origins and practices?";
        case '18+': return "In cultural anthropology and history, how are large-scale traditional festivals (e.g., harvest festivals) best understood?";
        default: return "How do festivals change?";
      }
    },
    options: [
      { id: 'static', label: 'They have a single origin and must be practiced identically everywhere', icon: '🛑', isCorrect: false },
      { id: 'adapt', label: 'They have multiple interpretations, regional variations, and evolving practices', icon: '🌍', isCorrect: true },
      { id: 'random', label: 'They are completely different every single year with no continuity', icon: '🎲', isCorrect: false }
    ],
    explanation: "Festivals are dynamic. They often tie into agricultural cycles or local history, but adapt and change as different communities practice them over time."
  },
  music_puzzle: {
    id: "culture-music-01",
    title: "Music & Rhythm",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Before books and internet were common, how did teachers pass down musical rhythms to students?";
        case '9-11': return "How was traditional music mostly passed down from generation to generation in South Asia?";
        case '12-14': return "What has been the primary method for transmitting traditional musical knowledge in South Asia?";
        case '15-17': return "In traditional South Asian performing arts, the 'parampara' system relies heavily on what form of knowledge transmission?";
        case '18+': return "Historically, the continuity of complex rhythmic (tala) and melodic (raga) structures relied primarily on which epistemological mechanism?";
        default: return "How is traditional music passed down?";
      }
    },
    options: [
      { id: 'written', label: 'Strictly through printed sheet music', icon: '📄', isCorrect: false },
      { id: 'oral', label: 'Through oral transmission, apprenticeship, and sustained practice', icon: '🗣️', isCorrect: true },
      { id: 'magic', label: 'Students were born already knowing it', icon: '✨', isCorrect: false }
    ],
    explanation: "Oral traditions and apprenticeships (such as the guru-shishya parampara) are fundamental to preserving and adapting complex musical systems over generations."
  },
  dance_puzzle: {
    id: "culture-dance-01",
    title: "Dance & Expression",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "When a traditional dancer uses specific hand gestures, what are they usually doing?";
        case '9-11': return "In many classical Indian dance forms, what is the main purpose of precise hand gestures (mudras) and facial expressions?";
        case '12-14': return "Beyond physical exercise, what is a primary function of classical dance forms like Bharatanatyam or Kathakali?";
        case '15-17': return "How do classical dance traditions function as a medium of cultural transmission?";
        case '18+': return "In analyzing South Asian classical dance traditions, physical movement and codified gestures (mudras) function primarily as a vehicle for what?";
        default: return "What is the purpose of dance gestures?";
      }
    },
    options: [
      { id: 'exercise', label: 'Just stretching their fingers for exercise', icon: '🖐️', isCorrect: false },
      { id: 'story', label: 'Storytelling, narrative expression, and cultural transmission', icon: '🎭', isCorrect: true },
      { id: 'random', label: 'Random movements with no historical meaning', icon: '🤷', isCorrect: false }
    ],
    explanation: "Dance is a profound form of storytelling. Using precise gestures and expressions, dancers transmit narratives, emotions, and cultural history."
  },
  craft_puzzle: {
    id: "culture-craft-01",
    title: "Crafts & Textiles",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Are all traditional crafts and clothes made exactly the same way they were 1000 years ago?";
        case '9-11': return "When an artisan makes a traditional craft today, how does it relate to the past?";
        case '12-14': return "Which statement best describes the nature of traditional crafts and textiles today?";
        case '15-17': return "When assessing the authenticity of modern traditional crafts, what historical reality must be acknowledged?";
        case '18+': return "In the context of artisanal heritage, how should the relationship between historical craft traditions and contemporary practices be characterized?";
        default: return "Are traditional crafts unchanged?";
      }
    },
    options: [
      { id: 'frozen', label: 'They are frozen in time and completely unchanged from ancient history', icon: '🧊', isCorrect: false },
      { id: 'adapt', label: 'They are living practices that draw on historical techniques while adapting to modern contexts', icon: '🧵', isCorrect: true },
      { id: 'fake', label: 'If they use any new tools, they are entirely fake', icon: '🚫', isCorrect: false }
    ],
    explanation: "Crafts are living traditions. Artisans preserve core techniques and aesthetics while continually adapting to new materials, environments, and community needs."
  },
  knowledge_puzzle: {
    id: "culture-knowledge-01",
    title: "Food & Traditional Knowledge",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "Why do people in different parts of the country eat different types of traditional foods?";
        case '9-11': return "What usually influences the traditional food recipes of a specific region?";
        case '12-14': return "What factors most heavily influence the development of regional food traditions and traditional knowledge?";
        case '15-17': return "Which factors provide the most accurate historical context for the diversity of regional food traditions?";
        case '18+': return "The immense regional variance in South Asian food traditions and ethnobotanical knowledge is primarily a function of what factors?";
        default: return "What influences food traditions?";
      }
    },
    options: [
      { id: 'rules', label: 'A single ancient king wrote a menu for everyone', icon: '👑', isCorrect: false },
      { id: 'geography', label: 'Geography, local agriculture, climate, and historical trade networks', icon: '🌾', isCorrect: true },
      { id: 'random', label: 'Pure coincidence', icon: '🎲', isCorrect: false }
    ],
    explanation: "Food traditions are deeply tied to local geography, climate, and agriculture, but they also constantly evolve through cultural exchange and historical trade."
  },
  preserve_puzzle: {
    id: "culture-preserve-01",
    title: "Preserve & Pass It On",
    getQuestion: (ageGroup) => {
      switch (ageGroup) {
        case '6-8': return "If you want to save a beautiful traditional dance, what is the best way to make sure it survives?";
        case '9-11': return "To truly preserve a cultural tradition, what is more important than just taking photos of it?";
        case '12-14': return "When preserving cultural heritage, why might simply locking an artifact in a museum be insufficient?";
        case '15-17': return "Cultural preservation is a complex strategy. Which approach ensures a tradition remains a 'living' practice?";
        case '18+': return "In heritage management, relying solely on archival documentation (digitization/museums) risks what outcome for intangible cultural heritage?";
        default: return "How do we best preserve traditions?";
      }
    },
    options: [
      { id: 'lock', label: 'Lock everything in a museum and forbid anyone from touching it', icon: '🔒', isCorrect: false },
      { id: 'living', label: 'Support community practice, teaching, documentation, and sustainable adaptation', icon: '🙌', isCorrect: true },
      { id: 'forget', label: 'Ignore it entirely', icon: '🙈', isCorrect: false }
    ],
    explanation: "Preservation isn't about freezing a culture in the past. Real sustainability requires documenting history while actively supporting the communities that practice and teach the living traditions."
  }
};
