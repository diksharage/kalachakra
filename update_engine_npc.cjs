const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Import NPCInteraction
if (!content.includes('import NPCInteraction')) {
    content = content.replace("import FinalSequence from './FinalSequence';", "import FinalSequence from './FinalSequence';\nimport NPCInteraction from './NPCInteraction';");
}

// Modify handleLocationClick
const locClickRegex = /const handleLocationClick = \(loc\) => \{[\s\S]*?if \(\!levelState\.exploration\.includes\(loc\.id\)\) \{/;
const locClickReplace = `const handleLocationClick = (loc) => {
    playSound('ui');
    
    if (loc.isNpc) {
       setLevelState(prev => ({ ...prev, activePopup: { type: 'npc', data: loc } }));
       return;
    }

    if (!levelState.exploration.includes(loc.id)) {`;
content = content.replace(locClickRegex, locClickReplace);

// Render block
const renderBlockSearch = /\{type === 'discover' && \(/;
const renderBlockReplace = `{type === 'npc' && (
              <NPCInteraction 
                data={data.npcData} 
                theme={theme} 
                resources={resources} 
                completedChallenges={levelState.completedChallenges}
                onTurnIn={(questId, costs, reward) => {
                  const newRes = { ...resources };
                  Object.keys(costs).forEach(k => newRes[k] -= costs[k]);
                  setLevelState(prev => ({ ...prev, resources: newRes }));
                  handleChallengeAnswer({ id: questId, reward }, true, false, 50, reward);
                }}
                onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
              />
            )}
            
            {type === 'discover' && (`;
content = content.replace(renderBlockSearch, renderBlockReplace);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
