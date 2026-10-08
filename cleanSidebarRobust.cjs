const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const s4Start = code.indexOf('{stage === 4 && (');
if (s4Start !== -1) {
   const s4EndStr = '              </div>\n            )}';
   const s4End = code.indexOf(s4EndStr, s4Start);
   if (s4End !== -1) {
       code = code.substring(0, s4Start) + code.substring(s4End + s4EndStr.length);
   }
}

const s5Start = code.indexOf('{stage === 5 && (');
if (s5Start !== -1) {
   const s5EndStr = '              </div>\n            )}';
   const s5End = code.indexOf(s5EndStr, s5Start);
   if (s5End !== -1) {
       code = code.substring(0, s5Start) + code.substring(s5End + s5EndStr.length);
   }
}

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Removed redundant Stage 4 and 5!");
