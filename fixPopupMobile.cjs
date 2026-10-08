const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const popupOrig = /<div className=\{"glass-panel p-8 rounded-2xl max-w-lg w-full border shadow-2xl text-center " \+ theme\.border\}>/;
const popupNew = `<div className={"glass-panel p-8 rounded-2xl max-w-lg w-full max-h-full overflow-y-auto border shadow-2xl text-center " + theme.border}>`;

code = code.replace(popupOrig, popupNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated popup for mobile overflow!");
