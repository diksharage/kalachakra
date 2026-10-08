const fs = require('fs');
let code = fs.readFileSync('src/components/layout/GlobalSearch.jsx', 'utf8');

// Fix quick categories
const oldCats = `const quickCategories = [
      { name: t('nav.library', 'Heritage Library'), icon: <BookOpen size={16} /> },
      { name: t('nav.explore', 'Historical Map'), icon: <Map size={16} /> },
      { name: t('nav.quests', 'Quests'), icon: <Target size={16} /> },
      { name: t('nav.investigations', 'Investigations'), icon: <Search size={16} /> }
    ];`;

const newCats = `const quickCategories = [
      { name: t('nav.library', 'Heritage Library'), icon: <BookOpen size={16} /> },
      { name: t('nav.explore', 'Historical Map'), icon: <Map size={16} /> },
      { name: t('nav.profile', 'Player Profile'), icon: <History size={16} /> },
      { name: t('nav.achievements', 'Achievements'), icon: <Target size={16} /> }
    ];`;
code = code.replace(oldCats, newCats);

// Fix handleResultClick logic
const oldHandleClick = `  const handleResultClick = (result) => {
      saveRecentSearch(query || result.title);
      navigate(result.route);
      onClose();
    };`;

const newHandleClick = `  const handleResultClick = (result) => {
      if (result.locked) {
        // Prevent navigating to locked content
        return;
      }
      saveRecentSearch(query || result.title);
      navigate(result.route);
      onClose();
    };`;
code = code.replace(oldHandleClick, newHandleClick);

// Fix garbled strings
code = code.replace(/\+`\+"\s+to navigate/g, '↑↓ to navigate');
code = code.replace(/\+\s+to select/g, '↵ to select');
code = code.replace(/o"\s+\{t\('search.discovered'/g, '✔️ {t(\'search.discovered\'');
code = code.replace(/dY"'\s+\{t\('search.locked'/g, '🔒 {t(\'search.locked\'');
code = code.replace(/o\s+\{t\('search.undiscovered'/g, '🔍 {t(\'search.undiscovered\'');
code = code.replace(/\{result.category\} \? Level \{result.levelId\}/g, '{result.category} • Level {result.levelId}');

// If standard string replace failed, do a regex sweep
code = code.replace(/<span className="hidden sm:inline-block">[^<]*to navigate<\/span>/g, '<span className="hidden sm:inline-block">↑↓ to navigate</span>');
code = code.replace(/<span className="hidden sm:inline-block">[^<]*to select<\/span>/g, '<span className="hidden sm:inline-block">↵ to select</span>');

code = code.replace(/<span className="text-emerald-500 font-bold bg-emerald-500\/10 px-2 py-0\.5 rounded">[^<]*\{t\('search\.discovered', 'Discovered'\)\}<\/span>/g, '<span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={12}/> {t(\'search.discovered\', \'Discovered\')}</span>');

code = code.replace(/<span className="text-content\/50 font-bold bg-content\/10 px-2 py-0\.5 rounded">[^<]*\{t\('search\.locked', 'Locked'\)\}<\/span>/g, '<span className="text-content/50 font-bold bg-content/10 px-2 py-0.5 rounded flex items-center gap-1"><Lock size={12}/> {t(\'search.locked\', \'Locked\')}</span>');

code = code.replace(/<span className="text-gold font-bold bg-gold\/10 px-2 py-0\.5 rounded">[^<]*\{t\('search\.undiscovered', 'Explore'\)\}<\/span>/g, '<span className="text-gold font-bold bg-gold/10 px-2 py-0.5 rounded flex items-center gap-1"><Search size={12}/> {t(\'search.undiscovered\', \'Explore\')}</span>');

// Replace ?
code = code.replace(/\{result\.category\} [^ ]+ Level \{result\.levelId\}/g, '{result.category} • Level {result.levelId}');

// Add CheckCircle import
if (!code.includes('CheckCircle')) {
  code = code.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, CheckCircle } from 'lucide-react';");
}

fs.writeFileSync('src/components/layout/GlobalSearch.jsx', code);
console.log("Updated GlobalSearch UI and locks!");
