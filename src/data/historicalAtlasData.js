// Complete Historical Atlas Data for KALACHAKRA
// Geographically accurate coordinates mapped via Equirectangular Projection
// Longitude: 61°E to 97.5°E | Latitude: 6.5°N to 37.5°N -> ViewBox: 0 0 1000 850

export const projectCoords = (lng, lat) => {
  const minLng = 61.0, maxLng = 97.5;
  const minLat = 6.5, maxLat = 37.5;
  const x = ((lng - minLng) / (maxLng - minLng)) * 860 + 70;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 740 + 55;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
};

// All 14 Game-Level Periods + Subcontinent Overview
export const ATLAS_ERAS = [
  {
    id: 'level_1',
    levelId: 1,
    title: 'Early Human Communities',
    dates: 'c. 100,000 – 7000 BCE',
    subtitle: 'Paleolithic & Mesolithic Rock Shelters & Tool Traditions',
    color: '#D9A441',
    accent: '#B77B2E',
    banner: '/assets/backgrounds/forest.jpg',
    context: 'Nomadic hunter-gatherer bands adapted to river valleys and sandstone plateaus across Central and Peninsular India, leaving thousands of rock shelter paintings in ochre and white mineral pigments.',
    civilizationOverlap: 'No political states existed. Hunting and foraging groups inhabited diverse ecosystems simultaneously, utilizing local quartzite in the Vindhyas, chert in the Belan valley, and limestone in the Deccan.',
    archaeologicalEvidence: 'Bhimbetka rock paintings, Acheulean handaxes from Hunsgi and Attirampakkam, and microlith blades from Paisra.',
    activeLayers: ['archaeological', 'rivers']
  },
  {
    id: 'level_2',
    levelId: 2,
    title: 'Early Farming Communities',
    dates: 'c. 7000 – 3300 BCE',
    subtitle: 'Neolithic Revolution: Settled Villages & Early Domestication',
    color: '#84CC16',
    accent: '#65A30D',
    banner: '/assets/backgrounds/early_farming_l2.jpg',
    context: 'The transition from foraging to food production: communities built permanent multi-room mudbrick houses, domesticated zebu cattle, sheep, and goats, cultivated barley and wheat, and made coiled pottery.',
    civilizationOverlap: 'Regional diversity was pronounced: wheat and barley farming in Balochistan (Mehrgarh) coexisted with indigenous rice cultivation in the Middle Ganga plain (Lahuradewa/Koldihwa) and subterranean pit dwellings in Kashmir (Burzahom).',
    archaeologicalEvidence: 'Excavated compartmentalized granaries at Mehrgarh, carbonized rice grains from Lahuradewa (c. 6500 BCE), and early polished celts.',
    activeLayers: ['settlements', 'rivers', 'archaeological']
  },
  {
    id: 'level_3',
    levelId: 3,
    title: 'Indus Valley Civilization',
    dates: 'c. 2600 – 1900 BCE',
    subtitle: 'Mature Harappan Phase: The Bronze Age Urban Revolution',
    color: '#D9A441',
    accent: '#B77B2E',
    banner: '/assets/atlas/harappan_atlas_map.jpg',
    context: 'Urban planning peaks across the Indus and Saraswati/Ghaggar-Hakra basins with grid-planned brick cities, covered sewers, public baths, standardized weights, and international maritime trade.',
    civilizationOverlap: 'While Harappan urban centers flourished in the northwest, contemporary chalcolithic cultures (Ahar-Banas in Rajasthan, Kayatha in Malwa) and southern neolithic pastoralists thrived in adjacent regions without urban administrative planning.',
    archaeologicalEvidence: 'Excavations at Mohenjo-daro, Harappa, Dholavira, Lothal, and Kalibangan with over 4,000 inscribed steatite seals and standardized cubic chert weights.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'archaeological']
  },
  {
    id: 'level_4',
    levelId: 4,
    title: 'Early Indian Trade Networks',
    dates: 'c. 1500 – 600 BCE',
    subtitle: 'Vedic Agropastoralism, Painted Grey Ware & Resource Exchange',
    color: '#F59E0B',
    accent: '#D97706',
    banner: '/assets/atlas/early_trade_routes_map.jpg',
    context: 'The expansion of agropastoral communities across the Ganga-Yamuna doab and central India, accompanied by Painted Grey Ware (PGW), early copper and iron metallurgy, and barter trade networks.',
    civilizationOverlap: 'Vedic settlements in the north coexisted with megalithic iron-using communities constructing dolmens and cairn circles across the Deccan and southern India.',
    archaeologicalEvidence: 'PGW ceramics at Hastinapura and Atranjikhera; early iron smelting furnaces; Megalithic burial sites in South India.',
    activeLayers: ['settlements', 'rivers', 'tradeRoutes']
  },
  {
    id: 'level_5',
    levelId: 5,
    title: 'Mahajanapadas & Early Kingdoms',
    dates: 'c. 600 – 300 BCE',
    subtitle: 'The Second Urbanization & The 16 Great States',
    color: '#22C55E',
    accent: '#16A34A',
    banner: '/assets/atlas/mahajanapadas_map.jpg',
    context: 'The rise of 16 great kingdoms (monarchies like Magadha and Kosala) and democratic republics (Gana-Sanghas like Vajji). Iron tools transformed agriculture; punch-marked silver coins fueled markets.',
    civilizationOverlap: 'Centered in the Gangetic basin and northwest, while megalithic chiefdoms and early Sangam settlements developed in the Deccan and Tamilakam.',
    archaeologicalEvidence: 'Northern Black Polished Ware (NBPW), silver punch-marked coins (karshapanas), and cyclopean fortification ramparts at Rajgir.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes']
  },
  {
    id: 'level_6',
    levelId: 6,
    title: 'Mauryan Empire',
    dates: 'c. 325 – 185 BCE',
    subtitle: 'Pan-Subcontinental Imperial Unity & Ashokan Edicts',
    color: '#EAB308',
    accent: '#CA8A04',
    banner: '/assets/atlas/mauryan_empire_map.jpg',
    context: 'Unified the subcontinent from the Hindu Kush to Karnataka under imperial bureaucracy. Ashoka carved moral edicts on polished stone pillars and natural rocks along royal highways promoting non-violence and social welfare.',
    civilizationOverlap: 'Ashoka’s Major Rock Edict II explicitly names the southern autonomous border realms that remained independent: the Cholas, Pandyas, Keralaputras, and Satyaputras.',
    archaeologicalEvidence: 'In situ Major and Minor Rock Edicts, monolithic polished sandstone pillars with animal capitals (Sarnath, Rampurva, Vaishali).',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'monuments']
  },
  {
    id: 'level_7',
    levelId: 7,
    title: 'Gupta Period & Knowledge',
    dates: 'c. 320 – 550 CE',
    subtitle: 'The Classical Renaissance: Mathematics, Astronomy & Rock Architecture',
    color: '#A855F7',
    accent: '#7E22CE',
    banner: '/assets/atlas/mauryan_parchment_map.jpg',
    context: 'A classical era of mathematical and astronomical achievements (Aryabhata, decimal zero), classical Sanskrit literature (Kalidasa), exquisite Ajanta murals, and rust-resistant iron metallurgy.',
    civilizationOverlap: 'The Guptas ruled northern India while the Vakatakas governed the Deccan (patronizing the Ajanta cave shrines), and the Kadambas and early Pallavas controlled southern regions.',
    archaeologicalEvidence: 'The Iron Pillar of Delhi, rock-cut Ajanta cave monasteries, early structural stone temples at Deogarh and Eran, and Gold Dinar coinage.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'monuments']
  },
  {
    id: 'level_8',
    levelId: 8,
    title: 'Indian Architecture & Engineering',
    dates: 'c. 3rd century BCE – 13th century CE',
    subtitle: 'Rock-Cut Wonders, Stepped Reservoirs & Structural Temples',
    color: '#EC4899',
    accent: '#BE185D',
    banner: '/assets/backgrounds/temple.jpg',
    context: 'Evolution of Indian engineering from monolithic rock-cut caves (Barabar, Ajanta, Ellora) to complex water stepwells (Rani ki Vav, Surya Kund) and Dravidian/Nagara stone towers.',
    civilizationOverlap: 'Diverse regional architectural styles (Nagara in the north, Dravida in the south, Vesara in the Deccan) evolved simultaneously according to local stone geology.',
    archaeologicalEvidence: 'Monolithic Kailasa Temple carved top-down from volcanic basalt at Ellora; Dholavira stone reservoirs; Sanchi Torana joinery.',
    activeLayers: ['monuments', 'archaeological', 'rivers']
  },
  {
    id: 'level_9',
    levelId: 9,
    title: 'Indian Cultural Traditions',
    dates: 'Continuous Heritage',
    subtitle: 'Sacred Landscapes, River Confluences & Pilgrimage Geographies',
    color: '#F97316',
    accent: '#C2410C',
    banner: '/assets/backgrounds/city.jpg',
    context: 'Sacred geographical routes connecting ancient tirthas across rivers, mountains, and coastal capes. Living continuity of philosophy, performing arts, and seasonal festivals.',
    civilizationOverlap: 'Pluralistic coexistence of Vedic, Buddhist, Jain, folk, and regional bhakti traditions across all geographic zones of India.',
    archaeologicalEvidence: 'Continuous archaeological stratigraphy at Varanasi ghats, Prayag, Ujjain Shipra riverfront, and ancient temple inscriptions.',
    activeLayers: ['settlements', 'rivers', 'monuments']
  },
  {
    id: 'level_10',
    levelId: 10,
    title: 'Chola & Regional Civilizations',
    dates: 'c. 850 – 1250 CE',
    subtitle: 'Kaveri Delta Heartland & Indian Ocean Maritime Empire',
    color: '#38BDF8',
    accent: '#0284C7',
    banner: '/assets/atlas/chola_maritime_map.jpg',
    context: 'The Imperial Cholas developed naval power across the Bay of Bengal, built colossal granite temples (Brihadisvara), cast lost-wax bronzes (Nataraja), and maintained oceanic trade links with Southeast Asia and China.',
    civilizationOverlap: 'The Cholas dominated southern India while the Western Chalukyas held the Deccan, the Palas governed Bengal, and the Ghaznavids and Chandelas ruled in the north.',
    archaeologicalEvidence: 'Brihadisvara Temple inscriptions detailing endowments, over 350 Nagapattinam Buddhist bronzes, and Tamil stone inscriptions discovered in Kedah (Malaysia) and Sumatra.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'monuments']
  },
  {
    id: 'level_11',
    levelId: 11,
    title: 'Vijayanagara & Medieval Heritage',
    dates: 'c. 1336 – 1646 CE',
    subtitle: 'City of Victory: Granite Bazaars, Canals & Monolithic Shrines',
    color: '#FB7185',
    accent: '#E11D48',
    banner: '/assets/atlas/dholavira_reconstruction.jpg',
    context: 'Capital on the rugged granite banks of the Tungabhadra River. Renowned for its gemstone bazaars, international horse trade with Portugal and Arabia, musical pillared mandapas, and irrigation aqueducts.',
    civilizationOverlap: 'Coexisted with the northern Bahmani Sultanate and successor Deccan Sultanates (Bijapur, Golconda), while the Ming Dynasty governed China.',
    archaeologicalEvidence: 'Monolithic Stone Chariot at Vittala Temple, Virupaksha temple complex, Royal Center elephant stables, and contemporary travelogues by Domingo Paes and Abdur Razzaq.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'monuments']
  },
  {
    id: 'level_12',
    levelId: 12,
    title: 'Stories, Literature & Folk Arts',
    dates: 'Continuous Heritage',
    subtitle: 'Classical Epics, Regional Languages & Palm-Leaf Libraries',
    color: '#A78BFA',
    accent: '#7C3AED',
    banner: '/assets/atlas/mahajanapadas_map.jpg',
    context: 'The geographic transmission of the epics (Ramayana, Mahabharata), Sangam literature in the south, and folk theatrical and storytelling arts across regions.',
    civilizationOverlap: 'Sanskrit classical literature flourished in courts alongside robust Prakrit, Pali, Tamil, Kannada, and regional vernacular folk traditions.',
    archaeologicalEvidence: 'Terracotta relief panels depicting epic scenes at Bhitargaon; early Sangam Tamil-Brahmi rock inscriptions; palm-leaf manuscript archives.',
    activeLayers: ['settlements', 'rivers', 'monuments']
  },
  {
    id: 'level_13',
    levelId: 13,
    title: 'Traditional Indian Games',
    dates: 'Ancient to Present',
    subtitle: 'Historical Board Games, Martial Traditions & Physical Culture',
    color: '#F43F5E',
    accent: '#BE123C',
    banner: '/assets/backgrounds/login_bg.jpg',
    context: 'Ancient origins of strategy and athletic games: Chaturanga (ancestor of chess), Chaupar/Pachisi, Gyan Chauper (Snakes & Ladders), and traditional martial systems like Kalaripayattu and Mallakhamb.',
    civilizationOverlap: 'Board games were played across palaces, monastic rest stops, and rural village platforms across every region of the subcontinent.',
    archaeologicalEvidence: 'Terracotta gameboards and gaming dice excavated at Mohenjo-daro and Lothal; stone gameboards carved into temple floors at Hampi, Belur, and Badami.',
    activeLayers: ['settlements', 'archaeological']
  },
  {
    id: 'level_14',
    levelId: 14,
    title: 'Heritage Preservation',
    dates: 'Present & Future',
    subtitle: 'Archaeological Conservation, Living Heritage & Digital Legacy',
    color: '#06B6D4',
    accent: '#0891B2',
    banner: '/assets/backgrounds/dashboard.jpg',
    context: 'The stewardship of 3,600+ monuments protected by the Archaeological Survey of India (ASI) and UNESCO World Heritage sites, combining physical preservation with digital documentation.',
    civilizationOverlap: 'Modern heritage preservation respects both tangible monuments and intangible cultural practices living across India’s linguistic and regional communities.',
    archaeologicalEvidence: 'Modern laser scanning, stratigraphy excavations, chemical conservation of Ajanta murals, and community heritage registries.',
    activeLayers: ['settlements', 'monuments', 'archaeological']
  },
  {
    id: 'all',
    levelId: 'all',
    title: 'All Eras & Civilizations',
    dates: 'Subcontinent Overview',
    subtitle: 'Five Millennia of South Asian Historical Geography',
    color: '#D9A441',
    accent: '#B77B2E',
    banner: '/assets/atlas/mauryan_parchment_map.jpg',
    context: 'An overview of how settlements, rivers, empires, and trade networks evolved and layered upon each other across the Indian subcontinent.',
    civilizationOverlap: 'Indian history is marked by deep geographic and cultural continuity, where new technologies and administrative systems adapted to ancient river basins and regional trade corridors.',
    archaeologicalEvidence: 'Multilayered stratigraphy across thousands of documented archaeological sites from the Indus to the Kaveri.',
    activeLayers: ['settlements', 'kingdoms', 'rivers', 'tradeRoutes', 'monuments', 'archaeological']
  }
];

// REAL HISTORICAL LOCATIONS WITH EXACT GEOGRAPHICAL COORDINATES
export const ATLAS_LOCATIONS = [
  // 1. EARLY HUMAN COMMUNITIES (Level 1)
  {
    id: 'bhimbetka_region',
    name: 'Bhimbetka Rock Shelters',
    modernLocation: 'Raisen District, Madhya Pradesh, India',
    lat: 22.94, lng: 77.61,
    coordinates: projectCoords(77.61, 22.94),
    period: 'Paleolithic to Mesolithic (c. 100,000 – 8000 BCE)',
    level: 1, eraId: 'level_1',
    category: 'archaeological',
    icon: '⛰️',
    significance: 'Over 750 sandstone rock shelters containing prehistoric rock art spanning 10,000+ years. Depicts hunting scenes, bison, communal dances, and rituals painted in red ochre and white mineral pigments.',
    reconstructionImage: '/assets/backgrounds/forest.jpg',
    architecture: 'Natural sandstone overhangs and rock shelters carved by nature provided shelter from wind, monsoon rains, and predatory animals without artificial masonry walls.',
    lifestyle: 'Nomadic hunter-gatherer bands moved between seasonal river valleys and Vindhyan plateaus; knapped quartzite cobbles into Acheulean bifacial handaxes and microlith blades.',
    food: 'Wild game (Indian bison, spotted deer, wild boar), forest tubers, berries, wild honey, and freshwater river fish.',
    clothing: 'Animal hides, bark wraps, and body decoration made from red hematite, manganese, and white clay mixed with animal fat.',
    trade: 'Local exchange of high-grade chalcedony, agate, and chert stones for crafting razor-sharp microlith blades and arrow points.',
    thenAndNow: 'Then: A rich prehistoric hunting refuge amidst dense teak and sal forests. Now: UNESCO World Heritage site celebrated as one of the oldest traces of human art in South Asia.',
    artifacts: ['Acheulean Handaxes & Cleavers', 'Mesolithic Microliths', 'Zoo Rock Paintings of Indian Bison', 'Ochre Grinding Stones'],
    libraryId: 'hand_axe'
  },
  {
    id: 'hunsgi_valley',
    name: 'Hunsgi Acheulean Valley',
    modernLocation: 'Yadgir District, Karnataka, India',
    lat: 16.51, lng: 76.51,
    coordinates: projectCoords(76.51, 16.51),
    period: 'Lower Paleolithic (c. 500,000 BCE)',
    level: 1, eraId: 'level_1',
    category: 'archaeological',
    icon: '🪨',
    significance: 'A major Lower Paleolithic Acheulean workshop site in the Baichbal Valley. Excavations uncovered limestone tool-manufacturing floors with hundreds of bifacial handaxes and cleavers.',
    reconstructionImage: '/assets/backgrounds/forest.jpg',
    architecture: 'Open-air riverside camping and stone-tool flaking workshops along perennial spring-fed streams.',
    lifestyle: 'Early hominid groups organized cooperative hunts of large herbivores and quarried local bedded limestone.',
    food: 'Meat from large wild herbivores, wild seed grasses, and water roots.',
    clothing: 'Natural unprocessed plant foliage and hides.',
    trade: 'Movement of fine stone raw materials within the valley basin.',
    thenAndNow: 'Then: Open-air savanna basin with freshwater springs. Now: Peaceful agricultural farmland with excavated Stone Age trenches studied by prehistorians.',
    artifacts: ['Limestone Handaxes', 'Cleavers with Sharp Working Edges', 'Quartzite Hammerstones', 'Bone Scrapers'],
    libraryId: 'hand_axe'
  },

  // 2. EARLY FARMING COMMUNITIES (Level 2)
  {
    id: 'mehrgarh_region',
    name: 'Mehrgarh',
    modernLocation: 'Kachi Plain, Balochistan, Pakistan',
    lat: 29.38, lng: 67.62,
    coordinates: projectCoords(67.62, 29.38),
    period: 'c. 7000 – 2600 BCE',
    level: 2, eraId: 'level_2',
    category: 'archaeological',
    icon: '🌾',
    significance: 'Earliest known agricultural and pastoral settlement in South Asia. Documented the transition from foraging to settled barley and wheat farming, mudbrick granaries, and the earliest evidence of dentistry (drilled teeth c. 7000 BCE).',
    reconstructionImage: '/assets/backgrounds/early_farming_l2.jpg',
    architecture: 'Standardized rectangular multi-room mudbrick houses with 4-room and 6-room storage layouts designed to keep grain dry.',
    lifestyle: 'Domestication of zebu cattle, sheep, and goats; harvested crops using composite flint sickles; early coiled terracotta craft.',
    food: 'Six-row barley, emmer and einkorn wheat, jujube fruit, dates, and domesticated mutton/beef.',
    clothing: 'Early woven plant fibers, shell bead pendants from the Arabian Sea, and turquoise beads brought across Afghan mountain passes.',
    trade: 'Strategic crossroads on the Bolan Pass: exchanged marine shells with the Arabian Sea coast and lapis lazuli with northern mines.',
    thenAndNow: 'Then: Fertile alluvial terrace nourished by the Bolan River. Now: Dry, windswept archaeological mound providing foundational proof of indigenous South Asian agricultural origins.',
    artifacts: ['Earliest Drilled Human Molars', 'Compartmentalized Mudbrick Granaries', 'Terracotta Mother Goddess Figurines', 'Flint Microlith Sickle Blades'],
    libraryId: 'early_pottery'
  },
  {
    id: 'lahuradewa',
    name: 'Lahuradewa Rice Farming Site',
    modernLocation: 'Sant Kabir Nagar District, Uttar Pradesh, India',
    lat: 26.78, lng: 83.15,
    coordinates: projectCoords(83.15, 26.78),
    period: 'c. 7000 – 2000 BCE',
    level: 2, eraId: 'level_2',
    category: 'archaeological',
    icon: '🌱',
    significance: 'Key site for early agricultural history in Asia: yielded carbonized domesticated rice grains (Oryza sativa) dated to c. 6500 BCE, proving indigenous rice farming in the Ganga basin.',
    reconstructionImage: '/assets/backgrounds/early_farming_l2.jpg',
    architecture: 'Wattle-and-daub circular huts with thatched roofs and clay hearths situated around a natural freshwater lake.',
    lifestyle: 'Lakeside agricultural life integrating wet-rice farming, freshwater fishing, and ceramic hand-modeling.',
    food: 'Cultivated rice, aquatic lotus roots, waterfowl, and wild millet.',
    clothing: 'Simple spun wild bast fibers and woven reed mats.',
    trade: 'Local ceramic and bone tool exchange along the Sarayu and Rapti river networks.',
    thenAndNow: 'Then: Pristine wetland lake basin with wild rice stands. Now: Lush agricultural countryside in the Middle Ganga plain.',
    artifacts: ['Carbonized Domesticated Rice Grains', 'Cord-Marked Pottery Sherds', 'Bone Fishhooks', 'Polished Stone Celts'],
    libraryId: 'early_pottery'
  },

  // 3. INDUS CIVILIZATION (Level 3)
  {
    id: 'harappa',
    name: 'Harappa',
    modernLocation: 'Sahiwal District, Punjab, Pakistan',
    lat: 30.63, lng: 72.87,
    coordinates: projectCoords(72.87, 30.63),
    period: 'c. 2600 – 1900 BCE (Mature Harappan)',
    level: 3, eraId: 'level_3',
    category: 'city',
    icon: '🏙️',
    significance: 'First discovered site of the Indus Civilization (excavated 1921). Features a massive mudbrick citadel, 12-unit public granaries, circular grain-pounding platforms, and workman quarters.',
    reconstructionImage: '/assets/atlas/harappan_atlas_map.jpg',
    architecture: 'Grid-planned streets oriented north-south and east-west. Standardized fired-brick houses (1:2:4 ratio) with central open-air courtyards, private wells, and indoor bathrooms.',
    lifestyle: 'Urban artisans lived in dedicated quarters near granaries and workshops. City life was supported by a strong civic administration maintaining public hygiene and uniform building standards.',
    food: 'Cultivated wheat, six-row barley, peas, sesame, and mustard. Domesticated cattle (zebu humped ox), sheep, goats, and pigs; fished freshwater catfish from the Ravi river.',
    clothing: 'Spun and wove cotton textiles dyed with madder. Wore draped cotton lengths; women wore terracotta and faience beaded necklaces, shell bangles, and elaborate headgear.',
    trade: 'Connected along the Ravi and Indus river routes. Exported carnelian beads and finished steatite seals; imported chert from Rohri Hills, copper from Rajasthan, and timber from Himalayan foothills.',
    thenAndNow: 'In antiquity, Harappa stood directly upon the banks of the perennial Ravi River. Over subsequent millennia, the river shifted 8 km to the north, leaving the ancient mounds dry. Modern Harappa is an excavated archaeological site and museum.',
    artifacts: ['Red Sandstone Torso', 'Faience Bangles', 'Unicorn Steatite Seals', 'Standard Chert Cube Weights'],
    libraryId: 'harappa_city'
  },
  {
    id: 'mohenjo_daro',
    name: 'Mohenjo-daro',
    modernLocation: 'Larkana District, Sindh, Pakistan',
    lat: 27.32, lng: 68.14,
    coordinates: projectCoords(68.14, 27.32),
    period: 'c. 2500 – 1900 BCE',
    level: 3, eraId: 'level_3',
    category: 'city',
    icon: '🧱',
    significance: 'One of the world’s largest Bronze Age metropolises (~40,000 citizens). Famous for the Great Bath waterproofed with natural bitumen, the pillared assembly hall, and 700+ brick-lined wells.',
    reconstructionImage: '/assets/atlas/indus_valley_encyclopedia_map.jpg',
    architecture: 'Divided into an elevated western Citadel (mound of administrative and ritual structures) and a sprawling Lower Town. Covered brick sewers lined every major street with inspection traps.',
    lifestyle: 'Almost every private residence had its own brick-tiled bathroom connected via clay pipes to covered street drains. Over 700 brick-lined wells supplied clean drinking water.',
    food: 'Staples included emmer wheat, barley, jujube fruit, lentils, and river fish. Grain was stored in the massive aerated citadel granary to withstand seasonal flooding.',
    clothing: 'Men and women wore woven cotton. The famed "Priest-King" sculpture depicts a bearded dignitary wearing a draped shawl with trefoil motifs and an armlet.',
    trade: 'Hub of high-value manufacturing: glazed faience ornaments, etched carnelian beads, copper mirrors, and bronze tools exchanged with Mesopotamia and Persian Gulf emporia.',
    thenAndNow: 'Then: A bustling metropolis directly on the Indus floodplain protected by massive flood-defense brick platforms. Now: A UNESCO World Heritage site threatened by saline groundwater weathering and high summer temperatures.',
    artifacts: ['Bronze Dancing Girl', 'Steatite Priest-King', 'Pashupati Proto-Shiva Seal', 'Terracotta Toy Carts'],
    libraryId: 'great_bath'
  },
  {
    id: 'dholavira',
    name: 'Dholavira',
    modernLocation: 'Khadir Bet, Kutch District, Gujarat, India',
    lat: 23.89, lng: 70.22,
    coordinates: projectCoords(70.22, 23.89),
    period: 'c. 2600 – 1600 BCE',
    level: 3, eraId: 'level_3',
    category: 'city',
    icon: '💧',
    significance: 'Spectacular island city in the Rann of Kutch renowned for its monumental stone architecture, 16 rock-cut reservoirs holding 250,000 cubic meters of water, and a 10-symbol signboard inscription.',
    reconstructionImage: '/assets/atlas/dholavira_reconstruction.jpg',
    architecture: 'Unique tripartite city layout: Castle/Citadel, Middle Town, and Lower Town, enclosed by massive stone masonry fortification walls up to 11 meters thick.',
    lifestyle: 'Living in an arid salt-desert environment, citizens were master hydraulic engineers. Rainwater from seasonal streams (Manhar and Mansar) was diverted into stepped stone reservoirs.',
    food: 'Dryland agriculture: millets (bajra), barley, sesame, pulses. Grazed cattle, goats, and camels; gathered marine mollusks and fish from the prehistoric marine gulf.',
    clothing: 'Wore fine cotton fabrics complemented by exquisite agate, jasper, and shell jewellery crafted from marine shells collected along the Kutch coast.',
    trade: 'Major marine gateway controlling maritime traffic entering the Gulf of Kutch. Produced banded limestone pillars, polished stone celts, and carnelian ornaments.',
    thenAndNow: 'Then: Located on a fertile island surrounded by navigable marine gulf waters that ships could enter. Now: Surrounded by the vast white salt desert of the Great Rann of Kutch; an exceptional UNESCO World Heritage Site.',
    artifacts: ['10-Character Indus Signboard', 'Polished Stone Column Bases', 'Rock-cut Reservoirs', 'Copper Celts'],
    libraryId: 'steatite_seal'
  },
  {
    id: 'lothal',
    name: 'Lothal',
    modernLocation: 'Ahmedabad District, Gujarat, India',
    lat: 22.52, lng: 72.25,
    coordinates: projectCoords(72.25, 22.52),
    period: 'c. 2400 – 1900 BCE',
    level: 3, eraId: 'level_3',
    category: 'port',
    icon: '⚓',
    significance: 'The premier Harappan port and industrial craft center. Possessed the world’s oldest known tidal dock basin (214 × 36 m), connected by a sluice gate to the ancient Bhogavo River.',
    reconstructionImage: '/assets/atlas/harappan_atlas_map.jpg',
    architecture: 'Town divided into an Acropolis (ruling elite residence) and Lower Town. The dockyard featured a spillway and locking doors to maintain water levels during low tides.',
    lifestyle: 'Bustling industrial quarter: bead-makers kiln, coppersmith furnaces, and ivory-carving ateliers where skilled artisans manufactured export items from morning to evening.',
    food: 'Earliest archaeological evidence of rice cultivation in Gujarat (c. 2200 BCE), alongside wheat, barley, pulses, and marine seafood.',
    clothing: 'Fine dyed cotton garments, shell bangles from coastal conch shells, and necklaces of tiny micro-steatite and carnelian beads.',
    trade: 'Direct international sea trade: Persian Gulf circular stamp seals and Mesopotamian seals found here confirm voyages across the Arabian Sea carrying cotton, carnelian, and timber.',
    thenAndNow: 'Then: An active tidal seaport opening directly into the Gulf of Khambhat via a navigable river estuary. Now: Coastal siltation and tectonic uplifting shifted the coastline 18 km away, leaving the brick dock basin surrounded by agricultural fields.',
    artifacts: ['Persian Gulf Button Seal', 'Standardized Ivory Scale', 'Double Burial Terracotta Coffins', 'Terracotta Ship Model'],
    libraryId: 'standardized_weight'
  },
  {
    id: 'kalibangan',
    name: 'Kalibangan',
    modernLocation: 'Hanumangarh District, Rajasthan, India',
    lat: 29.47, lng: 74.13,
    coordinates: projectCoords(74.13, 29.47),
    period: 'c. 2600 – 1900 BCE',
    level: 3, eraId: 'level_3',
    category: 'city',
    icon: '🔥',
    significance: 'Situated on the left bank of the dried-up Ghaggar-Hakra River. Yielded the world’s earliest ploughed agricultural field with cross-furrows, and public series of clay fire altars.',
    reconstructionImage: '/assets/atlas/indus_valley_encyclopedia_map.jpg',
    architecture: 'Fortified citadel and lower town constructed primarily of dried mudbricks. Distinct absence of fired bricks except in drains and wells.',
    lifestyle: 'Strong ritual tradition: rows of brick-lined fire altars (havan kunds) containing charcoal and ash point to community fire rituals and sacrificial offerings.',
    food: 'Innovative cross-ploughing allowed two crops (mustard and horse gram) to grow simultaneously in the same field, maximizing arid rainfall.',
    clothing: 'Terracotta bangles painted in black, red, and ochre; stone beads, simple woven linen and cotton wraps.',
    trade: 'Supplied agricultural surplus and copper tools from the nearby Khetri mines along the Ghaggar-Hakra river network to Harappa and Mohenjo-daro.',
    thenAndNow: 'Then: Flourished on the perennial waters of the Saraswati/Ghaggar-Hakra river. Now: The river dried up into a seasonal monsoon stream, turning the surrounding landscape into the Thar Desert fringe.',
    artifacts: ['Cross-Furrowed Ploughed Field', 'Ritual Fire Altars', 'Terracotta Bull Figurine', 'Cylindrical Mesopotamian Seal'],
    libraryId: 'harappa_city'
  },

  // 4. EARLY INDIAN TRADE NETWORKS (Level 4)
  {
    id: 'hastinapura',
    name: 'Hastinapura',
    modernLocation: 'Meerut District, Uttar Pradesh, India',
    lat: 29.17, lng: 78.02,
    coordinates: projectCoords(78.02, 29.17),
    period: 'c. 1200 – 600 BCE (PGW Phase)',
    level: 4, eraId: 'level_4',
    category: 'settlement',
    icon: '🏺',
    significance: 'Capital of the Kuru clan excavated by B.B. Lal. Stratigraphy revealed continuous levels of Painted Grey Ware (PGW), early iron arrowheads, and evidence of a massive Ganga flood.',
    reconstructionImage: '/assets/atlas/early_trade_routes_map.jpg',
    architecture: 'Mudbrick and wattle-and-daub houses with thatched reed roofs; later burnt-brick drains and soak-pits.',
    lifestyle: 'Vedic agropastoral society with cattle breeding, horse rearing, iron weapon making, and community fire rites.',
    food: 'Barley, rice, sugarcane, dairy curd, and clarified butter.',
    clothing: 'Hand-spun wool and cotton, copper pins, and terracotta beads.',
    trade: 'Cross-doab trade of iron tools, copper bangles, and fine grey tableware.',
    thenAndNow: 'Then: Royal capital overlooking the ancient channel of the Ganga. Now: Revered pilgrimage town with Jain temples and protected archaeological mounds.',
    artifacts: ['Painted Grey Ware Bowls with Geometric Motifs', 'Iron Spearheads', 'Glass Bangles', 'Terracotta Animal Figurines'],
    libraryId: 'maritime_cargo'
  },

  // 5. MAHAJANAPADAS & EARLY KINGDOMS (Level 5)
  {
    id: 'pataliputra',
    name: 'Pataliputra',
    modernLocation: 'Patna, Bihar, India',
    lat: 25.61, lng: 85.14,
    coordinates: projectCoords(85.14, 25.61),
    period: 'c. 490 BCE – 500 CE',
    level: 5, eraId: 'level_5',
    category: 'capital',
    icon: '🏰',
    significance: 'Imperial capital of Magadha, the Mauryan Empire, and the Gupta Empire. Founded by King Udayin at the strategic confluence of the Ganga, Son, Gandak, and Ghaghara rivers.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    architecture: 'Surrounded by a colossal wooden palisade with 570 towers and 64 gates (as recorded by Greek ambassador Megasthenes). Houses made of brick, timber, and lime mortar.',
    lifestyle: 'Center of royal courts, civil bureaucracy, diplomatic embassies, and merchant guilds (shrenis). The Ganga riverfront bustled with cargo barges day and night.',
    food: 'Fine Magadhan scented rice, barley flatbreads, mangoes, bananas, river carp, dairy ghee, and sweetmeats.',
    clothing: 'Fine muslin and silk garments, embroidered borders, golden diadems, and punch-marked silver coins (karshapanas) used in marketplaces.',
    trade: 'Terminal nexus of the Uttarapatha highway connecting Taxila to the Bay of Bengal port of Tamralipti.',
    thenAndNow: 'Then: A 14 km-long riverfront imperial metropolis defended by water moats. Now: Buried beneath modern Patna; excavated at Kumhrar (80-pillared Mauryan hall).',
    artifacts: ['80-Pillared Mauryan Hall Remains', 'Didarganj Yakshi Polished Sculpture', 'Silver Punch-Marked Coins', 'Mauryan Terracotta Figurines'],
    libraryId: 'punch_marked_coin'
  },
  {
    id: 'rajgir',
    name: 'Rajagriha (Rajgir)',
    modernLocation: 'Nalanda District, Bihar, India',
    lat: 25.03, lng: 85.42,
    coordinates: projectCoords(85.42, 25.03),
    period: 'c. 6th century BCE',
    level: 5, eraId: 'level_5',
    category: 'capital',
    icon: '⛰️',
    significance: 'The ancient hill-capital of King Bimbisara and Ajatashatru of Magadha. Site of Buddha’s discourses at Griddhakuta (Vulture Peak) and the First Buddhist Council at Saptaparni Cave.',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    architecture: 'Protected by cyclopean stone walls 40 km long built from massive unmortared boulders winding over five hilltops.',
    lifestyle: 'Royal seat of statecraft, early physicians (Jivaka’s mango grove hospital), and philosophical debates among Buddhist, Jain, and Ajivika monks.',
    food: 'Barley, rice, forest venison, wild honey, and mineral-rich spring waters from local hot springs (Brahmakund).',
    clothing: 'Woven cotton tunics, ascetics ochre robes, iron swords and armour worn by Magadhan infantry.',
    trade: 'Controlled the rich iron ore mines of southern Bihar/Jharkhand, enabling Magadha to forge superior weapons and agricultural ploughshares.',
    thenAndNow: 'Then: A fortified mountain valley capital commanding trade passes. Now: A tranquil pilgrimage center with the Vishwa Shanti Stupa, ancient stone walls, and ropeway.',
    artifacts: ['Cyclopean Stone Wall Ramparts', 'Bimbisara Jail Ruins', 'Jivaka Mango Grove Hospital', 'Polished Iron Weapon Heads'],
    libraryId: 'punch_marked_coin'
  },
  {
    id: 'vaishali',
    name: 'Vaishali',
    modernLocation: 'Vaishali District, Bihar, India',
    lat: 25.99, lng: 85.13,
    coordinates: projectCoords(85.13, 25.99),
    period: 'c. 6th century BCE',
    level: 5, eraId: 'level_5',
    category: 'capital',
    icon: '⚖️',
    significance: 'Capital of the Vajji confederacy, considered one of the earliest recorded democratic republics in human history. Governed by an elected assembly of 7,707 clan chiefs (Rajas).',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    architecture: 'Assembly hall (Santhagara) where elected representatives met to debate war, peace, and laws. Moated ramparts and stupas.',
    lifestyle: 'Decisions taken by consensus or voting with wooden voting sticks (salaka). Thriving culture of arts, patronizing the famed dancer Amrapali.',
    food: 'Gangetic alluvial agriculture: rice, sugarcane, mustard, pulses, and milk products.',
    clothing: 'Richly dyed cotton shawls, floral garlands, polished shell and terracotta beads.',
    trade: 'River port on the northern bank of the Ganga connecting trade between Nepal Himalayas and Magadha.',
    thenAndNow: 'Then: Prosperous republican capital where Buddha delivered his last sermon. Now: Peaceful rural heritage site featuring the intact single-lion Ashokan pillar and coronation tank (Abhishek Pushkarini).',
    artifacts: ['Ashokan Pillar with Single Lion Capital', 'Relic Stupa of the Buddha', 'Coronation Tank Abhishek Pushkarini', 'Monastic Votive Seals'],
    libraryId: 'punch_marked_coin'
  },

  // 6. MAURYAN EMPIRE (Level 6)
  {
    id: 'taxila',
    name: 'Takshashila (Taxila)',
    modernLocation: 'Rawalpindi District, Punjab, Pakistan',
    lat: 33.74, lng: 72.79,
    coordinates: projectCoords(72.79, 33.74),
    period: 'c. 6th century BCE – 5th century CE',
    level: 6, eraId: 'level_6',
    category: 'capital',
    icon: '📚',
    significance: 'Famed ancient university city and northwestern viceroyalty of the Mauryan Empire. Crossroads where Persian, Greek, Central Asian, and Indian knowledge converged; teacher Chanakya authored the Arthashastra here.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    architecture: 'Three successive ancient cities: Bhir Mound (irregular organic streets), Sirkap (Greek-style grid city), and Sirsukh (Kushan fortress).',
    lifestyle: 'Thousands of international students studied 18 branches of science, medicine (Ayurveda under Charaka), archery, statecraft, astronomy, and philosophy.',
    food: 'Wheat bread, mutton, pomegranate, grapes, walnuts, dairy cheese, and lentils.',
    clothing: 'Fusion garments: Indian dhotis alongside Central Asian tunics and Gandharan woolen cloaks.',
    trade: 'Premier northern terminus of the Uttarapatha highway connecting the Gangetic plains to the Silk Road routes through Bactria and Persia.',
    thenAndNow: 'Then: Cosmopolitan intellectual capital of the subcontinent. Now: Renowned UNESCO archaeological site with excavated stupas (Dharmarajika), monasteries (Jaulian), and a museum.',
    artifacts: ['Silver Hoards of Alexander & Maurya Coins', 'Gandharan Stone Reliefs', 'Aramaic Inscriptions', 'Charaka Medical Pestles'],
    libraryId: 'ashokan_edict'
  },
  {
    id: 'sarnath',
    name: 'Sarnath',
    modernLocation: 'Varanasi District, Uttar Pradesh, India',
    lat: 25.37, lng: 83.02,
    coordinates: projectCoords(83.02, 25.37),
    period: 'c. 3rd century BCE',
    level: 6, eraId: 'level_6',
    category: 'monument',
    icon: '🏛️',
    significance: 'Site of Buddha’s first sermon. Emperor Ashoka erected the famous Lion Capital (India’s National Emblem) in mirror-like polished Chunar sandstone alongside the Dharmarajika Stupa.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    architecture: 'Monastic complexes (viharas), open meditation groves (Deer Park), massive brick stupas (Dhamek and Dharmarajika), and Ashokan polished sandstone pillars.',
    lifestyle: 'Bhikshus lived a disciplined life of study, chanting, and meditation; royal delegations and pilgrims from across Asia visited to make donations.',
    food: 'Simple vegetarian alms gathered in clay bowls: rice porridge, lentils, seasonal fruit, herbal teas.',
    clothing: 'Tri-civara (threefold ochre robes) woven from discarded cotton rags washed and dyed with tree bark.',
    trade: 'Pilgrimage node on the Uttarapatha supported by royal endowments and merchant guild donations recorded in donor inscriptions.',
    thenAndNow: 'Then: A tranquil deer park surrounded by monastic colleges. Now: A serene archaeological park and museum housing the original 250 BCE Ashokan Lion Capital.',
    artifacts: ['Ashokan Polished Chunar Sandstone Lion Capital', 'Ashoka Pillar Schism Edict', 'Dhamek Stupa Brick Carvings', 'Gupta Buddha in Dharmachakra Mudra'],
    libraryId: 'ashokan_edict'
  },
  {
    id: 'girnar',
    name: 'Girnar (Junagadh)',
    modernLocation: 'Junagadh District, Gujarat, India',
    lat: 21.52, lng: 70.47,
    coordinates: projectCoords(70.47, 21.52),
    period: 'c. 250 BCE – 450 CE',
    level: 6, eraId: 'level_6',
    category: 'monument',
    icon: '📜',
    significance: 'A colossal granite boulder bearing 14 Major Rock Edicts of Ashoka, alongside later inscriptions by Rudradaman I (150 CE) and Skandagupta (456 CE) recording the history of Lake Sudarshana.',
    reconstructionImage: '/assets/atlas/mauryan_parchment_map.jpg',
    architecture: 'Rock-cut edict shelters, ancient earth dams with stone spillways, and rock-hewn steps ascending Mount Girnar.',
    lifestyle: 'Administrative outpost overlooking Saurashtra; royal engineers maintained the massive Sudarshana water reservoir for irrigation.',
    food: 'Kathiawar millets, pulses, sesame, cow dairy, and coastal seafood.',
    clothing: 'Coarse and fine cotton, shell jewellery, bronze ornaments.',
    trade: 'Connected Gujarat sea trade to the Mauryan capital via Ujjain.',
    thenAndNow: 'Then: A rocky mountain pass highway guarding the imperial Sudarshana reservoir. Now: A protected ASI inscription pavilion at the foot of Mount Girnar.',
    artifacts: ['14 Major Rock Edicts of Ashoka', 'Rudradaman I Sanskrit Inscription', 'Skandagupta Sudarshana Dam Edict', 'Mauryan Polished Granite Surface'],
    libraryId: 'ashokan_edict'
  },
  {
    id: 'dhauli',
    name: 'Dhauli & Tosali',
    modernLocation: 'Khurda District, Odisha, India',
    lat: 20.19, lng: 85.83,
    coordinates: projectCoords(85.83, 20.19),
    period: 'c. 260 BCE',
    level: 6, eraId: 'level_6',
    category: 'monument',
    icon: '🐘',
    significance: 'Site on the Daya River marking the end of the Kalinga War. Here Ashoka carved his Special Kalinga Edicts and an extraordinary rock-hewn elephant emerging from the natural rock cliff.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    architecture: 'Rock-cut monumental sculpture: the earliest rock-cut animal sculpture in India (Ashokan Elephant). Fortified township of Tosali.',
    lifestyle: 'Kalinga farmers and coastal sailors rebuilt their lives following the war, protected by judicial officers ordered to treat all citizens impartially.',
    food: 'Coastal rice, fish, coconut, betel nut, and forest produce.',
    clothing: 'Light cotton wraps, palm leaf hats, bronze bangles.',
    trade: 'Major coastal port gateway for maritime voyagers sailing across the Bay of Bengal to Suvarnabhumi (Southeast Asia).',
    thenAndNow: 'Then: Battlefield where Ashoka embraced non-violence (Ahimsa) and Dhamma. Now: Scenic hill overlooking paddy fields, crowned by the modern Japanese-built Peace Pagoda (Shanti Stupa).',
    artifacts: ['Rock-Cut Ashokan Elephant Sculpture', 'Special Kalinga Rock Edicts I & II', 'Ancient Fortified Tosali Remains', 'Mauryan Terracotta Tiles'],
    libraryId: 'ashokan_edict'
  },

  // 7. GUPTA PERIOD & KNOWLEDGE (Level 7)
  {
    id: 'ujjain',
    name: 'Ujjayini (Ujjain)',
    modernLocation: 'Ujjain District, Madhya Pradesh, India',
    lat: 23.18, lng: 75.78,
    coordinates: projectCoords(75.78, 23.18),
    period: 'c. 4th – 6th century CE',
    level: 7, eraId: 'level_7',
    category: 'city',
    icon: '🔭',
    significance: 'Prime meridian of ancient Indian astronomy situated on the Tropic of Cancer. Capital of King Vikramaditya and center of the Nine Gems (Navaratnas) including astronomer Varahamihira and poet Kalidasa.',
    reconstructionImage: '/assets/atlas/early_trade_routes_map.jpg',
    architecture: 'Fortified city with ramparts, astronomical stone dials, water tanks, and temples dedicated to Mahakala Shiva.',
    lifestyle: 'Merchants, astronomers, and gemstone cutters lived side by side. Astrological observatories calculated solar and lunar eclipses.',
    food: 'Malwa wheat, gram lentils, seasonal fruits, dairy curd, and spices from the Vindhyan plateau.',
    clothing: 'Fine cotton dyed in saffron and indigo; silver jewelry, agate beads cut from Narmada pebbles.',
    trade: 'Crucial highway crossroads: where the trade route from the Gangetic plain branched south to Pratishthana (Dakshinapatha) and west to the ports of Bharuch.',
    thenAndNow: 'Then: Intellectual capital of Indian astronomy and gateway to the Deccan. Now: Historic temple city host to the Simhastha Kumbh Mela, with the 18th-century Jantar Mantar observatory.',
    artifacts: ['Ancient Astronomical Stone Circles', 'Punch-Marked Silver Coins of Avanti', 'Terracotta Sealings of Shrenis', 'Polished Iron Tools'],
    libraryId: 'aryabhata'
  },
  {
    id: 'nalanda',
    name: 'Nalanda Mahavihara',
    modernLocation: 'Nalanda District, Bihar, India',
    lat: 25.13, lng: 85.44,
    coordinates: projectCoords(85.44, 25.13),
    period: 'c. 5th – 12th century CE',
    level: 7, eraId: 'level_7',
    category: 'monument',
    icon: '🏛️',
    significance: 'World’s foremost residential university founded under Gupta patronage. Hosted 10,000 students and 2,000 teachers from China, Korea, Tibet, and Central Asia studying philosophy, medicine, logic, and astronomy.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    architecture: 'Red brick monasteries (viharas) arranged symmetrically facing colossal chaitya temples, featuring lecture halls, dormitories, and multi-tier library buildings (Dharmaganja).',
    lifestyle: 'Rigorous scholarly debates, daily meditation, translation of Sanskrit treatises into Asian languages; funded by revenues of 200 royal endowed villages.',
    food: 'Endowed rice, milk products, lentils, and mangoes from surrounding agricultural estates.',
    clothing: 'Monastic saffron and yellow robes, scholars carrying birch-bark manuscripts and inkhorns.',
    trade: 'Intellectual hub maintained by international donations, including copper-plate charters from the kings of Srivijaya (Sumatra).',
    thenAndNow: 'Then: Towering multi-story brick university described by Chinese pilgrim Xuanzang. Now: A breathtaking UNESCO World Heritage ruin with an adjoining modern revived university.',
    artifacts: ['Devapala Copper-Plate Inscription', 'Gupta Terracotta Sealings', 'Bronze Statues of Bodhisattva Avalokiteshvara', 'Brick Monastery Cell Systems'],
    libraryId: 'aryabhata'
  },

  // 8. INDIAN ARCHITECTURE & ENGINEERING (Level 8)
  {
    id: 'sanchi',
    name: 'Sanchi Great Stupa',
    modernLocation: 'Raisen District, Madhya Pradesh, India',
    lat: 23.48, lng: 77.74,
    coordinates: projectCoords(77.74, 23.48),
    period: 'c. 3rd century BCE – 12th century CE',
    level: 8, eraId: 'level_8',
    category: 'monument',
    icon: '🛕',
    significance: 'Monumental hemispherical stone stupa originally commissioned by Ashoka and expanded under the Sungas and Satavahanas. Famous for its 4 intricately carved stone Toranas depicting early Indian society.',
    reconstructionImage: '/assets/backgrounds/temple.jpg',
    architecture: 'Hemispherical stone dome, upper harmika railing, stone umbrellas (chhatras), and four Toranas carved like wooden joinery.',
    lifestyle: 'The Torana carvings serve as a visual encyclopedia of ancient Indian society: depicting cities, boats, royal processions, farmers, musicians, and floral motifs.',
    food: 'Central Indian grains: wheat, barley, millets, forest fruits, milk, and clarified butter.',
    clothing: 'The stone carvings depict contemporary attire: dhotis with pleated front folds, elaborate turbans, heavy earrings, and waist girdles (mekhala).',
    trade: 'Funded by the ivory carvers’ guild of nearby Vidisha (inscribed on the Southern Gateway: "Carved by the ivory workers of Vedisa").',
    thenAndNow: 'Then: An active hill sanctuary overlooking the merchant city of Vidisha. Now: One of the best-preserved Buddhist monument complexes in the world, UNESCO World Heritage Site.',
    artifacts: ['Great Stupa 1 & Torana Reliefs', 'Ashokan Pillar with 4 Lions', 'Vidisha Ivory Workers Donor Inscriptions', 'Stupa 3 Caskets of Sariputra and Maudgalyayana'],
    libraryId: 'sanchi_stupa'
  },
  {
    id: 'ajanta',
    name: 'Ajanta Caves',
    modernLocation: 'Aurangabad District, Maharashtra, India',
    lat: 20.55, lng: 75.70,
    coordinates: projectCoords(75.70, 20.55),
    period: 'c. 2nd century BCE – 5th century CE',
    level: 8, eraId: 'level_8',
    category: 'monument',
    icon: '🎨',
    significance: '30 rock-cut Buddhist cave monuments carved into a horseshoe cliff along the Waghora River. World-renowned for its classical fresco-mural paintings (tempera) under Vakataka patronage.',
    reconstructionImage: '/assets/backgrounds/temple.jpg',
    architecture: 'Carved directly out of solid Deccan basalt: vaulted chaitya prayer halls with stupas, monastic viharas with monk cells, and pillared verandas.',
    lifestyle: 'Monks meditated and painted during the monsoon retreat (vassa). Master artists used vegetable and mineral pigments (lapis lazuli, ochre, malachite) to paint life-size murals.',
    food: 'Forest fruits, wild honey, and donated meals from nearby merchant caravans passing the trade passes.',
    clothing: 'Frescoes display rich classical clothing: silk garments, diaphanous shawls, pearl strings, and ornate crowns.',
    trade: 'Positioned on the ancient trade route connecting the Deccan plateau to the ports of the Konkan coast.',
    thenAndNow: 'Then: A secluded cliffside spiritual and artistic retreat. Now: UNESCO World Heritage site receiving international travelers admiring classical Indian mural art.',
    artifacts: ['Padmapani and Vajrapani Fresco Murals', 'Colossal Reclining Buddha Sculpture', 'Cave 19 Chaitya Facade', 'Ancient Natural Mineral Pigments'],
    libraryId: 'ajanta_caves'
  },
  {
    id: 'mahabalipuram',
    name: 'Mamallapuram (Mahabalipuram)',
    modernLocation: 'Chengalpattu District, Tamil Nadu, India',
    lat: 12.62, lng: 80.19,
    coordinates: projectCoords(80.19, 12.62),
    period: 'c. 7th – 8th century CE (Pallava)',
    level: 8, eraId: 'level_8',
    category: 'monument',
    icon: '🗿',
    significance: 'Pallava royal port and open-air sculpture complex. Features the seaside Shore Temple, monolithic Pancha Rathas carved from granite boulders, and the colossal "Descent of the Ganga" bas-relief.',
    reconstructionImage: '/assets/backgrounds/temple.jpg',
    architecture: 'Transition from rock-cut cave shrines to monolithic stone chariots (rathas) and the earliest structural granite temples in South India.',
    lifestyle: 'Bustling maritime harbor where Pallava naval fleets set sail for Southeast Asia alongside master granite sculptors chiseling mythological wonders.',
    food: 'Coastal rice, fish, coconut, mangoes, and seafood.',
    clothing: 'Fine cotton garments, pearl necklaces, and tall conical Pallava crowns depicted in royal portraits.',
    trade: 'Key port connecting South India to Sri Lanka and the Malay Peninsula; Roman coins and Chinese pottery fragments found here.',
    thenAndNow: 'Then: Thriving port city with ocean-facing lighthouses and shrines. Now: UNESCO World Heritage tourist destination celebrated for granite carving traditions.',
    artifacts: ['Descent of the Ganga Colossal Rock Relief', 'Monolithic Pancha Rathas', 'Structural Shore Temple', 'Krishna’s Butter Ball Monolith'],
    libraryId: 'bronze_statue'
  },

  // 9. INDIAN CULTURAL TRADITIONS (Level 9)
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    modernLocation: 'Varanasi District, Uttar Pradesh, India',
    lat: 25.32, lng: 82.97,
    coordinates: projectCoords(82.97, 25.32),
    period: 'Continuous from c. 1000 BCE',
    level: 9, eraId: 'level_9',
    category: 'city',
    icon: '🛕',
    significance: 'One of the world’s oldest continually inhabited cities. Renowned for its crescent-shaped Ganga riverfront ghats, classical music gharanas, Sanskrit academies, and Kashi silk weaving.',
    reconstructionImage: '/assets/backgrounds/city.jpg',
    architecture: 'Crescent-shaped riverfront stone steps (ghats), stone pavilions, narrow paved lanes (galis) designed to keep shaded during hot summers.',
    lifestyle: 'Daily dawn rituals on the Ganga, sacred temple bells, music recitals, master weavers operating wooden handlooms creating Kashi silk.',
    food: 'Barley, rice, milk sweets (pedas, kheer), river water, spiced lentils, and betel leaf (paan).',
    clothing: 'Legendary Kashi silken robes (Kauseya) famed throughout Buddhist, Jain, and Hindu scriptures for their featherlight softness.',
    trade: 'Major commercial river port where cargo boats traded between the upper and lower Ganga basins.',
    thenAndNow: 'Then: Celebrated spiritual and trade metropolis of ancient India. Now: Cultural and spiritual capital of India, renowned worldwide for its vibrant living heritage.',
    artifacts: ['Northern Black Polished Ware (NBPW)', 'Iron Smelting Remains', 'Ivory Haircombs and Dice', 'Ancient Terracotta Mother Goddesses'],
    libraryId: 'punch_marked_coin'
  },

  // 10. CHOLA & REGIONAL CIVILIZATIONS (Level 10)
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    modernLocation: 'Thanjavur District, Tamil Nadu, India',
    lat: 10.79, lng: 79.14,
    coordinates: projectCoords(79.14, 10.79),
    period: 'c. 9th – 13th century CE',
    level: 10, eraId: 'level_10',
    category: 'capital',
    icon: '🛕',
    significance: 'Imperial capital of the Cholas under Rajaraja I. Home to the monumental Brihadisvara Temple (completed 1010 CE), constructed entirely of granite with a 216-foot vimana and an 80-ton monolithic cupola.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    architecture: 'Dravidian temple architecture: axial layout with towering vimanas, pillared mukhamandapas, massive bronze casting workshops, and granaries.',
    lifestyle: 'Temple served as community economic engine: employing hundreds of musicians, classical dancers (Devadasis), accountants, flower-garland makers, and bronze casters.',
    food: 'Rich Kaveri delta harvest: multiple annual crops of samba rice, plantains, coconuts, sesame oil, and tamarind rasam.',
    clothing: 'Fine silk (pattu) and unbleached cotton dhotis with gold zari borders; heavy gold necklaces, pearl strings, and sacred rudraksha beads.',
    trade: 'Merchant guilds (Ayyavole 500, Manigramam) directed international trade across South India and dispatched delegations to China.',
    thenAndNow: 'Then: Fortified imperial palace and grand temple capital of South India. Now: The cultural heart of Tamil Nadu, celebrated for Tanjore paintings, bronze sculptures, and classical music.',
    artifacts: ['Granite Vimana & Monolithic 80-ton Shikhara', 'Chola Fresco Paintings on Inner Sanctorum Walls', 'Bronze Nataraja Lord of Cosmic Dance', 'Inscribed Donor Walls of Rajaraja I'],
    libraryId: 'brihadisvara_temple'
  },
  {
    id: 'gangaikonda_cholapuram',
    name: 'Gangaikonda Cholapuram',
    modernLocation: 'Ariyalur District, Tamil Nadu, India',
    lat: 11.20, lng: 79.45,
    coordinates: projectCoords(79.45, 11.20),
    period: 'c. 1025 – 1279 CE',
    level: 10, eraId: 'level_10',
    category: 'capital',
    icon: '👑',
    significance: 'Founded by Rajendra Chola I to celebrate his victorious military campaign to the Ganga River. Features a massive granite temple with gentle curved contours and the colossal 22 km Cholagangam reservoir.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    architecture: 'Curvilinear vimana rising 180 feet, surrounded by fortified palaces and the vast "Liquid Pillar of Victory" reservoir filled with sacred Ganga waters.',
    lifestyle: 'Served as royal command headquarters coordinating both inland agricultural expansion and naval expeditionary fleets across the Bay of Bengal.',
    food: 'Delta paddy rice, pulses, fresh river fish, mangoes, sugarcane, and coconut milk.',
    clothing: 'Finest handwoven textiles, armlets, pearl chains, and bronze insignias bearing the Chola royal tiger crest.',
    trade: 'Overseas tribute and trade goods from Srivijaya, Kadaram, and China entered through royal supply routes.',
    thenAndNow: 'Then: A grand royal city celebrating an empire stretching from the Ganga to the Indonesian archipelago. Now: A peaceful rural UNESCO World Heritage temple surrounded by green fields.',
    artifacts: ['Sculpture of Shiva Crowning King Rajendra I', 'Chola Bronze Parvati', 'Cholagangam Ancient Embankment', 'Tamil & Grantha Inscriptions'],
    libraryId: 'chola_bronze'
  },
  {
    id: 'nagapattinam',
    name: 'Nagapattinam',
    modernLocation: 'Nagapattinam District, Tamil Nadu, India',
    lat: 10.77, lng: 79.84,
    coordinates: projectCoords(79.84, 10.77),
    period: 'c. 9th – 13th century CE',
    level: 10, eraId: 'level_10',
    category: 'port',
    icon: '⛵',
    significance: 'The premier oceanic naval and merchant port of the Chola Empire. Housed the Chudamani Vihara, a famous Buddhist monastery patronized by the Srivijayan King of Sumatra with royal Chola copper-plate charters.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    architecture: 'Lighthouse towers, deep-water wooden docks, warehouses, Buddhist viharas, and Hindu coastal shrines.',
    lifestyle: 'Multicultural seaport population: Tamil sailors, Chinese merchants, Arab navigators, and Indonesian monks lived in harmony under royal protection.',
    food: 'Seafood, coastal rice, coconut, exotic spices (cloves, cardamom, pepper), and dried betel nuts.',
    clothing: 'Sailors wore practical indigo-dyed cotton wraps; merchants wore silks and carried foreign silver coinage and Chinese porcelain.',
    trade: 'Primary launch port for merchant guilds sailing across the Bay of Bengal to the Malacca Straits, Sumatra, and Canton/Guangzhou.',
    thenAndNow: 'Then: The international naval capital connecting India to maritime Southeast Asia. Now: A busy coastal fishing port and district headquarters on the Bay of Bengal.',
    artifacts: ['Chola-Period Bronze Buddha Hoards (over 350 bronzes)', 'Leiden Copper Plate Charters of Rajaraja & Rajendra', 'Chinese Song Dynasty Coins', 'Glazed Celadon Ceramics'],
    libraryId: 'chola_maritime'
  },

  // 11. VIJAYANAGARA & MEDIEVAL HERITAGE (Level 11)
  {
    id: 'hampi_vijayanagara',
    name: 'Hampi (Vijayanagara)',
    modernLocation: 'Vijayanagara District, Karnataka, India',
    lat: 15.33, lng: 76.46,
    coordinates: projectCoords(76.46, 15.33),
    period: 'c. 1336 – 1565 CE',
    level: 11, eraId: 'level_11',
    category: 'capital',
    icon: '💎',
    significance: 'Sprawling capital of the Vijayanagara Empire on the Tungabhadra River. Renowned for the Virupaksha Temple, musical-pillared Vittala Temple with its stone chariot, royal elephant stables, and international gemstone bazaars.',
    reconstructionImage: '/assets/backgrounds/city.jpg',
    architecture: 'Massive granite boulder engineering: dry-stone fortification walls, musical pillared halls, stone aqueducts, and stepped tanks (Pushkarini).',
    lifestyle: 'Cosmopolitan metropolis described by Portuguese traveler Domingo Paes as comparable in size to Rome. Diamond merchants weighed precious gems openly in street bazaars.',
    food: 'Rice, ragi, pulses, fresh coconuts, mangoes, river fish, mutton, and spiced butter dishes.',
    clothing: 'Fine silks with gold threads, jewel-encrusted turbans, and fragrant sandalwood perfumes.',
    trade: 'International trade nexus importing Arabian and Persian warhorses through west-coast ports like Bhatkal; exported spices, cotton textiles, and diamonds.',
    thenAndNow: 'Then: One of the largest and wealthiest cities in the world during the 15th-16th centuries. Now: An extraordinary UNESCO World Heritage open-air museum set among breathtaking boulder landscapes.',
    artifacts: ['Monolithic Stone Chariot of Vittala Temple', 'Ugra Narasimha Colossal Monolith', 'Lotus Mahal Islamic-Style Arches', 'Gold Pagoda Coins (Varahas)'],
    libraryId: 'stone_chariot'
  },

  // 12. STORIES, LITERATURE & FOLK ARTS (Level 12)
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    modernLocation: 'Ayodhya District, Uttar Pradesh, India',
    lat: 26.80, lng: 82.20,
    coordinates: projectCoords(82.20, 26.80),
    period: 'c. 1000 BCE – Present',
    level: 12, eraId: 'level_12',
    category: 'city',
    icon: '📜',
    significance: 'Ancient city on the sacred Sarayu River celebrated in the Ramayana epic as the capital of the Ikshvaku dynasty and birthplace of Rama. A focal point for pan-Asian storytelling traditions.',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    architecture: 'Riverfront pavilions, ancient brick mounds, and stepped ghats along the Sarayu River.',
    lifestyle: 'Scholars, bards, and poets recited epic verses; artisans crafted musical instruments and terracotta idols.',
    food: 'River valley wheat, lentils, ghee, and traditional sweets.',
    clothing: 'Draped cotton dhotis with sacred shawls and flower garlands.',
    trade: 'River trade nexus on the Sarayu River flowing into the Ganga.',
    thenAndNow: 'Then: Mythic capital of solar kings recorded in Sanskrit epics. Now: Major international cultural and pilgrimage center.',
    artifacts: ['Northern Black Polished Ware Layers', 'Gupta Inscribed Bricks', 'Terracotta Sealings of Ancient Guilds'],
    libraryId: 'punch_marked_coin'
  },

  // 13. TRADITIONAL INDIAN GAMES (Level 13)
  {
    id: 'kannauj_chaturanga',
    name: 'Kanyakubja (Kannauj)',
    modernLocation: 'Kannauj District, Uttar Pradesh, India',
    lat: 27.05, lng: 79.91,
    coordinates: projectCoords(79.91, 27.05),
    period: 'c. 6th – 11th century CE',
    level: 13, eraId: 'level_13',
    category: 'city',
    icon: '♟️',
    significance: 'Imperial capital under Emperor Harsha. Historical texts record the widespread play of Chaturanga (four-division military board game: infantry, cavalry, elephants, chariots) which evolved into global Chess.',
    reconstructionImage: '/assets/backgrounds/city.jpg',
    architecture: 'Fortified riverfront palaces, Buddhist stupas, perfumed botanical distillation gardens, and public game arenas.',
    lifestyle: 'Courtiers, generals, and scholars tested strategic thinking over 64-square Ashtapada boards without dice.',
    food: 'Ganga basin rice, sugarcane, milk delicacies, and perfumed rose waters.',
    clothing: 'Embroidered silk jackets, pearls, and royal turbans.',
    trade: 'World capital of perfume and essential oil distillation (Attar), traded along the Uttarapatha.',
    thenAndNow: 'Then: Grand imperial capital of Emperor Harsha. Now: India’s historic perfume capital preserving traditional deg-bhapka distillation.',
    artifacts: ['Ancient Bone and Terracotta Chess Pieces', 'Terracotta Game Disks', 'Harsha Era Sealings and Coins'],
    libraryId: 'punch_marked_coin'
  },

  // 14. HERITAGE PRESERVATION (Level 14)
  {
    id: 'delhi_heritage',
    name: 'Indraprastha & Delhi Heritage Core',
    modernLocation: 'National Capital Territory of Delhi, India',
    lat: 28.61, lng: 77.21,
    coordinates: projectCoords(77.21, 28.61),
    period: 'Ancient to Present',
    level: 14, eraId: 'level_14',
    category: 'monument',
    icon: '🏛️',
    significance: 'Continuous multilayered capital spanning ancient Indraprastha (Purana Qila), the Mauryan Ashokan Rock Edict at Srinivaspuri, the 5th-century Gupta Iron Pillar at Mehrauli, and national conservation archives.',
    reconstructionImage: '/assets/backgrounds/dashboard.jpg',
    architecture: 'Superimposed layers of Indian architecture: PGW ancient ramparts, medieval stone forts, Indo-Islamic arches, and national museum repositories.',
    lifestyle: 'Headquarters of the Archaeological Survey of India (ASI) managing heritage stewardship, laser mapping, and museum conservation.',
    food: 'Cosmopolitan North Indian cuisine blending ancient grains with royal culinary arts.',
    clothing: 'Modern and traditional attire representing all states of India.',
    trade: 'National hub of cultural exchange, scholarly libraries, and international heritage diplomacy.',
    thenAndNow: 'Then: Strategic Yamuna river crossing connecting the Punjab plains to the Gangetic basin. Now: India’s vibrant capital preserving centuries of living history.',
    artifacts: ['Purana Qila Painted Grey Ware Layers', 'Srinivaspuri Ashokan Minor Rock Edict', 'Mehrauli Rust-Resistant Iron Pillar (98% Pure Wrought Iron)'],
    libraryId: 'ashokan_edict'
  }
];

// REAL RIVER COURSES TRACED POINT-BY-POINT
// Each point is converted using projectCoords(lng, lat)
export const ATLAS_RIVERS = [
  {
    id: 'indus_river',
    name: 'Indus River (Sindhu)',
    color: '#38BDF8',
    d: `M ${projectCoords(81.2, 31.1).x},${projectCoords(81.2, 31.1).y} ` +
       `L ${projectCoords(78.5, 33.5).x},${projectCoords(78.5, 33.5).y} ` +
       `L ${projectCoords(75.8, 35.3).x},${projectCoords(75.8, 35.3).y} ` +
       `L ${projectCoords(74.5, 35.8).x},${projectCoords(74.5, 35.8).y} ` +
       `L ${projectCoords(72.5, 34.2).x},${projectCoords(72.5, 34.2).y} ` +
       `L ${projectCoords(71.5, 32.5).x},${projectCoords(71.5, 32.5).y} ` +
       `L ${projectCoords(70.8, 30.0).x},${projectCoords(70.8, 30.0).y} ` +
       `L ${projectCoords(68.9, 27.5).x},${projectCoords(68.9, 27.5).y} ` +
       `L ${projectCoords(68.1, 25.4).x},${projectCoords(68.1, 25.4).y} ` +
       `L ${projectCoords(67.4, 24.1).x},${projectCoords(67.4, 24.1).y}`,
    importance: 'The lifeline of the Indus Civilization flowing 3,180 km from Tibetan glaciers to the Arabian Sea.'
  },
  {
    id: 'jhelum_river',
    name: 'Jhelum River (Vitasta)',
    color: '#60A5FA',
    d: `M ${projectCoords(75.2, 33.7).x},${projectCoords(75.2, 33.7).y} ` +
       `L ${projectCoords(74.3, 34.1).x},${projectCoords(74.3, 34.1).y} ` +
       `L ${projectCoords(73.5, 33.2).x},${projectCoords(73.5, 33.2).y} ` +
       `L ${projectCoords(72.1, 31.2).x},${projectCoords(72.1, 31.2).y}`,
    importance: 'Ancient Vitasta flowing through Kashmir and western Punjab.'
  },
  {
    id: 'chenab_river',
    name: 'Chenab River (Asikni)',
    color: '#60A5FA',
    d: `M ${projectCoords(77.5, 32.5).x},${projectCoords(77.5, 32.5).y} ` +
       `L ${projectCoords(75.5, 33.2).x},${projectCoords(75.5, 33.2).y} ` +
       `L ${projectCoords(73.8, 32.2).x},${projectCoords(73.8, 32.2).y} ` +
       `L ${projectCoords(71.8, 30.5).x},${projectCoords(71.8, 30.5).y}`,
    importance: 'Drains Himachal Pradesh and central Punjab plains.'
  },
  {
    id: 'ravi_river',
    name: 'Ravi River (Purushni)',
    color: '#60A5FA',
    d: `M ${projectCoords(76.5, 32.3).x},${projectCoords(76.5, 32.3).y} ` +
       `L ${projectCoords(74.8, 31.8).x},${projectCoords(74.8, 31.8).y} ` +
       `L ${projectCoords(72.9, 30.6).x},${projectCoords(72.9, 30.6).y} ` +
       `L ${projectCoords(71.8, 30.4).x},${projectCoords(71.8, 30.4).y}`,
    importance: 'Flowed past the ancient citadel and granaries of Harappa.'
  },
  {
    id: 'sutlej_river',
    name: 'Sutlej River (Shutudri)',
    color: '#60A5FA',
    d: `M ${projectCoords(81.3, 30.9).x},${projectCoords(81.3, 30.9).y} ` +
       `L ${projectCoords(78.5, 31.5).x},${projectCoords(78.5, 31.5).y} ` +
       `L ${projectCoords(76.5, 31.2).x},${projectCoords(76.5, 31.2).y} ` +
       `L ${projectCoords(74.5, 30.8).x},${projectCoords(74.5, 30.8).y} ` +
       `L ${projectCoords(71.1, 29.3).x},${projectCoords(71.1, 29.3).y}`,
    importance: 'The southern Punjab river connecting to the Indus confluence.'
  },
  {
    id: 'ghaggar_hakra',
    name: 'Ghaggar-Hakra (Ancient Saraswati Course)',
    color: '#38BDF8',
    isPaleo: true,
    d: `M ${projectCoords(77.2, 30.5).x},${projectCoords(77.2, 30.5).y} ` +
       `L ${projectCoords(75.5, 29.8).x},${projectCoords(75.5, 29.8).y} ` +
       `L ${projectCoords(74.1, 29.5).x},${projectCoords(74.1, 29.5).y} ` +
       `L ${projectCoords(72.5, 28.8).x},${projectCoords(72.5, 28.8).y} ` +
       `L ${projectCoords(71.0, 27.8).x},${projectCoords(71.0, 27.8).y} ` +
       `L ${projectCoords(69.8, 25.5).x},${projectCoords(69.8, 25.5).y} ` +
       `L ${projectCoords(69.0, 24.0).x},${projectCoords(69.0, 24.0).y}`,
    importance: 'The ancient perennial river along which hundreds of Harappan sites (Kalibangan, Banawali, Ganweriwala) thrived before it desiccated.'
  },
  {
    id: 'ganga_river',
    name: 'Ganga River',
    color: '#38BDF8',
    d: `M ${projectCoords(78.9, 31.0).x},${projectCoords(78.9, 31.0).y} ` +
       `L ${projectCoords(78.2, 30.0).x},${projectCoords(78.2, 30.0).y} ` +
       `L ${projectCoords(79.5, 28.0).x},${projectCoords(79.5, 28.0).y} ` +
       `L ${projectCoords(81.9, 25.4).x},${projectCoords(81.9, 25.4).y} ` +
       `L ${projectCoords(83.0, 25.3).x},${projectCoords(83.0, 25.3).y} ` +
       `L ${projectCoords(85.1, 25.6).x},${projectCoords(85.1, 25.6).y} ` +
       `L ${projectCoords(87.9, 25.2).x},${projectCoords(87.9, 25.2).y} ` +
       `L ${projectCoords(88.2, 23.5).x},${projectCoords(88.2, 23.5).y} ` +
       `L ${projectCoords(89.5, 22.0).x},${projectCoords(89.5, 22.0).y}`,
    importance: 'The sacred lifeline of the Gangetic plain supporting the Second Urbanization, Mauryan Empire, and Gupta Renaissance.'
  },
  {
    id: 'yamuna_river',
    name: 'Yamuna River',
    color: '#60A5FA',
    d: `M ${projectCoords(78.4, 31.0).x},${projectCoords(78.4, 31.0).y} ` +
       `L ${projectCoords(77.2, 28.6).x},${projectCoords(77.2, 28.6).y} ` +
       `L ${projectCoords(77.7, 27.5).x},${projectCoords(77.7, 27.5).y} ` +
       `L ${projectCoords(79.2, 26.5).x},${projectCoords(79.2, 26.5).y} ` +
       `L ${projectCoords(81.9, 25.4).x},${projectCoords(81.9, 25.4).y}`,
    importance: 'Flows past Indraprastha and Mathura to merge with the Ganga at Prayag.'
  },
  {
    id: 'narmada_river',
    name: 'Narmada River',
    color: '#38BDF8',
    d: `M ${projectCoords(81.8, 22.7).x},${projectCoords(81.8, 22.7).y} ` +
       `L ${projectCoords(79.0, 23.0).x},${projectCoords(79.0, 23.0).y} ` +
       `L ${projectCoords(77.5, 22.8).x},${projectCoords(77.5, 22.8).y} ` +
       `L ${projectCoords(75.5, 22.2).x},${projectCoords(75.5, 22.2).y} ` +
       `L ${projectCoords(72.7, 21.6).x},${projectCoords(72.7, 21.6).y}`,
    importance: 'Flows westward between the Vindhya and Satpura ranges into the Gulf of Khambhat.'
  },
  {
    id: 'tapi_river',
    name: 'Tapi River',
    color: '#60A5FA',
    d: `M ${projectCoords(78.2, 21.8).x},${projectCoords(78.2, 21.8).y} ` +
       `L ${projectCoords(76.0, 21.3).x},${projectCoords(76.0, 21.3).y} ` +
       `L ${projectCoords(73.5, 21.1).x},${projectCoords(73.5, 21.1).y} ` +
       `L ${projectCoords(72.7, 21.1).x},${projectCoords(72.7, 21.1).y}`,
    importance: 'Parallel westward river flowing into Surat and the Arabian Sea.'
  },
  {
    id: 'godavari_river',
    name: 'Godavari River',
    color: '#38BDF8',
    d: `M ${projectCoords(73.5, 19.9).x},${projectCoords(73.5, 19.9).y} ` +
       `L ${projectCoords(75.3, 19.5).x},${projectCoords(75.3, 19.5).y} ` +
       `L ${projectCoords(77.5, 18.9).x},${projectCoords(77.5, 18.9).y} ` +
       `L ${projectCoords(79.8, 18.8).x},${projectCoords(79.8, 18.8).y} ` +
       `L ${projectCoords(81.8, 16.9).x},${projectCoords(81.8, 16.9).y}`,
    importance: 'Dakshina Ganga flowing across Maharashtra, Telangana, and Andhra Pradesh into the Bay of Bengal.'
  },
  {
    id: 'krishna_river',
    name: 'Krishna River',
    color: '#38BDF8',
    d: `M ${projectCoords(73.7, 17.9).x},${projectCoords(73.7, 17.9).y} ` +
       `L ${projectCoords(75.8, 16.5).x},${projectCoords(75.8, 16.5).y} ` +
       `L ${projectCoords(78.0, 16.2).x},${projectCoords(78.0, 16.2).y} ` +
       `L ${projectCoords(80.5, 16.5).x},${projectCoords(80.5, 16.5).y} ` +
       `L ${projectCoords(81.1, 16.2).x},${projectCoords(81.1, 16.2).y}`,
    importance: 'Nurtured Deccan civilizations and the Nagarjunakonda Buddhist center.'
  },
  {
    id: 'tungabhadra_river',
    name: 'Tungabhadra River',
    color: '#60A5FA',
    d: `M ${projectCoords(75.5, 14.1).x},${projectCoords(75.5, 14.1).y} ` +
       `L ${projectCoords(76.5, 15.3).x},${projectCoords(76.5, 15.3).y} ` +
       `L ${projectCoords(77.5, 15.8).x},${projectCoords(77.5, 15.8).y} ` +
       `L ${projectCoords(78.0, 16.0).x},${projectCoords(78.0, 16.0).y}`,
    importance: 'The defensive and agricultural lifeline of the capital city of Vijayanagara (Hampi).'
  },
  {
    id: 'kaveri_river',
    name: 'Kaveri River',
    color: '#38BDF8',
    d: `M ${projectCoords(75.5, 12.4).x},${projectCoords(75.5, 12.4).y} ` +
       `L ${projectCoords(77.2, 12.1).x},${projectCoords(77.2, 12.1).y} ` +
       `L ${projectCoords(78.7, 10.9).x},${projectCoords(78.7, 10.9).y} ` +
       `L ${projectCoords(79.8, 11.1).x},${projectCoords(79.8, 11.1).y}`,
    importance: 'Mother river of the Chola Empire; its intensely irrigated delta sustained monumental temple cities.'
  }
];

// REAL HISTORICAL TRADE ROUTES
export const ATLAS_TRADE_ROUTES = [
  {
    id: 'uttarapatha',
    name: 'Uttarāpatha (The Northern Royal Highway)',
    eraIds: ['level_5', 'level_6', 'level_7', 'all'],
    color: '#F59E0B',
    d: `M ${projectCoords(72.79, 33.74).x},${projectCoords(72.79, 33.74).y} ` +
       `L ${projectCoords(77.21, 28.61).x},${projectCoords(77.21, 28.61).y} ` +
       `L ${projectCoords(77.67, 27.50).x},${projectCoords(77.67, 27.50).y} ` +
       `L ${projectCoords(82.97, 25.32).x},${projectCoords(82.97, 25.32).y} ` +
       `L ${projectCoords(85.14, 25.61).x},${projectCoords(85.14, 25.61).y} ` +
       `L ${projectCoords(87.92, 22.30).x},${projectCoords(87.92, 22.30).y}`,
    stops: ['Taxila', 'Indraprastha', 'Mathura', 'Varanasi', 'Pataliputra', 'Tamralipti'],
    description: 'The ancient trans-subcontinental trunk highway connecting Gandhara in the northwest to Tamralipti port on the Bay of Bengal.'
  },
  {
    id: 'dakshinapatha',
    name: 'Dakṣiṇāpatha (The Southern Trade Highway)',
    eraIds: ['level_5', 'level_6', 'level_7', 'all'],
    color: '#EAB308',
    d: `M ${projectCoords(82.97, 25.32).x},${projectCoords(82.97, 25.32).y} ` +
       `L ${projectCoords(77.74, 23.48).x},${projectCoords(77.74, 23.48).y} ` +
       `L ${projectCoords(75.78, 23.18).x},${projectCoords(75.78, 23.18).y} ` +
       `L ${projectCoords(75.40, 19.50).x},${projectCoords(75.40, 19.50).y} ` +
       `L ${projectCoords(76.46, 15.33).x},${projectCoords(76.46, 15.33).y} ` +
       `L ${projectCoords(79.14, 10.79).x},${projectCoords(79.14, 10.79).y}`,
    stops: ['Varanasi', 'Vidisha', 'Ujjain', 'Pratishthana', 'Hampi', 'Thanjavur'],
    description: 'The great southern trade route linking the Gangetic valley through Malwa across the Vindhyas to the Deccan and southern ports.'
  },
  {
    id: 'indus_maritime',
    name: 'Indus Maritime & Gulf Coastal Network',
    eraIds: ['level_3', 'all'],
    color: '#38BDF8',
    d: `M ${projectCoords(62.3, 25.1).x},${projectCoords(62.3, 25.1).y} ` +
       `L ${projectCoords(67.0, 24.8).x},${projectCoords(67.0, 24.8).y} ` +
       `L ${projectCoords(70.22, 23.89).x},${projectCoords(70.22, 23.89).y} ` +
       `L ${projectCoords(72.25, 22.52).x},${projectCoords(72.25, 22.52).y}`,
    stops: ['Sutkagen Dor', 'Balakot', 'Dholavira', 'Lothal'],
    description: 'Harappan maritime routes connecting Gujarat and Makran to Dilmun (Bahrain) and Ur in Mesopotamia.'
  },
  {
    id: 'chola_oceanic',
    name: 'Chola Trans-Oceanic Bay of Bengal Route',
    eraIds: ['level_10', 'all'],
    color: '#06B6D4',
    d: `M ${projectCoords(79.84, 10.77).x},${projectCoords(79.84, 10.77).y} ` +
       `L ${projectCoords(85.0, 9.0).x},${projectCoords(85.0, 9.0).y} ` +
       `L ${projectCoords(92.5, 8.5).x},${projectCoords(92.5, 8.5).y} ` +
       `L 920,680 L 960,780`,
    stops: ['Nagapattinam', 'Nicobar Islands', 'Kadaram (Kedah)', 'Srivijaya (Palembang)'],
    description: 'Chola naval and merchant shipping highway crossing the Bay of Bengal through the Malacca Strait to Southeast Asia and China.'
  }
];

// HISTORICAL TERRITORIES & REGIONAL EXTENTS
export const ATLAS_TERRITORIES = [
  {
    id: 'gupta_realm',
    name: 'Gupta Empire Sovereign Extent',
    eraIds: ['level_7', 'all'],
    color: 'rgba(168, 85, 247, 0.16)',
    borderColor: '#A855F7',
    points: `${projectCoords(70.0, 24.0).x},${projectCoords(70.0, 24.0).y} ` +
            `${projectCoords(72.0, 31.0).x},${projectCoords(72.0, 31.0).y} ` +
            `${projectCoords(78.0, 30.0).x},${projectCoords(78.0, 30.0).y} ` +
            `${projectCoords(88.5, 26.5).x},${projectCoords(88.5, 26.5).y} ` +
            `${projectCoords(89.0, 22.0).x},${projectCoords(89.0, 22.0).y} ` +
            `${projectCoords(83.0, 21.0).x},${projectCoords(83.0, 21.0).y} ` +
            `${projectCoords(75.5, 21.5).x},${projectCoords(75.5, 21.5).y} ` +
            `${projectCoords(71.0, 22.5).x},${projectCoords(71.0, 22.5).y}`,
    description: 'Golden Age imperial domain under Samudragupta and Chandragupta II Vikramaditya, spanning from the Arabian Sea across Malwa to the Bengal delta.'
  },
  {
    id: 'vijayanagara_realm',
    name: 'Vijayanagara Empire (Karnataka Samrajya)',
    eraIds: ['level_11', 'all'],
    color: 'rgba(249, 115, 22, 0.18)',
    borderColor: '#F97316',
    points: `${projectCoords(74.0, 15.8).x},${projectCoords(74.0, 15.8).y} ` +
            `${projectCoords(76.5, 16.5).x},${projectCoords(76.5, 16.5).y} ` +
            `${projectCoords(80.5, 16.0).x},${projectCoords(80.5, 16.0).y} ` +
            `${projectCoords(80.0, 10.0).x},${projectCoords(80.0, 10.0).y} ` +
            `${projectCoords(77.5, 8.2).x},${projectCoords(77.5, 8.2).y} ` +
            `${projectCoords(76.0, 10.0).x},${projectCoords(76.0, 10.0).y} ` +
            `${projectCoords(74.5, 13.0).x},${projectCoords(74.5, 13.0).y}`,
    description: 'The great South Indian medieval empire that protected indigenous culture, architecture, and international commerce across the southern peninsula.'
  },

  {
    id: 'harappan_domain',
    name: 'Mature Harappan Cultural Sphere',
    eraIds: ['level_3', 'all'],
    color: 'rgba(217, 164, 65, 0.16)',
    borderColor: '#D9A441',
    // Polygons traced using real coordinates: Makran -> Punjab -> Haryana -> Gujarat
    points: `${projectCoords(62.0, 25.5).x},${projectCoords(62.0, 25.5).y} ` +
            `${projectCoords(66.5, 28.5).x},${projectCoords(66.5, 28.5).y} ` +
            `${projectCoords(71.0, 32.5).x},${projectCoords(71.0, 32.5).y} ` +
            `${projectCoords(76.5, 30.5).x},${projectCoords(76.5, 30.5).y} ` +
            `${projectCoords(77.5, 28.5).x},${projectCoords(77.5, 28.5).y} ` +
            `${projectCoords(73.5, 22.0).x},${projectCoords(73.5, 22.0).y} ` +
            `${projectCoords(70.0, 21.0).x},${projectCoords(70.0, 21.0).y} ` +
            `${projectCoords(67.5, 23.5).x},${projectCoords(67.5, 23.5).y}`,
    description: 'Over 1 million square kilometers characterized by uniform brick ratios (1:2:4), steatite seals, and public hygiene.'
  },
  {
    id: 'magadha_core',
    name: 'Magadha Realm & Gangetic States',
    eraIds: ['level_5', 'all'],
    color: 'rgba(34, 197, 94, 0.16)',
    borderColor: '#22C55E',
    points: `${projectCoords(81.5, 26.5).x},${projectCoords(81.5, 26.5).y} ` +
            `${projectCoords(86.5, 26.5).x},${projectCoords(86.5, 26.5).y} ` +
            `${projectCoords(87.5, 24.0).x},${projectCoords(87.5, 24.0).y} ` +
            `${projectCoords(83.0, 23.5).x},${projectCoords(83.0, 23.5).y} ` +
            `${projectCoords(81.0, 25.0).x},${projectCoords(81.0, 25.0).y}`,
    description: 'The core realm of Magadha along the fertile Ganga-Son basin, boasting abundant iron mines, elephants, and trade crossroads.'
  },
  {
    id: 'mauryan_empire',
    name: 'Mauryan Pan-Indian Empire',
    eraIds: ['level_6', 'all'],
    color: 'rgba(234, 179, 8, 0.16)',
    borderColor: '#EAB308',
    points: `${projectCoords(66.0, 25.0).x},${projectCoords(66.0, 25.0).y} ` +
            `${projectCoords(69.0, 32.0).x},${projectCoords(69.0, 32.0).y} ` +
            `${projectCoords(73.0, 35.0).x},${projectCoords(73.0, 35.0).y} ` +
            `${projectCoords(79.0, 31.0).x},${projectCoords(79.0, 31.0).y} ` +
            `${projectCoords(88.0, 27.0).x},${projectCoords(88.0, 27.0).y} ` +
            `${projectCoords(88.0, 22.0).x},${projectCoords(88.0, 22.0).y} ` +
            `${projectCoords(85.5, 19.0).x},${projectCoords(85.5, 19.0).y} ` +
            `${projectCoords(77.5, 13.5).x},${projectCoords(77.5, 13.5).y} ` +
            `${projectCoords(74.5, 15.0).x},${projectCoords(74.5, 15.0).y} ` +
            `${projectCoords(72.5, 20.0).x},${projectCoords(72.5, 20.0).y} ` +
            `${projectCoords(68.5, 24.0).x},${projectCoords(68.5, 24.0).y}`,
    description: 'Approximate extent of the Mauryan Empire under Ashoka (c. 250 BCE). Bordered sovereign Tamil kingdoms (Cholas, Pandyas, Cheras) in the deep south.'
  },
  {
    id: 'chola_heartland',
    name: 'Chola Imperial Heartland (Cholamandalam)',
    eraIds: ['level_10', 'all'],
    color: 'rgba(56, 189, 248, 0.22)',
    borderColor: '#38BDF8',
    points: `${projectCoords(78.0, 12.0).x},${projectCoords(78.0, 12.0).y} ` +
            `${projectCoords(80.2, 12.0).x},${projectCoords(80.2, 12.0).y} ` +
            `${projectCoords(80.0, 9.5).x},${projectCoords(80.0, 9.5).y} ` +
            `${projectCoords(77.5, 9.0).x},${projectCoords(77.5, 9.0).y} ` +
            `${projectCoords(77.5, 11.0).x},${projectCoords(77.5, 11.0).y}`,
    description: 'The fertile Kaveri delta heartland centered around Thanjavur, Gangaikonda Cholapuram, and the port of Nagapattinam.'
  }
];

// RECOGNIZABLE MOUNTAIN RANGES & SURROUNDING SEAS
export const ATLAS_TERRAIN = [
  {
    id: 'himalayas',
    name: 'HIMALAYAS',
    d: `M ${projectCoords(73.5, 35.5).x},${projectCoords(73.5, 35.5).y} ` +
       `Q ${projectCoords(80.0, 30.5).x},${projectCoords(80.0, 30.5).y} ` +
       `${projectCoords(95.0, 28.0).x},${projectCoords(95.0, 28.0).y}`,
    labelX: projectCoords(83.0, 30.0).x,
    labelY: projectCoords(83.0, 30.0).y
  },
  {
    id: 'hindu_kush',
    name: 'HINDU KUSH',
    d: `M ${projectCoords(70.0, 36.5).x},${projectCoords(70.0, 36.5).y} ` +
       `L ${projectCoords(72.0, 34.5).x},${projectCoords(72.0, 34.5).y}`,
    labelX: projectCoords(70.5, 35.5).x,
    labelY: projectCoords(70.5, 35.5).y
  },
  {
    id: 'vindhya_range',
    name: 'VINDHYAS',
    d: `M ${projectCoords(74.0, 22.8).x},${projectCoords(74.0, 22.8).y} ` +
       `L ${projectCoords(81.5, 24.2).x},${projectCoords(81.5, 24.2).y}`,
    labelX: projectCoords(77.5, 23.8).x,
    labelY: projectCoords(77.5, 23.8).y
  },
  {
    id: 'western_ghats',
    name: 'WESTERN GHATS',
    d: `M ${projectCoords(73.5, 20.0).x},${projectCoords(73.5, 20.0).y} ` +
       `Q ${projectCoords(75.0, 14.5).x},${projectCoords(75.0, 14.5).y} ` +
       `${projectCoords(77.5, 8.5).x},${projectCoords(77.5, 8.5).y}`,
    labelX: projectCoords(74.0, 15.0).x,
    labelY: projectCoords(74.0, 15.0).y
  },
  {
    id: 'thar_desert',
    name: 'THAR DESERT',
    d: `M ${projectCoords(70.0, 28.0).x},${projectCoords(70.0, 28.0).y} ` +
       `Q ${projectCoords(73.0, 27.0).x},${projectCoords(73.0, 27.0).y} ` +
       `${projectCoords(71.5, 25.0).x},${projectCoords(71.5, 25.0).y} Z`,
    labelX: projectCoords(71.5, 26.8).x,
    labelY: projectCoords(71.5, 26.8).y
  }
];

// SURROUNDING BODIES OF WATER LABELS
export const ATLAS_SEAS = [
  { name: 'ARABIAN SEA', x: projectCoords(66.0, 17.5).x, y: projectCoords(66.0, 17.5).y },
  { name: 'BAY OF BENGAL', x: projectCoords(88.0, 15.5).x, y: projectCoords(88.0, 15.5).y },
  { name: 'INDIAN OCEAN', x: projectCoords(78.0, 7.0).x, y: projectCoords(78.0, 7.0).y },
  { name: 'GULF OF KUTCH', x: projectCoords(69.4, 22.5).x, y: projectCoords(69.4, 22.5).y },
  { name: 'GULF OF KHAMBHAT', x: projectCoords(72.2, 21.0).x, y: projectCoords(72.2, 21.0).y },
  { name: 'PALK STRAIT', x: projectCoords(79.5, 9.8).x, y: projectCoords(79.5, 9.8).y }
];

// ACCURATE GEOGRAPHICAL SUB-CONTINENT COASTLINE PATH (EQUIDISTANT PROJECTION)
export const SUBCONTINENT_COASTLINE = "M 100.6,348.6 L 128.9,348.6 L 152.5,346.2 L 176,346.2 L 201.9,355.8 L 211.4,358.2 L 220.8,367.7 L 230.2,377.3 L 239.6,379.6 L 253.8,382 L 246.7,391.6 L 258.5,398.7 L 265.6,405.9 L 277.3,404.7 L 291.5,403.5 L 300.9,403.5 L 293.8,413.1 L 275,415.5 L 257.3,419 L 267.9,429.8 L 272.6,434.5 L 282.1,444.1 L 291.5,451.3 L 305.6,456 L 317.4,451.3 L 324.5,441.7 L 331.5,434.5 L 336.2,427.4 L 341,420.2 L 348,427.4 L 350.4,432.2 L 348,444.1 L 348,463.2 L 348,484.7 L 348,499 L 355.1,515.7 L 359.8,544.4 L 366.9,568.2 L 371.6,582.5 L 378.7,596.9 L 385.7,616 L 395.2,642.2 L 402.2,656.5 L 409.3,666.1 L 418.7,682.8 L 425.8,699.5 L 430.5,713.8 L 437.6,737.7 L 444.6,747.3 L 459.9,757.3 L 468.2,747.3 L 474.1,740.1 L 487,730.5 L 501.2,728.2 L 496.5,718.6 L 505.9,711.5 L 514.1,704.3 L 514.1,693.1 L 514.1,678 L 513,666.1 L 520,651.8 L 524.7,637.5 L 522.4,623.1 L 517.7,606.4 L 527.1,580.2 L 544.8,563.9 L 560.1,556.3 L 570.7,545.5 L 595.4,527.6 L 614.3,513.3 L 637.8,489.5 L 654.3,477.5 L 675.5,465.6 L 682.6,439.3 L 703.8,429.8 L 713.2,422.6 L 741.5,429.8 L 765.1,425 L 795.7,417.8 L 809.8,448.9 L 819.3,460.8 L 835.8,425 L 859.3,389.2 L 882.9,341.5 L 913.5,293.7 L 918.2,269.8 L 871.1,267.5 L 824,277 L 788.6,286.5 L 741.5,293.7 L 717.9,286.5 L 670.8,281.8 L 611.9,269.8 L 553,234 L 505.9,210.2 L 447,181.5 L 423.4,143.3 L 458.8,102.7 L 388.1,71.7 L 341,114.7 L 305.6,126.6 L 277.3,162.4 L 246.7,222.1 L 199.6,257.9 L 152.5,293.7 L 100.6,348.6 Z";

// ACCURATE SRI LANKA COASTLINE PATH
export const SRI_LANKA_COASTLINE = "M 523.3,715.7 L 514.1,723.4 L 513,735.3 L 513,759.2 L 514.1,784.7 L 517.7,797.4 L 522.9,805.7 L 531.3,808.8 L 544.1,804.1 L 557.7,785.5 L 557.7,766.4 L 546.7,745.3 L 538.9,730.5 L 523.3,715.7 Z";
