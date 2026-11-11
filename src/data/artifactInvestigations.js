export const artifactInvestigations = [
  {
    id: 'indus-seal-investigation',
    levelId: 3,
    levelName: 'Indus Valley Civilization',
    libraryId: 'steatite_seal',
    titleKey: 'investigation.indus_seal.title',
    descKey: 'investigation.indus_seal.desc',
    title: 'The Steatite Seal of Mohenjo-daro',
    description: 'Examine a carved steatite seal from the Indus Civilization to distinguish archaeological facts from undeciphered mysteries.',
    icon: '🔏',
    period: 'Mature Harappan (c. 2600–1900 BCE)',
    region: 'Indus Valley',
    unlockRequirement: 'Reach Level 3: Indus Valley Civilization',
    clues: [
      {
        id: 'clue_1',
        x: 30,
        y: 25,
        titleKey: 'investigation.indus_seal.clue1.title',
        textKey: 'investigation.indus_seal.clue1.text',
        title: 'Top Inscription',
        text: 'A row of 5 carved pictographic symbols. Over 4,000 such objects have been found, yet the Indus script remains undeciphered.',
        certainty: 'uncertain'
      },
      {
        id: 'clue_2',
        x: 50,
        y: 60,
        titleKey: 'investigation.indus_seal.clue2.title',
        textKey: 'investigation.indus_seal.clue2.text',
        title: 'Central Animal Motif',
        text: 'A finely carved one-horned bovid (often called the unicorn motif) standing before a ritual offering stand or brazier.',
        certainty: 'archaeological'
      },
      {
        id: 'clue_3',
        x: 80,
        y: 80,
        titleKey: 'investigation.indus_seal.clue3.title',
        textKey: 'investigation.indus_seal.clue3.text',
        title: 'Material & Craftsmanship',
        text: 'Carved from soft steatite (soapstone) and fired to harden and whiten the surface, demonstrating specialized workshop tools.',
        certainty: 'archaeological'
      },
      {
        id: 'clue_4',
        x: 20,
        y: 85,
        titleKey: 'investigation.indus_seal.clue4.title',
        textKey: 'investigation.indus_seal.clue4.text',
        title: 'Perforated Boss (Back)',
        text: 'A raised boss with a hole on the reverse allowed a cord to pass through and pressed the seal into wet clay tags on cargo.',
        certainty: 'interpretation'
      }
    ],
    claims: [
      {
        id: 'claim_1',
        textKey: 'investigation.indus_seal.claim1',
        text: 'The symbols on the seal record a royal military treaty with Egypt.',
        isCorrect: false,
        feedbackKey: 'investigation.indus_seal.fb1',
        feedback: 'Incorrect. Because the Indus script has not yet been deciphered, we cannot read specific sentences or treaties.'
      },
      {
        id: 'claim_2',
        textKey: 'investigation.indus_seal.claim2',
        text: 'Seals were pressed into clay to mark and secure trade bundles or identify ownership.',
        isCorrect: true,
        feedbackKey: 'investigation.indus_seal.fb2',
        feedback: 'Correct! Clay sealings found with cord and textile impressions on the back confirm they were used to stamp trade packages.'
      },
      {
        id: 'claim_3',
        textKey: 'investigation.indus_seal.claim3',
        text: 'Carving steatite seals required specialized artisan skills and firing techniques.',
        isCorrect: true,
        feedbackKey: 'investigation.indus_seal.fb3',
        feedback: 'Correct! Archaeological workshops at sites like Lothal and Chanhudaro show the step-by-step manufacture of steatite seals.'
      },
      {
        id: 'claim_4',
        textKey: 'investigation.indus_seal.claim4',
        text: 'These seals were minted as everyday metal coins for buying food.',
        isCorrect: false,
        feedbackKey: 'investigation.indus_seal.fb4',
        feedback: 'Incorrect. Steatite is a stone, not metal, and the perforated boss + clay impressions show they were stamping tools rather than currency.'
      }
    ],
    rewards: {
      legacy: 30,
      inventory: { steatite_seal: 1 }
    }
  },
  {
    id: 'ashokan-edict-investigation',
    levelId: 6,
    levelName: 'Mauryan Empire',
    libraryId: 'ashokan_edict',
    titleKey: 'investigation.ashokan_edict.title',
    descKey: 'investigation.ashokan_edict.desc',
    title: 'The Ashokan Pillar Inscription',
    description: 'Analyze a Mauryan-era stone inscription to understand how Emperor Ashoka communicated Dhamma across the subcontinent.',
    icon: '📜',
    period: 'Mauryan Period (3rd Century BCE)',
    region: 'Pan-Indian Subcontinent',
    unlockRequirement: 'Reach Level 6: Mauryan Empire',
    clues: [
      {
        id: 'clue_1',
        x: 50,
        y: 30,
        titleKey: 'investigation.ashokan_edict.clue1.title',
        textKey: 'investigation.ashokan_edict.clue1.text',
        title: 'Script & Language',
        text: 'Written primarily in Prakrit using the Brahmi script (with Kharosthi, Greek, and Aramaic used in the northwest) so local populations could understand.',
        certainty: 'well_supported'
      },
      {
        id: 'clue_2',
        x: 30,
        y: 65,
        titleKey: 'investigation.ashokan_edict.clue2.title',
        textKey: 'investigation.ashokan_edict.clue2.text',
        title: 'Royal Title: Devanampiya Piyadassi',
        text: 'Refers to the ruler as "Beloved of the Gods, He of Gracious Mien," linked definitively to Ashoka through the Maski inscription.',
        certainty: 'documented'
      },
      {
        id: 'clue_3',
        x: 75,
        y: 50,
        titleKey: 'investigation.ashokan_edict.clue3.title',
        textKey: 'investigation.ashokan_edict.clue3.text',
        title: 'Message of Dhamma',
        text: 'Promotes ethical conduct, non-violence toward living beings, respect for elders and teachers, and tolerance among sects.',
        certainty: 'documented'
      },
      {
        id: 'clue_4',
        x: 50,
        y: 85,
        titleKey: 'investigation.ashokan_edict.clue4.title',
        textKey: 'investigation.ashokan_edict.clue4.text',
        title: 'Strategic Placement & Polish',
        text: 'Carved onto Chunar sandstone pillars with a mirror-like Mauryan polish, placed along major trade routes and pilgrimage centers.',
        certainty: 'archaeological'
      }
    ],
    claims: [
      {
        id: 'claim_1',
        textKey: 'investigation.ashokan_edict.claim1',
        text: 'The inscriptions were placed in public hubs and trade routes to communicate imperial ethics and policy.',
        isCorrect: true,
        feedbackKey: 'investigation.ashokan_edict.fb1',
        feedback: 'Correct! Placing edicts along trade highways and gathering sites ensured officials and travelers could read or hear them.'
      },
      {
        id: 'claim_2',
        textKey: 'investigation.ashokan_edict.claim2',
        text: 'Every single person in the Mauryan Empire could read the inscriptions without assistance.',
        isCorrect: false,
        feedbackKey: 'investigation.ashokan_edict.fb2',
        feedback: 'Incorrect. While written in local vernaculars, literacy was not universal; royal officials were instructed to read them aloud to the public.'
      },
      {
        id: 'claim_3',
        textKey: 'investigation.ashokan_edict.claim3',
        text: 'The edicts provide primary epigraphic evidence of Mauryan governance and Ashoka’s focus on Dhamma.',
        isCorrect: true,
        feedbackKey: 'investigation.ashokan_edict.fb3',
        feedback: 'Correct! Deciphered by James Prinsep in 1837, these inscriptions are among the oldest deciphered written records in South Asia.'
      }
    ],
    rewards: {
      legacy: 40,
      inventory: { ashokan_edict: 1 }
    }
  },
  {
    id: 'hampi-architecture-investigation',
    levelId: 11,
    levelName: 'Vijayanagara & Medieval Heritage',
    libraryId: 'stone_chariot',
    titleKey: 'investigation.hampi_chariot.title',
    descKey: 'investigation.hampi_chariot.desc',
    title: 'The Stone Chariot of Hampi',
    description: 'Investigate the iconic Vijayanagara shrine at the Vittala Temple complex to uncover its engineering and artistic craftsmanship.',
    icon: '🛞',
    period: 'Vijayanagara Empire (16th Century CE)',
    region: 'Hampi, Karnataka',
    unlockRequirement: 'Reach Level 11: Vijayanagara & Medieval Heritage',
    clues: [
      {
        id: 'clue_1',
        x: 50,
        y: 75,
        titleKey: 'investigation.hampi_chariot.clue1.title',
        textKey: 'investigation.hampi_chariot.clue1.text',
        title: 'Carved Granite Wheels',
        text: 'Detailed stone wheels with floral spokes and axles, modeled after wooden temple processional chariots (rathas).',
        certainty: 'archaeological'
      },
      {
        id: 'clue_2',
        x: 50,
        y: 35,
        titleKey: 'investigation.hampi_chariot.clue2.title',
        textKey: 'investigation.hampi_chariot.clue2.text',
        title: 'Multi-Block Interlocking Construction',
        text: 'Though it looks monolithic, it is built from closely fitted granite slabs whose joints are cleverly concealed within decorative carvings.',
        certainty: 'well_supported'
      },
      {
        id: 'clue_3',
        x: 20,
        y: 60,
        titleKey: 'investigation.hampi_chariot.clue3.title',
        textKey: 'investigation.hampi_chariot.clue3.text',
        title: 'Sculpted Elephants & Horses',
        text: 'Two stone elephants currently stand in front; remnants behind them show where carved horses originally stood on the platform.',
        certainty: 'archaeological'
      }
    ],
    claims: [
      {
        id: 'claim_1',
        textKey: 'investigation.hampi_chariot.claim1',
        text: 'The Stone Chariot was driven across the battlefields of the Deccan as a military weapon.',
        isCorrect: false,
        feedbackKey: 'investigation.hampi_chariot.fb1',
        feedback: 'Incorrect. It is a stationary granite Garuda shrine inside the Vittala Temple courtyard, inspired by processional temple rathas.'
      },
      {
        id: 'claim_2',
        textKey: 'investigation.hampi_chariot.claim2',
        text: 'The structure reflects advanced Vijayanagara stone-joinery and Dravidian temple artistry.',
        isCorrect: true,
        feedbackKey: 'investigation.hampi_chariot.fb2',
        feedback: 'Correct! Master sculptors hid the structural joints inside intricate relief panels.'
      },
      {
        id: 'claim_3',
        textKey: 'investigation.hampi_chariot.claim3',
        text: 'The design translates the cultural tradition of wooden festival chariots into permanent stone architecture.',
        isCorrect: true,
        feedbackKey: 'investigation.hampi_chariot.fb3',
        feedback: 'Correct! It honors the tradition of temple ratha processions in enduring granite.'
      }
    ],
    rewards: {
      legacy: 45,
      inventory: { temple_carving: 1 }
    }
  }
];
