const fs = require('fs');

let content = fs.readFileSync('src/pages/BuilderPage.jsx', 'utf8');

content = content.replace('className="space-y-6 pb-20"', 'className="space-y-6 pb-20 animate-fade-in"');
content = content.replace(/hover:border-gold\/30 hover:shadow-lg transition-all/g, 'hover-card-fx transition-all animate-slide-up');

fs.writeFileSync('src/pages/BuilderPage.jsx', content, 'utf8');
console.log('Builder polished.');
