export const level2Locations = [
  {
    id: 'fertile_floodplain',
    label: 'Alluvial River Floodplain',
    icon: '🌾',
    description: 'Vast, nutrient-rich silt flats formed by seasonal river inundations. The moist, soft earth is ideal for testing the first domesticated seeds.',
    discoverMessage: 'Seasonal monsoon river overflow deposited rich layers of mineral silt, renewing soil fertility every year without artificial fertilizer.',
    exploreItems: [
      {
        id: 'l2_silt_soil',
        icon: '🟤',
        label: 'Examine Alluvial Flood Silt',
        resourceName: 'River Silt',
        examineTitle: 'Mineral Silt & Soil Texture Analysis',
        whyUseful: 'Soft, nutrient-rich river silt allows digging sticks and stone hoes to aerate the soil easily, retaining moisture for seed germination.',
        feedback: 'You surveyed the dark river silt — gathered prime soil materials for farming beds and mudbrick crafting.',
        reward: { mud: 2, stone: 1 }
      },
      {
        id: 'l2_wild_seeds',
        icon: '🌱',
        label: 'Gather Ancestral Grain Seeds',
        resourceName: 'Crop Seeds',
        examineTitle: 'Hulled Barley & Wild Rice Spikelets',
        whyUseful: 'Wild ancestral grains (barley, wheat, and wild indica rice) selected for non-shattering rachis so seeds stay on the stalk until harvested.',
        feedback: 'You carefully collected viable seed heads from the alluvial grass stands for seasonal sowing.',
        reward: { seeds: 3 }
      },
      {
        id: 'l2_soil_moisture',
        icon: '💧',
        label: 'Test Soil Moisture Retention',
        resourceName: 'Field Hydration',
        examineTitle: 'Sub-Surface Moisture Zone',
        whyUseful: 'Testing natural dampness in the low floodplain identifies fields that will retain moisture through dry months without drying up.',
        feedback: 'You mapped the moisture zone along the river terrace — secured clean water for crop hydration.',
        reward: { water: 2 }
      }
    ],
    discoveryTitle: 'Polished Stone Celt & Harvesting Sickle',
    examinationNotes: 'A ground-stone celt and a curved wooden sickle haft embedded with micro-serrated chert blades. Under close inspection, the blade edge exhibits a glossy "sickle sheen" polish, produced by abrasive friction against silica-rich grain stalks.',
    usePrompt: 'How did early farming communities primarily utilize this harvesting sickle?',
    useOptions: [
      {
        label: 'Reaping ripened grain stalks cleanly at the base without dislodging grain seeds into the dirt',
        isCorrect: true,
        feedback: 'Correct! Serrated sickles cleanly sliced grain stalks in bunches, allowing farmers to gather whole seed heads for threshing.'
      },
      {
        label: 'Hunting fast mountain gazelles and predators in rocky scrubland',
        isCorrect: false,
        feedback: 'Incorrect. Sickles were specialized agricultural harvesting tools, not projectile hunting weapons.'
      },
      {
        label: 'Drilling micro-holes through deep granite rocks for water wells',
        isCorrect: false,
        feedback: 'Incorrect. Delicate micro-chert blades would shatter against hard solid granite.'
      }
    ],
    yields: { tools: 2, grain: 2 },
    artifactId: 'stone_celt',
    visualStory: [
      {
        title: 'The Shift to Agriculture: Multiple Regional Pathways',
        text: 'The transition from foraging to agriculture was NOT a single, sudden revolution or a uniform timeline. Across the Indian subcontinent, diverse environments nurtured distinct farming traditions at their own pace.',
        icon: '🗺️',
        funFact: 'At Mehrgarh (Balochistan), farming of barley and wheat developed alongside pastoralism around 7000 BCE, while at Lahuradewa (Ganga Valley), rice was cultivated alongside fishing and wild foraging.'
      },
      {
        title: 'Selecting the Best Seeds (Domestication)',
        text: 'Wild cereal grains naturally shatter and scatter their seeds in the wind when ripe. Early foragers deliberately gathered stalks that held onto their seeds (non-shattering rachis), replanting them until domesticated crops emerged.',
        icon: '🌱',
        funFact: 'Over generations of selection, grain heads grew larger, husks became easier to thresh, and yields multiplied.'
      },
      {
        title: 'Tools of the Neolithic Farmer',
        text: 'Clearing river plains and harvesting grain required new technologies: ground-stone axes (celts) to clear trees, stone hoes to till soil, and micro-serrated chert sickles to harvest grain swiftly before birds could eat it.',
        icon: '⛏️',
        funFact: 'Archaeologists identify ancient sickles by their "sickle sheen" — a glass-like polish left by plant silica rubbing against chert.'
      }
    ]
  },
  {
    id: 'perennial_river',
    label: 'Perennial River & Inundation Channels',
    icon: '🌊',
    description: 'A meandering freshwater river with natural oxbows and flood spillways. Managing its flow is the difference between bountiful crops and catastrophic flood.',
    discoverMessage: 'Early farmers did not build massive dams; they used seasonal inundation, cutting shallow overflow channels to gently flood seed beds with silt-laden water.',
    exploreItems: [
      {
        id: 'l2_channel_cut',
        icon: '💧',
        label: 'Inspect Natural Inundation Channel',
        resourceName: 'River Water',
        examineTitle: 'Overflow Spillway & Embankment',
        whyUseful: 'Natural overflow channels can be controlled with simple clay dykes to flood field terraces without washing away newly planted seed beds.',
        feedback: 'You channeled freshwater from the river overflow to supply field trenches and livestock.',
        reward: { water: 3 }
      },
      {
        id: 'l2_river_cobbles',
        icon: '🪨',
        label: 'Gather River Cobbles & Sandstone',
        resourceName: 'Quern Stones',
        examineTitle: 'Metamorphic River Cobbles',
        whyUseful: 'Dense river cobbles and sandstone boulders are essential for fashioning grinding slabs, hearth stones, and sturdy post footings.',
        feedback: 'You retrieved heavy, smooth sandstone cobbles suitable for grain processing and building foundations.',
        reward: { stone: 2 }
      },
      {
        id: 'l2_river_timber',
        icon: '🪵',
        label: 'Harvest Riverbank Timber & Reeds',
        resourceName: 'Thatch & Timber',
        examineTitle: 'Riverbank Acacia & Wetland Reeds',
        whyUseful: 'Strong riverbank timber provides ridge beams for dwellings, while thick reeds form watertight thatched roofs.',
        feedback: 'You gathered strong wooden poles and bundles of thatch reed for settlement construction.',
        reward: { wood: 2 }
      }
    ],
    discoveryTitle: 'Stone Saddle Quern & Grinding Muller',
    examinationNotes: 'A large, concave sandstone slab paired with a heavy cylindrical hand-muller stone. Both surfaces are worn smooth and slightly pitted from grinding grain day after day in a domestic kitchen area.',
    usePrompt: 'What was the vital community purpose of the saddle quern and muller?',
    useOptions: [
      {
        label: 'Crushing hard harvested grains and legumes into coarse flour and easily cooked meal',
        isCorrect: true,
        feedback: 'Spot on! Raw wheat, barley, and rice grains are difficult to digest. Grinding them into meal on saddle querns allowed boiling porridge and baking flatbreads.'
      },
      {
        label: 'Forging iron swords and heavy metallic armors for territorial warfare',
        isCorrect: false,
        feedback: 'Incorrect. Early farming settlements had not developed iron metallurgy; saddle querns were food processing tools.'
      },
      {
        label: 'Weaving wool and linen fibers into elaborate royal garments',
        isCorrect: false,
        feedback: 'Incorrect. Querns are heavy grinding stones used exclusively for crushing seed grains and spices.'
      }
    ],
    yields: { stone: 2, grain: 2 },
    artifactId: 'saddle_quern',
    visualStory: [
      {
        title: 'Managing Seasonal Floods: Inundation Farming',
        text: 'Rather than fighting the mighty rivers, early Indian farmers adapted to the monsoon pulse. When waters rose, they guided the gentle overflow into earthen bunds, letting fertile silt settle across fields.',
        icon: '🌊',
        funFact: 'Inundation farming trapped moisture deep in the subsoil, enabling crops like wheat, barley, and winter pulses to flourish even during dry winter months.'
      },
      {
        title: 'The Daily Rhythm of Grain Processing',
        text: 'Harvesting was only half the work. Grain had to be threshed, winnowed to remove chaff, parched to prevent germination, and ground daily on heavy stone saddle querns.',
        icon: '🪨',
        funFact: 'Saddle querns are among the most common household artifacts excavated in early Neolithic village floors across the subcontinent.'
      },
      {
        title: 'Nutritional Transformation',
        text: 'Crushed grains and cooked pulses provided a dependable, calorie-dense carbohydrate source. This steady food supply lowered infant mortality and supported growing village populations.',
        icon: '🥣',
        funFact: 'Combined with wild game, river fish, and dairy from early cattle, early farming diets were varied and regional.'
      }
    ]
  },
  {
    id: 'clay_banks',
    label: 'Clay Riverbanks & Pottery Workshop',
    icon: '🏺',
    description: 'Steep riverbanks exposing dense, plastic alluvial clay beds. Nearby open bonfires reveal the emergence of pottery, one of early humanity’s greatest inventions.',
    discoverMessage: 'Clay could be hand-coiled into vessels and baked in bonfire pits. Pottery solved the critical problems of storing food, holding liquids, and boiling grains.',
    exploreItems: [
      {
        id: 'l2_alluvial_clay',
        icon: '🏺',
        label: 'Dig Fine Alluvial Clay',
        resourceName: 'Potter Clay',
        examineTitle: 'Plastic River Silt Clay Beds',
        whyUseful: 'Fine-grained plastic clay with minimal sand content can be rolled into smooth coils and hand-shaped into watertight pots.',
        feedback: 'You dug workable pottery clay from the river terrace — vital for crafting storage vessels and granary plaster.',
        reward: { clay: 3 }
      },
      {
        id: 'l2_chaff_temper',
        icon: '🌾',
        label: 'Prepare Straw & Chaff Temper',
        resourceName: 'Clay Temper',
        examineTitle: 'Grain Chaff & Organic Binders',
        whyUseful: 'Mixing chopped straw, chaff, and dung into wet clay (temper) prevents pots from shrinking and cracking as they dry in the sun.',
        feedback: 'You blended dried grain chaff with clay paste to create sturdy, crack-resistant ceramic mix.',
        reward: { mud: 2, wood: 1 }
      },
      {
        id: 'l2_cord_fibers',
        icon: '🌱',
        label: 'Twist Plant Fiber Cord Impressions',
        resourceName: 'Cord Wrappings',
        examineTitle: 'Twisted Wild Hemp & Grass Cords',
        whyUseful: 'Twisted cords wrapped around wooden paddles were pressed against wet clay to compact walls and leave distinctive textured cord marks.',
        feedback: 'You prepared cord-wrapped paddles that give early pottery its signature grip and structural strength.',
        reward: { seeds: 2 }
      }
    ],
    discoveryTitle: 'Cord-Marked Earthenware Storage Jar',
    examinationNotes: 'A hand-coiled globular ceramic jar with distinctive cord impressions stamped into the outer walls. Fired in an open bon-fire pit, its thick walls are coated inside with fine silt slip to seal the pores against moisture and insects.',
    usePrompt: 'Why was cord-marked earthenware pottery a revolutionary invention for settled farming communities?',
    useOptions: [
      {
        label: 'Providing airtight surplus grain storage, clean water transport, and a vessel to boil starch-rich food into porridge',
        isCorrect: true,
        feedback: 'Accurate! Without pottery, early communities could not boil starchy grains or store surplus food safely through wet seasons.'
      },
      {
        label: 'Minting early currency tokens to buy luxury goods from overseas empires',
        isCorrect: false,
        feedback: 'Incorrect. Early farming settlements operated on reciprocal sharing and barter; pottery was an essential utilitarian container.'
      },
      {
        label: 'Smelting high-temperature iron tools in blast furnace workshops',
        isCorrect: false,
        feedback: 'Incorrect. Cord-marked earthenware was domestic pit-fired pottery, not high-temperature industrial smelting crucibles.'
      }
    ],
    yields: { clay: 2, grain: 2 },
    artifactId: 'early_pottery',
    visualStory: [
      {
        title: 'The Storage & Pottery Revolution',
        text: 'Hunter-gatherers carried lightweight skin bags and woven baskets. Farmers, however, produced bulky grain harvests that needed to sit safely in one spot for an entire year. Pottery made long-term storage possible.',
        icon: '🏺',
        funFact: 'Cord-marked pottery is a trademark of early Neolithic farming sites in the Belan and Ganga valleys, including Koldihwa and Lahuradewa.'
      },
      {
        title: 'Hand-Coiled Craftsmanship',
        text: 'Before the pottery wheel was invented, potters built vessels by rolling long clay coils, smoothing the joints, and beating the exterior with a cord-wrapped wooden paddle to compact the clay walls.',
        icon: '👐',
        funFact: 'Cord impressions were not just decorative — they provided a non-slip grip when handling heavy, water-filled jars.'
      },
      {
        title: 'Boiling: A Culinary Leap',
        text: 'Pottery allowed direct cooking over fire. Hard grains, dried lentils, and tough roots could be simmered for hours, unlocking nutrients that raw chewing could never access.',
        icon: '🍲',
        funFact: 'Soft grain gruels and porridges allowed mothers to wean infants earlier, contributing to community growth and larger settled populations.'
      }
    ]
  },
  {
    id: 'settlement_pen',
    label: 'Settled Village Site & Cattle Pen',
    icon: '🛖',
    description: 'A permanent village clearing overlooking the fields. Rectangular mudbrick houses, fenced cattle pens, and elevated granaries show a community planning for the future.',
    discoverMessage: 'Farming required remaining in one location to protect crops from wild animals, maintain water channels, and guard grain stores through the winter.',
    exploreItems: [
      {
        id: 'l2_mudbrick_mix',
        icon: '🧱',
        label: 'Mix Mudbrick Clay & Sun-Bake Bricks',
        resourceName: 'Mudbrick',
        examineTitle: 'Alluvial Mudbrick Formulation',
        whyUseful: 'Sun-baked mudbricks made of silt, sand, and straw offer superb thermal insulation, keeping dwellings cool in summer and warm in winter.',
        feedback: 'You mixed and dried solid mudbricks — essential materials for constructing permanent village homes.',
        reward: { mud: 3 }
      },
      {
        id: 'l2_cattle_corral',
        icon: '🪵',
        label: 'Inspect Acacia Cattle Enclosure',
        resourceName: 'Pen Fencing',
        examineTitle: 'Thorny Acacia Wattle Enclosure',
        whyUseful: 'Thorny wattle corrals protect domesticated humped zebu cattle (*Bos indicus*) at night from predators and stop them from trampling newly sown fields.',
        feedback: 'You reinforced the livestock corral with sturdy timber fencing and stone footings.',
        reward: { wood: 2 }
      },
      {
        id: 'l2_stored_sheaves',
        icon: '🌾',
        label: 'Inspect Harvested Grain Sheaves',
        resourceName: 'Harvested Grain',
        examineTitle: 'Dried Cereal Sheaves & Seed Stocks',
        whyUseful: 'Dried grain sheaves must be inspected for mildew and separated into consumption grain and protected seed stock for next planting.',
        feedback: 'You secured dry grain sheaves into community storage bins for village sustenance.',
        reward: { grain: 3 }
      }
    ],
    discoveryTitle: 'Elevated Mud-Plastered Granary Silo',
    examinationNotes: 'A raised circular granary silo constructed on stone footings to elevate stored grain above damp soil. The interior is sealed with lime and cattle-dung plaster, which acts as a natural deterrent against burrowing insects and rodents.',
    usePrompt: 'Why was elevating and plastering the granary silo critical for settlement survival?',
    useOptions: [
      {
        label: 'Preventing ground dampness, fungal mold, and burrowing pests from destroying the seed reserves',
        isCorrect: true,
        feedback: 'Vital planning! Ground moisture and rodents could destroy an entire season’s surplus. Elevating the granary guaranteed food security through the non-growing season.'
      },
      {
        label: 'Serving as an open bonfire tower to cook meals for the whole valley',
        isCorrect: false,
        feedback: 'Incorrect. Fire near a wooden, thatch, and grain granary would incinerate the entire community food supply.'
      },
      {
        label: 'Collecting ocean saltwater to preserve foreign spices',
        isCorrect: false,
        feedback: 'Incorrect. Early farming villages were inland river settlements focused on local grain conservation.'
      }
    ],
    yields: { grain: 3, wood: 2 },
    artifactId: 'granary_pit',
    visualStory: [
      {
        title: 'Settled Architecture: From Brush to Mudbrick',
        text: 'Unlike nomadic hunters who built temporary brush windbreaks, farming families built permanent rectangular homes with partitioned rooms, plastered floors, and central hearths.',
        icon: '🛖',
        funFact: 'At Mehrgarh, multi-room mudbrick houses dating back over 8,000 years featured specialized compartments specifically designed for grain storage.'
      },
      {
        title: 'Domestic Animals: Partners in Survival',
        text: 'Domesticated humped zebu cattle (*Bos indicus*), goats, and sheep transformed agriculture. Cattle pulled early tilling implements, provided rich milk, and their dung served as fuel and fertilizer.',
        icon: '🐂',
        funFact: 'In Southern India, early agropastoral communities created large circular cattle pens that over centuries formed landmark "ashmounds" from burned dung layers.'
      },
      {
        title: 'Community Planning & Collective Labor',
        text: 'A single family could not dig long irrigation trenches, clear thick riverbank forests, or guard cattle against predators. Village councils and shared communal granaries bound families together into stable societies.',
        icon: '🤝',
        funFact: 'The surplus produced by early farming communities eventually paved the way for specialized artisans, trade networks, and urban civilization.'
      }
    ]
  }
];
