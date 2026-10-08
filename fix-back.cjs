const fs = require('fs');

let hi = fs.readFileSync('src/i18n/hi.js', 'utf8');
hi = hi.replace(/back:\s*"[^"]*"/, 'back: "वापस"');
fs.writeFileSync('src/i18n/hi.js', hi, 'utf8');

let te = fs.readFileSync('src/i18n/te.js', 'utf8');
te = te.replace(/back:\s*"[^"]*"/, 'back: "వెనక్కి"');
fs.writeFileSync('src/i18n/te.js', te, 'utf8');
