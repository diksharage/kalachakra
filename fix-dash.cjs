const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

const newHeader = `
  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto page-transition atmospheric-bg">
      
      {/* 1. Personalized Header - Adventure Camp Style */}
      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 p-8 rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-surface to-main overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="text-gold font-bold tracking-widest text-sm uppercase mb-2 animate-drift">Heritage Basecamp</div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-content drop-shadow-md mb-2">
            {t('dash.welcome', 'Welcome back, {{name}}!').replace('{{name}}', pName)}
          </h1>
          <p className="text-content/80 text-lg">
            {t('dash.subtitle', 'Your adventure continues through history, culture, and heritage.')}
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-main/80 backdrop-blur-md border border-gold/40 shadow-inner text-xs font-bold uppercase text-content/90 hover-card-fx">
            {t(\`onboarding.age_\${gameState.ageGroup || '12-14'}\`, gameState.ageGroup || '12-14')}
          </div>
          <div className="px-4 py-2 rounded-xl bg-main/80 backdrop-blur-md border border-gold/40 shadow-inner text-xs font-bold uppercase text-gold hover-card-fx">
            {t(\`onboarding.type_\${gameState.playerType || 'explorer'}\`, gameState.playerType || 'Explorer')}
          </div>
`;

const startIdx = content.indexOf('  return (');
const playerTypeIdx = content.indexOf('gameState.playerType');
const endIdx = content.indexOf('        </div>', playerTypeIdx) + 14;

if (startIdx > -1 && endIdx > -1) {
  content = content.substring(0, startIdx) + newHeader + content.substring(endIdx);
  fs.writeFileSync('src/pages/DashboardPage.jsx', content, 'utf8');
}
