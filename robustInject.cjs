const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const anchor = "{type === 'challenge' && (\n              <>\n                <h3";
if (code.includes(anchor) && !code.includes("data.format === 'minigame'")) {
    const splitStr = "{type === 'challenge' && (";
    const parts = code.split(splitStr);
    
    // We want to insert right after the `<>` in `{type === 'challenge' && (\n              <>\n`
    // Let's just find `<h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`
    
    const h3Match = `<h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`;
    
    const h3Replace = `{data.format === 'minigame' ? (
                   <MiniGameManager 
                     gameConfig={minigamesData[data.id]} 
                     theme={theme} 
                     onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild)} 
                   />
                ) : (
                  <>
                    <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>`;
                    
    code = code.replace(h3Match, h3Replace);
    
    // Now we need to close the `</>` that we opened for the `else` branch of our ternary.
    // We find `</>\n            )}\n\n            {type === 'confirm_build'`
    const endMatch = `</>\n            )}\n\n            {type === 'confirm_build'`;
    const endReplace = `  </>\n                )}\n              </>\n            )}\n\n            {type === 'confirm_build'`;
    
    // Since whitespace might differ, let's use regex
    code = code.replace(/<\/>\s*}\)\s*{type === 'confirm_build'/g, `  </>\n                )}\n              </>\n            )}\n\n            {type === 'confirm_build'`);
    
    fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
    console.log("Injected successfully.");
} else {
    console.log("Could not find anchor or already injected.");
}
