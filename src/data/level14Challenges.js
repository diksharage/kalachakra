export const level14Challenges = {
  mg_l14_preserve: {
    "id": "mg-l14-preserve",
    "title": "Mini-Game: The Archivist's Dilemma",
    "format": "minigame",
    "explanation": "You successfully completed the mini-game scenario!"
},
  conservation_decision: {
    id: "legacy-conserve-01",
    title: "Manuscript Preservation",
    format: "decision",
    getQuestion: (ageGroup) => "You have discovered a crumbling 1,000-year-old palm-leaf manuscript. What is the scientifically appropriate way to preserve it?",
    options: [
      { id: 'glue', label: 'Use modern superglue to bind the flaking leaves together quickly.', icon: '🧪', isCorrect: false },
      { id: 'digitize', label: 'Handle with gloves, gently clean, climate-control the storage, and create a high-res digital scan.', icon: '📸', isCorrect: true },
      { id: 'sun', label: 'Leave it out in the hot sun to dry out the moisture.', icon: '☀️', isCorrect: false }
    ],
    reward: { knowledge: 2, technology: 1 },
    explanation: "Modern conservation avoids destructive or irreversible methods. Digitization combined with climate control is the standard for vulnerable texts."
  },
  heritage_threats: {
    id: "legacy-threats-01",
    title: "Threats to Heritage",
    format: "matching",
    getQuestion: (ageGroup) => "Match the famous heritage site to its modern preservation threat:",
    pairs: [
      { left: { id: 'l1', label: 'Taj Mahal', icon: '🕌' }, right: { id: 'r1', label: 'Industrial air pollution (yellowing)' } },
      { left: { id: 'l2', label: 'Coastal Shore Temples', icon: '🌊' }, right: { id: 'r2', label: 'Salinity and ocean erosion' } },
      { left: { id: 'l3', label: 'Unexcavated Harappan Sites', icon: '🧱' }, right: { id: 'r3', label: 'Agricultural expansion and brick robbing' } }
    ],
    reward: { legacy: 2, knowledge: 1 },
    explanation: "Different monuments face different environmental and human threats. Tailored scientific approaches are required for each specific site."
  },
  repatriation: {
    id: "legacy-repatriate-01",
    title: "Artifact Repatriation",
    format: "ordering",
    getQuestion: (ageGroup) => "Order the steps of successfully repatriating (bringing back) a stolen historical artifact from a foreign museum:",
    items: [
      { id: 'step1', label: 'Identify the stolen artifact in an international catalog or auction.' },
      { id: 'step2', label: 'Match the artifact to old archival photos and excavation records.' },
      { id: 'step3', label: 'Engage in diplomatic and legal negotiations using UNESCO conventions.' },
      { id: 'step4', label: 'Safely transport the artifact back to its country of origin for public display.' }
    ],
    correctOrder: ['step1', 'step2', 'step3', 'step4'],
    reward: { legacy: 2, technology: 1 },
    explanation: "Repatriation is a complex legal and diplomatic process that relies heavily on rigorous archival documentation to prove original provenance."
  },
  public_awareness: {
    id: "legacy-awareness-01",
    title: "Community Action",
    format: "mcq",
    getQuestion: (ageGroup) => "What is considered the most sustainable long-term method for protecting local archaeological sites?",
    options: [
      { id: 'secrecy', label: 'Keeping the sites a total secret from everyone.', icon: '🤫', isCorrect: false },
      { id: 'community', label: 'Educating and involving the local community so they become stakeholders and protectors.', icon: '🤝', isCorrect: true },
      { id: 'fences', label: 'Building giant concrete walls around every site.', icon: '🧱', isCorrect: false }
    ],
    reward: { knowledge: 2, legacy: 1 },
    explanation: "When local communities understand the value of their heritage and benefit from it (through tourism, pride, or education), they become its strongest protectors."
  }
};
