export const level1Locations = [
  {
    id: 'forest',
    label: 'Dense Forest & Groves',
    icon: '🌳',
    description: 'A woodland rich in hardwood trees, wild fruiting shrubs, fibrous creepers, and edible roots.',
    discoverMessage: 'Forests provided early foraging bands with timber for shelter frames and digging sticks, plus seasonal fruits, tubers, nuts, and plant fibers.',
    exploreYields: { wood: 2, plants: 2 },
    yields: { wood: 1, plants: 1 },
    exploreItems: [
      {
        id: 'forest_wood',
        icon: '🪵',
        label: 'Hardwood Branches & Dry Deadfall',
        resourceName: 'Wood',
        examineTitle: 'Seasoned Hardwood & Straight Branches',
        whyUseful: 'Useful for constructing sturdy shelter frames, carving fire-hardened digging sticks and spear shafts, and fueling campfires through cold nights.',
        feedback: 'Collected 2 Wood — essential structural timber and fuel for your camp.',
        reward: { wood: 2 }
      },
      {
        id: 'forest_plants',
        icon: '🌿',
        label: 'Edible Wild Tubers, Berries & Plant Fibers',
        resourceName: 'Edible Plants',
        examineTitle: 'Nutrient-Rich Roots, Berries & Fibrous Bark',
        whyUseful: 'Wild tubers and berries provide daily calories and vitamins, while tough inner bark and fibrous stems can be twisted into cordage to bind stone tools and roof thatch.',
        feedback: 'Collected 2 Edible Plants — vital daily nutrition and binding fiber.',
        reward: { plants: 2 }
      },
      {
        id: 'forest_trails',
        icon: '🐾',
        label: 'Foraging Trails & Beehives',
        resourceName: 'Environmental Clue',
        examineTitle: 'Animal Tracks & Seasonal Fruiting Trees',
        whyUseful: 'Reading animal tracks and fruiting cycles tells the band which plants are safe to eat and where wild game moves at dawn and dusk.',
        feedback: 'Mapped safe foraging trails through the forest canopy.',
        reward: {}
      }
    ],
    discoveryTitle: 'Fire-Hardened Digging Stick & Twisted Bark Cordage',
    examinationNotes: 'A heavy hardwood branch sharpened with a stone scraper and charred in embers to harden the tip, found alongside braided plant-fiber cordage.',
    usePrompt: 'Based on the fire-hardened point and braided plant fibers, how did early humans use these forest materials?',
    useOptions: [
      {
        label: 'Prying up underground tubers and lashing stone blades or shelter poles together',
        isCorrect: true,
        feedback: 'Correct! Digging sticks unlocked calorie-rich underground roots, while plant cordage allowed early humans to lash composite tools and shelter frames.'
      },
      {
        label: 'Smelting copper ore inside clay furnaces',
        isCorrect: false,
        feedback: 'Not quite — metalworking appeared thousands of years later during the Chalcolithic period.'
      },
      {
        label: 'Plowing irrigated fields with domesticated oxen',
        isCorrect: false,
        feedback: 'Not yet — Paleolithic bands were mobile foragers before animals and crops were domesticated.'
      }
    ],
    visualStory: [
      {
        type: 'Food Gathering',
        icon: '🌿',
        title: 'Cooperative Foraging & Plant Knowledge',
        text: 'Connected to your discovery of Edible Plants and the Digging Stick: Paleolithic communities relied heavily on gathered plant foods—wild tubers, roots, berries, seeds, and honey—which provided the most reliable daily nutrition.',
        evidence: 'Carbonized plant remains, starch grains on grinding stones, and rock paintings at Bhimbetka depict women and men gathering wild fruits, honey, and roots.',
        uncertainty: 'Because wood and soft plants decay rapidly, archaeologists infer wooden digging sticks from wear marks on stone scrapers and ethnographic parallels.'
      },
      {
        type: 'Environmental Adaptation',
        icon: '🌦️',
        title: 'Moving with the Seasons',
        text: 'Early human bands did not wander aimlessly. They followed a careful seasonal round—gathering forest fruits after the monsoon, harvesting tubers in dry months, and rotating camps so local resources could regenerate.',
        evidence: 'Distribution of seasonal microlithic and Acheulean camp sites across the Vindhya hills and Narmada valley.',
        uncertainty: 'Exact group sizes varied by season, likely ranging from small family bands of 15–30 in dry months to larger gatherings when food was abundant.'
      }
    ]
  },
  {
    id: 'water',
    label: 'River Valley & Spring',
    icon: '🌊',
    description: 'A clear perennial river winding over beds of smooth quartzite cobbles and reed-lined banks.',
    discoverMessage: 'Rivers were the lifelines of prehistoric India, supplying fresh drinking water, attracting wildlife, and depositing water-worn cobbles ideal for toolmaking.',
    exploreYields: { water: 2, stone: 1 },
    yields: { water: 2 },
    exploreItems: [
      {
        id: 'river_water',
        icon: '💧',
        label: 'Fresh Flowing Stream Water',
        resourceName: 'Water',
        examineTitle: 'Clear Running Water Over Gravel Beds',
        whyUseful: 'Flowing water is safer to drink than stagnant pools. It sustains the band daily, softens hides and plant fibers for weaving, and draws game animals to the valley.',
        feedback: 'Collected 2 Water — clean hydration secured from the flowing stream.',
        reward: { water: 2 }
      },
      {
        id: 'river_cobbles',
        icon: '🪨',
        label: 'Water-Worn Quartzite Cobbles',
        resourceName: 'Stone',
        examineTitle: 'Dense, Rounded River Hammerstones',
        whyUseful: 'Tumbled by river currents, only the hardest, flaw-free stones survive intact. Their rounded grip makes them ideal hammerstones for striking flakes off tool cores.',
        feedback: 'Collected 1 Stone — a dense river hammerstone ready for tool knapping.',
        reward: { stone: 1 }
      },
      {
        id: 'river_terrace',
        icon: '🦌',
        label: 'Riverbank Game Crossing',
        resourceName: 'Environmental Clue',
        examineTitle: 'Hoofprints Along the Shallow Ford',
        whyUseful: 'Camping near—but slightly above—a river crossing gives the community access to water and hunting grounds while staying safe from flash floods.',
        feedback: 'Surveyed the elevated river terrace and wildlife crossing.',
        reward: {}
      }
    ],
    discoveryTitle: 'Unifacial Pebble Chopper & Natural Gourd/Hide Water Container',
    examinationNotes: 'A heavy river pebble with several flakes struck off one side to create a jagged chopping edge, resting beside waterproofed natural containers.',
    usePrompt: 'Why did early humans shape river pebbles into choppers and fashion portable water containers?',
    useOptions: [
      {
        label: 'To crack marrow-rich bones, chop driftwood, and carry water on foraging treks away from the river',
        isCorrect: true,
        feedback: 'Correct! Pebble choppers (Oldowan/Soanian style) processed tough materials at the riverbank, while water containers let foragers range further into dry hills.'
      },
      {
        label: 'To build baked-brick aqueducts and municipal bathhouses',
        isCorrect: false,
        feedback: 'Baked-brick hydraulic engineering developed much later during the Indus Civilization.'
      },
      {
        label: 'To anchor deep-sea merchant ships',
        isCorrect: false,
        feedback: 'Oceanic trade networks emerged millennia later.'
      }
    ],
    visualStory: [
      {
        type: 'Water & Survival',
        icon: '💧',
        title: 'Rivers as Prehistoric Corridors',
        text: 'Connected to the Fresh Water and River Cobbles you gathered: Major Indian prehistoric sites—along the Narmada, Son, Kortallayar, and Hunsgi valleys—clustered along perennial river terraces that offered water, stone cobbles, and game.',
        evidence: 'Stratified river gravel beds in the Narmada Valley yielded both Middle Pleistocene hominin fossils and thousands of stone tools.',
        uncertainty: 'River floods occasionally reworked ancient camp layers, requiring geoarchaeologists to study soil strata carefully.'
      },
      {
        type: 'Environmental Adaptation',
        icon: '🌱',
        title: 'Adapting to Changing Landscapes',
        text: 'As climates shifted from drier glacial phases to wetter monsoon eras, early communities adapted their toolkit—transitioning from heavy river-cobble choppers to nimble composite spears, traps, and fishing gear.',
        evidence: 'Mesolithic sites show fish bones, turtle shells, and barbed bone harpoons alongside geometric microliths.',
        uncertainty: 'Organic nets and baskets rarely fossilize, though impressions in clay and rock art confirm their use.'
      }
    ]
  },
  {
    id: 'rocks',
    label: 'Rocky Outcrop & Flint Beds',
    icon: '🪨',
    description: 'An exposed ridge of hard quartzite, chert, and flint nodules overlooking the valley.',
    discoverMessage: 'Rocky outcrops served as prehistoric workshops where skilled toolmakers knapped quartzite hand axes, cleavers, and razor-sharp flint blades.',
    artifactId: 'hand_axe',
    exploreYields: { stone: 2, flint: 2 },
    yields: { stone: 2, flint: 1 },
    exploreItems: [
      {
        id: 'outcrop_stone',
        icon: '🪨',
        label: 'Fine-Grained Quartzite Blocks',
        resourceName: 'Stone',
        examineTitle: 'Fracture-Ready Quartzite & Sandstone',
        whyUseful: 'Fine-grained quartzite breaks cleanly when struck with a hammerstone, allowing toolmakers to shape durable hand axes, cleavers, and shelter anchor stones.',
        feedback: 'Collected 2 Stone — high-grade quartzite for tools and shelter walls.',
        reward: { stone: 2 }
      },
      {
        id: 'outcrop_flint',
        icon: '🔪',
        label: 'Chert & Flint Nodules',
        resourceName: 'Flint',
        examineTitle: 'Glassy Silica Nodules with Razor Edges',
        whyUseful: 'Flint and chert split into ultra-sharp flakes for cutting meat, scraping hides, and slicing plant stems—and produce hot sparks when struck against iron pyrites.',
        feedback: 'Collected 2 Flint — sharp silica cores for cutting blades and fire-starting.',
        reward: { flint: 2 }
      },
      {
        id: 'outcrop_debitage',
        icon: '🔍',
        label: 'Ancient Knapping Floor (Flake Scatter)',
        resourceName: 'Environmental Clue',
        examineTitle: 'Ring of Stone Flakes Around a Boulder Seat',
        whyUseful: 'Hundreds of discarded stone chips show the exact angle and force needed to detach clean blades without shattering the core.',
        feedback: 'Studied the stone-knapping techniques at the quarry workshop.',
        reward: {}
      }
    ],
    discoveryTitle: 'Acheulean Bifacial Hand Axe & Microlithic Scrapers',
    examinationNotes: 'A symmetrical, teardrop-shaped stone hand axe flaked on both faces (bifacial) to form a sharp all-around cutting edge and a rounded butt that fits comfortably in the palm.',
    usePrompt: 'Examine the symmetrical teardrop blade and heavy base of this Acheulean hand axe. What made it the "Swiss Army knife" of the Paleolithic?',
    useOptions: [
      {
        label: 'Its balanced weight and dual cutting edges allowed chopping wood, butchering game, scraping hides, and digging roots',
        isCorrect: true,
        feedback: 'Correct! The Acheulean hand axe was a versatile multipurpose tool used for over a million years across India, from Attirampakkam to Bhimbetka.'
      },
      {
        label: 'It was used exclusively as stamped currency in urban markets',
        isCorrect: false,
        feedback: 'Coinage did not exist in the Paleolithic; every stone tool was crafted for direct survival tasks.'
      },
      {
        label: 'It was purely decorative and too fragile for physical work',
        isCorrect: false,
        feedback: 'Microscopic wear traces (microwear analysis) on excavated hand axes prove heavy use on wood, bone, and meat.'
      }
    ],
    visualStory: [
      {
        type: 'Stone Tools',
        icon: '🪨',
        title: 'The Science of Stone Knapping',
        text: 'Connected to your discovery of the Acheulean Hand Axe: Making a stone tool required deep knowledge of rock mechanics, mental planning, and hand-eye coordination. Toolmakers struck a core stone at precise angles using stone, bone, or antler hammers.',
        evidence: 'Sites like Attirampakkam (Tamil Nadu), Isampur (Karnataka), and Bhimbetka (Madhya Pradesh) preserve complete sequences of cores, hammerstones, and finished hand axes.',
        uncertainty: 'Scholars debate how early hominins transmitted these complex toolmaking traditions—whether through imitation, gesture, or early spoken language.'
      },
      {
        type: 'Technological Evolution',
        icon: '🏹',
        title: 'From Heavy Hand Axes to Tiny Microliths',
        text: 'Over tens of thousands of years, stone tools became smaller and more specialized. By the Mesolithic period, artisans crafted tiny geometric blades (microliths) less than 3 cm long and mounted them into wooden spears, arrows, and sickles.',
        evidence: 'Thousands of crescent, trapezoid, and triangular agate and chalcedony microliths excavated across central and western India.',
        uncertainty: 'Often only the stone tips survive in the soil, while the wooden shafts and resin adhesives have decayed.'
      }
    ]
  },
  {
    id: 'shelter_area',
    label: 'Limestone Cave & Overhang',
    icon: '⛰️',
    description: 'A dry sandstone and limestone rock shelter raised above the valley floor, shielded from wind and rain.',
    discoverMessage: 'Natural caves and rock overhangs served as seasonal base camps, sheltering early communities from monsoons and preserving hearth ashes and rock paintings.',
    artifactId: 'fire',
    exploreYields: { plants: 1, stone: 1 },
    yields: { wood: 1, flint: 1 },
    exploreItems: [
      {
        id: 'cave_tinder',
        icon: '🌾',
        label: 'Dry Grass Tinder & Bedding Moss',
        resourceName: 'Edible Plants / Fiber',
        examineTitle: 'Bone-Dry Grasses Sheltered Under the Ledge',
        whyUseful: 'Kept dry beneath the rock overhang even during rainstorms, fine dry grass catches sparks immediately to ignite a fire and insulates sleepers from cold stone.',
        feedback: 'Collected 1 Plants — dry tinder and insulating bedding.',
        reward: { plants: 1 }
      },
      {
        id: 'cave_slabs',
        icon: '🪨',
        label: 'fallen Limestone & Sandstone Slabs',
        resourceName: 'Stone',
        examineTitle: 'Flat Weathering Slabs Near the Cave Entrance',
        whyUseful: 'Flat stone slabs can be stacked across the mouth of an overhang to block cold night winds and ring a communal fire hearth.',
        feedback: 'Collected 1 Stone — flat slabs for shelter windbreaks and hearth rings.',
        reward: { stone: 1 }
      },
      {
        id: 'cave_walls',
        icon: '🎨',
        label: 'Red Ochre (Hematite) & Sheltered Alcove',
        resourceName: 'Environmental Clue',
        examineTitle: 'Iron-Rich Red Mineral Nodules & Smooth Rock Wall',
        whyUseful: 'Natural iron oxide (ochre) ground with water or animal fat creates enduring red pigment used by early humans to paint hunting scenes and communal symbols.',
        feedback: 'Examined the dry rock alcove and natural mineral pigments.',
        reward: {}
      }
    ],
    discoveryTitle: 'Stratified Hearth Ash & Prehistoric Rock Art Panel',
    examinationNotes: 'A stone-lined hearth pit containing layers of white wood ash, charred seeds, and fire-cracked stones, beneath a rock wall painted in red and white mineral pigments.',
    usePrompt: 'What does the combination of a stone-lined hearth and painted cave walls reveal about early human life in rock shelters?',
    useOptions: [
      {
        label: 'Controlled fire provided warmth, cooked food, and predator defense, while rock art shared hunting knowledge and communal identity',
        isCorrect: true,
        feedback: 'Correct! Mastery of fire and shared symbolic culture turned natural rock overhangs into true community homes.'
      },
      {
        label: 'They used the cave only as a temporary iron-smelting factory',
        isCorrect: false,
        feedback: 'These layers date to the Stone Age, long before iron metallurgy.'
      },
      {
        label: 'The paintings were written tax records for a royal bureaucracy',
        isCorrect: false,
        feedback: 'Prehistoric rock art predates formal writing systems by thousands of years.'
      }
    ],
    visualStory: [
      {
        type: 'Shelter & Fire',
        icon: '🔥',
        title: 'Shelter and the Mastery of Fire',
        text: 'Connected to your discovery of the Hearth and Cave Overhang: Natural rock shelters like Bhimbetka offered dry roofs, while stone windbreaks and branch lean-tos sealed out rain. At the center sat the hearth—providing warmth, light, protection from predators, and cooked food that was easier to digest.',
        evidence: 'Excavations in Indian rock shelters reveal deep sequences of ash lenses, burnt bone, stone windbreak alignments, and occupation floors spanning tens of thousands of years.',
        uncertainty: 'Distinguishing between early opportunistic use of natural wildfires and deliberate fire-making with flint or friction drills requires microscopic analysis of hearth sediments.'
      },
      {
        type: 'Community & Adaptation',
        icon: '🎨',
        title: 'Shared Knowledge on Living Rock',
        text: 'Around the fire and upon the shelter walls, early humans passed down vital survival wisdom. Rock paintings depict cooperative hunts, wild animals, honey collection, and communal dances—showing how cooperation and shared knowledge enabled small bands to thrive.',
        evidence: 'Over 700 rock shelters at Bhimbetka (a UNESCO World Heritage Site) contain paintings in red hematite and white kaolin spanning from the Upper Paleolithic and Mesolithic onwards.',
        uncertainty: 'While scenes of hunting and dancing are clear, the deeper spiritual or storytelling meanings behind geometric symbols remain open to interpretation.'
      }
    ]
  }
];
