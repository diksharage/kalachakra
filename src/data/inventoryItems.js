export const inventoryItems = [
  // LEVEL 1: Early Human Communities
  {
    id: 'wood',
    name: 'Timber & Branches',
    description: 'Sturdy branches and timber gathered from ancient forests for shelter and fire.',
    category: 'resources',
    icon: '🪵',
    rarity: 'common',
    isHistorical: false,
    level: 1,
    source: 'Foraged from forest locations & settlement expeditions',
    purpose: 'Used to construct shelters, hearths, and structures in the Builder'
  },
  {
    id: 'stone',
    name: 'River Quartzite & Stone',
    description: 'Hard river cobbles and quarried blocks essential for tools and masonry.',
    category: 'resources',
    icon: '🪨',
    rarity: 'common',
    isHistorical: false,
    level: 1,
    source: 'Gathered from riverbeds, rocky outcrops, and quarries',
    purpose: 'Knapped into tools and used for stone architecture'
  },
  {
    id: 'plants',
    name: 'Foraged Wild Plants',
    description: 'Edible roots, berries, and fibrous reeds gathered by early foraging bands.',
    category: 'resources',
    icon: '🌿',
    rarity: 'common',
    isHistorical: false,
    level: 1,
    source: 'Foraged from forest and riverbank habitats in Level 1',
    purpose: 'Provides early community sustenance and thatch for shelters'
  },
  {
    id: 'tools',
    name: 'Knapped Stone Tools',
    description: 'Flaked stone scrapers and microliths crafted for cutting and woodworking.',
    category: 'artifacts',
    icon: '🛠️',
    rarity: 'uncommon',
    isHistorical: true,
    level: 1,
    source: 'Crafted at rocky outcrops in Level 1',
    purpose: 'Improves foraging efficiency and shelter construction'
  },
  {
    id: 'hand_axe',
    name: 'Paleolithic Hand Axe',
    description: 'Bifacially flaked Acheulean stone hand axe from early prehistoric sites like Bhimbetka and Attirampakkam.',
    category: 'artifacts',
    icon: '🪓',
    rarity: 'rare',
    isHistorical: true,
    level: 1,
    source: 'Excavated Paleolithic Rock Shelter (Level 1)',
    purpose: 'Digging roots, cutting wood, and processing resources'
  },
  {
    id: 'fire',
    name: 'Controlled Hearth Fire',
    description: 'Mastery of fire for warmth, protection against predators, cooking, and community gatherings.',
    category: 'knowledge',
    icon: '🔥',
    rarity: 'uncommon',
    isHistorical: true,
    level: 1,
    source: 'Discovered in Level 1: Early Human Communities',
    purpose: 'Sustains community warmth and enables cooked nutrition'
  },

  // LEVEL 2: Early Farming Communities
  {
    id: 'grain',
    name: 'Domesticated Wheat & Barley',
    description: 'Early cultivated cereal grains harvested from fertile alluvial river plains.',
    category: 'resources',
    icon: '🌾',
    rarity: 'common',
    isHistorical: false,
    level: 2,
    source: 'Harvested from Neolithic farms in Level 2',
    purpose: 'Sustains settled villages and fills storage granaries'
  },
  {
    id: 'food',
    name: 'Community Food Surplus',
    description: 'Stored agricultural harvest supporting growing village populations.',
    category: 'resources',
    icon: '🥣',
    rarity: 'common',
    isHistorical: false,
    level: 2,
    source: 'Produced by farms and foraging across levels',
    purpose: 'Supports population growth and settlement stability'
  },
  {
    id: 'water',
    name: 'Fresh River Water',
    description: 'Clean water drawn from perennial rivers, wells, and step-tanks.',
    category: 'resources',
    icon: '💧',
    rarity: 'common',
    isHistorical: false,
    level: 2,
    source: 'Drawn from rivers, wells, and reservoirs',
    purpose: 'Essential for crop irrigation, brickmaking, and civic life'
  },
  {
    id: 'early_pottery',
    name: 'Neolithic Storage Pottery',
    description: 'Hand-shaped and wheel-thrown terracotta vessels used to store grain and water safely.',
    category: 'artifacts',
    icon: '🏺',
    rarity: 'uncommon',
    isHistorical: true,
    level: 2,
    source: 'Discovered in Mehrgarh & Neolithic settlements (Level 2)',
    purpose: 'Protects harvested grain from moisture and pests'
  },

  // LEVEL 3: Indus Valley Civilization
  {
    id: 'harappan_bead',
    name: 'Etched Carnelian Beads',
    description: 'Heat-treated red carnelian beads drilled with fine stone micro-drills in Harappan workshops.',
    category: 'trade',
    icon: '📿',
    rarity: 'rare',
    isHistorical: true,
    level: 3,
    source: 'Chanhudaro & Lothal Artisan Workshops (Level 3)',
    purpose: 'High-value craft export across ancient trade networks'
  },
  {
    id: 'steatite_seal',
    name: 'Harappan Steatite Seal',
    description: 'Carved and fired soapstone seal bearing animal motifs and undeciphered Indus script signs.',
    category: 'artifacts',
    icon: '🔏',
    rarity: 'epic',
    isHistorical: true,
    level: 3,
    source: 'Mohenjo-daro & Harappa (Level 3 Investigation)',
    purpose: 'Stamped into wet clay tags to seal and authenticate trade bundles'
  },
  {
    id: 'standardized_weight',
    name: 'Cubical Chert Weight',
    description: 'Precision-cut cubical chert weight following the standardized Harappan binary-decimal system.',
    category: 'artifacts',
    icon: '⚖️',
    rarity: 'uncommon',
    isHistorical: true,
    level: 3,
    source: 'Harappan Civic Markets & Lothal (Level 3)',
    purpose: 'Ensured accurate and fair measurement of trade goods'
  },
  {
    id: 'great_bath',
    name: 'Great Bath Architectural Record',
    description: 'Watertight brick tank at Mohenjo-daro sealed with natural bitumen and gypsum mortar.',
    category: 'architecture',
    icon: '🏛️',
    rarity: 'rare',
    isHistorical: true,
    level: 3,
    source: 'Mohenjo-daro Citadel (Level 3)',
    purpose: 'Demonstrates advanced Harappan hydraulic engineering'
  },
  {
    id: 'harappa_city',
    name: 'Harappan Grid City Plan',
    description: 'Urban layout record showing cardinal-aligned streets and covered brick drainage.',
    category: 'architecture',
    icon: '🏙️',
    rarity: 'rare',
    isHistorical: true,
    level: 3,
    source: 'Harappa & Dholavira (Level 3)',
    purpose: 'Guides urban sanitation and civic planning'
  },
  {
    id: 'indus_script',
    name: 'Indus Script Sign Tablet',
    description: 'Inscribed sequence of pictographic Indus signs—an enduring mystery of world epigraphy.',
    category: 'knowledge',
    icon: '📝',
    rarity: 'epic',
    isHistorical: true,
    level: 3,
    source: 'Dholavira & Mohenjo-daro (Level 3)',
    purpose: 'Primary evidence of early South Asian record-keeping'
  },
  {
    id: 'brick',
    name: 'Standardized Baked Bricks',
    description: 'Kiln-fired bricks formed in the classical Harappan 1:2:4 ratio.',
    category: 'resources',
    icon: '🧱',
    rarity: 'common',
    isHistorical: false,
    level: 3,
    source: 'Fired in kilns during Level 3 & Builder tasks',
    purpose: 'Constructing houses, drains, baths, and docks'
  },
  {
    id: 'materials',
    name: 'Construction Materials',
    description: 'Dressed timber, clay mortar, and stone blocks prepared for civic works.',
    category: 'resources',
    icon: '📦',
    rarity: 'common',
    isHistorical: false,
    level: 3,
    source: 'Gathered across level stages and challenges',
    purpose: 'Used for settlement infrastructure'
  },
  {
    id: 'craftMaterials',
    name: 'Artisan Craft Materials',
    description: 'Raw carnelian nodules, shell, copper, and steatite for workshop production.',
    category: 'resources',
    icon: '🧶',
    rarity: 'uncommon',
    isHistorical: false,
    level: 3,
    source: 'Collected in Level 3 craft workshops',
    purpose: 'Crafting trade goods and ornaments'
  },
  {
    id: 'storage',
    name: 'Granary Storage Units',
    description: 'Ceramic jars and brick storage bins for keeping community reserves.',
    category: 'resources',
    icon: '🧺',
    rarity: 'common',
    isHistorical: false,
    level: 3,
    source: 'Earned in Level 2–5 settlement management',
    purpose: 'Securing surplus food and trade goods'
  },

  // LEVEL 4: Early Indian Trade Networks
  {
    id: 'textiles',
    name: 'Handwoven Cotton Textiles',
    description: 'Finely spun and dyed Indian cotton cloth prized across ancient Asian and Mediterranean ports.',
    category: 'trade',
    icon: '🧵',
    rarity: 'uncommon',
    isHistorical: true,
    level: 4,
    source: 'Weaver Guilds & Trade Quests (Level 4)',
    purpose: 'Exported along overland and maritime trade routes'
  },
  {
    id: 'spices',
    name: 'Malabar Pepper & Spices',
    description: 'Black pepper, cardamom, and cinnamon harvested from southern forests.',
    category: 'trade',
    icon: '🌿',
    rarity: 'rare',
    isHistorical: true,
    level: 4,
    source: 'Western Ghats & Maritime Ports (Level 4)',
    purpose: 'High-value maritime trade and culinary preservation'
  },
  {
    id: 'maritime_cargo',
    name: 'Sealed Maritime Cargo',
    description: 'Amphorae, timber, and bundled merchandise prepared at coastal dockyards like Lothal and Bharuch.',
    category: 'trade',
    icon: '🚢',
    rarity: 'uncommon',
    isHistorical: true,
    level: 4,
    source: 'Western Coast Ports (Level 4)',
    purpose: 'Facilitating Indian Ocean commerce'
  },
  {
    id: 'tradeGoods',
    name: 'Merchant Trade Goods',
    description: 'Assorted crafted wares exchanged between regional hubs.',
    category: 'trade',
    icon: '⚖️',
    rarity: 'common',
    isHistorical: false,
    level: 4,
    source: 'Earned in Trade & Empire levels',
    purpose: 'Expanding economic networks'
  },

  // LEVEL 5: Mahajanapadas & Early Kingdoms
  {
    id: 'punch_marked_coin',
    name: 'Silver Punch-Marked Karshapana',
    description: 'Early silver coin stamped with solar, hill, and animal symbols issued by Mahajanapada mints.',
    category: 'trade',
    icon: '🪙',
    rarity: 'rare',
    isHistorical: true,
    level: 5,
    source: 'Magadha & Kosala Royal Mints (Level 5)',
    purpose: 'Standardizing trade and state revenue'
  },
  {
    id: 'iron_tool',
    name: 'Smelted Iron Plow & Axes',
    description: 'High-strength iron implements that transformed agriculture in the Gangetic plains.',
    category: 'resources',
    icon: '⛏️',
    rarity: 'uncommon',
    isHistorical: true,
    level: 5,
    source: 'Iron Smelting Forges (Level 5)',
    purpose: 'Clearing forests, deep plowing, and fortifying cities'
  },

  // LEVEL 6: Mauryan Empire
  {
    id: 'ashokan_edict',
    name: 'Ashokan Edict Rubbing',
    description: 'Prakrit inscription in Brahmi script proclaiming Emperor Ashoka’s policy of Dhamma and compassion.',
    category: 'knowledge',
    icon: '📜',
    rarity: 'epic',
    isHistorical: true,
    level: 6,
    source: 'Mauryan Rock & Pillar Sites (Level 6 Investigation)',
    purpose: 'Communicating ethical governance and civic welfare'
  },
  {
    id: 'royal_decree',
    name: 'Mauryan Administrative Charter',
    description: 'Imperial dispatch from Pataliputra coordinating provincial highways, rest houses, and revenue.',
    category: 'knowledge',
    icon: '🏛️',
    rarity: 'rare',
    isHistorical: true,
    level: 6,
    source: 'Pataliputra Chancery (Level 6)',
    purpose: 'Managing provincial administration'
  },

  // LEVEL 7: Gupta Period & Knowledge
  {
    id: 'aryabhata',
    name: 'Treatise of Aryabhata',
    description: 'Astronomical and mathematical record explaining Earth’s axial rotation, place-value numerals, and trigonometry.',
    category: 'knowledge',
    icon: '🔭',
    rarity: 'epic',
    isHistorical: true,
    level: 7,
    source: 'Kusumapura & Ujjain Observatory (Level 7)',
    purpose: 'Advancing mathematics and planetary astronomy'
  },
  {
    id: 'gupta_manuscript',
    name: 'Nalanda Birch-Bark Manuscript',
    description: 'Scholarly manuscript preserving classical Sanskrit treatise on logic, medicine, and mathematics.',
    category: 'knowledge',
    icon: '📝',
    rarity: 'rare',
    isHistorical: true,
    level: 7,
    source: 'Nalanda Mahavihara (Level 7)',
    purpose: 'Preserving scientific and literary scholarship'
  },
  {
    id: 'astronomy_tool',
    name: 'Gnomon & Jyotisha Astrolabe',
    description: 'Precision observational instrument used to measure solar altitude, solstices, and eclipses.',
    category: 'artifacts',
    icon: '🧭',
    rarity: 'epic',
    isHistorical: true,
    level: 7,
    source: 'Ujjain Astronomical Center (Level 7)',
    purpose: 'Calculating calendars and celestial coordinates'
  },

  // LEVEL 8: Indian Architecture & Engineering
  {
    id: 'sanchi_stupa',
    name: 'Sanchi Torana Carving Study',
    description: 'Architectural study of the hemispherical Great Stupa and its narrative carved gateways.',
    category: 'architecture',
    icon: '🛕',
    rarity: 'rare',
    isHistorical: true,
    level: 8,
    source: 'Sanchi, Madhya Pradesh (Level 8)',
    purpose: 'Understanding early Buddhist stone architecture'
  },
  {
    id: 'ajanta_caves',
    name: 'Ajanta Rock-Cut Fresco Pigment',
    description: 'Natural mineral pigments and chisel study from the rock-cut Buddhist halls of Ajanta.',
    category: 'architecture',
    icon: '⛰️',
    rarity: 'epic',
    isHistorical: true,
    level: 8,
    source: 'Ajanta Gorge, Maharashtra (Level 8)',
    purpose: 'Illustrating monolithic excavation and mural art'
  },
  {
    id: 'carved_stone',
    name: 'Dressed Interlocking Stone Block',
    description: 'Mortise-and-tenon carved stone block shaped for mortarless temple construction.',
    category: 'architecture',
    icon: '🪨',
    rarity: 'uncommon',
    isHistorical: true,
    level: 8,
    source: 'Master Sculptor Quarries (Level 8)',
    purpose: 'Constructing rock-cut shrines, stepwells, and temples'
  },
  {
    id: 'architectural_plan',
    name: 'Shilpa Shastra Elevation Plan',
    description: 'Geometric mandala grid and elevation proportions used by master temple architects (Sthapatis).',
    category: 'knowledge',
    icon: '📐',
    rarity: 'rare',
    isHistorical: true,
    level: 8,
    source: 'Guild of Master Architects (Level 8)',
    purpose: 'Guiding structural harmony and stability'
  },

  // LEVEL 9: Indian Cultural Traditions
  {
    id: 'traditional_dance',
    name: 'Natyashastra Abhinaya Scroll',
    description: 'Codified treatise on classical dance postures (Karanas), hand gestures (Mudras), and aesthetic Rasas.',
    category: 'culture',
    icon: '💃',
    rarity: 'rare',
    isHistorical: true,
    level: 9,
    source: 'Classical Performing Arts Tradition (Level 9)',
    purpose: 'Transmitting storytelling through dance and drama'
  },
  {
    id: 'bronze_statue',
    name: 'Lost-Wax Bronze Sculpture',
    description: 'Panch-loha bronze figure cast using the traditional Madhuchista lost-wax process.',
    category: 'culture',
    icon: '🗽',
    rarity: 'rare',
    isHistorical: true,
    level: 9,
    source: 'Artisan Foundry Guilds (Level 9)',
    purpose: 'Artistic and devotional expression'
  },
  {
    id: 'folk_instrument',
    name: 'Carved Veena & Percussion Set',
    description: 'Handcrafted stringed and percussion instruments tuned to classical and folk ragas.',
    category: 'culture',
    icon: '🪕',
    rarity: 'uncommon',
    isHistorical: true,
    level: 9,
    source: 'Musical Instrument Artisans (Level 9)',
    purpose: 'Performing melodic ragas and rhythmic talas'
  },

  // LEVEL 10: Chola & Regional Civilizations
  {
    id: 'brihadisvara_temple',
    name: 'Brihadisvara Vimana Inscription',
    description: 'Architectural and epigraphic record from Rajaraja Chola’s monumental granite temple at Thanjavur.',
    category: 'architecture',
    icon: '🛕',
    rarity: 'epic',
    isHistorical: true,
    level: 10,
    source: 'Thanjavur, Kaveri Delta (Level 10)',
    purpose: 'Documenting Dravidian engineering and village governance'
  },
  {
    id: 'chola_bronze',
    name: 'Chola Bronze Nataraja',
    description: 'Masterpiece of Chola bronze casting depicting cosmic rhythm, creation, and balance.',
    category: 'artifacts',
    icon: '🕺',
    rarity: 'epic',
    isHistorical: true,
    level: 10,
    source: 'Chola Temple Bronzeworkers (Level 10)',
    purpose: 'Iconic cultural and sculptural heritage'
  },
  {
    id: 'naval_supplies',
    name: 'Maritime Expedition Outfitting',
    description: 'Coir rigging, teak planks, and navigational charts for ocean-going merchant fleets.',
    category: 'trade',
    icon: '⛵',
    rarity: 'uncommon',
    isHistorical: false,
    level: 10,
    source: 'Nagapattinam & Kaveripoompattinam Shipyards (Level 10)',
    purpose: 'Building shipyards and maritime trade networks'
  },

  // LEVEL 11: Vijayanagara & Medieval Heritage
  {
    id: 'hampi_bazaar',
    name: 'Hampi Virupaksha Market Charter',
    description: 'Record of the grand colonnaded bazaar street of Vijayanagara where global merchants gathered.',
    category: 'trade',
    icon: '🏪',
    rarity: 'rare',
    isHistorical: true,
    level: 11,
    source: 'Hampi, Tungabhadra Basin (Level 11)',
    purpose: 'Illustrating medieval urban commerce'
  },
  {
    id: 'stone_chariot',
    name: 'Hampi Stone Chariot Relief',
    description: 'Detailed granite study of the Garuda ratha shrine at the Vittala Temple complex.',
    category: 'architecture',
    icon: '🛞',
    rarity: 'epic',
    isHistorical: true,
    level: 11,
    source: 'Vittala Temple, Hampi (Level 11 Investigation)',
    purpose: 'Showcasing interlocking granite artistry'
  },
  {
    id: 'vijayanagara_coin',
    name: 'Vijayanagara Gold Varaha Coin',
    description: 'High-purity gold coin minted to power domestic and international trade in the Deccan.',
    category: 'trade',
    icon: '🪙',
    rarity: 'rare',
    isHistorical: true,
    level: 11,
    source: 'Hampi Imperial Mint (Level 11)',
    purpose: 'Constructing pillared bazaars and civic works'
  },
  {
    id: 'temple_carving',
    name: 'Resonant Granite Pillar Carving',
    description: 'Intricately sculpted granite block from the musical mandapas of Hampi.',
    category: 'architecture',
    icon: '🏛️',
    rarity: 'epic',
    isHistorical: true,
    level: 11,
    source: 'Hampi Architecture Investigation (Level 11)',
    purpose: 'Building acoustic mandapas and monuments'
  },

  // LEVEL 12: Stories, Literature & Folk Arts
  {
    id: 'jataka_tales',
    name: 'Panchatantra & Jataka Fable Folio',
    description: 'Illustrated narrative folio preserving ancient moral fables and storytelling traditions.',
    category: 'knowledge',
    icon: '📖',
    rarity: 'rare',
    isHistorical: true,
    level: 12,
    source: 'Literary & Oral Archives (Level 12)',
    purpose: 'Teaching ethics, diplomacy, and practical wisdom'
  },
  {
    id: 'shadow_puppetry',
    name: 'Tholu Bommalata Leather Puppet',
    description: 'Translucent perforated leather puppet painted with vegetable dyes for epic night performances.',
    category: 'culture',
    icon: '🎭',
    rarity: 'uncommon',
    isHistorical: true,
    level: 12,
    source: 'Regional Folk Theatre Guilds (Level 12)',
    purpose: 'Bringing epics to life through community theatre'
  },
  {
    id: 'palm_leaf_manuscript',
    name: 'Incised Palm-Leaf Manuscript (Tala-Patra)',
    description: 'Cured palm leaves inscribed with an iron stylus and treated with natural lampblack and oil.',
    category: 'knowledge',
    icon: '📜',
    rarity: 'rare',
    isHistorical: true,
    level: 12,
    source: 'Saraswati Bhandara Libraries (Level 12)',
    purpose: 'Preserving poetry, philosophy, and chronicles'
  },
  {
    id: 'folk_tale',
    name: 'Oral Storytelling Anthology',
    description: 'Living regional ballads, proverbs, and folk narratives passed down across generations.',
    category: 'culture',
    icon: '🗣️',
    rarity: 'uncommon',
    isHistorical: true,
    level: 12,
    source: 'Community Storytellers (Level 12)',
    purpose: 'Sustaining regional memory and values'
  },

  // LEVEL 13: Traditional Indian Games
  {
    id: 'pachisi_board',
    name: 'Embroidered Pachisi & Chaturanga Board',
    description: 'Cross-shaped cloth board and 8×8 Ashtapada grid with cowrie dice for strategic play.',
    category: 'games',
    icon: '🎲',
    rarity: 'rare',
    isHistorical: true,
    level: 13,
    source: 'Traditional Games Archive (Level 13)',
    purpose: 'Cultivating probability, foresight, and tactical reasoning'
  },
  {
    id: 'game_piece',
    name: 'Carved Ivory & Terracotta Game Pieces',
    description: 'Finely turned Chaturanga and Pachisi tokens representing infantry, cavalry, elephants, and chariots.',
    category: 'games',
    icon: '♟️',
    rarity: 'uncommon',
    isHistorical: true,
    level: 13,
    source: 'Artisan Game Makers (Level 13)',
    purpose: 'Playing traditional board and strategy games'
  },

  // LEVEL 14: Preserve the Legacy
  {
    id: 'digital_archives',
    name: '3D Heritage Scan & Digital Archive',
    description: 'High-resolution photogrammetry and epigraphic database safeguarding monuments and manuscripts.',
    category: 'preservation',
    icon: '💾',
    rarity: 'legendary',
    isHistorical: true,
    level: 14,
    source: 'Modern Heritage Conservation Lab (Level 14)',
    purpose: 'Protecting cultural heritage for future generations'
  },
  {
    id: 'heritage_archive',
    name: 'National Heritage Master Archive',
    description: 'Comprehensive curatorial record uniting archaeological, literary, and living cultural evidence.',
    category: 'preservation',
    icon: '🏛️',
    rarity: 'legendary',
    isHistorical: true,
    level: 14,
    source: 'Level 14: Preserve the Legacy',
    purpose: 'Permanent public education and conservation'
  },
  {
    id: 'preservation_record',
    name: 'Conservation & Restoration Dossier',
    description: 'Scientific documentation of stone, metal, and manuscript conservation protocols.',
    category: 'preservation',
    icon: '📑',
    rarity: 'epic',
    isHistorical: true,
    level: 14,
    source: 'Conservation Laboratories (Level 14)',
    purpose: 'Guiding authentic heritage restoration'
  }
];

export const inventoryCategories = [
  { id: 'artifacts', icon: '🏺', labelKey: 'inventory.cat.artifacts', label: 'Artifacts' },
  { id: 'resources', icon: '🌾', labelKey: 'inventory.cat.resources', label: 'Resources' },
  { id: 'trade', icon: '🚢', labelKey: 'inventory.cat.trade', label: 'Trade Goods' },
  { id: 'knowledge', icon: '📜', labelKey: 'inventory.cat.knowledge', label: 'Knowledge' },
  { id: 'culture', icon: '🎭', labelKey: 'inventory.cat.culture', label: 'Culture' },
  { id: 'architecture', icon: '🏛️', labelKey: 'inventory.cat.architecture', label: 'Architecture' },
  { id: 'games', icon: '🎲', labelKey: 'inventory.cat.games', label: 'Games' },
  { id: 'preservation', icon: '🔬', labelKey: 'inventory.cat.preservation', label: 'Preservation' }
];
