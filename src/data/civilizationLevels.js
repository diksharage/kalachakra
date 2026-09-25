export const civilizationLevels = [
  {
    id: 1,
    title: "Early Human Communities",
    icon: "🌱",
    historicalPeriod: "Pre-History to c. 7000 BCE",
    focus: ["Shelters", "Tools", "Fire", "Community"],
    description: "Explore how early communities lived, found food, made tools and adapted to their environment.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `This is the beginning of your journey! Explore how people lived in the time of Early Human Communities. You will find food, make simple tools, and see how they built their homes.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The Early Human Communities era represents complex societal shifts. Evaluate archaeological evidence of settlement patterns, resource management, and early technological innovation.`;
      return `Welcome to the Early Human Communities era. Explore how communities lived, found resources, developed tools, and adapted to their environment.`;
    }
  },
  {
    id: 2,
    title: "Early Farming Communities",
    icon: "🌾",
    historicalPeriod: "c. 7000 BCE - 3300 BCE",
    focus: ["Agriculture", "Villages", "Domestication", "Pottery"],
    description: "Discover the transition from hunting and gathering to settled agriculture in places like Mehrgarh.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Explore how communities started growing plants and keeping animals in villages!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The transition to settled agriculture represents a major shift in human history. Analyze evidence of plant domestication, storage, and early sedentary life.`;
      return `Discover how communities gradually developed settled ways of living, agriculture, and animal domestication.`;
    }
  },
  {
    id: 3,
    title: "Indus Valley Civilization",
    icon: "🏛️",
    historicalPeriod: "c. 2600 BCE - 1900 BCE (Mature Harappan Phase)",
    focus: ["City Building", "Water & Drainage", "Trade", "Artifacts"],
    description: "Explore the cities, people, trade and engineering of the Harappan world.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Explore huge ancient cities with brick houses, wells, and busy workshops!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Across parts of South Asia, large settlements developed with planned streets, carefully managed water, skilled craftspeople and long-distance exchange. Discover how archaeologists reconstruct the past from material evidence.`;
      return `Across parts of South Asia, large settlements developed with planned streets, carefully managed water, and skilled craftspeople. Your mission: build and manage an Indus-inspired city!`;
    }
  },
  {
    id: 4,
    title: "Early Indian Trade Networks",
    icon: "🧭",
    historicalPeriod: "c. 1500 BCE - 600 BCE",
    focus: ["Trade Routes", "Materials", "Cultural Exchange"],
    description: "Follow the movement of goods, people, and ideas across early trade routes.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Goods do not stay in one place! Stone, beads, and food were moved between communities. Follow the routes and discover how things traveled.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Archaeological and historical evidence shows that communities in South Asia participated in complex networks of exchange. Analyze evidence of land, river, and maritime routes.`;
      return `Goods do not stay in one place. Stone, beads, metals, and other materials moved between communities. Manage resources and discover how exchange connected different regions.`;
    }
  },
  {
    id: 5,
    title: "Mahajanapadas & Early Kingdoms",
    icon: "⚔️",
    historicalPeriod: "c. 600 BCE - 300 BCE",
    focus: ["State Formation", "Iron Age", "Urbanization"],
    description: "Witness the rise of sixteen great realms and the second urbanization of India.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `As villages grew into big cities, leaders helped organize them. Build your own community and keep it safe!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `By the middle of the first millennium BCE, several large territorial political communities had emerged in northern parts of South Asia. Evaluate evidence of kingdoms, republics, agriculture, and urbanization.`;
      return `As settlements grew, larger political communities developed. Build and manage a growing community while balancing resources, defense, and diplomacy.`;
    }
  },
  {
    id: 6,
    title: "Mauryan Empire",
    icon: "🦁",
    historicalPeriod: "c. 4th–2nd centuries BCE",
    focus: ["Administration", "Edicts", "Imperial Expansion"],
    description: "Learn about the vast Mauryan administration and the spread of Ashoka's Dhamma.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `A huge empire needs roads to travel and messages to share! Learn how ancient rulers communicated across vast distances.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The Mauryan Empire became one of the largest political formations in ancient South Asia. Manage an expanding empire while learning how roads, resources, administration and inscriptions connected different regions.`;
      return `Large territories require systems for communication, resources and infrastructure. Enter the Mauryan world and manage a growing empire.`;
    }
  },
  {
    id: 7,
    title: "Gupta Period & Knowledge",
    icon: "📚",
    historicalPeriod: "c. 4th–6th centuries CE",
    focus: ["Mathematics", "Astronomy", "Literature", "Metallurgy"],
    description: "Explore mathematics, astronomy, literature, science and knowledge traditions in the Gupta-period world.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Numbers, stars, and stories travel across generations! Discover how ancient scholars counted, watched the sky, and wrote great tales.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The Gupta period is associated with important developments in literature, mathematics, astronomy, art and learning. Explore how historical knowledge is reconstructed from surviving evidence.`;
      return `Numbers, stars, stories and ideas travel across generations. Enter a world of learning and discover how people recorded, calculated, and shared knowledge.`;
    }
  },
  {
    id: 8,
    title: "Indian Architecture & Engineering",
    icon: "🛕",
    historicalPeriod: "Various Periods",
    focus: ["Temples", "Water Systems", "Caves", "Forts"],
    description: "Discover temples, caves, water systems, engineering ideas and the many architectural traditions of South Asia.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Explore how ancient builders made giant caves, tall temples, and deep wells using stone, brick, and amazing ideas!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Indian architectural traditions developed over millennia across diverse regions. Examine construction materials, structural engineering, rock-cut techniques, and water management systems.`;
      return `Discover how ancient engineers and builders planned incredible structures, carved caves from solid rock, and managed water for their communities.`;
    }
  },

  {
    id: 9,
    title: "Indian Cultural Traditions",
    icon: "🧘",
    historicalPeriod: "Continuous",
    focus: ["Festivals", "Arts", "Music", "Yoga"],
    description: "Explore how traditions are created, practiced, transmitted, adapted and preserved.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Music, dance, food, and festivals! Discover how people celebrate and share their beautiful traditions with each other.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Cultural traditions are not frozen in time. Explore the diversity, continuity, change, and preservation of South Asian practices, arts, and knowledge systems.`;
      return `Explore how diverse cultural traditions—from music and dance to food and crafts—are practiced, adapted, and passed down through generations.`;
    }
  },
  {
    id: 10,
    title: "Chola & Regional Civilizations",
    icon: "🐘",
    historicalPeriod: "c. 9th–13th centuries CE",
    focus: ["Administration", "Maritime Trade", "Temples", "Bronze Art"],
    description: "Explore the Chola period and wider regional civilizations of South Asia.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Discover a world of giant temples, amazing bronze statues, and grand ships that sailed across the ocean!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The medieval Chola period saw immense developments in agrarian expansion, local governance, monumental architecture, and Indian Ocean trade. Explore these regional dynamics.`;
      return `Explore the powerful Chola state, their incredible temples and bronzes, and how they traded with lands far across the sea.`;
    }
  },
  {
    id: 11,
    title: "Vijayanagara & Medieval Heritage",
    icon: "🏰",
    historicalPeriod: "c. 14th–16th centuries CE",
    focus: ["Urban Planning", "Markets", "Water Systems", "Architecture"],
    description: "Explore the Vijayanagara world and selected medieval South Asian heritage.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Step into a massive ruined city filled with giant stone temples, elephant stables, and busy historical markets!`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The Vijayanagara Empire was one of multiple powerful medieval states. Explore its immense capital at Hampi, analyzing its complex urban planning, water management, and multilingual court culture.`;
      return `Explore the magnificent city of Vijayanagara. Discover how medieval architects built incredible temples, markets, and water systems in a rocky landscape.`;
    }
  },
  {
    id: 12,
    title: "Stories, Literature & Folk Arts",
    icon: "📜",
    historicalPeriod: "Continuous",
    focus: ["Epics", "Fables", "Oral Traditions", "Crafts"],
    description: "Explore how people preserve and communicate knowledge, history, and imagination.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Become a Story Keeper! Discover how magical tales, funny fables, and grand epics were shared through songs, puppets, and paintings.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Indian storytelling traditions are extremely diverse. Differentiate between historical events and literary traditions, exploring oral transmission, multilingual literature, manuscripts, and folk performances.`;
      return `Explore the rich diversity of stories, poems, and performances. See how tales changed over time and how they are preserved today.`;
    }
  },
  {
    id: 13,
    title: "Traditional Indian Games",
    icon: "♟️",
    historicalPeriod: "Continuous",
    focus: ["Strategy", "Community", "Mathematics", "Physical Skill"],
    description: "Explore traditional games, understanding how they reflect strategy, mathematics, and community.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `Let's play! Discover traditional board games, dice games, and fun physical games like Kabaddi that children have played for centuries.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `Analyze the development of early strategic traditions like Chaturanga, the mathematics of chance in Pachisi, and the socio-cultural function of regional play.`;
      return `Explore how traditional games teach strategy, mathematics, and physical skill while bringing communities together.`;
    }
  },
  {
    id: 14,
    title: "Preserve the Legacy",
    icon: "🇮🇳",
    historicalPeriod: "Present",
    focus: ["Documentation", "Conservation", "Digital Archive", "Community"],
    description: "The final capstone. Connect everything you've learned to build a Heritage Legacy Project.",
    getIntroText: (ageGroup) => {
      if (ageGroup === '6-8') return `You have traveled through all of history! Now it's time to build a digital museum and save all the amazing stories, games, and buildings you found.`;
      if (ageGroup === '15-17' || ageGroup === '18+') return `The capstone project. Synthesize the civilization journey by managing preservation tradeoffs, navigating historical uncertainty, and designing a digital heritage archive.`;
      return `Your final challenge! Create a heritage project to preserve the arts, architecture, and stories you discovered for future generations.`;
    }
  }
];
