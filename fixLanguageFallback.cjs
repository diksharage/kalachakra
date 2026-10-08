const fs = require('fs');
let code = fs.readFileSync('src/context/LanguageContext.jsx', 'utf8');

code = code.replace(
  "if (!key || typeof key !== 'string') return fallback || String(key || '');",
  "if (!key || typeof key !== 'string') return fallback || key;"
);

fs.writeFileSync('src/context/LanguageContext.jsx', code);
console.log("Removed String() fallback in LanguageContext!");
