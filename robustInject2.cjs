const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const h3Match = '<h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>';
const h3Replace = `{data.format === 'minigame' ? (
                   <MiniGameManager 
                     gameConfig={minigamesData[data.id]} 
                     theme={theme} 
                     onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild)} 
                   />
                ) : (
                  <>
                    <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`;

if (code.includes(h3Match) && !code.includes("data.format === 'minigame'")) {
    code = code.replace(h3Match, h3Replace);
    
    // Close the tags right before {type === 'confirm_build'
    // Regex to match </>\s*}\)\s*{type === 'confirm_build'
    code = code.replace(/<\/>\s*}\)\s*{type === 'confirm_build'/g, `  </>\n                )}\n              </>\n            )}\n\n            {type === 'confirm_build'`);
    
    fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
    console.log("Injected successfully.");
} else {
    console.log("Could not find h3Match or already injected.");
}
