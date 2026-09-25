export const level11ExploreLocations = [
  {
    id: 'exp_hampi',
    label: 'Vijayanagara (Hampi)',
    icon: '🏰',
    description: 'The City of Victory.',
    discoverMessage: 'A massive medieval urban center built along the Tungabhadra River, featuring distinct royal, sacred, and urban zones.',
    yields: {}
  },
  {
    id: 'exp_tungabhadra',
    label: 'Tungabhadra River',
    icon: '🌊',
    description: 'The lifeblood of the city.',
    discoverMessage: 'The rocky, semi-arid landscape required brilliant hydrological engineering to support a massive population.',
    yields: {}
  },
  {
    id: 'exp_sultanates',
    label: 'Deccan Sultanates',
    icon: '🗺️',
    description: 'Northern neighbors.',
    discoverMessage: 'Medieval South Asia contained multiple powers. Vijayanagara had complex diplomatic, military, and cultural interactions with the Bahmani and later Deccan Sultanates.',
    yields: {}
  },
  {
    id: 'exp_coasts',
    label: 'Coastal Trade Ports',
    icon: '⛵',
    description: 'Indian Ocean links.',
    discoverMessage: 'Coastal communities connected the inland empire to global trade networks spanning from Europe and the Middle East to China.',
    yields: {}
  }
];

export const level11CityLocations = [
  {
    id: 'city_sacred',
    label: 'Sacred Center',
    icon: '🛕',
    description: 'Temples and pilgrims.',
    discoverMessage: 'Located mostly near the river, this area contains massive temple complexes like Virupaksha, which developed over centuries.',
    yields: { culture: 2, knowledge: 1 }
  },
  {
    id: 'city_royal',
    label: 'Royal Center',
    icon: '👑',
    description: 'Palaces and administration.',
    discoverMessage: 'Contained palaces, administrative buildings, and platforms like the Mahanavami Dibba used for state ceremonies.',
    yields: { culture: 1, community: 2 }
  },
  {
    id: 'city_fort',
    label: 'Fortifications',
    icon: '🧱',
    description: 'Massive stone walls.',
    discoverMessage: 'The city was protected by extensive concentric fortification walls that enclosed agricultural land as well as urban areas.',
    yields: { builder: 2, space: 1 }
  }
];

export const level11WaterLocations = [
  {
    id: 'water_aqueduct',
    label: 'Stone Aqueducts',
    icon: '🌉',
    description: 'Moving water.',
    discoverMessage: 'Engineers carved channels into solid rock and built stone aqueducts to move water from the river to the Royal Center.',
    yields: { water: 2, builder: 1 }
  },
  {
    id: 'water_pushkarani',
    label: 'Pushkarani (Stepwell)',
    icon: '🪜',
    description: 'Sacred and civic water storage.',
    discoverMessage: 'Beautifully geometric stepped tanks provided essential water storage and served ritual functions.',
    yields: { water: 1, culture: 2 }
  },
  {
    id: 'water_agri',
    label: 'Agricultural Tanks',
    icon: '🌾',
    description: 'Farming infrastructure.',
    discoverMessage: 'Extensive networks of earthen and stone dams created reservoirs to support intensive agriculture inside and outside the city walls.',
    yields: { food: 3, water: 1 }
  }
];

export const level11MarketLocations = [
  {
    id: 'market_bazaar',
    label: 'Temple Bazaars',
    icon: '⚖️',
    description: 'Grand market streets.',
    discoverMessage: 'Wide, colonnaded streets in front of major temples served as bustling markets for textiles, spices, and precious stones.',
    yields: { trade: 2, community: 1 }
  },
  {
    id: 'market_horse',
    label: 'Horse Trade',
    icon: '🐎',
    description: 'Military imports.',
    discoverMessage: 'Warhorses were a crucial, high-value import from the Arabian Peninsula, essential for the empire\'s military strength.',
    yields: { trade: 3, output: -1 }
  }
];

export const level11ArtLocations = [
  {
    id: 'art_virupaksha',
    label: 'Virupaksha Temple',
    icon: '🛕',
    description: 'Continuous patronage.',
    discoverMessage: 'This site existed long before the empire was founded and was continuously expanded by various rulers, showing architectural evolution.',
    yields: { culture: 2, practice: 1 }
  },
  {
    id: 'art_vittala',
    label: 'Vittala Temple & Chariot',
    icon: '🗿',
    description: 'Peak architectural expression.',
    discoverMessage: 'Famous for its musical pillars and the iconic stone chariot, representing a pinnacle of Vijayanagara architectural patronage.',
    yields: { culture: 3, builder: 1 }
  }
];

export const level11CultureLocations = [
  {
    id: 'culture_lit',
    label: 'Multilingual Court',
    icon: '📜',
    description: 'Telugu, Kannada, Sanskrit, Tamil.',
    discoverMessage: 'The court of rulers like Krishnadevaraya patronized a vibrant, multilingual literary culture, reflecting the diversity of the empire.',
    yields: { knowledge: 3, culture: 1 }
  },
  {
    id: 'culture_perform',
    label: 'Performing Arts',
    icon: '🎭',
    description: 'Dance and music.',
    discoverMessage: 'Temples and royal courts were major centers for music and dance, preserving and evolving classical performing arts.',
    yields: { practice: 2, community: 1 }
  }
];

export const level11PreserveLocations = [
  {
    id: 'preserve_hampi',
    label: 'Heritage Site Management',
    icon: '🏛️',
    description: 'Your preservation project.',
    discoverMessage: 'Today, Hampi is a UNESCO World Heritage site. Preserving it requires balancing structural protection, visitor access, and understanding its complex, multi-layered history.',
    yields: { culture: 2, documentation: 2 }
  }
];
