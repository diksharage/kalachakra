const fs = require('fs');

let code = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');

const parentOrig = /<div className="space-y-8 pb-20 atmospheric-bg max-w-4xl mx-auto">/;
const parentNew = `<div className="space-y-8 pb-20 atmospheric-bg max-w-4xl mx-auto overflow-x-hidden">`;

code = code.replace(parentOrig, parentNew);

fs.writeFileSync('src/pages/JourneyPage.jsx', code);
console.log("Added overflow-x-hidden to JourneyPage!");
