const fs = require('fs');
const content = fs.readFileSync('dist/assets/index-D3eSUOdN.js', 'utf8');
let idx = -1;
while ((idx = content.indexOf('ArrowRight', idx + 1)) !== -1) {
  const ctx = content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 50));
  // check if it's surrounded by quotes
  const before = content.substring(idx-1, idx);
  const after = content.substring(idx+10, idx+11);
  if (before !== '"' && before !== "'" && before !== '`' && after !== '"' && after !== "'" && after !== '`') {
     console.log(`FOUND AT ${idx}: ${ctx}`);
  }
}
