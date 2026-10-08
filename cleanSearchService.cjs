const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

// Fix emojis
code = code.replace(/icon: 'dYO\?',/g, "icon: '🗺️',");
code = code.replace(/icon: 'dY"s',/g, "icon: '🏛️',");
code = code.replace(/icon: 'dY-,\?',/g, "icon: '📍',");
code = code.replace(/icon: 'dYZ_',/g, "icon: '🎯',");
code = code.replace(/icon: 'dY"\?',/g, "icon: '🔍',");

// Remove questData and artifactInvestigations
code = code.replace(/import \{ questData \} from '\.\.\/data\/quests';\n/g, "");
code = code.replace(/import \{ artifactInvestigations \} from '\.\.\/data\/artifactInvestigations';\n/g, "");

const qRegex = /\/\/ 4\. Quests[\s\S]*?(?=\/\/ 5\. Investigations)/;
const iRegex = /\/\/ 5\. Investigations[\s\S]*?(?=\/\/ Build searchable text)/;

code = code.replace(qRegex, "");
code = code.replace(iRegex, "");

// Add achievements? "achievements" aren't explicitly exported as a list easily unless we hardcode them, but they are tracked via event codes. 
// "discoveries, artifacts, library content". Heritage library covers artifacts and discoveries perfectly.
// Let's just keep Levels, Library, Map.

fs.writeFileSync('src/services/searchService.js', code);
console.log("Cleaned up searchService.js!");
