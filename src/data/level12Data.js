export const level12ExploreLocations = [
  {
    id: 'exp_sanskrit',
    label: 'Sanskrit Traditions',
    icon: '📜',
    description: 'Classical language and epics.',
    discoverMessage: 'Sanskrit served as a pan-Indian literary and scholarly language, heavily influencing epics, philosophy, and classical poetry (Kavya).',
    yields: {}
  },
  {
    id: 'exp_sangam',
    label: 'Tamil/Sangam',
    icon: '🌴',
    description: 'Ancient southern literature.',
    discoverMessage: 'Sangam literature is a vast collection of ancient Tamil poetry, categorizing themes of love (akam) and war (puram).',
    yields: {}
  },
  {
    id: 'exp_regional',
    label: 'Regional Bhakti',
    icon: '🎶',
    description: 'Devotional languages.',
    discoverMessage: 'Languages like Kannada, Telugu, Bengali, Marathi, and Awadhi flourished as vehicles for localized, deeply emotional devotional poetry.',
    yields: {}
  },
  {
    id: 'exp_folk',
    label: 'Oral Folktales',
    icon: '🗣️',
    description: 'Local storytelling.',
    discoverMessage: 'Countless localized folktales, fables, and oral histories were transmitted purely by word of mouth outside formal textual traditions.',
    yields: {}
  }
];

export const level12OralLocations = [
  {
    id: 'oral_village',
    label: 'Village Gathering',
    icon: '🔥',
    description: 'Community storytelling.',
    discoverMessage: 'Stories were told around fires or in village squares, often adapting locally known landmarks and heroes into the narrative.',
    yields: { community: 2, stories: 1 }
  },
  {
    id: 'oral_bard',
    label: 'Traveling Bard',
    icon: '🚶',
    description: 'Professional performers.',
    discoverMessage: 'Itinerant bards and musicians carried stories across regions, altering them slightly with each performance to suit the audience.',
    yields: { performance: 2, language: 1 }
  }
];

export const level12EpicLocations = [
  {
    id: 'epic_ramayana',
    label: 'Ramayana Traditions',
    icon: '🏹',
    description: 'A vast narrative tree.',
    discoverMessage: 'Rather than a single book, the Ramayana is a massive tradition with hundreds of regional, linguistic, and performative variations.',
    yields: { knowledge: 2, stories: 2 }
  },
  {
    id: 'epic_fable',
    label: 'Jatakas & Panchatantra',
    icon: '🦊',
    description: 'Fables and morals.',
    discoverMessage: 'Animal fables were used to teach statecraft, morality, and philosophy. These stories travelled widely, reaching as far as Europe and the Middle East.',
    yields: { stories: 2, creative: 1 }
  }
];

export const level12ScriptLocations = [
  {
    id: 'script_palm',
    label: 'Palm-Leaf Manuscripts',
    icon: '🌿',
    description: 'Fragile transmission.',
    discoverMessage: 'In southern and eastern India, texts were etched into dried palm leaves. Because they decay, they had to be constantly copied to survive.',
    yields: { documentation: 3, preservation: 1 }
  },
  {
    id: 'script_bhurja',
    label: 'Birch Bark (Bhurjapatra)',
    icon: '📜',
    description: 'Himalayan manuscripts.',
    discoverMessage: 'In northern regions like Kashmir, the peeling bark of the birch tree provided a durable surface for writing scripts like Sharada.',
    yields: { documentation: 2, knowledge: 1 }
  }
];

export const level12TheatreLocations = [
  {
    id: 'theatre_puppet',
    label: 'Shadow Puppetry',
    icon: '🎭',
    description: 'Leather silhouettes.',
    discoverMessage: 'Traditions like Tholu Bommalata use intricately painted leather puppets and lamplight to bring epic stories to life visually.',
    yields: { performance: 3, creative: 2 }
  },
  {
    id: 'theatre_classical',
    label: 'Classical Theatre',
    icon: '👑',
    description: 'Stylized performance.',
    discoverMessage: 'Traditions like Kutiyattam (Sanskrit theatre) emphasize incredibly detailed facial expressions and hand gestures (mudras) to convey story.',
    yields: { performance: 2, community: 2 }
  }
];

export const level12VisualLocations = [
  {
    id: 'visual_scroll',
    label: 'Pattachitra Scrolls',
    icon: '🎨',
    description: 'Painted narratives.',
    discoverMessage: 'Cloth scrolls were painted with sequential story panels, often used by traveling storytellers who would unroll them as they sang.',
    yields: { creative: 3, stories: 1 }
  },
  {
    id: 'visual_mural',
    label: 'Temple Murals',
    icon: '🖌️',
    description: 'Walls that speak.',
    discoverMessage: 'Vast narratives were painted on the walls of temples and palaces, serving as a visual library for the public.',
    yields: { documentation: 1, creative: 2 }
  }
];

export const level12PreserveLocations = [
  {
    id: 'preserve_archive',
    label: 'Digital Archive',
    icon: '💻',
    description: 'Modern documentation.',
    discoverMessage: 'Digitizing manuscripts prevents physical loss, but it does not inherently preserve the living oral or performative tradition.',
    yields: { documentation: 3, preservation: 1 }
  },
  {
    id: 'preserve_community',
    label: 'Living Practitioners',
    icon: '🙌',
    description: 'The human element.',
    discoverMessage: 'Supporting the actual artists, bards, and craftspeople ensures the tradition remains a living, adapting art form.',
    yields: { community: 3, preservation: 2 }
  }
];
