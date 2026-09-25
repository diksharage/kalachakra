export const level10ExploreLocations = [
  {
    id: 'exp_kaveri',
    label: 'Kaveri Delta',
    icon: '🌊',
    description: 'Agrarian heartland.',
    discoverMessage: 'The fertile Kaveri river delta was the agricultural and political center of the Chola state.',
    yields: {}
  },
  {
    id: 'exp_thanjavur',
    label: 'Thanjavur',
    icon: '🏛️',
    description: 'Chola Capital (Rajaraja I).',
    discoverMessage: 'A major political and ceremonial center, home to the monumental Brihadisvara Temple.',
    yields: {}
  },
  {
    id: 'exp_nagapattinam',
    label: 'Nagapattinam',
    icon: '⛵',
    description: 'Major coastal port.',
    discoverMessage: 'A crucial node for Indian Ocean trade and diplomacy, connecting to Southeast Asia and China.',
    yields: {}
  },
  {
    id: 'exp_neighbors',
    label: 'Regional Powers',
    icon: '🐘',
    description: 'Chalukyas, Pandyas, Cheras.',
    discoverMessage: 'The Cholas were one of several powerful states. Regional diversity in politics, art, and architecture thrived concurrently across South Asia.',
    yields: {}
  }
];

export const level10AgriLocations = [
  {
    id: 'agri_river',
    label: 'River Source',
    icon: '🌊',
    description: 'Water supply.',
    discoverMessage: 'A reliable water source is the foundation of intensive agriculture.',
    yields: { water: 2, food: 1 }
  },
  {
    id: 'agri_farmland',
    label: 'Cultivated Land',
    icon: '🌾',
    description: 'Paddy fields.',
    discoverMessage: 'Extensive land grants and agrarian expansion fueled the medieval economy.',
    yields: { food: 3, output: 1 }
  },
  {
    id: 'agri_settlement',
    label: 'Agrarian Settlement',
    icon: '🛖',
    description: 'Farming communities.',
    discoverMessage: 'Villages (ur) managed local agricultural output and taxation.',
    yields: { community: 2, food: -1 }
  }
];

export const level10WaterLocations = [
  {
    id: 'water_tank',
    label: 'Village Tank (Eri)',
    icon: '💧',
    description: 'Water storage.',
    discoverMessage: 'Large irrigation tanks captured monsoon rains to support year-round agriculture.',
    yields: { water: 3, storage: 2 }
  },
  {
    id: 'water_channel',
    label: 'Irrigation Channels',
    icon: '〰️',
    description: 'Water distribution.',
    discoverMessage: 'Distributing water required complex local administration and maintenance by village assemblies.',
    yields: { water: 2, community: 1 }
  }
];

export const level10ArtLocations = [
  {
    id: 'art_temple',
    label: 'Brihadisvara Temple',
    icon: '🛕',
    description: 'Monumental architecture.',
    discoverMessage: 'A massive architectural and ideological statement, serving as a center for administration, arts, and economy.',
    yields: { culture: 3, builder: -1 }
  },
  {
    id: 'art_bronze',
    label: 'Bronze Workshop',
    icon: '🔥',
    description: 'Lost-wax casting.',
    discoverMessage: 'Chola-period artisans perfected the lost-wax casting technique (cire perdue) to create exquisite metal sculptures.',
    yields: { culture: 2, creative: 2 }
  }
];

export const level10PortLocations = [
  {
    id: 'port_monsoon',
    label: 'Monsoon Winds',
    icon: '🌬️',
    description: 'Seasonal navigation.',
    discoverMessage: 'Knowledge of seasonal monsoon winds was essential for scheduling maritime voyages across the Indian Ocean.',
    yields: { knowledge: 2, trade: 1 }
  },
  {
    id: 'port_ship',
    label: 'Merchant Ship',
    icon: '⛵',
    description: 'Maritime transport.',
    discoverMessage: 'Ships carried not only trade goods, but also diplomats, monks, and cultural ideas between South and Southeast Asia.',
    yields: { trade: 3, culture: 1 }
  }
];

export const level10TradeLocations = [
  {
    id: 'trade_guild',
    label: 'Merchant Guild',
    icon: '⚖️',
    description: 'Trade organization.',
    discoverMessage: 'Powerful merchant associations organized long-distance trade, logistics, and sometimes even possessed their own armed escorts.',
    yields: { trade: 2, community: 2 }
  },
  {
    id: 'trade_goods',
    label: 'Textiles & Spices',
    icon: '📦',
    description: 'High-value exports.',
    discoverMessage: 'South Asian textiles, spices, and metal goods were highly demanded in international maritime networks.',
    yields: { output: 2, trade: 2 }
  }
];

export const level10GovernLocations = [
  {
    id: 'gov_assembly',
    label: 'Village Assembly (Sabha)',
    icon: '📜',
    description: 'Local administration.',
    discoverMessage: 'Inscriptions provide evidence of local assemblies managing water, disputes, and temple endowments.',
    yields: { community: 3, culture: 1 }
  },
  {
    id: 'gov_royal',
    label: 'Royal Center',
    icon: '👑',
    description: 'Chola Administration.',
    discoverMessage: 'The imperial center coordinated large-scale military, diplomatic, and monumental architectural projects.',
    yields: { builder: 2, culture: 2 }
  }
];
