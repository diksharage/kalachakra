export const level2Locations = [
  {
    id: 'open_land',
    label: 'Open Land',
    icon: '🌾',
    description: 'Flat, fertile ground near water.',
    discoverMessage: 'Fertile land was carefully selected by early communities for planting seeds, marking the slow beginning of agriculture.',
    yields: { materials: 1 }
  },
  {
    id: 'water_source',
    label: 'River / Spring',
    icon: '💧',
    description: 'A constant supply of fresh water.',
    discoverMessage: 'Access to water remained essential for drinking, but now it was also required to support crops and domesticated animals.',
    yields: { water: 2 }
  },
  {
    id: 'wild_animals',
    label: 'Wild Herds',
    icon: '🐐',
    description: 'Animals grazing in the distance.',
    discoverMessage: 'Over time, humans formed closer relationships with certain animal species, leading to domestication for resources and labor.',
    yields: { food: 1 }
  },
  {
    id: 'clay_bank',
    label: 'Clay Bank',
    icon: '🏺',
    description: 'Soft mud near the river.',
    discoverMessage: 'Clay could be shaped and baked into pottery. Pottery was revolutionary for storing food, carrying water, and cooking.',
    yields: { materials: 2 }
  },
  {
    id: 'settlement_area',
    label: 'Village Site',
    icon: '🏠',
    description: 'A gathering of early permanent shelters.',
    discoverMessage: 'Farming required people to stay in one place to tend crops, leading to the first permanent villages and settled community life.',
    yields: {}
  }
];
