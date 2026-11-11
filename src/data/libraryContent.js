export const libraryCategories = [
  {
    id: 'cat-civs',
    title: 'Civilizations',
    icon: '🏛️',
    description: 'Explore the rise of urban planning, statecraft, and empires across South Asia.',
    color: 'from-[#D9A441] to-[#B77B2E]'
  },
  {
    id: 'cat-arch',
    title: 'Architecture & Engineering',
    icon: '🛕',
    description: 'Discover rock-cut caves, stupas, stepwells, and structural stone temples.',
    color: 'from-[#C56A3D] to-[#9E472A]'
  },
  {
    id: 'cat-sci',
    title: 'Science, Math & Astronomy',
    icon: '🔭',
    description: 'Learn about the decimal system, zero, trigonometry, metallurgy, and Ayurveda.',
    color: 'from-[#3B82F6] to-[#1D4ED8]'
  },
  {
    id: 'cat-lit',
    title: 'Literature & Epics',
    icon: '📜',
    description: 'Journey through oral traditions, palm-leaf manuscripts, epics, and fables.',
    color: 'from-[#A855F7] to-[#7E22CE]'
  },
  {
    id: 'cat-art',
    title: 'Arts & Living Crafts',
    icon: '🎨',
    description: 'Explore Chola bronzes, terracotta, natural-dye textiles, and regional paintings.',
    color: 'from-[#EC4899] to-[#BE185D]'
  },
  {
    id: 'cat-dance',
    title: 'Dance & Theatre',
    icon: '💃',
    description: 'Understand the Natyashastra, Rasa theory, classical dance, and folk theatre.',
    color: 'from-[#F97316] to-[#C2410C]'
  },
  {
    id: 'cat-music',
    title: 'Music Traditions',
    icon: '🪕',
    description: 'Explore Raga and Tala systems, ancient instruments, and devotional music.',
    color: 'from-[#EAB308] to-[#A16207]'
  },
  {
    id: 'cat-games',
    title: 'Traditional Games',
    icon: '♟️',
    description: 'Discover how Chaturanga, Pachisi, and Pallanguzhi taught strategy and math.',
    color: 'from-[#10B981] to-[#047857]'
  },
  {
    id: 'cat-fest',
    title: 'Festivals & Community',
    icon: '🪔',
    description: 'See how seasonal harvests, astronomical cycles, and shared traditions unite communities.',
    color: 'from-[#F59E0B] to-[#B45309]'
  },
  {
    id: 'cat-food',
    title: 'Agricultural & Culinary Heritage',
    icon: '🌾',
    description: 'Trace native crops, spice routes, and traditional preservation techniques.',
    color: 'from-[#14B8A6] to-[#0F766E]'
  }
];

export const libraryBooks = [
  // 1. CIVILIZATIONS
  {
    id: 'book-indus',
    categoryId: 'cat-civs',
    title: 'The Indus Valley: Masters of Urban Planning',
    subtitle: 'How Harappa, Mohenjo-daro, and Dholavira pioneered civic sanitation and standardized trade.',
    coverIcon: '🧱',
    period: 'Mature Harappan (c. 2600–1900 BCE)',
    region: 'Northwestern Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Cities Built on a Grid',
        content: 'More than four thousand years ago, the Indus Civilization built planned cities across a vast river basin. Settlements such as Mohenjo-daro, Harappa, Rakhigarhi, and Dholavira featured streets laid out along cardinal directions (North–South and East–West). Buildings were constructed using baked mud bricks made in a strict 1:2:4 ratio of thickness, width, and length, allowing structures across distant cities to share uniform engineering standards.'
      },
      {
        title: 'Water Engineering & Covered Drains',
        content: 'Unlike many contemporary ancient civilizations that focused only on royal monuments, Harappan cities prioritized public water access and sanitation. Most homes had private bathing platforms and wells. Wastewater flowed through terracotta pipes into covered brick channels lining the streets, complete with settling sumps and removable stone inspection slabs for routine cleaning.'
      },
      {
        title: 'Seals, Weights & Long-Distance Trade',
        content: 'Harappan artisans crafted carnelian beads, shell bangles, and carved steatite seals bearing animal motifs and an undeciphered script. Merchants used cubical chert weights following a precise binary and decimal progression. Archaeological discoveries of Indus seals and beads in Mesopotamia (referred to as Meluhha in cuneiform records) and the tidal dockyard at Lothal confirm active maritime and overland exchange.'
      }
    ],
    funFacts: [
      'Dholavira in Gujarat relied on giant rock-cut reservoirs and check dams to harvest seasonal rainwater in an arid climate.',
      'The Indus script contains around 400 distinct signs and remains undeciphered because no bilingual inscription like the Rosetta Stone has yet been found.',
      'Baked bricks rather than sun-dried bricks were used in flood-prone plains, giving Indus structures remarkable durability.'
    ]
  },
  {
    id: 'book-maurya',
    categoryId: 'cat-civs',
    title: 'The Mauryan Empire & Edicts of Dhamma',
    subtitle: 'Imperial administration, royal highways, and Emperor Ashoka’s inscriptions across South Asia.',
    coverIcon: '🦁',
    period: 'Mauryan Era (c. 322–185 BCE)',
    region: 'Pan-Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Unifying the Subcontinent',
        content: 'Emerging from the kingdom of Magadha with its capital at Pataliputra (modern Patna), the Mauryan Empire founded by Chandragupta Maurya connected regions from Gandhara in the northwest to Karnataka in the south. The treatise Arthashastra, attributed to Kautilya (Chanakya), describes an organized administration managing agriculture, taxation, trade routes, forests, and municipal governance.'
      },
      {
        title: 'The Turning Point at Kalinga',
        content: 'In the 3rd century BCE, Emperor Ashoka waged a destructive war in Kalinga (coastal Odisha). In Major Rock Edict XIII, Ashoka openly recorded his remorse over the suffering caused by conquest and resolved to pursue Dhamma-vijaya—victory through righteousness, compassion, and social welfare rather than military force.'
      },
      {
        title: 'Speaking Through Stone',
        content: 'Ashoka commissioned rock and pillar edicts across the empire in local Prakrit dialects using the Brahmi and Kharosthi scripts, as well as Greek and Aramaic in the northwest. These inscriptions urged religious tolerance, truthfulness, care for elders, medical treatment for humans and animals, and the planting of shade trees and wells along royal highways.'
      }
    ],
    funFacts: [
      'The Lion Capital of Ashoka at Sarnath, carved from a single block of polished Chunar sandstone, serves as the National Emblem of India.',
      'British epigraphist James Prinsep deciphered the Brahmi script in 1837, unlocking the reading of Ashoka’s edicts after centuries.',
      'Mauryan stone polish was so fine that travelers centuries later mistook sandstone pillars for cast metal.'
    ]
  },
  {
    id: 'book-chola-vijayanagara',
    categoryId: 'cat-civs',
    title: 'Southern Empires: Chola & Vijayanagara',
    subtitle: 'Village assemblies, Kaveri hydro-engineering, maritime guilds, and the metropolitan markets of Hampi.',
    coverIcon: '⛵',
    period: '9th–16th Century CE',
    region: 'Southern India & Deccan',
    readTime: '6 min read',
    chapters: [
      {
        title: 'Sabhas & Local Self-Governance',
        content: 'The Uttaramerur temple inscriptions from the reign of Parantaka Chola I (10th century CE) document a detailed system of village self-governance. Local assemblies (Sabha and Ur) elected specialized committees using palm-leaf ballots placed in a pot (Kudavolai) to oversee irrigation tanks, gardens, justice, and tax records.'
      },
      {
        title: 'Maritime Guilds & Ocean Networks',
        content: 'Under Rajaraja I and Rajendra I, the Chola dynasty combined deltaic agriculture with naval power. Merchant guilds such as the Ayyavole 500 and Manigramam traded textiles, spices, and bronzes across the Bay of Bengal, Sri Lanka, Southeast Asia, and Song-dynasty China.'
      },
      {
        title: 'Vijayanagara & the City of Hampi',
        content: 'Founded in the 14th century along the Tungabhadra River, the Vijayanagara capital at Hampi integrated rocky granite ridges into multi-layered fortifications, stone aqueducts, stepped tanks (pushkaranis), and pillared bazaar streets where merchants from Persia, Portugal, and Asia traded horses, gems, and silks.'
      }
    ],
    funFacts: [
      'The Kallanai (Grand Anicut) across the Kaveri River is one of the oldest water-diversion structures in the world still in use.',
      'Foreign travelers like Abdur Razzaq and Domingo Paes described Vijayanagara as comparable in size and prosperity to Rome.'
    ]
  },

  // 2. ARCHITECTURE & ENGINEERING
  {
    id: 'book-temples',
    categoryId: 'cat-arch',
    title: 'Sacred Geometry: Stupas, Caves & Temples',
    subtitle: 'How ancient architects excavated mountains and engineered interlocking stone monuments.',
    coverIcon: '🛕',
    period: '3rd Century BCE – 13th Century CE',
    region: 'Pan-Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Carving Out of Living Rock',
        content: 'At sites like Barabar, Karle, Ajanta, and Ellora, Indian architect-sculptors did not stack stones—they excavated entire halls out of solid basalt cliffs. The Kailasa Temple (Cave 16) at Ellora was carved top-down from a single mountainside, removing hundreds of thousands of tons of volcanic rock with chisels and hammers to leave behind a freestanding multi-story temple.'
      },
      {
        title: 'Nagara & Dravida Structural Traditions',
        content: 'Structural stone temples evolved two primary architectural vocabularies codified in the Shilpa Shastras: the Nagara style in the north, characterized by a curvilinear tower (Rekha-Shikhara) as seen at Khajuraho and Konark, and the Dravida style in the south, featuring pyramidal tiered towers (Vimana) and monumental gateway towers (Gopurams) as seen at Thanjavur and Madurai.'
      },
      {
        title: 'Interlocking Stone without Mortar',
        content: 'Master builders fitted dressed granite and sandstone blocks together using mortise-and-tenon stone joints and iron dowels without lime mortar. At the Brihadisvara Temple in Thanjavur, completed in 1010 CE, a hollow pyramidal vimana rises over 60 meters, distributing weight through precise geometric corbelling.'
      }
    ],
    funFacts: [
      'The Sanchi Stupa’s stone gateways (Toranas) were carved by ivory-carver guilds from Vidisha using wood-joinery techniques in stone.',
      'The Vittala Temple in Hampi features 56 musical pillars (Saregama pillars) that emit distinct resonant tones when gently struck.'
    ]
  },
  {
    id: 'book-stepwells',
    categoryId: 'cat-arch',
    title: 'Stepwells & Hydraulic Ingenuity',
    subtitle: 'Subterranean water temples, baolis, and arid-zone rainwater harvesting across India.',
    coverIcon: '🪜',
    period: '7th–16th Century CE',
    region: 'Western & Northern India',
    readTime: '4 min read',
    chapters: [
      {
        title: 'Architecture Below the Earth',
        content: 'In regions with seasonal monsoons and deep water tables such as Gujarat and Rajasthan, communities engineered subterranean stepwells (known as Vav or Baoli). Flights of stone steps descended multiple stories underground so citizens could reach the water table regardless of how much it fluctuated between the dry summer and monsoon.'
      },
      {
        title: 'Rani ki Vav & Community Oasis',
        content: 'Commissioned in the 11th century at Patan, Rani ki Vav descends seven levels and is adorned with over 500 principal sculptures celebrating the sanctity of water. Beyond drawing water, stepwells functioned as cool subterranean social gathering spaces and rest stops along trade routes where temperatures were several degrees lower than the desert surface.'
      }
    ],
    funFacts: [
      'Chand Baori in Abhaneri (Rajasthan) contains 3,500 narrow symmetrical steps descending 13 stories into the earth.',
      'Stepwells recharged local aquifers during monsoon rains while preventing rapid evaporation under desert sunlight.'
    ]
  },

  // 3. SCIENCE, MATH & ASTRONOMY
  {
    id: 'book-math',
    categoryId: 'cat-sci',
    title: 'Zero, Infinity & the Stars',
    subtitle: 'How Aryabhata, Brahmagupta, and the Kerala School transformed global mathematics and astronomy.',
    coverIcon: '🔢',
    period: 'Classical to Medieval Era (c. 400–1500 CE)',
    region: 'Pataliputra, Ujjain & Kerala',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Shunya & the Place-Value Decimal System',
        content: 'Indian mathematicians unified the positional decimal system (using nine digits plus a symbol for zero, Shunya) so any magnitude could be written efficiently. In his 628 CE treatise Brahmasphutasiddhanta, Brahmagupta formulated systematic rules for arithmetic operations involving zero as a number in its own right, as well as positive (fortune) and negative (debt) quantities.'
      },
      {
        title: 'Aryabhata & Planetary Motion',
        content: 'Writing the Aryabhatiya in 499 CE at age 23, Aryabhata proposed that the apparent daily westward motion of the stars is caused by the Earth rotating on its own axis—analogous to a passenger in a moving boat seeing stationary objects on the riverbank move backward. He also calculated pi (3.1416), introduced sine tables (Jya), and explained solar and lunar eclipses scientifically as shadows cast by the Moon and Earth.'
      },
      {
        title: 'Infinite Series in the Kerala School',
        content: 'Between the 14th and 16th centuries, scholars of the Kerala School led by Madhava of Sangamagrama and Nilakantha Somayaji discovered infinite power series expansions for trigonometric functions (sine, cosine, and arctangent) and pi, laying foundational concepts of mathematical analysis.'
      }
    ],
    funFacts: [
      'The Bakhshali Manuscript, written on birch bark, contains some of the earliest surviving written dot symbols for zero.',
      'Indian numerals and trigonometric sine tables traveled via 8th–9th century Arabic scholars like Al-Khwarizmi to Europe.'
    ]
  },
  {
    id: 'book-metallurgy',
    categoryId: 'cat-sci',
    title: 'Crucible Steel, Zinc & the Iron Pillar',
    subtitle: 'The chemistry and materials science behind ancient Indian metallurgy and surgical instruments.',
    coverIcon: '🔬',
    period: '400 BCE – 1200 CE',
    region: 'Delhi, Rajasthan & Southern India',
    readTime: '5 min read',
    chapters: [
      {
        title: 'The Rustless Iron Pillar of Delhi',
        content: 'Forged during the Gupta period (c. 4th–5th century CE), the 7-meter, 6-ton Iron Pillar at Mehrauli in Delhi has stood exposed to the elements for over 1,600 years with minimal corrosion. Modern metallurgical analysis shows that high phosphorus content (from using charcoal rather than lime in smelting) combined with Delhi’s climate formed a microscopic protective passive film of crystalline iron hydrogen phosphate hydrate (misawite) on its surface.'
      },
      {
        title: 'Wootz Crucible Steel & Zawar Zinc',
        content: 'In southern India and Telangana, metallurgists sealed wrought iron with carbon-rich plant material inside clay crucibles to produce high-carbon Wootz steel, famed across West Asia for its watered Damascus pattern and keen edge. Meanwhile, at Zawar in Rajasthan, miners developed downward-distillation retorts to smelt metallic zinc—a difficult process because zinc vaporizes at a lower temperature than its ore can be reduced.'
      }
    ],
    funFacts: [
      'The Sushruta Samhita describes over 120 precision surgical instruments crafted from tempered steel, along with reconstructive nasal surgery (rhinoplasty).'
    ]
  },

  // 4. LITERATURE & EPICS
  {
    id: 'book-epics-fables',
    categoryId: 'cat-lit',
    title: 'Palm Leaves, Epics & Global Fables',
    subtitle: 'How oral recitation, the Panchatantra, and Sangam poetry preserved millennia of wisdom.',
    coverIcon: '📜',
    period: 'Ancient to Medieval Era',
    region: 'Pan-Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'The Science of Oral Preservation',
        content: 'Long before manuscripts were written on birch bark (Bhurjapatra) or cured palm leaves (Tala-patra), Indian scholars developed eleven phonetic recitation patterns (Pathas, such as Pada-patha and Ghana-patha) that cross-checked every syllable forward and backward, transmitting texts across generations with near-zero phonetic drift.'
      },
      {
        title: 'Itihasas & Sangam Poetics',
        content: 'The Mahabharata and Ramayana shaped ethical discourse, theatre, and visual arts across South and Southeast Asia. In the south, the Sangam literary academies produced anthologies like Ettuthokai and Pattuppattu, mapping human emotions onto five ecological landscapes (Tinai)—mountains, forests, farmlands, seashores, and arid lands.'
      },
      {
        title: 'Panchatantra & Jataka Tales on the Silk Road',
        content: 'Composed by Vishnu Sharma as five books of practical statecraft (Niti) taught through interconnected animal fables, the Panchatantra traveled to 6th-century Persia as Kalila wa-Dimna, then into Syriac, Arabic, Hebrew, Greek, and European languages—becoming one of the most widely translated literary works in world history.'
      }
    ],
    funFacts: [
      'Palm-leaf manuscripts were incised with an iron stylus and rubbed with lampblack and citronella oil, which darkened the letters and repelled insects.'
    ]
  },

  // 5. ARTS & LIVING CRAFTS
  {
    id: 'book-bronzes-textiles',
    categoryId: 'cat-art',
    title: 'Lost-Wax Bronzes, Natural Dyes & Folk Art',
    subtitle: 'The artisan guilds behind Chola bronzes, Ajanta murals, and Kalamkari & Ikat textiles.',
    coverIcon: '🎨',
    period: '2nd Century BCE – Present',
    region: 'Pan-Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Madhuchista Vidhana: Lost-Wax Casting',
        content: 'Described in the Shilpa Shastras as Madhuchista Vidhana, Chola bronze sculptors modeled each deity in solid beeswax mixed with tree resin, encased it in fine alluvial clay from the Kaveri riverbed, melted out the wax, and poured molten panch-loha (five-metal alloy). Because the clay mold had to be broken to release the statue, every single Chola bronze—such as the Nataraja—is a one-of-a-kind creation.'
      },
      {
        title: 'Mordants & Master Weavers',
        content: 'Indian dyers mastered complex mordant chemistry to bind plant dyes permanently to cotton fibers: indigo for deep blues, madder root (Manjistha) for crimson reds, turmeric and pomegranate rind for yellows, and fermented iron-jaggery for black outlines. Double-ikat Patola weaving required tying and dyeing both warp and weft threads with mathematical precision before placing them on the loom.'
      }
    ],
    funFacts: [
      'Ajanta cave murals were painted on a plaster of clay, rice husks, and lime using earth pigments like lapis lazuli, red ochre, and terre verte.'
    ]
  },

  // 6. DANCE & THEATRE
  {
    id: 'book-natyashastra',
    categoryId: 'cat-dance',
    title: 'The Natyashastra & Language of Gesture',
    subtitle: 'How Bharata Muni codified Rasa, Mudras, and classical and folk performing arts.',
    coverIcon: '💃',
    period: 'c. 200 BCE – 200 CE onwards',
    region: 'Pan-Indian Subcontinent',
    readTime: '4 min read',
    chapters: [
      {
        title: 'Natya, Nritta & Nritya',
        content: 'Attributed to the sage Bharata Muni, the Natyashastra is an encyclopedic treatise of 36 chapters covering stage architecture, acting, movement, music, and costuming. It distinguishes pure rhythmic movement (Nritta), expressive storytelling through hand gestures and facial expressions (Nritya), and dramatic representation (Natya).'
      },
      {
        title: 'The Nine Rasas (Navarasa)',
        content: 'At the heart of Indian aesthetics is Rasa—the distilled emotional essence evoked in the audience through the performer’s Bhava (expression). The nine classical Rasas encompass joy/love (Shringara), humor (Hasya), compassion (Karuna), righteous anger (Raudra), courage (Veera), awe (Adbhuta), tranquility (Shanta), fear (Bhayanaka), and disgust (Bibhatsa).'
      }
    ],
    funFacts: [
      'Koodiyattam, the Sanskrit temple theatre tradition of Kerala, was recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity.'
    ]
  },

  // 7. MUSIC TRADITIONS
  {
    id: 'book-ragas-talas',
    categoryId: 'cat-music',
    title: 'Swara, Raga & Tala: Sonic Heritage',
    subtitle: 'The mathematical rhythms and melodic frameworks of Indian classical and folk music.',
    coverIcon: '🪕',
    period: 'Ancient Sama-gana to Modern Era',
    region: 'Northern & Southern India',
    readTime: '4 min read',
    chapters: [
      {
        title: 'The Seven Swaras & Microtones',
        content: 'Indian musical theory organizes pitch into seven primary notes—Sa, Re, Ga, Ma, Pa, Dha, Ni (Saptak)—subdivided into 22 microtonal intervals called Shrutis. Treatises such as Matanga’s Brihaddeshi and Sarangadeva’s Sangita Ratnakara traced how melodic frameworks (Ragas) evoke specific times of day, seasons, and moods.'
      },
      {
        title: 'Hindustani, Carnatic & Folk Instruments',
        content: 'Over centuries, two interconnected classical streams—Carnatic in the south (structured around kriti compositions by figures like Purandara Dasa and the Trinity of Thanjavur) and Hindustani in the north—flourished alongside vibrant folk traditions using stringed (Tata), wind (Sushira), membrane (Avanaddha), and solid percussion (Ghana) instruments.'
      }
    ],
    funFacts: [
      'The Veena, Mridangam, and Flute (Bansuri/Venu) appear in temple sculptures and reliefs dating back over two millennia.'
    ]
  },

  // 8. TRADITIONAL GAMES
  {
    id: 'book-ancient-games',
    categoryId: 'cat-games',
    title: 'Chaturanga, Pachisi & Minds in Motion',
    subtitle: 'How ancient Indian board games gave the world chess, ludo, and mathematical probability.',
    coverIcon: '♟️',
    period: 'Harappan Era to Medieval Period',
    region: 'Pan-Indian Subcontinent',
    readTime: '5 min read',
    chapters: [
      {
        title: 'Chaturanga: The Ancestor of Chess',
        content: 'Played on an 8×8 Ashtapada board by the 6th century CE, Chaturanga ("four divisions of the military") modeled ancient Indian battle formations: infantry (Padati, the pawn), cavalry (Ashva, the knight), elephants (Gaja, precursor to the bishop), and chariots (Ratha, the rook), alongside the king (Raja) and counselor (Mantri). Traded to Persia as Chatrang and the Arab world as Shatranj, it evolved directly into modern international chess.'
      },
      {
        title: 'Pachisi, Moksha Patam & Pallanguzhi',
        content: 'Cross-and-circle games like Chaupar and Pachisi used cowrie shells as binary dice to teach probability and risk assessment. Moksha Patam (Gyan Chauper) used ladders of virtue and snakes of vice to teach moral philosophy, later adapted in 19th-century Britain as Snakes and Ladders. In South India, mancala-style seed-counting games like Pallanguzhi sharpened rapid mental arithmetic.'
      }
    ],
    funFacts: [
      'Terracotta gaming pieces and cubical dice with 1 opposite 6 have been excavated at Harappan sites like Mohenjo-daro and Lothal.'
    ]
  },

  // 9. FESTIVALS & COMMUNITY
  {
    id: 'book-festivals',
    categoryId: 'cat-fest',
    title: 'Cycles of the Sun, Moon & Harvest',
    subtitle: 'How astronomical calendars and agricultural seasons shaped India’s diverse festivals.',
    coverIcon: '🪔',
    period: 'Ancient to Living Tradition',
    region: 'Pan-Indian Subcontinent',
    readTime: '4 min read',
    chapters: [
      {
        title: 'Lunisolar Calendars & Uttarayana',
        content: 'Traditional Indian calendars (Panchanga) synchronize lunar phases (Tithis) with solar sidereal months. The northward journey of the sun (Makar Sankranti / Pongal / Magh Bihu / Lohri) marks the winter harvest across regions, celebrated with freshly harvested rice, sesame, jaggery, and gratitude toward nature, cattle, and rivers.'
      },
      {
        title: 'Festivals as Cultural Commons',
        content: 'Public festivals sustained local artisan economies—potters crafting earthen lamps for Deepavali, natural-color makers for Holi, bamboo weavers and sculptors for seasonal processions, and threshold geometric art (Kolam, Rangoli, Alpana) drawn with rice flour to feed ants and birds while welcoming guests.'
      }
    ],
    funFacts: [
      'Drawing Kolam patterns with rice flour combines mathematical symmetry and Eulerian graph loops with ecological care for small creatures.'
    ]
  },

  // 10. AGRICULTURAL & CULINARY HERITAGE
  {
    id: 'book-food-agriculture',
    categoryId: 'cat-food',
    title: 'Grains, Spices & Ancient Kitchen Science',
    subtitle: 'From Neolithic millets and pulses to spice routes and Ayurvedic seasonal nutrition.',
    coverIcon: '🌾',
    period: 'Neolithic to Medieval Era',
    region: 'Pan-Indian Subcontinent',
    readTime: '4 min read',
    chapters: [
      {
        title: 'Ancient Millets, Rice & Pulses',
        content: 'Archaeobotanical remains from sites like Mehrgarh, Lahuradewa, and Hallur reveal a rich agricultural foundation of barley, wheat, native millets (ragi, jowar, bajra), lentils, and sesame. Millets thrived in dryland ecosystems with minimal water, providing resilient nutrition across centuries.'
      },
      {
        title: 'Black Pepper, Ginger & the Six Tastes',
        content: 'Known as "Black Gold" in ancient Mediterranean markets, Malabar black pepper (Piper nigrum), cardamom, cinnamon, and turmeric drove Indian Ocean maritime trade. Classical texts like the Charaka Samhita and the 12th-century Manasollasa approached cooking as balanced nutrition—combining six tastes (Shad-Rasa: sweet, sour, salty, pungent, bitter, and astringent) with seasonal digestion and fermentation techniques.'
      }
    ],
    funFacts: [
      'India was the first civilization to crystallize sugar from sugarcane juice (Sharkara, the root of the English word "sugar").'
    ]
  }
];
