import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { heritageLibrary, libraryCategories, certaintyLevels } from '../data/heritageLibrary';
import { BookOpen, Lock, Search, Filter, X } from 'lucide-react';
import { levelThemes } from '../data/levelThemes';
import { civilizationLevels } from '../data/civilizationLevels';
import { useTheme } from '../context/ThemeContext';
import BackButton from '../components/common/BackButton';
import { useSearchParams } from 'react-router-dom';

const LibraryModal = ({ entry, onClose, levelThemeData }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  if (!entry) return null;

  const certainty = certaintyLevels.find(c => c.id === entry.certainty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors z-10">
          <X size={24} className={theme === 'light' ? 'text-black' : 'text-white'} />
        </button>
        
        <div className={`p-8 pb-4 border-b ${levelThemeData.border} ${theme === 'light' ? 'bg-white/40' : 'bg-black/20'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner bg-main border border-content/10`}>
              {entry.icon}
            </div>
            <div>
              <h2 className={`text-2xl font-bold font-serif ${levelThemeData.text}`}>{t(`library.entry.${entry.id}.title`, entry.id)}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs uppercase font-bold tracking-wider text-content/70">
                <span>{t(`library.cat.${entry.category}`, entry.category)}</span>
                <span>•</span>
                <span>{t('library.level', 'Level')} {entry.level}</span>
                <span>•</span>
                <span>{t(`library.entry.${entry.id}.period`, entry.period)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6 text-content">
          <section>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${levelThemeData.text}`}>{t('library.whatWeKnow', 'What We Know')}</h3>
            <p className="text-sm/relaxed opacity-90">{t(`library.entry.${entry.id}.known`, 'Basic facts and descriptions go here.')}</p>
          </section>

          <section>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${levelThemeData.text}`}>{t('library.evidence', 'Evidence')}</h3>
            <div className="flex items-center gap-2 mb-2 text-sm font-bold">
              <span className={certainty?.color}>●</span>
              <span>{t(certainty?.labelKey, certainty?.id)}</span>
            </div>
            <p className="text-sm/relaxed opacity-90">{t(`library.entry.${entry.id}.evidence`, 'Archaeological or historical evidence supporting this.')}</p>
          </section>

          <section>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${levelThemeData.text}`}>{t('library.interpretation', 'Interpretation')}</h3>
            <p className="text-sm/relaxed opacity-90">{t(`library.entry.${entry.id}.interpretation`, 'How historians interpret this evidence.')}</p>
          </section>

          <section className="bg-main/50 p-4 rounded-xl border border-content/10">
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 text-terracotta`}>{t('library.uncertain', 'What Remains Uncertain')}</h3>
            <p className="text-sm/relaxed opacity-90">{t(`library.entry.${entry.id}.uncertain`, 'Ongoing debates or unknown elements.')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const LibraryCard = ({ entry, isDiscovered, onClick, levelThemeData }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  if (!isDiscovered) {
    return (
      <div className={`rounded-xl p-4 flex gap-4 transition-all opacity-50 grayscale border border-content/10 ${theme === 'light' ? 'bg-surface' : 'bg-surface/50'}`}>
        <div className="w-16 h-16 rounded-xl bg-main border border-content/20 flex items-center justify-center shrink-0">
          <Lock className="text-content/30" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="font-bold text-content">{t('library.locked', 'Unknown Heritage Entry')}</h4>
          <p className="text-xs text-content/60 mt-1">{t('library.lockedDesc', 'Discover more in Level')} {entry.level}</p>
        </div>
      </div>
    );
  }

  const certainty = certaintyLevels.find(c => c.id === entry.certainty);

  return (
    <div 
      onClick={() => onClick(entry)}
      className={`rounded-xl p-4 flex gap-4 transition-all cursor-pointer hover:scale-[1.02] shadow-md border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface/80 hover:bg-surface'}`}
    >
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-inner bg-main border border-content/10`}>
        {entry.icon}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h4 className={`font-bold ${levelThemeData.text} mb-1`}>{t(`library.entry.${entry.id}.title`, entry.id)}</h4>
        <div className="text-[10px] uppercase font-bold text-content/50 mb-2 flex items-center gap-1">
          <span>{t(`library.cat.${entry.category}`, entry.category)}</span>
          <span>•</span>
          <span>{t('library.level', 'Level')} {entry.level}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[9px] bg-gold/10 text-gold px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
            🔎 {t('library.discovered', 'Discovered')}
          </span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold bg-main border border-content/10 ${certainty?.color}`}>
            {t(certainty?.labelKey, certainty?.id)}
          </span>
        </div>
      </div>
    </div>
  );
};

const LibraryPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [activeCertainty, setActiveCertainty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const initialItemId = searchParams.get('item');
  
  const [selectedEntry, setSelectedEntry] = useState(() => {
    if (initialItemId) {
      const found = heritageLibrary.find(e => e.id === initialItemId);
      return found || null;
    }
    return null;
  });

  // Clear query param when modal is closed
    useEffect(() => {
    const itemParam = searchParams.get('item');
    if (itemParam) {
      const found = heritageLibrary.find(e => e.id === itemParam);
      if (found) setSelectedEntry(found);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setSelectedEntry(null);
    if (searchParams.has('item')) {
      setSearchParams({});
    }
  };

  const { unlockedArtifacts, legacy } = gameState;

  const filteredEntries = useMemo(() => {
    return heritageLibrary.filter(entry => {
      const matchCat = activeCategory === 'all' || entry.category === activeCategory;
      const matchLevel = activeLevel === 'all' || entry.level.toString() === activeLevel.toString();
      const matchCertainty = activeCertainty === 'all' || entry.certainty === activeCertainty;
      const matchSearch = searchQuery === '' || 
        t(`library.entry.${entry.id}.title`, entry.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(`library.entry.${entry.id}.known`, '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchLevel && matchCertainty && matchSearch;
    });
  }, [activeCategory, activeLevel, activeCertainty, searchQuery, t]);

  const levelsOptions = [{ id: 'all', label: 'All Eras' }, ...civilizationLevels.map(l => ({ id: l.id, label: `Level ${l.id}` }))];
  const certaintyOptions = [{ id: 'all', labelKey: 'library.cert.all', defaultLabel: 'All Evidence Types' }, ...certaintyLevels];

  const totalDiscovered = heritageLibrary.filter(e => unlockedArtifacts.includes(e.id)).length;
  
  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div>
          <div className="w-14 h-14 bg-gradient-to-br from-gold to-terracotta rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
            <BookOpen size={28} className="text-main" />
          </div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">{t('library.title', 'Heritage Library')}</h1>
          <p className="text-content/70 text-sm max-w-xl">{t('library.subtitle', 'Your discoveries across the journey.')}</p>
        </div>
        
        <div className={`glass-panel px-6 py-4 rounded-xl border flex gap-6 ${theme === 'light' ? 'bg-surface border-gold/30' : 'bg-surface/50 border-content/10'}`}>
          <div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('common.legacy', 'Legacy')}</div>
            <div className="text-2xl font-bold text-content">{legacy || 0}</div>
          </div>
          <div className="w-px bg-content/10"></div>
          <div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('library.discoveries', 'Discoveries')}</div>
            <div className="text-2xl font-bold text-content">{totalDiscovered} <span className="text-sm text-content/50">/ {heritageLibrary.length}</span></div>
          </div>
        </div>
      
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 bg-surface border border-content/10 p-4 rounded-xl">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-content/40" />
          <input 
            type="text" 
            placeholder={t('library.search', 'Search discoveries...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-main border border-content/20 rounded-lg pl-12 pr-4 py-3 text-sm font-bold text-content outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center px-2 shrink-0 text-content/50 hidden sm:block">
            <Filter size={18} />
          </div>
          
          {/* Category Tabs */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2 w-full">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-gold text-main' : 'bg-main hover:bg-main/80 text-content/70'}`}
            >
              {t('common.all', 'All')}
            </button>
            {libraryCategories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${activeCategory === cat.id ? 'bg-gold text-main' : 'bg-main hover:bg-main/80 text-content/70'}`}
              >
                <span>{cat.icon}</span> {t(cat.labelKey, cat.labelKey.split('.').pop())}
              </button>
            ))}
          </div>
          
          <select 
            value={activeLevel}
            onChange={(e) => setActiveLevel(e.target.value)}
            className="bg-main text-content border border-content/20 rounded-lg px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:border-gold transition-colors shrink-0 w-full sm:w-auto"
          >
            {levelsOptions.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>

          <select 
            value={activeCertainty}
            onChange={(e) => setActiveCertainty(e.target.value)}
            className="bg-main text-content border border-content/20 rounded-lg px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:border-gold transition-colors shrink-0 w-full sm:w-auto"
          >
            {certaintyOptions.map(c => (
              <option key={c.id} value={c.id}>{t(c.labelKey, c.defaultLabel || c.id)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredEntries.map(entry => {
          const isDiscovered = unlockedArtifacts.includes(entry.id);
          const levelThemeData = levelThemes[entry.level] || levelThemes[1];

          return (
            <LibraryCard 
              key={entry.id}
              entry={entry}
              isDiscovered={isDiscovered}
              levelThemeData={levelThemeData}
              onClick={(e) => setSelectedEntry(e)}
            />
          );
        })}
        {filteredEntries.length === 0 && (
          <div className="col-span-full py-12 text-center text-content/50 border border-content/10 border-dashed rounded-2xl bg-surface/30">
            {t('library.no_entries', 'No entries found matching your filters.')}
          </div>
        )}
      </div>

      {selectedEntry && (
        <LibraryModal 
          entry={selectedEntry} 
          levelThemeData={levelThemes[selectedEntry.level] || levelThemes[1]} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default LibraryPage;
