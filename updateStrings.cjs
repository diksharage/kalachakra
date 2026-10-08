const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Update UI Strings for Stage 1-5 objectives to match prompt requests
code = code.replace(/\{stage === 1 && `Complete \$\{Math\.max\(0, targetExplore - exploration\.length\)\} more explorations\.`\}/, 
`{stage === 1 && \`Explore: \${exploration.length}/\${targetExplore} locations\`}`);

code = code.replace(/\{stage === 2 && `Complete \$\{Math\.max\(0, targetDiscover - discovery\.length\)\} more discoveries\.`\}/, 
`{stage === 2 && \`Discover: \${discovery.length}/\${targetDiscover} artifacts/resources\`}`);

code = code.replace(/\{stage === 3 && `Read \$\{Math\.max\(0, targetLearn - learning\.length\)\} more contextual notes\.`\}/, 
`{stage === 3 && \`Learn: \${learning.length}/\${targetLearn} historical notes\`}`);

code = code.replace(/\{stage === 4 && `Solve \$\{Math\.max\(0, targetChallenges - completedChallenges\.length\)\} more challenges\.`\}/, 
`{stage === 4 && \`Play: \${completedChallenges.length}/\${targetChallenges} challenges solved\`}`);

code = code.replace(/\{stage === 5 && `Construct \$\{Math\.max\(0, targetBuilds - builtItems\.length\)\} more buildings\.`\}/, 
`{stage === 5 && \`Build: \${builtItems.length}/\${targetBuilds} structures completed\`}`);

// Also inject the link to the Artifact Investigation
// Since I already updated InvestigationDetail to support returnTo
// We can add a button in the 'discover' or 'learn' popup if there's an investigation for this level!

const popupLearnOrig = /\{type === 'learn' && \(\s*<>\s*<div className="text-6xl mb-4">\{data\.icon\}<\/div>/;
const popupLearnNew = `{type === 'learn' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>`;

code = code.replace(popupLearnOrig, popupLearnNew); // Not replacing yet, let's inject a new check

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Objective UI Strings!");
