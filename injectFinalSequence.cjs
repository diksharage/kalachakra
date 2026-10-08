const fs = require('fs');

const path = 'src/components/gameplay/LevelEngine.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import FinalSequence')) {
  content = content.replace("import { useAudio } from '../../context/AudioContext';", "import { useAudio } from '../../context/AudioContext';\nimport FinalSequence from './FinalSequence';");
}

const targetStr = "{type === 'completion' && (";
const replacementStr = "{type === 'completion' && config.id === 14 ? (\n          <FinalSequence config={config} onComplete={() => navigate('/dashboard')} />\n        ) : type === 'completion' && (";

content = content.replace(targetStr, replacementStr);

fs.writeFileSync(path, content, 'utf8');
console.log('LevelEngine updated for FinalSequence.');
