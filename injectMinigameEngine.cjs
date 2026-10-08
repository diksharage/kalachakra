const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Add imports
const imports = `import { minigamesData } from '../../data/minigames';\nimport MiniGameManager from '../minigames/MiniGameManager';\n`;
if (!code.includes('MiniGameManager')) {
  code = code.replace("import FinalSequence from './FinalSequence';", imports + "import FinalSequence from './FinalSequence';");
}

// 2. Modify renderPopup challenge block
const targetStr = `{type === 'challenge' && (
              <>
                <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`;

const replacement = `{type === 'challenge' && (
              <>
                {data.format === 'minigame' ? (
                   <MiniGameManager 
                     gameConfig={minigamesData[data.id]} 
                     theme={theme} 
                     onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild)} 
                   />
                ) : (
                  <>
                    <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`;

if (!code.includes('data.format === \'minigame\'')) {
  code = code.replace(targetStr, replacement);
  
  // Close the else block
  const endTargetStr = `                  </div>
                )}
              </>
            )}

            {type === 'confirm_build'`;
            
  const endReplacement = `                  </div>
                )}
                  </>
                )}
              </>
            )}

            {type === 'confirm_build'`;
            
  code = code.replace(endTargetStr, endReplacement);
}

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected MiniGameManager into LevelEngine.");
