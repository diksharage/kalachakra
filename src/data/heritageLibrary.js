export const heritageLibrary = [
  // LEVEL 1
  {
    id: "hand_axe",
    category: "artifacts",
    level: 1,
    period: "Paleolithic",
    region: "Indian Subcontinent",
    icon: "🪨",
    certainty: "archaeological",
    image: null
  },
  {
    id: "fire",
    category: "knowledge",
    level: 1,
    period: "Paleolithic",
    region: "Global/Subcontinent",
    icon: "🔥",
    certainty: "archaeological"
  },
  
  // LEVEL 2
  {
    id: "early_pottery",
    category: "artifacts",
    level: 2,
    period: "Neolithic",
    region: "Various early settlements",
    icon: "🏺",
    certainty: "archaeological"
  },
  
  // LEVEL 3
  {
    id: "harappan_bead",
    category: "artifacts",
    level: 3,
    period: "Mature Harappan",
    region: "Indus Valley",
    icon: "📿",
    certainty: "archaeological"
  },
  {
    id: "steatite_seal",
    category: "artifacts",
    level: 3,
    period: "Mature Harappan",
    region: "Indus Valley",
    icon: "🏷️",
    certainty: "interpretation"
  },
  {
    id: "great_bath",
    category: "architecture",
    level: 3,
    period: "Mature Harappan",
    region: "Mohenjo-daro",
    icon: "🧱",
    certainty: "interpretation"
  },
  {
    id: "indus_script",
    category: "knowledge",
    level: 3,
    period: "Mature Harappan",
    region: "Indus Valley",
    icon: "📝",
    certainty: "uncertain"
  },
  {
    id: "standardized_weight",
    category: "artifacts",
    level: 3,
    period: "Mature Harappan",
    region: "Indus Valley",
    icon: "⚖️",
    certainty: "archaeological"
  },
  {
    id: "harappa_city",
    category: "places",
    level: 3,
    period: "Mature Harappan",
    region: "Punjab",
    icon: "🏙️",
    certainty: "archaeological"
  },

  // LEVEL 4
  {
    id: "textiles",
    category: "crafts",
    level: 4,
    period: "Ancient",
    region: "Subcontinent",
    icon: "🧵",
    certainty: "documented"
  },
  {
    id: "maritime_cargo",
    category: "places",
    level: 4,
    period: "Ancient",
    region: "Coastal India",
    icon: "⚓",
    certainty: "archaeological"
  },

  // LEVEL 5
  {
    id: "punch_marked_coin",
    category: "artifacts",
    level: 5,
    period: "Mahajanapada",
    region: "Northern & Central India",
    icon: "🪙",
    certainty: "archaeological"
  },

  // LEVEL 6
  {
    id: "ashokan_edict",
    category: "knowledge",
    level: 6,
    period: "Mauryan",
    region: "Pan-Indian Subcontinent",
    icon: "🏛️",
    certainty: "well_supported"
  },

  // LEVEL 7
  {
    id: "aryabhata",
    category: "people",
    level: 7,
    period: "Gupta Period",
    region: "Pataliputra",
    icon: "🔭",
    certainty: "documented"
  },
  {
    id: "gupta_manuscript",
    category: "stories",
    level: 7,
    period: "Gupta Period",
    region: "Various",
    icon: "📜",
    certainty: "documented"
  },

  // LEVEL 8
  {
    id: "sanchi_stupa",
    category: "architecture",
    level: 8,
    period: "Mauryan to Gupta",
    region: "Madhya Pradesh",
    icon: "🛕",
    certainty: "well_supported"
  },
  {
    id: "ajanta_caves",
    category: "architecture",
    level: 8,
    period: "Vakataka",
    region: "Maharashtra",
    icon: "⛰️",
    certainty: "well_supported"
  },

  // LEVEL 9
  {
    id: "traditional_dance",
    category: "culture",
    level: 9,
    period: "Various",
    region: "Pan-Indian",
    icon: "💃",
    certainty: "traditional"
  },
  {
    id: "bronze_statue",
    category: "artifacts",
    level: 9,
    period: "Various",
    region: "Various",
    icon: "🗽",
    certainty: "archaeological"
  },

  // LEVEL 10
  {
    id: "brihadisvara_temple",
    category: "architecture",
    level: 10,
    period: "Chola",
    region: "Thanjavur",
    icon: "🛕",
    certainty: "well_supported"
  },
  {
    id: "chola_bronze",
    category: "artifacts",
    level: 10,
    period: "Chola",
    region: "South India",
    icon: "🗿",
    certainty: "well_supported"
  },

  // LEVEL 11
  {
    id: "hampi_bazaar",
    category: "places",
    level: 11,
    period: "Vijayanagara",
    region: "Karnataka",
    icon: "🏪",
    certainty: "archaeological"
  },
  {
    id: "stone_chariot",
    category: "architecture",
    level: 11,
    period: "Vijayanagara",
    region: "Hampi",
    icon: "🛞",
    certainty: "well_supported"
  },

  // LEVEL 12
  {
    id: "jataka_tales",
    category: "stories",
    level: 12,
    period: "Ancient",
    region: "Subcontinent",
    icon: "📖",
    certainty: "traditional"
  },
  {
    id: "shadow_puppetry",
    category: "culture",
    level: 12,
    period: "Various",
    region: "Various",
    icon: "🎭",
    certainty: "traditional"
  },

  // LEVEL 13
  {
    id: "pachisi_board",
    category: "games",
    level: 13,
    period: "Medieval",
    region: "Subcontinent",
    icon: "🎲",
    certainty: "documented"
  },

  // LEVEL 14
  {
    id: "digital_archives",
    category: "preservation",
    level: 14,
    period: "Modern",
    region: "Global",
    icon: "💾",
    certainty: "well_supported"
  }
];

export const libraryCategories = [
  { id: 'artifacts', icon: '🏺', labelKey: 'library.cat.artifacts' },
  { id: 'places', icon: '📍', labelKey: 'library.cat.places' },
  { id: 'people', icon: '👤', labelKey: 'library.cat.people' },
  { id: 'architecture', icon: '🏛️', labelKey: 'library.cat.architecture' },
  { id: 'stories', icon: '📜', labelKey: 'library.cat.stories' },
  { id: 'culture', icon: '🎭', labelKey: 'library.cat.culture' },
  { id: 'knowledge', icon: '💡', labelKey: 'library.cat.knowledge' },
  { id: 'games', icon: '🎲', labelKey: 'library.cat.games' },
  { id: 'crafts', icon: '🧵', labelKey: 'library.cat.crafts' },
  { id: 'preservation', icon: '💾', labelKey: 'library.cat.preservation' }
];

export const certaintyLevels = [
  { id: 'well_supported', labelKey: 'library.cert.well_supported', color: 'text-emerald-500' },
  { id: 'documented', labelKey: 'library.cert.documented', color: 'text-blue-500' },
  { id: 'archaeological', labelKey: 'library.cert.archaeological', color: 'text-amber-600' },
  { id: 'interpretation', labelKey: 'library.cert.interpretation', color: 'text-purple-500' },
  { id: 'traditional', labelKey: 'library.cert.traditional', color: 'text-orange-500' },
  { id: 'uncertain', labelKey: 'library.cert.uncertain', color: 'text-red-500' }
];
