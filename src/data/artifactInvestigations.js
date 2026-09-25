export const artifactInvestigations = [
  {
    id: "indus-seal-investigation",
    levelId: 3,
    titleKey: "investigation.indus_seal.title",
    category: "Artifact",
    period: "Mature Harappan",
    region: "Indus Valley",
    icon: "🔹",
    libraryId: "steatite_seal",
    introductionKey: "investigation.indus_seal.intro",
    
    clues: [
      {
        id: "material",
        titleKey: "investigation.indus_seal.clue1.title",
        descriptionKey: "investigation.indus_seal.clue1.desc",
        icon: "🪨"
      },
      {
        id: "motif",
        titleKey: "investigation.indus_seal.clue2.title",
        descriptionKey: "investigation.indus_seal.clue2.desc",
        icon: "🦄"
      },
      {
        id: "script",
        titleKey: "investigation.indus_seal.clue3.title",
        descriptionKey: "investigation.indus_seal.clue3.desc",
        icon: "📝"
      }
    ],

    claims: [
      {
        id: "claim1",
        statementKey: "investigation.indus_seal.claim1.stmt",
        expectedClassification: "archaeological",
        explanationKey: "investigation.indus_seal.claim1.expl"
      },
      {
        id: "claim2",
        statementKey: "investigation.indus_seal.claim2.stmt",
        expectedClassification: "interpretation",
        explanationKey: "investigation.indus_seal.claim2.expl"
      },
      {
        id: "claim3",
        statementKey: "investigation.indus_seal.claim3.stmt",
        expectedClassification: "incorrect",
        explanationKey: "investigation.indus_seal.claim3.expl"
      }
    ],

    rewards: {
      legacy: 25,
      inventory: { harappan_bead: 1 },
      libraryId: "steatite_seal"
    }
  },
  {
    id: "ashokan-edict-investigation",
    levelId: 6,
    titleKey: "investigation.ashoka.title",
    category: "Knowledge",
    period: "Mauryan Empire",
    region: "Pan-Indian Subcontinent",
    icon: "📜",
    libraryId: "ashokan_edict",
    introductionKey: "investigation.ashoka.intro",
    
    clues: [
      {
        id: "language",
        titleKey: "investigation.ashoka.clue1.title",
        descriptionKey: "investigation.ashoka.clue1.desc",
        icon: "🗣️"
      },
      {
        id: "location",
        titleKey: "investigation.ashoka.clue2.title",
        descriptionKey: "investigation.ashoka.clue2.desc",
        icon: "🗺️"
      },
      {
        id: "message",
        titleKey: "investigation.ashoka.clue3.title",
        descriptionKey: "investigation.ashoka.clue3.desc",
        icon: "🕊️"
      }
    ],

    claims: [
      {
        id: "claim1",
        statementKey: "investigation.ashoka.claim1.stmt",
        expectedClassification: "documented",
        explanationKey: "investigation.ashoka.claim1.expl"
      },
      {
        id: "claim2",
        statementKey: "investigation.ashoka.claim2.stmt",
        expectedClassification: "interpretation",
        explanationKey: "investigation.ashoka.claim2.expl"
      }
    ],

    rewards: {
      legacy: 30,
      inventory: { royal_decree: 1 },
      libraryId: "ashokan_edict"
    }
  },
  {
    id: "hampi-architecture-investigation",
    levelId: 11,
    titleKey: "investigation.hampi.title",
    category: "Architecture",
    period: "Vijayanagara",
    region: "Tungabhadra Basin",
    icon: "🏛️",
    libraryId: "hampi_bazaar",
    introductionKey: "investigation.hampi.intro",
    
    clues: [
      {
        id: "market",
        titleKey: "investigation.hampi.clue1.title",
        descriptionKey: "investigation.hampi.clue1.desc",
        icon: "📦"
      },
      {
        id: "temple",
        titleKey: "investigation.hampi.clue2.title",
        descriptionKey: "investigation.hampi.clue2.desc",
        icon: "🪨"
      },
      {
        id: "water",
        titleKey: "investigation.hampi.clue3.title",
        descriptionKey: "investigation.hampi.clue3.desc",
        icon: "💧"
      }
    ],

    claims: [
      {
        id: "claim1",
        statementKey: "investigation.hampi.claim1.stmt",
        expectedClassification: "archaeological",
        explanationKey: "investigation.hampi.claim1.expl"
      },
      {
        id: "claim2",
        statementKey: "investigation.hampi.claim2.stmt",
        expectedClassification: "uncertain",
        explanationKey: "investigation.hampi.claim2.expl"
      }
    ],

    rewards: {
      legacy: 35,
      inventory: { temple_carving: 1 },
      libraryId: "hampi_bazaar"
    }
  }
];

export const classificationTypes = [
  { id: "well_supported", labelKey: "investigation.class.well_supported", color: "bg-emerald-500" },
  { id: "archaeological", labelKey: "investigation.class.archaeological", color: "bg-amber-600" },
  { id: "documented", labelKey: "investigation.class.documented", color: "bg-blue-500" },
  { id: "interpretation", labelKey: "investigation.class.interpretation", color: "bg-purple-500" },
  { id: "traditional", labelKey: "investigation.class.traditional", color: "bg-orange-500" },
  { id: "uncertain", labelKey: "investigation.class.uncertain", color: "bg-slate-500" },
  { id: "incorrect", labelKey: "investigation.class.incorrect", color: "bg-red-500" }
];
