const fs = require('fs');

function updateFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Journey Page
updateFile('src/pages/JourneyPage.jsx', [
  { search: 'className={`w-full py-3 font-bold rounded-xl transition-colors ${', replace: 'className={`w-full py-3 font-bold rounded-xl transition-colors btn-fx ${' },
  { search: 'className="space-y-8 pb-20"', replace: 'className="space-y-8 pb-20 animate-fade-in"' },
  { search: 'animate-pulse-slow', replace: 'animate-pulse-glow' }
]);

// 2. Dashboard Page
updateFile('src/pages/DashboardPage.jsx', [
  { search: 'className="space-y-8 pb-20"', replace: 'className="space-y-8 pb-20 animate-fade-in"' },
  { search: /hover:-translate-y-1 hover:shadow-xl/g, replace: 'hover-card-fx' },
  { search: /hover:shadow-lg transition-shadow/g, replace: 'hover-card-fx' },
  { search: /hover:bg-gold\/10 transition-colors/g, replace: 'hover:bg-gold/10 transition-colors btn-fx' }
]);

// 3. LevelPlayPage
updateFile('src/pages/LevelPlayPage.jsx', [
  { search: 'className="h-full overflow-hidden relative"', replace: 'className="h-full overflow-hidden relative animate-fade-in"' },
  { search: /active:scale-95 transition-transform/g, replace: 'btn-fx' }
]);

console.log('Updates applied.');
