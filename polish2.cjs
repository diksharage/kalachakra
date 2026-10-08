const fs = require('fs');

function updateFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile('src/pages/ExplorePage.jsx', [
  { search: 'className="h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gold/20 shadow-xl relative"', replace: 'className="h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gold/20 shadow-xl relative animate-fade-in"' },
  { search: 'className="glass-panel p-4 rounded-xl cursor-pointer hover:bg-gold/10 hover:border-gold/30 transition-all border border-content/10"', replace: 'className="glass-panel p-4 rounded-xl cursor-pointer hover-card-fx border border-content/10"' }
]);

updateFile('src/pages/QuestsPage.jsx', [
  { search: 'className="space-y-6 pb-20"', replace: 'className="space-y-6 pb-20 animate-fade-in"' },
  { search: 'className={`glass-panel p-6 rounded-2xl border transition-all', replace: 'className={`glass-panel p-6 rounded-2xl border transition-all hover-card-fx animate-slide-up hover:border-gold/30' }
]);

updateFile('src/pages/AchievementsPage.jsx', [
  { search: 'className="space-y-8 pb-20"', replace: 'className="space-y-8 pb-20 animate-fade-in"' },
  { search: 'className={`glass-panel p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${isEarned ? \'border-gold/30 shadow-[0_0_15px_rgba(212,166,74,0.1)] hover:border-gold/50\' : \'border-content/10 opacity-70 grayscale hover:grayscale-0\'}`}', replace: 'className={`glass-panel p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center animate-slide-up ${isEarned ? \'border-gold/30 shadow-[0_0_15px_rgba(212,166,74,0.1)] hover-card-fx\' : \'border-content/10 opacity-70 grayscale hover:grayscale-0 hover-card-fx\'}`} style={{ animationDelay: `${index * 50}ms` }}' }
]);

console.log('Polished remaining pages.');
