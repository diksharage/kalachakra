export const level1Challenges = {
  mg_l1_survival: {
    id: 'mg-l1-survival',
    title: 'Survival Resource Prioritization',
    format: 'minigame',
    question: 'Prioritize essential resources and survival actions to keep your prehistoric band safe through day and night.',
    reward: { wood: 1, stone: 2, plants: 1 }
  },
  tools: {
    id: 'early-tools-01',
    title: 'Stone-Tool Identification & Usage',
    difficulty: 'easy',
    format: 'matching',
    question: 'Examine the prehistoric tools you uncovered and match each tool to its primary survival use:',
    explanation: 'Early humans engineered specialized tools for distinct tasks: heavy bifacial hand axes for chopping and digging, sharp flint flakes for scraping hides, fire-hardened wooden sticks for uprooting tubers, and composite microlith spears for hunting.',
    reward: { stone: 2, flint: 1, wood: 1 },
    pairs: [
      {
        left: { id: 'tool_axe', icon: '🪨', label: 'Acheulean Hand Axe' },
        right: { id: 'use_axe', label: 'Chopping timber, heavy cutting & digging' }
      },
      {
        left: { id: 'tool_scraper', icon: '🔪', label: 'Flint Side-Scraper' },
        right: { id: 'use_scraper', label: 'Cleaning animal hides for shelter wraps' }
      },
      {
        left: { id: 'tool_stick', icon: '🪵', label: 'Fire-Hardened Digging Stick' },
        right: { id: 'use_stick', label: 'Prying up edible underground roots & tubers' }
      },
      {
        left: { id: 'tool_spear', icon: '🏹', label: 'Hafted Microlith Spear' },
        right: { id: 'use_spear', label: 'Hunting swift game from a safe distance' }
      }
    ]
  },
  cave_art: {
    id: 'early-cave-art-01',
    title: 'Cave Art Sequence: Ancient Survival Cycle',
    format: 'cave_art',
    difficulty: 'medium',
    question: 'Examine the prehistoric ochre handprints and rock carvings inside the cave shelter. Tap the sacred symbols in the natural seasonal survival sequence:',
    explanation: 'Prehistoric rock art (such as at Bhimbetka) documented animal migrations, hunting rituals, and communal hearth life, passing vital survival knowledge across generations.',
    reward: { knowledge: 100, legacy: 50, flint: 2 },
    symbols: [
      { id: 'water', icon: '💧', label: 'River Spring', order: 1, hint: 'First: Locate fresh water to sustain the hunting band' },
      { id: 'stone', icon: '🪨', label: 'Knapped Tools', order: 2, hint: 'Second: Flake sharp stone hand axes and chert blades' },
      { id: 'fire', icon: '🔥', label: 'Communal Hearth', order: 3, hint: 'Third: Kindle fire for warmth, light and cooking' },
      { id: 'animal', icon: '🦣', label: 'Migrating Game', order: 4, hint: 'Fourth: Track wild game across the open savanna' },
      { id: 'shelter', icon: '🛖', label: 'Cave Shelter', order: 5, hint: 'Fifth: Return to the protective rock overhang before nightfall' }
    ]
  },
  environment: {
    id: 'early-environment-01',
    title: 'Environmental Problem-Solving: Monsoon Storm',
    difficulty: 'medium',
    format: 'interactive_survival',
    question: 'Dark monsoon clouds burst over the valley! The river is rising rapidly and freezing winds sweep across the open plains. How will your community adapt using the environment and your gathered resources?',
    explanation: 'Prehistoric bands survived harsh seasonal shifts by choosing elevated rock overhangs above flood lines, stacking stone windbreaks, and maintaining a central fire hearth.',
    reward: { wood: 2, stone: 1, plants: 2 },
    options: [
      {
        label: 'Move to the elevated rock overhang, stack stone windbreaks, and kindle a hearth with wood & flint',
        icon: '🔥',
        costs: { wood: 1, stone: 1, flint: 1 },
        resultText: 'Excellent adaptation! The high rock overhang kept the band above the river surge, the stone barrier blocked the gale, and the hearth provided life-saving warmth.',
        isSuccess: true,
        reward: { wood: 2, stone: 1, plants: 2 }
      },
      {
        label: 'Stay on the low riverbank gravel bed to remain next to the water',
        icon: '🌊',
        costs: {},
        resultText: 'Too risky! Monsoon flash floods quickly submerge low riverbanks. Early humans camped on elevated river terraces or rock overhangs.',
        isSuccess: false
      },
      {
        label: 'Wait out the storm in the open tall grass without shelter or fire',
        icon: '🌾',
        costs: {},
        resultText: 'Soaking rain and cold winds sap body heat rapidly in the open savanna. Use the cave overhang, stone, and fire!',
        isSuccess: false
      }
    ]
  }
};
