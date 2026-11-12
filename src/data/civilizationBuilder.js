export const civilizationBuilderData = {
  1: {
    levelId: 1,
    eraTitle: 'Early Human Communities',
    eraSubtitle: 'Paleolithic & Mesolithic Rock Shelters',
    gridSize: 4,
    waterTiles: [3, 7, 11, 15],
    availableBuildings: [
      {
        id: 'basic_shelter',
        nameKey: 'builder.b.generic_shelter.name',
        descKey: 'builder.b.generic_shelter.desc',
        name: 'Simple Prehistoric Shelter',
        description: 'A sturdy lean-to frame of hardwood branches anchored with river stones and insulated with woven plant thatch against wind and monsoon rain.',
        consequence: 'Shields the band from rain, cold winds, and predators, creating a dry base camp for storing tools and gathered food.',
        icon: '⛺',
        terrain: 'land',
        requirements: { wood: 2, stone: 2, plants: 2 },
        effects: { community: 15, culture: 10, legacy: 20 }
      },
      {
        id: 'fire_pit',
        nameKey: 'builder.b.fire',
        descKey: 'builder.b.fire_desc',
        name: 'Communal Fire Hearth',
        description: 'A stone-ringed hearth fueled by seasoned hardwood and ignited with flint sparks for cooking, warmth, and night security.',
        consequence: 'Detoxifies and softens tough wild tubers, keeps predators away at night, and brings the community together around shared stories.',
        icon: '🔥',
        terrain: 'land',
        requirements: { wood: 2, stone: 1, flint: 1 },
        effects: { food: 15, community: 10, knowledge: 10 }
      },
      {
        id: 'tool_workshop',
        nameKey: 'builder.b.tools',
        descKey: 'builder.b.tools_desc',
        name: 'Stone Tool Knapping Area',
        description: 'Dedicated riverside stone-working spot for shaping quartzite hand axes, flint scrapers, and microlithic blades.',
        consequence: 'Equips the community with sharp cutting, scraping, and digging tools that double foraging and building efficiency.',
        icon: '🪨',
        terrain: 'land',
        requirements: { stone: 2, flint: 1 },
        effects: { knowledge: 15, food: 10, community: 5 }
      }
    ]
  },

  2: {
    levelId: 2,
    eraTitle: 'Early Farming Communities',
    eraSubtitle: 'Neolithic Villages & Domestication',
    gridSize: 4,
    waterTiles: [2, 6, 10, 14],
    availableBuildings: [
      {
        id: 'crop_field',
        nameKey: 'builder.b.crop_field',
        descKey: 'builder.b.crop_field_desc',
        name: 'Cultivated Wheat & Barley Field',
        description: 'Irrigated alluvial plot for growing early domesticated grains.',
        icon: '🌾',
        terrain: 'land',
        requirements: { water: 1, grain: 1 },
        effects: { food: 20, community: 10 }
      },
      {
        id: 'mud_brick_hut',
        nameKey: 'builder.b.mud_hut',
        descKey: 'builder.b.mud_hut_desc',
        name: 'Mud-Brick Dwelling',
        description: 'Permanent rectangular mud-brick house inspired by early Mehrgarh settlements.',
        icon: '🛖',
        terrain: 'land',
        requirements: { wood: 1, stone: 1 },
        effects: { community: 15, culture: 5 }
      },
      {
        id: 'granary_pit',
        nameKey: 'builder.b.granary',
        descKey: 'builder.b.granary_desc',
        name: 'Clay-Lined Storage Granary',
        description: 'Compartmented mud-brick storage structure to protect surplus grain between harvests.',
        icon: '🏺',
        terrain: 'land',
        requirements: { grain: 1, stone: 1 },
        effects: { food: 15, knowledge: 10 }
      }
    ]
  },

  3: {
    levelId: 3,
    eraTitle: 'Indus Valley Civilization',
    eraSubtitle: 'Planned Harappan Urban Grid',
    gridSize: 4,
    waterTiles: [0, 4, 8, 12],
    availableBuildings: [
      {
        id: 'mud_brick_house',
        nameKey: 'builder.b.brick_house',
        descKey: 'builder.b.brick_house_desc',
        name: 'Courtyard Brick Residence',
        description: 'Multi-room house built with standardized 1:2:4 ratio baked bricks and a private bathing platform.',
        icon: '🧱',
        terrain: 'land',
        requirements: { brick: 2, water: 1 },
        effects: { community: 20, culture: 10 },
        choices: [
          {
            id: 'house_standard',
            label: 'Standard Courtyard House',
            desc: 'Single-story brick home around a central open courtyard.',
            requirements: { brick: 2 },
            effects: { community: 15 }
          },
          {
            id: 'house_two_story',
            label: 'Merchant Two-Story Residence',
            desc: 'Includes a private well and connected street drain.',
            requirements: { brick: 3, water: 1 },
            effects: { community: 25, trade: 10 }
          }
        ]
      },
      {
        id: 'drain_channel',
        nameKey: 'builder.b.drain',
        descKey: 'builder.b.drain_desc',
        name: 'Covered Brick Drain Channel',
        description: 'Corbelled underground street drainage line with inspection covers for municipal sanitation.',
        icon: '💧',
        terrain: 'land',
        requirements: { brick: 1, water: 1 },
        effects: { community: 15, knowledge: 15 },
        choices: [
          {
            id: 'drain_covered',
            label: 'Covered Street Drain',
            desc: 'Brick-lined channel sealed with removable stone slabs.',
            requirements: { brick: 1, water: 1 },
            effects: { community: 20, knowledge: 10 }
          }
        ]
      },
      {
        id: 'bead_workshop',
        nameKey: 'builder.b.workshop',
        descKey: 'builder.b.workshop_desc',
        name: 'Carnelian Bead & Seal Workshop',
        description: 'Artisan workshop using micro-drills and kilns to craft carnelian beads and steatite seals.',
        icon: '📿',
        terrain: 'land',
        requirements: { stone: 1, brick: 1 },
        effects: { trade: 25, culture: 10 },
        choices: [
          {
            id: 'workshop_beads',
            label: 'Carnelian Lapidary Studio',
            desc: 'Heat-treat and drill stone beads for long-distance exchange.',
            requirements: { stone: 1, brick: 1 },
            effects: { trade: 25, culture: 10 }
          }
        ]
      },
      {
        id: 'public_bath',
        nameKey: 'builder.b.bath',
        descKey: 'builder.b.bath_desc',
        name: 'Great Public Bath Tank',
        description: 'Watertight brick tank sealed with natural bitumen mortar and surrounded by colonnades.',
        icon: '🏛️',
        terrain: 'land',
        requirements: { brick: 3, water: 2 },
        effects: { culture: 30, community: 20 },
        choices: [
          {
            id: 'bath_great',
            label: 'Watertight Civic Bath',
            desc: 'Line the basin with finely fitted bricks and gypsum plaster.',
            requirements: { brick: 3, water: 2 },
            effects: { culture: 30, community: 20 }
          }
        ]
      }
    ]
  },

  4: {
    levelId: 4,
    eraTitle: 'Early Indian Trade Networks',
    eraSubtitle: 'Coastal Ports & Caravan Hubs',
    gridSize: 4,
    waterTiles: [0, 1, 4, 5, 8, 12],
    availableBuildings: [
      {
        id: 'trade_dock',
        nameKey: 'builder.b.trade_dock',
        descKey: 'builder.b.trade_dock_desc',
        name: 'Tidal Maritime Dockyard',
        description: 'Brick-lined tidal basin inspired by Lothal for berthing cargo vessels safely.',
        icon: '⚓',
        terrain: 'water',
        requirements: { wood: 2, brick: 1 },
        effects: { trade: 30, knowledge: 10 }
      },
      {
        id: 'caravanserai',
        nameKey: 'builder.b.caravanserai',
        descKey: 'builder.b.caravanserai_desc',
        name: 'Overland Merchant Rest House',
        description: 'Secure roadside courtyard along the Uttarapatha and Dakshinapatha trade highways.',
        icon: '🐪',
        terrain: 'land',
        requirements: { wood: 1, stone: 1 },
        effects: { trade: 20, community: 15 }
      },
      {
        id: 'warehouse_guild',
        nameKey: 'builder.b.warehouse',
        descKey: 'builder.b.warehouse_desc',
        name: 'Shreni Merchant Guild Warehouse',
        description: 'Elevated storehouse where textiles, spices, and sealed cargo are weighed and registered.',
        icon: '📦',
        terrain: 'land',
        requirements: { brick: 1, textiles: 1 },
        effects: { trade: 25, culture: 10 }
      }
    ]
  },

  5: {
    levelId: 5,
    eraTitle: 'Mahajanapadas & Early Kingdoms',
    eraSubtitle: 'Fortified Capitals & Republics',
    gridSize: 4,
    waterTiles: [3, 7, 11, 15],
    availableBuildings: [
      {
        id: 'fortification_wall',
        nameKey: 'builder.b.fort_wall',
        descKey: 'builder.b.fort_wall_desc',
        name: 'Cyclopean Stone Rampart',
        description: 'Massive stone and earthen fortification wall modeled on early Rajagriha defenses.',
        icon: '🏰',
        terrain: 'land',
        requirements: { stone: 2, iron_tool: 1 },
        effects: { community: 25, knowledge: 10 }
      },
      {
        id: 'iron_smithy',
        nameKey: 'builder.b.iron_smithy',
        descKey: 'builder.b.iron_smithy_desc',
        name: 'Iron Smelting Forge',
        description: 'Produces iron plowshares and tools that enabled clearing dense Gangetic forests.',
        icon: '⚒️',
        terrain: 'land',
        requirements: { wood: 1, stone: 1 },
        effects: { food: 20, trade: 15 }
      },
      {
        id: 'assembly_hall',
        nameKey: 'builder.b.assembly_hall',
        descKey: 'builder.b.assembly_hall_desc',
        name: 'Santhagara Assembly Hall',
        description: 'Deliberative council pavilion where representatives debated civic laws and policy.',
        icon: '🏛️',
        terrain: 'land',
        requirements: { wood: 2, punch_marked_coin: 1 },
        effects: { culture: 25, community: 20 }
      }
    ]
  },

  6: {
    levelId: 6,
    eraTitle: 'Mauryan Empire',
    eraSubtitle: 'Imperial Highways & Dhamma Edicts',
    gridSize: 4,
    waterTiles: [12, 13, 14, 15],
    availableBuildings: [
      {
        id: 'royal_highway',
        nameKey: 'builder.b.highway',
        descKey: 'builder.b.highway_desc',
        name: 'Royal Mauryan Highway',
        description: 'Tree-lined imperial road with distance markers connecting Pataliputra to Taxila.',
        icon: '🛣️',
        terrain: 'land',
        requirements: { stone: 2, wood: 1 },
        effects: { trade: 25, community: 15 },
        choices: [
          {
            id: 'highway_paved',
            label: 'Construct Imperial Highway Segment',
            desc: 'Grade the roadbed and erect distance pillars every kos.',
            requirements: { stone: 2, wood: 1 },
            effects: { trade: 25, community: 15 }
          }
        ]
      },
      {
        id: 'rest_house',
        nameKey: 'builder.b.rest_house',
        descKey: 'builder.b.rest_house_desc',
        name: 'Shaded Rest House & Well',
        description: 'Public Banyan-shaded rest stop and step-well built for travelers and animals.',
        icon: '🏡',
        terrain: 'land',
        requirements: { wood: 2, water: 1 },
        effects: { community: 25, culture: 10 },
        choices: [
          {
            id: 'rest_house_well',
            label: 'Traveler Rest Stop & Well',
            desc: 'Provide fresh water and medicinal herbs along the highway.',
            requirements: { wood: 2, water: 1 },
            effects: { community: 25, culture: 10 }
          }
        ]
      },
      {
        id: 'edict_pillar',
        nameKey: 'builder.b.pillar',
        descKey: 'builder.b.pillar_desc',
        name: 'Polished Ashokan Edict Pillar',
        description: 'Monolithic Chunar sandstone column inscribed with Prakrit edicts of Dhamma.',
        icon: '🦁',
        terrain: 'land',
        requirements: { stone: 2, ashokan_edict: 1 },
        effects: { culture: 30, knowledge: 20 },
        choices: [
          {
            id: 'pillar_lion',
            label: 'Erect Sandstone Edict Pillar',
            desc: 'Inscribe moral principles of compassion and civic welfare.',
            requirements: { stone: 2 },
            effects: { culture: 30, knowledge: 20 }
          }
        ]
      }
    ]
  },

  7: {
    levelId: 7,
    eraTitle: 'Gupta Period & Knowledge',
    eraSubtitle: 'Universities, Astronomy & Metallurgy',
    gridSize: 4,
    waterTiles: [3, 7, 11, 15],
    availableBuildings: [
      {
        id: 'observatory',
        nameKey: 'builder.b.observatory',
        descKey: 'builder.b.observatory_desc',
        name: 'Astronomical Observatory (Jyotisha)',
        description: 'Equipped with gnomons and water clocks to track solstices, eclipses, and planetary motion.',
        icon: '🔭',
        terrain: 'land',
        requirements: { stone: 2, astronomy_tool: 1 },
        effects: { knowledge: 35, culture: 15 }
      },
      {
        id: 'university_vihara',
        nameKey: 'builder.b.vihara',
        descKey: 'builder.b.vihara_desc',
        name: 'Mahavihara Lecture Courtyard',
        description: 'Residential monastic college and manuscript library inspired by Nalanda.',
        icon: '📚',
        terrain: 'land',
        requirements: { brick: 2, gupta_manuscript: 1 },
        effects: { knowledge: 40, community: 15 }
      },
      {
        id: 'metallurgy_foundry',
        nameKey: 'builder.b.foundry',
        descKey: 'builder.b.foundry_desc',
        name: 'Wrought-Iron Pillar Foundry',
        description: 'Advanced forge producing rust-resistant phosphorus-rich ironwork.',
        icon: '🔥',
        terrain: 'land',
        requirements: { stone: 1, wood: 2 },
        effects: { knowledge: 25, trade: 15 }
      }
    ]
  },

  8: {
    levelId: 8,
    eraTitle: 'Indian Architecture & Engineering',
    eraSubtitle: 'Rock-Cut Caves, Stupas & Stepwells',
    gridSize: 4,
    waterTiles: [5, 6, 9, 10],
    availableBuildings: [
      {
        id: 'rock_cut_shrine',
        nameKey: 'builder.b.rock_shrine',
        descKey: 'builder.b.rock_shrine_desc',
        name: 'Rock-Cut Chaitya & Mural Hall',
        description: 'Excavated cliff-side hall adorned with natural mineral frescoes and monolithic pillars.',
        icon: '⛰️',
        terrain: 'land',
        requirements: { carved_stone: 1, stone: 2 },
        effects: { culture: 35, knowledge: 20 }
      },
      {
        id: 'stepwell_baoli',
        nameKey: 'builder.b.stepwell',
        descKey: 'builder.b.stepwell_desc',
        name: 'Subterranean Stepwell (Rani ki Vav Style)',
        description: 'Multi-tiered stepped water reservoir providing year-round aquifer access and cool shelter.',
        icon: '🪜',
        terrain: 'water',
        requirements: { stone: 2, water: 1 },
        effects: { community: 30, culture: 20 }
      },
      {
        id: 'shikhara_temple',
        nameKey: 'builder.b.shikhara_temple',
        descKey: 'builder.b.shikhara_temple_desc',
        name: 'Curvilinear Shikhara Temple',
        description: 'Dry-masonry stone temple aligned to cardinal directions following Shilpa Shastra principles.',
        icon: '🛕',
        terrain: 'land',
        requirements: { carved_stone: 2, architectural_plan: 1 },
        effects: { culture: 40, community: 15 }
      }
    ]
  },

  9: {
    levelId: 9,
    eraTitle: 'Indian Cultural Traditions',
    eraSubtitle: 'Performing Arts, Textiles & Living Crafts',
    gridSize: 4,
    waterTiles: [3, 7, 11, 15],
    availableBuildings: [
      {
        id: 'natya_mandapa',
        nameKey: 'builder.b.natya_mandapa',
        descKey: 'builder.b.natya_mandapa_desc',
        name: 'Natya Mandapa Performance Hall',
        description: 'Acoustically designed pillared pavilion for classical dance, drama, and musical ragas.',
        icon: '💃',
        terrain: 'land',
        requirements: { wood: 2, folk_instrument: 1 },
        effects: { culture: 40, community: 20 }
      },
      {
        id: 'bronze_atelier',
        nameKey: 'builder.b.bronze_atelier',
        descKey: 'builder.b.bronze_atelier_desc',
        name: 'Madhuchista Lost-Wax Bronze Studio',
        description: 'Artisan foundry casting expressive bronze sculptures using beeswax and alluvial clay molds.',
        icon: '🗽',
        terrain: 'land',
        requirements: { wood: 1, stone: 2 },
        effects: { culture: 30, trade: 20 }
      },
      {
        id: 'weaver_loom_house',
        nameKey: 'builder.b.weaver_loom',
        descKey: 'builder.b.weaver_loom_desc',
        name: 'Handloom & Natural Dye Guild',
        description: 'Weaving cooperative producing indigo, madder, and turmeric-dyed cotton and silk textiles.',
        icon: '🧵',
        terrain: 'land',
        requirements: { wood: 1, water: 1 },
        effects: { trade: 25, culture: 20 }
      }
    ]
  },

  10: {
    levelId: 10,
    eraTitle: 'Chola & Regional Civilizations',
    eraSubtitle: 'Kaveri Delta Irrigation & Maritime Reach',
    gridSize: 4,
    waterTiles: [0, 4, 8, 12, 13],
    availableBuildings: [
      {
        id: 'royal_temple',
        nameKey: 'builder.b.royal_temple',
        descKey: 'builder.b.royal_temple_desc',
        name: 'Brihadisvara-Style Vimana Temple',
        description: 'Monumental all-granite temple serving as a spiritual, economic, and epigraphic record center.',
        icon: '🛕',
        terrain: 'land',
        requirements: { stone: 3, carved_stone: 1 },
        effects: { culture: 45, community: 25 }
      },
      {
        id: 'shipyard',
        nameKey: 'builder.b.shipyard',
        descKey: 'builder.b.shipyard_desc',
        name: 'Chola Maritime Shipyard',
        description: 'Coastal dockyard building stitched-plank merchant vessels for Bay of Bengal expeditions.',
        icon: '⛵',
        terrain: 'water',
        requirements: { wood: 2, naval_supplies: 1 },
        effects: { trade: 40, knowledge: 15 }
      },
      {
        id: 'eri_irrigation_tank',
        nameKey: 'builder.b.eri_tank',
        descKey: 'builder.b.eri_tank_desc',
        name: 'Kaveri Sluice-Gate Tank (Eri)',
        description: 'Stone-lined reservoir with Kumizhi Thoombu sluices managed by the village Tank Committee.',
        icon: '🌊',
        terrain: 'water',
        requirements: { stone: 2, water: 1 },
        effects: { food: 35, community: 20 }
      }
    ]
  },

  11: {
    levelId: 11,
    eraTitle: 'Vijayanagara & Medieval Heritage',
    eraSubtitle: 'Hampi Bazaars, Aqueducts & Mandapas',
    gridSize: 4,
    waterTiles: [0, 1, 2, 3],
    availableBuildings: [
      {
        id: 'bazaar_colonade',
        nameKey: 'builder.b.bazaar',
        descKey: 'builder.b.bazaar_desc',
        name: 'Hampi Pillared Market Street',
        description: 'Grand stone-paved boulevard where international merchants traded gems, textiles, and spices.',
        icon: '🏪',
        terrain: 'land',
        requirements: { stone: 2, vijayanagara_coin: 1 },
        effects: { trade: 40, community: 20 }
      },
      {
        id: 'aqueduct_channel',
        nameKey: 'builder.b.aqueduct',
        descKey: 'builder.b.aqueduct_desc',
        name: 'Tungabhadra Stone Aqueduct',
        description: 'Elevated granite water channel feeding stepped pushkaranis and royal enclosures.',
        icon: '⛲',
        terrain: 'land',
        requirements: { stone: 2, water: 1 },
        effects: { food: 25, community: 25 }
      },
      {
        id: 'musical_mandapa',
        nameKey: 'builder.b.musical_mandapa',
        descKey: 'builder.b.musical_mandapa_desc',
        name: 'Acoustic Saregama Pillar Pavilion',
        description: 'Granite hall with resonant colonnettes carved to emit distinct musical notes when tapped.',
        icon: '🏛️',
        terrain: 'land',
        requirements: { stone: 2, temple_carving: 1 },
        effects: { culture: 45, knowledge: 20 }
      }
    ]
  },

  12: {
    levelId: 12,
    eraTitle: 'Stories, Literature & Folk Arts',
    eraSubtitle: 'Manuscripts, Epics & Storytelling Spaces',
    gridSize: 4,
    waterTiles: [3, 7, 11, 15],
    availableBuildings: [
      {
        id: 'saraswati_bhandara',
        nameKey: 'builder.b.scriptorium',
        descKey: 'builder.b.scriptorium_desc',
        name: 'Palm-Leaf Manuscript Archive',
        description: 'Climate-ventilated library where scribes incise and preserve birch-bark and palm-leaf texts.',
        icon: '📜',
        terrain: 'land',
        requirements: { wood: 2, palm_leaf_manuscript: 1 },
        effects: { knowledge: 40, culture: 25 }
      },
      {
        id: 'puppet_theatre',
        nameKey: 'builder.b.puppet_theatre',
        descKey: 'builder.b.puppet_theatre_desc',
        name: 'Tholu Bommalata Shadow Theatre',
        description: 'Open-air village stage for translucent leather shadow puppetry and epic recitation.',
        icon: '🎭',
        terrain: 'land',
        requirements: { wood: 1, folk_tale: 1 },
        effects: { culture: 35, community: 25 }
      }
    ]
  },

  13: {
    levelId: 13,
    eraTitle: 'Traditional Indian Games',
    eraSubtitle: 'Courts of Strategy, Logic & Community Play',
    gridSize: 4,
    waterTiles: [5, 6],
    availableBuildings: [
      {
        id: 'game_pavilion',
        nameKey: 'builder.b.game_pavilion',
        descKey: 'builder.b.game_pavilion_desc',
        name: 'Chaturanga & Pachisi Courtyard',
        description: 'Inlaid stone courtyard where scholars and citizens practice strategy and probability games.',
        icon: '♟️',
        terrain: 'land',
        requirements: { stone: 2, wood: 1 },
        effects: { knowledge: 30, community: 30 }
      },
      {
        id: 'akhara_arena',
        nameKey: 'builder.b.akhara',
        descKey: 'builder.b.akhara_desc',
        name: 'Community Mallakhamb & Kalaripayattu Arena',
        description: 'Traditional training ground cultivating agility, breath control, and cooperative sportsmanship.',
        icon: '🤸',
        terrain: 'land',
        requirements: { wood: 2, water: 1 },
        effects: { community: 35, culture: 20 }
      }
    ]
  },

  14: {
    levelId: 14,
    eraTitle: 'Preserve the Legacy',
    eraSubtitle: 'Modern Heritage Conservation & Digital Archives',
    gridSize: 4,
    waterTiles: [3, 7],
    availableBuildings: [
      {
        id: 'exhibition_gallery',
        nameKey: 'builder.b.exhibition_gallery',
        descKey: 'builder.b.exhibition_gallery_desc',
        name: 'Interactive Heritage Museum & Gallery',
        description: 'Public cultural center showcasing authenticated artifacts, epigraphy, and living craft traditions.',
        icon: '🏛️',
        terrain: 'land',
        requirements: { stone: 2, wood: 1 },
        effects: { culture: 50, knowledge: 35, community: 25 }
      },
      {
        id: 'conservation_lab',
        nameKey: 'builder.b.conservation_lab',
        descKey: 'builder.b.conservation_lab_desc',
        name: 'Archaeological Conservation & 3D Archive Lab',
        description: 'Restores fragile manuscripts and laser-scans monuments to safeguard them for future generations.',
        icon: '🔬',
        terrain: 'land',
        requirements: { stone: 1, brick: 1 },
        effects: { knowledge: 50, culture: 30 }
      }
    ]
  }
};

export const getBuilderDataForLevel = (levelId) => {
  const entry = civilizationBuilderData[levelId] || civilizationBuilderData[1];
  return {
    ...entry,
    buildings: entry.availableBuildings || [],
    availableBuildings: entry.availableBuildings || []
  };
};
