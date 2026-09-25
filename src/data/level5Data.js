export const level5Mahajanapadas = [
  {
    id: 'maha_magadha',
    label: 'Magadha',
    icon: '👑',
    description: 'Eastern Ganges plain.',
    discoverMessage: 'Ancient sources describe Magadha as a powerful kingdom that expanded significantly during this period. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  },
  {
    id: 'maha_kosala',
    label: 'Kosala',
    icon: '🏛️',
    description: 'Kingdom with important settlements.',
    discoverMessage: 'Kosala was a major kingdom whose important settlements included Sravasti. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  },
  {
    id: 'maha_vajji',
    label: 'Vajji',
    icon: '🤝',
    description: 'A confederacy of clans.',
    discoverMessage: 'Not all Mahajanapadas were monarchies. Ancient sources associate Vajji with a confederacy of clans (gana-sangha). Map boundaries are approximate.',
    yields: {}
  },
  {
    id: 'maha_avanti',
    label: 'Avanti',
    icon: '🛡️',
    description: 'Kingdom in central India.',
    discoverMessage: 'Avanti was an important kingdom with its capital at Ujjain. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  },
  {
    id: 'maha_vatsa',
    label: 'Vatsa',
    icon: '🏰',
    description: 'Kingdom along the Yamuna.',
    discoverMessage: 'Vatsa was known as a powerful kingdom with its capital at Kausambi. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  },
  {
    id: 'maha_gandhara',
    label: 'Gandhara',
    icon: '🗺️',
    description: 'Northwest region.',
    discoverMessage: 'Gandhara was known for its trade connections and exchange. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  }
];

export const level5SettlementLocations = [
  {
    id: 'bld_farm',
    label: 'Farming Area',
    icon: '🌾',
    description: 'Extensive agricultural lands.',
    discoverMessage: 'Game settlement model inspired by archaeological and historical evidence. Agriculture was an important foundation for many early states.',
    yields: { food: 2, population: 1 }
  },
  {
    id: 'bld_house',
    label: 'Urban Housing',
    icon: '🏠',
    description: 'Growing settlement population.',
    discoverMessage: 'Game settlement model inspired by archaeological evidence. Urbanization increased rapidly during this period.',
    yields: { population: 2, storage: 1 }
  },
  {
    id: 'bld_market',
    label: 'Exchange Market',
    icon: '🏪',
    description: 'Area for trade and revenue.',
    discoverMessage: 'Game settlement model. Trade networks expanded, allowing states to obtain resources from agricultural surplus and market activity.',
    yields: { revenue: 1, tradeGoods: 2 }
  },
  {
    id: 'bld_wall',
    label: 'Defensive Wall',
    icon: '🧱',
    description: 'Fortification structures.',
    discoverMessage: 'Game settlement model. Archaeological evidence shows many early historic cities were surrounded by massive fortifications.',
    yields: { defense: 2, materials: 1 }
  }
];

export const level5DiplomacyLocations = [
  {
    id: 'dip_neighbor',
    label: 'Neighboring State',
    icon: '⛺',
    description: 'A nearby political community.',
    discoverMessage: 'Diplomacy and relationships with nearby political communities were essential for security and exchange.',
    yields: {}
  },
  {
    id: 'evid_coins',
    label: 'Punch-Marked Coins',
    icon: '🪙',
    description: 'Early historical currency.',
    discoverMessage: 'Punch-marked coins are among the earliest forms of coinage associated with early historic South Asia. (Note: Game currency is a separate gameplay mechanic).',
    yields: { currency: 1, revenue: 1 }
  },
  {
    id: 'evid_text',
    label: 'Literary Sources',
    icon: '📜',
    description: 'Ancient textual evidence.',
    discoverMessage: 'Historians combine written sources with archaeology to reconstruct the past, though texts must be interpreted carefully in their historical context.',
    yields: {}
  }
];
