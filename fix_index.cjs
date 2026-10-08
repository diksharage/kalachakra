const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace('href="favicon.svg"', 'href="/favicon.svg"');
fs.writeFileSync('index.html', content);
