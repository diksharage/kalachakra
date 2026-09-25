export const level6MapLocations = [
  {
    id: 'maurya_pataliputra',
    label: 'Pataliputra',
    icon: '🏛️',
    description: 'Imperial capital.',
    discoverMessage: 'An important Mauryan political center associated with the imperial capital. Map boundaries are approximate and simplified for gameplay.',
    yields: {}
  },
  {
    id: 'maurya_taxila',
    label: 'Taxila',
    icon: '🗺️',
    description: 'Northwest urban center.',
    discoverMessage: 'An important ancient urban and cultural center in the northwest, facilitating exchange and administration.',
    yields: {}
  },
  {
    id: 'maurya_ujjain',
    label: 'Ujjain',
    icon: '📍',
    description: 'Central regional center.',
    discoverMessage: 'A major city that served as a crucial administrative and commercial hub connecting different regions.',
    yields: {}
  },
  {
    id: 'maurya_sanchi',
    label: 'Sanchi',
    icon: '🛕',
    description: 'Important Buddhist site.',
    discoverMessage: 'An important Buddhist site with major monuments developed over time; note that not every surviving structure was built directly by Ashoka.',
    yields: {}
  },
  {
    id: 'maurya_sarnath',
    label: 'Sarnath',
    icon: '🦁',
    description: 'Site of early teachings.',
    discoverMessage: 'A key religious site where a famous Mauryan pillar (the Lion Capital) was erected, symbolizing imperial authority and dhamma.',
    yields: {}
  },
  {
    id: 'maurya_lumbini',
    label: 'Lumbini',
    icon: '✨',
    description: 'Birthplace of the Buddha.',
    discoverMessage: 'Ashoka visited this site and left an inscription commemorating his visit and granting a tax reduction to the village.',
    yields: {}
  }
];

export const level6AdminLocations = [
  {
    id: 'admin_center',
    label: 'Administrative Center',
    icon: '🏛️',
    description: 'Regional governance.',
    discoverMessage: 'Gameplay abstraction inspired by evidence of regional governance. Historians debate the exact structure and reach of Mauryan administration.',
    yields: { infrastructure: 2, communication: 1 }
  },
  {
    id: 'road_hub',
    label: 'Road Hub',
    icon: '🛣️',
    description: 'Connects the empire.',
    discoverMessage: 'Ancient empires needed ways to communicate across large territories. Better roads facilitated trade and imperial messaging.',
    yields: { infrastructure: 1, communication: 2, materials: -1 }
  },
  {
    id: 'agri_center',
    label: 'Agricultural Base',
    icon: '🌾',
    description: 'Generates food surplus.',
    discoverMessage: 'Agriculture formed the economic base. Revenue could come through different mechanisms, but exact taxation systems varied.',
    yields: { food: 2, revenue: 1 }
  },
  {
    id: 'trade_hub',
    label: 'Trade Hub',
    icon: '🚚',
    description: 'Exchange and commerce.',
    discoverMessage: 'Trade networks connected regions, but different areas had different resources and economic roles.',
    yields: { tradeGoods: 2, revenue: 1 }
  },
  {
    id: 'ruler_chandragupta',
    label: 'Chandragupta Maurya',
    icon: '👑',
    description: 'Late 4th century BCE.',
    discoverMessage: 'Associated with the foundation of the Mauryan Empire.',
    yields: {}
  },
  {
    id: 'ruler_bindusara',
    label: 'Bindusara',
    icon: '👑',
    description: 'Successor to Chandragupta.',
    discoverMessage: 'Associated with the expansion and consolidation of the empire.',
    yields: {}
  }
];

export const level6InscriptionLocations = [
  {
    id: 'insc_rock',
    label: 'Major Rock Edict',
    icon: '🪨',
    description: 'Public messaging.',
    discoverMessage: 'Evidence: Rock surfaces inscribed with Ashoka\'s messages.\nWhat it conveys: Instructions on ethical conduct and social welfare.\nWhat it tells historians: Information was communicated to subjects across regions.',
    yields: { communication: 2 }
  },
  {
    id: 'insc_pillar',
    label: 'Pillar Edict',
    icon: '🏛️',
    description: 'Monumental messaging.',
    discoverMessage: 'Evidence: Highly polished sandstone pillars with inscriptions.\nWhat it conveys: Royal authority and principles of dhamma.\nWhat remains uncertain: Exactly who read them and how they were received locally.',
    yields: { communication: 2 }
  },
  {
    id: 'evid_kalinga',
    label: 'Kalinga Evidence',
    icon: '📜',
    description: 'Records of conflict and change.',
    discoverMessage: 'Evidence: Rock Edict XIII.\nWhat it says: Ashoka expresses deep remorse for the suffering caused by the Kalinga campaign.\nWhat it tells historians: Provides evidence for a policy shift toward non-violence and ethical governance.',
    yields: { communication: 1 }
  },
  {
    id: 'ruler_ashoka',
    label: 'Ashoka',
    icon: '🦁',
    description: '3rd century BCE ruler.',
    discoverMessage: 'Known especially through inscriptions discussing dhamma, ethical conduct, and concern for living beings. His dhamma was presented as a broad ethical program, not simply identical to Buddhism.',
    yields: {}
  }
];
