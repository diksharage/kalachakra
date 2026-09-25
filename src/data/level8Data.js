export const level8ExploreLocations = [
  {
    id: 'exp_rockcut',
    label: 'Rock-Cut Caves',
    icon: '⛰️',
    description: 'Carved directly from living rock.',
    discoverMessage: 'What is it: Structures excavated from solid rock.\nPeriod/Region: E.g., Ajanta & Ellora (various periods).\nWhy it matters: Shows extraordinary spatial planning.',
    yields: {}
  },
  {
    id: 'exp_stupa',
    label: 'Stupa',
    icon: '🛕',
    description: 'Sacred mound architecture.',
    discoverMessage: 'What is it: A reliquary and sacred monument.\nPeriod/Region: E.g., Sanchi (developed over multiple phases).\nWhy it matters: A core form of Buddhist architecture.',
    yields: {}
  },
  {
    id: 'exp_temple',
    label: 'Structural Temple',
    icon: '🏛️',
    description: 'Built up from the ground.',
    discoverMessage: 'What is it: A constructed sacred space.\nPeriod/Region: E.g., Deogarh (early structural).\nWhy it matters: Illustrates the evolution of built shrines and verticality.',
    yields: {}
  },
  {
    id: 'exp_water',
    label: 'Water Reservoir',
    icon: '💧',
    description: 'Hydraulic engineering.',
    discoverMessage: 'What is it: Engineered water catchment and storage.\nPeriod/Region: Found across South Asia in many periods.\nWhy it matters: Essential for survival and agriculture.',
    yields: {}
  }
];

export const level8LandscapeLocations = [
  {
    id: 'land_high',
    label: 'High Ground',
    icon: '🏔️',
    description: 'Elevated terrain.',
    discoverMessage: 'Good for visibility and safety from floods, but requires effort to move water up.',
    yields: { space: 2 }
  },
  {
    id: 'land_water',
    label: 'Water Source',
    icon: '🌊',
    description: 'River or natural spring.',
    discoverMessage: 'Architecture interacts heavily with water access for drinking, construction, and ritual.',
    yields: { water: 3 }
  },
  {
    id: 'land_rock',
    label: 'Rock Face',
    icon: '⛰️',
    description: 'Solid stone exposure.',
    discoverMessage: 'Can be quarried for building stone, or carved directly into rock-cut architecture.',
    yields: { stone: 2 }
  }
];

export const level8MaterialLocations = [
  {
    id: 'mat_quarry',
    label: 'Stone Quarry',
    icon: '🪨',
    description: 'Source of durable material.',
    discoverMessage: 'Stone is highly durable and supports immense weight, but requires immense effort to transport and carve.',
    yields: { stone: 3, builder: -1 }
  },
  {
    id: 'mat_kiln',
    label: 'Brick Kiln',
    icon: '🧱',
    description: 'Fired earth.',
    discoverMessage: 'Bricks are modular and easier to transport than massive stones, but require firing and mortar.',
    yields: { brick: 3 }
  },
  {
    id: 'mat_forest',
    label: 'Timber Source',
    icon: '🪵',
    description: 'Wood for framing.',
    discoverMessage: 'Timber is lighter and flexible, excellent for roofs and supports, though more vulnerable to decay over centuries.',
    yields: { timber: 2 }
  }
];

export const level8RockCutLocations = [
  {
    id: 'rock_ajanta',
    label: 'Ajanta Caves (Reference)',
    icon: '⛰️',
    description: 'Buddhist cave monuments.',
    discoverMessage: 'Developed in multiple phases. Carving requires planning because mistakes in negative space cannot simply be replaced like a broken brick.',
    yields: { builder: 2, space: 1 }
  },
  {
    id: 'rock_ellora',
    label: 'Ellora (Reference)',
    icon: '🐘',
    description: 'Multi-religious rock-cut site.',
    discoverMessage: 'Contains Buddhist, Hindu, and Jain monuments carved over centuries. A testament to sustained patronage and engineering.',
    yields: { builder: 2, space: 1 }
  }
];

export const level8SacredLocations = [
  {
    id: 'sacred_stupa',
    label: 'Stupa Assembly',
    icon: '🛕',
    description: 'Mound, railing, gateways.',
    discoverMessage: 'Stupas evolved in form. Early mounds gained elaborate stone railings (vedika) and carved gateways (torana) over generations.',
    yields: { builder: 1, stone: 1 }
  },
  {
    id: 'sacred_temple',
    label: 'Temple Components',
    icon: '🏛️',
    description: 'Shrine, hall, entrance.',
    discoverMessage: 'Temple architecture changed across regions, with distinct tower shapes (shikhara/vimana) and mandapas (halls).',
    yields: { builder: 1, brick: 1 }
  }
];

export const level8WaterLocations = [
  {
    id: 'water_channel',
    label: 'Water Channel',
    icon: '〰️',
    description: 'Directing flow.',
    discoverMessage: 'Historical water systems varied by geography, utilizing channels, dams, and landscape contours to manage seasonal rains.',
    yields: { water: 1, builder: 1 }
  },
  {
    id: 'water_stepwell',
    label: 'Stepwell',
    icon: '🪜',
    description: 'Deep groundwater access.',
    discoverMessage: 'A subterranean architectural form providing access to fluctuating water tables, often featuring elaborate structural retaining walls.',
    yields: { storage: 2, water: 1 }
  }
];

export const level8HeritageLocations = [
  {
    id: 'build_heritage',
    label: 'Heritage Construction Site',
    icon: '🏗️',
    description: 'Your architectural project.',
    discoverMessage: 'Gameplay abstraction: Combine site planning, materials, and structural knowledge to complete an enduring monument.',
    yields: { builder: 2, space: 2 }
  }
];
