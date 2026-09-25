import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { useTheme } from '../../context/ThemeContext';
import { buildSearchIndex, performSearch } from '../../services/searchService';
import { Search, X, History, Map, BookOpen, Compass, Target, Info, Lock, ChevronRight } from 'lucide-react';
import { levelThemes } from '../../data/levelThemes';

const GlobalSearch = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  
  // Build Index
  const searchIndex = useMemo(() => buildSearchIndex(t, gameState), [t, gameState]);
  
  // Load recent searches
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kalachakra_recent_searches');
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const saveRecentSearch = (term) => {
    if (!term || term.trim().length < 2) return;
    const cleanTerm = term.trim();
    let updated = [cleanTerm, ...recentSearches.filter(s => s !== cleanTerm)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('kalachakra_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('kalachakra_recent_searches');
  };

  // Perform Search
  const results = useMemo(() => performSearch(query, searchIndex), [query, searchIndex]);

  // Focus effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      
      const maxIndex = results.length > 0 ? results.length - 1 : 0;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query.trim()) {
          saveRecentSearch(query);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query]);

  const handleResultClick = (result) => {
    saveRecentSearch(query || result.title);
    navigate(result.route);
    onClose();
  };

  const handleCategoryClick = (catName) => {
    setQuery(catName);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  const quickCategories = [
    { name: t('nav.library', 'Heritage Library'), icon: <BookOpen size={16} /> },
    { name: t('nav.explore', 'Historical Map'), icon: <Map size={16} /> },
    { name: t('nav.quests', 'Quests'), icon: <Target size={16} /> },
    { name: t('nav.investigations', 'Investigations'), icon: <Search size={16} /> }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-main/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-2xl bg-surface border border-content/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh] ${theme === 'light' ? 'shadow-black/10' : 'shadow-black/50'}`}>
        
        {/* Search Input Header */}
        <div className="flex items-center gap-3 p-4 border-b border-content/10 bg-main/50">
          <Search className="text-content/50 shrink-0" size={24} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder={t('search.placeholder', 'Search places, artifacts, stories...')}
            className="flex-1 bg-transparent border-none outline-none text-lg text-content placeholder:text-content/30"
          />
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-content/10 transition-colors text-content/50 hover:text-content"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {query.trim().length < 2 ? (
            <>
              {/* Empty State: Recent & Quick Categories */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-content/50">{t('search.recent', 'Recent Searches')}</h3>
                    <button onClick={clearRecent} className="text-xs text-content/40 hover:text-gold">{t('search.clear', 'Clear')}</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-main border border-content/10 hover:border-gold/50 text-sm transition-colors"
                      >
                        <History size={14} className="opacity-50" /> {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-content/50 mb-3">{t('search.categories', 'Quick Categories')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-main border border-content/10 hover:border-gold hover:text-gold transition-colors text-left"
                    >
                      <div className="text-gold">{cat.icon}</div>
                      <span className="font-bold text-sm">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-gold/5 p-4 rounded-xl border border-gold/20 flex items-start gap-4">
                <Info className="text-gold shrink-0" size={20} />
                <p className="text-sm text-content/80 leading-relaxed italic">
                  "{t('search.kala_hint', 'Looking for a place? Try searching for Hampi or Dholavira. Want to investigate evidence? Search for inscriptions or seals.')}"
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Search Results */}
              {results.length === 0 ? (
                <div className="text-center py-12 opacity-60">
                  <Search size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-bold">{t('search.no_results', 'No results found')}</p>
                  <p className="text-sm mt-2">{t('search.try_another', 'Try searching for a place, artifact, story, person, level or quest.')}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((result, idx) => {
                    const lTheme = levelThemes[result.levelId] || levelThemes.default;
                    const isSelected = idx === selectedIndex;
                    
                    return (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left flex items-start gap-4 p-3 rounded-xl border transition-all ${isSelected ? `bg-surface border-gold shadow-md` : `bg-main border-content/10 hover:border-content/30`}`}
                      >
                        <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center text-2xl ${lTheme.bg} ${lTheme.border} shadow-inner`}>
                          {result.icon}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold truncate">{result.title}</span>
                            {result.locked && <Lock size={12} className="text-content/40" />}
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1 flex items-center gap-1">
                            {result.category} • Level {result.levelId}
                          </div>
                          <p className="text-sm opacity-80 truncate">{result.description}</p>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-2 text-xs">
                          {result.discovered ? (
                            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={12}/> {t('search.discovered', 'Discovered')}</span>
                          ) : result.locked ? (
                            <span className="text-content/50 font-bold bg-content/10 px-2 py-0.5 rounded flex items-center gap-1"><Lock size={12}/> {t('search.locked', 'Locked')}</span>
                          ) : (
                            <span className="text-gold font-bold bg-gold/10 px-2 py-0.5 rounded flex items-center gap-1"><Search size={12}/> {t('search.undiscovered', 'Explore')}</span>
                          )}
                          {isSelected && <ChevronRight size={16} className="text-gold animate-slide-right" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-main/50 border-t border-content/10 text-xs text-content/50 flex justify-between items-center">
          <span>{results.length > 0 && query.trim().length >= 2 ? t('search.count_found', '{{count}} results found').replace('{{count}}', results.length) : ''}</span>
          <div className="flex gap-4">
            <span className="hidden sm:inline-block">↑↓ to navigate</span>
            <span className="hidden sm:inline-block">↵ to select</span>
            <span>ESC to close</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalSearch;
