const fs = require('fs');

function updateFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile('src/pages/ProfilePage.jsx', [
  { search: 'className="bg-surface/50 border border-content/10 p-4 rounded-xl flex items-center gap-4 hover:border-gold/30 transition-colors"', replace: 'className="bg-surface/50 border border-content/10 p-4 rounded-xl flex items-center gap-4 hover-card-fx"' }
]);

updateFile('src/pages/LibraryPage.jsx', [
  { search: 'className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col h-full hover:border-gold/30 transition-colors"', replace: 'className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col h-full hover-card-fx animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}' },
  { search: 'className="space-y-6 pb-20"', replace: 'className="space-y-6 pb-20 animate-fade-in"' }
]);

updateFile('src/pages/InventoryPage.jsx', [
  { search: 'className="glass-panel p-4 rounded-2xl border border-content/10 flex flex-col items-center text-center hover:border-gold/30 transition-colors group"', replace: 'className="glass-panel p-4 rounded-2xl border border-content/10 flex flex-col items-center text-center hover-card-fx group animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}' },
  { search: 'className="space-y-8 pb-20"', replace: 'className="space-y-8 pb-20 animate-fade-in"' }
]);

updateFile('src/pages/MapPage.jsx', [
  { search: 'className="h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gold/20 shadow-xl relative"', replace: 'className="h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gold/20 shadow-xl relative animate-fade-in"' }
]);

console.log('Polished interactive cards.');
