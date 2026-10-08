const fs = require('fs');

function updateFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile('src/pages/InvestigationsPage.jsx', [
  { search: 'className="space-y-6 pb-20"', replace: 'className="space-y-6 pb-20 animate-fade-in"' },
  { search: 'className={`glass-panel p-6 rounded-2xl border transition-all ${isCompleted ? \'border-gold/30 shadow-[0_0_15px_rgba(212,166,74,0.1)]\' : \'border-content/10 hover:border-gold/30 hover:-translate-y-1 hover:shadow-xl cursor-pointer\'}`}', replace: 'className={`glass-panel p-6 rounded-2xl border transition-all animate-slide-up hover-card-fx ${isCompleted ? \'border-gold/30 shadow-[0_0_15px_rgba(212,166,74,0.1)]\' : \'border-content/10 cursor-pointer\'}`}' }
]);

updateFile('src/pages/InvestigationDetail.jsx', [
  { search: 'className="space-y-6 pb-20"', replace: 'className="space-y-6 pb-20 animate-fade-in"' },
  { search: /hover:border-gold\/30 transition-colors/g, replace: 'hover-card-fx transition-colors' }
]);

console.log('Investigations polished.');
