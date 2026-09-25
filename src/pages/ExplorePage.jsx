import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { historicalLocations } from '../data/historicalLocations';
import { civilizationLevels } from '../data/civilizationLevels';
import { levelThemes } from '../data/levelThemes';
import { useTheme } from '../context/ThemeContext';
import { Compass, Info, Map as MapIcon, List as ListIcon, Lock, X, ExternalLink, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const MapMarker = ({ loc, isUnlocked, isDiscovered, isSelected, onClick, theme }) => {
  if (!isUnlocked) {
    return (
      <div 
        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface/80 border-2 border-content/20 flex items-center justify-center opacity-50 cursor-not-allowed z-10"
        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
      >
        <Lock size={10} className="text-content/40" />
      </div>
    );
  }

  const levelThemeData = levelThemes[loc.level] || levelThemes[1];

  return (
    <button
      onClick={() => onClick(loc)}
      className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-lg flex items-center justify-center transition-all hover:scale-125 hover:z-30 focus:outline-none focus:ring-4 focus:ring-gold/50 ${isSelected ? 'z-40 scale-125 ring-4 ring-gold' : 'z-20'} ${isDiscovered ? `${levelThemeData.bg} ${levelThemeData.border}` : 'bg-surface border-gold animate-pulse'}`}
      style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
    >
      <span className="text-sm drop-shadow-md">{loc.icon}</span>
    </button>
  );
};

const ExplorePage = () => {
  const { t } = useLanguage();
  const { gameState, unlockArtifact, updateResources } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [activeLevel, setActiveLevel] = useState('all');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [selectedLoc, setSelectedLoc] = useState(null);

  const { unlockedLevels, unlockedArtifacts } = gameState;

  const filteredLocations = useMemo(() => {
    return historicalLocations.filter(loc => {
      return activeLevel === 'all' || loc.level.toString() === activeLevel.toString();
    });
  }, [activeLevel]);

  const handleDiscover = (loc) => {
    if (!unlockedArtifacts.includes(loc.libraryId)) {
      unlockArtifact(loc.libraryId);
      updateResources({ legacy: 15 });
    }
    // Also navigate to library to view it
    navigate('/library?item=' + loc.libraryId);
  };

  const levelsOptions = [{ id: 'all', label: 'All Eras' }, ...civilizationLevels.map(l => ({ id: l.id, label: `Level ${l.id}` }))];

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div>
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-terracotta rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-gold/20">
            <Compass size={24} className="text-main" />
          </div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-1">{t('map.title', 'Explore the Heritage Map')}</h1>
          <p className="text-content/70 text-sm max-w-xl">{t('map.subtitle', 'Travel through places, regions and connections across the kalachakra journey.')}</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('map')}
            className={`p-2.5 rounded-lg border flex items-center justify-center transition-colors ${viewMode === 'map' ? 'bg-gold border-gold text-main' : 'bg-surface border-content/20 text-content/70 hover:bg-main'}`}
            title="Map View"
          >
            <MapIcon size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg border flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-gold border-gold text-main' : 'bg-surface border-content/20 text-content/70 hover:bg-main'}`}
            title="List View"
          >
            <ListIcon size={20} />
          </button>
        </div>
      
        </div>
      </header>

      <div className="flex gap-4 items-center shrink-0 bg-surface p-2 rounded-xl border border-content/10">
        <select 
          value={activeLevel}
          onChange={(e) => setActiveLevel(e.target.value)}
          className="bg-main text-content border border-content/20 rounded-lg px-4 py-2 text-sm font-bold outline-none cursor-pointer hover:border-gold transition-colors w-full sm:w-auto"
        >
          {levelsOptions.map(l => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
        
        <div className="text-xs text-content/50 font-bold uppercase tracking-wider hidden sm:block">
          <Info size={14} className="inline mr-1 -mt-0.5" />
          {t('map.disclaimer', 'Educational map — locations are approximate.')}
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="flex-1 min-h-[400px] relative rounded-2xl overflow-hidden border border-content/20 bg-main shadow-inner flex flex-col md:flex-row">
          
          {/* SVG Map Canvas */}
          <div className="relative flex-1 bg-gradient-to-br from-[#e6d5b8] to-[#d4c3a3] dark:from-[#1a1e36] dark:to-[#111424] overflow-hidden">
            {/* Abstract Subcontinent Shape */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30 text-content/40" preserveAspectRatio="xMidYMid meet">
               <path d="M 15,30 Q 30,20 40,25 T 60,25 T 75,40 T 80,55 Q 75,65 65,70 L 50,95 L 40,80 Q 30,70 15,55 Z" fill="currentColor" />
            </svg>

            {/* Render Markers */}
            {filteredLocations.map(loc => {
              const isUnlocked = unlockedLevels.includes(loc.level);
              const isDiscovered = unlockedArtifacts.includes(loc.libraryId);
              
              return (
                <MapMarker 
                  key={loc.id} 
                  loc={loc} 
                  isUnlocked={isUnlocked} 
                  isDiscovered={isDiscovered}
                  isSelected={selectedLoc?.id === loc.id}
                  theme={theme}
                  onClick={(l) => setSelectedLoc(l)}
                />
              );
            })}
          </div>

          {/* Details Panel */}
          {selectedLoc && (
            <div className={`w-full md:w-80 h-1/2 md:h-full border-t md:border-t-0 md:border-l border-content/10 flex flex-col ${theme === 'light' ? 'bg-surface' : 'bg-surface/90'} shrink-0 relative animate-fade-in`}>
              <button onClick={() => setSelectedLoc(null)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-content/10 transition-colors z-10">
                <X size={18} className="text-content" />
              </button>
              
              <div className="p-6 overflow-y-auto flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-main border border-content/10 shadow-inner">
                  {selectedLoc.icon}
                </div>
                
                <h2 className="text-xl font-bold font-serif text-content mb-1">{t(`map.loc.${selectedLoc.id}`, selectedLoc.id.replace(/_/g, ' '))}</h2>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-4">
                  {t('map.level', 'Level')} {selectedLoc.level} • {selectedLoc.region}
                </div>

                <div className="space-y-4 text-sm text-content/80">
                  <p>{selectedLoc.significance}</p>
                  
                  <div className="bg-main/50 p-3 rounded-lg border border-content/10 text-xs">
                    <span className="font-bold uppercase tracking-wider block mb-1 text-content/60">Period</span>
                    {selectedLoc.period}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-content/10 bg-main/30">
                {unlockedArtifacts.includes(selectedLoc.libraryId) ? (
                  <button 
                    onClick={() => navigate('/library?item=' + selectedLoc.libraryId)}
                    className="w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 bg-surface border border-gold text-gold hover:bg-gold hover:text-main transition-colors"
                  >
                    {t('map.view_library', 'View in Library')} <ExternalLink size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleDiscover(selectedLoc)}
                    className="w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 bg-gold text-main shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform"
                  >
                    <Search size={16} /> {t('map.discover', 'Mark as Explored')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-surface border border-content/10 rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLocations.map(loc => {
              const isUnlocked = unlockedLevels.includes(loc.level);
              const isDiscovered = unlockedArtifacts.includes(loc.libraryId);
              
              if (!isUnlocked) {
                return (
                  <div key={loc.id} className="flex gap-4 items-center p-4 rounded-xl border border-content/5 bg-main/30 opacity-50 grayscale">
                     <div className="w-10 h-10 rounded bg-surface border border-content/10 flex items-center justify-center shrink-0"><Lock size={16}/></div>
                     <div><div className="text-sm font-bold text-content">{t('map.locked', 'Unknown Location')}</div></div>
                  </div>
                );
              }

              return (
                <div key={loc.id} className="flex gap-4 items-center p-4 rounded-xl border border-content/10 bg-main shadow-sm">
                   <div className="w-12 h-12 rounded bg-surface border border-content/10 flex items-center justify-center text-xl shrink-0">{loc.icon}</div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-content capitalize mb-0.5">{t(`map.loc.${loc.id}`, loc.id.replace(/_/g, ' '))}</div>
                     <div className="text-[10px] text-content/50 uppercase tracking-wider font-bold mb-1">Level {loc.level} • {loc.region}</div>
                     {isDiscovered ? (
                       <span className="text-[9px] bg-gold/10 text-gold px-1.5 py-0.5 rounded uppercase tracking-wider font-bold inline-block border border-gold/20">🔎 Discovered</span>
                     ) : (
                       <button onClick={() => handleDiscover(loc)} className="text-[10px] text-terracotta font-bold hover:underline">Explore →</button>
                     )}
                   </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
