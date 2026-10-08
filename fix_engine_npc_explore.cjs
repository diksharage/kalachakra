const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const locClickRegex = /if \(loc\.isNpc\) \{[\s\S]*?return;\s*\}/;
const locClickReplace = `if (loc.isNpc) {
       setLevelState(prev => ({ 
          ...prev, 
          exploration: prev.exploration.includes(loc.id) ? prev.exploration : [...prev.exploration, loc.id],
          discovery: prev.discovery.includes(loc.id) ? prev.discovery : [...prev.discovery, loc.id],
          learning: prev.learning.includes(loc.id) ? prev.learning : [...prev.learning, loc.id],
          activePopup: { type: 'npc', data: loc } 
       }));
       return;
    }`;

content = content.replace(locClickRegex, locClickReplace);

// Also need to make sure NPCs are always clickable!
const clickableSearch = /let isClickable = false;/;
const clickableReplace = `let isClickable = false;
                  if (loc.isNpc) isClickable = true;`;

content = content.replace(clickableSearch, clickableReplace);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
