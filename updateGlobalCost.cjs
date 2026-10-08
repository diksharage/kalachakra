const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const buildConfirmOrig = /const newResources = \{ \.\.\.resources \};\n                     Object\.keys\(data\.requirements \|\| \{\}\)\.forEach\(k => \{\n                       newResources\[k\] = \(newResources\[k\] \|\| 0\) - data\.requirements\[k\];\n                     \}\);/;
const buildConfirmNew = `const newResources = { ...resources };
                     const globalCostPayload = {};
                     Object.keys(data.requirements || {}).forEach(k => {
                       newResources[k] = (newResources[k] || 0) - data.requirements[k];
                       globalCostPayload[k] = -data.requirements[k];
                     });
                     updateResources(globalCostPayload);`;

code = code.replace(buildConfirmOrig, buildConfirmNew);
fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected Global Inventory Deduction");
