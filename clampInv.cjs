const fs = require('fs');
let code = fs.readFileSync('src/context/GameContext.jsx', 'utf8');

const updateResOrig = /inv\[k\] = \(inv\[k\] \|\| 0\) \+ resources\[k\];/;
const updateResNew = `inv[k] = Math.max(0, (inv[k] || 0) + resources[k]);`;

code = code.replace(updateResOrig, updateResNew);
fs.writeFileSync('src/context/GameContext.jsx', code);
console.log("Clamped global inventory");
