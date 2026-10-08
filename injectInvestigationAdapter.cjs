const fs = require('fs');
let code = fs.readFileSync('src/pages/InvestigationDetail.jsx', 'utf8');

// Add import
if (!code.includes("import { adaptTextForAge }")) {
    code = code.replace("import { artifactInvestigations, classificationTypes } from '../data/artifactInvestigations';", "import { artifactInvestigations, classificationTypes } from '../data/artifactInvestigations';\nimport { adaptTextForAge } from '../utils/ageAdapter';");
}

// Ensure ageGroup is extracted from gameState
if (!code.includes("const ageGroup = gameState?.ageGroup")) {
    code = code.replace("const { gameState, completeInvestigation } = useGame();", "const { gameState, completeInvestigation } = useGame();\n  const ageGroup = gameState?.ageGroup || '18+';");
}

// Adapt the introduction
code = code.replace(
    "{t(investigation.introductionKey)}",
    "{adaptTextForAge(t(investigation.introductionKey), ageGroup)}"
);

// Adapt clue descriptions
code = code.replace(
    "{t(clue.descriptionKey)}",
    "{adaptTextForAge(t(clue.descriptionKey), ageGroup)}"
);

// Adapt claim statements
code = code.replace(
    "{t(claim.statementKey)}",
    "{adaptTextForAge(t(claim.statementKey), ageGroup)}"
);

// Adapt claim explanations (in results view)
code = code.replace(
    "{t(claim.explanationKey)}",
    "{adaptTextForAge(t(claim.explanationKey), ageGroup)}"
);

fs.writeFileSync('src/pages/InvestigationDetail.jsx', code);
console.log("Injected ageAdapter into InvestigationDetail.jsx!");
