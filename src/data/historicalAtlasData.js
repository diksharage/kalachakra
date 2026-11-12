// Historical Atlas Data for KALACHAKRA
// Geographically accurate coordinates calibrated to SVG ViewBox 0 0 1000 850

export const ATLAS_ERAS = [
  {
    id: 'indus',
    title: 'Indus Valley Civilization',
    dates: 'c. 2600 – 1900 BCE',
    subtitle: 'Mature Harappan Phase: The Bronze Age Urban Revolution',
    levelId: 3,
    color: '#D9A441',
    accent: '#B77B2E',
    banner: '/assets/atlas/harappan_atlas_map.jpg',
    context: 'Urban planning peaks across the Indus and Saraswati/Ghaggar-Hakra river basins with standardized baked-brick cities, covered drainage networks, and vast overseas maritime trade networks.',
    civilizationOverlap: 'While Harappan urban centers flourished in the northwest, contemporary Ahar-Banas (copper-smelting) cultures thrived in Rajasthan, Kayatha in Malwa, and hunter-gatherer and pastoral communities in Central and Southern India.',
    puzzle: {
      id: 'indus-trade-puzzle',
      title: 'Trace the Bronze Age Trade Network',
      prompt: 'Which Harappan port city was equipped with a world-first tidal dockyard and standardized stone weights for overseas sea trade with Dilmun and Mesopotamia?',
      options: [
        { label: 'Lothal on the Gulf of Khambhat', isCorrect: true, explanation: 'Correct! Lothal possessed a sophisticated tidal dock basin, seal warehouse, and bead workshops connected to the Arabian Sea.' },
        { label: 'Kalibangan in northern Rajasthan', isCorrect: false, explanation: 'Kalibangan is famous for furrowed agricultural fields and fire altars, not a tidal seaport.' },
        { label: 'Harappa on the Ravi River', isCorrect: false, explanation: 'Harappa was a colossal inland metropolis with granaries and river transport, but not a tidal dockyard.' }
      ],
      reward: { legacy: 75, knowledge: 50, flint: 2 }
    }
  },
  {
    id: 'mahajanapada',
    title: 'Mahajanapadas & Republics',
    dates: 'c. 600 – 300 BCE',
    subtitle: 'The Second Urbanization & The 16 Great Kingdoms',
    levelId: 5,
    color: '#4ADE80',
    accent: '#16A34A',
    banner: '/assets/atlas/mahajanapadas_map.jpg',
    context: 'The rise of 16 great kingdoms (monarchies like Magadha and Kosala) and democratic republics (Gana-Sanghas like Vajji). Iron tools revolutionized agriculture across the fertile Gangetic plain.',
    civilizationOverlap: 'The Mahajanapadas were centered in the Gangetic basin and northwest, while megalithic burial communities and early Sangam settlements flourished simultaneously in the Deccan and Tamilakam.',
    puzzle: {
      id: 'mahajanapada-capital-puzzle',
      title: 'Strategic Capital of Magadha',
      prompt: 'Which ancient capital of Magadha was surrounded by five natural protective hills before the capital was shifted to Pataliputra on the Ganga?',
      options: [
        { label: 'Rajagriha (Modern Rajgir)', isCorrect: true, explanation: 'Correct! Rajagriha was naturally defended by five hills (Girivraja) before King Udayin established Pataliputra.' },
        { label: 'Ujjayini in Avanti', isCorrect: false, explanation: 'Ujjayini was the capital of the rival kingdom of Avanti, located far to the west.' },
        { label: 'Vaishali in the north', isCorrect: false, explanation: 'Vaishali was the democratic assembly capital of the Vajji confederacy across the Ganga.' }
      ],
      reward: { legacy: 80, knowledge: 60 }
    }
  },
  {
    id: 'mauryan',
    title: 'Mauryan Empire',
    dates: 'c. 325 – 185 BCE',
    subtitle: 'First Subcontinental Pan-Indian Empire & Ashokan Dharma',
    levelId: 6,
    color: '#F59E0B',
    accent: '#D97706',
    banner: '/assets/atlas/mauryan_empire_map.jpg',
    context: 'Unified almost the entire subcontinent under Chandragupta Maurya and Emperor Ashoka. Characterized by royal highway networks (precursor to the Grand Trunk Road) and multilingual rock and pillar edicts promoting ethical governance.',
    civilizationOverlap: 'Ashoka’s Major Rock Edict II explicitly names the southern autonomous border realms that remained independent: the Cholas, Pandyas, Keralaputras, Satyaputras, and Tamraparni (Sri Lanka).',
    puzzle: {
      id: 'mauryan-edicts-puzzle',
      title: 'Ashoka’s Kalinga Inscription',
      prompt: 'At which site in Odisha did Ashoka carve his Special Rock Edicts expressing profound remorse for the Kalinga War and declaring: "All men are my children"?',
      options: [
        { label: 'Dhauli Hills (Near Bhubaneswar)', isCorrect: true, explanation: 'Correct! Dhauli features the rock-cut elephant and Ashoka’s remorseful edicts carved after the Kalinga war.' },
        { label: 'Taxila in the northwest', isCorrect: false, explanation: 'Taxila was an administrative viceroyalty and university city, not the site of the Kalinga edict.' },
        { label: 'Sanchi in Central India', isCorrect: false, explanation: 'Sanchi is famed for its Great Stupa and pillar edict against monastic schism.' }
      ],
      reward: { legacy: 100, knowledge: 75 }
    }
  },
  {
    id: 'chola',
    title: 'Chola Maritime Empire',
    dates: 'c. 850 – 1250 CE',
    subtitle: 'Kaveri Delta Heartland & Trans-Oceanic Bay of Bengal Trade',
    levelId: 10,
    color: '#38BDF8',
    accent: '#0284C7',
    banner: '/assets/atlas/chola_maritime_map.jpg',
    context: 'The Imperial Cholas under Rajaraja I and Rajendra I developed unprecedented maritime capabilities, building granite temple wonders, casting sacred lost-wax bronzes, and maintaining trade and naval links across the Indian Ocean to Southeast Asia and China.',
    civilizationOverlap: 'While the Cholas dominated southern India and oceanic routes, the Western Chalukyas ruled the Deccan, the Palas and Senas governed Bengal, and the Ghaznavids and Chandelas held regions in the north.',
    puzzle: {
      id: 'chola-port-puzzle',
      title: 'Chola Trans-Oceanic Gateway',
      prompt: 'Which major Chola international port town on the Coromandel coast served as the naval launch point to Sri Lanka, Srivijaya (Sumatra), and China, and housed the Chudamani Buddhist Vihara?',
      options: [
        { label: 'Nagapattinam', isCorrect: true, explanation: 'Correct! Nagapattinam was the premier Chola commercial harbor and naval port connecting the Coromandel coast to Southeast Asia.' },
        { label: 'Kanchipuram', isCorrect: false, explanation: 'Kanchipuram was an inland center of learning, temples, and silk weaving.' },
        { label: 'Tiruchirappalli', isCorrect: false, explanation: 'Tiruchirappalli is an inland fortress city on the Kaveri river.' }
      ],
      reward: { legacy: 100, knowledge: 80 }
    }
  },
  {
    id: 'gupta',
    title: 'Gupta Classical Era',
    dates: 'c. 320 – 550 CE',
    subtitle: 'The Classical Renaissance: Mathematics, Astronomy & Rock Architecture',
    levelId: 7,
    color: '#A855F7',
    accent: '#7E22CE',
    banner: '/assets/atlas/early_trade_routes_map.jpg',
    context: 'A flourishing era of scientific breakthroughs (Aryabhata and decimal zero), classical Sanskrit literature (Kalidasa), exquisite Ajanta mural artistry, and rust-resistant metallurgy (Iron Pillar of Delhi).',
    civilizationOverlap: 'The Guptas held hegemony in northern India, while the Vakataka dynasty controlled the Deccan (patronizing Ajanta), and the Kadambas and Pallavas ruled in the deep south.',
    puzzle: {
      id: 'gupta-astronomy-puzzle',
      title: 'Astronomical Prime Meridian',
      prompt: 'Which historical city was considered the astronomical prime meridian of ancient India where scholars like Varahamihira and Brahmagupta calculated celestial motions?',
      options: [
        { label: 'Ujjayini (Ujjain)', isCorrect: true, explanation: 'Correct! Ujjain was the prime meridian of ancient Indian astronomers, situated on the Tropic of Cancer.' },
        { label: 'Pataliputra', isCorrect: false, explanation: 'Pataliputra was the political imperial capital.' },
        { label: 'Mathura', isCorrect: false, explanation: 'Mathura was a major art and sculptural center.' }
      ],
      reward: { legacy: 90, knowledge: 70 }
    }
  },
  {
    id: 'medieval',
    title: 'Vijayanagara & Medieval Heritage',
    dates: 'c. 1336 – 1646 CE',
    subtitle: 'City of Victory: Grand Temples, Bazaars & River Irrigation',
    levelId: 11,
    color: '#FB7185',
    accent: '#E11D48',
    banner: '/assets/atlas/dholavira_reconstruction.jpg',
    context: 'Centered on the rugged granite boulders of the Tungabhadra River, Vijayanagara featured international markets trading Arabian warhorses and diamonds, sophisticated aqueducts, and magnificent pillared mandapas.',
    civilizationOverlap: 'Coexisted with the northern Bahmani Sultanate and successor Deccan Sultanates (Bijapur, Golconda, Ahmadnagar), while the Ming Dynasty governed China and the Portuguese established coastal enclaves.',
    puzzle: {
      id: 'vijayanagara-river-puzzle',
      title: 'Lifeline of the Capital',
      prompt: 'Along the banks of which perennial peninsular river was the capital city of Vijayanagara (Hampi) constructed with extensive canals and stone aqueducts?',
      options: [
        { label: 'Tungabhadra River', isCorrect: true, explanation: 'Correct! The Tungabhadra provided defensive boulder hills, freshwater, and agricultural irrigation via the Turtha canal.' },
        { label: 'Godavari River', isCorrect: false, explanation: 'The Godavari flows further north through Maharashtra and Andhra Pradesh.' },
        { label: 'Kaveri River', isCorrect: false, explanation: 'The Kaveri flows further south through Mysore and Tamil Nadu.' }
      ],
      reward: { legacy: 110, knowledge: 90 }
    }
  },
  {
    id: 'all',
    title: 'All Eras & Civilizations',
    dates: 'Prehistory to Medieval',
    subtitle: 'Complete Historical Atlas of the Indian Subcontinent',
    levelId: 'all',
    color: '#D9A441',
    accent: '#B77B2E',
    banner: '/assets/atlas/mauryan_parchment_map.jpg',
    context: 'Explore how human communities, cities, trade routes, rivers, and regional cultures transformed across five millennia on the Indian subcontinent.',
    civilizationOverlap: 'Indian history is characterized by continuity and diversity, where multiple regional traditions, languages, and technologies coexisted and exchanged ideas across millennia.',
    puzzle: null
  }
];

export const ATLAS_LOCATIONS = [
  // INDUS VALLEY SITES
  {
    id: 'harappa',
    name: 'Harappa',
    modernLocation: 'Sahiwal District, Punjab, Pakistan',
    eraId: 'indus',
    level: 3,
    category: 'city',
    coordinates: { x: 315, y: 205 },
    period: 'c. 2600 – 1900 BCE (Mature Harappan)',
    icon: '🏙️',
    significance: 'The first discovered site of the Indus Civilization (excavated by Daya Ram Sahni in 1921). Known for its massive mudbrick citadel, 12-unit granaries, and circular grain-pounding platforms.',
    reconstructionImage: '/assets/atlas/harappan_atlas_map.jpg',
    howPeopleLived: {
      architecture: 'Streets arranged on a disciplined grid oriented north-south and east-west. Standardized fired-brick houses (1:2:4 ratio) with central open-air courtyards, private wells, and indoor bathrooms.',
      dailyLife: 'Urban artisans lived in dedicated quarters near granaries and workshops. City life was supported by a strong civic administration maintaining public hygiene and uniform building standards.',
      food: 'Cultivated wheat, six-row barley, peas, sesame, and mustard. Domesticated cattle (zebu humped ox), sheep, goats, and pigs; fished freshwater catfish from the Ravi river.',
      clothing: 'Spun and wove cotton textiles dyed with madder. Wore draped cotton lengths; women wore terracotta and faience beaded necklaces, shell bangles, and elaborate headgear.',
      trade: 'Connected along the Ravi and Indus river routes. Exported carnelian beads and finished steatite seals; imported chert from Rohri Hills, copper from Rajasthan, and timber from Himalayan foothills.'
    },
    thenAndNow: 'In antiquity, Harappa stood directly upon the banks of the perennial Ravi River. Over subsequent millennia, the river shifted 8 km to the north, leaving the ancient mounds dry. Modern Harappa is an excavated archaeological site and museum.',
    artifacts: ['Red Sandstone Torso', 'Faience Bangles', 'Unicorn Steatite Seals', 'Standard Chert Cube Weights'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'harappa_city'
  },
  {
    id: 'mohenjo_daro',
    name: 'Mohenjo-daro',
    modernLocation: 'Larkana District, Sindh, Pakistan',
    eraId: 'indus',
    level: 3,
    category: 'city',
    coordinates: { x: 215, y: 282 },
    period: 'c. 2500 – 1900 BCE',
    icon: '🧱',
    significance: 'One of the world’s largest Bronze Age cities (population ~40,000). Famous for the Great Bath waterproofed with natural bitumen, the massive pillared assembly hall, and the Great Granary.',
    reconstructionImage: '/assets/atlas/indus_valley_encyclopedia_map.jpg',
    howPeopleLived: {
      architecture: 'Divided into an elevated western Citadel (mound of administrative and ritual structures) and a sprawling Lower Town. Covered brick sewers lined every major street with inspection traps.',
      dailyLife: 'Almost every private residence had its own brick-tiled bathroom connected via clay pipes to covered street drains. Over 700 brick-lined wells supplied clean drinking water.',
      food: 'Staples included emmer wheat, barley, jujube fruit, lentils, and river fish. Grain was stored in the massive aerated citadel granary to withstand seasonal flooding.',
      clothing: 'Men and women wore woven cotton. The famed "Priest-King" sculpture depicts a bearded dignitary wearing a draped shawl with trefoil motifs and an armlet.',
      trade: 'Hub of high-value manufacturing: glazed faience ornaments, etched carnelian beads, copper mirrors, and bronze tools exchanged with Mesopotamia and Persian Gulf emporia.'
    },
    thenAndNow: 'Then: A bustling metropolis directly on the Indus floodplain protected by massive flood-defense brick platforms. Now: A UNESCO World Heritage site threatened by saline groundwater weathering and high summer temperatures.',
    artifacts: ['Bronze Dancing Girl', 'Steatite Priest-King', 'Pashupati Proto-Shiva Seal', 'Terracotta Toy Carts'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'great_bath'
  },
  {
    id: 'dholavira',
    name: 'Dholavira',
    modernLocation: 'Khadir Bet, Kutch District, Gujarat, India',
    eraId: 'indus',
    level: 3,
    category: 'city',
    coordinates: { x: 258, y: 362 },
    period: 'c. 2600 – 1600 BCE',
    icon: '💧',
    significance: 'Spectacular island city in the Rann of Kutch renowned for its monumental stone architecture, 16 rock-cut reservoirs holding 250,000 cubic meters of water, and a 10-symbol signboard inscription.',
    reconstructionImage: '/assets/atlas/dholavira_reconstruction.jpg',
    howPeopleLived: {
      architecture: 'Unique tripartite city layout: Castle/Citadel, Middle Town, and Lower Town, enclosed by massive stone masonry fortification walls up to 11 meters thick.',
      dailyLife: 'Living in an arid salt-desert environment, citizens were master hydraulic engineers. Rainwater from seasonal streams (Manhar and Mansar) was diverted into stepped stone reservoirs.',
      food: 'Dryland agriculture: millets (bajra), barley, sesame, pulses. Grazed cattle, goats, and camels; gathered marine mollusks and fish from the prehistoric marine gulf.',
      clothing: 'Wore fine cotton fabrics complemented by exquisite agate, jasper, and shell jewellery crafted from marine shells collected along the Kutch coast.',
      trade: 'Major marine gateway controlling maritime traffic entering the Gulf of Kutch. Produced banded limestone pillars, polished stone celts, and carnelian ornaments.'
    },
    thenAndNow: 'Then: Located on a fertile island surrounded by navigable marine gulf waters that ships could enter. Now: Surrounded by the vast white salt desert of the Great Rann of Kutch; an exceptional UNESCO World Heritage Site.',
    artifacts: ['10-Character Indus Signboard', 'Polished Stone Column Bases', 'Rock-cut Reservoirs', 'Copper Celts'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'steatite_seal'
  },
  {
    id: 'lothal',
    name: 'Lothal',
    modernLocation: 'Dholka Taluka, Ahmedabad District, Gujarat, India',
    eraId: 'indus',
    level: 3,
    category: 'port',
    coordinates: { x: 298, y: 395 },
    period: 'c. 2400 – 1900 BCE',
    icon: '⚓',
    significance: 'The premier Harappan port and industrial craft center. Possessed the world’s oldest known tidal dock basin (214 × 36 m), connected by a sluice gate to the ancient Bhogavo River.',
    reconstructionImage: '/assets/atlas/harappan_atlas_map.jpg',
    howPeopleLived: {
      architecture: 'Town divided into an Acropolis (ruling elite residence) and Lower Town. The dockyard featured a spillway and locking doors to maintain water levels during low tides.',
      dailyLife: 'Bustling industrial quarter: bead-makers kiln, coppersmith furnaces, and ivory-carving ateliers where skilled artisans manufactured export items from morning to evening.',
      food: 'Earliest archaeological evidence of rice cultivation in Gujarat (c. 2200 BCE), alongside wheat, barley, pulses, and marine seafood.',
      clothing: 'Fine dyed cotton garments, shell bangles from coastal conch shells, and necklaces of tiny micro-steatite and carnelian beads.',
      trade: 'Direct international sea trade: Persian Gulf circular stamp seals and Mesopotamian seals found here confirm voyages across the Arabian Sea carrying cotton, carnelian, and timber.'
    },
    thenAndNow: 'Then: An active tidal seaport opening directly into the Gulf of Khambhat via a navigable river estuary. Now: Coastal siltation and tectonic uplifting shifted the coastline 18 km away, leaving the brick dock basin surrounded by agricultural fields.',
    artifacts: ['Persian Gulf Button Seal', 'Standardized Ivory Scale', 'Double Burial Terracotta Coffins', 'Terracotta Ship Model'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'standardized_weight'
  },
  {
    id: 'kalibangan',
    name: 'Kalibangan',
    modernLocation: 'Hanumangarh District, Rajasthan, India',
    eraId: 'indus',
    level: 3,
    category: 'city',
    coordinates: { x: 335, y: 248 },
    period: 'c. 2600 – 1900 BCE',
    icon: '🔥',
    significance: 'Situated on the left bank of the dried-up Ghaggar-Hakra River. Yielded the world’s earliest ploughed agricultural field with cross-furrows, and public series of clay fire altars.',
    reconstructionImage: '/assets/atlas/indus_valley_encyclopedia_map.jpg',
    howPeopleLived: {
      architecture: 'Fortified citadel and lower town constructed primarily of dried mudbricks. Distinct absence of fired bricks except in drains and wells.',
      dailyLife: 'Strong ritual tradition: rows of brick-lined fire altars (havan kunds) containing charcoal and ash point to community fire rituals and sacrificial offerings.',
      food: 'Innovative cross-ploughing allowed two crops (mustard and horse gram) to grow simultaneously in the same field, maximizing arid rainfall.',
      clothing: 'Terracotta bangles painted in black, red, and ochre; stone beads, simple woven linen and cotton wraps.',
      trade: 'Supplied agricultural surplus and copper tools from the nearby Khetri mines along the Ghaggar-Hakra river network to Harappa and Mohenjo-daro.'
    },
    thenAndNow: 'Then: Flourished on the perennial waters of the Saraswati/Ghaggar-Hakra river. Now: The river dried up into a seasonal monsoon stream, turning the surrounding landscape into the Thar Desert fringe.',
    artifacts: ['Cross-Furrowed Ploughed Field', 'Ritual Fire Altars', 'Terracotta Bull Figurine', 'Cylindrical Mesopotamian Seal'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'harappa_city'
  },
  {
    id: 'rakhigarhi',
    name: 'Rakhigarhi',
    modernLocation: 'Hisar District, Haryana, India',
    eraId: 'indus',
    level: 3,
    category: 'city',
    coordinates: { x: 362, y: 252 },
    period: 'c. 2600 – 1900 BCE',
    icon: '🏺',
    significance: 'The largest known Indus Valley site (exceeding 350 hectares across 7 mounds). Excavations revealed massive mudbrick granaries, gold and carnelian jewelry workshops, and ancient DNA insights.',
    reconstructionImage: '/assets/atlas/indus_valley_encyclopedia_map.jpg',
    howPeopleLived: {
      architecture: 'Wide 1.92m streets paved with terracotta potsherds, covered drains with silt pits, and multi-room mudbrick houses with private courtyards.',
      dailyLife: 'A thriving eastern regional metropolis coordinating grain storage and metalworking across the northern plains.',
      food: 'Barley, wheat, rice, millets, sesame; domestic cattle, buffalo, and water birds.',
      clothing: 'Cotton weaving evidenced by spindle whorls; gold foil fillets, lapis, and steatite beads.',
      trade: 'Extensive inland depot connecting Himalayan stone and timber with the Ghaggar-Hakra waterway.'
    },
    thenAndNow: 'Then: Sprawling river metropolis in the Drishadvati river valley. Now: Mounds partially covered by modern villages; ongoing ASI excavation and national museum site.',
    artifacts: ['Gold Sheet Fillet Headband', 'Terracotta Drainage Pipes', 'Bone Needles', 'Carved Steatite Seals'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'harappa_city'
  },

  // MAHAJANAPADAS & EARLY KINGDOMS SITES
  {
    id: 'pataliputra',
    name: 'Pataliputra',
    modernLocation: 'Patna, Bihar, India',
    eraId: 'mahajanapada',
    level: 5,
    category: 'capital',
    coordinates: { x: 585, y: 325 },
    period: 'c. 490 BCE – 500 CE',
    icon: '🏰',
    significance: 'Capital of Magadha, the Mauryan Empire, and the Gupta Empire. Founded by King Udayin at the strategic confluence of the Ganga, Son, Gandak, and Ghaghara rivers.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    howPeopleLived: {
      architecture: 'Surrounded by a colossal wooden palisade with 570 towers and 64 gates (as recorded by Greek ambassador Megasthenes). Houses made of brick, timber, and lime mortar.',
      dailyLife: 'Center of royal courts, civil bureaucracy, diplomatic embassies, and merchant guilds (shrenis). The Ganga riverfront bustled with cargo barges day and night.',
      food: 'Fine Magadhan scented rice, barley flatbreads, mangoes, bananas, river carp, dairy ghee, and sweetmeats.',
      clothing: 'Fine muslin and silk garments, embroidered borders, golden diadems, and punch-marked silver coins (karshapanas) used in marketplaces.',
      trade: 'Terminal nexus of the Uttarapatha highway connecting Taxila to the Bay of Bengal port of Tamralipti.'
    },
    thenAndNow: 'Then: A 14 km-long riverfront imperial metropolis defended by water moats. Now: Buried beneath the modern metropolis of Patna; excavated at Kumhrar (80-pillared Mauryan hall).',
    artifacts: ['80-Pillared Mauryan Hall Remains', 'Didarganj Yakshi Polished Sculpture', 'Silver Punch-Marked Coins', 'Mauryan Terracotta Figurines'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'ashokan_edict'
  },
  {
    id: 'rajgir',
    name: 'Rajagriha (Rajgir)',
    modernLocation: 'Nalanda District, Bihar, India',
    eraId: 'mahajanapada',
    level: 5,
    category: 'capital',
    coordinates: { x: 592, y: 342 },
    period: 'c. 6th century BCE',
    icon: '⛰️',
    significance: 'The ancient hill-capital of King Bimbisara and Ajatashatru of Magadha. Site of Buddha’s discourses at Griddhakuta (Vulture Peak) and the First Buddhist Council at Saptaparni Cave.',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    howPeopleLived: {
      architecture: 'Protected by cyclopean stone walls 40 km long built from massive unmortared boulders winding over five hilltops.',
      dailyLife: 'Royal seat of statecraft, early physicians (Jivaka’s mango grove hospital), and philosophical debates among Buddhist, Jain, and Ajivika monks.',
      food: 'Barley, rice, forest venison, wild honey, and mineral-rich spring waters from local hot springs (Brahmakund).',
      clothing: 'Woven cotton tunics, ascetics ochre robes, iron swords and armour worn by Magadhan infantry.',
      trade: 'Controlled the rich iron ore mines of southern Bihar/Jharkhand, enabling Magadha to forge superior weapons and agricultural ploughshares.'
    },
    thenAndNow: 'Then: A fortified mountain valley capital commanding trade passes. Now: A tranquil pilgrimage center with the Vishwa Shanti Stupa, ancient stone walls, and ropeway.',
    artifacts: ['Cyclopean Stone Wall Ramparts', 'Bimbisara Jail Ruins', 'Jivaka Mango Grove Hospital', 'Polished Iron Weapon Heads'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'punch_marked_coin'
  },
  {
    id: 'vaishali',
    name: 'Vaishali',
    modernLocation: 'Vaishali District, Bihar, India',
    eraId: 'mahajanapada',
    level: 5,
    category: 'city',
    coordinates: { x: 580, y: 310 },
    period: 'c. 6th century BCE',
    icon: '⚖️',
    significance: 'Capital of the Vajji confederacy, considered one of the earliest recorded democratic republics in human history. Governed by an elected assembly of 7,707 clan chiefs (Rajas).',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    howPeopleLived: {
      architecture: 'Assembly hall (Santhagara) where elected representatives met to debate war, peace, and laws. Moated ramparts and stupas.',
      dailyLife: 'Decisions taken by consensus or voting with wooden voting sticks (salaka). Thriving culture of arts, patronizing the famed dancer Amrapali.',
      food: 'Gangetic alluvial agriculture: rice, sugarcane, mustard, pulses, and milk products.',
      clothing: 'Richly dyed cotton shawls, floral garlands, polished shell and terracotta beads.',
      trade: 'River port on the northern bank of the Ganga connecting trade between Nepal Himalayas and Magadha.'
    },
    thenAndNow: 'Then: Prosperous republican capital where Buddha delivered his last sermon. Now: Peaceful rural heritage site featuring the intact single-lion Ashokan pillar and coronation tank (Abhishek Pushkarini).',
    artifacts: ['Ashokan Pillar with Single Lion Capital', 'Relic Stupa of the Buddha', 'Coronation Tank Abhishek Pushkarini', 'Monastic Votive Seals'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'punch_marked_coin'
  },
  {
    id: 'taxila',
    name: 'Takshashila (Taxila)',
    modernLocation: 'Rawalpindi District, Punjab, Pakistan',
    eraId: 'mahajanapada',
    level: 6,
    category: 'capital',
    coordinates: { x: 260, y: 135 },
    period: 'c. 6th century BCE – 5th century CE',
    icon: '📚',
    significance: 'Famed ancient university city and capital of Gandhara Mahajanapada. Crossroads where Persian, Greek, Central Asian, and Indian knowledge converged; teacher Chanakya authored the Arthashastra here.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    howPeopleLived: {
      architecture: 'Three successive ancient cities: Bhir Mound (irregular organic streets), Sirkap (Greek-style grid city), and Sirsukh (Kushan fortress).',
      dailyLife: 'Thousands of international students studied 18 branches of science, medicine (Ayurveda under Charaka), archery, statecraft, astronomy, and philosophy.',
      food: 'Wheat bread, mutton, pomegranate, grapes, walnuts, dairy cheese, and lentils.',
      clothing: 'Fusion garments: Indian dhotis alongside Central Asian tunics and Gandharan woolen cloaks.',
      trade: 'Premier northern terminus of the Uttarapatha highway connecting the Gangetic plains to the Silk Road routes through Bactria and Persia.'
    },
    thenAndNow: 'Then: Cosmopolitan intellectual capital of the subcontinent. Now: Renowned UNESCO archaeological site with excavated stupas (Dharmarajika), monasteries (Jaulian), and a museum.',
    artifacts: ['Silver Hoards of Alexander & Maurya Coins', 'Gandharan Stone Reliefs', 'Aramaic Inscriptions', 'Charaka Medical Pestles'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'ashokan_edict'
  },
  {
    id: 'ujjain',
    name: 'Ujjayini (Ujjain)',
    modernLocation: 'Ujjain District, Madhya Pradesh, India',
    eraId: 'mahajanapada',
    level: 7,
    category: 'city',
    coordinates: { x: 378, y: 382 },
    period: 'c. 6th century BCE – 12th century CE',
    icon: '🔭',
    significance: 'Capital of Avanti Mahajanapada on the sacred Shipra River. The Greenwich of ancient India: historical astronomical prime meridian (0° longitude) where Aryabhata, Varahamihira, and Brahmagupta worked.',
    reconstructionImage: '/assets/atlas/early_trade_routes_map.jpg',
    howPeopleLived: {
      architecture: 'Fortified city with ramparts, astronomical stone dials, water tanks, and temples dedicated to Mahakala Shiva.',
      dailyLife: 'Merchants, astronomers, and gemstone cutters lived side by side. Astrological observatories calculated solar and lunar eclipses.',
      food: 'Malwa wheat, gram lentils, seasonal fruits, dairy curd, and spices from the Vindhyan plateau.',
      clothing: 'Fine cotton dyed in saffron and indigo; silver jewelry, agate beads cut from Narmada pebbles.',
      trade: 'Crucial highway crossroads: where the trade route from the Gangetic plain branched south to Pratishthana (Dakshinapatha) and west to the ports of Bharuch.'
    },
    thenAndNow: 'Then: Intellectual capital of Indian astronomy and gateway to the Deccan. Now: Historic temple city host to the Simhastha Kumbh Mela, with the 18th-century Jantar Mantar observatory.',
    artifacts: ['Ancient Astronomical Stone Circles', 'Punch-Marked Silver Coins of Avanti', 'Terracotta Sealings of Shrenis', 'Polished Iron Tools'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'aryabhata'
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    modernLocation: 'Varanasi District, Uttar Pradesh, India',
    eraId: 'mahajanapada',
    level: 5,
    category: 'city',
    coordinates: { x: 535, y: 332 },
    period: 'Continuous from c. 1000 BCE',
    icon: '🛕',
    significance: 'One of the world’s oldest continually inhabited cities. Capital of Kashi Mahajanapada, famed for exquisite silk weaving, ivory craftsmanship, and spiritual philosophy.',
    reconstructionImage: '/assets/atlas/mahajanapadas_map.jpg',
    howPeopleLived: {
      architecture: 'Crescent-shaped riverfront steps (ghats), stone pavilions, narrow paved lanes (galis) designed to keep shaded during hot summers.',
      dailyLife: 'Daily rituals on the Ganga riverfront, temple bells, music recitals, master weavers operating wooden handlooms creating Kashi silk.',
      food: 'Barley, rice, milk sweets (pedas, kheer), river water, spiced lentils, and betel leaf (paan).',
      clothing: 'Legendary Kashi silken robes (Kauseya) famed throughout Buddhist and Jain scriptures for their featherlight softness.',
      trade: 'Major commercial river port where cargo boats traded between the upper and lower Ganga basins.'
    },
    thenAndNow: 'Then: Celebrated spiritual and trade metropolis of ancient India. Now: Cultural and spiritual capital of India, renowned worldwide for its vibrant living heritage.',
    artifacts: ['Northern Black Polished Ware (NBPW)', 'Iron Smelting Remains', 'Ivory Haircombs and Dice', 'Ancient Terracotta Mother Goddesses'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'punch_marked_coin'
  },

  // MAURYAN EMPIRE SITES
  {
    id: 'sarnath',
    name: 'Sarnath',
    modernLocation: 'Varanasi District, Uttar Pradesh, India',
    eraId: 'mauryan',
    level: 6,
    category: 'monument',
    coordinates: { x: 540, y: 326 },
    period: 'c. 3rd century BCE – 12th century CE',
    icon: '🏛️',
    significance: 'Site where Gautama Buddha preached his first sermon (Dhammacakkappavattana Sutta). Emperor Ashoka erected the famous Lion Capital (now India’s National Emblem) and the Dharmarajika Stupa.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    howPeopleLived: {
      architecture: 'Monastic complexes (viharas), open meditation groves (Deer Park), massive brick stupas (Dhamek and Dharmarajika), and Ashokan polished sandstone pillars.',
      dailyLife: 'Bhikshus lived a disciplined life of study, chanting, and meditation; royal delegations and pilgrims from across Asia visited to make donations.',
      food: 'Simple vegetarian alms gathered in clay bowls: rice porridge, lentils, seasonal fruit, herbal teas.',
      clothing: 'Tri-civara (threefold ochre robes) woven from discarded cotton rags washed and dyed with tree bark.',
      trade: 'Pilgrimage node on the Uttarapatha supported by royal endowments and merchant guild donations recorded in donor inscriptions.'
    },
    thenAndNow: 'Then: A tranquil deer park surrounded by monastic colleges. Now: A serene archaeological park and museum housing the original 250 BCE Ashokan Lion Capital.',
    artifacts: ['Ashokan Polished Chunar Sandstone Lion Capital', 'Ashoka Pillar Schism Edict', 'Dhamek Stupa Brick Carvings', 'Gupta Buddha in Dharmachakra Mudra'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'ashokan_edict'
  },
  {
    id: 'sanchi',
    name: 'Sanchi',
    modernLocation: 'Raisen District, Madhya Pradesh, India',
    eraId: 'mauryan',
    level: 8,
    category: 'monument',
    coordinates: { x: 412, y: 388 },
    period: 'c. 3rd century BCE – 12th century CE',
    icon: '🛕',
    significance: 'Commissioned by Ashoka over the relics of the Buddha. Features the Great Stupa (Stupa 1) with four intricately carved stone gateways (Toranas) depicting Jataka tales and early Indian life.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    howPeopleLived: {
      architecture: 'Hemispherical brick dome covered in stone casing, circumambulatory pathway (pradakshina patha), and four Toranas carved like wooden joinery.',
      dailyLife: 'The Torana carvings serve as a visual encyclopedia of ancient Indian society: depicting cities, boats, royal processions, farmers, musicians, and floral motifs.',
      food: 'Central Indian grains: wheat, barley, millets, forest fruits, milk, and clarified butter.',
      clothing: 'The stone carvings depict contemporary attire: dhotis with pleated front folds, elaborate turbans, heavy earrings, and waist girdles (mekhala).',
      trade: 'Funded by the ivory carvers’ guild of nearby Vidisha (inscribed on the Southern Gateway: "Carved by the ivory workers of Vedisa").'
    },
    thenAndNow: 'Then: An active hill sanctuary overlooking the merchant city of Vidisha. Now: One of the best-preserved Buddhist monument complexes in the world, UNESCO World Heritage Site.',
    artifacts: ['Great Stupa 1 & Torana Reliefs', 'Ashokan Pillar with 4 Lions', 'Vidisha Ivory Workers Donor Inscriptions', 'Stupa 3 Caskets of Sariputra and Maudgalyayana'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'sanchi_stupa'
  },
  {
    id: 'girnar',
    name: 'Girnar (Junagadh)',
    modernLocation: 'Junagadh District, Gujarat, India',
    eraId: 'mauryan',
    level: 6,
    category: 'monument',
    coordinates: { x: 242, y: 440 },
    period: 'c. 250 BCE – 450 CE',
    icon: '📜',
    significance: 'A colossal granite boulder bearing 14 Major Rock Edicts of Ashoka, alongside later inscriptions by Western Satrap Rudradaman I (150 CE) and Gupta Emperor Skandagupta (456 CE) detailing the history of Lake Sudarshana.',
    reconstructionImage: '/assets/atlas/mauryan_parchment_map.jpg',
    howPeopleLived: {
      architecture: 'Rock-cut edict shelters, ancient earth dams with stone spillways, and rock-hewn steps ascending Mount Girnar.',
      dailyLife: 'Administrative outpost overlooking Saurashtra; royal engineers maintained the massive Sudarshana water reservoir for irrigation.',
      food: 'Kathiawar millets, pulses, sesame, cow dairy, and coastal seafood.',
      clothing: 'Coarse and fine cotton, shell jewellery, bronze ornaments.',
      trade: 'Connected Gujarat sea trade to the Mauryan capital via Ujjain.'
    },
    thenAndNow: 'Then: A rocky mountain pass highway guarding the imperial Sudarshana reservoir. Now: A protected ASI inscription pavilion at the foot of Mount Girnar.',
    artifacts: ['14 Major Rock Edicts of Ashoka', 'Rudradaman I Sanskrit Inscription', 'Skandagupta Sudarshana Dam Edict', 'Mauryan Polished Granite Surface'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'ashokan_edict'
  },
  {
    id: 'dhauli',
    name: 'Dhauli & Tosali',
    modernLocation: 'Khurda District, Odisha, India',
    eraId: 'mauryan',
    level: 6,
    category: 'monument',
    coordinates: { x: 622, y: 450 },
    period: 'c. 260 BCE',
    icon: '🐘',
    significance: 'Site on the Daya River marking the end of the devastating Kalinga War. Here Ashoka carved his Special Kalinga Edicts along with an extraordinary rock-hewn elephant emerging from the natural cliff.',
    reconstructionImage: '/assets/atlas/mauryan_empire_map.jpg',
    howPeopleLived: {
      architecture: 'Rock-cut monumental sculpture: the earliest rock-cut animal sculpture in India (Ashokan Elephant). Fortified township of Tosali.',
      dailyLife: 'Kalinga farmers and coastal sailors rebuilt their lives following the war, protected by judicial officers ordered to treat all citizens impartially.',
      food: 'Coastal rice, fish, coconut, betel nut, and forest produce.',
      clothing: 'Light cotton wraps, palm leaf hats, bronze bangles.',
      trade: 'Major coastal port gateway for maritime voyagers sailing across the Bay of Bengal to Suvarnabhumi (Southeast Asia).'
    },
    thenAndNow: 'Then: Battlefield where Ashoka embraced non-violence (Ahimsa) and Dhamma. Now: Scenic hill overlooking paddy fields, crowned by the modern Japanese-built Peace Pagoda (Shanti Stupa).',
    artifacts: ['Rock-Cut Ashokan Elephant Sculpture', 'Special Kalinga Rock Edicts I & II', 'Ancient Fortified Tosali Remains', 'Mauryan Terracotta Tiles'],
    investigationId: 'ashokan-edict-investigation',
    libraryId: 'ashokan_edict'
  },

  // CHOLA PERIOD SITES
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    modernLocation: 'Thanjavur District, Tamil Nadu, India',
    eraId: 'chola',
    level: 10,
    category: 'capital',
    coordinates: { x: 448, y: 672 },
    period: 'c. 9th – 13th century CE',
    icon: '🛕',
    significance: 'Imperial capital of the Cholas under Rajaraja I. Home to the towering Brihadisvara Temple (completed 1010 CE), constructed entirely of granite with a 216-foot vimana and an 80-ton monolithic cupola.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    howPeopleLived: {
      architecture: 'Dravidian temple architecture: axial layout with towering vimanas, pillared mukhamandapas, massive bronze casting workshops, and granaries.',
      dailyLife: 'Temple served as community economic engine: employing hundreds of musicians, classical dancers (Devadasis), accountants, flower-garland makers, and bronze casters.',
      food: 'Rich Kaveri delta harvest: multiple annual crops of samba rice, plantains, coconuts, sesame oil, and tamarind rasam.',
      clothing: 'Fine silk (pattu) and unbleached cotton dhotis with gold zari borders; heavy gold necklaces, pearl strings, and sacred rudraksha beads.',
      trade: 'Merchant guilds (Ayyavole 500, Manigramam) directed international trade across South India and dispatched delegations to China.'
    },
    thenAndNow: 'Then: Fortified imperial palace and grand temple capital of South India. Now: The cultural heart of Tamil Nadu, celebrated for Tanjore paintings, bronze sculptures, and classical music.',
    artifacts: ['Granite Vimana & Monolithic 80-ton Shikhara', 'Chola Fresco Paintings on Inner Sanctorum Walls', 'Bronze Nataraja Lord of Cosmic Dance', 'Inscribed Donor Walls of Rajaraja I'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'brihadisvara_temple'
  },
  {
    id: 'gangaikonda_cholapuram',
    name: 'Gangaikonda Cholapuram',
    modernLocation: 'Ariyalur District, Tamil Nadu, India',
    eraId: 'chola',
    level: 10,
    category: 'capital',
    coordinates: { x: 456, y: 658 },
    period: 'c. 1025 – 1279 CE',
    icon: '👑',
    significance: 'Founded by Rajendra Chola I to celebrate his victorious military campaign to the Ganga River. Features a massive granite temple with gentle curved contours and the colossal 22 km Cholagangam reservoir.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    howPeopleLived: {
      architecture: 'Curvilinear vimana rising 180 feet, surrounded by fortified palaces and the vast "Liquid Pillar of Victory" reservoir filled with sacred Ganga waters.',
      dailyLife: 'Served as royal command headquarters coordinating both inland agricultural expansion and naval expeditionary fleets across the Bay of Bengal.',
      food: 'Delta paddy rice, pulses, fresh river fish, mangoes, sugarcane, and coconut milk.',
      clothing: 'Finest handwoven textiles, armlets, pearl chains, and bronze insignias bearing the Chola royal tiger crest.',
      trade: 'Overseas tribute and trade goods from Srivijaya, Kadaram, and China entered through royal supply routes.'
    },
    thenAndNow: 'Then: A grand royal city celebrating an empire stretching from the Ganga to the Indonesian archipelago. Now: A peaceful rural UNESCO World Heritage temple surrounded by green fields.',
    artifacts: ['Sculpture of Shiva Crowning King Rajendra I', 'Chola Bronze Parvati', 'Cholagangam Ancient Embankment', 'Tamil & Grantha Inscriptions'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'chola_bronze'
  },
  {
    id: 'nagapattinam',
    name: 'Nagapattinam',
    modernLocation: 'Nagapattinam District, Tamil Nadu, India',
    eraId: 'chola',
    level: 10,
    category: 'port',
    coordinates: { x: 468, y: 672 },
    period: 'c. 9th – 13th century CE',
    icon: '⛵',
    significance: 'The premier oceanic naval and merchant port of the Chola Empire. Housed the Chudamani Vihara, a famous Buddhist monastery patronized by the Srivijayan King of Sumatra with royal Chola copper-plate charters.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    howPeopleLived: {
      architecture: 'Lighthouse towers, deep-water wooden docks, warehouses, Buddhist viharas, and Hindu coastal shrines.',
      dailyLife: 'Multicultural seaport population: Tamil sailors, Chinese merchants, Arab navigators, and Indonesian monks lived in harmony under royal protection.',
      food: 'Seafood, coastal rice, coconut, exotic spices (cloves, cardamom, pepper), and dried betel nuts.',
      clothing: 'Sailors wore practical indigo-dyed cotton wraps; merchants wore silks and carried foreign silver coinage and Chinese porcelain.',
      trade: 'Primary launch port for merchant guilds sailing across the Bay of Bengal to the Malacca Straits, Sumatra, and Canton/Guangzhou.'
    },
    thenAndNow: 'Then: The international naval capital connecting India to maritime Southeast Asia. Now: A busy coastal fishing port and district headquarters on the Bay of Bengal.',
    artifacts: ['Chola-Period Bronze Buddha Hoards (over 350 bronzes)', 'Leiden Copper Plate Charters of Rajaraja & Rajendra', 'Chinese Song Dynasty Coins', 'Glazed Celadon Ceramics'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'chola_maritime'
  },
  {
    id: 'kadaram_kedah',
    name: 'Kadaram (Old Kedah / Bujang Valley)',
    modernLocation: 'Kedah State, Peninsular Malaysia',
    eraId: 'chola',
    level: 10,
    category: 'trade_hub',
    coordinates: { x: 885, y: 695 },
    period: 'c. 5th – 13th century CE',
    icon: '🌏',
    significance: 'Historic entrepôt at the mouth of the Merbok River in the Bujang Valley. Conquered by Rajendra Chola I during the 1025 CE naval expedition to enforce open maritime trade lanes through the Malacca Straits.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    howPeopleLived: {
      architecture: 'Hindu-Buddhist laterite and brick candis (shrines) showing distinct South Indian Chola architectural influences.',
      dailyLife: 'Transshipment center where ships waited for seasonal monsoon winds before crossing the Bay of Bengal or sailing east to China.',
      food: 'Tropical rice, dried fish, sago, tropical fruits, and local forest spices.',
      clothing: 'Local woven sarongs combined with imported Indian block-printed cottons.',
      trade: 'Major hub for tin smelting, glass beads, camphor, and aromatic woods traded with Chola merchant fleets.'
    },
    thenAndNow: 'Then: Strategic geopolitical harbor controlling the northern entrance of the Malacca Strait. Now: The Bujang Valley Archaeological Museum and heritage trail in Malaysia.',
    artifacts: ['Bujang Valley Laterite Candi Shrines', 'Granite Shivalingas & Bronze Figures', 'Chola Tamil Inscription of Kedah', 'Middle Eastern & Chinese Glass Beads'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'chola_maritime'
  },
  {
    id: 'srivijaya_palembang',
    name: 'Srivijaya (Palembang)',
    modernLocation: 'South Sumatra, Indonesia',
    eraId: 'chola',
    level: 10,
    category: 'capital',
    coordinates: { x: 940, y: 785 },
    period: 'c. 7th – 13th century CE',
    icon: '🌴',
    significance: 'Capital of the maritime thalassocracy of Srivijaya controlling the Sunda and Malacca Straits. Maintained close cultural and religious ties with Nalanda and Chola India before the 1025 CE naval campaign.',
    reconstructionImage: '/assets/atlas/chola_maritime_map.jpg',
    howPeopleLived: {
      architecture: 'Floating settlements on the Musi River, wooden stilt houses, and Buddhist stupas surrounded by dense tropical rainforests.',
      dailyLife: 'Center of Vajrayana Buddhist scholarship where Chinese pilgrim I-Tsing spent years translating Sanskrit texts before visiting India.',
      food: 'Rice, sago, coconut, tropical fruits, river fish, and spiced curries.',
      clothing: 'Batik textiles, gold thread weaving (songket), and imported Indian silks.',
      trade: 'Monopolized the global trade in cloves, nutmeg, sandalwood, and camphor connecting Indian Ocean traders to the Chinese empire.'
    },
    thenAndNow: 'Then: Dominant maritime empire commanding global spice routes. Now: Modern Indonesian city on the Musi River, with archaeological finds displayed at the Sultan Mahmud Badaruddin II Museum.',
    artifacts: ['Bukit Seguntang Colossal Stone Buddha', 'Old Malay & Sanskrit Stone Inscriptions', 'Tang & Song Dynasty Ceramic Cargoes', 'Gold Jewellery of the Sriwijaya Kings'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'chola_maritime'
  },

  // PREHISTORIC & EARLY FARMING SITES
  {
    id: 'bhimbetka_region',
    name: 'Bhimbetka Rock Shelters',
    modernLocation: 'Raisen District, Madhya Pradesh, India',
    eraId: 'prehistoric',
    level: 1,
    category: 'archaeological',
    coordinates: { x: 425, y: 405 },
    period: 'Paleolithic to Mesolithic (c. 100,000 – 8000 BCE)',
    icon: '⛰️',
    significance: 'Over 750 sandstone rock shelters containing prehistoric rock paintings spanning over 10,000 years. Depicts hunting scenes, animal migrations, communal dances, and early rituals in red ochre and white mineral pigments.',
    reconstructionImage: '/assets/atlas/early_trade_routes_map.jpg',
    howPeopleLived: {
      architecture: 'Natural sandstone overhangs and caves provided shelter from wind, rain, and predators without artificial walls.',
      dailyLife: 'Hunter-gatherer bands moved between seasonal river valleys and forest plateaus. Made stone tools by knapping quartzite river cobbles.',
      food: 'Wild game (bison, deer, wild boar), forest tubers, berries, honey, and river fish.',
      clothing: 'Animal hides, bark wraps, and natural body pigments made from manganese, hematite, and white clay mixed with animal fat.',
      trade: 'Local exchange of high-quality chalcedony and chert stones for crafting microlith blades and arrowheads.'
    },
    thenAndNow: 'Then: A rich prehistoric hunting refuge amidst dense teak and sal forests. Now: UNESCO World Heritage site celebrated as one of the oldest traces of human art in South Asia.',
    artifacts: ['Acheulean Handaxes & Cleavers', 'Mesolithic Microliths', 'Zoo Rock Paintings of Indian Bison', 'Bone Ornaments & Ochre Palettes'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'hand_axe'
  },
  {
    id: 'mehrgarh_region',
    name: 'Mehrgarh',
    modernLocation: 'Kachi Plain, Balochistan, Pakistan',
    eraId: 'neolithic',
    level: 2,
    category: 'archaeological',
    coordinates: { x: 195, y: 220 },
    period: 'c. 7000 – 2600 BCE',
    icon: '🌾',
    significance: 'Earliest known agricultural and pastoral settlement in South Asia. Documented the transition from hunting to settled wheat/barley farming, mudbrick granaries, and the earliest evidence of dentistry (drilled teeth c. 7000 BCE).',
    reconstructionImage: '/assets/atlas/early_farming_l2.jpg',
    howPeopleLived: {
      architecture: 'Rectangular multi-room mudbrick houses with standardized 4-room and 6-room storage layouts for agricultural grain.',
      dailyLife: 'Domesticated zebu cattle, sheep, and goats; harvested barley using composite flint sickles; crafted early coiled terracotta pots.',
      food: 'Six-row barley, emmer and einkorn wheat, jujube fruit, dates, and domesticated mutton/beef.',
      clothing: 'Woven fibers, shell beads from the Arabian Sea, and turquoise beads brought across Afghan mountain passes.',
      trade: 'Crossroads on the Bolan Pass: traded marine shells with the Arabian Sea coast and lapis lazuli with northern mines.'
    },
    thenAndNow: 'Then: Fertile alluvial terrace nourished by the Bolan River. Now: Dry, windswept archaeological mound providing foundational proof of indigenous South Asian agricultural origins.',
    artifacts: ['Earliest Drilled Human Molars', 'Compartmentalized Mudbrick Granaries', 'Terracotta Mother Goddess Figurines', 'Flint Microlith Sickle Blades'],
    investigationId: 'indus-seal-investigation',
    libraryId: 'early_pottery'
  },

  // MEDIEVAL & VIJAYANAGARA SITES
  {
    id: 'hampi_vijayanagara',
    name: 'Hampi (Vijayanagara)',
    modernLocation: 'Vijayanagara District, Karnataka, India',
    eraId: 'medieval',
    level: 11,
    category: 'capital',
    coordinates: { x: 395, y: 568 },
    period: 'c. 1336 – 1565 CE',
    icon: '💎',
    significance: 'Sprawling capital of the Vijayanagara Empire on the Tungabhadra River. Renowned for the Virupaksha Temple, musical-pillared Vittala Temple with its stone chariot, royal elephant stables, and international gemstone bazaars.',
    reconstructionImage: '/assets/atlas/dholavira_reconstruction.jpg',
    howPeopleLived: {
      architecture: 'Massive granite boulder engineering: dry-stone fortification walls, musical pillared halls, stone aqueducts, and stepped tanks (Pushkarini).',
      dailyLife: 'Cosmopolitan metropolis described by Portuguese traveler Domingo Paes as comparable in size to Rome. Diamond merchants weighed precious gems openly in street bazaars.',
      food: 'Rice, ragi, pulses, fresh coconuts, mangoes, river fish, mutton, and spiced butter dishes.',
      clothing: 'Fine silks with gold threads, jewel-encrusted turbans, and fragrant sandalwood perfumes.',
      trade: 'International trade nexus importing Arabian and Persian warhorses through west-coast ports like Bhatkal; exported spices, cotton textiles, and diamonds.'
    },
    thenAndNow: 'Then: One of the largest and wealthiest cities in the world during the 15th-16th centuries. Now: An extraordinary UNESCO World Heritage open-air museum set among breathtaking boulder landscapes.',
    artifacts: ['Monolithic Stone Chariot of Vittala Temple', 'Ugra Narasimha Colossal Monolith', 'Lotus Mahal Islamic-Style Arches', 'Gold Pagoda Coins (Varahas)'],
    investigationId: 'hampi-architecture-investigation',
    libraryId: 'stone_chariot'
  }
];

// Key River Systems Paths (Coordinates mapped to SVG ViewBox 0 0 1000 850)
export const ATLAS_RIVERS = [
  // INDUS SYSTEM
  {
    id: 'indus_river',
    name: 'Indus River (Sindhu)',
    color: '#38BDF8',
    d: 'M 350,110 C 310,120 280,140 260,180 C 240,220 230,260 215,285 C 205,320 200,360 210,400 C 215,420 210,440 200,455',
    importance: 'The lifeline of the Harappan civilization, carrying Himalayan glacial meltwater across the Punjab and Sindh plains into the Arabian Sea.'
  },
  {
    id: 'jhelum_river',
    name: 'Jhelum River (Vitasta)',
    color: '#60A5FA',
    d: 'M 295,130 C 285,150 270,175 255,195',
    importance: 'Ancient Vitasta where Alexander fought King Porus in 326 BCE.'
  },
  {
    id: 'chenab_river',
    name: 'Chenab River (Asikni)',
    color: '#60A5FA',
    d: 'M 315,145 C 295,170 275,195 245,225',
    importance: 'Major Himalayan tributary draining the northern ranges.'
  },
  {
    id: 'ravi_river',
    name: 'Ravi River (Purushni)',
    color: '#60A5FA',
    d: 'M 345,175 C 330,195 315,205 270,235',
    importance: 'Flanked the great city of Harappa; site of the Rigvedic Battle of the Ten Kings.'
  },
  {
    id: 'sutlej_river',
    name: 'Sutlej River (Shutudri)',
    color: '#60A5FA',
    d: 'M 380,205 C 345,220 310,235 255,265',
    importance: 'Southernmost major tributary of the Indus River basin.'
  },
  {
    id: 'ghaggar_hakra',
    name: 'Ghaggar-Hakra (Ancient Saraswati River Course)',
    color: '#38BDF8',
    isPaleo: true,
    d: 'M 365,225 C 340,245 310,275 275,310 C 255,335 245,355 240,380',
    importance: 'The ancient perennial river along which hundreds of Mature Harappan settlements (Kalibangan, Banawali, Ganweriwala) thrived before it desiccated.'
  },

  // GANGA-YAMUNA SYSTEM
  {
    id: 'ganga_river',
    name: 'Ganga River',
    color: '#38BDF8',
    d: 'M 410,240 C 445,265 490,290 535,330 C 585,325 640,345 685,395 C 715,430 735,465 745,490',
    importance: 'The sacred lifeline of the Second Urbanization, connecting the Mahajanapadas, Mauryan Empire, and Gupta Renaissance to the Bay of Bengal.'
  },
  {
    id: 'yamuna_river',
    name: 'Yamuna River',
    color: '#60A5FA',
    d: 'M 395,235 C 405,270 435,310 480,345 C 510,355 530,340 535,330',
    importance: 'Main southern tributary of the Ganga, flowing past Indraprastha, Mathura, and Kausambi to the Prayag Sangam.'
  },
  {
    id: 'son_river',
    name: 'Son River',
    color: '#60A5FA',
    d: 'M 495,420 C 525,390 560,355 585,328',
    importance: 'Flowed north from the Amarkantak plateau to join the Ganga at ancient Pataliputra.'
  },
  {
    id: 'chambal_river',
    name: 'Chambal River',
    color: '#60A5FA',
    d: 'M 370,390 C 385,340 410,310 445,305',
    importance: 'Major tributary connecting central Indian plateau to the Yamuna.'
  },

  // PENINSULAR RIVERS
  {
    id: 'narmada_river',
    name: 'Narmada River',
    color: '#38BDF8',
    d: 'M 510,425 C 460,425 410,422 360,428 C 320,432 290,442 270,445',
    importance: 'Flows westward through a tectonic rift valley between the Vindhya and Satpura ranges into the Gulf of Khambhat.'
  },
  {
    id: 'tapi_river',
    name: 'Tapi River',
    color: '#60A5FA',
    d: 'M 465,455 C 415,455 365,452 315,462 C 285,468 275,472 268,475',
    importance: 'Parallel westward-flowing river south of the Satpura range.'
  },
  {
    id: 'mahanadi_river',
    name: 'Mahanadi River',
    color: '#38BDF8',
    d: 'M 525,445 C 565,455 605,450 635,465 C 655,475 665,485 675,490',
    importance: 'Lifeline of Kalinga, providing water and navigation into the Bay of Bengal.'
  },
  {
    id: 'godavari_river',
    name: 'Godavari River (Dakshina Ganga)',
    color: '#38BDF8',
    d: 'M 310,505 C 370,520 440,530 510,555 C 570,575 610,600 630,620',
    importance: 'Longest peninsular river, sustaining the Asmaka Mahajanapada and the Satavahana Empire.'
  },
  {
    id: 'krishna_river',
    name: 'Krishna River',
    color: '#38BDF8',
    d: 'M 330,580 C 380,595 440,610 500,620 C 560,630 600,650 615,660',
    importance: 'Flows from Western Ghats eastward, nurturing central Deccan civilizations.'
  },
  {
    id: 'tungabhadra_river',
    name: 'Tungabhadra River',
    color: '#60A5FA',
    d: 'M 355,620 C 395,595 440,585 470,580',
    importance: 'Major tributary of the Krishna; its rugged granite banks sheltered the capital city of Vijayanagara (Hampi).'
  },
  {
    id: 'kaveri_river',
    name: 'Kaveri River',
    color: '#38BDF8',
    d: 'M 365,680 C 400,678 430,675 460,672 C 480,670 495,672 505,675',
    importance: 'The mother river of the Chola civilization; its rich alluvial delta supported intensive agriculture and temple cities.'
  }
];

// Major Historical Trade Routes
export const ATLAS_TRADE_ROUTES = [
  {
    id: 'uttarapatha',
    name: 'Uttarāpatha (The Northern Royal Highway)',
    eraId: 'mahajanapada',
    color: '#F59E0B',
    d: 'M 260,135 L 315,205 L 362,252 L 405,270 L 480,345 L 535,332 L 585,325 L 685,395 L 720,440',
    stops: ['Taxila', 'Indraprastha', 'Mathura', 'Kausambi', 'Varanasi', 'Pataliputra', 'Tamralipti'],
    description: 'The ancient trans-subcontinental trunk road connecting the Silk Road spurs in Gandhara to the deltaic seaport of Tamralipti on the Bay of Bengal.'
  },
  {
    id: 'dakshinapatha',
    name: 'Dakṣiṇāpatha (The Southern Trade Highway)',
    eraId: 'mahajanapada',
    color: '#EAB308',
    d: 'M 535,332 L 480,345 L 412,388 L 378,382 L 340,480 L 310,505 L 395,568 L 448,672',
    stops: ['Varanasi', 'Kausambi', 'Vidisha', 'Ujjain', 'Mahishmati', 'Pratishthana', 'Hampi/Karnata', 'Kaveri Delta'],
    description: 'The great southern commercial artery linking the Gangetic valley through Malwa across the Vindhyas to the Deccan plateau and Tamil ports.'
  },
  {
    id: 'indus_maritime',
    name: 'Indus Maritime & Gulf Coastal Network',
    eraId: 'indus',
    color: '#38BDF8',
    d: 'M 140,360 L 175,395 L 205,430 L 258,362 L 298,395 L 320,430 L 300,480',
    stops: ['Sutkagen Dor', 'Balakot', 'Dholavira', 'Lothal', 'Arabian Sea'],
    description: 'Coastal and deep-sea route by which Harappan ships sailed between Gujarat, the Makran coast, Dilmun (Bahrain), Magan (Oman), and Ur in Mesopotamia.'
  },
  {
    id: 'chola_oceanic',
    name: 'Chola Trans-Oceanic Bay of Bengal Route',
    eraId: 'chola',
    color: '#06B6D4',
    d: 'M 468,672 C 550,690 620,700 700,710 C 760,715 820,705 885,695 L 940,785 L 970,720',
    stops: ['Nagapattinam', 'Andaman & Nicobar', 'Kadaram (Kedah)', 'Srivijaya (Palembang)', 'Malacca Strait to Song China'],
    description: 'Naval and merchant shipping route connecting South India across the Bay of Bengal through the Malacca Straits to Southeast Asia and China.'
  }
];

// Approximate Imperial & Cultural Boundaries (SVG Polygon Data)
export const ATLAS_TERRITORIES = [
  {
    id: 'harappan_domain',
    name: 'Mature Harappan Cultural Sphere',
    eraId: 'indus',
    color: 'rgba(217, 164, 65, 0.16)',
    borderColor: '#D9A441',
    // Realistic boundary curve encircling the Indus, Saraswati, Gujarat & Makran
    points: '130,350 170,220 220,150 310,130 380,180 395,260 365,330 330,410 300,440 230,440 180,410 130,360',
    description: 'Covered over 1 million square kilometers across modern Pakistan and northwestern India; characterized by uniform weights, seals, and town layouts.'
  },
  {
    id: 'magadha_core',
    name: 'Magadha Imperial Heartlands',
    eraId: 'mahajanapada',
    color: 'rgba(74, 222, 128, 0.16)',
    borderColor: '#4ADE80',
    points: '540,290 620,290 650,370 590,390 530,360 520,310',
    description: 'The core realm of Magadha along the fertile Ganga-Son basin, boasting abundant iron mines, elephants, and trade crossroads.'
  },
  {
    id: 'mauryan_empire',
    name: 'Mauryan Pan-Indian Empire',
    eraId: 'mauryan',
    color: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#F59E0B',
    // Stretches from Hindu Kush across Gangetic plains down to Karnataka
    points: '150,140 260,80 380,140 520,220 680,280 750,420 700,510 590,610 480,670 380,630 320,530 260,420 180,330 140,220',
    description: 'The maximum extent of the Mauryan Empire under Ashoka (c. 250 BCE). Bordered independent Tamil kingdoms (Cholas, Pandyas, Cheras) in the deep south.'
  },
  {
    id: 'chola_heartland',
    name: 'Chola Imperial Heartland & Mandala',
    eraId: 'chola',
    color: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38BDF8',
    points: '420,630 490,630 500,710 440,730 400,690',
    description: 'Cholamandalam: The intensely irrigated Kaveri delta heartland centered around Thanjavur, Gangaikonda Cholapuram, and Nagapattinam.'
  }
];

// Physical Subcontinent Terrain Relief Boundaries (Himalayas, Thar Desert, Vindhyas, Ghats)
export const ATLAS_TERRAIN = [
  {
    id: 'himalayas',
    name: 'Himalayan Mountain Arc',
    d: 'M 230,110 Q 380,180 550,250 T 800,310',
    labelX: 470,
    labelY: 195
  },
  {
    id: 'hindu_kush',
    name: 'Hindu Kush & Sulaiman Ranges',
    d: 'M 190,90 Q 230,130 200,220 T 170,320',
    labelX: 160,
    labelY: 170
  },
  {
    id: 'vindhya_range',
    name: 'Vindhya & Satpura Ranges',
    d: 'M 320,410 Q 430,415 520,410',
    labelX: 420,
    labelY: 418
  },
  {
    id: 'western_ghats',
    name: 'Western Ghats (Sahyadri)',
    d: 'M 270,445 Q 310,540 370,680 T 400,740',
    labelX: 300,
    labelY: 560
  },
  {
    id: 'eastern_ghats',
    name: 'Eastern Ghats',
    d: 'M 640,460 Q 580,560 480,670',
    labelX: 580,
    labelY: 540
  },
  {
    id: 'thar_desert',
    name: 'Thar Desert (Marusthali)',
    d: 'M 250,260 Q 290,280 320,330 T 260,370 Z',
    labelX: 275,
    labelY: 310
  }
];
