export const level7KnowledgeObjects = [
  {
    id: 'obj_numberboard',
    label: 'Number Board',
    icon: '🔢',
    description: 'Calculations and mathematics.',
    discoverMessage: 'What we found: Mathematical texts and calculations.\nWhy it matters: South Asian traditions played a major role in developing the decimal place-value system.',
    yields: {}
  },
  {
    id: 'obj_starchart',
    label: 'Star Chart',
    icon: '🌌',
    description: 'Astronomical observation.',
    discoverMessage: 'What we found: Records of celestial movements.\nWhy it matters: Ancient astronomers developed mathematical models to describe the skies.',
    yields: {}
  },
  {
    id: 'obj_manuscript',
    label: 'Manuscript',
    icon: '📜',
    description: 'Literary works and plays.',
    discoverMessage: 'What we found: Sanskrit literature and poetry.\nWhy it matters: Literature provides evidence about ideas and cultural life.',
    yields: {}
  },
  {
    id: 'obj_metal',
    label: 'Metal Object',
    icon: '⚒️',
    description: 'Advanced metallurgy.',
    discoverMessage: 'What we found: Iron and bronze artifacts with high durability.\nWhy it matters: Evidence of sophisticated material processing and chemistry.',
    yields: {}
  }
];

export const level7MathLocations = [
  {
    id: 'math_area',
    label: 'Mathematics Area',
    icon: '🧮',
    description: 'Calculation and geometry.',
    discoverMessage: 'South Asian mathematical traditions developed over long periods, with contributions from many scholars across different eras.',
    yields: { knowledge: 2, progress: 1 }
  },
  {
    id: 'scholar_aryabhata',
    label: 'Aryabhata',
    icon: '👤',
    description: 'Mathematician and astronomer.',
    discoverMessage: 'Active around the late 5th/early 6th century CE. Associated with the Aryabhatiya. He proposed a model explaining the apparent daily movement of stars by Earth\'s rotation.',
    yields: {}
  }
];

export const level7AstroLocations = [
  {
    id: 'astro_observatory',
    label: 'Observation Area',
    icon: '🔭',
    description: 'Studying celestial cycles.',
    discoverMessage: 'Astronomers used observation and calculation to track cycles. Game simulation inspired by historical astronomy.',
    yields: { knowledge: 2, time: -1 }
  }
];

export const level7LitLocations = [
  {
    id: 'lit_area',
    label: 'Writing Area',
    icon: '🪔',
    description: 'Language and narrative.',
    discoverMessage: 'Literature provides evidence about ideas, language, and cultural life but should not automatically be treated as a literal historical record.',
    yields: { knowledge: 1, capacity: 1 }
  },
  {
    id: 'scholar_kalidasa',
    label: 'Kalidasa',
    icon: '👤',
    description: 'Major Sanskrit literary figure.',
    discoverMessage: 'Associated with works like Abhijnanashakuntalam and Meghaduta. Traditionally placed around the Gupta-era cultural world, though precise dating is uncertain.',
    yields: {}
  }
];

export const level7EvidenceLocations = [
  {
    id: 'evid_texts',
    label: 'Texts & Manuscripts',
    icon: '📖',
    description: 'Written knowledge.',
    discoverMessage: 'What we know: Texts describe math, science, and stories.\nWhat it suggests: Highly developed intellectual traditions.\nWhat remains uncertain: Exact dates of many texts.',
    yields: {}
  },
  {
    id: 'evid_art',
    label: 'Sculpture & Art',
    icon: '🎨',
    description: 'Visual evidence.',
    discoverMessage: 'What we know: Distinctive art styles emerged.\nWhat it suggests: Flourishing patronage and artistic networks.\nWhat remains uncertain: The identities of individual artists.',
    yields: {}
  }
];

export const level7MetalLocations = [
  {
    id: 'metal_workshop',
    label: 'Workshop',
    icon: '🔥',
    description: 'Material processing.',
    discoverMessage: 'Metallurgy requires understanding material properties, heating, and shaping.',
    yields: { materials: 2, knowledge: 1 }
  },
  {
    id: 'evid_ironpillar',
    label: 'Iron Pillar of Delhi',
    icon: '🏛️',
    description: 'Corrosion-resistant iron.',
    discoverMessage: 'Generally dated to the Gupta period. Its corrosion resistance is related to its composition, processing, and environmental conditions (not "magic"). Associated with a king named Chandra (debated).',
    yields: {}
  }
];

export const level7CenterLocations = [
  {
    id: 'center_library',
    label: 'Library & Learning Center',
    icon: '📚',
    description: 'Hub of knowledge transmission.',
    discoverMessage: 'Game Learning Center inspired by historical knowledge traditions. Knowledge develops through people, observation, writing, and teaching.',
    yields: { capacity: 2, progress: 2, materials: -1 }
  }
];
