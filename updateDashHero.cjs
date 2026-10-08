const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

const stageLogic = `
  const getStageLabel = (stage) => {
    switch(stage) {
      case 1: return "EXPLORE";
      case 2: return "DISCOVER";
      case 3: return "LEARN";
      case 4: return "PLAY + SOLVE";
      case 5: return "BUILD / MANAGE";
      case 6: return "LEVEL COMPLETE";
      default: return "NOT STARTED";
    }
  };

  const getStageProgress = (state) => {
    if (!state) return "";
    switch(state.stage) {
      case 1: return \`Locations \${state.exploration.length}/4\`;
      case 2: return \`Artifacts \${state.discovery.length}/4\`;
      case 3: return \`Notes \${state.learning.length}/4\`;
      case 4: return \`Challenges \${state.completedChallenges.length}/\${state.activeChallengeIds?.length || 3}\`;
      case 5: return \`Structures \${state.builtItems.length}/3\`;
      case 6: return "Ready to complete";
      default: return "";
    }
  };
`;

const renderLogicOrig = /<div className="text-sm opacity-80">\s*\{stats\.journey\.isComplete \? t\('dash\.journey_complete', 'You completed the KALACHAKRA journey\.'\) : t\('dash\.continue_desc', 'Explore the historical context and challenges\.'\)\}\s*<\/div>/;

const renderLogicNew = `<div className="text-sm opacity-80 flex flex-col gap-2">
                {stats.journey.isComplete ? (
                  <p>You have preserved the Legacy and completed the journey.</p>
                ) : (gameState.activeLevelId === currentLevel && gameState.activeLevelState) ? (
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="font-bold text-content uppercase tracking-wider text-xs">
                      Current: <span className="text-gold">{getStageLabel(gameState.activeLevelState.stage)}</span>
                    </p>
                    <p className="text-content/70">
                      {getStageProgress(gameState.activeLevelState)}
                    </p>
                  </div>
                ) : (
                  <p>{t('dash.continue_desc', 'Explore the historical context and challenges.')}</p>
                )}
              </div>`;

if(!code.includes('getStageLabel')) {
    code = code.replace("const currentLevel = stats.journey.currentLevel;", stageLogic + "\n  const currentLevel = stats.journey.currentLevel;");
}

code = code.replace(renderLogicOrig, renderLogicNew);

// Level Name fixing - it only showed Level X, not "Level 3 - Indus Civilization"
const titleOrig = /<h2 className=\{`text-3xl md:text-4xl font-serif font-bold mb-2 \$\{levelThemeData\.text\}`\}>\s*\{t\(`levels\.\$\{currentLevel\}\.title`, `Level \$\{currentLevel\}`\)\}\s*<\/h2>/;
const titleNew = `<h2 className={\`text-3xl md:text-4xl font-serif font-bold mb-2 \${levelThemeData.text}\`}>
                Level {currentLevel} — {levelThemeData.name}
              </h2>`;

code = code.replace(titleOrig, titleNew);

fs.writeFileSync('src/pages/DashboardPage.jsx', code);
console.log("Updated DashboardPage hero!");
