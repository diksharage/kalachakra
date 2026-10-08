const fs = require('fs');

function addBackButton(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('import BackButton')) return; // already added

  // Insert import
  const importMatch = content.match(/import.*?['"];?\n/g);
  if (importMatch) {
    const lastImport = importMatch[importMatch.length - 1];
    content = content.replace(lastImport, lastImport + `import BackButton from '../components/common/BackButton';\n`);
  }

  // Find the first main container / header
  // Often it's `<div className="space-y-6...` or `<header...`
  // Since components vary, let's insert it immediately after the main container's first opening div, or replace the header entirely.

  if (filePath.includes('JourneyPage.jsx')) {
    const headerMatch = content.match(/<header[^>]*>[\s\S]*?<\/header>/);
    if (headerMatch) {
      const newHeader = `
      <header className="relative flex flex-col justify-center items-center gap-4 mb-16 p-10 rounded-3xl border-2 border-[#A8794F]/40 bg-gradient-to-br from-[#121714] to-[#18352B] overflow-hidden shadow-2xl atmospheric-bg">
        <div className="absolute top-4 left-4 z-20">
          <BackButton />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10 pointer-events-none animate-drift" />
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#E8D9B8] drop-shadow-md mb-4">
            {t('nav.journey', 'The Ancient Path')}
          </h1>
          <p className="text-[#A97932] text-lg italic tracking-wider">
            Travel the timeline of civilization.
          </p>
        </div>
      </header>
      `;
      content = content.replace(headerMatch[0], newHeader);
      
      // Now redesign the Journey Path visualization
      // The current map is a grid of cards: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`
      const gridMatch = content.match(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">/);
      if (gridMatch) {
        content = content.replace(gridMatch[0], `<div className="flex flex-col items-center gap-8 relative py-8 before:absolute before:inset-y-0 before:left-1/2 before:w-1 before:-translate-x-1/2 before:bg-[#625B4A]/30">`);
      }
      
      // Find the card rendering inside the map and make it a path node
      const cardContainer = content.match(/<div\s+key=\{level\.id\}[^>]*class.*?glass-panel[\s\S]*?<\/div>\s*<\/div>/);
      // It's a bit complex to regex replace the entire card.
    }
  } else {
    // Generic injection for other pages: ExplorePage, ProfilePage, LibraryPage, etc.
    const headerMatch = content.match(/<header[^>]*>([\s\S]*?)<\/header>/);
    if (headerMatch) {
      const inner = headerMatch[1];
      if (!inner.includes('<BackButton')) {
        content = content.replace(headerMatch[0], `<header className="flex items-center gap-6 mb-8">\n        <BackButton />\n        <div className="flex-1">\n${inner}\n        </div>\n      </header>`);
      }
    } else {
      // Fallback: look for the first <h1> and put it above.
      const h1Match = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/);
      if (h1Match) {
        content = content.replace(h1Match[0], `<div className="flex items-center gap-6 mb-8"><BackButton /> ${h1Match[0]}</div>`);
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

addBackButton('src/pages/JourneyPage.jsx');
addBackButton('src/pages/ExplorePage.jsx');
addBackButton('src/pages/LibraryPage.jsx');
addBackButton('src/pages/InventoryPage.jsx');
addBackButton('src/pages/ProfilePage.jsx');
addBackButton('src/pages/AchievementsPage.jsx');
addBackButton('src/pages/QuestsPage.jsx');
addBackButton('src/pages/InvestigationsPage.jsx');
addBackButton('src/pages/BuilderPage.jsx');
// Level play pages
addBackButton('src/pages/LevelIntroPage.jsx');
// GameLayout should NOT have it universally, it should be per page.
