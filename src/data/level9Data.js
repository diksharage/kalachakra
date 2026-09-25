export const level9ExploreLocations = [
  {
    id: 'exp_north',
    label: 'Northern Traditions',
    icon: '🏔️',
    description: 'Examples of regional diversity.',
    discoverMessage: 'Cultural traditions cross modern political boundaries. You may find specific textiles, festivals, and music styles here that adapt to local environments.',
    yields: {}
  },
  {
    id: 'exp_south',
    label: 'Southern Traditions',
    icon: '🌴',
    description: 'Examples of regional diversity.',
    discoverMessage: 'From classical dance forms to unique harvest festivals and temple arts, southern regions showcase incredible continuity and adaptation.',
    yields: {}
  },
  {
    id: 'exp_east_ne',
    label: 'Eastern & NE Traditions',
    icon: '🌅',
    description: 'Examples of regional diversity.',
    discoverMessage: 'Discover rich weaving traditions, unique seasonal community festivals, and diverse oral histories preserved through generations.',
    yields: {}
  },
  {
    id: 'exp_west_central',
    label: 'Western & Central Traditions',
    icon: '🏜️',
    description: 'Examples of regional diversity.',
    discoverMessage: 'Explore vibrant folk dances, specialized craft communities, and food traditions heavily influenced by geography and trade.',
    yields: {}
  }
];

export const level9FestivalLocations = [
  {
    id: 'fest_harvest',
    label: 'Harvest Festivals',
    icon: '🌾',
    description: 'E.g., Pongal, Bihu, Onam.',
    discoverMessage: 'Festivals often tie into agricultural cycles, but are celebrated differently by various communities, adapting over time.',
    yields: { community: 2, creative: 1 }
  },
  {
    id: 'fest_light_color',
    label: 'Seasonal Celebrations',
    icon: '🪔',
    description: 'E.g., Diwali, Holi, Navratri.',
    discoverMessage: 'These festivals have multiple historical interpretations, regional variations, and evolving community practices.',
    yields: { community: 2, creative: 1 }
  }
];

export const level9MusicLocations = [
  {
    id: 'music_rhythm',
    label: 'Rhythm & Percussion',
    icon: '🥁',
    description: 'Tabla, Mridangam, Dhol.',
    discoverMessage: 'Rhythm (tala) is passed down through rigorous oral teaching traditions (parampara) and adapts to different regional styles.',
    yields: { practice: 2, knowledge: 1 }
  },
  {
    id: 'music_melody',
    label: 'Melody & Instruments',
    icon: '🪈',
    description: 'Flute, Veena, Shehnai.',
    discoverMessage: 'Melodic structures (raga) evoke different moods, seasons, and times of day, preserved through practice and teaching.',
    yields: { practice: 1, creative: 2 }
  }
];

export const level9DanceLocations = [
  {
    id: 'dance_classical',
    label: 'Classical Forms',
    icon: '🩰',
    description: 'Bharatanatyam, Kathak, Odissi, etc.',
    discoverMessage: 'Dance is a form of storytelling using precise gestures (mudras) and rhythm, combining physical expression with narrative.',
    yields: { practice: 2, creative: 1 }
  },
  {
    id: 'dance_folk',
    label: 'Folk Traditions',
    icon: '💃',
    description: 'Community expression.',
    discoverMessage: 'Folk dances are deeply tied to community celebrations, seasons, and local history, often encouraging group participation.',
    yields: { community: 2, practice: 1 }
  }
];

export const level9CraftLocations = [
  {
    id: 'craft_textile',
    label: 'Textiles & Weaving',
    icon: '🧵',
    description: 'Bandhani, Kalamkari, Handloom.',
    discoverMessage: 'Crafts require immense traditional knowledge of materials, dyes, and techniques, passed down through artisan communities.',
    yields: { creative: 2, knowledge: 1 }
  },
  {
    id: 'craft_visual',
    label: 'Painting & Pottery',
    icon: '🏺',
    description: 'Madhubani, Warli, Regional clays.',
    discoverMessage: 'Visual arts often preserve community stories and relationships with nature. Modern practice continues to adapt to new contexts.',
    yields: { creative: 2, community: 1 }
  }
];

export const level9KnowledgeLocations = [
  {
    id: 'know_food',
    label: 'Food Traditions',
    icon: '🍛',
    description: 'Spices, grains, preservation.',
    discoverMessage: 'Food traditions are heavily influenced by geography, climate, and historical trade. They are not static and evolve constantly.',
    yields: { community: 1, knowledge: 1 }
  },
  {
    id: 'know_yoga',
    label: 'Yoga & Wellness',
    icon: '🧘',
    description: 'Philosophical and physical practices.',
    discoverMessage: 'Yoga has multiple historical textual and philosophical traditions. Modern practices encompass many different adapted forms.',
    yields: { practice: 2, knowledge: 1 }
  },
  {
    id: 'know_oral',
    label: 'Oral Knowledge',
    icon: '🗣️',
    description: 'Teaching without texts.',
    discoverMessage: 'Much traditional knowledge (farming, navigation, stories) is preserved through oral transmission and apprenticeship.',
    yields: { community: 1, knowledge: 2 }
  }
];

export const level9PreserveLocations = [
  {
    id: 'preserve_center',
    label: 'Tradition Keeper',
    icon: '🏛️',
    description: 'Your preservation project.',
    discoverMessage: 'Preservation is not about freezing a culture in the past. It involves supporting living communities, teaching, documenting, and allowing adaptation.',
    yields: { documentation: 2, practice: 2 }
  }
];
