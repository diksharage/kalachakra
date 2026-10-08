export const level1Locations = [
  {
    id: 'l1_event_storm',
    label: 'Gathering Storm',
    icon: '⚠️',
    description: 'Dark clouds gather on the horizon.',
    isEvent: true,
    discoverMessage: 'Surviving extreme weather required quick adaptation.',
    eventDef: {
      scenario: 'A massive thunderstorm is rolling in fast. The temperature is dropping and the wind is howling. How do you prepare?',
      options: [
        {
          label: 'Seek immediate shelter in the caves',
          costs: {},
          rewards: { legacy: 10 },
          resultText: 'You huddled in the caves. The storm passed, and the community was safe.'
        },
        {
          label: 'Build a hasty lean-to out of branches',
          costs: { wood: 2 },
          rewards: { community: 2, legacy: 20 },
          resultText: 'The lean-to held up! Building structural shelter in a crisis boosted morale.'
        }
      ]
    }
  },
  {
    id: 'forest',
    label: 'Forest',
    icon: '🌳',
    description: 'A dense area of trees and plants.',
    discoverMessage: 'Forests provided essential resources like wood, edible plants, and shelter for early human communities.',
    yields: { wood: 2, plants: 2 }
  },
  {
    id: 'water',
    label: 'Water Source',
    icon: '🌊',
    description: 'A flowing river or natural spring.',
    discoverMessage: 'Water was essential for survival. Communities needed reliable access to water for drinking and daily needs.',
    yields: { water: 2 }
  },
  {
    id: 'rocks',
    label: 'Rocky Outcrop',
    icon: '🪨',
    description: 'A gathering of hard stones and flint.',
    discoverMessage: 'Rocks provided the raw material for the first human technologies: stone tools used for cutting, scraping, and hunting.',
    yields: { stone: 2, flint: 1 }
  },
  {
    id: 'shelter_area',
    label: 'Cave / Overhang',
    icon: '⛰️',
    description: 'A natural formation providing cover.',
    discoverMessage: 'Natural caves were the first homes, providing protection from predators and harsh weather.',
    yields: {}
  },
  {
    id: 'animal_tracks',
    label: 'Animal Tracks',
    icon: '🐾',
    description: 'Footprints of wild game.',
    discoverMessage: 'Following animal tracks allowed early hunters to find food and materials for clothing.',
    yields: { meat: 1, hide: 1 }
  },
  {
    id: 'tall_grass',
    label: 'Tall Grass',
    icon: '🌾',
    description: 'A dry savanna area.',
    discoverMessage: 'Dry grass was useful as kindling for fires and bedding for comfort.',
    yields: { plants: 1, flint: 1 }
  }
,
  {
    id: 'deep_cave',
    label: 'Deep Cave',
    icon: '🦇',
    description: 'A pitch-black cave network.',
    discoverMessage: 'With the invention of fire, early humans could explore deep caves and create the first art.',
    yields: { stone: 5, flint: 2, legacy: 50 },
    unlockCondition: (state) => state.completedChallenges && state.completedChallenges.includes('fire_discovery')
  }
];