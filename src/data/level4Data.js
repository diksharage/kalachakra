export const level4GoodsLocations = [
  {
    id: 'good_beads',
    label: 'Stone Beads',
    icon: '📿',
    description: 'Carefully drilled stone beads.',
    discoverMessage: 'What we found: Beads made of semi-precious stones.\nWhat it may tell us: They were highly valued and traded over long distances.\nWhere the evidence comes from: Archaeological excavations across multiple regions.',
    yields: { cargo: 1, tradeGoods: 2 }
  },
  {
    id: 'good_metals',
    label: 'Copper Ore',
    icon: '⛏️',
    description: 'Raw copper chunks.',
    discoverMessage: 'What we found: Unprocessed copper.\nWhat it may tell us: Raw materials were moved from mining regions to craft centers.\nWhere the evidence comes from: Metallurgical analysis matching artifacts to distant mines.',
    yields: { cargo: 2, materials: 1 }
  },
  {
    id: 'good_pottery',
    label: 'Distinctive Pottery',
    icon: '🏺',
    description: 'Ceramics with unique painted designs.',
    discoverMessage: 'What we found: Pottery styles from one region found in another.\nWhat it may tell us: Goods (or the ideas to make them) moved between communities.\nWhere the evidence comes from: Ceramic sherds analyzed by archaeologists.',
    yields: { cargo: 1 }
  },
  {
    id: 'good_food',
    label: 'Agricultural Surplus',
    icon: '🌾',
    description: 'Grain or preserved food.',
    discoverMessage: 'What we found: Evidence of non-local grains.\nWhat it may tell us: Food products were likely exchanged, though they often do not survive in the archaeological record.\nWhere the evidence comes from: Charred seeds and botanical remains.',
    yields: { cargo: 1, food: 2 }
  }
];

export const level4RouteLocations = [
  {
    id: 'route_land',
    label: 'Overland Route',
    icon: '🐪',
    description: 'A path through plains and passes.',
    discoverMessage: 'Land routes were essential but required significant resources (food, pack animals) to cross difficult terrain.',
    yields: { }
  },
  {
    id: 'route_river',
    label: 'River System',
    icon: '🌊',
    description: 'A major navigable waterway.',
    discoverMessage: 'Rivers like the Indus and Ganga systems provided natural highways for moving heavy or bulk goods more easily than by land.',
    yields: { water: 1 }
  },
  {
    id: 'route_coast',
    label: 'Coastal Settlement',
    icon: '⛵',
    description: 'A community by the sea.',
    discoverMessage: 'Coastal communities could use maritime routes to connect distant regions. Lothal is often discussed in connection with maritime exchange.',
    yields: { }
  },
  {
    id: 'route_hub',
    label: 'Exchange Hub',
    icon: '⛺',
    description: 'A central gathering place.',
    discoverMessage: 'Certain settlements grew at the intersections of trade routes, becoming centers where goods from different regions were exchanged.',
    yields: { capacity: 1 }
  }
];

export const level4EvidenceLocations = [
  {
    id: 'evidence_material',
    label: 'Distant Material',
    icon: '🪨',
    description: 'A material found far from its source.',
    discoverMessage: 'What we know: A specific stone is found 500 miles from its geological origin.\nWhat it suggests: It indicates movement or exchange.\nWhat remains uncertain: The exact route and whether it was traded directly or passed through intermediaries.',
    yields: {}
  },
  {
    id: 'evidence_style',
    label: 'Shared Artistic Motifs',
    icon: '🎨',
    description: 'Similar designs in different places.',
    discoverMessage: 'What we know: Two distant regions share similar pottery decorations.\nWhat it suggests: Ideas and cultural traditions were exchanged along with physical goods.\nWhat remains uncertain: Whether this represents trade, migration, or shared heritage.',
    yields: {}
  },
  {
    id: 'evidence_technology',
    label: 'Craft Technique',
    icon: '🛠️',
    description: 'A specialized way of making something.',
    discoverMessage: 'What we know: A complex bead-drilling method appears in multiple settlements.\nWhat it suggests: Skilled artisans may have traveled, or knowledge was shared through trade networks.\nWhat remains uncertain: Exactly who controlled the production.',
    yields: {}
  }
];
